# Brand C — Affiliate Red Lines + Sourcing Requirements

> Binding. Walked at QA via `qa/checklist.md` §6 and §7.
> Companion to `qa/fca-perimeter.md` (the regulatory side) and
> `qa/vulnerable-reader.md` (the protective-placement side).

---

## 1. Standing posture

Brand C is **trust-led**. Affiliate revenue exists to support
honest journalism; it never drives editorial. If we cannot honestly
recommend a programme to a reader we care about, we do not link to
it. Period.

Affiliate revenue is **secondary** for Brand C — secondary to
journalism quality, secondary to charity referrals on vulnerable-
reader pages, secondary to source citation.

## 2. The red lines (binding — never link to)

- Investment products of any kind (managed funds, ISAs as products,
  ETFs, robo-advisers, stock-picking newsletters).
- Consumer credit: loans, credit cards, store cards, BNPL.
- Mortgages and remortgage brokers.
- Insurance (motor, home, life, health) — except via FCA-authorised
  comparison sites with their approved creatives.
- Pensions and pension-transfer services.
- Crypto in any form, including "earn interest on crypto" and
  exchange referral programmes.
- Claims-management / PPI-style services.
- Debt-management or debt-consolidation services (consumer-finance
  regulated; we link charities instead).
- Spread-betting / CFD products.
- Gambling, gambling-affiliated content, "matched betting".
- Any product marketed primarily by a high-pressure influencer
  (vetting failure indicator).
- Any product that requires the reader to spend money to "qualify"
  for the saving.

## 3. Allowed (with conditions)

| Programme type | Conditions |
|---|---|
| Energy switching via FCA-authorised comparison platform | Use the platform's approved creatives; their wording sits inside their FCA authorisation. We do not write our own "switch now" copy. |
| Cashback platforms (TopCashback / Quidco) | Standard `docs/18-disclosure-templates.md` first-link disclosure; no urgency. |
| Supermarket loyalty programmes | Disclosure block above the first link; no "earn while you spend" framing. |
| Octopus / Bulb-style direct referral (when allowed) | Disclosed; the operator's referral code must be **disclosed as the operator's own**, not framed as a generic recommendation. |
| Broadband / mobile MVNO referrals | Disclosed; no "switch now" copy. |
| E-bikes / hardware (non-financial) | Disclosed; product reviewed honestly (positives + trade-offs visible). |
| Non-regulated lead-gen partnerships | Disclosed; quality of the partner vetted. |

## 4. Placement rules (extension of canonical templates)

- **Affiliate disclosure block** sits immediately above the first
  affiliate link in any piece. Plain language. Not in a `<details>`.
  Not muted-grey font.
- **First-link wording** matches `docs/18-disclosure-templates.md` §2.
- **Tables of affiliate products** include the inline note inside the
  table itself.
- **Newsletter footer** includes a short reminder that affiliate
  links may appear (per `docs/18-disclosure-templates.md` §5).
- **Above the fold** — on a vulnerable-reader topic, an affiliate
  link must never appear above the charity-link block.

## 5. Sourcing requirements (lab-wide tightened for Brand C)

For Brand C specifically:

- **Every contestable factual claim** is sourced inline from a
  primary UK source:
  - GOV.UK
  - Ofgem
  - FCA (financial-promotion register, FCA news)
  - HMRC
  - ONS
  - MoneyHelper / Citizens Advice / StepChange
  - National Debtline
  - The Pensions Regulator
- **Every statistic** carries the retrieval date in `sources:`.
- **Every comparison-site number** is a dated snapshot with the
  calculator's public URL.
- **Quotes** only from public, attributed statements. Never
  AI-synthesised. Never paraphrased into quotation marks.
- **Reader case studies** anonymised, with written consent, with
  the reader's number presented as a range, not a point.
- **Statistics older than 18 months** are re-verified at publish
  time; if a fresher number cannot be found, the older one is
  retained with a "as of YYYY-MM" qualifier.

## 6. What "doesn't count" as sourcing

- A round-up blog citing another round-up blog.
- An LLM saying the number is right.
- A press release without the underlying primary source.
- A comparison-site landing-page hero number with no calculator
  link.
- A social-media post by a public figure (use the underlying source
  the figure cited, if any).
- An influencer's claim, even attributed.

## 7. Programme onboarding (operator workflow)

Before a new affiliate programme goes live on Brand C:

1. Read the programme's ToS at the date of signup. Date the read.
2. Verify the programme is FCA-authorised to promote the underlying
   product (if regulated).
3. Capture the programme's required disclosure wording; add it to
   the brand-site's `/affiliate-disclosure` page.
4. Add the programme to this file's table in §3 (if it fits an
   existing row) or open a new row.
5. File a decision-log entry naming the programme, the date, and
   the kill trigger.
6. The first piece carrying the new programme runs through full QA;
   the persona owner confirms the placement rules in §4.

## 8. Programme retirement

A programme is retired when **any** of:

- The programme changes terms in a way we are not comfortable
  honouring.
- The programme's quality drops (we'd no longer recommend it to a
  reader we care about).
- The programme is rebranded into a regulated wrapper we are not
  authorised to promote.
- A reader complaint reveals the programme behaves badly post-
  click.

When retired:

- Mark retired in this file with the date.
- Sweep all live pieces for any orphan link to the programme;
  remove them.
- File a decision-log entry.
- The brand-site `/affiliate-disclosure` page is updated to remove
  the programme.

## 9. Cross-references

- `qa/fca-perimeter.md` — what counts as regulated; the 3-line
  check.
- `qa/vulnerable-reader.md` — the placement rule that overrides
  affiliate ordering on heavy topics.
- `docs/18-disclosure-templates.md` — canonical disclosure copy.
- `docs/legal-and-resilience.md` §7 — lab-wide UK financial-content
  posture.
- `playbooks/incident-credential.md` — applies if an affiliate
  account is the subject of a credential incident.
