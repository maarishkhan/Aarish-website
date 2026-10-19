import Link from 'next/link';
import type { Route } from 'next';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  /** Link back to the parent list page, shown above the eyebrow. */
  back?: { href: string; label: string };
  /** Smaller title for long titles such as publication names. */
  compact?: boolean;
};

export function PageHeader({ eyebrow, title, intro, action, back, compact = false }: PageHeaderProps) {
  return (
    <header className="page-band relative left-1/2 right-1/2 -mx-[50vw] -mt-16 mb-12 w-screen overflow-hidden text-white print:hidden sm:-mt-20">
      <div className="pattern-hex absolute inset-0" aria-hidden="true" />
      <div className="container-shell relative flex flex-wrap items-end justify-between gap-6 py-12 sm:py-16">
        <div>
          {back && (
            <Link href={back.href as Route} className="mb-6 flex w-fit items-center gap-1 text-sm font-medium text-accent-light transition hover:text-white">
              <span aria-hidden="true">←</span> {back.label}
            </Link>
          )}
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1 className={`mt-3 max-w-4xl font-semibold tracking-tight text-white ${compact ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'}`}>{title}</h1>
          {intro && <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200">{intro}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}
