import { readdir, readFile } from 'node:fs/promises';
import { generateSW } from 'workbox-build';

const base = '/apps/';

const toCleanUrl = (url) => url.replace(/index\.html$/, '').replace(/\.html$/, '');

/** Astro emits page.html, but pages are linked and served as /apps/page; precache them under that URL. */
const cleanHtmlUrls = async (manifest) => ({
  manifest: manifest.map((entry) => ({ ...entry, url: toCleanUrl(entry.url) })),
});

/** The React renderer runtime is emitted even when no island hydrates; precache it only if some page has an <astro-island>. */
const pages = (await readdir('dist')).filter((file) => file.endsWith('.html'));
const hydrates = (await Promise.all(pages.map((page) => readFile(`dist/${page}`, 'utf8')))).some((html) => html.includes('<astro-island'));

const { count, size, warnings } = await generateSW({
  globDirectory: 'dist',
  globPatterns: ['**/*.{html,js,css,svg,png,ico,webmanifest}'],
  globIgnores: hydrates ? [] : ['_astro/client.*.js'],
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
