// Brand and Content scoring. Formulas mirror docs/PROJECTHYDRA-MASTER-PLAN.md §13.2.
// Inputs are pre-normalised to [0,1]. Helpers below provide a default normaliser.
//
// SYNC POINT — verdict() thresholds (0.30 / 2 / 0.55 / 0.6 / 0.4) are
// intentionally duplicated in `dashboards/app/src/lib/scoring.ts` to
// keep the dashboard module self-contained for Cloudflare Pages builds.
// `core/scoring/sync-with-dashboard.test.ts` asserts the duplication
// stays in sync; CI fails on drift.

export interface ContentScoreInput {
  reach: number;        // [0,1]
  engagement: number;   // [0,1]
  conversion: number;   // [0,1]
  prodCost: number;     // [0,1] — higher is worse
  risk: number;         // [0,1] — higher is worse
}

export interface BrandScoreInput {
  trafficGrowth: number;        // [0,1]
  engagementQuality: number;    // [0,1]
  monetisationPotential: number;// [0,1]
  opsBurden: number;            // [0,1] — higher is worse
  platformRisk: number;         // [0,1] — higher is worse
}

export const CONTENT_WEIGHTS = {
  reach: 0.30, engagement: 0.25, conversion: 0.25, prodCost: 0.10, risk: 0.10,
} as const;

export const BRAND_WEIGHTS = {
  trafficGrowth: 0.30, engagementQuality: 0.20, monetisationPotential: 0.25,
  opsBurden: 0.15, platformRisk: 0.10,
} as const;

export function contentScore(i: ContentScoreInput): number {
  return clamp01(
    CONTENT_WEIGHTS.reach      * i.reach +
    CONTENT_WEIGHTS.engagement * i.engagement +
    CONTENT_WEIGHTS.conversion * i.conversion -
    CONTENT_WEIGHTS.prodCost   * i.prodCost -
    CONTENT_WEIGHTS.risk       * i.risk
  );
}

export function brandScore(i: BrandScoreInput): number {
  return clamp01(
    BRAND_WEIGHTS.trafficGrowth         * i.trafficGrowth +
    BRAND_WEIGHTS.engagementQuality     * i.engagementQuality +
    BRAND_WEIGHTS.monetisationPotential * i.monetisationPotential -
    BRAND_WEIGHTS.opsBurden             * i.opsBurden -
    BRAND_WEIGHTS.platformRisk          * i.platformRisk
  );
}

export type Verdict = 'kill' | 'hold' | 'scale_candidate';

export interface VerdictInput {
  brandScore: number;                       // [0,1]
  monetisationPotential: number;            // [0,1]
  platformRisk: number;                     // [0,1]
  consecutiveWeeksBelow030: number;         // integer
  monetisationInFlight: boolean;
}

/**
 * Kill / Hold / Scale-candidate verdict per master plan §13.2.
 * - Kill: BS < 0.30 for ≥2 consecutive weeks AND no monetisation in flight.
 * - Scale candidate: BS ≥ 0.55 AND monetisationPotential ≥ 0.6 AND platformRisk ≤ 0.4.
 * - Otherwise: Hold.
 */
export function verdict(i: VerdictInput): Verdict {
  if (i.brandScore < 0.30 && i.consecutiveWeeksBelow030 >= 2 && !i.monetisationInFlight) {
    return 'kill';
  }
  if (i.brandScore >= 0.55 && i.monetisationPotential >= 0.6 && i.platformRisk <= 0.4) {
    return 'scale_candidate';
  }
  return 'hold';
}

/** Map a raw observed metric onto [0,1] with a target where 1.0 == target met. */
export function normaliseToTarget(value: number, target: number): number {
  if (target <= 0) return 0;
  return clamp01(value / target);
}

/** Map a "lower is better" metric onto [0,1] where 1.0 = worst. */
export function normaliseInverse(value: number, badCeiling: number): number {
  if (badCeiling <= 0) return 0;
  return clamp01(value / badCeiling);
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
