'use server';

import { revalidatePath } from 'next/cache';
import type { Route } from 'next';
import { redirect } from 'next/navigation';

import { requireAdminSession } from '@/lib/admin-auth';
import { experience, awards, skills } from '@/data/site-config';
import { readCvContent, writeCvContent, type CvLeadershipItem } from '@/lib/cv-content-store';

function lines(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseLeadership(value: FormDataEntryValue | null): CvLeadershipItem[] {
  return lines(value).map((line) => {
    const [organization = '', role = '', ...noteParts] = line.split('|').map((part) => part.trim());
    const note = noteParts.join(' | ');

    return { organization, role, ...(note ? { note } : {}) };
  }).filter((item) => item.organization);
}

/** Items are stored as "hidden" so that new site content shows on the CV by default. */
function hiddenIds(formData: FormData, field: string, allIds: string[]) {
  const shown = new Set(formData.getAll(field).map(String));

  return allIds.filter((id) => !shown.has(id));
}

export async function saveCvContentAction(formData: FormData) {
  await requireAdminSession();

  const current = await readCvContent();

  const saved = await writeCvContent({
    ...current,
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    showLinkedin: formData.get('showLinkedin') === 'on',
    showGithub: formData.get('showGithub') === 'on',
    showScholar: formData.get('showScholar') === 'on',
    showOrcid: formData.get('showOrcid') === 'on',
    conferences: lines(formData.get('conferences')),
    certifications: lines(formData.get('certifications')),
    leadership: parseLeadership(formData.get('leadership')),
    hiddenExperience: hiddenIds(formData, 'showExperience', experience.map((item) => item.id)),
    hiddenAwards: hiddenIds(formData, 'showAwards', awards.map((item) => item.id)),
    hiddenSkills: hiddenIds(formData, 'showSkills', skills.map((item) => item.id)),
  });

  if (!saved) redirect('/admin/cv?status=not-saved' as Route);

  revalidatePath('/', 'layout');
  redirect('/admin/cv?status=saved' as Route);
}
