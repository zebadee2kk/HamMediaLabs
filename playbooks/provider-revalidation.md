# Playbook — Provider Re-validation (quarterly)

> Free tiers and rate limits change. Provider ToS change. Regulatory exposure changes.
> This playbook is run **every quarter** and at the start of any new brand cohort.

---

## 0. Cadence

- Quarterly: 1st week of Q (Jan / Apr / Jul / Oct).
- Ad-hoc: triggered by a quota cut alert, a provider outage, a price change announcement, or any decision-log entry that mentions a provider risk.
- Owner: Operator. Time budget: 2 hours.

## 1. Inputs

- Current `providers/provider-comparison-matrix.md`
- Current `providers/quota-tracker-template.md` instances
- Last quarter's decision-log entries tagged `[provider]`
- 90 days of HQ DB `provider_event` data (latency, failure rate, cost, routing share)

## 2. Per-provider check

For each provider currently in the matrix, run this 8-question audit:

1. Does the provider's official rate-limit / pricing page still say what we recorded?
2. Has the free tier changed? In what direction?
3. Are there new models, regions, or features that change our routing choice?
4. Has the ToS changed? (Especially: training-on-input, commercial use, automation policy.)
5. Did we hit our quota in the last 90 days? On which workloads?
6. What was the provider's failure rate vs. our 1% SLO?
7. What was our actual cost? Does it match the budget envelope (§19 financial model)?
8. Is the provider still the right primary / fallback for its slot?

Capture answers in a snapshot table inside the decision log, and update the matrix only after the snapshot is filed.

## 3. Router policy review

Re-compute the default LLM-router policy:

| Slot | Current | Candidate | Decision |
|---|---|---|---|
| Long-context / planning | Gemini 2.5 Pro | … | … |
| Fast variations | Groq Llama-3.1-8B-instant | … | … |
| Coding agents | OpenRouter Qwen3-Coder-480B:free | … | … |
| Edge fallback | Cloudflare Workers AI | … | … |

Rule: if a provider's free RPD is <5× our last-quarter peak day, demote it from primary.

## 4. Affiliate & monetisation programme re-validation

For each affiliate programme used (per brand):

1. Programme terms still as recorded? (Commission %, cookie duration, payment threshold, ToS.)
2. Has the disclosure-wording requirement changed?
3. Is the programme still allowed in the target jurisdictions?
4. Is the programme run by an entity authorised to operate in those jurisdictions? (For Brand C: FCA-authorised promoter? If not, drop the affiliate.)

## 5. Regulatory check

- EU AI Act Code of Practice — any new guidance published? Update disclosure templates if so.
- FTC — any new enforcement letters or guidance? Update templates.
- UK ASA / CAP — any new rulings on AI in advertising? Update templates.
- UK FCA — any new financial-promotion rules affecting Brand C scope? Adjust scope.

## 6. Quota tracker refresh

For every provider with a quota tracker:

- Reset cycle dates updated
- Current usage recomputed from `provider_event`
- Warning + critical thresholds re-set if free tier moved
- Provider matrix backfilled

## 7. Deliverables (every run)

- One decision-log entry, dated, summarising the re-validation outcome and any policy changes.
- An updated `providers/provider-comparison-matrix.md`.
- Updated quota tracker instances.
- Updated LLM-router config (in `core/router/`) — committed, with a smoke test pass.
- Updated disclosure templates (in `docs/18-disclosure-templates.md`) if any regulator moved.

## 8. Closure checklist

- [ ] Per-provider 8-question audit complete
- [ ] Router policy re-confirmed or updated
- [ ] Affiliate programmes re-validated per brand
- [ ] Regulatory delta captured
- [ ] Quota trackers refreshed
- [ ] Decision-log entry filed
- [ ] Matrix + router + disclosure templates updated
- [ ] Smoke tests green
- [ ] Next re-validation date on the calendar
