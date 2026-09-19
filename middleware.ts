import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPath = pathname.startsWith('/admin');
  const isAuthed = request.cookies.get('research_admin_session')?.value === 'authenticated';

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
