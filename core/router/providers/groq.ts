// Groq driver — OpenAI-compatible chat completions.
// Free-tier (May 2026): 30 RPM, 6K TPM (Gemma-2-9B 15K), 1,000 RPD.

import type { GenerationRequest, ProviderDriver, Slot } from '../types.ts';
import { ProviderError, RateLimitError } from '../types.ts';

export interface GroqConfig {
  apiKey: string;
  modelsBySlot?: Partial<Record<Slot, string[]>>;
}

const DEFAULT_MODELS: Record<Slot, string[]> = {
  plan: ['llama-3.1-70b-versatile'],
  fast: ['llama-3.1-8b-instant', 'gemma2-9b-it'],
  code: ['llama-3.1-70b-versatile'],
  edge: ['llama-3.1-8b-instant'],
};

export function createGroq(cfg: GroqConfig): ProviderDriver {
  return {
    id: 'groq',
    models(slot) {
      return cfg.modelsBySlot?.[slot] ?? DEFAULT_MODELS[slot];
    },
    costEstimate(_model, tokensIn, tokensOut) {
      return (tokensIn + tokensOut) * 1e-7;
    },
    async generate(model, req: GenerationRequest) {
      const url = 'https://api.groq.com/openai/v1/chat/completions';
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
        },
        body: JSON.stringify(body),
      });
      const latency = Date.now() - t0;
      if (res.status === 429) throw new RateLimitError('groq');
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new ProviderError('groq', res.status, text.slice(0, 500));
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
