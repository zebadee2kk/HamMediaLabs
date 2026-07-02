# Weekly Review Playbook

## Portfolio review
- Active brands
- New launches
- Killed brands
- Cost changes
- Revenue changes

## Brand review
Per brand:
- Traffic
- Engagement
- Conversion
- Content output
- Social growth
- Risk

## Creative quality (per `v_qa_weekly` / dashboard "Voice QA" table)
- Human QA pass-rate per brand (trigger: <80% for any brand — risk register #6)
- AI-tells-flagged trend per brand (rising = voice drift; feed the next
  `playbooks/voice-refresh.md` cycle early)
- Any asset sitting in `qa` status for >7 days (dashboard content-pipeline
  table — stale QA is a silent kill of cadence)
- Any gate walked but not logged as a `qa_event` row (unrecorded gates
  make the pass-rate a lie — see voice-fidelity checklist §9)

## Agent review
- Output quality
- Failure rate
- Human intervention frequency

## Experiment status (per `docs/measurement-framework.md` §5)
- One open experiment per brand at most
- Pre-registered success / failure thresholds still valid?
- Rollback trigger reviewed
- See `playbooks/weekly-experiment.md` for the template

## X platform health (per `docs/x-platform-risk.md`)
- Manual shadowban check on every active X account
- Mean impressions WoW delta (>40% drop is an escalation trigger — see §10)
- Cadence ceiling compliance per brand (§7)
- Disclosure compliance spot-check on the last 5 commercial posts (§5)

## Cost gates (per `docs/cost-control-and-free-tier-plan.md`)
- Any paid line approaching its ceiling?
- Any free-tier headroom <30%? (Gemini RPD / Groq TPM / OpenRouter RPD / Supabase DB / CF Pages builds / newsletter subs)
- Any new paid line proposed this week → walk the §5 approval gate first

## Decisions
- Kill
- Hold
- Scale
- Investigate
