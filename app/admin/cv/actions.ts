'use server';

import { revalidatePath } from 'next/cache';
import type { Route } from 'next';
import { redirect } from 'next/navigation';

import { requireAdminSession } from '@/lib/admin-auth';
import { savePdfUpload } from '@/lib/uploads';
import { experience, awards, skills } from '@/data/site-config';
import { radarKeys, readCvContent, writeCvContent, type CvContent, type CvLeadershipItem } from '@/lib/cv-content-store';

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

/** Blank or invalid input means "automatic"; numbers must be at least `min`. */
function optionalNumber(value: FormDataEntryValue | null, min: number) {
  const text = String(value ?? '').trim();

  if (!text) return undefined;

  const number = Number(text);

  return Number.isFinite(number) && number >= min ? number : undefined;
}

function parseRadar(formData: FormData): CvContent['radar'] {
  const radar: CvContent['radar'] = {};

  for (const key of radarKeys) {
    const value = optionalNumber(formData.get(`radarValue-${key}`), 0);
    const max = optionalNumber(formData.get(`radarMax-${key}`), 1);

    if (value !== undefined || max !== undefined) radar[key] = { value, max };
  }

  return radar;
}

/** Items are stored as "hidden" so that new site content shows on the CV by default. */
function hiddenIds(formData: FormData, field: string, allIds: string[]) {
  const shown = new Set(formData.getAll(field).map(String));

  return allIds.filter((id) => !shown.has(id));
}

export async function saveCvContentAction(formData: FormData) {
  await requireAdminSession();

  const current = await readCvContent();

  let cvPdfUrl = current.cvPdfUrl;
  let cvPdfName = current.cvPdfName;
  const upload = formData.get('cvPdfFile');

  if (formData.get('removeCvPdf') === 'on') {
    cvPdfUrl = '';
    cvPdfName = '';
  }

  if (typeof File !== 'undefined' && upload instanceof File && upload.size > 0) {
    try {
      cvPdfUrl = await savePdfUpload(upload);
      cvPdfName = upload.name;
    } catch (error) {
      console.error('CV PDF upload failed:', error instanceof Error ? error.message : error);
      redirect('/admin/cv?status=upload-error' as Route);
    }
  }

  const saved = await writeCvContent({
    ...current,
    cvPdfUrl,
    cvPdfName,
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    showLinkedin: formData.get('showLinkedin') === 'on',
    showGithub: formData.get('showGithub') === 'on',
    showScholar: formData.get('showScholar') === 'on',
    showOrcid: formData.get('showOrcid') === 'on',
    showRadar: formData.get('showRadar') === 'on',
    radar: parseRadar(formData),
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
