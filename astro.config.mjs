// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/apps',
  build: { format: 'file' },
  integrations: [react()],
});
