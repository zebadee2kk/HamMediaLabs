-- HamMediaLabs / ProjectHydra — HQ canonical schema (v1)
-- Target: Supabase (Postgres). Idempotent migrations.
-- Source of truth: this file. Do not edit live tables out-of-band.

-- =========================================================
--  Brands
-- =========================================================
create table if not exists brand (
  id            bigserial primary key,
  slug          text unique not null,
  name          text not null,
  niche         text not null,
  status        text not null check (status in ('planning','active','hold','kill','scale')),
  launch_date   date,
  primary_channel   text,
  secondary_channel text,
  monthly_cost_est  numeric(10,2) default 0,
  monthly_revenue_est numeric(10,2) default 0,
  tier          smallint not null default 0 check (tier between 0 and 4),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- =========================================================
--  Content assets (one row per piece of published content)
-- =========================================================
create table if not exists content_asset (
  id            bigserial primary key,
  brand_id      bigint not null references brand(id) on delete cascade,
  url           text not null,
  title         text not null,
  type          text not null check (type in ('blog','newsletter','video','short','social_post','page')),
  topic         text,
  ai_augmentation text not null check (ai_augmentation in ('none','assist','generated')) default 'assist',
  publish_date  date,
  status        text not null check (status in ('idea','brief','draft','qa','staged','live','archived')) default 'idea',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (brand_id, url)
);

create index if not exists ix_content_asset_brand on content_asset(brand_id);
create index if not exists ix_content_asset_status on content_asset(status);

-- =========================================================
--  Content events (impression / click / engagement / conversion / revenue)
-- =========================================================
create table if not exists content_event (
  id          bigserial primary key,
  asset_id    bigint not null references content_asset(id) on delete cascade,
  ts          timestamptz not null default now(),
  kind        text not null check (kind in ('impression','click','engagement','conversion','revenue')),
  value       numeric(14,4) not null default 1,
  meta        jsonb
);
create index if not exists ix_content_event_asset_ts on content_event(asset_id, ts);
create index if not exists ix_content_event_kind on content_event(kind);

-- =========================================================
--  Channel events (social-channel level, brand-level aggregates)
-- =========================================================
create table if not exists channel_event (
  id          bigserial primary key,
  brand_id    bigint not null references brand(id) on delete cascade,
  channel     text not null check (channel in ('blog','newsletter','x','tiktok','instagram','youtube','reddit','pinterest')),
  ts          timestamptz not null default now(),
  kind        text not null check (kind in ('post','impression','follower_delta','engagement','signup','revenue')),
  value       numeric(14,4) not null default 1,
  meta        jsonb
);
create index if not exists ix_channel_event_brand_ts on channel_event(brand_id, ts);

-- =========================================================
--  Provider events (AI providers + hosting/data providers)
-- =========================================================
create table if not exists provider_event (
  id          bigserial primary key,
  provider    text not null,           -- e.g. 'gemini', 'groq', 'openrouter', 'cloudflare_pages'
  model       text,                    -- e.g. 'gemini-2.5-pro'
  ts          timestamptz not null default now(),
  kind        text not null check (kind in ('call','success','rate_limit','server_error','timeout','quota_warning')),
  tokens_in   integer,
  tokens_out  integer,
  latency_ms  integer,
  cost_est    numeric(10,6) default 0,
  meta        jsonb
);
create index if not exists ix_provider_event_provider_ts on provider_event(provider, ts);

-- =========================================================
--  Agent tasks (router calls, claude code runs, n8n executions)
-- =========================================================
create table if not exists agent_task (
  id          bigserial primary key,
  agent       text not null,           -- e.g. 'llm_router', 'claude_code', 'n8n_weekly_review'
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,
  status      text not null check (status in ('running','success','failed','timeout','aborted')) default 'running',
  provider    text,
  tokens      integer,
  cost_est    numeric(10,6) default 0,
  human_intervention boolean not null default false,
  trace_id    text,
  meta        jsonb
);
create index if not exists ix_agent_task_agent_ts on agent_task(agent, started_at);
create index if not exists ix_agent_task_status on agent_task(status);

-- =========================================================
--  Decisions (mirrors decision log, queryable)
-- =========================================================
create table if not exists decision (
  id          bigserial primary key,
  ts          timestamptz not null default now(),
  scope       text not null check (scope in ('portfolio','brand','provider','compliance','security')),
  target_id   bigint,                  -- nullable; for brand-scope this is brand.id, etc.
  kind        text not null check (kind in ('kill','hold','scale','adopt','retire','rotate','other')),
  reason      text not null,
  operator    text not null,
  revisit_date date,
  meta        jsonb
);

-- =========================================================
--  Heartbeat (keeps the Supabase free project from auto-pausing)
-- =========================================================
create table if not exists heartbeat (
  ts          timestamptz primary key default now(),
  source      text not null default 'hq_cron'
);

-- =========================================================
--  Views: dashboard-ready aggregates
-- =========================================================
create or replace view v_brand_weekly_stats as
  select b.id as brand_id,
         b.slug,
         date_trunc('week', ce.ts) as week,
         sum(case when ce.kind = 'impression'  then ce.value else 0 end) as impressions,
         sum(case when ce.kind = 'click'       then ce.value else 0 end) as clicks,
         sum(case when ce.kind = 'engagement'  then ce.value else 0 end) as engagements,
         sum(case when ce.kind = 'conversion'  then ce.value else 0 end) as conversions,
         sum(case when ce.kind = 'revenue'     then ce.value else 0 end) as revenue
  from   brand b
  left join content_asset ca on ca.brand_id = b.id
  left join content_event ce on ce.asset_id = ca.id
  group by b.id, b.slug, week;

create or replace view v_provider_daily as
  select provider,
         date_trunc('day', ts) as day,
         count(*) filter (where kind in ('call','success'))    as calls,
         count(*) filter (where kind = 'rate_limit')           as rate_limits,
         count(*) filter (where kind in ('server_error','timeout')) as errors,
         coalesce(sum(tokens_in),0)  as tokens_in,
         coalesce(sum(tokens_out),0) as tokens_out,
         coalesce(sum(cost_est),0)   as cost_est
  from   provider_event
  group by provider, day;

-- =========================================================
--  Row-level security (Supabase): default-deny, service role only
-- =========================================================
alter table brand          enable row level security;
alter table content_asset  enable row level security;
alter table content_event  enable row level security;
alter table channel_event  enable row level security;
alter table provider_event enable row level security;
alter table agent_task     enable row level security;
alter table decision       enable row level security;
alter table heartbeat      enable row level security;

-- (No anon policies created intentionally — HQ writes use the service-role key.
--  When the dashboard becomes user-facing, add scoped read policies here.)
