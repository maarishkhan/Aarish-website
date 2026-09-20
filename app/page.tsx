import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, BookOpenText, Sparkles, BriefcaseBusiness } from 'lucide-react';
import { getSiteConfig, getSocialLinks, featuredResearch, interests, publications, experience, education, awards, presentations, blogPosts } from '@/data/site-config';

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const socialLinks = getSocialLinks(siteConfig).filter((link) => link.enabled);

  const enabledSections = siteConfig.templateSections
    .filter((section) => section.enabled)
    .reduce<Record<string, boolean>>((accumulator, section) => {
      accumulator[section.key] = true;
      return accumulator;
    }, {});

  const theme = siteConfig.theme ?? {
    accent: '#1f5eff',
    accentSoft: '#dfe8ff',
    secondary: '#8b5cf6',
    secondarySoft: '#ede9fe',
  };

  const heroImage = siteConfig.heroImage || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80';
  const profileImage = siteConfig.profileImage || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80';

  return (
    <>
      <section className="relative pb-12 pt-6 sm:pt-8">
        <div className="container-shell">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
            <div className="relative">
              <img src={heroImage} alt={siteConfig.name} className="h-52 w-full object-cover sm:h-64 lg:h-72" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/15 to-transparent" />

              <div className="absolute bottom-0 left-5 flex items-end gap-4 pb-5 sm:left-8 sm:pb-6">
                <img src={profileImage} alt={siteConfig.name} className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg sm:h-28 sm:w-28" />
                <div className="text-white">
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{siteConfig.name}</h1>
                  <p className="mt-1 text-sm font-medium text-white/85">{siteConfig.title}</p>
                  <p className="mt-0.5 text-xs text-white/75">{siteConfig.location}</p>
                </div>
              </div>
            </div>

            <div className="px-5 pb-7 pt-6 sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                    Research profile
                  </div>
                  <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    {siteConfig.headline}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">{siteConfig.university}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">{siteConfig.location}</span>
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
                                ? 'border border-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-sky-700 text-white shadow-sm hover:brightness-110'
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
                  <Link href="/research" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5" style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})` }}>
                    Explore Research <ArrowRight size={16} />
                  </Link>
                  <Link href="/cv" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50">
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
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Core areas of investigation</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {interests.slice(0, 4).map((interest) => (
                <div key={interest.id} className="card-surface p-6">
                  <div className="mb-4 inline-flex rounded-xl p-3 text-white shadow-sm" style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})` }}>
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{interest.title}</h3>
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
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Current and recent projects</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {featuredResearch.map((project) => (
                <article key={project.id} className="card-surface overflow-hidden p-6">
                  <div className="mb-5 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-sky-700">
                    {project.status}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.shortDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/research/${project.slug}` as Route} className="mt-6 inline-flex items-center gap-2 text-sm font-medium" style={{ color: theme.accent }}>
                    Read project <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {enabledSections.publications && (
        <section className="section-shell bg-slate-100/60">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Selected Publications</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Peer-reviewed and scholarly work</h2>
            </div>
            <div className="space-y-4">
              {publications.slice(0, 3).map((publication) => (
                <article key={publication.id} className="card-surface flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{publication.publicationType}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">{publication.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{publication.authors.join(', ')}</p>
                    <p className="mt-2 text-sm text-slate-500">{publication.journal || publication.conference} • {publication.publicationDate}</p>
                  </div>
                  <Link href={`/publications/${publication.slug}` as Route} className="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800">
                    View details
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {enabledSections.experience && (
        <section className="section-shell">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Academic Experience</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Research and training timeline</h2>
            </div>
            <div className="space-y-6">
              {experience.slice(0, 3).map((item) => (
                <div key={item.id} className="card-surface flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <BriefcaseBusiness className="text-sky-700" size={18} />
                      <h3 className="text-xl font-semibold text-slate-900">{item.role}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{item.organization} • {item.location}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.startDate} — {item.endDate}</p>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {enabledSections.education && (
        <section className="section-shell bg-slate-100/60">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Education</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Academic preparation</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {education.map((item) => (
                <article key={item.id} className="card-surface p-6">
                  <div className="flex items-center gap-3">
                    <BookOpenText className="text-sky-700" size={18} />
                    <h3 className="text-xl font-semibold text-slate-900">{item.degree}</h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{item.institution} • {item.field}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.startDate} — {item.endDate}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {enabledSections.awards && (
        <section className="section-shell">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Awards</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Recognition and achievements</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {awards.slice(0, 3).map((award) => (
                <div key={award.id} className="card-surface p-6">
                  <p className="text-xs uppercase tracking-[0.14em] text-sky-700">{award.category}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{award.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{award.organization} • {award.year}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {enabledSections.presentations && (
        <section className="section-shell bg-slate-100/60">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Presentations</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Academic communication</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {presentations.slice(0, 3).map((presentation) => (
                <article key={presentation.id} className="card-surface p-6">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{presentation.presentationType}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{presentation.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{presentation.event} • {presentation.location}</p>
                  <p className="mt-2 text-sm text-slate-500">{presentation.date}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {enabledSections.blog && (
        <section className="section-shell">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Latest Research Insights</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Blog and commentary</h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <article key={post.id} className="card-surface p-6">
                  <p className="text-xs uppercase tracking-[0.14em] text-sky-700">{post.category}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{post.summary}</p>
                  <Link href={`/blog/${post.slug}` as Route} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sky-700">
                    Read article <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {enabledSections.researchAI && (
        <section className="section-shell bg-slate-900 text-white">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="eyebrow text-sky-300">Research AI</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Ask about the research profile</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                  Explore research interests, publications, projects, and academic background through an AI-assisted knowledge layer grounded in published site content.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6">
                <p className="text-sm text-slate-300">Example questions</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-100">
                  <li>• What are the main research areas?</li>
                  <li>• Which projects involve biomedical imaging?</li>
                  <li>• What computational methods are represented?</li>
                </ul>
                <Link href="/research-ai" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-900">
                  Open Research AI <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
