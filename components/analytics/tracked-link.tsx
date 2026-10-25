'use client';

import type { AnchorHTMLAttributes } from 'react';
import { trackEvent } from '@/lib/track';

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
};

/** A plain link that also records an anonymous analytics event when it is clicked. */
export function TrackedLink({ event, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(clickEvent) => {
        trackEvent(event);
        onClick?.(clickEvent);
      }}
    />
  );
}
