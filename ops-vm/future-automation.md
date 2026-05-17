# Ops VM — Future Automation (Deferred)

> What the Ops VM **could** do later but **does not** do today.
>
> **Posture:** the VM stays an operator workstation, not an
> autonomous production brain. Every item below is gated.

---

## Why this file exists

The Ops VM is built to centralise operator work. The temptation
is to attach automation to it (cron-driven publishing, scheduled
deploys, auto-rebuilds). The temptation is wrong at MVP because:

- Tier-4 publishing is frozen for year one.
- Cost gate (§5 of `docs/cost-control-and-free-tier-plan.md`)
  binds even cheap automation if it introduces a paid line.
- Auditability is highest when every production-touching action
  is a PR or a documented manual step.

This file captures the candidate automations so the operator
does not re-invent the framing later, and so each one carries
the gates needed to evaluate it honestly.

## Candidate automations (each gated, none implemented)

### A. Scheduled local rebuild + smoke test

**What:** a `cron` job on the VM that pulls `origin/main`
nightly, runs `npm test` + all three Astro builds, and emails /
posts a digest if anything regresses.

**Why useful:** catches latent breakage between scheduled
operator weeks.

**Why deferred:**
- CI already runs the same checks on every push.
- Adds a maintenance surface (cron, mailer config).
- Mailer config means a third-party SMTP relay → potential
  paid line → §5 gate.

**Unfreeze:** revisit at Q3 quarterly refresh if the operator
ever misses a CI signal because they were offline.

### B. Wrangler preview deploy on branch push

**What:** a `cron` or webhook on the VM that runs
`wrangler pages deploy` on every branch push that includes
brand-site changes, so the operator gets a preview URL without
opening a PR.

**Why useful:** faster operator iteration.

**Why deferred:**
- Cloudflare Pages already does this automatically for branches
  pushed to GitHub (preview deploys for non-`main` branches).
- A duplicate path on the VM would be redundant and
  authentication-leaky (the VM's scoped token would be the
  third place the deployment is triggered from).

**Unfreeze:** never — Cloudflare Pages's branch-preview is the
right tool.

### C. Heartbeat for the operator's Tailscale identity

**What:** a `systemd` timer that records the VM's uptime +
Tailscale connectivity status and rotates the file weekly.

**Why useful:** confirms the VM is reachable when the operator
is travelling.

**Why deferred:**
- Tailscale's admin console already shows last-seen.
- Adds zero new safety; would be observability for
  observability's sake.

**Unfreeze:** never (Tailscale admin console suffices).

### D. Supabase backup pull

**What:** a daily `cron` job that pulls a Supabase snapshot
into the VM via the Supabase CLI.

**Why useful:** a local copy of HQ data is a recovery option.

**Why deferred:**
- Supabase free tier does not include automated backups, and
  pulling via the CLI requires the service-role key on the VM
  — Tier 1 violation in the default posture.
- The HQ database carries no PII; loss is recoverable via
  re-aggregating provider/agent events.

**Unfreeze:** revisit if HQ accumulates state that is not
re-derivable from logs (currently it does not).

### E. Auto-merge for green Dependabot patches

**What:** a workflow that auto-merges Dependabot **patch** PRs
when CI is green and the package is `dev-only` + not on the
public-facing build chain.

**Why useful:** reduces PR-triage time at quarterly refresh.

**Why deferred:**
- Auto-merge is **explicitly OFF** at repo level per
  `docs/dependabot-security-audit.md`.
- The lab's "no blind major bumps" rule extends to "no silent
  patches" until S2 lane discipline is proven across two
  quarterly cycles.

**Unfreeze:** revisit at the **second** quarterly platform
refresh after Brand A launch; requires a decision-log entry
and a §3.1 audit demonstrating zero patches caused a CI
regression in the prior quarter.

### F. NotebookLM auto-summarisation of merged PRs

**What:** a scheduled job that drafts NotebookLM pack updates
from merged PRs.

**Why useful:** keeps the pack fresh without manual updates.

**Why deferred:**
- #76 explicitly forbids this in the first cut of the
  freshness workflow: "Do not auto-commit changes to
  notebooklm-pack/. Do not call paid APIs. Do not call
  Gemini/Claude/OpenAI automatically. Do not rewrite founder-
  grade docs without human review."
- The pack is the founder briefing; AI rewrites are too easy
  to land subtly wrong copy.

**Unfreeze:** revisit if the freshness gate proves manual
updates are systematically late; decision-log entry required.

### G. Local LLM inference on the VM

**What:** install Ollama / llama.cpp / vLLM on the VM and run
local inference for QA / drafting.

**Why useful:** zero per-call cost; privacy for sensitive
content.

**Why deferred:**
- `docs/local-llm-plan.md` is the gating doc; activation
  requires a §5 cost gate (GPU spend) and a decision-log entry
  covering data posture.
- The default VM spec has no GPU; CPU-only inference is
  uneconomical for production-grade text.

**Unfreeze:** revisit at the start of Phase D (£1k serious;
`docs/profit-model.md`) when a paid GPU line clears the cost
gate.

### H. Playwright signup harness

**What:** activate the lab's existing Playwright signup
skeletons (`signup_core`, `signup_ai`, `signup_cms`,
`signup_social`) on the VM for partial-automation of account
provisioning.

**Why useful:** reduces operator hours on per-brand account
creation when a second brand is greenlit.

**Why deferred:**
- All signups are manual at MVP per the master plan.
- Modern signup flows have anti-bot detection; Playwright
  signup is fragile and an account-loss risk.

**Unfreeze:** revisit when a third or fourth brand is on
deck and the operator-hour cost of manual signup justifies
the fragility cost; requires a decision-log entry and
explicit "the Playwright module is allowed to do X but never
Y" boundaries.

## What never unfreezes

- **Autonomous publishing.** Tier 4 frozen, year one. No
  candidate above changes that.
- **Autonomous social posting.** Manual cadence binding.
- **Autonomous DNS changes.** Operator-only via Cloudflare
  dashboard.
- **Autonomous paid-line activation.** §5 gate binding.
- **Autonomous merge to `main` of strategic / brand /
  governance changes.** Operator review binding.

## How to propose unfreezing

1. Open an issue titled "Ops VM automation — <candidate>:
   propose activation".
2. Reference the relevant candidate (A–H) in this file.
3. Quote the §5 cost gate / decision-log requirement that
   needs satisfying.
4. Include the trigger condition that justifies activation.
5. Walk a PR through the lab's normal review.
6. If approved, this file is updated to record activation,
   and a decision-log entry is filed at the same time.

## Cross-references

- `docs/03-governance.md` — tier framework.
- `docs/cost-control-and-free-tier-plan.md` §5 — paid-line
  gate.
- `docs/local-llm-plan.md` — local LLM gating.
- `docs/dependabot-security-audit.md` — auto-merge posture.
- `.github/workflows/notebooklm-pack-freshness.yml` — pack
  freshness gate (no auto-generation).
- `docs/portfolio-expansion-gate.md` — Brand B / C gating.
- `docs/15-decision-log.md` — decision discipline.
