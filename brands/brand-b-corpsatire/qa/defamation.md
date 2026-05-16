# Brand B — Defamation Safety

> Legal-safety gate. Walked at QA via `qa/checklist.md` §4. Conservative
> by design — Brand B is satire, not investigative journalism, and the
> wrong specific reference can convert a clip into a legal exposure.

---

## What "defamation" means here, operationally

A statement is risky if a reasonable viewer could believe:

1. The statement is **about a specific real person or specific real
   company**, and
2. The statement is **a factual assertion** (or could be read as one),
   and
3. The statement, if false, would damage their reputation.

Satire is legally protected in most jurisdictions only when a
reasonable viewer would *not* understand the statement as a factual
assertion. The way Brand B preserves that protection is by **never
being specific enough to be confused for fact about a real entity**.

## Hard rules

### Real people

- **No real public figure named, ever.** No CEO names, no consultant
  names, no journalist names, no real influencer names.
- **No AI-synthesised voice, face, signature, or likeness** of any
  real person. This is a binding policy and a platform-policy rule
  (TikTok, Meta, X all have rules; EU AI Act Article 50 layers on top).
- **No "anonymous source said…" framing.** If the bit pretends to
  quote a real person, even unnamed, treat it as a real-person
  reference.
- **No real employees of the operator's past or current employers.**
  Even composite anecdotes must be labelled honestly.

### Real companies

- **Allowed:** generic placeholders ("Big Consulting Firm", "the
  bank", "the consultancy", "Big Tech", "the SaaS").
- **Not allowed:** any name or any over-specific descriptor that makes
  a real company identifiable. "Acme & Friends 2026 R&D division" is
  effectively naming a company. "The Series-B SaaS where the COO
  mispronounced the project name on the Q3 all-hands of 2025" is too.

### Real events

- **No real news events as the bit's premise.** A specific layoff
  round, a specific scandal, a specific named restructure, a specific
  CEO ouster — all out.
- **Trends and patterns are fine.** Return-to-office mandates as a
  category, performance management as a phenomenon, AI rollouts in
  white-collar work generally — all acceptable, none of them tied to
  a specific named entity.

### "Leaked" content

- **No "leaked email", "leaked Slack", "leaked OKR doc" content that
  could be mistaken for a real specific company's internal comms.**
- Faux leaked artefacts are fine **only** when:
  1. The fictional company is generic ("Big Consulting Firm"), and
  2. The styling does not mimic a real, recognisable corporate brand,
     and
  3. The on-screen text makes it clear the content is satire (caption
     "consultant translations", series label visible, etc.), and
  4. The names used are generic personas (Brad, Cassandra, Dev),
     never tied to a real person.

### Quotes

- Quotes inside the bit must be invented and obviously fictional.
- Never quote a real public figure even paraphrased.
- A fictionalised executive in a script (e.g. "Brad, the VP of
  Alignment") may say anything within the satire rules; a real-name
  proxy may not.

## Soft-flag cases (escalate to operator)

The following are not automatic blockers but require operator
judgement before the clip moves to `staged`:

- A bit that references a public corporate event without naming it,
  but which is recognisable enough that viewers will fill in the
  company name in comments.
- A bit whose visual styling unintentionally mimics a known brand
  (colour palette, typography, signature mark).
- A bit whose persona-name choices coincidentally match a real
  identifiable individual at a real company. (Run a quick search.)
- A bit on a sensitive ongoing news cycle (mass layoffs, regulatory
  action, public controversy). Default: skip.

## The "would a lawyer see this and wince?" test

The persona owner asks, in good faith: *if a defamation-aware lawyer
watched this clip without context, would they wince?* If yes,
rewrite. If still yes after rewrite, cut.

## What this gate does NOT replace

- A real legal review. We do not retain counsel at MVP, and we are
  not investigative journalism, so this gate plus the lawyer-wince test
  is the standing posture. If Brand B grows to a size or topic that
  warrants real legal review, it gets escalated to a paid retainer
  before the next clip ships.
- Platform policy compliance. TikTok / Meta / X each have their own
  rules around impersonation and harmful misinformation. Comply with
  all of them; this doc covers civil exposure, not platform policy.

## Cross-references

- `qa/satire-rules.md` §1 (punch-up rules) — overlapping with this
  gate where the target's identity is concerned.
- `docs/x-platform-risk.md` §9 (X AI / synthetic-media rules) — same
  binding posture on X.
- `docs/10-legal-and-platform-risk.md` — lab-wide legal posture.
- `docs/18-disclosure-templates.md` §3 (satire variant) — disclosure
  rules that help preserve satire protection.
