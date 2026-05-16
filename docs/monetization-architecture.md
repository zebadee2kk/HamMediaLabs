# Monetization Architecture, Trust & Commercial Readiness

> **Posture:** trust first, monetisation second. Build the
> architecture *before* the pressure to monetise distorts editorial.
> Every revenue surface in this doc is opt-in, governable, and has a
> named kill switch.
>
> Builds on `docs/11-monetization.md` (maturity model),
> `docs/business-plan.md` (revenue options per brand), and the
> brand-specific QA gates. Not legal advice — see
> `docs/legal-and-resilience.md` §10 for paid-legal-advice triggers.

---

## 1. Operating principles (binding)

1. **Trust before revenue.** A monetisation surface that erodes
   reader trust is killed even if profitable.
2. **No scammy funnels.** Definition: anything that misleads,
   pressures, or hides intent. See §10 for examples.
3. **No dark patterns.** Definition: UX that exploits cognitive
   bias against the reader's interest. See §10.
4. **Disclosure is structural, not negotiable.** Every commercial
   surface inherits `docs/18-disclosure-templates.md`.
5. **One channel at a time per brand.** A brand doesn't run
   affiliate + sponsorship + ads + paid products in parallel
   during validation. It graduates one surface at a time.
6. **Commercial pathways have kill switches.** Every surface
   carries a named, measurable condition that revokes it.
7. **Editorial holds veto over commercial.** Sponsor approves
   disclosure wording; sponsor does not approve the joke / the
   take / the recommendation.
8. **The owned audience is the strategic asset.** Email > all.

## 2. Revenue diversification map

The lab's revenue is **distributed across surfaces and brands** so
no single channel — or single brand — can take down the business.

| Surface | Owned-by | Replaceable? | Notes |
|---|---|---|---|
| Affiliate (Brand A, Brand C) | Programme operator | Yes (multiple programmes, FCA gates on Brand C) | First-link disclosure mandatory |
| Sponsorship (any brand) | The sponsor | No per-engagement, yes across the year | Inbound only at MVP |
| Digital products (Brand A) | The lab | n/a — we own this | Templates pack / prompt-library subscription |
| Newsletter monetisation | The lab | n/a | Sponsorship slots only when audience justifies |
| Lead-gen partnerships (Brand C non-regulated) | The partner | Yes | Same disclosure rules as affiliate |
| Display ads (Phase D only, if at all) | Ad network | Risk of brand-safety incidents | Off by default |
| Consulting funnel (Brand A operator) | Operator's own time | n/a | Cleanly separated; never marketed *as* the brand |

**Concentration rule:** no surface contributes >50% of a brand's
attributed monthly revenue for ≥2 months. If it does, diversify
or kill the dependency before the supplier moves.

## 3. Per-brand commercial pathway

### 3.1 Brand A — AI Escape

Pathway stages (sequential, never parallel-launched):

1. **Validation** (months 0–3): no monetisation surfaces.
2. **Capture** (months 3–6): newsletter + lead magnet (a single
   real, useful asset — not a tripwire). No affiliate yet.
3. **Affiliate go-live** (month 4+ if Stage 3 criteria met):
   beehiiv / Kit / Notion / 1Password / Voibe in order of fit.
   First-link disclosure block mandatory on every monetised piece.
4. **Digital product** (month 6+): one product, well-built. Sold
   from own site. Single CTA. Price clarity. No bundles, no
   FOMO copy.
5. **Newsletter sponsorship** (month 9+ if ≥1,000 engaged subs):
   inbound only; sponsor selection is editorial; one sponsor at a
   time.

Out of scope for Brand A monetisation:
- Display ads.
- Affiliate networks that don't permit our disclosure copy.
- Course / cohort businesses.
- Multi-tiered tripwire funnels.

### 3.2 Brand B — Corporate Satire

Pathway stages:

1. **Validation only** for Phases A–B. Revenue = £0 by design.
2. **Sponsorship (inbound)** at Phase C if audience signal is
   meaningful (≥10k followers, recognisable repeatable bit).
3. **Merch via print-on-demand** only after a catchphrase /
   character emerges; the lab is the seller, not the brand.

Out of scope for Brand B:
- Affiliate links.
- Sponsored content with regulated-product sponsors.
- Outbound sponsorship pitching.
- Display ads.

### 3.3 Brand C — UK Financial Escape

Constrained by `qa/fca-perimeter.md` (FCA scope) and
`qa/affiliate-redlines.md` (forbidden affiliates).

Pathway stages:

1. **Validation** (months 0–3): no monetisation.
2. **Capture** (months 3–6): newsletter; signups per piece is the
   north-star.
3. **FCA-compatible affiliates** (month 6+ if Stage 3 criteria met):
   energy comparison via FCA-authorised partner programmes;
   TopCashback / Quidco; supermarket / utility partners.
4. **Lead-gen partnerships** (month 9+): non-regulated verticals.

Out of scope (permanently at MVP):
- Investment / credit / mortgage / BNPL / crypto / insurance /
  claims-management affiliates.
- Sponsored content from regulated-finance brands.
- Display ads (revisit only at Year 2 Decide).

## 4. Affiliate model boundaries

### 4.1 What counts as an affiliate link

Any link where a click or purchase by the reader can earn the lab
a fee, commission, or credit — whether labelled "affiliate",
"referral", "partner", "associate", or any other word.

### 4.2 Onboarding (every new programme, no exceptions)

Per `brands/<slug>/qa/affiliate-disclosure.md` (Brand A) and
`brands/brand-c-ukescape/qa/affiliate-redlines.md` (Brand C):

1. Read the programme's ToS at the date of signup. Date the read.
2. Verify regulatory fit (FCA for Brand C; ASA/CAP universally).
3. Capture the programme's required disclosure wording.
4. Add to the brand site's `/affiliate-disclosure` page.
5. Decision-log entry: programme, owner, ceiling, kill trigger.
6. First piece carrying the programme runs full QA.

### 4.3 Placement (binding)

- **First-link inline disclosure** above the first affiliate link
  in every monetised piece. Plain language. Never `<details>`,
  never muted-grey, never below the link.
- **Tables of affiliate products** carry the inline disclosure in
  the table caption or header row.
- **Social mirrors** carry `#ad` in the post body (not bio).
- **Newsletter sends** carry a short reminder in the footer.

### 4.4 Editorial discipline

- Never recommend a product the operator has not personally used
  or vetted against the editorial standard.
- Never write a "best X of YYYY" listicle to farm affiliate clicks.
- Comparison content shows trade-offs visibly, not just upsides.
- If a sponsor's product appears in a comparison, our coverage is
  *neutral or critical* on its weaknesses, not soft-pedalled.

### 4.5 Kill switches

A programme is killed when **any** of:

- The programme changes terms in a way we don't accept.
- Reader complaints reveal the programme behaves badly post-click.
- The programme is rebranded into a regulated wrapper we can't
  promote.
- A monthly review finds the programme provides <£10 / month for
  >6 months AND adds operational burden — opportunity cost kill.

Kill steps follow the standard pattern: cancel, sweep orphan
links, update `/affiliate-disclosure`, decision-log.

## 5. Sponsorship acceptance rules

Sponsorship at MVP is **inbound only**. We do not chase.

### 5.1 Mandatory pre-acceptance checks

1. **Brand fit.** The sponsor's product / service is genuinely
   relevant to the brand's audience. Generic "we want to reach
   your audience" emails get a polite no.
2. **Sponsor legitimacy.** Real company. Real product. Real
   contactable representative.
3. **Regulatory check.** No regulated-finance sponsors on Brand C
   without FCA-authorised approval of the creative. No pharma /
   regulated wellness / gambling / weapons / political-campaign
   sponsors on any brand.
4. **Editorial integrity check.** The sponsor accepts editorial
   control stays with the brand. They approve disclosure wording;
   they don't approve the take.
5. **Disclosure agreement.** Written. Specifies `#ad` placement
   in body, AI-assist line, platform native toggles where used.
6. **Sample audience check.** Sponsor's stated target audience
   matches our audience reasonably well. If we're not the right
   audience, we say so and decline.

### 5.2 Hard noes

- Anything that would require us to make a financial promotion of
  a regulated product we are not authorised to promote.
- Anything that requires us to remove disclosure or weaken its
  placement.
- Anything that requires us to delete prior critical coverage of
  the sponsor.
- Anything time-pressured ("we need this live by Friday").
- Anything that requires editorial approval rights for the
  sponsor.

### 5.3 Frequency cap

- **One sponsor at a time per brand.** No back-to-back placements
  in adjacent issues / clips.
- **Two paid placements per month** ceiling at Phase C for any
  brand.
- **Zero sponsored placements** on debt / eviction / mental-health
  /vulnerable-reader topics, regardless of sponsor type.

### 5.4 Documentation

Every sponsorship engagement maintains:

- A signed sponsorship agreement.
- A copy of the disclosure wording used.
- A screenshot of the live post / clip / page showing the
  disclosure rendered.
- A decision-log entry naming the sponsor, dates, and kill
  trigger.

These live in the vault, not the repo.

## 6. Newsletter strategy

The newsletter is the **strategic asset**. It's the only audience
surface that survives any platform shock.

### 6.1 Per-brand newsletter shape

- **Brand A:** weekly. One useful piece per send. Light footer
  monetisation only (affiliate disclosure mention; no embedded
  ads at MVP).
- **Brand B:** no newsletter at MVP (video-first; the audience
  surface is the platform follower count). Re-evaluate at Phase C.
- **Brand C:** weekly digest of price-cap + cost-of-living tips.
  FCA disclaimer block in every issue; charity links footer.

### 6.2 List hygiene

- Opt-in only. Double opt-in where deliverability needs it.
- Unsubscribe link in every issue (legal floor).
- Quarterly cleanup: prune subscribers with zero opens in 90 days.
- Spam-complaint rate <0.1% (immediate review at any breach).

### 6.3 Monetisation ladder for the newsletter

1. **Phase A–B:** no embedded sponsorship; affiliate disclosure
   mention in footer only when affiliate links appear in linked
   articles.
2. **Phase C, ≥1,000 engaged subs:** one paid sponsorship slot
   per issue, capped to four issues / month aggregate across the
   portfolio. Same disclosure rules.
3. **Phase D, paid-newsletter tier:** held; only if a genuine
   paid product (templates pack / paid analysis) makes sense
   alongside a free tier.

### 6.4 What we never do with the list

- Sell or share the list. Ever.
- Send anything to subscribers that they didn't opt into.
- Cross-pollinate brand lists (a Brand A subscriber doesn't get
  Brand C without explicit opt-in).
- Use the list for "look at this affiliate, click click click"
  sends. The newsletter is content first.

## 7. Lead magnet strategy

A **lead magnet** is a free asset offered in exchange for a
newsletter signup.

### 7.1 The bar

- It's a **real, useful asset** the operator would have shipped
  even without the gating.
- It's narrowly scoped (not a 50-page ebook of fluff).
- It updates at least quarterly (or has a "last updated" stamp).
- It doesn't ladder into a tripwire / upsell sequence.

### 7.2 Per-brand candidates

- **Brand A:** a real prompt pack used by the operator. Free for
  newsletter signup; later sold as the paid product (the free
  one is a subset; not a paywall in disguise).
- **Brand B:** no lead magnet at MVP. Optional later: a downloadable
  "corporate bingo card" PDF.
- **Brand C:** "the spreadsheet" — a real personal-finance
  template the persona uses. Plain CSV / Google Sheet. Updated
  quarterly.

### 7.3 What we don't do

- "Get the secret" / "VIP access" / "members-only" framing.
- Email-required-to-read paywalls on existing public content.
- Drip sequences that send 10 emails over 14 days.
- Lookalike audiences sold to ad platforms.

## 8. Owned audience strategy

The owned audience = newsletter + brand site + direct contact.

### 8.1 Why owned matters

- Every other surface is rented (X / TikTok / Reddit / YouTube /
  search rank).
- Platform shocks can erase a brand's distribution overnight.
- Newsletter is the lab's only fully portable asset.

### 8.2 Concentration discipline

The lab tracks `owned_audience_share` per brand:

```
owned_audience_share = newsletter_subs / (newsletter_subs + sum(platform_followers))
```

Target: ≥30% within 6 months of brand launch. Below 20% sustained
is a Hold signal even if a platform surface is booming.

### 8.3 Hardening

- Brand site = canonical for every published piece. Always.
- Newsletter list export run quarterly; encrypted off-repo.
- Newsletter provider list survives a vendor change (export ↔
  import is well-supported across Buttondown / Beehiiv / Kit /
  Ghost).

## 9. Conversion architecture

What the reader → subscriber → buyer journey looks like.

### 9.1 The journey (per brand)

```
visitor ─► reader ─► returning reader ─► subscriber ─► engaged subscriber ─► buyer
              │            │                   │                                │
              │            │                   └─► amplifier (shares pieces, replies)
              │            └─► silent fan (returns, never converts; valid)
              └─► drop-off (one-time visit, fine)
```

We optimise for the **returning-reader → subscriber** step, because
it's the highest-leverage one and we own it.

### 9.2 CTAs

- **One primary CTA per page.** Either subscribe or buy, not both.
- Newsletter subscribe sits below the content fold; above the
  fold only on dedicated landing pages.
- "Read these next" links at the foot of every longform.
- No popups, no exit-intent modals, no scroll-triggered overlays.

### 9.3 Pricing surfaces (when a product exists)

- One price per product. No "regular price strikethrough" fake
  anchoring.
- No countdown timers.
- No "X people have bought this" social-proof badges unless the
  number is real, current, and meaningful.
- Refund policy stated next to the price; ≥30 day no-questions
  default.

## 10. Anti-patterns (binding bans)

### 10.1 Scammy funnels — banned

- Tripwire → upsell → downsell → bump → continuity programs.
- Webinar with mandatory pitch.
- "Free training" gated behind 6 emails before delivering anything.
- "Get the secret system" copy.
- "I made £X in Y days" curiosity-bait headlines.
- Fake "limited spots" with infinite spots.
- Fake "X people are watching" notifications.
- Manufactured testimonials.

### 10.2 Dark patterns — banned

- Pre-checked opt-in boxes.
- Subscribe / unsubscribe asymmetry (1 click in, 5 clicks out).
- Confirmshaming ("No thanks, I hate saving money").
- Roach motels (no clear cancel path).
- Auto-renew without warning.
- Hidden recurring charges.
- Fake notifications.
- Privacy-zuckering (data collection beyond stated purpose).
- Bait-and-switch pricing on checkout.

### 10.3 Editorial-corruption — banned

- Sponsor approval rights over editorial content.
- "Sponsored review" framing where the review is positive by
  contract.
- Removing critical prior coverage as a condition of a sponsorship.
- "Trade reviews" between brands.
- Buying / selling testimonials.
- Astroturfing.

## 11. Commercial kill switches (per surface)

Every surface has a kill condition. When any one fires, the surface
pauses and a decision-log entry is filed.

| Surface | Kill condition |
|---|---|
| Affiliate programme | Reader complaint reveals bad post-click behaviour, OR <£10/mo for 6 months, OR programme rebrands into a regulated wrapper we can't promote |
| Sponsorship | Sponsor breaches editorial control, OR sponsor's product turns out to harm readers, OR sponsor wants disclosure weakened |
| Newsletter sponsorship | Spam-complaint rate >0.1% for 2 consecutive sends, OR open rate drops >40% with a sponsored issue identified as the cause |
| Digital product | Refund rate >10% for 2 consecutive months, OR a buyer-quality issue surfaces |
| Lead magnet | Subscriber-quality drops (open rate of magnet-acquired cohort <40% in their first 4 sends) |
| Display ads (if ever live) | Single brand-safety incident |

## 12. Transparency rules (operator-facing)

Beyond legally-required disclosure (`docs/18-disclosure-templates.md`),
the lab voluntarily publishes:

- **Once a year (anonymised aggregate):** total lab revenue,
  total lab cost, top 3 revenue lines by surface. Operator
  decides phrasing; the publish-or-not is a choice.
- **Per-piece:** affiliate disclosure inline; AI-use label.
- **Per-corrections:** dated correction line above byline; original
  wording preserved.
- **Per-brand `/about`:** named operator; named persona owner;
  contact email; relevant background.

We **do not** publish per-piece revenue breakdowns; that's
operational noise that doesn't serve readers.

## 13. Brand trust vs monetisation tension map

Every commercial decision passes a tension check:

| Question | If yes → |
|---|---|
| Does this surface erode the reader's trust in the brand if they saw it from the inside? | Kill the surface. |
| Could this surface convince a thoughtful reader that the brand is "just trying to sell me something"? | Re-design the placement or kill the surface. |
| Would this surface make the persona owner (`voice.md` §9) uncomfortable defending it aloud? | Kill the surface. |
| Does this surface require us to soften prior critical coverage? | Kill the surface. |

The bar is conservative on purpose. Trust is the slowest asset to
build and the fastest to lose.

## 14. Implementation backlog (separate scoped PRs)

These do **not** land in this PR.

1. Update `brands/templates/site/` `<Disclosure>` component to take
   a per-piece programme list (already supports the flag; needs the
   list view).
2. Update `brands/<slug>/qa/affiliate-disclosure.md` files with
   the §4.2 onboarding workflow if any drift is detected at QA.
3. Build a quarterly "monetisation review" surface on the
   dashboard (per-brand: surfaces live, revenue, complaint count).
4. Add a `monetisation_event` table to HQ if affiliate / sponsorship
   reporting becomes complex enough to need it.
5. Build the "owned-audience-share" widget on the dashboard.

## 15. Cross-references

- `docs/11-monetization.md` — the existing maturity model (Stage 1
  Validation → Stage 4 Scale).
- `docs/business-plan.md` — phase model (£0 / £50 / £250 / £1k).
- `docs/profit-model.md` — scenario P&L thresholds.
- `docs/cost-control-and-free-tier-plan.md` — paid-line approval
  gate the inverse of which is monetisation approval.
- `docs/18-disclosure-templates.md` — canonical disclosure copy.
- `docs/legal-and-resilience.md` §10 — paid-legal-advice triggers.
- `brands/brand-a-aiescape/qa/affiliate-disclosure.md` — Brand A
  affiliate placement rules.
- `brands/brand-c-ukescape/qa/fca-perimeter.md` — Brand C
  regulatory boundary.
- `brands/brand-c-ukescape/qa/affiliate-redlines.md` — Brand C
  forbidden / allowed list.
- `playbooks/kill-or-scale-review.md` — verdict consumers.
- `docs/measurement-framework.md` — the metrics that govern phase
  progression.

## 16. Out of scope (per #37)

- Building any funnel today.
- Procuring a paid ad system.
- Launching a paid product.
- Adopting a complex CRM.
- Affiliate aggregator integrations (Impact, ShareASale, etc.) —
  per-programme integrations only, on demand.
