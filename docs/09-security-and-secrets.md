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
### Tier 1:
Master accounts
Examples:
- Master Gmail
- GitHub
- Cloudflare
- Password vault

### Tier 2:
Brand accounts
Examples:
- Brand email
- CMS
- Socials

### Tier 3:
Disposable test accounts

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
