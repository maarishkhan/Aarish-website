import nodemailer from 'nodemailer';

/** Sends through Gmail SMTP using an app password. Email stays disabled until GMAIL_USER and GMAIL_APP_PASSWORD are set. */

export type EmailMessage = { to: string; subject: string; html: string; text: string };

export function isEmailConfigured() {
  return Boolean(process.env.GMAIL_USER?.trim() && process.env.GMAIL_APP_PASSWORD?.trim());
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function createTransport() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // Google shows app passwords with spaces; they are not part of the password.
    auth: { user: process.env.GMAIL_USER?.trim(), pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '') },
  });
}

function fromAddress() {
  const name = (process.env.EMAIL_FROM_NAME || '').replace(/["<>\r\n]/g, '').trim();
  const address = process.env.GMAIL_USER?.trim() ?? '';

  return name ? `"${name}" <${address}>` : address;
}

export async function sendEmail(message: EmailMessage) {
  if (!isEmailConfigured()) return false;

  try {
    await createTransport().sendMail({ from: fromAddress(), to: message.to, subject: message.subject, html: message.html, text: message.text });
    return true;
  } catch (error) {
    console.error('Email send failed:', error instanceof Error ? error.message : error);
    return false;
  }
}

/** Sends over one connection, a few at a time; returns how many messages were accepted. */
export async function sendEmailBatch(messages: EmailMessage[]) {
  if (!isEmailConfigured()) return 0;

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    pool: true,
    maxConnections: 3,
    auth: { user: process.env.GMAIL_USER?.trim(), pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '') },
  });
  const from = fromAddress();
  const results = await Promise.all(
    messages.map((message) =>
      transport
        .sendMail({ from, to: message.to, subject: message.subject, html: message.html, text: message.text })
        .then(() => true)
        .catch((error: unknown) => {
          console.error('Email send failed:', error instanceof Error ? error.message : error);
          return false;
        }),
    ),
  );

  transport.close();

  return results.filter(Boolean).length;
}
