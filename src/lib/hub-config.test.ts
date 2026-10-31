import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createConfigStore, type KeyValueStorage } from './hub-config.ts';

const cachedConfig = { version: 1, apps: [{ id: 'gspace', name: 'GSpace', href: '/gspace', mode: 'bundled', enabled: true }] };
const freshConfig = { version: 1, apps: [{ id: 'portfolio', name: 'Portfolio', href: '/', mode: 'remote', enabled: true }] };

const memoryStorage = (initial?: unknown): KeyValueStorage & { saved?: unknown } => {
  const store: KeyValueStorage & { saved?: unknown } = {
    saved: initial,
    get: async () => store.saved,
    set: async (_key, value) => {
      store.saved = value;
    },
  };
  return store;
};

const respond = (body: unknown, ok = true) => (async () => ({ ok, json: async () => body })) as unknown as typeof fetch;

test('emits the cached copy first, then the fresh one, and caches it', async () => {
  const storage = memoryStorage(cachedConfig);
  const seen: string[] = [];
  const store = createConfigStore('/config.json', storage, respond(freshConfig));
  store.subscribe((c) => seen.push(c.apps[0].id));
  await store.load();
  assert.deepEqual(seen, ['gspace', 'portfolio']);
  assert.deepEqual(storage.saved, freshConfig);
});

test('invalid fresh config keeps the cached copy', async () => {
  const storage = memoryStorage(cachedConfig);
  const seen: string[] = [];
  const store = createConfigStore('/config.json', storage, respond({ version: 2, apps: [] }));
  store.subscribe((c) => seen.push(c.apps[0].id));
  await store.load();
  assert.deepEqual(seen, ['gspace']);
  assert.deepEqual(storage.saved, cachedConfig);
});

test('network failure without cache emits nothing and does not throw', async () => {
  const seen: unknown[] = [];
  const failing = (async () => {
    throw new TypeError('offline');
  }) as unknown as typeof fetch;
  const store = createConfigStore('/config.json', memoryStorage(), failing);
  store.subscribe((c) => seen.push(c));
  await store.load();
  assert.equal(seen.length, 0);
});
