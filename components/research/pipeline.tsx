export function Pipeline({ steps }: { steps: { title: string; detail: string }[] }) {
  return (
    <section className="mt-10" aria-label="Computational pipeline">
      <h2 className="text-lg font-semibold text-slate-900">Computational pipeline</h2>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-[family-name:var(--font-display)] text-sm font-bold text-accent-light" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-dark">{step.title}</p>
              <p className="mt-1 text-sm leading-5 text-slate-600">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
