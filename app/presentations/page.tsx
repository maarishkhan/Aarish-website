import { presentations } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'Presentations and Posters',
  description: 'Conference talks and research posters presented at IFoRE, ACS NERD, SmallSat, and IEEE ISEC.',
  alternates: { canonical: '/presentations' },
};

export default function PresentationsPage() {
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Presentations" title="Talks, posters, and scholarly communication" />
      <article className="card-surface overflow-hidden border-l-4 border-l-gold">
        <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Conference presentation · 2025</p>
            <h2 className="mt-2 text-2xl font-semibold text-brand-dark">SmallSat Education Conference at NASA Kennedy Space Center</h2>
            <p className="mt-2 text-sm text-slate-600">October 25–26, 2025 · Kennedy Space Center, Florida</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Presented findings from SOLARIS, a high-altitude balloon payload studying how solar-panel efficiency varies with altitude. Watch the conference presentation below.
            </p>
          </div>
          <video
            className="aspect-video w-full rounded-xl bg-slate-950 shadow-sm"
            controls
            preload="metadata"
            playsInline
            aria-label="Presentation at the 2025 SmallSat Education Conference at NASA Kennedy Space Center"
          >
            <source src="/uploads/my-presentation-nasa.mp4" type="video/mp4" />
            <track kind="captions" src="/captions/nasa-presentation.en.vtt" srcLang="en" label="English" default />
            Your browser does not support embedded video. You can <a href="/uploads/my-presentation-nasa.mp4">open the presentation video</a> directly.
          </video>
          <p className="text-sm text-slate-600 lg:col-span-2">
            <a href="/transcripts/nasa-presentation.txt" className="font-medium text-brand underline underline-offset-4">Read the transcript</a>
          </p>
        </div>
      </article>
      <div className="space-y-5">
        {presentations.map((presentation) => (
          <article key={presentation.id} className="card-surface card-hover border-l-4 border-l-gold p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{presentation.presentationType}</p>
            <h2 className="mt-2 text-2xl font-semibold text-brand-dark">{presentation.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{[presentation.event, presentation.location].filter(Boolean).join(' • ')}</p>
            <p className="mt-2 text-sm text-slate-500">{presentation.date}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{presentation.abstract}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
