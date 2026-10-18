'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isValidAdminCredentials, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';
import { ADMIN_SESSION_MAX_AGE, createAdminSessionToken } from '@/lib/admin-session';
import { isSupabaseConfigured, signInWithSupabase } from '@/lib/supabase';
import { isAuthorizedAdminEmail } from '@/lib/admin-users';

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  // With Supabase, the account must also be an authorised admin: any other Supabase user is rejected.
  const isValid = isSupabaseConfigured()
    ? (await signInWithSupabase(email, password)).success && (await isAuthorizedAdminEmail(email))
    : isValidAdminCredentials(email, password);

  if (!isValid) {
    redirect('/admin/login?error=invalid-credentials');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, await createAdminSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  redirect('/admin');
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect('/admin/login');
}
