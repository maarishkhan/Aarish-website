'use client';

import { useState } from 'react';
import Link from 'next/link';

const SUGGESTIONS = [
  'What are the main research areas?',
  'Tell me about the cancer immunotherapy project',
  'What computational tools does he use?',
  'What awards has he received?',
];

export function ResearchChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function ask(text: string) {
    const prompt = text.trim();

    if (!prompt || loading) return;

    setQuestion(prompt);
    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      setAnswer(data.answer || 'No response available.');
    } catch {
      setAnswer('The assistant is temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-surface max-w-4xl p-6 sm:p-8">
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
      </div>

      <p className="mt-4 text-xs text-slate-500">Answers are generated from the content of this website and may be incomplete. For anything important, please contact the researcher directly. Your question may be sent to an AI provider to generate the answer, so please do not include personal or confidential information. See the <Link href="/privacy" className="underline">privacy notice</Link>.</p>
    </div>
  );
}
