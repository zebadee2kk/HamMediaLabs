import { defineConfig } from 'astro/config';

// Brand A site. Override `site` at deploy time via the
// BRAND_SITE_URL env var on Cloudflare Pages.
export default defineConfig({
  site: process.env.BRAND_SITE_URL ?? 'https://aiescape.example',
  trailingSlash: 'never',
  build: { format: 'directory' },
  vite: {
    server: { hmr: { overlay: true } },
  },
});
