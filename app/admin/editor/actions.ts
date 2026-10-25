'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdminSession } from '@/lib/admin-auth';
import { saveImageUpload } from '@/lib/uploads';
import { readSiteContent, writeSiteContent } from '@/lib/site-content-store';

const templateSectionKeys = ['researchInterests', 'featuredResearch', 'publications', 'researchAI'] as const;

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return typeof File !== 'undefined' && value instanceof File && value.size > 0;
}

async function saveUploadedImage(value: FormDataEntryValue | null, fallbackValue?: string) {
  if (!isUploadedFile(value)) {
    return fallbackValue ?? '';
  }

  return saveImageUpload(value);
}

export async function saveSiteContentAction(formData: FormData) {
  await requireAdminSession();

  const currentContent = await readSiteContent();

  const navItems = currentContent.navItems.map((item, index) => ({
    label: String(formData.get(`navLabel-${index}`) ?? item.label),
    href: String(formData.get(`navHref-${index}`) ?? item.href),
    enabled: formData.get(`navEnabled-${index}`) === 'on',
  }));

  const templateSections = templateSectionKeys.map((key) => ({
    key,
    label: String(formData.get(`templateLabel-${key}`) ?? currentContent.templateSections.find((section) => section.key === key)?.label ?? key),
    enabled: formData.get(`templateSection-${key}`) === 'on',
  }));

  const profileImage = await saveUploadedImage(formData.get('profileImageFile'), currentContent.profileImage ?? '');
  const heroImage = await saveUploadedImage(formData.get('heroImageFile'), currentContent.heroImage ?? '');

  const nextContent = {
    name: String(formData.get('name') ?? currentContent.name),
    title: String(formData.get('title') ?? currentContent.title),
    headline: String(formData.get('headline') ?? currentContent.headline),
    bio: String(formData.get('bio') ?? currentContent.bio),
    university: String(formData.get('university') ?? currentContent.university),
    location: String(formData.get('location') ?? currentContent.location),
    email: String(formData.get('email') ?? currentContent.email),
    phone: String(formData.get('phone') ?? currentContent.phone ?? ''),
    profileImage,
    heroImage,
    socials: {
      github: String(formData.get('github') ?? currentContent.socials.github ?? ''),
      linkedin: String(formData.get('linkedin') ?? currentContent.socials.linkedin ?? ''),
      medium: String(formData.get('medium') ?? currentContent.socials.medium ?? ''),
      scholar: String(formData.get('scholar') ?? currentContent.socials.scholar ?? ''),
      orcid: String(formData.get('orcid') ?? currentContent.socials.orcid ?? ''),
      researchgate: String(formData.get('researchgate') ?? currentContent.socials.researchgate ?? ''),
    },
    navItems,
    templateSections,
    features: currentContent.features,
  };

  await writeSiteContent(nextContent);
  revalidatePath('/', 'layout');
  redirect('/admin/editor');
}
