import { experience, formatPeriod } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';
import { leadershipGroupLabels, readCvContent } from '@/lib/cv-content-store';

export const metadata = {
  title: 'Research Experience',
  description: 'Research and leadership experience in computational immunotherapy, neurological condition genetics, and low-cost water purification at the University at Buffalo.',
  alternates: { canonical: '/experience' },
};

export default async function ExperiencePage() {
  const { leadership, leadershipSchool } = await readCvContent();
  const leadershipGroups = [
    { label: leadershipGroupLabels.university, items: leadership },
    { label: leadershipGroupLabels.school, items: leadershipSchool },
  ].filter((group) => group.items.length > 0);

  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Experience" title="Research and professional experience" />
      <ol className="relative ml-3 space-y-8 border-l-2 border-brand/15 pl-8 sm:ml-4 sm:pl-10">
        {experience.map((item) => (
          <li key={item.id} className="relative">
            <span className="absolute -left-[2.6rem] top-7 grid h-4 w-4 place-items-center rounded-full border-2 border-gold bg-white sm:-left-[3.1rem]" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
          <article className="card-surface card-hover p-6">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-start">
              <div>
                <h2 className="text-2xl font-semibold text-brand-dark">{item.role}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.organization} • {item.location}</p>
              </div>
              {formatPeriod(item) && <p className="pill !mb-0 shrink-0 self-start normal-case tracking-normal">{formatPeriod(item)}</p>}
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
            {item.images && item.images.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {item.images.map((src) => (
                  <img key={src} src={src} alt={`${item.role} at ${item.organization}`} className="aspect-video w-full rounded-xl border border-slate-200 object-cover" loading="lazy" />
                ))}
              </div>
            )}
          </article>
          </li>
        ))}
      </ol>

      {leadershipGroups.length > 0 && (
        <section className="mt-16">
          <p className="eyebrow">Leadership</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-dark">Leadership and involvement</h2>
          {leadershipGroups.map((group) => (
            <div key={group.label} className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{group.label}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {group.items.map((item) => (
                  <article key={item.organization} className="card-surface card-hover p-5">
                    <h4 className="text-lg font-semibold text-brand-dark">{item.organization}</h4>
                    {item.role && <p className="mt-1 text-sm font-medium text-slate-700">{item.role}</p>}
                    {item.note && <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
