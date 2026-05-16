# 06 — Distribution Plan

> What distribution is allowed at MVP. Where the link goes. What
> automation is forbidden.

---

## 1. Owned surfaces (canonical)

| Surface | Status at launch |
|---|---|
| Brand A site | Canonical home for the piece |
| Newsletter (Buttondown free) | Active; first send is the announcement issue |

These are the only **owned** distribution surfaces at MVP. They
are where the link actually lives.

## 2. Operator-managed surfaces (manual)

### 2.1 X (operator's persona or Brand A handle if pre-created)

- **Single launch tweet** by the operator, plain language, no URL
  in the body (per `docs/x-platform-risk.md` §4).
- **First reply** by the same account carries the cornerstone URL.
- **Subsequent thread posts** are optional and only if the bit
  warrants 2–3 follow-up posts.
- **Cadence ceiling for Brand A on X:** ≤7 posts/week (`docs/x-platform-risk.md` §7);
  launch day uses 1 of that allowance.
- **AI-assist disclosure** in the launch tweet body if the tweet
  copy was AI-augmented (it was — `ℹ️ AI-assisted, human-edited.`
  on its own line).
- **No `#ad`** because the piece is not commercial at launch
  (`affiliate_in_play: false`).
- No autoposting. No autoreply. No DM automation.

### 2.2 Reddit (operator's persona account, comment-first)

- **No drive-by post** on launch day. Period.
- **Comment-first discipline** continues (per
  `brands/brand-a-aiescape/profile.md` §Compliance posture).
- If a relevant question lands organically in a subreddit the
  operator is part of, the operator may reply with the URL **only
  if the reply is substantively useful without the link**.
- Subreddit rules read first, every time.

### 2.3 YouTube Shorts / TikTok / Instagram

- Not used for Brand A at MVP.
- Brand A's YouTube Shorts experiment is queued for month 2
  (`brands/brand-a-aiescape/profile.md`); not today.

## 3. Newsletter

- **One announcement issue** sent on launch day or +1 day,
  whichever feels right.
- Subject line: plain, no exclamation marks. Examples from the
  voice template ("How I run my free-tier AI stack" / "What I
  actually run, on a Tuesday").
- Body: 150–200 words. One CTA (read the cornerstone).
- Sign-off: operator's real name.
- AI-assist disclosure line at the bottom: "AI-assisted draft,
  human-edited."
- Operator postal address in the footer (per CAN-SPAM compliance
  in `docs/18-disclosure-templates.md` §5).

## 4. Search

- Site is **indexable** at launch. `robots.txt` allows main
  crawlers.
- We do **not** submit to Google Search Console manually on
  launch day; the site is auto-discoverable. Console signup is a
  follow-up task in the first weekly review.
- AI search engines (Perplexity / ChatGPT search) are not
  notified; they will discover us organically.

## 5. What we explicitly do NOT do at launch

- **No paid distribution.** No boosts, no ads, no sponsored
  placements.
- **No outbound DMs.** "Hey check out my new piece" → no.
- **No swap-tweet schemes** with other newsletters.
- **No "go-engage-with-me" pleas** to friends.
- **No syndication** to Medium / Substack / Dev.to on launch
  day. (Cross-posting is allowed later under `docs/seo-moat-plan.md` §11
  parasite-SEO rules — rel-canonical, 1–2 weeks later, shorter
  or differently framed.)
- **No public posting** to subreddits.
- **No cross-brand mention.** Brand B and Brand C are not
  referenced from any launch communication.

## 6. Launch-day automation status

Zero. Every post / send is operator action, in the operator's
own UI on each platform.

## 7. The launch-day social copy plan

The operator pre-drafts (with AI assist where helpful):

- **X launch tweet** — 1 tweet body + 1 first-reply body.
- **Newsletter** — subject line + ~180 words.

These are drafted **the day before launch**, reviewed against the
voice doc, and stored in the operator's notes. On launch day the
operator copies and pastes; no on-the-fly drafting.

## 8. After launch (rolling 30 days)

- Week 1: amplify naturally. No paid effort. No outbound asks.
- Week 2: reply to inbound where it lands. Avoid initiating
  conversations on the cornerstone topic via DM.
- Week 3: cross-post to Medium / Substack / Dev.to with
  rel-canonical (per `docs/seo-moat-plan.md` §11) **only if** the
  operator has the time and the cornerstone is showing returning-
  visitor signal.
- Week 4: include the cornerstone in the next weekly newsletter
  as a "read this if you missed it" reference; do not blast.

## 9. Cross-references

- `docs/x-platform-risk.md` — X rules (binding).
- `docs/seo-moat-plan.md` §11 — parasite-SEO discipline.
- `docs/18-disclosure-templates.md` — disclosure copy (newsletter
  footer, AI-assist line, etc.).
- `brands/brand-a-aiescape/profile.md` — channel cadence.
- `brands/brand-a-aiescape/publish-workflow.md` §3 — 72h
  post-publish flow.
