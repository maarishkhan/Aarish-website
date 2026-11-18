import { confirmSubscription } from '@/lib/subscribers';

export const metadata = { title: 'Confirm subscription', robots: { index: false } };

export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const ok = await confirmSubscription(String(token ?? ''));

  return (
    <div className="container-shell section-shell">
      <h1 className="text-3xl font-semibold text-brand-dark">{ok ? 'You’re subscribed' : 'Link not valid'}</h1>
      <p className="mt-3 max-w-xl text-slate-600">{ok ? 'Thanks. You’ll get an email when something new is announced. Every email includes an unsubscribe link.' : 'This confirmation link is invalid or has expired. Please sign up again from the footer.'}</p>
    </div>
  );
}
