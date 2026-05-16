// HQ LLM router. Tries providers in slot-specific preference order; logs every attempt.
// Telemetry hook: pass a `recordEvent` to wire into Supabase `provider_event` / `agent_task`.

import type {
  AttemptLog,
  GenerationRequest,
  GenerationResult,
  ProviderDriver,
  ProviderId,
  Slot,
} from './types.ts';
import { ProviderError, RateLimitError } from './types.ts';

export interface RouterConfig {
  drivers: Record<ProviderId, ProviderDriver | undefined>;
  /** Preference order per slot. First entry is primary. */
  policy: Record<Slot, ProviderId[]>;
  /** Per-attempt soft timeout (ms). */
  timeoutMs?: number;
  /** Telemetry sink. */
  recordEvent?: (e: TelemetryEvent) => void | Promise<void>;
}

export interface TelemetryEvent {
  kind: 'attempt' | 'final';
  provider: ProviderId;
  model: string;
  status: AttemptLog['status'];
  latencyMs: number;
  tokensIn?: number;
  tokensOut?: number;
  costEst?: number;
  tag?: string;
  error?: string;
}

export const defaultPolicy: Record<Slot, ProviderId[]> = {
  plan: ['gemini', 'openrouter', 'groq'],
  fast: ['groq', 'gemini', 'openrouter'],
  code: ['openrouter', 'gemini', 'groq'],
  edge: ['cloudflare_ai', 'groq'],
};

export class Router {
  private cfg: RouterConfig;
  constructor(cfg: RouterConfig) {
    this.cfg = cfg;
  }

  async generate(req: GenerationRequest): Promise<GenerationResult> {
    const order = this.cfg.policy[req.slot];
    if (!order || order.length === 0) {
      throw new Error(`No policy configured for slot "${req.slot}"`);
    }

    const attempts: AttemptLog[] = [];
    let lastError: unknown;

    for (const pid of order) {
      const driver = this.cfg.drivers[pid];
      if (!driver) continue;

      const models = driver.models(req.slot);
      for (const model of models) {
        const started = Date.now();
        try {
          const out = await withTimeout(
            driver.generate(model, req),
            this.cfg.timeoutMs ?? 60_000,
          );
          const latencyMs = out.latencyMs || Date.now() - started;
          const costEst = driver.costEstimate(model, out.tokensIn, out.tokensOut);
          const attempt: AttemptLog = {
            provider: pid,
            model,
            status: 'success',
            latencyMs,
          };
          attempts.push(attempt);
          await this.cfg.recordEvent?.({
            kind: 'final',
            provider: pid,
            model,
            status: 'success',
            latencyMs,
            tokensIn: out.tokensIn,
            tokensOut: out.tokensOut,
            costEst,
            tag: req.tag,
          });
          return {
            provider: pid,
            model,
            text: out.text,
            tokensIn: out.tokensIn,
            tokensOut: out.tokensOut,
            latencyMs,
            costEst,
            attempts,
          };
        } catch (err) {
          lastError = err;
          const latencyMs = Date.now() - started;
          const status: AttemptLog['status'] =
            err instanceof RateLimitError ? 'rate_limit'
            : err instanceof ProviderError ? 'server_error'
            : err instanceof TimeoutError ? 'timeout'
            : 'server_error';
          attempts.push({
            provider: pid,
            model,
            status,
            latencyMs,
            error: (err as Error)?.message,
          });
          await this.cfg.recordEvent?.({
            kind: 'attempt',
            provider: pid,
            model,
            status,
            latencyMs,
            tag: req.tag,
            error: (err as Error)?.message,
          });
          if (req.strict) throw err;
          // continue → next model, then next provider
        }
      }
    }

    const finalErr = lastError instanceof Error
      ? lastError
      : new Error('All providers exhausted');
    throw Object.assign(finalErr, { attempts });
  }
}

class TimeoutError extends Error {
  constructor() { super('timeout'); this.name = 'TimeoutError'; }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new TimeoutError()), ms);
    p.then(v => { clearTimeout(t); resolve(v); },
           e => { clearTimeout(t); reject(e); });
  });
}
