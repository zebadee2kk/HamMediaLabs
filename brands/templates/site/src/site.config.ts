// Per-brand site configuration. Override these per brand by copying this template
// and editing the values; do not edit the template itself.

// Visual identity tokens. v1 starter values per brand live in
// `design-handoffs/starter-design-tokens.md`; the Gemini design pipeline
// refines them (decision log 2026-05-16: Gemini Free is the design
// specialist). No webfonts — system stacks only, per the template's
// zero-JS / zero-external-request discipline.
export interface BrandTheme {
  ink: string;          // body text — must hold ≥7:1 on `background`
  muted: string;        // secondary text (nav, footer) — ≥4.5:1 on `background`
  primary: string;      // links / interactive — ≥4.5:1 on `background`
  accent: string;       // highlights & tinted backgrounds ONLY — never body text
  background: string;   // page background
  fontBody: string;     // CSS font stack
  fontHeading: string;  // CSS font stack
  logoPath?: string;    // under public/; header falls back to brandName text
  ogImagePath?: string; // under public/; og:image is omitted when unset
}

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
  theme: BrandTheme;
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
  // Neutral defaults — matches the template's pre-theme rendering.
  theme: {
    ink: '#1c1c1c',
    muted: '#6a6a6a',
    primary: '#114488',
    accent: '#eeeeee',
    background: '#ffffff',
    fontBody: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    fontHeading: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  },
};
