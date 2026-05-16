// Playwright module: social channel signup runbooks (skeleton).
// High ban risk → trust gates are MANDATORY; operator finishes every flow manually.

import type { Page } from 'playwright';
import { finalise, pauseForTrustGate, screenshot, type SignupContext, type StepLogEntry } from './signup_core.ts';

export interface SocialSignupRunbook {
  provider: string;
  signupUrl: string;
  cadenceCeilingPerWeek: number;       // codified guardrail from master plan §3.3
  run(page: Page, ctx: SignupContext, log: StepLogEntry[]): Promise<void>;
}

export const RUNBOOKS: Record<string, SocialSignupRunbook> = {
  x: {
    provider: 'x',
    signupUrl: 'https://x.com/i/flow/signup',
    cadenceCeilingPerWeek: 21,
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'captcha', ctx, log);
      await pauseForTrustGate(page, 'sms', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:complete_signup', status: 'manual_required' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'X (Twitter)',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Manual posting only. Cadence ≤3/day. SMS gate is platform default.',
      });
    },
  },

  tiktok: {
    provider: 'tiktok',
    signupUrl: 'https://www.tiktok.com/signup',
    cadenceCeilingPerWeek: 5,
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'captcha', ctx, log);
      await pauseForTrustGate(page, 'sms', ctx, log);
      await pauseForTrustGate(page, 'identity', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:complete_signup', status: 'manual_required',
        detail: 'No automation post-signup. Posting is operator-only.' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'TikTok',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Highest ban risk in portfolio. ≤5 posts/week. Manual only.',
      });
    },
  },

  instagram: {
    provider: 'instagram',
    signupUrl: 'https://www.instagram.com/accounts/emailsignup/',
    cadenceCeilingPerWeek: 4,
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'captcha', ctx, log);
      await pauseForTrustGate(page, 'sms', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:complete_signup', status: 'manual_required' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'Instagram',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Manual mirror for TikTok Reels. ≤4 posts/week.',
      });
    },
  },

  reddit: {
    provider: 'reddit',
    signupUrl: 'https://www.reddit.com/register',
    cadenceCeilingPerWeek: 1,
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'captcha', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:complete_signup', status: 'manual_required',
        detail: 'Operator real persona; disclosed affiliation in profile. Comment-first 4 weeks before any post.' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'Reddit',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Comment-first karma build. ≤1 post per relevant sub per week.',
      });
    },
  },

  youtube: {
    provider: 'youtube',
    signupUrl: 'https://accounts.google.com/signup',
    cadenceCeilingPerWeek: 3,
    async run(page, ctx, log) {
      await page.goto(this.signupUrl);
      await screenshot(page, ctx, 'landing');
      await pauseForTrustGate(page, 'mfa', ctx, log);
      log.push({ ts: new Date().toISOString(), step: 'manual:create_brand_channel', status: 'manual_required',
        detail: 'Create a Brand account, not personal channel; enables transfer + delegated managers.' });
      await page.pause();
      await finalise(ctx, log, {
        service: 'YouTube (via Google Brand account)',
        loginEmail: ctx.email,
        url: this.signupUrl,
        mfaRequired: true,
        notes: 'Shorts cadence ≤3/week. API publishing OK at T3 with operator approval.',
      });
    },
  },
};

export async function runSocialSignup(provider: string, page: Page, ctx: SignupContext): Promise<StepLogEntry[]> {
  const book = RUNBOOKS[provider];
  if (!book) throw new Error(`No social signup runbook for "${provider}"`);
  const log: StepLogEntry[] = [];
  await book.run(page, ctx, log);
  return log;
}
