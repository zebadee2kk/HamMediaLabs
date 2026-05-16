# HQ dashboard (Astro)

Static-rendered (for now) Astro dashboard reading directly from Supabase via
PostgREST. The page is rendered at **build time** with the service-role key;
the produced HTML is then served behind operator-only auth at the edge.
No browser-side data fetch, no client-side secret exposure.

## What it shows

- **Portfolio cards** — active / hold / scale / killed / planning counts, cost, revenue, net.
- **Brand table** (`brand`) — slug, name, status pill, tier, cost / revenue per month.
- **Provider health (last 14 days)** (`v_provider_daily`) — per-provider 14-day totals with a 429-rate column (flagged if >5%), plus the daily rows.

The page renders safe empty states when Supabase is unconfigured, when a table is empty, or when one of the two queries fails (the other still renders).

## Environment variables

Set in your shell (local dev) or in the Cloudflare Pages project settings (deploy). Use the [`.env.example`](./.env.example) in this folder as a starting point.

| Name | Tier | Where to put it |
|---|---|---|
| `SUPABASE_URL` | non-secret | shell / Cloudflare Pages env |
| `SUPABASE_SERVICE_ROLE_KEY` | **Tier 1 secret** | shell / Cloudflare Pages env **only** — never `PUBLIC_*`, never in repo, never logged. See `docs/09-security-and-secrets.md`. |
| `DASHBOARD_URL` | optional | used as `astro.site`; default `http://localhost:4321` |

**Never** prefix these with `PUBLIC_` — that would expose them to the client.

## Run locally

```bash
cd dashboards/app
npm install
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run dev
```

You can also point it at a non-existent Supabase to see the
`ConfigBanner` / `ErrorPanel` paths render correctly.

## Build

```bash
cd dashboards/app
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run build
# output → dist/
```

Build will succeed *without* env vars (the page renders the ConfigBanner
empty state) — useful for CI sanity checks where no live secrets exist.

## Deploy

1. Create a Cloudflare Pages project pointing at this folder.
2. Set `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` as **server-side** project env vars (Cloudflare Pages > Settings > Environment variables > Production; *not* "Build & deployments > Build env variables" — those leak into the build log).
3. **Cloudflare Access**: protect the deployed hostname with an Access policy that allows only the operator's email. The dashboard makes no auth check itself — the perimeter is Access.
4. Optionally schedule a refresh: Cloudflare Pages supports deploy hooks. Trigger one from `n8n` or GitHub Actions every 6h (or on demand) to refresh the static data without touching code.

## Refresh policy (current limitation)

This dashboard is **statically rendered**, so data is point-in-time as of the last build. Acceptable at MVP because:

- Builds are seconds long.
- The weekly review (which the dashboard exists to support) doesn't need sub-second freshness.
- Avoids carrying a server adapter + a long-lived service-role key in a hot edge runtime.

When a live-data view is needed, switch to `output: 'server'` with the Cloudflare adapter — but that change goes in a separate PR with auth + cache discipline.

## What it does NOT do

- Mutate data. Reads only.
- Surface secrets. The service-role key is server-side env only and never reaches the rendered HTML.
- Manage auth itself — that's Cloudflare Access at the perimeter.
- Show brand detail pages, the weekly decision queue, or writebacks. Those are separate, future PRs.
