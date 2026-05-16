# Financial Model (year 1)

> Expected-case numbers. Best/worst variants in §3.
> All values £ GBP unless noted. "Run-rate" = current month annualised.

---

## 1. Cost model — monthly, by category

| Category | Item | M1 | M2 | M3 | M4 | M6 | M9 | M12 |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Domain | 3 brand apexes + HML apex (amortised /12) | 4 | 4 | 4 | 4 | 4 | 4 | 4 |
| Hosting | Cloudflare Pages | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Hosting | Vercel/Netlify selective | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Data | Supabase free × 2 projects | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Data | Supabase Pro (Scale brand only) | 0 | 0 | 0 | 0 | 0 | 20 | 20 |
| AI | OpenRouter $10 pre-fund (one-off, amortised) | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| AI | Gemini paid overage (after free tier) | 0 | 0 | 0 | 5 | 15 | 25 | 35 |
| AI | Groq paid overage | 0 | 0 | 0 | 0 | 5 | 10 | 15 |
| AI | Image gen (Replicate / Stable Diffusion) | 0 | 0 | 2 | 5 | 8 | 10 | 12 |
| Email | Buttondown / Beehiiv free → paid | 0 | 0 | 0 | 0 | 0 | 10 | 15 |
| Vault | 1Password individual | 3 | 3 | 3 | 3 | 3 | 3 | 3 |
| n8n | VPS £5 (or n8n.cloud free) | 5 | 5 | 5 | 5 | 5 | 5 | 5 |
| Misc | Stock images / fonts / icons | 0 | 0 | 5 | 5 | 5 | 5 | 5 |
| Compliance | Privacy/cookie banner tooling | 0 | 0 | 0 | 0 | 5 | 5 | 5 |
| **Total** | | **13** | **13** | **20** | **28** | **51** | **98** | **120** |

**12-month total cost (expected):** ≈ **£700–£900**.

## 2. Revenue model — monthly, by source

| Source | Brand | M3 | M4 | M6 | M9 | M12 |
|---|---|---:|---:|---:|---:|---:|
| SaaS affiliate (productivity) | A | 0 | 50 | 150 | 400 | 800 |
| Digital product (templates pack £29) | A | 0 | 0 | 0 | 100 | 300 |
| Newsletter sponsorship | A | 0 | 0 | 0 | 0 | 200 |
| Energy / lifestyle affiliate | C | 0 | 20 | 100 | 250 | 500 |
| Lead gen partnerships | C | 0 | 0 | 0 | 50 | 150 |
| Display ads (after threshold) | A or C | 0 | 0 | 0 | 50 | 100 |
| Brand B revenue | B | 0 | 0 | 0 | 0 | 0 |
| **Total run-rate** | | **0** | **70** | **250** | **850** | **2,050** |

**Year-1 cumulative revenue (expected):** ≈ £5,500–£8,500 (back-loaded).

## 3. Scenario sensitivity

| Scenario | Y1 cost | Y1 revenue | Net | Implied operator £/h (10h/wk × 50wk = 500h) |
|---|---:|---:|---:|---:|
| Best | £950 | £18,000 | +£17,050 | £34.10 |
| Expected | £800 | £7,000 | +£6,200 | £12.40 |
| Worst | £700 | £400 | −£300 | −£0.60 |
| Black-swan (regulatory / ban) | £700 | £100 | −£600 | −£1.20 |

> The lab is **not** an hourly-rate business. Year 1 is option-value buying. The kill discipline is what compounds.

## 4. Cap-table & operator equity

- 100% operator-owned. No external equity until year 2, and only if a brand reaches >£1,000/mo run-rate.

## 5. Tax & legal-entity placeholder

- **UK sole trader** for year 1 (Self Assessment, simple).
- **Limited company** trigger: when net profit projects >£12k/year for >2 quarters, or any brand touches regulated content needing FCA-authorised structure.
- VAT threshold (UK 2026: £90k) — not in scope; flag if revenue projects >£70k/year.

## 6. Cashflow guardrails

- Maintain ≥£200 buffer in lab account at all times.
- Any single line item >£25/mo without a revenue line covering it is auto-flagged at weekly review.
- Pre-fund OpenRouter $10 (~£8) once. Never auto-top-up.
- Pre-fund all annual domain renewals 30 days ahead; calendar reminders in n8n.

## 7. Re-forecast cadence

- **Monthly:** actuals vs. expected for cost & revenue.
- **Quarterly:** rebuild this table with the previous quarter's actuals as the new baseline.
- **Annually:** publish a year-end financial post-mortem to the decision log.
