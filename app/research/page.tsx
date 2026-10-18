import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { researchProjects } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export default function ResearchPage() {
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Research" title="Research programs and scholarly work" />
      <div className="grid gap-6 lg:grid-cols-2">
        {researchProjects.map((project) => (
          <article
            key={project.id}
            className={`card-surface overflow-hidden ${project.images[0] ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : 'p-6 sm:p-8'}`}
          >
            {project.images[0] && (
              <img src={project.images[0]} alt={project.title} className="h-full max-h-96 w-full object-cover lg:max-h-none" loading="lazy" />
            )}
            <div className={project.images[0] ? 'p-6 sm:p-8' : ''}>
              <div className="pill">{project.status}</div>
              <h2 className="text-2xl font-semibold text-brand-dark">{project.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{project.shortDescription}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
              <Link href={`/research/${project.slug}`} className="link-brand mt-6">
                Read project <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
