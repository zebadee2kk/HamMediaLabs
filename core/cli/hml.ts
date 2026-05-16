#!/usr/bin/env node
// hml — HamMediaLabs HQ CLI.
//   hml heartbeat            insert a Supabase keep-alive row
//   hml router-smoke         exercise the LLM router (set env vars first)
//   hml score <bs> <mp> <pr> [weeksBelow] [moneyInFlight]
//                            print verdict for a brand-score triple
//   hml migrate              apply core/db/schema.sql to Supabase (idempotent)
//   hml provider-quota       print current provider router policy
//
// All commands exit 0 on success, non-zero on failure.

import { heartbeat } from '../jobs/heartbeat.ts';
import { createHQRouter, type HQRouterEnv } from '../router/index.ts';
import { verdict, type VerdictInput } from '../scoring/index.ts';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const args = process.argv.slice(2);
const cmd = args[0];

async function main() {
  switch (cmd) {
    case 'heartbeat':      return cmdHeartbeat();
    case 'router-smoke':   return cmdRouterSmoke();
    case 'score':          return cmdScore();
    case 'migrate':        return cmdMigrate();
    case 'provider-quota': return cmdProviderQuota();
    case 'help':
    case undefined:        return printHelp();
    default:
      console.error(`unknown command: ${cmd}\n`);
      printHelp();
      process.exit(2);
  }
}

function printHelp() {
  console.log(`hml — HamMediaLabs HQ CLI

Commands:
  heartbeat           Insert a Supabase heartbeat row (prevents free-project pause).
                      Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
  router-smoke        Smoke-test the LLM router against configured providers.
                      Env: GEMINI_API_KEY and/or GROQ_API_KEY and/or OPENROUTER_API_KEY.
  score B M P [w] [moneyInFlight]
                      Print verdict for a brand. Args:
                        B = brand score (0..1)
                        M = monetisation potential (0..1)
                        P = platform risk (0..1)
                        w = consecutive weeks BS<0.30 (default 0)
                        moneyInFlight = "true"|"false" (default false)
  migrate             Apply core/db/schema.sql to Supabase via the SQL endpoint.
                      Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
  provider-quota      Print the active router policy (no network calls).
  help                Show this help.`);
}

async function cmdHeartbeat() {
  await heartbeat({
    SUPABASE_URL: requireEnv('SUPABASE_URL'),
    SUPABASE_SERVICE_ROLE_KEY: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    HEARTBEAT_SOURCE: process.env.HEARTBEAT_SOURCE,
  });
  console.log('ok');
}

async function cmdRouterSmoke() {
  const env: HQRouterEnv = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    OPENROUTER_REFERER: process.env.OPENROUTER_REFERER,
    OPENROUTER_TITLE: process.env.OPENROUTER_TITLE,
  };
  if (!env.GEMINI_API_KEY && !env.GROQ_API_KEY && !env.OPENROUTER_API_KEY) {
    console.error('no provider keys set; smoke test cannot proceed');
    process.exit(1);
  }
  const router = createHQRouter(env, {
    recordEvent: (e) => console.log('event:', e.kind, e.provider, e.model, e.status, e.latencyMs + 'ms'),
  });
  const out = await router.generate({
    slot: 'fast',
    prompt: 'Reply with exactly: "router ok".',
    maxTokens: 20,
    temperature: 0,
    tag: 'cli-smoke',
  });
  console.log('result:', JSON.stringify({
    provider: out.provider, model: out.model, latencyMs: out.latencyMs, text: out.text.slice(0, 80),
  }, null, 2));
}

function cmdScore() {
  const [bsRaw, mpRaw, prRaw, wRaw, mfRaw] = args.slice(1);
  if (!bsRaw || !mpRaw || !prRaw) { printHelp(); process.exit(2); }
  const bs = clampFloat(bsRaw);
  const mp = clampFloat(mpRaw);
  const pr = clampFloat(prRaw);
  const w  = wRaw ? parseInt(wRaw, 10) : 0;
  const mf = mfRaw === 'true';

  // Sanity: re-score via brandScore if user passed in inputs rather than BS.
  // Here we accept BS directly; mp/pr are gate inputs.
  const v: VerdictInput = {
    brandScore: bs,
    monetisationPotential: mp,
    platformRisk: pr,
    consecutiveWeeksBelow030: isNaN(w) ? 0 : w,
    monetisationInFlight: mf,
  };
  const verdictOut = verdict(v);
  console.log(JSON.stringify({ input: v, verdict: verdictOut }, null, 2));
}

async function cmdMigrate() {
  const url = requireEnv('SUPABASE_URL');
  const key = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  const here = dirname(fileURLToPath(import.meta.url));
  const sqlPath = join(here, '..', 'db', 'schema.sql');
  const sql = await readFile(sqlPath, 'utf8');

  // Supabase doesn't expose a generic SQL endpoint to anon clients. Operators run
  // the SQL via the SQL editor or via psql. This command prints what to apply.
  console.log('--- target ---');
  console.log(url);
  console.log('--- schema (apply via Supabase SQL editor or psql) ---');
  console.log(sql);
  console.log('--- end ---');
  // Intentionally not POSTing the SQL: forces a human pass through the editor.
  void key;
}

function cmdProviderQuota() {
  const policy = {
    plan: ['gemini', 'openrouter', 'groq'],
    fast: ['groq', 'gemini', 'openrouter'],
    code: ['openrouter', 'gemini', 'groq'],
    edge: ['cloudflare_ai', 'groq'],
  };
  console.log(JSON.stringify({
    note: 'Free-tier ceilings (May 2026). Re-validate quarterly.',
    policy,
    quotas: {
      gemini: { rpm: '5–15', rpd: '100–1000', tpm: 250000 },
      groq:   { rpm: 30, tpm: 6000, rpd: 1000, note: 'gemma2-9b 15K TPM; llama-3.1-8b 500K tokens/day' },
      openrouter: { rpm: 20, rpd_unpaid: 50, rpd_with_10usd: 1000 },
      cloudflare_pages: { builds_per_month: 500, bandwidth: 'unlimited', files_per_site: 20000 },
      supabase_free: { active_projects: 2, db_mb: 500, pauses_after_days: 7 },
    },
  }, null, 2));
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) { console.error(`missing required env: ${name}`); process.exit(1); }
  return v;
}

function clampFloat(s: string): number {
  const n = Number(s);
  if (!isFinite(n)) { console.error(`bad number: ${s}`); process.exit(2); }
  return Math.max(0, Math.min(1, n));
}

main().catch((e) => { console.error(e?.stack || e); process.exit(1); });
