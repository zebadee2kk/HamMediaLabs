# Brand A — AI Escape · site

Instance of the Astro brand-site template (`brands/templates/site/`)
for Brand A (AI Escape).

## Quick start

```bash
cd brands/brand-a-aiescape/site
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # serves dist/
```

## What's in this folder

Everything from `brands/templates/site/`, with brand identity in
`src/site.config.ts`:

- `/` home — brand tagline + placeholder latest-piece block + a
  newsletter-slot placeholder (operator replaces with the
  Buttondown opt-in iframe at launch).
- `/about` — placeholder; real bio in the launch pack.
- `/ai-use` — informational AI-use disclosure
  (`docs/18-disclosure-templates.md` §3).
- `/affiliate-disclosure` — empty programmes list at launch
  (`affiliateInPlay: false`).
- `/privacy` — operator name + address (placeholders today; real
  values before launch).
- `/terms` — UK English & Wales governing-law default.
- `/contact` — operator email.

## Deploying to Cloudflare Pages

1. Create a Cloudflare Pages project; connect the repo; set the
   build directory to `brands/brand-a-aiescape/site`.
2. Build command: `npm install && npm run build`.
3. Output directory: `dist`.
4. Environment variables (Production):
   - `BRAND_SITE_URL` — final hostname (e.g. `https://aiescape.example`).
   - **No** `PUBLIC_*` env vars. No service-role keys. No
     analytics keys (analytics is Cloudflare Web Analytics —
     enabled in the Pages project UI, not via env).
5. Deploy.
6. Custom domain (optional): attach in Cloudflare Pages →
   Custom domains. DNS via Cloudflare Registrar.
7. Cloudflare Access **only** for a private launch; public
   launches do not gate.

## Free-tier discipline

This site lives within the £0 standing-cost band described in
`docs/cost-control-and-free-tier-plan.md` §1. The only paid lines
on the brand are:

- Domain (£~1/mo amortised) — operator-funded at launch per
  `docs/cost-control-and-free-tier-plan.md` §4.1.
- Optional 1Password share (lab-wide; already in lab cost).

The site does **not** add any other paid line at launch.

## Launch path

The site doesn't ship a cornerstone in this PR. The first
cornerstone (`brands/brand-a-aiescape/drafts/01-free-tier-ai-stack.md`)
is moved to `posts/` here at launch day per
`launch-packs/brand-a-mvp/08-launch-day-script.md`.

Until then, this folder renders the brand identity + compliance
pages only.

## Pre-launch checklist (per the launch pack)

- [ ] `src/site.config.ts` placeholders replaced with real values
      (operator name, operator email, operator postal address,
      `lastReviewedISO`).
- [ ] Brand domain registered + DNS records set in Cloudflare
      (or operator deliberately launches on a `pages.dev`
      subdomain per `04-technical-launch-pack.md` §3).
- [ ] Cloudflare Pages project created.
- [ ] No `PUBLIC_*` env vars on the project.
- [ ] All six compliance pages render on the live URL with the
      AI-use disclosure block visible.
- [ ] `npm run build` green locally + on Cloudflare Pages.

## What this site does NOT do (per `launch-packs/brand-a-mvp/`)

- No client-side data fetch.
- No `client:*` directives.
- No third-party trackers.
- No affiliate links at launch.
- No display ads.
- No popups / modals / exit-intent / scroll-triggered overlays.

## Cross-references

- `launch-packs/brand-a-mvp/` — operator runbook for the actual
  launch.
- `brands/brand-a-aiescape/profile.md` — brand profile.
- `brands/brand-a-aiescape/launch-checklist.md` — go/no-go.
- `brands/brand-a-aiescape/publish-workflow.md` — Tier-2 publish
  flow.
- `brands/templates/site/` — the template this site instantiates.
- `docs/astro-security-upgrade-plan.md` — version pin rationale.
