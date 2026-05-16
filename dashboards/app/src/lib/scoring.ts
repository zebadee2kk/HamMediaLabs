// Verdict helpers for the dashboard. Mirrors core/scoring/scoring.ts
// thresholds; intentionally duplicated so the dashboard module stays
// self-contained for Cloudflare Pages builds.
//
// SYNC POINT — these thresholds (0.30 / 2 / 0.55 / 0.6 / 0.4) are the
// canonical kill/hold/scale gates per
// docs/PROJECTHYDRA-MASTER-PLAN.md §13.2. The source of truth lives in
// `core/scoring/scoring.ts`. The test
// `core/scoring/sync-with-dashboard.test.ts` reads THIS file as text
// and asserts the canonical literals are present; CI fails on drift.
// If you change a threshold, change both files in the same PR.

export type Verdict = 'kill' | 'hold' | 'scale_candidate' | 'unknown';

export interface VerdictInput {
  brandScore: number;                       // [0,1]
  monetisationPotential: number;            // [0,1]
  platformRisk: number;                     // [0,1]
  consecutiveWeeksBelow030: number;
  monetisationInFlight: boolean;
}

export function verdict(i: VerdictInput): Verdict {
  if (i.brandScore < 0.30 && i.consecutiveWeeksBelow030 >= 2 && !i.monetisationInFlight) {
    return 'kill';
  }
  if (i.brandScore >= 0.55 && i.monetisationPotential >= 0.6 && i.platformRisk <= 0.4) {
    return 'scale_candidate';
  }
  return 'hold';
}

/** Pre-MVP placeholder: pass in raw brand row, return a non-quantitative verdict. */
export function placeholderVerdict(brand: { status: string }): Verdict {
  switch (brand.status) {
    case 'kill': return 'kill';
    case 'scale': return 'scale_candidate';
    case 'hold': return 'hold';
    default: return 'unknown';
  }
}
