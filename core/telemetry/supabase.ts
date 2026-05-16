// Supabase telemetry writer for the HQ LLM router.
//
// Consumes TelemetryEvent values emitted by the router and writes them into
// the HQ schema:
//   - every event           → one row in provider_event
//   - kind === 'final'      → additionally one row in agent_task
//
// Telemetry is NOT on the critical path. Writes that fail are forwarded to
// onError (default: console.warn) and never thrown to the caller.
//
// Security:
//   - Service-role key is sent only in the Authorization / apikey headers.
//   - The default onError never includes the key in its message.
//   - This module must never be imported into client-side / browser code.

import type { TelemetryEvent } from '../router/router.ts';

export interface SupabaseTelemetryConfig {
  url: string;
  /** Tier 1 secret. Never log, never expose to clients. */
  serviceRoleKey: string;
  /** agent_task.agent value for `kind === 'final'` rows. Default 'llm_router'. */
  agent?: string;
  /** Override for tests. Defaults to global fetch. */
  fetchImpl?: typeof fetch;
  /** Telemetry write failures are forwarded here. Default: console.warn. */
  onError?: (err: unknown, event: TelemetryEvent) => void;
}

export interface SupabaseTelemetryEnv {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

// TelemetryEvent.status ∈ 'success' | 'rate_limit' | 'server_error' | 'timeout' | 'aborted'
// provider_event.kind   ∈ 'call' | 'success' | 'rate_limit' | 'server_error' | 'timeout' | 'quota_warning'
// 'aborted' is intentionally absent from the schema CHECK; map to 'server_error'.
const PROVIDER_EVENT_KIND: Record<TelemetryEvent['status'], string> = {
  success: 'success',
  rate_limit: 'rate_limit',
  server_error: 'server_error',
  timeout: 'timeout',
  aborted: 'server_error',
};

// agent_task.status ∈ 'running' | 'success' | 'failed' | 'timeout' | 'aborted'
// The router only emits kind === 'final' on success, but we map defensively
// in case the contract widens later.
const AGENT_TASK_STATUS: Record<TelemetryEvent['status'], string> = {
  success: 'success',
  rate_limit: 'failed',
  server_error: 'failed',
  timeout: 'timeout',
  aborted: 'aborted',
};

export type TelemetryWriter = (e: TelemetryEvent) => Promise<void>;

export function createSupabaseTelemetryWriter(cfg: SupabaseTelemetryConfig): TelemetryWriter {
  const f = cfg.fetchImpl ?? fetch;
  const baseUrl = cfg.url.replace(/\/$/, '');
  const agent = cfg.agent ?? 'llm_router';
  const onError = cfg.onError ?? defaultOnError;

  async function post(table: 'provider_event' | 'agent_task', body: object): Promise<void> {
    const res = await f(`${baseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        apikey: cfg.serviceRoleKey,
        authorization: `Bearer ${cfg.serviceRoleKey}`,
        prefer: 'return=minimal',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = await safeText(res);
      throw new Error(`supabase ${table} write failed: ${res.status} ${truncate(detail, 200)}`);
    }
  }

  return async function record(event: TelemetryEvent): Promise<void> {
    const providerRow = {
      provider: event.provider,
      model: event.model,
      kind: PROVIDER_EVENT_KIND[event.status] ?? 'server_error',
      tokens_in: event.tokensIn ?? null,
      tokens_out: event.tokensOut ?? null,
      latency_ms: event.latencyMs,
      cost_est: event.costEst ?? 0,
      meta: {
        tag: event.tag ?? null,
        error: event.error ? truncate(event.error, 500) : null,
        event_kind: event.kind,
      },
    };
    try {
      await post('provider_event', providerRow);
    } catch (e) {
      onError(e, event);
    }

    if (event.kind === 'final') {
      const now = Date.now();
      const taskRow = {
        agent,
        started_at: new Date(now - Math.max(0, event.latencyMs | 0)).toISOString(),
        ended_at: new Date(now).toISOString(),
        status: AGENT_TASK_STATUS[event.status] ?? 'failed',
        provider: event.provider,
        tokens: (event.tokensIn ?? 0) + (event.tokensOut ?? 0),
        cost_est: event.costEst ?? 0,
        human_intervention: false,
        trace_id: event.tag ?? null,
        meta: { model: event.model },
      };
      try {
        await post('agent_task', taskRow);
      } catch (e) {
        onError(e, event);
      }
    }
  };
}

/**
 * Convenience: build a writer from env. Returns `undefined` if either
 * SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing — the caller can pass
 * the result directly to the router's `recordEvent` option (it's optional).
 */
export function createSupabaseTelemetryWriterFromEnv(
  env: SupabaseTelemetryEnv,
  opts: Omit<SupabaseTelemetryConfig, 'url' | 'serviceRoleKey'> = {},
): TelemetryWriter | undefined {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return undefined;
  return createSupabaseTelemetryWriter({
    url: env.SUPABASE_URL,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
    ...opts,
  });
}

function defaultOnError(err: unknown, event: TelemetryEvent): void {
  // Intentionally does not include the service-role key. Only minimal metadata.
  const msg = err instanceof Error ? err.message : String(err);
  // eslint-disable-next-line no-console
  console.warn(
    `[telemetry] write failed for ${event.provider}/${event.model} ` +
    `(${event.kind}/${event.status}): ${msg}`,
  );
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return '';
  }
}
