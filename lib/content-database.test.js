import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeCollection } from './content-database.js';

test('normalizeCollection returns mapped data when rows are available', () => {
  const fallback = [{ id: 'fallback', title: 'Fallback' }];
  const rows = [{ id: 'a', title: 'Alpha' }, { id: 'b', title: 'Beta' }];
  const result = normalizeCollection(rows, fallback, (row) => ({ id: row.id, title: row.title }));

  assert.deepEqual(result, [
    { id: 'a', title: 'Alpha' },
    { id: 'b', title: 'Beta' },
  ]);
});

test('normalizeCollection falls back when the database rows are missing', () => {
  const fallback = [{ id: 'fallback', title: 'Fallback' }];
  const result = normalizeCollection([], fallback, (row) => row);

  assert.deepEqual(result, fallback);
});
