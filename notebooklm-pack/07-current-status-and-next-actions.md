# 07 — Current Status & Next Actions

**Snapshot date:** 2026-05-16.

The repo is in healthier shape than most year-five media
projects. Brand A is build-ready. Brand B and Brand C are
gated. CI is green. 38/38 unit tests pass. No tracked secrets.
No autonomous publishing pathway exists anywhere.

## What is complete

### Engineering (HQ)

- `core/router/` — Gemini / Groq / OpenRouter drivers,
  failover policy, telemetry hook. Tested.
- `core/scoring/` — Content / Brand / Verdict formulas. Tested.
  Drift-watcher confirms parity with the dashboard's
  `lib/scoring.ts`.
- `core/telemetry/supabase.ts` — Telemetry event writer.
  Service-role key server-side only. Tested.
- `core/providers/quota-registry.ts` — May-2026 free-tier
  ceilings. Quarterly revalidation cadence. Tested.
- `core/db/schema.sql` — `brand` / `content_asset` /
  `content_event` / `channel_event` / `provider_event` /
  `agent_task` / `decision` / `heartbeat` / `source_signal`.
  RLS on every table.
- `core/jobs/heartbeat.ts` — daily Supabase keep-alive.

### HQ dashboard

- 4 static pages: `/`, `/cost`, `/decisions`, `/experiments`.
- Empty / error / config-banner states for every component.
- Tabular numerics; coloured states have text labels.
- Service-role key handled server-side only.

### Brand A pipeline (build-ready)

- Profile + voice + house examples + cornerstone briefs + 5
  drafts (cornerstone 1 voice-fidelity-passed) + prompts + QA
  + launch checklist + publish workflow.
- Brand A site instantiated (`brands/brand-a-aiescape/site/`).
  8 pages, 404, robots.txt, favicon, sitemap, Astro 4.x.
- `affiliateInPlay: false` at launch.
- Launch pack present (`launch-packs/brand-a-mvp/`).

### Brand B pipeline (audience-only, not yet recording)

- Profile + voice (template-conformant) + cornerstone briefs +
  house examples + prompts + QA (satire-rules + defamation +
  affiliate-disclosure + checklist) + draft template.

### Brand C pipeline (publish-gated)

- Profile + voice + cornerstone briefs + house examples +
  prompts + QA (FCA perimeter + vulnerable-reader + affiliate
  redlines + checklist) + draft template.

### Governance corpus (`docs/`)

40+ documents, including the master plan, business plan, unit
economics, profit model, cost control, portfolio expansion
gate, legal & resilience, voice system, SEO moat, monetisation
architecture, X platform risk, source intelligence, Astro
upgrade plan, measurement framework, disclosure templates,
decision log.

### Operations (`playbooks/`)

15 playbooks covering weekly review, incident credential,
provider revalidation, voice fidelity, kill / hold / scale,
quarterly platform refresh, package hygiene, weekly experiment,
source-intelligence weekly, account recovery, platform-strike
response, first week, brand launch, content quality.

### Launch pack (`launch-packs/brand-a-mvp/`)

11-file operator runbook. Covers human checklist, AI tasks,
content launch, technical launch, measurement, distribution,
risk + rollback, launch-day script, post-launch retro.

### Design handoffs (`design-handoffs/`)

6 Gemini briefs (Brand A site, Brand B visual system, Brand C
trust-first UI, HQ dashboard UI, social asset templates) + the
14-section output review checklist + the 6 Claude pre-Gemini
subagent roles + the 10-section pre-flight checklist.

### Security floor

- `.github/workflows/ci.yml` — typecheck + test + gitleaks on
  every push/PR.
- `.github/workflows/heartbeat.yml` — daily Supabase ping.
- `.github/dependabot.yml` — 4 npm ecosystems + GitHub
  Actions; auto-merge OFF.
- `.gitleaks.toml` — provider-specific secret patterns.
- No tracked secrets.

### Distilled intelligence

- `notebooklm-pack/` — this pack.

## What is open

### Open issues (repo-side)

| Issue | Title | State | Action |
|---|---|---|---|
| #38 | Phase 6 coordinator | Forward queue complete | Operator may close |
| #56 | Repo hygiene (branch delete) | Operator-runnable; MCP connector returns 403 | Operator runs documented command locally |
| #57 | Master forward queue | Forward queue complete | Operator may close |
| #75 | NotebookLM Distilled Pack | **In progress in this PR** | Closes via this PR |
| #76 | NotebookLM freshness workflow | Open | Next PR — workflow + decision-log entry |
| #81 | Final launch-readiness closeout | Open | Operator submission report; closes after #75 / #76 |

### Open PRs

| PR | Title | Action |
|---|---|---|
| #12 | Dependabot Astro 4 → 6 (2 dirs, original) | Recommend closure per `docs/astro-security-upgrade-plan.md` |
| #70 | Dependabot Astro 4 → 6 (3 dirs incl. Brand A site) | Recommend closure per same plan; comment posted |

### Open operator-side prerequisites (for Brand A launch)

| Item | Source of truth |
|---|---|
| Real operator name in `site.config.ts` | `brands/brand-a-aiescape/site/src/site.config.ts` (placeholder today) |
| Real operator email in `site.config.ts` | as above |
| Real operator postal address in `site.config.ts` | as above (UK PECR newsletter requirement) |
| Cloudflare account + Cloudflare Pages project | manual operator step |
| Brand domain registered + DNS | optional; can launch on `pages.dev` |
| Buttondown account + opt-in form embed URL | manual operator step |
| MFA on every parent account | `docs/09-security-and-secrets.md` |
| First weekly review on calendar | `playbooks/weekly-review-brand-a-launch.md` |

## What is blocked

### Brand B launch

- **Blocked by:** Brand A's day-30 outcome
  (`docs/portfolio-expansion-gate.md` §3).
- **Unfreeze condition:** Brand A day-30 review passes; Brand
  B persona owner named; clip-production loop documented;
  defamation gate audited; first three scripts pre-cleared.

### Brand C launch

- **Blocked by:** (a) Brand A's day-30 outcome AND (b) a
  Brand C-specific launch checklist not yet authored.
- **Unfreeze condition:** Brand B's gate plus the Brand C
  launch checklist shipped as a scoped PR plus FCA / vulnerable-
  reader gates revalidated.

### Astro 4 → 6 migration

- **Deferred per** `docs/astro-security-upgrade-plan.md`. CVE
  does not apply (no client islands, no SSR adapter).
- Staged 4 → 5 → 6 migration will be walked during a future
  quarterly platform refresh.

### Branch hygiene (27 stale merged feature branches on
`origin`)

- **Blocked by:** the MCP connector returning HTTP 403 on
  `git push --delete`.
- **Operator-runnable:** the documented command in #56.
- **Not a launch blocker.**

### Local LLMs in production

- **Deferred** until a §5 cost gate covers GPU spend + a
  decision-log entry covers data posture
  (`docs/local-llm-plan.md`).

## Immediate priorities

In order:

1. **Operator launches Brand A** — once the operator-side
   prerequisites are in place. Run
   `launch-packs/brand-a-mvp/08-launch-day-script.md`.
2. **30-day post-launch review** — run
   `playbooks/weekly-review-brand-a-launch.md` cumulative; file
   the day-30 decision-log entry.
3. **Close stale issues** — #38, #57 (forward queues complete).
4. **Close Dependabot PRs #12 + #70** per
   `docs/astro-security-upgrade-plan.md`.
5. **Operator runs local branch-delete command** for #56.
6. **#76 NotebookLM freshness workflow** lands once #75
   merges.
7. **#81 final launch-readiness closeout** lands after #75 /
   #76.

## Deferred priorities

- **Brand B audience-only loop** — gated behind Brand A day-30
  pass.
- **Brand C launch checklist** — gated behind Brand A day-30
  pass.
- **Astro 4 → 5 → 6 migration** — quarterly platform refresh.
- **Local LLM activation** — §5 cost gate + decision log.
- **Stage 3 Brand A monetisation** — gated on audience signal.
- **YouTube Shorts experiment (Brand A)** — month-2+ optional.
- **Second cohort niche selection** — post-day-90 minimum.
- **Tier-3 publishing for Brand A** — requires 4 consecutive
  weeks of clean Tier 2.

## Branch hygiene

- **`main`** — clean, fast-forward, latest CI green.
- **Feature branches on `origin`:** 27 merged branches remain.
  Operator runs the local deletion command. Not a launch
  blocker.
- **No long-lived feature branches.** Every PR is short-lived;
  branches are deleted post-merge in principle. The 27 stale
  branches are an MCP-connector limitation, not a workflow
  drift.

## Security sprint

The Dependabot Phase S framework
(`docs/dependabot-security-audit.md`) carries:

- **Phase S0** — framework + lanes + config: **complete**
  (PR #82).
- **Phase S1** — initial repo audit: **complete**; no P0/P1
  findings.
- **Phase S2** — first quarterly Dependabot review: **due**
  the first business week of July 2026 (next quarterly
  platform refresh).

No P0/P1 security findings. The Astro 4 → 6 CVE bundle does
not apply to this lab.

## What must NOT happen yet

- **No autonomous publishing.** Tier 4 remains frozen.
- **No paid service signup** outside the §5 gate.
- **No affiliate links on Brand A** until Stage 3 + a programme-
  onboarding PR per `brands/brand-a-aiescape/qa/affiliate-disclosure.md`.
- **No Brand C publishing** until the Brand-C launch checklist
  ships.
- **No Brand B or Brand C launch** until
  `docs/portfolio-expansion-gate.md` §3 / §4 gates close.
- **No major dependency bumps** outside the staged plan in
  `docs/astro-security-upgrade-plan.md`.
- **No bundled multi-issue PR.** Every change ships as its
  own scoped PR.
- **No client-side islands** on any brand site or the
  dashboard while we remain on Astro 4.x.
- **No real-person synthesis** across any brand.
- **No paid Google Analytics / Pixel / GTM / Hotjar / Clarity.**

## Repo state at submission

- `main` is clean and fast-forward.
- CI green on every merged PR.
- 38/38 unit tests passing.
- Cross-doc references resolve.
- No autonomous-publishing pathway exists.
- No tracked secrets.
- No P0/P1 security findings.

## Operator submission summary

**The lab can ship Brand A.** Every repo-side prerequisite is
complete. Every operator-side prerequisite is documented and
mechanical. The day-30 outcome of Brand A's launch is the
test of the operating system — and through it, the test of
whether Brand B and Brand C unfreeze.

**The lab should not ship anything else.** Brand B, Brand C,
the Astro migration, the local-LLM activation, and the
second cohort all wait for the day-30 evidence.

**The lab is healthier than its plan suggests.** The
governance corpus has done its job. The next obligation is
launch, not more planning.

## Cross-references

- `docs/final-qa-review-2026-05-16.md` — repo coherence audit.
- `docs/strategy-checkpoint-2026-05-16.md` — controlled-
  expansion verdict.
- `docs/brand-a-prelaunch-audit.md` — Brand A site audit.
- `docs/hq-dashboard-implementation-audit.md` — dashboard
  audit.
- `docs/dependabot-security-audit.md` — security framework.
- `docs/portfolio-expansion-gate.md` — Brand B / C unfreeze.
- `docs/15-decision-log.md` — full decision history.
- `launch-packs/brand-a-mvp/` — operator runbook.
