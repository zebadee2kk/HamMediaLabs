# Decision Log

## Purpose
Record major strategic decisions so future agents and operators understand why choices were made.

## Format
### Date:
### Decision:
### Reasoning:
### Alternatives considered:
### Risks:
### Revisit date:

---

## Initial decisions
### Decision:
HamMediaLabs will remain independent from HamNet and consulting systems.

### Reasoning:
Risk isolation, operational clarity, and freedom to experiment.

---

### Date: 2026-05-16
### Decision:
Adopt `docs/PROJECTHYDRA-MASTER-PLAN.md` as the canonical, integrated strategic plan. Existing `00–16` docs remain as concise stubs; the master plan supersedes overlapping prose where they conflict.

### Reasoning:
Earlier docs were intentionally skeletal. The master plan integrates strategy, validated 2026 provider/regulatory research, architecture, roadmap, finance, risk, KPIs, and immediate next steps into one execution-ready document.

### Alternatives considered:
Expand each numbered doc in place. Rejected: high duplication risk, harder to keep internally consistent.

### Risks:
Two sources of truth if stubs drift. Mitigation: stubs treated as TL;DR pointers; canonical content lives in the master plan.

### Revisit date:
2026-08-16 (quarterly review).

---

### Date: 2026-05-16
### Decision:
HQ runtime on Cloudflare Workers + Pages; HQ data on Supabase (free tier, project #1) with daily heartbeat to prevent inactivity pause.

### Reasoning:
Free-first, edge-fast, single DNS surface, GitHub-native deploys. Supabase gives Postgres + auth + storage in one with no standing cost.

### Alternatives considered:
Vercel + Neon (rejected: tighter commercial-use clauses and metered bandwidth on Vercel). Self-hosted on a VPS (rejected: ops burden).

### Risks:
Supabase 7-day inactivity pause (mitigated by heartbeat job + nightly Parquet snapshot to GitHub). Workers CPU caps (mitigated by offloading long jobs to n8n).

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Default LLM router policy: Gemini 2.5 Pro/Flash (long-context, planning) → Groq (fast variations) → OpenRouter `:free` (fallback / coding agents). Pre-fund $10 on OpenRouter to unlock 1,000 RPD on free models.

### Reasoning:
Validated May 2026 free-tier limits (Gemini 5–15 RPM / 250K TPM; Groq 30 RPM / 6K TPM; OpenRouter 50→1000 RPD post-credit). Diversification eliminates single-provider failure.

### Alternatives considered:
Single-provider (rejected: Gemini cut free tiers 50–80% in Dec 2025). LiteLLM OSS router (kept as evaluation candidate for v2).

### Risks:
Quotas change quarterly. Mitigation: `playbooks/provider-revalidation.md` scheduled quarterly.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Tier-4 autonomous publishing is frozen for year 1.

### Reasoning:
EU AI Act Article 50 transparency obligations apply from 2 Aug 2026; FTC May 2026 AI endorsement guidance; UK ASA Active Ad Monitoring scaling. Autonomous publishing without disclosure-aware human review is a compliance/business-existential risk.

### Alternatives considered:
Constrained Tier-4 (whitelisted topics + auto-disclosures). Rejected for year 1; re-evaluate after the EU Code of Practice on AI-generated content is final (May–June 2026) and three consecutive months of clean Tier-3 operation.

### Risks:
Slower throughput. Accepted as a deliberate trade-off.

### Revisit date:
2027-02-16.

---

### Date: 2026-05-16
### Decision:
Hard portfolio cap of 3 brands until Phase 4 decisions are made; non-revenue spend capped at £75/month until aggregate run-rate ≥£150/month.

### Reasoning:
Operator-capacity guardrail + commitment-escalation prevention.

### Alternatives considered:
Five brands (rejected: weekly-review time exceeds 60 min).

### Risks:
Under-sampling the niche space. Mitigation: cohort 2 in months 4–6 with stricter niche-rubric scoring.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Add execution-ready scaffolding alongside the master plan: per-brand profiles + voice + cornerstone briefs for the 3 pilots, canonical disclosure templates (`docs/18`), editorial style guide (`docs/17`), financial model (`docs/19`), competitive research (`docs/20`), incident + provider-revalidation playbooks, HQ Supabase schema, LLM router (TS) with unit tests, scoring engine with unit tests, gitleaks config + CI workflows, Supabase heartbeat job + GitHub Actions schedule, Playwright signup module skeletons, n8n heartbeat + weekly-review workflows, and an Astro brand-site template with compliance pages baked in.

### Reasoning:
Plan-only documents are not execution-ready. Scaffolding turns the plan into something the operator can hit `npm install` on, run on day 1, and extend without re-deriving structure from prose.

### Alternatives considered:
Defer scaffolding to Phase 2. Rejected: explicit user instruction was for execution-ready output.

### Risks:
Drift between hand-edited brand sites and the canonical templates. Mitigation: compliance copy lives in `docs/18`; Astro components import it conceptually; per-brand overrides flagged in PR review.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Brand C scope tightened: NO affiliate links to investment, consumer credit, mortgages, BNPL, crypto, insurance, claims management. Allowed: energy switching via FCA-authorised comparison platforms, cashback platforms, lifestyle / utility savings. Debt content links charities only (no commission).

### Reasoning:
UK FCA finalised guidance (FG24-1) plus 2026 enforcement updates require an FCA-authorised approver for financial promotions by unauthorised persons. We are unauthorised. Energy-switching affiliates run via FCA-authorised platforms are permissible; recommending regulated credit / investment products is not.

### Alternatives considered:
Apply for FCA approver status. Rejected: high cost and time vs. year-1 ambitions.
Pivot Brand C off finance entirely. Held in reserve: if no FCA-compatible affiliate path is found by day 60, the brand is killed rather than relaunched in a riskier shape.

### Risks:
Reduced monetisation surface for Brand C. Accepted as a compliance non-negotiable.

### Revisit date:
2026-08-16.

---

## Open questions (must-decide gates)

### Date: 2026-05-16
### Decision:
**Open — must-decide by 2026-05-30.** Operator legal entity for year 1: sole trader vs. limited company.

### Reasoning:
UK sole trader has the lowest setup and admin overhead and fits zero-revenue / low-revenue year 1. Limited company gives liability separation and a clean route for future hires / partners, at the cost of Companies House admin + corporation tax filing.

### Alternatives considered:
- Sole trader for year 1, incorporate when net profit projects >£12k/year for >2 quarters (default recommendation).
- Incorporate immediately for liability separation (recommended only if Brand C scope expands into regulated content; current scope says no).

### Risks:
Sole-trader: unlimited personal liability. Mitigation: Brand C FCA-tightened scope, lab insurance once revenue starts.
Limited co: Companies House admin burden during a still-experimental phase.

### Revisit date:
2026-05-30 (gate); 2026-12-01 (annual review).

---

### Date: 2026-05-16
### Decision:
**Open — must-decide by 2026-05-30.** Apex-domain strategy: one apex per brand vs. subdomains under one corporate apex.

### Reasoning:
Per-brand apexes give SEO independence and a clean fail-over if one brand turns toxic; subdomains share authority but couple risk. Per-brand apex is the default recommendation for the three pilots.

### Alternatives considered:
- Per-brand apex (default, recommended) — cleanest separation, ~£12/yr × 3 brands.
- Subdomain under HamMediaLabs apex — cheapest, but couples reputational/SEO/compliance signal.

### Risks:
Per-brand: 3× domain admin and renewal calendar. Mitigation: Cloudflare Registrar single dashboard; renewal reminders in n8n.

### Revisit date:
2026-05-30 (gate).

---

### Date: 2026-05-16
### Decision:
**Open — must-decide by 2026-05-30.** n8n hosting: self-host on £5 VPS vs. n8n.cloud free tier vs. GitHub Actions cron only.

### Reasoning:
Self-hosted VPS gives full control + workflow JSON portability; n8n.cloud free tier is fastest to start but has execution limits; GitHub Actions cron is free and adequate for the two scheduled flows we have today (heartbeat, weekly review) but doesn't give an event-driven surface.

### Alternatives considered:
- Self-host on a £5/mo VPS (recommended once we exceed two scheduled workflows).
- n8n.cloud free tier (recommended for Phase 2 start; switch when execution-limit warnings appear).
- GitHub Actions cron only (fallback; ship if VPS / n8n.cloud both unavailable).

### Risks:
Self-host: small ops burden; mitigated by Docker compose + image pinning.
Cloud free: vendor change can break workflows; mitigation: keep workflow JSON in this repo so re-import is one click.

### Revisit date:
2026-05-30 (gate); 2026-09-01 (re-evaluate).

---

### Date: 2026-05-16
### Decision:
**Open — must-decide by 2026-06-15.** Editorial style guide: extend the lab-wide guide with per-brand voice docs (current state) vs. a centralised tone-of-voice authoring tool.

### Reasoning:
Per-brand voice docs (`brands/<slug>/voice.md`) are in place. The question is whether a centralised tool (e.g. a YAML voice schema parsed by the LLM router) reduces drift between brands and content output. Premature for MVP; revisit once we have ≥10 cornerstone pieces per brand to evaluate consistency.

### Alternatives considered:
- Keep current markdown voice docs + style guide (default).
- Build a small YAML schema + linter that scores draft output against the voice doc (defer until Phase 3 outcomes are in).

### Risks:
Voice drift across pieces in the same brand. Mitigation: quality checklist; editor pass mandatory at Tier 2/3.

### Revisit date:
2026-06-15 (gate); 2026-08-16 (quarterly).

---

### Date: 2026-05-16
### Decision:
Defer Hugging Face from the HQ LLM router. It is not in the `ProviderId` union and is not in the default policy.

### Reasoning:
Hugging Face hosted inference shows inconsistent latency and quota behaviour across model families (see `docs/14-provider-research-backlog.md` and the May 2026 provider matrix entry). Its strongest fit is experimental / one-off model evaluation, which is better done in Spaces or notebooks than through the automation-critical router. Adding it as a router fallback would pollute telemetry with high variance and risk hidden quota burn.

### Alternatives considered:
- Add `huggingface` to `ProviderId` and place it last in the policy chain. Rejected: would still get traffic on cascading 429s and produce unreliable telemetry.
- Keep it for `edge` slot only. Rejected: Cloudflare Workers AI is the canonical edge fallback and avoids the variance issue.

### Risks:
We give up a wider OSS-model surface. Mitigation: OpenRouter `:free` already exposes DeepSeek, Qwen, Llama variants for experimentation; Hugging Face remains available for off-router work.

### Revisit date:
2026-11-16 (after one full quarter of router telemetry on the three locked providers).

---

### Date: 2026-05-16
### Decision:
All future agent contributions go via feature branch + pull request. Direct commits to `main` (by humans or by Claude Code) are no longer permitted; branch protection on `main` enforces this.

### Reasoning:
Earlier commits to `main` were authorised for bootstrap. Post-bootstrap, the same workflow as human contributors must apply: branchable, reviewable, CI-gated changes.

### Alternatives considered:
Allow agent-only fast-path commits to `main` for trivial fixes. Rejected: erodes the audit trail and bypasses CI.

### Risks:
Slightly slower throughput for trivial changes. Accepted.

### Revisit date:
N/A (standing rule).

---

### Date: 2026-05-16
### Decision:
Adopt the quarterly platform-mechanics refresh cadence per `docs/platform-refresh-cadence.md` and the operator SOP `playbooks/quarterly-platform-refresh.md`. Three-tier cadence (daily 5-min / monthly 30-min / quarterly 4-hour); high change threshold; trusted-source hierarchy; one PR per affected document family.

### Reasoning:
Platforms move fast; static assumptions decay. The cadence prevents trend-chasing rewrites every six weeks while ensuring meaningful strategic shifts get reflected. Quarterly Q1 / Q2 / Q3 / Q4 cadence aligns with `playbooks/provider-revalidation.md`.

### Alternatives considered:
Daily trend monitoring as a job (rejected — operator-time burden, noise). Annual review only (rejected — too slow for meaningful drift). Bundled platform-policy edits (rejected — blast-radius discipline).

### Risks:
A material platform shift between quarterly reviews. Mitigation: §0 daily 5-min scan + §10 escalation triggers from `docs/x-platform-risk.md`.

### Revisit date:
2026-08-16 (first quarterly cadence pass).

---

### Date: 2026-05-16
### Decision:
Adopt `docs/monetization-architecture.md` as the operating system between editorial and revenue. Trust first; one channel at a time per brand; every commercial surface has a named kill switch; editorial holds veto over commercial.

### Reasoning:
Monetisation pressure can corrupt editorial. The architecture pre-commits the lab to a posture (no scammy funnels, no dark patterns, no editorial-corruption) before any pressure to monetise exists.

### Alternatives considered:
Decide monetisation case-by-case (rejected — risks slippage). Adopt a complex CRM (rejected — premature). Parallel-launch multiple monetisation surfaces per brand (rejected — concentration risk).

### Risks:
Constraints leave some revenue on the table. Accepted; trust > short-term cash.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Adopt `docs/cost-control-and-free-tier-plan.md` — explicit £0-first MVP stack and a hard £50/mo ceiling until aggregate brand revenue ≥£150/mo run-rate. Every paid line walks the 5-step approval gate (named owner, written use case, hard ceiling, named cancellation trigger, decision-log entry).

### Reasoning:
Silent dependencies kill small businesses. The gate plus per-brand attribution makes cost decisions deliberate.

### Alternatives considered:
Single £75/mo cap without per-category triggers (rejected — too coarse). No cap (rejected — silent-deps risk). Adopt a FinOps dashboard (rejected — premature; monthly review suffices).

### Risks:
A real need surfaces between monthly reviews. Mitigation: ad-hoc approval via the 5-step gate; cap is policy, not infrastructure.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Adopt `docs/business-plan.md` + `docs/unit-economics.md` + `docs/profit-model.md` as the canonical financial framing for HamMediaLabs. Portfolio / venture-studio operating model; four-phase plan (£0 hobby → £50 controlled → £250 growth → £1k serious); self-funded with ≥50% reinvestment.

### Reasoning:
Cost and revenue decisions become deliberate rather than accidental once monetisation enters the plan. Conservative-by-construction assumptions; every figure tagged `actual / estimate / target`.

### Alternatives considered:
Defer business modelling until first revenue (rejected — too late to constrain monetisation pressure). External funding (rejected — out of scope; changes risk appetite). Display-ad strategy (rejected — off by default).

### Risks:
Targets miss; revenue is back-loaded. Accepted; the lab is option-value buying in year 1.

### Revisit date:
2026-08-16 quarterly + annual rebaseline at year-end.

---

### Date: 2026-05-16
### Decision:
Instantiate Brand A's site (`brands/brand-a-aiescape/site/`) from `brands/templates/site/`. `affiliateInPlay: false` at launch; Astro 4.x pinned; no client islands; Cloudflare Pages free tier.

### Reasoning:
Brand A is the test of the operating system. Launching on the free tier with zero affiliate exposure isolates the operating-system test from monetisation pressure.

### Alternatives considered:
Wait for Astro 5/6 (rejected — XSS doesn't apply; staged plan governs). Launch with affiliate (rejected — Stage 1 validation only). Launch on a paid host (rejected — cost-control gate).

### Risks:
Brand-template drift if the operator edits the brand site instead of the template. Mitigation: README guidance + voice-fidelity gate + monthly review.

### Revisit date:
2026-06-16 (day-30 launch review).

---

### Date: 2026-05-16
### Decision:
Expand the HQ dashboard to four pages (`/`, `/cost`, `/decisions`, `/experiments`) with placeholder rows explicitly tagged. No fake data; no client-side data fetch; cost / experiment / decision tables render placeholders until backing tables and ingest land.

### Reasoning:
The operator needs portfolio-health visibility before signal arrives. Placeholder rows with `actual / estimate / placeholder` tags keep numbers honest.

### Alternatives considered:
Wait for live data (rejected — operator needs the surface). Adopt a paid BI stack (rejected — overengineering). Render zeros silently (rejected — invites false reads).

### Risks:
Placeholder rows confuse a tired operator. Mitigation: explicit `placeholder` tag visible inline.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Adopt `docs/portfolio-expansion-gate.md` as the binding gate before Brand B or Brand C moves from `planning` to `active`. Brand A first; ≥2 active brands is the ceiling in months 0–9; Brand B + Brand C parallel launch forbidden.

### Reasoning:
Premature multi-brand sprawl kills lab focus. The gate pre-commits the lab to evidence-based expansion.

### Alternatives considered:
Launch Brand B in parallel with Brand A (rejected — operator bandwidth). Auto-promote on a numeric threshold (rejected — vanity risk). Fast-track Brand C (rejected — FCA exposure).

### Risks:
Brand B / Brand C signal arrives slowly while waiting. Accepted; the audience surface accumulates from compounding output, not from launch timing.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Adopt `docs/dependabot-security-audit.md` + `playbooks/package-hygiene.md` as the operating posture for security debt. No package upgrades in the adoption PR. Auto-merge OFF at repo level. Dependabot PRs go through manual triage against the four prioritisation lanes (P0/P1/P2/P3).

### Reasoning:
Dependabot's defaults bundle major-bumps and would push us off the staged Astro plan. Manual triage preserves the staged-migration posture.

### Alternatives considered:
Auto-merge patch / minor (rejected — public-facing build-chain risk). Replatform the stack (rejected — speed > security would lose the audit trail).

### Risks:
P0/P1 alerts could sit longer than 24h if the operator is unavailable. Mitigation: weekly threshold check; escalation triggers explicit.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Adopt `launch-packs/brand-a-mvp/` (11 files) as the canonical bridge from governance to first launch. Manual publish only; no autonomous social posting; rollback paths explicit for every failure mode.

### Reasoning:
The operator needed a self-contained runbook; scattered governance docs are not enough on launch day. The pack consolidates without duplicating.

### Alternatives considered:
Rely on existing governance docs (rejected — scattering). Build a launch automation (rejected — Tier-4 freeze).

### Risks:
Drift between the pack and the underlying governance docs. Mitigation: every pack file carries cross-references to the canonical doc; updates ship together.

### Revisit date:
2026-06-16 (after Brand A day-30 review).

---

### Date: 2026-05-16
### Decision:
Adopt `design-handoffs/` (six Gemini briefs + 14-section output review checklist) as the design-handoff system. Gemini Free is the design/build specialist; Claude / Codex / operator retain strategy, governance, integration review, security, and compliance.

### Reasoning:
Gemini-as-design-specialist saves operator time without ceding governance. The review checklist prevents Gemini output from drifting on Astro version, client islands, third-party trackers, disclosure copy, or brand voice.

### Alternatives considered:
Operator-only design (rejected — slow). Gemini-owned governance (rejected — wrong tool). Skip Gemini, hire a designer (rejected — cost gate).

### Risks:
Gemini output bypasses the review checklist. Mitigation: §12 final commit gate requires all 14 sections green before any output reaches the repo.

### Revisit date:
2026-08-16.

---

### Date: 2026-05-16
### Decision:
Defer Dependabot PR #70 (Astro 4 → 6 across 3 directories now that the Brand A site exists). Same rationale as PR #12 deferral: the CVE (reflected XSS in slot names on hydrated SSR components) does not apply because all three Astro consumers ship static output with no client islands. Staged migration plan in `docs/astro-security-upgrade-plan.md` §6 governs.

### Reasoning:
A blind 3-major-bundle bump touching three consumers in one PR violates "no blind dependency bump". Re-asserting the staged path.

### Alternatives considered:
Merge PR #70 (rejected — see PR #12 deferral §5). Partial bump to Astro 5 (rejected — half-measure; same risk profile).

### Risks:
Drift accumulates across another quarter. Accepted; staged 4 → 5, 5 → 6 path is the right shape; revisit if a CVE that does apply lands.

### Revisit date:
2026-08-16 (or sooner if a new applicable CVE lands on Astro 4.x).

---

### Date: 2026-05-16
### Decision:
Adopt `docs/launch-readiness-closeout-2026-05-16.md` as the canonical final closeout report for the pre-launch run. Brand A is operator-ready (manual / private MVP only). Brand B + Brand C remain gated per `docs/portfolio-expansion-gate.md`. Tier 4 remains frozen. No paid line authorised outside the §5 gate. Dependabot PRs #84–#89 deferred to Q3 2026 quarterly platform refresh; PR #70 closed as superseded by per-directory #87/#88/#89.

### Reasoning:
The repo passed every governance / engineering / safety axis. The final closeout consolidates state across PRs, issues, branches, Dependabot, and strategy so the operator can authorise launch on its own terms without re-walking the corpus.

### Alternatives considered:
Close coordinator issues #38 / #57 / #56 on operator's behalf (rejected — Claude does not close issues on operator's behalf per the standing posture). Auto-merge low-risk Dependabot PRs #84 / #85 / #86 (rejected — auto-merge stays OFF; staged audit posture stands). Defer the closeout report (rejected — operator needs a single review surface).

### Risks:
Operator interprets the closeout as a launch authorisation (mitigated — §10 names the single recommended action explicitly; §9 enumerates everything that is NOT safe). Dependabot PRs accumulate further before Q3 (accepted — staged plan governs; revisit at quarterly refresh).

### Revisit date:
2026-08-16 (next quarterly platform refresh).

---

### Date: 2026-05-16
### Decision:
Formally risk-accept the deferral of Dependabot PRs #84 (`actions/checkout` 4 → 6), #85 (`@types/node` 20 → 25), #86 (`typescript` 5 → 6), and the per-directory Astro 4 → 6 PRs #87 / #88 / #89 to the Q3 2026 quarterly platform refresh. Each defer is now backed by per-PR evidence in `docs/dependabot-security-audit.md` §6b (advisory lookup, static-build verification, SSR / client-island / user-slot evidence, dashboard exposure surface). Brand A launch is unblocked under that evidence basis. Closes #95.

### Reasoning:
The #81 closeout closed the same six PRs with a generic "deferred to Q3 platform refresh" comment. #95 correctly challenged that as a silent deferral: security must beat launch speed; deferrals require evidence, not a one-liner. The per-PR audit confirms the Astro slot-name CVE is not exploitable in this lab (no SSR, no client islands, no user-controlled slot rendering — verified by grep + clean build emitting zero JS bundles), and the non-Astro PRs carry no advisory at all. The risk acceptance is bounded — it voids the moment any of the three trigger conditions in §6b.4 occurs.

### Alternatives considered:
Reopen and merge #87–#89 to land Astro 6 before launch (rejected — major bump under the hard "no blind major bumps" rule; staged 4 → 5 → 6 path in `docs/astro-security-upgrade-plan.md` is the canonical migration). Reopen and merge #84–#86 (rejected — no security driver; major dev-tool bumps belong in the toolchain refresh batch). Leave the six PRs open (rejected — Dependabot recreates them when new versions land; closure-with-evidence is the cleaner state).

### Risks:
A future Astro 4.x CVE that DOES apply (e.g. a static-rendering or build-time path-traversal) lands before Q3 (mitigated — `playbooks/package-hygiene.md` runs same-day audit on any new GHSA; Dependabot recreates the PR; §6b.4 trigger conditions void the acceptance). A new client-island or SSR-adapter PR lands without a security re-grade (mitigated — `.github/workflows/notebooklm-pack-freshness.yml` and CI's existing typecheck-and-test gate force PRs to be visible; the §6b.4 evidence requires re-verification when consumer surfaces change).

### Revisit date:
2026-08-16 (Q3 quarterly platform refresh) or same-day if a §6b.4 trigger condition fires.

---

### Date: 2026-05-17
### Decision:
Adopt `ops-vm/` as the canonical documentation for the dedicated HamMediaLabs Ops VM (`hydra-ops-vm`): operator workstation that centralises repo work, Claude Code / Codex sessions, deployment commands, and launch-evidence capture. The VM is bounded as an operator workstation — never an autonomous production brain. Closes #97.

### Reasoning:
The operator currently works across multiple machines; secrets sprawl, environment drift, and audit gap are real costs. A dedicated VM consolidates the operating surface, mirrors CI's Node 20 toolchain, holds scoped tokens with rotation discipline, and gives launch evidence a single canonical capture location. Documenting the VM *before* it is built prevents post-hoc rationalisation.

### Alternatives considered:
Keep working from the operator's personal machine (rejected — secrets sprawl + environment drift + no audit trail). Stand up a Cloud-hosted ephemeral dev container per session (rejected — secrets rotation and Tailscale identity become per-session friction; cost-line creep). Defer the VM to post-launch (rejected — the launch itself benefits from the consolidated workstation; documentation-first preserves no-rush posture).

### Risks:
The VM becomes a temptation to attach automation that violates Tier-4 / cost-gate / no-DNS rules (mitigated — `ops-vm/future-automation.md` enumerates candidates A–H with each one's gating; `ops-vm/claude-code-operating-rules.md` §1 lists the five hard rules). Snapshots become a false sense of backup (mitigated — `ops-vm/recovery-and-backup.md` §1 explicitly identifies the canonical source for every asset; nothing irreplaceable lives only on the VM).

### Revisit date:
2026-08-16 (Q3 quarterly platform refresh — confirm tooling-manifest drift, snapshot drill, secrets rotation).
