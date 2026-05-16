# ProjectHydra — Master Strategic Plan (HamMediaLabs)

> **Companion business docs (Phase 6.9):**
> [`business-plan.md`](./business-plan.md) — operating model + phases;
> [`unit-economics.md`](./unit-economics.md) — per-unit cost/revenue;
> [`profit-model.md`](./profit-model.md) — scenario P&L.
> Cost discipline: [`cost-control-and-free-tier-plan.md`](./cost-control-and-free-tier-plan.md).
>
> **Document status:** v1.0 master plan, execution-ready.
> **Author:** Autonomous planning pass, May 2026.
> **Scope:** Strategy, research, architecture, roadmap, team, marketing, risk, finance, legal, KPIs.
> **Companion docs:** `docs/00–16` (kept as concise stubs); this file is the canonical, integrated plan and supersedes overlapping prose where they conflict.

---

## 0. Executive summary

ProjectHydra is the operating system inside HamMediaLabs. It is **not a website, brand, or content business** — it is a **brand-factory and decision engine**: one central control plane (Hydra Core / HQ) that launches, instruments, governs, and prunes a portfolio of lightweight media brands (Hydra Heads), keeping only those that prove unit economics within a fixed review window.

**One-line value proposition.** Discover and validate profitable digital media properties faster and cheaper than manual experimentation, by industrialising the boring 80% (account creation, content QA, analytics aggregation, kill/scale review) and reserving human judgement for the 20% that actually moves outcomes.

**Operating thesis.**

| | |
|---|---|
| Infrastructure → | one repo, one dashboard, one secrets model, free-first stack. |
| Automation → | Claude Code (codegen, briefs), Playwright (provisioning), n8n (orchestration). |
| Experimentation → | three pilot brands, fixed budget, fixed review window. |
| Analytics → | a single scoring model that converts traffic, engagement, cost and risk into kill/hold/scale. |
| Monetization → | only after audience trust and conversion signal exist (Stage 3 of the maturity model). |

**Default MVP (locked).** 1 control plane, 3 brands, ≤£50/month total infra spend in the first 90 days, weekly review cadence, no Tier-4 autonomous publishing.

**90-day success bar.** By day 90 the lab has produced: (a) a working control plane with provider routing and dashboards, (b) three brands with at least 8 weeks of real data each, (c) one clear kill decision, one hold, and one scale recommendation, and (d) reusable playbooks that compress brand-launch effort from ~40h to ≤8h.

---

## 1. Strategic vision

### 1.1 Mission
Build a reusable, governable, free-first AI-powered media operating system that turns brand creation into a measurable, repeatable process, with explicit kill rules so failed experiments stop costing time.

### 1.2 Value proposition
- **For the operator (you):** convert opportunistic, emotional brand experiments into data-driven portfolio plays with explicit exit criteria.
- **For audiences:** brand promises that are explicit, content that passes a published quality bar, AI use that is disclosed.
- **For platforms:** conservative cadence, anti-spam by design, real human approvals at trust gates → reduced ban risk → longer account lifespan.
- **For future hires / contributors:** the repo *is* the operations manual; onboarding is reading, not tribal knowledge.

### 1.3 Stakeholders
| Stakeholder | Interest | Engagement |
|---|---|---|
| Operator (founder) | Speed, ROI, optionality | Daily; final authority at all Tier 3+ gates |
| Future contractors / hires (writers, editors, ops) | Clear briefs, fair pay, sustainable cadence | Per-brand contracts post-MVP |
| Audiences (per brand) | Useful / entertaining / trustworthy content | Brand-level engagement loops |
| Platforms (Google, Meta, TikTok, Reddit, etc.) | Policy compliance, low spam | Conservative posting policy, manual gates |
| Providers (Gemini, Groq, OpenRouter, Cloudflare, Supabase, …) | ToS compliance, no abuse | Quota tracking, fallback routing |
| Regulators (FTC, UK ASA, EU AI Act supervisors, ICO) | Truthful claims, disclosure | Standing disclosure templates, audit trail |
| HamNet / consulting business | Risk isolation | Strict separation; see §11.1 |

### 1.4 Objectives (12-month)
1. **System.** Repeatable launch pipeline (concept → live brand) at ≤8 person-hours and ≤£10 marginal infra/month per brand.
2. **Portfolio.** 3 pilot brands run to decision; 1 scaled; ≥2 additional cohorts launched in months 4–12.
3. **Revenue.** First monetisation signal (any affiliate/ad/digital product) by month 4; £500/month run-rate aggregate by month 9; £2,000/month by month 12 (expected case — see §3).
4. **Operational maturity.** Tier-3 publishing (publish-with-approval) live for ≥1 brand by month 6; **no** Tier-4 (autonomous publishing) within year 1.
5. **Knowledge asset.** Decision log, playbooks, and provider registry mature enough that an external operator could run the lab from the repo alone.

### 1.5 Success metrics (portfolio KPIs)
| KPI | Definition | 90-day target | 12-month target |
|---|---|---|---|
| Brand launch cost | Marginal £ + person-hours to go from approved hypothesis to live | ≤£10 + ≤8h | ≤£5 + ≤4h |
| Kill latency | Days from "weak signal" to formal kill | ≤21 | ≤14 |
| Portfolio cost | Total monthly infra + AI | ≤£50 | ≤£150 |
| Aggregate sessions | Unique sessions across all live brands | ≥3,000/mo | ≥30,000/mo |
| Aggregate revenue | All sources, net | ≥£0 | ≥£2,000/mo |
| Tier-3-ready brands | Brands eligible for publish-with-approval | ≥1 | ≥3 |
| Decision-log completeness | % strategic decisions logged | 100% | 100% |
| Provider failover events | Successful auto-routings on quota / outage | tracked | <1% user-visible failure |

### 1.6 Critical success factors
1. **Discipline at kill gates.** The single biggest failure mode is keeping brands alive past their kill threshold for emotional reasons.
2. **No Tier-4 drift.** Autonomous publishing under current FTC/ASA/EU-AI-Act exposure is a business-ender.
3. **Provider diversification.** No single provider can own >60% of inference, hosting, or distribution without an active fallback.
4. **Secrets hygiene.** One leaked parent credential collapses the whole portfolio. See §11.
5. **Documentation-first culture.** Every change → decision log entry. No tribal knowledge.

### 1.7 Assumptions and dependencies
- Free tiers from Gemini, Groq, OpenRouter and Cloudflare remain materially as researched in §4 (subject to **quarterly re-validation** — Gemini cut free tiers 50–80% in Dec 2025).
- The operator can commit ≥10 focused hours/week to the lab.
- No regulatory ban on AI-generated commercial content in primary jurisdictions (UK/EU/US) within the 12-month window (current regimes are *disclosure*, not prohibition).
- Cloudflare account, GitHub account, and a domain registrar (recommended Cloudflare Registrar or Porkbun) remain in good standing.
- The repo remains the single source of truth — no parallel Notion/Docs drift.

---

## 2. Strategic scenarios

| Scenario | Trigger conditions | Portfolio shape at day 90 | Aggregate revenue (run-rate, mo 12) | Required response |
|---|---|---|---|---|
| **Best-case** | One pilot finds product-market signal in <30d; free tiers hold; no platform bans | 1 scaled brand + 2 holds, plus 2 new bets launched in months 3–6 | £4–8k/mo | Reinvest into one paid-tier provider (probably Gemini paid + a managed Postgres); hire 1 PT editor |
| **Expected-case** | Mixed signals; some traction; standard regulatory creep | 1 kill, 1 hold, 1 scale candidate; 1 new cohort planned | £1–2k/mo | Convert scale candidate to dedicated node; document Tier-3 playbook |
| **Worst-case** | All 3 brands fail to gain traction; a free tier collapses; or a platform suspends a critical account | 3 kills; system intact | £0 | Run a "system post-mortem" — was failure niche choice or system? If system: fix. If niche: launch new cohort with stricter niche-selection rubric (§5.3) |
| **Black-swan** | EU AI Act enforcement after 2 Aug 2026 reinterpreted to ban AI-assisted commercial text, or a parent account banned | — | — | Predefined cold-storage of brand assets; pivot to "AI-augmented human" framing already baked into disclosure templates (§11.4) |

**Trade-off note.** Best-case tempts premature scaling. The kill/hold/scale rubric (§12) is deliberately conservative — *one strong signal* never overrides *operational complexity* in the score.

---

## 3. Validated market & provider landscape (May 2026)

> All numbers below are sourced (§16). Quotas change quarterly; **re-validate before each cohort launch** via `automation/claude-code/prompts/provider-research.md`.

### 3.1 AI inference
| Provider | Free-tier reality (May 2026) | Role in stack | Watchouts |
|---|---|---|---|
| Google AI Studio / Gemini 2.5 Pro / Flash / Flash-Lite | 5–15 RPM, 100–1,000 RPD, **250K TPM** universal cap; **Dec 2025 cuts of 50–80%**; Gemini 2.0 retired March 2026; Gemini 3.x paid-only | Long-context planning, briefs, structured generation | Free-tier inputs are used for training — never send PII, vault data, or client material |
| Groq | 30 RPM, **6K TPM** (Gemma-2-9B 15K, Llama 4 Maverick 3K), 1,000 RPD, Llama-3.1-8B-instant 500K tokens/day | Fast variation generation, lightweight agents, hooks/titles/CTA fan-out | Hit-whichever-first limits; cache stable system prompts |
| OpenRouter (`:free` models) | **20 RPM**, **50 req/day** unpaid, **1,000 req/day** after ≥$10 credits; DeepSeek V3/R1, Qwen3 Coder 480B free, Llama free variants | Fallback and model-bake-offs | Failed attempts still count; free models can rotate availability |
| Hugging Face Inference / Spaces | Variable; suited to specialist OSS models | Experimental | Inconsistent SLOs — never on a critical path |
| Cloudflare Workers AI | Edge inference, modest model set | Edge fallback for static-brand JS | Smaller models; not for long-form |
| GitHub Models | Dev/testing; tied to repo workflows | Pre-production prompt experiments | Access varies |

**Default router policy (Hydra Core):**
1. **Long-context / planning / outline → Gemini 2.5 Pro** (free, until daily cap)
2. **Fast variations / titles / metadata → Groq Llama-3.1-8B-instant or Gemma-2-9B** (high TPM)
3. **Coding & structured agents → OpenRouter Qwen3-Coder-480B:free** (after $10 paid for 1,000 RPD)
4. **Fallback chain on 429/5xx:** Gemini Flash → Groq Llama → OpenRouter DeepSeek-V3:free → Cloudflare Workers AI

### 3.2 Hosting & data
| Provider | Free reality | Role | Watchouts |
|---|---|---|---|
| Cloudflare Pages | **Unlimited bandwidth** (free tier), 500 builds/mo, 20K files/site, 25 MiB/file, 20-min build timeout | Primary static brand host | Build-minute starvation if naive CI; commit-on-write workflow |
| GitHub Pages | Unlimited static, soft fair-use bandwidth | Docs & secondary brand host | Custom domains fine; no server side |
| Vercel | Free tier OK for prototyping; commercial use constrained on free | Selective; demo only | Re-check commercial-use clauses before any monetised deploy |
| Netlify | Forms + functions free tier | Selective fallback | Build minutes & function invocations metered |
| Supabase | **2 active projects**, 500 MB DB, 1 GB storage, 5 GB egress, 50K MAU, **pauses after 7 days inactivity**, no backups | Primary DB for HQ + dashboard | Daily keep-alive ping job; replicate critical data to GitHub-stored Parquet snapshots |
| Neon | Serverless Postgres free tier; auto-suspend | DB fallback / brand-isolated DBs | Cold-start latency on resume |

**HQ data architecture decision (provisional, see §5.2):** Supabase project #1 = HQ (registries, dashboard data, decision log mirror); Supabase project #2 = shared brand telemetry. Per-brand Postgres only if a brand reaches Scale.

### 3.3 Distribution / social
| Channel | Strength | Automation friendliness | Default tier (governance) | Cadence guardrail |
|---|---|---|---|---|
| Reddit | Authentic signal, niche discovery | Low — anti-spam-aggressive; manual only | Tier 2 (draft+manual post) | ≤1 post/sub/week initially; comment-first karma build |
| TikTok | Discovery, viral upside | Low — automation = ban risk | Tier 2 manual | 3–5/week ceiling; human review every clip |
| Instagram | Visual reach | Low — Meta trust gates strict | Tier 2 manual | 4/week ceiling |
| YouTube Shorts | Durable + searchable | Medium — API publishing OK with quotas | Tier 3 with approval | 3/week |
| X (Twitter) | Trend testing | Medium — paid API constrains, scraping risky | Tier 2 manual | 1–3/day max |
| Pinterest | Evergreen visual traffic | Medium — API exists | Tier 3 with approval | 5–10/week |

**Channel-portfolio rule:** every brand chooses **one** primary channel (where it must win) and **one** distribution mirror (where it cheaply reposts), and only adds a third channel after the primary hits its KPI floor.

### 3.4 Regulatory landscape (binding by May 2026)
- **EU AI Act, Article 50** — transparency obligations apply from **2 August 2026**. Three concrete impacts on the lab: (i) GPAI providers must mark outputs machine-readably, but the *deployer* (us) must disclose deepfakes and AI-generated *text intended to inform the public on matters of public interest*; (ii) the carve-out for "evidently artistic, creative, satirical" use *requires* a clear disclosure of existence, just not at every frame — directly relevant to Brand B (corporate satire); (iii) Code of Practice expected May–June 2026 — track and adopt.
- **FTC (US)** — May 2026 updated AI endorsement guidance: synthetic influencers, AI testimonials, and AI-augmented endorsements *must be identifiable as such*. Affiliate links remain a "material connection" → disclosure mandatory. Civil penalty ceiling **$51,744 per violation** (2026 adjustment). Creators bear independent liability.
- **UK ASA / CAP** — same advertising codes apply to AI content; ASA scaling its **Active Ad Monitoring** AI in 2026; influencer disclosure must use platform tools and `#ad`, not bio-only.
- **UK ICO / GDPR & PECR** — cookie banners, lawful basis for analytics, DPIA for any personal-data processing.
- **Affiliate-program ToS** (Amazon Associates, etc.) — each program layers its own disclosure-wording rules on top of FTC/ASA.

**Standing compliance posture (locked into all brand templates):**
- Site footer: AI use disclosure, affiliate disclosure, last-updated date, contact, privacy & cookie links.
- Every monetised post: in-line disclosure *before* the first affiliate link, in plain language.
- Every AI-augmented social post (satire excluded but still labelled): visible "AI" label or hashtag.
- Decision-log entry whenever a disclosure template changes.

---

## 4. Strategic architecture (Hydra Core ↔ Heads)

### 4.1 Conceptual model
```
                          ┌──────────────────────────┐
                          │      HYDRA CORE (HQ)     │
                          │ ── single control plane ─│
                          │  - governance & gates    │
                          │  - decision engine       │
                          │  - provider router       │
                          │  - dashboards / KPIs     │
                          │  - global memory         │
                          │  - Claude Code orchestr. │
                          │  - Playwright orchestr.  │
                          │  - n8n workflows         │
                          └──────────┬───────────────┘
                                     │ (signed manifests, KPI events)
            ┌────────────────────────┼────────────────────────┐
            │                        │                        │
    ┌───────▼────────┐      ┌────────▼───────┐      ┌─────────▼────────┐
    │ Head A (AIEsc) │      │ Head B (Satire)│      │ Head C (UK Fin)  │
    │ CMS / Voice    │      │ CMS / Voice    │      │ CMS / Voice      │
    │ Content gen    │      │ Content gen    │      │ Content gen      │
    │ Social publish │      │ Social publish │      │ Social publish   │
    │ Local analytics│      │ Local analytics│      │ Local analytics  │
    └────────────────┘      └────────────────┘      └──────────────────┘
```

**Principle.** *Centralised intelligence, distributed execution.* HQ holds strategy, knowledge, scoring, and routing. Heads hold brand voice, content surfaces, and channel mechanics.

### 4.2 Reference tech stack (provisional, free-first)
| Layer | Default choice | Why | Fallback |
|---|---|---|---|
| Source of truth | This monorepo on GitHub | Docs-first, free, auditable | Self-host gitea if GitHub policy shifts |
| HQ runtime | Cloudflare Workers + Pages | Free, edge, unified DNS | Fly.io / Railway free tiers |
| HQ DB | Supabase project #1 | Postgres + auth + storage in one | Neon |
| Secrets | 1Password (or Bitwarden) **outside repo** + Cloudflare/Vercel env vars + GitHub Actions secrets | No raw secrets in git; templates only | Doppler |
| Orchestration | n8n self-hosted on a tiny VPS (or n8n cloud free) | Visual workflows, retries, scheduling | GitHub Actions + cron |
| Code generation | Claude Code (this tool) | Already integrated | Cursor / Aider |
| Browser automation | Playwright (Python or TS) | Robust, free | Browser-use, Stagehand |
| LLM routing | Thin internal router (TS) wrapping Gemini/Groq/OpenRouter | Cost & failover control | LiteLLM (OSS) |
| Brand CMS (default) | Astro static (markdown) on Cloudflare Pages | Free, fast, SEO-friendly, easy AI integration | Ghost (managed) for editorial-heavy brands |
| Brand analytics | Plausible CE self-hosted **or** Cloudflare Web Analytics | Privacy-friendly, free | Umami |
| Email / newsletter | Buttondown free tier (≤100 subs) or self-hosted Listmonk | Cheap, low ban risk | Beehiiv free tier |
| Domain | Cloudflare Registrar (at-cost) | No markup, DNS integrated | Porkbun |

### 4.3 Data layers
- **Global (HQ-owned):** brand registry, account registry (no secrets), provider registry, quota tracker, decision log, scoring weights, prompt library.
- **Local (Head-owned):** brand voice doc, content backlog, draft → review → publish queue, on-brand assets.
- **Telemetry (shared):** content_asset events, social events, provider events, agent task events — single normalised schema (see §12.4).

### 4.4 Component-level architecture diagram (logical)

```
[Operator] ──(approvals)──▶ [Approvals UI / dashboard]
       │                          ▲
       │                          │ KPI roll-up
       ▼                          │
[Hydra Core router] ──▶ [LLM router] ──▶ {Gemini, Groq, OpenRouter, …}
       │                                       │
       ├──▶ [Playwright runner] ──▶ provider/CMS/social signup flows (paused at trust gates)
       ├──▶ [n8n] ──▶ schedules: trend → brief → draft → QA → publish-staging → publish
       ├──▶ [Supabase HQ DB] ──(events, registries, decisions)
       └──▶ [Static site builds] ──▶ Cloudflare Pages per brand
                                          │
                                          └──▶ Plausible / CF Analytics ──▶ HQ DB
```

### 4.5 Governance tiers (binding map to features)
| Tier | What's allowed | Required to advance |
|---|---|---|
| **T0 Planning** | Docs only | — |
| **T1 Read-only / setup** | Account creation, registry entries, provider research | All Playwright signup modules log evidence; vault populated |
| **T2 Draft-only** | Generate content into staging, schedule reviews; manual social posts | Content QA checklist passing rate ≥90% across 2 weeks |
| **T3 Publish-with-approval** | Auto-publish *after* a one-click operator approval | 4 consecutive weeks of T2 stability + brand legal pages live |
| **T4 Autonomous publish** | Posts go live unattended on a defined cadence and topic whitelist | **Year-1 freeze.** Re-evaluate after EU AI Act guidelines stabilise + 3 months of T3 with zero policy incidents |

---

## 5. Product / technology sub-plan

### 5.1 Components inventory (build / buy / defer)
| Component | Build / Buy / Defer | Why | Owner |
|---|---|---|---|
| Repo skeleton | Build (done in this repo) | Free, control | HQ |
| Brand templates (Astro starter) | Build (small fork of an Astro blog template) | Reuse | HQ |
| LLM router | Build (≤300 LOC TS) | Cost / failover | HQ |
| Provider quota tracker | Build | No good free SaaS | HQ |
| Account & API key registries (no secrets) | Build (markdown / Supabase view) | Done in template | HQ |
| Password vault | **Buy** (1Password / Bitwarden) | Don't roll crypto | Operator |
| Dashboard UI | Build (Next.js or Astro + simple charts) | Tailored KPIs | HQ |
| Playwright onboarding harness | Build (per `signup_*` modules) | Already scoped | HQ |
| n8n workflows | Build | Already scoped | HQ |
| Email/newsletter | Buy (Buttondown/Beehiiv free) | Deliverability is hard | HQ |
| Analytics | Buy/host (Plausible CE or CF) | Don't reinvent | HQ |
| Affiliate-link cloaker | Defer to month 4+ | Premature | — |
| Membership / paywall | Defer to Scale-stage brand only | Premature | — |

### 5.2 Decision: HQ runtime & DB
**Decision (logged):** HQ DB on **Supabase project #1**; HQ compute on **Cloudflare Workers + Pages**. Reasons: zero standing cost, edge latency, simple secret model, both have GitHub-native deploy. Risks: Supabase 7-day inactivity pause (mitigation: keep-alive job in n8n / GitHub Actions cron pinging a `heartbeat` table), Workers CPU caps (mitigation: long jobs run in n8n, Workers only orchestrate).

### 5.3 Niche-selection rubric (used to vet every brand idea, including the three pilots)
Score each candidate 1–5 on:
1. **Audience clarity** — can you name 3 forums where they hang out?
2. **Monetisation density** — multiple paths (affiliate, ad, product, lead) within 1 year?
3. **Content reusability** — can outputs be reformatted across ≥3 surfaces with low effort?
4. **Platform risk** — low = blog/YouTube; high = TikTok/Insta dependence.
5. **Legal sensitivity** — finance / health / legal advice multiplies disclosure + liability.
6. **Time-to-signal** — how fast can the first KPI move?

Sum ≥21/30 to launch. Pilots A, B, C scored 24, 22, 23 respectively (see Appendix A for the worked scoring).

### 5.4 Per-brand stack (uniform)
- Static Astro site on Cloudflare Pages
- One subdomain on a shared apex *or* a dedicated apex (TBD per brand)
- Plausible/CF Analytics + Supabase event stream
- Brand voice doc (markdown, in `brands/<slug>/voice.md`)
- Content backlog (`brands/<slug>/backlog/`) with queue states: idea → brief → draft → QA → staged → live
- One newsletter property
- One primary channel + one mirror channel (§3.3)

### 5.5 Scalability & evolution
- **Horizontal:** new brand = new folder + new Pages project + new analytics property. No HQ change.
- **Vertical (Scale-stage):** promoted brand gets its own Supabase project (data isolation), optional Ghost CMS, and a dedicated paid LLM budget line.
- **Operator-replaceable:** every workflow described as markdown checklists + n8n JSON exports, so the operator can step out for two weeks and a stand-in can run the lab from the repo.

---

## 6. Development roadmap

> The 14/30/60/90 cadence in `docs/01-roadmap.md` is preserved. Below is the expanded, sprint-level plan with deliverables, exit criteria, and dependencies.

### Phase 1 — Foundation (days 1–14)
**Goal:** repo + governance + secrets + research are execution-ready.
- D1–D3: Adopt this master plan; populate decision log with all locked decisions (§5.2, §3.4, §1.4).
- D4–D6: Stand up **1Password** vault; create *all* parent accounts using `account-naming-convention.md` patterns; populate `vault-template/account-registry-template.md` instances in vault, **not** in repo.
- D7–D9: Cloudflare account + Registrar; reserve apex domain(s) for HamMediaLabs and each pilot brand; DNS records minimal.
- D10–D11: Sign up for Gemini, Groq, OpenRouter (deposit $10 to unlock 1,000 RPD), Supabase, Plausible/CF Analytics; store keys in vault, mirror metadata into `providers/quota-tracker-template.md` instances.
- D12–D14: HQ skeleton repo additions: `core/router/` (LLM router), `core/scoring/`, `core/registries/`, `dashboards/app/`. CI: GitHub Actions for lint + secret-scanning (e.g., gitleaks).

**Exit criteria:** every parent account exists, MFA enabled, recovery codes vaulted; provider keys live and rate-tested; LLM router smoke-tests pass against Gemini + Groq + OpenRouter.

### Phase 2 — Core build (days 15–30)
**Goal:** the machine compiles and runs end-to-end on dummy content.
- D15–D18: Playwright `signup_core` finalised: human-pause gates, screenshot capture, registry-draft output. Then `signup_ai`, `signup_cms`, `signup_social` shells.
- D19–D22: Astro brand starter template under `brands/templates/site/`. Cloudflare Pages project provisioned. CI deploy via GitHub Actions.
- D23–D25: Dashboard v0 — Supabase schema (§12.4), Astro/Next dashboard reading registries + a stub `content_asset` table.
- D26–D28: n8n self-hosted (single tiny VPS or n8n.cloud free). Workflow 1 (trend → brief), Workflow 4 (weekly review) built first; Workflow 2/3 stubbed.
- D29–D30: End-to-end dry run on a *throwaway* brand "Lab-Zero": idea → brief → draft → QA → staged → manual publish to a private subdomain.

**Exit criteria:** Lab-Zero round-trip succeeds; dashboard shows the asset and its event trail; all secrets remain outside the repo (gitleaks green).

### Phase 3 — Pilot brands (days 31–60)
**Goal:** three brands publishing under T2/T3 governance with real audience contact.
- D31–D36: Brand A (AI Escape) launch — domain live, 5 cornerstone posts staged, newsletter set up, primary channel = Blog/SEO, mirror = X.
- D37–D42: Brand B (Corporate Satire) — primary = TikTok, mirror = Instagram. Satire disclosure footer per §3.4 carve-out.
- D43–D48: Brand C (UK Financial Escape) — primary = Blog/SEO, mirror = Reddit (manual). Stricter QA gate for finance content.
- D49–D54: Stabilise content cadence (target: 3 publishes/week/brand for blogs, channel-specific caps for socials). Wire each brand's analytics into HQ.
- D55–D60: First two weekly reviews executed end-to-end with real data. First "investigate" or "kill" candidates surfaced.

**Exit criteria:** all three brands publishing on schedule for 4 consecutive weeks; ≥80% of QA checklist pass-rate; zero policy incidents; weekly review meets in <60 minutes.

### Phase 4 — Decide (days 61–90)
**Goal:** at least one kill, one hold, one scale recommendation, with documented reasoning.
- D61–D75: Continue cadence. Layer monetisation **only on brand(s) with audience signal** (§9 Stage 3 criteria).
- D76–D85: Run the kill/hold/scale rubric (§12.3) twice (mid- and end-window).
- D86–D90: Produce post-mortems for each brand; promote one to a "Scale plan v1" (own DB project, paid-tier provider line, Tier-3 publishing).

**Exit criteria (90-day):** 3 brand post-mortems written; decision log entries for each kill/hold/scale; system bottleneck list with owners; second-cohort niche shortlist drafted.

### Phase 5+ — Months 4–12 (post-MVP)
- **Month 4:** First Tier-3 brand live; cohort 2 niche selection (3 candidates run through §5.3 rubric).
- **Month 5–6:** Cohort 2 launched (max 3 brands). Affiliate revenue tracking. ICO/cookie audit on monetised brands.
- **Month 7–9:** Re-validate provider matrix; consider paid Gemini / Cloudflare paid tier *only* for the scaled brand; introduce a second operator/contractor.
- **Month 10–12:** Year-end retrospective; rewrite this master plan as v2 from learnings; freeze year-2 strategy.

---

## 7. Team & operations

### 7.1 Roles (single-operator at MVP; identifying handover surface)
| Role | Phase 1–4 owner | Year-1 handover target | Trigger to hire / outsource |
|---|---|---|---|
| Lab Director (strategy, kill calls) | Operator | Operator | Permanent |
| Hydra Core engineer | Operator + Claude Code | Operator | Stable; revisit at scale |
| Brand editor (per brand) | Operator | PT contractor when brand reaches T3 | Brand revenue ≥£500/mo |
| Content QA reviewer | Operator | Same as editor | Same |
| Social ops (channel cadence) | Operator | VA / freelancer | When >2 active channels per brand |
| Finance & compliance | Operator | Accountant retainer | First £1k monthly net revenue |

### 7.2 Operating cadence
| Cadence | Activity | Owner | Output |
|---|---|---|---|
| Daily (≤15 min) | Infra & account health scan, alert triage | Operator | n8n digest |
| Twice-weekly (≤45 min) | Content QA + publish queue review | Operator | Approvals |
| Weekly (≤60 min) | Brand + agent + provider review (per `playbooks/weekly-review.md`) | Operator | Decision queue |
| Monthly (≤2 h) | Kill/hold/scale rubric, provider re-validation, decision-log audit | Operator | Decision log entries |
| Quarterly (≤4 h) | Strategy review, master plan delta | Operator | Master plan changelog |

### 7.3 Workflow design (RACI for the core loops)

**Brand launch loop**
- Niche idea — R: Operator | A: Operator | C: Claude (research) | I: decision log
- Score against §5.3 rubric — R: Operator | A: Operator
- Brand profile drafted (template) — R: Claude Code | A: Operator
- Account provisioning — R: Playwright | A: Operator (manual gates) | C: vault
- Site + analytics deploy — R: Claude Code + CI | A: Operator
- Cornerstone content — R: Claude Code + Operator edit | A: Operator | C: QA checklist
- Public launch — A: Operator (Tier-3 approval)

**Weekly review loop** — per `playbooks/weekly-review.md`, automated data pull from Supabase, manual decision.

### 7.4 Communications
- **Operator ↔ system:** the repo, the dashboard, and n8n notifications.
- **Outbound (audience):** brand newsletters + channel posts. No DMs at MVP.
- **Inbound (audience):** brand email aliases routed to a single inbox with labels.
- **Provider/platform incidents:** captured in `docs/15-decision-log.md` with a sub-section *Incidents*.

---

## 8. Marketing & outreach

### 8.1 Positioning (HamMediaLabs as a company, *not* per brand)
- **Audience-facing:** *zero*. HamMediaLabs is a holding/lab, not a consumer brand at MVP.
- **Operator-facing / community:** quiet build-in-public optional on a single channel (e.g. one X account or a personal blog). Not required for MVP.
- **Per-brand positioning** is owned at the brand profile level.

### 8.2 Per-brand acquisition playbook (uniform)
1. **Cornerstone content (×5):** longform pieces engineered for evergreen search.
2. **Search foundation:** clean sitemap, schema.org, internal links, original imagery (AI-generated, disclosed), real author identity (operator).
3. **Discovery surface:** primary channel posting on cadence; mirror channel reposts.
4. **Capture:** newsletter from week 1, single CTA per page.
5. **Community:** at least one comment-first presence (Reddit, niche forum) — *not* drive-by linking.
6. **Iteration:** monthly content audit — keep, refresh, retire.

### 8.3 Brand-specific channel emphasis
- **A (AI Escape):** SEO-first; X for distribution; YouTube Shorts as an experiment in month 2.
- **B (Corporate Satire):** TikTok-first; Instagram mirror; blog only as archive.
- **C (UK Financial Escape):** SEO-first (high-intent queries); Reddit for community signal; YouTube longform as experiment.

### 8.4 Messaging guardrails
- Plain-English headlines; no false urgency; no fake scarcity.
- Every monetised piece begins with explicit "why this matters / who this is for".
- AI disclosure visible above the fold on every page.
- Affiliate disclosure adjacent to the *first* affiliate link in every piece.

### 8.5 Measurement
Acquisition is measured per Brand Score (§12.2). No vanity metrics enter the kill/hold/scale call — the rubric explicitly down-weights raw follower count vs. engagement & conversion.

---

## 9. Monetization sub-plan

Preserves the maturity model in `docs/11-monetization.md`; below is the operational expansion.

### 9.1 Per-stage gate criteria
| Stage | Gate criteria (must meet ≥3) | Allowed tactics |
|---|---|---|
| 1 Validation | 4 consecutive weeks of publishing; >0 organic returning visitors; primary channel growth > flat; engagement rate above platform median | None paid; capture only |
| 2 Capture | 100 newsletter subs or 500 social followers; ≥1 evergreen ranking; CTR on internal CTA ≥1% | Newsletter, lead magnet, retargeting pixel |
| 3 Monetize | ≥1k monthly sessions or ≥1k engaged followers; ≥30% returning rate on blog or ≥3% engagement on social; clear audience problem statement | Affiliate, display (only after privacy compliance), sponsorship inbound, low-friction digital product |
| 4 Scale | ≥£300/mo from existing tactics for 2 months; CAC payback ≤90 days; ops complexity score green | Membership, premium content, partnerships |

### 9.2 Default monetisation tests by brand
- **A (AI Escape):** SaaS affiliate (productivity tools), £29–£49 digital template pack, newsletter sponsorship tier later.
- **B (Corporate Satire):** Stage 1 first; defer monetisation. Merch via print-on-demand once ≥10k followers.
- **C (UK Financial Escape):** Affiliate (banking, energy switching, debt consolidation — **with FCA-aware copy**, see §11.4), lead-gen partnerships, no sponsored content with finance advice claims.

### 9.3 Revenue model (expected case, year 1)
| Source | Brand | Mo 4 | Mo 6 | Mo 9 | Mo 12 |
|---|---|---:|---:|---:|---:|
| Affiliate | A | £50 | £150 | £400 | £800 |
| Digital product | A | — | — | £100 | £300 |
| Affiliate | C | £20 | £100 | £250 | £600 |
| Sponsorship/other | A/C | — | — | £100 | £300 |
| **Total run-rate** | | **£70** | **£250** | **£850** | **£2,000** |

(Brand B excluded from year-1 revenue model — treated as audience-only.)

### 9.4 ROI model
- **Costs (expected case, year 1):** ~£20–£50/mo infra (months 1–3), ~£50–£100/mo (months 4–9 once one provider goes paid), ~£100–£200/mo (months 10–12). Annualised: ~£900.
- **Revenue (expected case):** roughly £8,000 annualised by end of year 1 (back-loaded).
- **Person-hours:** ~10h/week × 50 weeks = 500h. Operator implicit hourly: ~£14 — purposely **below market**; the win is the option value of one scaled brand in year 2, not the cash in year 1.

### 9.5 Worst-case financial guardrail
Hard cap: **£75/month** in non-revenue-generating spend until the portfolio crosses £150/month run-rate. If any single provider line exceeds £25/month and isn't covering itself, it's auto-flagged at weekly review.

---

## 10. Risk management

### 10.1 Risk register (top 12)
| # | Risk | Likelihood | Impact | Score | Mitigation | Owner | Trigger |
|---|---|---|---|---|---|---|---|
| 1 | Free-tier collapse (e.g., Gemini further cuts) | High | Med | H | Multi-provider router; quarterly re-validation; $10 OpenRouter buffer pre-funded | Operator | Any provider RPD/TPM drops >30% |
| 2 | Parent-account credential compromise | Low | Critical | H | MFA everywhere; vault outside repo; tiered credentials; gitleaks in CI | Operator | Any unusual login alert |
| 3 | Platform ban on a brand account | Med | Med | M | Manual posting at Tier 2; conservative cadence; account-recovery plan documented | Operator | Strike or shadow-ban indicator |
| 4 | EU AI Act enforcement broadens (post Aug 2 2026) | Med | Med | M | Disclosure baked in; satire carve-out documented; quarterly legal scan | Operator | New guidance / case law |
| 5 | FTC enforcement (US traffic on Brand A/C) | Med | Med | M | First-link affiliate disclosure template; "AI-augmented" labelling; copies kept in repo | Operator | Any FTC sweep referencing similar verticals |
| 6 | AI-content quality collapse / "slop" reputation | Med | Med | M | Content QA checklist; human edit pass mandatory at Tiers 2/3; QA pass-rate KPI | Operator | QA pass-rate <80% |
| 7 | Operator burnout / time starvation | Med | High | H | Weekly cap on hours; kill rules used as designed; pause cohort 2 if behind | Operator | 2 consecutive missed weekly reviews |
| 8 | Single-provider dependency creep (e.g., 80% on Gemini) | Med | Med | M | Router default-load split; monthly traffic-share check | Operator | One provider >60% share |
| 9 | Supabase pause / data loss | Low | High | M | Daily heartbeat job; nightly Parquet snapshot to GitHub; no PII | Operator | Pause alert |
| 10 | Niche commoditisation (esp. Brand A) | Med | Med | M | Differentiate on perspective + originals; cornerstone-first | Operator | Ranking decay over 4 weeks |
| 11 | Affiliate program revocation | Low | Med | L | Diversified affiliate set; no single program >50% of brand revenue | Operator | Any non-trivial revenue source >50% |
| 12 | Repo leakage of secrets | Low | Critical | H | Pre-commit gitleaks, pre-push hook, no `.env` ever committed, template-only model | Operator | gitleaks alert |

### 10.2 Contingency playbooks (linked from `playbooks/`)
- **Account compromise:** existing `docs/09-security-and-secrets.md` IR steps (1) lock, (2) rotate, (3) blast radius, (4) audit, (5) registry update — promote to a numbered playbook `playbooks/incident-credential.md` in Phase 1.
- **Provider outage:** router auto-falls-back; if persistent, weekly review changes default routing weights.
- **Platform strike:** brand goes to "Pause publishing, archive content" within 24h; root cause logged before resumption.
- **Operator out-of-action:** all *in-flight* publishes are halted by config flag `HQ_PUBLISH_FREEZE=true`. Brands keep serving existing content. No automation runs writes.

### 10.3 Risk review cadence
- Risk register revisited at every monthly review.
- Any new risk scored ≥M added with a named mitigation owner.

---

## 11. Budgeting & finance

### 11.1 Capital separation
- HamMediaLabs operates from its **own** bank account / virtual card line, separate from HamNet/consulting.
- No client funds, no client credentials, no client data ever touches this lab. The decision log captures this as a standing constraint.

### 11.2 Monthly budget envelope (caps)
| Category | Months 1–3 | Months 4–9 | Months 10–12 |
|---|---:|---:|---:|
| Domains (amortised) | £2 | £2 | £4 |
| Hosting | £0 (CF Pages) | £0 | £0–£20 |
| DB / Auth | £0 (Supabase free) | £0 | £0–£25 |
| LLMs | £0–£10 | £10–£40 | £25–£75 |
| Email / Newsletter | £0 | £0–£15 | £15–£30 |
| Vault / 1Password | £3 | £3 | £3 |
| n8n VPS (if self-host) | £0–£5 | £5 | £5 |
| Misc (stock images / fonts) | £0 | £0–£10 | £10 |
| **Cap** | **£25** | **£75** | **£150** |

### 11.3 Funding requirement
- **MVP (months 1–3):** ≤£75 total. Self-funded.
- **Months 4–12:** ≤£1,000 self-funded.
- No external capital needed; this is by design — external capital would change the risk appetite and break the "kill fast" rule.

### 11.4 Unit economics (target)
- **CAC:** organic-first, so close to £0 cash; ~30 minutes of content per visitor at scale.
- **LTV:** placeholder; will be replaced with brand-specific numbers after Stage-2 capture data.
- **Contribution margin per piece:** revenue minus marginal LLM + image cost. Target ≥80% on blog content; ≥60% on video (after editing time costed at £20/h shadow rate).

### 11.5 ROI hurdle
A brand is kept only if projected 12-month contribution margin ≥3× its annualised infra + content cost. Anything below 1.5× is killed.

---

## 12. Legal, compliance & ethics (operational baselines)

### 12.1 Required per-brand legal pages (live before any monetisation)
- Privacy policy (data, analytics, cookies, contact, ICO/GDPR-aware).
- Cookie policy + banner (where any non-essential cookie is set; PECR-aware for UK traffic).
- Terms of service.
- Affiliate disclosure page + first-link inline disclosure.
- **AI use disclosure** — site-wide statement + per-page label where AI-augmented.
- Contact + complaints route (named operator, real email).

### 12.2 Per-content checks (added to `playbooks/content-quality-checklist.md` in Phase 1)
- Is any factual claim sourced?
- Does it cross into health / financial / legal advice territory? If yes → human SME review or downscope.
- Affiliate links present? → first-link disclosure inserted.
- AI-augmentation? → labelled appropriately for jurisdiction.
- Originality check (anti-duplication; cross-check top-2 SERPs for accidental paraphrase).

### 12.3 EU AI Act readiness (deadline 2 Aug 2026)
- Treat HamMediaLabs as a **deployer** of GPAI systems.
- For **text published to inform the public on matters of public interest** (likely subset of Brand A & C): include AI-augmentation disclosure on the page.
- For **satire / artistic** content (Brand B): include the existence-of-AI-generation disclosure in an appropriate way (e.g., footer + about page), not necessarily on every frame.
- Adopt the EU Code of Practice on AI-generated content when finalised (May–June 2026); decision-log the adoption.

### 12.4 FTC / UK ASA / FCA readiness
- FTC: clear, plain, *unavoidable* disclosure; do not bury in footer; do not rely on `#ad` in bio.
- UK ASA: `#ad` on every commercial post on every platform; no own-brand exception unless account name == brand name.
- **FCA (UK financial promotions, relevant to Brand C):** strict — avoid issuing or approving financial promotions; route monetisation only through authorised affiliate programs whose creatives are pre-cleared; *never* personalised financial advice.

### 12.5 IP & ToS
- Stock imagery: licensed or AI-generated with provider ToS reviewed and disclosure logged.
- Quotations: short, attributed.
- No scraping that violates target ToS; no automation against platforms that prohibit it (most social networks).

---

## 13. Performance monitoring (KPIs, scoring, dashboards)

### 13.1 KPI tree
```
Portfolio KPIs
 ├── Brand Score (per brand)         ← traffic + engagement + monetisation − ops − risk
 │     ├── Content Score (per asset) ← reach + engagement + conversion − cost
 │     ├── Channel Score (per ch.)   ← growth + engagement + ban-risk-adj
 │     └── Monetisation Score        ← revenue + diversification + compliance
 ├── Agent KPIs                      ← success rate, $/task, human-intervention rate
 ├── Provider KPIs                   ← quota %, failure rate, latency, cost/1k tokens
 └── Governance KPIs                 ← decision-log completeness, gate compliance %
```

### 13.2 Scoring formulas (v1; tuneable)
Let weights be normalised to sum to 1; all components scaled to [0,1].

**Content Score**
`CS = 0.30·reach + 0.25·engagement + 0.25·conversion − 0.10·prod_cost − 0.10·risk`

**Brand Score**
`BS = 0.30·traffic_growth + 0.20·engagement_quality + 0.25·monetisation_potential − 0.15·ops_burden − 0.10·platform_risk`

**Kill / Hold / Scale thresholds (per brand, evaluated weekly after week 4)**
- **Kill** if `BS < 0.30` for 2 consecutive weeks AND no monetisation in flight.
- **Hold** if `0.30 ≤ BS < 0.55`.
- **Scale candidate** if `BS ≥ 0.55` AND `monetisation_potential ≥ 0.6` AND `platform_risk ≤ 0.4`.

### 13.3 Dashboards (v1 spec — implements `dashboards/wireframe.md`)
- **Page 1 — Portfolio overview:** active/hold/kill/scale counts; total cost vs revenue; top mover; top risk.
- **Page 2 — Brand detail:** KPI trend (12-week sparkline), content output, channel growth, monetisation, provider dependency.
- **Page 3 — Provider health:** quota %, failure rate, latency, routing share, cost.
- **Page 4 — Decision queue:** brands flagged kill/hold/scale/investigate with one-click "approve recommendation" → writes decision-log entry.
- **Page 5 — Agent health (new):** per-agent task throughput, failure rate, $-spend, human-intervention rate.

### 13.4 Telemetry schema (HQ Supabase, normalised)
```sql
-- minimal canonical schema (Phase 2 deliverable)
brand(id, slug, niche, status, launch_date, primary_channel, secondary_channel)
content_asset(id, brand_id, url, title, type, topic, publish_date, ai_augmentation, status)
content_event(id, asset_id, ts, kind {impression|click|engagement|conversion|revenue}, value)
channel_event(id, brand_id, channel, ts, kind, value)
provider_event(id, provider, ts, kind {call|success|429|5xx}, tokens, cost_est)
agent_task(id, agent, started_at, ended_at, status, provider, tokens, cost_est, human_intervention)
decision(id, ts, scope {portfolio|brand|provider}, target_id, kind {kill|hold|scale|other}, reason, operator)
heartbeat(ts) -- keeps Supabase awake
```

### 13.5 Reporting cadence (matches dashboard tabs)
- **Daily:** infra & account health (n8n digest).
- **Weekly:** brand + content + agent (auto-generated → reviewed Saturday).
- **Monthly:** scale/kill review + provider re-validation.
- **Quarterly:** master plan delta.

---

## 14. Self-audit & internal consistency

### 14.1 Cross-component consistency
- §3.4 (regulation) ↔ §11 (legal pages) ↔ §13 (per-content checks): aligned — disclosure templates live in legal pages, enforced in content QA, audited via the decision log.
- §3.1 (provider quotas) ↔ §4.2 (router policy) ↔ §10 (risks) ↔ §11.2 (budget): aligned — quotas drive the fallback chain; budget caps prevent silent paid spillover.
- §5 (stack) ↔ §6 (roadmap) ↔ §7 (team): aligned — every Phase-2 deliverable has an owner (operator) and a target sprint.
- §1.5 (success metrics) ↔ §13.2 (formulas) ↔ §13.3 (dashboard): aligned — every portfolio metric maps to a dashboard module.

### 14.2 Conflicts resolved during this pass
- `docs/02-account-matrix.md` lists Vercel and Netlify as deployment stack; this plan downgrades them to "selective" because their commercial-use clauses are less generous than Cloudflare Pages and their bandwidth is metered. Vercel/Netlify remain *fallbacks*, not primary.
- `docs/14-provider-research-backlog.md` is open-ended; §3 here is the authoritative current snapshot (with explicit re-validation cadence).

### 14.3 Open questions / gaps to close in Phase 1
1. **Operator legal entity** — sole-trader vs. limited company? Decision needed before first £ of revenue (UK).
2. **VAT threshold tracking** — out of scope at MVP but flag at >£70k/year run-rate.
3. **Apex domain strategy** — one apex with subdomains per brand, or one apex per brand? Trade-off: SEO juice vs. brand independence. *Provisional:* one apex per brand for the three pilots; HamMediaLabs.* is corporate-only.
4. **n8n hosting** — self-host (£5/mo) or n8n.cloud free (limited)? *Provisional:* self-host on a £5 VPS; fallback to GitHub Actions cron.
5. **Editorial style guide** — needed before T2 content stops sounding generic. Authored during Phase 2.

---

## 15. Stakeholder feedback simulation (stress-test)

### "Investor" lens
> *"Where's the moat?"* — The moat isn't a brand; it's the **operating system + decision discipline**. The repo is the artefact. The portfolio approach is the hedge. Year-1 cash is intentionally light; year-2 optionality is the actual asset.

### "Technical lead" lens
> *"You're underestimating Playwright drift on signup forms."* — True; mitigation is human-pause gates at every step (no full autonomy) and screenshot evidence for replay. We accept that Playwright modules will rot and need re-recording; we budget that as part of monthly review.

### "Skeptical operator" lens
> *"Three brands at once with one operator is too many."* — Defensible because the *system* does the heavy lifting (templates, router, QA checklist) and because two of the three brands share a primary surface (SEO/blog). The cap of 3 is hard; the kill bar at week 8 prevents commitment escalation.

### "Compliance officer" lens
> *"FCA + Brand C are a landmine."* — Acknowledged. Brand C avoids personalised advice, restricts to *information* + pre-cleared affiliate creatives, and ships disclosure on every page. If FCA-promotion ambiguity grows, Brand C pivots to "cost-of-living journal" framing or is killed.

### "Audience" lens
> *"AI-generated stuff feels lazy."* — Disclosed, edited, opinionated. Quality checklist exists. Content Score down-weights generic listicles. If we can't beat the median human result, we don't ship.

---

## 16. Immediate next steps (the executable list)

Within 7 days of plan acceptance:
1. **Commit this plan** + decision-log entries for the locked decisions (§5.2 HQ stack, §3.4 disclosure posture, §1.4 objectives).
2. **Stand up 1Password vault**; create master Gmail, backup Gmail, GitHub, Cloudflare, password-manager accounts; enable MFA on all; store recovery codes.
3. **Set up gitleaks** as a pre-commit hook + GitHub Action.
4. **Sign up for Gemini, Groq, OpenRouter (with $10 deposit), Supabase, Plausible/CF Analytics, Cloudflare Registrar**; record metadata only into the repo registries, secrets only in vault.
5. **Reserve apex domains** for HamMediaLabs and the three pilot brands.
6. **Create `core/router/` skeleton** (TS) with provider drivers + a 30-second smoke test.
7. **Create `playbooks/incident-credential.md`** by promoting §9 of `docs/09-security-and-secrets.md`.
8. **Schedule the first weekly review** (calendar reminder, agenda = template from `playbooks/weekly-review.md`).
9. **Open decision-log entries** for the four open questions in §14.3 with a 14-day "must-decide-by" date.

---

## 17. References & sources (May 2026)

Provider & free-tier:
- Google AI for Developers — Rate limits: https://ai.google.dev/gemini-api/docs/rate-limits
- Google AI for Developers — Pricing: https://ai.google.dev/gemini-api/docs/pricing
- Groq — Rate limits: https://console.groq.com/docs/rate-limits
- OpenRouter — API rate limits: https://openrouter.ai/docs/api/reference/limits
- OpenRouter — Pricing: https://openrouter.ai/pricing
- Cloudflare Pages — Limits: https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Workers & Pages — Pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Supabase — Pricing: https://supabase.com/pricing
- Supabase — Billing: https://supabase.com/docs/guides/platform/billing-on-supabase

Regulation:
- EU AI Act, Article 50 (transparency obligations): https://artificialintelligenceact.eu/article/50/
- EU — Code of Practice on AI-generated content: https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content
- EU AI Act overview: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- UK ASA — Disclosure of AI in advertising: https://www.asa.org.uk/news/disclosure-of-ai-in-advertising-striking-the-balance-between-creativity-and-responsibility.html
- Osborne Clarke — UK Regulatory Outlook Jan 2026: https://www.osborneclarke.com/insights/regulatory-outlook-january-2026-advertising-marketing
- FTC AI endorsement guidance summaries (industry reads): https://www.affiversemedia.com/the-ftc-is-watching-ai-generated-endorsements-affiliate-links-and-what-compliance-looks-like-in-2026/
- FTC affiliate disclosure 2026 summary: https://www.auditsocials.com/blog/ftc-affiliate-disclosure-requirements-2026-guide

> Note on sourcing: provider quotas and regulatory documents change quarterly. Re-validate before each cohort launch using `automation/claude-code/prompts/provider-research.md`. Industry-blog summaries above are starting points; **canonical references are the provider/regulator pages**, which should be the ones cited in the decision log.

---

## Appendix A — Pilot-brand niche scoring (worked)

Scored 1–5 per criterion (§5.3); sum out of 30; launch threshold 21.

| Criterion | A: AI Escape | B: Corporate Satire | C: UK Financial Escape |
|---|:---:|:---:|:---:|
| Audience clarity | 4 | 5 | 5 |
| Monetisation density | 5 | 2 | 5 |
| Content reusability | 5 | 5 | 4 |
| Platform risk (5 = low) | 4 | 2 | 4 |
| Legal sensitivity (5 = low) | 4 | 4 | 2 |
| Time-to-signal (5 = fast) | 2 | 4 | 3 |
| **Total** | **24** | **22** | **23** |

Notes: Brand B's monetisation score is low by design (validation-only first); Brand C's legal-sensitivity score is the lowest and is offset by stricter QA + monetisation gating.

---

## Appendix B — File-map deltas to implement in Phase 1–2

```
/core/
  router/                  # LLM router (TS) — Gemini/Groq/OpenRouter drivers + failover
  scoring/                 # Brand/Content/Kill formulas (TS) with unit tests
  registries/              # CRUD over Supabase tables (no secrets)
  jobs/heartbeat.ts        # Supabase keep-alive
/dashboards/app/           # Astro/Next dashboard
/brands/templates/site/    # Astro starter
/playbooks/
  incident-credential.md   # promoted from docs/09
  provider-revalidation.md # new; runs every quarter
/docs/
  17-style-guide.md        # new; brand-voice & inclusive-language base
  18-disclosure-templates.md # canonical AI/affiliate/cookie copies
```

---

*End of master plan v1.0.*
