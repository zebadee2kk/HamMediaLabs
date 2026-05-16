# Source Intelligence Plan

## Purpose
HamMediaLabs needs a governed source-intelligence layer that helps agents discover topics, validate demand, understand platform-native language, and measure early audience signals without drifting into risky scraping or spam automation.

This document defines what to collect from each source, how to collect it, and what not to do.

## Operating principles

1. Official APIs first.
2. Manual or export-based collection where APIs are costly or risky.
3. No scraping-first architecture.
4. No bypassing platform controls.
5. No personal-data harvesting.
6. Store only the minimum useful signal.
7. Treat platform data as directional, not truth.
8. Human review before content decisions.

## Core data model

Every source should produce normalized `source_signal` records:

- source: youtube | x | reddit | google_trends | instagram | tiktok | manual | news_web
- brand: aiescape | corporate-satire | uk-financial-escape | lab-wide
- captured_at
- topic
- source_url
- author_or_channel
- raw_title
- raw_text_excerpt
- metric_snapshot
- region
- language
- signal_type: trend | question | complaint | hook | competitor | keyword | format | citation
- confidence: low | medium | high
- risk_class: low | medium | high
- notes

## YouTube

### What we need
- Search demand around topics.
- Video titles and thumbnails that work in a niche.
- Creator/channel patterns.
- Comment pain points where available.
- Format ideas for Shorts and long-form.

### Collection method
- Use official YouTube Data API v3 for low-volume research.
- Prefer known channel/video lookups over broad search, because `search.list` is expensive in quota.
- Batch `videos.list` lookups by known IDs where possible.
- Track only IDs, titles, channel, publish date, description excerpt, view/like/comment counts, and topic tags.

### Planning notes
YouTube API calls consume quota units and `search.list` is quota-expensive. Treat YouTube as high-value but quota-controlled.

### Default posture
Use YouTube as a high-value but quota-controlled source.

### What not to do
- Do not scrape comments at scale.
- Do not clone thumbnails or titles.
- Do not rely on retired public Trending pages as a current data source.

## X

### What we need
- Real-time language.
- Hooks and controversy patterns.
- Reply dynamics.
- Thread structures.
- Brand A/Brand B social copy patterns.

### Collection method
- Treat X API as paid/risky.
- Use manual review, curated lists, browser bookmarks, and small-volume API tests only where justified.
- Track only topic, public URL, hook text, engagement snapshot, and why it matters.
- Place external links in replies for owned posts where policy and strategy allow.

### Default posture
Manual-first, low-volume, high-context intelligence.

### What not to do
- No automated engagement.
- No reply bots.
- No mass search/collection.
- No link-spam automation.

## Reddit

### What we need
- Real questions people ask.
- Complaints, pain points, objections.
- Language for Brand A and Brand C.
- Communities worth observing.
- Anti-hype reality checks.

### Collection method
- Official Reddit API where appropriate.
- Low-volume subreddit monitoring.
- Manual saved posts and weekly research exports.
- Store excerpts sparingly and link back to source.

### Default posture
Excellent qualitative signal, but use conservatively.

### What not to do
- No mass scraping.
- No auto-posting.
- No sockpuppet accounts.
- No community spam.

## Google Trends

### What we need
- Search demand direction.
- Rising topics.
- Region-specific interest.
- Seasonality.
- Keyword validation for SEO.

### Collection method
- Use Google Trends Trending Now RSS where available.
- Use manual Google Trends checks for candidate keywords.
- Treat unofficial APIs as fragile and not production-critical.
- Optionally evaluate paid trend APIs later if ROI justifies.

### Default posture
Primary trend discovery source, but cache snapshots locally.

### What not to do
- Do not build a brittle system around unofficial Google endpoints.
- Do not treat relative trend scores as absolute search volume.

## Instagram

### What we need
- Visual formats.
- Reel themes.
- Hashtag/topic clusters.
- Comment language.
- Brand B meme/style inspiration.

### Collection method
- Use Instagram Graph API only for owned Business/Creator account analytics and limited hashtag discovery.
- Manual review for trend boards.
- Track high-level format observations rather than bulk content.

### Default posture
Manual/owned-analytics first.

### What not to do
- No scraping-first Instagram system.
- No hashtag spam.
- No automated engagement.

## TikTok

### What we need
- Short-form formats.
- Audio/meme structures.
- Hook timing.
- Visual pacing.
- Brand B and Brand A Shorts/Reels ideas.

### Collection method
- Manual trend review.
- Creator Center / platform-native observation where available.
- TikTok API only after clear use case and compliance review.

### Default posture
Manual research board first.

### What not to do
- No automated posting until platform approval and governance.
- No scraping-first collection.
- No trend hijacking of sensitive topics.

## News and web search

### What we need
- Freshness validation.
- Source citations.
- Wider topic context.
- Emerging regulation or platform changes.

### Collection method
- Manual web research.
- Search APIs only if ROI justifies.
- Prioritize primary sources and official docs.

### Default posture
Use for fact-checking and citations, not bulk content mining.

## Proposed collection cadence

### Daily
- Google Trends RSS / Trending Now snapshot.
- Manual X/Reddit quick scan for Brand A and Brand B.

### Weekly
- YouTube search/channel sample.
- Reddit subreddit review.
- Instagram/TikTok format review.
- Update source-signal backlog.

### Monthly
- Review platform API costs and limits.
- Review source quality.
- Prune low-value sources.

## Source ranking

### Tier 1: Primary/official
- Platform APIs
- Official docs
- Google Trends UI/RSS
- YouTube Data API

### Tier 2: Public qualitative
- Reddit posts/comments
- Public X posts
- Public YouTube comments
- Public creator examples

### Tier 3: Derived/third-party
- SEO tools
- Trend APIs
- Social listening tools
- Scraper vendors

Tier 3 sources require cost/risk review before adoption.

## Governance gates

Manual review required before:
- Connecting paid APIs.
- Storing user-generated content at scale.
- Posting back to any platform.
- Using social platform data in public claims.
- Building automation around X, Instagram, TikTok, or Reddit.

## First MVP

Build a `source-intelligence` module that supports:
1. Manual signal entry.
2. Google Trends RSS ingestion.
3. YouTube low-volume lookup.
4. Reddit low-volume subreddit scan.
5. Weekly report generation.

Everything else remains manual until reviewed.
