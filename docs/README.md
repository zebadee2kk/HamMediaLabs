# /docs — index

The canonical, integrated plan is **[`PROJECTHYDRA-MASTER-PLAN.md`](./PROJECTHYDRA-MASTER-PLAN.md)**.
The files below are scoped supporting documents and topic stubs. Where they
conflict with the master plan, the master plan wins.

## Strategy & governance
- [00-master-plan.md](./00-master-plan.md) — short master plan summary (stub)
- [01-roadmap.md](./01-roadmap.md) — 90-day roadmap (stub)
- [03-governance.md](./03-governance.md) — Tier 0–4 governance
- [15-decision-log.md](./15-decision-log.md) — canonical decision history
- [16-glossary.md](./16-glossary.md) — terms

## Architecture & automation
- [02-account-matrix.md](./02-account-matrix.md) — account blueprint
- [04-architecture.md](./04-architecture.md) — Core / Heads
- [05-automation-plan.md](./05-automation-plan.md) — automation phases
- [12-claude-code-handover.md](./12-claude-code-handover.md) — Claude Code rules

## Security & risk
- [09-security-and-secrets.md](./09-security-and-secrets.md) — secrets framework
- [10-legal-and-platform-risk.md](./10-legal-and-platform-risk.md) — platform / legal risk
- [11-monetization.md](./11-monetization.md) — monetisation maturity
- [x-platform-risk.md](./x-platform-risk.md) — **X-specific** governance (rate limits, shadowban, link policy, cadence, scheduling, escalation)
- [astro-security-upgrade-plan.md](./astro-security-upgrade-plan.md) — Astro 4 → 5 → 6 migration analysis + recommendation (response to Dependabot PR #12)
- [dependabot-security-audit.md](./dependabot-security-audit.md) — Phase S1 audit framework + prioritisation lanes + suppression register
- [`/playbooks/package-hygiene.md`](../playbooks/package-hygiene.md) — Phase S4 ongoing hygiene SOP (Dependabot config, triage flow, thresholds, escalation triggers)
- [legal-and-resilience.md](./legal-and-resilience.md) — integration framework: entity options, MFA/recovery, disclosure standards, defamation/satire boundaries, backups, paid-legal-advice triggers, tax baseline
- [`/playbooks/account-recovery.md`](../playbooks/account-recovery.md) — recovery matrix per account class (annual test)
- [`/playbooks/platform-strike-response.md`](../playbooks/platform-strike-response.md) — strike / ban SOP for all platforms

## Performance & operations
- [measurement-framework.md](./measurement-framework.md) — north-stars, leading/lagging, attribution, channel maps, scorecard, kill criteria
- [seo-moat-plan.md](./seo-moat-plan.md) — topical authority, silos, internal linking, cornerstone model, programmatic-SEO boundaries, EEAT, SERP volatility, AI-search / answer-engine discoverability, parasite-SEO risk review
- [cost-control-and-free-tier-plan.md](./cost-control-and-free-tier-plan.md) — £0 MVP stack, £50/month ceiling, per-category paid triggers, universal approval process, monthly cost review, kill rules
- [platform-refresh-cadence.md](./platform-refresh-cadence.md) — quarterly platform-mechanics refresh strategy
- [`/playbooks/weekly-experiment.md`](../playbooks/weekly-experiment.md) — bounded experiment template
- [`/playbooks/quarterly-platform-refresh.md`](../playbooks/quarterly-platform-refresh.md) — quarterly platform-refresh SOP
- [08-dashboard-kpis.md](./08-dashboard-kpis.md) — dashboard + KPI spec
- [14-provider-research-backlog.md](./14-provider-research-backlog.md) — provider backlog
- [account-naming-convention.md](./account-naming-convention.md) — naming rules

## New (added by master-plan v1.0)
- [17-style-guide.md](./17-style-guide.md) — editorial style guide
- [18-disclosure-templates.md](./18-disclosure-templates.md) — canonical compliance copy
- [19-financial-model.md](./19-financial-model.md) — year-1 budget & revenue model
- [20-competitive-research.md](./20-competitive-research.md) — per-brand competitive intel

## Source intelligence
- [source-intelligence-plan.md](./source-intelligence-plan.md) — strategy (what to collect and why)
- [source-intelligence-governance.md](./source-intelligence-governance.md) — operational governance (how, controls, MVP backlog)
- [`/playbooks/source-intelligence-weekly.md`](../playbooks/source-intelligence-weekly.md) — weekly operator SOP

## Local LLMs
- [local-llm-plan.md](./local-llm-plan.md) — capability matrix, cost-saving workflow map, router-integration proposal (LM Studio + Ollama), telemetry naming, evaluation rubric. Governance only — implementation deferred to a follow-up PR.

## Voice & content authenticity
- [voice-authenticity-system.md](./voice-authenticity-system.md) — operational spec for the voice moat
- [`/brands/templates/voice-template.md`](../brands/templates/voice-template.md) — canonical `voice.md` shape
- [`/brands/templates/house-examples-template.md`](../brands/templates/house-examples-template.md) — house-example slots
- [`/playbooks/voice-fidelity-checklist.md`](../playbooks/voice-fidelity-checklist.md) — binding gate with read-aloud step
- [`/prompt-library/persona-first-generation.md`](../prompt-library/persona-first-generation.md) — persona-first prompt pattern

## Business
- [business-plan.md](./business-plan.md) — portfolio / venture-studio operating model, phase model, capital strategy, strategic non-goals
- [unit-economics.md](./unit-economics.md) — per-unit cost / revenue numbers (actual / estimate / target tags)
- [profit-model.md](./profit-model.md) — scenario P&L (£0 / £50 / £250 / £1k) with break-even logic and kill/hold/scale financial thresholds
- [monetization-architecture.md](./monetization-architecture.md) — affiliate / sponsorship / newsletter / lead-magnet / owned-audience strategy; trust-vs-monetisation tension map; commercial kill switches; banned funnels and dark patterns

## Related
- [`/playbooks`](../playbooks) — operational checklists (weekly review, kill/scale, content QA, incidents, provider re-validation, voice fidelity)
- [`/brands`](../brands) — brand profiles, voice docs, house examples, cornerstone briefs (A, B, C)
- [`/providers`](../providers) — provider registry, comparison matrix, quota trackers
- [`/automation`](../automation) — Playwright, n8n, Claude Code
- [`/core`](../core) — HQ engineering: LLM router, scoring, DB schema, jobs
- [`/prompt-library`](../prompt-library) — secure skeleton + persona-first generation pattern
