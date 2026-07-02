# Starter Design Tokens (v1) — All Brands

**Date:** 2026-07-02
**Status:** v1 starter tokens, committed so the portfolio stops sharing one grey
stylesheet. These are **input to the Gemini design pipeline, not final art** —
Gemini Free remains the design specialist (decision log 2026-05-16); its output
refines or replaces these values via the normal `design-handoffs/` review flow.
**Applied in code:** the `theme` block of `BrandSiteConfig`
(`brands/templates/site/src/site.config.ts`), wired into `Base.astro` CSS
variables. Brand A's site carries its values; Brands B/C adopt theirs when
their sites are instantiated from the template.

---

## Rules that bind every palette

1. **No webfonts.** System stacks only — preserves the template's
   zero-JS / zero-external-request discipline and Lighthouse ≥95 target.
2. **Contrast floors** (WCAG 2.1 AA, checked against the brand `background`):
   `ink` ≥7:1, `muted` ≥4.5:1, `primary` (links) ≥4.5:1.
3. **`accent` is never a text colour.** Highlights, tinted backgrounds,
   rules, `<mark>` only.
4. **One accent per brand.** If a second accent feels necessary, that's a
   Gemini-pipeline decision, not a token edit.
5. Changing any token after a brand is live = decision-log entry.

---

## Brand A — AI Escape · "confident peer"

The reader is a technical professional being talked to straight. Deep
working blue reads competent without corporate gloss; warm amber tint for
tables and callouts keeps "real numbers" passages visually distinct.

| Token | Value | Role / notes |
|---|---|---|
| `ink` | `#1b1f24` | Body text. ~16.7:1 on background. |
| `muted` | `#5c6672` | Nav, footer, captions. ~5.9:1. |
| `primary` | `#0f4c81` | Links, buttons. ~8.7:1. |
| `accent` | `#f4e3c8` | Warm amber tint — TL;DR/cost-table backgrounds, `<mark>`. |
| `background` | `#ffffff` | |
| `fontBody` | `system-ui, -apple-system, "Segoe UI", sans-serif` | |
| `fontHeading` | same as body | Weight does the differentiation; no display face at MVP. |

Voice fit: `brands/brand-a-aiescape/voice.md` — screenshots over stock,
numbers over adjectives; the palette should never out-shout the content.

## Brand B — Corporate Satire · "corporate theatre as documentary"

The joke is that it looks like the artefact it's mocking. Paper-white
deck background, lanyard blue, and one highlighter-yellow accent — the
colour of the phrase someone marked in the all-hands slides. Headings in
the most corporate stack available (deliberate Arial).

| Token | Value | Role / notes |
|---|---|---|
| `ink` | `#26282b` | ~14.5:1 on background. |
| `muted` | `#67707a` | ~4.9:1. |
| `primary` | `#34558b` | "Lanyard blue" links. ~7.0:1. |
| `accent` | `#ffd43b` | Highlighter yellow — `<mark>`, series badges, **never text**. |
| `background` | `#faf9f6` | Paper / printed-deck off-white. |
| `fontBody` | `system-ui, -apple-system, "Segoe UI", sans-serif` | |
| `fontHeading` | `Arial, Helvetica, system-ui, sans-serif` | The deck font. The blandness is the bit. |

Constraints from `design-handoffs/gemini-brand-b-visual-system.md`: light
palette + one accent; deadpan documentary, not neon meme aesthetics.
Satire disclosure styling must stay legible on `background` — use `ink`,
not `muted`, for the satire label.

## Brand C — UK Financial Escape · "calm maths"

Trust UI. Hard constraints from `design-handoffs/gemini-brand-c-trust-ui.md`:
**no red** (alarm), **no money-green** (get-rich-quick coding). Calm steel
blue + a pale blue tint for CharityBlock / comparison-table backgrounds.
Nothing flashes, nothing urges.

| Token | Value | Role / notes |
|---|---|---|
| `ink` | `#21272a` | ~15.5:1 on background. |
| `muted` | `#5f6b76` | ~5.4:1. |
| `primary` | `#33567d` | Calm steel blue links. ~7.4:1. Not red, not green, not urgent. |
| `accent` | `#e7eef5` | Pale blue tint — CharityBlock, FCA-disclaimer band, table stripes. |
| `background` | `#fcfcfb` | Warm near-white; softer than clinical white. |
| `fontBody` | `system-ui, -apple-system, "Segoe UI", sans-serif` | |
| `fontHeading` | same as body | Calm > characterful for a finance-adjacent brand. |

Compliance notes: the charity block and FCA disclaimer sit on `accent`
with `ink` text (~13:1) — the most-protected content gets the most
contrast. Retrieval-date footers use `muted`, still ≥4.5:1.

---

## What Gemini refines next (per existing briefs)

- Final palette + type ramp per `gemini-brand-a-mvp-site.md` /
  `gemini-brand-b-visual-system.md` / `gemini-brand-c-trust-ui.md`.
- Logos, favicons, OG images (`logoPath` / `ogImagePath` tokens are wired
  and waiting).
- Social asset templates per `gemini-social-asset-templates.md`, using
  these tokens as the starting palette so web and social match.

**Note for the briefs:** the Gemini briefs assume Tailwind; the template
ships token-based plain CSS (three variables in `Base.astro` grew into the
`theme` block above). Gemini output should target CSS variables, not
Tailwind config — flag this when the briefs run, and update the briefs in
their next revision.
