import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from '@/lib/admin-session';

export { ADMIN_COOKIE_NAME };

function normalizeCredential(value: string | null | undefined) {
  return String(value ?? '').trim();
}

export function isValidAdminCredentials(email: string, password: string) {
  const adminEmail = normalizeCredential(process.env.ADMIN_EMAIL);
  const adminPassword = normalizeCredential(process.env.ADMIN_PASSWORD);

  // No built-in defaults: admin login stays disabled until credentials are configured.
  if (!adminEmail || !adminPassword) return false;

  return normalizeCredential(email).toLowerCase() === adminEmail.toLowerCase() && normalizeCredential(password) === adminPassword;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export async function requireAdminSession() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
}
