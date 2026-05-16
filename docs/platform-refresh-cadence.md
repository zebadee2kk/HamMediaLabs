# Platform Algorithm & Distribution Research — Refresh Cadence

> Prevent HamMediaLabs from becoming stale as platform mechanics
> evolve. **Quarterly** strategic-shift review, **monthly** sanity
> check. No daily trend chasing.
>
> Companion playbook: `playbooks/quarterly-platform-refresh.md`.
> Posture: governance-first; meaningful strategic shifts only.

---

## 1. Why

X, YouTube, TikTok, Instagram, Reddit, Google search, and AI-search
engines change constantly. Static assumptions decay. The
`docs/x-platform-risk.md` governance, `docs/seo-moat-plan.md` SEO
strategy, `docs/source-intelligence-governance.md` collection
methods, and the per-brand voice / cadence assumptions all reference
external platform realities that move.

We refresh those assumptions on a **fixed schedule** so the lab
doesn't operate on yesterday's mechanics. We don't chase every
update; we react to *meaningful strategic shifts*.

## 2. Cadence — three tiers

### 2.1 Daily (operator-scan, ≤5 minutes)

- Notice anything unusual on the active brand surfaces.
- Capture into source-intelligence `manual` notes if it's signal-
  shaped (per `docs/source-intelligence-governance.md`).
- **Do not** change documented assumptions on this signal alone.

### 2.2 Monthly (sanity check, ≤30 minutes)

Slotted into the monthly cost review. Walk:

- Are the cadence ceilings in `docs/x-platform-risk.md` §7 still
  matching observed platform behaviour?
- Has anything platform-side broken our existing flows?
- Have any platform incident triggers (`docs/x-platform-risk.md`
  §10) fired in the last 30 days?
- Are any provider quotas in `core/providers/quota-registry.ts`
  showing meaningful drift?

Outputs: a few notes; a decision-log entry only if something *needs*
to change before the quarterly refresh.

### 2.3 Quarterly (full refresh, ≤4 hours)

This is the canonical refresh — fired at the start of each calendar
quarter (Jan / Apr / Jul / Oct). Companion playbook:
`playbooks/quarterly-platform-refresh.md`.

It updates the documents in §4 and produces a single decision-log
"Q<N> <YYYY> platform refresh" entry summarising the deltas.

## 3. What we track per platform

For each surface, the quarterly refresh inspects the
*meaningful-strategic-shift* layer — not every algorithm tweak.

### 3.1 X (Twitter)

- Rate-limit reality vs `docs/x-platform-risk.md` §2 floors.
- Algorithm shifts that materially change link-placement payoff
  (the binding rule in §4 of that doc).
- Disclosure / `#ad` enforcement changes.
- API tier changes (relevant only to manual-vs-API decision in
  `docs/source-intelligence-governance.md` §5.4).
- Shadowban indicator drift (mean impressions baseline changing
  across the operator's accounts).

### 3.2 YouTube (Shorts + brand-account longform if any)

- CTR baseline shift.
- Watch-time / retention thresholds the algorithm rewards.
- Short-form vs long-form weighting (one or the other surfaces
  matter more depending on the quarter).
- Monetisation eligibility changes (only relevant if a brand
  approaches the threshold; not today).
- Search-in-YouTube relevance changes (matters for Brand A's
  YouTube Shorts experiments).

### 3.3 TikTok / Reels

- For-you-page mechanics for low-follower brand-new accounts.
- 0–3s retention baseline.
- Cross-posting penalties (Reels-on-TikTok and vice versa
  watermark detection).
- "Branded content" / "Paid partnership" enforcement (relevant
  for sponsorship per `docs/monetization-architecture.md` §5).

### 3.4 Reddit

- Subreddit rule shifts (anti-promotion enforcement on the
  subreddits Brand A / C interact with).
- API access changes (relevant to source-intel §5.3 in
  `docs/source-intelligence-governance.md`).
- Moderator culture shifts (a single mod change can flip a
  subreddit from welcoming to hostile).

### 3.5 Google search

- Helpful Content / Core Update activity in the quarter.
- SERP feature changes (AI Overview / AIO / featured snippets /
  knowledge panels).
- People-Also-Ask shape changes.
- Schema.org guidance updates.

### 3.6 AI search / answer engines

- ChatGPT search / Perplexity / Google AIO citation behaviour —
  are our cornerstones being cited? (Spot-check via direct queries.)
- AI-crawler policy moves (`docs/seo-moat-plan.md` §10): GPTBot,
  ClaudeBot, PerplexityBot, Google-Extended permissions revisited.
- New disclosure / labelling requirements (EU AI Act, FTC, ASA)
  that touch AI-search surfaces.

### 3.7 LLM provider mechanics (cross-ref)

- Free-tier ceiling changes (covered by the quarterly run of
  `playbooks/provider-revalidation.md` §6a). This refresh
  cross-references that work; it does not duplicate it.

## 4. Documents the refresh updates

The quarterly refresh produces deltas to (in priority order):

| Document | What may change |
|---|---|
| `docs/x-platform-risk.md` | Rate-limit floors (§2); cadence ceilings (§7); escalation triggers (§10) |
| `docs/seo-moat-plan.md` | AI-crawler policy (§10); programmatic-SEO allowed band (§7); search-intent classes (§6) |
| `docs/source-intelligence-governance.md` | Approved-vs-deferred collection methods (§3); per-source governance (§5) |
| `brands/<slug>/voice.md` | §5 anti-voice patterns where platform-native style shifts (e.g. a banned phrase emerges from algorithm trends) |
| `brands/<slug>/profile.md` | Cadence ceilings per primary / mirror surface |
| `brands/x-strategy-brand-playbooks.md` | Positioning notes where platform mechanics force a strategy update |
| `core/providers/quota-registry.ts` | Number drift (per `playbooks/provider-revalidation.md`) |
| `core/router/router.ts` `defaultPolicy` | Only on meaningful shift; this is a behaviour-changing edit and ships in a separate PR |

Updates land as **one PR per affected document family**, never
bundled. The decision-log entry references each PR.

## 5. The change threshold

A change ships only if **at least one** of:

- The shift materially affects a Brand A / B / C cadence,
  disclosure, link-placement, or monetisation surface.
- The shift fires (or makes more likely) a §10 escalation trigger
  on `docs/x-platform-risk.md`.
- A regulator update (EU AI Act, FTC, ASA, ICO, FCA) makes a
  current practice non-compliant.
- A free-tier number we depend on drops >30%.
- A platform's official policy page contradicts something we
  documented as policy.

Below this threshold: log the observation, do not edit governance.
Noise discipline is a feature.

## 6. Sources we trust for refresh inputs

In priority order:

1. **The platform's own announcements** (developer / policy blogs).
2. **Regulator publications** (Ofcom, FCA, ASA / CAP, FTC, ICO,
   European Commission).
3. **Primary engineering / industry reporting** with named
   journalists (Search Engine Land, The Verge, Bloomberg).
4. **First-hand operator data** from our own brand accounts.
5. **Reputable secondary roundups** as cross-check only.

Not trusted:
- Anonymous "leaks" without sourcing.
- LinkedIn / X "expert" threads.
- SEO industry rumour-aggregators.
- "Every algorithm secret revealed" content of any kind.

## 7. Anti-patterns this cadence prevents

- Trend-chasing pivots ("we should all be on Threads now").
- Algorithm-tactic rewrites every six weeks.
- Daily X-DM-style "the algorithm just changed" panic.
- Voice changes driven by what's currently viral.
- Disclosure relaxations driven by competitor behaviour.
- Quitting a platform on a single bad week.
- Doubling down on a platform on a single good week.

## 8. Refresh failure modes (what counts as "we missed it")

- A documented assumption is materially wrong AND we did not
  catch it in the last quarterly refresh — root cause review in
  the next refresh.
- A regulator update lands and we don't reflect it within 30 days
  (or sooner if compliance is urgent).
- A platform suspends a brand surface and the §10 escalation
  reveals our cadence ceilings were stale.

Failure modes go into `docs/15-decision-log.md` and are reviewed
the next refresh.

## 9. Per-brand impact summary

The refresh outputs a one-paragraph "impact on Brand A / B / C"
section in the decision-log entry, so each brand's pipeline knows
whether anything changed for them.

Typical brand impact:

- **Brand A:** SEO mechanics, X cadence, YouTube Shorts mechanics.
- **Brand B:** TikTok / Reels mechanics; X mirror mechanics; AI
  satire-content rule changes (EU AI Act updates).
- **Brand C:** SEO mechanics, FCA / ASA updates, Reddit subreddit
  rule shifts.

## 10. Cross-references

- `playbooks/quarterly-platform-refresh.md` — operator SOP that
  runs this cadence.
- `playbooks/provider-revalidation.md` — sibling cadence covering
  LLM / hosting provider quotas; same quarter, separate PR.
- `docs/x-platform-risk.md` — primary X-side governance updated
  by this cadence.
- `docs/seo-moat-plan.md` — search-side governance updated by
  this cadence.
- `docs/source-intelligence-governance.md` — what we collect and
  how.
- `docs/15-decision-log.md` — every refresh files a single summary
  entry plus per-document deltas.

## 11. Out of scope (per #36)

- Daily trend monitoring as a job.
- Full automation of platform-policy ingestion.
- Subscribing to paid platform-research services.
- Building a "platform-watch" dashboard surface unless the
  quarterly refresh repeatedly proves insufficient.
