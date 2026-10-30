'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { trackEvent } from '@/lib/track';

const SUGGESTIONS = [
  'Complete profile please',
  'What are the main research areas?',
  'Tell me about the cancer immunotherapy project',
  'What did I present at the NASA SmallSat conference?',
  'What is the Catalyst Speaker Series video about?',
  'What computational tools are used in the research?',
  'What awards and honors are listed?',
];

export function ResearchChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<{ label: string; href: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function ask(text: string) {
    const prompt = text.trim();

    if (!prompt || loading) return;

    // Counts that a question was asked; the question itself is never sent to analytics.
    trackEvent('research_ai_question');
    setQuestion(prompt);
    setLoading(true);
    setAnswer('');
    setSources([]);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      setAnswer(data.answer || 'No response available.');
      setSources(Array.isArray(data.sources) ? data.sources : []);
    } catch {
      setAnswer('The assistant is temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-surface p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => ask(suggestion)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          ask(question);
        }}
        className="mt-5 space-y-4"
      >
        <label htmlFor="research-question" className="sr-only">Your question</label>
        <textarea
          id="research-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={500}
          rows={3}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0 transition focus:border-brand"
          placeholder="Ask about the research, publications, experience, or education"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="btn btn-primary"
        >
          {loading ? 'Thinking…' : 'Ask'}
        </button>
      </form>

      <div aria-live="polite">
        {answer ? (
          <div className="mt-6 whitespace-pre-line rounded-2xl border border-brand/15 bg-brand/5 p-4 text-sm leading-7 text-slate-700">
            {answer}
          </div>
        ) : null}
        {sources.length > 0 ? (
          <nav className="mt-4" aria-label="Related pages">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Related pages</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {sources.map((source) => (
                <li key={source.href}>
                  <Link href={source.href as Route} className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-brand hover:border-brand">
                    {source.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      <p className="mt-4 text-xs text-slate-500">Answers are generated from the content of this website and may be incomplete. For anything important, please contact the researcher directly. Your question may be sent to an AI provider to generate the answer, so please do not include personal or confidential information. See the <Link href="/privacy" className="underline">privacy notice</Link>.</p>
    </div>
  );
}
