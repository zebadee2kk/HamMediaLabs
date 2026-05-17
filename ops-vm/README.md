# Ops VM — HamMediaLabs Operator Workstation

> **The Ops VM is an operator workstation, not an autonomous
> production brain.** It centralises the operator's repo work,
> Claude Code / Codex sessions, deployment commands, and launch
> evidence — without expanding what the lab is allowed to do
> unattended.
>
> **Posture:** read-heavy, branch-only, PR-gated. Governance
> from `docs/03-governance.md`, `docs/09-security-and-secrets.md`,
> `docs/cost-control-and-free-tier-plan.md`, and the launch pack
> (`launch-packs/brand-a-mvp/`) is binding on this VM exactly
> as it is binding on the operator's personal machine.
>
> **Companion files in this folder:** `build-guide.md`,
> `security-baseline.md`, `secrets-policy.md`,
> `deployment-runbook.md`, `claude-code-operating-rules.md`,
> `launch-evidence-template.md`, `ops-vm-checklist.md`,
> `tooling-manifest.md`, `future-automation.md`,
> `recovery-and-backup.md`.

---

## What the Ops VM is

A dedicated, clean Linux VM (Ubuntu Server 24.04 LTS by default)
that the operator uses as the single central workstation for
HamMediaLabs work:

- Hosts the canonical local clone of the repo.
- Runs Claude Code / Codex sessions for HamMediaLabs.
- Runs `npm test`, Astro builds, and gitleaks before any PR.
- Executes Cloudflare Pages preview deployments via Wrangler.
- Holds the operator-side runbook for Brand A launch day.
- Captures launch evidence (commit SHAs, deployment IDs,
  screenshots) into per-launch folders that ship into the repo
  as scoped PRs (not auto-uploaded).
- Accessed over Tailscale + SSH key-only.

## Why it exists

The operator currently works across a personal machine plus a
laptop. That model has three problems for HamMediaLabs:

1. **Secrets sprawl** — provider keys end up in several
   keychains and shell histories.
2. **Environment drift** — Node / Wrangler / tsx / Playwright
   versions differ between machines; "works on my laptop"
   bugs leak into PRs.
3. **Audit gap** — there is no single machine whose `~/.zsh_history`
   and `~/.gitconfig` are the lab's audit trail. The Ops VM
   fixes that.

The VM is also a **bandwidth multiplier**: when the operator
steps out, a stand-in could SSH in and read the launch
checklist + run the same commands from the same workstation
state.

## What the VM is allowed to do

- Pull / fetch / branch from `origin`.
- Run typecheck, tests, builds, gitleaks.
- Open PRs through GitHub CLI or the GitHub MCP.
- Run Cloudflare Pages **preview** deployments via Wrangler.
- Run Claude Code / Codex sessions scoped to this repo.
- Generate and store launch-evidence artefacts in local
  `~/launch-evidence/<YYYY-MM-DD>/` folders.
- Hold the operator's Tailscale node identity.

## What the VM must never do

- **Publish autonomously.** Tier-4 publishing is frozen
  (`docs/03-governance.md`). The VM does not bypass that.
- **Change DNS** without operator approval.
- **Push directly to `main`.** One issue = one branch = one PR.
  Always.
- **Post to social media.** Manual cadence per
  `docs/x-platform-risk.md`.
- **Sign up for paid services.** Cost gate
  (`docs/cost-control-and-free-tier-plan.md` §5) is binding
  here exactly as elsewhere.
- **Rotate secrets without a documented incident.**
- **Merge PRs without CI green + operator review.**
- **Delete branches without operator command.** (Even when the
  MCP / git proxy permits it, the VM follows #56's pattern.)
- **Run Brand B or Brand C launches.** Those are gated behind
  Brand A's day-30 outcome (`docs/portfolio-expansion-gate.md`).
- **Run local LLM inference** unless `docs/local-llm-plan.md` is
  re-activated through a §5 cost gate.
- **Connect to HamNet** core services (the operator's
  consulting business stays strictly separate per
  `docs/legal-and-resilience.md`).

## How it fits into HamMediaLabs governance

| Layer | Binding doc | Ops VM behaviour |
|---|---|---|
| Governance tiers | `docs/03-governance.md` | T2 (operator-manual) only |
| Secrets | `docs/09-security-and-secrets.md` | Service-role key never logged; secrets in `~/.config/` env files, never in repo |
| Cost gates | `docs/cost-control-and-free-tier-plan.md` | The 5-step gate applies before any paid line; the VM itself sits inside that ceiling |
| Voice / publishing | `docs/voice-authenticity-system.md` | Operator runs voice-fidelity QA on the VM; the VM does not auto-publish |
| Compliance | `docs/legal-and-resilience.md` | The VM holds no client data |
| Dependencies | `docs/astro-security-upgrade-plan.md`, `docs/dependabot-security-audit.md` | No blind major bumps; staged migration only |
| PR workflow | `CONTRIBUTING.md` | Mirrored exactly |

## Relationship to Brand A launch

The Ops VM is the **recommended launch workstation** for Brand
A's day-of script (`launch-packs/brand-a-mvp/08-launch-day-script.md`).
Using it has three benefits over a personal machine:

- All launch evidence lands in the same `~/launch-evidence/`
  folder, ready to be PR'd into the repo's launch-pack folder.
- The VM's environment is the same one CI uses (Node 20, same
  TS, same Astro 4.x), so "builds clean locally" matches CI.
- The operator's personal machine stays out of the lab's
  secrets surface.

The launch checklist (`launch-packs/brand-a-mvp/01-human-operator-checklist.md`)
gains an optional "Ops VM workstation" branch — see that file's
updated §1.

## Relationship to the AI workforce

| Agent | Where it runs on the Ops VM | Boundary |
|---|---|---|
| **Claude Code** | Locally via the Claude Code CLI, scoped to `/home/richard/HamMediaLabs/` | Branch-only; one-issue-one-PR; never `--no-verify`; never push to `main`. See `claude-code-operating-rules.md`. |
| **Codex** | Triggered via `/ultrareview` from a PR — runs in cloud, not on the VM | User-triggered only; billed per call. The VM does not auto-trigger Codex. |
| **Gemini Free** | Operator opens Gemini in a browser; the VM only stores the design output as text in `design-handoffs/output/<brief>/<date>/` (gitignored) | Gemini still owns design only; governance docs are off-limits. |
| **Local LLMs** | **Not installed by default.** Activation requires `docs/local-llm-plan.md` re-activation + a §5 cost gate (GPU spend) + decision-log entry | The VM's specs do not include a GPU by default. |
| **NotebookLM** | Operator uploads `notebooklm-pack/` from the VM's local repo clone via a browser | NotebookLM never reaches the VM via API. |
| **The operator (human)** | SSH session over Tailscale | Final authority on every approval. |

## Relationship to deployment

The deployment flow is **unchanged** by the existence of the
Ops VM:

```
local build/test (on VM) → branch → PR → CI green → operator review → merge main → Cloudflare Pages deploy
```

The VM may run Cloudflare Pages **preview** deployments via
Wrangler for evidence purposes. **Production deploys still
happen via the merge-to-`main` + Cloudflare-Pages-on-push
pipeline**, not via a Wrangler push from the VM.

Detailed flow in `deployment-runbook.md`.

## What this folder is NOT

- **Not a CI replacement.** GitHub Actions stays the CI source
  of truth.
- **Not an n8n host.** n8n (if ever stood up) runs on a
  separate, cheaper VPS per the cost plan.
- **Not a production server.** Cloudflare Pages serves
  production traffic.
- **Not a Supabase replacement.** Supabase remains the HQ DB.
- **Not autonomous.** Every action that touches `main`,
  publishing, social, DNS, secrets, or paid lines remains
  operator-approved.

## Recommended next action

Walk `ops-vm-checklist.md` end-to-end as the build + acceptance
gate before any production use.

## Cross-references

- `docs/03-governance.md` — tiers (the VM does not move them).
- `docs/09-security-and-secrets.md` — secrets framework.
- `docs/cost-control-and-free-tier-plan.md` — paid-line gate.
- `docs/legal-and-resilience.md` — HamNet separation; entity
  posture.
- `launch-packs/brand-a-mvp/` — operator runbook the VM
  enables.
- `CONTRIBUTING.md` — PR workflow.
- `docs/15-decision-log.md` — strategic decision history.
