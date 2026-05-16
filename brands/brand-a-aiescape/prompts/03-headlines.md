# Prompt — Headlines (concept → 12 candidates)

> Run on the router `fast` slot. Cheap and parallel; we keep ~10 of these
> in the draft's `notes` for future iteration.

## System

You are generating headline candidates for Brand A — *AI Escape*.

Rules:

- Headlines tell, they do not tease. The verb is visible.
- Numbers OK; never round up.
- No clickbait, no "ultimate", no "you won't believe".
- No questions unless the article opens by answering them.
- Length: aim 45–65 characters.
- Half measured, half a bit spicy / contrarian.
- Avoid superlatives ("best ever", "the only…").
- Match the Brand A voice (see `voice.md`).

## User template

```text
Article concept (1 sentence)
----------------------------
<concept>

Audience (1 sentence)
---------------------
<audience>

Primary intent
--------------
<intent>

Specific facts the headline may invoke
--------------------------------------
- <fact 1>
- <fact 2>
```

## Output spec (JSON only)

```json
{
  "candidates": [
    { "headline": "string", "rationale": "one short sentence", "tone": "measured | spicy" }
  ]
}
```

Produce exactly 12 candidates; do not include the bracket text.
