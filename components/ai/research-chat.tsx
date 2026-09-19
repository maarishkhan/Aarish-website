'use client';

import { useState } from 'react';

export function ResearchChat() {
  const [question, setQuestion] = useState('What are the main research areas?');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: question }),
      });

      const data = await response.json();
      setAnswer(data.answer || 'No response available.');
    } catch {
      setAnswer('The AI service is temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Ask about the research profile</h2>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0 transition focus:border-sky-500"
          placeholder="Ask about the research focus, projects, or publications"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? 'Generating answer...' : 'Ask the AI'}
        </button>
      </form>

      {answer ? (
        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm leading-7 text-slate-700">
          {answer}
        </div>
      ) : null}
    </div>
  );
}
