import { awards } from '@/data/site-config';

export default function AwardsPage() {
  return (
    <div className="container-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Awards</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Recognition and honors</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {awards.map((award) => (
          <article key={award.id} className="card-surface p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-sky-700">{award.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">{award.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{award.organization} • {award.year}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{award.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
