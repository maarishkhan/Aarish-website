import Image from 'next/image';
import { getSiteConfig } from '@/data/site-config';

export const metadata = { title: 'About' };

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="container-shell section-shell">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="max-w-3xl">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Researcher profile and academic direction</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{siteConfig.bio}</p>
        </div>
        <figure className="order-first mx-auto w-full max-w-[20rem] md:order-none">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image src="/uploads/headshot.jpg" alt={siteConfig.name} fill sizes="320px" className="object-cover object-top" priority />
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-500">{siteConfig.name}</figcaption>
        </figure>
      </div>
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">Presenting research</h2>
        <div className="mt-4 gap-4 sm:columns-2">
          {[
            { src: '/uploads/poster-with-coauthor.jpg', caption: 'Presenting at the ACS NERD poster session' },
            { src: '/uploads/smallsat-kennedy-space-center.jpg', caption: 'SmallSat Education Conference, Kennedy Space Center (NASA)' },
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
        <div className="card-surface p-8">
          <h2 className="text-xl font-semibold text-slate-900">Academic focus</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            My work sits at the intersection of engineering design, computational methods, and biomedical applications. I aim to connect rigorous quantitative analysis with clinically meaningful research questions.
          </p>
        </div>
        <div className="card-surface p-8">
          <h2 className="text-xl font-semibold text-slate-900">Research philosophy</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            I value reproducibility, transparency, and scientific interpretation. My work focuses on strong methodology, clear communication, and meaningful translational impact.
          </p>
        </div>
      </div>
    </div>
  );
}
