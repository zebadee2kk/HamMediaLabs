// Tiny formatting helpers for the dashboard. No external locales — we render
// GBP because the lab is UK-based; if a brand reports in a different currency
// we will compose currency at the row level.

export function gbp(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  return `£${v.toFixed(0)}`;
}

export function num(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  return v.toLocaleString('en-GB');
}

export function shortDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return String(iso).slice(0, 10);
}

export function pct(n: number | null | undefined): string {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return `${(n * 100).toFixed(1)}%`;
}
