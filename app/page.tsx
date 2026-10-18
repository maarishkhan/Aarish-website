import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getSiteConfig, getSocialLinks, featuredResearch, interests, publications } from '@/data/site-config';

export default async function HomePage() {
  const siteConfig = await getSiteConfig();
  const socialLinks = getSocialLinks(siteConfig).filter((link) => link.enabled);

  const enabledSections = siteConfig.templateSections
    .filter((section) => section.enabled)
    .reduce<Record<string, boolean>>((accumulator, section) => {
      accumulator[section.key] = true;
      return accumulator;
    }, {});

  const profileImage = siteConfig.profileImage || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80';
  const posterImage = '/uploads/research-poster.jpeg';
  const podiumImage = '/uploads/leadership-podium.jpeg';

  return (
    <>
      <section className="relative pb-12 pt-6 sm:pt-8">
        <div className="container-shell">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
            <div className="bg-slate-950 p-2">
              <div className="grid grid-cols-1 gap-2 lg:h-[390px] lg:grid-cols-[0.75fr_1.33fr_1fr]">
                <figure className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-slate-100 lg:aspect-auto">
                  <Image src={profileImage} alt={`${siteConfig.name} at NASA Kennedy Space Center`} fill priority sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover object-top" />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    NASA Kennedy Space Center
                  </figcaption>
                </figure>
                <figure className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-900 lg:aspect-auto">
                  <Image src={posterImage} alt={`${siteConfig.name} presenting cancer immunotherapy research`} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-center" />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    Cancer immunotherapy poster presentation
                  </figcaption>
                </figure>
                <figure className="relative hidden aspect-square items-center justify-center overflow-hidden bg-slate-800 lg:flex lg:aspect-auto">
                  <Image src={podiumImage} alt={`${siteConfig.name} speaking at a podium`} fill priority sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top" />
                  <figcaption className="absolute bottom-3 right-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    Scientific communication
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="px-5 pb-7 pt-6 sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-brand-dark sm:text-3xl">{siteConfig.name}</h1>
                    <p className="mt-1 text-sm font-medium text-slate-600">{siteConfig.title} · {siteConfig.location}</p>
                  </div>
                  <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    {siteConfig.headline}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">{siteConfig.university}</span>
                  </div>

                  {socialLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {socialLinks.map((link) => {
                        const isScholar = link.title === 'Google Scholar';

                        return (
                          <Link
                            key={link.title}
                            href={link.href as Route}
                            target="_blank"
                            rel="noreferrer"
                            className={[
                              'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition',
                              isScholar
                                ? 'border border-transparent bg-brand text-white hover:bg-brand-dark'
                                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                            ].join(' ')}
                          >
                            {isScholar ? 'Google Scholar' : link.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/research" className="btn btn-primary">
                    Explore Research <ArrowRight size={16} />
                  </Link>
                  <Link href="/cv" className="btn btn-secondary">
                    View CV
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {enabledSections.researchInterests && (
        <section className="section-shell bg-slate-100/60">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Research Interests</p>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-dark">Core areas of investigation</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {interests.slice(0, 4).map((interest) => (
                <div key={interest.id} className="card-surface p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-brand p-3 text-white shadow-sm">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark">{interest.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{interest.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {enabledSections.featuredResearch && (
        <section className="section-shell">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Featured Research</p>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-dark">Current and recent projects</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {featuredResearch.map((project) => (
                <article key={project.id} className="card-surface overflow-hidden p-6">
                  <div className="pill">
                    {project.status}
                  </div>
                  <h3 className="text-2xl font-semibold text-brand-dark">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.shortDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/research/${project.slug}` as Route} className="link-brand mt-6">
                    Read project <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
            <Link href="/research" className="link-brand mt-8">
              All research <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {enabledSections.publications && (
        <section className="section-shell bg-slate-100/60">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Selected Publications</p>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-dark">Peer-reviewed and scholarly work</h2>
            </div>
            <div className="space-y-4">
              {publications.slice(0, 3).map((publication) => (
                <article key={publication.id} className="card-surface flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{publication.publicationType}</p>
                    <h3 className="mt-2 text-xl font-semibold text-brand-dark">{publication.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{publication.authors.join(', ')}</p>
                    <p className="mt-2 text-sm text-slate-500">{publication.journal || publication.conference} • {publication.publicationDate}</p>
                  </div>
                  <Link href={`/publications/${publication.slug}` as Route} className="btn btn-secondary btn-sm self-start">
                    View details
                  </Link>
                </article>
              ))}
            </div>
            <Link href="/publications" className="link-brand mt-8">
              All publications <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {enabledSections.researchAI && (
        <section className="section-shell">
          <div className="container-shell">
            <div className="card-surface flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Research AI</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-brand-dark">Ask about the research</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Questions about projects, publications, tools, or background? The assistant answers using only the content of this website.
                </p>
              </div>
              <Link href="/research-ai" className="btn btn-primary self-start md:self-center">
                Open Research AI <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section-shell bg-slate-900 text-white">
        <div className="container-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-accent-light">Get in touch</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Interested in collaborating?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                I welcome conversations about research, mentorship, and opportunities in biomedical engineering and computational biology.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-light">
                Contact me <ArrowRight size={16} />
              </Link>
              <Link href="/experience" className="inline-flex items-center gap-2 rounded-full border border-slate-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Experience &amp; education
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
