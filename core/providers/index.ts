export { REGISTRY } from './quota-registry.ts';
export { validateRegistry } from './validate.ts';
export type {
  ProviderCategory,
  ProviderQuota,
  ProviderQuotaTier,
  QuotaRegistry,
  RateLimits,
  HostingQuotas,
  DataQuotas,
  RouterSlot,
  ValidationIssue,
  ValidationResult,
} from './types.ts';

import { REGISTRY } from './quota-registry.ts';
import type { ProviderQuota } from './types.ts';

/** Look up a provider by id, or `undefined`. Read-only. */
export function getProvider(id: string): ProviderQuota | undefined {
  return REGISTRY.providers.find(p => p.id === id);
}

/** List providers in a category. Read-only. */
export function providersByCategory(category: ProviderQuota['category']): ProviderQuota[] {
  return REGISTRY.providers.filter(p => p.category === category);
}
