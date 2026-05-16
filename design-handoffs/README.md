# Design Handoffs — Gemini / visual-build specialist layer

## Purpose
HamMediaLabs primarily uses Claude/Codex for governance, architecture, operations, QA, and repo execution.

Some tasks — especially visual website builds, front-end polish, landing pages, UI systems, and aesthetic design execution — may be better handled by Gemini or other design-strong model workflows.

This folder exists so Richard can hand off tightly-scoped design/build briefs to Gemini without losing governance, brand consistency, or repo structure.

---

# Core principle
## Gemini = design/build specialist
### Not strategic owner
### Not governance owner
### Not monetization owner
### Not compliance owner

Gemini should build within HamMediaLabs constraints, not redefine them.

---

# Approved Gemini use cases

## Good uses
- Brand A website UI build
- Astro theme implementation
- Landing page visual polish
- Homepage hero sections
- CSS / Tailwind refinement
- Conversion-oriented page layout
- Dashboard UI mockups
- Mobile responsiveness refinement
- Visual design systems
- Design asset generation briefs

## Avoid / restricted
- Legal pages
- Compliance systems
- Cost model decisions
- Brand voice governance
- SEO policy
- Monetization logic
- Autonomous publishing logic
- Security architecture
- Repo-wide strategic decisions

---

# Required workflow
## Step 1
Claude/Codex/HQ defines:
- Objective
- Constraints
- Brand voice
- Compliance boundaries
- Tech stack
- Deliverables

## Step 2
Gemini receives a focused handoff brief only.

## Step 3
Gemini outputs:
- Code
- Design
- Components
- Layouts
- UI assets

## Step 4
Claude/Codex/HQ reviews Gemini output for:
- Compliance
- Security
- Repo fit
- Brand consistency
- Performance

---

# Standard Gemini handoff template

Copy `/design-handoffs/gemini-master-template.md`

---

# Current likely Gemini targets
- Brand A MVP website
- Brand B satire site aesthetic
- HQ dashboard visual layer
- Brand landing pages
- Launch graphics
- Social media templates

---

# Non-negotiables
- Gemini does NOT decide launch criteria
- Gemini does NOT decide compliance
- Gemini does NOT decide monetization
- Gemini does NOT add trackers/third-party scripts without approval
- Gemini does NOT override Astro/version/security plans
- Gemini does NOT add paid tooling assumptions

---

# Final rule
Gemini is a specialist contractor.
HamMediaLabs HQ remains architect + governor.
