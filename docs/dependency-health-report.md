# Dependency Health Report

> **Generated:** 2026-06-22
> **Branch:** `agent-b-work`
> **Repository:** HamMediaLabs (ProjectHydra)
> **Package manager:** npm (lockfileVersion 3)

---

## 1. Current Dependency Status

### 1.1 Root (`/package.json`)

| Package | Spec | Resolved | Latest (npm) | Status |
|---|---|---|---|---|
| `@types/node` | `^20.14.0` | 20.19.41 | 25.9.1 | Outdated (major) |
| `tsx` | `^4.19.0` | 4.22.0 | 4.22.3 | Outdated (patch) |
| `typescript` | `^5.5.0` | 5.9.3 | 6.x | Outdated (major) |

**Notes:**
- `npm outdated` returned empty output, meaning npm considers all packages within their spec ranges. The table above shows the gap between **resolved** and **latest available**.
- `@types/node` is type-only (erased at build time). The spec `^20.14.0` resolves to 20.19.41. Dependabot PR #100 proposes jumping to 25.9.1 — this should wait until the Node runtime itself bumps to 22 (Astro 6 prerequisite).
- `typescript` 5.9.3 is the latest in the 5.x line. TypeScript 6.x is a major with breaking type-inference changes. No security driver for the bump.

### 1.2 Dashboard (`/dashboards/app/package.json`)

| Package | Spec | Resolved | Latest | Status |
|---|---|---|---|---|
| `astro` | `^4.16.0` | 4.16.19 | 6.4.8 | Outdated (2 majors) |

### 1.3 Brand Template (`/brands/templates/site/package.json`)

| Package | Spec | Resolved | Latest | Status |
|---|---|---|---|---|
| `astro` | `^4.16.0` | 4.16.19 | 6.4.8 | Outdated (2 majors) |

### 1.4 Brand A — AIEScape (`/brands/brand-a-aiescape/site/package.json`)

| Package | Spec | Resolved | Latest | Status |
|---|---|---|---|---|
| `astro` | `^4.16.0` | 4.16.19 | 6.4.8 | Outdated (2 majors) |

### 1.5 Build Tooling (transitive, root lockfile)

| Package | Resolved | Latest | Status |
|---|---|---|---|
| `esbuild` | 0.28.0 | 0.28.1 | Outdated (patch) |

---

## 2. Critical Updates Needed

### 2.1 Immediate (patch/minor, low risk)

| Package | Current | Target | PRs | Action |
|---|---|---|---|---|
| `tsx` | 4.22.0 | 4.22.3 | #99 | Merge patch bump. Dev-only, zero runtime impact. |
| `esbuild` | 0.28.0 | 0.28.1 | #111 | Merge patch bump. Build tooling — verify CI green. |

### 2.2 Short-term (this quarter)

| Package | Current | Target | PRs | Action |
|---|---|---|---|---|
| `gitleaks/gitleaks-action` | v2 | v3 | #107 | Review and merge. CI action bump — verify CI pipeline still passes. |

### 2.3 Deferred (governed by staged migration plan)

| Package | Current | Target | PRs | Action |
|---|---|---|---|---|
| `astro` (×3 consumers) | 4.16.19 | 6.4.8 | #112–#120 | **Do not merge.** Requires staged 4→5→6 migration. See §3 below. |
| `@types/node` | 20.19.41 | 25.9.1 | #100 | **Defer.** Type-only. Wait for Node 22 runtime bump (Astro 6 prerequisite). |
| `typescript` | 5.9.3 | 6.x | (none open) | **Defer.** No security driver. Batch with toolchain refresh. |

---

## 3. Astro Version Analysis: 4.x → 6.x

### 3.1 The Gap

All three Astro consumers are pinned to `^4.16.0`, resolving to **4.16.19**. The latest available is **6.4.8**. This is a **two-major jump** (4 → 5 → 6) that Dependabot has proposed as a single bump in 6 open PRs.

### 3.2 What Each Major Introduces

#### Astro 5 (4 → 5)

| Breaking Change | Affects This Repo? |
|---|---|
| New Content Layer API (`src/content/config.ts`) | **No** — no content collections used |
| `type: 'content'` replaced by loader pattern | **No** |
| `post.slug` → `post.id` | **No** |
| `entry.render()` → `render()` from `astro:content` | **No** |
| `layout:` removed from Markdown collections | **No** |
| `getCollection()` sort order non-deterministic | **No** |

**Verdict:** Zero code-level breaking changes for our usage.

#### Astro 6 (5 → 6)

| Breaking Change | Affects This Repo? |
|---|---|
| **Node 22.12.0+ required** | **Yes** — CI uses Node 20 |
| Vite 7 + Vite Environment API | **No** — our `vite:` config is minimal |
| Zod 4 (`astro/zod` import path) | **No** — we don't import Zod |
| `<ViewTransitions />` → `<ClientRouter />` | **No** — we use neither |
| `Astro.glob()` removed → `import.meta.glob()` | **No** — zero hits in our source |
| Content Collections API tightening | **No** |
| Server adapters bumped to new major | **No** — we use static output only |

**Verdict:** Only the Node version requirement affects us. Zero code-level breaking changes.

### 3.3 Security Analysis

The primary security driver for the Astro 6.x line is a **reflected XSS vulnerability** fixed in Astro 6.3.3, where slot names on hydrated components were not HTML-escaped in SSR output.

**Does this vulnerability apply to our code?**

| Precondition | Present in Our Code? |
|---|---|
| Hydrated components (`client:*` directives) | **No** — zero `client:*` directives across all consumers |
| SSR adapter / `output: 'server'` | **No** — all consumers use default static output |
| User-controlled slot names | **No** — all slot content is build-time authored |

**Conclusion:** The vulnerability is **not exploitable** in our deployment. This was verified by:
- `grep -rE "client:|ViewTransitions|ClientRouter|Astro\.glob|getCollection|src/content"` returning zero matches across all consumer source trees
- Build output containing zero JS files (static HTML/CSS only)
- Dashboard behind Cloudflare Access (not publicly accessible)

### 3.4 Recommended Migration Path

Per `docs/astro-security-upgrade-plan.md`, the migration should happen in **three separate PRs**:

| Step | Change | Verification |
|---|---|---|
| 1. CI Node bump | `actions/setup-node@v4`: `node-version: '20'` → `'22.12.0'`; `package.json` `engines.node` → `>=22.12.0` | `npm run typecheck` + `npm test` green |
| 2. Astro 4 → 5 | Bump `astro` to latest 5.x in all three consumers | `npm run build` in each consumer green; `gitleaks` green |
| 3. Astro 5 → 6 | Bump `astro` to latest 6.x in all three consumers | Same verification |

Each step is independently revertible. Each step gets its own PR with its own CI run.

### 3.5 Risk of Deferral

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| New CVE on Astro 4.x that *does* apply to static output | Low | Medium–High | Quarterly review (next: 2026-08-16); immediate bump if applicable CVE lands |
| Drift makes eventual migration harder | Medium | Low | Staged plan is documented; execute before any brand adds client islands |
| Dependabot opens more bump PRs before migration | High | Low | Close with link to `docs/astro-security-upgrade-plan.md` |

---

## 4. Dependabot PR Summary

| PR | Package | Bump | Surface | Verdict |
|---|---|---|---|---|
| #120 | `astro` | 4.16.19 → 6.4.8 | brands/templates/site | Defer (staged migration) |
| #119 | `astro` | 4.16.19 → 6.4.8 | brands/brand-a-aiescape/site | Defer (staged migration) |
| #118 | `astro` | 4.16.19 → 6.4.8 | dashboards/app | Defer (staged migration) |
| #114 | `astro` | 4.16.19 → 6.1.10 | dashboards/app | Defer (superseded by #118) |
| #113 | `astro` | 4.16.19 → 6.1.10 | brands/brand-a-aiescape/site | Defer (superseded by #119) |
| #112 | `astro` | 4.16.19 → 6.1.10 | brands/templates/site | Defer (superseded by #120) |
| #111 | `esbuild` | 0.28.0 → 0.28.1 | Root (dev) | **Merge** (patch, low risk) |
| #107 | `gitleaks/gitleaks-action` | v2 → v3 | CI workflow | **Review** (CI action bump) |
| #100 | `@types/node` | 20.19.41 → 25.9.1 | Root (dev) | Defer (wait for Node 22) |
| #99 | `tsx` | 4.22.0 → 4.22.3 | Root (dev) | **Merge** (patch, dev-only) |

---

## 5. Related Documents

- `docs/astro-security-upgrade-plan.md` — Staged Astro 4→5→6 migration plan (canonical)
- `docs/dependabot-security-audit.md` — Full security audit framework, suppression register, and per-PR assessments
- `docs/pr-review-dashboard.md` — PR review dashboard (companion document)
- `playbooks/package-hygiene.md` — Ongoing dependency hygiene SOP
- `.github/dependabot.yml` — Dependabot configuration
