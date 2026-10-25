import fs from 'fs';
import path from 'path';

import { cvConferences, cvLeadership, cvWorkshopsAndCertifications } from '@/data/site-config';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { getServiceClient } from '@/lib/supabase-admin';

export type CvLeadershipItem = { organization: string; role: string; note?: string };

/** Settings that only affect the CV. Everything not listed here is read straight from the site's own content. */
export type CvContent = {
  /** Blank means "use the site email". */
  email: string;
  /** Blank means the phone number is left off the CV. */
  phone: string;
  showLinkedin: boolean;
  showGithub: boolean;
  showScholar: boolean;
  showOrcid: boolean;
  conferences: string[];
  certifications: string[];
  leadership: CvLeadershipItem[];
  hiddenExperience: string[];
  hiddenAwards: string[];
  hiddenSkills: string[];
};

const SETTINGS_KEY = 'cv_content';

type SettingsClient = {
  from: (table: string) => {
    select: (column: string) => {
      eq: (column: string, value: string) => {
        maybeSingle: () => Promise<{ data: { value?: string } | null; error: { message?: string } | null }>;
      };
    };
    upsert: (row: { key: string; value: string }, options: { onConflict: string }) => Promise<{ error: { message?: string } | null }>;
  };
};

export const defaultCvContent: CvContent = {
  email: '',
  phone: '',
  showLinkedin: true,
  showGithub: true,
  showScholar: true,
  showOrcid: true,
  conferences: cvConferences,
  certifications: cvWorkshopsAndCertifications,
  leadership: cvLeadership,
  hiddenExperience: [],
  hiddenAwards: [],
  hiddenSkills: [],
};

function getCvContentPath() {
  return path.join(process.cwd(), 'data', 'cv-content.json');
}

function asStringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : fallback;
}

function mergeCvContent(parsed: Partial<CvContent> | null): CvContent {
  const source = parsed ?? {};

  return {
    email: typeof source.email === 'string' ? source.email : defaultCvContent.email,
    phone: typeof source.phone === 'string' ? source.phone : defaultCvContent.phone,
    showLinkedin: typeof source.showLinkedin === 'boolean' ? source.showLinkedin : defaultCvContent.showLinkedin,
    showGithub: typeof source.showGithub === 'boolean' ? source.showGithub : defaultCvContent.showGithub,
    showScholar: typeof source.showScholar === 'boolean' ? source.showScholar : defaultCvContent.showScholar,
    showOrcid: typeof source.showOrcid === 'boolean' ? source.showOrcid : defaultCvContent.showOrcid,
    conferences: asStringArray(source.conferences, defaultCvContent.conferences),
    certifications: asStringArray(source.certifications, defaultCvContent.certifications),
    leadership: Array.isArray(source.leadership)
      ? source.leadership.filter((item) => item && typeof item.organization === 'string' && typeof item.role === 'string')
      : defaultCvContent.leadership,
    hiddenExperience: asStringArray(source.hiddenExperience, []),
    hiddenAwards: asStringArray(source.hiddenAwards, []),
    hiddenSkills: asStringArray(source.hiddenSkills, []),
  };
}

export async function readCvContent(): Promise<CvContent> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient() as unknown as SettingsClient | null;

    if (supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('value').eq('key', SETTINGS_KEY).maybeSingle();

        if (!error && data?.value) {
          return mergeCvContent(JSON.parse(data.value));
        }
      } catch {
        // fall back to the local file below
      }
    }
  }

  try {
    const filePath = getCvContentPath();

    if (!fs.existsSync(filePath)) return defaultCvContent;

    return mergeCvContent(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
  } catch {
    return defaultCvContent;
  }
}

/** Returns false when the change could not be stored anywhere (for example, a read-only host without Supabase). */
export async function writeCvContent(content: CvContent): Promise<boolean> {
  const nextValue = mergeCvContent(content);
  const supabase = (getServiceClient() ?? (isSupabaseConfigured() ? getSupabaseClient() : null)) as unknown as SettingsClient | null;
  let savedRemotely = false;

  if (supabase) {
    const { error } = await supabase.from('site_settings').upsert({ key: SETTINGS_KEY, value: JSON.stringify(nextValue) }, { onConflict: 'key' });

    if (error) {
      console.error('Could not save CV content to Supabase:', error.message);
    } else {
      savedRemotely = true;
    }
  }

  try {
    fs.writeFileSync(getCvContentPath(), `${JSON.stringify(nextValue, null, 2)}\n`, 'utf-8');
    return true;
  } catch {
    // Hosted file systems are read-only; that is fine as long as the database save worked.
    return savedRemotely;
  }
}
