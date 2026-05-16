// Unit tests for the router. Run with: npm test
// Uses Node's built-in test runner; no external test framework required.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { Router, defaultPolicy, type RouterConfig, type TelemetryEvent } from './router.ts';
import type { ProviderDriver, Slot } from './types.ts';
import { ProviderError, RateLimitError } from './types.ts';

function fakeDriver(opts: {
  id: any;
  modelsBySlot?: Partial<Record<Slot, string[]>>;
  behavior: (model: string) => Promise<{ text: string; tokensIn: number; tokensOut: number; latencyMs: number }>;
}): ProviderDriver {
  return {
    id: opts.id,
    models(slot) { return opts.modelsBySlot?.[slot] ?? ['m1']; },
    costEstimate(_m, i, o) { return (i + o) * 1e-9; },
    generate(model) { return opts.behavior(model); },
  };
}

test('router: primary success short-circuits', async () => {
  const calls: TelemetryEvent[] = [];
  const cfg: RouterConfig = {
    drivers: {
      gemini: fakeDriver({
        id: 'gemini',
        behavior: async () => ({ text: 'ok', tokensIn: 10, tokensOut: 20, latencyMs: 5 }),
      }),
      groq: fakeDriver({ id: 'groq', behavior: async () => { throw new Error('should not be called'); } }),
      openrouter: fakeDriver({ id: 'openrouter', behavior: async () => { throw new Error('nope'); } }),
      cloudflare_ai: undefined,
    },
    policy: defaultPolicy,
    recordEvent: (e) => { calls.push(e); },
  };
  const r = new Router(cfg);
  const out = await r.generate({ slot: 'plan', prompt: 'hi' });
  assert.equal(out.provider, 'gemini');
  assert.equal(out.text, 'ok');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].status, 'success');
});

test('router: falls over on rate limit', async () => {
  const calls: TelemetryEvent[] = [];
  const cfg: RouterConfig = {
    drivers: {
      gemini: fakeDriver({
        id: 'gemini',
        behavior: async () => { throw new RateLimitError('gemini'); },
      }),
      groq: fakeDriver({
        id: 'groq',
        behavior: async () => ({ text: 'ok-from-groq', tokensIn: 5, tokensOut: 5, latencyMs: 2 }),
      }),
      openrouter: undefined,
      cloudflare_ai: undefined,
    },
    policy: { plan: ['gemini', 'groq'], fast: ['groq'], code: ['groq'], edge: ['groq'] },
    recordEvent: (e) => { calls.push(e); },
  };
  const r = new Router(cfg);
  const out = await r.generate({ slot: 'plan', prompt: 'hi' });
  assert.equal(out.provider, 'groq');
  assert.equal(out.text, 'ok-from-groq');
  // one attempt (rate limit) + one final (success)
  assert.ok(calls.find(c => c.status === 'rate_limit'));
  assert.ok(calls.find(c => c.status === 'success' && c.kind === 'final'));
});

test('router: strict mode disables failover', async () => {
  const cfg: RouterConfig = {
    drivers: {
      gemini: fakeDriver({ id: 'gemini', behavior: async () => { throw new ProviderError('gemini', 500, 'boom'); } }),
      groq: fakeDriver({ id: 'groq', behavior: async () => ({ text: 'unused', tokensIn: 0, tokensOut: 0, latencyMs: 0 }) }),
      openrouter: undefined,
      cloudflare_ai: undefined,
    },
    policy: { plan: ['gemini', 'groq'], fast: ['groq'], code: ['groq'], edge: ['groq'] },
  };
  const r = new Router(cfg);
  await assert.rejects(() => r.generate({ slot: 'plan', prompt: 'x', strict: true }));
});

test('router: exhausting all providers throws with attempts log', async () => {
  const cfg: RouterConfig = {
    drivers: {
      gemini: fakeDriver({ id: 'gemini', behavior: async () => { throw new RateLimitError('gemini'); } }),
      groq: fakeDriver({ id: 'groq', behavior: async () => { throw new ProviderError('groq', 500, 'x'); } }),
      openrouter: fakeDriver({ id: 'openrouter', behavior: async () => { throw new ProviderError('openrouter', 502, 'y'); } }),
      cloudflare_ai: undefined,
    },
    policy: defaultPolicy,
  };
  const r = new Router(cfg);
  await assert.rejects(async () => {
    try {
      await r.generate({ slot: 'plan', prompt: 'x' });
    } catch (e: any) {
      assert.ok(Array.isArray(e.attempts));
      assert.ok(e.attempts.length >= 3);
      throw e;
    }
  });
});
