# Gemini Brief — Brand C Trust-First UK Financial UI

> Copy this entire brief into Gemini Free. Brand C is the
> highest-compliance brand; visual design must reinforce trust,
> never simulate urgency. Run output through
> `gemini-output-review-checklist.md`.

---

## Role

You are a senior visual / UX designer producing the website
design spec for **Brand C — UK Financial Escape**. The brand
is **information only** (not financial advice) and operates
under FCA / ASA / ICO compliance constraints.

## Brand C context (binding)

- **Niche:** UK cost-of-living journalism + lifestyle-cost
  optimisation. **Never** financial advice.
- **Audience:** UK working adults 25–50, some may be vulnerable
  readers (in debt / facing eviction / on benefits).
- **Tone:** calm, specific, sceptical of easy answers, generous
  with sources.
- **Voice anchor (read fully before designing):**
  - `brands/brand-c-ukescape/voice.md`
  - `brands/brand-c-ukescape/house-examples.md`
  - `brands/brand-c-ukescape/qa/fca-perimeter.md`
  - `brands/brand-c-ukescape/qa/vulnerable-reader.md`
  - `brands/brand-c-ukescape/qa/affiliate-redlines.md`
  - `docs/legal-and-resilience.md` §7
  - `docs/18-disclosure-templates.md` §11

## Trust-first UK financial content design

- **Quiet palette.** Off-white background. One muted ink colour
  for body text. One accent — pick a **calm** accent
  (a slate blue or muted ochre), never red (red reads "alert" /
  "urgency"; we explicitly avoid that), never bright green
  ("money green" is also off — it implies promotion).
- **Sturdy serif** for headings + a clean sans for body. Or two
  weights of a single sturdy sans. The brand reads "newspaper",
  not "fintech".
- **Generous line-height** (≥1.6 in body) — financial topics are
  heavy; the page should feel like it's giving the reader time.
- **No animations on any money-touching element.**
- **No countdown timers, ever.**
- **No "limited offer" badges, ever.**
- **No "save up to £X" hero numbers without a calculator link
  next to them.**

## Charity-link-at-top support block pattern (binding)

This is the most important visual component on the site. On any
page where `vulnerable_reader_topic: true`:

- A `CharityBlock.astro` component renders **at the very top of
  the body**, above the title or immediately below it
  (above any other content).
- Visual: a sturdy bordered card. Not alarming red, not urgent.
  Calm slate. Clear "If this affects you, free and impartial
  help is available" lead-in.
- Three links: MoneyHelper, Citizens Advice, StepChange. National
  Debtline number on its own line.
- **No affiliate link** appears above this block on the page.
- The same block renders again at the bottom of the page under
  "Where to get advice (not from us)".

Render the placement spec as a literal Astro component with a
binary `topVulnerable={true|false}` prop.

## FCA disclaimer prominence

- A `FcaDisclaimer.astro` component renders **above the byline**
  on every money-touching page (effectively every Brand C page).
- Visual: a slim bordered card. Quiet. Always visible without
  scroll on mobile.
- Copy (canonical, not paraphrased): per
  `docs/18-disclosure-templates.md` §11.

## Vulnerable-reader tone requirements

- **No "you deserve" / "you've earned it" framing in any visual
  copy.** That includes button labels, hero CTAs, anything.
- **No emojis** in body copy. (Brand C voice §5 anti-voice.)
- **No exclamation marks** in body copy.
- **No "act now" / "before it's too late"** anywhere on the site.
- **Subscribe CTA wording:** "Get the weekly cost-of-living
  digest" — not "Don't miss out".

## Tables / calculators / article layouts that avoid advice
framing

- **Table headers** that describe a scenario, not a decision
  ("If your usage is X kWh / month" — not "What you should pay").
- **Calculator components** render input fields without "calculate
  your savings" verbs. "Estimate your monthly bill" is acceptable
  framing.
- **Comparison tables** carry a footer note: "Numbers retrieved
  YYYY-MM-DD from {primary-source-name}; your situation may
  differ."
- **Article body** uses the same Astro components as Brand A
  (TL;DR block, body, read-next, newsletter opt-in) — but with
  the calmer palette and tighter sourcing requirements visible.

## Affiliate red-line visual constraints

When `affiliate_in_play: true` (Brand C may eventually carry FCA-
compatible affiliate links per `qa/affiliate-redlines.md`):

- Affiliate disclosure block sits immediately above the **first**
  affiliate link.
- Affiliate links use a slightly **subdued** version of the brand
  accent (not louder). The visual hierarchy makes clear they are
  not the primary CTA.
- **No "Affiliate" badge that looks like a benefit** ("Earn extra!").
  The disclosure is plain English.
- **No affiliate link appears above the charity-link block** on
  any vulnerable-reader page.

## Mobile-first requirements

- **Charity-link block is fully visible above the fold on mobile.**
  No scroll required to see it.
- **FCA disclaimer is fully visible** before the article body
  starts.
- **Tap targets** ≥44×44px.
- **Source citation links** open in new tabs (so the reader can
  cross-check without losing their place).

## Astro / Tailwind constraints

- **Astro 4.x.** No client islands.
- **Tailwind.** Reuse the Brand A starter palette as a base, mute
  it for Brand C.
- **No external trackers / pixels.**
- **No third-party widgets** beyond the Buttondown opt-in iframe.

## Exact Gemini deliverables

1. **Visual design spec** (Markdown):
   - Calm palette (≤3 tokens) — explicitly justify the accent
     choice (why this accent doesn't read as "urgent" / "promotional").
   - Type stack.
   - Spacing scale (generous).
   - Component inventory:
     - `CharityBlock.astro` (new — binding placement rule above).
     - `FcaDisclaimer.astro` (new).
     - `SourceFootnote.astro` (new — for inline source citations).
     - Extension of `Disclosure.astro` for Brand C.
     - `ComparisonTable.astro` (new — with retrieval-date footer).
     - `Tldr.astro` (reuse Brand A pattern, calmer styling).
   - Per-page layouts: home, article (money-touching),
     vulnerable-reader article (charity block at top), about,
     contact, AI use, affiliate disclosure, privacy, terms.
2. **Astro + Tailwind starter code** for the new components and
   the brand-site layout.
3. **Mockup descriptions** in prose for mobile + desktop on:
   - Home page above-the-fold.
   - Money-touching article first viewport (FCA disclaimer
     visible).
   - Vulnerable-reader article first viewport (CharityBlock at
     top).
   - Comparison table desktop layout.
4. **Compliance-rendering checklist** — for each visual component,
   the binding rule it preserves (e.g. "ComparisonTable always
   renders the retrieval-date footer").

## Out of scope (Gemini does not produce)

- Strategic content decisions (which topics, which charities to
  list beyond the canonical three plus National Debtline).
- Real prose; Gemini uses Lorem placeholders.
- A redesign of the canonical disclosure copy
  (`docs/18-disclosure-templates.md` is the source of truth).
- Anything that would let an affiliate link sit above the charity
  block on a vulnerable-reader page.
- "Promotional" hero blocks of any kind.

## Brand-C-specific review-checklist items

(Full checklist in `gemini-output-review-checklist.md`. Below are
Brand-C-specific.)

- [ ] FCA disclaimer renders above the byline on every page.
- [ ] CharityBlock renders at the **top** when
      `vulnerable_reader_topic: true`.
- [ ] No affiliate link appears above CharityBlock on any
      vulnerable-reader page.
- [ ] No "act now" / urgency / scarcity copy.
- [ ] No exclamation marks in body copy.
- [ ] Comparison tables carry retrieval-date footer.
- [ ] Palette accent is **calm** (not red / urgent / not bright
      money-green).
- [ ] Source citations open in new tabs.
- [ ] Subscribe CTA wording does not promise savings or financial
      outcomes.
