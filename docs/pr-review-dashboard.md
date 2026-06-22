# PR Review Dashboard

> **Generated:** 2026-06-22
> **Branch:** `agent-b-work`
> **Open PRs reviewed:** 10
> **Dependabot PRs:** 10 (all from `app/dependabot`)

---

## Summary

| Category | Count |
|---|---|
| Total open PRs | 10 |
| Dependabot (bot) | 10 |
| Stale (>30 days) | 2 |
| Conflicting with main | 0 |
| Mergeable (GitHub status) | 10 |

All 10 PRs are **Dependabot** bumps, all are currently **mergeable** per GitHub, and **none** have merge conflicts with `main`. Two PRs are stale (>30 days old).

---

## PR Inventory

| # | Title | Branch | Created | Age (days) | Stale? | Mergeable | Recommendation | Priority |
|---|-------|--------|---------|-----------|--------|-----------|----------------|----------|
| 120 | Bump astro from 4.16.19 to 6.4.8 in /brands/templates/site | `dependabot/npm_and_yarn/brands/templates/site/astro-6.4.8` | 2026-06-20 | 2 | No | Yes | **Defer — requires staged migration** | P3 |
| 119 | Bump astro from 4.16.19 to 6.4.8 in /brands/brand-a-aiescape/site | `dependabot/npm_and_yarn/brands/brand-a-aiescape/site/astro-6.4.8` | 2026-06-20 | 2 | No | Yes | **Defer — requires staged migration** | P3 |
| 118 | Bump astro from 4.16.19 to 6.4.8 in /dashboards/app | `dependabot/npm_and_yarn/dashboards/app/astro-6.4.8` | 2026-06-20 | 2 | No | Yes | **Defer — requires staged migration** | P3 |
| 114 | Bump astro from 4.16.19 to 6.1.10 in /dashboards/app | `dependabot/npm_and_yarn/dashboards/app/astro-6.1.10` | 2026-06-13 | 9 | No | Yes | **Defer — requires staged migration** | P3 |
| 113 | Bump astro from 4.16.19 to 6.1.10 in /brands/brand-a-aiescape/site | `dependabot/npm_and_yarn/brands/brand-a-aiescape/site/astro-6.1.10` | 2026-06-13 | 9 | No | Yes | **Defer — requires staged migration** | P3 |
| 112 | Bump astro from 4.16.19 to 6.1.10 in /brands/templates/site | `dependabot/npm_and_yarn/brands/templates/site/astro-6.1.10` | 2026-06-13 | 9 | No | Yes | **Defer — requires staged migration** | P3 |
| 111 | Bump esbuild from 0.28.0 to 0.28.1 | `dependabot/npm_and_yarn/esbuild-0.28.1` | 2026-06-13 | 9 | No | Yes | **Review — safe patch, low blast radius** | P2 |
| 107 | Bump gitleaks/gitleaks-action from 2 to 3 | `dependabot/github_actions/gitleaks/gitleaks-action-3` | 2026-06-03 | 19 | No | Yes | **Review — CI action bump, needs smoke test** | P2 |
| 100 | Bump @types/node from 20.19.41 to 25.9.1 | `dependabot/npm_and_yarn/types/node-25.9.1` | 2026-05-23 | 30 | Borderline | Yes | **Defer — type-only, wait for Node runtime bump** | P3 |
| 99 | Bump tsx from 4.22.0 to 4.22.3 in the patch group | `dependabot/npm_and_yarn/patch-0ceacef693` | 2026-05-23 | 30 | Borderline | Yes | **Review — safe patch, dev-only** | P2 |

---

## Recommendation Detail

### P2 — Review & Merge (3 PRs)

These are safe patch/minor bumps with low blast radius. Each can be merged after a CI green check.

| PR | Package | Current → Proposed | Surface | Rationale |
|---|---|---|---|---|
| #111 | `esbuild` | 0.28.0 → 0.28.1 | Root (dev) | Patch bump. Build tooling — verify `npm run typecheck` + `npm test` green. |
| #107 | `gitleaks/gitleaks-action` | v2 → v3 | CI workflow | GitHub Action bump. Verify CI pipeline still passes. Note: CI currently pins `gitleaks-action@v2` in `ci.yml` — this PR updates it to v3. |
| #99 | `tsx` | 4.22.0 → 4.22.3 | Root (dev) | Patch bump, dev-only. No runtime impact. |

### P3 — Defer / Close (7 PRs)

These are either major-version bumps that require staged migration per our governance policy, or type-only bumps that should wait for a runtime alignment.

| PR | Package | Current → Proposed | Surface | Rationale |
|---|---|---|---|---|
| #120 | `astro` | 4.16.19 → 6.4.8 | brands/templates/site | Two-major jump. Governed by `docs/astro-security-upgrade-plan.md`. XSS fix not applicable to our static output. Requires staged 4→5→6 migration. |
| #119 | `astro` | 4.16.19 → 6.4.8 | brands/brand-a-aiescape/site | Same as #120. |
| #118 | `astro` | 4.16.19 → 6.4.8 | dashboards/app | Same as #120. Dashboard is behind Cloudflare Access — not publicly exposed. |
| #114 | `astro` | 4.16.19 → 6.1.10 | dashboards/app | Superseded by #118 (same surface, newer target). Close if #118 is actioned. |
| #113 | `astro` | 4.16.19 → 6.1.10 | brands/brand-a-aiescape/site | Superseded by #119. Close if #119 is actioned. |
| #112 | `astro` | 4.16.19 → 6.1.10 | brands/templates/site | Superseded by #120. Close if #120 is actioned. |
| #100 | `@types/node` | 20.19.41 → 25.9.1 | Root (dev) | Type-only package. CI runs Node 20. Bumping types ahead of runtime creates drift. Defer until Node 20→22 runtime bump (which is itself a prerequisite for Astro 6). |

### Suppression Register

Per `docs/dependabot-security-audit.md` §5, the following suppressions are active:

| Package | PRs | Reason | Re-review |
|---|---|---|---|
| `astro` 4.x → 6.x | #112, #113, #114, #118, #119, #120 | Reflected XSS fix (6.3.3) requires hydrated components + SSR — neither exists in our static-only consumers. Staged 4→5→6 migration plan governs. | 2026-08-16 (quarterly) or sooner if new applicable CVE lands |
| `@types/node` 20 → 25 | #100 | Type-only; wait for Node runtime bump to 22 (Astro 6 prerequisite) | When Node runtime moves to 22 |

---

## Stale PR Policy

A PR is considered **stale** when it has been open for more than 30 days without activity.

| PR | Age | Status |
|---|---|---|
| #100 (`@types/node`) | 30 days (2026-05-23) | Borderline stale. No activity since creation. Recommend closing with a note to revisit at Node 22 migration. |
| #99 (`tsx`) | 30 days (2026-05-23) | Borderline stale. Low-risk patch — recommend merging if CI green, closing if abandoned. |

**Policy:** Dependabot PRs that are stale and have no merge conflicts should be:
1. **Patch/minor bumps** (P2): Merged if CI is green, closed with a "superseded by newer bump" comment if a newer bump for the same package exists.
2. **Major bumps** (P3): Closed with a reference to the governing document (`docs/astro-security-upgrade-plan.md` or `docs/dependabot-security-audit.md`). Dependabot will re-open if a new advisory lands.

---

## Priority Action Order

1. **Merge #99** (tsx 4.22.0 → 4.22.3) — dev-only patch, zero risk.
2. **Merge #111** (esbuild 0.28.0 → 0.28.1) — build-tooling patch, verify CI green.
3. **Review #107** (gitleaks-action v2 → v3) — CI action bump, verify CI still passes.
4. **Close #112, #113, #114** — superseded by #118/#119/#120 respectively.
5. **Close #100** (`@types/node`) — defer until Node 22 runtime bump.
6. **Close #118, #119, #120** (Astro 6.4.8) — defer per staged migration plan. Comment with link to `docs/astro-security-upgrade-plan.md`.
7. **Re-evaluate at quarterly review (2026-08-16)** or sooner if a new CVE lands on a package we use.

---

## Astro 4.x → 6.x Migration Context

Six of the 10 open PRs are Astro major-version bumps. This is a **planned staged migration**, not a blind bump. Key facts:

- **Current version:** Astro 4.16.19 (all three consumers)
- **Target version:** Astro 6.4.8 (latest)
- **Consumers:** `dashboards/app`, `brands/templates/site`, `brands/brand-a-aiescape/site`
- **Deployment model:** Static output only (`output: 'static'`), zero client islands, zero SSR
- **Security relevance:** The CVE fixed in Astro 6.3.3 (reflected XSS in slot names on hydrated SSR components) does **not apply** to our code — verified by `grep` showing zero `client:*` directives, zero `ViewTransitions`/`ClientRouter`, zero SSR adapters.
- **Blocker for Astro 6:** Requires Node 22.12.0+ (CI currently on Node 20). The Node bump is a separate prerequisite.
- **Governing document:** `docs/astro-security-upgrade-plan.md`
- **Recommended path:** Three separate PRs — (1) CI Node 20→22, (2) Astro 4→5, (3) Astro 5→6 — each with full build verification.

---

## Related Documents

- `docs/astro-security-upgrade-plan.md` — Staged Astro 4→5→6 migration plan
- `docs/dependabot-security-audit.md` — Full security audit framework and suppression register
- `playbooks/package-hygiene.md` — Ongoing dependency hygiene SOP
- `.github/dependabot.yml` — Dependabot configuration
