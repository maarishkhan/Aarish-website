import { requireAdminSession } from '@/lib/admin-auth';
import { readAnnouncement } from '@/lib/announcement-store';
import { isEmailConfigured } from '@/lib/email';
import { countConfirmedSubscribers } from '@/lib/subscribers';
import { clearAnnouncementAction, publishAnnouncementAction } from '@/app/admin/announce/actions';

export const dynamic = 'force-dynamic';

const statusMessages: Record<string, string> = {
  published: 'Announcement published. Visitors will see the banner.',
  cleared: 'Banner hidden.',
  empty: 'Write a message first.',
  'not-saved': 'Could not save the announcement. Check the Supabase configuration.',
};

export default async function AnnouncePage({ searchParams }: { searchParams: Promise<{ status?: string; emailed?: string }> }) {
  await requireAdminSession();

  const { status, emailed } = await searchParams;
  const subscriberCount = await countConfirmedSubscribers();
  const emailReady = isEmailConfigured();
  const current = await readAnnouncement();
  const live = current?.active ? current : null;

  return (
    <div className="container-shell section-shell">
      <div className="section-heading mb-6">
        <p className="eyebrow">Announcements</p>
        <h1 className="text-4xl font-semibold tracking-tight text-brand-dark">Announce an update</h1>
      </div>

      {status && statusMessages[status] && (
        <p className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700" role="status">{statusMessages[status]}{emailed !== undefined && ` Emailed ${emailed} subscriber${emailed === '1' ? '' : 's'}.`}</p>
      )}

      <div className="card-surface mb-6 p-6">
        <p className="text-sm text-slate-500">Currently showing</p>
        {live ? (
          <>
            <p className="mt-2 text-slate-900">{live.message}</p>
            {live.link && <p className="mt-1 text-sm text-slate-600">Link: {live.link}</p>}
            <form action={clearAnnouncementAction} className="mt-4">
              <button type="submit" className="btn btn-secondary btn-sm">Hide banner</button>
            </form>
          </>
        ) : (
          <p className="mt-2 text-slate-600">No banner is live.</p>
        )}
      </div>

      <form action={publishAnnouncementAction} className="card-surface space-y-4 p-6">
        <div>
          <label htmlFor="message" className="text-sm font-medium text-slate-700">Message (max 280 characters)</label>
          <textarea id="message" name="message" required maxLength={280} rows={3} defaultValue="" placeholder="Updated: added Global Impact Laboratory and UB ScholarWorks to Experience." className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="link" className="text-sm font-medium text-slate-700">Link (optional, e.g. /experience)</label>
          <input id="link" name="link" type="text" placeholder="/experience" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input type="checkbox" name="sendEmail" disabled={!emailReady || subscriberCount === 0} className="mt-1" />
          <span>
            Also email subscribers ({subscriberCount} confirmed)
            {!emailReady && <span className="block text-xs text-slate-500">Email isn&apos;t configured yet (set RESEND_API_KEY and EMAIL_FROM).</span>}
          </span>
        </label>
        <button type="submit" className="btn btn-primary">Publish announcement</button>
        <p className="text-xs text-slate-500">Publishing replaces the current banner and shows it again to visitors who dismissed the previous one.</p>
      </form>
    </div>
  );
}
