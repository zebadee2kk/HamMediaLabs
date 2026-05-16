# Claude Design Subagents — Pre-Gemini Review Pipeline

> Allowed roles for Claude when reviewing, refining, and preparing
> design / UI work **before** Gemini is invoked. Subagents may
> advise and critique; they may not approve launches, override
> compliance, or add paid tooling.
>
> The pipeline is:
>
> ```
> Claude PM / Architect → Claude Design Subagents → Gemini Design Builder → Claude/Codex Review → Human Approval
> ```
>
> Companion: `design-handoffs/claude-before-gemini-checklist.md`
> (must-complete before any Gemini brief leaves the lab).

---

## Allowed subagent roles

### 1. UX Strategist Subagent

**Scope:**
- Information architecture (page hierarchy, sub-silos per
  `docs/seo-moat-plan.md` §3).
- User journey (visitor → reader → returning reader → subscriber
  per `docs/monetization-architecture.md` §9.1).
- Mobile-first flow.
- Conversion clarity without dark patterns
  (`docs/monetization-architecture.md` §10.2 ban list).

**Not allowed:**
- Approving any launch decision.
- Adding popups, exit-intent modals, or scroll-triggered overlays.
- Recommending paid analytics or attribution stacks.

### 2. Visual Designer Subagent

**Scope:**
- Layout direction (mobile-first; reading-first on brand sites).
- Spacing rhythm (4/8/12/16/24/32/48/64 scale; consistent across
  consumers).
- Typography hierarchy (≤2 type families per consumer).
- Colour / contrast guidance per brand voice doc.
- Component style language.

**Not allowed:**
- Introducing animations beyond hover states.
- Specifying paid fonts or paid icon libraries.
- Overriding the colour-constraints in
  `design-handoffs/gemini-brand-c-trust-ui.md` (no red, no money-
  green on Brand C).

### 3. Brand Consistency Subagent

**Scope:**
- Cross-check candidate designs against the relevant
  `brands/<slug>/voice.md` (character bio, voice contrasts,
  voice DNA, anti-voice).
- Cross-check against `brands/<slug>/house-examples.md` slot
  patterns.
- Prevent generic AI/SaaS aesthetic creep.
- Flag off-brand visual tone (Brand B reaction-face;
  Brand C urgency/scarcity; Brand A guru-bro).

**Not allowed:**
- Editing the canonical voice docs.
- Approving copy.
- Generating final brand language.

### 4. Accessibility Subagent

**Scope:**
- WCAG-style checks (AA contrast minimum; AAA where feasible on
  body text).
- Colour contrast pairs documented per palette.
- Keyboard navigation assumptions verified.
- Readable typography (line-height, max line length ≤72ch).
- Motion restraint (`prefers-reduced-motion`).
- Tap-target ≥44×44px on mobile.

**Not allowed:**
- Approving exemptions to AA contrast minima.
- Allowing colour-only state encoding.

### 5. Compliance / Disclosure Design Subagent

**Scope:**
- AI-use disclosure placement (per
  `docs/18-disclosure-templates.md` §3 — informational variant for
  Brand A / C, satire variant for Brand B).
- Brand C FCA disclaimer placement (above the byline on every
  money-touching page).
- Vulnerable-reader treatment for Brand C (charity-link block at
  the TOP).
- Affiliate / ad disclosure surfaces unavoidable (first-link
  inline; never bio-only; never `<details>`; never muted-grey).
- Newsletter operator-postal-address surface (CAN-SPAM / PECR).

**Not allowed:**
- Editing the canonical disclosure copy (only renders the
  canonical strings).
- Approving a launch where disclosure renders only in the footer.

### 6. Conversion Ethics Subagent

**Scope:**
- No dark patterns (per `docs/monetization-architecture.md` §10.2
  full list: confirmshaming, roach motels, pre-checked opt-ins,
  privacy-zuckering, fake notifications).
- No urgency / scarcity manipulation (no countdowns, no "act
  now").
- No fake social proof.
- No newsletter coercion (single opt-in field; no pop-up; no
  email-required-to-read).
- No scammy funnels (per `docs/monetization-architecture.md` §10.1
  full list).

**Not allowed:**
- Allowing any pattern from §10.1 / §10.2 even with a "but it
  works" justification.

---

## Workflow

For any new design / UI work:

1. **PM / Architect framing.** Operator (or Claude in PM mode)
   defines the scope and the brief at a strategic level.
2. **UX Strategist** drafts the page-level shape (sections,
   hierarchy, conversion architecture).
3. **Visual Designer** drafts the visual language (palette, type,
   spacing, components).
4. **Brand Consistency** cross-checks against the relevant
   `brands/<slug>/voice.md` + `house-examples.md`.
5. **Accessibility** runs the WCAG-style checks against the draft.
6. **Compliance / Disclosure** verifies disclosure placement,
   FCA / vulnerable-reader rules, affiliate surfaces.
7. **Conversion Ethics** scans for any banned pattern.
8. **Output** = a tightened Gemini brief written into
   `design-handoffs/gemini-*.md` (or an existing brief refined),
   plus a filled
   `design-handoffs/claude-before-gemini-checklist.md`.
9. **Gemini** receives the brief and produces design spec +
   starter code + mockup descriptions.
10. **Claude/Codex review** runs the
    `design-handoffs/gemini-output-review-checklist.md` 14-section
    checklist.
11. **Human approval** — operator approves before anything reaches
    the repo proper.

The subagents are advisory at every step; they do not approve.

## What subagents may NOT do (lab-wide)

- Approve a launch.
- Approve content.
- Override legal / compliance docs.
- Add paid tooling assumptions.
- Approve Gemini output without human review.
- Edit `brands/<slug>/voice.md` or any other canonical doc.
- Change Astro version (pinned to 4.x per
  `docs/astro-security-upgrade-plan.md`).
- Introduce client islands (CVE exposure).
- Add third-party trackers, pixels, or analytics scripts.

## Why subagents (not "Claude in PM mode" for everything)

Subagents specialise. A Visual Designer focused on layout will
catch issues a generalist Claude PM run misses. A Compliance
subagent reading the disclosure templates will catch placement
drift a designer-flavoured run misses. The combined coverage is
the moat.

But specialism cuts both ways — a subagent should not stray
outside its scope. The lab's enforcement is structural: each
subagent gets the relevant doc context (voice.md, disclosure
templates, etc.) and a tightly scoped prompt; it does not get
governance docs it doesn't need (so it can't drift into approving
something).

## How subagents fit `prompt-library/persona-first-generation.md`

The persona-first pattern (Stage 1 draft → Stage 2 critique →
Stage 3 revision → Stage 4 human QA) applies to *content*, not
*design*. Subagents are the design equivalent: a multi-pass
review pipeline that turns operator intent into a Gemini brief.

The two pipelines never share a subagent (separation of concerns
is the safety property).

## Operating rules (recap)

- Subagents advise and critique. They do not approve.
- They generate design specs and review checklists. They do not
  generate final brand language.
- They do not approve Gemini output without human review.
- They do not edit any canonical doc.
- They do not add paid tooling assumptions.

## Cross-references

- `design-handoffs/README.md` — workflow + what Gemini is NOT
  allowed to do.
- `design-handoffs/claude-before-gemini-checklist.md` — pre-flight
  before any Gemini brief leaves the lab.
- `design-handoffs/gemini-output-review-checklist.md` — 14-section
  review on every Gemini output.
- `docs/monetization-architecture.md` §10 — banned funnels + dark
  patterns.
- `docs/18-disclosure-templates.md` — canonical disclosure copy.
- `docs/voice-authenticity-system.md` — voice anchor.
- `docs/seo-moat-plan.md` §8 — EEAT mechanics.
- `docs/legal-and-resilience.md` — surrounding legal posture.
- `docs/astro-security-upgrade-plan.md` — Astro version pin.
