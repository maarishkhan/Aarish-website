import Link from 'next/link';
import type { Route } from 'next';
import { Mail } from 'lucide-react';
import { getSiteConfig, getSocialLinks } from '@/data/site-config';

export async function Footer() {
  const siteConfig = await getSiteConfig();
  const socialLinks = getSocialLinks(siteConfig).filter((link) => link.enabled);
  const navItems = siteConfig.navItems.filter((item) => item.enabled).slice(0, 8);

  return (
    <footer className="relative overflow-hidden bg-brand-dark text-slate-300 print:hidden">
      <div className="pattern-hex absolute inset-0" aria-hidden="true" />
      <div className="h-1 w-full bg-gradient-to-r from-brand via-gold to-gold-bright" />
      <div className="container-shell relative py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-slate-300">{siteConfig.title}</p>
            <p className="mt-1 max-w-sm text-sm text-slate-400">{siteConfig.university}</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-light hover:text-white">
              <Mail size={16} /> {siteConfig.email}
            </a>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href as Route} className="transition hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">Profiles</p>
            <ul className="mt-4 space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href as Route} target="_blank" rel="noreferrer" className="transition hover:text-white">{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
