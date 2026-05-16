// Shared types for the HQ LLM router.

/**
 * Provider identifiers known to the HQ router.
 *
 * Hugging Face is intentionally **not** in this union: per the May 2026 review
 * its hosted-inference SLOs are too inconsistent for an automation-critical
 * fallback, and its primary fit (experimentation) is served better by ad-hoc
 * Spaces work outside the router. See `docs/15-decision-log.md` (2026-05-16
 * "Defer Hugging Face from the LLM router") for the rationale and the
 * re-evaluation date.
 */
export type ProviderId = 'gemini' | 'groq' | 'openrouter' | 'cloudflare_ai';

export type Slot =
  | 'plan'        // long-context planning, outlines, structured briefs
  | 'fast'        // titles, variations, hooks
  | 'code'        // coding agents
  | 'edge';       // edge / very small models

export interface GenerationRequest {
  slot: Slot;
  system?: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  /** Strict mode: never fall back if the primary provider fails. Default false. */
  strict?: boolean;
  /** Tag for telemetry (e.g. brand slug + asset id). */
  tag?: string;
}

export interface GenerationResult {
  provider: ProviderId;
  model: string;
  text: string;
  tokensIn: number;
  tokensOut: number;
  latencyMs: number;
  costEst: number;       // USD estimate; converted to GBP at reporting time
  attempts: AttemptLog[]; // every attempt including failed ones
}

export interface AttemptLog {
  provider: ProviderId;
  model: string;
  status: 'success' | 'rate_limit' | 'server_error' | 'timeout' | 'aborted';
  latencyMs: number;
  error?: string;
}

export interface ProviderDriver {
  id: ProviderId;
  /** Models this driver currently exposes, in preference order. */
  models(slot: Slot): string[];
  /** Cost estimate per call in USD (very rough — used for routing tie-break only). */
  costEstimate(model: string, tokensIn: number, tokensOut: number): number;
  /** Execute one call. Throws on rate limit / server error so the router can fail over. */
  generate(model: string, req: GenerationRequest): Promise<{
    text: string;
    tokensIn: number;
    tokensOut: number;
    latencyMs: number;
  }>;
}

export class RateLimitError extends Error {
  provider: ProviderId;
  retryAfterMs?: number;
  constructor(provider: ProviderId, retryAfterMs?: number) {
    super(`Rate limited by ${provider}`);
    this.name = 'RateLimitError';
    this.provider = provider;
    this.retryAfterMs = retryAfterMs;
  }
}

export class ProviderError extends Error {
  provider: ProviderId;
  status: number;
  detail: string;
  constructor(provider: ProviderId, status: number, detail: string) {
    super(`${provider} returned ${status}: ${detail}`);
    this.name = 'ProviderError';
    this.provider = provider;
    this.status = status;
    this.detail = detail;
  }
}
