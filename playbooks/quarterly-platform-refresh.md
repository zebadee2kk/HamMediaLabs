# Playbook — Quarterly Platform Refresh

> Operator SOP that runs the cadence in
> `docs/platform-refresh-cadence.md`. ≤4 hours per quarter.
>
> Companion: `playbooks/provider-revalidation.md` runs the same
> quarter, separately, for LLM / hosting provider quotas.

---

## 0. When

- Q1: first business week of January.
- Q2: first business week of April.
- Q3: first business week of July.
- Q4: first business week of October.

Calendar reminders live in the operator's tooling (not in repo).

## 1. Inputs (gather before starting)

- Last quarter's decision-log entry titled "Q<N> <YYYY> platform refresh".
- The last 90 days of `provider_event` and `channel_event`
  (where they exist).
- A scratch doc to capture observations.
- The seven platforms listed in `docs/platform-refresh-cadence.md` §3.

## 2. Per-platform walk (≈25 minutes each)

For each of X / YouTube / TikTok+Reels / Reddit / Google search /
AI search / LLM-provider mechanics, walk:

1. **Read the platform's announcements** since the last refresh
   (developer blog, policy page).
2. **Read any relevant regulator update** since the last refresh.
3. **Spot-check our own brand accounts** for behaviour change.
4. **Check our documented assumptions** against current reality.
5. **Score the change**: trivial / noteworthy / material.

Trivial = log and move on. Noteworthy = log + plan to revisit
next quarter. Material = §3 below.

## 3. For each material change

A *material change* meets the threshold in
`docs/platform-refresh-cadence.md` §5.

- [ ] Open a scoped PR against the affected document family
      (`docs/x-platform-risk.md` / `docs/seo-moat-plan.md` /
      `docs/source-intelligence-governance.md` / brand voice or
      profile / quota registry).
- [ ] Update only the affected sections. Reference the source
      (platform announcement URL, regulator URL).
- [ ] Run CI green; merge after review.
- [ ] Link the PR in the quarterly decision-log entry.

## 4. Decision-log entry (one per quarter)

```
### Date: YYYY-MM-DD
### Decision:
Q<N> <YYYY> platform refresh complete.

### Reasoning:
Material changes this quarter:
- <platform>: <one-line summary; PR #N>
- <platform>: <one-line summary; PR #N>

Noteworthy observations (will revisit next refresh):
- <observation>

Brand impact:
- Brand A: <impact>
- Brand B: <impact>
- Brand C: <impact>

### Alternatives considered:
(None / list of changes we deliberately did NOT make and why.)

### Risks:
(Anything we now expect to fail in Q+1 if the trend continues.)

### Revisit date:
<+1 quarter>
```

## 5. Failure mode: "we missed something last quarter"

If the inputs in §1 reveal a documented assumption that was
materially wrong last quarter and we did not catch it:

- Add a `Root cause review` paragraph to the decision-log entry.
- Identify whether (a) the source was unavailable, (b) we
  misread the source, (c) we underestimated the impact, or (d)
  the threshold in §5 of the cadence doc is too high.
- Adjust if needed; document the adjustment.

## 6. What this playbook does NOT do

- It does not decide which brand to launch / kill — that's the
  weekly / monthly / kill-or-scale review.
- It does not procure paid platform-research services.
- It does not trigger automation. Every change ships as a PR.
- It does not chase trends. The threshold in §5 of
  `docs/platform-refresh-cadence.md` is binding.

## 7. Cross-references

- `docs/platform-refresh-cadence.md` — the strategy this playbook
  executes.
- `playbooks/provider-revalidation.md` — sibling cadence (same
  quarter, separate scope).
- `docs/15-decision-log.md` — where the entry lands.
- `docs/x-platform-risk.md` / `docs/seo-moat-plan.md` /
  `docs/source-intelligence-governance.md` — primary documents
  updated by this cadence.
