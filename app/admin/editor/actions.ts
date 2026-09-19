'use server';

import fs from 'node:fs';
import path from 'node:path';

import { redirect } from 'next/navigation';

import { readSiteContent, writeSiteContent } from '@/lib/site-content-store';

const templateSectionKeys = [
  'researchInterests',
  'featuredResearch',
  'publications',
  'experience',
  'education',
  'awards',
  'presentations',
  'blog',
  'researchAI',
] as const;

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return typeof File !== 'undefined' && value instanceof File && value.size > 0;
}

async function saveUploadedImage(value: FormDataEntryValue | null, fallbackValue?: string) {
  if (!isUploadedFile(value)) {
    return fallbackValue ?? '';
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });

  const extension = path.extname(value.name) || '.png';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`;
  const targetPath = path.join(uploadDir, filename);

  const buffer = Buffer.from(await value.arrayBuffer());
  fs.writeFileSync(targetPath, buffer);

  return `/uploads/${filename}`;
}

export async function saveSiteContentAction(formData: FormData) {
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
    features: {
      research: formData.get('feature-research') === 'on',
      publications: formData.get('feature-publications') === 'on',
      blog: formData.get('feature-blog') === 'on',
      researchAI: formData.get('feature-researchAI') === 'on',
    },
  };

  await writeSiteContent(nextContent);
  redirect('/admin/editor');
}
