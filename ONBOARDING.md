# Onboarding

Welcome to **HamMediaLabs** — also known as **ProjectHydra**. This document will get you from zero to productive in under 30 minutes.

---

## What is HamMediaLabs / ProjectHydra?

HamMediaLabs is an autonomous media operating system. Its mission is to build, launch, govern, and scale AI-powered digital media brands using a repeatable, data-driven factory model.

ProjectHydra is the internal codename for the HQ (headquarters) stack — the central control plane that orchestrates brand creation, content pipelines, analytics, and kill/scale decisions.

**Key principles:**
- **Documentation-first** — every decision is written down before it is implemented.
- **Free-first, ROI-led** — infrastructure starts free; spend is justified by validated results.
- **Human approval at trust gates** — CAPTCHAs, MFA, SMS verification, payments, and identity checks always pause for a human.
- **Security by default** — no secrets in the repo; gitleaks runs on every push.
- **Scale only validated winners** — brands that don't meet performance thresholds are killed fast.

**Current status:** Active development. Planning and architecture phase with initial brand pilots in progress. No production automations should be considered live until governance gates are explicitly cleared.

---

## Quick Start

### Prerequisites

- **Node.js** >= 20 (check with `node --version`)
- **npm** >= 10
- **Git**

### First-time setup

```bash
# 1. Clone the repository
git clone https://github.com/HamMediaLabs/HamMediaLabs.git
cd HamMediaLabs

# 2. Install dependencies (typescript + @types/node + tsx)
npm install

# 3. Type-check the core/ workspace
npm run typecheck

# 4. Run the test suite (router + scoring unit tests)
npm test

# 5. Explore the CLI
npm run hml -- help
```

That's it. You now have a type-checked, tested HQ workspace.

### Optional: Dashboard preview

```bash
cd dashboards/app
npm install
npm run build    # Astro build — validates the dashboard compiles
```

### Optional: Brand site preview

```bash
cd brands/templates/site
npm install
npm run build    # Astro build — validates the brand template compiles
```

---

## Repository Structure Walkthrough

```
HamMediaLabs/
├── docs/                  # Strategy, governance, and reference documents
│   ├── PROJECTHYDRA-MASTER-PLAN.md   # Canonical strategy (source of truth)
│   ├── 00-master-plan.md             # Master plan summary
│   ├── 01-roadmap.md                 # Delivery roadmap
│   ├── 03-governance.md              # Governance framework
│   ├── 09-security-and-secrets.md    # Credential tiers, secret handling
│   ├── 15-decision-log.md            # Every non-trivial choice, logged
│   ├── 16-glossary.md                # Shared terminology
│   ├── 17-style-guide.md             # Editorial standards for docs & content
│   └── ...                           # Additional topic-specific docs
│
├── core/                  # HQ engineering — TypeScript, tested
│   ├── router/            # LLM router (Gemini, Groq, OpenRouter failover)
│   ├── scoring/           # Brand scoring engine (kill / hold / scale verdicts)
│   ├── telemetry/         # Router telemetry bridge → Supabase
│   ├── providers/         # Provider types, quota registry, validation
│   ├── jobs/              # Heartbeat job (Supabase keep-alive)
│   ├── cli/               # `hml` CLI for operator tasks
│   └── db/                # Supabase schema (core/db/schema.sql)
│
├── brands/                # Per-brand content + site templates
│   ├── brand-a-aiescape/  # Brand A — AI Escape
│   ├── brand-b-corpsatire/# Brand B — Corporate Satire
│   ├── brand-c-ukescape/  # Brand C — UK Escape
│   ├── templates/         # Reusable brand profile, voice, and site templates
│   └── brand-registry.md  # Portfolio registry
│
├── automation/            # Automation layer
│   ├── playwright/        # Signup runbooks (human-paused at trust gates)
│   ├── n8n/               # n8n workflow exports (trend→brief, weekly review, heartbeat)
│   └── claude-code/        # Claude Code prompts for agent-driven development
│
├── dashboards/            # HQ dashboard (Astro, PostgREST, Cloudflare Access)
│   └── app/               # Astro site — portfolio view, brand table, provider health
│
├── providers/             # Provider research & comparison
│   ├── provider-comparison-matrix.md
│   ├── provider-registry-template.md
│   └── quota-tracker-template.md
│
├── playbooks/             # Operational playbooks (weekly review, incident response, etc.)
├── prompt-library/        # Reusable prompts for agents and operators
├── launch-packs/          # Brand launch checklists and runbooks
├── ops-vm/                # Ops VM deployment, security baseline, recovery
├── design-handoffs/       # Design specs for brands and dashboard
├── vault-template/        # Templates for account & API-key registries (no secrets)
├── notebooklm-pack/       # Executive briefing pack for NotebookLM ingestion
│
├── .github/               # CI/CD workflows
│   ├── workflows/
│   │   ├── ci.yml         # typecheck + test + gitleaks on every push/PR
│   │   ├── heartbeat.yml   # Daily Supabase keep-alive
│   │   └── dependabot.yml # Automated dependency updates
│   └── dependabot.yml
│
├── ARCHITECTURE.md        # One-page architecture reference
├── CONTRIBUTING.md        # How to contribute (branch, PR, commit style)
├── ONBOARDING.md         # This file
├── .gitleaks.toml         # Secret detection config
├── .env.example           # Allowed .env* file (no real secrets)
├── package.json           # Root package.json (scripts: typecheck, test, hml, heartbeat)
└── tsconfig.json          # TypeScript config (strict: noImplicitAny, noUnusedLocals)
```

### Key directories explained

| Directory | What it is | Who touches it |
|---|---|---|
| `core/` | TypeScript HQ engine — router, scoring, telemetry, CLI | Engineers |
| `brands/` | Per-brand identity, content, and Astro site | Operators, agents |
| `automation/` | Playwright signup runbooks + n8n workflows | Automation engineers |
| `dashboards/` | Astro dashboard querying Supabase via PostgREST | Frontend engineers |
| `docs/` | Strategy, governance, decisions, glossary | Everyone |
| `playbooks/` | Operational SOPs (weekly review, incidents) | Operators |
| `ops-vm/` | VM deployment, security baseline, recovery | DevOps |

---

## How to Contribute

### Branch naming

All work happens on feature branches. Never commit directly to `main`.

```
<prefix>/<short-description>
```

**Prefixes:**
- `feat/` — new feature or capability
- `fix/` — bug fix
- `docs/` — documentation changes
- `chore/` — maintenance, tooling, CI
- `agent/` — automated agent work (e.g., `agent/update-onboarding-docs`)
- `claude/` — Claude Code sessions (e.g., `claude/add-provider-xyz-abc12`)

### PR process

1. Branch from an up-to-date `main`:
   ```bash
   git fetch origin
   git switch -c <prefix>/<short-description> origin/main
   ```
2. Make changes in small, reviewable commits.
3. Push the branch and open a PR against `main`.
4. **CI must be green** before merge — `typecheck-and-test` and `gitleaks` both pass.
5. Squash or rebase as appropriate; keep commit messages focused on the *why*.

### Governance gates

- **Branch protection** on `main` requires: PR review, passing status checks, admin-only pushes.
- **Decision log** — every non-trivial choice gets an entry in `docs/15-decision-log.md`.
- **No autonomous publishing** — Tier 4 automation is frozen for year 1.
- **No secrets in repo** — templates only; real credentials live in 1Password / GitHub Actions secrets / Cloudflare env vars.

### Commit message style

- One-line subject in the imperative: `"Add X"`, `"Fix Y"`, `"Tighten Z"`.
- Wrap body at 72 chars; explain *why*, not *what*.
- Reference decision-log entries when applicable.

---

## Key Contacts and Resources

| Resource | Location |
|---|---|
| Canonical strategy | `docs/PROJECTHYDRA-MASTER-PLAN.md` |
| Architecture reference | `ARCHITECTURE.md` |
| Decision log | `docs/15-decision-log.md` |
| Glossary | `docs/16-glossary.md` |
| Style guide | `docs/17-style-guide.md` |
| Security & secrets | `docs/09-security-and-secrets.md` |
| Contributing guide | `CONTRIBUTING.md` |
| CI/CD | `.github/workflows/ci.yml` |
| Playbooks (SOPs) | `playbooks/` |
| Provider comparison | `providers/provider-comparison-matrix.md` |
| Brand registry | `brands/brand-registry.md` |
| Disclosure templates | `docs/18-disclosure-templates.md` |

---

## FAQ

**Q: Is this project live in production?**
A: Not yet. The project is in active development — planning and architecture phase with initial brand pilots. No production automations should be considered live until governance gates are explicitly cleared by the operator.

**Q: What does "ProjectHydra" mean?**
A: ProjectHydra is the internal codename for the HQ stack — the central operating system that orchestrates brand creation, content pipelines, analytics, and kill/scale decisions. "HamMediaLabs" is the public/project name.

**Q: How do I add a new LLM provider?**
A: See `docs/DEVELOPMENT-GUIDE.md` for the step-by-step process. At a high level: add the provider to `core/router/providers/`, update the quota registry, add a decision-log entry, and run `npm run typecheck && npm test`.

**Q: How do I add a new brand?**
A: See `docs/DEVELOPMENT-GUIDE.md`. At a high level: create a brand directory under `brands/`, use the templates in `brands/templates/`, configure `site.config.ts`, and register it in `brands/brand-registry.md`.

**Q: Where do secrets go?**
A: Real secrets never enter this repo. API keys and JWTs are vaulted in 1Password and surfaced to runtimes via GitHub Actions secrets (CI), Cloudflare env vars (HQ runtime), or local `.env` (gitignored). See `docs/09-security-and-secrets.md` for the full credential tier model.

**Q: What Node.js version is required?**
A: Node.js >= 20. The project uses TypeScript 5.5+ with strict settings and tsx for test execution.

**Q: How does the scoring engine work?**
A: The scoring engine (`core/scoring/`) is a set of pure functions that take brand metrics (content score, brand score, monetisation potential, platform risk) and produce a verdict: `kill`, `hold`, or `scale_candidate`. Weights and thresholds are defined in the master plan section 13.2. See `ARCHITECTURE.md` section 2 for details.

**Q: What's the difference between `core/` and `dashboards/`?**
A: `core/` is the TypeScript HQ engine (router, scoring, telemetry, CLI, schema). `dashboards/` is the Astro frontend that reads from Supabase via PostgREST and renders the operator dashboard. They are separate concerns — `core` has no UI, `dashboards` has no business logic.

**Q: Can I run the scoring engine locally?**
A: Yes. Use the CLI:
```bash
npm run hml -- score <brandScore> <monetisationPotential> <platformRisk> [consecutiveWeeksBelow030] [monetisationInFlight]
```
See `docs/DEVELOPMENT-GUIDE.md` for full examples.

**Q: How do I run tests?**
A: `npm test` runs all unit tests in `core/` (router tests + scoring tests). For a specific module: `npm run test:scoring` or `npm run test:router`.
