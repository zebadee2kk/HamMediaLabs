# Gemini Brief — Social Asset Templates (cross-brand)

> **Claude pre-review required.** Before sending this brief to Gemini,
> walk `claude-design-subagents.md` (six subagents) and complete
> `claude-before-gemini-checklist.md`. The Compliance/Disclosure
> subagent must verify `#ad` and AI-assist disclosure placement
> across all brand templates.
>
> Copy this entire brief into Gemini Free. Produces templated
> social cards / launch assets per brand. Run through
> `gemini-output-review-checklist.md` before committing any
> output to the repo.

---

## Role

You are a senior social-content designer producing **reusable
asset templates** for HamMediaLabs across Brand A / B / C.

Templates are operator-driven: the operator fills the template
with real content per piece. No automated posting; templates are
the visual scaffolding, not the campaigns.

## Context (binding)

- All posting is manual (per `docs/x-platform-risk.md`).
- Brand B is video-first; Brand A and Brand C carry occasional
  social cards.
- Disclosure rules (`docs/18-disclosure-templates.md`) are
  rendered visibly on every commercial card. `#ad` appears in
  the **post body**, not just the card.
- AI-assist disclosure renders on every card that the brand
  shipped via AI assistance (most of them, at MVP).

## Per-brand launch cards

### Brand A — AI Escape

Card shape:
- 1080×1080 (Instagram) + 1200×675 (X) versions.
- Header: brand name (text).
- Body: piece title (large, ≤65 chars), 1-line description.
- Footer: AI-assist line (`ℹ️ AI-assisted, human-edited.`) +
  brand mark.
- Palette: Brand A's confident peer palette (per
  `gemini-brand-a-mvp-site.md`).
- Typography: sturdy sans heavy + lighter weight for description.
- No exclamation marks. No emojis beyond a single deadpan symbol
  if it earns its place.

Variants:
- **Cornerstone announce.** "New piece" framing.
- **Read-this** quiet reminder (for a piece older than a week).
- **Newsletter mention.** Encourages signup.

### Brand B — Corporate Satire

Card shape (covers / stills only; video itself is operator-edited):
- 1080×1920 (9:16) for TikTok / Reels / Shorts covers.
- 1200×675 for X mirror.
- Per `gemini-brand-b-visual-system.md` — deadpan, generic-
  corporate aesthetic, no real brand mimicry.
- Footer always includes "AI-assisted satire — see bio." plus
  series number (e.g. "Translations #08").
- No reaction-face. No engagement bait.

Variants:
- **Series-anchor cover** per recurring series (Translations,
  Calendar Reads, Slack History, 1:1 Bingo, The Framework).
- **One-shot bit cover** for episodes outside a series.

### Brand C — UK Financial Escape

Card shape:
- 1080×1080 (Instagram) + 1200×627 (LinkedIn / news-feed share)
  versions.
- Header: brand name (text).
- Body: piece title (calm, ≤65 chars; no urgency words), 1-line
  description.
- Footer: FCA disclaimer (compressed: "Information, not advice.
  See full disclaimer on the site.") + AI-assist line + brand
  mark.
- Palette: calm slate / quiet accent (per
  `gemini-brand-c-trust-ui.md`).
- **No urgency / scarcity / promotional language.**
- **No money-imagery** (coins / cash / banknotes — too
  promotional).

Variants:
- **Cornerstone announce.** Information framing only.
- **Price-cap update** quarterly-news-peg variant.
- **Charity-link reminder** (rare; used only when a vulnerable-
  reader piece is referenced, with the charity block info on
  the card itself).

## AI-use disclosure placement guidance

Visible on every commercial / AI-assisted card:

- Brand A: footer line, small but legible.
- Brand B: bottom-right corner, persistent on the cover frame
  and the end frame.
- Brand C: footer line, alongside the FCA-compressed disclaimer.

When `affiliate_in_play: true`, the **post body** carries `#ad`
in addition to the card's AI-assist line. The card itself does
NOT carry `#ad` because hashtags on cards drift into spam-
territory; `#ad` belongs in the body text.

## X / LinkedIn / Instagram / YouTube Shorts framing

Per platform:

- **X (1200×675):** still card for any brand; standalone post
  body carries `#ad` if commercial, AI-assist line, and the link
  in the **first reply** (per `docs/x-platform-risk.md` §4).
- **LinkedIn (1200×627):** Brand A primarily; never Brand B's
  punch-up content (LinkedIn norms different); never Brand C
  promotional content (FCA exposure).
- **Instagram (1080×1080 feed; 1080×1920 reels):** Brand B
  primarily; Brand A occasional.
- **YouTube Shorts cover (1080×1920):** Brand B primarily.
- **TikTok cover (1080×1920):** Brand B primarily.

## No automated posting (binding)

These templates are **filled by the operator** in CapCut /
Figma / Photopea / whatever. They do not feed an autoposter.
There is no scheduling automation in this brief; templates are
visual scaffolding only.

## Exact Gemini deliverables

1. **Card template spec** (Markdown) for each brand:
   - Sizes per surface.
   - Type stack per brand.
   - Palette per brand.
   - Composition (heading position, body position, footer
     position, brand mark position).
   - Per-variant layout.
2. **Two reference PNG-export-ready mockups per brand** (Gemini
   Free is text-first; describe each mockup in detail with
   measurements so the operator can recreate in Figma).
3. **Per-platform export checklist** (compression target, file-
   size ceiling, format).
4. **AI-disclosure-placement inventory** — for each template, the
   exact location and copy of the AI-assist line.

## Out of scope (Gemini does not produce)

- Real campaign copy (operator owns; per brand `voice.md`).
- Automated posting tools / scheduling.
- Templates that include affiliate-product imagery.
- Templates that include real-company / real-person likenesses.
- Templates that violate `gemini-brand-b-visual-system.md`
  guardrails (no reaction-face / no real-brand-mimicry).
- Templates that violate `gemini-brand-c-trust-ui.md` rules
  (no urgency / no scarcity / no promotional money imagery).

## Review-checklist items for this brief

(Full checklist in `gemini-output-review-checklist.md`.)

- [ ] AI-assist line present on every commercial / AI-assisted
      template.
- [ ] FCA disclaimer present on every Brand C template.
- [ ] No real-company logos / real-person likenesses anywhere.
- [ ] No exclamation marks in any default copy.
- [ ] No emojis beyond a single deadpan symbol per template.
- [ ] No urgency / scarcity copy in Brand C templates.
- [ ] No engagement-bait copy ("Stay tuned!" / "Comment below!")
      in any template.
- [ ] No money imagery in Brand C templates.
- [ ] Per-platform sizes and compression targets specified.
