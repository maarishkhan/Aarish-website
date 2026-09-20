import { awards, education, experience, publications, skills, presentations } from '@/data/site-config';

export default function CvPage() {
  return (
    <div className="container-shell section-shell">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">CV</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Curriculum Vitae</h1>
        </div>
        <a href="/cv.pdf" target="_blank" rel="noreferrer" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">Download CV PDF</a>
      </div>

      <div className="card-surface p-8">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900">Education</h2>
          <div className="mt-5 space-y-4">
            {education.map((item) => (
              <div key={item.id}>
                <p className="font-medium text-slate-900">{item.degree}</p>
                <p className="text-sm text-slate-600">{item.institution} • {item.location}</p>
                <p className="text-sm text-slate-500">{item.startDate} — {item.endDate}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900">Research Experience</h2>
          <div className="mt-5 space-y-4">
            {experience.map((item) => (
              <div key={item.id}>
                <p className="font-medium text-slate-900">{item.role}</p>
                <p className="text-sm text-slate-600">{item.organization} • {item.location}</p>
                <p className="text-sm text-slate-500">{item.startDate} — {item.endDate}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900">Publications</h2>
          <div className="mt-5 space-y-4">
            {publications.map((item) => (
              <div key={item.id}>
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.authors.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900">Awards</h2>
          <div className="mt-5 space-y-4">
            {awards.map((award) => (
              <div key={award.id}>
                <p className="font-medium text-slate-900">{award.title}</p>
                <p className="text-sm text-slate-600">{award.organization} • {award.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900">Presentations</h2>
          <div className="mt-5 space-y-4">
            {presentations.map((presentation) => (
              <div key={presentation.id}>
                <p className="font-medium text-slate-900">{presentation.title}</p>
                <p className="text-sm text-slate-600">{presentation.event}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Skills</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
