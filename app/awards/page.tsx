import { awards } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';
import { readImageSize } from '@/lib/image-size';

export const metadata = {
  title: 'Awards and Honors',
  description: 'Awards and honors earned by Mohammad Aarish Khan, including recognition from the New York Academy of Sciences, ACS NERD, IEEE and the AP Scholar program.',
  alternates: { canonical: '/awards' },
};

type AwardItem = (typeof awards)[number];

const COLUMNS = 3;
// Rough widths and line heights (px) of a card on the three-column layout, used only to balance the columns.
const CARD_WIDTH = 392;
const lines = (text: string, charsPerLine: number) => Math.max(1, Math.ceil(text.length / charsPerLine));

function estimateHeight(award: AwardItem) {
  let height = 48 + 2 + 16 + 12 + lines(award.title, 30) * 28 + 8 + lines([award.organization, award.year].filter(Boolean).join(' • '), 50) * 20;

  height += 16 + lines(award.description, 50) * 24;

  if (award.quote) height += 20 + lines(award.quote.text, 44) * 24 + 8 + lines(award.quote.attribution, 55) * 16;

  if (award.image) {
    const size = readImageSize(award.image);

    height += 20 + (size ? (CARD_WIDTH * size.height) / size.width : CARD_WIDTH * 0.75);
  }

  return height;
}

const spreadOf = (sums: number[]) => Math.max(...sums) - Math.min(...sums);

/**
 * Splits the awards into columns that finish at about the same height. With a modest number of cards it tries every
 * split and keeps the one with the smallest gap between the tallest and shortest column; otherwise it deals the tallest
 * cards first into the shortest column. Each column keeps the original order of its cards.
 */
function balanceColumns(items: AwardItem[]) {
  const heights = items.map((item) => estimateHeight(item) + 20);
  const assignment: number[] = new Array(items.length).fill(0);
  let best: number[] | null = null;
  let bestSpread = Infinity;

  const search = (index: number, sums: number[]) => {
    if (index === items.length) {
      if (spreadOf(sums) < bestSpread) {
        bestSpread = spreadOf(sums);
        best = [...assignment];
      }

      return;
    }

    // The first card always goes in the first column, which skips mirror-image splits.
    for (let column = 0; column < (index === 0 ? 1 : COLUMNS); column += 1) {
      assignment[index] = column;
      sums[column] += heights[index];
      search(index + 1, sums);
      sums[column] -= heights[index];
    }
  };

  if (items.length <= 15) search(0, new Array(COLUMNS).fill(0));

  const placed: number[][] = Array.from({ length: COLUMNS }, () => []);

  if (best) {
    (best as number[]).forEach((column, index) => placed[column].push(index));
  } else {
    const sums = new Array(COLUMNS).fill(0);

    for (const index of items.map((_, i) => i).sort((a, b) => heights[b] - heights[a])) {
      const column = sums.indexOf(Math.min(...sums));

      placed[column].push(index);
      sums[column] += heights[index];
    }
  }

  return placed.map((indexes) => indexes.sort((a, b) => a - b).map((index) => items[index]));
}

function AwardCard({ award, order }: { award: AwardItem; order: number }) {
  return (
    <article
      style={{ '--award-order': order } as React.CSSProperties}
      className="card-surface card-hover order-[var(--award-order)] overflow-hidden p-6 lg:order-none"
    >
      {award.image && (
        <img src={award.image} alt={`${award.title}, ${award.organization}`} className="-mx-6 -mt-6 mb-5 h-auto w-[calc(100%+3rem)] max-w-none" loading="lazy" />
      )}
      <p className="text-xs uppercase tracking-[0.14em] text-brand">{award.category}</p>
      <h2 className="mt-3 text-xl font-semibold text-brand-dark">{award.title}</h2>
      <p className="mt-2 text-sm text-slate-600">{[award.organization, award.year].filter(Boolean).join(' • ')}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{award.description}</p>
      {award.quote && (
        <blockquote className="mt-5 border-l-2 border-[#bb7728] pl-4 text-sm italic leading-6 text-slate-600">
          “{award.quote.text}”
          <footer className="mt-2 text-xs not-italic text-slate-500">— {award.quote.attribution}</footer>
        </blockquote>
      )}
    </article>
  );
}

export default function AwardsPage() {
  // Wide screens: three balanced columns. Smaller screens: the column wrappers disappear (display: contents) and the
  // cards sit in one column, put back into their original order with CSS `order`.
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Awards" title="Recognition and honors" />
      <div className="mx-auto flex max-w-2xl flex-col gap-5 lg:max-w-none lg:flex-row lg:items-start">
        {balanceColumns(awards).map((column, index) => (
          <div key={index} className="contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-5">
            {column.map((award) => (
              <AwardCard key={award.id} award={award} order={awards.indexOf(award)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
