# 09 — Post-Launch Review Template

> Fixed templates for the day-1, day-3, week-1, and day-30 reviews.
> Operator fills these in; the output lands in `docs/15-decision-log.md`
> (the day-30 entry is canonical; the earlier entries can live in
> operator notes).

---

## Template — Day 1 (T +24h)

```
### Date: <ISO>
### Review: Brand A launch — 24h check.

### Numbers
- Cornerstone unique sessions (24h): <N>
- Newsletter signups (24h): <N>
- Newsletter open rate (launch issue): <%>
- Newsletter click rate (launch issue): <%>
- X launch tweet impressions: <N>
- X launch tweet engagement (replies + likes + reposts): <N>

### Qualitative
- Reader correspondence: <summary; full text in operator notes>
- Anything surprising: <one sentence>
- Anything concerning: <one sentence>

### Actions
- <action 1>
- <action 2>

### Next review
+72h.
```

---

## Template — Day 3 (T +72h)

```
### Date: <ISO>
### Review: Brand A launch — 72h check.

### Numbers
- Cornerstone unique sessions (72h): <N>
- Returning-visitor rate (proxy: % of sessions with prior visit): <%>
- Newsletter signups (cumulative): <N>
- Newsletter open rate (still tracking launch issue): <%>
- X launch thread total impressions: <N>

### Qualitative
- Reader correspondence: <summary>
- Anything surprising: <one sentence>
- Anything concerning: <one sentence>

### Actions
- <action 1>
- <action 2>

### Next review
+4 days (week-1 review).
```

---

## Template — Week 1 (T +7d)

Lives inside `playbooks/weekly-review-brand-a-launch.md` §1–§6.
Use that playbook for the per-section walk. Output entry:

```
### Date: <ISO>
### Review: Brand A launch — week 1.

### Did we publish what we said we would?
- Cornerstone 1: <live / date>
- Cornerstone 2 status: <on track for week 2 / slipped because…>

### Audience signals (cardinal numbers)
- Page views per piece (last 7 days): <…>
- Mean time on page on the cornerstone: <…>
- Newsletter subscribers gained (week 1): <…>
- Open rate (launch issue): <%>
- X cornerstone reply: impressions / engagements / replies: <…>

### Quality signals
- Reader replies received: <yes/no; substance>
- Returning visitor sessions: <yes/no>
- Organic backlinks: <yes/no>

### Voice signals
- Operator re-reads opening 200 words aloud — still landing?
- Any post-publish correction?
- Unused headline candidates captured for future iteration?

### Risk signals
- Platform strike: <no / details>
- Disclosure spot-check on cornerstone: <green / details>
- Provider quota anomaly: <green / details>

### Decisions (per piece)
- Amplify / Hold / Retire from rotation: <verdict>

### Next review
+7 days.
```

---

## Template — Day 30 (T +30d)

Lives inside `playbooks/weekly-review-brand-a-launch.md` §7.

```
### Date: <ISO>
### Review: Brand A launch — day 30 review.

### Did we ship cornerstones 1 / 2 / 3?
- C1: <live / date / pageviews>
- C2: <live / date / pageviews / OR slipped because…>
- C3: <live / date / pageviews / OR slipped because…>

### North-star (returning-visitor newsletter conversion rate)
- 30-day unique visitors: <N>
- 30-day newsletter signups: <N>
- Conversion rate: <%>
- Direction: up / flat / down vs last 30 days (proxy: split day-15 vs day-30 windows)

### Brand Score (per `core/scoring/scoring.ts`)
- Inputs: traffic_growth=<x>, engagement_quality=<x>, monetisation_potential=<x>, ops_burden=<x>, platform_risk=<x>
- Output: <score>
- Verdict (kill/hold/scale_candidate): <…>

### Tier-3 promotion check
- 30 days of clean T2 publishing? <yes/no>
- ≥3 cornerstones shipped without correction? <yes/no>
- Cloudflare Access surface in place? <yes/no>
- Rollback trigger named? <yes/no>

### Tier-3 decision
- Promote / Extend launch window 2 weeks / Stay at T2 / Other.

### Decisions (cumulative, last 30 days)
- <list of decision-log entries linked>

### Lessons (operator's own words)
- <one paragraph; what worked, what didn't, what we'd change>

### Next review
Brand A returns to the standing weekly review (per `playbooks/weekly-review.md`).
```

---

## How to use these templates

- Day-1 and day-3 entries can live in operator notes (off-repo) at MVP. They're operational, not strategic.
- Week-1 and day-30 entries land in `docs/15-decision-log.md`. The day-30 entry is canonical; future planning references it.
- After day 30, Brand A leaves the launch-window cadence and returns to the standing weekly review.

## Cross-references

- `playbooks/weekly-review-brand-a-launch.md` — the surrounding 30-day playbook.
- `playbooks/weekly-review.md` — the standing weekly review (resumes after day 30).
- `docs/measurement-framework.md` — north-star definitions.
- `docs/15-decision-log.md` — entry destination.
- `core/scoring/scoring.ts` — `brandScore` and `verdict` implementations.
