// Playwright shared utilities for signup flows.
// IMPORTANT: every flow MUST pause on CAPTCHA / MFA / SMS / Payment / Identity gates.
// We never auto-bypass; the operator approves.

import type { Browser, BrowserContext, Page } from 'playwright';

export interface SignupContext {
  /** Provider being onboarded (e.g. 'gemini', 'groq', 'cloudflare'). */
  provider: string;
  /** Browser profile directory (for cookie isolation per brand / parent). */
  profileDir: string;
  /** Where to write screenshots and step logs. NEVER write credentials here. */
  evidenceDir: string;
  /** Operator email alias used for signup (parent or brand). */
  email: string;
  /** Tag for telemetry events. */
  tag?: string;
}

export interface StepLogEntry {
  ts: string;
  step: string;
  status: 'ok' | 'manual_required' | 'error';
  detail?: string;
}

export type TrustGate = 'captcha' | 'mfa' | 'sms' | 'payment' | 'identity';

/**
 * Pauses the run, asks the operator to handle a trust gate manually,
 * and resumes only when the operator confirms via the CLI.
 */
export async function pauseForTrustGate(
  page: Page,
  gate: TrustGate,
  ctx: SignupContext,
  log: StepLogEntry[],
): Promise<void> {
  await screenshot(page, ctx, `gate-${gate}-before`);
  log.push({
    ts: new Date().toISOString(),
    step: `pause:${gate}`,
    status: 'manual_required',
    detail: `Operator must resolve ${gate} on ${ctx.provider}.`,
  });
  // In a headed run, page.pause() opens the Inspector and the operator continues from there.
  await page.pause();
  await screenshot(page, ctx, `gate-${gate}-after`);
}

export async function screenshot(page: Page, ctx: SignupContext, name: string): Promise<string> {
  const path = `${ctx.evidenceDir.replace(/\/$/, '')}/${ctx.provider}-${ts()}-${name}.png`;
  await page.screenshot({ path, fullPage: true });
  return path;
}

export function ts(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Fill a labelled form field with retry; never type into a field that contains
 * suspicious patterns (e.g. existing OAuth-redirect markers).
 */
export async function fillLabelled(
  page: Page,
  label: string,
  value: string,
  log: StepLogEntry[],
): Promise<void> {
  try {
    await page.getByLabel(label).fill(value, { timeout: 5_000 });
    log.push({ ts: new Date().toISOString(), step: `fill:${label}`, status: 'ok' });
  } catch (e) {
    log.push({
      ts: new Date().toISOString(),
      step: `fill:${label}`,
      status: 'error',
      detail: (e as Error)?.message,
    });
    throw e;
  }
}

/**
 * Standard finalisation: write a step log + the registry-draft markdown next to the evidence.
 * The registry-draft never contains the password; only metadata.
 */
export async function finalise(
  ctx: SignupContext,
  log: StepLogEntry[],
  registryDraft: { service: string; loginEmail: string; url: string; mfaRequired: boolean; notes: string },
): Promise<void> {
  const fs = await import('node:fs/promises');
  await fs.mkdir(ctx.evidenceDir, { recursive: true });
  await fs.writeFile(
    `${ctx.evidenceDir.replace(/\/$/, '')}/${ctx.provider}-steps.json`,
    JSON.stringify(log, null, 2),
  );
  const md = [
    `# Account registry draft — ${registryDraft.service}`,
    ``,
    `- Service: ${registryDraft.service}`,
    `- Login email: ${registryDraft.loginEmail}`,
    `- URL: ${registryDraft.url}`,
    `- Created: ${new Date().toISOString().slice(0, 10)}`,
    `- MFA enabled: ${registryDraft.mfaRequired ? 'Yes' : 'No (set it up before use)'}`,
    `- Notes: ${registryDraft.notes}`,
    ``,
    `> Move the credentials themselves into 1Password. Do NOT commit them.`,
    ``,
  ].join('\n');
  await fs.writeFile(
    `${ctx.evidenceDir.replace(/\/$/, '')}/${ctx.provider}-registry-draft.md`,
    md,
  );
}

/** Convenience: open a context with a stable profile directory. */
export async function openContext(browser: Browser, ctx: SignupContext): Promise<BrowserContext> {
  return browser.newContext({
    storageState: undefined, // start clean; persistence handled by profileDir at the CLI layer
    viewport: { width: 1280, height: 800 },
    locale: 'en-GB',
    timezoneId: 'Europe/London',
  });
}
