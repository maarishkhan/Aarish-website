import Link from 'next/link';

import { saveCvContentAction } from './actions';
import { awards, experience, formatPeriod, getSiteConfig, skills } from '@/data/site-config';
import { leadershipGroupLabels, readCvContent } from '@/lib/cv-content-store';
import { PDF_LIMIT_MB } from '@/lib/uploads';
import { getCvData, radarAxes } from '@/lib/cv-data';

const fieldClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-brand focus:outline-none';

function CheckRow({ name, value, label, detail, checked }: { name: string; value: string; label: string; detail?: string; checked: boolean }) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
      <span>
        <span className="font-medium">{label}</span>
        {detail && <span className="block text-xs text-slate-500">{detail}</span>}
      </span>
      <input type="checkbox" name={name} value={value} defaultChecked={checked} className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-brand focus:ring-brand" />
    </label>
  );
}

export default async function AdminCvPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const [cv, site, { radarSettings }] = await Promise.all([readCvContent(), getSiteConfig(), getCvData()]);
  const skillCategories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <div className="container-shell section-shell">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow">CV editor</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-brand-dark">Curriculum vitae settings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            The CV is built from the same content as the rest of the site. Use this page to choose what appears on it and to edit the lists that only live on the CV.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cv" target="_blank" className="btn btn-secondary btn-sm">Preview CV</Link>
          <Link href="/admin" className="btn btn-secondary btn-sm">Back to dashboard</Link>
          <button form="admin-cv-form" type="submit" className="btn btn-primary btn-sm">Save CV</button>
        </div>
      </div>

      {status === 'saved' && <p className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">CV settings saved.</p>}
      {status === 'upload-error' && (
        <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          The PDF was not uploaded, and no other changes were saved. Choose a PDF under {PDF_LIMIT_MB} MB. On the live site, uploads also need Supabase storage to be configured.
        </p>
      )}
      {status === 'not-saved' && (
        <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Nothing was saved. This host cannot write files and no database is connected. Connect Supabase (or run the site locally) to store CV changes.
        </p>
      )}

      <form id="admin-cv-form" action={saveCvContentAction} className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-brand-dark">Contact on the CV</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              CV email <span className="font-normal text-slate-500">(blank uses the site email: {site.email})</span>
              <input name="email" type="email" defaultValue={cv.email} className={`${fieldClass} mt-2`} />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              CV phone <span className="font-normal text-slate-500">(blank leaves it off; the CV page is public)</span>
              <input name="phone" defaultValue={cv.phone} className={`${fieldClass} mt-2`} />
            </label>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              { name: 'showLinkedin', label: 'LinkedIn', checked: cv.showLinkedin },
              { name: 'showGithub', label: 'GitHub', checked: cv.showGithub },
              { name: 'showScholar', label: 'Google Scholar', checked: cv.showScholar },
              { name: 'showOrcid', label: 'ORCID', checked: cv.showOrcid },
            ].map((item) => (
              <label key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                {item.label}
                <input type="checkbox" name={item.name} defaultChecked={item.checked} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
              </label>
            ))}
          </div>
        </section>

        <section className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-brand-dark">Downloadable CV (PDF)</h2>
          <p className="mt-1 text-xs text-slate-500">
            Upload a finished CV and a download card appears at the bottom of the CV page. Without a file, the card is not shown.
          </p>
          {cv.cvPdfUrl ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <span>
                Current file:{' '}
                <a href={cv.cvPdfUrl} target="_blank" rel="noreferrer" className="font-medium text-brand underline">{cv.cvPdfName || 'CV.pdf'}</a>
              </span>
              <label className="flex items-center gap-2 text-slate-700">
                <input type="checkbox" name="removeCvPdf" className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
                Remove this file
              </label>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">No file uploaded yet.</p>
          )}
          <label className="mt-4 block text-sm font-medium text-slate-700">
            {cv.cvPdfUrl ? 'Replace with a new PDF' : 'Choose a PDF'} <span className="font-normal text-slate-500">(under {PDF_LIMIT_MB} MB)</span>
            <input
              name="cvPdfFile"
              type="file"
              accept="application/pdf"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-brand/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand"
            />
          </label>
        </section>

        <section className="card-surface p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-brand-dark">Profile radar chart</h2>
              <p className="mt-1 text-xs text-slate-500">
                Shown at the top of the CV. Turn it off and the CV starts straight with Research Experience, with no gap.
              </p>
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
              Show radar chart
              <input type="checkbox" name="showRadar" defaultChecked={cv.showRadar} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
            </label>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-2 pr-4 font-semibold">Axis</th>
                  <th className="pb-2 pr-4 font-semibold">Value shown</th>
                  <th className="pb-2 font-semibold">Full at (scale)</th>
                </tr>
              </thead>
              <tbody>
                {radarSettings.map((axis) => (
                  <tr key={axis.key} className="border-t border-slate-100">
                    <td className="py-2 pr-4 font-medium text-slate-700">
                      {axis.label}
                      <span className="block text-xs font-normal text-slate-500">counted from the site: {axis.auto}</span>
                    </td>
                    <td className="py-2 pr-4">
                      <input name={`radarValue-${axis.key}`} type="number" min={0} step="1" defaultValue={cv.radar[axis.key]?.value ?? ''} placeholder={`auto (${axis.auto})`} className={`${fieldClass} max-w-[10rem]`} />
                    </td>
                    <td className="py-2">
                      <input name={`radarMax-${axis.key}`} type="number" min={1} step="1" defaultValue={cv.radar[axis.key]?.max ?? ''} placeholder={`default (${radarAxes.find((item) => item.key === axis.key)?.max})`} className={`${fieldClass} max-w-[10rem]`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">Leave a box blank to use the automatic count or the default scale. The value shown is also the number printed beside the chart.</p>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-xl font-semibold text-brand-dark">Conferences</h2>
          <p className="mt-1 text-xs text-slate-500">One per line.</p>
          <textarea name="conferences" rows={8} defaultValue={cv.conferences.join('\n')} className={`${fieldClass} mt-3`} />
        </section>

        <section className="card-surface p-6">
          <h2 className="text-xl font-semibold text-brand-dark">Workshops and certifications</h2>
          <p className="mt-1 text-xs text-slate-500">One per line.</p>
          <textarea name="certifications" rows={8} defaultValue={cv.certifications.join('\n')} className={`${fieldClass} mt-3`} />
        </section>

        {[
          { name: 'leadership', title: `Leadership: ${leadershipGroupLabels.university}`, items: cv.leadership },
          { name: 'leadershipSchool', title: `Leadership: ${leadershipGroupLabels.school}`, items: cv.leadershipSchool },
        ].map((group) => (
          <section key={group.name} className="card-surface p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-brand-dark">{group.title}</h2>
            <p className="mt-1 text-xs text-slate-500">One per line, written as: Organization | Role | optional note.</p>
            <textarea
              name={group.name}
              rows={6}
              defaultValue={group.items.map((item) => [item.organization, item.role, item.note].filter(Boolean).join(' | ')).join('\n')}
              className={`${fieldClass} mt-3 font-mono`}
            />
          </section>
        ))}

        <section className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-brand-dark">Research experience to show</h2>
          <p className="mt-1 text-xs text-slate-500">Unchecked entries stay on the Experience page but are left off the CV. New entries show by default.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {experience.map((item) => (
              <CheckRow key={item.id} name="showExperience" value={item.id} label={`${item.organization} – ${item.role}`} detail={formatPeriod(item)} checked={!cv.hiddenExperience.includes(item.id)} />
            ))}
          </div>
        </section>

        <section className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-brand-dark">Awards to show</h2>
          <p className="mt-1 text-xs text-slate-500">Unchecked awards stay on the Awards page but are left off the CV.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {awards.map((item) => (
              <CheckRow key={item.id} name="showAwards" value={item.id} label={item.title} detail={[item.organization, item.year].filter(Boolean).join(' • ')} checked={!cv.hiddenAwards.includes(item.id)} />
            ))}
          </div>
        </section>

        <section className="card-surface p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-brand-dark">Skills to show</h2>
          <p className="mt-1 text-xs text-slate-500">Unchecked skills stay on the Skills page but are left off the CV.</p>
          {skillCategories.map((category) => (
            <div key={category} className="mt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{category}</h3>
              <div className="mt-2 grid gap-2 md:grid-cols-3">
                {skills.filter((skill) => skill.category === category).map((skill) => (
                  <CheckRow key={skill.id} name="showSkills" value={skill.id} label={skill.name} checked={!cv.hiddenSkills.includes(skill.id)} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="flex justify-end lg:col-span-2">
          <button type="submit" className="btn btn-primary btn-sm">Save CV</button>
        </div>
      </form>
    </div>
  );
}
