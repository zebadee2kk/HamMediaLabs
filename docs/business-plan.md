# HamMediaLabs — Business Plan

> **Posture:** portfolio media business operated like a small venture
> studio: a parent that creates, instruments, and prunes a handful of
> tightly-scoped brand vehicles. Free-first; conservative growth;
> trust before monetisation pressure.
>
> Companion docs: `docs/unit-economics.md`, `docs/profit-model.md`.
> Strategy anchor: `docs/PROJECTHYDRA-MASTER-PLAN.md`.

---

## 1. What HamMediaLabs is

A **portfolio / venture-studio-style media business** operated by a
single founder-operator. It creates 3 pilot brands (Brand A, B, C),
instruments them with a shared HQ control plane, and prunes
mercilessly. Each brand is a self-contained vehicle that *could*
stand on its own if scaled.

The lab is **not** a single-niche publisher and **not** a content
agency. It is a system for finding which brands are worth investing
in, on as little standing cost as possible.

## 2. Operating model

### 2.1 Parent (HamMediaLabs)

- Owns the operating system: control plane, telemetry, scoring,
  governance, prompt library, voice-authenticity system,
  measurement framework, legal posture.
- Owns the shared cost surface: 1Password, n8n VPS, HQ Supabase,
  CI, repo.
- Owns the brand-launch playbook so a new brand stands up at near-
  marginal-cost.
- Does **not** make brand-side editorial calls in detail; the
  brand profile + voice owns those.

### 2.2 Brand (Hydra Heads)

- Owns its identity, editorial, distribution, monetisation choices
  *within* the parent's governance.
- Tracks its own P&L attributed via `docs/cost-control-and-free-tier-plan.md`
  §6 attribution.
- Lives or dies on its own evidence (north-star, brand score,
  kill criteria per `playbooks/kill-or-scale-review.md`).

### 2.3 Why portfolio, not a single bet

- Three brands give three independent signal sources at marginal
  cost — better odds of finding a winner than concentrating effort.
- A failed brand teaches the system; the lessons compound.
- Each brand targets a different intent / format (longform / video
  / financial journalism), so we don't lose all surfaces to a
  single platform change.

## 3. Revenue model options by brand

The lab is **validation-only** at MVP (the first 90 days). Monetisation
options below apply when a brand crosses the criteria in
`docs/PROJECTHYDRA-MASTER-PLAN.md` §13 and `playbooks/kill-or-scale-review.md`.

### 3.1 Brand A — AI Escape (longform / blog / newsletter / X)

| Stream | When it lights up | Trust risk |
|---|---|---|
| SaaS affiliate (recurring, e.g. beehiiv, Kit) | After Stage 3 audience signal; first-link disclosure mandatory | Low if vetted; high if listicle-bait |
| Digital templates / prompts pack (one-off £29–£49) | After Stage 3 newsletter trust; sold from own site | Low |
| Newsletter sponsorship | After ~1,000 engaged subs, inbound only | Medium — sponsor selection is editorial |
| Consulting funnel | If/when operator chooses; clearly separated from editorial | Medium — must not contaminate brand voice |

### 3.2 Brand B — Corporate Satire (short-form / video / social)

| Stream | When it lights up | Trust risk |
|---|---|---|
| Sponsorship (inbound, never outbound) | After audience signal (≥10k followers, recognisable repeatable bit) | Medium |
| Merch via print-on-demand | After audience signal + catchphrase emerges | Low |
| Brand B explicitly **does not** monetise via affiliate or ad networks at MVP | — | — |

### 3.3 Brand C — UK Financial Escape (journalism / newsletter / Reddit)

| Stream | When it lights up | Trust risk |
|---|---|---|
| Energy switching via FCA-authorised comparison platform partner programmes | After Stage 3 trust signal; charity-links-above-affiliates rule applies | Medium — FCA-perimeter gate per `qa/fca-perimeter.md` |
| Cashback / lifestyle / supermarket-loyalty affiliates | After Stage 3 | Low |
| Lead-gen partnerships in non-regulated verticals | After Stage 3 | Low |
| **Forbidden** (lab-wide policy): investment, credit, mortgage, BNPL, crypto, insurance, claims-management affiliates and ads | — | Existential |

### 3.4 Parent-level / cross-brand options (held)

- Lab-wide newsletter (sells nothing; pure brand). Held.
- Licensable playbooks / prompt-library to other small operators.
  Held — only if the systems become genuinely differentiated and
  the operator chooses to.

## 4. Phase model

Free-first MVP → measured paid growth → conditional scale.

### Phase A — MVP (months 0–3, today)

- 3 pilot brands launched.
- £0 standing cost ceiling beyond 1Password + domains amortised.
- Monetisation: **none active**. Brand A and Brand C may add
  affiliate links once Stage 3 criteria are met.
- Goal: pass the 30-day Brand A launch window
  (`brands/brand-a-aiescape/launch-checklist.md`), gather enough
  signal to make kill/hold/scale calls on B and C.

### Phase B — Controlled growth (months 4–9)

- £50/month total spend ceiling (per `docs/cost-control-and-free-tier-plan.md`).
- Up to one paid LLM line, one paid newsletter line, one paid
  research tool — **only** if a measured workload requires each.
- Brand A: affiliate live; first sponsorship inbound only.
- Brand C: FCA-compatible affiliates live after compliance review;
  charity-links rule enforced.
- Brand B: still validation-only unless inbound sponsorship arrives
  with editorial integrity preserved.

### Phase C — Scale (months 10–24+)

- £150–£250/month cost ceiling.
- One brand promoted to Tier 3 (operator one-click approve);
  others stay Tier 2.
- Operator may engage a part-time editor / VA for the scaled
  brand only.
- Holding-company evaluation only on the §2.1 triggers of
  `docs/legal-and-resilience.md`.

### Phase D — Decide (year 2)

- Brand-by-brand: keep / scale / partial-sell / kill.
- Lab's operating system is the durable asset; brands are
  experiments built on top.

## 5. Strategic non-goals

- **Not a media empire.** No "build to 20 brands" path. Five is the
  ceiling at peak. More brands ≠ more value.
- **Not a content farm.** Programmatic SEO is gated
  (`docs/seo-moat-plan.md` §7).
- **Not an ad-tech business.** Display ads are last-resort and only
  if traffic is meaningful and brand-safe.
- **Not a course / cohort business.** Operator may write a tightly
  scoped digital product (templates / prompts pack) but does not
  build a course business on top of the brands.

## 6. Capital strategy

- **Self-funded** throughout. No external capital sought at any
  scale described in this plan.
- **Reinvestment rule:** ≥50% of first-year revenue stays in the
  lab account (paid-line headroom + accountant retainer trigger).
- **Founder cash extraction** allowed only after a brand crosses
  6 months of stable revenue above its attributed cost +20%.

## 7. Operator economics

The operator's implicit hourly is **below market** at MVP — the
upside is the option value of one scaled brand and the asset value
of the operating system, not the hourly today.

Time budget:

- ≤10 hours/week at MVP (per `docs/PROJECTHYDRA-MASTER-PLAN.md` §1.7
  assumptions).
- Up to 15 hours/week if a brand reaches Phase C scale.
- A single full-time week (40 hours) is **out of scope** for year 1
  — the lab does not require it and the operator's day job /
  consulting / HamNet does.

## 8. Risk / governance linkages

This plan does not stand alone. It links to:

- **`docs/cost-control-and-free-tier-plan.md`** — every paid-line
  decision walks the 5-step gate; #43 governs spend.
- **`docs/legal-and-resilience.md`** — entity-ladder triggers
  (§2.1) determine when the business is structurally upgraded;
  paid-legal-advice triggers (§10) determine when an outside
  professional joins the loop.
- **`brands/brand-c-ukescape/qa/fca-perimeter.md`** — Brand C's
  monetisation surface is constrained by FCA realities.
- **`docs/PROJECTHYDRA-MASTER-PLAN.md` §11** — financial envelope
  numbers; this doc and the master plan must remain consistent.
- **`docs/measurement-framework.md`** — the metrics that determine
  Phase progression.
- **`playbooks/kill-or-scale-review.md`** — the verdict gate that
  this plan feeds and is fed by.

## 9. Decision-log discipline

The following decisions get a logged entry **before** they execute:

- Adopting any paid line above the §1 default stack.
- Promoting a brand from Phase A to Phase B.
- Promoting a brand from Phase B to Phase C.
- Engaging an accountant or lawyer.
- Adopting any monetisation stream not in §3.
- Killing a brand.

Every entry uses the format in `docs/15-decision-log.md`'s preamble.

## 10. What "done" looks like at the end of year 1

Three honest possibilities, all acceptable:

- **One brand at Phase C** with documented unit economics, plus two
  brands killed or held. Operator continues.
- **All three brands killed** but the operating system survives;
  cohort 2 launches with stricter niche selection. Operator
  continues.
- **No brand reaches Stage 2 monetisation**; lab pauses and the
  operator returns the year-1 outcome to the decision log as
  data, not failure.

The business plan is *robust* to all three. We have not bet the
business on any single brand.

## 11. Cross-references

- `docs/unit-economics.md` — per-unit cost / revenue numbers.
- `docs/profit-model.md` — scenario P&L (£0 / £50 / £250 / £1,000).
- `docs/PROJECTHYDRA-MASTER-PLAN.md` §1 + §11 — strategy and budget envelope.
- `docs/cost-control-and-free-tier-plan.md` — spend gates.
- `docs/legal-and-resilience.md` — entity / tax baseline.
- `docs/measurement-framework.md` — north-stars and KPIs that gate
  phase progression.
- `playbooks/kill-or-scale-review.md` — verdicts that drive the
  portfolio.
- `playbooks/weekly-review.md` — where business signals are
  reviewed weekly.

## 12. Out of scope (per #44)

- Incorporating a company (operator + accountant action when
  triggered).
- Opening additional bank accounts.
- Implementing live payment / affiliate integrations.
- Building spreadsheet automation unless a future PR requests it.
