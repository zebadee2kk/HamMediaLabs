# HQ dashboard (Astro)

Server-rendered Astro dashboard reading directly from Supabase via PostgREST.
No client-side JS for data — the HTML is rendered at request time with the
service-role key, then served behind operator-only auth at the edge.

## Run locally
```bash
cd dashboards/app
npm install
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run dev
```

## Deploy
- Build to a Cloudflare Pages project (`npm run build`, then `dist/`).
- Put it behind Cloudflare Access (allow only the operator email).
- Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as project env vars.

## What it shows
- Portfolio totals (active / hold / scale / kill, cost, revenue).
- Brand table (`brand`).
- Provider health for the last 14 days (`v_provider_daily`).

## What it does NOT do
- Mutate data. Reads only.
- Surface secrets. The service-role key is server-side env only.
