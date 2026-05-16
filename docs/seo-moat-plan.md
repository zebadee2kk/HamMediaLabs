# SEO, Topical Authority & Discoverability Moat Plan

> Governance and strategy. **Not a tactical SEO playbook.** The goal
> is to win discoverability without becoming generic SEO sludge.
> Brand A / B / C plug into this framework with concrete silos and
> linking strategies.
>
> **Posture:** quality, specificity, and topical depth beat volume.
> No programmatic content farms. No parasite SEO. No black-hat. EEAT
> as a design constraint, not a checkbox.

---

## 1. Why this exists

Search is a noisy lane in 2026: AI-generated content has flooded
mid-funnel SERPs, Google's Helpful Content updates keep punishing
generic writing, and answer engines (Perplexity, ChatGPT search,
Google's AI overview) increasingly intercept clicks. Brand-side
moats — domain trust, real author identity, topical authority,
genuine internal-link graphs — are now the difference between
ranking and not.

This document defines the architecture HamMediaLabs uses so each
brand can rank on durable advantages, not on tactics that will be
penalised in the next algorithm pass.

## 2. Core principles (binding)

1. **Topical depth before topical breadth.** A brand wins on one
   sub-niche fully before expanding.
2. **Author identity is real and consistent.** Every page carries
   a real human byline; the brand's "About" page names the
   operator.
3. **Original perspective on every piece.** If we wouldn't write
   this without the SEO motive, we don't write it.
4. **Internal-link graphs are dense within silos, sparse across
   them.** Brand A doesn't deeply link to Brand B even if a topic
   overlaps; cross-brand linking dilutes silo authority and
   confuses search intent.
5. **No keyword-only pages.** A page must be a real piece of
   writing — not an SEO landing page with no editorial value.
6. **Programmatic SEO is gated.** See §7.
7. **AI-assist disclosed.** Even when content is AI-augmented, the
   disclosure is structural — it doesn't hurt rankings and it
   builds trust.
8. **EEAT (Experience / Expertise / Authoritativeness /
   Trustworthiness) is a design input.** §8.

## 3. Brand silo structure

Each brand owns one **silo** — a tightly scoped topical area where
the brand intends to be the highest-quality source on the web.
Inside the silo, cornerstone pieces sit at the top of the
hierarchy; support pieces orbit each cornerstone.

### 3.1 Brand A — AI Escape

- **Silo:** Applied AI workflows for working professionals (no AI
  hype, no AGI think-pieces, no model-of-the-week).
- **Sub-silos** (3 max in year 1):
  1. **AI in software engineering** (PR review, refactors, codegen
     workflows).
  2. **AI in operator / lab work** (newsletters, content pipelines,
     research workflows).
  3. **Free-tier AI economics** (which models, which limits, what
     replaces what).
- **Out of silo (deliberately):** AI in design, AI in education,
  AI in medicine, AI agents marketplaces, AI safety discourse.

### 3.2 Brand B — Corporate Satire

- **Silo:** UK / tech-corporate-culture satire (video-first).
- **Sub-silos:**
  1. **Meeting / calendar culture** (recurring series anchors).
  2. **Consultant / framework satire** (Translations, The
     Framework).
  3. **Slack / async work satire** (Slack History).
- **SEO posture:** Brand B is **not SEO-led** — the silo exists
  primarily to organise YouTube Shorts / TikTok metadata and the
  brand-site archive page. Long-form SEO content is out of scope
  for Brand B at MVP.

### 3.3 Brand C — UK Financial Escape

- **Silo:** UK cost-of-living journalism + lifestyle-cost
  optimisation. Information-only — see `qa/fca-perimeter.md`.
- **Sub-silos:**
  1. **Energy** (price cap, switching, supplier mechanics).
  2. **Household-cost optimisation** (cashback, supermarket,
     broadband, mobile).
  3. **UK-escape narratives** (relocation cost / lifestyle
     mathematics, never as advice).
- **Out of silo:** investment commentary, mortgage advice,
  pension planning, debt-management product reviews, crypto.

### 3.4 Why no cross-brand interlinking

- Brand-A traffic about AI workflows reaching Brand-C's debt content
  via a link is confusing for both readers and search; intent
  doesn't match.
- Risk concentration: a single shared backlink graph means a
  ranking penalty on one silo affects the others.
- Editorial confusion: writers and editors operate against the
  brand voice; cross-references drift voice.

Exception: Brand A may *cite* a Brand C or Brand B piece as a
source if genuinely useful, with a normal external-style link. This
is not silo linking; it is sourcing.

## 4. Cornerstone vs support content model

Inside each sub-silo:

- **Cornerstone (1–2 per sub-silo at year-1 maturity):** 1,800–
  2,800 words, evergreen, the canonical resource on the sub-topic.
  Lives at a stable URL. Updated quarterly with dated retrieval
  notes.
- **Support pieces (5–10 per cornerstone):** 900–1,400 words each,
  more specific, link **to** the cornerstone and **between** related
  support pieces.
- **Quarterly news pegs:** time-stamped pieces (Ofgem cap
  announcement, model releases, regulator updates). Link to the
  cornerstone for evergreen context; cornerstone does not link to
  every news peg — only the canonical "latest" peg is linked.

Visual:

```
Cornerstone  ─┬─►  Support  ◄─┐
              ├─►  Support  ◄─┤
              └─►  Support  ◄─┘  (support pieces link to each
                                    other where genuinely useful)
                ▲
                │
           News peg (latest) — points up to cornerstone
```

Anti-patterns we explicitly do **not** do:

- Hub-and-spoke pages with no editorial body, only links.
- "Best X of YYYY" reshuffles that change nothing but the year.
- "Ultimate guide" pages that repeat the cornerstone with a
  re-arranged outline.

## 5. Internal-linking strategy

- **Anchor text** is the natural phrase a reader would expect, not
  the SEO target keyword. "How the energy price cap works" is fine;
  "energy price cap explained 2026" stuffed mid-paragraph is not.
- **Density** — within a silo, every cornerstone has ≥6 outgoing
  internal links and ≥4 incoming (over time, not at launch). Every
  support piece has ≥2 in / ≥3 out.
- **No reciprocal-only loops.** If two pieces only link to each
  other, the topical depth is shallow; expand or remove.
- **No "related posts" carousels** auto-generated from category
  tags. Curated end-of-piece blocks only.
- **Footer / sitemap links** carry the canonical site nav, not the
  silo graph. The silo graph lives in body copy.

## 6. Search intent mapping (per piece)

Every brief in `cornerstone-briefs.md` (and any sidebar brief)
declares one primary intent and one search-intent class:

| Intent class | What the reader wants | Brand A example | Brand C example |
|---|---|---|---|
| **Informational — definitional** | "What is X?" | "What is a router slot?" | "What is the energy price cap?" |
| **Informational — explanatory** | "How does X work?" | "How does free-tier routing work?" | "How does Breathing Space work?" |
| **Informational — comparison** | "X vs Y" | "Claude Code vs Cursor" | "Fixed vs SVT energy tariffs" |
| **Decision-aid** | "Should I X?" | "Should I switch coding agent?" | "Should I switch energy now?" |
| **Procedural** | "How do I X?" | "How to wire a router to Supabase" | "How to apply for Breathing Space" |
| **News-peg** | "What changed?" | "What changed in Gemini's free tier" | "What changed in the April 2026 cap" |
| **Narrative** | "What's it like to X?" | "Switching to Claude Code for 6 weeks" | "Leaving a London salary for the north" |

A piece serves one primary intent. Multi-intent pieces dilute and
rank for nothing.

## 7. Programmatic SEO boundaries

We don't generate hundreds of pages from a template-and-data
combination. The penalty-risk and content-quality calculus is
poor. But there is a narrow allowed band:

### Allowed (gated)
- **Quarterly news pegs** generated from a known datestamp +
  source (Ofgem cap announcement, FCA quarterly update). These are
  **human-edited** after a template-generated outline.
- **Cornerstone update pages** — the same cornerstone re-published
  on the same URL with the latest retrieval-dated numbers. Not a
  new URL.
- **Glossary / FAQ pages** — one per brand, hand-curated. Each
  entry is a real micro-piece, not a sentence.

### Forbidden
- "Best X in Y city" / "Best X for Z profession" matrices with no
  editorial body.
- "Best X of 2026 → Best X of 2027" re-spawn pages.
- Auto-generated SERP-targeting pages.
- AI-generated "review" pages with no operator-tested experience.
- Tag-page indexes treated as content (tag pages can exist for
  navigation; they don't carry editorial copy).

### Gate

If anything starts to look programmatic, the operator opens a
decision-log entry first, then ships. Defaults to "don't ship".

## 8. EEAT (Experience / Expertise / Authoritativeness / Trustworthiness)

EEAT is a design constraint. Every piece must demonstrate:

- **Experience.** First-person experience where applicable
  ("I switched", "I ran the test"). Composite anecdotes labelled
  honestly.
- **Expertise.** The persona owner is a real human with relevant
  background; bio page names that background.
- **Authoritativeness.** Cited primary UK / international sources;
  inbound links from genuinely independent sites accumulate over
  time (organic — never bought).
- **Trustworthiness.** Disclosure (AI use + affiliate where
  applicable) is structural; corrections are visible; the
  operator's contact information is real and answered.

### Mechanics we enforce

- **Real human byline.** No "by the editors" / no fictionalised
  staff lists.
- **/about** page on every brand site names the operator and
  links to one external trust signal (LinkedIn, a paper, a
  conference talk, anything real).
- **/contact** page works (the email is monitored).
- **Corrections.** Inline, dated, original wording preserved.
- **Author schema.org markup** on every article page (the brand
  template will add this in a follow-up engineering PR).

## 9. SERP volatility awareness

SERPs move. We design for resilience, not for the current
algorithm.

- **No tactic-of-the-quarter dependency.** If a piece only ranks
  because of a 2026-specific trick, it dies in the next update.
- **Quarterly traffic reviews:** brand-level traffic dispersion
  across cornerstones (Lorenz-curve sanity check — if 90% of
  traffic is on one piece, the moat is shallow).
- **No outsized investment in a single high-volatility query.**
- **Branded-search trend** is the truest signal — readers who
  search for the brand directly are voting with their fingers.
- **Backlink hygiene:** no link-buying, no PBNs, no link-exchange
  schemes. If a "guest post for backlinks" pitch arrives, it goes
  to spam.

## 10. AI-search / answer-engine discoverability

Answer engines (Perplexity, ChatGPT search, Google AI overview,
Bing Copilot) cite their sources. To be cited we need:

- **Clean source-of-truth pages.** Cornerstones with explicit
  claims, primary sources cited inline, and dates on every
  number.
- **Structured data.** `Article` + `Author` schema.org on every
  article; `FAQPage` schema on the brand-level FAQ.
- **`llms.txt` and `llms-full.txt`** on each brand site (planned
  follow-up engineering PR). These describe the site to crawlers
  in plain text.
- **Robots.txt clarity.** Allow normal crawlers; we will add
  AI-crawler-specific rules per `playbooks/provider-revalidation.md`
  as the landscape settles (e.g., GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended) — not blanket-blocking; case by case.
- **No JS-only rendering.** Astro static output already satisfies
  this; if a future engineering PR introduces hydration, the
  text must remain in the SSR HTML.

We do **not** chase answer-engine SEO with tactical tricks
(stuffed Q&A pages, "answer-engine-optimised" rewrites). The
moat is the same as everywhere else: real sources, real authors,
clear writing.

## 11. Parasite SEO — risk review

Parasite SEO publishes on someone else's high-authority domain
(Medium, LinkedIn Articles, Substack subdomains, Reddit posts
that rank). Two failure modes:

- **Platform-side:** the host changes its policy or rate limits;
  the content disappears.
- **Editorial-side:** we lose canonical-source positioning
  because the parasite copy ranks above the brand site.

### Policy

- **No parasite-first content strategy.** We do not write
  flagship cornerstones on third-party platforms.
- **Cross-posting OK with discipline:**
  - Brand site is the canonical URL (rel-canonical pointing to
    the brand site on any third-party copy).
  - Cross-post 1–2 weeks after the brand-site version, not
    same-day.
  - Cross-post is shorter or differently framed (no carbon
    copies).
- **Reddit:** comment-first, never drive-by-link. (See Brand A /
  Brand C READMEs.)
- **Medium / LinkedIn / Substack:** opportunistic only, with
  rel-canonical.
- **Forums / niche communities:** we participate as readers and
  commenters; we do not seed-post.

## 12. Per-brand SEO summaries (plug-in section)

### Brand A
- Silo: applied AI for working professionals. Sub-silos in §3.1.
- Cornerstones: 5 in `cornerstone-briefs.md`; cornerstones 1–3 in
  the first publishing loop (`first-three.md`).
- Internal-link density: hits §5 thresholds after support pieces
  build out across months 2–4.
- AI-search posture: cornerstone pages are the primary candidates
  for citation; structured data is in the engineering backlog.

### Brand B
- Not SEO-led. The brand-site silo exists for archive integrity
  and YouTube Shorts metadata.
- One canonical "About" page; everything else is video metadata.

### Brand C
- Silo: UK cost-of-living journalism (FCA-compliant scope per
  `brands/brand-c-ukescape/qa/fca-perimeter.md`).
- Cornerstones: per `cornerstone-briefs.md`.
- News-peg cadence quarterly with Ofgem announcements.
- Reddit secondary; comment-first only.
- EEAT especially important here — UK financial-content trust is
  the moat.

## 13. Implementation backlog (separate engineering PRs)

1. **Schema.org `Article` + `Author` markup** in `brands/templates/site/`.
2. **`llms.txt` / `llms-full.txt`** generation per brand site.
3. **Robots.txt** template with AI-crawler section (initially
   permissive; per-quarter review).
4. **Quarterly cornerstone-refresh** n8n workflow (operator
   reminder, not auto-edit).
5. **Branded-search trend tracker** — small dashboard surface
   reading `channel_event` filtered to `kind = 'impression'` on
   `channel = 'blog'` referrer = direct/branded.
6. **Cross-piece link audit** — quarterly script that flags
   cornerstones with <4 incoming internal links after 90 days.

## 14. Anti-patterns this plan prevents

- Cornerstone hoarding (writing 12 cornerstones, supporting none).
- Silo blur (Brand A linking to Brand B for a stylistic joke).
- Template-and-data content farming.
- Hub pages with no editorial body.
- "Updated for 2026 / 2027 / 2028" trick recycling.
- Reciprocal-only internal link loops.
- Buying links.
- "Guest post" schemes pretending to be journalism.
- Volatility chasing.
- Tactical answer-engine tricks.

## 15. Out of scope (per #35)

- Live SEO tool procurement (Ahrefs / Semrush / Sistrix — separate
  budget decision).
- Automated SEO spam in any form.
- A paid-link campaign of any kind.
- A "build links by writing for everyone" strategy.

## 16. Cross-references

- `docs/PROJECTHYDRA-MASTER-PLAN.md` §3 / §13 — strategy + KPI
  tree.
- `docs/measurement-framework.md` — how we measure SEO success
  (north-stars; CTR / mean position; brand-search trend).
- `docs/voice-authenticity-system.md` — the moat that compounds
  with topical authority.
- `brands/<slug>/README.md` and `cornerstone-briefs.md` — each
  brand's silo and cornerstone shape.
- `brands/brand-c-ukescape/qa/fca-perimeter.md` — the
  brand-specific scope discipline that constrains silo expansion.
- `playbooks/provider-revalidation.md` — quarterly review where
  AI-crawler policy is revisited.
