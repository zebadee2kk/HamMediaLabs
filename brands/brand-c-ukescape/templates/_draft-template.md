---
# Identity
slug: REPLACE-with-kebab-case-slug
brand: ukescape
title: REPLACE — ≤65 chars, plain English, no urgency
description: REPLACE — 145–160 chars, reads like the persona wrote it
date: YYYY-MM-DD

# Lifecycle
status: draft    # idea | brief | outline | draft | qa | staged | live | archived

# AI labelling
ai_augmentation: assist   # none | assist | generated

# Monetisation
affiliate_in_play: false
# When true, EVERY affiliate link below must pass qa/affiliate-redlines.md
# AND the FCA 3-line check in qa/fca-perimeter.md.

# Editorial intent
primary_intent: REPLACE — single primary search intent
queries:
  - REPLACE — target query
  - REPLACE — target query
length_target_words: 1800

# Brand C-specific compliance fields
regulated_product_mentioned: false
# Set true if the piece mentions any FCA-regulated product (loan,
# credit card, mortgage, investment, pension, insurance, BNPL,
# crypto, claims-management). Triggers the qa/fca-perimeter.md
# 3-line check on every monetised reference.

authorised_promoter_check: pending
# Values: pending | not_applicable | passed | failed.
# If regulated_product_mentioned is true and affiliate_in_play is
# true, this must be `passed` before status: staged.

vulnerable_reader_topic: false
# Set true if the piece touches debt, eviction, benefits, mental
# health, addiction, or job loss. Triggers qa/vulnerable-reader.md.
# When true, charity links MUST appear at the top of the page.

charity_links_at_top: false
# When vulnerable_reader_topic is true, this must be true at
# status: staged.

# Production
author: REPLACE — real human name
editor: REPLACE — real human name
reviewed_at:
notes:

# Sources cited inline (PRIMARY UK sources where contestable)
sources:
  - { title: '', url: 'https://www.gov.uk/…', retrieved: 'YYYY-MM-DD' }
  - { title: '', url: 'https://www.ofgem.gov.uk/…', retrieved: 'YYYY-MM-DD' }
---

> ⓘ This piece was researched and drafted with AI assistance and edited by a human. We disclose AI use because the EU AI Act (Article 50) and our own policy require it.

> **This is general information, not financial advice.** We are not authorised to give regulated financial advice in the UK. Before making decisions about debt, credit, investments, insurance, or pensions, speak to a qualified adviser. Free, impartial advice is available from [MoneyHelper](https://www.moneyhelper.org.uk/), [Citizens Advice](https://www.citizensadvice.org.uk/), and [StepChange](https://www.stepchange.org/).

<!-- If vulnerable_reader_topic is true, the charity-links block above
     is duplicated here at the top of the body so it appears above
     any other content. See qa/vulnerable-reader.md. -->

## TL;DR

REPLACE — 60–100 words. The thesis with one specific number; one
"your number will differ because…" caveat.

## What changed (the numbers)

REPLACE — dated, sourced facts. Use the snapshot retrieval date
from `sources:`.

## What this means in practice

REPLACE — conditional, never recommendation-shaped. "If you, then X;
watch for Y" structure.

## What we'd watch this quarter

REPLACE — forecast inputs, not predictions presented as advice.

## The traps

REPLACE — one paragraph naming the common mistakes around this
topic; never names a specific company.

## Where to get advice (not from us)

> If this decision matters to you, speak to one of the following
> free, impartial services: [MoneyHelper](https://www.moneyhelper.org.uk/),
> [Citizens Advice](https://www.citizensadvice.org.uk/),
> [StepChange](https://www.stepchange.org/).

---

<!--
EDITORIAL NOTES (do not publish; strip before staged):

Pre-staged checklist (mirrors brands/brand-c-ukescape/qa/checklist.md):
- [ ] All REPLACE markers gone.
- [ ] author / editor are real human names; reviewed_at set.
- [ ] FCA disclaimer block renders above the byline.
- [ ] If regulated_product_mentioned: walk qa/fca-perimeter.md 3-line
       check; authorised_promoter_check is "passed" or "not_applicable".
- [ ] If vulnerable_reader_topic: charity-links block at top; charity
       links appear ABOVE any affiliate link.
- [ ] If affiliate_in_play: walk qa/affiliate-redlines.md; affiliate
       disclosure block immediately above the first affiliate link.
- [ ] Sources cited inline; sources[] populated with retrieval dates.
- [ ] No urgency / scarcity copy. No exclamation marks.
- [ ] Voice fidelity (playbooks/voice-fidelity-checklist.md) green.
- [ ] qa/checklist.md walked end-to-end.
-->
