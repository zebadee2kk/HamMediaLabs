# Brand A — Pre-Launch Implementation Audit

> **Date:** 2026-05-16.
> **Closes:** #71.
> **Scope:** `brands/brand-a-aiescape/site/` + `launch-packs/brand-a-mvp/`
> + `brands/templates/site/`. Cloudflare-Pages deployment assumptions.
> **Posture:** "Build-ready ≠ launch-ready" — verify the gap between
> governance docs and real deployment shape, fix what's small and
> safe, surface what needs operator action.

---

## 1. Executive summary

Brand A is **genuinely pre-launch-ready** after this PR. The audit
caught seven small implementation gaps that would not have been fatal
but would have shown up as rough edges in the live site. All seven
are fixed in this PR. No P0 / P1 issues found.

**Fixed in this PR:**

1. `public/robots.txt` (missing) — added.
2. `public/favicon.svg` (missing) — added (text-based "A" mark; Gemini design pack can replace later).
3. `public/sitemap.xml` (missing) — added static sitemap covering all 7 routes.
4. `404.astro` page (missing) — added a Brand-A-voice 404 with helpful redirection.
5. `<link rel="icon">` in `Base.astro` — added.
6. `og:type` + `twitter:card` meta — added.
7. CI per-folder Astro build verification — added a new `astro-builds` job that builds the dashboard + brand template + Brand A site on every PR and grep-asserts the disclosure block + grep-rejects secret-shaped strings in the rendered output.

**Surfaced for operator (not fixable from repo side):**

- Real operator name / email / postal address in `src/site.config.ts`
  (explicit "replace before launch" placeholders by design).
- Domain registration + Cloudflare DNS records.
- Buttondown account + opt-in form embed URL.
- Cloudflare Web Analytics enabled in the Pages project UI.
- Cornerstone moved from `drafts/` to `posts/` at launch.

## 2. What was audited

### 2.1 Technical surface

- File inventory of `brands/brand-a-aiescape/site/`.
- Compliance pages render + link integrity.
- AI-use disclosure placement on every page.
- `PUBLIC_*` / `process.env` leakage scan in `src/`.
- Robots / sitemap / llms.txt status.
- Favicon + social-preview metadata.
- Newsletter placeholder state.
- 404 / error-page coverage.
- Build reproducibility (clean `npm install && npm run build`).

### 2.2 Governance surface

- Launch pack ↔ site implementation match.
- Affiliate surface invisibility (`affiliateInPlay: false` enforced).
- "Launch implies a cornerstone exists" — verified the launch script
  routes via `09-post-launch-review-template.md` and the publish
  workflow, never bypasses.
- Manual publish path friction test (file move + PR + CI + deploy).
- Domain cutover steps (covered by README + launch pack §04).

### 2.3 CI / ops surface

- Per-folder build verification (gap → fixed).
- Branch / site deployment workflow (Cloudflare Pages
  out-of-band; documented).
- Cloudflare preview / private-launch mode (documented).

## 3. Findings (8 — 7 fixed, 1 by-design)

| # | Finding | Severity | Status |
|---|---|---|---|
| F1 | No `public/robots.txt` → crawlers had no signal | Low | **Fixed** — added with sitemap reference + AI-crawler permissive posture |
| F2 | No `public/favicon.svg` → browsers showed generic globe | Low (visual) | **Fixed** — added a text-based mark; Gemini design pack can replace later |
| F3 | No `public/sitemap.xml` → no discoverability hint for search engines or AI crawlers | Low | **Fixed** — static sitemap covering all 7 routes |
| F4 | No `404.astro` → Cloudflare Pages generic 404 rendered, breaking brand voice | Low | **Fixed** — Brand-A-voice 404 with helpful redirects |
| F5 | No `<link rel="icon">` in `Base.astro` → favicon never loaded even if file existed | Low | **Fixed** — `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` added |
| F6 | No `og:type` / `twitter:card` meta → social previews looked half-finished | Low | **Fixed** — both added |
| F7 | Root CI didn't build the dashboard or brand sites on PRs that touched them | Medium (drift risk) | **Fixed** — new `astro-builds` job in `.github/workflows/ci.yml` builds all three Astro consumers and asserts disclosure + no secret leakage |
| F8 | Operator-identity placeholders in `src/site.config.ts` ("replace before launch") | By design — launch-checklist §3 catches this | **No change** — placeholders are unambiguous |

## 4. Detail per fix

### 4.1 `public/robots.txt`

Permissive for normal crawlers; disallows `/drafts/` (defence-in-depth — the folder doesn't exist on the live site but a future operator mistake could create it); explicit sitemap reference. AI-crawler policy stays "permissive, case-by-case review" per `docs/seo-moat-plan.md` §10.

Replace the `aiescape.example` hostname with the real domain before launch (single line edit).

### 4.2 `public/favicon.svg`

Minimal SVG: dark rounded-square mark with a monospace "A". Brand-A-aligned (matches the reading-first / sturdy-mono register). Single file, ~270 bytes, no dependencies. Gemini design pack (`design-handoffs/gemini-brand-a-mvp-site.md`) can specify a richer mark when the brand visual system matures.

The template version uses an "H" (HamMediaLabs) so future brands replace per brand.

### 4.3 `public/sitemap.xml`

Static sitemap covering all 7 routes with sensible `changefreq` and `priority` values. Maintained manually until a cornerstone-update tool or `@astrojs/sitemap` integration lands — both deferred (the 7-route surface doesn't justify a dependency).

When the operator changes the hostname, this file's `<loc>` entries must be updated too. Single find-and-replace.

### 4.4 `404.astro`

Static 404 page in brand voice. Generated as `dist/404.html` at build time (Cloudflare Pages auto-routes 404s to `404.html` if present — verified). Helpful redirect to `/` and `/sitemap.xml`; pleasant tone; operator contact email for broken-link reports.

### 4.5 `Base.astro` head additions

```html
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

`og:type` was missing; `twitter:card` was missing; the favicon link was missing entirely. All three added. The OpenGraph image (`og:image`) intentionally stays unset until the Gemini design pack produces a real social-preview image; a missing `og:image` is better than an `og:image` pointing at a placeholder.

### 4.6 CI `astro-builds` job

New parallel job in `.github/workflows/ci.yml`:

```yaml
astro-builds:
  - dashboards/app          → npm install && npm run build
  - brands/templates/site   → npm install && npm run build
  - brands/brand-a-aiescape/site → npm install && npm run build
  - assert: "AI-augmented production" present in /index.html
  - assert: "AI-augmented production" present in /ai-use/index.html
  - assert: "AI Escape" present in /index.html
  - assert: no secret-shaped strings in dist/ (grep -rE returns 0)
```

This catches:

- Any future PR that breaks an Astro consumer's build.
- A regression where the AI-use disclosure block stops rendering.
- A regression where a `PUBLIC_*`-prefixed env var or provider key leaks into the build output.

Cost impact: zero. GitHub Actions free-tier minutes consumed are minimal for the three Astro builds.

### 4.7 Template parity

All fixes mirrored into `brands/templates/site/` so future brands (B's archive site, C's site) inherit them automatically:

- `brands/templates/site/public/robots.txt`
- `brands/templates/site/public/favicon.svg` ("H" mark; replace per brand)
- `brands/templates/site/src/pages/404.astro`
- `brands/templates/site/src/layouts/Base.astro` (head additions)

Per-brand sitemaps are operator-authored at copy time; the template doesn't ship a sitemap because the URL list is brand-specific.

## 5. Verified explicitly

- [x] **No `PUBLIC_*` references** in any `.astro` or `.ts` source under `brands/brand-a-aiescape/site/src/`.
- [x] **No `process.env` references** in any `.astro` or `.ts` source under `brands/brand-a-aiescape/site/src/`.
- [x] **No analytics tag** in any rendered HTML — operator adds Cloudflare Web Analytics via the Pages project UI post-deploy.
- [x] **No tracker scripts** (Google Analytics / Pixel / GTM / Hotjar / Clarity) in the rendered HTML.
- [x] **All 8 pages render** at the correct URLs after `npm run build`.
- [x] **Disclosure block renders** above the byline on `/` and `/ai-use` (asserted via grep in CI).
- [x] **Affiliate disclosure block hidden** at launch (`affiliateInPlay: false` → the conditional in `Disclosure.astro` correctly suppresses it).
- [x] **`affiliate-disclosure` page** renders the programmes-list placeholder ("No programmes active yet").
- [x] **`privacy` page** renders the operator-name + postal-address placeholders.
- [x] **No broken internal links** in the rendered HTML (verified by inspection; the cornerstone forward-links in cornerstone briefs are intentional — they 404 until the pieces ship, per `launch-packs/brand-a-mvp/03-content-launch-pack.md` §7).

## 6. Build reproducibility

Verified end-to-end from a clean clone:

```bash
git clone <repo>
cd brands/brand-a-aiescape/site
npm install     # 330 packages, ~16s
npm run build   # 8 pages, ~880ms
```

No environment variables required for the build itself (the placeholders inside `site.config.ts` are static strings; `BRAND_SITE_URL` only affects the `astro:site` value for absolute URL generation).

## 7. Cloudflare-Pages deployment assumptions verified

- Static output → directly servable from `dist/`.
- No SSR adapter → no server runtime cost at edge.
- No client islands → no client-side JS shipped beyond the optional analytics tag (added in Pages UI, not via env).
- `BRAND_SITE_URL` env override → only used by `astro.config.mjs` for canonical-URL generation; never reaches the browser.
- Custom 404 → `dist/404.html` auto-routed by Cloudflare Pages.
- Sitemap discoverable → `dist/sitemap.xml` served at root.
- Favicon → `dist/favicon.svg` served at root + linked from `<head>`.

## 8. Out of scope (per #71)

- Publishing content.
- Buying domain.
- Launching site.
- A per-brand GitHub Actions deploy workflow (the Cloudflare Pages
  auto-deploy on push to `main` covers this; explicit deploy hooks
  are an operator follow-up if scheduled rebuilds become useful).
- A `llms.txt` / `llms-full.txt` file (deferred per
  `docs/seo-moat-plan.md` §13 backlog).
- Social-preview image (`og:image`) — waits for the Gemini design
  pack to produce a real asset.

## 9. Hard stops re-verified

These remain unchanged and continue to block any premature launch:

- Operator name / email / postal address must be replaced in
  `src/site.config.ts` before the public URL goes live.
- Domain DNS records must resolve to Cloudflare Pages.
- No `PUBLIC_*` env vars on the Cloudflare Pages project.
- Cornerstone walks Brand A QA + voice-fidelity gates before going
  `staged`.
- Brand A `launch-checklist.md` every box ticked.

## 10. CI verification

After this PR merges:

- Root `typecheck-and-test` job (unchanged).
- New `astro-builds` job (builds 3 Astro consumers + asserts content).
- `gitleaks` job (unchanged).

If any future PR breaks any of the three Astro builds, or any
disclosure block stops rendering, or any provider-key shape leaks
into the rendered HTML, CI fails before merge.

## 11. Cross-references

- `brands/brand-a-aiescape/site/README.md` — deployment runbook.
- `brands/brand-a-aiescape/launch-checklist.md` — operator go/no-go.
- `brands/brand-a-aiescape/publish-workflow.md` — Tier-2 publish flow.
- `launch-packs/brand-a-mvp/` — 11-file launch runbook.
- `docs/seo-moat-plan.md` §10 — AI-crawler policy.
- `docs/astro-security-upgrade-plan.md` — Astro 4.x pin rationale.
- `docs/cost-control-and-free-tier-plan.md` — free-tier discipline.

Closes #71.
