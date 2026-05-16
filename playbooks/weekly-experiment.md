# Playbook — Weekly Experiment

> One experiment per brand at a time. Bounded duration, pre-registered
> success / failure thresholds, rollback trigger named. Slot inside
> the weekly review; never replaces it.
>
> Spec: `docs/measurement-framework.md` §5. Experiments **may not**
> touch cadence ceilings, disclosure copy, or link-placement policy —
> those are governance, not levers.

---

## 1. Pre-registration (filled before the experiment starts)

```
Brand:          aiescape | corpsatire | ukescape
Surface:        blog | x | tiktok | reels | shorts | reddit | newsletter
Date opened:    YYYY-MM-DD
Date capped:    YYYY-MM-DD   (≤14 days from opened)

Hypothesis:     <one falsifiable sentence>
Variable:       <the single thing being changed>
Constants:      <what is explicitly held constant — cadence, link
                 placement, disclosure, etc.>

Pre-registered success threshold:
  <metric> moves <by X%> over <time window> with no risk-signal
  regression.
Pre-registered failure threshold:
  <metric> moves <by Y%> in the wrong direction, OR
  <risk signal> trips, OR
  <complexity cost> exceeds <Z operator-hours>.

Rollback trigger:
  <explicit condition; e.g. "X mean impressions drop >30% over 2 weeks">
```

## 2. What kinds of experiment are allowed

- **Format experiments:** thread vs single tweet for a Brand A clip
  series; mid-piece TL;DR vs top-of-piece TL;DR; image-first vs
  text-first newsletter intro.
- **Time-of-day:** moving a Brand B clip from 09:30 to 19:30 local.
- **Topic-mix:** allocating two of Brand A's three weekly slots to a
  single sub-pillar.
- **Voice experiments:** trying a new house-example as a stylistic
  anchor for two weeks.

## 3. What kinds of experiment are **never** allowed

- Cadence-ceiling experiments. The ceilings in `docs/x-platform-risk.md`
  §7 are not levers.
- Disclosure experiments. AI-use and affiliate disclosure are policy,
  not A/B candidates.
- Link-placement experiments on X. `docs/x-platform-risk.md` §4 is
  binding.
- Persona-defamation tests (e.g. naming a real company "lightly").
- Anything that creates a platform-strike risk.

## 4. Running the experiment

- Operator notes the variable change in the relevant piece's
  frontmatter or in `notes` for an X post.
- Daily check during the experiment window: rollback trigger tripped?
- No second experiment opened on the same brand during this window.

## 5. Closing the experiment

At the cap date (or earlier on rollback):

1. Pull the metrics over the window.
2. Compare to the pre-registered thresholds.
3. Write the result in `docs/15-decision-log.md` with one of:
   - **Promote:** keep the change; update the relevant brand doc.
   - **Hold:** inconclusive; do not promote, do not roll back; record
     why and the date this expires.
   - **Roll back:** restore the prior state; record why.
4. If the experiment **promoted**, update the corresponding brand
   artefact (e.g. `brand-a/voice.md`, `brand-b/profile.md`, a prompt
   pack) in the same commit as the decision-log entry.

## 6. Anti-patterns this playbook prevents

- Endless experiments with no end date.
- "It feels better" promotion without a pre-registered metric.
- Stacking confounded variables.
- Rolling back silently and pretending the experiment never happened.
- Trying ten things at once across three brands.

## 7. Cross-references

- `docs/measurement-framework.md` — north-stars, leading/lagging,
  attribution, channel maps.
- `playbooks/weekly-review.md` — where the experiment status is
  reported each week.
- `docs/x-platform-risk.md` §8.4 — safe experimentation boundaries
  for X specifically (the strictest surface).
- `docs/15-decision-log.md` — where the result lands.
