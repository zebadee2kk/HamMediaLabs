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
