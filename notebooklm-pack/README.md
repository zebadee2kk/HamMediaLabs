# NotebookLM Distilled Pack — HamMediaLabs / ProjectHydra

> A self-contained, founder-grade intelligence layer for the
> HamMediaLabs project. Designed for upload into NotebookLM (or
> any high-context onboarding context) without needing the full
> repo.
>
> **Snapshot date:** 2026-05-16.
> **Source of truth:** the repo itself. This pack distils it; it
> does not replace it. When this pack and the repo disagree, the
> repo wins. The freshness workflow in `.github/workflows/notebooklm-pack-freshness.yml`
> (issue #76) is what keeps drift from being silent.

---

## How to use this pack

1. **Upload the full `notebooklm-pack/` folder to NotebookLM** as a
   single notebook. Nine numbered Markdown files plus this README.
2. **Ask NotebookLM strategic + operational questions.** Worked
   examples below.
3. **For the deepest answers**, pair this pack with the docs it
   cites — but the pack alone is enough to grok the project.

## What you can ask

- "What is HamMediaLabs, in one paragraph?" → `00-executive-summary.md`
- "How does the system actually fit together?" → `01-system-architecture.md`
- "Which brand launches first and why?" → `02-brand-portfolio.md`
- "What's blocked, and by what?" → `03-governance-and-safety.md` + `07-current-status-and-next-actions.md`
- "What does day-of-launch look like for Brand A?" → `04-operations-and-launch.md`
- "Where does revenue come from?" → `05-cost-business-and-monetization.md`
- "Who does what — Claude / Codex / Gemini / human?" → `06-ai-workforce-and-tooling.md`
- "What's outstanding right now?" → `07-current-status-and-next-actions.md`
- "What does this term mean?" → `08-glossary.md`

## Pack contents

| File | What it covers |
|---|---|
| `00-executive-summary.md` | Founder-grade summary, why the project exists, strategic moat, current state, what must happen next |
| `01-system-architecture.md` | Repo layers, HQ control plane, brand sites, dashboard, launch packs, design handoffs, AI workforce, security model |
| `02-brand-portfolio.md` | Brand A / Brand B / Brand C, expansion gates, why A first, comparative differences |
| `03-governance-and-safety.md` | Human approval system, cost gates, compliance, security, launch blockers, monetisation blockers, Brand C safeguards, Gemini restrictions |
| `04-operations-and-launch.md` | Phase roadmap, launch pack logic, human-vs-AI split, launch readiness, pre/launch/post |
| `05-cost-business-and-monetization.md` | Cost model, free-first strategy, unit economics, profit pathways, monetisation philosophy, spend gates |
| `06-ai-workforce-and-tooling.md` | Claude / Codex / Gemini / local LLMs / NotebookLM / operator, role boundaries, workflow orchestration |
| `07-current-status-and-next-actions.md` | Complete / open / blocked, immediate priorities, deferred, branch hygiene, security sprint |
| `08-glossary.md` | Canonical project vocabulary |

## What this pack deliberately does NOT do

- It does **not** approve launches.
- It does **not** authorise spend.
- It does **not** override governance docs.
- It does **not** capture per-file engineering detail — that's the
  repo's job.
- It does **not** stay automatically up to date — that's #76's job.

## Quality bar

Founder briefing + operating manual + strategic summary in one
pack. If a passage reads like generic AI overview content, it's
broken and should be tightened.
