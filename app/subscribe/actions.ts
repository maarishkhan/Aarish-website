'use server';

import type { Route } from 'next';
import { redirect } from 'next/navigation';

import { requestSubscription, unsubscribe } from '@/lib/subscribers';

export type SubscribeState = { status: 'idle' | 'ok' | 'invalid' | 'unavailable' };

export async function subscribeAction(_previous: SubscribeState, formData: FormData): Promise<SubscribeState> {
  // Hidden field that real visitors never fill in; bots do.
  if (String(formData.get('website') ?? '').trim()) return { status: 'ok' };

  return { status: await requestSubscription(String(formData.get('email') ?? '')) };
}

export async function unsubscribeAction(formData: FormData) {
  const ok = await unsubscribe(String(formData.get('token') ?? ''));

  redirect((ok ? '/subscribe/unsubscribe?done=1' : '/subscribe/unsubscribe?done=invalid') as Route);
}
