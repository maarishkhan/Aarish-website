import { randomBytes } from 'crypto';

import { escapeHtml, isEmailConfigured, sendEmail, sendEmailBatch, siteUrl } from '@/lib/email';
import { getServiceClient } from '@/lib/supabase-admin';

const RESEND_COOLDOWN_MS = 10 * 60 * 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isSignupAvailable() {
  return isEmailConfigured() && getServiceClient() !== null;
}

export function normalizeEmail(value: string) {
  const email = value.trim().toLowerCase();

  return email.length <= 254 && EMAIL_PATTERN.test(email) ? email : '';
}

function newToken() {
  return randomBytes(24).toString('hex');
}

function confirmEmail(token: string) {
  const url = `${siteUrl()}/subscribe/confirm?token=${token}`;

  return {
    subject: 'Confirm your subscription',
    html: `<p>Please confirm that you want email updates from this website.</p><p><a href="${url}">Confirm subscription</a></p><p>If you didn't ask for this, ignore this email and you won't be subscribed.</p>`,
    text: `Please confirm that you want email updates from this website:\n${url}\n\nIf you didn't ask for this, ignore this email and you won't be subscribed.`,
  };
}

/** Always resolves to the same outcome for the caller, so the form can't be used to check who is subscribed. */
export async function requestSubscription(rawEmail: string): Promise<'ok' | 'invalid' | 'unavailable'> {
  const email = normalizeEmail(rawEmail);

  if (!email) return 'invalid';

  const db = getServiceClient();

  if (!db || !isEmailConfigured()) return 'unavailable';

  const { data: existing } = await db.from('subscribers').select('id, confirmed, confirm_sent_at, unsubscribed_at').eq('email', email).maybeSingle();

  if (existing?.confirmed && !existing.unsubscribed_at) return 'ok';

  if (existing?.confirm_sent_at && Date.now() - new Date(existing.confirm_sent_at).getTime() < RESEND_COOLDOWN_MS) return 'ok';

  const token = newToken();
  const { error } = await db.from('subscribers').upsert(
    { email, token, confirmed: false, confirm_sent_at: new Date().toISOString(), unsubscribed_at: null },
    { onConflict: 'email' },
  );

  if (error) {
    console.error('Could not save subscriber:', error.message);
    return 'unavailable';
  }

  await sendEmail({ to: email, ...confirmEmail(token) });

  return 'ok';
}

export async function confirmSubscription(token: string) {
  const db = getServiceClient();

  if (!db || !/^[a-f0-9]{48}$/.test(token)) return false;

  const { data } = await db.from('subscribers').update({ confirmed: true, confirmed_at: new Date().toISOString(), unsubscribed_at: null }).eq('token', token).select('id');

  return Boolean(data && data.length > 0);
}

export async function unsubscribe(token: string) {
  const db = getServiceClient();

  if (!db || !/^[a-f0-9]{48}$/.test(token)) return false;

  const { data } = await db.from('subscribers').update({ confirmed: false, unsubscribed_at: new Date().toISOString() }).eq('token', token).select('id');

  return Boolean(data && data.length > 0);
}

export async function countConfirmedSubscribers() {
  const db = getServiceClient();

  if (!db) return 0;

  const { count } = await db.from('subscribers').select('id', { count: 'exact', head: true }).eq('confirmed', true);

  return count ?? 0;
}

/** Emails every confirmed subscriber; each message carries that person's own unsubscribe link. Returns the number sent. */
export async function emailAnnouncement(message: string, link: string) {
  const db = getServiceClient();

  if (!db || !isEmailConfigured()) return 0;

  const { data } = await db.from('subscribers').select('email, token').eq('confirmed', true);
  const target = link ? (link.startsWith('/') ? `${siteUrl()}${link}` : link) : siteUrl();

  const messages = (data ?? []).map((row: { email: string; token: string }) => {
    const unsubscribeUrl = `${siteUrl()}/subscribe/unsubscribe?token=${row.token}`;

    return {
      to: row.email,
      subject: 'What’s new on the website',
      html: `<p>${escapeHtml(message)}</p><p><a href="${escapeHtml(target)}">See what’s new</a></p><hr><p style="font-size:12px;color:#666">You're receiving this because you subscribed to updates. <a href="${unsubscribeUrl}">Unsubscribe</a></p>`,
      text: `${message}\n\nSee what's new: ${target}\n\nYou're receiving this because you subscribed to updates. Unsubscribe: ${unsubscribeUrl}`,
    };
  });

  return sendEmailBatch(messages);
}
