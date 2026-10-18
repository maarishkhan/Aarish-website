import { getServiceClient } from '@/lib/supabase-admin';

/** True if the email is ADMIN_EMAIL or is listed in the admin_users table. */
export async function isAuthorizedAdminEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const configured = String(process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();

  if (!normalized) return false;
  if (configured && normalized === configured) return true;

  const supabase = getServiceClient();

  if (!supabase) return false;

  const { data } = await supabase.from('admin_users').select('email').ilike('email', normalized.replace(/[\\%_]/g, '\\$&')).limit(1);

  return Array.isArray(data) && data.length > 0;
}
