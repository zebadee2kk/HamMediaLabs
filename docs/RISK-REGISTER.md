# Risk Register

This document identifies, scores, and mitigates the key risks facing HamMediaLabs / ProjectHydra. It is a living document — update it when new risks are identified or existing risks change.

**Last reviewed:** 2026-06-23

---

## Risk Scoring

Each risk is scored on two axes:

### Likelihood

| Score | Label | Meaning |
|---|---|---|
| 1 | Rare | Unlikely to occur in a 12-month window |
| 2 | Unlikely | Could occur but not expected |
| 3 | Possible | May occur in a 12-month window |
| 4 | Likely | Will probably occur in a 12-month window |
| 5 | Almost Certain | Expected to occur multiple times |

### Impact

| Score | Label | Meaning |
|---|---|---|
| 1 | Negligible | No meaningful effect on operations |
| 2 | Minor | Small delay or cost increase |
| 3 | Moderate | Significant delay, cost, or quality reduction |
| 4 | Major | Threatens a brand, revenue stream, or compliance |
| 5 | Critical | Threatens the entire project |

### Risk Score = Likelihood x Impact

| Range | Severity | Action |
|---|---|---|
| 1–4 | Low | Monitor; accept with mitigation |
| 5–9 | Medium | Active mitigation required |
| 10–15 | High | Immediate mitigation; escalate to operator |
| 16–25 | Critical | Stop work until mitigated |

---

## Technical Risks

### T1: Astro Major Version Gap

**Description:** Brand sites and the dashboard use Astro. The ecosystem moves fast — major version gaps between the pinned version and current can cause dependency incompatibilities, missing security patches, and difficulty finding community support.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 4 | Astro releases major versions roughly annually; the project pins versions |
| Impact | 3 | Blocks builds, prevents security updates, complicates onboarding |
| **Total** | **12** | **High** |

**Mitigation:**
- Pin Astro versions in `package.json` files with explicit version ranges
- Test builds in CI on every push (`astro-builds` job in `ci.yml`)
- Schedule quarterly dependency reviews (see `playbooks/quarterly-platform-refresh.md`)
- Maintain an upgrade playbook (`docs/astro-security-upgrade-plan.md`)
- Subscribe to Astro release announcements

**Owner:** Engineering lead
**Review cadence:** Quarterly

---

### T2: Dependency Rot

**Description:** The project depends on TypeScript, tsx, Astro, Playwright, n8n, and various npm packages. Over time, dependencies become unmaintained, accumulate CVEs, or introduce breaking changes.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 4 | Inevitable over a multi-year project |
| Impact | 3 | CVEs, build failures, or forced major version upgrades |
| **Total** | **12** | **High** |

**Mitigation:**
- Dependabot enabled (`.github/dependabot.yml`) for automated update PRs
- CI runs on every push, catching breakage early
- Minimal dependency philosophy — only add dependencies with clear justification
- Quarterly dependency audit (see `playbooks/package-hygiene.md`)
- `npm audit` can be run locally for ad-hoc checks

**Owner:** Engineering lead
**Review cadence:** Monthly (Dependabot PRs), Quarterly (manual audit)

---

### T3: Supabase Free Tier Limits

**Description:** The HQ data layer runs on Supabase's free tier. Free projects pause after 7 days of zero DB activity, have limited storage, and have query timeout limits.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 3 | Heartbeat job mitigates pause risk; storage limits are generous but finite |
| Impact | 4 | Project pause would halt all dashboard, automation, and telemetry |
| **Total** | **12** | **High** |

**Mitigation:**
- Daily heartbeat job (`core/jobs/heartbeat.ts`) via both GitHub Actions and n8n (defence in depth)
- Monitor storage usage via the dashboard (`v_provider_daily` view)
- Document migration path to Supabase Pro in `ops-vm/deployment-runbook.md`
- Keep schema lean — archive old data, avoid unbounded table growth

**Owner:** DevOps / Engineering lead
**Review cadence:** Monthly

---

### T4: LLM Provider API Instability

**Description:** The LLM router depends on third-party APIs (Gemini, Groq, OpenRouter). Providers can change pricing, rate limits, model availability, or deprecate endpoints without notice.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 4 | Common in the fast-moving LLM market |
| Impact | 3 | Degraded router performance; potential cost increases |
| **Total** | **12** | **High** |

**Mitigation:**
- Multi-provider failover policy — no single provider above 60% of traffic per month
- Router telemetry (`core/telemetry/`) tracks all attempts for early detection
- Quarterly provider re-validation (`playbooks/provider-revalidation.md`)
- Quota registry (`core/providers/quota-registry.ts`) as machine-readable source of truth
- Free-first policy — prefer free-tier usage to limit financial exposure

**Owner:** Engineering lead
**Review cadence:** Quarterly

---

### T5: TypeScript Strictness vs. Velocity

**Description:** Strict TypeScript settings (`noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`) improve correctness but can slow down rapid prototyping and onboarding.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 3 | New contributors may struggle with strict settings |
| Impact | 2 | Slight velocity reduction; not a blocker |
| **Total** | **6** | **Medium** |

**Mitigation:**
- Document strictness in `CONTRIBUTING.md` and `docs/DEVELOPMENT-GUIDE.md`
- Provide clear error messages in CI output
- Use the `hml` CLI for common tasks to reduce manual TypeScript interaction
- Accept that correctness > velocity for a governance-heavy project

**Owner:** Engineering lead
**Review cadence:** As needed

---

## Operational Risks

### O1: API Key Exposure

**Description:** Accidental commit of API keys, JWTs, or service-role keys to the repository. This is the highest-severity operational risk because it can lead to financial loss, data breaches, or account termination.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 2 | gitleaks + .gitignore + templates-only policy reduce risk |
| Impact | 5 | Financial loss, data breach, account termination |
| **Total** | **10** | **High** |

**Mitigation:**
- `gitleaks` runs in CI on every push (`.gitleaks.toml` configured for known patterns)
- `.env.example` is the only `.env*` file tracked in git
- Real secrets vaulted in 1Password; surfaced via GitHub Actions secrets, Cloudflare env vars, or local `.env` (gitignored)
- Credential tier model documented in `docs/09-security-and-secrets.md`
- Incident response playbook: `playbooks/incident-credential.md`
- Pre-commit hooks recommended (but not enforced) for local development

**Owner:** Security lead / Operator
**Review cadence:** Every push (automated), Quarterly (manual review)

---

### O2: Provider Account Bans

**Description:** Automated signup runbooks (Playwright) or high-volume API usage could trigger platform anti-bot measures, leading to account bans or IP blocks.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 3 | Inherent risk with any automation on third-party platforms |
| Impact | 4 | Loss of platform access; potential brand damage |
| **Total** | **12** | **High** |

**Mitigation:**
- Human-paused trust gates in every Playwright runbook — nothing auto-bypasses CAPTCHA/MFA/SMS
- Cadence ceilings encoded in `automation/playwright/src/signup_social.ts`
- Platform strike response playbook: `playbooks/platform-strike-response.md`
- Account recovery playbook: `playbooks/account-recovery.md`
- Rate limiting and jitter in all automated interactions
- Tier 4 (autonomous publishing) frozen for year 1

**Owner:** Automation lead / Operator
**Review cadence:** Monthly

---

### O3: n8n Workflow Failures

**Description:** n8n workflows (trend-to-brief, weekly-review, heartbeat) can fail due to API changes, credential expiration, or n8n instance downtime.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 3 | Common for workflow automation; credentials expire, APIs change |
| Impact | 2 | Missed briefs or reviews; not catastrophic |
| **Total** | **6** | **Medium** |

**Mitigation:**
- n8n workflows are exported as JSON in `automation/n8n/workflows/` — version controlled
- Heartbeat has a secondary path via GitHub Actions (defence in depth)
- Weekly review failures are non-blocking — the operator can trigger manually
- Monitor n8n execution logs for failures

**Owner:** Automation lead
**Review cadence:** Monthly

---

### O4: Secrets Sprawl Across Environments

**Description:** As the project grows, secrets may accumulate across GitHub Actions, Cloudflare env vars, 1Password, local `.env` files, and n8n credentials — making rotation and auditing difficult.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 3 | Natural tendency as integrations multiply |
| Impact | 4 | Compromised secret may be hard to rotate if its location is unknown |
| **Total** | **12** | **High** |

**Mitigation:**
- Vault templates in `vault-template/` (account registry, API key registry) — no secrets, just structure
- Credential tier model in `docs/09-security-and-secrets.md`
- `n8n_manage_credentials` tool for auditing n8n-stored credentials
- `n8n_audit_instance` for periodic security audits
- Document every secret's location and rotation procedure

**Owner:** Security lead / Operator
**Review cadence:** Quarterly

---

## Strategic Risks

### S1: Brand Portfolio Concentration

**Description:** The current portfolio has 3 brands in related niches (AI, corporate satire, UK lifestyle). If the niche or audience proves too narrow, all brands underperform simultaneously.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 3 | Early-stage portfolio; unvalidated product-market fit |
| Impact | 4 | Low ROI across the entire portfolio; sunk cost |
| **Total** | **12** | **High** |

**Mitigation:**
- Kill/hold/scale framework (`core/scoring/`) enforces objective decision-making
- Portfolio expansion gate (`docs/portfolio-expansion-guidance.md`) requires validation before adding brands
- Diversification criteria documented in the master plan
- Weekly review playbook (`playbooks/weekly-review.md`) catches underperformance early
- Kill fast — don't fund brands that don't meet thresholds

**Owner:** Operator / Strategy lead
**Review cadence:** Monthly (scoring), Quarterly (portfolio review)

---

### S2: Platform Dependency

**Description:** Brand sites depend on Cloudflare Pages for hosting. Automation depends on n8n. Analytics depend on Supabase. A significant change to any of these platforms (pricing, deprecation, outage) would impact operations.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 2 | These are established platforms, but pricing and terms can change |
| Impact | 4 | Migration would be costly; temporary outages would halt operations |
| **Total** | **8** | **Medium** |

**Mitigation:**
- Keep platform-specific code isolated (e.g., Cloudflare Pages config is minimal; n8n workflows are exported JSON)
- Document migration paths in `ops-vm/deployment-runbook.md`
- Free-first policy limits financial exposure to platform pricing changes
- Multi-provider strategy for LLM reduces dependency on any single AI provider
- Static site architecture (Astro) is inherently portable — can be hosted anywhere

**Owner:** Engineering lead / Operator
**Review cadence:** Quarterly

---

### S3: Regulatory / Compliance Changes

**Description:** AI-generated content regulations (EU AI Act, UK Online Safety Bill, FTC guidelines) may impose disclosure, registration, or operational requirements on AI-augmented media properties.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 3 | Regulatory landscape is actively evolving |
| Impact | 4 | Could require significant operational changes or limit content strategies |
| **Total** | **12** | **High** |

**Mitigation:**
- Disclosure templates (`docs/18-disclosure-templates.md`) already in place
- Legal and platform risk documented in `docs/10-legal-and-platform-risk.md`
- AI-use disclosure rendered on every brand site by default
- Monitor regulatory developments quarterly
- Design content policies to be stricter than current requirements (ahead of the curve)

**Owner:** Operator / Legal advisor
**Review cadence:** Quarterly

---

### S4: Single Operator Dependency

**Description:** The project currently relies on a single operator for approvals, reviews, and strategic decisions. Illness, vacation, or departure would halt governance processes.

| Axis | Score | Rationale |
|---|---|---|
| Likelihood | 3 | Inherent risk of a small team |
| Impact | 4 | No approvals, no reviews, no strategic decisions |
| **Total** | **12** | **High** |

**Mitigation:**
- Document all processes in playbooks (`playbooks/`) so they're not tribal knowledge
- Decision log (`docs/15-decision-log.md`) provides continuity
- Weekly review playbook (`playbooks/weekly-review.md`) can be run by a delegate
- Document recovery procedures in `ops-vm/recovery-and-backup.md`
- Plan for a secondary operator or delegate as the project matures

**Owner:** Operator
**Review cadence:** Quarterly

---

## Risk Summary

| ID | Risk | L | I | Score | Severity |
|---|---|---|---|---|---|
| T1 | Astro Major Version Gap | 4 | 3 | 12 | High |
| T2 | Dependency Rot | 4 | 3 | 12 | High |
| T3 | Supabase Free Tier Limits | 3 | 4 | 12 | High |
| T4 | LLM Provider API Instability | 4 | 3 | 12 | High |
| T5 | TypeScript Strictness vs. Velocity | 3 | 2 | 6 | Medium |
| O1 | API Key Exposure | 2 | 5 | 10 | High |
| O2 | Provider Account Bans | 3 | 4 | 12 | High |
| O3 | n8n Workflow Failures | 3 | 2 | 6 | Medium |
| O4 | Secrets Sprawl Across Environments | 3 | 4 | 12 | High |
| S1 | Brand Portfolio Concentration | 3 | 4 | 12 | High |
| S2 | Platform Dependency | 2 | 4 | 8 | Medium |
| S3 | Regulatory / Compliance Changes | 3 | 4 | 12 | High |
| S4 | Single Operator Dependency | 3 | 4 | 12 | High |

**High risks:** 10 | **Medium risks:** 3 | **Low risks:** 0

---

## Review Process

This register is reviewed:
- **Quarterly** as part of the quarterly platform refresh
- **Ad-hoc** when a new risk is identified or an existing risk materially changes
- **After any incident** — the relevant risk entry is updated with lessons learned

To propose a new risk or update an existing one, open a PR against this file with the proposed change and rationale.
