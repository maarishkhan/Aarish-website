import { Braces, Brain, Cloud, Dna, FlaskConical, Globe, Layers, Wrench } from 'lucide-react';
import { skills } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

const categoryIcons: Record<string, typeof Braces> = {
  Programming: Braces,
  'AI/ML': Brain,
  'Computational Biology': Dna,
  'Genetics & Genomics': FlaskConical,
  'Web Development': Globe,
  Productivity: Wrench,
  Cloud: Cloud,
};

export const metadata = {
  title: 'Skills',
  description: 'Technical and research skills in computational biology, genomics, programming, and laboratory methods.',
  alternates: { canonical: '/skills' },
};

// Science-first order; any other category follows in the order it appears.
const categoryOrder = ['Computational Biology', 'Genetics & Genomics', 'AI/ML', 'Programming', 'Web Development', 'Productivity', 'Cloud'];
const categoryRank = (category: string) => {
  const index = categoryOrder.indexOf(category);

  return index === -1 ? categoryOrder.length : index;
};

export default function SkillsPage() {
  const grouped: Record<string, typeof skills> = {};

  for (const skill of skills) {
    const key = skill.category;
    grouped[key] = [...(grouped[key] ?? []), skill];
  }

  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Skills" title="Technical and scientific capabilities" />
      <div className="gap-6 md:columns-2">
        {Object.entries(grouped)
          .sort(([a], [b]) => categoryRank(a) - categoryRank(b))
          .map(([category, items]) => {
          const Icon = categoryIcons[category] ?? Layers;

          return (
            <div key={category} className="card-surface card-hover card-accent mb-6 break-inside-avoid p-6 pt-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-accent-light">
                  <Icon size={20} />
                </span>
                <h2 className="text-xl font-semibold text-brand-dark">{category}</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item.id} className="rounded-full border border-brand/15 bg-brand/5 px-3 py-1.5 text-sm font-medium text-brand">
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
