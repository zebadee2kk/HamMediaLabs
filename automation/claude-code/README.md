# Claude Code Implementation Guide

## Purpose
This folder defines how Claude Code should safely build HamMediaLabs.

## Operating rules
- Read documentation before coding.
- Never commit live secrets.
- Use templates for credentials and accounts.
- Keep automation human-gated until explicitly promoted.
- Prefer small, reviewable commits.
- Maintain the decision log when architecture choices change.

## First build objectives
1. Validate repository structure.
2. Add missing placeholder directories where needed.
3. Create typed configuration schemas.
4. Build provider registry scaffolding.
5. Build brand registry scaffolding.
6. Build local dashboard prototype.
7. Build Playwright onboarding harness with manual pause gates.

## Suggested module structure
```text
automation/claude-code/
  prompts/
  briefs/
  implementation-notes/
  safety-checklists/
```

## Non-negotiables
- No raw passwords.
- No raw API keys.
- No automated platform abuse.
- No autonomous publishing until governance approval.
