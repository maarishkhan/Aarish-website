// Placeholder numbers that shipped with the original template. They are never shown on the site.
const PLACEHOLDER_PHONES = new Set(['+1 (555) 123-4567', '+1 (555) 426-9186']);

/** The public phone number from the site settings, or null when it is blank or a template placeholder. */
export function getPublicPhone(phone: string | undefined) {
  const value = phone?.trim();

  if (!value || PLACEHOLDER_PHONES.has(value)) return null;

  return { display: value, href: `tel:${value.replace(/[^\d+]/g, '')}` };
}
