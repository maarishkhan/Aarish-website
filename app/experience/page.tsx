import { experience } from '@/data/site-config';

export default function ExperiencePage() {
  return (
    <div className="container-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Research and professional experience</h1>
      </div>
      <div className="space-y-6">
        {experience.map((item) => (
          <article key={item.id} className="card-surface p-6">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-start">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{item.role}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.organization} • {item.location}</p>
              </div>
              <p className="text-sm text-slate-500">{item.startDate} — {item.endDate}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
