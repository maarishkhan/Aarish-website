'use client';

import { trackEvent } from '@/lib/track';

type PrintButtonProps = {
  variant?: 'primary' | 'gold' | 'outline-light';
  label?: string;
  title?: string;
};

const variantClass = { primary: 'btn-primary', gold: 'btn-gold', 'outline-light': 'btn-outline-light' };

export function PrintButton({ variant = 'primary', label = 'Download / print as PDF', title }: PrintButtonProps) {
  return (
    <button type="button" title={title} onClick={() => {
        trackEvent('cv_print');
        window.print();
      }} className={`btn ${variantClass[variant]} print:hidden`}>
      {label}
    </button>
  );
}
