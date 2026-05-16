# Weekly Review — Brand A Launch Window

> Supplement to `playbooks/weekly-review.md` for the **first 30 days**
> after Brand A's launch day. Replaces the relevant per-brand sections
> of the standing weekly review for this window only. ≤45 minutes.

---

## 0. Inputs

- Brand A content events from the last 7 days
  (`content_event`, `channel_event`).
- Provider events (`provider_event`) for any router calls that touched
  Brand A work this week.
- Newsletter open/click numbers.
- Any reader emails or X replies.

## 1. Did we publish what we said we would?

- [ ] First-three plan in `brands/brand-a-aiescape/first-three.md`
      still on schedule, or a decision-log entry exists explaining a
      swap.
- [ ] Every published piece passed both the QA checklist and the
      voice-fidelity playbook (no "we'll come back to that" approvals).
- [ ] All published pieces still carry the AI-use disclosure on the
      live URL (spot-check 1 piece).

## 2. Audience signals (cardinal numbers, not vibes)

- Page views per piece, last 7 days.
- Mean time on page (≥60 s on a longform piece is the floor).
- Newsletter subscribers gained.
- Newsletter open rate (≥30% is the launch-window expectation;
  ≥40% on a small list).
- X mirror impressions / engagements per launch tweet.

Record into HQ:

```sql
INSERT INTO content_event (asset_id, kind, value, meta) VALUES …
INSERT INTO channel_event (brand_id, channel, kind, value, meta) VALUES …
```

## 3. Quality signals (no proxy-for-vanity)

- [ ] Did the operator receive any reader replies (newsletter or
      otherwise)? Capture verbatim into the piece's frontmatter
      `notes:` for editorial memory.
- [ ] Did any returning visitor session occur (the second-visit
      number matters more than first-visit volume for a new brand)?
- [ ] Did any piece get organic links from a non-trivial source?

## 4. Voice signals

- [ ] Operator re-reads the first 200 words of last week's piece
      aloud. Still sounds like the persona? Any drift?
- [ ] Any piece needed a correction post-publish?
- [ ] Are the unused headline candidates being captured in `notes:`
      for future iteration?

## 5. Risk signals

- [ ] Any platform strike / policy notice on the X mirror? (Routes
      to `docs/x-platform-risk.md` §10.)
- [ ] Any disclosure spot-check failures? (Per
      `playbooks/weekly-review.md` "X platform health" — applies to
      the blog footer disclosure too: open one live page and confirm
      the footer block renders.)
- [ ] Any provider-quota burn that suggests a runaway loop?
      (`v_provider_daily` view; spike rate-limits column.)

## 6. Decisions (the only point of this review)

For each piece in the first 30 days, decide:

| Verdict | Action |
|---|---|
| **Amplify** | Add to the operator's manual outreach list (newsletter shout-outs, relevant subreddit comment-first engagement, X follow-up reply later in the week). No paid amplification. |
| **Hold** | Continue tracking; next decision at +7 days. |
| **Retire from rotation** | Stop linking to from new pieces; the post stays live. Used when a piece is fine but doesn't earn rotation effort. |

Pieces are **not** killed in the first 30 days. Killing a piece is
a separate decision in the broader brand-kill review, not a per-piece
weekly call.

## 7. Tier-3 promotion check (at day 30)

At the end of week 4, the operator checks the Tier-3 promotion
criteria from `brands/brand-a-aiescape/publish-workflow.md` §7:

- 30 days of clean Tier 2 publishing?
- ≥3 cornerstones shipped without correction?
- Cloudflare Access surface in place?
- Rollback trigger named?

If all yes: file a decision-log entry promoting Brand A to Tier 3.
Otherwise: extend the launch window by 2 weeks and re-evaluate.

## 8. Reset to standing weekly review at day 30

After the day-30 decision-log entry, Brand A returns to the standing
`playbooks/weekly-review.md` cadence. This launch-window supplement
stops running. Brand B and Brand C launches use their own equivalent
supplements (to be authored when those brands stand up).

## 9. Out of scope (during launch window)

- Paid ads.
- Affiliate links (until quality + trust pass the day-30 review).
- A second brand launch.
- Engaging political / culture-war news cycles (per
  `docs/x-platform-risk.md` §8.3).
