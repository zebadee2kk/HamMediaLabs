// Inserts a row into the `heartbeat` table to prevent Supabase free-project pausing.
// Schedule daily (Cloudflare cron / GitHub Actions cron / n8n).

export interface HeartbeatEnv {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  HEARTBEAT_SOURCE?: string;
}

export async function heartbeat(env: HeartbeatEnv): Promise<void> {
  const url = `${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/heartbeat`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      prefer: 'return=minimal',
    },
    body: JSON.stringify({ source: env.HEARTBEAT_SOURCE ?? 'hq_cron' }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`heartbeat insert failed: ${res.status} ${detail.slice(0, 200)}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  heartbeat({
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    HEARTBEAT_SOURCE: process.env.HEARTBEAT_SOURCE,
  }).then(
    () => { console.log('heartbeat ok'); process.exit(0); },
    (e) => { console.error('heartbeat failed', e); process.exit(1); },
  );
}
