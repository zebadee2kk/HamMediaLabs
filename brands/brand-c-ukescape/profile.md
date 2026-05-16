# Brand C — UK Financial Escape (profile)

## Identity
- **Brand name:** *TBD* — working title "Escape the Bill" / "Cost of Living, UK" / "Spreadsheet & Run". Re-validate domain + trademark.
- **Niche:** UK cost-of-living journalism + lifestyle-cost optimisation + lived-experience escape narratives. **Not** financial advice.
- **Audience:** UK working adults 25–50, feeling squeezed by energy, housing, supermarkets; Reddit-adjacent, MoneySavingExpert-adjacent, looking for *narrative* alongside tactics.
- **Tone:** Calm, specific, sceptical of easy answers, generous with sources.
- **Core promise:** "Real numbers, real tactics, and what we'd actually do."

## Business hypothesis
- **Why this niche?** Strong emotional relevance, evergreen + quarterly news pegs (Ofgem cap, Budget, Spring Statement), and a defensible position on *trust* if the brand is transparent about FCA scope limits.
- **Monetisation path:**
  1. Energy comparison via FCA-authorised partner programmes (Uswitch / Compare the Market style).
  2. Lifestyle affiliates (cashback platforms, supermarket loyalty, broadband, mobile).
  3. Lead-gen partnerships in non-regulated verticals (broadband switching, e-bikes, etc.).
  4. **Not** investment, **not** consumer credit, **not** mortgages, **not** crypto.
- **Primary channel:** SEO blog.
- **Secondary channel:** Reddit (manual, comment-first; never drive-by linking).

## KPI baseline (90-day)
- **Traffic target:** 2,000 sessions/month by day 90 (lower than Brand A — query intent is more seasonal).
- **Engagement target:** ≥40% returning visitors after week 6; ≥1.6 pages/session.
- **Conversion target:** 80 newsletter subscribers by day 90.
- **Review window:** Weekly + quarterly news-peg reviews (Ofgem announcements, Budget/Spring Statement).

## Kill / hold / scale
- **Kill threshold:** BS < 0.30 for 2 consecutive weeks after week 6 AND failure to source any FCA-compatible affiliate path.
- **Hold threshold:** mixed signal, low cost.
- **Scale trigger:** BS ≥0.55 AND first £100 in commissions AND ≥1,000 newsletter subs.

## Operational
- **Parent account:** hammedialabs.master.
- **Brand child accounts:**
  - Editorial Gmail alias
  - Reddit account (operator's real persona, with disclosed affiliation in profile)
  - Newsletter list (Buttondown free)
  - Twitter/X *de-emphasised* (UK financial Twitter has a worse signal-to-noise than the Reddit and SEO channels)
- **CMS:** Astro static.
- **Providers:** Cloudflare Pages, Supabase HQ, Plausible.

## Tier path
- T2 (draft + manual publish) for weeks 1–6.
- T3 (publish-with-approval) candidate from week 6 if zero compliance incidents.
- T4: blocked all year (and longer for Brand C than the others).

## Compliance specifics (FCA + ICO)
- Every monetised piece passes the 3-line check: regulated product? authorised promoter? generic info vs. recommendation?
- Every page touching debt links to MoneyHelper, Citizens Advice, StepChange — **no commission**.
- Every page renders the FCA-aware disclaimer from `docs/18-disclosure-templates.md` §11.
- ICO/PECR: cookie banner posture is "essential cookies only" at MVP; if analytics or ads change that, banner + policy change first, ship second.

## Editorial content plan (first 90 days)
- 5 cornerstone pieces (see `cornerstone-briefs.md`) in weeks 1–4.
- 2 quarterly-news-peg pieces (Ofgem April announcement + July cap forecast).
- Weekly newsletter.
- Reddit: comment-first for 4 weeks, with ≥10 substantive comments before any post.

## Notes
- Trademark + domain re-check is **gating**. Several "Money…" names are already taken and contested.
- If the brand cannot find ≥2 FCA-compatible affiliate paths by day 60, **kill** rather than pivot to regulated content.
