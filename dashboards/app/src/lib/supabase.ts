// HQ dashboard Supabase REST client.
//
// SERVER-SIDE ONLY. The service-role key (Tier 1 secret — see
// docs/09-security-and-secrets.md) is read here from non-public env. This
// module must never be imported into an Astro client island.

export interface BrandRow {
  id: number;
  slug: string;
  name: string;
  niche: string;
  status: 'planning' | 'active' | 'hold' | 'kill' | 'scale';
  tier: number;
  monthly_cost_est: number;
  monthly_revenue_est: number;
}

export interface ProviderDailyRow {
  provider: string;
  day: string;
  calls: number;
  rate_limits: number;
  errors: number;
  tokens_in: number;
  tokens_out: number;
  cost_est: number;
}

export type SbResult<T> =
  | { ok: true; data: T }
  | { ok: false; kind: 'missing_config'; missing: string[] }
  | { ok: false; kind: 'fetch_error'; status?: number; detail: string };

interface ResolvedEnv {
  url: string;
  serviceRoleKey: string;
}

function readEnv(): ResolvedEnv | { missing: string[] } {
  // Astro exposes server env via import.meta.env (and only PUBLIC_-prefixed
  // values reach the client). We deliberately reference the non-public names.
  const astroEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  const procEnv =
    typeof process !== 'undefined' && process?.env
      ? process.env
      : ({} as Record<string, string | undefined>);

  const url = astroEnv.SUPABASE_URL ?? procEnv.SUPABASE_URL;
  const key = astroEnv.SUPABASE_SERVICE_ROLE_KEY ?? procEnv.SUPABASE_SERVICE_ROLE_KEY;

  const missing: string[] = [];
  if (!url) missing.push('SUPABASE_URL');
  if (!key) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (missing.length) return { missing };

  return { url: String(url).replace(/\/$/, ''), serviceRoleKey: String(key) };
}

/** Returns the env status (used to render a ConfigBanner when incomplete). */
export function envStatus(): { ok: true } | { ok: false; missing: string[] } {
  const r = readEnv();
  return 'missing' in r ? { ok: false, missing: r.missing } : { ok: true };
}

async function sbGet<T>(path: string, query: Record<string, string> = {}): Promise<SbResult<T>> {
  const env = readEnv();
  if ('missing' in env) return { ok: false, kind: 'missing_config', missing: env.missing };

  try {
    const qs = new URLSearchParams(query).toString();
    const url = `${env.url}/rest/v1/${path}${qs ? '?' + qs : ''}`;
    const res = await fetch(url, {
      headers: {
        apikey: env.serviceRoleKey,
        authorization: `Bearer ${env.serviceRoleKey}`,
        accept: 'application/json',
      },
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { ok: false, kind: 'fetch_error', status: res.status, detail: detail.slice(0, 300) };
    }
    return { ok: true, data: (await res.json()) as T };
  } catch (e) {
    return { ok: false, kind: 'fetch_error', detail: (e as Error)?.message ?? 'unknown' };
  }
}

export function listBrands(): Promise<SbResult<BrandRow[]>> {
  return sbGet<BrandRow[]>('brand', { select: '*', order: 'id.asc' });
}

export function providerDaily(days = 14): Promise<SbResult<ProviderDailyRow[]>> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
  return sbGet<ProviderDailyRow[]>('v_provider_daily', {
    select: '*',
    day: `gte.${since}`,
    order: 'day.desc,provider.asc',
  });
}

export interface DecisionRow {
  id: number;
  ts: string;
  scope: 'portfolio' | 'brand' | 'provider' | 'compliance' | 'security';
  target_id: number | null;
  kind: 'kill' | 'hold' | 'scale' | 'adopt' | 'retire' | 'rotate' | 'other';
  reason: string;
  operator: string;
  revisit_date: string | null;
}

export function listDecisions(days = 30): Promise<SbResult<DecisionRow[]>> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  return sbGet<DecisionRow[]>('decision', {
    select: '*',
    ts: `gte.${since}`,
    order: 'ts.desc',
  });
}

export interface BrandWeeklyStatsRow {
  brand_id: number;
  slug: string;
  week: string;
  impressions: number;
  clicks: number;
  engagements: number;
  conversions: number;
  revenue: number;
}

export function brandWeeklyStats(weeks = 8): Promise<SbResult<BrandWeeklyStatsRow[]>> {
  const since = new Date(Date.now() - weeks * 7 * 86_400_000).toISOString();
  return sbGet<BrandWeeklyStatsRow[]>('v_brand_weekly_stats', {
    select: '*',
    week: `gte.${since}`,
    order: 'week.desc,slug.asc',
  });
}

export interface PipelineAssetRow {
  id: number;
  title: string;
  type: string;
  status: 'draft' | 'qa' | 'staged';
  updated_at: string;
  reviewed_at: string | null;
  brand: { slug: string } | null;
}

/** Assets sitting between generation and publish — the creative-ops queue. */
export function listPipelineAssets(): Promise<SbResult<PipelineAssetRow[]>> {
  return sbGet<PipelineAssetRow[]>('content_asset', {
    select: 'id,title,type,status,updated_at,reviewed_at,brand(slug)',
    status: 'in.(draft,qa,staged)',
    order: 'updated_at.asc', // oldest first: the stalest draft is the headline
  });
}

export interface QaWeeklyRow {
  brand_id: number;
  slug: string;
  week: string;
  human_gates: number;
  human_passes: number;
  model_critiques: number;
  model_revisions: number;
  ai_tells_flagged: number;
}

export function qaWeekly(weeks = 8): Promise<SbResult<QaWeeklyRow[]>> {
  const since = new Date(Date.now() - weeks * 7 * 86_400_000).toISOString();
  return sbGet<QaWeeklyRow[]>('v_qa_weekly', {
    select: '*',
    week: `gte.${since}`,
    order: 'week.desc,slug.asc',
  });
}
