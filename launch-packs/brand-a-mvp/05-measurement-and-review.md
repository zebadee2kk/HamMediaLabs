# 05 — Measurement & Review

> What to record on launch day. The 24h / 72h / 7d / 30d checks.
> Manual analytics fallback. Links to weekly review templates.
> Kill / hold / scale rules.

---

## 1. Launch-day capture

The operator captures (in the operator's notes; not the repo):

- Launch timestamp (ISO).
- Cornerstone URL.
- Final headline used.
- Final caption (used on the X launch post + the newsletter).
- 12 headline candidates (the ones not used; held for future
  iteration per `prompts/03-headlines.md`).
- A screenshot of the home page on the live URL.
- A screenshot of the cornerstone at scroll position 0.
- The decision-log entry SHA after it lands.

## 2. 24h check (launch day + 24h)

Time budget: ≤30 minutes.

- [ ] Cornerstone unique sessions (24h).
- [ ] Cornerstone unique sessions referrer breakdown (direct /
      search / newsletter / X / Reddit / other).
- [ ] Newsletter opt-in count (24h).
- [ ] X launch tweet impressions + replies count.
- [ ] Any reader correspondence (email / X reply / DM).
- [ ] Any infra blip (Cloudflare Pages errors, Plausible blips).
- [ ] Spot-check the live disclosure block still renders.

Record into HQ:

```sql
INSERT INTO content_event (asset_id, kind, value, meta)
VALUES (
  (SELECT id FROM content_asset WHERE url='/free-tier-ai-stack'),
  'impression',
  <24h_unique_sessions>,
  '{"window":"24h","source":"plausible","retrieved":"<ISO>"}'
);
```

Plus a `channel_event` row per channel that delivered traffic.

## 3. 72h check (launch day + 3d)

Time budget: ≤30 minutes.

- [ ] Repeat the 24h capture (now 72h).
- [ ] Returning-visitor rate (per `docs/measurement-framework.md`
      §2 — Brand A north-star is conversion-of-returning-readers).
- [ ] Newsletter open rate on the launch issue.
- [ ] Newsletter click rate on the launch issue.
- [ ] Any unsubscribes; investigate if rate >0.5% of the list.
- [ ] X launch tweet engagement-rate.
- [ ] Update HQ with new event rows.

## 4. Week-1 review (launch day + 7d)

Sits inside `playbooks/weekly-review-brand-a-launch.md` §2.

- Sessions, mean time on page, bounce.
- Newsletter open and click rates.
- X mirror impressions / engagements on the launch tweet's
  thread.
- Reader correspondence captured into the piece's frontmatter
  `notes:` (anonymised where applicable).
- Decision: amplify / hold / retire from rotation (per the
  weekly review playbook).

**Pieces are not killed in week 1.** A published piece stays
published unless it breaches disclosure or factuality.

## 5. Day-30 review

Sits inside `playbooks/weekly-review-brand-a-launch.md` §7.

- Three pieces shipped (cornerstones 1, 2, 3 per
  `first-three.md`)?
- Newsletter open / click rates trending in the right band
  (≥30% open; ≥3% click)?
- Returning-visitor rate ≥30%?
- Any policy incident in 30 days?
- Cloudflare Access surface in place for Tier-3 promotion?

The day-30 decision (T2 → T3 promotion, or extend the launch
window) is filed as a decision-log entry per the playbook.

## 6. Manual analytics fallback

If Plausible / Cloudflare Web Analytics is down during the launch
window:

- Use server-log proxies (Cloudflare Pages "Analytics" tab) for
  request counts.
- Note in the decision log that the analytics provider was down.
- Re-derive metrics once the provider is back.

If the operator's HQ Supabase is paused (per
`docs/PROJECTHYDRA-MASTER-PLAN.md` §5.2 — 7-day inactivity pause
mitigated by heartbeat):

- The heartbeat job should have prevented this; if it didn't,
  treat it as an incident, resume the project, then capture the
  delayed events.

## 7. Kill / hold / scale rules

Per `playbooks/kill-or-scale-review.md` and `core/scoring/scoring.ts`
`verdict()`:

- **Kill (Brand A):** Brand Score `<0.30` for 2 consecutive weeks
  after week 6 AND no monetisation in flight.
- **Hold:** mixed signal, low cost.
- **Scale:** Brand Score `≥0.55` AND ≥30 newsletter signups /
  week sustained for 4 weeks AND first £100 affiliate revenue.

**At launch (today), Brand A is `active`, not yet in any of those
states.** Kill / hold / scale don't apply until at least week 4 of
clean publishing.

## 8. Cross-references

- `docs/measurement-framework.md` — north-stars, attribution,
  channel maps.
- `playbooks/weekly-review-brand-a-launch.md` — 30-day weekly
  review supplement.
- `playbooks/kill-or-scale-review.md` — verdict rules.
- `core/scoring/scoring.ts` — `verdict()` implementation.
- `core/db/schema.sql` — telemetry tables (`content_event`,
  `channel_event`, `agent_task`, `provider_event`).
- `dashboards/app/` — the operator dashboard that surfaces these
  weekly.
