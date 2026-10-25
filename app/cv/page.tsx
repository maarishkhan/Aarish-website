import type { ReactNode } from 'react';
import { PrintButton } from '@/components/cv/print-button';
import { PageHeader } from '@/components/layout/page-header';
import Link from 'next/link';
import { experience, formatPeriod } from '@/data/site-config';
import { RadarChart } from '@/components/cv/radar-chart';
import { leadershipGroupLabels } from '@/lib/cv-content-store';
import { getCvData } from '@/lib/cv-data';

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-white">{title}</h2>
      <div className="mt-1.5 h-px bg-[#bb7728]" />
      <div className="mt-3 space-y-2 text-[13px] leading-5 text-slate-100 print:mt-2 print:space-y-1 print:text-[10.5px] print:leading-4">{children}</div>
    </section>
  );
}

function MainSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold uppercase tracking-wide text-brand-dark">{title}</h2>
      <div className="mt-1.5 h-px bg-[#bb7728]" />
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-800 print:mt-2 print:space-y-2 print:text-[12px] print:leading-5">{children}</div>
    </section>
  );
}

function Role({ title, details, bullets }: { title: string; details: string; bullets: string[] }) {
  return (
    <article className="break-inside-avoid">
      <div className="flex flex-col gap-0.5 xl:flex-row xl:items-baseline xl:justify-between xl:gap-5">
        <h3 className="font-semibold text-brand-dark">{title}</h3>
        <p className="shrink-0 text-xs italic text-slate-500">{details}</p>
      </div>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[13px] leading-5 marker:text-[#bb7728]">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

export const metadata = {
  title: 'Curriculum Vitae',
  description: 'Curriculum vitae of Mohammad Aarish Khan: education, research experience, awards, presentations, and skills.',
  alternates: { canonical: '/cv' },
};

export default async function CvPage() {
  const { site, cv, education, current, past, cvAwards, cvPublications, skillGroups, contactLines, radar, currentEducation } = await getCvData();
  const [firstName, ...restName] = site.name.split(' ');

  const renderRole = (item: (typeof experience)[number]) => (
    <Role
      key={item.id}
      title={`${item.organization} – ${item.role}`}
      details={[item.location, formatPeriod(item)].filter(Boolean).join(' | ')}
      bullets={item.responsibilities.length > 0 ? item.responsibilities : [item.description]}
    />
  );

  return (
    <div className="container-shell section-shell print:max-w-none print:p-0">
      <PageHeader eyebrow="CV" title="Curriculum Vitae" intro="A full record of research, awards, and leadership. Download it as a PDF using the button." action={
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/cv/plain" className="btn btn-outline-light">Plain version</Link>
            <PrintButton variant="gold" />
          </div>
        } />

      <div className="overflow-hidden border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.12)] lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] print:grid print:grid-cols-[15.5rem_minmax(0,1fr)] print:border-0 print:shadow-none">
        <aside className="bg-[#13314d] p-7 text-white sm:p-9 lg:min-h-[1050px] print:min-h-0 print:p-5 print:text-[11px] print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]">
          <header className="mb-8">
            <h2 className="font-serif text-[2rem] font-bold uppercase leading-[1.05] tracking-wide print:text-[1.5rem] print:tracking-normal">
              {firstName}
              <br />
              {restName.join(' ')}
            </h2>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em]">{currentEducation?.degree || site.title}</p>
            {currentEducation && (
              <p className="mt-1 text-sm italic text-slate-300">
                {currentEducation.institution}
                {currentEducation.startDate ? ` · ${currentEducation.startDate} – ${currentEducation.endDate}` : ''}
              </p>
            )}
            <p className="mt-2 text-sm italic text-slate-300">{site.location}</p>
          </header>
          <div className="space-y-7 print:space-y-4">
            <SidebarSection title="Contact">
              {contactLines.map((line) => (
                <p key={line} className="break-all">{line}</p>
              ))}
            </SidebarSection>
            <SidebarSection title="Education">
              {education.map((item) => (
                <div key={item.id}>
                  <p className="font-semibold text-white">{item.institution}</p>
                  <p>{item.degree}</p>
                  <p>{[...(item.honors ?? []).slice(0, 1), `${item.startDate} – ${item.endDate}`].join(' · ')}</p>
                </div>
              ))}
            </SidebarSection>
            <SidebarSection title="Technical skills">
              {Object.entries(skillGroups).map(([category, names]) => (
                <p key={category}><strong>{category}:</strong> {names.join(', ')}</p>
              ))}
            </SidebarSection>
            <SidebarSection title="Awards & honors">
              {cvAwards.map((award) => (
                <p key={award.id}>– {award.organization}: {award.title}{award.year ? ` ${award.year}` : ''}</p>
              ))}
            </SidebarSection>
            <SidebarSection title="Conferences">
              {cv.conferences.map((item) => (
                <p key={item}>– {item}</p>
              ))}
            </SidebarSection>
            <SidebarSection title="Workshops & certs">
              {cv.certifications.map((item) => (
                <p key={item}>– {item}</p>
              ))}
            </SidebarSection>
          </div>
        </aside>

        <main className="space-y-10 p-7 sm:p-9 lg:p-10 print:space-y-4 print:p-5 print:text-[12px]">
          {cv.showRadar && (
            <div className="border-b border-slate-200 pb-6 print:pb-3">
              <RadarChart axes={radar} />
            </div>
          )}
          <MainSection title="Research experience">
            {current.length > 0 && (
              <>
                <p className="text-xs font-bold italic uppercase tracking-wide text-[#bb7728]">Current research</p>
                {current.map(renderRole)}
              </>
            )}
            {past.length > 0 && (
              <>
                <p className="pt-1 text-xs font-bold italic uppercase tracking-wide text-[#bb7728]">Past research</p>
                {past.map(renderRole)}
              </>
            )}
          </MainSection>

          {cvPublications.length > 0 && (
            <MainSection title="Selected publications">
              {cvPublications.map((item) => (
                <div key={item.id}>
                  <p className="font-semibold">
                    {item.title}. <span className="font-normal">{item.journal || item.conference} {item.publicationDate}.</span>
                  </p>
                  <p className="text-xs italic text-slate-500">
                    {item.authors.join(', ')}{item.doi ? ` · DOI: ${item.doi}` : ''}
                  </p>
                </div>
              ))}
            </MainSection>
          )}

          <MainSection title="Leadership & extracurriculars">
            <div className="space-y-3 text-[13px] leading-5">
              {[
                { label: leadershipGroupLabels.university, items: cv.leadership },
                { label: leadershipGroupLabels.school, items: cv.leadershipSchool },
              ]
                .filter((group) => group.items.length > 0)
                .map((group) => (
                  <div key={group.label} className="space-y-1.5">
                    <p className="text-xs font-bold italic uppercase tracking-wide text-[#bb7728]">{group.label}</p>
                    {group.items.map((item) => (
                      <p key={item.organization}>
                        <strong>– {item.organization}</strong> {item.role && <span className="ml-2">{item.role}</span>}
                        {item.note && (
                          <>
                            <br />
                            {item.note}
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                ))}
            </div>
          </MainSection>
        </main>
      </div>

      {cv.cvPdfUrl && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:hidden">
          <div>
            <p className="font-serif text-lg font-bold text-brand-dark">Download my CV</p>
            <p className="mt-1 text-sm text-slate-600">{cv.cvPdfName || 'CV.pdf'} · PDF</p>
          </div>
          <a href={cv.cvPdfUrl} download={cv.cvPdfName || 'CV.pdf'} target="_blank" rel="noreferrer" className="btn btn-gold">
            Download CV (PDF)
          </a>
        </div>
      )}
    </div>
  );
}
