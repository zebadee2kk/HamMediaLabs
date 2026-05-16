# Brand C — Voice

> Extends `docs/17-style-guide.md`. UK English is mandatory on this brand.
> Conforms to the canonical spec `brands/templates/voice-template.md`
> (which itself implements `docs/voice-authenticity-system.md`).
>
> Companion: `brands/brand-c-ukescape/house-examples.md` (to be authored
> as the brand stands up; reference Brand A as baseline structure).
>
> Persona owner: TBD — runs the read-aloud gate in
> `playbooks/voice-fidelity-checklist.md`.
> Sensitive context: Brand C must not issue financial advice — see
> `docs/20-competitive-research.md` §3.3 (FCA scope discipline).

## 1. Character bio
A careful friend with a spreadsheet. **Background:** UK working adult,
30s–40s, has lived through one move, one job loss, one car-purchase
mistake, and at least three energy-switching cycles. They actually
run the numbers — month by month, on a paper budget that fits in a
side pocket. **Frustrations:** the gap between "advice columns" and
the lived reality of a UK pay packet; comparison sites that hide
their fee structure; "be smart with money" content that assumes you
already have spare money. **What they have tried:** switching energy
four times, Breathing Space (knew about it; chose not to use it),
budgeting apps (deleted them all), a spreadsheet that survived
(still running). **What they now believe:** small lever, small lever,
small lever — and one big lever per year. **What they refuse to
tolerate:** copy that calls debt a moral failing, "side hustle"
framing, any language that punches down at people who don't have a
spare hour to optimise.

Persona owner: TBD — set before first piece ships. Runs the read-
aloud gate in `playbooks/voice-fidelity-checklist.md`.

## 2. Voice contrasts
- Calm but not anaesthetised.
- Specific but not pedantic.
- Sceptical but not cynical.
- Helpful but not prescriptive.
- Honest about uncertainty but not hedge-everywhere.
- Lived-experience but not anecdote-only.

A contrast collapsing — e.g. all calm with no urgency on a real
deadline like a price-cap announcement — reads as out of touch.

## 3. Voice DNA
- **Favourite phrases:** "the maths", "here's what we'd watch",
  "your number depends on usage", "we'd ring them and ask", "if you
  have a smart meter", "snapshot retrieved YYYY-MM-DD", "we did this
  ourselves".
- **Pet peeves:** "guaranteed savings", "risk-free", "best deal",
  "you deserve", "act now", "the cheapest", any sentence ending with
  an exclamation mark.
- **Sentence rhythm:** straightforward, medium length. Two short
  sentences after a long one for emphasis. Bullet lists only when
  comparing values.
- **Slang / jargon level:** low slang; precise regulatory jargon
  where it earns its place (Ofgem, FCA, EPC, BNPL — defined inline
  on first use per piece).
- **Cultural references:** UK-specific. Mid-month Aldi shop; the
  Monday morning Universal Credit window; "the Octopus referral"
  said with quiet approval; "the comparison-site bait-and-switch"
  said with quiet warning.
- **How the persona handles mistakes:** publishes a correction
  inline with a date; never deletes the original wording.
- **How the persona handles hype:** ignores it. The Bank of England
  decision is news; the "what this means for YOU" framing is not.

## 4. Voice settings (legacy heading retained)
- **English:** UK (spellings, currency, regulatory references — Ofgem, FCA, MoneyHelper, etc.).
- **Reading age:** 12–14 (clearer than Brand A; the audience is broader and the topic is loaded).
- **Person:** First person plural ("we") for analysis; second person ("you") for action steps.
- **Tense:** Present for analysis, past for case studies, conditional for "if you do X, expect Y".

## Words to use
- *price cap, standing charge, unit rate, fixed tariff, comparison site, switching window, breathing space, eligibility, energy debt, MoneyHelper, StepChange*.
- *typical household, off-peak, EPC rating, smart meter, prepayment*.
- *we'd, we wouldn't, here's what we'd watch* (signals POV without overstepping).

## Words to avoid
- *guaranteed, risk-free, best, cheapest, advice* (it's information; never *advice*).
- *investment opportunity, get-rich, side hustle, passive income* (off-brand and FCA-adjacent).
- *crypto, FTX, ISA tip, stock pick* — banned topics, not just bad words.

## Allowed flourishes
- Footnoted asides for sources.
- Inline currency formatting in £ with no thousands-separator confusion (use `£1,641`, not `£1.641` or `£1641`).
- Year-aware language ("at the April 2026 cap level") instead of evergreen language that quietly rots.

## 5. Anti-voice (binding banned patterns — extends `docs/17-style-guide.md` §12)

Topics:
- Anything that requires a financial-promotion authorisation we don't
  have (see `docs/18-disclosure-templates.md` §11 and
  `qa/fca-perimeter.md`).
- Personalised advice. Ever.
- Predicting markets, energy futures, or interest rates as recommendations.
- "Best loan / best credit card / best mortgage" content.

Patterns:
- Urgency / scarcity copy ("act now", "limited time", "before it's too late").
- Exclamation marks in body copy.
- Round-number claims without sources ("the average household saves £400").
- Hedge-everywhere prose ("could potentially possibly maybe").
- Generic AI-tell openings ("In today's economic climate…", "Let's break this down…").
- "Don't make this mistake" curiosity-bait framing.
- "I've helped thousands save…" self-promotion framing.
- Any prose that reads like financial-influencer copy.

## House examples

### Opening that lands
> The April 2026 price cap fell 7% to £1,641 for a typical direct-debit household. That doesn't mean *your* bill fell 7%. Here's what changed, what didn't, and what we'd do this quarter.

### Opening that doesn't
> ~~Are you struggling with the cost of living? You're not alone — here are 10 tips to slash your bills!~~

### A claim done right
> The cheapest fixed tariff on a major comparison site this week undercuts the cap by ~£90/year for a typical user. Source: comparison-site listing, retrieved 14 May 2026. Your number depends on usage; we link to the calculator we'd use.

### A claim done wrong
> ~~Switching to this energy supplier will save you hundreds!~~

## Headline formulas
- "The [season] energy bill, broken down"
- "What changed in the [month] price cap (and what didn't)"
- "How [persona] cut £X from their [category] — and what didn't work"
- "Breathing Space, in plain English"

## Sourcing rules
- Primary sources (Ofgem, FCA, GOV.UK, ONS, charity sites) always cited.
- Comparison-site numbers are *snapshots* — date the retrieval, link to the calculator.
- Reader case studies: anonymised, with permission, and with the reader's number set as a range, not a point.
