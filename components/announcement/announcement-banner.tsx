'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dismissed-announcement';

export function AnnouncementBanner({ id, message, link }: { id: string; message: string; link: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) !== id);
    } catch {
      setVisible(true);
    }
  }, [id]);

  if (!visible) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // storage unavailable: just hide for this page view
    }
    setVisible(false);
  }

  const isInternal = link.startsWith('/');

  return (
    <div role="status" className="bg-brand-dark text-white">
      <div className="container-shell flex items-center justify-between gap-4 py-2 text-sm">
        <p>
          {message}
          {link && (
            isInternal ? (
              <Link href={link as never} className="ml-2 font-semibold underline">See what&apos;s new</Link>
            ) : (
              <a href={link} target="_blank" rel="noopener noreferrer" className="ml-2 font-semibold underline">See what&apos;s new</a>
            )
          )}
        </p>
        <button type="button" onClick={dismiss} aria-label="Dismiss announcement" className="shrink-0 rounded px-2 text-lg leading-none hover:bg-white/10">×</button>
      </div>
    </div>
  );
}
