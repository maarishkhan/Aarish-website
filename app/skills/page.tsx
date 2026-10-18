import { skills } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

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
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="card-surface p-6">
            <h2 className="text-xl font-semibold text-brand-dark">{category}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item.id} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
