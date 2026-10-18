'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';

export function NavLink({ href, children, onClick, className = '' }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string }) {
  const pathname = usePathname();
  const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href as Route}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`${className} ${active ? 'font-semibold text-brand' : 'text-slate-600 hover:text-brand'}`}
    >
      {children}
    </Link>
  );
}
