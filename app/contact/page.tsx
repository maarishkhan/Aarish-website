import Link from 'next/link';
import type { Route } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { getSiteConfig, getSocialLinks } from '@/data/site-config';

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  const socialLinks = getSocialLinks(siteConfig).filter((link) => link.enabled);

  return (
    <div className="container-shell section-shell">
      <PageHeader
        eyebrow="Contact"
        title="Connect and collaborate"
        intro="I welcome conversations about research collaboration, mentorship, and opportunities in biomedical engineering and computational biology. Email is the best way to reach me."
      />

      <div className="max-w-2xl">
        <div className="card-surface space-y-5 p-6 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-1 inline-block text-xl font-medium text-brand underline-offset-4 hover:underline">{siteConfig.email}</a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Affiliation</p>
            <p className="mt-1 text-sm text-slate-700">{siteConfig.university}</p>
            <p className="text-sm text-slate-500">{siteConfig.location}</p>
          </div>
          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-5">
              {socialLinks.map((link) => (
                <Link key={link.title} href={link.href as Route} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                  {link.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
