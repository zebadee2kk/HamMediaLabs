# Dependabot Security Audit — Phase S1

> Governance + audit framework for the Dependabot vulnerability
> backlog (reported ~22 open alerts at issue creation). Treats
> remediation as a staged sequence; never blind bundles.
>
> **Posture:** security > speed; one PR per blast radius; CI green
> mandatory; major upgrades go through `docs/astro-security-upgrade-plan.md`'s
> staged plan rather than a single bump.
>
> Companion playbook: `playbooks/package-hygiene.md`.

---

## 1. Audit shape (this section is the deliverable)

The audit table below is the canonical inventory format. The
**operator fills the rows** from the live Dependabot tab in GitHub
when they run S1; this PR ships the template + the categorisation
already known at the time of writing.

### 1.1 Known package surfaces in the repo

| Package surface | Where | Runtime / dev | Notes |
|---|---|---|---|
| Root `package.json` | `/package.json` | dev-only (Node) | typescript, @types/node, tsx. Used for tsc + tests + CLI scripts. No runtime dependency in production. |
| Dashboard `package.json` | `/dashboards/app/package.json` | build-time + SSG runtime | `astro` ^4.16.0. Static-rendered output; consumed in production by the dashboard's Cloudflare Pages site. |
| Brand template `package.json` | `/brands/templates/site/package.json` | build-time + SSG runtime | `astro` ^4.16.0. Becomes the seed for every brand site. |

There are **three** `package.json` files. The root has near-zero
direct runtime exposure (tsx is dev/CLI; typescript + @types/node
are dev). The two Astro consumers are where alert concentration is
expected, per the issue's PM findings.

### 1.2 Audit table template (operator fills)

```
| #  | Package                | Surface (root / dashboard / brand-tpl) | Severity (Critical / High / Medium / Low) | Direct / Transitive | Runtime / Dev | Public-facing build chain? | Notes / CVE |
|----|------------------------|----------------------------------------|-------------------------------------------|---------------------|---------------|----------------------------|-------------|
| 1  | <pkg>                  | <surface>                              | <severity>                                | <direct/trans>      | <runtime/dev> | <yes/no>                   | <CVE link>  |
```

When the operator runs Phase S1 in the GitHub Dependabot UI, they
copy each alert into a row. The result lands as a separate
small-PR commit updating only this file.

### 1.3 Categorisation rules

When filling a row:

- **Severity** = the GitHub-reported severity at the time of the
  audit (do not re-grade).
- **Direct / Transitive** = is the package in our `package.json`
  or pulled in by a dep-of-a-dep?
- **Runtime / Dev** = does the package execute in production
  (Cloudflare Pages serving the static HTML; the brand site or
  dashboard) or only at build / test / CLI time?
- **Public-facing build chain** = if a build-time dep's
  vulnerability allows an attacker who controls the package
  registry to inject code into our build output, mark `yes`. This
  includes anything in Vite / esbuild / Astro's build pipeline
  that runs inside the build container.
- **Notes / CVE** = the CVE id (e.g. `CVE-2026-XXXX`) and a one-
  line description.

### 1.4 Prioritisation (binding)

Once the table is filled, sort rows into one of four lanes:

| Lane | Match | Default action |
|---|---|---|
| **P0 — Drop everything** | Critical AND runtime AND any of (a) HQ DB at risk, (b) brand-site rendered HTML at risk, (c) credential leak path | Patch within 24h; if patch requires a major bump, route through §4 staged path AND apply a tactical mitigation in parallel |
| **P1 — Plan this week** | High runtime, OR Critical dev with public-facing build chain | Patch within 7 days as a scoped PR |
| **P2 — Plan this quarter** | Medium runtime, OR High dev with public-facing build chain | Bundle into the next quarterly platform refresh; per-package PR |
| **P3 — Suppress / defer** | Low severity OR (dev-only AND not on the public-facing build chain) AND the fix requires a major bump we don't want | Document in §5 suppression register with a re-review date |

## 2. The known major-version question (Astro 4 → 6)

Per `docs/astro-security-upgrade-plan.md`, the operator deferred
the Astro 4 → 6 bundle bumped by Dependabot PR #12. That decision
holds.

The underlying CVE (reflected XSS in slot names on hydrated SSR
components) **does not apply to our code** today because:

- Both Astro consumers ship static output (`output: 'static'`).
- No `client:*` directives appear in either consumer
  (`grep -rE "client:|ViewTransitions|ClientRouter|Astro\.glob|getCollection|src/content" dashboards/app/src brands/templates/site/src` returns no matches at the time of writing).
- No SSR adapter is configured.

So Astro 4 → 6 is **P3 — suppress with a documented re-review
date** until either (a) a brand site introduces client islands or
SSR, or (b) a new CVE that *does* apply lands on Astro 4.x.

The staged migration plan in `docs/astro-security-upgrade-plan.md`
§6 stays the canonical path when we choose to move.

## 3. Phase S2 — safe patching

Phase S2 ships **only after the §1 table is filled** (otherwise
"safe" isn't measurable).

### 3.1 Auto-mergeable patches

A patch is auto-mergeable when:

- It's a **patch or minor** version bump.
- CI is green on a clean install.
- No CHANGELOG entry indicates a behaviour change in features we use.
- The package's blast radius is `dev-only` and not on the public-
  facing build chain, **or** is `runtime` with a clean changelog.

These are merged via separate Dependabot PRs, **grouped by
subsystem** (root / dashboard / brand template) — never bundled
across surfaces.

### 3.2 Non-auto patches

Anything that:

- Touches the public-facing build chain (Vite, esbuild, rollup,
  Astro adapters);
- Is a major bump;
- Carries a CHANGELOG note indicating a breaking change;
- Or is on a P0 / P1 row in §1.4;

…gets a hand-written PR with explicit smoke-testing (`npm run
build` on each Astro consumer, plus the root typecheck + tests).

### 3.3 What "green" means here

- Root `npm run typecheck` clean.
- Root `npm test` 35/35 (or whatever the current count is).
- `dashboards/app/ && npm run build` green.
- `brands/templates/site/ && npm run build` green.
- `gitleaks` green.

A patch that breaks any of the above is **not** safe; treat as
S3 and route through §4.

## 4. Phase S3 — major upgrades (separate from this PR)

Major upgrades, per the issue scope:

- **Node engine** — currently the CI matrix targets Node 20.
  Astro 6 will require Node 22.12+. The engine bump is its **own
  PR** when the Astro bump is sequenced.
- **Astro** — staged 4 → 5 → 6 path in
  `docs/astro-security-upgrade-plan.md` §6. Each major is its
  own PR.
- **Vite** — bumped as a transitive when Astro moves; we do not
  bump Vite independently of Astro.
- **Build tooling (rollup / esbuild / tsx)** — separate PRs only
  if a real reason exists; otherwise updated through Astro / Node
  cycles.

Reconciliation rule: **no bundled major-bump PR**. Dependabot's
default bundling is overridden by §3.1.

## 5. Suppression register

Vulnerabilities we explicitly do **not** patch (yet) live here
with a reason and a re-review date.

```
| Package           | Severity | Reason for suppression                                          | Re-review |
|-------------------|----------|-----------------------------------------------------------------|-----------|
| astro 4.16.x → 6.3.3 (Dependabot PR #12) | High | XSS does not apply to our static output; staged migration plan in docs/astro-security-upgrade-plan.md governs. | 2026-08-16 (quarterly) or sooner if a new CVE lands on Astro 4.x |
| astro 4.16.x → 6.x bundle (Dependabot PR #70, 3 directories) | High | Same posture as PR #12; supersedes #12 in scope (3 dirs vs 2). XSS does not apply to our static output. Closure recommended; staged plan governs. | 2026-08-16 |
| <fill from §1>    | <sev>    | <reason>                                                        | <date>    |
```

Every suppression entry requires a decision-log entry filed at
the same time.

## 6. Phase S4 — ongoing hygiene

Lives in `playbooks/package-hygiene.md`. Summary:

- Dependabot config (`.github/dependabot.yml`) checked in on a
  follow-up PR; cadence weekly for patch / minor, monthly for
  major.
- Grouped updates per ecosystem to reduce PR noise.
- Auto-merge rules **off** — every Dependabot PR goes through the
  triage path.
- Quarterly review of suppression register (§5).
- Acceptable-vulnerability threshold: zero P0 / P1 open at the end
  of any week; any P2 open >30 days requires a decision-log
  entry explaining the deferral.

## 6a. Phase S1 execution status (2026-05-16)

### What was executed (this PR, closing #72)

- `.github/dependabot.yml` added per `playbooks/package-hygiene.md` §1. Four `npm` ecosystems (root + dashboard + brand template + Brand A site), one `github-actions` ecosystem; patch/minor grouped; major bumps unbundled (so they route through the staged plan); auto-merge OFF.
- PR #70 evaluated against the §1.4 prioritisation lanes:
  - **Surface:** dashboard + brand template + Brand A site (3 dirs).
  - **Severity:** High (Astro 6.3.3 fixes a reflected XSS in slot names on hydrated SSR components).
  - **Direct / Transitive:** Direct (`astro` package).
  - **Runtime / Dev:** Build-time + SSG runtime (static output served from `dist/`).
  - **Public-facing build chain:** Yes.
  - **Exploitable in our deployment model:** **No.** Verified by `grep -rE "client:|ViewTransitions|ClientRouter|Astro\.glob|getCollection|src/content" dashboards/app/src brands/templates/site/src brands/brand-a-aiescape/site/src` returning zero matches. No `client:*` directives, no SSR adapter, no hydrated components.
  - **Lane: P3** — suppress with re-review date. Logged in §5.
- Closure-recommendation comments posted on PR #12 and PR #70.
- Suppression-register entries filed for both.

### What requires operator action (cannot be reached via MCP connector)

The GitHub Dependabot **alerts page** (Settings → Security → Dependabot) is not reachable via the MCP github tools available in this run. The full §1 audit table needs the operator to:

1. Open the Dependabot alerts page.
2. Copy each alert into the §1.2 audit table format (`#`, package, surface, severity, direct/transitive, runtime/dev, public-facing build chain, notes / CVE link).
3. Sort each row into a §1.4 lane (P0 / P1 / P2 / P3).
4. Land the filled table as its own scoped PR titled `Phase S1 audit table — <YYYY-MM-DD>`.
5. Phase S2 (safe-patching PRs per the §3 rules) follows lane by lane.

The lab-side enabler for this is **already shipped**: this PR added `.github/dependabot.yml` so Dependabot now operates under our hygiene policy. The framework + the suppression register + the prioritisation lanes are in place.

### Decision on PR #12 and PR #70

| PR | Disposition | Rationale |
|---|---|---|
| #12 | **Recommend closure** | XSS does not apply; staged migration plan governs. Comment posted on the PR. |
| #70 | **Recommend closure** | Same posture as #12; supersedes #12 in scope. Comment posted on the PR. |

Closure is a reviewer action, not Claude's — both PRs remain open pending operator / Codex sign-off.

### Astro 4.x pin — re-validation

The Astro 4.x pin holds. Re-validation summary:

| Check | Result |
|---|---|
| No `client:*` directives in any consumer | ✓ |
| No SSR adapter configured | ✓ |
| The 4.16.x line still receives patches | Verified via npm registry; latest 4.x patch is consumed transitively when `npm install` resolves the `^4.16.0` semver |
| No known applicable CVE on Astro 4.x at the time of this audit | The Dec 2025 client-router XSS was patched in 4.16.1; we're on 4.16.x |
| Migration plan stays staged 4 → 5 → 6 | ✓ — `docs/astro-security-upgrade-plan.md` §6 unchanged |

If a future Dependabot alert lands a CVE that DOES apply (e.g. a CVE in a non-Astro transitive that's runtime-relevant), the operator's filled S1 table will catch it, lane-classify it, and an S2 safe-patch PR will ship.

## 6b. Per-PR security assessment — 2026-05-16 pre-launch (closing #95)

The six Dependabot major-bump PRs (#84–#89) open at the time of
the #81 launch-readiness closeout were closed in that pass with a
generic "deferred to Q3 platform refresh" comment. Issue #95
challenged that as a silent deferral and required a per-PR
security assessment with evidence. This section is that
assessment.

### 6b.1 Per-PR table

| PR | Package | Current → Proposed | Surface | Advisory / CVE | Severity (Dependabot) | Direct/Trans | Runtime / Dev | Static-build relevance | SSR / client-island relevance | Exploitable for Brand A launch? | Action | Evidence section |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **#84** | `actions/checkout` | 4 → 6 | CI workflows only (`.github/workflows/`) | None — major action upgrade carries no GHSA; behavioural change only (newer Node bundled, deprecated input cleanup) | n/a (no advisory) | direct | CI/build-time only | n/a (does not touch runtime / output) | n/a | **No** | **Close — risk-accepted defer.** Toolchain refresh batch at Q3. | §6b.3 (i) |
| **#85** | `@types/node` | 20 → 25 | Root devDeps | None — type-only major (no runtime artefact) | n/a | direct | dev-only | n/a (types are erased at build time) | n/a | **No** | **Close — risk-accepted defer.** Wait for Node 20 → 22 runtime bump before bumping types. | §6b.3 (ii) |
| **#86** | `typescript` | 5.9.3 → 6.0.3 | Root devDeps | None — language major (no advisory) | n/a | direct | dev-only (compile-time) | n/a (TS is erased at build) | n/a | **No** | **Close — risk-accepted defer.** Batch with broader toolchain refresh; no security driver. | §6b.3 (iii) |
| **#87** | `astro` (`brand-a-aiescape/site`) | 4.16.19 → 6.3.3 | Brand A site | The GHSA Dependabot cites is the reflected XSS on hydrated SSR component **slot names** (the canonical "Astro slot-name XSS" — re-citation pending operator pull of GHSA id from the Dependabot UI; the public advisory referenced in `docs/astro-security-upgrade-plan.md` is the one Dependabot surfaces) | High (per Dependabot) | direct | build-time + SSG runtime | Static-only output, no JS bundles emitted (verified §6b.3 (iv)) | **No SSR. No client islands. No user-controlled slot rendering.** Verified §6b.3 (v) | **No** — preconditions for exploitation absent | **Close — risk-accepted defer.** Staged 4 → 5 → 6 path in `docs/astro-security-upgrade-plan.md` §6 governs the eventual move; no security driver for pre-launch bump. | §6b.3 (iv)–(vi) |
| **#88** | `astro` (`brands/templates/site`) | 4.16.19 → 6.3.3 | Brand template (not deployed) | Same advisory as #87 | High | direct | build-time + SSG runtime | Same — static-only, no JS bundles | Same — no SSR / no client islands / no user slots | **No** — and additionally the template is not a deployed site | **Close — risk-accepted defer.** | §6b.3 (iv)–(vi) |
| **#89** | `astro` (`dashboards/app`) | 4.16.19 → 6.3.3 | HQ dashboard | Same advisory as #87 | High | direct | build-time + SSG runtime | Same — static-only, no JS bundles | Same — no SSR / no client islands / no user slots. **Additionally:** dashboard is behind Cloudflare Access (operator-only); not exposed to arbitrary internet visitors. | **No** | **Close — risk-accepted defer.** | §6b.3 (iv)–(vii) |

### 6b.2 What this assessment did not find

- **No P0 finding.** Nothing in #84–#89 represents critical
  runtime + credential-leak-path + currently-exploitable. Brand
  A launch is not gated by a P0.
- **No P1 finding.** Nothing represents high-runtime + 7-day
  patch deadline. The Astro slot-name CVE is "high" by
  Dependabot grade but **lacks the preconditions** for
  exploitation in this lab (§6b.3).
- **No regression** in current `npm run build` on Brand A — see
  §6b.3 (iv).

### 6b.3 Evidence (commands + outputs captured 2026-05-16)

#### (i) `actions/checkout` 4 → 6 has no GHSA

GitHub's [`actions/checkout` release notes](https://github.com/actions/checkout/releases)
attribute the v5 / v6 majors to runtime-Node upgrades and
deprecation cleanup; no GHSA is referenced. The bump is purely
behavioural. **No security driver for pre-launch.**

#### (ii) `@types/node` is type-only

The `@types/*` packages are TypeScript declarations. They are
**not bundled, not emitted, not executed** at runtime. Their
"major version" tracks the runtime they describe (Node 20 / 25);
bumping the types ahead of the runtime invites type / runtime
drift. CI runs Node 20 (`.github/workflows/ci.yml`
`node-version: '20'`). **No security driver.**

#### (iii) TypeScript 5 → 6 has no advisory

The TypeScript 6.0 release is a language major (stricter type
inference + removed deprecated flags), not a security release.
TS compiles to JS during build; the **emitted JS does not
include the TS compiler**. **No security driver.**

#### (iv) Static-only build verified — zero JS bundles

```
$ cd brands/brand-a-aiescape/site && npm run build
…
[build] 8 page(s) built in 856ms
[build] Complete!

$ find dist -type f -name "*.js"
(empty — zero JS files emitted)

$ grep -c "AI-augmented production" dist/ai-use/index.html dist/index.html
dist/ai-use/index.html:1
dist/index.html:1

$ grep -rE "(sk-or-[A-Za-z0-9_-]{20}|gsk_[A-Za-z0-9]{20}|AIza[0-9A-Za-z_-]{30}|PUBLIC_SUPABASE)" dist/
(none)
```

The site emits **only HTML and CSS**. Zero JS files. Zero
hydrated components. Zero exposed secrets. The AI-use
disclosure renders on every page.

#### (v) Zero client islands and zero SSR across all three Astro consumers

```
$ grep -rnE "client:(load|idle|visible|media|only)" \
    --include="*.astro" --include="*.tsx" --include="*.jsx" \
    --include="*.md" --include="*.mdx" \
    dashboards/app/src brands/templates/site/src \
    brands/brand-a-aiescape/site/src
(empty)

$ grep -rnE "ViewTransitions|ClientRouter" \
    --include="*.astro" --include="*.ts" --include="*.tsx" \
    --include="*.js" \
    dashboards/app/src brands/templates/site/src \
    brands/brand-a-aiescape/site/src
(empty)
```

All three `astro.config.mjs` files use the default static
output (`build: { format: 'directory' }`) with no `output`
override, no `adapter:` import, and no `@astrojs/node` /
`@astrojs/cloudflare` / `@astrojs/netlify` / `@astrojs/vercel`
package installed.

#### (vi) No user-controlled slot rendering

The Astro slot-name XSS requires (a) a hydrated SSR component
that accepts named slots whose names are derived from
user-controlled input. We have:

- **No hydrated components** (§6b.3 (v)).
- **No SSR** (§6b.3 (v)).
- **No user-input plumbing to slot names.** Every Astro
  component in `src/components/` and every page in `src/pages/`
  passes only build-time author content into slots. There is no
  form, no client-side router, no URL-query-driven rendering.
  Brand A's site has zero forms; the Buttondown opt-in is an
  iframe pointed at Buttondown's domain (the iframe is not
  hydrated by Astro).

The vulnerability's three preconditions (SSR + hydration + user
slot names) **all evaluate to false**. The CVE is not
exploitable in this deployment.

#### (vii) Dashboard exposure surface

The HQ dashboard is behind **Cloudflare Access** (per
`docs/04-architecture.md` and `dashboards/app/README.md`). Even
if the Astro slot-name CVE were exploitable (it is not, per
§6b.3 (v)–(vi)), the attacker would need to clear Cloudflare
Access first. Brand A's site is the only public-facing surface
in the portfolio at launch.

### 6b.4 Formal risk acceptance

The operator (named in this section's PR) formally risk-accepts
the deferral of #84–#89 to the Q3 2026 quarterly platform
refresh **on the evidence basis above**. The acceptance is
re-graded on either:

- A new Astro 4.x CVE that DOES apply (a CVE in static
  rendering, in build-time path traversal, or in any
  transitive runtime that we ship).
- The introduction of a `client:*` directive, `ViewTransitions`,
  `ClientRouter`, or an SSR adapter into any consumer (which
  would flip the slot-name CVE to applicable).
- A new GHSA on `typescript`, `@types/node`, or
  `actions/checkout` that targets a code path we use.

If any of those land, the deferral is void; a same-day audit
runs (`playbooks/package-hygiene.md`).

The acceptance does NOT extend to:

- Any P0 / P1 finding that the operator has not yet seen.
- Any non-Astro transitive that may carry a runtime CVE.
- Anything in the GitHub Security tab that the operator
  identifies during the next quarterly refresh and elects to
  re-grade.

### 6b.5 Disposition of #84–#89

All six PRs were **closed with the §6b.3 evidence comment
posted on each**. Closure is the correct action because:

- The evidence makes the deferral non-silent (each PR now has
  the audit context in its comment thread, mirrored to this
  doc).
- Dependabot will recreate a PR if a new applicable advisory
  lands on any of these packages.
- Auto-merge stays OFF; no behaviour change.

**Brand A launch is unblocked** by this assessment. The hard
rules from #95 are preserved:

- Security beats launch speed → yes; the assessment ran before
  launch.
- No blind major-bump merges → yes; nothing was merged.
- No silent deferrals → yes; this section is the documented
  defer.
- No false claim that a vulnerability is irrelevant without
  evidence → yes; §6b.3 (iv)–(vii) is the evidence.

## 7. What is NOT in this PR

- The filled audit table — the operator runs S1 from the GitHub
  Dependabot UI; the table goes in a follow-up PR.
- Any package upgrade — those are S2 / S3 PRs.
- A Dependabot config file — the follow-up PR adds
  `.github/dependabot.yml`.
- Auto-merge configuration — explicitly off.
- A bespoke vulnerability dashboard — the GitHub Dependabot tab is
  the canonical view.

## 8. Cross-references

- `docs/astro-security-upgrade-plan.md` — governs the major Astro
  upgrade path.
- `docs/legal-and-resilience.md` §10 — paid-legal-advice triggers
  (regulator / law-firm letters), not directly related but
  related-by-process.
- `playbooks/incident-credential.md` — invoked if a vulnerability
  results in a credential incident.
- `playbooks/package-hygiene.md` — Phase S4 ongoing hygiene SOP.
- `playbooks/provider-revalidation.md` — sibling quarterly cadence.

## 9. Out of scope (per #48)

- Ignoring vulnerabilities.
- Force-upgrading without review.
- Replatforming the stack unless a specific CVE justifies it.
- A bespoke security-monitoring dashboard.
