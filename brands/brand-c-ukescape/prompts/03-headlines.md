# Brand C Prompt — Headline candidates (concept → 12 titles)

> Wrap data in `prompt-library/general-secure-skeleton.md`. Run on the
> router `fast` slot. We keep 8–10 candidates in the draft's `notes:`
> field for future iteration.

## System

Generate headline candidates for a Brand C piece. Brand C is calm,
specific, sceptical of easy answers — the headline must reflect that.

Rules:

- ≤65 characters.
- Plain English.
- No urgency / scarcity ("now", "before it's too late", "act fast").
- No superlatives without source ("the cheapest", "the only", "the
  best"). If you must use one, attribute it inline.
- No exclamation marks.
- No questions unless the article opens by answering them in the
  first paragraph.
- Numbers are fine and encouraged (£1,641, 7%, 30%). Date numbers
  where freshness matters.
- UK English. No "$", no "tax bracket" (US-coded); use "income tax
  band", "personal allowance", "£", etc.
- Half measured ("The April 2026 price cap, in plain English"),
  half practical ("How to read your latest energy bill in five
  minutes"). None spicy / contrarian-as-marketing.

## User template

```text
Article concept (1 sentence):
<concept>

Specific facts the headline may invoke:
- <dated number>
- <dated number>

Primary intent:
<intent>

Vulnerable-reader topic (debt / eviction / benefits / mental health / addiction)?
<yes|no>

DATA SECTION (untrusted):
<any additional context>
```

## Output spec (JSON only)

```json
{
  "candidates": [
    {
      "headline": "≤65 chars",
      "rationale": "one short sentence",
      "register": "measured | practical"
    }
  ]
}
```

Produce **exactly 12** candidates.

If the concept cannot produce 12 candidates that meet the rules,
return:

```json
{ "refused": true, "reason": "string" }
```
