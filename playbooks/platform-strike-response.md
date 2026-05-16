# Playbook — Platform Strike / Ban Response

> SOP for any strike, policy notice, account lock, restricted-visibility
> flag, or shadowban indicator on any brand-owned account on any
> platform.
>
> Spec: `docs/legal-and-resilience.md` §9. X-specific escalation:
> `docs/x-platform-risk.md` §10 (lives under this SOP for X; this doc
> covers all platforms).

---

## 0. Triggers (any one starts this playbook)

- Platform notice email about a violation.
- Visible strike count on the account.
- Account temporarily locked / restricted / "under review".
- Account permanently banned.
- Shadowban indicator: mean impressions drop >40% WoW with unchanged
  content quality (`docs/x-platform-risk.md` §3.1 for X; analogous
  signals for other platforms).
- A platform's legal team contacts the operator directly.

## 1. STOP (within 30 minutes)

1. **Stop publishing** from the affected account. 7 days minimum;
   longer if the strike is severe.
2. **Stop publishing across the brand's other surfaces** until §2
   diagnosis is complete. If Brand B's TikTok takes a strike, the
   Reels mirror also pauses. (Avoids the algorithm associating the
   pattern with the brand on a sibling surface.)
3. **Preserve evidence:** screenshot the notice, the timestamped
   account state, and any cited policy URL. Vault these — do not
   commit to repo.
4. **Notify the operator's calendar / inbox:** the SOP is now
   running; schedule the §3 review within 24h.

If the trigger is a §0 legal-team contact, **also** go straight to
`docs/legal-and-resilience.md` §10 (paid-legal-advice triggers).

## 2. DIAGNOSE (within 24 hours)

Walk through the brand's QA artefacts in order. The strike was caused
by *something*; the goal here is finding what, not how to dispute.

For Brand A (longform / blog / X mirror):
- `qa/checklist.md` — was an item missed at publish?
- `qa/factuality.md` — is there a factual claim the platform deems
  misinformation?
- `qa/affiliate-disclosure.md` — is the affiliate disclosure correctly
  placed?
- `voice.md` §5 anti-voice — did a banned pattern slip through?

For Brand B (short-form / video / satire):
- `qa/satire-rules.md` — punch-direction violation? edgelord drift?
- `qa/defamation.md` — accidental real-entity reference?
- `qa/checklist.md` §9 — was the in-clip AI-assist disclosure visible
  in the first 3 seconds?

For Brand C (forthcoming):
- `docs/20-competitive-research.md` §3.3 — was the FCA 3-line check
  passed?
- Vulnerable-reader handling rule per `docs/legal-and-resilience.md` §7.

Platform-wide:
- `docs/x-platform-risk.md` (if X) §5 disclosure / §4 link policy /
  §3 standing controls.

Write the root-cause hypothesis in `docs/15-decision-log.md`:

```
### Date: YYYY-MM-DD
### Decision:
Diagnose platform strike on <brand> / <platform>.

### Reasoning:
Likely root cause: <one paragraph>.
Affected piece: <URL>.
Policy cited (if any): <URL>.

### Alternatives considered:
<other possible causes ruled out>

### Risks:
<what we'd need to change to prevent recurrence>

### Revisit date:
<+30 days>
```

## 3. DECIDE (within 48 hours)

Two-question decision tree:

### Q1. Was the strike legitimate (i.e. we actually broke policy)?

- **Yes →** do not appeal. Take the strike. The content stays down.
  Update the relevant brand artefact (voice / QA / disclosure) to
  prevent recurrence. Schedule the §4 cooling-off period.
- **No →** proceed to Q2.

### Q2. Is appealing worth the operator-time cost?

A strike on a small brand with no audience is often not worth a
fight; the platform won't engage. A strike on a larger brand or one
with measurable revenue may be worth one appeal.

- **Yes →** submit a **single** appeal. Plain language. Cite the
  evidence preserved in §1. Do not appeal twice; platforms read
  repeat appeals as harassment.
- **No →** absorb. Document the cost (lost reach / paused brand).

## 4. COOLING-OFF (7–14 days)

- No publishing from the affected account during this window.
- Sibling surfaces (mirror channels) resume on day 3 if the strike
  was account-specific, day 7 if the violation was content-pattern
  based.
- Operator does **not** delete other content reactively; resist the
  urge. Targeted removal is better than mass scrub.

## 5. SYSTEMIC FIX (within 14 days)

If a strike happened once, treat it as a sample of a class. Fix the
class.

- Update the brand's QA checklist if a check was missing.
- Update voice.md anti-voice if a pattern was missing.
- Update `docs/x-platform-risk.md` if the rate-limit / cadence /
  shadowban posture needs tightening.
- Update `docs/18-disclosure-templates.md` if a disclosure pattern
  failed.
- File the systemic fix as a separate PR with a decision-log entry.

## 6. RESUME (only when §1–§5 are complete)

- Resume from the canonical surface (brand site + newsletter) first.
- Resume on the affected platform with conservative cadence: half
  the brand's normal ceiling for the next 7 days.
- Monitor the §0 indicators daily for 14 days.

## 7. PERMANENT BAN PATH

If the strike escalates to a permanent ban:

- The brand's surface on that platform is **killed**. We do not
  attempt to create a replacement account on the same platform with
  the same brand identity (platforms detect and ban faster on the
  second try).
- Document the loss in `docs/15-decision-log.md`:
  - What we lost (followers, content URLs, conversation history).
  - Why (root cause).
  - What we changed (systemic fix).
- The brand's overall verdict goes through `playbooks/kill-or-scale-review.md`
  given the new posture.

## 8. INCIDENT REVIEW (within 30 days)

A 30-minute review with the operator (alone):

- Was the SOP followed?
- Did any step turn out to be impractical?
- Should this playbook be updated?
- Any process surface (CI, QA, prompts) that could have caught the
  cause earlier?

Outputs are PRs against the relevant docs.

## 9. Hard rules

- Never delete the affected account proactively. A locked account is
  still recoverable; a deleted account is not.
- Never create a "replacement" account on the same platform under
  the same brand identity.
- Never appeal twice on the same strike.
- Never re-publish identical content to the same platform from a
  different account.
- Never blame the platform publicly (X threads, blog posts) during
  the cooling-off period. Wait until the systemic fix is in.

## 10. Cross-references

- `docs/legal-and-resilience.md` — surrounding framework.
- `docs/x-platform-risk.md` — X-specific escalation (this SOP applies
  on top).
- `playbooks/incident-credential.md` — if the strike is paired with a
  credential incident.
- `playbooks/account-recovery.md` — if regaining account access is
  part of the path.
- `docs/15-decision-log.md` — every step from §2 onwards is logged.
- `playbooks/kill-or-scale-review.md` — invoked at §7 if the loss is
  permanent.
