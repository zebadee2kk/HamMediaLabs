# Gemini Brief — Brand B Visual System (Corporate Satire)

> Copy this entire brief into Gemini Free. Operator runs the
> output through `gemini-output-review-checklist.md`. Brand B is
> the riskiest brand in the portfolio (highest ban risk; tightest
> defamation gate); the visual system must reinforce, not erode,
> those guardrails.

---

## Role

You are a senior visual designer producing the visual identity +
social-content template system for **Brand B — Corporate Satire**.
Format is video-first (TikTok / Reels / YouTube Shorts), with X
as a mirror, and a minimal archive site.

## Brand B context (binding)

- **Niche:** UK / tech-corporate-culture satire — meetings,
  consultants, OKRs, all-hands rituals.
- **Aesthetic:** "Corporate theatre as documentary." Deadpan, dry,
  observational. Not reaction-face. Not edgelord.
- **Voice anchor (read fully before designing):**
  - `brands/brand-b-corpsatire/voice.md`
  - `brands/brand-b-corpsatire/house-examples.md`
  - `brands/brand-b-corpsatire/qa/satire-rules.md`
  - `brands/brand-b-corpsatire/qa/defamation.md`
  - `docs/voice-authenticity-system.md`

## Deadpan corporate theatre aesthetic

- **Light palette dominant.** Off-white, muted greys, the corporate
  conference-room look. One accent (a specific corporate-ish blue,
  the "alignment teal", or the muted Powerpoint orange — pick
  one).
- **Typography that reads "deck".** A sturdy sans (think
  "Calibri-but-on-purpose"); avoid retro / experimental display
  faces.
- **Composition like a slide.** Centered text. Predictable
  hierarchy. Bullet points with a slightly-too-much-space leading.
- **Stock photo references:** the stock-photo conference table
  with laptops; the "discussion in front of a whiteboard"; the
  "open-plan office with succulents". Use as visual quotation —
  Gemini renders them as illustrations, not real-stock-licensed
  photos.

## Meme / video-first styling

- **Vertical 9:16 frame** as the primary canvas.
- **Captions appear typed live**, with a slight delay, in a
  monospace or near-monospace font. Mistyping and live-correct
  is a feature, not a bug.
- **Cuts on the punchline**, never on the setup.
- **End frame** is always a faded brand mark + caption "AI-
  assisted satire — see bio." (per `docs/18-disclosure-templates.md` §3).
- **No reaction-face thumbnails.**
- **No emoji in titles or captions** beyond a single deadpan
  symbol when it earns its place.

## Punch-up only guardrails (binding — reinforced visually)

- **No identifiable real-company logos.** Generic placeholders
  ("Big Consulting Firm" / "The Bank" / "The SaaS").
- **No real-person likenesses, voices, or signatures.**
- **No real product names beyond clearly generic parody.**
- **No "leaked email / leaked Slack" content that mimics a real
  corporate brand's design language.**
- **No "boss screams at junior" framing.**

Design choices that reinforce this:
- Generic corporate-purple / corporate-blue colour blocks instead
  of brand-recognisable palettes.
- Cartoon stick-figure or grayscale silhouette for any person
  shown — never a photoreal face.
- Fictional company "logos" that are clearly diagrammatic
  (a circle with the word "ALIGN" in it; a triangle labelled
  "SYNERGY").

## Anti-cringe and anti-edgelord design rules

- **No "Stay tuned for part 2"** end frames. End the bit; end the
  video.
- **No engagement bait overlays** ("Comment below!", "Like if you
  agree!").
- **No "POV: you're a corporate worker" intro frame** (universal-
  truth-by-stock-photo is generic AI cadence).
- **No exclamation marks anywhere.** Brand B is dry.
- **No "Don't be like Brad"** punching-down phrasing.

## Social-card templates per surface

Produce template designs for the following formats:

### TikTok / Reels / YouTube Shorts (9:16, video; this brief is the
**still / cover frame**; video editing is operator-owned)

- Title card: brand mark + episode title + series tag (e.g.
  "Translations #07"). Persona name not shown.
- End card: brand mark + AI-assisted disclosure line + episode
  number.
- Lower-third style for on-screen text mid-clip.

### X (1200×675 or 1080×1080)

- Static brand card for clip mirrors: brand mark + episode title
  + AI-assisted disclosure line + a single dry visual cue
  (e.g. a faux calendar invite).

### Instagram feed (1080×1080)

- Single-frame "translation card": consultant phrase / English
  translation. Persona dry.

### LinkedIn (1200×627)

- Optional, defer to a separate decision (per
  `docs/x-platform-risk.md` §11 Brand-B is not on LinkedIn by
  default). If included, it's the same visual register as the X
  card.

## Shorts / Reels / TikTok visual format ideas

Provide visual specs (not video edits) for the recurring series
from `brands/brand-b-corpsatire/cornerstone-briefs.md`:

- **Translations**: a 2-row text layout — consultant phrase on
  top in a fake-corporate sans, English translation on the bottom
  in a slightly heavier weight.
- **Calendar Reads**: a faux Google Calendar / Outlook view as
  the visual base (generic, not branded).
- **Slack History**: a faux Slack thread layout (generic, not
  branded; never the real Slack purple).
- **1:1 Bingo**: a 3×3 grid with the persona-anonymous bingo
  squares.
- **The Framework**: a 2×2 matrix with absurd axes.

For each: composition spec, contrast notes, and the AI-assisted
disclosure placement (always in the first 3 seconds of the live
video; the still / cover frame previews the bit, not the
disclosure).

## Astro / Tailwind constraints (for the archive site)

The Brand B archive site is **minimal** — an about page + a
disclosure-compliant landing page + an archive of staged scripts.
No video player embedded.

- **Astro 4.x.** No client islands.
- **Tailwind**; reuse the existing brand-site template.
- **Compliance pages render the satire-variant AI-use disclosure**
  (per `docs/18-disclosure-templates.md` §3 satire variant).

## Exact Gemini deliverables

1. **Visual identity spec** (Markdown):
   - Colour palette (≤4 tokens).
   - Type stack (≤2 families).
   - Logo / brand mark guidelines (text-based; no symbol that could
     be confused for a real company logo).
   - Cover-frame templates per surface.
   - Series visual templates (Translations / Calendar Reads / Slack
     History / 1:1 Bingo / The Framework).
   - End-frame template.
2. **PNG-export-ready Figma-style component descriptions** in
   prose (Gemini Free is text-first; describe sizes, positions,
   typography, colours so the operator can build in Figma /
   CapCut).
3. **Astro + Tailwind starter for the archive site:** one
   `Base.astro` extension + `/about` + `/ai-use` + `/contact` +
   `/archive` pages. No video embeds.
4. **Forbidden-design inventory** — explicit list of design
   choices Gemini did NOT make and why (e.g. "did not include
   reaction-face thumbnail because Brand B is deadpan").

## Out of scope (Gemini does not produce)

- Real scripts / on-screen text content (operator owns voice).
- Anything that names a real company or person.
- Anything that mimics a real corporate brand's identity (Slack
  purple, Microsoft blue, Salesforce cloud, etc.).
- Any video editing.
- Any animation timing beyond "cut on punchline" guidance.

## Brand-B-specific review-checklist items

(Full checklist in `gemini-output-review-checklist.md`. Below are
Brand-B-specific.)

- [ ] No identifiable real-company logos / palettes / typefaces.
- [ ] No real-person likenesses.
- [ ] No reaction-face / smug-pause framing.
- [ ] No "Stay tuned" / engagement-bait end frames.
- [ ] No emoji-stuffed templates.
- [ ] AI-assisted disclosure placement specified for every
      template.
- [ ] Punch-up rules visible in the visual choices, not just text.
