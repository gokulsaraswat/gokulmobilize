import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toSavedList } from './saved-items.ts';

test('keeps valid same-origin items, newest first', () => {
  const older = { url: '/blog/a', title: 'A', kind: 'blog', savedAt: '2026-10-01T00:00:00Z' };
  const newer = { url: '/courses/b', title: 'B', kind: 'course', savedAt: '2026-10-30T00:00:00Z' };
  assert.deepEqual(toSavedList([older, newer]), [newer, older]);
});

test('skips malformed and off-site items', () => {
  const bad = [
    null,
    { url: 'https://evil.example/x', title: 'X', kind: 'blog', savedAt: '2026-10-01T00:00:00Z' },
    { url: '//evil.example/x', title: 'X', kind: 'blog', savedAt: '2026-10-01T00:00:00Z' },
    { url: '/blog/x', title: 'X', kind: 'video', savedAt: '2026-10-01T00:00:00Z' },
    { url: '/blog/x', title: 'X', kind: 'blog', savedAt: 'not a date' },
  ];
  assert.deepEqual(toSavedList(bad), []);
});
