import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const ADMIN_COOKIE_NAME = 'research_admin_session';
export const DEFAULT_ADMIN_EMAIL = String(process.env.ADMIN_EMAIL ?? 'admin@university.edu').trim();
export const DEFAULT_ADMIN_PASSWORD = String(process.env.ADMIN_PASSWORD ?? 'research-admin').trim();

function normalizeCredential(value: string | null | undefined) {
  return String(value ?? '').trim();
}

export function isValidAdminCredentials(email: string, password: string) {
  return (
    normalizeCredential(email).toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
    normalizeCredential(password) === DEFAULT_ADMIN_PASSWORD
  );
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === 'authenticated';
}

export async function requireAdminSession() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
}
