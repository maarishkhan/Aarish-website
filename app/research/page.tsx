import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { researchProjects } from '@/data/site-config';

export default function ResearchPage() {
  return (
    <div className="container-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Research</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Research programs and scholarly work</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {researchProjects.map((project) => (
          <article key={project.id} className="card-surface p-6">
            <div className="mb-4 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs uppercase tracking-[0.14em] text-sky-700">
              {project.status}
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">{project.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{project.shortDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">{tag}</span>
              ))}
            </div>
            <Link href={`/research/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-700">
              Read project <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
