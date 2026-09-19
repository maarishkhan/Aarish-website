import test from 'node:test';
import assert from 'node:assert/strict';

import { getSupabaseAuthMode, isSupabaseConfigured } from './supabase.js';

test('supabase auth mode falls back to demo when credentials are absent', () => {
  assert.equal(isSupabaseConfigured(), false);
  assert.equal(getSupabaseAuthMode(), 'demo');
});

test('supabase auth mode exposes a configured supabase state when credentials are present', () => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key';

  assert.equal(isSupabaseConfigured(), true);
  assert.equal(getSupabaseAuthMode(), 'supabase');

  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
});
