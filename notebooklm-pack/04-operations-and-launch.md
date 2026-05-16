# 04 — Operations & Launch

## Phase roadmap (`docs/PROJECTHYDRA-MASTER-PLAN.md` §6)

The lab moves through five phases. **At time of pack writing
(2026-05-16), Phase 3 launch is the next operator action.**

| Phase | Window | Goal | Status |
|---|---|---|---|
| **Phase 1 — Foundation** | Days 1–14 | Repo + governance + secrets + research execution-ready | **Complete** (master plan v1, gitleaks, decision log, hardening PR #6) |
| **Phase 2 — Core build** | Days 15–30 | Machine compiles end-to-end on dummy content | **Complete** (router + scoring + telemetry + dashboard MVP) |
| **Phase 3 — Pilot brands** | Days 31–60 | Three brands publishing under T2 / T3 governance | **Brand A: ready to launch; Brand B + C: gated.** Operator-side prerequisites only. |
| **Phase 4 — Decide** | Days 61–90 | At least one kill, one hold, one scale recommendation | Not yet |
| **Phase 5+ — Months 4–12** | Post-MVP | Tier-3 brand live; cohort 2 niche selection | Not yet |

The phase model is *the operating system's* roadmap. Brand-
level phases (A / B / C / D) inside `docs/profit-model.md` track
financial scenarios separately.

## Phase 6 / 7 / S internal sub-phases

Inside Phase 3, the lab tracked a Phase 6 / 7 / S sub-sequence
for governance work that landed before launch:

- **Phase 6.1–6.5** — Brand A launch readiness; measurement
  framework; legal & resilience; Brand C compliance; SEO moat.
- **Phase 6.6–6.9** — Platform refresh cadence; monetisation
  architecture; cost control; business plan + unit economics +
  profit model.
- **Phase 7.1–7.3** — Brand A MVP site build; HQ dashboard
  expansion; portfolio expansion gate.
- **Phase S** — Dependabot security audit framework.

All Phase 6 / 7 / S work merged. The lab's "Phase 3 launch"
posture is now: **publish.**

## The launch pack (`launch-packs/brand-a-mvp/`)

A single-folder operator runbook that bridges the governance
corpus to a concrete launch day. 11 files. **If the governance
corpus and the launch pack conflict, the governance corpus
wins.**

### File-by-file

| File | What it covers |
|---|---|
| `README.md` | Purpose, order of operations, conflict-resolution rule |
| `00-launch-overview.md` | Definition of "launched"; what launch is NOT |
| `01-human-operator-checklist.md` | Pre-launch operator tasks (name, postal address, Cloudflare account, DNS, Buttondown, MFA on every parent account) |
| `02-ai-agent-task-list.md` | Pre-launch AI tasks (cornerstone draft → voice-fidelity → content-quality QA passes) |
| `03-content-launch-pack.md` | What content goes live, in what order (cornerstone 1 first; about / privacy / terms / ai-use / contact pages second) |
| `04-technical-launch-pack.md` | DNS, Cloudflare Pages, Buttondown opt-in iframe, site.config.ts placeholders, build verification |
| `05-measurement-and-review.md` | Week-1 review schema + day-30 review schema |
| `06-distribution-plan.md` | Opt-in only; comment-first; no drive-by linking |
| `07-risk-and-rollback.md` | What to do if Cloudflare / Supabase / Buttondown / a platform fails on launch day |
| `08-launch-day-script.md` | The actual day-of script — the one the operator runs |
| `09-post-launch-review-template.md` | Week-1 retro template (read after the first 7 days) |

### Launch mode (binding)

- **Private / manual MVP first.** Site is publicly resolvable
  but **not advertised**. First piece is published manually.
  Distribution is opt-in (newsletter + operator's own X /
  Reddit presence, comment-first).
- **Public launch only after** Brand A passes its day-30 review
  AND any required paid line passes the §5 cost gate.

## Human-vs-AI work split

The lab's hard rule: **AI does the boring 80%; humans do the
20% that moves outcomes.**

| Activity | Owner | Notes |
|---|---|---|
| Niche idea generation | Operator + Claude | Operator final call; Claude proposes |
| Niche scoring (§5.3 rubric) | Operator | Mechanical scoring |
| Brand profile drafting | Claude | Operator reviews |
| Voice doc drafting | Operator + Claude | Operator is the persona owner |
| House examples | Operator | Authenticity moat — operator authored |
| Cornerstone briefs | Claude | Operator reviews |
| Cornerstone drafts | Claude (writes) → Operator (edits + voice-fidelity gate) | No publish without operator edit pass |
| Site code | Claude (writes) → CI (typecheck + build) → Operator (PR review) | One-issue-one-PR |
| Visual design | Gemini (designs) → Claude review → Operator approves | Pre-Gemini Claude subagents + post-Gemini 14-section gate |
| Account provisioning | Operator | Playwright is *not* used at MVP — manual signups |
| DNS / Cloudflare Pages | Operator | Manual setup |
| Disclosure copy | Templates (canonical) | Never paraphrased; never AI-rewritten |
| Publish click | Operator | Always |
| Social posting | Operator | Manual, conservative cadence per `docs/x-platform-risk.md` |
| Weekly review | Operator | `playbooks/weekly-review.md` |
| Decision-log entries | Operator + Claude | Every strategic decision logged |
| Provider revalidation | Operator + ChatGPT | Quarterly per playbook |
| Incident response | Operator | Playbooks walk it |

## Launch readiness checklist (current state, 2026-05-16)

The repo-side items are **all green**:

- [x] Brand A site instantiated, 8 pages, builds clean.
- [x] Cornerstone 1 drafted and voice-fidelity-passed.
- [x] Launch pack present.
- [x] Disclosure pages present (privacy / terms / ai-use /
      affiliate-disclosure / about / contact).
- [x] 404 page + robots.txt + favicon + sitemap.xml.
- [x] `affiliateInPlay: false` at launch.
- [x] Voice fidelity + content quality + Brand A QA checklists
      present and walked.
- [x] CI green on `main`.
- [x] No secrets in repo.

Operator-side items (not repo work):

- [ ] Operator name in `site.config.ts` (placeholder today).
- [ ] Operator email in `site.config.ts` (placeholder today).
- [ ] Operator postal address in `site.config.ts` (placeholder
      today — UK PECR newsletter requirement).
- [ ] Cloudflare account + Cloudflare Pages project created.
- [ ] Brand domain registered (or knowingly launch on `pages.dev`).
- [ ] DNS configured.
- [ ] Buttondown account + opt-in form embed URL.
- [ ] MFA on every parent account (per
      `docs/09-security-and-secrets.md`).
- [ ] Calendar reminder set for week-1 review.

## Current blockers

**Repo-side blockers to Brand A launch: none.**

**Operator-side blockers to Brand A launch:** the checklist
items immediately above.

**Brand B blockers:** Brand A's day-30 outcome (per
`docs/portfolio-expansion-gate.md` §3).

**Brand C blockers:** Brand A's day-30 outcome AND a Brand-C-
specific launch checklist (does not yet exist; will be
authored as a future scoped PR after Brand A's day-30 result).

**Dependency / security blockers:** none P0/P1. Astro 4 → 6
deferred per `docs/astro-security-upgrade-plan.md`. Dependabot
audit framework is in place (`docs/dependabot-security-audit.md`).

**Repo hygiene blocker:** 27 merged feature branches remain on
`origin` because the MCP connector cannot delete branches
(HTTP 403). Operator runs the documented command locally per
issue #56. **Not a launch blocker.**

## Pre-launch → launch → post-launch

### Pre-launch (operator runs)

1. Walk `01-human-operator-checklist.md` — replace
   placeholders, create Cloudflare Pages project, set DNS,
   Buttondown account, MFA confirm.
2. Walk `02-ai-agent-task-list.md` — confirm cornerstone 1
   passes voice-fidelity + content-quality + Brand A QA.
3. Walk `04-technical-launch-pack.md` — verify build is clean
   on Cloudflare Pages preview deployment.
4. Schedule first weekly review for Saturday after launch.

### Launch day (operator runs `08-launch-day-script.md`)

1. Final voice-fidelity + content-quality + Brand A QA passes
   on cornerstone 1.
2. Push to `main` with the publish PR (one PR).
3. Cloudflare Pages builds + deploys.
4. Verify cornerstone 1 + about / privacy / terms / ai-use /
   contact + 404 + robots.txt + sitemap.xml are live.
5. Send the launch email through Buttondown (operator's own
   list only — no external promotion).
6. **Do not post on social.** Distribution is opt-in only at
   MVP.
7. File a decision-log entry: launch happened, date, version.

### Post-launch — week 1

- Daily ≤ 15-min health scan: site up? newsletter delivering?
  Supabase pinging? Any platform alerts?
- Saturday: walk `playbooks/weekly-review.md` and
  `playbooks/weekly-review-brand-a-launch.md`.
- Walk `09-post-launch-review-template.md`.

### Post-launch — month 1 (day-30 gate)

- Walk `playbooks/weekly-review-brand-a-launch.md` cumulative.
- Score Brand A against `docs/portfolio-expansion-gate.md` §2.
- File the day-30 decision-log entry: pass / hold / kill.
- **If pass**: Brand B can begin (audience-only) recording per
  `brands/brand-b-corpsatire/`.
- **If hold**: Brand A continues; Brand B stays gated.
- **If kill**: Brand A is wound down per
  `playbooks/kill-or-scale-review.md`; the post-mortem informs
  whether the operating system or the niche failed.

## Operating cadence

| Cadence | Activity | Owner | Output |
|---|---|---|---|
| Daily (≤ 15 min) | Infra & account health scan | Operator | Pass/fail digest |
| Twice-weekly (≤ 45 min) | Content QA + publish queue review | Operator | Approvals |
| Weekly (≤ 60 min) | Brand + agent + provider review | Operator | Decision queue |
| Monthly (≤ 2 h) | Kill / hold / scale rubric; provider revalidation; decision-log audit | Operator | Decision log entries |
| Quarterly (≤ 4 h) | Strategy review; master-plan delta; platform refresh | Operator | Master plan changelog |

## Playbooks (`playbooks/`)

The lab carries 15 operational checklists. They are the
operator's runbook when something is happening:

| Playbook | When to run |
|---|---|
| `first-week.md` | The first 7 days after a brand launch |
| `weekly-review.md` | Every Saturday |
| `weekly-review-brand-a-launch.md` | Saturdays during Brand A's first 30 days |
| `weekly-experiment.md` | One experiment open at a time per brand |
| `voice-fidelity-checklist.md` | Every draft, before publish |
| `content-quality-checklist.md` | Every draft, before publish |
| `brand-launch-checklist.md` | Before any brand's first publish |
| `kill-or-scale-review.md` | At week 6+ or any time signal demands |
| `incident-credential.md` | Suspected credential compromise |
| `account-recovery.md` | Locked out of a parent account |
| `platform-strike-response.md` | Strike / shadowban / suspension |
| `provider-revalidation.md` | Quarterly + on quota regression |
| `quarterly-platform-refresh.md` | First business week of each quarter |
| `package-hygiene.md` | Dependabot triage + dependency audits |
| `source-intelligence-weekly.md` | Source-signal pipeline |

## Operational principles

- **Governance before automation.** The system grew with
  governance leading; automation followed.
- **Small, reviewable PRs.** One-issue-one-PR.
- **Decision-log discipline.** Every strategic decision logged
  inline.
- **Quarterly truth refresh.** Provider quotas + regulation +
  dependencies revalidated every quarter.
- **No vanity expansion.** A brand only unfreezes when the
  expansion gate closes.
- **Kill discipline.** Brands die on evidence, not on
  attachment.

## What launch day is NOT

- Not a public push. No paid promotion. No social-media
  campaign at MVP.
- Not Tier 3. Tier 2 means "operator approves every publish".
- Not the end of governance. The post-launch reviews ARE the
  governance.
- Not a release of Brand B or Brand C. Those wait for the
  expansion gate.

## Cross-references

- `launch-packs/brand-a-mvp/` — operator runbook.
- `brands/brand-a-aiescape/launch-checklist.md` — pre-launch
  gate.
- `playbooks/` — operational checklists.
- `docs/PROJECTHYDRA-MASTER-PLAN.md` §6 — phase roadmap.
- `docs/business-plan.md` §4 — phase model (A / B / C / D).
- `docs/portfolio-expansion-gate.md` — Brand B / C unfreeze.
- `docs/measurement-framework.md` — north-star + leading +
  lagging metrics.
