# Source Intelligence — Governance & Implementation Plan

> Operationalises `docs/source-intelligence-plan.md` into a governed
> HamMediaLabs subsystem. Strategy doc = "what to collect and why";
> this doc = "how, with what controls, at what cost, and what to build
> first."
>
> **Status:** governance / planning. No live collection yet beyond
> manual operator notes. MVP backlog and follow-up issues at §8.
> **Owner:** Operator. Quarterly re-review.

---

## 1. Scope

The source-intelligence subsystem (`source-intel`) is the lab's
governed feed of platform signals: trends, questions, complaints,
hooks, competitor moves, keywords, format ideas, citations. It feeds
brand pipelines (`brands/<slug>/cornerstone-briefs.md`,
`prompts/01-outline.md`) and the weekly review.

It is **not** a scraping stack, **not** a posting engine, **not** a
mass-listening platform. The strategy plan calls out hard limits;
this doc enforces them with concrete controls.

## 2. Operating principles (binding)

Restated from `docs/source-intelligence-plan.md` and tightened:

1. **Official APIs first.** Manual / RSS / exports next. Scraping
   never, unless the platform's ToS explicitly permits the specific
   action.
2. **Manual-first where risky.** X, TikTok, Instagram, Reddit are
   manual-first today. API integrations require a separate scoped
   PR after a cost / quota / risk review (see §6).
3. **No personal-data harvesting.** We collect public, aggregated
   signal — not user identities, profile graphs, DMs, or contact info.
4. **Minimum useful signal.** Store the smallest record that supports
   editorial decisions. No dragnet retention.
5. **Directional data only.** Platform numbers are inputs to human
   judgement, never the final say.
6. **Human review before content decisions.** No model output
   automatically becomes a brief, an outline, or a draft. Every
   source-intel artefact goes through an operator step.
7. **No back-posting from source-intel signals.** This subsystem reads;
   it does not write to any platform.
8. **Disclosure-aware.** Any signal that ends up in a published piece
   carries the same factuality / disclosure obligations as everything
   else in HamMediaLabs (see `docs/18-disclosure-templates.md`).

## 3. Approved vs deferred collection methods

| Source | Approved today | Deferred (requires its own PR + risk review) | Forbidden |
|---|---|---|---|
| Google Trends | RSS feeds + manual UI capture | Paid trend APIs | — |
| YouTube | Manual research + Data API v3 low-volume (`videos.list` by known IDs; avoid `search.list` quota cost) | Bulk channel scans, comment ingestion at scale | Thumbnail / title cloning |
| Reddit | Manual subreddit reading + curated lists; old `.json` endpoints for known threads where TOS allows | Comment ingestion at scale, scraping new submissions | Mass account creation, vote manipulation |
| X (Twitter) | **Manual review only.** Curated lists, browser bookmarks, small-volume API tests via official paid tier only if explicitly justified. Governed by `docs/x-platform-risk.md`. | Paid API beyond the smallest tier | Any scraping; any auto-reply; any deepfake / impersonation signal collection |
| Instagram / TikTok | **Manual review only.** | Official content-creator APIs once approved by the operator with a written scope | Any scraping; any auto-engagement |
| News & web search | Manual research; primary sources preferred; search APIs only if ROI justifies | Paid SEO tools (Ahrefs, Semrush) — separate procurement decision | — |
| RSS feeds (generic) | Yes — for trusted publishers and the operator's own curated set | — | Mass-subscribing to publications that prohibit redistribution |
| Operator manual notes | Yes — primary intake source | — | — |

When a row says "deferred", that pathway gets a Phase 6+ issue and a
written cost-quota-risk review before any code lands.

## 4. Data model — `source_signal`

Schema lives in `core/db/schema.sql`. The DDL there is the
authoritative source; this section documents the shape and intent.

```text
source_signal
  id           bigserial pk
  source       text   (youtube | x | reddit | google_trends | instagram | tiktok | manual | news_web | rss)
  brand        text   (aiescape | corpsatire | ukescape | lab-wide)
  captured_at  timestamptz default now()
  topic        text   short, operator-readable
  source_url   text   public URL or "manual"
  author_or_channel text
  raw_title    text   (truncated as needed)
  raw_text_excerpt text  (<=500 chars; never full bodies)
  metric_snapshot jsonb (likes, views, comments, age — provider-specific)
  region       text
  language     text
  signal_type  text   (trend | question | complaint | hook | competitor | keyword | format | citation)
  confidence   text   (low | medium | high)
  risk_class   text   (low | medium | high)
  notes        text
  ingested_by  text   (operator | n8n | manual)
```

### Normalisation rules
- `source` and `signal_type` are short tokens (snake_case where
  multi-word).
- `metric_snapshot` is provider-shaped JSON; we do not try to flatten
  YouTube's `viewCount` and X's `impressions` into a shared field. The
  view layer aggregates if needed.
- `raw_text_excerpt` is truncated to ≤500 chars on ingest. We do not
  store full post bodies — that would be both a copyright concern and
  a needless data hoard.
- `risk_class` is the **collection** risk class, not the topic risk.
  Manual operator note → low. X paid-API call → medium. Reddit
  high-volume API draft → high (and likely deferred).

### Retention
- Default retention: 365 days from `captured_at`.
- High-volume sources (when they exist) can be downsampled or pruned
  more aggressively; that policy ships with each enable-PR.

### What `source_signal` is **not**
- It is not a copy of the platform. We store ids / URLs / titles /
  short excerpts — enough to recreate context, never the full content.
- It is not a feature-engineering layer for ML. We are humans making
  editorial calls.
- It is not a public dataset. The HQ DB is operator-only; same Tier-1
  posture as everything else in `core/db/schema.sql`.

### Dashboard alignment
- A future `v_source_daily` view aggregates by `source` × day for the
  dashboard. Not built in this PR — listed as a follow-up.
- Source-intel events do not write to `provider_event` or
  `agent_task`; those tables remain LLM-router telemetry.

## 5. Per-source governance (where each source needs more than the
strategy plan)

### 5.1 Google Trends
- **Cost:** free.
- **Method today:** RSS feeds (`/trends/trendingsearches/daily/rss?geo=GB`
  and `?geo=US`) consumed via n8n cron; one row per result.
- **Frequency:** daily.
- **Risk class:** low.
- **Watchouts:** Trends RSS is undocumented and can change. Treat its
  output as best-effort, not contractual.

### 5.2 YouTube Data API v3
- **Cost:** quota-based (10,000 units/day default; `search.list` is
  100 units per call, `videos.list` is 1).
- **Method today:** manual research only; API integration deferred to
  its own PR.
- **When integrated:** prefer `videos.list` by known IDs; never run
  unbounded `search.list`.
- **Risk class:** medium (quota / ToS).
- **Storage:** `metric_snapshot` carries `{viewCount, likeCount, commentCount, publishedAt}`.

### 5.3 Reddit
- **Cost:** OAuth API free at low volume; commercial use requires
  paid tier as of 2026.
- **Method today:** manual subreddit reading. Operator notes go in as
  `source = reddit`, `ingested_by = manual`, `source_url = thread URL`.
- **When integrated:** subreddit-scoped `new.json` polling, low rate
  (≤1 req/minute per subreddit), respecting `User-Agent` and the
  Reddit data API ToS as of the integration date.
- **Risk class:** medium.

### 5.4 X (Twitter)
- **Cost:** API tiers run from "Free" (very restricted) through paid
  tiers that are real money.
- **Method today:** **manual only**, governed by
  `docs/x-platform-risk.md` (treat X as hostile platform — even for
  reading-only operations on accounts we own).
- **When integrated:** small-volume reads only, never reads tied to
  posting from the same brand account session.
- **Risk class:** medium → high depending on volume.

### 5.5 Instagram / TikTok
- **Method today:** manual only. No automation of any kind.
- **Deferred:** content-creator-tier APIs only after operator review
  of TikTok / Meta developer terms at the time of integration.
- **Risk class:** high; deferred indefinitely until a clear ROI exists.

### 5.6 News & web search
- **Method today:** manual; cite primary sources directly in
  `content_asset.sources[]` (see Brand A draft template).
- **Search APIs:** Bing / Brave / Tavily evaluated only if a real
  pipeline needs them.

### 5.7 RSS (generic)
- **Method today:** operator's curated list, polled by n8n daily.
- **Risk class:** low.
- **Watchouts:** respect `<copyright>` and any explicit "do not
  redistribute" tags; we are reading, not republishing.

## 6. Manual-first vs API integration gate

Before any new source moves from "manual" to "API-integrated":

1. **Cost / quota review** with a written ceiling (£/month or units/day).
2. **ToS review** at the time of integration, recorded in the
   decision log.
3. **Risk class assigned** in `source_signal.risk_class`.
4. **Rate-limit governance** — provider-side limits respected with a
   safety margin; n8n / router are *not* allowed to retry on 429 in a
   tight loop (back off ≥10 minutes per provider, same posture as
   `docs/x-platform-risk.md`).
5. **Quarterly cost reconciliation** added to
   `playbooks/provider-revalidation.md` if non-zero.
6. **No autonomous content publication** from the new signal — the
   signal flows into briefs, never into drafts directly.
7. **Decision-log entry** captures the integration.

## 7. Storage, access, retention

- All `source_signal` rows live in the HQ Supabase project (same
  project as `brand` / `content_asset` / `provider_event`).
- Row Level Security stays default-deny; the service-role key
  (Tier 1 — `docs/09-security-and-secrets.md`) is the only write path.
- Retention: 365 days default, 90 days for `risk_class = 'high'`
  rows.
- No personal data: never store profile ids, usernames as identity
  graphs, contact info, DMs, or anything tied to a private account.
  Public-handle author names are acceptable (they appear on the
  source page already).
- Backups: the existing nightly Parquet-to-GitHub plan covers
  `source_signal` once it goes live.

## 8. MVP build plan (backlog — separate PRs)

The plan in `docs/source-intelligence-plan.md` §"First MVP" expanded
into a backlog. Each item lands as its own scoped PR.

| # | Item | Scope | Risk |
|---|---|---|---|
| M1 | `source_signal` schema in HQ DB | This PR | low |
| M2 | Manual signal-intake CLI command (`hml signal add …`) | Separate PR | low |
| M3 | n8n workflow: Google Trends RSS → `source_signal` insert | Separate PR | low |
| M4 | n8n workflow: YouTube `videos.list` by curated channel list → `source_signal` | Separate PR | medium |
| M5 | n8n workflow: Reddit subreddit `new.json` low-rate poll → `source_signal` | Separate PR | medium |
| M6 | Weekly source-intel report (n8n + email to operator) | Separate PR | low |
| M7 | Dashboard page: `source_signal` overview + per-brand filters | Separate PR | low |
| M8 | Quarterly source-quality review in `playbooks/provider-revalidation.md` | Separate PR | low |

Items M4 / M5 are gated on §6's manual-first → API-integration steps.

## 9. Cross-references

- `docs/source-intelligence-plan.md` — strategy.
- `docs/x-platform-risk.md` — binding for any X-related source work.
- `docs/10-legal-and-platform-risk.md` — lab-wide legal posture.
- `playbooks/provider-revalidation.md` — quarterly cost / quota review.
- `playbooks/source-intelligence-weekly.md` — weekly operator SOP.
- `core/db/schema.sql` — DDL for `source_signal`.
- `ARCHITECTURE.md` — module diagram + data flow.
- `prompt-library/general-secure-skeleton.md` — wrap any model call
  that processes a signal in this skeleton; signal bodies sit in the
  `DATA SECTION:` block to isolate prompt injection from third-party
  content.

## 10. What this PR does **not** do

- Implement any collection. The CLI, n8n workflows, and dashboard
  page are all backlog items M2–M7.
- Procure any paid API.
- Touch `provider_event` / `agent_task`.
- Start storing data — the schema is created idempotently and remains
  empty until the implementation PRs land.
