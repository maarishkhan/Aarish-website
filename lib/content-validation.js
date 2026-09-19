import { z } from 'zod';

const navItemSchema = z.object({
  label: z.string().trim().min(1),
  href: z.string().min(1),
  enabled: z.boolean().default(true),
});

const featureSchema = z.object({
  research: z.boolean().default(true),
  publications: z.boolean().default(true),
  blog: z.boolean().default(true),
  researchAI: z.boolean().default(false),
});

export const siteConfigSchema = z.object({
  name: z.string().trim().min(2),
  title: z.string().trim().min(2),
  headline: z.string().trim().min(2),
  bio: z.string().trim().min(20),
  university: z.string().trim().min(2),
  location: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  socials: z.object({
    github: z.string().trim().url().optional(),
    linkedin: z.string().trim().url().optional(),
    scholar: z.string().trim().url().optional(),
    orcid: z.string().trim().url().optional(),
    researchgate: z.string().trim().url().optional(),
  }).passthrough(),
  navItems: z.array(navItemSchema).default([]),
  features: featureSchema,
});

export function validateSiteConfig(input = {}) {
  const normalized = {
    ...input,
    name: input.name?.trim(),
    title: input.title?.trim(),
    headline: input.headline?.trim(),
    bio: input.bio?.trim(),
    university: input.university?.trim(),
    location: input.location?.trim(),
    email: input.email?.trim(),
    phone: input.phone?.trim(),
    socials: {
      ...(input.socials ?? {}),
      github: input.socials?.github?.trim(),
      linkedin: input.socials?.linkedin?.trim(),
      scholar: input.socials?.scholar?.trim(),
      orcid: input.socials?.orcid?.trim(),
      researchgate: input.socials?.researchgate?.trim(),
    },
    navItems: Array.isArray(input.navItems) ? input.navItems.map((navItem) => ({
      ...navItem,
      label: navItem.label?.trim(),
      href: navItem.href?.trim(),
      enabled: navItem.enabled ?? true,
    })) : [],
    features: {
      research: input.features?.research ?? true,
      publications: input.features?.publications ?? true,
      blog: input.features?.blog ?? true,
      researchAI: input.features?.researchAI ?? false,
    },
  };

  return siteConfigSchema.parse(normalized);
}

export function getAiStatus(provider = process.env.AI_PROVIDER ?? 'none', apiKey = process.env.AI_API_KEY ?? '') {
  const normalizedProvider = String(provider ?? 'none').trim().toLowerCase();
  const hasApiKey = Boolean(String(apiKey ?? '').trim());

  if (normalizedProvider === 'none' || !hasApiKey) {
    return {
      enabled: false,
      provider: normalizedProvider,
      message: 'Research AI is not configured and is currently unavailable.',
    };
  }

  return {
    enabled: true,
    provider: normalizedProvider,
    message: 'Research AI is configured and ready to respond to questions.',
  };
}
