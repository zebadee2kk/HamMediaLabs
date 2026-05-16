import { defineConfig } from 'astro/config';

// Per-brand sites override `site` at deploy time via an env var.
export default defineConfig({
  site: process.env.BRAND_SITE_URL ?? 'https://example.com',
  trailingSlash: 'never',
  build: { format: 'directory' },
  vite: {
    server: { hmr: { overlay: true } },
  },
});
