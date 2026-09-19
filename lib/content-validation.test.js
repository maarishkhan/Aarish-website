import test from 'node:test';
import assert from 'node:assert/strict';

import { getAiStatus, validateSiteConfig } from './content-validation.js';

test('validateSiteConfig normalizes required fields and keeps sample-safe defaults', () => {
  const config = validateSiteConfig({
    name: '  Aarish Rahman  ',
    title: 'Biomedical Engineer',
    email: 'aarish@example.edu',
    university: 'Example University',
    location: 'Boston, MA',
    bio: 'Researcher dedicated to translational biomedical engineering.',
    headline: 'Biomedical engineering researcher',
    socials: { github: 'https://github.com/example', linkedin: 'https://linkedin.com/in/example' },
    navItems: [{ label: 'Home', href: '/', enabled: true }],
    features: { research: true, publications: true, blog: true, researchAI: true },
  });

  assert.equal(config.name, 'Aarish Rahman');
  assert.equal(config.email, 'aarish@example.edu');
  assert.equal(config.navItems.length, 1);
  assert.equal(config.features.researchAI, true);
});

test('getAiStatus flags missing provider configuration clearly', () => {
  const status = getAiStatus('none', '');

  assert.equal(status.enabled, false);
  assert.match(status.message, /not configured|unavailable/i);
});

test('getAiStatus accepts configured AI providers with a positive state', () => {
  const status = getAiStatus('openai', 'sk-test-key');

  assert.equal(status.enabled, true);
  assert.match(status.message, /ready|configured/i);
});
