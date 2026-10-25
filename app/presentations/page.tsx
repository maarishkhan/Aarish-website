import { presentations } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'Presentations and Posters',
  description: 'Conference talks and research posters presented at IFoRE, ACS NERD, SmallSat, and IEEE ISEC.',
  alternates: { canonical: '/presentations' },
};

export default function PresentationsPage() {
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Presentations" title="Talks, posters, and scholarly communication" />
      <div className="space-y-5">
        {presentations.map((presentation) => (
          <article key={presentation.id} className="card-surface card-hover border-l-4 border-l-gold p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{presentation.presentationType}</p>
            <h2 className="mt-2 text-2xl font-semibold text-brand-dark">{presentation.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{[presentation.event, presentation.location].filter(Boolean).join(' • ')}</p>
            <p className="mt-2 text-sm text-slate-500">{presentation.date}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{presentation.abstract}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
