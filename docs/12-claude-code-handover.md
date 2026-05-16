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

Working pipelines exist for Brand A (longform / blog) and Brand B
(short-form / video satire). Brand A is the structural baseline; Brand B
layers satire-specific safety on top.

### Brand A (`brands/brand-a-aiescape/`)
- `README.md` — lifecycle (idea → brief → outline → draft → qa → staged → live → archived) + folder map.
- `templates/_draft-template.md` — frontmatter ↔ `content_asset` schema.
- `prompts/` — outline / draft / headlines / structured QA (router-slot aware).
- `qa/` — checklist + factuality + anti-hype + affiliate-disclosure.

### Brand B (`brands/brand-b-corpsatire/`)
- `README.md` — short-form lifecycle, meme-vs-article split,
  X/TikTok/Shorts suitability, satire boundaries, HR/workplace
  sensitivity controls.
- `templates/_draft-template.md` — beat-by-beat + script + caption +
  post body frontmatter.
- `prompts/` — outline / draft / caption candidates / **satire-safety**
  QA pass.
- `qa/checklist.md` — binding human gate with the **watch-aloud** step.
- `qa/satire-rules.md` — punch-up, anti-cringe, anti-edgelord rules.
- `qa/defamation.md` — legal-safety gate (no real people, no real
  companies beyond generic parody, no leaked-comms mimicry).
- `qa/affiliate-disclosure.md` — sponsorship-inbound-only posture.

### Brand C
Pipeline to be authored alongside the FCA-aware editorial workflow.
Brand A and Brand B are the templates to mirror.

Tier-4 autonomous publishing remains frozen for year 1. Every pipeline
ends at `staged`; publishing is always operator-approved.
