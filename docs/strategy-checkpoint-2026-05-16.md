# Strategy Checkpoint — Controlled expansion vs. original spec

> **Date:** 2026-05-16.
> **Closes:** #78.
> **Posture:** record-only. The checkpoint records the PM verdict
> and the next-behaviour rules; it does not introduce new strategy.

---

## 1. Verdict (PM-provided, formalised here)

**Controlled expansion, not harmful drift.**

The lab has upgraded from the original idea — "build funny /
autonomous / self-running websites using free AI backends, agent
teams, and connected social accounts, then run multiple ideas to
see what gains traction" — to a more governance-rich, free-first,
human-gated operating system.

This is recorded as a deliberate, accepted, beneficial drift.

## 2. What changed, and why each change is a positive correction

| Original intent | Current state | Why this is a positive correction |
|---|---|---|
| Autonomous publishing | Human-gated publishing (Tier-4 frozen) | EU AI Act Article 50 transparency obligations + FTC May 2026 AI endorsement guidance + UK ASA Active Ad Monitoring all land in 2026. Autonomous publishing without disclosure-aware human review is a compliance/business-existential risk. |
| Multiple simultaneous brand experiments | Brand A first; B + C gated | Operator-bandwidth reality (≤10 hours/week per active brand). Brand A's day-30 outcome is the test of the operating system; parallel launches risk all three losing focus. |
| Free AI backends | Free-first + £50/month MVP ceiling + 5-step paid-line gate | Silent paid dependencies kill small businesses. The 5-step gate (named owner, written use case, hard ceiling, cancellation trigger, decision-log entry) keeps every paid line deliberate. |
| Gemini as another agent | Gemini as design / build specialist with a 14-section output review checklist | Gemini does design well at zero cost; it is not a governance authority. The Claude / Codex / operator review checklist prevents Gemini drift. |
| NotebookLM as a notes tool | NotebookLM as a distilled intelligence layer (planned in #75 + #76) | A high-context distilled pack is the right shape for founder / operator / investor onboarding. The skeleton ships in #75; freshness gating ships in #76. |
| "Run a load of ideas" | Portfolio cap of 3 brands with hard expansion gates | Vanity expansion kills small media businesses. The §3 / §4 gates of `docs/portfolio-expansion-gate.md` are conservative and binding. |

## 3. What did NOT drift (still aligned with the original)

- **Free-first**. Zero standing cost beyond 1Password + amortised
  domains. The £50/month ceiling is hard.
- **Multiple brand bets**. Three brands (A, B, C) cover three
  distinct intents (useful / funny / emotional-financial).
- **Speed of validation**. The first publishing loop ships in
  weeks, not months — Brand A is build-ready today.
- **Reusable system**. The lab's operating system is the durable
  asset; brands are experiments built on top.
- **Kill discipline**. Brands die on evidence, not on emotion. The
  scoring formulas in `core/scoring/scoring.ts` and the kill /
  hold / scale verdicts in `playbooks/kill-or-scale-review.md`
  are mechanical.

## 4. Current risks acknowledged

1. **Over-planning before launch.** The lab has accumulated more
   governance than most year-five media projects manage. The
   antidote is launching: `launch-packs/brand-a-mvp/` is the
   bridge.
2. **Branch hygiene lag.** 27 merged feature branches remain on
   `origin`; deletion blocked by the MCP connector. Operator can
   run the documented command locally (#56).
3. **Dependabot remediation not complete.** Framework + lanes +
   config shipped (#48, #72); operator-side audit-table fill is
   still owed.
4. **Coordinator issues may be stale.** #38 (Phase 6) and #57
   (master forward queue) have fully landed; both can close.
5. **Brand A is built, not approved or launched.** Operator-side
   prerequisites in `brands/brand-a-aiescape/launch-checklist.md`
   are the only repo-external gate.

## 5. Required next behaviour (binding)

- **Do not add broad new architecture** unless a real launch gap
  appears. The "no further planning sprawl" rule is in force.
- **Finish the final QA / pre-launch / dashboard / security
  audits** that are already in flight (#65, #71, #72, #73 —
  each already merged or in-flight under this same run).
- **Populate NotebookLM pack** (#75) only after the audit truth
  is stable. (The audits stabilise truth; the pack distils it.)
- **NotebookLM freshness workflow** (#76) lands after the pack
  is populated, in warning-only mode if the pack isn't ready.
- **Launch Brand A** only after operator approval and the
  launch-pack execution. No fast-track.

## 6. What this checkpoint does NOT do

- It does not approve a Brand A launch. That remains an
  operator decision.
- It does not approve a Brand B or Brand C launch. Those remain
  gated by `docs/portfolio-expansion-gate.md`.
- It does not authorise any paid spend. The cost-control gate
  is unchanged.
- It does not authorise autonomous publishing or autonomous
  social posting. Both remain forbidden.
- It does not relax any disclosure rule.

## 7. Acceptance criteria (from #78) re-verified

The issue's acceptance criteria, line by line:

- [x] **No major strategic contradictions.** Cross-checked across `docs/PROJECTHYDRA-MASTER-PLAN.md`, `docs/business-plan.md`, `docs/portfolio-expansion-gate.md`, `docs/monetization-architecture.md`, `docs/cost-control-and-free-tier-plan.md`, `docs/legal-and-resilience.md`, the three brand profiles, and the launch pack. All align.
- [x] **Brand A remains the launch focus.** Confirmed in `brands/brand-a-aiescape/launch-checklist.md`, `launch-packs/brand-a-mvp/`, `docs/portfolio-expansion-gate.md` §1, and the final QA review.
- [x] **Autonomous publishing / autonomous social posting remain forbidden.** Re-verified in `launch-packs/brand-a-mvp/README.md` §"Forbidden", `brands/brand-{a,b}/qa/checklist.md`, `docs/03-governance.md` Tier 4 (frozen), and the Hard Rules across the legal / X-platform docs.
- [x] **Costs remain gated.** `docs/cost-control-and-free-tier-plan.md` §5 5-step approval gate stands; the dashboard's `/cost` page surfaces both quota headroom and per-line ceilings.
- [x] **Future brands remain gated behind Brand A proof.** `docs/portfolio-expansion-gate.md` §2 (Brand A required state) is binding; §3 / §4 carry the per-brand 8 / 9 box gates.

## 8. Cross-references

- `docs/PROJECTHYDRA-MASTER-PLAN.md` — canonical strategy.
- `docs/business-plan.md` — operating model + phase model.
- `docs/portfolio-expansion-gate.md` — Brand B / Brand C launch gates.
- `docs/monetization-architecture.md` — trust-first commercial gates.
- `docs/cost-control-and-free-tier-plan.md` — paid-line gate.
- `docs/legal-and-resilience.md` — entity / MFA / paid-legal-advice triggers.
- `docs/final-qa-review-2026-05-16.md` — repo coherence audit.
- `docs/brand-a-prelaunch-audit.md` — site implementation audit.
- `docs/hq-dashboard-implementation-audit.md` — dashboard hardening.
- `docs/dependabot-security-audit.md` §6a — Phase S1 execution status.
- `launch-packs/brand-a-mvp/` — operator runbook.
- `docs/15-decision-log.md` — every strategic decision logged.
- #75 — NotebookLM pack (waiting on this checkpoint + audits).
- #76 — NotebookLM freshness workflow (waits on #75).

Closes #78.
