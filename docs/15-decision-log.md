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
