import fs from 'node:fs';
import path from 'node:path';

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export type TemplateSection = {
  key: string;
  label: string;
  enabled: boolean;
};

export type PersistedSiteContent = {
  name: string;
  title: string;
  headline: string;
  bio: string;
  university: string;
  location: string;
  email: string;
  phone?: string;
  profileImage?: string;
  heroImage?: string;
  theme: {
    accent: string;
    accentSoft: string;
    secondary: string;
    secondarySoft: string;
  };
  socials: {
    github?: string;
    linkedin?: string;
    medium?: string;
    scholar?: string;
    orcid?: string;
    researchgate?: string;
  };
  navItems: { label: string; href: string; enabled: boolean }[];
  templateSections: TemplateSection[];
  features: {
    research: boolean;
    publications: boolean;
    blog: boolean;
    researchAI: boolean;
  };
};

export const defaultSiteContent: PersistedSiteContent = {
  name: 'M Aarish Khan',
  title: 'Biomedical Engineering Researcher',
  headline: 'Translational biomedical engineering for diagnostics, devices, and patient-centered innovation.',
  bio: 'I design and investigate biomedical technologies that connect engineering creativity with clinical impact, with a focus on computational biology, biomaterials, imaging, and human-centered medical systems.',
  university: 'University at Buffalo Honors College and Jacobs School of Medicine and Biomedical Sciences',
  location: 'Buffalo, NY, USA',
  email: 'admin@university.edu',
  phone: '+1 (555) 426-9186',
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
  theme: {
    accent: '#1f5eff',
    accentSoft: '#dfe8ff',
    secondary: '#8b5cf6',
    secondarySoft: '#ede9fe',
  },
  socials: {
    github: 'https://github.com/Aarishkhan08',
    linkedin: 'www.linkedin.com/in/mak08',
    medium: 'https://medium.com/@kmohammadaarish',
    scholar: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ImyaSdAAAAAJ&authuser=1&citation_for_view=ImyaSdAAAAAJ:u5HHmVD_uO8C',
    orcid: 'https://orcid.org/0009-0000-6041-780X',
    researchgate: 'https://www.researchgate.net',
  },
  navItems: [
    { label: 'Home', href: '/', enabled: true },
    { label: 'About', href: '/about', enabled: true },
    { label: 'Research', href: '/research', enabled: true },
    { label: 'Projects', href: '/projects', enabled: true },
    { label: 'Publications', href: '/publications', enabled: true },
    { label: 'Experience', href: '/experience', enabled: true },
    { label: 'Education', href: '/education', enabled: true },
    { label: 'Skills', href: '/skills', enabled: true },
    { label: 'Awards', href: '/awards', enabled: true },
    { label: 'Presentations', href: '/presentations', enabled: true },
    { label: 'Blog', href: '/blog', enabled: true },
    { label: 'CV', href: '/cv', enabled: true },
    { label: 'Contact', href: '/contact', enabled: true },
    { label: 'Research AI', href: '/research-ai', enabled: true },
  ],
  templateSections: [
    { key: 'researchInterests', label: 'Research interests', enabled: true },
    { key: 'featuredResearch', label: 'Featured research', enabled: true },
    { key: 'publications', label: 'Publications', enabled: true },
    { key: 'experience', label: 'Experience', enabled: true },
    { key: 'education', label: 'Education', enabled: true },
    { key: 'awards', label: 'Awards', enabled: true },
    { key: 'presentations', label: 'Presentations', enabled: true },
    { key: 'blog', label: 'Blog', enabled: true },
    { key: 'researchAI', label: 'Research AI', enabled: true },
  ],
  features: {
    research: true,
    publications: true,
    blog: true,
    researchAI: true,
  },
};

export function getSiteContentPath() {
  return path.join(process.cwd(), 'data', 'site-content.json');
}

function mergeContent(parsed: Partial<PersistedSiteContent> | null): PersistedSiteContent {
  return {
    ...defaultSiteContent,
    ...(parsed ?? {}),
    theme: {
      ...defaultSiteContent.theme,
      ...((parsed?.theme ?? {}) as Record<string, string | undefined>),
    },
    socials: {
      ...defaultSiteContent.socials,
      ...((parsed?.socials ?? {}) as Record<string, string | undefined>),
    },
    navItems: Array.isArray(parsed?.navItems) && parsed.navItems.length > 0 ? parsed.navItems : defaultSiteContent.navItems,
    templateSections:
      Array.isArray(parsed?.templateSections) && parsed.templateSections.length > 0
        ? parsed.templateSections
        : defaultSiteContent.templateSections,
    features: {
      ...defaultSiteContent.features,
      ...(parsed?.features ?? {}),
    },
  };
}

export async function readSiteContent(): Promise<PersistedSiteContent> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient() as {
      from: (table: string) => {
        select: (column: string) => {
          eq: (column: string, value: string) => {
            maybeSingle: () => Promise<{
              data: { value?: string } | null;
              error: { message?: string } | null;
            }>;
          };
        };
      };
    } | null;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'site_content')
          .maybeSingle();

        if (!error && data?.value) {
          try {
            return mergeContent(JSON.parse(data.value));
          } catch {
            return defaultSiteContent;
          }
        }
      } catch {
        // fall back to local file storage below
      }
    }
  }

  try {
    const filePath = getSiteContentPath();
    if (!fs.existsSync(filePath)) {
      return defaultSiteContent;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<PersistedSiteContent>;
    return mergeContent(parsed);
  } catch {
    return defaultSiteContent;
  }
}

export async function writeSiteContent(content: Partial<PersistedSiteContent>) {
  const nextValue = {
    ...defaultSiteContent,
    ...content,
    theme: {
      ...defaultSiteContent.theme,
      ...(content.theme ?? {}),
    },
    socials: {
      ...defaultSiteContent.socials,
      ...(content.socials ?? {}),
    },
    navItems: content.navItems ?? defaultSiteContent.navItems,
    templateSections: content.templateSections ?? defaultSiteContent.templateSections,
    features: {
      ...defaultSiteContent.features,
      ...(content.features ?? {}),
    },
  };

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient() as {
      from: (table: string) => {
        upsert: (
          row: { key: string; value: string },
          options: { onConflict: string }
        ) => Promise<unknown>;
      };
    } | null;

    if (supabase) {
      try {
        const payload = JSON.stringify(nextValue);
        await supabase
          .from('site_settings')
          .upsert({ key: 'site_content', value: payload }, { onConflict: 'key' });
      } catch {
        // continue with the local file sync below so the change is still preserved
      }
    }
  }

  const filePath = getSiteContentPath();
  fs.writeFileSync(filePath, `${JSON.stringify(nextValue, null, 2)}\n`, 'utf-8');
  return nextValue;
}
