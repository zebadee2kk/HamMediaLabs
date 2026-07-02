# Creative Director's Review — Incoming Assessment

**Date:** 2026-07-02
**Author:** Incoming creative director (Claude, via Claude Code)
**Scope:** Brand assets, editorial system, design pipeline, and creative operations across the whole repo.
**Status:** Assessment + proposed value-add plan. Nothing here changes canonical docs; every recommendation adopted below becomes its own scoped PR + decision-log entry per repo convention.

---

## 1. Verdict

The lab's *governance* is exceptional and its *creative* layer is unfinished. This repo is
ahead of most funded media operations on disclosure, compliance, QA gates, and kill
discipline — and behind a weekend side project on visual identity, short-form creative,
and filled-in voice assets. The good news: the gaps are cheap to close, and the system
already tells us exactly where they are.

The single most important observation: **the flagship brand cannot pass its own quality
gate.** `playbooks/voice-fidelity-checklist.md` §1 requires `house-examples.md` to exist
with ≥5 filled slots before any piece can be QA'd — Brand A has no such file
(`brands/brand-a-aiescape/`), and its persona owner is "TBD". Brand A is otherwise
launch-ready (site instantiated, launch pack complete, cornerstone draft written); the
blocker is creative, not technical.

## 2. What is genuinely strong (do not touch)

1. **The voice-authenticity system** (`docs/voice-authenticity-system.md`) — treats voice
   as operational material (character bio, contrasts, DNA, house examples, anti-voice)
   rather than adjectives. This is the moat, correctly identified as such in the decision log.
2. **The persona-first generation pattern** (`prompt-library/persona-first-generation.md`)
   — draft → persona critique (structured JSON) → revision → mandatory human QA, with the
   model verdict hard-capped at `persona_approves`, never "publish". Best single asset in
   the prompt library.
3. **Compliance and disclosure machinery** (`docs/18-disclosure-templates.md`,
   Brand C's FCA perimeter, the tier system, Tier-4 freeze). Rigorous, specific, and
   correctly wired into the site template's `<Disclosure />` component.
4. **The one real piece of content** (`brands/brand-a-aiescape/drafts/01-free-tier-ai-stack.md`)
   — strongly on-voice, real numbers, honest methodology, embedded editorial notes.
   It proves the voice system works when applied. It should be mined for house examples
   (see §4, P0-1).
5. **The style guide** (`docs/17-style-guide.md`) — specific enough to enforce
   ("first sentence is the thesis, not the warm-up"; the §12 "no" list).

## 3. Findings (ranked by leverage)

### F1 — Brand A fails its own voice gate *(blocker)*
- No `brands/brand-a-aiescape/house-examples.md`; the checklist input gate
  (`playbooks/voice-fidelity-checklist.md` §1) and Stage 1 of the persona-first pattern
  both require it. Brands B and C have the file but their slots are mostly empty
  placeholders — the "gold-standard anchor for AI generation" is unfilled portfolio-wide.
- Brand A's `voice.md` predates the canonical numbered template
  (`brands/templates/voice-template.md`) it is supposed to be the reference
  implementation for; B and C follow the newer structure.
- Persona owner is "TBD" on all three brands — the named human who runs the read-aloud
  gate does not exist anywhere in the portfolio.

### F2 — Zero committed visual identity *(biggest strategic gap)*
- No colour, typeface, logo, OG image, or design token is committed for any brand.
  `brands/templates/site/src/layouts/Base.astro` ships three grey CSS variables and one
  hardcoded blue link — shared by a deadpan satire brand and a financial-trust brand.
- `site.config.ts` (`BrandSiteConfig`) carries compliance fields only; there is **no
  identity surface at all** — no colour, type, or logo fields. Even when the Gemini design
  pass runs, there is no mechanism to apply its output per-brand without hand-forking.
- The design pipeline (`design-handoffs/`) is thorough but entirely upstream: the
  gitignored `output/` directory does not exist; no spec, palette, or mockup has been
  produced. Every Gemini brief also assumes Tailwind, which is not installed in the
  template — an unbuilt bridge between the design pipeline's assumptions and the scaffold.

### F3 — Short-form surfaces have no creative machinery
- All voice/QA gates are long-form-only ("Binding gate on every long-form piece").
  Brand B's *entire existence* is short-form video (TikTok-first), and Brands A/C mirror
  to X — yet there is no video-script format, no watch-aloud equivalent of the read-aloud
  gate, no X-thread prompt pattern, and no short-form house examples.
  Brand B's five named recurring series (`brands/brand-b-corpsatire/voice.md`) have no
  script template to run in.

> **Correction (2026-07-02, during P1 execution).** Brand B's own machinery
> is stronger than stated above: `brands/brand-b-corpsatire/templates/_draft-template.md`
> is a full beat-by-beat video-script template, and `qa/checklist.md` §2 is a
> real watch-aloud gate. The *actual* F3 gap is lab-wide: the voice-fidelity
> checklist's gates (200-word read-aloud, phrase counts) don't map to short
> form — and Brand B's QA §11 requires walking that checklist "end-to-end",
> which was unsatisfiable for a 22-second clip — plus there were no short-form
> generation prompts for any brand. Both fixed in the P1 PR (short-form
> addendum in `playbooks/voice-fidelity-checklist.md`;
> `prompt-library/short-form-patterns.md`).

### F4 — Creative quality is invisible to the decision engine
- The scoring engine (`core/scoring/scoring.ts`) drives kill/hold/scale from reach,
  engagement, conversion, cost, and risk — **no creative-quality input exists**.
- The Stage-2 persona-critique JSON (which quantifies persona fidelity and AI tells per
  piece) is generated and then discarded; QA checklist pass/fail never becomes a
  datapoint; the dashboard (`dashboards/app/`) has no view of drafts-in-QA or voice-fidelity
  throughput. A brand could drift fully off-voice and the weekly review would only see it
  weeks later as an engagement lag.

### F5 — Source-of-truth conflict on brand voice
- `brands/x-strategy-brand-playbooks.md` declares itself "the single source of truth for
  all brand voice and strategy" while the master plan and every `voice.md` treat
  `voice.md` + `docs/17-style-guide.md` as canonical. The conflict is live, not
  theoretical: the x-strategy file's Brand A pillar "leverage loops" uses phrasing Brand
  A's own `voice.md` bans.

### F6 — Missing brand-building basics
- All three brand names are working titles pending trademark/domain checks; blocks
  handles, domains, logos, and social identity.
- No editorial calendar; content pillars exist only as x-strategy bullets.
- No image/visual governance beyond "≤200 KB, no stock-photo clichés"; no image-gen
  prompts in `prompt-library/` despite AI imagery being in scope.
- No newsletter template despite "newsletter from week 1" being the uniform acquisition
  playbook's capture step.
- Operator name/email/postal address are placeholders in the live Brand A config — a
  newsletter-compliance launch blocker sitting in the identity layer.
- The "cross-brand flywheel" (A workflows → C trackers + B satire) is a bullet point with
  no workflow behind it.

## 4. How I add value — proposed plan

Each item = one scoped PR + decision-log entry where it touches canon. Ordered by
leverage-per-effort; P0 unblocks the flagship launch, P1 makes the portfolio real,
P2 instruments creative quality so the decision engine can see it.

### P0 — Unblock Brand A (days, not weeks)
1. **Write `brands/brand-a-aiescape/house-examples.md`** — all 8 canonical slots
   including the bad example, mined from the existing cornerstone draft and `voice.md`
   inline examples; migrate `voice.md` to the canonical numbered template while
   preserving every rule. Exit: Brand A passes voice-fidelity checklist §1.
2. **Resolve the voice source-of-truth conflict** — demote
   `brands/x-strategy-brand-playbooks.md` to a channel playbook ("voice defined in
   `voice.md`; this file covers X mechanics only"), fix the "leverage loops" phrasing,
   log the decision.
3. **Assign persona owners** — operator decision, not a PR; but the profile template's
   "Persona owner" field should stop being optional-in-practice. (Single-operator reality:
   the same human can own all three, but the *sign-off act* per brand must be explicit.)

### P1 — Make the portfolio real (the visual identity sprint)
4. **Commit a minimal identity layer in code** — extend `BrandSiteConfig` with a theme
   block (primary/accent colour, type pair, logo path, OG-image path) wired into
   `Base.astro` CSS variables. No Tailwind required; ~30 lines. This gives the Gemini
   design pass a place to land and makes per-brand identity a config concern, exactly
   like compliance already is.
5. **Define three starter palettes + type pairs as tokens** — compliance-aware defaults
   (Brand C: calm, no red/no money-green per `design-handoffs/gemini-brand-c-trust-ui.md`;
   Brand B: light + one accent, "corporate theatre as documentary"; Brand A: confident-peer).
   These are v1 tokens the Gemini pipeline refines, not final art — they end the
   "three brands share one grey stylesheet" state immediately.
6. **Run the design pipeline for real on one brand** (Brand A MVP site brief is ready) —
   produce the first actual artefact in `design-handoffs/output/`, walk the 14-section
   review checklist once end-to-end, and fix the Tailwind-assumption gap in the briefs
   (either install Tailwind in the template or rewrite briefs to token-based plain CSS —
   recommend the latter; it matches the template's zero-JS discipline).
7. **Short-form voice system** — a video-script template for Brand B's five series with
   a **watch-aloud gate** (the read-aloud gate's video equivalent), an X-thread prompt
   pattern for Brands A/C, and a short-form section in `voice-fidelity-checklist.md`.
   Short-form house-example slots added to B's file.
8. **Fill Brand B and C house examples** — the persona-first pattern generates candidates;
   the operator curates. Placeholder slots are the exact drift risk
   `docs/voice-authenticity-system.md` warns about.

### P2 — Instrument creative quality (make the moat measurable)
9. **Log the Stage-2 critique JSON** — persist persona-fidelity verdicts and AI-tell
   counts per asset (schema already has `agent_task`; one column or a JSON payload
   suffices). QA checklist pass/fail becomes a recorded field on `content_asset`
   status transitions.
10. **Surface creative ops on the dashboard** — a drafts-in-QA queue and a voice-fidelity
    pass-rate widget. The master plan's own risk register flags "AI-content quality
    collapse" with trigger "QA pass-rate <80%" — today that number is uncollectable.
11. **Feed a voice-fidelity proxy into the weekly review** (not the scoring formula —
    changing weights is a decision-log event and premature before data exists). Weekly
    review template gets a creative-quality line per brand.
12. **Close the naming gap** — shortlist + trademark/domain check checklist per brand,
    run as one operator working session; unblocks logos, handles, and OG art.
13. **Editorial calendar + voice-refresh SOP** — pillars → cadence → slots, and the
    3–6-month voice refresh the authenticity system mandates gets a playbook so it
    actually happens.

## 5. What I will not re-litigate

Settled decisions I inherit as constraints: the 3-brand cap and Brand A-first launch
order; the Tier-4 autonomous-publishing freeze; Brand B audience-only (no year-1
monetisation); Brand C's FCA perimeter and forbidden verticals; Gemini Free as the
design/build specialist with Claude on governance; branch + PR for every change;
"AI-augmented human" disclosure posture. The plan above works entirely inside them.

## 6. Suggested sequencing against the roadmap

P0 items are pre-launch blockers for Brand A and should land before any further
Phase 3 content work. P1 items 4–6 fit naturally in the same window as Brand A's
launch-pack execution; item 7 must land before Brand B's first video is scripted.
P2 is Phase 3/4 work — instrument while the first real data flows, so the day-61
kill/hold/scale review sees creative quality instead of guessing at it.
