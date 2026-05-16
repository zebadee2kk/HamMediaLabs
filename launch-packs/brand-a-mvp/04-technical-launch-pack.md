# 04 — Technical Launch Pack

> Site build, deploy, environment rules, rollback path.

---

## 1. Site build steps (per `brands/brand-a-aiescape/publish-workflow.md` §2)

```bash
cd brands/brand-a-aiescape/site    # (created from brands/templates/site/)
npm install
npm run build
```

- `npm run build` must succeed cleanly. Any error is a no-go.
- Build output → `dist/`. Cloudflare Pages serves from this.
- Build time should be ≤90 seconds (per `docs/PROJECTHYDRA-MASTER-PLAN.md`).

## 2. Environment rules (binding)

- **No `PUBLIC_*` env vars on the Cloudflare Pages project.** The
  service-role key and any other Tier-1 secret stays server-side
  only (see `docs/09-security-and-secrets.md`).
- `.env` is gitignored at the repo root. Never tracked.
- `.env.example` is the only `.env*` file in the repo. It carries
  placeholders only.
- Cloudflare Pages project env vars set under "Production":
  - `SUPABASE_URL` — *only* if the brand site reads it at build
    time. Default: not set; the brand site is fully static and
    doesn't talk to HQ.
  - No `SUPABASE_SERVICE_ROLE_KEY` on the brand site. Period.
  - `DASHBOARD_URL` — irrelevant for brand sites.
- All secrets that exist on the project live under "Production"
  with no equivalent in "Build & deployments → Build env
  variables" (those leak into the build log).

## 3. Static deployment path

- Repo → `git push origin main` (after PR merge).
- Cloudflare Pages auto-deploys.
- The deploy URL is the `pages.dev` subdomain at first; a custom
  domain attaches after a decision-log entry per
  `docs/cost-control-and-free-tier-plan.md` §4.1.

If using a custom domain at launch:

- DNS records verified on Cloudflare.
- HTTPS provisioned (Cloudflare default).
- HTTP → HTTPS redirect on.
- `robots.txt` allows indexing of `/` and the post routes; disallows
  `/drafts/` (which doesn't exist on the live site, but defence in
  depth).
- `sitemap.xml` generated at build time.

## 4. No-trackers rule

The brand site at launch carries **only**:

- Plausible CE self-hosted analytics OR Cloudflare Web Analytics.
- The Buttondown opt-in iframe / form (loaded only on the
  newsletter section, not site-wide).
- No Google Analytics. No Facebook Pixel. No tag manager. No
  retargeting. No third-party JS that the operator hasn't
  personally vetted.

If a follow-up PR ever adds a tracker, the operator's privacy
policy is updated first (`docs/legal-and-resilience.md` §5).

## 5. Build verification (post-deploy)

After the deploy completes, the operator verifies the live URL by
hand:

- [ ] `/` renders the home page with the brand name.
- [ ] `/free-tier-ai-stack` renders the cornerstone.
- [ ] The AI-use disclosure block renders above the byline.
- [ ] The site footer renders the lab-wide disclosure block.
- [ ] `/privacy`, `/terms`, `/ai-use`, `/affiliate-disclosure`,
      `/contact`, `/about` all resolve.
- [ ] `view-source` on the cornerstone shows no `PUBLIC_*` values
      leaked.
- [ ] `view-source` shows no inline `<script>` other than the
      analytics tag.
- [ ] Lighthouse-style spot-check (mobile, slow 4G): page renders
      in <3 seconds; LCP <2.5s on the cornerstone.

## 6. Rollback steps

If something is wrong post-deploy, in order:

1. **Cloudflare Pages → Deployments → Rollback** to the previous
   successful deploy. (Saves ~5 minutes vs. a re-build.)
2. If rollback doesn't fix it, revert the merge commit on
   `main` and push.
3. If a credential leak is suspected, **also** run
   `playbooks/incident-credential.md`.
4. If a disclosure-block render failure is the cause, fix the
   template in `brands/templates/site/` (the regression affects
   future brands) and ship the fix as a separate PR.
5. Decision-log entry: what failed, what we did, what we changed
   to prevent recurrence.

## 7. CI verification (pre-launch)

The brand site's CI must be green on the merge commit:

- `astro check` (or `npm run check` if the script is wired) clean.
- `npm run build` clean.
- gitleaks green.

Repo-level `typecheck-and-test` + `gitleaks` must also be green
on `main`.

## 8. Local-test before pushing

```bash
cd brands/brand-a-aiescape/site
npm install
npm run build
# Open dist/index.html and dist/free-tier-ai-stack/index.html in a
# real browser; verify each renders correctly.
```

A clean local build is the floor.

## 9. What this pack does NOT do

- Build automation for cross-brand deployment.
- Multi-environment infrastructure.
- A separate staging environment beyond Cloudflare Pages preview
  builds (which already exist per branch).
- Any server-side logic on the brand site.

## 10. Cross-references

- `brands/brand-a-aiescape/publish-workflow.md` — full Tier-2
  publish flow.
- `docs/astro-security-upgrade-plan.md` — Astro version pin.
- `dashboards/app/README.md` — sibling Astro project for HQ.
- `docs/legal-and-resilience.md` §5 — privacy / cookie /
  PECR / CAN-SPAM posture.
- `playbooks/incident-credential.md` — IR if rollback reveals a
  credential issue.
