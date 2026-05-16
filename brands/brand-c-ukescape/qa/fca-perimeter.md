# Brand C — FCA Perimeter Gate

> The single most important compliance gate on Brand C. Walked at QA
> via `qa/checklist.md` §3. Conservative by design.
>
> **Not legal advice.** Operational governance written for an operator,
> not a regulator. The thresholds at which paid legal advice becomes
> mandatory are in `docs/legal-and-resilience.md` §10.

---

## 1. The standing posture

Brand C is **information only.** We do not:

- Give personalised financial recommendations.
- Issue or approve financial promotions of regulated products
  unless an FCA-authorised firm has approved the creatives in
  writing.
- Operate as an FCA-authorised firm (we are not).

We **do**:

- Publish journalism about money (price-cap explainers, what-the-
  budget-changed, energy-switching mechanics).
- Cite primary UK sources (GOV.UK, Ofgem, FCA, HMRC, ONS,
  MoneyHelper, Citizens Advice, StepChange).
- Link to charity advice services prominently on any page touching
  debt / eviction / benefits / mental health.
- Run affiliate links **only** to non-regulated lifestyle / cashback
  / utility / supermarket-loyalty programmes, or to FCA-authorised
  promoters' partner programmes that have approved our creatives in
  writing.

## 2. The 3-line check (binding, on every monetised reference)

Before any link to a product or service:

1. **Is the product FCA-regulated?**
   Regulated examples: investment products, consumer credit (loans,
   credit cards, BNPL), mortgages, insurance, pensions, claims-
   management, crypto-asset financial promotions, contracts for
   difference, spread betting, debt-management services.
2. **Is the affiliate / promoter FCA-authorised to promote it?**
   The platform we link *through* matters. Uswitch / Compare the
   Market sit inside FCA authorisations for the products they
   compare; many independent affiliate networks do not.
3. **Is our copy generic information or a recommendation?**
   Information: "the energy price cap fell 7% in April 2026".
   Recommendation: "switch to X before the rise".
   Borderline: "we'd switch if our usage was above the typical
   household level" — this is conditional information; review with
   extra care.

If **any** answer is wrong, the link is dropped.

## 3. Standing disclaimer block (binding)

Every money-touching page renders the following block above the
byline. Copy is canonical (do not paraphrase):

```
This is general information, not financial advice. We are not
authorised to give regulated financial advice in the UK. Before
making decisions about debt, credit, investments, insurance, or
pensions, speak to a qualified adviser. Free, impartial advice is
available from MoneyHelper (moneyhelper.org.uk), Citizens Advice
(citizensadvice.org.uk), and StepChange (stepchange.org).
```

The canonical-template version lives in
`docs/18-disclosure-templates.md` §11; this section is the
operational placement rule.

## 4. Prohibited claims (any one is a blocker)

- "Risk-free", "guaranteed", "guaranteed returns".
- "Cheapest" / "best" without an inline primary source attributing
  the claim.
- "Save up to £X" without a per-scenario calculator linked.
- Any specific price prediction presented as actionable ("rates will
  fall in June; refinance now").
- "We recommend / we suggest / you should switch / you should
  invest" — the recommendation verbs are off-limits for regulated
  products.
- "Beat the cap", "beat the market", "outperform inflation".
- Any wording that implies we have run a financial assessment of
  the reader's situation.
- Any wording that frames debt as a moral failing.

## 5. Forecast vs recommendation (the boundary)

| Phrase | Verdict |
|---|---|
| "Ofgem is consulting on the July cap and current modelling suggests it could rise by ~12%." | Journalism (if sourced). |
| "Switch before the July cap rise." | Recommendation. **Blocker.** |
| "If your usage is above the typical household, watch the cap announcement." | Conditional information. **Acceptable with care.** |
| "We'd switch right now if we hadn't already." | First-person operator anecdote. **Acceptable if labelled honestly and not generalised.** |
| "We recommend everyone switch this week." | Generalised recommendation. **Blocker.** |

When in doubt: cut the verb. "Here's the maths" lands; "Switch" doesn't.

## 6. Affiliate gating

- Investment / loan / credit-card / mortgage / BNPL / crypto /
  insurance / claims-management affiliate links: **forbidden** at
  MVP, full stop.
- Energy switching affiliate links: **allowed only** through
  FCA-authorised comparison-platform partner programmes
  (Uswitch / Compare the Market style), with their approved
  creatives.
- Cashback platforms (TopCashback / Quidco): **allowed**.
- Supermarket loyalty / Octopus referral / broadband partners:
  **allowed** under the standard `docs/18-disclosure-templates.md`
  affiliate-disclosure placement.
- Lead-gen partnerships in non-regulated lifestyle verticals
  (e-bikes, broadband, utilities): **allowed** with disclosure.

When in doubt → not allowed. Open a decision-log entry asking the
question.

## 7. ASA / CAP layer

Beyond FCA, the Advertising Standards Authority / Committee of
Advertising Practice (CAP) cover all marketing communications:

- Every affiliate / sponsored / commercial reference carries `#ad`
  in the body (not the bio) on social mirrors.
- AI-generated content does not get an ASA exemption; the same rules
  apply.
- ASA "Active Ad Monitoring" (2026) scans for non-compliance; treat
  every commercial reference as if a monitor will see it.

## 8. ICO (data protection) layer

- Cookieless analytics by default (Plausible / CF Web Analytics).
- Newsletter signup is opt-in and confirmed; lawful basis = consent.
- Contact email is the operator's brand alias; data minimised.
- A data-subject access request, if it ever arrives, gets a 30-day
  response per UK GDPR.

## 9. Decision-log discipline

Every change to FCA / ASA / ICO interpretation in this doc files a
decision-log entry naming the regulator update or rationale.

## 10. Operational reminders

- **Read aloud test:** before a page goes live, the operator reads
  any money-touching paragraph aloud. If it sounds like advice,
  it is.
- **Charity links above affiliates on vulnerable-reader pages.**
  Non-negotiable (`qa/vulnerable-reader.md`).
- **Snapshot retrieval dates** on every comparison-site number.
- **No countdowns, no scarcity, no exclamation marks** in body copy
  on any money-touching page.

## 11. Cross-references

- `docs/18-disclosure-templates.md` §11 — canonical disclaimer copy.
- `docs/legal-and-resilience.md` §7 — surrounding framework.
- `docs/20-competitive-research.md` §3 — Brand C scope discipline.
- `qa/vulnerable-reader.md` — vulnerable-reader + debt-content rules.
- `qa/affiliate-redlines.md` — affiliate placement + sourcing
  requirements.
- `playbooks/platform-strike-response.md` — what to do if a regulator
  contacts us.
