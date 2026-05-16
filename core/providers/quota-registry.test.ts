import { test } from 'node:test';
import assert from 'node:assert/strict';

import { REGISTRY, getProvider, providersByCategory, validateRegistry } from './index.ts';
import type { QuotaRegistry } from './index.ts';

test('canonical registry passes validation', () => {
  const result = validateRegistry(REGISTRY);
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
  assert.equal(result.issues.length, 0);
});

test('canonical registry covers the five providers Phase 4 requires', () => {
  const ids = REGISTRY.providers.map(p => p.id).sort();
  assert.deepEqual(
    ids.sort(),
    ['cloudflare_pages', 'gemini', 'groq', 'openrouter', 'supabase'].sort(),
  );
});

test('every provider has a free or free-with-credits tier', () => {
  for (const p of REGISTRY.providers) {
    const ok = p.tiers.some(t => t.tier === 'free' || t.tier === 'free-with-credits');
    assert.ok(ok, `${p.id} has no free tier`);
  }
});

test('every provider has an https source URL and an ISO last_validated date', () => {
  for (const p of REGISTRY.providers) {
    assert.match(p.source_url, /^https:\/\//, `${p.id} bad source_url`);
    assert.match(p.last_validated, /^\d{4}-\d{2}-\d{2}$/, `${p.id} bad last_validated`);
  }
});

test('AI providers map to a router slot', () => {
  const ai = providersByCategory('ai');
  assert.ok(ai.length >= 3);
  for (const p of ai) {
    assert.ok(['plan', 'fast', 'code', 'edge'].includes(p.default_router_slot as string),
      `${p.id} ai provider must declare a default router slot`);
  }
});

test('getProvider finds known ids and returns undefined for unknown', () => {
  assert.ok(getProvider('gemini'));
  assert.equal(getProvider('gemini')?.category, 'ai');
  assert.equal(getProvider('does_not_exist'), undefined);
});

test('validation fails on duplicate provider ids', () => {
  const reg: QuotaRegistry = {
    ...REGISTRY,
    providers: [REGISTRY.providers[0], REGISTRY.providers[0]],
  };
  const r = validateRegistry(reg);
  assert.equal(r.ok, false);
  assert.ok(r.issues.some(i => /duplicate id/.test(i.message)));
});

test('validation fails on non-https source url', () => {
  const reg: QuotaRegistry = {
    ...REGISTRY,
    providers: [{ ...REGISTRY.providers[0], source_url: 'http://example.com' }],
  };
  const r = validateRegistry(reg);
  assert.equal(r.ok, false);
  assert.ok(r.issues.some(i => /source_url/.test(i.path)));
});

test('validation fails on bad last_validated date', () => {
  const reg: QuotaRegistry = {
    ...REGISTRY,
    providers: [{ ...REGISTRY.providers[0], last_validated: '2026/05/16' }],
  };
  const r = validateRegistry(reg);
  assert.equal(r.ok, false);
  assert.ok(r.issues.some(i => /last_validated/.test(i.path)));
});

test('validation fails if a provider has no tier', () => {
  const reg: QuotaRegistry = {
    ...REGISTRY,
    providers: [{ ...REGISTRY.providers[0], tiers: [] }],
  };
  const r = validateRegistry(reg);
  assert.equal(r.ok, false);
});

test('validation fails if an AI provider has no rates on its tier', () => {
  const ai = REGISTRY.providers.find(p => p.category === 'ai')!;
  const reg: QuotaRegistry = {
    ...REGISTRY,
    providers: [{ ...ai, tiers: [{ tier: 'free' }] }],
  };
  const r = validateRegistry(reg);
  assert.equal(r.ok, false);
  assert.ok(r.issues.some(i => /rates/.test(i.path)));
});

test('validation fails if next_full_review is not after last_full_review', () => {
  const reg: QuotaRegistry = {
    ...REGISTRY,
    last_full_review: '2026-05-16',
    next_full_review: '2026-05-16',
  };
  const r = validateRegistry(reg);
  assert.equal(r.ok, false);
  assert.ok(r.issues.some(i => /next_full_review/.test(i.path)));
});

test('validation fails on snake_case violation in id', () => {
  const reg: QuotaRegistry = {
    ...REGISTRY,
    providers: [{ ...REGISTRY.providers[0], id: 'BadID' }],
  };
  const r = validateRegistry(reg);
  assert.equal(r.ok, false);
  assert.ok(r.issues.some(i => /snake_case/.test(i.message)));
});
