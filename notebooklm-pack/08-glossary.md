# 08 — Glossary

Canonical project vocabulary. When two terms could be used,
this glossary names which one the lab uses.

## A

**AI Escape.** Working title of Brand A (applied AI for working
professionals). Operator verifies domain availability before
lock. See `brands/brand-a-aiescape/profile.md`.

**Anti-voice (§5).** The deliberate list of phrases / framings /
tonal moves a brand will never use. Lives in §5 of every
brand's `voice.md`. Used at QA-time as a stop-list.

**`affiliateInPlay`.** A site-config flag (`brands/brand-a-aiescape/site/src/site.config.ts`)
that gates whether an affiliate disclosure block is rendered.
**`false` at launch** for Brand A; flipped only after a
programme-onboarding PR.

**Astro 4.x.** The locked Astro version across the dashboard
and brand sites. Migration to 5.x then 6.x is staged per
`docs/astro-security-upgrade-plan.md`.

**Audit table** (Dependabot). The operator-side audit framework
in `docs/dependabot-security-audit.md` — what gets audited,
when, by whom, with what evidence.

## B

**Brand A.** AI Escape. The launch brand. Primary channel: SEO
blog. Secondary: X.

**Brand B.** Corporate Satire (working title TBD). Primary
channel: TikTok. Validation-only in year one. Gated behind
Brand A's day-30 outcome.

**Brand C.** UK Cost-of-Living (working title TBD). Highest
compliance gate (FCA / vulnerable-reader / charity-link-at-
top). Gated behind Brand A's day-30 outcome AND a Brand-C-
specific launch checklist.

**Brand Score (`BS`).** The portfolio-level brand quality
metric. Formula: `0.30·traffic_growth + 0.20·engagement_quality
+ 0.25·monetisation_potential − 0.15·ops_burden −
0.10·platform_risk`. Lives in `core/scoring/scoring.ts`. Used
to drive kill / hold / scale verdicts.

**Buttondown.** The free-tier newsletter platform used at MVP
(≤ 100 subs). Sends via iframe opt-in form.

## C

**Capture stage (Stage 2).** The monetisation stage where
newsletter / lead-magnet / retargeting are allowed.

**Character bio.** §1 of every brand's `voice.md`. A 1–2
paragraph persona biography that gives the brand a real-feeling
human voice (per `docs/voice-authenticity-system.md`).

**CharityBlock.** The Astro component
(`brands/brand-c-ukescape/site/...` future) that renders the
charity-link block at the top of every Brand C vulnerable-
reader page. Three links (MoneyHelper / Citizens Advice /
StepChange) + National Debtline.

**Claude Code.** The primary engineering and governance agent
(this agent). Operates inside the one-issue-one-PR workflow.

**Cloudflare Pages.** Primary static host for brand sites and
the dashboard. Free tier: unlimited bandwidth, 500 builds/mo,
20K files/site, 25 MiB/file, 20-min build timeout.

**Codex.** Cloud multi-agent code review (`/ultrareview`).
User-triggered; billed per call.

**Content Score (`CS`).** Per-asset quality metric. Formula:
`0.30·reach + 0.25·engagement + 0.25·conversion −
0.10·prod_cost − 0.10·risk`. Lives in `core/scoring/scoring.ts`.

**Cornerstone.** A longform piece engineered for evergreen
search. Each brand has 5 cornerstones in the first 90 days.

## D

**Decision log (`docs/15-decision-log.md`).** The canonical
mirror of every strategic decision. Inline entries are
mandatory per the standing rule.

**Dependabot.** GitHub's automated dependency update bot. The
lab's posture: 4 npm ecosystems + GitHub Actions; **auto-merge
OFF**; weekly audit per the security framework.

**Deployer.** The lab's regulatory role under EU AI Act
Article 50: the entity using a GPAI system and bearing the
disclosure obligation.

**Drift watcher.** The test `core/scoring/sync-with-dashboard.test.ts`
that reads `dashboards/app/src/lib/scoring.ts` (and `lib/quota.ts`)
as plain text and fails if the values diverge from `core/`.

## E

**EU AI Act, Article 50.** The EU's transparency obligation
on AI-generated content. Enforcement: 2 August 2026.
Disclosure required for AI-generated text "intended to inform
the public on matters of public interest". Satire carve-out
applies to Brand B with a different disclosure variant.

**EEAT.** Experience, Expertise, Authority, Trust — the Google
quality framework. The SEO moat plan (`docs/seo-moat-plan.md`)
maps brand voice authenticity to EEAT mechanics.

**Expansion gate (`docs/portfolio-expansion-gate.md`).** The
binding criteria for unfreezing Brand B (§3) and Brand C (§4)
after Brand A's day-30 review.

## F

**FCA.** UK Financial Conduct Authority. Brand C's binding
perimeter — `brands/brand-c-ukescape/qa/fca-perimeter.md`
defines what content does and does not cross the financial-
promotion boundary.

**Free-first.** The lab's foundational posture: every layer
runs on a free tier by default; paid lines are added only
through the 5-step gate.

**FTC.** US Federal Trade Commission. May 2026 AI endorsement
guidance binds the lab's affiliate-disclosure copy. Civil
penalty ceiling: $51,744 per violation.

## G

**Gemini Free.** Google's free-tier Gemini API + Gemini
chat. Used as the lab's design specialist (Astro + Tailwind
visual starter code) and as the long-context / planning model
in the router. Never owns governance.

**gitleaks.** The pre-commit / CI tool that scans for leaked
secrets. Provider-specific patterns in `.gitleaks.toml`.

**Groq.** A high-TPM inference provider. Free tier: 30 RPM,
6K TPM (model-dependent), 1,000 RPD. Used for fast variations
in the router.

## H

**HamMediaLabs.** The parent media-lab entity. Operates
ProjectHydra. Single founder-operator.

**HamNet.** The operator's consulting business. **Strictly
separate** from HamMediaLabs. No client funds / credentials /
data ever touch the lab.

**Head (Hydra Head).** A brand vehicle. The lab can have at
most 3 active heads at MVP per the portfolio cap.

**Heartbeat.** The daily Supabase keep-alive ping that
prevents the free-tier 7-day inactivity pause. Runs in
`.github/workflows/heartbeat.yml`.

**HQ.** Hydra Core / HQ — the central control plane (router,
scoring, telemetry, dashboard, governance corpus, decision
log).

**Hydra Core.** Same as HQ.

## I

**Informational variant (AI use disclosure).** The standard AI-
augmentation disclosure for non-satirical brands (Brand A,
Brand C). Lives in `docs/18-disclosure-templates.md` §1.

## K

**Kill / hold / scale.** The three weekly verdict states for
every brand. Thresholds: kill (BS < 0.30 for 2 weeks + no
monetisation), hold (0.30 ≤ BS < 0.55), scale (BS ≥ 0.55 +
monetisation potential ≥ 0.6 + platform risk ≤ 0.4). Lives
in `core/scoring/scoring.ts` `verdict()`.

## L

**Launch pack.** A single-folder operator runbook bridging
governance to launch day. `launch-packs/brand-a-mvp/` is the
canonical one (11 files).

**LLM router (`core/router/`).** The TypeScript router that
sends inference calls to Gemini / Groq / OpenRouter with
documented failover. Failover policy: Gemini Flash → Groq
Llama → OpenRouter DeepSeek-V3:free → Cloudflare Workers AI.

## M

**Master plan (`docs/PROJECTHYDRA-MASTER-PLAN.md`).** The
canonical 730-line strategy document. Source of truth for
strategy.

**MFA.** Multi-factor authentication. Required on every
parent account before launch.

**Money-touching page.** Any Brand C page that discusses
money, costs, switching providers, debt, benefits, etc.
Triggers the FCA disclaimer block above the byline.

**Monetisation potential.** Component of Brand Score (range
[0, 1]). Drives the scale-candidate verdict gate.

## N

**National Debtline.** One of the three signposted UK charity
resources on Brand C vulnerable-reader pages (MoneyHelper /
Citizens Advice / StepChange / National Debtline).

**NotebookLM.** Google's notebook tool. Consumes this
distilled pack. Used for understanding, not for content
generation.

## O

**Operator.** The single human founder running HamMediaLabs.
Final approver on every publish, every paid line, every
governance change.

**OpenRouter.** Inference provider. Free: 20 RPM, 50 RPD;
1,000 RPD after ≥ $10 deposit. Used as the failover lane.

**Owned-audience share.** The fraction of total brand
audience that the operator owns directly (newsletter
subscribers) vs. platform-mediated. Dashboard `/` card.

## P

**PECR.** UK Privacy and Electronic Communications
Regulations. Newsletter must include a postal address —
hence the `site.config.ts` operator-address placeholder.

**Persona owner.** The named human (the operator at MVP) who
owns voice authenticity for a brand. Reads / watches every
draft aloud as part of QA.

**Phase A / B / C / D** (cost). The four scenarios in
`docs/profit-model.md` — £0 hobby / £50 controlled / £250
growth / £1k serious. The dashboard `/cost` page surfaces
which scenario the lab is currently tracking.

**Phase 1 / 2 / 3 / 4 / 5+** (roadmap). The five-phase plan
in `docs/PROJECTHYDRA-MASTER-PLAN.md` §6. Foundation / Core
build / Pilot brands / Decide / post-MVP.

**Phase 6 / 7 / S.** Internal sub-phase tracking inside
Phase 3 for governance work. All landed by 2026-05-16.

**Platform risk.** Component of Brand Score (range [0, 1]).
Higher = riskier. Drives the scale-candidate verdict gate
(must be ≤ 0.4).

**Playbook.** An operational checklist (lives in
`playbooks/`). 15 playbooks at present.

**Plausible CE.** Self-hosted privacy-friendly analytics.
The lab's primary analytics option (alternative: Cloudflare
Web Analytics).

**ProjectHydra.** The operating system inside HamMediaLabs.
This pack distils ProjectHydra.

**Provider revalidation.** Quarterly cadence that re-verifies
provider free-tier ceilings. Playbook:
`playbooks/provider-revalidation.md`.

**Publish workflow.** The brand-specific document
(`brands/<slug>/publish-workflow.md`) that walks the actual
publish sequence end-to-end.

**Punch up.** Brand B's defamation guard: comedy targets the
powerful (consultants, all-hands, OKR culture), never juniors,
support staff, or named individuals.

## Q

**Quota registry (`core/providers/quota-registry.ts`).** The
canonical TS file listing every free-tier ceiling. Mirrored
to `dashboards/app/src/lib/quota.ts` with SYNC POINT
comments + drift-watcher test.

## R

**RLS.** Row-Level Security in Supabase. Enabled on every
table in `core/db/schema.sql`.

**RPD / RPM / TPM.** Requests per day / requests per minute /
tokens per minute. The free-tier limits the router respects.

## S

**Satire variant (AI use disclosure).** The disclosure
variant for Brand B. Disclosure shown in the first 3 seconds
of every clip + on the about page; does not need to render
on every frame. Per EU AI Act Article 50 carve-out.

**Scoring formulas.** Content / Brand / Verdict. Live in
`core/scoring/scoring.ts`. Drift-watched against the
dashboard.

**Service-role key.** Supabase's Tier 1 secret. Server-side
only. Never logged, never client-side. Telemetry write tests
confirm this.

**SEO moat (`docs/seo-moat-plan.md`).** The plan that maps
voice authenticity → EEAT → AI-search citation behaviour.

**Source intelligence.** The pipeline that turns weekly trend
signals into brand-content briefs. Governance lives in
`docs/source-intelligence-governance.md`; weekly cadence in
`playbooks/source-intelligence-weekly.md`.

**Stage 1 / 2 / 3 / 4** (monetisation). Validation / Capture /
Monetize / Scale. Brand-level. Gates revenue tactics per
master plan §9.1.

**Supabase.** Postgres-as-a-service with auth + storage. Free
tier: 2 projects, 500 MB DB, 1 GB storage, 5 GB egress, 50K
MAU, **7-day inactivity pause**.

**SYNC POINT.** Comment marker in `core/scoring/scoring.ts`,
`core/providers/quota-registry.ts`, and their dashboard
mirrors. Used by the drift watcher to detect divergence.

## T

**T0 / T1 / T2 / T3 / T4.** Governance tiers (`docs/03-governance.md`).
T0 planning / T1 read-only / T2 draft-only / T3 publish-with-
approval / T4 autonomous (**frozen for year one**).

**Tier 1 / 2 / 3 secret.** Secret-criticality tiers per
`docs/09-security-and-secrets.md`. Tier 1 = service-role key.

**Telemetry event.** A `TelemetryEvent` written to Supabase
via `core/telemetry/supabase.ts`. Mapped to `provider_event`
or `agent_task`.

**Tldr.** The standard top-of-article TL;DR block (Astro
component) — present in every Brand A cornerstone.

## V

**Verdict.** The output of `core/scoring/scoring.ts` `verdict()`
— `kill` / `hold` / `scale`.

**Voice authenticity (`docs/voice-authenticity-system.md`).**
The lab's voice moat: persona biography, voice contrasts,
voice DNA, anti-voice, house examples. Operationalised in
every brand's `voice.md` and `house-examples.md`.

**Voice contrasts (§2).** Defines a brand in tensions ("warm
but not saccharine"). §2 of every `voice.md`.

**Voice DNA.** §3 of every `voice.md`. Sentence-cadence,
preferred verbs, specific syntactic moves.

**Voice fidelity gate.** `playbooks/voice-fidelity-checklist.md`.
Mandatory pass before any draft publishes.

**Vulnerable reader.** A Brand C audience member in debt,
facing eviction, on benefits, mental-health-affected. Pages
with `vulnerable_reader_topic: true` carry the charity-link
block **at the top of the body**. No affiliate link appears
above that block.

## W

**Weekly review (`playbooks/weekly-review.md`).** The
operator's Saturday cadence. ≤ 60 minutes. Outputs decision-
queue + decision-log entries.

## X

**X (Twitter).** Brand A's secondary channel. Brand B's
secondary channel (mirror). Hostile platform per
`docs/x-platform-risk.md`; conservative cadence ceilings
binding.

## Cross-references

This glossary is the canonical vocabulary anchor; the
authoritative definition of any term still lives in the doc
this glossary cites. When the two disagree, the cited doc
wins.
