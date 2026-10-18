import { ResearchChat } from '@/components/ai/research-chat';

export const metadata = {
  title: 'Research AI',
  description: 'Ask questions about the research, publications, and experience featured on this website.',
};

export default function ResearchAIPage() {
  return (
    <div className="container-shell section-shell">
      <div className="max-w-3xl">
        <p className="eyebrow">Research AI</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Ask about the research profile</h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          An assistant that answers questions using only the content of this website: research projects, publications, experience, education, skills, and awards.
        </p>
      </div>

      <ResearchChat />
    </div>
  );
}
