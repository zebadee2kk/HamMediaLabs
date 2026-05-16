# Brand C — UK Financial Escape · editorial pipeline

This folder is the operating manual for Brand C. **Nothing in here
ships content on its own** — every gate is human-approved.
Brand A's pipeline is the structural baseline; FCA / ASA / vulnerable-
reader compliance gates layer on top.

**Brand C publishing is not authorised until this PR (and any follow-
ups it identifies) merges and the operator runs the launch checklist.**

## Folder map

```
brands/brand-c-ukescape/
  profile.md              Identity, hypothesis, KPIs, tier status.
  voice.md                Persona, voice contrasts, voice DNA, anti-voice.
                          Conforms to brands/templates/voice-template.md.
  house-examples.md       8 required slots (incl. labelled BAD example).
  cornerstone-briefs.md   The five cornerstone briefs.
  templates/
    _draft-template.md    Brand C draft starting point with FCA-aware
                          frontmatter (regulated_product_check,
                          authorised_promoter, vulnerable_reader_topic,
                          charity_links_at_top).
  prompts/
    01-outline.md         Brief → outline (FCA-perimeter aware).
    02-draft.md           Outline → draft (refuses regulated promotions).
    03-headlines.md       Concept → 12 candidate titles (no urgency).
    04-qa-pass.md         Draft → structured FCA + vulnerable-reader
                          QA report.
  qa/
    checklist.md          Binding human gate before qa → staged.
    fca-perimeter.md      FCA 3-line check, prohibited claims,
                          disclaimer language, ASA/CAP rules.
    vulnerable-reader.md  Vulnerable-reader handling + debt-content
                          safety rules.
    affiliate-redlines.md Affiliate / lead-gen red lines + sourcing
                          requirements.
```

## Lifecycle (mirrors Brand A; adapted for trust-led longform)

```
idea ─► brief ─► outline ─► draft ─► qa ─► staged ─► live ─► archived
```

Every transition has a named gate. Brand C has **more gates** than
Brand A because money topics earn closer review.

### §1. idea → brief
Capture: slug, primary intent, target queries, audience, length
target, monetisation in play (default no), specific named regulated-
or-not status of any product mentioned, vulnerable-reader topic flag
(debt / eviction / benefits / mental health / addiction).

### §2. brief → outline
Use `prompts/01-outline.md`. The outline must mark every contestable
claim with `[CITE]` (primary source required) and every regulated-
adjacent claim with `[REG]` (route through `qa/fca-perimeter.md`
before draft).

### §3. outline → draft
Use `prompts/02-draft.md`. The draft template (`templates/_draft-template.md`)
embeds the FCA disclaimer block at the top, and — for any vulnerable-
reader topic — places **charity links at the top of the page** (not
the footer).

### §4. draft → QA
Run `prompts/04-qa-pass.md` as input to the human walkthrough.

Then walk **three** human gates in order:

1. `playbooks/voice-fidelity-checklist.md` (lab-wide; read-aloud).
2. `qa/checklist.md` (Brand C binding gate).
3. `qa/fca-perimeter.md` 3-line check on every monetised reference.

If **any** of the three fails, the piece does not move to `staged`.

### §5. staged → live
Manual posting only (Tier 2). Tier 3 considered only after 90 days of
clean Tier 2 publishing — stricter than Brand A's 30 days because of
the compliance surface.

## Compliance posture (binding)

- **Information-only.** No personalised financial recommendations.
- **No FCA-regulated affiliate links** unless the programme is run
  by an FCA-authorised firm AND has had its creatives pre-approved
  by that firm.
- **Charity links above affiliates** on any page touching debt /
  eviction / benefits / mental health.
- **Disclaimer block on every money-touching page** (canonical
  wording in `qa/fca-perimeter.md` §3).
- **No urgency / scarcity copy.** No "act now", no countdown, no
  "limited offer".
- **No predictions presented as recommendations.** "The cap will
  probably rise" is journalism; "Switch to X before the rise" is a
  recommendation we are not authorised to give.
- **UK English mandatory.** £ formatting, dated snapshots, primary
  UK sources (GOV.UK / Ofgem / FCA / HMRC / ONS / MoneyHelper /
  Citizens Advice / StepChange).

## What Brand C explicitly will not do

- Recommend specific loans, credit cards, mortgages, investments,
  pensions, insurance products, BNPL, claims-management services,
  or crypto.
- Make any health, mental-health, or addiction recommendation.
- Quote a real public figure (per `docs/legal-and-resilience.md` §6).
- Run a sponsored campaign that promotes a regulated product
  unless an FCA-authorised firm has approved the creatives in
  writing.
- Engage politically-charged news cycles (cost-of-living narrative,
  yes; political tribal frames, no).

## Cross-references

- `docs/legal-and-resilience.md` §7 — UK financial-content
  sensitivity (lab-wide).
- `docs/20-competitive-research.md` §3 — Brand C competitive
  landscape + FCA scope discipline.
- `docs/18-disclosure-templates.md` §11 — Brand-C-specific
  disclaimer.
- `docs/voice-authenticity-system.md` — voice moat.
- `brands/templates/voice-template.md` — canonical voice.md shape.
- `playbooks/voice-fidelity-checklist.md` — lab-wide voice gate.
- `playbooks/content-quality-checklist.md` — lab-wide quality gate.
- `prompt-library/general-secure-skeleton.md` — wrap every prompt.
