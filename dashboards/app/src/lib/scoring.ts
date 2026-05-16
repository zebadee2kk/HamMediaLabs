// Verdict helpers for the dashboard. Mirrors core/scoring/scoring.ts
// thresholds; intentionally duplicated so the dashboard module stays
// self-contained for Cloudflare Pages builds.
//
// If the canonical thresholds in core/scoring/scoring.ts change, update
// here too (the master plan §13.2 is the single source of truth).

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
