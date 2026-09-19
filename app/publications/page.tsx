import Link from 'next/link';
import type { Route } from 'next';
import { publications } from '@/data/site-config';

export default function PublicationsPage() {
  return (
    <div className="container-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Publications</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Scholarly output</h1>
      </div>
      <div className="space-y-5">
        {publications.map((publication) => (
          <article key={publication.id} className="card-surface p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{publication.publicationType}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{publication.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{publication.authors.join(', ')}</p>
            <p className="mt-2 text-sm text-slate-500">{publication.journal || publication.conference} • {publication.publicationDate}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{publication.abstract}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {publication.abstractUrl && (
                <Link href={publication.abstractUrl as Route} className="inline-flex text-sm font-medium text-sky-700" target="_blank" rel="noreferrer">
                  View abstract
                </Link>
              )}
              {(publication.externalUrl || publication.pdfUrl) && (
                <Link href={(publication.externalUrl || publication.pdfUrl) as Route} className="inline-flex text-sm font-medium text-slate-700" target="_blank" rel="noreferrer">
                  View details
                </Link>
              )}
              <Link href={`/publications/${publication.slug}` as Route} className="inline-flex text-sm font-medium text-slate-700">
                Publication details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
