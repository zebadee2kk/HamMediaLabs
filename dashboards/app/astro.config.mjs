import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.DASHBOARD_URL ?? 'http://localhost:4321',
  trailingSlash: 'never',
  build: { format: 'directory' },
});
