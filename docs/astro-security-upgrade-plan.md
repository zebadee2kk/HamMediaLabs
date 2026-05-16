# Astro Security Upgrade Plan (response to Dependabot PR #12)

> **Status:** Decision document. PR #12 is **not** to be auto-merged. The
> recommendation below is to **defer** the 4.x → 6.x jump and instead bump
> to the latest 4.x patch, then plan 4 → 5 → 6 as a staged migration in
> Phase 6.
>
> **Author:** Phase 5.3 analysis. Last updated: 2026-05-16.
> **Decision owner:** Operator. Re-review at the next quarterly cadence.

---

## 1. Trigger

Dependabot PR [#12](https://github.com/zebadee2kk/HamMediaLabs/pull/12)
bumps `astro` from `^4.16.0` to `^6.3.3` in two places:

- `dashboards/app/package.json`
- `brands/templates/site/package.json`

This is a **two-major** upgrade (4 → 5 → 6) wrapped in a single
dependency bump. The Astro 6.3.3 release notes specifically call out a
fix for a "reflected XSS vulnerability where slot names on hydrated
components were not HTML-escaped in SSR output."

Per `CONTRIBUTING.md` and Issue #18, we evaluate this as a controlled
security + compatibility project, not a blind merge.

## 2. What changed across the version boundary

### 2.1 Astro 5 (4 → 5) — selected breaking changes

Source: [docs.astro.build / Upgrade to v5](https://docs.astro.build/en/guides/upgrade-to/v5/).

| Change | Affects us? |
|---|---|
| New Content Layer API; `src/content/config.ts` → `src/content.config.ts` | **No** — we use no content collections |
| `type: 'content'` replaced by loader pattern | **No** |
| `post.slug` → `post.id` for collection entries | **No** |
| `entry.render()` replaced by imported `render()` from `astro:content` | **No** |
| `layout:` removed from Markdown collections | **No** |
| `getCollection()` sort order now non-deterministic | **No** |

### 2.2 Astro 6 (5 → 6) — selected breaking changes

Sources: [docs.astro.build / Upgrade to v6](https://docs.astro.build/en/guides/upgrade-to/v6/), [byteiota writeup](https://byteiota.com/astro-6-migration-guide-node-22-content-layer-api-vite-environment-api/).

| Change | Affects us? |
|---|---|
| **Node 22.12.0+ required** (drops Node 18 / 20) | **Yes** — CI currently uses Node 20; bump needed |
| Vite 7 + Vite Environment API | **No directly** — our `vite:` block in `astro.config.mjs` only sets `server.hmr.overlay`, which is unchanged |
| Zod 4 upgrade (`astro/zod` import path) | **No** — we don't import Zod |
| `<ViewTransitions />` → `<ClientRouter />` | **No** — we don't use either |
| `Astro.glob()` removed → use `import.meta.glob()` | **No** — grep across `dashboards/app/src` and `brands/templates/site/src` returns zero hits |
| Content Collections API tightening (continued from v5) | **No** |
| All official server adapters bumped to a new major | **No** — we don't use a server adapter (both consumers are static) |

### 2.3 Aggregate breaking-change surface area

```
$ grep -rE "client:|ViewTransitions|ClientRouter|Astro\.glob|getCollection|src/content" \
       dashboards/app/src brands/templates/site/src
(no matches)
```

We have **zero** code-level breaking-change exposure in 4 → 5 → 6
**except** the CI Node version bump (20 → 22.12.0+).

## 3. Our actual Astro usage (inventory)

### 3.1 `dashboards/app/`

- Static output (`output: 'static'`, default).
- One page, three or four components, one lib module, no client islands.
- No `client:*` directives in any `.astro` file.
- Server-side data fetch happens in page frontmatter at build time, not at
  request time.
- No SSR adapter. No request-time rendering.

### 3.2 `brands/templates/site/`

- Static output.
- Compliance pages + a Disclosure component + a Base layout.
- No client islands. No client router. No content collections.

### 3.3 Implication

The reflected XSS fixed in 6.3.3 is in **slot names on hydrated
components**. Hydrated components require `client:*` directives. We use
no `client:*` directives. **The vulnerability does not apply to our
code.** This is the single most important fact in this document.

This does not mean the vulnerability is irrelevant — every brand that
copies `brands/templates/site/` inherits the same library. If a future
brand adds client islands, the exposure starts there. The staged
migration in §6 anticipates this.

## 4. Vulnerability impact assessment

| CVE / fix | Affects our code today? | Affects future brand sites? |
|---|---|---|
| Reflected XSS in slot names on hydrated SSR components (fixed in 6.3.3) | **No** (no hydrated components, no SSR) | **Only if** a future brand adds client islands; we will gate that on the upgrade plan in §6 |
| Astro 4.x client-router DOM Clobbering XSS (patched in 4.16.1; we are on 4.16.x already) | **No** (no client router enabled) | Same — gated on client-router opt-in |
| CVE-2026-25545 / CVE-2026-27829 SSRF via Host header / SSR pathways | **No** (no SSR) | Only if a future brand swaps to `output: 'server'` |

No active vulnerability in our deployed surface as of 2026-05-16.

## 5. Options considered

| Option | Description | Pros | Cons | Verdict |
|---|---|---|---|---|
| **A — Merge PR #12 as-is** | Blind two-major bump | Closes the Dependabot alert; immediate latest version | Two majors at once; Node version bump on CI also required; no smoke-test plan; brand template seed could break every future brand | **Rejected** — violates the "no blind dependency bump" rule in #18 |
| **B — Partial upgrade: 4 → 5 only, in this PR** | Bump to a recent 5.x release in both consumers | Smaller jump; closes most of the breaking-change surface area | Still ships across two consumers in one PR; still a major; not the version that contains the 6.3.3 security fix | **Rejected** — half-measure, no security upside |
| **C — Deferred staged migration** | Stay on latest 4.x patch; plan 5.x as Phase 6 issue, 6.x as separate Phase 6 issue | Mirrors how we treat every other major dependency change; preserves the rule that brand templates are stable seeds; honest about not having a smoke environment | Defers the modernisation by ~1 quarter | **Recommended** |
| **D — Stay on current pin indefinitely** | Do nothing | Zero risk this quarter | Drift accumulates; eventually a real CVE will land that *does* apply | Acceptable as fallback only; not the plan |

## 6. Recommendation

**Option C — Deferred staged migration.**

### 6.1 Immediate action (this PR)

- Land this document.
- Comment on PR #12 with a pointer here and a recommendation to **close**.
  Closing requires Codex / human approval, not Claude — the PR stays open
  pending review.
- Confirm we are on the latest available 4.x patch. As of 2026-05-16 the
  package.json files pin `^4.16.0`; the actual installed version is the
  highest 4.x available at install time. Run `npm install` in both
  consumer folders and check `npm ls astro` after merging this doc; if a
  newer 4.x patch is available, open a follow-up PR pinning to it.

### 6.2 Phase 6 issues (each a separate PR)

1. **CI Node bump** — `actions/setup-node@v4` config and `package.json`
   `engines.node` move to `22.12.0`. No code change, just CI.
2. **Astro 4 → 5** — bump in both consumers; run `npm run build`
   end-to-end; render and visually inspect; gitleaks + typecheck. Risk
   stays low because our content-collection surface is zero.
3. **Astro 5 → 6** — bump in both consumers; same verification. Includes
   any future Vite Environment API tweaks if our `vite:` config grows.
4. **Future client islands** — if any brand adds a `client:*` directive,
   that brand opens its own follow-up PR to confirm it is on a version
   ≥ 6.3.3 *before* shipping the island.

### 6.3 Why staged not bundled

- We have **two consumers** on this dependency. A single PR that breaks
  one and not the other is worse than two PRs where one passes and one
  fails loudly.
- We have **no end-to-end smoke environment** beyond `npm run build`.
- Brand template is the **seed** for every brand site. A broken seed
  ships its breakage to every brand that copies it later.
- The CI Node bump is genuinely independent and should not be tangled
  with a framework major bump.

## 7. Risk analysis (summary)

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Active exploitation of the 6.3.3 XSS against our sites | Negligible (no hydrated components) | High if it applied | Not applicable to current code; gated for future brands |
| New CVE landing in Astro 4.x that *does* affect us | Low | Medium–High | Quarterly review per `playbooks/provider-revalidation.md`; bump to 4.x patch immediately if so |
| Drift makes the eventual 5/6 migration harder | Medium | Low | Staged plan in §6; do the bumps before any brand grows client islands |
| Dependabot opens further bumps before plan executes | High | Low | Each bump triggers a §6.1 check; we close PRs that violate this plan with a link to it |
| CI Node bump breaks unrelated tools | Low | Medium | Separate PR; full CI run before merge |

## 8. Security rationale (one paragraph for skim readers)

We are on Astro 4.x with `output: 'static'` and zero client islands in
both consumers. The reflected XSS fixed in Astro 6.3.3 requires hydrated
components; we have none. The SSR-related CVEs require an SSR adapter;
we have none. The 4.x client-router XSS was patched at 4.16.1 and we
are on 4.16.x. The right action is to **stay on a patched 4.x**, plan
the 5.x and 6.x bumps as separate scoped PRs, and gate any future
client-island work on being on a fixed major. This is the
governance-first answer; the Dependabot bundle is the blind answer.

## 9. Decision-log entry (to be filed when this PR merges)

```
### Date: 2026-05-16
### Decision:
Defer the Astro 4.x → 6.x jump proposed by Dependabot PR #12. Stay on
the latest available 4.x patch. Plan 4 → 5, 5 → 6, and the CI Node bump
as three separate Phase 6 PRs.

### Reasoning:
The 6.3.3 XSS fix applies only to hydrated components; our two Astro
consumers (`dashboards/app`, `brands/templates/site`) ship pure static
output with zero client islands and no SSR adapter, so the vulnerability
is non-applicable. A two-major bump touching two consumers in a single
PR violates our "no blind dependency bump" rule.

### Alternatives considered:
- Blind merge (rejected, see §5 option A).
- Partial 4 → 5 only (rejected, §5 option B).
- Stay indefinitely (rejected, §5 option D).

### Risks:
Drift across a quarter; mitigated by the staged plan in §6.

### Revisit date:
2026-08-16 (quarterly) or sooner if a new CVE applies.
```

## 10. Action on PR #12

Comment recommending **closure** with a link to this document. Do not
close from this PR — closure is a reviewer action (Codex / operator).

## 11. Out of scope

- The actual upgrade work for 5.x and 6.x (separate Phase 6 PRs).
- The CI Node bump (separate PR — does not require Astro work).
- Production deployment changes.
- A smoke-test harness for Astro builds (a follow-up if migration risk
  grows).

## 12. References

- Dependabot PR #12: https://github.com/zebadee2kk/HamMediaLabs/pull/12
- Astro v5 upgrade guide: https://docs.astro.build/en/guides/upgrade-to/v5/
- Astro v6 upgrade guide: https://docs.astro.build/en/guides/upgrade-to/v6/
- Astro 6 migration writeup (Node 22 + Content Layer + Vite Env API):
  https://byteiota.com/astro-6-migration-guide-node-22-content-layer-api-vite-environment-api/
- Issue #18: https://github.com/zebadee2kk/HamMediaLabs/issues/18
- Local Astro usage inventory: §3 above; grep confirms no client islands
  / content collections / `Astro.glob` / `ViewTransitions` in the
  consumer trees.
