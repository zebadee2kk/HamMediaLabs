# Brand C — Vulnerable-Reader Handling & Debt-Content Safety

> Binding gate. Walked at QA via `qa/checklist.md` §4. Triggered when
> `vulnerable_reader_topic: true` in the draft frontmatter. The
> safety standard here is higher than the lab-wide content quality
> gate because Brand C readers may include people in active financial
> distress.

---

## 0. What counts as a vulnerable-reader topic

Any of:

- **Debt** — credit-card debt, council-tax arrears, energy debt,
  rent arrears, mortgage arrears, loan default, BNPL pile-up.
- **Eviction / housing instability.**
- **Benefits / Universal Credit.**
- **Mental health** in financial context (the stress of money,
  not mental-health treatment itself).
- **Addiction** in financial context (gambling, alcohol, drugs in
  the context of household cost).
- **Job loss** / redundancy.

When any of these is the primary topic, this gate runs.

## 1. The non-negotiable placement rule

On any page where `vulnerable_reader_topic: true`:

- **Charity-link block appears at the top of the body**, above all
  other content (title and AI/FCA disclosure blocks are above the
  charity block; nothing else in between).
- **Charity links appear above any affiliate link on the page.** A
  page where the affiliate appears first is a no-publish.
- The charity-link block is rendered again at the bottom under
  "Where to get advice (not from us)".

Canonical block (UK-first):

> **If this affects you, free and impartial help is available.**
> [MoneyHelper](https://www.moneyhelper.org.uk/) (general money
> guidance, government-backed), [Citizens Advice](https://www.citizensadvice.org.uk/)
> (debt, benefits, housing), [StepChange](https://www.stepchange.org/)
> (free debt advice). National Debtline (0808 808 4000) is free and
> confidential.

The references are not editorial recommendations; they are the
fallback we *always* point at when the topic is heavy.

## 2. Debt content — specific safety rules

- **No "debt-management" / "consolidation" affiliate links.** Those
  are FCA-regulated promotions we are not authorised to issue
  (`qa/fca-perimeter.md` §6).
- **No "best loan to clear debt" / "best balance-transfer card"
  pieces.** Off-limits, full stop.
- **No anecdotal "I used X service and it worked" framing for any
  regulated debt-management or consumer-credit product.**
- **Breathing Space** content is allowed and encouraged because the
  scheme is GOV.UK-run; cite GOV.UK directly.
- **Debt Relief Order (DRO) / Individual Voluntary Arrangement
  (IVA) / bankruptcy** content is **information only**; readers are
  routed to StepChange / Citizens Advice for application advice.
- **Energy debt** content covers the supplier-side mitigation
  schemes (Warm Home Discount, supplier hardship funds) and the
  Ofgem-mandated tariff protections; never promotes a specific debt
  collector or DCA.

## 3. Tone / framing rules

- **Never frame debt as a moral failing.** Phrases like "if you'd
  only", "people who can't manage their money", "be smarter with
  your finances" — out.
- **Never assume the reader has spare time, spare money, or social
  support.** The voice doc's "small lever, small lever, small
  lever" maxim applies — and a reader's "no lever this month" is
  a valid state.
- **Never present a generic optimisation as a solution.** "Switch
  energy supplier" is not a debt-relief plan; saying so understates
  the problem.
- **No urgency / fear copy.** Topic is already heavy.
- **No "before it's too late" framing** anywhere in the body.

## 4. Sourcing rules (extension of `qa/checklist.md` §6)

For vulnerable-reader topics, the source requirement tightens:

- Every claim about a regulated scheme cites GOV.UK or the
  scheme's official page.
- Every claim about a charity service cites that charity's page.
- Every figure about UK debt / poverty / cost-of-living cites ONS,
  the Office for Budget Responsibility, or a charity's annual
  report — never a press summary alone.

## 5. Reader correspondence

When a reader emails about a vulnerable-reader topic:

- Reply within 7 days at the latest.
- Never offer specific financial advice in reply (`qa/fca-perimeter.md`
  posture applies to private messages too).
- Always reference MoneyHelper / Citizens Advice / StepChange.
- If the reader appears to be in immediate distress (suicidal
  ideation, eviction within days, no food), include Samaritans
  (116 123) at the top of the reply — kindness is the first
  obligation.
- Never quote the reader's email in published content without
  written consent.

## 6. Operator wellbeing check

Writing this material is heavy. The operator builds in:

- A "stop" rule: if the draft is taking emotional toll, walk away;
  return in 24 hours.
- A second-opinion check: any debt-content piece is read by a second
  human before `staged` if at all possible.
- A "no after-9pm publishing" rule for vulnerable-reader pieces —
  matches platform algorithm preferences and reduces the chance of
  a tired final edit.

## 7. Cross-references

- `docs/legal-and-resilience.md` §7 — lab-wide vulnerable-reader rule.
- `qa/fca-perimeter.md` — recommendation vs information boundary.
- `qa/affiliate-redlines.md` — affiliate placement and red lines.
- `voice.md` §1 character bio — the persona explicitly refuses
  punching-down framings.
- `playbooks/platform-strike-response.md` — if a platform flags a
  vulnerable-reader piece, the response treats the brand's surface
  more conservatively than usual.
