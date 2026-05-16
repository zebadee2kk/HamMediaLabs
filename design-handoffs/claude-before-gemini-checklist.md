# Claude Before-Gemini Checklist

> Must complete before any Gemini brief leaves the lab. Walked by
> the Claude PM / Architect run, fed by the six subagents in
> `design-handoffs/claude-design-subagents.md`.
>
> Every Gemini brief must reference this checklist as its
> pre-flight (the Gemini briefs in `design-handoffs/gemini-*.md`
> link here in their "Claude pre-review required" section).

---

## 1. Objective

- [ ] The design objective is stated in one sentence.
- [ ] The objective names a concrete artefact (homepage / article
      page / dashboard card / social card / etc.), not an abstract
      goal.
- [ ] The objective is reachable in a single Gemini iteration.

## 2. Target user

- [ ] The intended reader / operator is identified (matches the
      brand's `profile.md` audience definition).
- [ ] The reader's expected device / context is named (mobile-first
      / desktop-first / video-first / dashboard-only).
- [ ] No "general audience" framing — specificity required.

## 3. Launch mode

- [ ] Phase named (per `docs/business-plan.md` §4: A £0 hobby /
      B £50 controlled / C £250 growth / D £1k serious).
- [ ] Brand tier named (per `docs/03-governance.md`: T2 manual /
      T3 one-click approve / **T4 still frozen**).
- [ ] No launch implied that the operator hasn't approved.

## 4. Brand constraints

- [ ] Relevant `brands/<slug>/voice.md` linked.
- [ ] Relevant `brands/<slug>/house-examples.md` linked.
- [ ] Voice contrasts (§2 of the voice doc) referenced inline so
      Gemini sees them in context.
- [ ] Anti-voice list (§5) referenced inline.
- [ ] Brand-specific edge cases called out:
  - Brand A: no popups; reading-first; long-form anchor.
  - Brand B: deadpan; no real-brand mimicry; punch-up only.
  - Brand C: calm palette; FCA disclaimer above byline;
    charity-link block at top for vulnerable-reader topics.

## 5. Compliance constraints

- [ ] AI-use disclosure variant identified (informational vs
      satire).
- [ ] FCA disclaimer required? (Yes for Brand C money-touching
      pages.)
- [ ] Vulnerable-reader topic? (If yes, charity block at top is
      mandatory.)
- [ ] Affiliate / sponsor surface present? (Default no at MVP.)
- [ ] Operator postal address surface required? (Yes for
      newsletter footer.)

## 6. Forbidden elements

- [ ] No `client:*` directives.
- [ ] No external JS frameworks (React / Vue / Svelte).
- [ ] No third-party trackers (Google Analytics / Pixel / GTM /
      Hotjar / Clarity / etc.).
- [ ] No paid font / paid icon library / paid plugin.
- [ ] No Astro version bump (4.x pinned).
- [ ] No content collections (we have none).
- [ ] No SSR adapter.
- [ ] No popups, modals, exit-intent, scroll-triggered overlays.
- [ ] No urgency / scarcity copy.
- [ ] No fake social proof.
- [ ] No real-person likeness / voice / signature synthesis.
- [ ] No real-company logo / palette / typography mimicry beyond
      clearly generic parody.

## 7. Output format

- [ ] Design spec format named (markdown spec + Astro+Tailwind
      starter + mockup descriptions in prose; per
      `design-handoffs/gemini-*.md`).
- [ ] Component inventory listed.
- [ ] Per-page mockup descriptions requested.
- [ ] Accessibility notes requested (contrast pairs; focus-visible
      styles; heading hierarchy; skip-link).
- [ ] Per-format export targets named (px sizes per platform; file
      size ceiling).

## 8. Gemini authority bounded

- [ ] Gemini will produce design + starter code only.
- [ ] Gemini will not edit governance docs.
- [ ] Gemini will not approve content.
- [ ] Gemini's "Forbidden-design inventory" section requested in
      the output (Gemini explains what it did NOT draft and why).
- [ ] Output staging path named (`design-handoffs/output/<brief>/<date>/`
      — gitignored until reviewed).

## 9. Review path

- [ ] The 14-section
      `design-handoffs/gemini-output-review-checklist.md` is
      referenced as the post-Gemini gate.
- [ ] Operator named as the human approver.
- [ ] Decision-log entry pre-drafted for the eventual adoption
      decision.

## 10. Pre-flight verdict

The brief leaves the lab only when **every** box above is ticked.
A single unchecked item is a no-send.

When all green:

- Save the filled checklist alongside the brief draft in the
  operator's notes (off-repo).
- Send the brief to Gemini.
- Stage Gemini's output under `design-handoffs/output/<brief>/<date>/`
  on return.
- Run `gemini-output-review-checklist.md` end-to-end before any
  scoped PR brings the output into the repo proper.

## 11. Cross-references

- `design-handoffs/README.md` — workflow.
- `design-handoffs/claude-design-subagents.md` — the six allowed
  subagent roles.
- `design-handoffs/gemini-*.md` — the per-surface briefs.
- `design-handoffs/gemini-output-review-checklist.md` — the
  post-Gemini gate.
- `docs/voice-authenticity-system.md` — voice moat.
- `docs/18-disclosure-templates.md` — canonical disclosure copy.
