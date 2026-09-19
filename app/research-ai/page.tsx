import { getSiteConfig } from '@/data/site-config';
import { getAiStatus } from '@/lib/content-validation';
import { ResearchChat } from '@/components/ai/research-chat';

export default function ResearchAIPage() {
  const siteConfig = getSiteConfig();
  const aiStatus = getAiStatus(process.env.AI_PROVIDER, process.env.AI_API_KEY);

  return (
    <div className="container-shell section-shell">
      <div className="max-w-3xl">
        <p className="eyebrow">Research AI</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Ask about the research profile</h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          This assistant is intended to answer questions grounded in the researcher’s available website content, including research interests, publications, projects, experience, and academic background.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className={`rounded-2xl border p-4 text-sm ${aiStatus.enabled ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
          {aiStatus.message}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          {siteConfig.features.researchAI
            ? 'AI search is enabled in the site configuration and will use the guarded API fallback until provider credentials are connected.'
            : 'AI search is currently disabled in the site configuration.'}
        </div>
      </div>

      <ResearchChat />
    </div>
  );
}
