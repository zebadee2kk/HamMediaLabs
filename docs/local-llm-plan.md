# Local LLM Plan — role, routing, and cost-reduction

> Governance + planning doc. **Does not implement** anything. The next
> PR (router integration) lands the `local` router slot and provider
> class only after this plan is reviewed.
>
> **Owner:** Operator. **Re-review:** quarterly with the rest of the
> provider registry (`playbooks/provider-revalidation.md`).

---

## 1. Why local LLMs

Local models reduce dependency on free/paid cloud tiers for **cheap,
high-volume, low-stakes** workloads. They let the operator process
operator notes and platform-signal first-pass triage without sending
data to a third party. They do not replace cloud models for high-stakes
editorial, factuality, or regulator-adjacent reasoning.

Posture: **local-as-pre-processor, cloud-as-final-judgement.** Never
the other way around.

## 2. Capability matrix (good vs poor candidates today)

### 2.1 Good candidates for local LLMs

| Workload | Why local fits | Risk if mis-applied |
|---|---|---|
| First-pass classification of `source_signal` rows (signal_type, risk_class hint) | Cheap, parallel, no public data exposure | If the classifier silently mis-tags, dashboards lie — mitigated by a sample audit |
| Deduplication / clustering of similar signals | Embedding workloads run fine on a 16GB+ machine | Low; the cluster is operator-reviewed before triage |
| Cheap headline / title variation (Brand A `fast` slot) | Bulk generation is the use case | None if persona owner reads aloud |
| Tone / voice linting against `voice.md` anti-voice list | Local model checks each draft against a fixed list | None |
| Anti-slop / banned-phrase detection | Deterministic enough to run on a small model | None |
| Pre-pass QA before invoking the cloud QA pass | Saves cloud quota; cloud QA still mandatory | The local pass *adds* to QA, never *replaces* it |
| Summarising operator notes before cloud escalation | Keeps personal / lab-internal notes local | If the summary loses critical nuance, the cloud step still has the full notes available |
| Privacy-safe pre-processing of any operator content marked "stay local" | Hard requirement for certain notes / drafts | None |

### 2.2 Poor candidates today

| Workload | Why local fails today |
|---|---|
| Final long-form editorial judgement | Brand voice + nuance + topical accuracy benefit from a frontier model |
| Factuality checks requiring current web data | Local models cannot browse; staleness is fatal |
| Legal / compliance interpretation | Outdated training; we cite official sources via cloud + human |
| Brand C finance-sensitive copy approval | FCA-adjacent; cloud model + human only |
| High-stakes platform-policy decisions | Same as above |
| Anything requiring the newest model reasoning | Frontier capability is cloud-only |
| Tasks where staleness > 6 months is unacceptable | Most local models lag in training data |

These move to the "good" column only after explicit evaluation (§6
rubric) on the specific local model the operator runs.

## 3. Cost-saving workflow map (priority order)

The order below matches the highest cost-per-token cloud workloads we
already run; offloading them earns the biggest savings.

1. **`source_signal` first-pass triage** — local pre-classifier
   suggests `signal_type` and `risk_class`; operator confirms in the
   weekly review. Saves cloud spend on bulk classification.
2. **Brand A `fast` slot fan-out** — headlines, alt-text, social
   variants. Today routed to Groq's free tier; can run locally without
   touching free-tier quota at all.
3. **Pre-QA banned-phrase scan** — local model checks the draft body
   against the brand's `voice.md` §5 anti-voice list, returns a JSON
   report; cloud QA prompt (Brand A `prompts/04-qa-pass.md` /
   Brand B `prompts/04-qa-pass.md`) still runs.
4. **Persona-critique stage** (`prompt-library/persona-first-generation.md`
   Stage 2) for *short-form* drafts only — cheaper to iterate locally
   with the persona doc resident.
5. **Operator-note summarisation** — meeting notes, research notes,
   decision-log drafts. These stay on the operator machine.

The router's `plan` and `code` slots (long-context planning,
coding agents) remain cloud-only. Both benefit too much from frontier
capability to be moved.

## 4. Router integration proposal (deferred to follow-up PR)

### 4.1 Type change

Today's `ProviderId` union in `core/router/types.ts`:

```ts
export type ProviderId = 'gemini' | 'groq' | 'openrouter' | 'cloudflare_ai';
```

Proposed (when the integration PR ships):

```ts
export type ProviderId =
  | 'gemini' | 'groq' | 'openrouter' | 'cloudflare_ai'
  | 'local_lmstudio' | 'local_ollama';
```

Two distinct providers — not a single "local" — so the router can
prefer the runtime the operator's machine actually exposes.

### 4.2 Slot policy delta

Add `local` as a *slot preference modifier*, not a new slot. The
existing slot set (`plan` | `fast` | `code` | `edge`) is sufficient;
locals slot under `fast` for variations and a new `triage` slot only
if §3 workloads justify it.

Proposed default policy when locals exist:

| Slot | Primary | Fallback 1 | Fallback 2 |
|---|---|---|---|
| `plan` | Gemini 2.5 Pro | OpenRouter `:free` | Groq |
| `fast` | **local_lmstudio** (when available) | Groq | OpenRouter `:free` |
| `code` | OpenRouter (Qwen3-Coder) | Gemini Pro | Groq |
| `edge` | Cloudflare Workers AI | Groq | — |

If no local provider is reachable at runtime, the router falls back
seamlessly to the existing cloud chain.

### 4.3 Driver shape

Same `ProviderDriver` interface — locals expose OpenAI-compatible
endpoints (LM Studio `http://localhost:1234/v1`, Ollama
`http://localhost:11434/v1`). Reuse the OpenRouter driver shape with
a different base URL.

### 4.4 Strict-mode behaviour

The router's existing `strict` mode (`core/router/router.ts`) already
disables failover. For locals, we add a default behaviour: **never
strict on local**. If the local fails (process down, model unloaded,
machine asleep), we fail over to cloud. Operators who explicitly want
local-only set `strict: true` themselves.

### 4.5 What the integration PR does **not** do

- Add a `local` final-approval gate. Locals never approve content.
- Bypass the secure skeleton (`prompt-library/general-secure-skeleton.md`)
  — every call wraps user data identically to cloud calls.
- Surface local model output to platforms without the same disclosure
  obligations.
- Replace the cloud QA pass for any pipeline.

## 5. Telemetry naming convention

Existing telemetry table `provider_event` already accommodates locals:

| Field | Local convention |
|---|---|
| `provider` | `local_lmstudio` or `local_ollama` (snake_case) |
| `model` | the model id reported by the runtime (e.g. `llama-3.1-8b-instruct-q4_k_m`) |
| `latency_ms` | local request wall-clock |
| `cost_est` | `0.000000` (use the column; do not nullify) |
| `meta.runtime` | `{"version": "lmstudio-0.3.2"}` if useful |

This means dashboards (`dashboards/app/`) render locals alongside
cloud providers without schema changes. The `v_provider_daily` view
already groups by provider so locals appear as their own row.

`agent_task` rows for local-final invocations are still written — the
"persona owner human-approved" check is unaffected by which provider
ran the draft.

## 6. Evaluation rubric (cloud vs local — per task)

When considering a workload for local routing, score 1–5 on:

1. **Quality parity vs cloud** — sample 20 outputs from each on the
   same prompts. Score 5 if a blinded reviewer cannot tell them apart,
   1 if local outputs are obviously worse.
2. **Latency** — local typically beats cloud on small models; score 5
   if median latency is ≤50% of cloud, 1 if ≥150%.
3. **Failure rate** — uptime of the operator's local runtime. Score 5
   if local fails <1% over a 7-day window, 1 if ≥10%.
4. **Cost saving** — `0.000000 USD` is the upside; what does it
   displace? Score 5 if it displaces a paid tier we'd otherwise hit,
   3 if it displaces free-tier headroom (still useful), 1 if the
   workload is too small for the saving to matter.
5. **Privacy fit** — score 5 if the workload involves operator-private
   notes / unreviewed drafts; 1 if it would have been fine on cloud.
6. **Operational fragility** — score 5 if cloud fallback is robust and
   transparent; 1 if a local failure visibly breaks an operator
   workflow.

Mean ≥3.5 → move the workload to local. ≤2.5 → keep on cloud.

## 7. Hardware / runtime notes

These are the operator's machine constraints; the lab does not depend
on any specific spec.

- **LM Studio** — desktop UI; OpenAI-compatible server on
  `http://localhost:1234`. Easy to start/stop; manual model load.
- **Ollama** — daemon; OpenAI-compatible-ish endpoint on
  `http://localhost:11434`. Good for headless / scripted use.
- **Recommended floor for the workloads in §3:** 16 GB unified
  memory, a small instruction-tuned model (e.g. 3B–8B Q4 quant). The
  router's `fast` slot does not need a 70B model.
- **Power management** — local runtime cannot be on the critical path
  of any scheduled n8n workflow that runs while the operator is away
  from the machine. n8n / GH Actions schedules continue using cloud
  providers when the operator's machine is asleep; failover handles
  this automatically.
- **Disk hygiene** — model files are large; pin a list of "current"
  models per quarter, prune the rest. Track this in the operator's
  notes, not in the repo.

## 8. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Operator merges a workload to local that secretly required frontier reasoning | Medium | Medium | §6 rubric; sampling audit each quarter |
| Local model output drifts (model file replaced) without a record | Medium | Medium | Pin model id in `provider_event.model`; weekly review spot-checks |
| Local runtime down → workload silently slow / failed | High at any given moment | Low | Default failover to cloud; never strict on local |
| Local pre-pass leaks instructions into a public output | Low | Medium | Secure skeleton wraps every call identically to cloud |
| Operator forgets to start the local runtime → quota burn on cloud | High | Low | Quota tracker (`core/providers/quota-registry.ts`) catches the spike at the next quarterly check |
| Hardware sleep mid-job | High | Low | n8n schedules run cloud-only by default; operator-initiated workflows are interactive |

## 9. Decision-log entry (to file once this lands)

```
### Date: 2026-05-16
### Decision:
Adopt the local-LLM plan in docs/local-llm-plan.md. Locals are
pre-processors and reviewers, never final approvers. Router gains
`local_lmstudio` and `local_ollama` providers in a follow-up PR.

### Reasoning:
Reduces cloud spend on §3 high-volume / low-stakes workloads without
weakening quality, safety, or governance. Failover to cloud is
default-on; operator can opt into strict-local per call.

### Alternatives considered:
- A single "local" provider id (rejected; LM Studio and Ollama are
  different runtimes with different operator workflows — distinct
  ids keep telemetry honest).
- Add a separate "triage" slot (deferred — only if §3 workloads
  outgrow the existing `fast` slot).
- Replace cloud `plan` / `code` slots with locals (rejected; frontier
  capability beats privacy here).

### Risks:
Listed in §8. Mitigations are non-negotiable.

### Revisit date:
2026-08-16 (quarterly).
```

## 10. Cross-references

- `core/router/router.ts`, `core/router/types.ts` — surface the
  follow-up PR will edit.
- `core/router/index.ts` — `createHQRouter()` factory grows local
  driver registration in the follow-up PR.
- `core/providers/quota-registry.ts` — adds two `local_*` entries
  with `cost: 0` and `category: 'ai'` in the follow-up PR.
- `core/telemetry/supabase.ts` — no changes needed; existing writer
  already handles new provider ids.
- `docs/source-intelligence-governance.md` — local pre-pass slots in
  for `source_signal` triage (§2 row 1).
- `prompt-library/persona-first-generation.md` — local-fit notes
  for Stage 2 critique on short-form drafts.
- `dashboards/app/` — no changes needed; the existing
  `v_provider_daily` view renders local providers alongside cloud.

## 11. Out of scope (per #28)

- Immediate local-model API implementation.
- Hardware purchases.
- Replacing cloud routing entirely.
- A new "triage" slot (deferred behind §3 workload growth).
- Any local-final approval pathway.
