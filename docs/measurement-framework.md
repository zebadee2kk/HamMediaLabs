# Measurement, Attribution, KPI & Experiment Framework

> The lab's operating measurement system. Extends — does not replace —
> the KPI tree and scoring formulas in `docs/PROJECTHYDRA-MASTER-PLAN.md`
> §13. Anchored against the per-brand cadence and disclosure rules
> already in place (Brand A: `brands/brand-a-aiescape/`; Brand B:
> `brands/brand-b-corpsatire/`; Brand C: forthcoming).
>
> **Posture:** governance first; no vanity metrics, no over-engineering
> before launch. Every metric in this doc must answer **"would I make
> a decision differently if I knew this number?"** If no, it's noise.

---

## 1. North-star metric per brand (the one number)

Each brand has exactly one north-star. Movement on the north-star is
the only thing that justifies sustained investment.

| Brand | North-star | Why |
|---|---|---|
| **Brand A — AI Escape** | Returning-visitor newsletter conversion rate (newsletter subscribers / 30-day unique visitors) | Captures both audience pull (visitors return) and trust (they want more). Beats raw pageviews; pageviews can be junk. |
| **Brand B — Corporate Satire** | Audience compound rate (new followers / week on the primary surface, smoothed 4-week) | The brand is validation-only at MVP; growth is the only signal that says "the bit lands". |
| **Brand C — UK Financial Escape** | Newsletter signups per published piece (per-piece signups / 30-day unique visitors to that piece) | Brand C is trust-led; signup is the willingness to receive ongoing information from us, which is the closest proxy to brand trust in the FCA-scoped surface. |

If a brand's north-star is flat or declining for 4 consecutive weeks
after the launch window, it's a `Hold` or `Kill` candidate per
`playbooks/kill-or-scale-review.md`.

## 2. Leading vs lagging metrics

We track **leading** indicators because lagging numbers don't move
fast enough to change decisions weekly. Lagging metrics are validation,
not steering.

### Brand A (blog + newsletter + X)
| Type | Metric |
|---|---|
| Leading | Newsletter open rate (≥30% floor), week-on-week pageviews on cornerstones, X mirror replies/post (engagement quality > engagement volume), returning-visitor rate |
| Lagging | Total subscribers, total monthly pageviews, search-visibility growth |

### Brand B (video + social)
| Type | Metric |
|---|---|
| Leading | First-3-second retention (TikTok / Shorts), watch-time-to-90% rate, comment quality (substantive vs emoji-only), follower-acquisition cost in operator-time |
| Lagging | Total followers, total impressions, viral-clip count |

### Brand C (blog + newsletter + Reddit comment-first)
| Type | Metric |
|---|---|
| Leading | Newsletter signups per piece, Reddit reply-thread quality (not karma), search impressions on price-cap / energy queries, dwell time on longform |
| Lagging | Total subscribers, total monthly pageviews, organic backlinks to the spreadsheet pieces |

## 3. Traffic source attribution

We do **not** install third-party tracking. Attribution is built from
deterministic signals only.

### 3.1 Channels we attribute

| Channel | Attribution signal | Tooling |
|---|---|---|
| Direct (returning + bookmarks) | No referrer; landing path = home / known slug | Plausible / CF Web Analytics |
| Search (organic) | Referrer host in known search engines | Plausible / CF Web Analytics |
| Newsletter | UTM tag on every newsletter link: `utm_source=newsletter&utm_campaign=YYYY-MM-DD` | Buttondown / Beehiiv link builder |
| X (organic + replies) | `utm_source=x&utm_campaign=<slug>&utm_medium=launch|reply|thread` | Manual UTM at post time |
| Reddit (comment-first) | `utm_source=reddit&utm_campaign=<slug>&utm_medium=comment` | Manual UTM at comment time |
| YouTube Shorts | `utm_source=youtube_shorts&utm_campaign=<slug>` | Manual UTM in pinned comment / description |
| TikTok | `utm_source=tiktok&utm_campaign=<slug>` (in bio link rotation) | Manual UTM in bio link |
| Instagram | `utm_source=instagram` (bio link); story sticker links if used | Manual UTM |
| Cross-brand (intentionally avoided at MVP) | n/a | n/a |

### 3.2 UTM conventions (binding)

- All UTM values are lowercase, kebab-case, no spaces.
- `utm_campaign` is always the **piece slug** (e.g. `free-tier-ai-stack`).
- `utm_source` is the **channel id**, not the platform display name.
- `utm_medium` is **why** the link appeared: `launch | reply | thread | comment | bio | story | newsletter | rss`.
- We do **not** put `utm_term` or `utm_content` on organic links; both are reserved for paid campaigns we are not running.
- Tags are stripped from canonical URLs on the brand site (the URL the reader copies has no UTMs). Astro middleware to strip on first hit is a follow-up engineering issue.

### 3.3 Attribution windows

- **Session attribution:** first-touch (the referrer/UTM at the start of the session) for analytics dashboards.
- **Conversion attribution (newsletter signup):** last-touch within 7 days. The newsletter provider records the source UTM.
- **Affiliate conversion (when affiliate goes live):** the affiliate program's reported attribution governs; we trust the program because we cannot independently verify.
- **No multi-touch attribution.** Premature for our volume; introduces noise.

## 4. Per-channel measurement mapping

### 4.1 SEO (Brand A, Brand C)

What to track weekly:
- Indexed page count.
- Top-10 / top-3 / position-1 query counts (from Google Search Console).
- Click-through rate per piece (CTR) and mean position per piece.
- Branded-term search volume (proxy: direct + branded-query traffic week-on-week).

What not to track:
- Domain Authority (third-party score, noisy).
- Vanity totals like "total impressions, ever".

### 4.2 X (Brand A primary mirror, Brand B mirror)

Per `docs/x-platform-risk.md` §3 we are wary of shadowban; track:
- Mean impressions per post (smoothed 7-day).
- Mean engagement-rate per post.
- 429 / rate-limit events on the brand account (manual log).
- WoW impression delta (>40% drop → escalation per §10).

### 4.3 Short-form video (Brand B primary, Brand A YouTube experiment)

- 0–3s view rate (proxy: hooked-rate).
- Average watch-time / duration (retention).
- Comment-to-view ratio (engagement quality).
- Follower-acquisition rate per published clip.

### 4.4 Reddit (Brand C secondary, manual)

- Substantive replies received on operator comments.
- Subreddit-rule incident count (target 0).
- Long-form blog click-through from operator comments (UTM-tagged).
- Karma trend on the operator's persona account (sanity check, not a target).

### 4.5 Newsletter (all brands)

- Open rate per send (≥30% floor; ≥40% on small lists).
- Click rate per send.
- Unsubscribe rate per send (red flag at >0.5%).
- Spam-complaint rate (red flag at any).
- Inbox-placement spot check (every 4 weeks).

## 5. Weekly experiment template

Every brand can run **one** experiment at a time. The template lives
in `playbooks/weekly-experiment.md`. Summary of the shape:

- Hypothesis (one sentence; falsifiable).
- Single variable changed (everything else held constant).
- Sample size + duration cap (≤14 days).
- Pre-registered success threshold and pre-registered failure threshold.
- Rollback trigger named (e.g. "kill if mean impressions drop >30% over 2 weeks" per `docs/x-platform-risk.md` §8.4).
- Decision filed in `docs/15-decision-log.md` whether the experiment promoted, held, or killed.

Experiments **may not** touch cadence ceilings, disclosure copy, or
link-placement policy — those are not levers, they are governance.

## 6. Content scorecard

Each piece carries a scorecard, derived from
`docs/PROJECTHYDRA-MASTER-PLAN.md` §13.2 and computed at the end of
its first 30 days.

```
content_score (0..1) =
   0.30 * reach        (normalised vs piece type ceiling)
 + 0.25 * engagement   (clicks + comments + shares / impressions)
 + 0.25 * conversion   (newsletter signups or downstream action / unique visitors)
 - 0.10 * production_cost (operator-hours scaled to [0,1])
 - 0.10 * risk         (disclosure incidents, factuality corrections, platform strikes)
```

Stored as a row per piece in HQ:

```
content_scorecard (planned table — see §9 follow-up)
  asset_id     bigint references content_asset(id)
  window_days  smallint    -- 30 default, 90 for re-score
  reach        numeric(5,4)
  engagement   numeric(5,4)
  conversion   numeric(5,4)
  prod_cost    numeric(5,4)
  risk         numeric(5,4)
  score        numeric(5,4)  -- computed
  computed_at  timestamptz default now()
```

`content_score < 0.30` for the rolling 30-day score → piece is moved
from "active rotation" to "evergreen archive" (we stop linking to it
from new pieces; it stays live).

## 7. Failure thresholds & kill criteria

Per `docs/PROJECTHYDRA-MASTER-PLAN.md` §13.2, plus tighter operational
thresholds:

### Per piece
- 30-day `content_score` <0.30 → retire from rotation (not killed).
- A single disclosure incident → piece pulled, fixed, republished with `Correction:` line per `brands/brand-a-aiescape/qa/factuality.md`.
- A single defamation flag found post-publish → piece pulled immediately; decision-log entry; root-cause review.

### Per brand
- North-star flat or declining 4 consecutive weeks after launch window → `Hold` review per `playbooks/kill-or-scale-review.md`.
- 2 consecutive weeks of `brand_score` <0.30 with no monetisation in flight → `Kill` candidate (`core/scoring/scoring.ts` `verdict()` already encodes this).
- A platform strike against the brand's primary surface → 7-day publishing pause + escalation per `docs/x-platform-risk.md` §10.

### Per channel
- 429 / rate-limit events sustained >2 weeks on a single account → channel-level pause; revisit `docs/x-platform-risk.md` §2 rate-limit assumptions.

## 8. Brand trust indicators (proxies, not vanity)

We do not buy or estimate "Domain Authority". Instead:

- **Returning-visitor rate** ≥30% (Brand A target) is the strongest single proxy.
- **Reader correspondence** (email replies, X DMs we have invited, comment threads) captured into the piece's `notes:` frontmatter.
- **Cited primary sources count** per piece (Brand A QA expects sources cited where contestable).
- **Correction frequency** — fewer is better, but visible corrections are a trust *positive*; opacity is a negative.
- **Newsletter unsubscribe rate** trend — a flat or falling unsub rate over a growing list is a strong signal.

## 9. Dashboard requirements for growth visibility (planned PR)

Today `dashboards/app/` shows portfolio totals, brand table, 14-day
provider health. The growth dashboard pages required by this framework:

| Page | Reads from | Status |
|---|---|---|
| Brand detail | `v_brand_weekly_stats` + filtered `content_event` | Planned (next dashboard PR) |
| Per-channel funnel | `channel_event` grouped by `channel + brand_id` | Planned |
| Content scorecard | `content_scorecard` (new table — §6) | Planned (after the table lands) |
| Weekly experiment status | `decision` filtered to `kind = 'other'` with a `meta.experiment_id` | Planned |
| North-star trend | computed per brand from `v_brand_weekly_stats` | Planned |

None of these are built in this PR; this section is the requirements
spec for the next dashboard PR.

## 10. Affiliate-conversion readiness (pre-monetisation)

Brand A and Brand C do not have affiliate links at launch. Before any
affiliate link goes live, the following must exist:

- A monthly review of `content_score` per piece (so we know what
  *deserves* a link).
- A documented disclosure template for the specific programme (per
  `docs/18-disclosure-templates.md` §7).
- A first-link-disclosure pattern enforced by `<Disclosure>` component
  on the brand site.
- An affiliate-programme entry in `brands/<slug>/qa/affiliate-disclosure.md`.
- A decision-log entry naming the launch date and the kill trigger
  for the programme.

The framework does not measure affiliate revenue itself until any of
the above is in place. Pre-launch: zeros are accurate.

## 11. Anti-vanity rules (binding)

- Numbers reported in the weekly review must be **decisional**. If
  the operator reads a metric and can't name the decision it changes,
  the metric is cut from the report.
- We do not chase month-on-month growth percentages without
  context — small absolute movements look huge on a small base.
- We do not compare ourselves to brands with a different shape (a
  newsletter with 10× our list size on a different niche is not a
  benchmark).
- "Going viral" is a *failure mode for measurement clarity*, not a
  goal. A spike obscures the weekly signal it took us four weeks
  to detect.

## 12. Implementation backlog (separate PRs)

Each item below is its own scoped PR.

1. `content_scorecard` table in `core/db/schema.sql` (idempotent CREATE).
2. UTM-strip middleware in `brands/templates/site/` so the canonical URL has no UTM noise.
3. Dashboard pages per §9 (brand detail, channel funnel, scorecard, experiment status, north-star trend).
4. `playbooks/weekly-experiment.md` — already in this PR as a sibling file.
5. n8n workflow to compute `content_scorecard` rows at piece +30 days.

## 13. Cross-references

- `docs/PROJECTHYDRA-MASTER-PLAN.md` §13 — KPI tree, scoring formulas, dashboard wireframe.
- `core/scoring/scoring.ts` — `brandScore`, `contentScore`, `verdict`.
- `core/db/schema.sql` — current telemetry shape (`content_event`, `channel_event`, `provider_event`, `agent_task`).
- `playbooks/weekly-review.md` — standing operator review.
- `playbooks/weekly-review-brand-a-launch.md` — 30-day launch supplement.
- `playbooks/kill-or-scale-review.md` — verdict gates that consume this framework's outputs.
- `docs/x-platform-risk.md` — channel-specific governance for X.

## 14. Out of scope (per #31)

- Paid-ads optimisation.
- Enterprise BI tooling.
- Third-party tracking pixels.
- Cross-brand multi-touch attribution.
- Vendor-specific SEO tools at this stage (re-evaluate after Brand A passes day-30 review).
