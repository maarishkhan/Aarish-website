export function buildAiPrompt(prompt?: string): string;

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
  embeddingModel: string;
  enabled: boolean;
};

export async function callAiProvider(prompt?: string): {
  answer: string;
  provider: string;
  status: string;
  message: string;
};
