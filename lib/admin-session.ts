// Signed, expiring admin session token (HMAC-SHA256 via Web Crypto so it also runs in middleware).
export const ADMIN_COOKIE_NAME = 'research_admin_session';
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV === 'production') return null;

  return 'dev-only-insecure-session-secret';
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toHex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload)));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createAdminSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET (16+ characters) must be set in production.');

  const expires = String(Date.now() + ADMIN_SESSION_MAX_AGE * 1000);
  return `${expires}.${await sign(expires, secret)}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  const secret = getSecret();
  if (!token || !secret) return false;

  const [expires, signature] = token.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;

  return safeEqual(signature, await sign(expires, secret));
}
