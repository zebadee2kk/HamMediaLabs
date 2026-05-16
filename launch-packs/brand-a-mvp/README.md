# Brand A MVP — Launch Pack

> Single-folder runbook bridging governance to first real launch.
> Free-first by default. Manual publish only. No autonomous posting.
> No paid services without `docs/cost-control-and-free-tier-plan.md` §5.

---

## Purpose

This pack is what the operator runs **once**, on launch day, to take
Brand A from "ready" to "live". It consolidates the rules already in
the governance docs — it does not introduce new rules.

If anything in this pack conflicts with a governance doc, **the
governance doc wins.**

## Launch mode

- **Private / manual MVP first.** Site is publicly resolvable but
  not advertised. First piece is published manually. Distribution
  is opt-in only (newsletter → operator's own X / Reddit
  presence, comment-first).
- **Public launch only after** Brand A passes its day-30
  post-launch review (`playbooks/weekly-review-brand-a-launch.md`)
  AND the cost gates in `docs/cost-control-and-free-tier-plan.md`
  §5 approve any required paid line.

## Order of operations

1. `00-launch-overview.md` — what is and isn't launching today.
2. `01-human-operator-checklist.md` — every human-only step.
3. `02-ai-agent-task-list.md` — what AI may and may not do here.
4. `03-content-launch-pack.md` — the first piece, prepared.
5. `04-technical-launch-pack.md` — site build + deploy steps.
6. `05-measurement-and-review.md` — what to record and when.
7. `06-distribution-plan.md` — allowed distribution surfaces.
8. `07-risk-and-rollback.md` — when to roll back and how.
9. `08-launch-day-script.md` — the hour-by-hour script.
10. `09-post-launch-review-template.md` — day-1 / day-3 / week-1
    / day-30 review structure.

## Human vs AI responsibility split (binding)

### Human only

- Final publish approval (Tier 2 manual posting).
- Account creation / login / MFA.
- Any paid-service decision.
- Public social posting on any platform.
- Legal / compliance judgement calls.
- Brand voice final approval (read-aloud gate).
- Pulling content after an incident.
- Reading and replying to reader correspondence.

### AI assisted

- Checklist preparation and reminders.
- Draft QA pre-pass (run the brand's `prompts/04-qa-pass.md`).
- Source / citation sanity checks (via prompts).
- Voice linting against `voice.md` §5 anti-voice list.
- Build / runbook generation (this pack is partly AI-drafted; the
  operator approves before relying on any step).
- Measurement summary drafts.
- Post-launch review summaries.

### Forbidden (any agent)

- Autonomous publishing.
- Autonomous social posting.
- Paid tool signup.
- Affiliate link insertion.
- Financial advice.
- Real-person impersonation.

## Go / no-go summary

The launch is **go** only when every box in
`brands/brand-a-aiescape/launch-checklist.md` is ticked AND the
script in `08-launch-day-script.md` completes without a blocker.

A single unchecked item is a **no-go**.

## Cross-references

- `brands/brand-a-aiescape/launch-checklist.md` — the binding
  go/no-go.
- `brands/brand-a-aiescape/publish-workflow.md` — the Tier-2
  publish flow.
- `brands/brand-a-aiescape/first-three.md` — first-three plan.
- `docs/cost-control-and-free-tier-plan.md` — paid-line gates.
- `docs/measurement-framework.md` — what we measure.
- `docs/x-platform-risk.md` — X distribution rules.
- `playbooks/weekly-review-brand-a-launch.md` — 30-day supplement.
- `playbooks/voice-fidelity-checklist.md` — voice gate.
- `playbooks/incident-credential.md` / `playbooks/platform-strike-response.md`
  — incident SOPs.
