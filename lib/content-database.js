import { getSupabaseClient, isSupabaseConfigured } from './supabase.js';

export function normalizeCollection(rows, fallback, mapper) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const safeFallback = Array.isArray(fallback) ? fallback : [];

  if (safeRows.length === 0) {
    return safeFallback;
  }

  return safeRows.map((row) => mapper(row)).filter(Boolean);
}

export async function readDatabaseCollection(tableName, fallback, mapper) {
  if (!isSupabaseConfigured()) {
    return fallback;
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallback;
  }

  try {
    const { data, error } = await supabase.from(tableName).select('*');

    if (error || !Array.isArray(data)) {
      return fallback;
    }

    return normalizeCollection(data, fallback, mapper);
  } catch {
    return fallback;
  }
}
