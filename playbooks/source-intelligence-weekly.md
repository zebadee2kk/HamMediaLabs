# Playbook — Source Intelligence Weekly Report

> Operator SOP. Runs as part of the lab-wide weekly review
> (`playbooks/weekly-review.md`). Aim: ≤30 minutes.
>
> Spec: `docs/source-intelligence-governance.md`.
> Data table: `source_signal` (`core/db/schema.sql`).

---

## 0. Cadence and inputs

- **Cadence:** weekly, Saturday morning, immediately after the lab
  weekly review.
- **Inputs:**
  - `source_signal` rows captured in the last 7 days.
  - Operator notes / manual entries.
  - Any current decision-log open items that touch source-intel.

## 1. Coverage check (5 min)

- [ ] Each active brand has ≥3 signals from at least 2 sources in the
      last 7 days. (If not: surface the gap in §5.)
- [ ] No source has fallen silent unexpectedly (`source × day` counts
      vs the trailing 4-week mean).
- [ ] Manual operator notes from the week have been entered into
      `source_signal` with `ingested_by = operator`.

## 2. Signal triage (15 min)

For each new signal grouped by brand:

- [ ] Confirm `risk_class` is set correctly (default `low`; flag
      `medium` / `high` if collection method or topic shifted).
- [ ] Mark signals worth promoting into a brief
      (`cornerstone-briefs.md` candidate or sidebar candidate) with a
      decision-log entry.
- [ ] Mark signals to discard with a reason in `notes` — keep the row
      for audit; do not delete.

Triage shapes signals into one of:

| Verdict | Next step |
|---|---|
| Promote to brief | Draft a brief; assign to the brand's pipeline |
| Hold | Re-evaluate at next weekly review |
| Discard | Add a one-line reason to `notes`; row stays |

## 3. Source quality check (5 min)

- [ ] Any source returning >50% discards two weeks running gets a
      §6 review per `source-intelligence-governance.md`.
- [ ] Any source returning new signal with `risk_class = 'high'`
      that doesn't justify the cost (no promotion to brief in two
      weeks) is paused.
- [ ] Quotas for paid sources (when they exist) within budget per
      `core/providers/quota-registry.ts`.

## 4. Compliance check (5 min)

- [ ] No signal stored breaches the "minimum useful signal" rule
      (no full post bodies; `raw_text_excerpt` ≤500 chars).
- [ ] No personal data accidentally captured.
- [ ] No signal that would breach platform ToS if used as a basis for
      a post (especially X — re-read `docs/x-platform-risk.md` §11 if
      uncertain).

## 5. Operator output

The weekly report ends with:

1. A short markdown digest emailed to the operator (n8n will own this
   once M6 lands; until then, the operator writes it).
2. New / promoted briefs filed in the relevant brand folder.
3. Any decision-log entries for paused sources or compliance flags.
4. A row in the recurring "Source intelligence weekly" calendar event
   linking to the digest.

## 6. Escalation

Trigger one of these → stop ingesting from the affected source, log a
decision-log entry, and revisit `source-intelligence-governance.md`:

- A platform's ToS changes around our collection method.
- A provider sends a notice / rate-limit / suspension.
- A signal contains data we should not have stored (PII, copyrighted
  full body, etc.). Purge the offending rows; record the purge.
- A risk_class assessment was wrong: e.g. a "low" source turns out to
  have been pulling from a flagged endpoint.

## 7. Out of scope

- Automated brief creation. Briefs are operator-authored from signals.
- Automated platform posting. This subsystem never writes to a platform.
- Anything not in `docs/source-intelligence-governance.md`'s approved
  collection methods (§3).
