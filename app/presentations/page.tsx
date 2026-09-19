import { presentations } from '@/data/site-config';

export default function PresentationsPage() {
  return (
    <div className="container-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Presentations</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Talks, posters, and scholarly communication</h1>
      </div>
      <div className="space-y-5">
        {presentations.map((presentation) => (
          <article key={presentation.id} className="card-surface p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{presentation.presentationType}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{presentation.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{presentation.event} • {presentation.location}</p>
            <p className="mt-2 text-sm text-slate-500">{presentation.date}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{presentation.abstract}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
