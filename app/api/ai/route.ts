import { NextRequest, NextResponse } from 'next/server';
import { callAiProvider } from '@/lib/ai/provider';
import { buildKnowledgeSections } from '@/lib/ai/knowledge';

const MAX_QUESTION_LENGTH = 500;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;

// Best-effort per-instance rate limit; swap for a shared store (e.g. Redis) for strict limits.
const recentRequests = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const timestamps = (recentRequests.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  timestamps.push(now);
  recentRequests.set(key, timestamps);

  if (recentRequests.size > 1000) {
    for (const [mapKey, times] of recentRequests) {
      if (times.every((time) => now - time >= WINDOW_MS)) recentRequests.delete(mapKey);
    }
  }

  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ answer: 'Too many questions in a short time. Please wait a minute and try again.', status: 'rate-limited' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim().slice(0, MAX_QUESTION_LENGTH) : '';

  if (!prompt) {
    return NextResponse.json({ answer: 'Please enter a question.', status: 'error' }, { status: 400 });
  }

  const result = await callAiProvider(prompt, await buildKnowledgeSections());

  return NextResponse.json(result);
}
