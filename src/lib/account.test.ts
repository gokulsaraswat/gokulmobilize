import { test } from 'node:test';
import assert from 'node:assert/strict';
import { accessLabel, explainAuthError, readAuthConfig, redirectTarget, stripAuthParams } from './account.ts';

test('auth config needs an https URL and an anon key', () => {
  assert.equal(readAuthConfig({}), null);
  assert.equal(readAuthConfig({ PUBLIC_SUPABASE_URL: 'http://x.supabase.co', PUBLIC_SUPABASE_ANON_KEY: 'k' }), null);
  assert.equal(readAuthConfig({ PUBLIC_SUPABASE_URL: 'https://x.supabase.co', PUBLIC_SUPABASE_ANON_KEY: ' ' }), null);
  assert.deepEqual(readAuthConfig({ PUBLIC_SUPABASE_URL: ' https://x.supabase.co/ ', PUBLIC_SUPABASE_ANON_KEY: 'k' }), { url: 'https://x.supabase.co', anonKey: 'k' });
});

test('redirect target drops query and hash', () => {
  assert.equal(redirectTarget({ origin: 'https://example.com', pathname: '/apps/' }), 'https://example.com/apps/');
});

test('stripAuthParams removes OAuth leftovers and keeps the rest', () => {
  assert.deepEqual(stripAuthParams('https://example.com/apps/?code=abc&state=s&tab=2#top'), { href: '/apps/?tab=2#top', error: null, changed: true });
  assert.deepEqual(stripAuthParams('https://example.com/apps/?error=access_denied&error_description=User+cancelled'), { href: '/apps/', error: 'User cancelled', changed: true });
  assert.deepEqual(stripAuthParams('https://example.com/apps/?tab=2'), { href: '/apps/?tab=2', error: null, changed: false });
});

test('access labels and error explanations', () => {
  assert.equal(accessLabel('pending'), 'Access pending approval');
  assert.equal(accessLabel('unknown'), 'Access status unavailable');
  assert.match(explainAuthError(new Error('Manual linking is disabled')), /Allow manual linking/);
  assert.match(explainAuthError(new Error('identity_already_exists')), /already linked/);
  assert.equal(explainAuthError(new Error('boom')), 'boom');
});
