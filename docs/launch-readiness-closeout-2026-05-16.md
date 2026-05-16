# Launch-Readiness Closeout — 2026-05-16

> **Date:** 2026-05-16.
> **Reviewer:** Autonomous Claude run (closing #81).
> **Audience:** Operator (final review before Brand A launch decision).
> **Posture:** final closeout pass. **Not** a strategy expansion. Not
> a launch authorisation. The report consolidates the current
> state of every repo-side axis so the operator can authorise
> Brand A launch on its own terms.

---

## 1. Executive verdict

**The repo is operator-ready for Brand A launch.**

- CI is green on `main`. 38/38 unit tests pass. No tracked
  secrets. No autonomous-publishing pathway.
- The audit corpus (final-QA, Brand A prelaunch, dashboard,
  strategy-checkpoint) is complete.
- The NotebookLM distilled-intelligence pack is populated and
  gated by a PR-time freshness workflow.
- The only blockers to first publish are **operator-side**
  (not repo-side).

**The repo is NOT operator-ready for any of:** Brand B launch,
Brand C launch, autonomous publishing, paid spend outside the
§5 gate, broad dependency major-bumps, second-cohort niche
launches. Those remain gated.

## 2. What is complete

### 2.1 Engineering (HQ)

- `core/router/` — Gemini / Groq / OpenRouter drivers with
  failover. Tested.
- `core/scoring/` — Content / Brand / Verdict formulas; drift-
  watched against the dashboard mirrors.
- `core/telemetry/supabase.ts` — Server-side telemetry writer;
  service-role-key handling audited.
- `core/providers/quota-registry.ts` — May-2026-validated
  ceilings.
- `core/db/schema.sql` — RLS on every table.
- `core/jobs/heartbeat.ts` — Daily Supabase keep-alive.

### 2.2 HQ dashboard

- `dashboards/app/` — Four static pages (`/`, `/cost`,
  `/decisions`, `/experiments`).
- No client islands; no client-side data fetch; service-role
  key server-side only.
- Empty / error / config-banner states present on every
  component.

### 2.3 Brand A pipeline (build-ready)

- Profile + voice + house examples + 5 cornerstone briefs +
  cornerstone-1 draft (voice-fidelity-passed) + prompts + QA +
  launch checklist + publish workflow.
- Site instantiated (`brands/brand-a-aiescape/site/`), eight
  pages, Astro 4.x, builds clean.
- `affiliateInPlay: false` at launch.
- Launch pack (`launch-packs/brand-a-mvp/`) complete.

### 2.4 Brand B pipeline (audience-only, gated)

- Profile + voice + cornerstone briefs + house examples +
  prompts + QA (satire-rules + defamation + affiliate-
  disclosure + checklist) + draft template.

### 2.5 Brand C pipeline (publish-gated)

- Profile + voice + cornerstone briefs + house examples +
  prompts + QA (FCA perimeter + vulnerable-reader + affiliate
  redlines + checklist) + draft template.

### 2.6 Governance corpus

- Master plan + business plan + unit economics + profit model
  + cost control + portfolio expansion gate + legal &
  resilience + voice authenticity system + SEO moat +
  monetisation architecture + X platform risk + source
  intelligence governance + Astro upgrade plan + measurement
  framework + disclosure templates + decision log (25+
  entries).
- Strategy checkpoint (`docs/strategy-checkpoint-2026-05-16.md`)
  — controlled expansion verdict.
- Final QA review (`docs/final-qa-review-2026-05-16.md`).
- Brand A prelaunch audit (`docs/brand-a-prelaunch-audit.md`).
- HQ dashboard implementation audit
  (`docs/hq-dashboard-implementation-audit.md`).
- Dependabot security audit framework
  (`docs/dependabot-security-audit.md`).

### 2.7 Playbooks

Fifteen playbooks — weekly review, weekly-review-brand-a-launch,
voice fidelity, content quality, kill-or-scale, incident
credential, account recovery, platform-strike response,
provider revalidation, quarterly platform refresh, package
hygiene, weekly experiment, source-intelligence weekly,
first-week, brand launch.

### 2.8 Launch pack

`launch-packs/brand-a-mvp/` — 11 files. Bridges governance to
launch day; `08-launch-day-script.md` is the operator's actual
day-of script.

### 2.9 Design handoffs

- Six Gemini briefs (`design-handoffs/gemini-*.md`).
- 14-section output review checklist
  (`design-handoffs/gemini-output-review-checklist.md`).
- Six Claude pre-Gemini subagent roles
  (`design-handoffs/claude-design-subagents.md`).
- 10-section pre-flight checklist
  (`design-handoffs/claude-before-gemini-checklist.md`).

### 2.10 NotebookLM pack

- Ten Markdown files in `notebooklm-pack/` (README + 9
  numbered documents). Founder-grade distilled intelligence
  layer.
- Freshness workflow live
  (`.github/workflows/notebooklm-pack-freshness.yml`) — PR-
  time gate that prevents silent staling.

### 2.11 Security floor

- `.github/workflows/ci.yml` — typecheck + node test +
  gitleaks on every push/PR.
- `.github/workflows/heartbeat.yml` — daily Supabase ping.
- `.github/workflows/notebooklm-pack-freshness.yml` — PR gate.
- `.github/dependabot.yml` — 4 npm ecosystems + GitHub
  Actions; auto-merge OFF.
- `.gitleaks.toml` — provider-specific patterns; allowlist
  template-only.
- No tracked secrets; gitleaks green across history.

## 3. What remains open

### 3.1 Open issues

| Issue | Title | Disposition |
|---|---|---|
| #38 | Phase 6 coordinator | Forward queue complete; **operator may close** (this report does not close issues on operator's behalf) |
| #56 | Repo hygiene (branch delete) | Operator-runnable; MCP connector returns 403 on `git push --delete`. Existing comment names the exact command. See §5. |
| #57 | Master forward queue | Forward queue complete; **operator may close** |
| #81 | Final launch-readiness closeout | **Closes via this PR.** |

### 3.2 Open PRs

| PR | Title | Disposition |
|---|---|---|
| #84 | actions/checkout 4 → 6 | Open. Low-risk major bump; deferred until next quarterly platform refresh per `docs/dependabot-security-audit.md`. |
| #85 | `@types/node` 20 → 25 | Open. Major bump; deferred (project uses Node 20 in CI). |
| #86 | TypeScript 5 → 6 | Open. Major bump; deferred until quarterly refresh. |
| #87 | Astro 4 → 6 (`brands/brand-a-aiescape/site`) | Open. Deferred per staged 4 → 5 → 6 plan in `docs/astro-security-upgrade-plan.md`. |
| #88 | Astro 4 → 6 (`brands/templates/site`) | Open. Same defer. |
| #89 | Astro 4 → 6 (`dashboards/app`) | Open. Same defer. |
| #70 | Astro 4 → 6 bundle across 3 dirs | **Closed in this run** as superseded by #87/#88/#89; comment posted explaining the closure. |
| #12 | Astro 4 → 6 (2 dirs, original) | Already closed in an earlier run. |

**No "stale duplicate PRs" remain open** after this run. The
six open Dependabot PRs (#84–#89) are deferred-not-stale; each
will be triaged at the next quarterly platform refresh per the
staged plan.

### 3.3 Operator-side prerequisites (not repo work)

| Prerequisite | Where it lives |
|---|---|
| Real operator name / email / postal address in `brands/brand-a-aiescape/site/src/site.config.ts` | `launch-packs/brand-a-mvp/01-human-operator-checklist.md` |
| Cloudflare account + Cloudflare Pages project | as above |
| Brand domain registered (or launch on `pages.dev`) | as above |
| Buttondown account + opt-in form embed URL | as above |
| MFA on every parent account | `docs/09-security-and-secrets.md` |
| Calendar reminder for first weekly review | `playbooks/weekly-review-brand-a-launch.md` |

## 4. What is blocked

### 4.1 Brand B launch

- **Blocked by:** Brand A day-30 post-launch outcome
  (`docs/portfolio-expansion-gate.md` §3).
- **Unfreeze:** Brand A day-30 pass + Brand B persona owner
  named + clip-production loop documented + defamation gate
  audited + first three scripts pre-cleared.

### 4.2 Brand C launch

- **Blocked by:** Brand A day-30 outcome **and** a Brand-C-
  specific launch checklist (not yet authored).
- **Unfreeze:** Brand B's gate plus Brand C launch checklist
  shipped as a scoped PR plus FCA / vulnerable-reader gates
  revalidated.

### 4.3 Astro 4 → 5 → 6 migration

- **Deferred** per `docs/astro-security-upgrade-plan.md`.
- The CVE driving Dependabot's urgency (slot-name XSS on
  hydrated SSR components) does **not** apply to this lab.
- Staged 4 → 5, 5 → 6 path walked at a future quarterly
  platform refresh.

### 4.4 27 stale merged feature branches on `origin`

- **Blocked by:** MCP connector returning HTTP 403 on
  `git push --delete`.
- **Operator-runnable** via the local command documented in
  issue #56.
- **Not a launch blocker.** See §5 for the current branch list.

### 4.5 Local LLMs in production

- **Deferred** per `docs/local-llm-plan.md`. Activation
  requires a §5 cost gate (GPU spend) and a decision-log
  entry covering data posture.

### 4.6 Tier-3 publishing on Brand A

- **Blocked by:** 4 consecutive weeks of clean Tier 2
  publishing (per `docs/03-governance.md`).

### 4.7 Tier-4 autonomous publishing

- **Frozen for all of year one.** Re-evaluation requires the
  EU AI Act Code of Practice (May–June 2026 finalisation
  expected) plus 3 months of clean Tier-3 with zero policy
  incidents.

## 5. Branch hygiene

The MCP connector cannot delete remote branches (HTTP 403).
The operator runs the documented command locally per #56.

**Current `origin` branch list (snapshot, 2026-05-16, post-#76
merge):**

Active in-flight:
- `main` (default)
- `claude/issue-81-launch-readiness-closeout` (this PR)

Merged feature branches eligible for deletion (operator-side
command in #56):
- `claude/astro-upgrade-plan-vXlkp`
- `claude/brand-a-launch-vXlkp`
- `claude/brand-a-pipeline-vXlkp`
- `claude/brand-a-prelaunch-audit-vXlkp`
- `claude/brand-a-site-vXlkp`
- `claude/brand-b-pipeline-vXlkp`
- `claude/brand-c-compliance-vXlkp`
- `claude/business-plan-vXlkp`
- `claude/cost-control-vXlkp`
- `claude/dashboard-audit-vXlkp`
- `claude/dashboard-expansion-vXlkp`
- `claude/dashboard-mvp-vXlkp`
- `claude/dependabot-s1-execution-vXlkp`
- `claude/design-subagents-vXlkp`
- `claude/final-qa-vXlkp`
- `claude/gemini-design-specs-vXlkp`
- `claude/hardening-vXlkp`
- `claude/issue-75-notebooklm-pack`
- `claude/issue-76-notebooklm-pack-freshness`
- `claude/launch-pack-vXlkp`
- `claude/legal-resilience-vXlkp`
- `claude/local-llm-plan-vXlkp`
- `claude/measurement-framework-vXlkp`
- `claude/monetization-arch-vXlkp`
- `claude/platform-refresh-vXlkp`
- `claude/portfolio-expansion-gate-vXlkp`
- `claude/provider-registry-vXlkp`
- `claude/router-telemetry-vXlkp`
- `claude/security-sprint-vXlkp`
- `claude/seo-moat-plan-vXlkp`
- plus the remainder enumerated in #56 (≈ a dozen older
  `feature/*` and `pm/*` branches).

**Operator command** (from #56):

```bash
git fetch --prune origin
git push origin --delete \
  claude/astro-upgrade-plan-vXlkp \
  claude/brand-a-launch-vXlkp \
  claude/brand-a-pipeline-vXlkp \
  claude/brand-a-prelaunch-audit-vXlkp \
  claude/brand-a-site-vXlkp \
  claude/brand-b-pipeline-vXlkp \
  claude/brand-c-compliance-vXlkp \
  claude/business-plan-vXlkp \
  claude/cost-control-vXlkp \
  claude/dashboard-audit-vXlkp \
  claude/dashboard-expansion-vXlkp \
  claude/dashboard-mvp-vXlkp \
  claude/dependabot-s1-execution-vXlkp \
  claude/design-subagents-vXlkp \
  claude/final-qa-vXlkp \
  claude/gemini-design-specs-vXlkp \
  claude/hardening-vXlkp \
  claude/issue-75-notebooklm-pack \
  claude/issue-76-notebooklm-pack-freshness \
  claude/launch-pack-vXlkp \
  claude/legal-resilience-vXlkp \
  claude/local-llm-plan-vXlkp \
  claude/measurement-framework-vXlkp \
  claude/monetization-arch-vXlkp \
  claude/platform-refresh-vXlkp \
  claude/portfolio-expansion-gate-vXlkp \
  claude/provider-registry-vXlkp \
  claude/router-telemetry-vXlkp \
  claude/security-sprint-vXlkp \
  claude/seo-moat-plan-vXlkp
  # ...append the remaining branches from #56's list
git fetch --prune origin
```

After running this, only `main` (and any active in-flight
branch) should remain.

## 6. Dependabot / security status

> **Update 2026-05-16 (post-#95).** Issue #95 challenged the
> initial generic "deferred to Q3" closures as silent deferrals.
> A formal per-PR security assessment with evidence now lives
> in `docs/dependabot-security-audit.md` §6b (CVE / advisory
> lookup, static-build verification, SSR / client-island /
> user-slot evidence, dashboard exposure surface, formal risk
> acceptance). The disposition of #84–#89 stands — all closed —
> but is now backed by exploitability evidence per PR rather
> than a one-liner defer. Brand A launch is unblocked under
> that evidence basis.

### 6.1 Framework status

- **Phase S0** — framework, lanes, config: **complete**
  (`docs/dependabot-security-audit.md` +
  `playbooks/package-hygiene.md` + `.github/dependabot.yml`).
- **Phase S1** — initial repo audit: **complete**. **No P0/P1
  findings.**
- **Phase S2** — next quarterly Dependabot review: due first
  business week of July 2026
  (`playbooks/quarterly-platform-refresh.md`).

### 6.2 Open Dependabot PRs (all deferred)

| PR | Bump | Lane | Defer rationale | Revisit |
|---|---|---|---|---|
| #84 | actions/checkout 4 → 6 | P3 (low-risk) | Major bump; awaiting quarterly refresh batch | Q3 2026 |
| #85 | `@types/node` 20 → 25 | P3 | Repo runs Node 20 in CI; type-only major bump waits for runtime bump | Q3 2026 |
| #86 | TypeScript 5 → 6 | P3 | Major bump; defer with the broader toolchain refresh | Q3 2026 |
| #87 | Astro 4 → 6 (`brand-a-aiescape/site`) | P2 (deferred) | CVE does not apply; staged 4 → 5 → 6 plan | Q3 2026 |
| #88 | Astro 4 → 6 (`templates/site`) | P2 (deferred) | Same | Q3 2026 |
| #89 | Astro 4 → 6 (`dashboards/app`) | P2 (deferred) | Same | Q3 2026 |

### 6.3 Dismissed / accepted alerts

GitHub Security reports 36 vulnerabilities on `main` (3 high,
24 moderate, 9 low). All are surfaced through the Dependabot
PRs above; **none are P0/P1** runtime-applicable to the lab's
static-only Astro 4.x consumers. Documented per the audit
framework:

- **Astro slot-name XSS** — does not apply (no client islands,
  no SSR adapter).
- **Type-only / dev-tool advisories** — toolchain refresh
  (Phase S2).
- **No service-role-key / Supabase-direct CVE** has appeared.

The full audit table will be re-walked at Phase S2 per
`playbooks/package-hygiene.md`.

### 6.4 What is NOT done in this run

- **No blind major-bumps merged.** Per the hard rule.
- **No security-accepted dismissals issued without operator
  signoff.** Operator decides whether to dismiss any GitHub
  Security alert at Phase S2.
- **No new auto-merge rule added.** Auto-merge stays OFF.

## 7. Strategy / drift confirmation

The strategy checkpoint (`docs/strategy-checkpoint-2026-05-16.md`)
records the controlled-expansion verdict:

- The lab has **upgraded** from the original "autonomous /
  funny / connected" intent to a **governance-rich, free-first,
  human-gated** operating system. This is **deliberate,
  accepted, beneficial drift**.
- **Brand A remains the launch focus.** No fast-track to B
  or C.
- **Brand B and Brand C remain gated** per
  `docs/portfolio-expansion-gate.md`.
- **Autonomous publishing remains forbidden.** Tier 4 frozen
  for year one.
- **Autonomous social posting remains forbidden.** Manual
  cadence only per `docs/x-platform-risk.md` and
  `playbooks/platform-strike-response.md`.

Cross-checked across:
- `docs/PROJECTHYDRA-MASTER-PLAN.md`
- `docs/business-plan.md`
- `docs/portfolio-expansion-gate.md`
- `docs/monetization-architecture.md`
- `docs/cost-control-and-free-tier-plan.md`
- `docs/legal-and-resilience.md`
- the three brand profiles
- `launch-packs/brand-a-mvp/`
- `notebooklm-pack/`

**All align. No conflicting instructions found. No strategic
drift beyond the documented controlled-expansion verdict.**

## 8. What is safe to launch

**Only Brand A**, and only **manually**, under **Tier 2**
publishing, after the operator-side prerequisites in §3.3 are
complete.

The launch is "private / manual MVP":

- Site publicly resolvable but **not advertised**.
- Cornerstone 1 published manually.
- Distribution opt-in only (newsletter + operator's own X /
  Reddit presence, comment-first).
- No paid promotion.
- No social-media campaign.
- Public launch only after Brand A passes the day-30 review
  (`playbooks/weekly-review-brand-a-launch.md`).

## 9. What is NOT safe to launch yet

- **Brand B.** Gated; see §4.1.
- **Brand C.** Gated; see §4.2.
- **Any paid line.** Gated by the 5-step approval gate
  (`docs/cost-control-and-free-tier-plan.md` §5).
- **Any affiliate link on Brand A.** Gated by Stage 3
  monetisation criteria + a programme-onboarding PR
  (`brands/brand-a-aiescape/qa/affiliate-disclosure.md`).
- **Tier-3 publishing on Brand A.** Gated by 4 weeks of
  clean Tier-2.
- **Tier-4 publishing on any brand.** Frozen for year one.
- **YouTube Shorts experiment.** Month-2+ optional; not in
  the MVP launch.
- **Second-cohort niche selection.** Post-day-90 minimum.
- **Astro 4 → 6 migration.** Quarterly platform refresh.
- **Local LLMs in production.** §5 gate + decision log.
- **Public social-media campaign.** Distribution is opt-in
  only at MVP.

## 10. Final recommended operator action

**One action only:**

> Walk `launch-packs/brand-a-mvp/01-human-operator-checklist.md`
> end to end. When every operator-side prerequisite is green,
> run `launch-packs/brand-a-mvp/08-launch-day-script.md`. Set
> a calendar reminder for the Saturday after launch to walk
> `playbooks/weekly-review-brand-a-launch.md`. Set a second
> reminder for day-30 to score Brand A against
> `docs/portfolio-expansion-gate.md` §2.

**Specifically do NOT:**

- Do not launch Brand B or Brand C.
- Do not authorise any paid line outside §5.
- Do not merge Dependabot PRs #84–#89 without the staged
  audit.
- Do not add new strategic architecture before launch.
- Do not push directly to `main`.
- Do not enable autonomous publishing.
- Do not auto-post on social.

## 11. Cross-references

- `docs/strategy-checkpoint-2026-05-16.md` — controlled-
  expansion verdict.
- `docs/final-qa-review-2026-05-16.md` — repo coherence audit.
- `docs/brand-a-prelaunch-audit.md` — Brand A site audit.
- `docs/hq-dashboard-implementation-audit.md` — dashboard
  audit.
- `docs/dependabot-security-audit.md` — security framework.
- `docs/portfolio-expansion-gate.md` — Brand B / C unfreeze.
- `docs/cost-control-and-free-tier-plan.md` — paid-line gate.
- `docs/legal-and-resilience.md` — entity / MFA / paid-legal
  triggers.
- `docs/astro-security-upgrade-plan.md` — staged Astro plan.
- `notebooklm-pack/` — distilled intelligence layer (10
  files).
- `launch-packs/brand-a-mvp/` — operator runbook.
- `docs/15-decision-log.md` — every strategic decision logged.

## 12. Repo state at submission

- `main` is clean, fast-forward, latest CI green.
- 38 / 38 unit tests passing.
- All cross-doc references resolve.
- No autonomous-publishing pathway exists.
- No tracked secrets.
- No P0/P1 security findings.
- NotebookLM pack populated and freshness-gated.
- Brand A site builds in < 1 second.

## 13. Closing note

The lab is in healthier shape than most year-five media
projects manage. Every governance axis has been written, audited,
and cross-referenced. The single remaining obligation is the one
the lab has been refusing to rush: **launch Brand A and learn
from real evidence.**

Brand A can launch.
Brand B can begin recording (audience-only).
Brand C waits for its launch checklist.

The operator is the only authority for the launch click.

Closes #81.
