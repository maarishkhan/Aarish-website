import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, Cpu, Dna, Globe, Microscope } from 'lucide-react';
import { Helix } from '@/components/ui/helix';
import { readCvContent } from '@/lib/cv-content-store';
import { awards, getSiteConfig, getSocialLinks, featuredResearch, interests, presentedAt, publications, recognizedBy, researchProjects } from '@/data/site-config';

const interestIcons = [Microscope, Dna, Globe, Cpu];

export const metadata = { alternates: { canonical: '/' } };

export default async function HomePage() {
  const [siteConfig, cvContent] = await Promise.all([getSiteConfig(), readCvContent()]);
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

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aarishkhan.vercel.app').replace(/\/$/, '');
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteUrl,
    jobTitle: siteConfig.title,
    description: siteConfig.headline,
    image: profileImage.startsWith('http') ? profileImage : `${siteUrl}${profileImage}`,
    affiliation: { '@type': 'CollegeOrUniversity', name: 'University at Buffalo' },
    knowsAbout: ['Biomedical engineering', 'Computational genetics', 'Synthetic biology', 'Genomic medicine', 'Cancer immunotherapy', 'Antibody design'],
    sameAs: socialLinks.map((link) => link.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }} />
      <section className="hero-band relative overflow-hidden text-white">
        <div className="pattern-hex absolute inset-0" aria-hidden="true" />
        <Helix className="helix inset-y-0 left-1/2 hidden w-[28rem] -translate-x-1/2 lg:block" />
        <div className="container-shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow eyebrow-light reveal reveal-1">{siteConfig.title}</p>
            <h1 className="reveal reveal-2 mt-4 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">{siteConfig.name}</h1>
            <p className="reveal reveal-3 mt-6 max-w-xl text-lg leading-8 text-slate-200">{siteConfig.headline}</p>
            <p className="reveal reveal-3 mt-4 inline-flex max-w-xl items-start gap-2 text-sm text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-bright" />
              {siteConfig.university} · {siteConfig.location}
            </p>
            <div className="reveal reveal-4 mt-8 flex flex-wrap gap-3">
              <Link href="/research" className="btn btn-gold">
                Explore Research <ArrowRight size={16} />
              </Link>
              <Link href="/cv" className="btn btn-outline-light">
                View CV
              </Link>
            </div>
            {socialLinks.length > 0 && (
              <div className="reveal reveal-4 mt-6 flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href as Route}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-white hover:bg-white/10"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="reveal reveal-3 grid h-[26rem] grid-cols-2 grid-rows-2 gap-3 sm:h-[30rem]">
            <figure className="relative row-span-2 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
              <Image src={profileImage} alt={`${siteConfig.name} at NASA Kennedy Space Center`} fill priority sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover object-top" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white">NASA Kennedy Space Center</figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
              <Image src={posterImage} alt={`${siteConfig.name} presenting cancer immunotherapy research`} fill priority sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover object-center" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white">ACS NERD 2025</figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
              <Image src={podiumImage} alt={`${siteConfig.name} speaking at a podium`} fill priority sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover object-top" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white">Scientific communication</figcaption>
            </figure>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <dl className="container-shell grid grid-cols-2 gap-y-6 py-7 md:grid-cols-4">
            {[
              { value: researchProjects.filter((item) => item.published).length, label: 'Research projects' },
              { value: publications.filter((item) => item.published).length, label: publications.filter((item) => item.published).length === 1 ? 'Publication' : 'Publications' },
              { value: cvContent.conferences.length, label: 'Conferences' },
              { value: awards.length, label: 'Awards & honors' },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:border-r md:border-white/10 md:last:border-r-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-[family-name:var(--font-display)] text-4xl font-semibold text-accent-light">{stat.value}</dd>
                <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8" aria-label="Where this work has been presented and recognized">
        <div className="container-shell grid gap-5 md:grid-cols-2 md:gap-10">
          {[
            { label: 'Presented at', items: presentedAt },
            { label: 'Recognized by', items: recognizedBy },
          ].map((group) => (
            <div key={group.label}>
              <p className="eyebrow">{group.label}</p>
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2 text-sm font-medium text-brand-dark">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {enabledSections.researchInterests && (
        <section className="section-tight bg-white">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Research Interests</p>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-dark">Core areas of investigation</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {interests.slice(0, 4).map((interest, index) => {
                const Icon = interestIcons[index % interestIcons.length];

                return (
                <div key={interest.id} className="card-surface card-hover card-accent p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="inline-flex rounded-xl bg-brand p-3 text-accent-light shadow-sm ring-4 ring-brand/10">
                      <Icon size={22} />
                    </div>
                    <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-slate-200">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark">{interest.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{interest.shortDescription}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {enabledSections.featuredResearch && (
        <section className="section-tight section-wash">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Featured Research</p>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-dark">Current and recent projects</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {featuredResearch.map((project) => (
                <article key={project.id} className="card-surface card-hover card-accent p-6 pt-7">
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
        <section className="section-tight bg-slate-100/60">
          <div className="container-shell">
            <div className="section-heading">
              <p className="eyebrow">Selected Publications</p>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-dark">Peer-reviewed and scholarly work</h2>
            </div>
            <div className="space-y-4">
              {publications.slice(0, 3).map((publication) => (
                <article key={publication.id} className="card-surface card-hover flex flex-col gap-4 border-l-4 border-l-gold p-6 md:flex-row md:items-start md:justify-between">
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
        <section className="py-6 sm:py-8">
          <div className="container-shell">
            <div className="hero-band relative flex flex-col gap-6 overflow-hidden rounded-3xl p-8 text-white shadow-xl sm:p-10 md:flex-row md:items-center md:justify-between">
              <div className="pattern-hex absolute inset-0" aria-hidden="true" />
              <div className="relative max-w-2xl">
                <p className="eyebrow eyebrow-light">Research AI</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Ask about the research</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Questions about projects, publications, tools, or background? The assistant answers using only the content of this website.
                </p>
              </div>
              <Link href="/research-ai" className="btn btn-gold relative self-start md:self-center">
                Open Research AI <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section-tight relative overflow-hidden bg-brand-dark text-white">
        <div className="pattern-hex absolute inset-0" aria-hidden="true" />
        <div className="container-shell relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-light">Get in touch</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Interested in collaborating?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                I welcome conversations about research, mentorship, and opportunities in biomedical engineering and computational biology.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-gold">
                Contact me <ArrowRight size={16} />
              </Link>
              <Link href="/experience" className="btn btn-outline-light">
                Experience &amp; education
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
