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

## Performance & operations
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

## Related
- [`/playbooks`](../playbooks) — operational checklists (weekly review, kill/scale, content QA, incidents, provider re-validation, voice fidelity)
- [`/brands`](../brands) — brand profiles, voice docs, house examples, cornerstone briefs (A, B, C)
- [`/providers`](../providers) — provider registry, comparison matrix, quota trackers
- [`/automation`](../automation) — Playwright, n8n, Claude Code
- [`/core`](../core) — HQ engineering: LLM router, scoring, DB schema, jobs
- [`/prompt-library`](../prompt-library) — secure skeleton + persona-first generation pattern
