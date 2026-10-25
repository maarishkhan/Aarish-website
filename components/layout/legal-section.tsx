import type { ReactNode } from 'react';

/** A titled block of plain text used on the legal pages. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-brand-dark">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">{children}</div>
    </section>
  );
}

export const legalUpdated = 'October 25, 2026';
