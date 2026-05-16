# Brand A — Manual Publish Workflow

> The path from `status: staged` to `status: live`, end to end. **Manual
> publishing only** — Tier 2. Tier 3 (one-click operator approval)
> evaluated after 30 days of clean Tier 2 operation. Tier 4 is frozen.

---

## 1. Pre-flight (already complete before this workflow runs)

These are *already done* by the time a piece reaches this workflow.
Listing them so a tired operator doesn't accidentally re-do them.

- Brand A QA checklist (`qa/checklist.md`) — fully green.
- Voice fidelity checklist (`playbooks/voice-fidelity-checklist.md`) — read-aloud gate passed, persona-owner sign-off recorded.
- Frontmatter `status: staged`, `reviewed_at` set, `author` / `editor` are real names.

If any of the above is missing, the workflow stops here and routes
back to QA.

## 2. The publish step

1. Operator opens the brand site repo on their machine.
2. Operator moves the markdown file from `drafts/` to `posts/` (or
   the equivalent collection path defined in the Astro brand site).
3. Operator runs:
   ```bash
   cd brands/aiescape/site
   npm run build
   ```
   The Astro build must succeed. Any build error is a no-publish.
4. Operator opens a PR on the brand site repo containing the file
   move. The PR title is the piece's slug.
5. CI on the brand site runs `astro build` again. Must be green.
6. Operator merges the PR. Cloudflare Pages auto-deploys.
7. Operator verifies the live URL renders:
   - The piece is reachable at its slug.
   - AI-use disclosure block is visible above the byline.
   - The footer renders the brand site's standing disclosures.
   - No `PUBLIC_*` env values are visible in the rendered HTML.
   - Open Graph + meta description render as written.
8. Operator updates `content_asset.status` to `live` in HQ
   (`UPDATE brand_asset SET status='live' WHERE url='/<slug>'`).
9. Operator updates `content_asset.publish_date` to today.
10. Operator notes the publish in their daily log.

## 3. Post-publish — first 72 hours

Manual measurement window. No automation here.

- **+0 h:** Publish on the brand site (above). Send the newsletter
  announcement (if first piece of the week). Do **not** post to X
  yet — give the post a few hours to settle, and respect cadence.
- **+2 h:** Post to X. Per `docs/x-platform-risk.md` §4, the launch
  tweet is plain-language with no URL; the link goes in the first
  reply. `#ad` only if commercial (not at launch).
- **+6 h:** Spot-check analytics. The piece should be receiving
  some referral traffic from the newsletter and/or X reply link.
  If nothing in 6 hours, check that the post is actually reachable
  (DNS, deploy status).
- **+24 h:** First analytics snapshot. Record into `content_event`
  manually for now (until M3 / M6 of source-intelligence lands the
  ingest workflow):
  ```sql
  INSERT INTO content_event (asset_id, kind, value, meta)
  VALUES (
    (SELECT id FROM content_asset WHERE url='/<slug>'),
    'impression',
    <24h_pageviews>,
    '{"window":"24h","source":"manual","analytics":"plausible"}'
  );
  ```
- **+72 h:** Second snapshot, same shape, `meta.window: "72h"`. Note
  newsletter open rate and X engagement separately as
  `channel_event` rows.

## 4. Post-publish — week-1 review

Slotted at the end of week 1 in `playbooks/weekly-review-brand-a-launch.md`.

- Page views, referrers, time on page, bounce.
- Newsletter open & click rate.
- X impression / engagement on the launch reply.
- Any reader feedback (email, X reply, comment). Capture verbatim
  into the piece's `notes:` frontmatter for editorial learning.
- Decision: **promote**, **hold**, or **kill** the piece's amplification
  (no piece itself gets killed in week 1 — published pieces stay
  published unless they violate disclosure or factuality).

## 5. If something goes wrong

- **Factuality bug found post-publish:** correct inline, add a
  `Correction (YYYY-MM-DD):` line above the byline, keep original
  wording visible (struck-through or `<aside>`). Log in
  `docs/15-decision-log.md` if the bug touched a claim other pieces
  depend on.
- **Affiliate link added later:** flip `affiliate_in_play: true` in
  the frontmatter **and** place the disclosure block above the first
  affiliate link **before** publish of the change. Same PR, same
  build, same review.
- **Disclosure block accidentally removed by an edit:** treat as a
  policy incident; pull the piece offline, restore the block, log
  the incident, then republish.
- **Platform strike on an X mirror:** route through
  `docs/x-platform-risk.md` §10 escalation. The blog piece stays
  live; only the X mirror pauses.

## 6. What this workflow does **not** do

- Auto-publish on a schedule. The operator commits and approves the
  PR every time.
- Auto-cross-post to social. Every social post is operator-driven.
- Auto-add affiliate links. Affiliate links are added manually with
  the disclosure block.
- Push notifications, retargeting pixels, or any other ad-stack
  integration. Brand A at launch is reader → newsletter → returning
  reader, full stop.

## 7. Tier promotion (Tier 2 → Tier 3) — separate decision

The first Tier-3 candidate is Brand A. Promotion requires:

- 30 days of clean Tier 2 publishing.
- ≥3 cornerstone pieces shipped without correction.
- Cloudflare Access (or equivalent) in place for the
  "approve to publish" surface so a single click can't be intercepted.
- A decision-log entry naming the promotion date and the rollback
  trigger.

Tier 3 keeps the human in the loop — it just makes the click easier.
Tier 4 (autonomous publishing) is still frozen.
