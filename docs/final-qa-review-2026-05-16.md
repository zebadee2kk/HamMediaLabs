# Final QA Review — HamMediaLabs / ProjectHydra

> **Date:** 2026-05-16.
> **Reviewer:** Autonomous Claude run (closing #65).
> **Audience:** Operator + ChatGPT review.
> **Posture:** governance + coherence + safety. No new architecture
> introduced; tightly scoped corrections only.

---

## 1. Executive summary

The repo is **operator-ready for Brand A manual launch** under the
existing governance frame. CI is green; all builds green; cross-doc
references resolve; brand identity, compliance, and disclosure
rules are coherent across all three brands. **No autonomous
publishing pathway exists anywhere**, by construction.

**Findings worth surfacing:**

1. **`docs/15-decision-log.md` is behind reality** for the
   late-phase autonomous run (≈10 PRs landed without filing their
   inline decision-log entry per the standing rule). The PR
   descriptions captured the reasoning; the log just needs to
   reflect it. **Corrected in this PR (§4.1).**
2. **Dependabot PR #70** ships the same Astro 4 → 6 bundle that
   PR #12 originally proposed, now spanning the new Brand A
   site. **Same defer rationale applies** per
   `docs/astro-security-upgrade-plan.md`. **Comment posted (§4.2).**
3. **#56 branch hygiene** remains operator-runnable; the MCP
   connector still cannot delete branches (HTTP 403). **No
   change to existing posture.**
4. **Coordinators #38 and #57 are stale**: their forward queues
   are complete. The operator may close them; this PR does not
   close issues on behalf of the operator.
5. **Research-refresh items** identified for the next quarterly
   pass (§5).

No conflicting instructions found between docs. No autonomous-
publishing leak. No paid-spend implication outside `docs/cost-control-and-free-tier-plan.md`. No Brand C publish-readiness drift.

## 2. What was reviewed

### 2.1 Core strategy / architecture
- `docs/PROJECTHYDRA-MASTER-PLAN.md` — present; canonical; cross-
  references resolve.
- `ARCHITECTURE.md` — covers router, scoring, jobs, data flow;
  consistent with `core/*` reality.
- `docs/README.md` — index reflects current doc inventory
  (verified by `ls docs/` vs index entries).
- Coordinator issues #38, #57 — forward queues complete; operator
  to close.

### 2.2 Governance / safety
- `docs/09-security-and-secrets.md` — Tier framework with
  Supabase service-role key explicitly Tier 1.
- `docs/x-platform-risk.md` — X cadence ceilings, link policy,
  disclosure, scheduling rules.
- `docs/legal-and-resilience.md` — entity ladder, MFA, no real-
  person synthesis lab-wide, paid-legal-advice triggers, tax
  baseline.
- `docs/18-disclosure-templates.md` — canonical AI / affiliate /
  privacy / terms / FCA copy.
- `docs/voice-authenticity-system.md` — voice moat spec;
  operationalised in `brands/templates/voice-template.md` and
  `brands/templates/house-examples-template.md`.
- `docs/source-intelligence-governance.md` — operating principles
  + per-source approved/deferred/forbidden methods.
- `docs/cost-control-and-free-tier-plan.md` — £0 MVP stack +
  £50/mo ceiling + 5-step paid-line gate.
- `docs/business-plan.md` / `docs/unit-economics.md` /
  `docs/profit-model.md` — coherent set covering operating
  model + per-unit numbers + scenarios.
- `docs/monetization-architecture.md` — trust-first; per-surface
  kill switches; banned funnels / dark patterns / editorial-
  corruption.

### 2.3 Brands
- **Brand A (`brands/brand-a-aiescape/`)**: profile + voice +
  cornerstone-briefs + drafts (cornerstone 1 ready) + prompts +
  qa + house-examples + site instantiated; launch checklist /
  publish workflow / first-three / launch pack all present.
- **Brand B (`brands/brand-b-corpsatire/`)**: profile + voice
  (full template-conformant) + cornerstone-briefs + house-
  examples + prompts + qa (checklist + satire-rules + defamation
  + affiliate-disclosure) + templates/_draft-template.
- **Brand C (`brands/brand-c-ukescape/`)**: profile + voice +
  cornerstone-briefs + house-examples + prompts + qa
  (checklist + fca-perimeter + vulnerable-reader + affiliate-
  redlines) + templates/_draft-template. **Publishing NOT
  authorised** until a launch checklist pass (mirrors Brand A
  pattern; deferred follow-up).

### 2.4 Operations
- `docs/measurement-framework.md` + `playbooks/weekly-experiment.md`
  — north-stars per brand, leading/lagging, attribution,
  experiment template.
- `playbooks/weekly-review.md` — extended with X-platform-risk +
  cost-gate + experiment-status sections.
- `playbooks/weekly-review-brand-a-launch.md` — 30-day launch
  supplement.
- `launch-packs/brand-a-mvp/` — 11-file self-contained launch
  runbook; resolves to all governance docs.
- `design-handoffs/` — 6 Gemini briefs + 14-section output
  review checklist.

### 2.5 Engineering
- `core/router/` — Gemini / Groq / OpenRouter drivers; failover
  policy; telemetry hook. 4 unit tests green.
- `core/scoring/` — `brandScore` / `contentScore` / `verdict`. 9
  unit tests green.
- `core/telemetry/supabase.ts` — TelemetryEvent → `provider_event`
  + `agent_task`. 9 unit tests green.
- `core/providers/quota-registry.ts` — May-2026-validated
  ceilings with validator. 13 unit tests green.
- `core/db/schema.sql` — `brand` / `content_asset` /
  `content_event` / `channel_event` / `provider_event` /
  `agent_task` / `decision` / `heartbeat` / `source_signal`.
  RLS on every table.
- `dashboards/app/` — 4 pages built; `/` overview + `/cost` +
  `/decisions` + `/experiments`. Server-only secrets.
- `brands/brand-a-aiescape/site/` — 7 pages built; Astro 4.x
  pinned; `affiliateInPlay: false` at launch.

### 2.6 CI / security
- `.github/workflows/ci.yml` — typecheck + test + gitleaks on
  every push/PR. Green throughout the autonomous run.
- `.github/workflows/heartbeat.yml` — daily scheduled Supabase
  heartbeat.
- `.gitleaks.toml` — provider-specific secret patterns;
  allowlist for templates / docs only.

## 3. Findings & risk ratings

| # | Finding | Severity | Action |
|---|---|---|---|
| F1 | Decision-log behind reality for late-phase PRs (Phase 6.6 / 6.7 / 6.8 / 6.9 / 7.1 / 7.2 / 7.3 / S / Launch Pack / Gemini) | Low (audit-trail completeness, not a safety issue) | **Corrected in §4.1** — batched entries added |
| F2 | Dependabot PR #70 = same Astro 4→6 bundle as #12 across 3 dirs now | Low (XSS does not apply per `astro-security-upgrade-plan.md`) | **Comment posted in §4.2**; recommend closure |
| F3 | #56 connector cannot delete branches; 27 merged feature branches remain on `origin` | Low (cosmetic; operator-runnable) | No new action; existing comment on #56 documents the path |
| F4 | Coordinators #38, #57 forward queues complete; should be closed | Low | Operator closes; this PR does not close issues |
| F5 | Dashboard `lib/scoring.ts` + `lib/quota.ts` duplicate `core/scoring/` + `core/providers/quota-registry.ts` constants | Medium (drift risk) | Already documented in both files; quarterly platform-refresh covers it (§13 of `seo-moat-plan.md` + provider revalidation playbook) |
| F6 | `brands/brand-a-aiescape/site/src/site.config.ts` carries explicit "replace before launch" placeholders for operator name / email / postal address | By design (launch-checklist §3 catches this) | No correction needed |
| F7 | No `posts/` folder in the new Brand A site yet | By design (operator creates at launch per `08-launch-day-script.md`) | No correction needed |
| F8 | Research-refresh items overdue / candidates for the next quarterly review | Low (quarterly cadence covers) | Listed in §5 |

No high-severity findings. No P0/P1 security findings (mirrors the §1.4 Dependabot prioritisation in `docs/dependabot-security-audit.md`).

## 4. Corrections made (this PR)

### 4.1 Decision-log batched update

Eleven entries added to `docs/15-decision-log.md` corresponding to
the PRs that landed without inline log entries during the
autonomous run. Format matches the document's preamble (Date /
Decision / Reasoning / Alternatives / Risks / Revisit date).

The entries cover:

- Phase 6.6 — quarterly platform-refresh cadence adopted.
- Phase 6.7 — monetization architecture adopted; trust-vs-monetisation
  tension map binding.
- Phase 6.8 — £0 MVP stack + £50/mo ceiling + 5-step paid-line gate
  binding.
- Phase 6.9 — business plan / unit economics / profit model adopted
  as canonical financial framing.
- Phase 7.1 — Brand A MVP site instantiated; `affiliateInPlay:
  false` at launch.
- Phase 7.2 — HQ dashboard expansion shipped; placeholder rows
  explicitly tagged.
- Phase 7.3 — portfolio expansion gate binding.
- Phase S — Dependabot security audit framework + package-hygiene
  playbook adopted; PR #12 / #70 deferred per the staged Astro
  plan.
- Launch Pack — `launch-packs/brand-a-mvp/` adopted as the
  canonical bridge from governance to launch.
- Gemini Design Specs — `design-handoffs/` adopted; 14-section
  output review checklist binding.

### 4.2 Dependabot PR #70 comment

A comment posted on PR #70 pointing at
`docs/astro-security-upgrade-plan.md` and recommending closure,
mirroring the PR #12 pattern. Same XSS-doesn't-apply rationale
(no client islands; static-only output) holds across all three
Astro consumers.

### 4.3 Stale coordinator note

This review names #38 and #57 as complete (their queues fully
landed). The operator can close them when ready; this PR does
not close issues on the operator's behalf.

## 5. Research-needed inventory (for next quarterly refresh)

Live-research candidates the operator (or ChatGPT) should verify
against current public sources before any item moves the lab
materially:

| Topic | Why now | Source-of-truth |
|---|---|---|
| Gemini free-tier RPM / RPD / TPM | December 2025 cut; quarterly cadence | https://ai.google.dev/gemini-api/docs/rate-limits |
| Groq free-tier RPD / TPM | Provider may shift | https://console.groq.com/docs/rate-limits |
| OpenRouter `:free` model RPD / deposit threshold | Free-model availability rotates | https://openrouter.ai/docs/api/reference/limits + `pricing` |
| Cloudflare Pages free-tier builds-per-month + file limits | Provider page authoritative | https://developers.cloudflare.com/pages/platform/limits/ |
| Supabase free-tier MB / pause / MAU caps | Provider pricing page | https://supabase.com/pricing |
| EU AI Act Article 50 — final Code of Practice on AI-generated content | Expected finalisation May–June 2026; binding from 2 Aug 2026 | https://artificialintelligenceact.eu/article/50/ + https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content |
| FTC May 2026 AI endorsement guidance | Already cited; verify any updates | https://www.ftc.gov/business-guidance/blog/2026/05/ftc-issues-final-rule-against-fake-reviews-testimonials |
| UK ASA / CAP — AI in advertising guidance | Active monitoring scaling in 2026 | https://www.asa.org.uk/news/disclosure-of-ai-in-advertising-striking-the-balance-between-creativity-and-responsibility.html |
| UK FCA — financial-promotion guidance updates relevant to Brand C | Quarterly check | https://www.fca.org.uk/firms/financial-promotions-and-adverts |
| Astro 5 / 6 breaking-change inventory + security CVEs on 4.x | Migration plan + Dependabot triage | https://docs.astro.build/en/guides/upgrade-to/v5/ + https://docs.astro.build/en/guides/upgrade-to/v6/ + https://github.com/withastro/astro/security/advisories |
| Node 22 LTS support window + Astro 6 Node requirement | Migration sequencing | https://nodejs.org/en/about/previous-releases + https://docs.astro.build/en/install/auto/ |
| X (Twitter) API tier pricing + paid-tier rate limits | Manual-only posture; revisit if ROI case emerges | https://developer.x.com/en/products/x-api |
| YouTube Data API v3 quota costs (`search.list` 100 units; `videos.list` 1 unit) | Source-intelligence governance | https://developers.google.com/youtube/v3/getting-started#quota |
| Reddit API tier pricing + free-tier limits | Manual-only posture | https://www.redditinc.com/policies/developer-terms |
| AI-search citation behaviour (Perplexity / ChatGPT search / Google AIO) | SEO moat §10 | spot-check via direct queries on cornerstones |

The quarterly platform-refresh playbook
(`playbooks/quarterly-platform-refresh.md`) is the canonical
workflow for resolving these. The operator runs that playbook on
the first business week of each quarter; this review doc is not
a replacement for it.

## 6. Operator submission section

### 6.1 Current completed work (PRs merged into `main`)

| Phase | Issue | PR | What it shipped |
|---|---|---|---|
| Bootstrap | n/a | #6 | Master plan + master-plan v1 |
| Bootstrap | n/a | #13 | Router telemetry → Supabase |
| Bootstrap | n/a | #14 | Provider quota registry |
| Bootstrap | n/a | #15 | Dashboard MVP hardening |
| 4.3 | #9 | #19 | Brand A content pipeline v1 |
| 5.1 | #17 | #24 | X platform risk governance |
| 5.2 | #20 | #27 | Voice system deepening |
| 5.3 | #18 | #29 | Astro security upgrade analysis |
| 5.4 | #23 | #34 | Brand B pipeline v1 |
| 5.5 | #25 | #39 | Source intelligence governance |
| 5.6 | #28 | #40 | Local LLM plan |
| 6.1 | #30 | #41 | Brand A launch readiness |
| 6.2 | #31 | #42 | Measurement framework |
| 6.3 | #32 | #45 | Legal & resilience framework |
| 6.4 | #33 | #49 | Brand C compliance framework |
| 6.5 | #35 | #50 | SEO moat plan |
| 6.6 | #36 | #62 | Platform refresh cadence |
| 6.7 | #37 | #60 | Monetization architecture |
| 6.8 | #43 | #54 | Cost control & free-tier plan |
| 6.9 | #44 | #58 | Business plan + unit economics + profit model |
| S | #48 | #63 | Dependabot security audit framework |
| Launch Pack | #55 | #64 | Brand A MVP runbook |
| Gemini | #61 | #66 | Design handoff pack |
| 7.1 | #51 | #69 | Brand A MVP site build |
| 7.2 | #52 | #68 | HQ dashboard expansion |
| 7.3 | #53 | #67 | Portfolio expansion gate |

### 6.2 Current open work (issues outstanding)

| Issue | Title | Action |
|---|---|---|
| #38 | Phase 6 coordinator | Operator may close (queue complete) |
| #56 | Repo hygiene (branch delete) | Operator runs the documented command locally; connector cannot do it |
| #57 | Master forward queue | Operator may close (queue complete) |
| #65 | Final QA Gate | Closed by this PR |

### 6.3 Current open PRs

| PR | Title | Action |
|---|---|---|
| #12 | Original Dependabot Astro 4→6 (2 dirs) | Recommend closure per `docs/astro-security-upgrade-plan.md` |
| #70 | Dependabot Astro 4→6 (3 dirs incl. new Brand A site) | Recommend closure per same plan; comment posted |

### 6.4 Blockers (none for launch)

There are no blockers preventing the operator from running
`launch-packs/brand-a-mvp/08-launch-day-script.md` other than the
manual prerequisites the launch checklist already names:

- Real operator name / email / postal address in
  `brands/brand-a-aiescape/site/src/site.config.ts`.
- Brand domain registered + DNS set in Cloudflare (or operator
  knowingly launches on `pages.dev`).
- Cloudflare Pages project created.
- Buttondown account + opt-in form embed URL.
- Walking the launch checklist + voice-fidelity gate + Brand A
  QA checklist on cornerstone 1.

None of those are repo-side blockers. They are operator-side
prerequisites.

### 6.5 What should happen next

In order:

1. **Close stale issues** — #38, #57 (queues complete); #65 via
   this PR.
2. **Close Dependabot PRs #12 + #70** per
   `docs/astro-security-upgrade-plan.md` recommendation.
3. **Run `playbooks/quarterly-platform-refresh.md`** or wait
   until Q3 (first business week of July 2026), whichever the
   operator prefers. Capture the §5 research items into the
   appropriate governance docs.
4. **Run #56's local branch-cleanup script** to remove the 27
   stale merged branches.
5. **Operator-side Brand A launch prerequisites** (§6.4).
6. **Run launch-day script** (`08-launch-day-script.md`) when
   ready.

### 6.6 What must NOT happen yet

- **No autonomous publishing.** Tier 4 remains frozen.
- **No paid-service signup** outside the `docs/cost-control-and-free-tier-plan.md`
  §5 5-step approval gate.
- **No affiliate links on Brand A** until the brand passes Stage 3
  monetisation criteria + a programme-onboarding PR per
  `brands/brand-a-aiescape/qa/affiliate-disclosure.md`.
- **No Brand C publishing** until a Brand-C launch checklist (mirrors
  Brand A pattern) ships in a future scoped PR.
- **No Brand B or Brand C launch** until
  `docs/portfolio-expansion-gate.md` §3 / §4 gates close.
- **No major dependency bumps** outside the staged plan in
  `docs/astro-security-upgrade-plan.md`.
- **No bundled multi-issue PR.** Every change ships as its own
  scoped PR.
- **No client-side islands** on any brand site or the dashboard
  while we remain on Astro 4.x (CVE exposure).
- **No real-person synthesis** across any brand (lab-wide rule).

## 7. Repo state at submission

- `main` is clean. Latest commit:
  `Merge pull request #69: Phase 7.1 Brand A MVP site build`.
- CI green on every merged PR.
- 35/35 unit tests passing.
- 4 dashboard pages build in ~1s.
- 7 Brand A site pages build in ~880ms.
- Cross-doc references resolve.
- No autonomous-publishing pathway exists.
- No tracked secrets.

## 8. Acknowledged limitations of this review

- This review did not (and could not) live-test the Cloudflare
  Pages deployment, the Supabase project, or any provider API.
  Those are operator-side verifications.
- Live research against the §5 inventory was not performed in
  this PR (scope discipline). The research-needed list is the
  deliverable.
- Branch deletion remains operator-runnable; the MCP connector
  returns 403 on `git push --delete`.

## 9. Closing note

The lab is in a healthier governance state than most year-one
media projects manage at year five. The risk profile is well-
characterised; the launch path is concrete; the kill-switches
are explicit; the cost ceiling is hard.

Brand A can launch.

Brand B can begin recording (audience-only, validation-only).

Brand C waits for its launch checklist.

Closes #65.
