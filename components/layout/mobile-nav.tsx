'use client';

import { useState } from 'react';
import { NavLink } from '@/components/layout/nav-link';
import { Menu, X } from 'lucide-react';

type NavItem = { label: string; href: string };

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex rounded-full border border-white/25 p-2 text-white transition hover:border-accent-light/70 hover:text-accent-light"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open && (
        <nav id="mobile-nav" className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-white/10 bg-brand-dark px-4 py-3 shadow-lg">
          <ul className="grid gap-1 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/10">{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
