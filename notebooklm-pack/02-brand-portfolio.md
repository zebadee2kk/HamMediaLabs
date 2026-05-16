# 02 — Brand Portfolio

## Why three brands

Three brands cover three distinct intents:

- **Useful** (Brand A) — applied utility, low legal risk,
  durable SEO query space.
- **Funny** (Brand B) — engagement / audience-building, video-
  first, no monetisation pressure in year one.
- **Emotional / financial** (Brand C) — high-trust, high-stakes,
  compliance-heavy.

Three is the hard cap at MVP per
`docs/portfolio-expansion-gate.md`. Operator bandwidth is the
binding constraint: each active brand consumes ≈10 hours/week.
There is no fourth active brand at MVP.

The §5.3 niche-selection rubric in
`docs/PROJECTHYDRA-MASTER-PLAN.md` scored the three pilots
24 / 22 / 23 out of 30 (launch threshold 21).

## Comparative one-glance

| Dimension | Brand A — AI Escape | Brand B — Corporate Satire | Brand C — UK Cost-of-Living |
|---|---|---|---|
| Working title | AI Escape | TBD (Corporate Theatre / Quarter Plan / OK-Aren't) | TBD (Escape the Bill / Cost of Living, UK) |
| Niche | Applied AI for working professionals | UK / tech corporate-culture satire | UK cost-of-living journalism + lifestyle-cost optimisation |
| Audience | Knowledge workers 25–45 who already use AI | Tech / consulting workers 25–45 | UK working adults 25–50, some vulnerable readers |
| Tone | Confident peer who has shipped | Deadpan, dry, observational | Calm, specific, sceptical, source-generous |
| Primary channel | SEO blog | TikTok | SEO blog |
| Secondary channel | X (commentary + distribution) | Instagram Reels | Reddit (manual, comment-first) |
| Tier today | T2 manual (ready to publish) | T2 audience-validation (not yet) | T2 (publish gated) |
| Site instantiated? | **Yes** | No (gated) | No (gated) |
| AI disclosure variant | Informational | Satire (per §3 of `18-disclosure-templates.md`) | Informational |
| FCA disclaimer | n/a | n/a | **Required on every money-touching page** |
| Affiliate red lines | No links at launch; Stage 3 gate | Year-one no monetisation | No investment / credit / mortgages / BNPL / crypto / insurance / claims-management |
| Vulnerable-reader handling | n/a | n/a | Charity-link block at top (not footer) |
| Real-person synthesis | Forbidden lab-wide | Forbidden lab-wide; punch-up only | Forbidden lab-wide |
| 90-day traffic target | 2,500 sessions/mo | n/a (audience-only) | 2,000 sessions/mo |
| 90-day audience target | 100 newsletter subs | ≥5,000 follower across primary+mirror | tied to newsletter list |
| Kill threshold | BS < 0.30 for 2 weeks after week 6 + no monetisation | No clip >5,000 views by week 6 + no follower growth | Tied to brand-score floor; gated by FCA / vulnerable-reader compliance |

## Brand A — AI Escape (the launch brand)

**Working title:** AI Escape (operator verifies domain
availability before lock).

**Why this niche.** Saturation at the top of the AI-tools content
space is in tool-of-the-week churn. The opening is in *workflows*
(durable) rather than *tools* (volatile). The brand sells
"what I actually use, what I dropped, what saved me real time."

**Audience.** Knowledge workers 25–45 (engineers, ops,
marketers, consultants) who already use AI casually and want to
use it like a craftsperson. Not beginners; not enterprise
buyers.

**Voice anchor.**
`brands/brand-a-aiescape/voice.md`. Confident peer. Specific,
not vague. No guru framing. Anti-voice §5: no "10 best AI
tools", no "you NEED to use…", no urgency, no hype.

**Pipeline state today.**
- Profile + voice + house examples present.
- Five cornerstone briefs drafted; cornerstone #1 is draft-ready
  and has passed voice-fidelity QA.
- Site instantiated (`brands/brand-a-aiescape/site/`), eight
  pages, Astro 4.x, ready to build.
- Launch pack present (`launch-packs/brand-a-mvp/`).
- `affiliateInPlay: false` at launch. No affiliate disclosure
  rendered.
- Operator-side prerequisites only: real name / email / postal
  address in `site.config.ts`, Buttondown account + opt-in form
  embed URL, Cloudflare Pages project, optional custom domain.

**Monetisation path** (after Stage 3 gate; see
`05-cost-business-and-monetization.md`).
1. SaaS affiliate (recurring; productivity tooling).
2. £29 digital templates pack (own product).
3. Newsletter sponsorship tier at scale.

**Channels.**
- **Primary** — SEO blog. Cornerstones are the SEO backbone.
- **Secondary** — X (manual, conservative cadence per
  `docs/x-platform-risk.md`).
- **Experimental** — YouTube Shorts from month 2.

**Kill / hold / scale.**
- Kill if `BS < 0.30` for 2 consecutive weeks after week 6 AND
  no monetisation signal.
- Hold if 0.30 ≤ BS < 0.55.
- Scale if BS ≥ 0.55 AND newsletter signups ≥ 30/week sustained
  for 4 weeks AND first £100 affiliate revenue.

## Brand B — Corporate Satire (validation-only)

**Working title:** TBD. Operator picks one of "Corporate
Theatre" / "Quarter Plan" / "OK-Aren't" before first clip.

**Why this niche.** High engagement potential, easy production
cadence, durable format space (corporate culture isn't going
anywhere). **Validation-only first**; monetisation deferred.

**Audience.** Tech / consulting / financial-services workers
25–45 on TikTok and Instagram. Crossover from r/consulting,
r/cscareerquestions, LinkedIn (ironic).

**Voice anchor.**
`brands/brand-b-corpsatire/voice.md`. Deadpan, observational,
specific ("the Tuesday 10:30 sync"). Never punching down.
Anti-voice §5: no reaction-face thumbnails, no "POV: you're a
corporate worker", no engagement-bait overlays, no "Stay tuned
for part 2", no edgelord drift, no exclamation marks.

**The defamation and IP gates (binding).**
- **No identifiable real-company logos.** Generic placeholders
  only ("Big Consulting Firm" / "The Bank").
- **No real-person likenesses, voices, or signatures.**
- **No real product names** beyond clearly generic parody.
- **No leaked-email / leaked-Slack content** that mimics a
  real corporate brand's design language.
- **No "boss screams at junior"** framing — punch up, never
  down.

See `brands/brand-b-corpsatire/qa/satire-rules.md` and
`brands/brand-b-corpsatire/qa/defamation.md`.

**Channels.**
- **Primary** — TikTok (manual posting; cadence ceiling 3-5
  clips/week).
- **Secondary** — Instagram Reels (mirror).
- Blog as archive only.

**Monetisation in year one.** None. Audience-only. Optional
print-on-demand merch only after ≥ 10,000 followers and a
recognisable repeatable bit. Inbound sponsorship inquiries
considered case-by-case after ≥ 2 inquiries.

**AI disclosure.** Satire variant (per
`docs/18-disclosure-templates.md` §3). Disclosure appears in
the first 3 seconds of every clip and in every still / cover
frame's end-card.

**Kill / hold / scale.**
- Kill if no clip exceeds 5,000 views by week 6 AND no
  follower acceleration (> 50/week sustained).
- Hold on mixed signal with no platform strikes and low
  operational burden.
- Scale candidate: ≥ 10,000 followers, a recognisable
  repeatable bit, ≥ 2 inbound sponsorship inquiries.

## Brand C — UK Cost-of-Living (highest compliance gate)

**Working title:** TBD. "Escape the Bill" / "Cost of Living,
UK" / "Spreadsheet & Run". Re-validate domain + trademark
before lock.

**Why this niche.** Strong emotional relevance, evergreen plus
quarterly news pegs (Ofgem cap, Budget, Spring Statement), and
a defensible position on *trust* if the brand is transparent
about FCA scope limits.

**Audience.** UK working adults 25–50, feeling squeezed by
energy / housing / supermarkets. Reddit-adjacent,
MoneySavingExpert-adjacent. Some audience members are
**vulnerable readers** (in debt, facing eviction, on
benefits, mental-health-aware).

**Voice anchor.**
`brands/brand-c-ukescape/voice.md`. Calm, specific, sceptical
of easy answers, generous with sources. Anti-voice §5: no "you
deserve" framing, no emojis in body copy, no exclamation marks,
no "act now" / "before it's too late", no fake savings claims.

**The compliance gates (binding).**
- **FCA disclaimer block on every money-touching page** —
  effectively every Brand C page. Canonical copy in
  `brands/brand-c-ukescape/qa/fca-perimeter.md` §3.
- **Information only. Never financial advice.** No
  personalised recommendations.
- **Vulnerable-reader handling**
  (`brands/brand-c-ukescape/qa/vulnerable-reader.md`): on any
  page where `vulnerable_reader_topic: true`, a charity-link
  block (MoneyHelper / Citizens Advice / StepChange / National
  Debtline) renders **at the top of the body**, before any
  content. **No affiliate link appears above this block.**
- **Forbidden monetisation surfaces** entirely at MVP:
  investment, consumer credit, mortgages, BNPL, crypto,
  insurance, claims-management.
- **Allowed monetisation** (only at Stage 3+): energy switching
  via FCA-authorised platforms, cashback / lifestyle
  programmes, lead-gen in non-regulated verticals.
- **Sensitive verticals avoided entirely at MVP:** pensions,
  mortgages, claims-management.

**Three sequential human QA gates** per
`brands/brand-c-ukescape/README.md`:
1. Voice-fidelity check.
2. Brand C QA checklist.
3. FCA 3-line check.

**Channels.**
- **Primary** — SEO blog (high-intent UK financial queries).
- **Secondary** — Reddit (manual, comment-first; never
  drive-by linking).
- **Experimental** — YouTube longform as a month-2+ experiment.

**Publishing posture.** Brand C does **not** publish until a
dedicated launch checklist (mirroring Brand A's) ships in a
future scoped PR. This is the only repo-side blocker to Brand
C's first piece.

## Expansion gates (binding)

From `docs/portfolio-expansion-gate.md`. Until Brand A passes
its day-30 post-launch review, **Brand B and Brand C remain in
planning**. No emotional override.

### Brand A required state (before B or C is even considered)

All of:
- 30 days of clean Tier 2 publishing.
- ≥ 1 cornerstone live with ≥ 100 organic sessions.
- ≥ 25 newsletter subscribers.
- No platform strikes.
- No paid-line creep outside the 5-step gate.
- Brand A weekly review running on cadence with no missed
  weeks.
- Decision log up to date.
- Operator hours actually spent ≤ 10 / week on Brand A.

### Brand B unfreeze (§3 of the expansion gate doc)

All of:
- Brand A required state passing.
- A named operator-owned persona (for read-aloud QA).
- A clip-production loop documented (≤ 90 min per clip).
- Defamation gate audited; first three scripts pre-cleared.
- A platform-strike rollback drill walked through.
- Operator confirms it has the bandwidth for a second active
  brand without reducing Brand A cadence.
- The first three scripts live in `brands/brand-b-corpsatire/templates/_draft-template`
  with QA stamped.

### Brand C unfreeze (§4 of the expansion gate doc)

All of Brand B's gate, plus:
- The Brand C launch checklist (mirroring Brand A) shipped as a
  scoped PR.
- The FCA perimeter doc revalidated within the last 90 days.
- The vulnerable-reader gate audited; charity-link-at-top
  components implemented.
- The affiliate-redlines doc revalidated; forbidden surfaces
  re-confirmed against current FCA scope.

## Why Brand A first, not all three

- **Operator bandwidth** is the binding constraint, not
  audience demand.
- Brand A is the **lowest-risk launch surface**: low legal
  sensitivity, durable SEO query space, monetisation density.
- Brand A is the **test of the operating system**. If Brand A
  can't run on the lab's machinery, B and C definitely can't.
- Brand B requires **video production cadence** the operator
  has not yet validated; B is gated on Brand A proving the
  system.
- Brand C requires **higher-stakes compliance work** the
  operator should not load until Brand A is steady.

## Decision-log artefacts

The strategic choices behind the portfolio shape are logged in
`docs/15-decision-log.md`, including:
- Brand A first (vs. parallel launch).
- Three-brand cap at MVP.
- Brand B no-real-likeness / no-real-logo rule.
- Brand C information-only posture.
- Vulnerable-reader charity-block-at-top component.
- AI disclosure variants per brand.

## Cross-references

- `docs/portfolio-expansion-gate.md` — binding launch criteria.
- `docs/PROJECTHYDRA-MASTER-PLAN.md` §5.3 — niche rubric.
- `docs/PROJECTHYDRA-MASTER-PLAN.md` Appendix A — pilot scores.
- `brands/brand-a-aiescape/` — Brand A pipeline.
- `brands/brand-b-corpsatire/qa/satire-rules.md` and `qa/defamation.md`.
- `brands/brand-c-ukescape/qa/fca-perimeter.md`,
  `qa/vulnerable-reader.md`, `qa/affiliate-redlines.md`.
- `docs/voice-authenticity-system.md` — per-brand voice spec.
- `docs/18-disclosure-templates.md` — disclosure copy (never
  paraphrase).
