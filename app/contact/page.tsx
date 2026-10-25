import Link from 'next/link';
import type { Route } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { EmailActions } from '@/components/contact/email-actions';
import { getPublicPhone } from '@/lib/contact-phone';
import { getSiteConfig, getSocialLinks } from '@/data/site-config';

export const metadata = {
  title: 'Contact',
  description: 'Contact Mohammad Aarish Khan for research collaboration, mentorship, and opportunities in biomedical engineering and computational biology.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  const socialLinks = getSocialLinks(siteConfig).filter((link) => link.enabled);
  const phone = getPublicPhone(siteConfig.phone);

  return (
    <div className="container-shell section-shell">
      <PageHeader
        eyebrow="Contact"
        title="Connect and collaborate"
        intro="I welcome conversations about research collaboration, mentorship, and opportunities in biomedical engineering and computational biology. Email is the best way to reach me."
      />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="card-surface space-y-5 p-6 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-1 inline-block text-xl font-medium text-brand underline-offset-4 hover:underline">{siteConfig.email}</a>
          </div>
          {phone && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Phone</p>
              <a href={phone.href} className="mt-1 inline-block text-lg font-medium text-brand underline-offset-4 hover:underline">{phone.display}</a>
            </div>
          )}
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

        <div className="card-surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Happy to talk about</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Research collaboration in computational genetics and computational immunotherapy</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Community-driven engineering projects and global health technology</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />Mentorship, student programs and science communication</li>
          </ul>
          <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
            <EmailActions email={siteConfig.email} name={siteConfig.name} />
            <p className="text-xs leading-5 text-slate-500">
              No email app opens? Use <strong>Open in Gmail</strong>, or copy the address and write from any mail service.
            </p>
            <Link href="/cv" className="inline-flex text-sm font-medium text-brand underline-offset-4 hover:underline">View CV →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
