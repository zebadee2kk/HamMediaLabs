// Provider quota registry — single source of truth.
//
// Validated values are sourced from the providers' own pricing / limits pages,
// captured in docs/PROJECTHYDRA-MASTER-PLAN.md §3 with full citations.
// Re-validate quarterly via playbooks/provider-revalidation.md.

import type { QuotaRegistry } from './types.ts';

export const REGISTRY: QuotaRegistry = {
  version: '1',
  last_full_review: '2026-05-16',
  next_full_review: '2026-08-16',
  providers: [
    {
      id: 'gemini',
      name: 'Google AI Studio (Gemini)',
      category: 'ai',
      source_url: 'https://ai.google.dev/gemini-api/docs/rate-limits',
      last_validated: '2026-05-16',
      default_router_slot: 'plan',
      notes: 'Free-tier limits were cut 50–80% in December 2025. Re-validate every quarter.',
      tiers: [
        {
          tier: 'free',
          rates: {
            rpm: '5–15',
            rpd: '100–1000',
            tpm: 250_000,
            notes: 'Universal 250K TPM cap across free models (Gemini 2.5 Pro/Flash/Flash-Lite).',
          },
        },
      ],
    },
    {
      id: 'groq',
      name: 'Groq',
      category: 'ai',
      source_url: 'https://console.groq.com/docs/rate-limits',
      last_validated: '2026-05-16',
      default_router_slot: 'fast',
      tiers: [
        {
          tier: 'free',
          rates: {
            rpm: 30,
            tpm: 6_000,
            rpd: 1_000,
            notes:
              'gemma2-9b 15K TPM; llama-3.1-8b-instant has a 500K tokens/day budget; ' +
              'whichever limit hits first applies.',
          },
        },
      ],
    },
    {
      id: 'openrouter',
      name: 'OpenRouter',
      category: 'ai',
      source_url: 'https://openrouter.ai/docs/api/reference/limits',
      last_validated: '2026-05-16',
      default_router_slot: 'code',
      notes: 'Pre-funding ≥$10 unlocks the higher RPD on :free models. Failed requests count toward RPD.',
      tiers: [
        {
          tier: 'free',
          rates: { rpm: 20, rpd: 50, notes: 'Unpaid accounts.' },
        },
        {
          tier: 'free-with-credits',
          rates: { rpm: 20, rpd: 1_000, notes: 'After ≥$10 pre-funded deposit.' },
        },
      ],
    },
    {
      id: 'cloudflare_pages',
      name: 'Cloudflare Pages',
      category: 'hosting',
      source_url: 'https://developers.cloudflare.com/pages/platform/limits/',
      last_validated: '2026-05-16',
      default_router_slot: null,
      tiers: [
        {
          tier: 'free',
          hosting: {
            builds_per_month: 500,
            bandwidth: 'unlimited',
            files_per_site: 20_000,
            max_file_size: '25 MiB',
            build_timeout_minutes: 20,
          },
        },
      ],
    },
    {
      id: 'supabase',
      name: 'Supabase',
      category: 'data',
      source_url: 'https://supabase.com/pricing',
      last_validated: '2026-05-16',
      default_router_slot: null,
      notes:
        'Free projects auto-pause after 7 days with zero DB activity. Mitigated by the daily heartbeat job ' +
        '(see core/jobs/heartbeat.ts) and the GitHub Actions schedule.',
      tiers: [
        {
          tier: 'free',
          data: {
            active_projects: 2,
            db_mb: 500,
            storage_gb: 1,
            egress_gb: 5,
            monthly_active_users: 50_000,
            pauses_after_days: 7,
            backups: 'none',
          },
        },
      ],
    },
  ],
};
