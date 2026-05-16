// Drift watcher for the dashboard's local copies of scoring +
// quota constants. The dashboard intentionally duplicates these
// (per the SYNC POINT comments in both files) so the dashboard
// module stays self-contained for Cloudflare Pages builds. This
// test reads the dashboard files as TEXT and asserts that the
// canonical thresholds appear verbatim. CI fails on drift.
//
// If you change a threshold:
//   1. Update core/scoring/scoring.ts (canonical).
//   2. Update dashboards/app/src/lib/scoring.ts.
//   3. Update core/providers/quota-registry.ts (canonical).
//   4. Update dashboards/app/src/lib/quota.ts.
//   5. Update this test's expected strings.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..');

function readText(rel: string): string {
  return readFileSync(join(repoRoot, rel), 'utf8');
}

test('drift watcher: dashboard scoring.ts carries the canonical verdict thresholds', () => {
  const text = readText('dashboards/app/src/lib/scoring.ts');
  // Canonical Kill gate: BS < 0.30 AND consecutiveWeeksBelow030 >= 2 AND no monetisation.
  assert.ok(text.includes('< 0.30'), 'expected the 0.30 kill threshold');
  assert.ok(text.includes('>= 2'), 'expected the 2-consecutive-weeks gate');
  assert.ok(text.includes('!i.monetisationInFlight'), 'expected the no-monetisation-in-flight clause');
  // Canonical Scale gate: BS >= 0.55 AND monetisationPotential >= 0.6 AND platformRisk <= 0.4.
  assert.ok(text.includes('>= 0.55'), 'expected the 0.55 scale threshold');
  assert.ok(text.includes('>= 0.6'), 'expected the 0.6 monetisation-potential gate');
  assert.ok(text.includes('<= 0.4'), 'expected the 0.4 platform-risk gate');
});

test('drift watcher: dashboard quota.ts carries the canonical free-tier ceilings', () => {
  const text = readText('dashboards/app/src/lib/quota.ts');
  // Five canonical ceilings; the literal numbers come from
  // core/providers/quota-registry.ts (May 2026 validated).
  // Gemini RPD upper bound:
  assert.ok(text.includes("provider: 'gemini'"), 'expected gemini provider entry');
  // Groq RPD:
  assert.ok(text.includes("provider: 'groq'"), 'expected groq provider entry');
  // OpenRouter RPD after $10 deposit:
  assert.ok(text.includes("provider: 'openrouter'"), 'expected openrouter provider entry');
  // Cloudflare Pages builds/month:
  assert.ok(text.includes("provider: 'cloudflare_pages'") && text.includes('ceiling: 500'),
    'expected cloudflare_pages 500 builds/month');
  // Supabase 500 MB DB:
  assert.ok(text.includes("provider: 'supabase'") && text.includes('ceiling: 500'),
    'expected supabase 500 MB DB ceiling');
  // The three AI providers all sit at 1000 RPD on free or free-with-credits.
  // Count the occurrences of `ceiling: 1000` in the file.
  const matches = text.match(/ceiling: 1000/g) ?? [];
  assert.ok(matches.length >= 3, `expected ≥3 ceiling: 1000 entries (gemini/groq/openrouter), got ${matches.length}`);
});

test('drift watcher: SYNC POINT comments present in both surfaces', () => {
  const core = readText('core/scoring/scoring.ts');
  const dash = readText('dashboards/app/src/lib/scoring.ts');
  assert.ok(core.includes('SYNC POINT'), 'core/scoring/scoring.ts missing SYNC POINT marker');
  assert.ok(dash.includes('SYNC POINT'), 'dashboards/.../lib/scoring.ts missing SYNC POINT marker');

  const coreQ = readText('core/providers/quota-registry.ts');
  const dashQ = readText('dashboards/app/src/lib/quota.ts');
  // The quota registry's SYNC POINT lives in the *dashboard* copy
  // (the registry is the source of truth and has no peer to point to).
  assert.ok(dashQ.includes('SYNC POINT'), 'dashboards/.../lib/quota.ts missing SYNC POINT marker');
  // Sanity-check the registry still exists with its key shape:
  assert.ok(coreQ.includes("id: 'gemini'"), 'core registry missing gemini entry');
  assert.ok(coreQ.includes("id: 'cloudflare_pages'"), 'core registry missing cloudflare_pages entry');
  assert.ok(coreQ.includes("id: 'supabase'"), 'core registry missing supabase entry');
});
