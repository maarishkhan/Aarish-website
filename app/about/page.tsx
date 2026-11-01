import Image from 'next/image';
import Link from 'next/link';
import { awards, getSiteConfig } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'About',
  description: 'About Mohammad Aarish Khan, a first-year biomedical engineering student in the University at Buffalo Honors College.',
  alternates: { canonical: '/about' },
};

const FAQ = [
  {
    question: 'Who is Mohammad Aarish Khan?',
    answer: 'Mohammad Aarish Khan is a first-year biomedical engineering student in the University at Buffalo Honors College who works on computational genetics, synthetic biology and cancer immunotherapy.',
  },
  {
    question: 'What has Mohammad Aarish Khan published?',
    answer: 'He is first author of the conference paper "Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T-Cells for Immunotherapy in NSCLC", published at the 2025 IEEE Integrated STEM Education Conference (ISEC) with Gaurav Sharma.',
  },
  {
    question: 'What research does he do?',
    answer: 'He designs bispecific antibodies for cancer immunotherapy (the DuoDok pipeline), analyses genome-wide association data on neurological conditions at the Williams Lab in the Jacobs School of Medicine and Biomedical Sciences, University at Buffalo, and works on low-cost UV water purification with Nushoor.',
  },
  {
    question: 'What awards has he received?',
    answer: `He has received ${awards.length} awards and honors, including Emerging Student Researcher of the Year from the New York Academy of Sciences (2025), the Outstanding Poster Presentation Award at ACS NERD 2025, and the Medal of High Honors at the Terra Science Fair (2025).`,
  },
  {
    question: 'Where has he presented his work?',
    answer: 'He has presented at the NASA SmallSat Education Conference at Kennedy Space Center, ACS NERD, IFoRE, IEEE ISEC and the Terra Science Fair.',
  },
];

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };

  return (
    <div className="container-shell section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />
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

      <section className="mt-16" aria-labelledby="graduate-spotlight-title">
        <p className="eyebrow">Speaker Series</p>
        <h2 id="graduate-spotlight-title" className="mt-2 text-2xl font-semibold text-brand-dark">Portrait of a Graduate: Creative Innovator and Critical Thinker</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          A profile highlighting curiosity, creativity, and student experiences, created by the Williamsville Central School District and PTSA.
        </p>
        <a href="https://www.williamsvillek12.org/departments/instruction/portrait-of-a-graduate/portrait-of-a-graduate-speaker-series" target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-medium text-brand underline underline-offset-4">
          View the Williamsville Speaker Series
        </a>
        <video
          className="mt-5 aspect-video w-full rounded-2xl bg-slate-950 shadow-sm"
          controls
          preload="metadata"
          playsInline
          aria-label="Speaker Series profile: Portrait of a Graduate, Creative Innovator and Critical Thinker"
        >
          <source src="/uploads/Catalyst.mp4" type="video/mp4" />
          <track kind="captions" src="/captions/catalyst.en.vtt" srcLang="en" label="English" default />
          Your browser does not support embedded video. You can <a href="/uploads/Catalyst.mp4">open the video directly</a>.
        </video>
        <p className="mt-3 text-sm text-slate-600">
          <a href="/transcripts/catalyst.txt" className="font-medium text-brand underline underline-offset-4">Read the transcript</a>
        </p>
      </section>

      <section className="mt-16">
        <p className="eyebrow">Gallery</p>
        <h2 className="mt-2 text-2xl font-semibold text-brand-dark">Research and school moments</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src="/uploads/acs-nerd-poster-presentation.jpg" alt="Presenting the bispecific antibody research poster at ACS NERD 2025" className="h-auto w-full" loading="lazy" />
            <figcaption className="px-4 py-3 text-sm text-slate-600">Presenting at the ACS Northeast Regional Discussion (NERD) 2025</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src="/uploads/myPhoto-gallery.webp" alt="Seated in a classroom with classmates" className="aspect-[5/3] w-full object-cover object-center" loading="lazy" />
            <figcaption className="px-4 py-3 text-sm text-slate-600">A moment from school</figcaption>
          </figure>
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
      <section className="mt-16" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold text-brand-dark">Frequently asked questions</h2>
        <dl className="mt-6 grid gap-5 md:grid-cols-2">
          {FAQ.map((item) => (
            <div key={item.question} className="card-surface p-6">
              <dt className="font-semibold text-brand-dark">{item.question}</dt>
              <dd className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-slate-600">
          More questions? <Link href="/research-ai" className="font-medium text-brand underline underline-offset-4">Ask the Research AI</Link>.
        </p>
      </section>
    </div>
  );
}
