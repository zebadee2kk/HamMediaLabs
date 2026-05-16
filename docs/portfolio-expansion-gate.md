# Portfolio Expansion Gate — Brand B & Brand C Launch Criteria

> Prevent premature multi-brand sprawl. **Brand A first.** Brand B
> and Brand C remain in `planning` status until the gates below
> close. Governance-first; financial thresholds required.
>
> Companion to `docs/business-plan.md` §4 (phase model) and
> `playbooks/kill-or-scale-review.md`.

---

## 1. The standing posture

- **Brand A is the test of the operating system.** Until Brand A
  passes its day-30 post-launch review, Brand B and Brand C do
  not move from `planning`.
- **No vanity expansion.** Launching a second brand because the
  first is "going well" is not enough. Specific evidence is
  required.
- **Operator bandwidth is the hard constraint.** Each active
  brand consumes ≥10 hours/week (per
  `docs/PROJECTHYDRA-MASTER-PLAN.md` §1.7). Two active brands =
  ≥20 hours. Three = the operator's full lab budget. There is
  no fourth active brand at MVP.

## 2. Brand A — required state before expansion is considered

All of:

- [ ] **30 days of clean Tier 2 publishing** (per
      `brands/brand-a-aiescape/publish-workflow.md` §7).
- [ ] **≥3 cornerstones shipped** (cornerstones 1, 2, 3 from
      `first-three.md`) without inline corrections.
- [ ] **Returning-visitor rate ≥30%** on the cornerstone
      collection (per `docs/measurement-framework.md` §1, the
      Brand A north-star direction).
- [ ] **Newsletter open rate ≥30%** on the launch + week-2 +
      week-3 sends (averaged).
- [ ] **At least one organic backlink** or one piece of inbound
      reader correspondence demonstrating recognition.
- [ ] **Zero policy / disclosure / platform-strike incidents** in
      the 30-day window.
- [ ] **Cost attribution** for Brand A holds inside the §1 MVP
      stack (per `docs/cost-control-and-free-tier-plan.md`).
- [ ] **Operator self-assessment:** "I can run another brand
      next to this one without dropping a gate" — recorded in
      `docs/15-decision-log.md`.

If any box is unticked at the day-30 review, expansion is **not
considered**. Re-evaluate at day 60.

## 3. Brand B — launch gate

Brand B may move from `planning` → `active` only when:

- [ ] Brand A passes §2 in full.
- [ ] Brand B's pipeline (`brands/brand-b-corpsatire/`) has been
      walked end-to-end on **at least 5 staged scripts**
      (drafts/, not yet live) — the pipeline is proven before
      anything posts.
- [ ] **Persona owner named** in `brands/brand-b-corpsatire/voice.md`.
- [ ] **Account-recovery matrix** filled for Brand B
      (`playbooks/account-recovery.md`).
- [ ] **Posting cadence ceiling** (≤5/week TikTok, ≤4/week X
      mirror per `docs/x-platform-risk.md` §7) accepted and
      logged.
- [ ] **No commercial monetisation in Phase B for Brand B** is
      explicit (per `docs/monetization-architecture.md` §3.2).
- [ ] **Defamation gate (`brands/brand-b-corpsatire/qa/defamation.md`)**
      reviewed by operator against current EU AI Act Article 50
      guidance and platform policies.
- [ ] **Operator confirms ≥10 weekly hours available** without
      compromising Brand A's cadence.

Brand B's first cohort: 3 episodes prepared end-to-end **before**
posting any. The first episode goes live only after the persona
owner's watch-aloud gate is green on all three scripts. This
buffer prevents day-1 cadence collapse.

## 4. Brand C — launch gate

Brand C is **higher exposure** than Brand B (UK financial content
under FCA / ASA / ICO constraints). Its gate is stricter:

- [ ] Brand A passes §2 in full.
- [ ] **Brand B is either active for 30+ days OR explicitly
      deferred.** Running B + C as simultaneous new launches
      exceeds operator bandwidth.
- [ ] **All Brand C QA docs current** as of the launch decision:
      `qa/fca-perimeter.md`, `qa/vulnerable-reader.md`,
      `qa/affiliate-redlines.md`.
- [ ] **Persona owner named** in `brands/brand-c-ukescape/voice.md`.
- [ ] **FCA-compatible affiliate path documented**, with at least
      one programme onboarded per `qa/affiliate-redlines.md` §7
      OR an explicit decision to launch information-only with
      zero affiliate revenue.
- [ ] **5 cornerstone drafts walked through `qa/checklist.md` +
      `qa/fca-perimeter.md` 3-line check** — pipeline proven on
      paper before any post goes live.
- [ ] **Vulnerable-reader handling** rehearsed: charity-link
      block at the top renders correctly on the staging URL;
      reader-correspondence protocol agreed.
- [ ] **Operator confirms ≥10 weekly hours available** for Brand
      C *in addition to* Brand A's ongoing cadence (and Brand B
      if also active).
- [ ] **Cost attribution** for Brand C fits inside the £50/mo
      ceiling (per `docs/cost-control-and-free-tier-plan.md`)
      OR the ceiling has been formally raised with a
      decision-log entry.

If Brand A revenue is the only revenue stream and is <£50/month,
launching Brand C means **net cash burn increases**; the
decision-log entry must accept that consciously.

Brand C's first cohort: 5 staged pieces prepared end-to-end
before posting the first. Same buffer logic as Brand B, longer
queue because Brand C cadence is slower and trust takes longer
to compound.

## 5. Resource allocation rules

- **No more than 2 active brands** at any time in months 0–9.
  Brand A always. Then either Brand B or Brand C, not both.
- **Brand B + Brand C parallel launch is forbidden** at MVP. The
  operator does not have 30+ hours/week of lab capacity.
- **One brand at a time gets the operator's "deep work" days.**
  The other brand gets maintenance posts only.
- **Newsletter list is per brand.** Cross-promotion across brand
  newsletters is **forbidden** at MVP (per
  `docs/monetization-architecture.md` §6.4).

## 6. Operator bandwidth constraints

- **≤10 hours/week per active brand** at steady state.
- **≤20 hours/week total lab budget** at MVP.
- **No "I'll just work weekends"** — that is operator unsustainability;
  the brand that requires it gets killed before the operator does.

If the operator's hours-per-brand exceeds 12 for two consecutive
weeks, **automatic Hold review** on the most recent-launched
brand. The kill / scale rubric in `playbooks/kill-or-scale-review.md`
applies in full.

## 7. One HQ or multi-site structure?

Today: **one HQ control plane** (`core/`) serves all brands. Each
brand has its own Astro site, its own newsletter, its own social
accounts, but they share:

- HQ Supabase project for telemetry + decision log.
- LLM router and quota registry.
- 1Password vault.
- Cloudflare account + DNS.
- GitHub repository (this repo is the monorepo).

Future-state (Year 2 candidate):

- A second Supabase project for a Scale-stage brand
  (`docs/PROJECTHYDRA-MASTER-PLAN.md` §5.2 already anticipates
  this).
- A separate brand repo only if a brand is being prepared for
  partial sale.

We do **not** split into separate repos / accounts pre-emptively.
Mono-HQ is a feature.

## 8. Portfolio diversification vs distraction

A portfolio adds value when:

- Each brand reduces the risk of any single brand's failure
  ending the lab.
- Each brand finds a different audience with a different intent.
- Each brand teaches the system something the others can't.

A portfolio is a distraction when:

- The operator's hours-per-brand drops below the floor.
- Brands compete for the same audience and dilute attention.
- Cross-brand monetisation tempts shared mailing lists or shared
  CTAs (forbidden — see §5 + monetisation-architecture.md).
- The kill-or-scale rubric is being ignored to "give it more
  time" on multiple brands at once.

Quarterly portfolio-diversification check (built into
`playbooks/quarterly-platform-refresh.md` outputs):

- Each active brand has independent audience signal (≥1 unique
  reader / viewer / subscriber not present on the other brands).
- No two brands derive >70% of traffic from the same single
  surface (e.g. both Brand A and Brand C primarily from Google
  search — acceptable but watched).
- No two brands share a single point of platform failure (e.g.
  both depending on TikTok primary — would be a problem; Brand
  B is the only TikTok-primary brand).

## 9. The "stop launching" trigger

If **any** of the following are true at the start of an expansion
decision, the answer is "no":

- Brand A has had a policy / disclosure incident in the last 30
  days.
- Operator's lab hours have averaged <8 / week over the last 4
  weeks.
- The £75 / mo non-revenue spend cap (per
  `docs/PROJECTHYDRA-MASTER-PLAN.md` §11.5) is breached.
- The HQ Supabase has been paused due to inactivity
  (heartbeat failed) — operational health gate.
- The operator self-assessment is "I can barely keep Brand A
  going" or worse.

## 10. Decision-log entries required

Before Brand B or Brand C launches:

```
### Date: YYYY-MM-DD
### Decision:
Launch Brand <B|C> from `planning` → `active`.

### Reasoning:
- Brand A §2 gate state: all 8 boxes ticked.
- Per `docs/portfolio-expansion-gate.md` §3 (or §4):
  every box ticked.
- Operator bandwidth available: <X hours/week, confirmed>.

### Alternatives considered:
- Defer Brand <B|C> by 30 / 60 / 90 days.
- Kill Brand <B|C> from `planning` (rejected because <…>).

### Risks:
- Brand A cadence may slip; mitigation: <reduce Brand A to <Y>
  posts/week temporarily AND/OR maintenance-only mode>.
- Cost attribution adds £<N>/month; remains inside cost-control
  envelope.

### Revisit date:
+30 days (day-30 review of new brand).
```

The entry is filed **before** the brand's first piece goes live —
not after.

## 11. Cross-references

- `docs/business-plan.md` §4 — phase model + non-goals.
- `docs/profit-model.md` §6 — financial kill/hold/scale.
- `docs/cost-control-and-free-tier-plan.md` — cost ceiling.
- `docs/monetization-architecture.md` §3 — per-brand commercial
  pathway.
- `docs/PROJECTHYDRA-MASTER-PLAN.md` §1.7 — operator-hour
  assumptions.
- `brands/brand-a-aiescape/publish-workflow.md` §7 — Brand A
  Tier-3 promotion gate.
- `brands/brand-b-corpsatire/profile.md` — Brand B tier path.
- `brands/brand-c-ukescape/profile.md` — Brand C tier path
  (90-day clean T2 minimum).
- `brands/brand-c-ukescape/qa/fca-perimeter.md` — Brand C
  regulatory gate.
- `playbooks/kill-or-scale-review.md` — verdict consumers.
- `playbooks/quarterly-platform-refresh.md` — quarterly
  diversification check.

## 12. Out of scope (per #53)

- Launching Brand B or Brand C directly.
- Auto-promoting any brand based on numerics alone.
- A "fast-track" expansion path.
- Cross-brand referral / shared-list mechanics.
