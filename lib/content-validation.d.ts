export type SiteConfigInput = {
  name?: string;
  title?: string;
  headline?: string;
  bio?: string;
  university?: string;
  location?: string;
  email?: string;
  phone?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    scholar?: string;
    orcid?: string;
    researchgate?: string;
  };
  navItems?: Array<{
    label?: string;
    href?: string;
    enabled?: boolean;
  }>;
  features?: {
    research?: boolean;
    publications?: boolean;
    blog?: boolean;
    researchAI?: boolean;
  };
};

export type AiStatus = {
  enabled: boolean;
  provider: string;
  message: string;
};

export function validateSiteConfig(input?: SiteConfigInput): SiteConfigInput;
export function getAiStatus(provider?: string, apiKey?: string): AiStatus;
