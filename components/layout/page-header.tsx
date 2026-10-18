export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="page-band relative left-1/2 right-1/2 -mx-[50vw] -mt-16 mb-12 w-screen overflow-hidden text-white sm:-mt-20">
      <div className="pattern-hex absolute inset-0" aria-hidden="true" />
      <div className="container-shell relative py-12 sm:py-16">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200">{intro}</p>}
      </div>
    </header>
  );
}
