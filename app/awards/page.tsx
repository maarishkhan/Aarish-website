import { awards } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';
import { readImageSize } from '@/lib/image-size';

export const metadata = {
  title: 'Awards and Honors',
  description: 'Awards and honors earned by Mohammad Aarish Khan, including recognition from the New York Academy of Sciences, ACS NERD, Terra Science Fair, WNY Turing Challenge, the College Board and the Town of Amherst.',
  alternates: { canonical: '/awards' },
};

type AwardItem = (typeof awards)[number];

/** Sections in display order. An award lands in the first section that lists its category; anything else goes to the last. */
const SECTIONS = [
  { title: 'Research and scientific recognition', categories: ['Research excellence', 'Poster presentation', 'Science fair', 'Team award', 'Conference presentation'] },
  { title: 'Competitions', categories: ['Competition', 'STEM achievement', 'Literature'] },
  { title: 'Academic achievement and scholarships', categories: ['Academic achievement', 'Scholarship'] },
  { title: 'Service and leadership', categories: ['Community service', 'Service', 'Leadership and service'] },
];

/** Latest year in a label such as "2024–2025" or "2024, 2025, 2026"; 0 when there is none. */
const latestYear = (year: string) => Math.max(0, ...(year.match(/\d{4}/g) ?? []).map(Number));

/** Featured awards first, then newest first, keeping the original order for ties. */
function sortAwards(items: AwardItem[]) {
  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => Number(b.item.featured) - Number(a.item.featured) || latestYear(b.item.year) - latestYear(a.item.year) || a.index - b.index)
    .map(({ item }) => item);
}

function groupAwards() {
  const groups = SECTIONS.map((section) => ({ title: section.title, items: [] as AwardItem[] }));

  for (const award of awards) {
    const found = SECTIONS.findIndex((section) => section.categories.includes(award.category));

    groups[found === -1 ? groups.length - 1 : found].items.push(award);
  }

  return groups.filter((group) => group.items.length > 0).map((group) => ({ ...group, items: sortAwards(group.items) }));
}

function AwardCard({ award, className = '' }: { award: AwardItem; className?: string }) {
  return (
    <article className={`card-surface card-hover flex h-full flex-col overflow-hidden p-6 ${className}`}>
      <p className="text-xs uppercase tracking-[0.14em] text-brand">{award.category}</p>
      <h3 className="mt-3 text-xl font-semibold text-brand-dark">{award.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{[award.organization, award.year].filter(Boolean).join(' • ')}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{award.description}</p>
    </article>
  );
}

/** An award with a photo as a wide card (a tall photo is capped in height on small screens): the photo fills one side at its own shape and the text sits beside it, alternating sides. */
function FeatureCard({ award, flip }: { award: AwardItem; flip: boolean }) {
  const size = award.image ? readImageSize(award.image) : null;
  const ratio = size ? size.width / size.height : 1;
  const wide = ratio > 1.2;
  // A banner-shaped photo gets a wider column so it is not padded with empty strips.
  const banner = ratio > 1.6;

  return (
    <article className={`card-surface card-hover grid overflow-hidden ${banner ? 'lg:grid-cols-[minmax(0,min(44rem,55%))_minmax(0,1fr)]' : wide ? 'lg:grid-cols-[minmax(0,32.5rem)_minmax(0,1fr)]' : 'lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)]'} ${flip ? 'lg:[direction:rtl]' : ''}`}>
      <div className="flex items-center bg-slate-100 lg:[direction:ltr]">
        <img src={award.image} alt={`${award.title}, ${award.organization}`} className="mx-auto h-auto max-h-[32rem] w-auto max-w-full lg:max-h-none lg:w-full" loading="lazy" />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:[direction:ltr]">
        <p className="text-xs uppercase tracking-[0.14em] text-brand">{award.category}</p>
        <h3 className="mt-3 text-2xl font-semibold text-brand-dark">{award.title}</h3>
        <p className="mt-2 text-sm font-medium text-slate-600">{[award.organization, award.year].filter(Boolean).join(' • ')}</p>
        <p className="mt-4 text-base leading-7 text-slate-600">{award.description}</p>
        {award.quote && (
          <blockquote className="mt-5 border-l-2 border-gold pl-4 text-sm italic leading-6 text-slate-600">
            “{award.quote.text}”
            <footer className="mt-2 text-xs not-italic text-slate-500">— {award.quote.attribution}</footer>
          </blockquote>
        )}
      </div>
    </article>
  );
}

/** Cards with a photo are wide cards, alternating sides; text-only cards form a grid below with no card left alone in a row. */
function GroupCards({ items }: { items: AwardItem[] }) {
  const withImage = items.filter((award) => award.image);
  const textOnly = items.filter((award) => !award.image);
  const leftOver = textOnly.length % 3;

  return (
    <div className="space-y-5">
      {withImage.map((award, index) => (
        <FeatureCard key={award.id} award={award} flip={index % 2 === 1} />
      ))}
      {textOnly.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {textOnly.map((award, index) => {
            const fromEnd = textOnly.length - index;
            // On wide screens three cards fill a row; a last row of one or two cards is stretched to the full width.
            const span = leftOver === 1 && fromEnd === 1 ? 'lg:col-span-6' : leftOver === 2 && fromEnd <= 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            const alone = textOnly.length % 2 === 1 && fromEnd === 1 ? 'md:col-span-2' : '';

            return <AwardCard key={award.id} award={award} className={`${span} ${alone}`} />;
          })}
        </div>
      )}
    </div>
  );
}

export default function AwardsPage() {
  const awardsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Awards and Honors of Mohammad Aarish Khan',
    about: {
      '@type': 'Person',
      name: 'Mohammad Aarish Khan',
      award: awards.map((award) => `${award.title}, ${award.organization}${award.year ? ` (${award.year})` : ''}`),
    },
  };

  return (
    <div className="container-shell section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(awardsJsonLd).replace(/</g, '\\u003c') }} />
      <PageHeader eyebrow="Awards" title="Recognition and honors" intro="Awards grouped by area, with the most recent and most significant first." />
      <div className="space-y-14">
        {groupAwards().map((group) => (
          <section key={group.title} aria-labelledby={`awards-${group.title.replace(/\W+/g, '-').toLowerCase()}`}>
            <h2 id={`awards-${group.title.replace(/\W+/g, '-').toLowerCase()}`} className="mb-6 border-b border-slate-200 pb-3 text-2xl font-semibold text-brand-dark">
              {group.title}
            </h2>
            <GroupCards items={group.items} />
          </section>
        ))}
      </div>
    </div>
  );
}
