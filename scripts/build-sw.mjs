import { generateSW } from 'workbox-build';

const base = '/apps/';

const toCleanUrl = (url) => url.replace(/index\.html$/, '').replace(/\.html$/, '');

/** Astro emits page.html, but pages are linked and served as /apps/page; precache them under that URL. */
const cleanHtmlUrls = async (manifest) => ({
  manifest: manifest.map((entry) => ({ ...entry, url: toCleanUrl(entry.url) })),
});

const { count, size, warnings } = await generateSW({
  globDirectory: 'dist',
  globPatterns: ['**/*.{html,js,css,svg,png,ico,webmanifest}'],
  modifyURLPrefix: { '': base },
  swDest: 'dist/sw.js',
  manifestTransforms: [cleanHtmlUrls],
  navigateFallback: base,
  navigateFallbackAllowlist: [/^\/apps(\/|$)/],
  skipWaiting: true,
  clientsClaim: true,
});

warnings.forEach((warning) => console.warn(warning));
console.log(`sw.js: precached ${count} files, ${(size / 1024).toFixed(1)} KB`);
