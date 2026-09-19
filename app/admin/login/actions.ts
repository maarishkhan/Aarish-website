'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, isValidAdminCredentials, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';
import { isSupabaseConfigured, signInWithSupabase } from '@/lib/supabase';

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const hasSupabase = isSupabaseConfigured();

  if (hasSupabase) {
    const result = await signInWithSupabase(email, password);

    if (!result.success) {
      redirect('/admin/login?error=invalid-credentials');
    }

    redirect('/admin');
  }

  if (!isValidAdminCredentials(email, password)) {
    redirect('/admin/login?error=invalid-credentials');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  redirect('/admin');
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect('/admin/login');
}

export async function getAdminLoginHint() {
  return {
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD,
  };
}
