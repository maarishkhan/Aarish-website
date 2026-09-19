import { NextRequest, NextResponse } from 'next/server';
import { callAiProvider } from '@/lib/ai/provider';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const prompt = typeof body?.prompt === 'string' ? body.prompt : '';

  const result = await callAiProvider(prompt);

  return NextResponse.json(result, {
    status: result.status === 'error' ? 500 : 200,
  });
}
