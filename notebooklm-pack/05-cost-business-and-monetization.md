# 05 — Cost, Business Model & Monetisation

## The single-sentence economic thesis

The lab spends near-zero money to validate brands, then
monetises **only** those that earn the right to monetisation
through demonstrated audience signal — never the other way
around.

## The cost model

### Today (May 2026), pre-launch

- **Standing infrastructure cost:** ≈ £3/month (1Password
  alone, until a brand domain is registered).
- **Per-LLM call cost:** £0 (Gemini / Groq / OpenRouter free
  tiers).
- **Per-content-piece marginal cost:** ≈ £0 in cash + operator
  edit time.
- **Annualised projected MVP infrastructure spend:** ≤ £75
  (operator names this as the worst-case MVP envelope).

### Free-first stack (`docs/cost-control-and-free-tier-plan.md` §1)

| Layer | Default | Paid trigger |
|---|---|---|
| Source hosting | GitHub | n/a |
| Brand site hosting | Cloudflare Pages | Custom domain on Cloudflare Registrar (at-cost) only; Pages tier stays free |
| HQ runtime | Cloudflare Workers + Pages | n/a |
| HQ DB | Supabase free tier | Supabase paid trigger only on MB / MAU / egress breach |
| HQ auth | Cloudflare Access free tier | n/a |
| Analytics | Plausible CE self-hosted OR Cloudflare Web Analytics | Plausible Cloud only if self-hosting is a real burden |
| AI router providers | Gemini free / Groq free / OpenRouter `:free` (post-$10 deposit unlocks 1,000 RPD) | LLM paid-tier overflow only after weekly quota saturation |
| Orchestration | n8n free (self-hosted) OR GitHub Actions cron | n8n.cloud paid tier only on quota breach |
| Newsletter | Buttondown free (≤ 100 subs) | Buttondown paid tier or Beehiiv free at scale |
| Vault | 1Password (Tier 1) | The one allowed standing paid line |
| CI | GitHub Actions free | n/a |

### The £50/month MVP ceiling (hard)

Total standing monthly spend across HamMediaLabs is **capped at
£50** until aggregate brand revenue crosses £150/month run-
rate. Inside that envelope:

- 1Password ≈ £3
- Domains amortised ≈ £4 (lab apex + per-brand apex)
- Optional n8n VPS ≈ £5 (else £0 via GitHub Actions cron)
- LLM paid-tier overflow ≤ £10 in months 1–3
- Misc ≈ £0 (stock images / fonts free by default)

The ceiling stays in place until revenue justifies relaxation.
This is **operator policy, not a budget projection**.

### The 5-step paid-line gate (`docs/cost-control-and-free-tier-plan.md` §5)

No paid line is added without:

1. **Named owner.**
2. **Written use case.**
3. **Hard ceiling.**
4. **Cancellation trigger.**
5. **Decision-log entry.**

Any paid line without all five is unauthorised.

## Unit economics (`docs/unit-economics.md`)

The lab unit is **a content piece per brand**.

### Per-piece cost (Brand A baseline)

- LLM cost: ~£0 (free tier).
- Operator edit time: ~30–60 minutes at shadow rate (~£14/h).
- Marginal infrastructure: ~£0 (Cloudflare Pages + Supabase
  free tier, near-zero per-piece).
- Total marginal cost: ~£8–£15 per piece in shadow-rate time.

### Per-piece revenue potential (Brand A, Stage 3)

- Affiliate revenue: highly variable; targets £0.50–£5 per
  organic session at maturity.
- Direct product (£29 template pack): targets ~2% conversion
  at maturity.
- Newsletter sponsorship: defers to Stage 3+ once list ≥ 1,000.

### Contribution margin target

- Blog content: **≥ 80%** (revenue minus marginal LLM + image
  cost).
- Video content (Brand B, if ever monetised): **≥ 60%** (after
  editing time costed at the shadow rate).

## Profit model (`docs/profit-model.md`)

Four scenarios; the dashboard's `/cost` page surfaces which
scenario the lab is currently tracking.

| Phase | Trigger | Brand outcomes | Run-rate revenue (mo 12) | Required spend response |
|---|---|---|---|---|
| **A — £0 hobby** | All three brands stay free-tier; no monetisation triggers | 1–3 brands in slow build; none monetised | £0 | Stay free |
| **B — £50 controlled** | Brand A passes Stage 2 (capture); Brand B / C still gated | Brand A at Stage 2; Brand B in audience-only loop; Brand C still pre-launch | £200–£500 | Add domain, optional newsletter platform |
| **C — £250 growth** | Brand A passes Stage 3; one paid line active | Brand A at Stage 3 monetising; Brand B in audience; Brand C launched | £1,000–£2,000 | One paid line (likely Gemini paid or newsletter platform) per the §5 gate |
| **D — £1k serious** | One brand at Stage 4 (Scale) | One brand scaled; second cohort considered | £4,000–£8,000 | Multiple paid lines; possibly a PT contractor for the scaled brand |

Each phase has explicit guardrails; the lab cannot jump phases
without the §5 gate.

## Monetisation philosophy (`docs/monetization-architecture.md`)

**Trust-first commercial design.** Three principles:

1. **No monetisation pressure before audience signal.** Stage
   gates make this mechanical. The brand earns the right to
   monetise; the operator doesn't decide to.
2. **No editorial corruption.** Sponsored content (when ever
   accepted) is disclosed; advertorial that doesn't disclose
   is forbidden.
3. **Per-surface kill switches.** If a monetisation tactic
   damages brand trust, the operator pulls it within 24 hours
   per `playbooks/platform-strike-response.md` and logs the
   decision.

### Banned tactics (lab-wide, every brand, every stage)

- Fake scarcity ("only 3 left!").
- Fake countdown timers.
- Dark patterns (forced opt-ins, confusing cancel flows).
- Advertorial without disclosure.
- AI-generated reviews / testimonials.
- Real-person likeness / voice / signature synthesis.
- Real-company logo / palette mimicry (Brand B-specific; lab-
  wide on the principle).

### Per-brand monetisation paths

**Brand A**:
- SaaS affiliate (productivity tools, recurring).
- £29 digital templates pack (own product, one-shot).
- Newsletter sponsorship tier (at scale, ≥ 1,000 subs).
- Possible YouTube partnership revenue (long-tail, video-
  experimental).

**Brand B**:
- Year-one: none (validation-only).
- Year-two optional: print-on-demand merch (≥ 10,000 followers
  + recognisable repeatable bit).
- Year-two optional: inbound sponsorship inquiries.

**Brand C**:
- Stage 3+: energy switching via FCA-authorised platforms
  (Uswitch / Compare the Market-style).
- Lifestyle affiliates (cashback platforms, supermarket
  loyalty, broadband, mobile).
- Lead-gen partnerships in non-regulated verticals (broadband,
  e-bikes).
- **Forbidden entirely:** investment, consumer credit,
  mortgages, BNPL, crypto, insurance, claims-management.

### The trust-vs-monetisation tension map

From `docs/monetization-architecture.md`. Some tactics increase
revenue but damage trust; some increase trust but reduce
revenue. The lab choses the trust-positive option by default.

| Tactic | Revenue impact | Trust impact | Lab decision |
|---|---|---|---|
| First-link affiliate disclosure | -5% CTR | +trust | Required |
| Aggressive popup capture | +signup rate | -trust | Forbidden |
| AI-generated review content | +volume | -trust + regulatory | Forbidden |
| Long-form, source-cited content | -volume | +trust | Default |
| Editorial calendar advertorials | +revenue | -trust without disclosure | Required disclosure, kept rare |

## Revenue forecast (expected case, year one)

From `docs/PROJECTHYDRA-MASTER-PLAN.md` §9.3.

| Source | Brand | Mo 4 | Mo 6 | Mo 9 | Mo 12 |
|---|---|---:|---:|---:|---:|
| Affiliate | A | £50 | £150 | £400 | £800 |
| Digital product | A | — | — | £100 | £300 |
| Affiliate | C | £20 | £100 | £250 | £600 |
| Sponsorship/other | A/C | — | — | £100 | £300 |
| **Total run-rate** | | **£70** | **£250** | **£850** | **£2,000** |

Brand B is excluded from year-one revenue.

## ROI hurdle

A brand is kept only if projected 12-month contribution margin
≥ **3× its annualised infra + content cost**. Anything below
1.5× is killed (`docs/PROJECTHYDRA-MASTER-PLAN.md` §11.5).

## Funding requirement

- **MVP (months 1–3):** ≤ £75 total. Self-funded.
- **Months 4–12:** ≤ £1,000 self-funded.
- **No external capital needed; this is by design.** External
  capital would change the risk appetite and break the kill
  rule.

## Spend gates summarised

| Spend type | Approval path |
|---|---|
| £0 (free tier) | Default. No approval required. |
| Standing line ≤ £50/mo total | §5 gate. Operator + decision-log entry. |
| New paid line that takes total > £50/mo | Hard stop unless brand revenue ≥ £150/mo. Otherwise wait. |
| One-shot < £20 (e.g., domain renewal) | Decision-log entry only. |
| Any paid LLM line | §5 gate + provider revalidation playbook before activation. |
| Any paid platform line (Buttondown paid, n8n.cloud paid) | §5 gate + cancellation trigger explicit. |
| Operator postal address (UK PECR) | Free; not a spend. |

## Capital separation (`docs/legal-and-resilience.md`)

- HamMediaLabs operates from its **own** bank account /
  virtual card line.
- **No client funds, no client credentials, no client data**
  ever touch this lab. (The operator's consulting business —
  HamNet — is strictly separate.)
- VAT-registration consideration flagged at > £70k/year run-
  rate, not before.
- Entity choice (sole-trader vs. limited company) is **decided
  before first £ of revenue**, not after. The trigger is
  recorded in `docs/legal-and-resilience.md` §4.

## Cross-references

- `docs/cost-control-and-free-tier-plan.md` — the binding cost
  doc.
- `docs/business-plan.md` — operating model + phase model.
- `docs/unit-economics.md` — per-unit numbers.
- `docs/profit-model.md` — A / B / C / D scenarios.
- `docs/monetization-architecture.md` — trust-first commercial
  design.
- `docs/PROJECTHYDRA-MASTER-PLAN.md` §9 + §11 — monetisation +
  budget.
- `docs/legal-and-resilience.md` — entity / VAT triggers.
- `docs/19-financial-model.md` — worked monthly numbers.
- `brands/brand-a-aiescape/qa/affiliate-disclosure.md` — Brand A
  affiliate posture.
- `brands/brand-c-ukescape/qa/affiliate-redlines.md` — Brand C
  red lines.
