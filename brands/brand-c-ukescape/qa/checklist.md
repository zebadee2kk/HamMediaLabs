# Brand C — QA Checklist (binding gate)

> Walked by a human persona owner before `status: qa` → `status: staged`.
> Every item is blocking. Runs alongside `playbooks/voice-fidelity-checklist.md`
> AND `qa/fca-perimeter.md` AND (if applicable) `qa/vulnerable-reader.md`.
> The AI QA pass (`prompts/04-qa-pass.md`) is **input**, never substitute.

---

## 1. Frontmatter

- [ ] `slug` kebab-case and unique.
- [ ] `title` ≤65 chars, plain English, no urgency.
- [ ] `description` 145–160 chars.
- [ ] `status: qa` (about to flip to `staged`).
- [ ] `ai_augmentation` accurate.
- [ ] `affiliate_in_play` matches the body.
- [ ] `regulated_product_mentioned` matches the body.
- [ ] `authorised_promoter_check` is `passed` or `not_applicable` (never `pending` at this stage).
- [ ] `vulnerable_reader_topic` matches the body.
- [ ] `charity_links_at_top` matches the rendered page when `vulnerable_reader_topic: true`.
- [ ] `author` and `editor` are real human names.
- [ ] `sources[]` populated; every entry has a retrieval date.

## 2. Disclaimer & disclosure

- [ ] AI-use disclosure block renders above the byline.
- [ ] FCA disclaimer block (per `qa/fca-perimeter.md` §3) renders above the byline.
- [ ] If `affiliate_in_play: true`: affiliate disclosure block immediately above the **first** affiliate link.
- [ ] If `vulnerable_reader_topic: true`: charity-link block at the **top** of the body (above all other content) AND at the bottom under "Where to get advice (not from us)".

## 3. FCA-perimeter (mandatory — see `qa/fca-perimeter.md`)

- [ ] 3-line check walked on every monetised reference and every regulated-product mention.
- [ ] No personalised financial advice present.
- [ ] No "best loan / best credit card / best mortgage / best ISA" framing.
- [ ] No forecast presented as a recommendation.
- [ ] No prediction of markets, rates, or asset prices.

## 4. Vulnerable-reader (when applicable — see `qa/vulnerable-reader.md`)

- [ ] Topic correctly flagged.
- [ ] Charity-link block at the **top** of the body.
- [ ] No affiliate link appears above the charity-link block.
- [ ] No language that calls financial difficulty a moral failing.
- [ ] No "you just need to budget better" framing.
- [ ] Debt-content rules walked (`qa/vulnerable-reader.md` §2).

## 5. Anti-urgency / anti-scarcity

- [ ] No "act now / limited time / before it's too late / today only" phrasing.
- [ ] No exclamation marks in body copy.
- [ ] No countdown timers, scarcity badges, or banner urgency.
- [ ] No "you deserve" / "you've earned it" framing.

## 6. Specificity & sourcing

- [ ] Every contestable claim cited inline from a primary UK source (GOV.UK / Ofgem / FCA / HMRC / ONS / MoneyHelper / Citizens Advice / StepChange).
- [ ] Every statistic carries a retrieval date in `sources:`.
- [ ] No round-number "average household saves £X" claims without source.
- [ ] No "studies show" / "experts say" without a link.
- [ ] Comparison-site numbers are dated snapshots; the calculator link is provided.

## 7. Voice & affiliate red-lines

- [ ] None of `voice.md` §5 anti-voice patterns appear.
- [ ] Voice fidelity gate (`playbooks/voice-fidelity-checklist.md`) green; read-aloud passed.
- [ ] Affiliate red-lines (`qa/affiliate-redlines.md`) green.

## 8. Defamation safety

- [ ] No named real public figure.
- [ ] No real-company **takedown by name**; generic ("comparison sites", "energy retailers") used instead.
- [ ] Quotes only from public, attributed statements with a primary-source link.
- [ ] No fabricated reader testimonials. Anonymised composites labelled honestly.

## 9. Voice fidelity (mandatory parallel gate)

- [ ] `playbooks/voice-fidelity-checklist.md` walked end-to-end.
- [ ] §3 Voice DNA: at least two favourite phrases used naturally.
- [ ] §5 Anti-voice: zero patterns present (re-grep at this stage).

## 10. Approval

- [ ] One human persona owner has read the piece end-to-end after this checklist.
- [ ] `reviewed_at` set to the ISO timestamp of approval.
- [ ] Status flipped to `staged` only after every box above is ticked.

## 11. Tier discipline reminder

- Phase 6: Tier 2 manual posting only. Hard ceiling.
- Tier 3 considered only after **90 days** of clean Tier 2 (stricter than Brand A's 30) and an FCA-compatible monetisation path live for ≥30 days.
- Tier 4 frozen for year 1 AND requires paid legal advice before any re-evaluation specific to Brand C.

## Verdict

The piece can flip to `status: staged` only when **every** box above
is ticked. The bar is not "good enough" — the bar is "this is
truthful, this is safe, this is unmistakably Brand C, and this would
survive a regulator reading it".
