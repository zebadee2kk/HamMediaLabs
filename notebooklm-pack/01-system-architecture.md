# 01 — System Architecture

## The one-line model

**Centralised intelligence, distributed execution.** One HQ
control plane holds strategy, telemetry, scoring, and routing.
Multiple brand "heads" hold voice, content surfaces, and channel
mechanics. The repo is the single source of truth.

```
                  ┌───────────────────────────────┐
                  │           HYDRA CORE          │
                  │  (HQ / central control plane) │
                  │  • Governance + decision log  │
                  │  • LLM router + failover      │
                  │  • Scoring + verdict          │
                  │  • Telemetry → Supabase       │
                  │  • Provider quota registry    │
                  │  • Static dashboard (Astro)   │
                  └──────────┬────────────────────┘
                             │ (manifests, events)
        ┌────────────────────┼────────────────────┐
        │                    │                    │
  ┌─────▼──────┐      ┌──────▼─────┐      ┌──────▼──────┐
  │  Brand A   │      │  Brand B   │      │  Brand C    │
  │ AI Escape  │      │  Corp.     │      │  UK Cost-   │
  │ (build-    │      │  Satire    │      │  of-Living  │
  │  ready)    │      │ (gated)    │      │  (gated)    │
  └────────────┘      └────────────┘      └─────────────┘
```

## Repo layout (top-level)

```
HamMediaLabs/
├── ARCHITECTURE.md             # canonical engineering map
├── CONTRIBUTING.md             # workflow + PR rules
├── README.md                   # entry point
├── core/                       # HQ engine (TS, tested)
│   ├── router/                 # LLM router + drivers + failover
│   ├── scoring/                # Brand/Content/Verdict formulas
│   ├── telemetry/              # Supabase event writer
│   ├── providers/              # quota registry + revalidator
│   ├── db/                     # schema.sql, RLS, snapshots
│   └── jobs/                   # heartbeat keep-alive
├── dashboards/app/             # HQ dashboard (Astro static)
├── brands/
│   ├── templates/site/         # canonical brand-site starter
│   ├── templates/voice-template.md
│   ├── templates/house-examples-template.md
│   ├── brand-a-aiescape/       # Brand A pipeline + site
│   ├── brand-b-corpsatire/     # Brand B pipeline (no site yet)
│   └── brand-c-ukescape/       # Brand C pipeline (no site yet)
├── launch-packs/brand-a-mvp/   # 11-file operator runbook
├── design-handoffs/            # Gemini briefs + review gates
├── docs/                       # governance corpus + decision log
├── playbooks/                  # 15 operational checklists
├── prompt-library/             # general-secure-skeleton, persona-first
├── notebooklm-pack/            # this distilled pack
├── .github/                    # CI, heartbeat, Dependabot
└── .gitleaks.toml              # provider-specific secret patterns
```

## Layers, by responsibility

### 1. HQ engine (`core/`)

- **`core/router/`** — TypeScript LLM router. Drivers for Gemini
  (long-context, planning), Groq (fast variations, high TPM),
  OpenRouter (`:free` models, fallback). Failover policy:
  Gemini Flash → Groq Llama → OpenRouter DeepSeek-V3:free →
  Cloudflare Workers AI. 429 / 5xx auto-routes. Telemetry hook
  fires on every call.
- **`core/scoring/`** — `contentScore` / `brandScore` /
  `verdict`. The verdict thresholds are **kill < 0.30**,
  **hold 0.30 – 0.55**, **scale ≥ 0.55** (with monetisation
  potential ≥ 0.6 and platform risk ≤ 0.4 for scale). The
  scoring file is mirrored into `dashboards/app/src/lib/scoring.ts`
  with **SYNC POINT** comments and a drift-watcher test
  (`core/scoring/sync-with-dashboard.test.ts`) that fails if
  the two diverge.
- **`core/telemetry/supabase.ts`** — writes a `TelemetryEvent`
  to `provider_event` (router) or `agent_task` (agent work).
  Service-role key is **server-side only**. Tests confirm it
  is never logged. Tier 1 secret per
  `docs/09-security-and-secrets.md`.
- **`core/providers/quota-registry.ts`** — single canonical
  table of free-tier ceilings (Gemini RPM/RPD/TPM, Groq
  RPM/TPM/RPD, OpenRouter RPM/RPD, Supabase MB / pause /
  MAU, Cloudflare Pages builds, Buttondown subs). Quarterly
  revalidation per `playbooks/provider-revalidation.md`.
  Mirrored into `dashboards/app/src/lib/quota.ts` with SYNC
  POINT + drift watcher.
- **`core/db/schema.sql`** — Supabase tables: `brand`,
  `content_asset`, `content_event`, `channel_event`,
  `provider_event`, `agent_task`, `decision`, `heartbeat`,
  `source_signal`. RLS on every table.
- **`core/jobs/heartbeat.ts`** — daily ping that keeps
  Supabase from pausing after 7 days inactivity. Runs in
  `.github/workflows/heartbeat.yml`.

### 2. HQ dashboard (`dashboards/app/`)

Static Astro 4.x. **No client islands.** Data fetched in page
frontmatter at build time via
`dashboards/app/src/lib/supabase.ts`. Cloudflare Access at the
perimeter; the dashboard itself does no auth.

Pages live today:

- **`/`** — overview cards (active / hold / scale / killed
  brand counts; cost; revenue; net; owned-audience share) and
  three rollup sections (brand table; 14-day provider health;
  recent decisions).
- **`/cost`** — per-line monthly cost with attribution;
  per-brand net; scenario marker (Phase A / B / C / D per
  `docs/profit-model.md`); free-tier headroom indicators.
- **`/decisions`** — `decision` table mirrored as a scrollable
  table; filter by scope.
- **`/experiments`** — open experiments per
  `playbooks/weekly-experiment.md` with hypothesis, success
  threshold, failure threshold, rollback trigger.

Designed-but-not-yet-built per the Gemini brief
(`design-handoffs/gemini-hq-dashboard-ui.md`): `/brand/[slug]`
and `/providers` are sketched as future surfaces.

Numeric cells use `font-variant-numeric: tabular-nums`. Every
coloured state has a text label (no colour-only encoding).
Empty / error states fall back to `EmptyState.astro` /
`ConfigBanner.astro` — the dashboard never silently renders
zeros.

### 3. Brand sites (`brands/<slug>/site/`)

Each brand instantiates the canonical
`brands/templates/site/` starter. **One brand site per brand.**
Astro 4.x. Cloudflare Pages. No SSR adapter. No client islands.
The Astro CVE that prompted Dependabot PR #12 / #70 (slot-name
XSS on hydrated SSR components) **does not apply** because we
have neither hydrated components nor an SSR adapter — verified
by `grep -rE "client:|ViewTransitions|ClientRouter"` returning
zero matches. Staged 4 → 5 → 6 migration plan lives in
`docs/astro-security-upgrade-plan.md`.

Brand A's site is instantiated today
(`brands/brand-a-aiescape/site/`). Eight pages including 404,
robots.txt, favicon, sitemap. Brand B and Brand C **do not yet
have sites**, by design (gated behind Brand A's day-30 outcome).

### 4. Brand pipelines (`brands/<slug>/`)

Every brand carries a uniform pipeline (instantiated from
`brands/templates/`):

- **`profile.md`** — identity, niche, audience, tone, KPIs,
  kill / hold / scale thresholds, operational accounts,
  cornerstone plan.
- **`voice.md`** — character bio, voice contrasts, voice DNA,
  anti-voice (§5), house tonal moves. Per
  `docs/voice-authenticity-system.md`.
- **`house-examples.md`** — concrete on-voice samples used as
  the read-aloud / watch-aloud test for every new piece.
- **`cornerstone-briefs.md`** — the first 5 longform pieces.
- **`prompts/`** — brand-specific prompt overrides on top of
  `prompt-library/general-secure-skeleton.md`.
- **`qa/`** — brand-specific checklists. Brand A has
  voice-fidelity + content quality + affiliate-disclosure +
  X-platform. Brand B adds satire-rules + defamation.
  Brand C adds fca-perimeter + vulnerable-reader +
  affiliate-redlines.
- **`launch-checklist.md`** (Brand A only at present) —
  operator pre-launch checklist.

### 5. Launch packs (`launch-packs/`)

A launch pack is a single-folder runbook that bridges the
governance corpus to a real launch day. `launch-packs/brand-a-mvp/`
is the canonical one. Eleven files:

1. `README.md` — purpose, order of operations.
2. `00-launch-overview.md` — what launch means + what it isn't.
3. `01-human-operator-checklist.md` — pre-launch operator tasks.
4. `02-ai-agent-task-list.md` — pre-launch AI tasks.
5. `03-content-launch-pack.md` — what content goes live, in
   what order.
6. `04-technical-launch-pack.md` — DNS, hosting, Buttondown,
   site config.
7. `05-measurement-and-review.md` — week-1 and day-30 review
   schema.
8. `06-distribution-plan.md` — opt-in only, comment-first.
9. `07-risk-and-rollback.md` — what to do if Cloudflare /
   Supabase / Buttondown / a platform misbehaves.
10. `08-launch-day-script.md` — the actual day-of script.
11. `09-post-launch-review-template.md` — week-1 retro.

### 6. Design handoffs (`design-handoffs/`)

Gemini Free is the lab's design / build specialist. It does not
own strategy or governance. The folder contains:

- **Six Gemini briefs**:
  - `gemini-brand-a-mvp-site.md` (Brand A site visual system).
  - `gemini-brand-b-visual-system.md` (Brand B deadpan
    corporate satire identity).
  - `gemini-brand-c-trust-ui.md` (Brand C trust-first UK
    financial UI; FCA disclaimer placement + charity-link-at-
    top binding).
  - `gemini-hq-dashboard-ui.md` (operator-only dashboard UI).
  - `gemini-social-asset-templates.md` (per-brand social cards).
- **`gemini-output-review-checklist.md`** — 14 sections, every
  Gemini output passes through this before any commit.
- **`claude-design-subagents.md`** — six pre-Gemini Claude
  subagent roles (UX Strategist / Visual Designer / Brand
  Consistency / Accessibility / Compliance-Disclosure /
  Conversion-Ethics).
- **`claude-before-gemini-checklist.md`** — 10-section pre-flight
  that every brief must walk before reaching Gemini.

Gemini output is **gitignored by default** under
`design-handoffs/output/<brief>/<date>/`; nothing lands in the
repo without passing the review checklist.

### 7. AI workforce (orchestration)

Multiple AI agents working under defined boundaries:

- **Claude Code** (you, reading this) — primary engineering +
  governance authoring agent. Operates inside PR workflow:
  one issue = one branch = one PR. Never commits directly to
  `main`. Never bypasses gitleaks / hooks.
- **Codex** — secondary review agent; runs as `ultrareview`
  in cloud, billed per-call; user-triggered only.
- **Gemini Free** — design specialist. Does not own strategy,
  governance, integration review, security, or compliance.
- **Local LLMs** (`docs/local-llm-plan.md`) — planned for
  voice-cloning / on-device generation experiments. Not yet
  in production.
- **NotebookLM** — distilled-intelligence layer (this pack);
  used for onboarding / founder briefing / investor briefing,
  not for content generation.

Detailed boundaries in `06-ai-workforce-and-tooling.md`.

### 8. Governance corpus (`docs/`)

Forty-plus governance documents anchored by:

- **`docs/PROJECTHYDRA-MASTER-PLAN.md`** — canonical strategy
  document (730 lines).
- **`docs/business-plan.md`** — operating model + phase model.
- **`docs/unit-economics.md`** — per-unit cost and revenue.
- **`docs/profit-model.md`** — A / B / C / D scenario P&L.
- **`docs/cost-control-and-free-tier-plan.md`** — £0 MVP stack,
  £50/month ceiling, 5-step paid-line gate.
- **`docs/portfolio-expansion-gate.md`** — Brand B / C launch
  criteria.
- **`docs/legal-and-resilience.md`** — entity ladder, MFA,
  paid-legal-advice triggers.
- **`docs/voice-authenticity-system.md`** — voice moat spec.
- **`docs/seo-moat-plan.md`** — EEAT + AI-search citation
  mechanics.
- **`docs/x-platform-risk.md`** — X cadence ceilings.
- **`docs/source-intelligence-governance.md`** — per-source
  approved / deferred / forbidden methods.
- **`docs/measurement-framework.md`** — north-star + leading +
  lagging per brand.
- **`docs/astro-security-upgrade-plan.md`** — staged 4 → 5 → 6.
- **`docs/18-disclosure-templates.md`** — canonical AI /
  affiliate / FCA / privacy / terms copy. **Never paraphrase.**
- **`docs/15-decision-log.md`** — every strategic decision
  logged. 25+ entries to date.

### 9. Playbooks (`playbooks/`)

Operational checklists. Fifteen at present:

- `weekly-review.md` + `weekly-review-brand-a-launch.md`
- `incident-credential.md` + `account-recovery.md` +
  `platform-strike-response.md`
- `provider-revalidation.md` + `quarterly-platform-refresh.md`
- `voice-fidelity-checklist.md` + `kill-or-scale-review.md`
- `package-hygiene.md` + `weekly-experiment.md`
- `source-intelligence-weekly.md` + `first-week.md`
- `brand-launch-checklist.md` + `content-quality-checklist.md`

### 10. Security floor

- **`.github/workflows/ci.yml`** — typecheck + node test + gitleaks
  on every push and PR.
- **`.github/workflows/heartbeat.yml`** — daily Supabase
  keep-alive (mitigates 7-day inactivity pause).
- **`.github/dependabot.yml`** — four npm ecosystems plus
  GitHub Actions; auto-merge OFF.
- **`.gitleaks.toml`** — provider-specific patterns (Supabase
  service-role keys, Gemini, Groq, OpenRouter, Cloudflare).
- **`docs/dependabot-security-audit.md`** — operator-runnable
  audit framework + lanes.
- **No `.env` ever committed.** Templates only
  (`vault-template/account-registry-template.md`).

## Data flow

```
Operator ──(approvals)──▶ Dashboard cards
   │                          ▲
   ▼                          │
Hydra Core router ──▶ {Gemini, Groq, OpenRouter}
   │                              │
   ├──▶ Supabase HQ (provider_event, agent_task, decision)
   │                              │
   ├──▶ Brand site builds ──▶ Cloudflare Pages
   │
   └──▶ Plausible / CF Analytics ──▶ HQ rollups (planned)
```

## Astro version posture

**Pinned to Astro 4.x** across `dashboards/app/`,
`brands/templates/site/`, and `brands/brand-a-aiescape/site/`.
Dependabot PRs #12 and #70 propose Astro 4 → 6 bundles. Both
are deferred per `docs/astro-security-upgrade-plan.md`. The
CVE that drives the urgency (slot-name XSS on hydrated SSR
components) does not apply to this lab; the migration will
happen on the staged 4 → 5 → 6 path during a future quarterly
platform refresh.

## What's deliberately NOT in this architecture

- **No client-side islands.** Static rendering everywhere.
- **No client-side data fetch.** Service-role key stays
  server-side.
- **No SSR adapter.** All output is static.
- **No content collections.** Markdown / MDX in `src/pages/`
  only.
- **No external trackers.** No Google Analytics, no Pixel, no
  GTM, no Hotjar, no Clarity.
- **No paid SaaS without a §5 gate** (`docs/cost-control-and-free-tier-plan.md`).
- **No autonomous publishing pathway anywhere.** Tier 4 frozen.

## Cross-references

- `docs/PROJECTHYDRA-MASTER-PLAN.md` §4 — architecture canon.
- `ARCHITECTURE.md` — engineering map.
- `docs/04-architecture.md` — short-form architecture pointer.
- `docs/astro-security-upgrade-plan.md` — Astro posture.
- `docs/hq-dashboard-implementation-audit.md` — dashboard
  hardening audit including the lib/scoring + lib/quota
  duplication trade-off.
- `docs/brand-a-prelaunch-audit.md` — Brand A site audit.
