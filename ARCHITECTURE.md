# Architecture

> One-page reference for how the HamMediaLabs / ProjectHydra HQ stack fits together.
> Canonical strategy: `docs/PROJECTHYDRA-MASTER-PLAN.md`.
> Canonical architecture diagram (logical): `docs/PROJECTHYDRA-MASTER-PLAN.md` §4.

---

## Components at a glance

```
                  ┌─────────────────────────────┐
                  │            OPERATOR         │
                  │  (approvals, weekly review) │
                  └──────────────┬──────────────┘
                                 │  reads / approves
                                 ▼
   ┌────────────────────────  DASHBOARD  ──────────────────────────┐
   │  dashboards/app/  Astro · PostgREST · Cloudflare Access auth  │
   └──────────────────────────┬────────────────────────────────────┘
                              │ reads
                              ▼
       ┌────────────────────────────────────────────────────────┐
       │                  HQ DATA  (Supabase)                   │
       │  core/db/schema.sql                                    │
       │  brand · content_asset · content_event · channel_event │
       │  provider_event · agent_task · decision · heartbeat    │
       │  views: v_brand_weekly_stats · v_provider_daily        │
       └─────▲──────────────────▲─────────────────────▲─────────┘
             │ writes           │ writes              │ daily ping
             │                  │                     │
   ┌─────────┴────────┐  ┌──────┴────────┐   ┌────────┴────────┐
   │  LLM ROUTER      │  │  N8N FLOWS    │   │  HEARTBEAT JOB  │
   │  core/router/    │  │  automation/  │   │  core/jobs/     │
   │  Gemini · Groq · │  │   n8n/        │   │  heartbeat.ts   │
   │  OpenRouter      │  │  trend→brief, │   │  + GH Actions   │
   │  failover policy │  │  weekly,      │   │  + n8n schedule │
   │  + telemetry     │  │  heartbeat    │   │                 │
   └─────────┬────────┘  └───────┬───────┘   └─────────────────┘
             │ calls              │ orchestrates
             ▼                    ▼
       AI providers          Playwright signup runbooks
       (free-tier first)     automation/playwright/src/
                             signup_core / _ai / _cms / _social
                             (human-paused at every trust gate)
```

---

## 1. LLM Router (`core/router/`)

The router is the only thing in HQ that talks to LLM providers. Everywhere else
calls *the router*, not a provider SDK.

**Surface (TS):**
- `Router.generate({ slot, prompt, … }) → GenerationResult`
- Slots: `plan`, `fast`, `code`, `edge`.
- Per-slot ordered preference list (the policy).
- On 429 / 5xx / timeout: log the attempt, fall over to the next provider unless `strict: true`.
- Telemetry sink: every attempt + final outcome is emitted to `recordEvent`, which the HQ wiring forwards to Supabase `provider_event` and `agent_task`.

**Providers in scope (May 2026):**

| Slot | Primary | Fallback 1 | Fallback 2 |
|---|---|---|---|
| `plan` | Gemini 2.5 Pro | OpenRouter `:free` | Groq |
| `fast` | Groq (Llama-3.1-8B-instant / Gemma2-9B) | Gemini Flash | OpenRouter `:free` |
| `code` | OpenRouter (Qwen3-Coder-480B) | Gemini Pro | Groq |
| `edge` | Cloudflare Workers AI (deferred wiring) | Groq | — |

Hugging Face is **deferred** — see decision log.

**Tests:** `core/router/router.test.ts` (4 tests) — primary-success short-circuit, rate-limit failover, strict-mode rejection, exhaustion error path.

## 2. Scoring engine (`core/scoring/`)

Pure functions, no I/O. Drive the kill/hold/scale verdict and feed dashboard widgets.

- `contentScore(inputs) → 0..1`
- `brandScore(inputs) → 0..1`
- `verdict({ brandScore, monetisationPotential, platformRisk, consecutiveWeeksBelow030, monetisationInFlight }) → 'kill' | 'hold' | 'scale_candidate'`
- Helpers: `normaliseToTarget`, `normaliseInverse`.

Weights and thresholds mirror `docs/PROJECTHYDRA-MASTER-PLAN.md` §13.2. Changing them = decision-log entry.

**Tests:** `core/scoring/scoring.test.ts` (9 tests) covering the formula, the three verdict branches, and the normalisers.

## 3. Jobs (`core/jobs/`)

- `heartbeat.ts` — inserts one row into Supabase `heartbeat` daily. Required because Supabase free projects pause after 7 days of zero DB activity. Scheduled by both `.github/workflows/heartbeat.yml` (06:17 UTC daily) and the n8n `heartbeat.json` workflow (defence in depth).

## 4. HQ data (`core/db/schema.sql`)

Postgres schema, target Supabase. Idempotent.

| Table | Purpose | Writers |
|---|---|---|
| `brand` | Portfolio registry | Operator / migrations |
| `content_asset` | One row per published piece | n8n briefs, manual editor |
| `content_event` | impressions / clicks / engagements / conversions / revenue | analytics ingest |
| `channel_event` | per-channel aggregates | n8n |
| `provider_event` | router attempts (success / 429 / 5xx) | LLM router |
| `agent_task` | claude code / n8n / router runs | runner + router |
| `decision` | mirrors decision log, queryable | operator / n8n |
| `heartbeat` | keep-alive | jobs |

Views:
- `v_brand_weekly_stats` — feeds the dashboard portfolio + per-brand pages.
- `v_provider_daily` — feeds the provider-health page and quota tracking.

Row Level Security is **enabled** with no anon policies. The service-role key (Tier 1 — see `docs/09-security-and-secrets.md`) is the only path to writes; never exposed to clients.

## 5. Automation (`automation/`)

**Playwright** (`automation/playwright/src/`)
- `signup_core.ts` — shared utilities: human-pause trust gates (CAPTCHA / MFA / SMS / payment / identity), screenshot capture, step logging, registry-draft output (no secrets).
- `signup_ai.ts` — runbooks for Gemini / Groq / OpenRouter.
- `signup_cms.ts` — runbooks for Cloudflare / Vercel / Ghost / Supabase.
- `signup_social.ts` — X / TikTok / Instagram / Reddit / YouTube. Cadence ceilings encoded.

Every runbook pauses for the operator at trust gates. Nothing auto-bypasses CAPTCHA/MFA/SMS.

**n8n** (`automation/n8n/workflows/`)
- `heartbeat.json` — daily ping into `heartbeat`.
- `trend-to-brief.json` — daily HN front-page → Gemini-scored in-scope filter → insert `content_asset` brief row for the operator's approval queue.
- `weekly-review.json` — Saturday cron → pull `v_brand_weekly_stats` and `v_provider_daily` → score brands → email operator.

## 6. Dashboard (`dashboards/app/`)

Astro, server-rendered. Queries Supabase via PostgREST using the service-role key
held in env vars. Operator-only auth at the edge via Cloudflare Access. No client
JS for data — the HTML is rendered at request time.

Pages today:
- `/` — portfolio totals, brand table, 14-day provider health.

Pages in scope but not yet built (per master plan §13.3): brand detail, content
detail, agent health, weekly decision queue (one-click decision-log writebacks).

## 7. Brand sites (`brands/templates/site/`)

Per-brand Astro static sites. Compliance pages (`/privacy`, `/terms`, `/ai-use`,
`/affiliate-disclosure`, `/contact`, `/about`) come for free; the `<Disclosure />`
component mirrors `docs/18-disclosure-templates.md`. Per-brand identity lives
in `src/site.config.ts`.

Hosted on Cloudflare Pages. Build via `astro build`. Bandwidth on Pages free
tier is unlimited; build minutes are not (500/month).

## 8. CLI (`core/cli/hml.ts`)

`hml` — operator surface for one-off tasks. Commands:
- `heartbeat` — manual Supabase ping.
- `router-smoke` — exercise the LLM router against configured providers.
- `score B M P [weeks] [moneyInFlight]` — print the verdict for a brand score triple.
- `migrate` — print the schema for paste into Supabase SQL editor.
- `provider-quota` — print current router policy and free-tier quotas.

Run via `npm run hml -- <command>`.

## 9. CI / safety nets (`.github/workflows/`, `.gitleaks.toml`)

- `ci.yml` — `typecheck` + `test` + `gitleaks` on every push / PR.
- `heartbeat.yml` — scheduled daily run of `npm run heartbeat`.
- `gitleaks` — repo-wide secret pattern detection (Supabase service-role JWT, OpenRouter `sk-or-`, Groq `gsk_`, Google AI `AIza…`), allowlisted to documentation and template files only.

## 10. Data flow (end-to-end happy path)

```
operator approves a brief
        │
        ▼
n8n schedules trend-to-brief ─► content_asset(status='brief')
        │
        ▼
operator drafts piece (with help from `npm run hml -- router-smoke`-style
calls or Claude Code in this repo)
        │
        ▼
content_asset(status='draft' → 'qa' → 'staged')
        │
        ▼
operator publishes (Tier 2 manual, Tier 3 one-click approve)
        │
        ▼
brand site builds on Cloudflare Pages
        │
        ▼
analytics ingest writes content_event rows
        │
        ▼
n8n weekly-review aggregates → email operator → dashboard decision queue
        │
        ▼
operator kill / hold / scale → decision row → brand.status updated
```

## 11. Engineering invariants

- **No secrets in repo.** Templates only. CI runs gitleaks every push.
- **No autonomous publishing.** Tier 4 frozen for year 1.
- **No single provider above 60% of router traffic for a calendar month.** Enforced by quarterly re-validation, not at runtime.
- **One decision-log entry per non-trivial choice.** Period.
- **Branch + PR for every change.** Even from agents. See `CONTRIBUTING.md`.

## 12. What's deliberately *not* here

- A microservices control plane. HQ is one repo, one process model.
- A Kubernetes cluster. Cloudflare Pages + Workers and a £5 VPS for n8n is the ceiling.
- A bespoke ETL. PostgREST views do the aggregation; if a view gets ugly, fix the view.
- A multi-tenant abstraction. Brands are folders, not tenants.
