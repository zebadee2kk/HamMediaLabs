// Minimal Supabase REST client for the HQ dashboard.
// No SDK — just typed fetch wrappers against PostgREST.

export interface SupabaseEnv {
  url: string;
  serviceRoleKey: string;
}

export function env(): SupabaseEnv {
  const url = (import.meta as any).env?.SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = (import.meta as any).env?.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
  return { url: String(url).replace(/\/$/, ''), serviceRoleKey: String(key) };
}

export async function sbGet<T>(path: string, query: Record<string, string> = {}): Promise<T> {
  const e = env();
  const qs = new URLSearchParams(query).toString();
  const url = `${e.url}/rest/v1/${path}${qs ? '?' + qs : ''}`;
  const res = await fetch(url, {
    headers: {
      apikey: e.serviceRoleKey,
      authorization: `Bearer ${e.serviceRoleKey}`,
      accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error(`supabase ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

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

export async function listBrands(): Promise<BrandRow[]> {
  return sbGet<BrandRow[]>('brand', { select: '*', order: 'id.asc' });
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

export async function providerDaily(days = 14): Promise<ProviderDailyRow[]> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
  return sbGet<ProviderDailyRow[]>('v_provider_daily', {
    select: '*',
    day: `gte.${since}`,
    order: 'day.desc,provider.asc',
  });
}
