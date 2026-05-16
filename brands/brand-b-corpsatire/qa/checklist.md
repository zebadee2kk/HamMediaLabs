# Brand B — QA Checklist (binding gate)

> Walked by a human persona owner before `status: qa` → `status: staged`.
> Every item is blocking. The AI QA pass (`prompts/04-qa-pass.md`) is
> **input** to this checklist, never a substitute. Runs alongside the
> lab-wide `playbooks/voice-fidelity-checklist.md`.

## 1. Frontmatter

- [ ] `slug` kebab-case and unique within `drafts/` (when drafts land
      under a future `drafts/` folder).
- [ ] `series` is one of the known values or `one-shot`.
- [ ] `status: qa` (about to flip to `staged`).
- [ ] `specific_noun` is set and is concrete (not "meetings",
      "corporate culture", "synergy") — see `qa/satire-rules.md` §2.
- [ ] `intended_target` describes an **abstract corporate behaviour**,
      not a real entity.
- [ ] `punch_direction: up`.
- [ ] `affiliate_in_play` and `sponsor_in_play` match the body. If
      `sponsor_in_play: true`, a written sponsorship agreement is on
      file and Tier-3 approval has been obtained.
- [ ] `author` and `editor` are real human names.

## 2. Watch-aloud gate (mandatory — replaces the read-aloud gate)

The persona owner watches the rough cut (or reads the script aloud
end-to-end if no cut exists yet), once, at normal speed, in a room
alone.

After watching / reading aloud:

- [ ] Did the persona actually sound like the persona at every beat?
      (Brand B is **deadpan** — flag any reaction-face / smug-pause
      moment.)
- [ ] Did any moment make me wince? (If yes, the audience will too —
      fix or cut.)
- [ ] Did I laugh anywhere I didn't intend? (Could be the bit landing
      better than expected, or could be the bit punching the wrong
      way. Diagnose.)
- [ ] Was there a beat I rushed past because I was bored?

The persona owner names **one specific edit** they made after watching
in the editorial-notes block. "None" means they skimmed.

## 3. Punch-direction (`qa/satire-rules.md` §1)

- [ ] Every named target is executive / consultant / industry / the
      persona themselves.
- [ ] No junior, support, or contractor mentioned as the butt of the joke.
- [ ] No identifiable real employee referenced.
- [ ] No protected class mentioned in any negative frame.
- [ ] If the bit risks sideways punching (mocking the audience), it's
      cut or rewritten.

## 4. Defamation safety (`qa/defamation.md`)

- [ ] No real public figure named, implied, or AI-synthesised.
- [ ] No real company named beyond clearly generic parody (acceptable
      examples: "Big Consulting Firm", "the consultancy", "the
      bank"; unacceptable: "PwC's 2026 R&D division", "Brad from
      Salesforce").
- [ ] No "leaked email" / "leaked Slack" content that could be
      mistaken for a real specific company's internal comms.
- [ ] Any quote attributed to a fictionalised executive is clearly
      fictional and not a deepfake of a real person.

## 5. Anti-cringe (`qa/satire-rules.md` §2)

- [ ] At least one specific noun anchors the bit. No fortune-cookie
      universal truths.
- [ ] No "stay tuned for part 2" cliffhanger that exists only to drive
      engagement.
- [ ] No hashtag spam; 2–3 hashtags max in the caption.
- [ ] No emoji in the caption beyond a single one earning its place.
- [ ] No "hot take" / "what nobody is talking about" / "real talk"
      filler.

## 6. Anti-edgelord (`qa/satire-rules.md` §3)

- [ ] No shock-for-shock's-sake jokes.
- [ ] No cruelty masquerading as edge.
- [ ] No joke that would land poorly if read by the *target's family*.
- [ ] No casual swearing in a clip that doesn't otherwise warrant it.

## 7. HR / workplace sensitivity

- [ ] No mocking of layoffs / illness / mental health / harassment /
      family situations.
- [ ] If a clip references a layoff context, the target is the
      corporate decision, not the affected workers.
- [ ] No joke at the expense of any specific protected characteristic.

## 8. Voice compliance (extends `voice.md` §5)

- [ ] None of the §5 anti-voice patterns appear (smug pause, reaction-
      face, bro / LinkedIn-speak, emoji spam, AI-tell rhythms).
- [ ] Cuts on the punchline, never on the setup.
- [ ] Deadpan throughout.

## 9. AI-assist disclosure

- [ ] AI-assist disclosure visible in the first 3 seconds of the clip.
- [ ] AI-assist line present in the post body.
- [ ] Bio carries the same disclosure (persona owner verifies on each
      platform).
- [ ] Pinned post links the longer policy.

## 10. Platform compliance

- [ ] If posting to X, this post does not exceed Brand B's ceiling in
      `docs/x-platform-risk.md` §7 (≤4 posts/week).
- [ ] No link in the launch tweet for X mirrors; first reply or final
      thread post only (`docs/x-platform-risk.md` §4).
- [ ] Cross-post timing: TikTok native first; Reels within 24h with
      watermark stripped.

## 11. Voice fidelity (mandatory, parallel gate)

- [ ] `playbooks/voice-fidelity-checklist.md` walked end-to-end by the
      persona owner.
- [ ] Voice DNA phrases from `voice.md` §3 appear naturally; pet
      peeves absent.

## 12. Approval

- [ ] One human persona owner has watched the entire cut (not just
      sampled).
- [ ] Persona owner has set `reviewed_at` in frontmatter to the ISO
      timestamp of approval.
- [ ] Status flipped to `staged` only after this checklist is fully green.
- [ ] **No autonomous publishing.** Posting is manual (Tier 2) or
      operator one-click approve (Tier 3 when promoted). Tier 4 is
      frozen.

## Verdict

The clip can flip to `status: staged` only when **every** box above is
ticked. The bar is not "good enough" — the bar is "this is funny, this
is safe, and this is unmistakably Brand B".
