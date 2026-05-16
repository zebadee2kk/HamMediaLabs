# Providers

## Purpose
Track all AI, hosting, CMS, social, analytics, and monetization providers used by HamMediaLabs.

## Rule
No provider should become a silent dependency. Every provider must have:
- Purpose
- Account owner
- Cost model
- Quota limits
- Automation friendliness
- Risk rating
- Fallback option

## Files
- `provider-registry-template.md`
- `provider-comparison-matrix.md`
- `quota-tracker-template.md`

## Machine-readable source of truth

The canonical, machine-readable quota config lives in
[`core/providers/quota-registry.ts`](../core/providers/quota-registry.ts).
Types and validation in `core/providers/types.ts` and
`core/providers/validate.ts`. The CLI reads from this registry:

```bash
npm run hml -- provider-quota
```

The Markdown files in this folder remain the long-form / human-readable
counterpart (notes, risk ratings, fallback strategy). When the published
quotas change, update **the TS registry first**, run tests, then mirror
the human-readable summary into the Markdown files.

### Quarterly review (mandatory)

Every quarter — and at the start of any new brand cohort — re-validate the
registry following `playbooks/provider-revalidation.md`. On completion:

1. Update `last_validated` on each provider in `core/providers/quota-registry.ts`.
2. Update `last_full_review` and `next_full_review` at the top of the file.
3. Run `npm run typecheck && npm test` — the validator catches malformed dates,
   missing tiers, non-https sources, etc.
4. Open a PR titled `provider-quota: Q<N> <YYYY> review` and link the
   corresponding decision-log entry.
