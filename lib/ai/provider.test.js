import test from 'node:test';
import assert from 'node:assert/strict';

import { buildAiPrompt, callAiProvider, getConfiguredAiProvider } from './provider.js';

test('buildAiPrompt includes the site profile and the user question', () => {
  const prompt = 'What are the main research interests?';
  const result = buildAiPrompt(prompt);

  assert.match(result, /Biomedical Engineering Researcher/i);
  assert.match(result, /What are the main research interests\?/i);
  assert.match(result, /Biomedical Imaging/i);
});

test('getConfiguredAiProvider reports a configured OpenAI integration when the env values are set', () => {
  const result = getConfiguredAiProvider('openai', 'sk-test-123', 'gpt-4o-mini');

  assert.equal(result.enabled, true);
  assert.equal(result.provider, 'openai');
  assert.equal(result.model, 'gpt-4o-mini');
});

test('callAiProvider uses a live Gemini request when the provider is configured', async () => {
  const previousProvider = process.env.AI_PROVIDER;
  const previousApiKey = process.env.AI_API_KEY;
  const previousModel = process.env.AI_MODEL;
  const previousFetch = fetch;

  process.env.AI_PROVIDER = 'gemini';
  process.env.AI_API_KEY = 'gemini-test-key';
  process.env.AI_MODEL = 'gemini-2.0-flash';
  globalThis.fetch = async (url, init) => {
    assert.match(String(url), /generativelanguage.googleapis.com/);
    assert.equal(init.method, 'POST');
    return {
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Gemini answer from the live provider.' }] } }],
      }),
    };
  };

  try {
    const result = await callAiProvider('How is the lab organized?');
    assert.equal(result.provider, 'gemini');
    assert.equal(result.status, 'configured');
    assert.match(result.answer, /Gemini answer from the live provider/i);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousProvider === undefined) delete process.env.AI_PROVIDER;
    else process.env.AI_PROVIDER = previousProvider;

    if (previousApiKey === undefined) delete process.env.AI_API_KEY;
    else process.env.AI_API_KEY = previousApiKey;

    if (previousModel === undefined) delete process.env.AI_MODEL;
    else process.env.AI_MODEL = previousModel;
  }
});

test('getConfiguredAiProvider rejects missing credentials gracefully', () => {
  const result = getConfiguredAiProvider('none', '', '');

  assert.equal(result.enabled, false);
  assert.equal(result.provider, 'none');
  assert.equal(result.message.includes('not configured'), true);
});
