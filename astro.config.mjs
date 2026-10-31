// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const native = process.env.PUBLIC_HUB_NATIVE === 'true';

export default defineConfig({
  base: native ? '/' : '/apps',
  outDir: native ? './dist-native' : './dist',
  build: { format: 'file' },
  integrations: [react()],
});
