'use server';

import { revalidatePath } from 'next/cache';
import type { Route } from 'next';
import { redirect } from 'next/navigation';

import { requireAdminSession } from '@/lib/admin-auth';
import { readAnnouncement, writeAnnouncement } from '@/lib/announcement-store';
import { emailAnnouncement } from '@/lib/subscribers';

export async function publishAnnouncementAction(formData: FormData) {
  await requireAdminSession();

  const message = String(formData.get('message') ?? '').trim();

  if (!message) redirect('/admin/announce?status=empty' as Route);

  const saved = await writeAnnouncement({ message, link: String(formData.get('link') ?? ''), active: true });

  if (!saved) redirect('/admin/announce?status=not-saved' as Route);

  revalidatePath('/', 'layout');

  if (formData.get('sendEmail') === 'on') {
    const sent = await emailAnnouncement(message, String(formData.get('link') ?? '').trim());

    redirect(`/admin/announce?status=published&emailed=${sent}` as Route);
  }

  redirect('/admin/announce?status=published' as Route);
}

export async function clearAnnouncementAction() {
  await requireAdminSession();

  const current = await readAnnouncement();

  if (current) await writeAnnouncement({ message: current.message, link: current.link, active: false });

  revalidatePath('/', 'layout');
  redirect('/admin/announce?status=cleared' as Route);
}
