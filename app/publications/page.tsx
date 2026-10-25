import Link from 'next/link';
import type { Route } from 'next';
import { publications } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'Publications',
  description: 'Publications and scholarly output on antibody design, immunotherapy, and biomedical engineering research.',
  alternates: { canonical: '/publications' },
};

export default function PublicationsPage() {
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Publications" title="Scholarly output" />
      <div className="space-y-5">
        {publications.map((publication) => (
          <article key={publication.id} className="card-surface card-hover border-l-4 border-l-gold p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{publication.publicationType}</p>
            <h2 className="mt-2 text-2xl font-semibold text-brand-dark">{publication.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{publication.authors.join(', ')}</p>
            <p className="mt-2 text-sm text-slate-500">{publication.journal || publication.conference} • {publication.publicationDate}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{publication.abstract}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {publication.abstractUrl && (
                <Link href={publication.abstractUrl as Route} className="inline-flex text-sm font-medium text-brand" target="_blank" rel="noreferrer">
                  Abstract (IEEE Xplore)
                </Link>
              )}
              {(publication.externalUrl || publication.pdfUrl) && (
                <Link href={(publication.externalUrl || publication.pdfUrl) as Route} className="inline-flex text-sm font-medium text-slate-700" target="_blank" rel="noreferrer">
                  Read the paper
                </Link>
              )}
              <Link href={`/publications/${publication.slug}` as Route} className="inline-flex text-sm font-medium text-slate-700">
                Full details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
