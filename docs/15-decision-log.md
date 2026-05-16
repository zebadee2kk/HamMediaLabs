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
