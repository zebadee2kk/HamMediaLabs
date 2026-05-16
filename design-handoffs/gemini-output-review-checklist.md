# Gemini Output Review Checklist

> Run this checklist on **every** Gemini output before it reaches
> the repo. Claude / Codex / the operator each have a role; nothing
> commits until all three sign off on what they own.

---

## 0. Inputs

- The Gemini output (spec / mockup descriptions / starter code).
- The brief the output responds to (`gemini-*.md`).
- The relevant governance docs the brief listed as binding.

## 1. Repo compatibility

- [ ] Output uses **Astro 4.x** syntax. No Astro 5 / 6 features
      (no `import.meta.glob` replacements for `Astro.glob`, no
      `getCollection` API changes, no `ClientRouter`).
- [ ] No `client:*` directives anywhere. (CVE exposure per
      `docs/astro-security-upgrade-plan.md`.)
- [ ] No `Astro.glob()`.
- [ ] No content collections (we have none today).
- [ ] No SSR adapter (`output: 'server'`); we are static-only.
- [ ] No new top-level `package.json` deps beyond Tailwind itself
      and its plugins. Astro stays pinned.
- [ ] No edits to existing `package.json` versions.

## 2. Astro / Tailwind compatibility

- [ ] Astro components use `Astro.props` correctly.
- [ ] Frontmatter scripts are server-only (no `client:load` /
      `client:idle` / `client:visible` / `client:only`).
- [ ] Tailwind utility classes are real (no invented arbitrary
      utilities that won't compile).
- [ ] `tailwind.config` changes are minimal and additive (palette
      tokens, type stack); no breaking renames.
- [ ] No reliance on a Tailwind version newer than what's in
      `package.json`.

## 3. Accessibility

- [ ] One `H1` per page.
- [ ] Heading hierarchy correct (`H1 → H2 → H3`, no skips).
- [ ] Skip-link present.
- [ ] Focus-visible styles defined.
- [ ] All interactive elements have visible focus state.
- [ ] Colour contrast ≥WCAG AA on every text / background pair.
- [ ] No colour-only state encoding (every coloured pill / badge
      also has a text label).
- [ ] Form fields have visible labels (not just placeholder text).
- [ ] Tap targets ≥44×44px on mobile.

## 4. Performance

- [ ] Lighthouse mobile slow-4G estimate ≥95 on every category for
      the cornerstone-class page (Brand A site).
- [ ] Dashboard pages ≥85 (slightly looser; data-heavy is
      acceptable).
- [ ] Images: explicit `width` / `height`; `loading="lazy"`;
      compressed to ≤200 KB.
- [ ] Fonts: at most one Google Font; `font-display: swap`; or
      system stack only.
- [ ] No client-side JS shipped beyond the chosen analytics tag.
- [ ] No chart library that ships JS to the browser (static SVG
      only).
- [ ] No third-party widgets (no Twitter embeds, YouTube embeds,
      etc.).

## 5. No secret leakage

- [ ] No `PUBLIC_*`-prefixed env vars introduced anywhere.
- [ ] No env vars referenced client-side.
- [ ] No literal credentials anywhere.
- [ ] No `.env` files in the output.
- [ ] gitleaks would not flag anything (operator runs gitleaks
      before merging).

## 6. No unwanted trackers

- [ ] No Google Analytics tag.
- [ ] No Facebook Pixel.
- [ ] No Hotjar / Microsoft Clarity / FullStory.
- [ ] No Google Tag Manager.
- [ ] No retargeting pixels of any kind.
- [ ] Only the approved analytics (Plausible CE self-hosted OR
      Cloudflare Web Analytics) renders one lightweight tag.

## 7. No paid tooling assumptions

- [ ] No paid Figma plugin assumed (operator owns the file).
- [ ] No paid font assumed.
- [ ] No paid icon library assumed.
- [ ] No paid Astro / Tailwind plugin assumed.
- [ ] No paid hosting tier assumed.
- [ ] No "you'll need to subscribe to X" framings.

## 8. No governance override

- [ ] No disclosure copy edits (canonical lives in
      `docs/18-disclosure-templates.md`).
- [ ] No relaxation of the affiliate disclosure first-link rule.
- [ ] No relaxation of the FCA disclaimer placement on Brand C.
- [ ] No relaxation of the charity-link-at-the-top rule on
      vulnerable-reader pages.
- [ ] No relaxation of the AI-assist disclosure on Brand B clips.
- [ ] No new automated-publish surface.
- [ ] No tier-promotion logic added (T2 → T3 → T4 progression
      stays governance-driven).

## 9. Brand voice fit

- [ ] Brand A output reads "confident peer" — not "guru".
- [ ] Brand B output reads "deadpan" — not "reaction-face / smug".
- [ ] Brand C output reads "calm friend with a spreadsheet" — not
      "promotional / urgent / fintech".
- [ ] No banned phrases from the relevant brand's `voice.md` §5.
- [ ] No exclamation marks in any body copy.
- [ ] No emoji-stuffing.

## 10. Compliance page compatibility

- [ ] `/privacy`, `/terms`, `/ai-use`, `/affiliate-disclosure`,
      `/contact`, `/about` render with the canonical copy.
- [ ] Output does not propose new compliance pages beyond what
      exists.
- [ ] Output does not rename compliance routes (canonical slugs).
- [ ] Newsletter footer (where it appears in mockups) includes
      operator postal address slot.

## 11. Per-brand-specific gates

Apply only the row that matches the brief being reviewed.

### Brand A (`gemini-brand-a-mvp-site.md`)

- [ ] No popups, modals, exit-intent, scroll-triggered overlays.
- [ ] Disclosure block above the byline on every cornerstone page.
- [ ] Newsletter opt-in is one field (no checkbox bundles).
- [ ] No social-sharing buttons (we don't want the bloat).

### HQ Dashboard (`gemini-hq-dashboard-ui.md`)

- [ ] No client-side data fetch.
- [ ] All numeric cells `font-variant-numeric: tabular-nums`.
- [ ] Empty / error states defined for every component.
- [ ] No PII renders in any state.
- [ ] Service-role-key handling unchanged.

### Brand B (`gemini-brand-b-visual-system.md`)

- [ ] No identifiable real-company logos / palettes / typefaces.
- [ ] No real-person likenesses.
- [ ] No reaction-face / smug-pause framing.
- [ ] No "Stay tuned" / engagement-bait end frames.
- [ ] AI-assisted disclosure placement specified for every
      template.

### Brand C (`gemini-brand-c-trust-ui.md`)

- [ ] FCA disclaimer above the byline on every page.
- [ ] CharityBlock at the **top** when
      `vulnerable_reader_topic: true`.
- [ ] No affiliate link above CharityBlock on any vulnerable-reader
      page.
- [ ] No urgency / scarcity copy.
- [ ] Calm accent colour (not red / not bright money-green).
- [ ] Source citation links open in new tabs.
- [ ] Subscribe CTA wording does not promise outcomes.

### Social asset templates (`gemini-social-asset-templates.md`)

- [ ] AI-assist line on every commercial template.
- [ ] FCA disclaimer on every Brand C template.
- [ ] No real-company logos / likenesses.
- [ ] No urgency / scarcity copy on Brand C templates.
- [ ] No engagement-bait copy on any template.
- [ ] Per-platform sizes and compression targets specified.

## 12. Final commit gate

- [ ] Output reviewed against §1–§11 by the operator.
- [ ] Claude / Codex review pass complete (this checklist).
- [ ] CI green when the output is brought into a scoped PR.
- [ ] gitleaks green.
- [ ] Decision-log entry filed naming the brief, the output, the
      date, and the verdict.

## 13. Verdicts

- **Adopt** — output passes; lands as a scoped PR.
- **Adopt with edits** — passes after named edits; PR lands the
  edited version.
- **Reject** — output fails one or more gates; brief is re-run or
  reframed.
- **Defer** — output is OK but the underlying work isn't ready;
  staged under `design-handoffs/output/<brief>/<date>/` and
  revisited.

## 14. Cross-references

- `design-handoffs/README.md` — index + workflow.
- `docs/18-disclosure-templates.md` — disclosure copy ground
  truth.
- `docs/voice-authenticity-system.md` — voice anchor.
- `docs/legal-and-resilience.md` — legal / compliance scope.
- `docs/cost-control-and-free-tier-plan.md` — free-first
  enforcement.
- `docs/astro-security-upgrade-plan.md` — Astro version pin
  and CVE exposure rules.
- `docs/x-platform-risk.md` — disclosure / cadence / link-
  placement on X.
