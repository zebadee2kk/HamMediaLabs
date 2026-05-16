// Gemini driver — talks to Google AI Studio's generateContent endpoint.
// Free-tier (May 2026): 5–15 RPM, 100–1,000 RPD, 250K TPM (subject to change).

import type { GenerationRequest, ProviderDriver, Slot } from '../types.ts';
import { ProviderError, RateLimitError } from '../types.ts';

export interface GeminiConfig {
  apiKey: string;
  /** Override the default models per slot if desired. */
  modelsBySlot?: Partial<Record<Slot, string[]>>;
}

const DEFAULT_MODELS: Record<Slot, string[]> = {
  plan: ['gemini-2.5-pro', 'gemini-2.5-flash'],
  fast: ['gemini-2.5-flash', 'gemini-2.5-flash-lite'],
  code: ['gemini-2.5-pro'],
  edge: ['gemini-2.5-flash-lite'],
};

export function createGemini(cfg: GeminiConfig): ProviderDriver {
  return {
    id: 'gemini',
    models(slot) {
      return cfg.modelsBySlot?.[slot] ?? DEFAULT_MODELS[slot];
    },
    costEstimate(_model, tokensIn, tokensOut) {
      // Free tier ≈ $0; use 1e-6 to break ties only.
      return (tokensIn + tokensOut) * 1e-7;
    },
    async generate(model, req: GenerationRequest) {
      const url =
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(cfg.apiKey)}`;
      const body = {
        contents: [{ role: 'user', parts: [{ text: req.prompt }] }],
        systemInstruction: req.system ? { parts: [{ text: req.system }] } : undefined,
        generationConfig: {
          temperature: req.temperature ?? 0.4,
          maxOutputTokens: req.maxTokens ?? 1024,
        },
      };
      const t0 = Date.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const latency = Date.now() - t0;

      if (res.status === 429) throw new RateLimitError('gemini');
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new ProviderError('gemini', res.status, text.slice(0, 500));
      }
      const data: any = await res.json();
      const text = data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text).join('') ?? '';
      const usage = data?.usageMetadata ?? {};
      return {
        text,
        tokensIn: usage.promptTokenCount ?? 0,
        tokensOut: usage.candidatesTokenCount ?? 0,
        latencyMs: latency,
      };
    },
  };
}
