import fs from 'fs';
import path from 'path';

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { getServiceClient } from '@/lib/supabase-admin';

const SETTINGS_KEY = 'announcement';

export type Announcement = {
  /** Changes on every announcement so a dismissed banner reappears for new news. */
  id: string;
  message: string;
  link: string;
  active: boolean;
  createdAt: string;
};

type SettingsClient = {
  from: (table: string) => {
    select: (columns: string) => { eq: (column: string, value: string) => { maybeSingle: () => Promise<{ data: { value?: string } | null; error: unknown }> } };
    upsert: (row: Record<string, unknown>, options: { onConflict: string }) => Promise<{ error: { message: string } | null }>;
  };
};

function getFilePath() {
  return path.join(process.cwd(), 'data', 'announcement.json');
}

function parse(raw: unknown): Announcement | null {
  if (!raw || typeof raw !== 'object') return null;

  const source = raw as Record<string, unknown>;
  const message = String(source.message ?? '').trim();

  if (!message) return null;

  return {
    id: String(source.id ?? ''),
    message: message.slice(0, 280),
    link: String(source.link ?? '').trim(),
    active: source.active !== false,
    createdAt: String(source.createdAt ?? ''),
  };
}

/** Only same-site paths and http(s) URLs are allowed as banner links. */
export function sanitizeLink(link: string) {
  const value = link.trim();

  if (value.startsWith('/') && !value.startsWith('//')) return value;

  try {
    const url = new URL(value);

    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
}

export async function readAnnouncement(): Promise<Announcement | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient() as unknown as SettingsClient | null;

    if (supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('value').eq('key', SETTINGS_KEY).maybeSingle();

        if (!error && data?.value) return parse(JSON.parse(data.value));
      } catch {
        // fall back to the local file below
      }
    }
  }

  try {
    const filePath = getFilePath();

    if (!fs.existsSync(filePath)) return null;

    return parse(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
  } catch {
    return null;
  }
}

/** Returns false when the announcement could not be stored anywhere. */
export async function writeAnnouncement(input: { message: string; link: string; active: boolean }): Promise<boolean> {
  const value: Announcement = {
    id: Date.now().toString(36),
    message: input.message.trim().slice(0, 280),
    link: sanitizeLink(input.link),
    active: input.active,
    createdAt: new Date().toISOString(),
  };
  const supabase = (getServiceClient() ?? (isSupabaseConfigured() ? getSupabaseClient() : null)) as unknown as SettingsClient | null;
  let savedRemotely = false;

  if (supabase) {
    const { error } = await supabase.from('site_settings').upsert({ key: SETTINGS_KEY, value: JSON.stringify(value) }, { onConflict: 'key' });

    if (error) console.error('Could not save announcement to Supabase:', error.message);
    else savedRemotely = true;
  }

  try {
    fs.writeFileSync(getFilePath(), `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
    return true;
  } catch {
    return savedRemotely;
  }
}
