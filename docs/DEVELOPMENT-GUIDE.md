# Development Guide

This guide covers the day-to-day development workflow for HamMediaLabs / ProjectHydra. It assumes you've read [ONBOARDING.md](./ONBOARDING.md) and can build the project locally.

---

## Development Workflow

### The branch → PR → review → merge cycle

```
main (protected)
 │
 ├── git fetch origin
 ├── git switch -c feat/my-feature origin/main
 │
 ├── ... make changes ...
 ├── npm run typecheck    # catch type errors early
 ├── npm test             # catch logic errors early
 │
 ├── git add -A
 ├── git commit -m "Add my feature"
 ├── git push origin feat/my-feature
 │
 ├── Open PR on GitHub
 ├── CI runs: typecheck + test + gitleaks
 ├── Reviewer approves
 └── Merge to main
```

**Rules:**
- Direct commits to `main` are blocked by branch protection.
- Every change — even a one-file fix — goes through a PR.
- CI must be green before merge.
- Squash or rebase as appropriate; keep commits focused on the *why*.

### Branch naming conventions

| Prefix | Use case | Example |
|---|---|---|
| `feat/` | New capability | `feat/add-huggingface-provider` |
| `fix/` | Bug fix | `fix/router-429-retry-count` |
| `docs/` | Documentation only | `docs/update-onboarding` |
| `chore/` | Maintenance, CI, tooling | `chore/upgrade-ts-5.6` |
| `agent/` | Automated agent work | `agent/update-risk-register` |
| `claude/` | Claude Code sessions | `claude/add-provider-xyz-abc12` |

### Commit message format

```
Add HuggingFace provider to router fallback chain

HuggingFace Inference API is free-tier eligible and supports
the plan slot as a third fallback after OpenRouter :free.
See decision-log entry 2026-04-12.
```

- Imperative subject line ("Add", "Fix", "Tighten")
- Body wrapped at 72 characters
- Explain *why*, not *what*
- Reference decision-log entries when applicable

---

## Testing Strategy

### Unit tests (`core/`)

All core logic is tested with `tsx --test` (Node.js built-in test runner). Tests live alongside source files:

| Module | Test file | What it covers |
|---|---|---|
| LLM Router | `core/router/router.test.ts` | Primary success, rate-limit failover, strict mode, exhaustion |
| Scoring Engine | `core/scoring/scoring.test.ts` | Formula, verdict branches, normalisers |
| Scoring ↔ Dashboard | `core/scoring/sync-with-dashboard.test.ts` | Score sync logic |
| Telemetry | `core/telemetry/supabase.test.ts` | Event mapping, write-failure isolation, secret non-leak |
| Provider Quota | `core/providers/quota-registry.test.ts` | Quota registry validation |

**Run all tests:**
```bash
npm test
```

**Run a specific module:**
```bash
npm run test:scoring
npm run test:router
```

**Write a new test:** Create a `*.test.ts` file next to the source. Use `import { test, describe } from 'node:test'` with `assert` from `node:assert`. Keep tests pure — no network, no filesystem, no secrets.

### Integration / E2E tests (`automation/playwright/`)

Playwright tests cover signup runbooks for providers and platforms. These are **not** run in CI by default — they require live credentials and human-paused trust gates.

**Run locally:**
```bash
cd automation/playwright
npx playwright install
npx playwright test
```

**Key principle:** Every Playwright runbook pauses at trust gates (CAPTCHA, MFA, SMS, payment, identity). Nothing auto-bypasses these checks.

### What is NOT tested

- Dashboard rendering (validated via `npm run build` in CI, not unit tests)
- Brand site rendering (validated via `npm run build` in CI)
- n8n workflows (validated by running the workflows themselves)

---

## Type Checking and CI Pipeline

### TypeScript configuration

The root `tsconfig.json` enforces:
- `strict: true`
- `noImplicitAny: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

All code in `core/` must compile with these settings. The dashboard and brand sites have their own `tsconfig` files.

### CI pipeline (`.github/workflows/ci.yml`)

Three jobs run on every push to `main` and every PR:

| Job | What it does |
|---|---|
| `typecheck-and-test` | `npm install` → `npm run typecheck` → `npm test` |
| `astro-builds` | Builds dashboard, brand template, and Brand A site; verifies disclosure rendering; checks for secret-shaped strings in output |
| `gitleaks` | Scans entire commit history for secret patterns (Supabase JWT, OpenRouter `sk-or-`, Groq `gsk_`, Google AI `AIza…`) |

### Additional CI

- **Heartbeat** (`.github/workflows/heartbeat.yml`): Runs `npm run heartbeat` daily at 06:17 UTC to keep the Supabase project active.
- **Dependabot** (`.github/dependabot.yml`): Automated dependency updates.

### Pre-commit checklist

Before pushing, run:
```bash
npm run typecheck    # TypeScript compiles
npm test             # All unit tests pass
```

This mirrors exactly what CI runs. If it passes locally, it will pass in CI.

---

## How to Add a New Brand

### Step-by-step

1. **Create the brand directory:**
   ```
   brands/<brand-slug>/
   ├── profile.md          # Brand identity, audience, positioning
   ├── voice.md            # Tone, style, vocabulary guidelines
   ├── prompts/            # LLM prompts for content generation
   ├── templates/          # Content templates
   ├── cornerstone-briefs.md
   ├── qa/                 # Quality assurance checklists
   └── site/               # Astro site (if applicable)
   ```

2. **Use the templates:**
   - Brand profile: `brands/templates/brand-profile-template.md`
   - Voice: `brands/templates/voice-template.md`
   - House examples: `brands/templates/house-examples-template.md`

3. **Configure the site:**
   - Copy `brands/templates/site/` into `brands/<brand-slug>/site/`
   - Edit `src/site.config.ts` with brand-specific identity (name, tagline, niche)
   - Compliance pages (`/privacy`, `/terms`, `/ai-use`, `/affiliate-disclosure`, `/contact`, `/about`) are generated automatically

4. **Register the brand:**
   - Add an entry to `brands/brand-registry.md`
   - Add a row to the `brand` table in Supabase (via the dashboard or manually)

5. **Verify the build:**
   ```bash
   cd brands/<brand-slug>/site
   npm install
   npm run build
   ```

6. **Add a decision-log entry** in `docs/15-decision-log.md` documenting the rationale for the new brand.

### Brand directory naming

Use lowercase kebab-case: `brand-d-mybrand`, `brand-e-another`. The letter prefix (`brand-a-`, `brand-b-`, etc.) indicates the portfolio wave.

---

## How to Add a New Provider

### Step-by-step

1. **Research the provider:**
   - Document the provider in `providers/provider-comparison-matrix.md`
   - Note free-tier limits, rate limits, model availability, and ToS constraints

2. **Add provider types:**
   - Add the provider identifier to `core/providers/types.ts`
   - Add quota information to `core/providers/quota-registry.ts`
   - Add validation logic to `core/providers/validate.ts` if needed

3. **Implement the provider adapter:**
   - Add a new file under `core/router/providers/`
   - The adapter must conform to the `ProviderAdapter` interface (see existing adapters for the pattern)
   - Handle provider-specific error codes and map them to the router's standard error types

4. **Wire into the router:**
   - Import the adapter in `core/router/router.ts`
   - Add it to the appropriate slot's preference list in the router configuration
   - The router uses an ordered preference list per slot; the new provider typically goes as a fallback

5. **Update the CLI:**
   - If the provider has a quota that can be queried, add a command or flag to `core/cli/hml.ts`

6. **Run validation:**
   ```bash
   npm run typecheck
   npm test
   npm run hml -- provider-quota    # verify quota registry includes new provider
   ```

7. **Add a decision-log entry** in `docs/15-decision-log.md` documenting the rationale, alternatives considered, and risk assessment.

### Provider slot model

The router has four slots, each with an ordered preference list:

| Slot | Purpose | Current primary |
|---|---|---|
| `plan` | Complex reasoning, strategy | Gemini 2.5 Pro |
| `fast` | High-throughput, low-latency | Groq (Llama-3.1-8B) |
| `code` | Code generation | OpenRouter (Qwen3-Coder-480B) |
| `edge` | Lightweight, edge-deployed | Cloudflare Workers AI (deferred) |

A new provider should be added to the slot where it provides the best cost/quality ratio, typically as a fallback option.

---

## How to Run the Scoring Engine Locally

### Via the CLI

```bash
# Basic usage: score <brandScore> <monetisationPotential> <platformRisk>
npm run hml -- score 0.65 0.42 0.30

# With optional parameters
npm run hml -- score 0.65 0.42 0.30 4 true
# Parameters: brandScore monetisationPotential platformRisk consecutiveWeeksBelow030 monetisationInFlight
```

### As a library

```ts
import { brandScore, contentScore, verdict } from '../core/scoring/index.ts';

// Content scoring
const cScore = contentScore({
  originality: 0.8,
  readability: 0.7,
  engagement: 0.6,
  seo: 0.5,
});

// Brand scoring
const bScore = brandScore({
  contentScore: cScore,
  consistency: 0.75,
  growth: 0.6,
  diversification: 0.4,
});

// Verdict
const decision = verdict({
  brandScore: bScore,
  monetisationPotential: 0.42,
  platformRisk: 0.30,
  consecutiveWeeksBelow030: 4,
  monetisationInFlight: true,
});

console.log(decision); // 'kill' | 'hold' | 'scale_candidate'
```

### Scoring weights

Weights and thresholds are defined in `docs/PROJECTHYDRA-MASTER-PLAN.md` section 13.2. Changing them requires a decision-log entry. The scoring engine is pure functions — no I/O, no side effects — making it easy to test and reason about.

---

## Code Style

- **TypeScript:** Strict mode. `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` are all enabled.
- **Markdown:** See `docs/17-style-guide.md` for editorial standards.
- **No emoji** in code or commits unless explicitly requested.
- **File naming:** `kebab-case.ts` for modules, `kebab-case.test.ts` for tests.
- **Imports:** Use relative imports within modules, absolute imports across modules.
