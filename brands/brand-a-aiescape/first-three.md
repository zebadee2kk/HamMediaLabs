# Brand A — First Three Publishable Pieces

> The opening publishing loop for Brand A. Each piece passes the
> Brand A QA checklist (`qa/checklist.md`) and the voice-fidelity
> playbook (`playbooks/voice-fidelity-checklist.md`) before going
> `staged`, and the publish workflow (`publish-workflow.md`) before
> going `live`.

---

## #1 — Free-tier AI stack (cornerstone 1)

- **Brief:** `cornerstone-briefs.md` §"Cornerstone 1".
- **Draft:** `drafts/01-free-tier-ai-stack.md` (exists; status: `draft`).
- **Status path:** `draft` → `qa` → `staged` → publish day = launch day.
- **Persona owner:** TBD — set before `qa` flip.
- **Affiliate:** none at launch (`affiliate_in_play: false`).
- **Length target:** ~2,400 words.
- **Pre-publish to-dos:**
  1. Replace `author:` / `editor:` placeholders with real human names.
  2. Run `prompts/04-qa-pass.md`; address any "needs_changes" verdict.
  3. Walk `qa/checklist.md` and `playbooks/voice-fidelity-checklist.md`
     end to end (read-aloud gate is mandatory).
  4. Set `reviewed_at` to ISO timestamp of approval.
  5. Move from `drafts/` to `posts/` in the brand site repo; build;
     verify the AI-use disclosure renders above the byline on the
     live URL.

## #2 — Claude Code vs Cursor (cornerstone 2)

- **Brief:** `cornerstone-briefs.md` §"Cornerstone 2".
- **Draft:** to be created at `drafts/02-claude-code-vs-cursor.md`.
- **Status path:** `brief` (today) → `outline` → `draft` → `qa` → `staged`.
- **Target publish:** week 2 of launch window.
- **Affiliate:** none at launch.
- **Length target:** ~2,000 words.
- **Notes:** the brief calls for a 6-week head-to-head with real
  metrics; the metrics must be the operator's own (not invented). If
  the metrics aren't there yet, this piece slides to week 3 and #3
  takes its slot.

## #3 — Email-to-newsletter pipeline with free AI (cornerstone 3)

- **Brief:** `cornerstone-briefs.md` §"Cornerstone 3".
- **Draft:** to be created at `drafts/03-newsletter-pipeline-free-ai.md`.
- **Status path:** `brief` → `outline` → `draft` → `qa` → `staged`.
- **Target publish:** week 3 of launch window.
- **Affiliate:** none at launch. (Brand A's affiliate programmes —
  e.g. beehiiv, Kit — go live in a separate PR with disclosure copy
  per `docs/18-disclosure-templates.md` §7.)
- **Length target:** ~2,200 words.

---

## Why these three

- They map to three different reader intents (stack-shopper,
  comparison-shopper, builder).
- They demonstrate the brand's voice without monetisation pressure.
- They cross-reference each other naturally (≥3 internal links per
  piece, per Brand A QA checklist).
- They give the brand 4 weeks of cadence before the first review
  window without burning every cornerstone in the bank.

## What we are deliberately not doing in the first three

- No affiliate links.
- No sponsored content (no inbound likely yet, none sought).
- No comparison piece that names a competing media brand by name —
  these are tool comparisons, not "X is better than Y blog".
- No Brand B / Brand C content cross-linking; the brands stay
  independent until each has a real audience signal.

## Selection-rule reminder

These three were chosen against `docs/PROJECTHYDRA-MASTER-PLAN.md` §5.3
niche-selection rubric. If a piece slips or changes scope, a
decision-log entry is filed before the swap.

## Tracking

When a piece reaches `staged`, set `content_asset.status` to `staged`
in HQ. When it goes live, follow `publish-workflow.md`.
