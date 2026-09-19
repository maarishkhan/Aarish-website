import { skills } from '@/data/site-config';

export default function SkillsPage() {
  const grouped: Record<string, typeof skills> = {};

  for (const skill of skills) {
    const key = skill.category;
    grouped[key] = [...(grouped[key] ?? []), skill];
  }

  return (
    <div className="container-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Technical and scientific capabilities</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="card-surface p-6">
            <h2 className="text-xl font-semibold text-slate-900">{category}</h2>
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
