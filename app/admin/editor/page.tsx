import Link from 'next/link';

import { saveSiteContentAction } from './actions';
import { readSiteContent } from '@/lib/site-content-store';

const defaultTemplateSections = [
  { key: 'researchInterests', label: 'Research interests' },
  { key: 'featuredResearch', label: 'Featured research' },
  { key: 'publications', label: 'Publications' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'awards', label: 'Awards' },
  { key: 'presentations', label: 'Presentations' },
  { key: 'blog', label: 'Blog' },
  { key: 'researchAI', label: 'Research AI' },
];

export default async function AdminEditorPage() {
  const currentContent = await readSiteContent();

  return (
    <div className="container-shell section-shell">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow">Content editor</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Manage research content</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            Back to dashboard
          </Link>
          <button form="admin-editor-form" type="submit" className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
            Save changes
          </button>
        </div>
      </div>

      <form id="admin-editor-form" action={saveSiteContentAction} className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
          <div className="mt-5 space-y-4">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Name</span>
              <input name="name" defaultValue={currentContent.name} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Title</span>
              <input name="title" defaultValue={currentContent.title} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Headline</span>
              <input name="headline" defaultValue={currentContent.headline} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Bio</span>
              <textarea name="bio" defaultValue={currentContent.bio} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Profile image</span>
              <input name="profileImageFile" type="file" accept="image/*" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-sky-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sky-700 focus:border-sky-500 focus:outline-none" />
              {currentContent.profileImage ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <img src={currentContent.profileImage} alt="Current profile" className="h-20 w-20 rounded-full object-cover" />
                </div>
              ) : null}
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Hero image</span>
              <input name="heroImageFile" type="file" accept="image/*" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-sky-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sky-700 focus:border-sky-500 focus:outline-none" />
              {currentContent.heroImage ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <img src={currentContent.heroImage} alt="Current hero" className="h-20 w-full rounded-lg object-cover" />
                </div>
              ) : null}
            </label>
          </div>
        </div>

        <div className="card-surface p-6">
          <h2 className="text-xl font-semibold text-slate-900">Institution & contact</h2>
          <div className="mt-5 space-y-4">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">University</span>
              <input name="university" defaultValue={currentContent.university} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Location</span>
              <input name="location" defaultValue={currentContent.location} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Email</span>
              <input name="email" type="email" defaultValue={currentContent.email} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Phone</span>
              <input name="phone" defaultValue={currentContent.phone ?? ''} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
          </div>
        </div>

        <div className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Social links</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">GitHub</span>
              <input name="github" defaultValue={currentContent.socials.github ?? ''} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">LinkedIn</span>
              <input name="linkedin" defaultValue={currentContent.socials.linkedin ?? ''} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Medium</span>
              <input name="medium" defaultValue={currentContent.socials.medium ?? ''} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Google Scholar</span>
              <input name="scholar" defaultValue={currentContent.socials.scholar ?? ''} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">ORCID</span>
              <input name="orcid" defaultValue={currentContent.socials.orcid ?? ''} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700 md:col-span-2">
              <span className="mb-2 block font-medium">ResearchGate</span>
              <input name="researchgate" defaultValue={currentContent.socials.researchgate ?? ''} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none" />
            </label>
          </div>
        </div>

        <div className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Navigation & visibility</h2>
          <div className="mt-5 space-y-4">
            {currentContent.navItems.map((item, index) => (
              <div key={`${item.href}-${index}`} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1.2fr_1.3fr_auto] md:items-center">
                <label className="block text-sm text-slate-700">
                  <span className="mb-1 block font-medium">Label</span>
                  <input
                    name={`navLabel-${index}`}
                    defaultValue={item.label}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  <span className="mb-1 block font-medium">Link</span>
                  <input
                    name={`navHref-${index}`}
                    defaultValue={item.href}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                  />
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    name={`navEnabled-${index}`}
                    defaultChecked={item.enabled}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  Visible
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Template section visibility</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {defaultTemplateSections.map((section) => {
              const currentSection = currentContent.templateSections.find((item) => item.key === section.key) ?? { key: section.key, label: section.label, enabled: true };
              return (
                <label key={section.key} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  <span className="flex flex-col">
                    <span>{section.label}</span>
                    <input type="hidden" name={`templateLabel-${section.key}`} value={section.label} />
                  </span>
                  <input
                    type="checkbox"
                    name={`templateSection-${section.key}`}
                    defaultChecked={currentSection.enabled}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Feature toggles</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              { key: 'feature-research', label: 'Research section', checked: currentContent.features.research },
              { key: 'feature-publications', label: 'Publications section', checked: currentContent.features.publications },
              { key: 'feature-blog', label: 'Blog section', checked: currentContent.features.blog },
              { key: 'feature-researchAI', label: 'Research AI section', checked: currentContent.features.researchAI },
            ].map((feature) => (
              <label key={feature.key} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                <span>{feature.label}</span>
                <input
                  type="checkbox"
                  name={feature.key}
                  defaultChecked={feature.checked}
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex justify-end">
          <button type="submit" className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
