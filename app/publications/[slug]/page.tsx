import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { publications } from '@/data/site-config';

export default async function PublicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = publications.find((item) => item.slug === slug);

  if (!publication) {
    notFound();
  }

  const recordUrl = publication.externalUrl || publication.pdfUrl || publication.abstractUrl;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    abstract: publication.abstract,
    datePublished: publication.publicationDate,
    keywords: publication.keywords.join(', '),
    author: publication.authors.map((name) => ({ '@type': 'Person', name })),
    ...(publication.doi ? { sameAs: `https://doi.org/${publication.doi}` } : {}),
    ...(recordUrl ? { url: recordUrl } : {}),
  };

  return (
    <div className="container-shell section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
      <PageHeader eyebrow={publication.publicationType} title={publication.title} back={{ href: '/publications', label: 'All publications' }} compact />

      <div className="card-surface p-6 md:p-8">
        <p className="text-sm font-medium text-slate-700">{publication.authors.join(', ')}</p>
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
              className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-white"
            >
              View abstract
            </a>
          )}
          {recordUrl && (
            <a
              href={recordUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
            >
              View details
            </a>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-brand-dark">Abstract</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{publication.abstract}</p>
        </div>

        {publication.keywords.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-brand-dark">Keywords</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {publication.keywords.map((keyword) => (
                <span key={keyword} className="chip">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold text-brand-dark">Citation</h2>
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
    alternates: { canonical: `/publications/${slug}` },
    description: publication.abstract,
  };
}
