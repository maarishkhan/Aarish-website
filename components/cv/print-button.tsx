'use client';

export function PrintButton({ variant = 'primary' }: { variant?: 'primary' | 'gold' }) {
  return (
    <button type="button" onClick={() => window.print()} className={`btn ${variant === 'gold' ? 'btn-gold' : 'btn-primary'} print:hidden`}>
      Download / print as PDF
    </button>
  );
}
