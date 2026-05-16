# Legal, Compliance, Entity & Account Resilience Framework

> Integration document. Ties together credential security, account
> resilience, entity-structure planning, disclosure mechanics, and
> platform-strike response into one operating posture.
>
> **Not legal advice.** This is operational governance written by an
> operator for an operator. The thresholds at which paid legal advice
> becomes mandatory are documented in §10.
>
> **Owner:** Operator. **Re-review:** quarterly with the rest of the
> security framework (`playbooks/provider-revalidation.md`).

---

## 0. Why this document exists

The repo has strong governance on credentials (`docs/09-security-and-secrets.md`),
disclosure (`docs/18-disclosure-templates.md`), X (`docs/x-platform-risk.md`),
and Brand-B defamation (`brands/brand-b-corpsatire/qa/defamation.md`).
What's missing is the **integration** view: a single doc that lays out
how the operator stays resilient as a *business entity*, not just as a
technical operator.

Platform bans, account loss, unclear disclosures, tax mistakes, and
weak legal structure can destroy execution even if the content is
good. This framework reduces those risks to a small list of
explicit, walkable controls.

## 1. Operating posture

- **UK-first.** Operator is UK-based; defaults assume English / Welsh
  law, HMRC for tax, FCA for financial promotions, ASA for advertising.
- **Sole trader until evidence requires otherwise.** See §2 for
  upgrade triggers.
- **Disclosure-first.** When in doubt, disclose; when not in doubt,
  still disclose. See §5.
- **Public-figure-zero.** We do not synthesise, name, or deepfake real
  public figures across any brand. See §6.
- **Defence-in-depth on credentials.** Two-of-three (MFA + vault +
  recovery codes) is the floor.
- **No financial advice.** Brand C handles money topics under a
  strict scope. See §7.
- **Platform-loss is survivable.** Every brand has at least one
  surface we own (the brand site + newsletter). See §8.

## 2. Entity structure (UK-first)

Decision: **sole trader at MVP**, structure choice gated by
documented thresholds.

| Structure | When it fits | Cost / burden | Upgrade trigger |
|---|---|---|---|
| Sole trader | MVP, single operator, year-1 revenue projection <£12k net profit / year | Self Assessment only | Hit any §2.1 trigger |
| Limited company (one shareholder) | Liability separation needed; durable revenue; planning future hires | Companies House filings + corp-tax return + accountant retainer ~£800–£1,500/yr | Hit any §2.1 trigger |
| Limited company + holding structure ("media holding") | Multiple distinct brand vehicles, plans for partial sale of one brand, or external investment | Higher: separate accounts per company, intercompany agreements | Only after a brand has independent revenue ≥£25k/yr |

### 2.1 Upgrade triggers (any one moves us up a tier)

- **Revenue projection:** net profit projects ≥£12k/year for two
  consecutive quarters (limited company review).
- **Liability exposure:** any brand begins to handle reader payments,
  carry significant affiliate income from regulated verticals
  (limited company strongly recommended).
- **Partner / contractor:** the lab hires anyone beyond fully
  freelance task-by-task (limited company recommended for clean
  invoicing).
- **Regulated content scope grows:** Brand C considers any move that
  would require FCA-authorised approver status (the limited-company
  question becomes "do we even pursue this?").
- **VAT threshold:** revenue projects to exceed the UK VAT threshold
  (£90k/year as of 2026) in the next 12 months — VAT registration
  triggered regardless of structure.

When a trigger fires:
1. File a decision-log entry naming the trigger and the date.
2. Engage an accountant retainer **before** the change (not after).
3. Make the structural change with paid legal/accounting support;
   this is not a DIY step.

## 3. Password / MFA governance (extends `docs/09-security-and-secrets.md`)

The Tier 1 / Tier 2 / Tier 3 classification stands. Operational
controls added by this framework:

- **Tier 1 accounts use hardware MFA where supported.** Software TOTP
  is acceptable only for accounts that don't offer hardware keys.
  When a hardware key option appears, migrate within 14 days.
- **Tier 1 recovery codes are vaulted and tested annually.** Annual
  test: log out, prove a recovery code works, log back in, generate
  a fresh batch.
- **No password reuse** across tiers and across accounts. The vault
  generates everything.
- **MFA enrolment evidence captured** for each Tier 1 account
  (screenshot of MFA status), filed in the vault next to the account
  record — not in the repo.
- **SMS as a second factor** is acceptable *only* when no other
  option exists (some platforms require it). When it's the only
  option, the operator's SIM is on a carrier with PIN protection and
  the number is **not** reused as a recovery for higher-tier accounts.
- **OAuth grants audited quarterly.** Per Tier 1 account, list every
  third-party app granted access; remove anything not in active use.

## 4. Account recovery matrix

Lives in `playbooks/account-recovery.md`. Summary of the shape:

| Account class | Owner | MFA factor | Recovery path | Tested |
|---|---|---|---|---|
| Master Gmail | Operator | Hardware key | Recovery codes (vaulted) | Annually |
| Backup Gmail | Operator | Hardware key | Recovery codes (vaulted) | Annually |
| GitHub | Operator | Hardware key | Recovery codes (vaulted) | Annually |
| Cloudflare | Operator | Hardware key | Recovery codes (vaulted) | Annually |
| Password vault | Operator | Hardware key + biometric | Emergency-kit envelope offline | Annually |
| Domain registrar | Operator | Hardware key | Registrar-specific; documented inline in the playbook | Annually |
| Supabase | Operator | Hardware key | Recovery codes | Annually |
| Brand X / TikTok / IG / YouTube / Reddit | Per-brand | Best available | Per-platform; documented; backup contact email = brand alias | Annually |
| Newsletter (Buttondown / Beehiiv) | Per-brand | Best available | Recovery via brand alias | Annually |

If any row in this matrix isn't documented before the brand's
public launch, the launch is no-go (per `brands/brand-a-aiescape/launch-checklist.md` §7).

## 5. Disclosure standards (cross-reference)

These are not redefined here — they're canonical elsewhere. This
section anchors them as binding policy:

- **AI use disclosure:** `docs/18-disclosure-templates.md` §3. Visible
  above the byline on every page (informational variant) or in bio +
  pinned + first-3-seconds of any video (satire variant). Brand B
  uses the satire variant; Brand A and Brand C use the informational
  variant.
- **Affiliate disclosure:** `docs/18-disclosure-templates.md` §2 and
  §7. First-link inline; not bio-only; not buried; not behind a
  `<details>`. Per-brand specifics in
  `brands/<slug>/qa/affiliate-disclosure.md`.
- **Privacy / cookies:** `docs/18-disclosure-templates.md` §8 and §10.
  Cookieless analytics → essential-only banner; if non-essential
  cookies are ever introduced, banner changes first, ship second.
- **Newsletter compliance:** operator postal address on every issue
  (CAN-SPAM for US subscribers; PECR for UK).

This framework adds two **operational** disclosure rules:

- **Disclosure changes are decisions.** Any edit to the canonical
  copy in `docs/18-disclosure-templates.md` gets a decision-log entry
  before merge, naming the regulator or rationale.
- **Disclosure must render on the live URL, not just localhost.** The
  launch checklist verifies this for the first deploy; spot-check
  weekly.

## 6. Defamation + satire boundaries

Brand-B-specific binding gate: `brands/brand-b-corpsatire/qa/defamation.md`.
Lab-wide rules:

- **No real-person synthesis** across any brand. No AI voice / face /
  signature / likeness, public or not. (TikTok / Meta / X policy on
  top of legal exposure.)
- **No real-company over-specificity.** "Big Consulting Firm" yes;
  "Acme & Friends 2026 R&D division" no. Brand A may name vendors
  when reviewing their products (legitimate commercial speech with
  factual basis); Brand B never may.
- **No fictionalised-quote framing** of real public figures, even
  paraphrased.
- **Sensitive-events embargo.** Any active news cycle involving an
  individual's death, illness, harassment, layoff, or criminal
  matter is off-limits as a topic across all brands.
- **Punch-up audit** at every weekly review (`playbooks/weekly-review.md`
  brand block): one minute per active brand, confirming the week's
  outputs punch in approved directions.

## 7. UK financial-content sensitivity (Brand C placeholder)

Full Brand C compliance framework lands in #33. This section captures
the lab-wide standing constraints **that apply now**:

- **No FCA-regulated financial advice** in any brand. Brand A may
  reference "tools you use to make your life cheaper" if and only if
  they are not regulated financial products. Brand B never touches
  finance topics beyond satirising corporate compensation theatre.
- **Brand C scope is information-only.** No personalised
  recommendations on debt, credit, investments, insurance, pensions.
- **Affiliate links in Brand C** are gated to FCA-authorised
  comparison platforms (Uswitch / Compare the Market style) and to
  non-regulated lifestyle / cashback programmes. Debt content links
  charities only.
- **The 3-line check** for any monetised Brand C piece (per
  `docs/20-competitive-research.md` §3.3): (1) is the product
  regulated? (2) is the affiliate FCA-authorised to promote it? (3)
  is the copy generic information vs. recommendation? If any answer
  is wrong, the link drops.
- **Vulnerable-reader handling rule:** Brand C content covering
  debt, eviction, benefit access, or any topic that meaningfully
  affects a struggling reader's life carries the MoneyHelper /
  Citizens Advice / StepChange charity links **at the top of the
  page**, not just in the footer. Affiliate links never appear above
  the charity links on those pages.

This framework explicitly does **not** authorise Brand C publishing
until #33 lands.

## 8. Backup strategies

### 8.1 Social-account backups

For each brand, the **owned surface** (brand site + newsletter) is
the canonical source. Platform accounts are distribution, never
canonical.

Per platform, the operator maintains a backup access point:

- **Brand X / TikTok / IG / YouTube / Reddit:** the brand email alias
  is the recovery email on every brand-owned platform account. The
  alias itself sits inside the master Gmail account (Tier 1 protected).
- **Posting devices** are tracked: the operator's primary phone /
  laptop are listed in the vault; lost-device drill scheduled
  annually as part of the recovery test (§4).

If a platform account is lost, the **content is not lost** — the
canonical post lives on the brand site. The platform was distribution.

### 8.2 Domain & CMS backups

- **Domains:** Cloudflare Registrar (or equivalent). Renewals
  pre-funded 30 days before expiry. n8n calendar reminder.
- **DNS records:** exported quarterly to `vault/dns-exports/`
  (off-repo). The repo holds the *intent* (Astro `site:` config,
  records that should exist); the off-repo export holds the
  *snapshot* for restore.
- **Brand sites:** GitHub repos. Every build artefact reproducible
  from source. No data lives only on Cloudflare Pages.
- **HQ database (Supabase):** nightly Parquet snapshot to a private
  GitHub repo (per `docs/PROJECTHYDRA-MASTER-PLAN.md` §5.2). The
  service-role key is not in that repo; only the snapshot data is.
- **Newsletter:** subscriber list export run quarterly; stored
  encrypted in the vault, off-repo. Never in git.

### 8.3 Identity / vault backups

- Vault master password lives in a sealed emergency-kit envelope held
  offline at a trusted address (per `playbooks/account-recovery.md`).
- Recovery-codes archive in the vault, plus a second copy offline.
- The operator's primary device is encrypted at rest; the backup
  device is too.

## 9. Platform strike / ban response SOP

Lives in `playbooks/platform-strike-response.md`. Summary:

- **Trigger:** a strike, policy notice, account lock, restricted
  visibility flag, or shadowban indicator (per
  `docs/x-platform-risk.md` §3.1) on any brand-owned account.
- **Immediate:** stop publishing from that account for 7 days
  minimum. Preserve evidence (screenshot the notice).
- **Within 24h:** diagnose root cause from §6 / §7 / §3 / the brand's
  qa/checklist. File the diagnosis in `docs/15-decision-log.md`.
- **Within 48h:** decide appeal vs absorb. Single appeal per strike;
  no re-appeals.
- **If permanent:** the brand's surface on that platform is killed.
  The brand site stays live. Decision-log entry captures the loss
  and what we learned.

## 10. When paid legal advice becomes mandatory

The operator engages a lawyer at the earliest of:

- Any letter from a regulator (FCA, ASA, ICO, HMRC) addressed to the
  operator or to any brand.
- Any letter from a law firm alleging defamation, IP infringement,
  or breach of contract.
- A platform legal team contacting the operator directly (vs an
  automated takedown notice).
- Brand C revenue >£500/month sustained for three months
  (FCA-perimeter risk grows with revenue and visibility).
- The structural upgrade in §2.1 triggers.
- A sponsorship deal involving any of: financial-services brands,
  pharma, regulated wellness, defence / weapons, gambling.

This framework can be replaced or augmented by paid advice at any
time, but until that advice arrives, this is the operating posture.

## 11. Tax baseline

- **Sole trader** (current default): Self Assessment annually;
  records kept of every revenue and expense.
- Maintain a single labelled bank account for HamMediaLabs activity
  (per `docs/PROJECTHYDRA-MASTER-PLAN.md` §11.1) — never co-mingled
  with the consulting / day-job income or HamNet.
- Quarterly tax-set-aside: a fixed % of net revenue moved to a
  separate savings account each month. Tier the set-aside
  conservatively (30% basic-rate, 40% higher-rate) until accountant
  retainer formalises.
- VAT registration triggered automatically by the threshold (§2.1);
  the operator does not "wait and see" past the threshold.

## 12. Cross-references

- `docs/09-security-and-secrets.md` — Tier 1/2/3 framework + Supabase service-role rules.
- `docs/18-disclosure-templates.md` — canonical AI / affiliate / privacy copy.
- `docs/x-platform-risk.md` — X-specific governance + §10 escalation.
- `brands/brand-b-corpsatire/qa/defamation.md` — Brand B defamation gate.
- `brands/brand-a-aiescape/qa/affiliate-disclosure.md` — Brand A affiliate placement.
- `docs/20-competitive-research.md` §3.3 — Brand C 3-line check.
- `playbooks/incident-credential.md` — existing IR for credential incidents.
- `playbooks/account-recovery.md` — recovery matrix (this PR).
- `playbooks/platform-strike-response.md` — strike SOP (this PR).
- `docs/15-decision-log.md` — where every triggered action is recorded.

## 13. Out of scope (per #32)

- Hiring lawyers (this doc names the trigger conditions; the
  hiring itself is operator action).
- Incorporation execution (limited-co setup is operator + accountant
  + Companies House, not a Claude PR).
- Detailed tax computations.
- A bespoke compliance management platform — overengineering.
