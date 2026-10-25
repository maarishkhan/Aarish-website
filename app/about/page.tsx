import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'About',
  description: 'About Mohammad Aarish Khan, an undergraduate biomedical engineering researcher in the University at Buffalo Honors College.',
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="About" title="Researcher profile and academic direction" />

      <div className="grid items-center gap-10 md:grid-cols-[20rem_minmax(0,1fr)] md:gap-14">
        <figure className="mx-auto w-full max-w-[20rem]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-[0_24px_60px_rgba(19,49,77,0.25)] ring-1 ring-slate-200">
            <Image src="/uploads/headshot.jpg" alt={siteConfig.name} fill sizes="320px" className="object-cover object-top" priority />
          </div>
          <figcaption className="mt-4 text-center font-[family-name:var(--font-display)] text-lg font-semibold text-brand-dark">{siteConfig.name}</figcaption>
          <p className="text-center text-sm text-slate-500">{siteConfig.title}</p>
        </figure>
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl leading-10 text-brand-dark sm:text-[1.7rem]">{siteConfig.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cv" className="btn btn-primary">View CV</Link>
            <Link href="/contact" className="btn btn-secondary">Get in touch</Link>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <p className="eyebrow">Gallery</p>
        <h2 className="mt-2 text-2xl font-semibold text-brand-dark">Presenting research</h2>
        <div className="mt-4 gap-4 sm:columns-2">
          {[
            { src: '/uploads/presenting-diagnostics.jpg', caption: 'Presenting a proposal on making diagnostics accessible anywhere' },
            { src: '/uploads/presenting-phases.jpg', caption: 'Walking through the project phases and deliverables' },
          ].map((photo) => (
            <figure key={photo.src} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={photo.src} alt={photo.caption} className="h-auto w-full" loading="lazy" />
              <figcaption className="px-4 py-3 text-sm text-slate-600">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card-surface card-hover card-accent p-8 pt-9">
          <h2 className="text-xl font-semibold text-brand-dark">Academic focus</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            My work sits at the intersection of engineering design, computational methods, and biomedical applications. I aim to connect rigorous quantitative analysis with clinically meaningful research questions.
          </p>
        </div>
        <div className="card-surface card-hover card-accent p-8 pt-9">
          <h2 className="text-xl font-semibold text-brand-dark">Research philosophy</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            I value reproducibility, transparency, and scientific interpretation. My work focuses on strong methodology, clear communication, and meaningful translational impact.
          </p>
        </div>
      </div>
    </div>
  );
}
