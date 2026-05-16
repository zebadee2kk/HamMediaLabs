# Brand A — Affiliate disclosure (operational notes)

> Canonical templates live in `docs/18-disclosure-templates.md`. This file
> covers Brand A specifics and the placement rules a writer must internalise.

## Frontmatter switch

If a piece has any affiliate link, the YAML frontmatter must declare:

```yaml
affiliate_in_play: true
```

If `affiliate_in_play` is `false` but an affiliate link is added during the
draft pass, the writer flips the flag at the same commit. QA blocks the
piece otherwise.

## Placement rules (binding)

1. **Site-wide footer block** is rendered automatically on Brand A's Astro
   site (see `brands/templates/site/`). The writer does not duplicate it.
2. **First-link inline disclosure** — Brand A pieces must include the
   "This article contains affiliate links…" block (from
   `docs/18-disclosure-templates.md` §2) **above** the first affiliate
   link in the body. Plain language, no fine print, no collapsed
   `<details>`.
3. **Tables of affiliate products** — the table itself must carry an
   inline note "Affiliate links — we may earn a commission." inside the
   table caption or the header row.
4. **Social mirror posts** (X, YouTube Shorts) — `#ad` in the post body
   (not the bio), per `docs/18-disclosure-templates.md` §4.

## What Brand A does not link to

- Investment, credit, mortgage, BNPL, crypto, insurance products. Those
  are Brand C territory and tightly scoped there too (FCA constraints).
- Tools the writer has not used or vetted against the editorial standard.
- Programs whose required disclosure wording we can't meet without
  changing this template (re-read every program's ToS at signup).

## Audit trail

- Every active programme is listed in the brand site's
  `/affiliate-disclosure` page (per the template under
  `brands/templates/site/src/pages/affiliate-disclosure.astro`).
- When we add a programme: edit that page first, then the piece.
- When we remove a programme: edit that page first, then sweep open
  drafts for orphan links.

## Common reviewer mistakes

- Putting the disclosure block at the bottom. Doesn't count.
- Wrapping the disclosure in `<small>` or muted colour. Doesn't count.
- Relying on the footer-only disclosure when an affiliate link appears
  in the body. Doesn't count.
- Using the same first-link disclosure twice in one piece. Once is the
  rule; place it before the *first* affiliate link.
