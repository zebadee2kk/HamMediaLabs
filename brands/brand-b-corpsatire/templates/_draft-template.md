---
# Identity
slug: REPLACE-with-kebab-case-slug
brand: corpsatire
title: REPLACE — caption-style title, ≤65 chars, sets the bit's premise
description: REPLACE — 100–140 chars; reads like the persona wrote it
date: YYYY-MM-DD
series: REPLACE — one of: translations | calendar-reads | slack-history | bingo | framework | one-shot

# Lifecycle (maps to content_asset.status in HQ DB)
status: draft    # idea | brief | outline | draft | qa | staged | live | archived

# AI labelling
ai_augmentation: assist   # none | assist | generated
# Brand B is satire — disclose AI involvement per the EU AI Act satire
# variant in `docs/18-disclosure-templates.md` §3 (bio + pinned + first
# 3 seconds of the video).

# Monetisation
affiliate_in_play: false
sponsor_in_play: false
# Sponsor flag means a paid sponsorship exists. NEVER true without a
# written sponsorship agreement on file and Tier-3 approval.

# Surface
primary_surface: tiktok   # tiktok | reels | shorts | x
mirror_surfaces:
  - reels
duration_seconds_target: 22
target_aspect: vertical    # vertical | square | horizontal

# Editorial intent
specific_noun: REPLACE — the concrete artefact the bit rests on
                # ("the 4:30 retro", "Brad's OKR doc", "Tuesday all-hands")
punch_direction: up        # always "up" — see qa/satire-rules.md §1
defamation_check: false    # set to true once qa/defamation.md is walked
intended_target: REPLACE — the abstract corporate behaviour, not a real entity

# Production
author: REPLACE — real human name
editor: REPLACE — real human name (can be the same person for solo ops)
reviewed_at:               # ISO datetime, set when QA passes
notes:                     # free-form — unused caption candidates, etc.

# Sources (rarely needed; if a clip references a fact, link it)
sources: []
---

## 1. Beat-by-beat (shot list)

> Each beat is ≤4 seconds. Aim 5–7 beats total for a 22s clip.

1. **0:00–0:03 — Opening beat:** REPLACE (visual + voiceover one line)
2. **0:03–0:07 — Setup beat:** REPLACE
3. **0:07–0:13 — Escalation:** REPLACE
4. **0:13–0:18 — Punch:** REPLACE
5. **0:18–0:22 — Tag / outro:** REPLACE

## 2. Script

**Voiceover:**

> REPLACE — every line of voiceover, in the persona's voice, in order.
> Brand B is **deadpan**; never write reaction-face dialogue. Cuts are
> on the punchline, never on the setup (`voice.md` §4).

**On-screen text:**

> REPLACE — every on-screen text appearance, in order, with timing
> hints.

**Visual notes:**

> REPLACE — what the camera is doing (mid-walk / desk / chart) and what
> any inserts are.

## 3. AI-assist disclosure (in-clip)

- [ ] Disclosure rendered in the first 3 seconds of the clip (per `docs/18-disclosure-templates.md` §3, satire variant).
- [ ] Bio carries the same disclosure.
- [ ] Pinned post links the longer policy.

## 4. Caption (for the platform post body)

> REPLACE — single line, one specific noun, one verb. ≤140 chars.
> Disclosure (when commercial): append `ℹ️ AI-assisted satire — see bio.`
> on its own line in the post body.

## 5. Post body / description

- TikTok / Reels: caption above + 2–3 hashtags max (no spam).
- X mirror (if used): single tweet or 2-post thread; **link, if any,
  goes in the first reply, not the launch post** (`docs/x-platform-risk.md` §4).

---

<!--
EDITORIAL NOTES (do not publish; strip before staged):

Pre-staged checklist (mirrors brands/brand-b-corpsatire/qa/checklist.md):
- [ ] All REPLACE markers gone.
- [ ] author / editor are real human names.
- [ ] reviewed_at set to ISO timestamp of persona-owner approval.
- [ ] Defamation check walked (qa/defamation.md). defamation_check: true.
- [ ] Punch direction confirmed "up" (qa/satire-rules.md §1).
- [ ] Anti-cringe pass clean (qa/satire-rules.md §2).
- [ ] Anti-edgelord pass clean (qa/satire-rules.md §3).
- [ ] Anti-voice scan clean (voice.md §5).
- [ ] Watch-aloud gate passed (qa/checklist.md §2).
- [ ] AI-assist disclosure visible in the first 3 seconds of the cut.
- [ ] sponsor_in_play: false unless a written agreement is on file AND
       Tier-3 approval has been obtained.

Unused caption candidates (pipe prompts/03-headlines.md output here):
-
-->
