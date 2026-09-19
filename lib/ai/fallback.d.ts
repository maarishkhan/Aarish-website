export function buildResearchContextSummary(): {
  profile: {
    name: string;
    title: string;
    university: string;
    location: string;
  };
  interests: string[];
  projects: string[];
  publications: string[];
};

export function getFallbackAiResponse(prompt?: string): string;
