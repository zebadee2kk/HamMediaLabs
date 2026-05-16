# 00 — Launch Overview

> What is launching, what is not, and the explicit assumptions
> underneath both.

---

## What is launching

- The **Brand A brand site** (built from `brands/templates/site/`,
  pinned to Astro 4.x per `docs/astro-security-upgrade-plan.md`).
- The site's compliance pages: `/`, `/about`, `/privacy`, `/terms`,
  `/ai-use`, `/affiliate-disclosure`, `/contact`.
- **One** cornerstone piece (cornerstone 1 from
  `brands/brand-a-aiescape/first-three.md`,
  `drafts/01-free-tier-ai-stack.md`).
- The newsletter (Buttondown free) with an opt-in form on the
  brand site footer.

## What is **not** launching

- Affiliate links of any kind. `affiliateInPlay` stays `false` at
  launch.
- Sponsored content.
- A second cornerstone piece. Cornerstone 2 ships in week 2;
  cornerstone 3 in week 3 (per `first-three.md`).
- Brand B or Brand C. Both remain in `planning`.
- X autoposting. Distribution to X is manual operator action
  (per `docs/x-platform-risk.md`).
- A paid Cloudflare Pages plan; the free tier is enough.
- Display ads, retargeting pixels, third-party trackers.
- Cross-brand interlinking (per `docs/seo-moat-plan.md` §3.4).

## Launch assumptions

- Cloudflare Pages free tier is sufficient (verified at
  `docs/cost-control-and-free-tier-plan.md` §1).
- The operator has the Brand A domain registered (or is
  launching on a free Cloudflare Pages subdomain — see
  `04-technical-launch-pack.md`).
- The operator has set up the Buttondown free account.
- The operator has run `brands/brand-a-aiescape/launch-checklist.md`
  end-to-end. No box is unchecked.
- The operator is in a quiet workspace for the launch window.
- The day chosen is **not** a Friday (giving the post a weekday
  to settle).

## Known dependencies

- Astro 4.x for the brand site (the upgrade plan defers 4 → 6).
- Cloudflare Pages for hosting.
- GitHub for source.
- Buttondown for the newsletter.
- Plausible CE or Cloudflare Web Analytics for traffic (cookieless;
  per `04-technical-launch-pack.md`).
- The operator's vault for any credential needed during launch.

## Known risks

- A build error on launch day (see `07-risk-and-rollback.md`).
- The cornerstone piece needs a last-minute correction (see
  `03-content-launch-pack.md` and `playbooks/voice-fidelity-checklist.md`).
- A newsletter deliverability issue on the first send
  (see `05-measurement-and-review.md`).
- An X strike on the first launch reply (see
  `docs/x-platform-risk.md` §10).
- A credential incident during launch (see
  `playbooks/incident-credential.md`).

## What "successful launch" looks like

By the end of day 1:

- The site renders the cornerstone at its slug, with the AI-use
  disclosure block visible above the byline.
- The newsletter opt-in works (test signup).
- At least one human reader has visited the cornerstone (the
  operator).
- The cornerstone has been read aloud once on the live URL.
- The decision log carries a "Brand A launched" entry.

The above is the **operational** definition of success.
Traffic / engagement / subscribers come later; they're tracked in
`05-measurement-and-review.md`.

## What "blocked launch" looks like

If any of the following is true at the start of the launch script,
**stop**:

- Brand A `launch-checklist.md` has any unchecked box.
- `npm run build` fails on the brand site.
- A disclosure block doesn't render on the staging deploy.
- Any Tier-1 credential is in an unknown state.
- The operator has had <6 hours of sleep or is sick.

Blocked → reschedule. Document why in the decision log.
