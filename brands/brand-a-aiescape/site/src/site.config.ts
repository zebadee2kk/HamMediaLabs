// Brand A — AI Escape · site configuration.
//
// Real values land here when the operator does the §6.1 setup in
// `launch-packs/brand-a-mvp/01-human-operator-checklist.md`.
// At the time of this PR, the operator's real postal address and
// finalised brand name / domain are intentionally placeholders.
// Replacing them is the first launch-day step.

export interface BrandSiteConfig {
  brandName: string;
  brandSlug: string;
  tagline: string;
  operatorName: string;
  operatorEmail: string;
  operatorAddress: string;            // required for newsletter compliance
  jurisdiction: 'UK' | 'US' | 'EU';
  aiDisclosureFlavour: 'informational' | 'satire';
  affiliateInPlay: boolean;
  primaryChannelUrl?: string;
  newsletterUrl?: string;
  lastReviewedISO: string;            // YYYY-MM-DD
}

export const siteConfig: BrandSiteConfig = {
  brandName: 'AI Escape',
  brandSlug: 'aiescape',
  tagline: 'Applied AI for working professionals. Real workflows, real numbers, no hype.',
  operatorName: 'Operator name — replace before launch',
  operatorEmail: 'aiescape.editorial@example.com',
  operatorAddress: 'Operator postal address — replace before launch (required for newsletter compliance)',
  jurisdiction: 'UK',
  aiDisclosureFlavour: 'informational',
  affiliateInPlay: false,   // STAYS FALSE at launch per brand-a-aiescape/launch-checklist.md §3
  lastReviewedISO: '2026-05-16',
};
