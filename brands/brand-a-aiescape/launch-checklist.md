# Brand A — Launch Readiness Checklist (go / no-go)

> Binding gate before the first Brand A piece goes `live`.
>
> This checklist supports two launch modes:
>
> 1. **Private/manual MVP** — validates the pipeline on free infrastructure with no paid dependencies.
> 2. **Public launch** — attaches public brand infrastructure after cost gates are approved.
>
> Items marked **[BLOCKER]** must be complete before any live publish.
> Items marked **[PUBLIC]** are required before a public indexed launch, but may be deferred for a private/manual MVP.
> Items marked **[PAID-GATE]** require the cost-control process in `#43` / `docs/cost-control-and-free-tier-plan.md` before spend.
>
> Walked once by the operator end-to-end before launch; not re-walked every publish. Per-piece QA gates still apply (`qa/checklist.md` and `playbooks/voice-fidelity-checklist.md`).

---

## 0. Launch mode decision

- [ ] **[BLOCKER]** Launch mode chosen and logged in `docs/15-decision-log.md`: `private_manual_mvp` or `public_indexed_launch`.
- [ ] **[BLOCKER]** If any paid dependency is required, cost gate approval exists under #43 before spend.
- [ ] **[BLOCKER]** No affiliate, sponsorship, paid ads, or Tier-3/Tier-4 publishing at launch.

## 1. Identity & accounts

- [ ] **[BLOCKER]** Brand name finalised for MVP use (was "AI Escape" — working title; obvious trademark/domain conflict check complete).
- [ ] **[PUBLIC][PAID-GATE]** Apex domain registered only if cost gate approves it. Otherwise launch may use a free Cloudflare Pages / GitHub Pages subdomain.
- [ ] **[PUBLIC]** Brand email route chosen. Free MVP may use an existing operator mailbox or alias; paid/custom mailbox requires cost gate approval.
- [ ] **[PUBLIC]** Brand X handle reserved before X distribution begins. Not required for private/manual MVP.
- [ ] **[PUBLIC]** Newsletter provider/list created before newsletter capture is shown. Not required for first private/manual content validation.
- [ ] **[BLOCKER]** Persona owner named (real human) in `profile.md` and in `voice.md`.

## 2. Site (Astro static)

- [ ] **[BLOCKER]** Site built from `brands/templates/site/` and pinned to Astro `^4.16.0` (per `docs/astro-security-upgrade-plan.md`; no major bumps before launch).
- [ ] **[BLOCKER]** `src/site.config.ts` populated with: brand name, tagline, operator name, operator contact route, jurisdiction, last-reviewed date.
- [ ] **[PUBLIC]** Operator postal address added before newsletter signup or email marketing goes live. Not required if there is no newsletter capture in private/manual MVP.
- [ ] **[BLOCKER]** `affiliateInPlay = false` at launch. Flipped to `true` only when the first affiliate goes live, in a separate reviewed change.
- [ ] **[BLOCKER]** All compliance pages render: `/`, `/about`, `/privacy`, `/terms`, `/ai-use`, `/affiliate-disclosure`, `/contact`.
- [ ] **[BLOCKER]** `<Disclosure />` component renders the AI-use block by default; affiliate block hidden until `affiliateInPlay = true`.
- [ ] **[PUBLIC]** `robots.txt` allows indexing of `/` and post routes only for public launch. Private/manual MVP may set `noindex` or restrict distribution.
- [ ] **[PUBLIC]** `sitemap.xml` generated at build time for public launch.
- [ ] **[BLOCKER]** Static build verified locally.
- [ ] **[PUBLIC]** Cloudflare Pages / GitHub Pages deploy verified before public launch.
- [ ] **[PUBLIC][PAID-GATE]** Custom domain attached and DNS verified only if domain spend approved. Free subdomain is acceptable for private/manual MVP.

## 3. Content (first three pieces — see `first-three.md`)

- [ ] **[BLOCKER]** Cornerstone #1 draft (`drafts/01-free-tier-ai-stack.md`) walks the full pipeline: QA + voice-fidelity + Brand A `qa/checklist.md` — all green.
- [ ] **[BLOCKER]** At least cornerstone #1 is `staged` before launch day.
- [ ] **[PUBLIC]** Cornerstone #2 brief in `cornerstone-briefs.md` is locked; outline + draft started; same QA path.
- [ ] **[PUBLIC]** Cornerstone #3 brief in `cornerstone-briefs.md` is locked; outline started.
- [ ] **[BLOCKER]** All live/staged frontmatters carry real `author` and `editor` names (not "TBD").
- [ ] **[BLOCKER]** All contestable claims cite sources inline; `sources[]` populated.
- [ ] **[BLOCKER]** AI-augmentation label rendered above the byline on every page.

## 4. Disclosure & compliance

- [ ] **[BLOCKER]** AI-use disclosure block live on every page (verify on the built site, not just source files).
- [ ] **[BLOCKER]** `/affiliate-disclosure` page lists current programmes; empty list is fine and accurate at launch.
- [ ] **[BLOCKER]** `/privacy` page operator details correct for the chosen launch mode; lawful-basis text retained.
- [ ] **[BLOCKER]** `/terms` page operator details correct; governing-law line matches the operator's jurisdiction (UK default).
- [ ] **[PUBLIC]** Newsletter signup footer includes operator postal address before newsletter capture goes live.
- [ ] **[BLOCKER]** No `PUBLIC_*`-prefixed env vars in any build/deploy environment.

## 5. Analytics & measurement

- [ ] **[BLOCKER]** Measurement approach selected: manual log, Cloudflare Web Analytics, or another privacy-friendly option.
- [ ] **[PUBLIC]** Privacy-friendly analytics installed before public launch. Cookieless only.
- [ ] **[PUBLIC]** Newsletter open / click tracking respects the privacy policy before newsletter use.
- [ ] **[BLOCKER]** Brand A row exists in HQ `brand` table or a manual placeholder exists in the launch decision log; `status: 'planning'` until launch day, then `status: 'active'`.
- [ ] **[BLOCKER]** `playbooks/weekly-review-brand-a-launch.md` review cadence scheduled or manually diarised from week 1.

## 6. Distribution

- [ ] **[BLOCKER]** No X autoposting. Manual posting only; cadence ceiling 7/wk per `docs/x-platform-risk.md` §7.
- [ ] **[BLOCKER]** No Reddit autoposting; comment-first, never drive-by link.
- [ ] **[PUBLIC]** Newsletter announcement template drafted and reviewed before newsletter send. Not required if no newsletter at launch.

## 7. Risk

- [ ] **[BLOCKER]** Decision-log entry filed naming launch mode, launch day, first piece(s), and kill criteria.
- [ ] **[PUBLIC]** Account-recovery plan documented before public launch (per `playbooks/incident-credential.md`).
- [ ] **[BLOCKER]** `HQ_PUBLISH_FREEZE` flag documented for future automation. If no automation exists yet, this can be a decision-log placeholder rather than a live env var.

## 8. Out-of-scope at launch (explicitly)

- Affiliate links anywhere on the site.
- Sponsored content of any kind.
- Paid ads.
- Paid API dependencies unless explicitly approved by #43.
- Tier-3 publishing or any automation that approaches Tier-4.
- A second brand. Brand B and Brand C stand up only after Brand A passes its day-30 review.

## Verdict

Launch is **go** only when every **[BLOCKER]** item is ticked.

Public launch is **go** only when every relevant **[PUBLIC]** item is ticked.

Any **[PAID-GATE]** item must have cost-control approval before it can become a blocker.

The operator transcribes the verdict + date to `docs/15-decision-log.md` on launch day.
