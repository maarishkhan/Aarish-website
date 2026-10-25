'use server';

import type { Route } from 'next';
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

  // Signing the session fails in production when ADMIN_SESSION_SECRET is not set; say so instead of crashing.
  let sessionToken: string;

  try {
    sessionToken = await createAdminSessionToken();
  } catch (error) {
    console.error('Could not create the admin session:', error instanceof Error ? error.message : error);
    redirect('/admin/login?error=session-secret' as Route);
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
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
