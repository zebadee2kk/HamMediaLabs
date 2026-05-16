# Brand site template (Astro)

This is the canonical Astro starter every HamMediaLabs brand begins from.

## Use
1. `cp -R brands/templates/site brands/<slug>/site`
2. Edit `brands/<slug>/site/src/site.config.ts` with the brand's identity.
3. Run `npm install && npm run dev` from inside the brand's site folder.
4. Deploy to Cloudflare Pages, pointing the build to this folder.

## What you get
- Compliance pages out of the box: `/privacy`, `/terms`, `/ai-use`, `/affiliate-disclosure`, `/contact`, `/about`.
- A `<Disclosure />` component that mirrors `docs/18-disclosure-templates.md`.
- A `Base.astro` layout with the canonical footer block.

## Do not
- Hand-edit the compliance copy on a per-brand site. Edit the canonical templates
  in `docs/18-disclosure-templates.md` and re-render here.
- Add tracking cookies without updating `privacy.astro` and adding a banner.
