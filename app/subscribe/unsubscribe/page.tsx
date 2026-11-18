import { unsubscribeAction } from '@/app/subscribe/actions';

export const metadata = { title: 'Unsubscribe', robots: { index: false } };

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ token?: string; done?: string }> }) {
  const { token = '', done } = await searchParams;

  if (done) {
    return (
      <div className="container-shell section-shell">
        <h1 className="text-3xl font-semibold text-brand-dark">{done === '1' ? 'You\u2019ve been unsubscribed' : 'Link not valid'}</h1>
        <p className="mt-3 max-w-xl text-slate-600">{done === '1' ? 'You won\u2019t receive any more update emails.' : 'This unsubscribe link is invalid. Reply to any update email or contact me and I\u2019ll remove you.'}</p>
      </div>
    );
  }

  return (
    <div className="container-shell section-shell">
      <h1 className="text-3xl font-semibold text-brand-dark">Unsubscribe</h1>
      <p className="mt-3 max-w-xl text-slate-600">Click the button to stop receiving update emails. A button is used so email scanners can&apos;t unsubscribe you by accident.</p>
      <form action={unsubscribeAction} className="mt-6">
        <input type="hidden" name="token" value={token} />
        <button type="submit" className="btn btn-primary">Unsubscribe me</button>
      </form>
    </div>
  );
}
