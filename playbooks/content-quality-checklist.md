# Content Quality Checklist

## Goal
Prevent low-value AI slop and protect long-term platform viability.

## Required checks
- Is this genuinely useful?
- Is this original enough?
- Is this brand-consistent?
- Is this fact-checked where needed?
- Does this avoid obvious fluff?
- Is monetization appropriate?
- Is platform risk acceptable?

## Red flags
- Duplicate generic listicles
- Thin affiliate spam
- Sensational false claims
- SEO-only nonsense
- Unsafe finance / legal / health advice

## Rule
Quality beats volume long term.

## Per-brand operationalisation

Brand-specific QA gates implement this lab-wide checklist as concrete,
walkable steps. See:

- Brand A — `brands/brand-a-aiescape/qa/checklist.md` (binding gate before
  `qa` → `staged`), with companion docs on factuality and anti-hype.
- Brand B — to be authored when the channel pipeline stands up.
- Brand C — to be authored alongside the FCA-aware editorial workflow.

## Voice fidelity (mandatory, separate gate)

`playbooks/voice-fidelity-checklist.md` runs **alongside** this checklist.
A piece cannot move to `status: staged` unless both gates pass:

- This checklist — usefulness, factuality, disclosure, monetisation, platform risk.
- Voice fidelity — persona alignment, voice DNA, anti-voice scan, **read-aloud gate**.

Spec: `docs/voice-authenticity-system.md`.
