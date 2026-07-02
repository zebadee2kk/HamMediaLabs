# Voice Fidelity Checklist

> Binding gate on every long-form piece before it moves to `status: staged`.
> Short-form surfaces (X posts/threads, video clips, captions) use the
> **Short-form addendum** at the bottom of this file instead of §2–§8.
> Sits **alongside** the lab-wide content quality checklist
> (`playbooks/content-quality-checklist.md`) and the brand-specific QA
> gates (e.g. `brands/brand-a-aiescape/qa/checklist.md`).
>
> Walked by the **persona owner** named in the brand profile. The AI QA
> pass is input, not output.

## Why

We are not in the volume business. The moat is **voice authenticity** —
content that sounds like a specific human with opinions. This checklist
is how that moat is enforced.

Spec: `docs/voice-authenticity-system.md`.

---

## 1. Inputs (set before the gate runs)

- [ ] Brand `voice.md` is up to date (refresh date is current per §8 of `brands/templates/voice-template.md`).
- [ ] `house-examples.md` exists and has at least 5 filled slots, including the "bad example".
- [ ] Persona owner is named in the brand profile and is the human walking this checklist.

## 2. Read-aloud gate (mandatory)

The persona owner reads the **opening 200 words and one mid-piece
paragraph aloud**, at normal pace, in a room with no one else.

After reading, answer:

- [ ] Would the persona actually say this, in that rhythm?
- [ ] Are there places I had to push through awkward phrasing? (If yes, fix them.)
- [ ] Did any sentence make me wince? (If yes, the reader will too — fix it.)
- [ ] Did I find a paragraph that I rushed because it bored me? (If yes, the reader bounces — rewrite or cut.)

**Reading aloud is the single highest-leverage check we run.** Do not
skip it because the piece "obviously sounds fine".

## 3. Character bio alignment

For each major claim or stance in the piece:

- [ ] Is the stance consistent with the persona's §1 (background, beliefs)?
- [ ] If the piece takes a contrarian view, is it consistent with what
      the persona has previously refused to tolerate (§1, §5 anti-voice)?
- [ ] Are anecdotes attributable to the persona's real (or honestly
      labelled composite) experience?

## 4. Voice contrasts present

- [ ] At least 3 of the brand's §2 voice contrasts (e.g. confident but
      self-deprecating) are visible in the piece.
- [ ] No contrast collapses into one side only (all-confidence with no
      self-deprecation reads as arrogance; all-skepticism reads as
      cynicism).

## 5. Voice DNA check

- [ ] At least 2 of the brand's §3 favourite phrases appear naturally
      (no forced cameo).
- [ ] No pet peeves slip through (search the draft for each).
- [ ] Sentence rhythm matches the brand's documented variance.
- [ ] Cultural references match the brand's documented register.

## 6. Anti-voice scan

- [ ] None of the brand's §5 anti-voice patterns appear.
- [ ] None of the lab-wide banned phrases from `docs/17-style-guide.md`
      §12 appear.
- [ ] No AI-tell sentence shapes ("Let's dive into…", "The world of
      X…", "In today's…", "It's important to note that…").

## 7. Specificity rule

- [ ] At least one specific concrete detail (anecdote / cost / failure /
      trade-off / mistake) appears.
- [ ] Adjective-stacking removed (max two consecutive adjectives modifying
      the same noun, and then only if both add information).
- [ ] Every "studies show" / "experts say" claim is replaced with a
      cited source or cut.

## 8. House-example comparison

- [ ] At least one passage in the draft is at the quality level of the
      relevant house example slot.
- [ ] No passage is below the quality of the §8 "bad example" — if so,
      it's hype filler; cut or rewrite.

## 9. Persona-owner sign-off

- [ ] The persona owner has read the entire piece end-to-end (not just
      sampled).
- [ ] The persona owner has set `reviewed_at` in the draft frontmatter.
- [ ] The persona owner has named one specific edit they made (recorded
      in the editorial-notes block) — if "none", they probably skimmed.
- [ ] The gate outcome is recorded as a `qa_event` row
      (`gate: 'voice_fidelity'`, `source: 'human'`, `verdict:
      'pass' | 'fail'`, `reviewer` = persona owner) — see
      `core/db/schema.sql`. Pass-rate below 80% is a risk-register
      trigger; unrecorded gates make that number a lie.

## 10. Promotion check

- [ ] If a passage from this piece is genuinely gold-standard, the
      persona owner has logged a swap-in candidate in
      `house-examples.md` §10 (Promotion log).

---

## Verdict

The piece can flip to `status: staged` only when **every** box above is
ticked. The verdict is not "good enough" — the verdict is "sounds like
us".

## What this checklist does NOT replace

- The lab-wide content quality checklist
  (`playbooks/content-quality-checklist.md`) — facts, disclosure,
  usefulness.
- Brand-specific QA gates — e.g. Brand A's
  `brands/brand-a-aiescape/qa/checklist.md` factuality / anti-hype /
  affiliate-disclosure walkthroughs.
- Platform-specific governance — e.g. `docs/x-platform-risk.md` for
  X-bound posts.

Voice fidelity is one of three gates. All three must pass.

---

## Short-form addendum (X posts, threads, video scripts, captions)

The gates above are calibrated to long-form (200-word read-aloud,
≥2 favourite phrases, ≥3 contrasts). A 22-second clip or a 280-character
post can't carry that count — but it can still be off-voice, and one
off-voice post is more visible than one off-voice paragraph. For
short-form, §1 (inputs) and §9–§10 (sign-off, promotion) apply
unchanged; §2–§8 are replaced by the following. Generation pattern:
`prompt-library/short-form-patterns.md`.

### A. Read-aloud / watch-aloud (mandatory)

- [ ] **Posts / threads / captions:** the persona owner reads every post
      aloud, at normal pace. Would the persona say this out loud to a
      colleague? Any wince = fix or kill.
- [ ] **Video (Brand B):** the watch-aloud gate in
      `brands/brand-b-corpsatire/qa/checklist.md` §2 runs instead — on
      the script pre-cut and again on the rough cut. That gate
      satisfies this addendum; do not walk both.

### B. Voice check (scaled)

- [ ] At least **one** voice-contrast tension is visible (a post that is
      all-confidence or all-snark has collapsed a contrast).
- [ ] Zero pet peeves / anti-voice patterns (the full §5 list applies at
      any length — there is no length below which "game-changer" is fine).
- [ ] Favourite phrases only where natural. In 280 characters a forced
      cameo is worse than none.

### C. Specificity (the one-noun rule)

- [ ] Every post / clip is anchored by **one specific noun or number**.
      A short-form piece with no concrete detail is engagement filler —
      kill it, don't polish it.

### D. House-example comparison

- [ ] At or above the quality of the brand's `house-examples.md` slot 6
      (short-form) — for Brand B clips, slots 1/4/8 and the matching
      series slot.
- [ ] Not below the §8 bad example in tone or shape.

### E. Platform mechanics (verify, don't assume)

- [ ] Disclosure present per surface (`docs/x-platform-risk.md` §5 for X;
      first-3-seconds satire variant for Brand B video).
- [ ] Link placement: first reply / final thread post, never the launch
      post (X).
- [ ] This week's cadence ceiling for the brand is not exceeded.

### Verdict

Same bar as long-form: not "good enough" — "sounds like us". The
persona owner ticks every box, names one edit, and posting stays manual
(Tier 2).
