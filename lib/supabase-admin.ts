import { createClient } from '@supabase/supabase-js';

/** Server-only Supabase client using the service-role key (bypasses RLS). Never import from client components. */
export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || key.includes('your-service-role-key')) return null;

  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
