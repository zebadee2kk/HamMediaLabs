# Editorial Style Guide

> The voice rules everything HamMediaLabs publishes. Each brand has its own voice doc
> (`brands/<slug>/voice.md`) which **extends** this guide; rules below apply unless a
> brand voice explicitly overrides them.

---

## 1. Stance

- Write for the reader. The reader is busy, smart enough, and a little skeptical.
- Tell the reader what to do or what to think, then explain why.
- Cut throat-clearing. The first sentence is the thesis, not the warm-up.
- Specificity over hedging. "It saved 14 minutes in our test" beats "it can save time".

## 2. Voice (lab-wide defaults)

- **Confident, not arrogant.** We've done the work; we don't pretend to be the only ones.
- **Plain English.** Reading age target: 14. Use the simpler word if it carries the same load.
- **Active voice.** Subject does verb to object.
- **Short sentences win.** Average 14–18 words. Vary length, but don't run on.
- **Concrete over abstract.** Examples and numbers, not adjectives.
- **No emoji in body copy** (except where a brand voice doc explicitly permits it).
- **No clickbait.** Headlines tell, they don't tease.

## 3. Structure

- One idea per paragraph. Max 3 sentences.
- One H1 per page (the title). Use H2 for sections, H3 for subsections. Avoid H4.
- Use a TL;DR or "what you'll learn" block at the top of any piece >800 words.
- Bullet lists for parallel items. Numbered lists only when order matters.
- Tables when comparing ≥3 items on ≥3 attributes.
- End every longform with: (a) what we'd do next, (b) one thing we'd avoid.

## 4. Headlines

- Tell the reader what they get. Don't hide the verb.
- Numbers in headlines are fine; never round up.
- No questions in headlines unless the article answers them in the first paragraph.
- Avoid superlatives ("best ever", "ultimate") — the SERP is full of them.

## 5. Sourcing & accuracy

- Every factual claim that a reader could plausibly want to verify gets a link or a citation.
- Prefer primary sources (regulator pages, official docs) over secondary roundups.
- Outdated stats (>18 months) need re-verification before publish.
- If we can't verify a number, we don't write it.

## 6. Inclusive language

- Default to "they/them" when gender isn't relevant.
- Avoid metaphors that exclude (e.g. ableist, gendered, culturally specific without context).
- Default to UK English on Brand C, US English on Brand A, the brand's choice on Brand B.

## 7. AI labelling (mechanics)

- Every page renders the AI-use label (from `docs/18-disclosure-templates.md` §3) above the byline.
- Every commercial social post includes `#ad` in the body (not bio) and the AI-assist line.
- Satire (Brand B) uses the satire label variant.

## 8. Affiliate handling

- First affiliate link in any piece is preceded by the inline disclosure (§2 of disclosure templates).
- Comparison tables of affiliate products are *opt-in* clear: "Affiliate links — we may earn a commission" is visible inside the table.
- Never promote products we haven't either used or vetted against a published checklist.

## 9. Images

- Original or licensed only. If AI-generated, the alt text says so.
- Compress to ≤200 KB per image where feasible.
- No images of real, identifiable people without permission.

## 10. SEO (without being SEO-only)

- Target one primary search intent per piece. Map it before drafting.
- Write the title first, the H1 second, the intro third — and don't write the body until those three line up.
- Meta description = 145–160 chars, includes the primary query phrasing, and reads like a human wrote it.
- Internal-link generously to related content on the same brand; avoid cross-brand interlinking at MVP.

## 11. Content quality bar (the "do we ship?" checklist)

- [ ] Single primary intent met
- [ ] Useful in the first 30 seconds of reading
- [ ] Specific (numbers, names, dates)
- [ ] Original POV present (not just an aggregation of other posts)
- [ ] Sourced where contestable
- [ ] AI label + affiliate disclosure (if applicable) in place
- [ ] Brand-voice doc respected
- [ ] Meta + OpenGraph + schema set
- [ ] Internal links to ≥2 related pieces on the same brand
- [ ] Reviewed against `playbooks/content-quality-checklist.md` red flags

## 12. The "no" list

- No "in today's fast-paced world".
- No fabricated quotes (including from real public figures, even as a "joke").
- No fake screenshots.
- No "studies show" without a link to the study.
- No countdown timers or false-scarcity copy.
- No before/after weight, finance, or health claims.
- No personalising financial, medical, or legal recommendations.

## 13. Brand-voice files extend this guide

Each brand has `brands/<slug>/voice.md` that defines:
- Voice persona (e.g. "Brand A: helpful peer who's tried it; not a guru")
- Words to use / avoid
- Reading-age override (if any)
- Allowed punctuation flourishes (em-dashes etc.)
- Banned topics
- House examples (paragraphs that show the voice in action)
