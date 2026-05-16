# 08 — Launch Day Script

> Step-by-step. Operator-driven. Approximate timings; the script
> is bounded by reality, not a wall clock.

---

## T -1 day (the day before)

| When | What | Who |
|---|---|---|
| Morning | Final read-through of the cornerstone on staging URL | Human |
| Morning | Walk `brands/brand-a-aiescape/qa/checklist.md` end to end | Human |
| Morning | Walk `playbooks/voice-fidelity-checklist.md` (read-aloud) | Human |
| Afternoon | Re-run AI QA pass (`prompts/04-qa-pass.md`); address any flags | Human + AI |
| Afternoon | Draft newsletter announcement (~180 words) | Human + AI |
| Afternoon | Draft X launch tweet + first reply | Human + AI |
| Afternoon | Pick a launch hour (not a Friday; mid-morning brand-local) | Human |
| Evening | Set `status: staged` on the cornerstone; set `reviewed_at` | Human |
| Evening | Sleep ≥7 hours. Genuinely | Human |

If anything is unfinished, reschedule launch.

## T 0 — Launch hour

### 09:00 (or chosen hour) — Final go/no-go

- [ ] `brands/brand-a-aiescape/launch-checklist.md` every box ticked.
- [ ] Cornerstone reads fine on the staging URL (≤2 paragraphs
      sampled aloud).
- [ ] Operator slept enough, fed enough, not ill.
- [ ] No active incident on Cloudflare, GitHub, Plausible,
      Buttondown.
- [ ] No active incident on the operator's network.

If any is "no" — **stop**. Reschedule.

### 09:15 — Publish

1. In the brand-site repo: `git mv` the cornerstone from
   `drafts/` to `posts/`.
2. Open PR.
3. CI green.
4. Merge.
5. Cloudflare Pages auto-deploys (~60–90 seconds).
6. Open the live URL of the cornerstone.
7. Verify disclosure block above the byline.
8. Verify footer disclosure block.
9. Verify `/ai-use`, `/affiliate-disclosure`, `/privacy`, `/terms`,
   `/contact`, `/about` all resolve.
10. Sample paragraph aloud one final time.

### 09:30 — Status flip in HQ

```sql
UPDATE content_asset
   SET status='live',
       publish_date=CURRENT_DATE
 WHERE url='/free-tier-ai-stack';

UPDATE brand SET status='active'
 WHERE slug='aiescape';
```

### 10:00 — Newsletter send

1. Open the prepared draft in Buttondown.
2. Send a test to operator's personal email; verify rendering.
3. Send to the list.
4. Monitor Buttondown's bounce/complaint stats for the first 30
   minutes.

### 11:00 — X launch

1. Operator's persona account → compose tweet body (plain
   language, no URL).
2. Post.
3. Immediately reply to it from the same account with the
   cornerstone URL.
4. Pin the launch tweet on the profile.

### 11:30 — Decision-log entry

```
### Date: YYYY-MM-DD
### Decision:
Launch Brand A — AI Escape.

### Reasoning:
First cornerstone (`/free-tier-ai-stack`) live; newsletter
announcement sent; X launch tweet posted; brand.status flipped to
'active'.

### Alternatives considered:
(N/A — execution of the prior decision to launch.)

### Risks:
Listed in 07-risk-and-rollback.md.

### Revisit date:
+24 hours (24h check); +7 days (week-1 review).
```

### 12:00 — Lunch / breath / reset

Genuinely. Step away from the screens. The piece doesn't need
you for the first hour.

### 14:00 — First check-in

- 24h check is tomorrow — today we just spot-check.
- Plausible: any sessions? From where?
- Newsletter: any opens? Click-through?
- X: any replies? Quality?

Capture rough numbers in the operator notes.

### 17:00 — Second check-in

- Any reader correspondence? Reply if substantive.
- Any infra blip? Investigate.
- Any policy / disclosure issue spotted by readers? Address per
  `07-risk-and-rollback.md`.

### Before sleep

- [ ] Final spot-check on the cornerstone URL — disclosure still
      renders.
- [ ] Operator notes capture the day's qualitative observations.
- [ ] Tomorrow's 24h check is on the calendar.

## T +24h — 24h check

Run `05-measurement-and-review.md` §2.

## T +72h — 72h check

Run `05-measurement-and-review.md` §3.

## T +7d — Week-1 review

Run `playbooks/weekly-review-brand-a-launch.md` end to end.

## T +30d — Day-30 review

Run `playbooks/weekly-review-brand-a-launch.md` §7. Decide on
Tier-2 → Tier-3 promotion candidacy.

---

## What this script deliberately does NOT do

- Time pressure beyond a launch *hour*. The script bounds the day,
  not the minute.
- Automation. Every step is human-confirmed.
- Outbound DMs or "engagement push" from friends.
- Paid amplification.
- Multi-brand parallel launches.
