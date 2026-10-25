import { track } from '@vercel/analytics';

type EventProperties = Record<string, string | number | boolean | null>;

/**
 * Records an anonymous Vercel Web Analytics event, such as "the one-pager was downloaded".
 * Only the event name and a fixed label are sent: never a visitor's message, question or any personal detail.
 * Custom events may need a paid Vercel plan to appear in the dashboard; on other plans the call is simply ignored.
 */
export function trackEvent(name: string, properties?: EventProperties) {
  try {
    track(name, properties);
  } catch {
    // Analytics must never break the page.
  }
}
