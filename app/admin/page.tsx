import Link from 'next/link';
import { getSiteConfig } from '@/data/site-config';
import { getAiStatus } from '@/lib/content-validation';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function AdminPage() {
  const siteConfig = getSiteConfig();
  const aiStatus = getAiStatus(process.env.AI_PROVIDER, process.env.AI_API_KEY);
  const databaseReady = isSupabaseConfigured();

  return (
    <div className="container-shell section-shell">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="section-heading">
          <p className="eyebrow">Admin overview</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Content management dashboard</h1>
        </div>
        <Link href="/admin/editor" className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
          Open editor
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="card-surface p-6">
          <p className="text-sm text-slate-500">Site profile</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-slate-600">{siteConfig.university}</p>
        </div>
        <div className="card-surface p-6">
          <p className="text-sm text-slate-500">Database</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{databaseReady ? 'Connected' : 'Pending'}</p>
          <p className="mt-2 text-sm text-slate-600">Supabase credentials are {databaseReady ? 'available' : 'not configured yet'}.</p>
        </div>
        <div className="card-surface p-6">
          <p className="text-sm text-slate-500">AI layer</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{aiStatus.enabled ? 'Enabled' : 'Offline'}</p>
          <p className="mt-2 text-sm text-slate-600">{aiStatus.message}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Admin capabilities</h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
          <li>• Manage research projects, publications, awards, and blog posts</li>
          <li>• Add or edit academic profile metadata from a secure dashboard</li>
          <li>• Restrict writes to authenticated admin users in Supabase</li>
          <li>• Toggle AI-powered search when provider configuration is available</li>
        </ul>
      </div>
    </div>
  );
}
