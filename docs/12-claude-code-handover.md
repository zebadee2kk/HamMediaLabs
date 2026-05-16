# Claude Code Handover

## Purpose
Claude Code should use this repository as the operational blueprint for building HamMediaLabs.

## Initial implementation priorities
1. Validate documentation structure
2. Build folder skeleton
3. Build non-secret templates only
4. Build Playwright onboarding modules
5. Build account tracking templates
6. Build dashboard specs

## Safety rules
- Never store real credentials in repo
- Use templates only
- Respect governance tiers
- Avoid autonomous Tier 4 until explicitly approved

## Primary build modules
- signup_core
- signup_ai
- signup_cms
- signup_social
- dashboard
- analytics
- reporting

## Editorial pipelines

A working editorial pipeline exists for Brand A. Treat it as the reference
implementation when standing up Brand B and C pipelines later.

- `brands/brand-a-aiescape/README.md` — lifecycle (idea → brief → outline →
  draft → qa → staged → live → archived) and folder map.
- `brands/brand-a-aiescape/templates/_draft-template.md` — frontmatter
  shape + section order. Maps to the `content_asset` schema in
  `core/db/schema.sql`.
- `brands/brand-a-aiescape/prompts/` — Claude-ready prompts for outline,
  draft, headlines, and structured QA pass. Run via the router (`plan` slot
  for the long-context prompts, `fast` for headlines).
- `brands/brand-a-aiescape/qa/checklist.md` — the binding gate before any
  piece moves from `qa` to `staged`. Companion docs cover factuality and
  anti-hype.

Tier-4 autonomous publishing remains frozen for year 1. The pipeline ends
at `staged`; publishing is always operator-approved.
