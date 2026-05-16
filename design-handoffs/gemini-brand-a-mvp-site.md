# Gemini Brief — Brand A MVP Website (AI Escape)

> **Claude pre-review required.** Before sending this brief to Gemini,
> walk `claude-design-subagents.md` (six subagents) and complete
> `claude-before-gemini-checklist.md` (10 pre-flight sections). A
> brief with any unchecked box is a no-send.
>
> Copy this entire brief into Gemini Free. Provide the linked
> governance docs when Gemini asks for context. Run through
> `gemini-output-review-checklist.md` before committing any output.

---

## Role

You are a senior visual / UX designer producing the website design
spec for **AI Escape** — HamMediaLabs Brand A. The operator will
implement what you specify in Astro 4.x + Tailwind, hosted on
Cloudflare Pages (free tier).

## Brand A context (binding)

- **Brand:** AI Escape.
- **Niche:** Applied AI for working professionals — workflows,
  trade-offs, real numbers. No hype. No "ultimate guides".
- **Audience:** Knowledge workers 25–45 who already use AI casually
  and want to use it like a craftsperson.
- **Tone:** Confident peer who has actually shipped with these
  tools. Not a guru.
- **Core promise:** "What I actually use, what I dropped, what saved
  me real time."

Voice anchors (read in full before designing):

- `brands/brand-a-aiescape/voice.md` (operator pastes contents).
- `brands/brand-a-aiescape/house-examples.md` (operator pastes).
- `docs/voice-authenticity-system.md`.
- `docs/17-style-guide.md` (lab-wide).

## Visual direction (the constraints)

- **Reading-first.** Not a marketing site. Type does most of the
  work.
- **Mobile-first.** The cornerstone reads great on a 360px screen
  before anything else.
- **One typeface family for prose; max two total.** A sturdy serif
  for headlines + a clean sans for body, OR a single sturdy sans
  for both with careful weight differentiation.
- **Limited palette.** One ink colour; one background; one accent
  for links + emphasis; never more than three. No bright marketing
  gradients.
- **Generous whitespace.** Body content width target: 60–72ch on
  desktop; full width with side padding on mobile.
- **No carousels, sliders, parallax, scroll-snap, or animated hero
  sections.**
- **No popups, no exit-intent modals, no scroll-triggered overlays.**
- **Lighthouse target:** ≥95 performance, ≥95 accessibility, ≥95
  best-practices on the cornerstone, mobile, slow 4G.

## Homepage sections (in order)

1. **Header.** Brand name (text logo, not an image), tiny tagline,
   simple nav: Home / About / AI use / Affiliate / Privacy.
2. **Above the fold.** Brand tagline + one-sentence value
   proposition. **One CTA**: subscribe to the newsletter.
   No "join 10,000 readers" social proof (we don't have it).
3. **Latest cornerstone** card. Title, 1-line description, "Read
   in <N> minutes" estimate, publish date. Click → cornerstone
   page.
4. **About snippet** (≤80 words). Real human name + one-line bio +
   link to `/about`.
5. **Newsletter opt-in** (single field; no checkbox bundles).
6. **Footer.** AI-use disclosure block. Affiliate-disclosure
   sentence (when `affiliate_in_play` flips true; hidden at MVP).
   Links to compliance pages. Operator postal address.

## Article (cornerstone) page layout

1. **Disclosure block** (AI-use; affiliate when applicable) above
   the byline. Visible without scroll.
2. **Title** (H1; ≤65 chars).
3. **Byline + date + reading-time estimate.**
4. **TL;DR** block (60–100 words; visually distinct from the body
   — left border or subtle background, no big icons).
5. **Body** (long-form). H2 sections. Pull quotes only when truly
   pull-able. Code blocks with monospace font. Inline links in
   the accent colour, underline on hover.
6. **"Read these next"** at the foot of the piece — 2–3 internal
   links, curated, not auto-generated.
7. **Newsletter CTA** below the read-next block (one, single field).
8. **Standard footer.**

No sidebars. No "recommended for you" widgets. No social-sharing
buttons (readers paste links themselves; we don't need the bloat).

## About / Contact / Privacy / Terms / AI use / Affiliate disclosure

Same layout as the article page but with these specifics:

- **About:** real human name + real photo (or a tasteful
  illustration if the operator prefers). Two paragraphs of bio.
  External trust signal (LinkedIn / paper / talk) per
  `docs/seo-moat-plan.md` §8.
- **Contact:** the brand alias email, plain.
- **Privacy / Terms / AI use / Affiliate disclosure:** plain
  Markdown rendered with the same body style as articles. No
  decorative elements.

## Mobile-first requirements

- **Target devices first:** iPhone SE / Pixel 5 widths.
- **Tap targets ≥44×44px.**
- **No horizontal scroll, ever.**
- **Code blocks scroll horizontally inside themselves** — never
  break the page.
- **Images max-width 100%**, with `loading="lazy"` and explicit
  `width` / `height` to prevent CLS.

## Astro / Tailwind constraints

- **Astro 4.x.** Pinned per `docs/astro-security-upgrade-plan.md`.
  Do not propose Astro 5 / 6 patterns.
- **Tailwind** for styling. Configure a tiny custom palette + the
  typography plugin.
- **No `client:*` directives** on any component. Pure SSG.
- **No content collections.** Posts as plain markdown files.
- **No external JS frameworks** (React, Vue, Svelte). Astro
  components only.
- **No third-party widgets** (no Twitter embeds, no YouTube embeds
  on the home page; cornerstone may use a static thumbnail with a
  direct link).

## Free-first launch assumptions

- Hosted on Cloudflare Pages free tier.
- Buttondown free newsletter (≤100 subs) — the embed is a single
  form, no JS-heavy widget.
- Plausible CE self-hosted or Cloudflare Web Analytics — either
  way, **one** lightweight script, cookieless.
- No paid fonts. Use system stack OR a single Google Font with
  `font-display: swap`.
- No paid icon libraries. Inline SVG sparingly if needed.

## No affiliate / no paid tooling constraints

- The site at launch carries **zero affiliate links**.
- The site at launch carries **zero ads**.
- The site at launch carries **zero third-party trackers** beyond
  the one analytics script.
- Newsletter is the only commercial-adjacent surface, and it's
  not yet commercialised.

## Exact Gemini deliverables

Produce, in this order:

1. **Design spec** (Markdown). One document that describes:
   - Colour palette (≤3 tokens; named, with hex codes).
   - Type stack (≤2 families; weights used; line-height; sizes).
   - Spacing scale (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64).
   - Component inventory (header, footer, disclosure block,
     article body, TL;DR block, opt-in form, "read these next",
     compliance page wrapper).
   - Per-page layouts (home, article, compliance pages).
   - Mobile breakpoints (≤640 / ≥768 / ≥1024).
   - Lighthouse expectations.
2. **Astro + Tailwind starter code** for:
   - `Base.astro` layout (extends the existing template).
   - `Disclosure.astro` (re-skins the existing component — does
     not add new behaviour; renders the same disclosure text).
   - `Tldr.astro` (new — TL;DR block).
   - `ReadNext.astro` (new — 2-3 curated internal links).
   - `Newsletter.astro` (Buttondown embed).
   - `index.astro` (homepage).
   - One sample article page using the new components.
   - `tailwind.config.cjs` with the palette + type stack.
3. **Mockup descriptions** in prose (since Gemini Free is
   text-first):
   - Homepage above-the-fold (mobile + desktop).
   - Cornerstone article first viewport (mobile + desktop).
   - Newsletter opt-in state (collapsed + success).
4. **Accessibility notes** explicitly listing:
   - Contrast ratios per palette pair.
   - Focus-visible styles.
   - Heading hierarchy.
   - Skip-link.
   - `aria-label` choices.

## Claude / Codex review checklist (what the operator will check)

(Full checklist in `gemini-output-review-checklist.md`. Below are
the Brand-A-specific items.)

- [ ] No client islands (`client:*`).
- [ ] No external JS frameworks.
- [ ] No new third-party scripts beyond the chosen analytics.
- [ ] Disclosure block placement and copy is unchanged.
- [ ] Tailwind palette has ≤3 colour tokens.
- [ ] Type stack ≤2 families.
- [ ] Mobile-first viewport renders without horizontal scroll.
- [ ] Lighthouse mobile slow-4G estimate ≥95 across the four
      categories.
- [ ] AI-use disclosure visible above-the-fold on every page.
- [ ] No popups / overlays / exit-intent / scroll-triggered modals.

## Out of scope (Gemini does not produce)

- Real prose for the home page or the cornerstone (operator owns
  voice; Gemini fills with `Lorem`-style placeholders).
- Strategic decisions (which content runs first; cadence; etc.).
- Affiliate or sponsored content placement.
- Anything that violates `docs/x-platform-risk.md` (e.g. embedded
  Twitter feeds).
- Compliance copy edits (Gemini renders the canonical copy from
  `docs/18-disclosure-templates.md`; does not rewrite it).

## After Gemini returns

The operator runs `gemini-output-review-checklist.md` end-to-end,
then stages the design + code under
`design-handoffs/output/brand-a-mvp-site/<YYYY-MM-DD>/`. Only
after a second review pass does any of it reach the brand site
repo proper — as a normal scoped PR.
