import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'About',
  description: 'About Mohammad Aarish Khan, a first-year biomedical engineering student in the University at Buffalo Honors College.',
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="About" title="Student profile and academic direction" />

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
        <h2 className="mt-2 text-2xl font-semibold text-brand-dark">Presenting and recognition</h2>
        <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
          {[
            { src: '/uploads/acs-nerd-poster-presentation.jpg', alt: 'Presenting the bispecific antibody research poster at ACS NERD 2025', caption: 'Presenting at the ACS Northeast Regional Discussion (NERD) 2025' },
            { src: '/uploads/terra-science-fair-medal.jpg', alt: 'Receiving the Medal of High Honors and the Office of Naval Research Award at the Terra Science Fair', caption: 'Terra Science Fair: Medal of High Honors and Office of Naval Research Award' },
          ].map((photo) => (
            <figure key={photo.src} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={photo.src} alt={photo.alt} className="h-auto w-full" loading="lazy" />
              <figcaption className="px-4 py-3 text-sm text-slate-600">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card-surface card-hover card-accent p-8 pt-9">
          <h2 className="text-xl font-semibold text-brand-dark">Academic focus</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Biomedical engineering, computational genetics, synthetic biology, and genomic medicine, with an emphasis on translating scientific discoveries into accessible, real-world solutions.
          </p>
        </div>
        <div className="card-surface card-hover card-accent p-8 pt-9">
          <h2 className="text-xl font-semibold text-brand-dark">Research philosophy</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            I’m driven by the idea that scientific breakthroughs matter most when they move beyond the lab. I seek to make science not only more understandable, but more accessible and impactful in the lives of others.
          </p>
        </div>
      </div>
    </div>
  );
}
