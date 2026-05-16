// Types for the provider quota registry.
//
// The registry is the single source of truth for free-tier ceilings and
// quota-related metadata. The CLI and (eventually) the router read from it.
// Real-time quota polling and runtime throttling are explicitly out of scope
// for this module — see docs/15-decision-log.md for the deferral.

export type ProviderCategory = 'ai' | 'hosting' | 'data';

export type RouterSlot = 'plan' | 'fast' | 'code' | 'edge';

/**
 * Numeric quotas may be expressed as a range string ("5–15") when the
 * provider's published value is itself a range.
 */
export type Quota = number | string;

export interface RateLimits {
  rpm?: Quota;          // requests per minute
  rpd?: Quota;          // requests per day
  tpm?: Quota;          // tokens per minute (input + output combined unless noted)
  tpd?: Quota;          // tokens per day
  notes?: string;
}

export interface HostingQuotas {
  builds_per_month?: Quota;
  bandwidth?: string;          // free-form ("unlimited" | "100 GB" | …)
  files_per_site?: number;
  max_file_size?: string;
  build_timeout_minutes?: number;
}

export interface DataQuotas {
  active_projects?: number;
  db_mb?: number;
  storage_gb?: number;
  egress_gb?: number;
  monthly_active_users?: number;
  pauses_after_days?: number;
  backups?: 'none' | 'daily' | 'pitr';
}

export interface ProviderQuotaTier {
  tier: 'free' | 'free-with-credits' | 'paid';
  rates?: RateLimits;          // AI providers
  hosting?: HostingQuotas;     // hosting providers
  data?: DataQuotas;           // data providers
  /** Free-form notes specific to this tier (e.g., "after $10 deposit"). */
  notes?: string;
}

export interface ProviderQuota {
  /** Stable identifier; lower-case snake_case. Used by the router and CLI. */
  id: string;
  /** Human-friendly display name. */
  name: string;
  category: ProviderCategory;
  /** Canonical regulator/provider page for the published quotas. */
  source_url: string;
  /** ISO date string YYYY-MM-DD; the last time these numbers were validated. */
  last_validated: string;
  tiers: ProviderQuotaTier[];
  /** For AI providers, the router slot this provider primarily serves. */
  default_router_slot?: RouterSlot | null;
  /** Optional risk / status note. */
  notes?: string;
}

export interface QuotaRegistry {
  /** Schema version. Bump if the shape changes. */
  version: '1';
  /** ISO date string; the last time the *whole* registry was reviewed. */
  last_full_review: string;
  /** ISO date string; quarterly cadence — when the next review is due. */
  next_full_review: string;
  providers: ProviderQuota[];
}

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
}
