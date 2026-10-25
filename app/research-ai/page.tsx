import { PageHeader } from '@/components/layout/page-header';
import { ResearchChat } from '@/components/ai/research-chat';

export const metadata = {
  title: 'Research AI',
  description: 'Ask questions about the research, publications, and experience featured on this website.',
  alternates: { canonical: '/research-ai' },
};

export default function ResearchAIPage() {
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Research AI" title="Ask about the research profile" intro="An assistant that answers questions using only the content of this website: research projects, publications, experience, education, skills, and awards." />

      <ResearchChat />
    </div>
  );
}
