# 00 — Executive Summary

## What HamMediaLabs is, in one paragraph

HamMediaLabs is a **single-founder, free-first, AI-augmented
media lab**. Inside it sits **ProjectHydra**, the operating
system: one central control plane (HQ) that launches,
instruments, governs, and prunes a small portfolio of lightweight
brands. The brands (Hydra "heads") are experiments; the operating
system is the durable asset. The thesis is that **decision
discipline plus cheap infrastructure plus disclosed AI use** can
beat ad-hoc, emotional content businesses on cost-per-validated-
brand and on platform-risk exposure.

## Why this project exists

The operator has watched many "I'll start a content brand" and
"I'll run a few AI sites" projects waste a year on undisciplined
experiments. The lab is the opposite shape:

- **Mechanical kill rules** rather than emotional attachment.
- **Free-first stack** rather than premature paid infrastructure.
- **One repo as the operations manual** rather than tribal
  knowledge in someone's head.
- **Disclosed, audited AI use** rather than hiding it (the
  2026 regulatory regime — EU AI Act Article 50, FTC May 2026
  endorsement guidance, UK ASA Active Ad Monitoring — punishes
  hidden AI; the lab leans into disclosure as a moat).
- **Human-gated publishing** rather than autonomous publishing,
  for the entirety of year one.

## Strategic moat

Three layered moats:

1. **Operating-system moat.** The repo is the moat. A new
   operator could clone it and run the lab from the docs alone.
   Templates, playbooks, prompt library, scoring formulas,
   provider router, dashboard, launch pack — all in-tree, all
   versioned. This compounds.
2. **Voice-authenticity moat.** Each brand has a documented
   persona (character bio, voice contrasts, anti-voice, house
   examples, watch-aloud / read-aloud QA). Generic AI slop loses
   to specific human voice; the system is set up to enforce
   specificity. See `docs/voice-authenticity-system.md`.
3. **Compliance-as-moat.** Most AI-content competitors will
   stumble over disclosure obligations in 2026. The lab's
   disclosure templates (`docs/18-disclosure-templates.md`),
   FCA-aware Brand C posture (`brands/brand-c-ukescape/qa/`),
   and AI-use-on-page rules are already in place. Compliance
   becomes a competitive advantage, not a tax.

## What has been built (as of 2026-05-16)

The lab is **operator-ready for Brand A manual launch**. CI is
green. 38/38 unit tests pass. Zero secrets in repo.

Concretely:

- **HQ control plane**
  - LLM router (`core/router/`) — Gemini / Groq / OpenRouter
    drivers with documented failover policy.
  - Scoring (`core/scoring/`) — Content / Brand / Verdict
    formulas with kill / hold / scale thresholds.
  - Telemetry (`core/telemetry/`) — events into Supabase
    `provider_event` + `agent_task` (service-role key is
    server-side only).
  - Provider quota registry (`core/providers/quota-registry.ts`)
    — canonical free-tier ceilings, revalidated quarterly.
  - DB schema (`core/db/schema.sql`) — brand / content_asset /
    content_event / channel_event / provider_event / agent_task
    / decision / heartbeat / source_signal, all with RLS.
- **HQ dashboard** (`dashboards/app/`)
  - Static Astro. 4 pages: `/` (overview), `/cost`, `/decisions`,
    `/experiments`. Server-rendered; no client islands.
- **Three brand pipelines**
  - **Brand A — AI Escape** (`brands/brand-a-aiescape/`):
    profile + voice + cornerstone briefs + drafts + prompts +
    QA + house examples + instantiated site + launch pack.
    Build-ready.
  - **Brand B — Corporate Satire** (`brands/brand-b-corpsatire/`):
    profile + voice + cornerstone briefs + house examples +
    QA (satire-rules + defamation gate) + draft template.
    Audience-validation-only; gated behind Brand A proof.
  - **Brand C — UK Cost-of-Living** (`brands/brand-c-ukescape/`):
    profile + voice + cornerstone briefs + house examples +
    QA (FCA perimeter + vulnerable-reader + affiliate redlines)
    + draft template. Publishing gated behind a future Brand C
    launch checklist.
- **Launch pack** (`launch-packs/brand-a-mvp/`): 11-file
  operator runbook bridging governance to Brand A's first
  publication.
- **Design handoffs** (`design-handoffs/`): six Gemini briefs,
  a 14-section output-review checklist, the six Claude pre-
  Gemini subagents, and the binding pre-flight checklist.
- **Governance corpus** (`docs/`): master plan, business plan,
  unit economics, profit model, cost control, legal &
  resilience, voice system, SEO moat, monetisation
  architecture, X platform risk, source intelligence, Astro
  upgrade plan, portfolio expansion gate, measurement
  framework, decision log (mirror of all strategic decisions).
- **Playbooks** (`playbooks/`): 15 operational checklists
  covering weekly review, incident credential, provider
  revalidation, voice fidelity, kill / hold / scale, brand
  launch, content quality, account recovery, platform-strike
  response, source-intelligence-weekly, package hygiene,
  quarterly platform refresh, first week, weekly experiment,
  weekly-review-brand-a-launch.
- **Security floor**
  - `.github/workflows/ci.yml` — typecheck + test + gitleaks on
    every push/PR.
  - `.github/workflows/heartbeat.yml` — daily Supabase ping.
  - `.github/dependabot.yml` — npm × 4 ecosystems + GitHub
    Actions; auto-merge OFF.
  - `.gitleaks.toml` — provider-specific patterns.

## Current state (one-paragraph operator summary)

Brand A can launch. Brand B can begin audience-only recording.
Brand C waits for its own launch checklist. The repo has more
governance than most year-five media projects manage; the
antidote to over-planning is launching. The only repo-side
blockers to launch are operator-side prerequisites (real name /
email / postal address in `site.config.ts`, Buttondown form,
Cloudflare Pages project) — none of which are repo work.

## What must happen next

In order:

1. **Operator launches Brand A** using
   `launch-packs/brand-a-mvp/08-launch-day-script.md` once the
   site-config placeholders are replaced.
2. **30-day post-launch review** per
   `playbooks/weekly-review-brand-a-launch.md`. Pass / fail
   determines whether Brand B or Brand C unfreeze
   (`docs/portfolio-expansion-gate.md`).
3. **Quarterly platform refresh** (next due: first business
   week of July 2026) per
   `playbooks/quarterly-platform-refresh.md` — revalidates
   provider quotas, regulatory deltas, dependency posture.
4. **Brand B production loop** (audience-only) iff Brand A
   passes its day-30 gate.
5. **Brand C launch checklist** (mirrors Brand A's) iff Brand A
   passes its day-30 gate and the FCA / vulnerable-reader
   guards still hold.

What does **not** happen next:

- No autonomous publishing (Tier 4 frozen for year one).
- No paid spend outside the 5-step gate
  (`docs/cost-control-and-free-tier-plan.md` §5).
- No second brand launched before Brand A's day-30 outcome.
- No affiliate links on Brand A until Stage 3 monetisation
  criteria pass.

## What the lab is NOT

- Not a single-niche publisher. (The portfolio is the hedge.)
- Not a content agency. (No client work touches this lab.)
- Not a venture-funded play. (External capital would change the
  risk appetite and break the kill rule.)
- Not autonomous. (Every publish is human-approved; this is by
  design.)
- Not free. There's a hard £50/month MVP ceiling, but the lab
  runs at near-zero standing cost in practice.

## The single sentence

**HamMediaLabs is a free-first, governance-rich, AI-augmented
portfolio media lab that turns brand creation into a measurable,
repeatable process with explicit kill rules, disclosed AI use,
and a human at every publish gate for the entirety of year one.**
