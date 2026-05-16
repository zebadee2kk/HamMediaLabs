// Free-tier quota ceilings — a dashboard-side mirror of the
// `core/providers/quota-registry.ts` numbers, intentionally
// duplicated to keep the dashboard module self-contained. Update
// here when the registry is refreshed (per
// `playbooks/quarterly-platform-refresh.md`).

export interface QuotaCeiling {
  provider: string;
  label: string;
  /** The dimension we measure (calls/day, tokens/day, builds/month, etc.). */
  dimension: string;
  ceiling: number;
  /** Free-form note (e.g. "after $10 deposit") rendered next to the bar. */
  note?: string;
}

export const QUOTA_CEILINGS: QuotaCeiling[] = [
  { provider: 'gemini', label: 'Gemini — RPD', dimension: 'requests / day', ceiling: 1000, note: '5–15 RPM; 250K TPM' },
  { provider: 'groq', label: 'Groq — RPD', dimension: 'requests / day', ceiling: 1000, note: '30 RPM; 6K TPM' },
  { provider: 'openrouter', label: 'OpenRouter — RPD', dimension: 'requests / day', ceiling: 1000, note: 'after ≥$10 deposit' },
  { provider: 'cloudflare_pages', label: 'Cloudflare Pages — builds', dimension: 'builds / month', ceiling: 500 },
  { provider: 'supabase', label: 'Supabase — DB MB', dimension: 'MB', ceiling: 500 },
];

export interface QuotaUsage {
  provider: string;
  used: number;            // current value (calls today / builds this month / MB used)
  source: 'actual' | 'estimate' | 'placeholder';
}

/**
 * Combine usage with ceilings to produce a render-ready array. Missing
 * usage rows are rendered as `placeholder` with 0 used.
 */
export function combine(ceilings: QuotaCeiling[], usage: QuotaUsage[]): Array<QuotaCeiling & QuotaUsage & { pct: number; warn: boolean; flag: boolean }> {
  const map = new Map(usage.map(u => [u.provider, u]));
  return ceilings.map(c => {
    const u = map.get(c.provider) ?? { provider: c.provider, used: 0, source: 'placeholder' as const };
    const pct = c.ceiling > 0 ? Math.min(1, u.used / c.ceiling) : 0;
    return {
      ...c,
      ...u,
      pct,
      warn: pct >= 0.7 && pct < 0.9,
      flag: pct >= 0.9,
    };
  });
}
