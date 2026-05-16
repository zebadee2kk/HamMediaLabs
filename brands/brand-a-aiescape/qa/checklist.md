# Brand A — QA checklist

> Hard gate before `status: qa` → `status: staged`. Every item is a blocker.
> Walked by a human editor. The AI QA pass (`prompts/04-qa-pass.md`) is
> first-pass *input* to this checklist, never a substitute.

## Frontmatter

- [ ] `slug` is kebab-case and unique within `drafts/`.
- [ ] `title` is ≤65 characters and matches the voice rules in `voice.md`.
- [ ] `description` is 145–160 characters and reads like a human wrote it.
- [ ] `status` is `qa` (about to flip to `staged`).
- [ ] `ai_augmentation` accurately reflects how the piece was produced.
- [ ] `affiliate_in_play` is set correctly; if `true`, the disclosure block
      is rendered above the first affiliate link in the body.
- [ ] `author` and `editor` are real human names (operator's real name at
      MVP). Not a brand handle.
- [ ] `sources` populated for every contestable claim.

## Disclosure

- [ ] AI-use disclosure block (see `docs/18-disclosure-templates.md` §3)
      appears above the byline / TL;DR.
- [ ] If affiliate links present: affiliate disclosure block (see
      `docs/18-disclosure-templates.md` §2) appears ABOVE the first
      affiliate link.
- [ ] No affiliate link is wrapped in fine print or hidden behind a click.
- [ ] No affiliate link to a product the writer has not used or vetted.

## Voice

- [ ] No banned phrases (see `voice.md` words-to-avoid).
- [ ] First-person used for opinion, third-person for product claims.
- [ ] Specific over vague: every adjective-heavy claim has a number, name,
      or date near it.
- [ ] No clickbait, no false scarcity, no superlatives.

## Factuality (see `qa/factuality.md` for the full protocol)

- [ ] Every contestable claim has a citation or is marked as the author's
      direct experience.
- [ ] Statistics ≤18 months old, or re-verified at publish time.
- [ ] No fabricated quotes, attributions, or screenshots.
- [ ] Source list complete and links live (HTTP 200 spot-check).

## Anti-hype (see `qa/anti-hype.md`)

- [ ] If a paragraph is removed, the piece is still recognisably useful.
- [ ] The "would I send this to a smart friend?" test passes.
- [ ] No "AI thought-leader sludge" — see anti-hype red flags.

## Structure

- [ ] TL;DR present in the first 100 words.
- [ ] "How I tested" / methodology section present.
- [ ] "What I'd avoid" section present.
- [ ] ≥3 internal links to related Brand A pieces (forward or backward).
- [ ] One image or diagram, original or AI-generated and labelled as such.
- [ ] Length within ±15% of `length_target_words`.

## Approval (manual)

- [ ] One human editor has read the piece end-to-end after the checklist.
- [ ] Editor sets `reviewed_at` in frontmatter to the ISO timestamp of
      approval.
- [ ] Status flipped to `staged` only after this checklist is fully green.

## Reminders

- The checklist is for `staged`, not `live`. Tier 2 → manual publish; Tier 3
  → operator one-click approval (see `brands/brand-a-aiescape/profile.md`).
- Tier 4 (autonomous publish) is **blocked** for year 1.
