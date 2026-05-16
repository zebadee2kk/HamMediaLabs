# Design Handoffs — Gemini Briefs

> Copy/paste-ready Gemini briefs. Each `gemini-*.md` is a
> self-contained brief that the operator pastes into Gemini Free.
> Gemini returns design specs / mockups / Astro+Tailwind starter
> code; Claude/Codex/operator reviews against
> `gemini-output-review-checklist.md` before any output reaches
> the repo.
>
> **Gemini is a design/build specialist here.** It does not own
> strategy, governance, integration review, security, or
> compliance — those stay with the operator (with Claude / Codex
> assistance).

---

## What's in this folder

| Brief | What Gemini designs | When the operator uses it |
|---|---|---|
| `gemini-brand-a-mvp-site.md` | The AI Escape MVP website (homepage, article page, compliance pages) | Before #51 implementation |
| `gemini-hq-dashboard-ui.md` | The HQ dashboard's visual layer (cards / widgets / colour / typography) | Before #52 implementation |
| `gemini-brand-b-visual-system.md` | Brand B's deadpan corporate-theatre visual identity | Before Brand B video production starts in earnest |
| `gemini-brand-c-trust-ui.md` | Brand C's trust-first UK financial UI (charity-link block, FCA disclaimer, no urgency) | Before #51 if Brand C launches in parallel; otherwise after Brand A's day-30 review |
| `gemini-social-asset-templates.md` | Social card templates per brand (X / Instagram / LinkedIn / YouTube Shorts) | Once a brand has shipped at least one piece live |
| `gemini-output-review-checklist.md` | Claude/Codex/operator review checklist for any Gemini output | Every time |
| `claude-design-subagents.md` | Six pre-Gemini Claude subagent roles + workflow | Before sending any brief to Gemini |
| `claude-before-gemini-checklist.md` | Pre-flight checklist Claude must complete before any Gemini brief leaves the lab | Before sending any brief to Gemini |

## Pre-Gemini pipeline (binding)

```
Claude PM / Architect
  → Claude Design Subagents (UX / Visual / Brand / A11y / Compliance / Conv-Ethics)
    → claude-before-gemini-checklist.md (must be fully green)
      → Gemini Design Builder
        → gemini-output-review-checklist.md (14 sections)
          → Human approval
```

The six Claude subagents in `claude-design-subagents.md` tighten the brief
before it reaches Gemini, reducing Gemini drift and protecting brand /
compliance / accessibility constraints. The pre-flight checklist
(`claude-before-gemini-checklist.md`) is mandatory; a brief with any
unchecked box is a no-send.

## How to run a Gemini brief

1. **Open** the relevant `gemini-*.md` brief.
2. **Run the Claude pre-review** per `claude-design-subagents.md`:
   the six subagents critique and tighten the brief; the
   `claude-before-gemini-checklist.md` walks 10 pre-flight
   sections.
3. **Copy** the tightened brief into Gemini Free (any model — Pro for
   visual mockups, Flash for component-level work).
4. **Provide** the linked governance docs as supporting context
   when Gemini asks (`docs/voice-authenticity-system.md`,
   `docs/seo-moat-plan.md` §8 EEAT, brand-specific `voice.md`).
5. **Receive** Gemini's output: spec doc / Astro+Tailwind code /
   mockup descriptions.
6. **Review** against `gemini-output-review-checklist.md`. Do not
   commit anything unreviewed.
7. **Stage** approved output under `design-handoffs/output/<brief>/<date>/`
   (gitignored by default; only commit after a second pass).
8. **Merge** as a normal PR. CI green; gitleaks green; never
   touches the launch-pack rules.

## What Gemini is NOT allowed to do here

- Decide which brand to launch.
- Approve content.
- Touch governance docs.
- Add affiliate or sponsored references.
- Add third-party trackers, analytics scripts, or paid tooling.
- Change the Astro version pin (locked to 4.x per
  `docs/astro-security-upgrade-plan.md`).
- Introduce client-side islands (CVE exposure — see Astro upgrade
  plan §3).
- Override any disclosure rule from
  `docs/18-disclosure-templates.md`.
- Generate copy that breaks any brand's `voice.md` §5 anti-voice.

## Output staging

```
design-handoffs/
  README.md                          this file (index)
  gemini-*.md                        the briefs (committed)
  output/                            gitignored at MVP — Gemini outputs land
    <brief-slug>/
      <YYYY-MM-DD>/
        spec.md
        mockups/
        starter-code/
```

The `output/` folder is gitignored at MVP (large mockups, unreviewed
code). When the operator wants to land Gemini output into the
repo proper, it moves through the review checklist into the
appropriate folder (`brands/templates/site/` / `dashboards/app/`
/ `brands/brand-a-aiescape/site/`) as a normal scoped PR.

## Cross-references

- `docs/voice-authenticity-system.md` — voice anchor for every
  Gemini brief.
- `docs/seo-moat-plan.md` §8 — EEAT mechanics the design must
  preserve.
- `docs/18-disclosure-templates.md` — disclosure copy Gemini must
  not edit, only render.
- `docs/legal-and-resilience.md` §5 — disclosure & legal rules
  that bind the design.
- `docs/cost-control-and-free-tier-plan.md` — Gemini Free is free;
  it stays inside §1 stack.
- `prompt-library/general-secure-skeleton.md` — Gemini briefs wrap
  any operator-provided content in the secure skeleton's
  `DATA SECTION:` pattern.
- `launch-packs/brand-a-mvp/` — Brand A launch pack the
  `gemini-brand-a-mvp-site.md` brief feeds.
