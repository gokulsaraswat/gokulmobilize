import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTileLink } from './tile-target.ts';

const web = { native: false };
const app = { native: true, siteOrigin: 'https://example.com' };

test('web: paths stay as they are, external opens in a browser', () => {
  assert.deepEqual(resolveTileLink({ href: '/gym', mode: 'remote' }, web), { href: '/gym', openInBrowser: false });
  assert.deepEqual(resolveTileLink({ href: 'https://x.dev', mode: 'external' }, web), { href: 'https://x.dev', openInBrowser: true });
});

test('native: bundled stays local, remote goes to the site origin in the browser', () => {
  assert.deepEqual(resolveTileLink({ href: '/gspace', mode: 'bundled' }, app), { href: '/gspace/index.html', openInBrowser: false });
  assert.deepEqual(resolveTileLink({ href: '/', mode: 'remote' }, app), { href: 'https://example.com/', openInBrowser: true });
  assert.deepEqual(resolveTileLink({ href: '/admin', mode: 'remote' }, app), { href: 'https://example.com/admin', openInBrowser: true });
});

test('native without a site origin hides remote tiles', () => {
  assert.equal(resolveTileLink({ href: '/gym', mode: 'remote' }, { native: true }), null);
});
