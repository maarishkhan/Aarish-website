'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/track';

type EmailActionsProps = {
  email: string;
  /** The site owner's name, used to greet them in the pre-filled message. */
  name: string;
};

const TOPICS = [
  { label: 'Research collaboration', subject: 'Research collaboration inquiry' },
  { label: 'Community engineering or global health project', subject: 'Community engineering project inquiry' },
  { label: 'Mentorship or student programs', subject: 'Mentorship or student program inquiry' },
  { label: 'Something else', subject: 'Message from your website' },
];

/**
 * Three ways to write to the site owner, because a mailto: link does nothing when the visitor has no default mail app.
 * The visitor picks what the message is about, which sets the subject line and a short opening for the message.
 */
export function EmailActions({ email, name }: EmailActionsProps) {
  const [topicIndex, setTopicIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const topic = TOPICS[topicIndex];
  const body = `Hello ${name},\n\nI found your website and would like to get in touch about: ${topic.label.toLowerCase()}.\n\n[Please add a few details here: who you are and what you have in mind.]\n\nThank you,\n`;
  const subject = encodeURIComponent(topic.subject);
  const mailto = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}&body=${encodeURIComponent(body)}`;

  async function copyAddress() {
    trackEvent('contact_email', { method: 'copy', topic: topic.subject });

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers or blocked clipboard access: fall back to selecting a temporary field.
      const field = document.createElement('textarea');

      field.value = email;
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      document.body.removeChild(field);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        What is your message about?
        <select
          value={topicIndex}
          onChange={(event) => setTopicIndex(Number(event.target.value))}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-brand focus:outline-none"
        >
          {TOPICS.map((item, index) => (
            <option key={item.label} value={index}>{item.label}</option>
          ))}
        </select>
      </label>
      <p className="text-xs text-slate-500">
        Subject: <span className="font-medium text-slate-700">{topic.subject}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        <a href={mailto} onClick={() => trackEvent('contact_email', { method: 'mailto', topic: topic.subject })} className="btn btn-primary btn-sm">Send an email</a>
        <a href={gmail} target="_blank" rel="noreferrer" onClick={() => trackEvent('contact_email', { method: 'gmail', topic: topic.subject })} className="btn btn-secondary btn-sm">Open in Gmail</a>
        <button type="button" onClick={copyAddress} className="btn btn-secondary btn-sm" aria-live="polite">
          {copied ? 'Copied!' : 'Copy email address'}
        </button>
      </div>
    </div>
  );
}
