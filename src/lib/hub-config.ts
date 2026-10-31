import { get, set } from 'idb-keyval';
import { parseHubConfig, type HubConfig } from '@gokulsaraswat/config';

export interface KeyValueStorage {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown): Promise<void>;
}

export interface ConfigStore {
  subscribe(listener: (config: HubConfig) => void): () => void;
  load(): Promise<void>;
  refresh(): Promise<void>;
}

const CACHE_KEY = 'hub-config';
const idbStorage: KeyValueStorage = { get, set };

/** Stale-while-revalidate store for config.json: emits the cached copy first, then the fresh one. Invalid or unreachable config never replaces a valid cached copy. */
export function createConfigStore(
  url: string,
  storage: KeyValueStorage = idbStorage,
  fetcher: typeof fetch = fetch,
): ConfigStore {
  let current: HubConfig | undefined;
  const listeners = new Set<(config: HubConfig) => void>();

  const emit = (config: HubConfig) => {
    current = config;
    listeners.forEach((listener) => listener(config));
  };

  const refresh = async () => {
    try {
      const res = await fetcher(url, { cache: 'no-cache' });
      if (!res.ok) return;
      const fresh = parseHubConfig(await res.json());
      emit(fresh);
      await storage.set(CACHE_KEY, fresh);
    } catch (error) {
      console.warn('hub config refresh failed', error);
    }
  };

  const load = async () => {
    try {
      const cached = await storage.get(CACHE_KEY);
      if (cached !== undefined) emit(parseHubConfig(cached));
    } catch (error) {
      console.warn('hub config cache unreadable', error);
    }
    await refresh();
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      if (current) listener(current);
      return () => listeners.delete(listener);
    },
    load,
    refresh,
  };
}
