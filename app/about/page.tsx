import { getSiteConfig } from '@/data/site-config';

export default function AboutPage() {
  const siteConfig = getSiteConfig();
  return (
    <div className="container-shell section-shell">
      <div className="max-w-4xl">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Researcher profile and academic direction</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">{siteConfig.bio}</p>
      </div>
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
