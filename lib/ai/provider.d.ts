export type KnowledgeSection = { title: string; text: string };

export function sectionsToContext(sections?: KnowledgeSection[]): string;
export function buildSystemPrompt(sections?: KnowledgeSection[]): string;
export function buildAiPrompt(prompt?: string, sections?: KnowledgeSection[]): string;
export function answerFromSections(prompt?: string, sections?: KnowledgeSection[]): string;

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
}>;
