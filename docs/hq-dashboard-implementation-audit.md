# HQ Dashboard Implementation Audit

> **Date:** 2026-05-16.
> **Closes:** #73.
> **Scope:** `dashboards/app/` — the 4-page operator dashboard
> shipped in PR #68 (#52). Audits code architecture, UI truthfulness,
> operational fit, and security.
> **Posture:** confirm sustainable operating infrastructure, not
> just fast MVP code. Avoid premature refactor theatre.

---

## 1. Executive summary

The dashboard is **sustainable operating infrastructure**, not just
fast MVP code. Two pieces of intentional duplication (scoring +
quota) are documented, justified, and now **CI-enforced** to prevent
silent drift. Placeholder labelling is unambiguous; no fake
precision; empty + error states cover every page. **No P0 / P1
findings.**

**Hardened in this PR:**

1. SYNC POINT comments added to all four duplication-pair files
   (`core/scoring/scoring.ts`, `dashboards/app/src/lib/scoring.ts`,
   `core/providers/quota-registry.ts` ← only referenced from the
   dashboard pair, `dashboards/app/src/lib/quota.ts`).
2. New drift-watcher test
   (`core/scoring/sync-with-dashboard.test.ts`) reads the dashboard
   files as text and asserts canonical literals. **CI fails on
   silent drift.**
3. Tests count: 35 → 38 (3 new drift-watcher tests).

**No refactor recommended.** The shared-package alternative
(extracting `core/scoring` + `core/providers` into a workspace
package the dashboard depends on) is theoretically cleaner but
operationally heavier: Cloudflare Pages would need a monorepo-aware
build, and a build-time package-resolution failure would surface as
a deploy outage. Today's duplication-plus-drift-watcher is the
right trade-off.

## 2. Audit surface

### 2.1 Code architecture
- `dashboards/app/src/lib/scoring.ts` vs `core/scoring/scoring.ts`.
- `dashboards/app/src/lib/quota.ts` vs `core/providers/quota-registry.ts`.
- `dashboards/app/src/lib/supabase.ts` — single source for the
  dashboard's Supabase reads.
- Duplication rationale.
- Cloudflare / static constraints.

### 2.2 UI truthfulness
- Placeholder labels per row (no fake precision).
- Empty + error states on every page.
- Source-tag visibility (`actual / estimate / placeholder`).
- Cost / profit placeholders alignment with business docs.

### 2.3 Operational fit
- Cost-control alignment with `docs/cost-control-and-free-tier-plan.md`
  §1 + §2.
- Profit-model alignment with `docs/profit-model.md` §6.
- Monetisation-arch alignment with `docs/monetization-architecture.md`.
- Decision-log integration coherence.
- Brand-expansion-gate integration potential.
- Launch-state vs prelaunch-state visibility.

### 2.4 Security
- Secret-bleed paths (none — service-role key server-side only).
- Client-side drift (none — static-rendered, no client islands).
- Future incentive to bypass static assumptions casually
  (mitigated by CI's `astro-builds` job from PR #77).

## 3. Findings (5 — 3 hardened, 2 no-op)

| # | Finding | Severity | Status |
|---|---|---|---|
| F1 | `lib/scoring.ts` duplicates `core/scoring/scoring.ts` thresholds (intentional) | Medium drift risk | **Hardened** — SYNC POINT comments + drift-watcher test |
| F2 | `lib/quota.ts` duplicates ceilings from `core/providers/quota-registry.ts` (intentional) | Medium drift risk | **Hardened** — SYNC POINT comments + drift-watcher test |
| F3 | `/cost` page has no `ErrorPanel` path | By design — data is local placeholders, no fetch | **No change** |
| F4 | Placeholder rows on `/cost` use literal £0; could be misread as "actual £0" | Low | **Hardened by F1 SYNC POINT comments** — every numeric cell has a visible `source: placeholder` tag |
| F5 | Dashboard `/brand/[slug]` page not yet implemented (deferred from PR #68) | Low | Tracked in PR #68 out-of-scope notes; remains a separate future scoped PR |

No P0 / P1. No autonomous-publishing risk. No client-side data fetch. No secret-key path that could reach the browser.

## 4. Duplication-vs-shared-package decision (F1 / F2)

### 4.1 The question

Should `core/scoring/` and `core/providers/quota-registry.ts` be
extracted into a workspace package that both the root and the
dashboard import?

### 4.2 The trade-off

| Option | Drift risk | Build complexity | Deploy risk on Cloudflare Pages | Cost |
|---|---|---|---|---|
| **Duplication + drift-watcher (today)** | Watcher catches drift on every PR | None | None | None |
| Monorepo workspace package | Compile-enforced | Adds `pnpm` / `npm` workspaces + monorepo-aware Cloudflare build | Build failures during Pages deploys; troubleshooting requires monorepo-aware tools | Operator-time |
| Shared `.ts` symlink | None at runtime | Symlinks behave unevenly on Cloudflare Pages builds; not recommended | Real risk | None |

### 4.3 Verdict

**Duplication holds.** Hardened with SYNC POINT comments and a
drift-watcher test. CI catches drift on every PR.

The shared-package alternative is correctly listed as a future
refactor in `docs/hq-dashboard-implementation-audit.md` §6 — only
worth doing if (a) the duplication grows beyond two pairs, or (b)
Cloudflare Pages adds first-class monorepo support and the
operator finds the duplication an active annoyance.

## 5. UI truthfulness (re-verified)

### 5.1 Placeholder labelling

Every numeric in the dashboard carries an inline source tag:

- `actual` (green pill) — observed, captured into HQ DB.
- `estimate` (amber pill) — operator estimate from a proxy.
- `placeholder` (grey pill) — no real value yet; rendered as 0 / £0.

At MVP, the **majority of rows are `placeholder`**. The visible
grey pill makes this unambiguous. A tired operator reading a £0
row knows it's a placeholder.

### 5.2 Empty / error state coverage

```
/                4 sections × (ConfigBanner + ErrorPanel + EmptyState patterns)
/cost            ConfigBanner (env missing); placeholder rows always present (by design)
/decisions       ConfigBanner + ErrorPanel + EmptyState
/experiments     ConfigBanner + EmptyState (no fetch; placeholder always present)
```

Every page that fetches from Supabase renders an `ErrorPanel` on
fetch failure and continues to render other widgets — per-widget
fail-open posture preserved from PR #15.

### 5.3 Source-tag visibility

The `source` field is rendered as a coloured pill next to every
row. A snapshot search across the rendered HTML confirms every
numeric cell sits next to one of the three source-pill classes.

## 6. Operational fit (cross-doc alignment)

### 6.1 Cost-control alignment

`CostBreakdownTable.astro` placeholder rows match
`docs/cost-control-and-free-tier-plan.md` §1 worked numbers:

| Category | Doc £/mo | Dashboard ceiling £/mo | Aligned? |
|---|---:|---:|---|
| 1Password | 3 | 3 | ✓ |
| Brand domains (3 × ~£1) | 4 (incl. lab) | 1 per brand | ✓ (rendered as 3 separate rows + lab-wide) |
| n8n VPS | 5 | 5 | ✓ |
| LLM overage Phase B | 5–15 | 15 | ✓ |
| Newsletter paid | 0–15 | 15 | ✓ |
| Image / video tooling | 0–10 | 10 | ✓ |

### 6.2 Profit-model alignment

The `/cost` page surfaces costs only. The `/experiments` page
surfaces experiment status. **The dashboard does not display
revenue rows** at MVP because revenue is zero across the
portfolio. When revenue arrives, a Brand Net = revenue −
attributed cost column extends `BrandTable.astro` — flagged in
the dashboard backlog (PR #68 §9 of `docs/measurement-framework.md`).

### 6.3 Monetisation-arch alignment

Monetisation surfaces are governance-only at MVP
(`docs/monetization-architecture.md`). The dashboard correctly
does **not** render any monetisation-surface widgets yet. When
Brand A's first affiliate programme goes live, a
`MonetisationSurfaces.astro` component (planned) renders per-
surface kill-switch state.

### 6.4 Decision-log integration

`DecisionsTable.astro` reads the `decision` table directly.
Today the operator files decisions in `docs/15-decision-log.md`;
those don't automatically mirror into the DB. The intended
sync is a future scoped PR — flagged in
`dashboards/app/src/pages/decisions.astro` ops-note ("entries
land here automatically via parallel SQL inserts when wired").

### 6.5 Brand-expansion-gate integration

`docs/portfolio-expansion-gate.md` defines 8 / 9 box gates for
Brand B / Brand C launches. The dashboard does not currently
render a gate-progress widget. Acceptable at MVP (Brand A
hasn't launched yet; expansion gates are quarter-2+ concerns).

### 6.6 Launch-state vs prelaunch-state visibility

The dashboard reads `brand.status` directly (`planning`,
`active`, `hold`, `kill`, `scale`). The launch checklist updates
this on launch day per
`launch-packs/brand-a-mvp/08-launch-day-script.md` §"Status flip
in HQ". No additional dashboard surface needed — the existing
brand table reflects launch state in real time.

## 7. Security (re-verified)

- **No client-side data fetch.** Page frontmatter reads at
  build time only.
- **Service-role key** server-side only; the dashboard module's
  `supabase.ts` carries a top-of-file warning to that effect.
- **No PII rendered** anywhere.
- **No third-party trackers / pixels.**
- **No external JS frameworks** (no React / Vue / Svelte).
- **No `client:*` directives.** Verified by grep on
  `dashboards/app/src/`.
- **Static-only output.** `astro.config.mjs` does not configure
  any SSR adapter.
- **Cloudflare Access** at perimeter (operator-only); the
  dashboard does no auth itself, by design.
- **`gitleaks`** scans the dashboard with the same rules as the
  rest of the repo. Provider-key patterns excluded everywhere.
- **`astro-builds` CI job** (PR #77) builds the dashboard on
  every PR and asserts no secret patterns in `dist/`.

## 8. Sustainability over fast-MVP

The dashboard's MVP architecture survives because:

- **Per-widget fail-open** posture means a single bad query
  doesn't take the page down. The pattern is consistent across
  4 pages.
- **No client islands** means no JS-bundle surprise. Future PRs
  can introduce islands only through an explicit decision-log
  entry (gated by `docs/astro-security-upgrade-plan.md`).
- **No external chart library** means no version-pin churn.
- **The 5 reusable components** (`PortfolioCards`, `BrandTable`,
  `ProviderHealthTable`, `QuotaBurnIndicator`, `DecisionsTable`)
  are each independently swappable; adding a new page composes
  them without modification.
- **Empty / error states** are the default render for placeholder
  rows, not an afterthought.
- **Source-tagging** every number prevents tired-operator
  misreads.

## 9. What this PR does NOT change

- The dashboard's static-rendering model. Switching to SSR would
  introduce edge-side service-role-key handling — flagged as
  out-of-scope by both PR #15 and `docs/astro-security-upgrade-plan.md`.
- Any business-logic threshold. The drift watcher locks the
  canonical thresholds in `core/scoring/scoring.ts`.
- Any quota ceiling. Those move only via
  `playbooks/quarterly-platform-refresh.md`.
- The component layer. No refactor; only sync-point hardening.

## 10. Forward backlog (separate scoped PRs)

These are deferred (no urgency at MVP):

1. **`/brand/[slug]` detail page** — already on the dashboard
   backlog from PR #68.
2. **`MonetisationSurfaces.astro`** — once any affiliate / sponsor
   surface activates.
3. **Auto-mirror decisions** from `docs/15-decision-log.md` to
   the `decision` table.
4. **Portfolio-expansion-gate widget** — when Brand A approaches
   day-30 review.
5. **Net-revenue column on `BrandTable.astro`** — once revenue
   data exists.
6. **Workspace-package extraction of scoring / quota** — only if
   the duplication grows beyond two pairs.

## 11. CI verification (after this PR merges)

- **`typecheck-and-test`** — runs `npm test` which now executes
  `core/scoring/sync-with-dashboard.test.ts`. Any drift between
  the canonical thresholds (in `core/scoring/scoring.ts`) and
  the dashboard's copy (`dashboards/app/src/lib/scoring.ts`)
  fails this job.
- **`astro-builds`** (added in PR #77) — builds the dashboard
  on every PR. Asserts no secret patterns in `dist/`.
- **`gitleaks`** — pattern scan unchanged.

## 12. Tests run

```
$ npm run typecheck   # clean
$ npm test            # 38/38 green (was 35/35; +3 drift-watcher tests)
$ cd dashboards/app && npm run build   # 4 pages, ~1s
```

## 13. Cross-references

- PR #68 — original dashboard expansion.
- PR #77 — `astro-builds` CI job that asserts the dashboard's `dist/` is clean.
- `core/scoring/scoring.ts` — canonical scoring + verdict thresholds.
- `core/providers/quota-registry.ts` — canonical free-tier ceilings.
- `core/scoring/sync-with-dashboard.test.ts` — drift watcher.
- `docs/cost-control-and-free-tier-plan.md` §1, §2.
- `docs/profit-model.md` §6.
- `docs/measurement-framework.md` §9 — dashboard requirements list.
- `docs/portfolio-expansion-gate.md` §3 / §4 — future-state widget candidate.

Closes #73.
