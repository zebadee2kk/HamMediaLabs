// Per-brand site configuration. Override these per brand by copying this template
// and editing the values; do not edit the template itself.

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
  brandName: 'Brand Template',
  brandSlug: 'template',
  tagline: 'A useful sentence the reader cares about.',
  operatorName: 'Operator name',
  operatorEmail: 'hello@example.com',
  operatorAddress: 'TBD postal address (required for CAN-SPAM compliance on newsletter)',
  jurisdiction: 'UK',
  aiDisclosureFlavour: 'informational',
  affiliateInPlay: false,
  lastReviewedISO: '2026-05-16',
};
