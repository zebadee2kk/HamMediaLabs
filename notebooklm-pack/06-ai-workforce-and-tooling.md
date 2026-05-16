# 06 — AI Workforce & Tooling

The lab uses multiple AI agents under explicit boundaries. No
agent owns everything; no agent operates without a human gate
at the publish step.

## The roster

| Agent | Primary role | Who controls it | Cost shape |
|---|---|---|---|
| **Claude Code** | Engineering, governance authoring, repo orchestration | Operator (interactive); CI gates | Tokens via Anthropic API; primary working agent |
| **Codex (ultrareview)** | Cloud multi-agent code/PR review | User-triggered, billed per call | Pay per review run |
| **Gemini Free** | Visual / UX design, Astro+Tailwind starter code | Operator (via design-handoff pipeline) | Free tier |
| **Local LLMs** (planned) | Voice-cloning, on-device generation experiments | Operator | Local compute only |
| **NotebookLM** | Distilled-intelligence pack consumer (this pack lives here) | Operator | Free tier |
| **The Operator (human)** | Final approver, persona owner, kill-switch | n/a | Time |

## Claude Code — primary engineering agent

### What Claude does

- Writes engineering code (TS, Astro components, SQL schema).
- Authors governance docs.
- Drafts cornerstone briefs and content.
- Maintains the decision log.
- Runs CI / tests / typecheck before any PR.
- Handles the PR workflow end-to-end.

### What Claude does NOT do

- Push directly to `main`. (One early exception was reversed;
  the rule is now hard.)
- Approve content for publish.
- Approve spend.
- Bypass gitleaks / hooks (`--no-verify` is forbidden).
- Author or modify disclosure copy in `docs/18-disclosure-templates.md`
  without a scoped PR + operator review.
- Synthesise real-person voice, signature, or likeness for any
  brand, ever.
- Add a `client:*` directive to any Astro component.
- Add a `posts/` folder to a brand site (operator creates at
  launch per the launch-day script).

### How Claude works

- One issue = one branch = one PR.
- Every PR: `Closes #N`, summary, files changed, tests run,
  security notes, out-of-scope notes.
- Decision-log entries inline with the PR for strategic
  changes.
- Small, reviewable PRs. Hardening vs. features are split.
- CI green before merge, every time.
- If blocked, stop and comment on the issue.

## Codex — cloud review agent

- Triggered by `/ultrareview` (user-typed) or
  `/ultrareview <PR#>`.
- Runs multi-agent review in cloud; billed per call.
- Claude does **not** spawn Codex via Bash. Codex is user-
  triggered.
- Codex output informs the next Claude pass; it does not
  bypass operator approval.

## Gemini Free — design specialist

### Authority bounded (binding)

Gemini's authority ends at "design specs + Astro+Tailwind
starter code + mockup descriptions". Strategy, governance,
integration review, security, and compliance **stay with
operator + Claude / Codex**.

### What Gemini is allowed to do

- Produce a visual design spec (Markdown).
- Produce Astro 4.x + Tailwind starter code (Astro pin
  respected).
- Produce mockup descriptions in prose (Gemini Free is text-
  first).
- Produce a "Forbidden-design inventory" — what Gemini did
  NOT design, and why.

### What Gemini is NOT allowed to do

- Decide which brand to launch.
- Approve content.
- Touch governance docs.
- Add affiliate or sponsored references.
- Add third-party trackers, analytics scripts, or paid
  tooling.
- Change the Astro version pin (locked to 4.x per
  `docs/astro-security-upgrade-plan.md`).
- Introduce client-side islands.
- Override disclosure copy.
- Generate copy that breaks a brand's `voice.md` §5
  anti-voice.

### The binding pipeline

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

### The six Claude design subagents (`design-handoffs/claude-design-subagents.md`)

Each subagent tightens the brief before it reaches Gemini:

1. **UX Strategist** — what is the user trying to do? Is the
   surface justified?
2. **Visual Designer** — palette, type, hierarchy, spacing,
   accessibility.
3. **Brand Consistency** — voice §2 contrasts + §5 anti-voice
   referenced inline; per-brand edge cases called out.
4. **Accessibility** — WCAG AA contrast, focus-visible, heading
   hierarchy, keyboard nav, skip-links.
5. **Compliance / Disclosure** — AI-use variant, FCA disclaimer
   placement (Brand C), charity-block-at-top rule (Brand C),
   affiliate disclosure block (when in play).
6. **Conversion Ethics** — no urgency, no scarcity, no
   countdown timers, no fake social proof, no popups /
   modals / overlays.

### The 10-section pre-flight (`design-handoffs/claude-before-gemini-checklist.md`)

A brief with any unchecked box is a no-send to Gemini. Sections:

1. Objective.
2. Target user.
3. Launch mode.
4. Brand constraints.
5. Compliance constraints.
6. Forbidden elements.
7. Output format.
8. Gemini authority bounded.
9. Review path.
10. Pre-flight verdict.

### The post-Gemini 14-section gate

`design-handoffs/gemini-output-review-checklist.md`. Every
Gemini output passes this before any repo merge:

1. Brief adherence.
2. Brand voice fidelity.
3. Compliance / disclosure.
4. Accessibility.
5. Astro / Tailwind constraints.
6. Forbidden elements (client islands, trackers, etc.).
7. Performance.
8. Mobile-first.
9. Operator-replaceable copy.
10. Source citations + retrieval dates.
11. Security (no external script, no fetch, etc.).
12. Internationalisation safe defaults.
13. Component reuse.
14. Forbidden-design inventory present.

## Local LLMs (`docs/local-llm-plan.md`) — planned, not in production

- Use cases: voice-cloning for podcast/video, on-device
  generation experiments, privacy-preserving drafts.
- Hardware target: operator's local workstation (Mac / Linux).
- Not in production today. Activation requires a §5 cost gate
  for any GPU + a separate decision-log entry covering data
  posture.

## NotebookLM — distilled intelligence layer

- **Inputs:** this pack (`notebooklm-pack/`).
- **Outputs:** answers to strategic / operational questions for
  the operator + future stakeholders.
- **Not used for content generation.** NotebookLM is an
  *understanding* tool, not a publishing tool.
- **Freshness:** the workflow in #76
  (`.github/workflows/notebooklm-pack-freshness.yml`) gates PRs
  that change strategic docs to either include updates here or
  carry a `NotebookLM-Pack: not-needed` marker in the PR body.

## The operator — final authority

- Approves every publish.
- Approves every paid line.
- Approves every governance-doc change.
- Is the persona owner for voice authenticity (read-aloud /
  watch-aloud QA).
- Is the named human for disclosure ("Contact: operator's real
  email").
- Runs every Playwright onboarding step manually (Playwright
  is not used in production; manual signups at MVP).
- Owns kill / hold / scale calls.
- Owns incident response.

## Role boundaries summary

| Surface | Owner |
|---|---|
| Strategy | Operator (with Claude advisory) |
| Governance docs | Operator + Claude (PR review) |
| Engineering | Claude (PR workflow) + Operator (review) |
| Voice / persona | Operator (persona owner) |
| Content drafts | Claude (writes) → Operator (edits + voice-fidelity gate) |
| Visual design | Gemini (designs) → Claude / Operator review |
| Code review | Claude + Codex (ultrareview, user-triggered) + Operator |
| Publish click | Operator |
| Compliance | Operator (Claude / Codex assist) |
| Security incident | Operator (playbook-driven) |
| Spend approval | Operator (5-step gate) |
| Decision-log entry | Operator + Claude |

## Workflow orchestration

### Day-to-day

- Operator opens an issue ("add cornerstone 2 to Brand A").
- Claude reads the issue, branches, implements, opens PR.
- CI runs (typecheck + test + gitleaks).
- Operator reviews the PR.
- Operator merges; Cloudflare Pages deploys if the PR touches
  the site.
- Decision-log entry filed inline.

### Design surfaces

- Operator decides a brand needs a visual surface (e.g., the
  Brand A site visual system).
- Claude pre-reviews the Gemini brief through the six
  subagents.
- Claude walks `claude-before-gemini-checklist.md` end to end.
- Operator pastes the brief into Gemini Free.
- Gemini returns design + starter code + mockup descriptions.
- Operator stages output under
  `design-handoffs/output/<brief>/<date>/` (gitignored).
- Claude runs the 14-section output review.
- Operator approves; scoped PR brings the output into the
  repo.

### Strategic decisions

- Operator + Claude discuss.
- Claude drafts a master-plan delta or new doc.
- Decision-log entry mandatory for any strategic change.
- PR review per usual rules.

### Incidents

- Operator opens the relevant playbook
  (`playbooks/incident-credential.md`,
  `playbooks/account-recovery.md`,
  `playbooks/platform-strike-response.md`).
- Operator walks the steps manually.
- Decision-log entry post-mortem.

## What no AI agent ever does

- Publish content unattended.
- Approve a publish on the operator's behalf.
- Add a paid line.
- Modify disclosure copy in production without operator PR
  review.
- Synthesise real-person voice, signature, or likeness.
- Mimic a real-company logo, palette, or typography (Brand B-
  specific; lab-wide on principle).
- Touch the `main` branch directly.
- Bypass gitleaks or PR review.

## Cross-references

- `docs/voice-authenticity-system.md` — persona ownership,
  read-aloud / watch-aloud gate.
- `docs/local-llm-plan.md` — local-LLM posture.
- `design-handoffs/README.md` — Gemini workflow.
- `design-handoffs/claude-design-subagents.md` — six subagent
  roles.
- `design-handoffs/claude-before-gemini-checklist.md` — 10-
  section pre-flight.
- `design-handoffs/gemini-output-review-checklist.md` — 14-
  section post-gate.
- `CONTRIBUTING.md` — PR workflow rules.
- `docs/15-decision-log.md` — decision discipline.
