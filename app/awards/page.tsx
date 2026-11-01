import { awards } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

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

function AwardCard({ award }: { award: AwardItem }) {
  return (
    <article className="card-surface card-hover flex h-full flex-col overflow-hidden p-6">
      {award.image && (
        <div className="relative -mx-6 -mt-6 mb-5 aspect-[4/3] w-[calc(100%+3rem)] overflow-hidden bg-slate-100">
          <img src={award.image} alt={`${award.title}, ${award.organization}`} className="absolute inset-0 h-full w-full object-contain" loading="lazy" />
        </div>
      )}
      <p className="text-xs uppercase tracking-[0.14em] text-brand">{award.category}</p>
      <h3 className="mt-3 text-xl font-semibold text-brand-dark">{award.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{[award.organization, award.year].filter(Boolean).join(' • ')}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{award.description}</p>
      {award.quote && (
        <blockquote className="mt-5 border-l-2 border-gold pl-4 text-sm italic leading-6 text-slate-600">
          “{award.quote.text}”
          <footer className="mt-2 text-xs not-italic text-slate-500">— {award.quote.attribution}</footer>
        </blockquote>
      )}
    </article>
  );
}

/** Columns that divide the cards evenly where possible, so the last row is not left with a single card. */
const columnClass = (count: number) => (count === 1 ? 'md:grid-cols-1 lg:grid-cols-1' : count % 3 !== 0 && count % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-3');

/**
 * Cards with a photo form one aligned grid and text-only cards a compact grid below it, so no card stretches to a taller
 * neighbour. A lone photo card sits beside a stack of the text cards instead.
 */
function GroupCards({ items }: { items: AwardItem[] }) {
  const withImage = items.filter((award) => award.image);
  const textOnly = items.filter((award) => !award.image);

  if (withImage.length === 1 && textOnly.length > 1) {
    return (
      <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <AwardCard award={withImage[0]} />
        <div className="flex flex-col gap-5 lg:justify-between">
          {textOnly.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {[withImage, textOnly].map(
        (list, index) =>
          list.length > 0 && (
            <div key={index} className={`grid gap-5 ${list.length === 1 ? '' : 'md:grid-cols-2'} ${columnClass(list.length)}`}>
              {list.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          )
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
