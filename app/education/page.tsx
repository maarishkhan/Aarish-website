import { education } from '@/data/site-config';

export default function EducationPage() {
  return (
    <div className="container-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Education</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Academic background</h1>
      </div>
      <div className="space-y-5">
        {education.map((item) => (
          <article key={item.id} className="card-surface p-6">
            <h2 className="text-2xl font-semibold text-slate-900">{item.degree}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.institution} • {item.location}</p>
            <p className="mt-2 text-sm text-slate-500">{item.startDate} — {item.endDate}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
            {item.gpa ? <p className="mt-4 text-sm font-medium text-slate-700">GPA: {item.gpa}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
