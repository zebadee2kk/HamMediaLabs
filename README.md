# HamMediaLabs

HamMediaLabs is an independent autonomous media lab project.

## Purpose
Build, test, govern, and scale a reusable AI-powered digital brand factory capable of launching multiple lightweight media properties, monitoring them objectively, and scaling only validated winners.

## Strategic model
HamMediaLabs is not a single website.

It is:

**Infrastructure → Automation → Experimentation → Analytics → Monetization**

## Core principles
- Separate from HamNet, consulting, and client systems
- Documentation-first
- Free-first, ROI-led
- Human approval at trust gates
- Security by default
- Scale only validated winners
- Avoid spam, misinformation, and black-hat practices

## Primary mission
Create a system that can:
1. Build brands quickly
2. Launch experiments cheaply
3. Measure performance accurately
4. Kill failures fast
5. Scale profitable properties

## Documentation structure
See `/docs` for the full planning and operational framework.

The canonical, integrated strategy is `docs/PROJECTHYDRA-MASTER-PLAN.md`. The numbered `docs/00–16` files remain as concise topic stubs; where they conflict with the master plan, the master plan wins.

## Repository layout
```
docs/        Strategy, governance, KPIs, disclosure templates, style guide,
             financial model, competitive research, decision log.
playbooks/   Weekly review, content QA, kill-or-scale, incident, provider re-validation.
brands/      Per-brand profile + voice + cornerstone briefs, plus an Astro site template.
providers/   Provider registry, comparison matrix, quota tracker.
automation/  Claude Code prompts, Playwright signup modules, n8n workflow exports.
core/        HQ engineering — LLM router (TS), scoring engine (TS), Supabase schema, jobs.
.github/     CI: typecheck, tests, gitleaks; scheduled Supabase heartbeat.
vault-template/  Markdown templates for account & API-key registries (no secrets).
```

## Quick start (engineering)
```bash
npm install          # installs typescript + @types/node
npm run typecheck    # validates core/* compiles
npm test             # runs router + scoring unit tests
```

## Current status
Planning and architecture phase only.

No production accounts, deployments, or automations should be considered live until governance gates are completed.
