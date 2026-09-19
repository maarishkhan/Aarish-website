import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="container-shell flex h-16 items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Admin</p>
            <h1 className="text-lg font-semibold text-slate-900">Researcher dashboard</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <Link href="/admin" className="transition hover:text-slate-900">Overview</Link>
            <Link href="/" className="transition hover:text-slate-900">View site</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
