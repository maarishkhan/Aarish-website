'use client';

import { useActionState } from 'react';

import { subscribeAction, type SubscribeState } from '@/app/subscribe/actions';

const messages: Record<SubscribeState['status'], string> = {
  idle: '',
  ok: 'Check your inbox to confirm your subscription.',
  invalid: 'Please enter a valid email address.',
  unavailable: 'Sign-up is unavailable right now. Please try again later.',
};

export function SubscribeForm() {
  const [state, action, pending] = useActionState(subscribeAction, { status: 'idle' } as SubscribeState);

  return (
    <form action={action} className="mt-5 max-w-sm">
      <label htmlFor="subscribe-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">Get updates by email</label>
      <div className="mt-2 flex gap-2">
        <input id="subscribe-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400" />
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={pending} className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-brand-dark disabled:opacity-60">{pending ? 'Sending…' : 'Subscribe'}</button>
      </div>
      <p role="status" className="mt-2 text-xs text-slate-300">{messages[state.status]}</p>
    </form>
  );
}
