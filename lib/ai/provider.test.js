import test from 'node:test';
import assert from 'node:assert/strict';

import { answerFromSections, buildAiPrompt, callAiProvider, getConfiguredAiProvider } from './provider.js';

const sections = [
  { title: 'Overview', text: 'Mohammad Aarish Khan is a biomedical engineering researcher.' },
  { title: 'Research project: ADHD Genetics Research', text: 'Uses FastENLOC to analyze genetic data for ADHD.' },
  { title: 'Publications', text: 'Bispecific DuoBody antibody for NSCLC immunotherapy, IEEE ISEC 2025.' },
];

function withEnv(values, fn) {
  const previous = {};
  for (const key of Object.keys(values)) previous[key] = process.env[key];
  Object.assign(process.env, values);

  return fn().finally(() => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
}

test('buildAiPrompt includes the site content and the user question', () => {
  const result = buildAiPrompt('What are the main research interests?', sections);

  assert.match(result, /ADHD Genetics Research/);
  assert.match(result, /What are the main research interests\?/);
  assert.match(result, /ONLY the site content/);
});

test('answerFromSections returns the most relevant section', () => {
  const answer = answerFromSections('Tell me about the ADHD genetics work', sections);

  assert.match(answer, /FastENLOC/);
});

test('answerFromSections admits when nothing matches', () => {
  const answer = answerFromSections('quantum basketball', sections);

  assert.match(answer, /could not find a specific answer/i);
});

test('getConfiguredAiProvider reports a configured integration and a default model', () => {
  const result = getConfiguredAiProvider('anthropic', 'sk-test-123', '');

  assert.equal(result.enabled, true);
  assert.equal(result.provider, 'anthropic');
  assert.ok(result.model.length > 0);
});

test('getConfiguredAiProvider rejects missing credentials gracefully', () => {
  const result = getConfiguredAiProvider('none', '', '');

  assert.equal(result.enabled, false);
  assert.equal(result.message.includes('not configured'), true);
});

test('callAiProvider falls back to site search when no provider is configured', async () => {
  await withEnv({ AI_PROVIDER: 'none', AI_API_KEY: '' }, async () => {
    const result = await callAiProvider('What is the ADHD research?', sections);

    assert.equal(result.status, 'fallback');
    assert.match(result.answer, /FastENLOC/);
  });
});

test('callAiProvider uses a live Anthropic request when configured', async () => {
  const previousFetch = globalThis.fetch;

  globalThis.fetch = async (url, init) => {
    assert.match(String(url), /api\.anthropic\.com/);
    assert.equal(JSON.parse(init.body).messages[0].content, 'How is the lab organized?');
    return { ok: true, json: async () => ({ content: [{ type: 'text', text: 'Live Claude answer.' }] }) };
  };

  try {
    await withEnv({ AI_PROVIDER: 'anthropic', AI_API_KEY: 'test-key', AI_MODEL: '' }, async () => {
      const result = await callAiProvider('How is the lab organized?', sections);

      assert.equal(result.provider, 'anthropic');
      assert.equal(result.status, 'live');
      assert.match(result.answer, /Live Claude answer/);
    });
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test('callAiProvider falls back when the live provider fails', async () => {
  const previousFetch = globalThis.fetch;
  const previousError = console.error;

  globalThis.fetch = async () => ({ ok: false, status: 500 });
  console.error = () => {};

  try {
    await withEnv({ AI_PROVIDER: 'openai', AI_API_KEY: 'test-key', AI_MODEL: '' }, async () => {
      const result = await callAiProvider('ADHD genetics', sections);

      assert.equal(result.status, 'fallback');
      assert.match(result.answer, /FastENLOC/);
    });
  } finally {
    globalThis.fetch = previousFetch;
    console.error = previousError;
  }
});
