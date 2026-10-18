import { awards } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export default function AwardsPage() {
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Awards" title="Recognition and honors" />
      <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {awards.map((award) => (
          <article key={award.id} className="card-surface overflow-hidden p-6">
            {award.image && (
              <img src={award.image} alt={`${award.title}, ${award.organization}`} className="-mx-6 -mt-6 mb-5 h-auto w-[calc(100%+3rem)] max-w-none" loading="lazy" />
            )}
            <p className="text-xs uppercase tracking-[0.14em] text-brand">{award.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-brand-dark">{award.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{award.organization} • {award.year}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{award.description}</p>
            {award.quote && (
              <blockquote className="mt-5 border-l-2 border-[#bb7728] pl-4 text-sm italic leading-6 text-slate-600">
                “{award.quote.text}”
                <footer className="mt-2 text-xs not-italic text-slate-500">— {award.quote.attribution}</footer>
              </blockquote>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
