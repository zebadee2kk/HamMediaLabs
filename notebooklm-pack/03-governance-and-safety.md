# 03 — Governance & Safety

The lab is **governance-first**. Every automated action passes a
gate. Every spend passes a gate. Every publish passes a human.
**No autonomous publishing exists anywhere in the system**, by
construction.

## The governance tiers (`docs/03-governance.md`)

| Tier | What's allowed | Required to advance |
|---|---|---|
| **T0 — Planning** | Docs only | — |
| **T1 — Read-only / setup** | Account creation, registry entries, provider research | Playwright signup modules log evidence; vault populated |
| **T2 — Draft-only** | Generate into staging; schedule reviews; manual social posts | Content QA pass rate ≥ 90% across 2 weeks |
| **T3 — Publish-with-approval** | Auto-publish *after* a one-click operator approval | 4 consecutive weeks of T2 stability + brand legal pages live |
| **T4 — Autonomous publish** | Posts go live unattended on a defined cadence + topic whitelist | **Year-1 freeze.** Re-evaluate after EU AI Act guidelines stabilise + 3 months of clean T3 with zero incidents |

**Brand A today: T2 manual.** Brand A is allowed to publish, but
the operator hits the button, every time. **Brand B and Brand C
today: T2 audience-validation / draft-only.**

**T4 is frozen for all of year one.** This is non-negotiable.
The combination of EU AI Act Article 50 (2 Aug 2026
enforcement), FTC May 2026 AI endorsement guidance, and UK ASA
Active Ad Monitoring makes autonomous publishing a business-
existential risk under current rules.

## The human approval system

### Who approves what

- **Operator** approves every Brand A publish (Tier 2).
- **Operator** approves every Brand B clip publish.
- **Operator** approves every paid-line addition (§5 gate
  below).
- **Operator** approves every brand-domain DNS change, every
  Cloudflare Pages project creation, every Buttondown account
  step.
- **Operator** approves every governance-doc change as a PR
  review.
- **Claude / Codex** review code PRs against the
  `CONTRIBUTING.md` rules; the operator is the final human
  signoff.
- **Gemini** does not approve anything. Gemini produces
  designs. Every Gemini output passes the 14-section
  `design-handoffs/gemini-output-review-checklist.md` before it
  reaches the repo.

### The PR workflow (binding)

1. One issue = one branch = one PR.
2. Never commit directly to `main` (one early exception was
   reversed; the standing rule is hard).
3. Every PR includes: `Closes #N`, summary, files changed,
   tests run, security notes, out-of-scope notes.
4. CI must be green: typecheck + node test + gitleaks.
5. Never skip hooks (`--no-verify`).
6. Never bypass signing.
7. If blocked, stop and comment — do not push through.

## Cost gates (`docs/cost-control-and-free-tier-plan.md`)

### The £0 MVP stack (approved by default)

GitHub + Cloudflare Pages + Cloudflare Workers + Supabase free
tier + Cloudflare Access free tier + Plausible CE self-hosted /
Cloudflare Web Analytics + Gemini / Groq / OpenRouter `:free` +
n8n free / GitHub Actions cron + Buttondown free + 1Password +
GitHub Actions.

### The £50/month MVP ceiling (hard)

Total standing spend is capped at **£50/month** until aggregate
brand revenue crosses £150/month run-rate. Domain amortisation,
1Password, optional n8n VPS, optional newsletter platform,
optional LLM paid-tier overflow all live inside that envelope.

### The 5-step paid-line gate (§5 of the cost doc)

No paid line is added without:

1. **Named owner** (the operator names themself in the PR).
2. **Written use case** (why this paid line, what it replaces).
3. **Hard ceiling** (£/month cap; not aspirational).
4. **Cancellation trigger** (concrete condition under which
   the line is killed).
5. **Decision-log entry** (mirrored into `docs/15-decision-log.md`).

A paid line that doesn't have all five is unauthorised.

### One standing exception

1Password (≈ £3/month). The lab does not roll its own crypto;
secrets discipline outweighs the cost. Logged as the single
allowed standing paid line.

## Compliance layers

### EU AI Act Article 50 (enforcement 2 Aug 2026)

- Lab is a **deployer** of GPAI systems.
- Brand A and Brand C disclose AI augmentation on every page
  with the **informational variant** (per `docs/18-disclosure-templates.md`
  §3).
- Brand B uses the **satire variant** carve-out — the AI-
  generation existence is disclosed in the first 3 seconds of
  every clip and on the about / footer page, not necessarily
  every frame.
- The EU Code of Practice on AI-generated content (expected
  finalisation May–June 2026) will be adopted with a
  decision-log entry when issued.

### FTC May 2026 AI endorsement guidance (US traffic)

- Affiliate links require **first-link, plain-English,
  unavoidable disclosure** *before* the link.
- AI-augmented endorsements are identifiable as such.
- Civil penalty ceiling is **$51,744 per violation** (2026
  adjustment). Creators bear independent liability.

### UK ASA / CAP

- `#ad` on every commercial post on every platform.
- Bio-only disclosure is not enough.
- Active Ad Monitoring AI is scaling in 2026 — assume
  detection.

### UK FCA (Brand C-binding)

- Brand C is **information-only**. No personalised financial
  advice. Ever.
- FCA disclaimer block on every money-touching page (effectively
  every Brand C page).
- Forbidden monetisation surfaces at MVP: investment, consumer
  credit, mortgages, BNPL, crypto, insurance, claims-
  management.
- Allowed (only at Stage 3+): energy switching via FCA-
  authorised platforms; cashback / lifestyle; non-regulated
  lead-gen.
- Sensitive verticals avoided entirely at MVP: pensions,
  mortgages, claims-management.

### UK ICO + PECR

- Privacy policy live before any analytics.
- Cookie banner where any non-essential cookie is set.
- DPIA for any personal-data processing.

### Disclosure templates (`docs/18-disclosure-templates.md`)

Canonical copy. **Never paraphrase.** Includes:

- §1 — AI use, informational variant.
- §3 — AI use, satire variant.
- §5 — Affiliate disclosure, first-link, plain English.
- §11 — FCA disclaimer (Brand C).
- §13 — Newsletter footer (operator postal address — UK PECR).
- §15 — Privacy notice scaffold.

Any change to disclosure copy lands as its own PR with a
decision-log entry.

## Security (`docs/09-security-and-secrets.md`)

### Secret tiers

- **Tier 1 (critical)** — Supabase service-role key. Server-
  side only. Stored in 1Password + Cloudflare Pages env vars +
  GitHub Actions secrets. Never logged. Never client-side.
  Telemetry write tests confirm it never appears in error
  messages.
- **Tier 2 (important)** — Provider API keys (Gemini / Groq /
  OpenRouter). Same vault posture; rotatable per playbook.
- **Tier 3 (operational)** — Account-recovery codes, MFA seeds.
  In vault only.

### Hard rules

- **No `.env` committed.** Templates only
  (`vault-template/account-registry-template.md`).
- **gitleaks on every push/PR.** Provider-specific patterns in
  `.gitleaks.toml`.
- **MFA on every parent account.**
- **No client-side service-role key.**
- **No tracked secrets** — confirmed in every audit pass.

### Incident playbook

`playbooks/incident-credential.md` carries the (1) lock,
(2) rotate, (3) blast radius, (4) audit, (5) registry update
flow. `playbooks/account-recovery.md` and
`playbooks/platform-strike-response.md` cover related
scenarios.

## Launch blockers

The repo has **zero** repo-side launch blockers for Brand A.
The operator-side prerequisites in
`brands/brand-a-aiescape/launch-checklist.md`:

- Real operator name / email / postal address in
  `brands/brand-a-aiescape/site/src/site.config.ts` (currently
  explicit "replace before launch" placeholders).
- Brand domain registered (Cloudflare Registrar recommended)
  + DNS configured (or operator knowingly launches on
  `pages.dev`).
- Cloudflare Pages project created and linked to the repo
  build.
- Buttondown account + opt-in form embed URL.
- Walked through:
  - Launch checklist.
  - `playbooks/voice-fidelity-checklist.md` on cornerstone 1.
  - `playbooks/content-quality-checklist.md` on cornerstone 1.
  - Brand A QA checklist (`brands/brand-a-aiescape/qa/checklist.md`).

Brand B's launch is blocked by Brand A's day-30 outcome (per
`docs/portfolio-expansion-gate.md` §3).

Brand C's launch is blocked by (a) Brand A's day-30 outcome and
(b) a Brand-C-specific launch checklist not yet authored.

## Monetisation blockers

From `docs/monetization-architecture.md` and §9 of the master
plan.

### Per-stage gates

- **Stage 1 — Validation.** No paid tactics. Capture only.
- **Stage 2 — Capture.** Newsletter + lead magnet allowed once
  the brand has 4 consecutive weeks of publishing, > 0 returning
  visitors, primary channel growth above flat.
- **Stage 3 — Monetize.** Affiliate / digital product allowed
  once: ≥ 1,000 monthly sessions or ≥ 1,000 engaged followers,
  ≥ 30% returning rate on blog or ≥ 3% engagement on social, a
  clear audience problem statement.
- **Stage 4 — Scale.** Membership / partnerships allowed once:
  ≥ £300/month from existing tactics for 2 consecutive months,
  CAC payback ≤ 90 days, ops complexity green.

### Banned tactics (lab-wide, all brands, all stages)

- Fake scarcity.
- Fake countdown timers.
- Dark patterns (forced opt-ins, confusing cancel flows).
- Editorial corruption (advertorial that does not disclose).
- Real-person likeness / voice / signature synthesis.
- Real-company logo / palette / typography mimicry (Brand B).
- AI-generated reviews / testimonials.

### Affiliate red lines

- **Brand A** — no affiliate links until Stage 3 + an inline
  disclosure block. `affiliateInPlay: false` until then.
- **Brand B** — no affiliate links in year one.
- **Brand C** — no investment / consumer credit / mortgages /
  BNPL / crypto / insurance / claims-management. Ever, at MVP.
  No affiliate link above a vulnerable-reader charity block.

## Brand C safeguards (highest gate in portfolio)

Beyond the FCA / vulnerable-reader rules already covered:

- **Three sequential human QA gates** per piece: voice-fidelity
  → Brand C QA checklist → FCA 3-line check.
- **Charity-link-at-top component** (`CharityBlock.astro`)
  renders **at the top of the body** on any page where
  `vulnerable_reader_topic: true`. The same block renders again
  at the bottom under "Where to get advice (not from us)".
- **No affiliate link appears above the charity block** on a
  vulnerable-reader page. Ever.
- **No urgency / scarcity copy.** No "act now", no "before
  it's too late", no exclamation marks in body copy.
- **No "you deserve" framing.** Vulnerable-reader tone is
  calm.
- **Source citation discipline.** Comparison tables carry a
  retrieval-date footer ("Numbers retrieved YYYY-MM-DD from
  {primary-source-name}; your situation may differ"). Source
  links open in new tabs.

## Gemini restrictions

Gemini Free is the lab's design specialist. It does **not** own
strategy, governance, integration review, security, or
compliance.

### What Gemini is allowed to do

- Produce visual design specs in Markdown.
- Produce Astro + Tailwind starter code (Astro 4.x pin
  respected).
- Produce mockup descriptions in prose (Gemini Free is text-
  first).
- Produce a "Forbidden-design inventory" explaining what it
  did NOT design and why.

### What Gemini is NOT allowed to do

- Decide which brand to launch.
- Approve content.
- Touch governance docs.
- Add affiliate or sponsored references.
- Add third-party trackers, analytics scripts, or paid tooling.
- Change the Astro version pin (locked to 4.x).
- Introduce client-side islands (CVE exposure).
- Override any disclosure rule from
  `docs/18-disclosure-templates.md`.
- Generate copy that breaks any brand's `voice.md` §5
  anti-voice.

### The Gemini pipeline (binding)

```
Claude PM / Architect
  → Claude Design Subagents (6 roles)
    → claude-before-gemini-checklist.md (must be fully green)
      → Gemini Design Builder
        → gemini-output-review-checklist.md (14 sections)
          → Operator approval
            → Staged under design-handoffs/output/ (gitignored)
              → Scoped PR brings it into the repo
```

A brief with any unchecked pre-flight box is a no-send.

## Standing safety floor (lab-wide)

- No real-person likeness / voice / signature synthesis on any
  brand, ever.
- No autonomous publishing on any brand, year one.
- No paid spend outside the 5-step gate.
- No client-side data fetch on dashboard or brand sites.
- No client-side service-role key.
- No popups, modals, exit-intent overlays, scroll-triggered
  overlays.
- No urgency / scarcity copy on any brand surface (Brand A and
  Brand C are explicit; Brand B inherits via deadpan voice).
- No fake social proof.

## Cross-references

- `docs/03-governance.md` — tiers.
- `docs/09-security-and-secrets.md` — secrets framework.
- `docs/legal-and-resilience.md` — entity / MFA / paid-legal-
  advice triggers.
- `docs/18-disclosure-templates.md` — canonical disclosure copy.
- `docs/cost-control-and-free-tier-plan.md` — spend gates.
- `docs/x-platform-risk.md` — X-specific posture.
- `docs/portfolio-expansion-gate.md` — Brand B / C unfreeze.
- `docs/monetization-architecture.md` — trust-first commercial
  gates.
- `docs/source-intelligence-governance.md` — per-source rules.
- `design-handoffs/claude-before-gemini-checklist.md` — Gemini
  pre-flight.
- `design-handoffs/gemini-output-review-checklist.md` — post-
  Gemini gate.
- `brands/brand-c-ukescape/qa/fca-perimeter.md` — FCA copy + scope.
- `brands/brand-c-ukescape/qa/vulnerable-reader.md` — charity-
  block rules.
- `brands/brand-c-ukescape/qa/affiliate-redlines.md` — forbidden
  surfaces.
- `brands/brand-b-corpsatire/qa/defamation.md` — punch-up only.
