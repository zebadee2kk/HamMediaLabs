export * from './types.ts';
export * from './router.ts';
export { createGemini } from './providers/gemini.ts';
export { createGroq } from './providers/groq.ts';
export { createOpenRouter } from './providers/openrouter.ts';

// Convenience factory for the standard HQ router.
import { Router, defaultPolicy, type RouterConfig, type TelemetryEvent } from './router.ts';
import { createGemini } from './providers/gemini.ts';
import { createGroq } from './providers/groq.ts';
import { createOpenRouter } from './providers/openrouter.ts';

export interface HQRouterEnv {
  GEMINI_API_KEY?: string;
  GROQ_API_KEY?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_REFERER?: string;
  OPENROUTER_TITLE?: string;
}

export function createHQRouter(
  env: HQRouterEnv,
  opts: { recordEvent?: (e: TelemetryEvent) => void | Promise<void>; timeoutMs?: number } = {},
): Router {
  const drivers: RouterConfig['drivers'] = {
    gemini: env.GEMINI_API_KEY ? createGemini({ apiKey: env.GEMINI_API_KEY }) : undefined,
    groq: env.GROQ_API_KEY ? createGroq({ apiKey: env.GROQ_API_KEY }) : undefined,
    openrouter: env.OPENROUTER_API_KEY ? createOpenRouter({
      apiKey: env.OPENROUTER_API_KEY,
      referer: env.OPENROUTER_REFERER,
      title: env.OPENROUTER_TITLE,
    }) : undefined,
    cloudflare_ai: undefined, // wire when needed
  };
  return new Router({
    drivers,
    policy: defaultPolicy,
    timeoutMs: opts.timeoutMs ?? 60_000,
    recordEvent: opts.recordEvent,
  });
}
