# Playbook — Package Hygiene (Phase S4)

> Ongoing package hygiene for HamMediaLabs. Runs alongside the
> quarterly platform refresh (`playbooks/quarterly-platform-refresh.md`)
> and the provider revalidation
> (`playbooks/provider-revalidation.md`).
>
> Spec: `docs/dependabot-security-audit.md`. **Auto-merge is off.**

---

## 1. Dependabot configuration

A `.github/dependabot.yml` file lands in a follow-up PR with the
shape below. It is **not** added in this playbook PR because
config-as-code changes affect CI behaviour and ship separately.

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    groups:
      patch:
        update-types: ["patch"]
      minor:
        update-types: ["minor"]

  - package-ecosystem: "npm"
    directory: "/dashboards/app"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    groups:
      patch:
        update-types: ["patch"]
      minor:
        update-types: ["minor"]

  - package-ecosystem: "npm"
    directory: "/brands/templates/site"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    groups:
      patch:
        update-types: ["patch"]
      minor:
        update-types: ["minor"]

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```

Key choices:

- **Three npm ecosystems**, one per `package.json` surface — keeps
  blast-radius scoped per PR.
- **Grouped patch / minor** updates per ecosystem so we don't get
  separate PRs for every transitive bump.
- **Major bumps are ungrouped on purpose** (Dependabot opens one
  PR per major); we route them through the staged plan.
- **`github-actions`** ecosystem updated monthly.
- **Auto-merge is off** at repo level. Every Dependabot PR goes
  through human triage.

## 2. Triage flow (per Dependabot PR)

1. **Categorise** the PR using `docs/dependabot-security-audit.md`
   §1.3 (severity / direct vs transitive / runtime vs dev / public-
   facing build chain?).
2. **Sort into a lane** (P0 / P1 / P2 / P3 per §1.4 of that doc).
3. **Decide action:**
   - P0: patch within 24h.
   - P1: patch within 7 days.
   - P2: bundle into the next quarterly refresh.
   - P3: suppress with a decision-log entry and a re-review date.
4. **If patching:** confirm CI green on all three surfaces (root
   typecheck + tests, dashboard build, brand-template build,
   gitleaks). Merge only if clean.
5. **If suppressing:** add a row to the suppression register
   (`docs/dependabot-security-audit.md` §5) and a decision-log
   entry.
6. **Never auto-merge** — even green CI is not enough on its own.

## 3. Major-bump path (§3 of the audit doc)

- Dependabot's major-bump PRs are **closed** when the staged
  plan does not call for them yet (commenting with a link to the
  governance doc, as we did on PR #12 for the Astro 4 → 6 bundle).
- The staged plan PR (e.g. Astro 4 → 5) is **hand-authored**, not
  Dependabot-authored. It cherry-picks the version target from
  Dependabot's suggestion but ships with smoke-testing across
  consumers.

## 4. Acceptable-vulnerability thresholds

- **Zero P0 / P1 open at the end of any week.** If one survives
  to the weekly review, it gets a §6 escalation entry and a
  same-week patch attempt.
- **Any P2 open >30 days** requires a decision-log entry
  explaining the deferral and naming the date by which it will
  be patched.
- **P3 suppressions** are reviewed quarterly; if the suppression
  remains valid, the re-review date is bumped with a fresh
  decision-log entry.

## 5. Suppression register hygiene

The register in `docs/dependabot-security-audit.md` §5 is the
single source of truth.

- Every row carries a re-review date.
- Quarterly: every row is re-evaluated. Either the suppression
  remains valid (decision-log entry rewrites the re-review date),
  or it's patched.
- A row is **never** removed silently. Removal happens when the
  vulnerability is patched (with a PR reference) or when the
  package is removed from the repo entirely.

## 6. Escalation triggers

These trigger an immediate (within 24h) action, not a weekly
review:

- A **GitHub Security Advisory** lands directly mentioning a
  package we use, marked Critical.
- A **published CVE** demonstrates active exploitation in the wild
  against a package we use.
- A **regulator notice** mentioning a vulnerability class (e.g.
  ICO advisory on a data-handling library) — see
  `docs/legal-and-resilience.md` §10.
- A **provider** in `core/providers/quota-registry.ts` discloses a
  breach.

Action: walk `playbooks/incident-credential.md` if credentials
are at risk; otherwise patch the vulnerability immediately under
a same-day PR.

## 7. Cross-references

- `docs/dependabot-security-audit.md` — the audit table format
  and prioritisation rules.
- `docs/astro-security-upgrade-plan.md` — major-bump staged path
  for Astro.
- `docs/legal-and-resilience.md` §10 — paid-legal-advice and
  regulator triggers.
- `playbooks/incident-credential.md` — IR for credential incidents.
- `playbooks/provider-revalidation.md` — sibling quarterly cadence.

## 8. Out of scope (per #48)

- Auto-merging anything.
- Replatforming the stack.
- Adopting paid SCA tooling at MVP (the GitHub Dependabot tab is
  sufficient).
- A bespoke security-monitoring dashboard.
