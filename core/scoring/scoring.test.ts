import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  brandScore,
  contentScore,
  normaliseInverse,
  normaliseToTarget,
  verdict,
} from './scoring.ts';

test('contentScore: high reach + engagement + conversion ≈ ~0.8', () => {
  const s = contentScore({ reach: 1, engagement: 1, conversion: 1, prodCost: 0, risk: 0 });
  assert.ok(s > 0.79 && s <= 1.0, `got ${s}`);
});

test('contentScore: high cost and risk drag the score down', () => {
  const s = contentScore({ reach: 0.8, engagement: 0.8, conversion: 0.8, prodCost: 1, risk: 1 });
  assert.ok(s < 0.45, `expected score reduced by cost+risk, got ${s}`);
});

test('brandScore: clamps to [0,1]', () => {
  const s = brandScore({
    trafficGrowth: 1, engagementQuality: 1, monetisationPotential: 1, opsBurden: 0, platformRisk: 0,
  });
  assert.equal(s, 0.75);
});

test('verdict: KILL when BS < 0.30 for 2+ weeks AND no monetisation', () => {
  const v = verdict({
    brandScore: 0.20,
    monetisationPotential: 0.10,
    platformRisk: 0.20,
    consecutiveWeeksBelow030: 2,
    monetisationInFlight: false,
  });
  assert.equal(v, 'kill');
});

test('verdict: HOLD when BS < 0.30 but monetisation in flight', () => {
  const v = verdict({
    brandScore: 0.20,
    monetisationPotential: 0.40,
    platformRisk: 0.30,
    consecutiveWeeksBelow030: 4,
    monetisationInFlight: true,
  });
  assert.equal(v, 'hold');
});

test('verdict: SCALE_CANDIDATE meets all three gates', () => {
  const v = verdict({
    brandScore: 0.60,
    monetisationPotential: 0.70,
    platformRisk: 0.30,
    consecutiveWeeksBelow030: 0,
    monetisationInFlight: true,
  });
  assert.equal(v, 'scale_candidate');
});

test('verdict: HOLD when platform risk too high even with strong BS', () => {
  const v = verdict({
    brandScore: 0.70,
    monetisationPotential: 0.80,
    platformRisk: 0.60, // > 0.4 threshold
    consecutiveWeeksBelow030: 0,
    monetisationInFlight: true,
  });
  assert.equal(v, 'hold');
});

test('normaliseToTarget: at target = 1, half = 0.5, above = 1.0 (clamped)', () => {
  assert.equal(normaliseToTarget(500, 1000), 0.5);
  assert.equal(normaliseToTarget(1000, 1000), 1.0);
  assert.equal(normaliseToTarget(2500, 1000), 1.0);
  assert.equal(normaliseToTarget(0, 1000), 0);
});

test('normaliseInverse: at badCeiling = 1, half = 0.5', () => {
  assert.equal(normaliseInverse(0, 100), 0);
  assert.equal(normaliseInverse(50, 100), 0.5);
  assert.equal(normaliseInverse(120, 100), 1.0);
});
