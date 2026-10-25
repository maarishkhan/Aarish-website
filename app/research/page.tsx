import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { researchProjects } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'Research Projects',
  description: 'Biomedical engineering research projects: bispecific antibody design for cancer immunotherapy, the genetics of neurological conditions, and low-cost UV water purification.',
  alternates: { canonical: '/research' },
};

export default function ResearchPage() {
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Research" title="Research programs and scholarly work" />
      <div className="grid gap-6 lg:grid-cols-2">
        {researchProjects.map((project) => (
          <article
            key={project.id}
            className={`card-surface card-hover overflow-hidden ${project.images[0] ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : 'p-6 sm:p-8'}`}
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
              {project.images[0] && (
                <dl className="mt-6 space-y-5 border-t border-slate-200 pt-5 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Outcome</dt>
                    <dd className="mt-1.5 leading-7 text-slate-600">{project.results}</dd>
                  </div>
                  {project.pipeline && project.pipeline.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Method</dt>
                      <dd className="mt-2">
                        <ol className="grid gap-x-6 gap-y-1.5 text-slate-600 sm:grid-cols-2">
                          {project.pipeline.map((step, index) => (
                            <li key={step.title} className="flex gap-2">
                              <span className="font-semibold text-accent">{index + 1}.</span>
                              <span>{step.title}</span>
                            </li>
                          ))}
                        </ol>
                      </dd>
                    </div>
                  )}
                  {project.technologies.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Tools</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tool) => (
                          <span key={tool} className="chip">{tool}</span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
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
