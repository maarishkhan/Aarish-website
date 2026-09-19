import { createClient } from '@supabase/supabase-js';

const PLACEHOLDER_VALUES = [
  'your-project.supabase.co',
  'https://your-project.supabase.co',
  'your-anon-key',
  'your-service-role-key',
  'placeholder',
  'changeme',
  'example',
];

function hasMeaningfulConfigValue(value) {
  const normalized = String(value ?? '').trim();
  if (!normalized) return false;
  return !PLACEHOLDER_VALUES.some((placeholder) => normalized.toLowerCase().includes(placeholder.toLowerCase()));
}

function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

export function getSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();

  if (!hasMeaningfulConfigValue(url) || !hasMeaningfulConfigValue(anonKey)) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export const supabase = getSupabaseClient();

export function getSupabaseAuthMode() {
  return getSupabaseClient() ? 'supabase' : 'demo';
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseConfig();
  return hasMeaningfulConfigValue(url) && hasMeaningfulConfigValue(anonKey);
}

export async function signInWithSupabase(email, password) {
  const client = getSupabaseClient();

  if (!client) {
    return {
      success: false,
      mode: 'demo',
      error: 'Supabase is not configured. Falling back to demo auth.',
    };
  }

  const { data, error } = await client.auth.signInWithPassword({
    email: String(email ?? '').trim(),
    password: String(password ?? ''),
  });

  if (error) {
    return {
      success: false,
      mode: 'supabase',
      error: error.message,
      session: null,
    };
  }

  return {
    success: true,
    mode: 'supabase',
    error: null,
    session: data?.session ?? null,
  };
}
