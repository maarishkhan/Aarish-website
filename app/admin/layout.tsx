import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { logoutAdminAction } from '@/app/admin/login/actions';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="container-shell flex h-16 items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Admin</p>
            <h1 className="text-lg font-semibold text-brand-dark">Researcher dashboard</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <Link href="/admin" className="transition hover:text-slate-900">Overview</Link>
            <Link href="/admin/editor" className="transition hover:text-slate-900">Site content</Link>
            <Link href="/admin/cv" className="transition hover:text-slate-900">CV</Link>
            <Link href="/" className="transition hover:text-slate-900">View site</Link>
            {authenticated && (
              <form action={logoutAdminAction}>
                <button type="submit" className="font-medium text-brand hover:underline">Sign out</button>
              </form>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
