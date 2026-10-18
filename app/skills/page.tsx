import { Braces, Brain, Cloud, Dna, Globe, Layers, Wrench } from 'lucide-react';
import { skills } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = { title: 'Skills' };

const categoryIcons: Record<string, typeof Braces> = {
  Programming: Braces,
  'AI/ML': Brain,
  'Computational Biology': Dna,
  'Web Development': Globe,
  Productivity: Wrench,
  Cloud: Cloud,
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
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(grouped).map(([category, items]) => {
          const Icon = categoryIcons[category] ?? Layers;

          return (
            <div key={category} className="card-surface card-hover card-accent p-6 pt-8">
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
