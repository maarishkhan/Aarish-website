import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { researchProjects } from '@/data/site-config';

function Section({ title, children }: { title: string; children: string }) {
  if (!children) return null;

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-brand-dark">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{children}</p>
    </section>
  );
}

function Chips({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-brand-dark">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="chip">{item}</span>
        ))}
      </div>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = researchProjects.find((item) => item.slug === slug && item.published);

  if (!project) {
    notFound();
  }

  const links = [
    { label: 'Paper', href: project.paperUrl },
    { label: 'Code', href: project.githubUrl },
    { label: 'Demo', href: project.demoUrl },
  ].filter((link) => link.href);

  return (
    <div className="container-shell section-shell">
      <Link href={'/research' as Route} className="mb-6 inline-flex items-center text-sm font-medium text-brand">
        ← Back to research
      </Link>

      <article className="card-surface p-6 md:p-10">
        <div className="pill">
          {project.status}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-dark md:text-4xl">{project.title}</h1>
        <p className="mt-3 text-sm text-slate-500">
          {[project.researchArea, project.institution, [project.startDate, project.endDate].filter(Boolean).join(' – ')].filter(Boolean).join(' • ')}
        </p>
        {project.advisor && <p className="mt-1 text-sm text-slate-500">Lab / team: {project.advisor}</p>}

        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                {link.label}
              </a>
            ))}
          </div>
        )}

        {project.images.length > 0 && (
          <div className={`mt-8 grid gap-4 ${project.images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {project.images.map((src) => (
              <figure key={src} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img src={src} alt={`${project.title}`} className="h-full w-full object-cover" loading="lazy" />
              </figure>
            ))}
          </div>
        )}

        <Section title="Overview">{project.description}</Section>
        <Section title="Research question">{project.researchQuestion}</Section>
        <Section title="Motivation">{project.motivation}</Section>
        <Section title="Methodology">{project.methodology}</Section>
        <Section title="Outcomes">{project.results}</Section>
        <Chips title="Tools and technologies" items={project.technologies} />
        <Chips title="Data" items={project.datasets} />
        <Chips title="Tags" items={project.tags} />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return researchProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = researchProjects.find((item) => item.slug === slug);

  return project ? { title: project.title, description: project.shortDescription } : {};
}
