# Brand Voice Template (`voice.md` canonical spec)

> Every brand has a `voice.md` at `brands/<slug>/voice.md`. This is the
> canonical structure. Voice docs **extend** `docs/17-style-guide.md`;
> where they conflict, the brand voice wins for that brand.
>
> The spec for *why* this file exists is `docs/voice-authenticity-system.md`.
> The pattern this template instantiates is the same one Brand A's
> `voice.md` follows; treat Brand A as the baseline reference
> implementation.

---

## 1. Character bio (1–2 paragraphs — required)

A persona biography. The persona is **a specific human with opinions,
history, rhythm, taste, and limits** — not an audience archetype, not
a marketing slogan, not "a friendly expert".

Include:
- **Background** — what they actually do in a week.
- **Frustrations** — the thing that made them care.
- **What they have tried** — failed experiments named.
- **What they now believe** — one or two earned convictions.
- **What they refuse to tolerate** — the line that anchors the brand.

Anti-pattern: "Friendly, helpful, approachable expert who breaks down
complex topics." That's a stock photo, not a persona.

## 2. Voice contrasts (required)

Define the brand in tensions. Always two-sided.

Suggested axes:
- Warm but not saccharine
- Confident but self-deprecating
- Direct but not rude
- Skeptical but not cynical
- Funny but not cruel
- Specific but not pedantic
- Opinionated but not preachy

Pick 4–6 axes that fit *this* brand; don't ship the full list.

## 3. Voice DNA (required)

- **Favourite phrases** — 5–10 phrases the persona uses unconsciously.
- **Pet peeves** — language that grates on the persona.
- **Sentence rhythm** — short and clipped? long and digressive?
  Average length and variance.
- **Slang / jargon level** — high, medium, low; per-vertical.
- **Cultural references** — what the persona watches, reads, listens
  to. Concrete examples; "all the recent ones" is not a reference.
- **How the persona handles mistakes** — corrections, apologies,
  walking-back wording.
- **How the persona handles hype** — what they say when the industry
  is screaming about The Next Thing.

## 4. House examples (required — companion file)

Maintain 5–10 gold-standard examples in `brands/<slug>/house-examples.md`
using `brands/templates/house-examples-template.md`. Examples include:

- Strong opening
- Mid-piece rant
- Measured recommendation
- Takedown of bad advice
- Comment-reply style
- Short-form social post
- Long-form intro
- **One bad example** to avoid (clearly labelled)

These are the anchor for any AI generation step. Without them, the
brand drifts toward generic.

## 5. Anti-voice (required)

Explicitly list what the brand must never sound like. This section is
the **canon banned list** for QA and the prompt pack. Examples:

- "In today's fast-paced world…"
- Bland listicles without a strong point of view
- Unnatural positivity
- Repetitive paragraph structures
- Hedging without reason
- Over-explaining obvious points
- Generic motivational filler
- AI-tell sentence shapes ("Let's dive into…", "The world of X…")

Add brand-specific entries beyond the lab-wide bans in
`docs/17-style-guide.md`.

## 6. Voice settings (operational defaults)

- **Person:** first / second / third (default per brand)
- **Tense:** present / past / mixed (default per brand)
- **Reading age:** target band (e.g. 14–16)
- **English:** UK / US / mixed
- **Allowed flourishes:** em-dashes, parentheticals, footnotes, etc.
- **Emoji policy:** none / sparing / brand-coded
- **Length defaults:** short-form / long-form per surface

## 7. Specificity rule (required — per piece)

At least one specific, concrete detail must appear in most long-form
pieces. Acceptable shapes:

- A messy operational anecdote
- A tool failure
- A cost comparison
- A real trade-off
- A practical mistake

Never invent false personal experiences. If an anecdote is illustrative
or composite, label it honestly (e.g. "an anonymised composite from
several reader emails").

## 8. Refresh cadence

Every 3–6 months the voice doc is refreshed by:

1. Reading top-performing pieces from the period.
2. Extracting any new winning phrases / structures into §3 and §4.
3. Removing stale voice rules.
4. Reviewing the anti-voice list for new patterns to ban.

Refresh logged in `docs/15-decision-log.md` with a date.

## 9. Persona ownership

Each voice doc names a **persona owner** — a real human who decides
"would the persona say this?" at QA time. Same person who runs the
read-aloud gate in `playbooks/voice-fidelity-checklist.md`.

## 10. Reference implementation

Brand A's `brands/brand-a-aiescape/voice.md` is the baseline reference
implementation. New brands should mirror its structure first, then
adapt §1–§5 to their persona.
