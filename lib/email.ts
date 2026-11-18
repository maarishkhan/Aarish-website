/** Minimal Resend client (REST API, no dependency). Email stays disabled until RESEND_API_KEY and EMAIL_FROM are set. */

export type EmailMessage = { to: string; subject: string; html: string; text: string };

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.EMAIL_FROM?.trim());
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function post(path: string, body: unknown) {
  const response = await fetch(`https://api.resend.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) console.error('Resend request failed:', response.status, (await response.text()).slice(0, 200));

  return response.ok;
}

function toPayload(message: EmailMessage) {
  return { from: process.env.EMAIL_FROM, to: [message.to], subject: message.subject, html: message.html, text: message.text };
}

export async function sendEmail(message: EmailMessage) {
  if (!isEmailConfigured()) return false;

  return post('/emails', toPayload(message));
}

/** Sends in batches of 100 (Resend's limit); returns how many messages were accepted. */
export async function sendEmailBatch(messages: EmailMessage[]) {
  if (!isEmailConfigured()) return 0;

  let sent = 0;

  for (let index = 0; index < messages.length; index += 100) {
    const chunk = messages.slice(index, index + 100);

    if (await post('/emails/batch', chunk.map(toPayload))) sent += chunk.length;
  }

  return sent;
}
