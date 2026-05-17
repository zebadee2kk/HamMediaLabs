# Ops VM — Deployment Runbook

> The deployment flow for HamMediaLabs **does not change**
> because the Ops VM exists. The VM is a convenient
> workstation; production deploys still happen via merge-to-
> `main` + Cloudflare Pages on push.
>
> **Posture:** local build → branch → PR → CI green → operator
> review → merge `main` → Cloudflare Pages deploy. Nothing on
> the VM bypasses this.
>
> **Companion docs:** `launch-packs/brand-a-mvp/04-technical-launch-pack.md`,
> `launch-packs/brand-a-mvp/08-launch-day-script.md`,
> `launch-packs/brand-a-mvp/07-risk-and-rollback.md`,
> `docs/launch-readiness-closeout-2026-05-16.md`.

---

## 1. The standing deployment flow (binding)

```
[Ops VM — local clean clone]
  npm install → npm test → npm run typecheck
  ↓
  cd brands/brand-a-aiescape/site && npm run build  (verify clean)
  ↓
[branch] git checkout -b claude/issue-NNN-...
  ↓
[commit] one issue = one branch = one PR
  ↓
[push] git push -u origin claude/issue-NNN-...
  ↓
[PR] gh pr create --base main ...
  ↓
[CI] typecheck-and-test + astro-builds + gitleaks + notebooklm-pack-freshness
  ↓ all green
[Operator review]
  ↓
[Merge to main] (squash)
  ↓
[Cloudflare Pages] picks up the push and deploys automatically
  ↓
[Verify] curl / browse the live URL
  ↓
[Evidence capture] launch-evidence-template.md
```

**Nothing on the Ops VM jumps this sequence.** Wrangler is only
used for **preview** deployments (§3); production never goes
through a Wrangler `pages deploy` from the VM.

## 2. Local build / test on the VM

For Brand A:

```bash
cd ~/HamMediaLabs
git status                          # clean
git pull --ff-only origin main
git checkout -b claude/issue-NNN-<short-slug>

# ... operator makes the change ...

npm test                            # 38/38 expected
npm run typecheck                   # zero errors

cd brands/brand-a-aiescape/site
npm install --no-audit --no-fund    # only if package.json changed
npm run build                       # 8 pages; sub-second
find dist -type f -name '*.js' | wc -l   # expected: 0 (no client islands)
grep -c "AI-augmented production" dist/ai-use/index.html dist/index.html
# expected: 1 1

cd ~/HamMediaLabs
gitleaks detect --no-banner -s .    # zero leaks
```

For the dashboard or templates: substitute the path under
`dashboards/app` or `brands/templates/site` and run the same
build.

## 3. Cloudflare Pages **preview** deployment from the VM

Preview deploys are allowed; they are **not production**.
Cloudflare Pages provides them at a `<branch>.<project>.pages.dev`
URL. Use them when:

- The change is visually significant and operator wants to
  click around before opening the PR.
- The CI build needs a sanity preview to compare against.

```bash
cd ~/HamMediaLabs/brands/brand-a-aiescape/site
source ~/.config/cloudflare/wrangler.env

# Preview deploy — points at the existing Cloudflare Pages project
wrangler pages deploy dist \
  --project-name=<brand-a-pages-project-name> \
  --branch=preview-$(git rev-parse --short HEAD)
```

The output prints a preview URL like
`https://preview-abc1234.<project>.pages.dev`. Capture it into
`launch-evidence-template.md`.

**Preview deploys are not production.** The production URL is
only updated when `main` advances and Cloudflare Pages picks
up the push automatically.

## 4. Production deployment assumptions

Production deploys happen **only** when a PR merges to `main`
and Cloudflare Pages picks it up. There is **no manual
`wrangler pages deploy` to production from the VM**. The
operator does not bypass this even for a "tiny fix".

Why:

- The merge-to-`main` flow is auditable (every production state
  is a commit on `main`).
- CI verifies every production push.
- A direct Wrangler push could leak a half-tested state to
  production.

## 5. Cloudflare Pages project assumptions

- One Cloudflare Pages project per consumer at production:
  - `brand-a-aiescape` (Brand A site).
  - `hammedialabs-dashboard` (HQ dashboard, behind Cloudflare
    Access).
  - **Not** a project for `brands/templates/site` (the template
    is the seed for other brand sites and not deployed
    itself).
- Build command: `npm install --no-audit --no-fund && npm run build`.
- Build output directory: `dist`.
- Node version: 20 (matches CI matrix).
- Env vars set in Cloudflare Pages UI (production):
  - `BRAND_SITE_URL=https://<canonical-domain>` for the brand
    site.
  - `DASHBOARD_URL=https://<dashboard-domain>` for the dashboard.
  - **Supabase service-role key** for the dashboard runtime
    (Tier 1 secret; never echoed on the VM).
- DNS managed in Cloudflare; **operator-only** changes via the
  Cloudflare dashboard.

## 6. Rollback approach

Three rollback paths, in order of preference:

### 6.1 Revert the merge commit on `main`

For most production regressions:

```bash
cd ~/HamMediaLabs
git checkout main
git pull --ff-only origin main
git revert -m 1 <merge-commit-sha>     # produces revert commit
git push origin main
```

Cloudflare Pages picks up the new `main` and deploys the
reverted state. PR-based revert is also fine (and audit-trail
cleaner) — open a revert PR via `gh pr create`.

### 6.2 Cloudflare Pages rollback (instant)

If the operator needs to roll back before a revert PR can ship:

1. Open the Cloudflare Pages project in the Cloudflare
   dashboard.
2. Go to **Deployments**.
3. Find the last known-good deployment.
4. Click **Rollback to this deployment**.

This is instant but does **not** change the repo state. After
rolling back via the dashboard, immediately ship a revert PR so
the repo matches production.

### 6.3 DNS-level fallback (last resort)

If a brand domain itself is misbehaving:

- Switch the Cloudflare DNS record to `pages.dev` directly
  (skip the custom-domain mapping).
- Or pause the Cloudflare Pages project.

DNS changes are **always** operator-only in the Cloudflare
dashboard. Walked in `launch-packs/brand-a-mvp/07-risk-and-rollback.md`.

## 7. Launch evidence capture

Every deploy that touches production (i.e. every merge to
`main` that changes the brand site or dashboard) gets a
launch-evidence record:

1. Create a folder on the VM:
   `~/launch-evidence/<YYYY-MM-DD>-<short-slug>/`.
2. Fill `launch-evidence-template.md` (copy template into the
   folder).
3. Capture:
   - Commit SHA (`git rev-parse HEAD` on `main`).
   - PR number.
   - Cloudflare Pages deployment ID (visible in the dashboard).
   - The production URL after deploy.
   - Test command outputs (`npm test`, `npm run build`).
   - Screenshots of the deployed page (cropped per
     `secrets-policy.md` §10).
4. When the evidence is ready, open a scoped PR that adds the
   folder under `launch-packs/brand-a-mvp/evidence/<YYYY-MM-DD>/`
   in the repo. The evidence is **not** auto-uploaded.

## 8. What must remain manual

- **Domain registration** (operator → registrar UI).
- **DNS changes** (operator → Cloudflare dashboard).
- **Cloudflare Pages project creation** (operator → Cloudflare
  dashboard).
- **GitHub Pages-style "production deploy" approvals** if ever
  added.
- **Supabase env var changes** in Cloudflare Pages production.
- **Newsletter sends** (operator → Buttondown).
- **Social posting** (operator → platform UI; cadence
  ceilings per `docs/x-platform-risk.md`).
- **Paid-line activation** (operator → §5 gate in
  `docs/cost-control-and-free-tier-plan.md`).

The Ops VM does not do any of the above unattended.

## 9. No direct production mutation unless approved

The hard rule: **no production mutation from the VM** except:

- Merging a PR to `main` (which is itself reviewed).
- Cloudflare dashboard actions (which are operator-driven and
  audited via the dashboard's activity log).

Specifically forbidden from the VM:

- `wrangler pages deploy ... --branch=main` (production push
  bypassing the CI / merge flow).
- `wrangler kv:key put / delete` against any production KV
  (the lab does not use KV today; the prohibition stands if it
  ever does).
- Any Supabase SQL `INSERT / UPDATE / DELETE` against the
  production schema unless under an approved migration PR.
- DNS changes via Cloudflare API (operator-only via the
  dashboard).

## 10. Brand A launch-day flow (the runbook the VM enables)

Walk `launch-packs/brand-a-mvp/08-launch-day-script.md` from
the VM. The VM-specific touches:

1. SSH into the VM over Tailscale before starting the script.
2. Confirm `git status` is clean and `main` is fast-forward.
3. Walk the launch-day script as written — every step is
   manual; the VM is just the consistent workstation.
4. After deploy, capture evidence per §7.
5. PR the evidence folder into the repo.
6. Set the calendar reminder for the Saturday weekly review
   (`playbooks/weekly-review-brand-a-launch.md`).

## Cross-references

- `launch-packs/brand-a-mvp/04-technical-launch-pack.md` —
  technical launch pack.
- `launch-packs/brand-a-mvp/07-risk-and-rollback.md` —
  rollback paths.
- `launch-packs/brand-a-mvp/08-launch-day-script.md` —
  launch-day script.
- `secrets-policy.md` — token + env-var handling.
- `launch-evidence-template.md` — evidence record format.
- `docs/launch-readiness-closeout-2026-05-16.md` — current
  launch posture.
