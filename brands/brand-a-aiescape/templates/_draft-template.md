---
# Identity
slug: REPLACE-with-kebab-case-slug
brand: aiescape
title: REPLACE — ≤65 chars, tells the reader what they get
description: REPLACE — 145–160 chars; reads like a human wrote it.
date: YYYY-MM-DD

# Lifecycle (maps to content_asset.status in HQ DB)
status: draft    # one of: idea | brief | outline | draft | qa | staged | live | archived

# AI labelling (maps to content_asset.ai_augmentation)
ai_augmentation: assist   # none | assist | generated

# Monetisation
affiliate_in_play: false
# When true, the disclosure block below must appear ABOVE the first affiliate link.

# Editorial intent
primary_intent: REPLACE — single primary search intent in plain English
queries:
  - REPLACE — target query phrasing 1
  - REPLACE — target query phrasing 2
length_target_words: 2000

# Production
author: REPLACE — real human name
editor: REPLACE — real human name (can be the same person for solo ops)
reviewed_at:        # ISO datetime, set when QA passes (§4 of brand README)
notes:              # free-form scratchpad — unused headline candidates etc.

# Sources cited inline (must be primary / authoritative where contestable)
sources:
  - { title: '', url: '', retrieved: '' }
---

> ⓘ This piece was researched and drafted with AI assistance and edited by a human.
> We disclose AI use because the EU AI Act (Article 50) and our own policy require it.
{{#if affiliate_in_play}}
> **Disclosure.** This article contains affiliate links. If you buy through them we may
> earn a commission at no extra cost to you. See our [affiliate policy](/affiliate-disclosure).
{{/if}}

## TL;DR

REPLACE — 60–100 words. The thesis, with one specific number or fact.

## How I tested / Methodology

REPLACE — how the conclusions in this piece were arrived at. Time span,
sample size, what counts as "saved time", what was excluded.

## REPLACE — H2 section 1

REPLACE — body.

## REPLACE — H2 section 2

REPLACE — body.

## REPLACE — H2 section 3

REPLACE — body.

## What I'd avoid

REPLACE — one concrete don't, with a specific failure mode you've seen.

## Closing

REPLACE — what we'd do next (1 sentence), one thing we'd avoid (1 sentence),
single CTA (newsletter or related cornerstone).

---

<!--
EDITORIAL NOTES (do not publish; strip before staged):

- [ ] All `REPLACE` markers are gone.
- [ ] Sources cited inline where contestable; `sources:` populated.
- [ ] If `affiliate_in_play: true`, the disclosure block above renders and is
      placed ABOVE the first affiliate link in the body.
- [ ] AI-use disclosure block renders correctly.
- [ ] Run `qa/checklist.md` end to end.
- [ ] Capture unused headline candidates in frontmatter `notes`.
-->
