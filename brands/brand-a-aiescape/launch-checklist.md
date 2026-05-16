# Brand A — Launch Readiness Checklist (go / no-go)

> Binding gate before the first piece on Brand A goes `live`. Every
> item is blocking. Walked once by the operator end-to-end before
> launch; not re-walked every publish (the per-piece QA gates handle
> that — see `qa/checklist.md` and `playbooks/voice-fidelity-checklist.md`).

---

## 1. Identity & accounts

- [ ] Brand name finalised (was "AI Escape" — working title; trademark / domain re-check complete).
- [ ] Apex domain registered (Cloudflare Registrar or equivalent).
- [ ] Brand Gmail alias active (`aiescape.editorial@…`).
- [ ] Brand X handle reserved (manual posting only; per `docs/x-platform-risk.md`).
- [ ] Newsletter list created (Buttondown free).
- [ ] Persona owner named (real human) in `profile.md` and in `voice.md`.

## 2. Site (Astro static)

- [ ] Site built from `brands/templates/site/` and pinned to Astro `^4.16.0` (per `docs/astro-security-upgrade-plan.md`; no major bumps before launch).
- [ ] `src/site.config.ts` populated with: brand name, tagline, operator name, operator email, **operator postal address** (required for CAN-SPAM compliance on newsletter), jurisdiction, last-reviewed date.
- [ ] `affiliateInPlay = false` at launch. Flipped to `true` only when the first affiliate goes live, in a separate change.
- [ ] All six compliance pages render: `/`, `/about`, `/privacy`, `/terms`, `/ai-use`, `/affiliate-disclosure`, `/contact`.
- [ ] `<Disclosure />` component renders the AI-use block by default; affiliate block hidden until `affiliateInPlay = true`.
- [ ] `robots.txt` allows indexing of `/` and the post routes; disallows `/drafts/` and any private path.
- [ ] `sitemap.xml` generated at build time.
- [ ] Cloudflare Pages project created; build verified once locally and once in CI.
- [ ] Custom domain attached; DNS verified end-to-end.

## 3. Content (first three pieces — see `first-three.md`)

- [ ] Cornerstone #1 draft (`drafts/01-free-tier-ai-stack.md`) walks the full pipeline: QA + voice-fidelity + Brand A `qa/checklist.md` — all green.
- [ ] Cornerstone #2 brief in `cornerstone-briefs.md` is locked; outline + draft started; same QA path.
- [ ] Cornerstone #3 brief in `cornerstone-briefs.md` is locked; outline started.
- [ ] At least cornerstone #1 is `staged` before launch day.
- [ ] All three frontmatters carry real `author` and `editor` names (not "TBD").
- [ ] All sources cited inline; `sources[]` populated.
- [ ] AI-augmentation label rendered above the byline on every page.

## 4. Disclosure & compliance

- [ ] AI-use disclosure block live on every page (lab default; verify on the live URL, not just localhost).
- [ ] `/affiliate-disclosure` page lists current programmes (empty list is fine and accurate at launch).
- [ ] `/privacy` page operator details correct; lawful-basis text retained.
- [ ] `/terms` page operator details correct; governing-law line matches the operator's jurisdiction (UK default).
- [ ] Newsletter signup footer includes operator postal address.
- [ ] No `PUBLIC_*`-prefixed env vars in the Cloudflare Pages project (verify in the dashboard).

## 5. Analytics & measurement

- [ ] Privacy-friendly analytics installed (Plausible CE self-hosted **or** Cloudflare Web Analytics). Cookieless.
- [ ] Newsletter open / click tracking respects the privacy policy.
- [ ] Brand A row exists in HQ `brand` table; `status: 'planning'` until launch day, then `status: 'active'`.
- [ ] `playbooks/weekly-review-brand-a-launch.md` event scheduled in operator's calendar from week 1.

## 6. Distribution

- [ ] No X autoposting. Manual posting only; cadence ceiling 7/wk per `docs/x-platform-risk.md` §7.
- [ ] No Reddit autoposting; comment-first, never drive-by link.
- [ ] Newsletter announcement template drafted (in `drafts/` if useful), reviewed against `docs/17-style-guide.md`.

## 7. Risk

- [ ] Decision-log entry filed naming launch day, the first three pieces, and the kill criteria.
- [ ] Account-recovery plan documented (per `playbooks/incident-credential.md`).
- [ ] `HQ_PUBLISH_FREEZE` flag wired in HQ env (read-only — no autopublish to freeze, but the flag must exist for future use).

## 8. Out-of-scope at launch (explicitly)

- Affiliate links anywhere on the site.
- Sponsored content of any kind.
- Paid ads.
- Tier-3 publishing or any automation that approaches Tier-4.
- A second brand. Brand B and Brand C stand up only after Brand A passes its day-30 review.

## Verdict

Launch is **go** only when every box above is ticked. A single
unchecked item is a no-go.

The operator transcribes the verdict + date to `docs/15-decision-log.md`
on launch day.
