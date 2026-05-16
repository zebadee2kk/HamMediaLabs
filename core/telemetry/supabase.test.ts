import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  createSupabaseTelemetryWriter,
  createSupabaseTelemetryWriterFromEnv,
} from './supabase.ts';
import type { TelemetryEvent } from '../router/router.ts';

interface MockResponsePlan {
  ok: boolean;
  status: number;
  text?: string;
}
interface MockCall {
  url: string;
  init: RequestInit | undefined;
}

function mockFetch(plans: MockResponsePlan[]): { fn: typeof fetch; calls: MockCall[] } {
  const calls: MockCall[] = [];
  let i = 0;
  const fn = (async (input: any, init?: RequestInit) => {
    calls.push({ url: String(input), init });
    const plan = plans[i] ?? plans[plans.length - 1];
    i++;
    return {
      ok: plan.ok,
      status: plan.status,
      text: async () => plan.text ?? '',
    } as unknown as Response;
  }) as unknown as typeof fetch;
  return { fn, calls };
}

function ev(over: Partial<TelemetryEvent>): TelemetryEvent {
  return {
    kind: 'attempt',
    provider: 'gemini',
    model: 'gemini-2.5-flash',
    status: 'success',
    latencyMs: 100,
    ...over,
  };
}

test('attempt events write only to provider_event', async () => {
  const { fn, calls } = mockFetch([{ ok: true, status: 201 }]);
  const record = createSupabaseTelemetryWriter({
    url: 'https://example.supabase.co',
    serviceRoleKey: 'fake-key',
    fetchImpl: fn,
  });
  await record(ev({ kind: 'attempt', status: 'rate_limit' }));

  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/rest\/v1\/provider_event$/);

  const body = JSON.parse(String(calls[0].init?.body));
  assert.equal(body.provider, 'gemini');
  assert.equal(body.kind, 'rate_limit');
  assert.equal(body.meta.event_kind, 'attempt');
});

test('final events write to both provider_event and agent_task in order', async () => {
  const { fn, calls } = mockFetch([
    { ok: true, status: 201 },
    { ok: true, status: 201 },
  ]);
  const record = createSupabaseTelemetryWriter({
    url: 'https://example.supabase.co/',
    serviceRoleKey: 'fake-key',
    fetchImpl: fn,
    agent: 'test_agent',
  });
  await record(ev({
    kind: 'final',
    provider: 'groq',
    model: 'llama-3.1-8b-instant',
    status: 'success',
    latencyMs: 500,
    tokensIn: 10,
    tokensOut: 20,
    costEst: 0.001,
    tag: 'asset-42',
  }));

  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /provider_event/);
  assert.match(calls[1].url, /agent_task/);

  const provider = JSON.parse(String(calls[0].init?.body));
  assert.equal(provider.tokens_in, 10);
  assert.equal(provider.tokens_out, 20);
  assert.equal(provider.cost_est, 0.001);

  const task = JSON.parse(String(calls[1].init?.body));
  assert.equal(task.agent, 'test_agent');
  assert.equal(task.provider, 'groq');
  assert.equal(task.tokens, 30);
  assert.equal(task.status, 'success');
  assert.equal(task.trace_id, 'asset-42');
  assert.equal(task.human_intervention, false);
  // ended_at should be strictly after started_at (latency was 500ms).
  assert.ok(new Date(task.ended_at).getTime() >= new Date(task.started_at).getTime());
});

test('failed Supabase write invokes onError and does not throw', async () => {
  const { fn } = mockFetch([{ ok: false, status: 500, text: 'boom' }]);
  const seen: Array<{ err: unknown; event: TelemetryEvent }> = [];
  const record = createSupabaseTelemetryWriter({
    url: 'https://example.supabase.co',
    serviceRoleKey: 'fake-key',
    fetchImpl: fn,
    onError: (err, event) => { seen.push({ err, event }); },
  });

  // Must not throw.
  await record(ev({ kind: 'attempt', status: 'server_error' }));

  assert.equal(seen.length, 1);
  assert.match(String((seen[0].err as Error).message), /provider_event write failed: 500/);
});

test('aborted status maps to provider_event.kind = server_error (schema does not allow aborted)', async () => {
  const { fn, calls } = mockFetch([{ ok: true, status: 201 }]);
  const record = createSupabaseTelemetryWriter({
    url: 'https://example.supabase.co',
    serviceRoleKey: 'k',
    fetchImpl: fn,
  });
  await record(ev({ kind: 'attempt', status: 'aborted' }));
  const body = JSON.parse(String(calls[0].init?.body));
  assert.equal(body.kind, 'server_error');
});

test('service role key is set in headers but never leaks into error messages', async () => {
  const { fn, calls } = mockFetch([{ ok: false, status: 401, text: 'unauthorized' }]);
  let errorMsg = '';
  const SECRET = 'super-secret-do-not-leak-1234';
  const record = createSupabaseTelemetryWriter({
    url: 'https://example.supabase.co',
    serviceRoleKey: SECRET,
    fetchImpl: fn,
    onError: (err) => { errorMsg = err instanceof Error ? err.message : String(err); },
  });
  await record(ev({ kind: 'attempt', status: 'success' }));

  // Headers must carry the secret …
  const headers = calls[0].init?.headers as Record<string, string>;
  assert.equal(headers['apikey'], SECRET);
  assert.equal(headers['authorization'], `Bearer ${SECRET}`);

  // … but the error message must not.
  assert.doesNotMatch(errorMsg, /super-secret/);
});

test('two attempts + one final produce three provider_event rows and one agent_task row', async () => {
  const { fn, calls } = mockFetch([
    { ok: true, status: 201 }, // attempt 1 → provider_event
    { ok: true, status: 201 }, // attempt 2 → provider_event
    { ok: true, status: 201 }, // final     → provider_event
    { ok: true, status: 201 }, // final     → agent_task
  ]);
  const record = createSupabaseTelemetryWriter({
    url: 'https://example.supabase.co',
    serviceRoleKey: 'k',
    fetchImpl: fn,
  });
  await record(ev({ kind: 'attempt', status: 'rate_limit' }));
  await record(ev({ kind: 'attempt', status: 'success' }));
  await record(ev({ kind: 'final',   status: 'success' }));

  assert.equal(calls.length, 4);
  const tables = calls.map(c => c.url.split('/rest/v1/')[1]);
  assert.deepEqual(tables, ['provider_event', 'provider_event', 'provider_event', 'agent_task']);
});

test('createSupabaseTelemetryWriterFromEnv returns undefined when env is missing', () => {
  assert.equal(createSupabaseTelemetryWriterFromEnv({}), undefined);
  assert.equal(
    createSupabaseTelemetryWriterFromEnv({ SUPABASE_URL: 'https://x' }),
    undefined,
  );
  assert.equal(
    createSupabaseTelemetryWriterFromEnv({ SUPABASE_SERVICE_ROLE_KEY: 'k' }),
    undefined,
  );
});

test('createSupabaseTelemetryWriterFromEnv returns a writer when env is complete', async () => {
  const { fn, calls } = mockFetch([{ ok: true, status: 201 }]);
  const writer = createSupabaseTelemetryWriterFromEnv(
    { SUPABASE_URL: 'https://example.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'k' },
    { fetchImpl: fn },
  );
  assert.ok(writer);
  await writer(ev({ kind: 'attempt', status: 'success' }));
  assert.equal(calls.length, 1);
});

test('error string longer than 500 chars is truncated in meta.error', async () => {
  const { fn, calls } = mockFetch([{ ok: true, status: 201 }]);
  const record = createSupabaseTelemetryWriter({
    url: 'https://example.supabase.co',
    serviceRoleKey: 'k',
    fetchImpl: fn,
  });
  const long = 'x'.repeat(600);
  await record(ev({ kind: 'attempt', status: 'server_error', error: long }));
  const body = JSON.parse(String(calls[0].init?.body));
  assert.ok(typeof body.meta.error === 'string');
  assert.ok(body.meta.error.length <= 500);
  assert.ok(body.meta.error.endsWith('…'));
});
