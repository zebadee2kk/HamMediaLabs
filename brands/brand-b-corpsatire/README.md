# Brand B — Corporate Satire · editorial pipeline

This folder is the operating manual for Brand B. **Nothing in here ships
content on its own** — every gate is human-approved. Brand A's pipeline
(`brands/brand-a-aiescape/README.md`) is the structural baseline; the
gates below add satire-specific safety on top.

## Folder map

```
brands/brand-b-corpsatire/
  profile.md              Identity, hypothesis, KPIs, tier status.
  voice.md                Persona, voice contrasts, voice DNA, anti-voice.
                          Conforms to brands/templates/voice-template.md.
  house-examples.md       8 required slots (incl. labelled BAD example).
  cornerstone-briefs.md   The five recurring series anchors.
  templates/
    _draft-template.md    Short-form / video-first draft starting point.
  prompts/
    01-outline.md         Idea → beat-by-beat outline (≤25s clip).
    02-draft.md           Outline → full script + caption + post body.
    03-headlines.md       Concept → 12 caption candidates.
    04-qa-pass.md         Draft → structured satire-safety report.
  qa/
    checklist.md          Binding human gate before qa → staged.
    satire-rules.md       Punch-up, anti-cringe, anti-edgelord.
    defamation.md         Legal-safety gate.
    affiliate-disclosure.md  Brand B specifics (sponsorship inbound only).
```

## Lifecycle (mirrors Brand A; adapted for short-form)

```
idea ─► brief ─► outline ─► script ─► QA ─► staged ─► live ─► archived
```

Every transition has a named gate; nothing auto-advances.

### §1. idea → brief
A series episode (recurring) or one-shot bit. Capture: slug, format
(talking-head / faux-Slack / calendar-read / etc.), target surface
(TikTok / Reels / Shorts / X), affiliate / sponsor in play (default
no), and the **specific noun** the bit rests on (one concrete artefact
— a 4:30 invite, a Slack message, an OKR doc). If the noun is generic,
the bit is generic; send the brief back.

### §2. brief → outline
`prompts/01-outline.md`. Output is a beat-by-beat shot list for a clip
≤25s plus a draft caption.

### §3. outline → script
`prompts/02-draft.md`. Output is the full operator script (voiceover +
on-screen text + caption + post body). Pre-checked against §"Banned
topics" in `voice.md`.

### §4. script → QA
`prompts/04-qa-pass.md` runs first as a **structured satire-safety
pass** (defamation flags, punch-direction flags, cringe flags, edgelord
flags). The output is **input** to the human walkthrough — never a
substitute. Then walk `qa/checklist.md` end-to-end.

### §5. QA → staged
Once the checklist is fully green and the persona owner has signed off
(including the **watch-aloud** gate — see `qa/checklist.md` §2), the
script is staged. The video is filmed and edited from the staged
script. Filming does **not** re-open the editorial gates — if the cut
diverges from the staged script, re-run §4.

### §6. staged → live
Manual posting only (Tier 2). Cadence ceiling is enforced by
`docs/x-platform-risk.md` §7 for X mirrors. The platform's branded-
content / "paid partnership" toggles are used only when we have a
written sponsorship agreement on file.

## Meme vs article split

Brand B is **not** a blog. Long-form pieces are out of scope at MVP.

| Format | Where | Cadence | QA path |
|---|---|---|---|
| **15–25s clip** (primary) | TikTok primary, Reels mirror | 3–5 / week | This pipeline, full |
| **Image / meme** (caption ≤140 chars) | X mirror, Reels secondary | ≤1 / week | Lightweight: §1 + §4 only |
| **Series caption sketch** (no video) | X mirror | ≤2 / week | Lightweight: §1 + §4 only |
| **Longform blog** | Archive only | Per major series milestone | Out of scope at MVP |
| **Sponsored content** | All | Inbound only; never outbound | Full pipeline + sponsorship agreement on file |

## X / TikTok / Shorts suitability

- **TikTok** — primary surface. Highest engagement, highest ban risk.
  Manual posting only. Conform to `docs/x-platform-risk.md` cadence
  ceiling (≤4 / week for Brand B's X mirror; TikTok ceiling capped at
  5 / week in `profile.md`).
- **Instagram Reels** — straight mirror within 24h. Strip the TikTok
  watermark before posting natively.
- **YouTube Shorts** — opportunistic; only for the strongest clips.
  Brand-account, not personal.
- **X** — mirror channel. Threads excel for series-driven posts (e.g.
  *Translations*); single posts excel for *Slack History* sketches.
  Disclosure rules in `docs/x-platform-risk.md` §5 apply: `#ad` in body
  on any commercial post; AI-assistance label visible in bio and on
  every commercial post.

## Satire boundaries (binding — see also `qa/satire-rules.md` and
`qa/defamation.md`)

- **Punch up, never down.** Targets are executives, consultants, the
  industry, and the operator themselves. Never juniors, support staff,
  layoff victims, identifiable employees, or protected classes.
- **No real-person synthesis.** Never AI-synthesise the voice, face,
  signature, or named identity of a real person, public or otherwise.
- **No company-specific defamation.** "Big Consulting Firm" is fine.
  "Acme & Friends 2026 R&D division" is not. See `qa/defamation.md`.
- **No cruelty.** Humour at the expense of suffering (layoffs, illness,
  insolvency) is out.
- **No politics / culture-war.** No deliberate engagement; if a clip
  catches an unintended political cycle, mute notifications and let it
  pass.
- **AI disclosure even in satire.** EU AI Act Article 50 carve-out for
  satire still requires disclosure of AI involvement — bio, pinned
  post, first 3 seconds of any video. See
  `docs/18-disclosure-templates.md` §3 (satire variant).

## HR / workplace sensitivity controls

Brand B's subject matter is workplaces. We are careful with topics
that could harm specific real people, even unnamed:

- **Layoff threads** — never the punchline. If a clip references a
  layoff context, it punches at the corporate decision, not the
  affected workers.
- **Mental health** — never the joke. Burnout *as a culture critique*
  is in scope; burnout *as the butt of a joke* is not.
- **Workplace abuse / harassment** — out of scope. If a comment thread
  takes a clip in that direction, mute or remove.
- **Family / relationship references** — generic only; never the
  operator's actual family. The persona is fictionalised composite even
  when it overlaps with the operator's experience.

## Cross-references

- `docs/voice-authenticity-system.md` — the moat we are building toward.
- `brands/templates/voice-template.md` — canonical voice.md shape.
- `playbooks/voice-fidelity-checklist.md` — voice gate (with read-
  aloud step) that runs alongside our QA checklist.
- `docs/x-platform-risk.md` — X-specific governance (cadence, link
  policy, disclosure, escalation).
- `docs/18-disclosure-templates.md` — canonical disclosure copy.
- `docs/17-style-guide.md` — lab-wide style.
- `prompt-library/persona-first-generation.md` — persona-first prompt
  pattern (use Stage 2 critique even on short-form scripts).
- `prompt-library/general-secure-skeleton.md` — wrap every generation
  call in the secure skeleton's `DATA SECTION:` block.

## What this pipeline does NOT do

- It does **not** auto-publish anywhere.
- It does **not** auto-mirror. Cross-posting from TikTok to Reels is
  done by the operator, manually, with the watermark stripped.
- It does **not** synthesise real people.
- It does **not** chase trending political news cycles.
- It does **not** make money in year 1. Brand B is validation-only.
  Sponsorship is inbound, never outbound, and only after the brand has
  a real audience signal.

## Tier discipline

- Phase 5: Tier 2 (manual posting only). Hard ceiling.
- Tier 3 promotion gate (operator one-click approve): ≥90 days of
  zero policy incidents, ≥1 series consistently performing, and a
  Cloudflare-Access-protected approval surface in place.
- Tier 4 (autonomous publishing): **frozen for year 1**, and Brand B
  is the last brand we would ever promote to T4 — highest ban risk.
