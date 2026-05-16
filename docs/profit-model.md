# HamMediaLabs — Profit Model

> Scenario P&L. Four scales: £0 hobby MVP, £50/mo controlled MVP,
> £250/mo growth, £1,000/mo serious. Each scenario sets cost,
> revenue, and break-even logic with explicit assumptions.
>
> **Conservative by construction.** Sensitivity flags in
> `docs/unit-economics.md` §8 apply.
>
> Companion: `docs/business-plan.md`, `docs/unit-economics.md`.

---

## 0. Reading the scenarios

- Each scenario is a *plausible operating shape*, not a forecast.
- Numbers are monthly £, fully-loaded (parent allocation included).
- Operator time is **not** in the cash P&L. Shadow time cost lives
  in unit economics as a *check* on whether the lab is worth running.
- Every revenue line carries a `tag`: `actual` (observed), `estimate`
  (operator estimate from a proxy), `target` (planned).

---

## 1. Scenario A — £0 hobby MVP (today)

**Operating posture:** the lab on its absolute minimum cost. 3 brands
in `planning` / `active` status. Pre-monetisation.

### Cost

| Line | £/mo | Tag |
|---|---:|---|
| 1Password | 3.0 | actual |
| Lab + brand domains (amortised) | 4.0 | actual |
| n8n (self-host VPS ÷ 12 mo / GH Actions cron) | 0–5.0 | estimate |
| Cloudflare Pages, GitHub, free Supabase, free LLMs | 0.0 | actual |
| **Total cost** | **7–12** | — |

### Revenue

| Stream | £/mo | Tag |
|---|---:|---|
| All streams | 0 | actual |

### Net

- **−£7 to −£12 / month** cash burn, fully funded out of operator's
  personal account.
- This is the **rational MVP shape** while the lab finds signal.

### Exit conditions
- Brand A north-star crosses the §13 thresholds in
  `docs/PROJECTHYDRA-MASTER-PLAN.md` → consider Scenario B for that
  brand.
- 90 days elapse with no signal across any brand → kill the cohort
  and run the §10 path of `docs/business-plan.md`.

---

## 2. Scenario B — £50/mo controlled MVP (Phase B start)

**Operating posture:** Brand A and Brand C have crossed Stage 1
validation (`docs/PROJECTHYDRA-MASTER-PLAN.md` §9.1 — 4 weeks of
clean publishing, returning visitors > 0, primary channel growing).
First paid-line approvals (see `docs/cost-control-and-free-tier-plan.md`).

### Cost

| Line | £/mo | Tag |
|---|---:|---|
| 1Password | 3.0 | actual |
| Domains | 4.0 | actual |
| n8n VPS | 5.0 | estimate |
| LLM overage (Gemini paid floor) | 5–15 | estimate |
| Image / video tooling | 0–10 | estimate |
| Newsletter paid (Brand A crossed 100 subs) | 0–10 | estimate |
| **Total cost** | **17–47** | — |

We sit comfortably inside the hard £50/mo ceiling.

### Revenue

| Stream | £/mo | Tag |
|---|---:|---|
| Brand A SaaS affiliate | 50–150 | target |
| Brand A digital products | 0–100 | target |
| Brand A sponsorship | 0 | target |
| Brand B | 0 | actual (by design) |
| Brand C energy comparison affiliate | 20–100 | target |
| Brand C cashback / lifestyle | 0–20 | target |
| **Total revenue (target band)** | **70–370** | — |

### Net (target band)

- **+£23 to +£353 / month** at conservative-to-mid-band targets.
- Break-even (cash) achieved when monthly revenue ≥ £47 — likely
  inside month 4–6 if Brand A or Brand C reaches Stage 3.

### What we are NOT doing in Scenario B

- No paid X API line (per `docs/cost-control-and-free-tier-plan.md` §4.10).
- No display ads.
- No sponsored content outbound pitching.
- No Brand B monetisation.

---

## 3. Scenario C — £250/mo growth (Phase C — one brand scaled)

**Operating posture:** one brand (likely Brand A) has crossed Stage 3
monetisation thresholds; a part-time editor / VA may have joined
for the scaled brand only (operator decision).

### Cost

| Line | £/mo | Tag |
|---|---:|---|
| 1Password | 3.0 | actual |
| Domains | 4.0 | actual |
| n8n VPS | 5.0 | actual |
| LLM paid (Gemini + Groq overage) | 25–60 | estimate |
| Supabase Pro for the scaled brand's project | 0–20 | estimate |
| Newsletter paid (≥100 subs across 2 brands) | 15–30 | estimate |
| SEO research tool | 0–30 | estimate |
| Image / video tooling | 10 | estimate |
| Part-time editor / VA (scaled brand only) | 0–80 | estimate |
| Accountant retainer (when triggered per `docs/legal-and-resilience.md` §2.1) | 0–67 | estimate |
| **Total cost** | **62–305** | — |

Hard ceiling: £250 / mo at this scenario.

### Revenue

| Stream | £/mo | Tag |
|---|---:|---|
| Brand A SaaS affiliate | 400–800 | target |
| Brand A digital products | 100–300 | target |
| Brand A sponsorship | 0–200 | target |
| Brand B sponsorship (occasional) | 0–500 | target |
| Brand C FCA-compatible affiliates | 250–600 | target |
| Brand C lead-gen | 50–200 | target |
| **Total revenue (target band)** | **800–2,600** | — |

### Net (target band)

- **+£500 to +£2,300 / month** at conservative-to-mid-band targets.
- This is the *first* scenario where founder cash extraction is
  considered (per `docs/business-plan.md` §6 reinvestment rule:
  ≥50% reinvested; the other half may pay back the operator's
  shadow time).

### Triggers to advance to Scenario D

- 6 consecutive months in the upper half of Scenario C revenue.
- All three brands either scaled, held with low cost, or killed
  cleanly.
- No regulator / platform incident in 12 months.

---

## 4. Scenario D — £1,000/mo serious scale (Year 2+)

**Operating posture:** the lab has a working second cohort of
brands AND a paid editor / VA / accountant retainer running. This
is the smallest "real business" shape. Anything bigger than this
is genuinely a venture; we do not plan beyond it.

### Cost

| Line | £/mo | Tag |
|---|---:|---|
| 1Password (team tier maybe) | 5.0 | estimate |
| Domains (5–6 apexes) | 8.0 | estimate |
| n8n cloud paid tier (if scale demands) | 0–30 | estimate |
| LLM paid | 80–200 | estimate |
| Supabase Pro × 2 projects | 40 | estimate |
| Newsletter paid (3+ brands) | 45 | estimate |
| SEO tools (e.g. Ahrefs Lite) | 50–100 | estimate |
| Image / video tooling | 25 | estimate |
| Part-time editor / VA | 200–400 | estimate |
| Accountant retainer | 100–150 | estimate |
| Insurance (if entity is Ltd) | 30–60 | estimate |
| Misc / buffer | 50 | estimate |
| **Total cost** | **600–1,000** | — |

Hard ceiling at this scenario: £1,000 / mo.

### Revenue

| Stream | £/mo | Tag |
|---|---:|---|
| Aggregate affiliate (3+ brands) | 1,500–3,500 | target |
| Sponsorship (across brands, inbound) | 300–1,200 | target |
| Digital products | 300–800 | target |
| Lead-gen partnerships | 200–600 | target |
| **Total revenue (target band)** | **2,300–6,100** | — |

### Net (target band)

- **+£1,300 to +£5,100 / month** at conservative-to-mid-band targets.
- Operator cash extraction allowed within the §6 reinvestment rule.
- Limited-company structure likely in effect by this scenario.

### What we still are NOT doing in Scenario D

- External investment.
- Display-ad networks (revisit if traffic justifies; remains off by
  default per `docs/business-plan.md` §5).
- Aggressive scaling beyond five brands (the ceiling).
- Replacing the operator as the editorial conscience.

---

## 5. Break-even scenarios (compressed view)

| Scenario | Monthly cost (mid) | Monthly revenue (mid target) | Break-even achieved when… |
|---|---:|---:|---|
| A — £0 hobby | 10 | 0 | Net never positive in A by design; goal is signal, not profit |
| B — £50 ctrl | 30 | 220 | Revenue ≥ £50, plausibly month 4–6 if Brand A or C reaches Stage 3 |
| C — £250 growth | 180 | 1,700 | Revenue ≥ £250, plausibly month 9–12 |
| D — £1k serious | 800 | 4,200 | Revenue ≥ £1,000, plausibly month 18–24 |

These are **target trajectories**, not promises. Sensitivity flags
(`docs/unit-economics.md` §8) apply across the board.

---

## 6. Kill / hold / scale financial thresholds

Building on `playbooks/kill-or-scale-review.md` and
`core/scoring/scoring.ts` `verdict()`:

| Verdict | Financial trigger |
|---|---|
| **Kill** | Brand's attributed monthly cost exceeds its attributed monthly revenue for **6 consecutive months** AND `brand_score` <0.30 over the same window, AND no monetisation in flight. Brand-B exception: Brand B is audience-only in Phases A–B; kill rule defers to north-star (audience compound rate). |
| **Hold** | Inconclusive — attributed revenue covers attributed cost ±50% with stable trend. Brand stays alive at minimum operational complexity. |
| **Scale** | Brand crosses Stage 3 monetisation criteria AND 12-month projected revenue ≥3× annualised infra + content cost (the §11.5 hurdle in `docs/PROJECTHYDRA-MASTER-PLAN.md`). |

Every kill / hold / scale verdict files a decision-log entry per the
standard template.

---

## 7. Actuals vs estimates vs targets — process

- **Actuals** are entered into the operator's monthly cost-review
  notes (off-repo) and into HQ `content_event` / `channel_event`
  for revenue per piece. Sourced from the LLM router telemetry
  (`provider_event` for paid lines) and from each platform's
  reporting.
- **Estimates** are the operator's best guess; revisited monthly.
- **Targets** are set per quarter and revisited at the quarterly
  business review.

The doc is **re-baselined monthly**: the cost columns above are
overwritten with prior-month actuals, and forward-looking estimates
adjust. The decision-log entry for each re-baseline names the
delta vs. last month.

---

## 8. What lives on the dashboard (forward requirement)

A future scoped PR adds the following surfaces (already on the
backlog in `docs/measurement-framework.md` §9 and
`docs/source-intelligence-governance.md` §8):

- Per-brand net (revenue − attributed cost) by month.
- Per-brand scenario (A / B / C / D) marker.
- Free-tier headroom indicators.
- Phase-progression markers.

None ship in this PR.

---

## 9. Cross-references

- `docs/business-plan.md` — operating model + phase definitions.
- `docs/unit-economics.md` — per-unit numbers feeding this model.
- `docs/cost-control-and-free-tier-plan.md` — paid-line gates that
  govern transitions between scenarios.
- `docs/legal-and-resilience.md` §2.1 — entity ladder triggers.
- `docs/PROJECTHYDRA-MASTER-PLAN.md` §11 — original budget envelope.
- `playbooks/kill-or-scale-review.md` — verdict gate this model
  feeds.

## 10. Out of scope (per #44)

- Multi-year capital plans beyond Year 2.
- External investment / fundraising.
- M&A / partial-brand sale modelling — held as a Year-2 decision.
- Display-ad revenue modelling (off by default).
- A finance-grade three-statement model (income / cash / balance) —
  premature; the simple P&L view is sufficient at MVP.
