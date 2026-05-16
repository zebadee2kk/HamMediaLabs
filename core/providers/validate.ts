// Validation for the provider quota registry.
// Returns a structured ValidationResult; never throws.

import type {
  ProviderQuota,
  ProviderQuotaTier,
  QuotaRegistry,
  ValidationIssue,
  ValidationResult,
} from './types.ts';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SNAKE_CASE = /^[a-z][a-z0-9_]*$/;
const ALLOWED_CATEGORIES = new Set(['ai', 'hosting', 'data']);
const ALLOWED_TIERS = new Set(['free', 'free-with-credits', 'paid']);
const ALLOWED_SLOTS = new Set([null, undefined, 'plan', 'fast', 'code', 'edge']);

export function validateRegistry(reg: QuotaRegistry): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (reg.version !== '1') {
    issues.push({ path: 'version', message: `unsupported version "${reg.version}"` });
  }
  validateIsoDate(reg.last_full_review, 'last_full_review', issues);
  validateIsoDate(reg.next_full_review, 'next_full_review', issues);
  if (
    ISO_DATE.test(reg.last_full_review) &&
    ISO_DATE.test(reg.next_full_review) &&
    reg.next_full_review <= reg.last_full_review
  ) {
    issues.push({
      path: 'next_full_review',
      message: 'next_full_review must be after last_full_review',
    });
  }
  if (!Array.isArray(reg.providers) || reg.providers.length === 0) {
    issues.push({ path: 'providers', message: 'registry must have at least one provider' });
    return { ok: false, issues };
  }

  const seenIds = new Set<string>();
  reg.providers.forEach((p, i) => {
    const base = `providers[${i}]`;
    validateProvider(p, base, issues);
    if (p.id) {
      if (seenIds.has(p.id)) {
        issues.push({ path: `${base}.id`, message: `duplicate id "${p.id}"` });
      }
      seenIds.add(p.id);
    }
  });

  return { ok: issues.length === 0, issues };
}

function validateProvider(p: ProviderQuota, base: string, issues: ValidationIssue[]): void {
  if (!p.id || typeof p.id !== 'string') {
    issues.push({ path: `${base}.id`, message: 'id is required' });
  } else if (!SNAKE_CASE.test(p.id)) {
    issues.push({ path: `${base}.id`, message: `id "${p.id}" must be snake_case` });
  }
  if (!p.name) issues.push({ path: `${base}.name`, message: 'name is required' });
  if (!ALLOWED_CATEGORIES.has(p.category)) {
    issues.push({ path: `${base}.category`, message: `bad category "${p.category}"` });
  }
  if (!isHttpsUrl(p.source_url)) {
    issues.push({ path: `${base}.source_url`, message: 'source_url must be https://' });
  }
  validateIsoDate(p.last_validated, `${base}.last_validated`, issues);
  if (!ALLOWED_SLOTS.has(p.default_router_slot)) {
    issues.push({
      path: `${base}.default_router_slot`,
      message: `bad slot "${String(p.default_router_slot)}"`,
    });
  }
  if (!Array.isArray(p.tiers) || p.tiers.length === 0) {
    issues.push({ path: `${base}.tiers`, message: 'at least one tier is required' });
  } else {
    const hasFree = p.tiers.some(t => t.tier === 'free' || t.tier === 'free-with-credits');
    if (!hasFree) {
      issues.push({
        path: `${base}.tiers`,
        message: 'free-first policy: every provider must list a free or free-with-credits tier',
      });
    }
    const seenTiers = new Set<string>();
    p.tiers.forEach((t, j) => {
      validateTier(t, `${base}.tiers[${j}]`, p.category, issues);
      if (seenTiers.has(t.tier)) {
        issues.push({ path: `${base}.tiers[${j}].tier`, message: `duplicate tier "${t.tier}"` });
      }
      seenTiers.add(t.tier);
    });
  }
}

function validateTier(
  t: ProviderQuotaTier,
  base: string,
  category: ProviderQuota['category'],
  issues: ValidationIssue[],
): void {
  if (!ALLOWED_TIERS.has(t.tier)) {
    issues.push({ path: `${base}.tier`, message: `bad tier "${t.tier}"` });
  }
  if (category === 'ai' && !t.rates) {
    issues.push({ path: `${base}.rates`, message: 'ai tier must define rates' });
  }
  if (category === 'hosting' && !t.hosting) {
    issues.push({ path: `${base}.hosting`, message: 'hosting tier must define hosting limits' });
  }
  if (category === 'data' && !t.data) {
    issues.push({ path: `${base}.data`, message: 'data tier must define data limits' });
  }
}

function validateIsoDate(s: string, path: string, issues: ValidationIssue[]): void {
  if (!ISO_DATE.test(s)) {
    issues.push({ path, message: `must be YYYY-MM-DD, got "${s}"` });
    return;
  }
  const t = Date.parse(s + 'T00:00:00Z');
  if (Number.isNaN(t)) {
    issues.push({ path, message: `not a real date: "${s}"` });
  }
}

function isHttpsUrl(s: string | undefined): boolean {
  if (!s) return false;
  try {
    const u = new URL(s);
    return u.protocol === 'https:';
  } catch {
    return false;
  }
}
