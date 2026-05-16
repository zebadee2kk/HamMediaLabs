# 02 — AI Agent Task List

> What AI may do on launch day. What it must not do. Prompt packs
> to use. Review gates that every AI output crosses before the
> operator acts on it.

---

## 1. Allowed AI tasks

### 1.1 Pre-launch (day -1 / morning of)

- Re-run `brands/brand-a-aiescape/prompts/04-qa-pass.md` against
  the staged cornerstone. Output: JSON QA report. The operator
  walks the report against `brands/brand-a-aiescape/qa/checklist.md`.
- Re-run `prompts/03-headlines.md` to produce 12 fresh caption
  candidates for the X / newsletter launch posts. Operator picks
  manually.
- Generate a draft newsletter announcement (≤200 words). Operator
  edits and sends manually.
- Lint the cornerstone body against `voice.md` §5 anti-voice list.
- Source / citation sanity check: for every `sources:` entry,
  confirm the URL still resolves (HTTP 200 spot-check).

### 1.2 During launch

- Generate launch-day social copy candidates (X primary, Reddit
  comment-style if and when the operator engages).
- Summarise reader correspondence as it arrives.
- Draft the day-1 entry in the operator's notes.

### 1.3 Post-launch (day +1 to day +7)

- Aggregate analytics into a daily summary draft.
- Draft the 72-hour and week-1 review entries.
- Surface anomalies (impressions spike / drop, unsubscribes,
  comment patterns) for the operator to interpret.

## 2. Forbidden AI tasks

- Publish, post, or send anything to any external surface.
- Hit "merge" on a PR.
- Create or modify a credential / API key.
- Touch any paid-service signup flow.
- Add an affiliate link.
- Synthesise a real person's voice, face, or signature.
- Produce a "recommendation" framing on a regulated product.
- Speak as the brand outside an editor-reviewed output.

## 3. Prompt packs to use

- Brand A QA — `brands/brand-a-aiescape/prompts/04-qa-pass.md`.
- Headlines — `brands/brand-a-aiescape/prompts/03-headlines.md`.
- Persona-first generation pattern — `prompt-library/persona-first-generation.md`
  for any new prose.
- Secure skeleton — `prompt-library/general-secure-skeleton.md`
  wraps every model call.

Every prompt run goes through the secure-skeleton wrapper. Brief /
data content sits inside the `DATA SECTION:` block to prevent
prompt injection.

## 4. Review gates

Every AI output crosses these before the operator acts on it:

| Gate | Check | Blocker? |
|---|---|---|
| Persona alignment | Output sounds like `voice.md` §1 character? | Yes |
| Anti-voice scan | None of `voice.md` §5 patterns present? | Yes |
| Specificity | At least one concrete number / name / date? | Yes |
| Disclosure presence | AI-use label / affiliate disclosure if applicable? | Yes |
| Compliance | No regulated-product recommendation? | Yes |
| Source integrity | Every claim has a primary source or marked composite? | Yes |
| Safety | No real-person synthesis / no defamation risk? | Yes |

If any gate fails, the operator either edits the output to pass or
discards it. **Never publish an AI output that hasn't passed every
gate.**

## 5. Required outputs before human review

For each AI task above, the model returns its output **plus** a
self-score (1–10) on:

- Persona fidelity.
- Anti-voice absence.
- Specificity.
- Brand-template compliance.

A self-score below 10/10 means rewrite, not ship. The model
re-attempts up to 3 times; failure on the 3rd attempt routes to
the operator for manual writing.

## 6. Local-LLM use (per `docs/local-llm-plan.md`)

Allowed for the launch window:

- Banned-phrase scan (fast).
- Headline candidate fan-out.
- Source-URL alive-check.
- Persona-critique pass on already-drafted prose.

Not allowed:

- Final QA pass on the cornerstone (cloud `plan` slot retained).
- Persona-first Stage 1 on the announcement newsletter (cloud
  retained — short-form announcement still benefits from
  frontier capability).

## 7. Telemetry

Every prompt run on launch day writes to `provider_event` and
`agent_task` via the telemetry writer in
`core/telemetry/supabase.ts`. The operator reviews
`v_provider_daily` at end-of-day to confirm:

- No unusual quota burn (free-tier limits respected).
- No 429-storm against any provider.
- No abnormal cost spike (£0 expected at MVP).

## 8. Cross-references

- `prompt-library/general-secure-skeleton.md` — wrap every call.
- `prompt-library/persona-first-generation.md` — persona-first pattern.
- `brands/brand-a-aiescape/prompts/` — Brand A prompts.
- `brands/brand-a-aiescape/voice.md` — voice anchor.
- `brands/brand-a-aiescape/qa/checklist.md` — QA gate the AI
  output feeds into.
- `docs/local-llm-plan.md` — local-LLM workload list.
- `core/telemetry/supabase.ts` — telemetry sink.
