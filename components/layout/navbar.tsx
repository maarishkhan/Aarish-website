import Link from 'next/link';
import { NavLink } from '@/components/layout/nav-link';
import { getSiteConfig } from '@/data/site-config';
import { MobileNav } from '@/components/layout/mobile-nav';

export async function Navbar() {
  const siteConfig = await getSiteConfig();

  const navItems = siteConfig.navItems.filter((item) => item.enabled);

  return (
    <header className="brand-band bg-brand-dark print:hidden sticky top-0 z-50 border-b border-white/10 text-white shadow-lg shadow-brand-dark/10">
      <div className="container-shell relative flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap text-base font-semibold tracking-tight text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent-light/40 bg-white/5 font-[family-name:var(--font-display)] text-sm font-bold text-accent-light shadow-sm" aria-hidden="true">MK</span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-4 xl:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} className="whitespace-nowrap text-sm font-medium transition">{item.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-gold btn-sm hidden sm:inline-flex">
            Contact
          </Link>
          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}
