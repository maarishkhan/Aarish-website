import { experience, formatPeriod } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'Research Experience',
  description: 'Research and leadership experience in computational immunotherapy, ADHD genetics, and low-cost water purification at the University at Buffalo.',
  alternates: { canonical: '/experience' },
};

export default function ExperiencePage() {
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
    </div>
  );
}
