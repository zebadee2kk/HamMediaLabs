# Brand A — AI Escape · editorial pipeline

This folder is the **operating manual** for Brand A's content production.
Nothing in here ships content on its own — every gate is human-approved.

## Folder map

```
brands/brand-a-aiescape/
  profile.md             Identity, hypothesis, KPIs, kill/hold/scale (canonical brand profile).
  voice.md               Tone rules, words to use/avoid, house examples. Extends docs/17-style-guide.md.
  cornerstone-briefs.md  The five cornerstone briefs that anchor the first 90 days.
  templates/
    _draft-template.md   The canonical starting point for any new draft.
  prompts/
    01-outline.md        Brief → numbered outline.
    02-draft.md          Outline → first-pass draft against the template.
    03-headlines.md      Concept → 12 candidate titles.
    04-qa-pass.md        Draft → structured QA report.
  qa/
    checklist.md         Hard gate before draft → staged.
    factuality.md        Source-checking protocol.
    anti-hype.md         Voice red flags (extends voice.md).
    affiliate-disclosure.md  Brand A specifics on FTC / ASA disclosure placement.
  drafts/
    <NN>-<slug>.md       In-flight drafts. Status set in YAML frontmatter.
```

## Lifecycle

```
idea ──► brief ──► outline ──► draft ──► qa ──► staged ──► live ──► archived
 │         │          │           │       │        │
 │ §1      │ §2       │ §3        │ §4    │ §5     │ §6
```

Each transition has a named gate. Drafts can also fork backward to `idea`
when a piece is killed mid-production — log it in the decision log.

### §1. idea → brief
- Use a row in `cornerstone-briefs.md` (cornerstones) or open a new brief
  (sidebar pieces) capturing: slug, primary intent, target queries, length
  target, monetisation in play (yes/no), and the contrarian / specific angle.
- Mark frontmatter `status: brief` on a new file under `drafts/`.
- **Human approval** required before moving forward.

### §2. brief → outline
- Use `prompts/01-outline.md` with the brief and `voice.md` as inputs.
- The router can run this on the `plan` slot (Gemini 2.5 Pro) — see
  `core/router/` and `ARCHITECTURE.md` §1.
- Output: numbered outline pasted into the draft body under a TL;DR
  placeholder. Mark `status: outline` (a sub-state of `brief` — the DB
  schema keeps it as `brief`).

### §3. outline → draft
- Use `prompts/02-draft.md`. Slot: `plan` for long-context coherence.
- The draft must satisfy the template (`templates/_draft-template.md`).
- Mark `status: draft`. Set `author` (real human) and a tentative `editor`.

### §4. draft → qa
- Run `prompts/04-qa-pass.md` against the draft. The AI QA pass produces a
  structured report (factuality flags, anti-hype flags, disclosure presence,
  source coverage). It is a **first** pass — never the final one.
- Then a **human editor** walks the `qa/checklist.md` end to end. Every
  unchecked item is a blocker.
- Mark `status: qa`.

### §5. qa → staged
- Once the checklist is green and at least one human has approved the piece
  in conversation (e.g. a PR comment, an email, a chat decision), set
  `status: staged` and `reviewed_at` to the ISO timestamp of approval.
- The piece is now eligible for publish from the brand site repo.

### §6. staged → live
- Tier 2 (`profile.md`): publish is manual.
- Tier 3 (`profile.md`): one-click operator approval triggers the live
  publish from staging. We are **not** Tier 4 — see governance.
- After publish, sync to `content_asset` in HQ (via n8n or a manual SQL
  insert) and start the engagement clock.

## Headline variants (anywhere in §3–§4)

`prompts/03-headlines.md` produces 12 candidates. Pick one for the page
`title`, hold 1–2 for social mirrors. Keep the unused candidates in the
draft's frontmatter `notes` so future iteration has lineage.

## What this pipeline does NOT do

- It does not auto-publish. There is no path from this folder to a live URL
  that does not include a human approval.
- It does not auto-monetise. Affiliate links are added manually with the
  disclosure block (see `qa/affiliate-disclosure.md`).
- It does not handle SEO automation, social syndication, or CMS publishing.
  Those are separate, future pipelines.

## Cross-references

- Canonical compliance copy: `docs/18-disclosure-templates.md`.
- Lab-wide style: `docs/17-style-guide.md`.
- Tier-by-tier governance: `docs/03-governance.md`.
- Content quality bar (lab-wide): `playbooks/content-quality-checklist.md`.
- Router / scoring / data: `ARCHITECTURE.md`.
