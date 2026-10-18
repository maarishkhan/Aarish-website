import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from '@/lib/admin-session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPath = pathname.startsWith('/admin');
  const isAuthed = await verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);

  if (!isAdminPath || pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (!isAuthed) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
