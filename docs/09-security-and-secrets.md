# Security and Secrets Framework

## Objective
Protect HamMediaLabs from credential sprawl, account compromise, provider lockout, and accidental leakage.

## Core rules
- Never store live secrets directly in repository
- Use templates only
- MFA mandatory on parent accounts
- Recovery paths documented
- Separate parent and child credential layers

## Credential tiers
### Tier 1: Master accounts and full-power infrastructure keys
Compromise of any Tier 1 credential collapses the entire portfolio. Tier 1
items live **only** in the password vault and (where needed for automation)
in GitHub Actions secrets / Cloudflare environment variables — never in
`.env` files, never in the repo, never in chat or screenshots.

Examples:
- Master Gmail
- GitHub (org-owner)
- Cloudflare (account-owner)
- Password vault master credential and recovery codes
- **Supabase `service_role` key** — bypasses Row Level Security and can
  read/write any row in any HQ table. Treated as a master infrastructure key.
- Domain registrar root credentials (Cloudflare Registrar, Porkbun, etc.)
- DNS API tokens that can edit root records

Handling rules for Tier 1:
- MFA (preferably hardware key / passkey) on every account that issues a Tier 1 key.
- Stored only in the password vault and / or GitHub Actions secrets / Cloudflare env vars.
- **Never** placed in `.env` files (not even `.env.local`) on operator laptops; use
  a vault-integrated shell (`op run --` or equivalent) so the key is injected at
  runtime and not persisted to disk.
- Rotated on a fixed schedule (≤180 days) and on every credential incident.
- Each Tier 1 key has a documented kill-switch (how to revoke it in <5 minutes).

### Tier 2: Brand accounts and per-brand provider keys
Examples:
- Brand email aliases
- CMS logins for an individual brand
- Brand-specific social accounts
- AI provider keys scoped to a single brand (where the provider permits scoping)
- Supabase **anon** key (RLS-bound; lower blast radius than the service role)

Tier 2 keys live in the password vault and (where automation needs them) in
the relevant runtime's secret store. They are rotated on incident or every
365 days.

### Tier 3: Disposable test accounts
Throwaway accounts used to research a provider before adoption.
No long-lived credentials; deleted after the test concludes.

## Vault model
Recommended:
- Password manager
- API registry
- Recovery code archive
- Device inventory

## Required templates
- account-registry-template
- api-key-registry-template
- mfa-recovery-template
- provider-access-template

## Security gates
Manual approval required for:
- New payment methods
- Domain purchases
- DNS root changes
- Monetization account creation

## Incident response
If account compromised:
1. Lock affected account
2. Rotate secrets
3. Review blast radius
4. Audit connected systems
5. Update registry
