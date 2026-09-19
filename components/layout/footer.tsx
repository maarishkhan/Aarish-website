import Link from 'next/link';
import type { Route } from 'next';
import { getSiteConfig, getSocialLinks } from '@/data/site-config';

export function Footer() {
  const siteConfig = getSiteConfig();
  const socialLinks = getSocialLinks(siteConfig);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{siteConfig.name}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{siteConfig.title}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {socialLinks.filter((link) => link.enabled).map((link) => (
              <Link key={link.title} href={link.href as Route} target="_blank" rel="noreferrer" className="transition hover:text-slate-900">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © 2025 {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
