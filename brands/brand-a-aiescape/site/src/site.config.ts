// Brand A — AI Escape · site configuration.
//
// Real values land here when the operator does the §6.1 setup in
// `launch-packs/brand-a-mvp/01-human-operator-checklist.md`.
// At the time of this PR, the operator's real postal address and
// finalised brand name / domain are intentionally placeholders.
// Replacing them is the first launch-day step.

// Visual identity tokens — v1 "confident peer" palette per
// `design-handoffs/starter-design-tokens.md`; Gemini design pipeline
// refines. No webfonts: system stacks only.
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
  brandName: 'AI Escape',
  brandSlug: 'aiescape',
  tagline: 'Applied AI for working professionals. Real workflows, real numbers, no hype.',
  operatorName: 'Operator name — replace before launch',
  operatorEmail: 'aiescape.editorial@example.com',
  operatorAddress: 'Operator postal address — replace before launch (required for newsletter compliance)',
  jurisdiction: 'UK',
  aiDisclosureFlavour: 'informational',
  affiliateInPlay: false,   // STAYS FALSE at launch per brand-a-aiescape/launch-checklist.md §3
  lastReviewedISO: '2026-07-02',
  // v1 "confident peer" — deep working blue, warm amber accent.
  // Contrast on #ffffff: ink 16.7:1, muted 5.9:1, primary 8.7:1 (AA/AAA).
  theme: {
    ink: '#1b1f24',
    muted: '#5c6672',
    primary: '#0f4c81',
    accent: '#f4e3c8',
    background: '#ffffff',
    fontBody: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    fontHeading: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  },
};
