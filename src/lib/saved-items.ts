import { createStore, del, entries } from 'idb-keyval';

/** Shared with the portfolio (same origin): IndexedDB database `gk-saved`, store `items`, key = `url`. See docs/CONTRACTS.md. */
export interface SavedItem {
  url: string;
  title: string;
  kind: 'blog' | 'course';
  savedAt: string;
}

const savedStore = createStore('gk-saved', 'items');

const isSavedItem = (value: unknown): value is SavedItem => {
  const item = value as SavedItem;
  return (
    typeof item?.url === 'string' &&
    item.url.startsWith('/') &&
    !item.url.startsWith('//') &&
    typeof item.title === 'string' &&
    (item.kind === 'blog' || item.kind === 'course') &&
    !Number.isNaN(Date.parse(item.savedAt))
  );
};

/** Valid items only, newest first. Written by another app, so anything malformed is skipped. */
export const toSavedList = (values: unknown[]): SavedItem[] =>
  values.filter(isSavedItem).sort((a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt));

export const listSaved = async (): Promise<SavedItem[]> =>
  toSavedList((await entries(savedStore)).map(([, value]) => value));

export const removeSaved = (url: string): Promise<void> => del(url, savedStore);
