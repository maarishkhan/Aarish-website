export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-brand-dark">{title}</h1>
      {intro && <p className="mt-5 text-base leading-7 text-slate-600">{intro}</p>}
    </header>
  );
}
