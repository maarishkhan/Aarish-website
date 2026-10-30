export type AiSource = { label: string; href: string };
export type KnowledgeSection = { title: string; text: string; sources?: AiSource[] };

export function sectionsToContext(sections?: KnowledgeSection[]): string;
export function buildSystemPrompt(sections?: KnowledgeSection[]): string;
export function buildAiPrompt(prompt?: string, sections?: KnowledgeSection[]): string;
export function answerFromSections(prompt?: string, sections?: KnowledgeSection[]): string;
export function sourcesForQuestion(prompt?: string, sections?: KnowledgeSection[]): AiSource[];

export function getConfiguredAiProvider(
  provider?: string,
  apiKey?: string,
  model?: string,
): {
  enabled: boolean;
  provider: string;
  model: string;
  message: string;
};

export function getAiProviderStatus(): {
  enabled: boolean;
  provider: string;
  message: string;
};

export function getAiConfig(): {
  provider: string;
  model: string;
  enabled: boolean;
};

export function callAiProvider(
  prompt?: string,
  sections?: KnowledgeSection[],
): Promise<{
  answer: string;
  provider: string;
  status: 'live' | 'fallback';
  message: string;
  sources: AiSource[];
}>;
