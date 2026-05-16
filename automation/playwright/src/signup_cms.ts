// Playwright module: CMS / deployment signup runbooks (skeleton).
// Targets static + managed CMS providers. Publishing remains governance-gated.

import type { Page } from 'playwright';
import { finalise, pauseForTrustGate, screenshot, type SignupContext, type StepLogEntry } from './signup_core.ts';

export interface CmsSignupRunbook {
  provider: string;
  signupUrl: string;
  run(page: Page, ctx: SignupContext, log: StepLogEntry[]): Promise<void>;
}

export const RUNBOOKS: Record<string, CmsSignupRunbook> = {
  cloudflare: {
    provider: 'cloudflare',
    signupUrl: 'https://dash.cloudflare.com/sign-up',
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'mfa', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:enable_hardware_mfa', status: 'manual_required',
        detail: 'Parent account — enrol a hardware MFA factor (YubiKey or device passkey).' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'Cloudflare',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Free tier hosts unlimited bandwidth on Pages. Tier 1 parent account.',
      });
    },
  },

  vercel: {
    provider: 'vercel',
    signupUrl: 'https://vercel.com/signup',
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'mfa', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:read_commercial_use_terms',
        status: 'manual_required',
        detail: 'Re-read free-tier commercial-use clause before deploying any monetised site.' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'Vercel',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Selective use only — Cloudflare Pages is the primary static host.',
      });
    },
  },

  ghost: {
    provider: 'ghost',
    signupUrl: 'https://ghost.org/pricing/',
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'payment', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:choose_plan', status: 'manual_required',
        detail: 'Ghost is paid. Only proceed when a brand has been promoted to Scale.' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'Ghost',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Scale-stage only — never sign up speculatively.',
      });
    },
  },

  supabase: {
    provider: 'supabase',
    signupUrl: 'https://supabase.com/dashboard/sign-up',
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'mfa', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:create_project', status: 'manual_required',
        detail: 'Create HQ project (project #1). Note URL + service-role key into vault, not repo.' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'Supabase',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Free tier: 2 projects, 500MB DB, pauses after 7d inactivity. Heartbeat job mitigates.',
      });
    },
  },
};

export async function runCmsSignup(provider: string, page: Page, ctx: SignupContext): Promise<StepLogEntry[]> {
  const book = RUNBOOKS[provider];
  if (!book) throw new Error(`No CMS signup runbook for "${provider}"`);
  const log: StepLogEntry[] = [];
  await book.run(page, ctx, log);
  return log;
}
