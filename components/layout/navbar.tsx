import Link from 'next/link';
import type { Route } from 'next';
import { Menu } from 'lucide-react';
import { getSiteConfig } from '@/data/site-config';

export function Navbar() {
  const siteConfig = getSiteConfig();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.navItems.filter((item) => item.enabled).map((item) => (
            <Link key={item.href} href={item.href as Route} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 sm:inline-flex">
            Contact
          </Link>
          <button type="button" aria-label="Open navigation" className="inline-flex rounded-full border border-slate-200 p-2 lg:hidden">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
