import Link from 'next/link';
import type { Metadata } from 'next';
import { formatPeriod } from '@/data/site-config';
import { PrintButton } from '@/components/cv/print-button';
import { leadershipGroupLabels } from '@/lib/cv-content-store';
import { getCvData } from '@/lib/cv-data';

export const metadata: Metadata = {
  title: 'CV (plain version)',
  description: 'Plain, single-column curriculum vitae of Mohammad Aarish Khan.',
  alternates: { canonical: '/cv' },
  robots: { index: false, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 print:mt-3">
      <h2 className="border-b border-black pb-0.5 text-base font-bold uppercase tracking-wide">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-6 print:text-[10.5px] print:leading-[1.35]">{children}</div>
    </section>
  );
}

export default async function PlainCvPage() {
  const { site, cv, education, current, past, cvAwards, cvPublications, skillGroups, contactLines, currentEducation } = await getCvData();
  const experience = [...current, ...past];

  return (
    <div className="container-shell section-shell print:max-w-none print:p-0">
      <div className="mx-auto max-w-3xl bg-white p-6 text-black shadow-sm sm:p-10 print:max-w-none print:p-0 print:shadow-none">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/cv" className="text-sm font-medium text-brand">← Styled CV</Link>
          <PrintButton />
        </div>

        <header>
          <h1 className="text-3xl font-bold uppercase tracking-wide">{site.name}</h1>
          <p className="mt-1 text-sm">
            {[currentEducation?.degree, currentEducation?.institution].filter(Boolean).join(', ')}
            {site.location ? ` · ${site.location}` : ''}
          </p>
          <p className="mt-1 text-sm">{contactLines.join(' | ')}</p>
        </header>

        <Section title="Education">
          {education.map((item) => (
            <p key={item.id}>
              <strong>{item.institution}</strong>, {item.degree}, {item.startDate} – {item.endDate}
              {item.honors && item.honors.length > 0 ? `. ${item.honors.join(', ')}` : ''}
            </p>
          ))}
        </Section>

        <Section title="Research experience">
          {experience.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <p>
                <strong>{item.organization}</strong>, {item.role}
                {formatPeriod(item) ? ` (${formatPeriod(item)})` : ''}
              </p>
              <ul className="list-disc pl-5">
                {(item.responsibilities.length > 0 ? item.responsibilities : [item.description]).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {cvPublications.length > 0 && (
          <Section title="Publications">
            {cvPublications.map((item) => (
              <p key={item.id}>
                {item.authors.join(', ')}. {item.title}. <em>{item.journal || item.conference}</em>, {item.publicationDate}.{item.doi ? ` DOI: ${item.doi}` : ''}
              </p>
            ))}
          </Section>
        )}

        <Section title="Awards and honors">
          <ul className="list-disc pl-5">
            {cvAwards.map((award) => (
              <li key={award.id}>
                {award.title}, {award.organization}
                {award.year ? `, ${award.year}` : ''}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Conferences">
          <p>{cv.conferences.join('; ')}</p>
        </Section>

        <Section title="Workshops and certifications">
          <ul className="list-disc pl-5">
            {cv.certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          {Object.entries(skillGroups).map(([category, names]) => (
            <p key={category}>
              <strong>{category}:</strong> {names.join(', ')}
            </p>
          ))}
        </Section>

        {(cv.leadership.length > 0 || cv.leadershipSchool.length > 0) && (
          <Section title="Leadership and extracurriculars">
            {[
              { label: leadershipGroupLabels.university, items: cv.leadership },
              { label: leadershipGroupLabels.school, items: cv.leadershipSchool },
            ]
              .filter((group) => group.items.length > 0)
              .map((group) => (
                <div key={group.label}>
                  <p className="font-semibold">{group.label}</p>
                  <ul className="list-disc pl-5">
                    {group.items.map((item) => (
                      <li key={item.organization}>
                        {item.organization}
                        {item.role ? `, ${item.role}` : ''}
                        {item.note ? `. ${item.note}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </Section>
        )}
      </div>
    </div>
  );
}
