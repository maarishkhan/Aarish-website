import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-shell section-shell">
      <div className="card-surface mx-auto max-w-2xl p-12 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you requested is unavailable or may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">Return Home</Link>
          <Link href="/research" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800">Explore Research</Link>
        </div>
      </div>
    </div>
  );
}
