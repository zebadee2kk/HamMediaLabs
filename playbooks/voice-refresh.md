# Voice Refresh (quarterly SOP)

> `docs/voice-authenticity-system.md` mandates a voice refresh every
> 3–6 months; every `voice.md` §8 promises it. This playbook is the
> actual procedure so it happens on a calendar, not on vibes.
> Owner: the brand's persona owner. Duration: ≤90 min per brand.
> Cadence: quarterly, in the same week as the quarterly platform
> refresh (`playbooks/quarterly-platform-refresh.md`) so it can't be
> silently skipped.

## 1. Pull the evidence (20 min)

- [ ] Top 5 performing pieces of the quarter (dashboard / `v_brand_weekly_stats`
      — engagement and returning-visitor weighted, not raw impressions).
- [ ] Bottom 3 pieces that passed QA but underperformed.
- [ ] The quarter's `v_qa_weekly` row set: pass-rate trend and
      ai-tells-flagged trend.
- [ ] Any reader replies/comments that quote the brand's own phrasing
      back at it (that's the voice landing — capture the phrases).

## 2. Promote (30 min)

- [ ] For each top piece: is any passage gold-standard for a
      `house-examples.md` slot? Swap it in and log it in §10
      (Promotion log). Target: at least one real promotion per quarter
      once the brand is live — starters should be fully replaced by
      the second quarter.
- [ ] New favourite phrases that emerged → `voice.md` §3.
- [ ] New winning structures (openings, closers, formats) → note in
      the matching house-example slot's "Why it works".

## 3. Prune (20 min)

- [ ] Any §3 favourite phrase that now appears in every piece is a tic —
      move it to pet peeves or cap its use.
- [ ] Any voice rule nobody has needed all quarter: delete it. A voice
      doc that only grows stops being read.
- [ ] Anti-voice list: add any new AI-tell patterns spotted in Stage-2
      critiques this quarter (`qa_event` rows where `ai_tells` > 0 —
      read the `meta` payloads).

## 4. Verify the system (15 min)

- [ ] Read the §1 character bio aloud once. Still true? Personas are
      allowed to evolve; drift is only a problem when it's unlogged.
- [ ] Voice contrasts: did any collapse this quarter (all-deadpan,
      all-calm)? If a contrast keeps collapsing, the contrast is
      wrong — rewrite it, don't keep failing it.
- [ ] Persona owner still named and still the person actually walking
      the gates?

## 5. Log it (5 min)

- [ ] Decision-log entry: date, brand, what was promoted, what was
      pruned, pass-rate trend, one sentence on voice health.
- [ ] Update the refresh date in `voice.md`'s header area.

## Failure mode this playbook exists to prevent

The voice system rots in the exact way it warns about: examples go
stale, the anti-voice list stops matching what models actually emit,
and generation quietly regresses to generic — while every checklist
still passes because the checklists reference the stale files.
