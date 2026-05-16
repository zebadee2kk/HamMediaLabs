# HamMediaLabs — Unit Economics

> Per-unit cost and revenue numbers. Conservative assumptions, three
> tags (`actual` / `estimate` / `target`). Companion to
> `docs/business-plan.md` and `docs/profit-model.md`.
>
> **Reviewed monthly** with the cost-control review (§7 of
> `docs/cost-control-and-free-tier-plan.md`).

---

## Convention

Every number below is tagged:

- `actual` — observed in production. Re-validated monthly.
- `estimate` — best operator estimate based on observed proxies.
- `target` — what we plan for; not yet measured.

All currencies in £ GBP. All numbers are *as of the last review
cycle*; the date is captured per row in the operator's vault notes,
not in the repo.

---

## 1. Cost per brand per month

| Component | Phase A (£) | Phase B (£) | Phase C (£) | Tag |
|---|---:|---:|---:|---|
| Domain (amortised) | 1.0 | 1.0 | 1.0 | actual |
| Brand site hosting (Cloudflare Pages free) | 0.0 | 0.0 | 0.0 | actual |
| Newsletter (Buttondown free → paid) | 0.0 | 0.0 → 10.0 | 15.0 | estimate |
| Brand-attributed LLM share | 0.0 | 2.0 | 8.0 | estimate |
| Brand-attributed image / video tooling | 0.0 | 0.0 → 5.0 | 10.0 | estimate |
| Brand-attributed SEO research tools | 0.0 | 0.0 | 10.0 | target |
| **Sub-total per brand** | **~1.0** | **~3–18** | **~44** | — |

**Parent allocation per brand** (lab-wide costs ÷ active brands):

| Lab-wide component | Phase A (£) | Phase B (£) | Phase C (£) | Tag |
|---|---:|---:|---:|---|
| 1Password | 1.0 | 1.0 | 1.0 | actual |
| n8n VPS or n8n.cloud paid | 1.7 | 1.7 | 1.7 | estimate |
| Lab apex domain | 0.3 | 0.3 | 0.3 | actual |
| HQ Supabase | 0.0 | 0.0 | 0.0–8.0 | estimate |
| **Parent share per brand** | **~3.0** | **~3.0** | **~3–11** | — |

**Effective fully-loaded cost per brand:**

- Phase A: ≈ **£4 / month** per brand at 3 brands.
- Phase B: ≈ **£8–25 / month** per brand once a paid line is on.
- Phase C: ≈ **£50 / month** per brand (one brand scaled; others may
  remain Phase A).

## 2. Cost per content asset (per piece)

### 2.1 Brand A — longform blog cornerstone (~2,000 words)

| Cost component | Amount | Notes |
|---|---:|---|
| Operator-hours (research / outline / draft / edit / publish) | 4–8h | Shadow rate £20/h → £80–£160 of unbilled time |
| LLM calls (plan + fast + code slots) | ≤£0.10 actual on free tiers; ≤£0.30 estimate on a paid Gemini line | Mostly free-tier today |
| Image generation / stock | £0–£2 | One AI-generated illustration per piece typically |
| Editor pass time | 30–60 min | Same operator at MVP; shadow rate £10–£20 |
| **Total cash** | **<£3** | — |
| **Total shadow time-cost** | **~£100–£180** | — |

### 2.2 Brand B — short-form clip (~22s, single bit)

| Cost component | Amount | Notes |
|---|---:|---|
| Operator-hours (concept / script / film / edit / post) | 1–2h | Shadow rate → £20–£40 |
| LLM (concept + script + caption variants) | ≤£0.05 | Free-tier comfortable |
| Tooling (CapCut free / DaVinci free / occasional ElevenLabs) | £0 → £5/clip if voiceover | Manual only |
| **Total cash** | **<£5 typically** | — |
| **Total shadow time-cost** | **~£20–£60** | — |

### 2.3 Brand C — longform piece (~1,800 words, sourced)

| Cost component | Amount | Notes |
|---|---:|---|
| Operator-hours (research is heavier; sourcing tight) | 6–10h | Shadow rate £20/h → £120–£200 |
| LLM | ≤£0.10 actual | Free-tier today |
| Image / stock | £0–£2 | — |
| Editor pass + FCA 3-line check | 60–90 min | Compliance overhead is the largest cost differential vs Brand A |
| **Total cash** | **<£3** | — |
| **Total shadow time-cost** | **~£140–£220** | — |

## 3. Cost per source-intelligence signal

When the source-intel module ships (per `docs/source-intelligence-governance.md`
M2+ backlog):

| Signal type | Cost | Tag |
|---|---:|---|
| Manual operator note | £0 + 30s of operator time | actual |
| Google Trends RSS row | £0 marginal (n8n cron) | estimate |
| YouTube `videos.list` row | <£0.001 (well within free quota) | estimate |
| Reddit `new.json` poll row | £0 marginal | estimate |
| Weekly source-intel report email | £0 (n8n) | estimate |

At MVP the source-intel module is governance only; cost is zero.

## 4. Cost per AI task / provider call

Free-tier ceilings (per `core/providers/quota-registry.ts`, May 2026):

| Provider | Free quota | Marginal cost on the free tier |
|---|---|---:|
| Gemini 2.5 Pro / Flash | 5–15 RPM, 100–1,000 RPD, 250K TPM | £0 |
| Groq | 30 RPM, 6K TPM, 1,000 RPD | £0 |
| OpenRouter `:free` | 20 RPM, 50 RPD unpaid → 1,000 RPD after $10 | £0 (after one-off $10 ≈ £8 deposit, amortised to <£0.10/mo) |
| Cloudflare Pages | unlimited bandwidth, 500 builds / month | £0 |

If a workload hits the free ceiling 2 weeks running, the §4.2 paid
trigger in `docs/cost-control-and-free-tier-plan.md` fires, with the
local-LLM check (`docs/local-llm-plan.md` §6) first.

**Estimated paid LLM cost per piece (when a paid line is on):**

| Piece type | Estimate (£) |
|---:|---:|
| Brand A cornerstone | 0.20–0.50 |
| Brand A support piece | 0.05–0.15 |
| Brand B clip script | <0.05 |
| Brand C cornerstone | 0.25–0.60 |

## 5. Cost per published asset (all-in)

Combining §2 + §4:

| Brand × format | Cash all-in | Shadow time all-in |
|---|---:|---|
| Brand A cornerstone | <£3 | ~£100–£180 |
| Brand A support piece | <£1 | ~£40–£80 |
| Brand B clip | <£5 | ~£20–£60 |
| Brand C cornerstone | <£3 | ~£140–£220 |

These are the numbers we hold ourselves to as a steady-state at
Phase B. Phase C numbers move up modestly (paid lines amortised
across more pieces); Phase A cash is essentially zero.

## 6. Revenue assumptions (conservative, per stream)

All revenue estimates are **targets**, not actuals, until tagged
otherwise.

### 6.1 Brand A

| Stream | £/mo Phase B est. | £/mo Phase C target | Notes |
|---|---:|---:|---|
| SaaS affiliate (recurring) | 50–150 | 400–800 | beehiiv / Kit / Voibe / 1Password mix; first-link discipline |
| Digital templates / prompts pack (£29) | 0 | 100–300 | Lands once newsletter ≥500 engaged subs |
| Newsletter sponsorship | 0 | 0–200 | Inbound only |

### 6.2 Brand B

| Stream | £/mo Phase B est. | £/mo Phase C target | Notes |
|---|---:|---:|---|
| Sponsorship (inbound) | 0 | 0–500 occasional | Single sponsor at a time, editorial integrity preserved |
| Merch (POD) | 0 | 0–200 | Only after a catchphrase / character emerges |

Brand B is largely £0 revenue in Phases A–B by design.

### 6.3 Brand C

| Stream | £/mo Phase B est. | £/mo Phase C target | Notes |
|---|---:|---:|---|
| FCA-compatible energy comparison affiliate | 20–100 | 250–600 | Via Uswitch-style partner programmes |
| Cashback / lifestyle affiliates | 0–20 | 50–150 | TopCashback / Quidco partner programmes |
| Lead-gen partnerships (non-regulated verticals) | 0 | 50–200 | Broadband / mobile / utilities |
| Display ads | 0 | 0 | Out of scope at Phase B–C; revisit only at Phase D |

### 6.4 Lab-wide

The parent does not have its own revenue stream at MVP. Optional
future: licensing the lab's playbooks / prompt-library to small
independent operators — held; only if the systems become genuinely
differentiated.

## 7. Break-even assumptions

Per brand, monthly:

### 7.1 Phase A
- Cash break-even: ~£4 / month per brand. Trivially funded out of
  the lab's £50 ceiling. Effectively break-even by construction.
- Shadow break-even (covers operator time at £20/h): nonsense at
  Phase A — operator time is option value, not P&L.

### 7.2 Phase B
- Cash break-even (Brand A): ≈ £8 / month. ~1 newsletter signup
  converting to a £20 lifetime affiliate revenue per quarter
  satisfies this.
- Cash break-even (Brand C): ≈ £8 / month. Energy comparison
  attribution would need ~£10 / month commission flow.
- Brand B does not need to clear its £8 / mo at Phase B — it is
  audience-only by design.

### 7.3 Phase C (scaled brand only)
- Cash break-even: ≈ £50 / month all-in (per §1).
- Operator-time break-even (target): brand revenue ≥ operator
  attributed time × £20/h shadow rate. For a 15-hour-month
  scaled-brand load, that's ~£300 / month — well within Phase C
  target.

## 8. Sensitivity flags

The numbers above are conservative but **fragile** to:

- A material free-tier cut on any AI provider (per
  `core/providers/quota-registry.ts` — already happened on Gemini
  in Dec 2025).
- A platform ban (X / TikTok / Reddit specifically). Brand-site +
  newsletter are protected; social-only brands are not.
- An FCA / ASA / regulator notice on Brand C — the brand can lose
  its monetisation surface overnight and stay live as journalism.
- The operator's time availability dropping for non-lab reasons.
  Buffer: ≤10h/week assumption already conservative.

## 9. What we explicitly do NOT count

- Imagined "viral" upside on Brand B (low-probability, not
  bankable).
- Cross-brand referral effects (we don't interlink — §3.4 of
  `docs/seo-moat-plan.md`).
- Speculative paid-product launches.
- Operator's day-job income or consulting income — those are
  outside HamMediaLabs entirely (per `docs/PROJECTHYDRA-MASTER-PLAN.md`
  §11.1).

## 10. Cross-references

- `docs/business-plan.md` — strategic context.
- `docs/profit-model.md` — scenario P&L combining these unit numbers.
- `docs/cost-control-and-free-tier-plan.md` — paid-line triggers
  and ceilings.
- `docs/PROJECTHYDRA-MASTER-PLAN.md` §11 — the original financial
  envelope (these tables are consistent with it).
- `docs/19-financial-model.md` — month-by-month budget walk.

## 11. Out of scope (per #44)

- Live payment / affiliate integrations.
- Tax-detail computation.
- Detailed cohort LTV modelling — premature without real cohort
  data.
- Per-channel attribution by SKU (UTMs handle first-touch; multi-
  touch is explicitly out per `docs/measurement-framework.md` §3.3).
