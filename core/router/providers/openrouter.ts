// OpenRouter driver — OpenAI-compatible chat completions, free `:free` models preferred.
// Free-tier (May 2026): 20 RPM; 50 req/day unpaid, 1,000 req/day after ≥$10 deposit.

import type { GenerationRequest, ProviderDriver, Slot } from '../types.ts';
import { ProviderError, RateLimitError } from '../types.ts';

export interface OpenRouterConfig {
  apiKey: string;
  /** Optional HTTP-Referer / X-Title for OpenRouter attribution. */
  referer?: string;
  title?: string;
  modelsBySlot?: Partial<Record<Slot, string[]>>;
}

const DEFAULT_MODELS: Record<Slot, string[]> = {
  plan: ['deepseek/deepseek-chat-v3:free', 'qwen/qwen-2.5-72b-instruct:free'],
  fast: ['meta-llama/llama-3.1-8b-instruct:free'],
  code: ['qwen/qwen3-coder:free', 'deepseek/deepseek-chat-v3:free'],
  edge: ['meta-llama/llama-3.1-8b-instruct:free'],
};

export function createOpenRouter(cfg: OpenRouterConfig): ProviderDriver {
  return {
    id: 'openrouter',
    models(slot) {
      return cfg.modelsBySlot?.[slot] ?? DEFAULT_MODELS[slot];
    },
    costEstimate(_model, tokensIn, tokensOut) {
      return (tokensIn + tokensOut) * 1e-7;
    },
    async generate(model, req: GenerationRequest) {
      const url = 'https://openrouter.ai/api/v1/chat/completions';
      const body = {
        model,
        messages: [
          ...(req.system ? [{ role: 'system', content: req.system }] : []),
          { role: 'user', content: req.prompt },
        ],
        max_tokens: req.maxTokens ?? 1024,
        temperature: req.temperature ?? 0.4,
      };
      const t0 = Date.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${cfg.apiKey}`,
          ...(cfg.referer ? { 'HTTP-Referer': cfg.referer } : {}),
          ...(cfg.title ? { 'X-Title': cfg.title } : {}),
        },
        body: JSON.stringify(body),
      });
      const latency = Date.now() - t0;
      if (res.status === 429) throw new RateLimitError('openrouter');
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new ProviderError('openrouter', res.status, text.slice(0, 500));
      }
      const data: any = await res.json();
      return {
        text: data?.choices?.[0]?.message?.content ?? '',
        tokensIn: data?.usage?.prompt_tokens ?? 0,
        tokensOut: data?.usage?.completion_tokens ?? 0,
        latencyMs: latency,
      };
    },
  };
}
