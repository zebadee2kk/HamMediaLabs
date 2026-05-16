// Playwright module: AI provider signup orchestrator (skeleton).
// Routes to per-provider runbooks; each runbook MUST pause for human at trust gates.

import type { Page } from 'playwright';
import { finalise, pauseForTrustGate, screenshot, type SignupContext, type StepLogEntry } from './signup_core.ts';

export interface AiSignupRunbook {
  provider: string;
  signupUrl: string;
  /** Returns when the API key is visible on the page (or the operator confirms it's saved). */
  run(page: Page, ctx: SignupContext, log: StepLogEntry[]): Promise<void>;
}

export const RUNBOOKS: Record<string, AiSignupRunbook> = {
  gemini: {
    provider: 'gemini',
    signupUrl: 'https://aistudio.google.com/',
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      // Google sign-in is an OAuth + MFA flow → always operator-gated.
      await pauseForTrustGate(page, 'mfa', ctx, log);
      // Operator navigates to "Get API key", creates a key, copies to vault.
      log.push({ ts: new Date().toISOString(), step: 'manual:create_api_key', status: 'manual_required' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'Google AI Studio (Gemini)',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Free tier as of May 2026: 5–15 RPM, 100–1,000 RPD, 250K TPM. Quotas re-validate quarterly.',
      });
    },
  },

  groq: {
    provider: 'groq',
    signupUrl: 'https://console.groq.com/',
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'mfa', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:create_api_key', status: 'manual_required' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'Groq',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Free tier as of May 2026: 30 RPM, 6K TPM (Gemma 15K), 1,000 RPD.',
      });
    },
  },

  openrouter: {
    provider: 'openrouter',
    signupUrl: 'https://openrouter.ai/',
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'mfa', ctx, log);
      // Operator deposits $10 once to unlock 1,000 RPD on free models — payment gate.
      await pauseForTrustGate(page, 'payment', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:create_api_key', status: 'manual_required' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'OpenRouter',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Pre-funded $10 → 1,000 RPD on :free models, 20 RPM.',
      });
    },
  },
};

export async function runAiSignup(provider: string, page: Page, ctx: SignupContext): Promise<StepLogEntry[]> {
  const book = RUNBOOKS[provider];
  if (!book) throw new Error(`No AI signup runbook for "${provider}"`);
  const log: StepLogEntry[] = [];
  await book.run(page, ctx, log);
  return log;
}
