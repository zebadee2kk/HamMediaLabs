# Ops VM — Launch Evidence Template

> Copy this file into a per-launch folder before any production
> deploy:
>
> `~/launch-evidence/<YYYY-MM-DD>-<short-slug>/launch-evidence.md`
>
> Fill it as the deploy progresses. When the launch is complete,
> open a scoped PR adding the folder under
> `launch-packs/brand-a-mvp/evidence/<YYYY-MM-DD>-<short-slug>/`.
>
> **No secrets in this file.** Screenshots cropped per
> `secrets-policy.md` §10. Wrangler / gh outputs reviewed for
> tokens before paste.

---

## Header

| Field | Value |
|---|---|
| **Date / time (UTC)** | `YYYY-MM-DD HH:MM` |
| **Date / time (Europe/London)** | `YYYY-MM-DD HH:MM` |
| **Operator** | `<operator name>` |
| **Workstation** | `hydra-ops-vm` (or other; record it) |
| **Surface** | `brand-a-aiescape/site` / `dashboards/app` / other |
| **Change type** | `cornerstone-publish` / `disclosure-update` / `dashboard-tweak` / `dependency-bump` / `other` |
| **Launch mode** | `manual / private MVP` / `manual / public` / `dashboard-internal` |
| **Risk class** | `low` / `medium` / `high` |
| **Pre-launch playbooks walked** | `voice-fidelity` / `content-quality` / `brand-a-qa` / `launch-checklist` / `n/a` |

## Provenance

| Field | Value |
|---|---|
| **Commit SHA** (`main` post-merge) | `<full SHA>` |
| **PR number** | `#NNN` |
| **PR title** | `<title>` |
| **Issue closed** | `#NNN` |
| **Branch** | `claude/issue-NNN-<slug>` |
| **CI run URL** | `<github actions run URL>` |
| **CI checks** | `typecheck-and-test ✓` / `astro-builds ✓` / `gitleaks ✓` / `notebooklm-pack-freshness ✓` |

## Tests run (paste outputs / pass counts; redact tokens)

```
$ npm test
…
# tests 38
# pass 38

$ cd brands/brand-a-aiescape/site && npm run build
…
[build] 8 page(s) built in <N>ms
[build] Complete!

$ find dist -type f -name '*.js' | wc -l
0

$ grep -c "AI-augmented production" dist/ai-use/index.html dist/index.html
1
1

$ gitleaks detect --no-banner -s ~/HamMediaLabs
0 leaks
```

## Deployment

| Field | Value |
|---|---|
| **Deployment trigger** | `merge to main → Cloudflare Pages auto-deploy` (default) / `Wrangler preview` |
| **Cloudflare Pages project** | `<project-name>` |
| **Cloudflare deployment ID** | `<deployment-id from Cloudflare dashboard>` |
| **Deployment URL** | `https://<project>.pages.dev/...` or custom domain |
| **Live URL verified** | `<URL>` returned 200 OK at `<HH:MM>` |

## Smoke tests (live URL)

For Brand A site:

- [ ] Homepage loads.
- [ ] AI-use page loads and renders the disclosure.
- [ ] Privacy page loads and contains the canonical copy from `docs/18-disclosure-templates.md`.
- [ ] Terms page loads.
- [ ] Affiliate disclosure page loads.
- [ ] Contact page loads.
- [ ] About page loads.
- [ ] `/robots.txt` loads and references the sitemap.
- [ ] `/sitemap.xml` loads and lists all pages.
- [ ] 404 page renders on a known-bad URL.
- [ ] Cornerstone 1 loads (if part of this launch).
- [ ] Buttondown opt-in iframe renders (form visible).
- [ ] No console errors in the operator's browser DevTools.
- [ ] No JS bundles served (verified via Network tab).

For HQ dashboard:

- [ ] Cloudflare Access prompts for operator identity.
- [ ] `/` renders with cards + brand table + provider rollup + recent decisions.
- [ ] `/cost` renders.
- [ ] `/decisions` renders.
- [ ] `/experiments` renders.
- [ ] No console errors.

## Screenshots / evidence references

(Local paths under `~/launch-evidence/<folder>/screenshots/`,
to be PR'd into the repo. **Cropped to remove operator email,
account banners, and secrets per `secrets-policy.md` §10.**)

- `screenshots/01-homepage.png`
- `screenshots/02-ai-use.png`
- `screenshots/03-privacy.png`
- `screenshots/04-cornerstone-1.png` (if applicable)
- `screenshots/05-buttondown-iframe.png`
- `screenshots/06-cloudflare-deployment-page.png` (cropped)
- `screenshots/07-network-tab-no-js.png`

## Rollback notes

| Field | Value |
|---|---|
| **Rollback path** | per `deployment-runbook.md` §6 — revert merge commit, or Cloudflare Pages dashboard rollback |
| **Last known-good deployment ID** | `<id>` |
| **Last known-good commit SHA** | `<SHA>` |
| **DNS fallback ready?** | `yes/no` per `launch-packs/brand-a-mvp/07-risk-and-rollback.md` |
| **Operator can revert without external help?** | `yes/no` |

## Launch checklist completion

| Step | Status | Owner |
|---|---|---|
| `01-human-operator-checklist.md` walked | `✓ / ✗` | operator |
| `02-ai-agent-task-list.md` walked | `✓ / ✗` | claude code |
| `03-content-launch-pack.md` walked | `✓ / ✗` | operator |
| `04-technical-launch-pack.md` walked | `✓ / ✗` | operator |
| Voice-fidelity QA passed on cornerstone | `✓ / ✗ / n/a` | operator |
| Content-quality QA passed on cornerstone | `✓ / ✗ / n/a` | operator |
| Brand A QA checklist passed | `✓ / ✗ / n/a` | operator |
| `08-launch-day-script.md` walked | `✓ / ✗` | operator |
| `09-post-launch-review-template.md` filed | `✓ / ✗` | operator (day 7) |

## Post-launch review schedule

| Review | Due date | Playbook |
|---|---|---|
| Week 1 retro | `YYYY-MM-DD` (Saturday) | `playbooks/weekly-review-brand-a-launch.md` |
| Day 14 review | `YYYY-MM-DD` | `playbooks/weekly-review.md` |
| Day 30 review (gate for Brand B / C) | `YYYY-MM-DD` | `playbooks/weekly-review-brand-a-launch.md` + `docs/portfolio-expansion-gate.md` §2 |

## Decision-log entry filed?

`yes / no` — link: `docs/15-decision-log.md` (search for `YYYY-MM-DD` entry titled "Brand A launch — <slug>").

## Notes / surprises during launch

(Free-text. Anything that wasn't in the runbook. Anything to
add to the runbook for next time.)

```
<notes>
```

## Approval

**Operator sign-off:** `<name>` at `<HH:MM>` on `<YYYY-MM-DD>`.

This evidence file is then PR'd into the repo:

```bash
cd ~/HamMediaLabs
git checkout -b claude/launch-evidence-<YYYY-MM-DD>
mkdir -p launch-packs/brand-a-mvp/evidence/<YYYY-MM-DD>-<slug>
cp -R ~/launch-evidence/<YYYY-MM-DD>-<slug>/* \
  launch-packs/brand-a-mvp/evidence/<YYYY-MM-DD>-<slug>/
git add launch-packs/brand-a-mvp/evidence/<YYYY-MM-DD>-<slug>/
git commit -m "Launch evidence: <slug> (<YYYY-MM-DD>)"
gh pr create --base main --title "Launch evidence: <slug> (<YYYY-MM-DD>)" \
  --body "$(cat <<'EOF'
## Summary
Adds launch evidence for the <YYYY-MM-DD> <slug> deploy.

## NotebookLM Pack
NotebookLM-Pack: not-needed
Reason: evidence-only PR; no strategic / operational doc changed.

Closes <evidence-issue-if-any>.
EOF
)"
```
