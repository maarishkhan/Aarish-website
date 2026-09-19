import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { publications } from '@/data/site-config';

export default async function PublicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = publications.find((item) => item.slug === slug);

  if (!publication) {
    notFound();
  }

  const recordUrl = publication.externalUrl || publication.pdfUrl || publication.abstractUrl;

  return (
    <div className="container-shell section-shell">
      <Link href={'/publications' as Route} className="mb-6 inline-flex items-center text-sm font-medium text-sky-700">
        ← Back to publications
      </Link>

      <div className="card-surface p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{publication.publicationType}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          {publication.title}
        </h1>

        <p className="mt-4 text-sm text-slate-600">{publication.authors.join(', ')}</p>
        <p className="mt-2 text-sm text-slate-500">
          {publication.journal || publication.conference} • {publication.publicationDate}
        </p>

        {publication.doi && (
          <p className="mt-3 text-sm text-slate-600">
            DOI: <span className="font-medium text-slate-800">{publication.doi}</span>
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {publication.abstractUrl && (
            <a
              href={publication.abstractUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-sky-700 px-4 py-2 text-sm font-medium text-white"
            >
              View abstract
            </a>
          )}
          {recordUrl && (
            <a
              href={recordUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800"
            >
              View details
            </a>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">Abstract</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{publication.abstract}</p>
        </div>

        {publication.keywords.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">Keywords</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {publication.keywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold text-slate-900">Citation</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{publication.citation}</p>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = publications.find((item) => item.slug === slug);

  if (!publication) {
    return {};
  }

  return {
    title: publication.title,
    description: publication.abstract,
  };
}
