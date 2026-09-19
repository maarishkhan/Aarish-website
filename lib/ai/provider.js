const researchProfile = {
  name: 'M Aarish Khan',
  title: 'Biomedical Engineering Researcher',
  university: 'University at Buffalo Honors College and Jacobs School of Medicine and Biomedical Sciences',
  location: 'Buffalo, NY, USA',
  bio: 'Researcher exploring translational biomedical engineering, computational health, and experimental methods that connect engineering design with human clinical outcomes.',
  interests: ['Biomedical Imaging', 'Biomaterials', 'Computational Biology', 'Medical Devices'],
  projects: ['ADHD Genetics Research', 'DuoDok Computational Workflow', 'Water Purification Research'],
  publications: ['Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T Cells for Immunotherapy in NSCLC', 'DuoDok — Independent Computational Research Tool'],
};

export function buildAiPrompt(prompt = '') {
  const profile = [
    `Researcher profile: ${researchProfile.name}`,
    `Title: ${researchProfile.title}`,
    `University: ${researchProfile.university}`,
    `Location: ${researchProfile.location}`,
    `Bio: ${researchProfile.bio}`,
    `Research interests: ${researchProfile.interests.join(', ')}`,
    `Projects: ${researchProfile.projects.join(', ')}`,
    `Publications: ${researchProfile.publications.join(', ')}`,
  ].join('\n');

  return `You are assisting with a biomedical engineering researcher website. Use only the profile facts below.\n\n${profile}\n\nUser question: ${String(prompt || '').trim() || 'Describe the research profile.'}\n\nProvide a concise answer grounded in the website content.`;
}

export function getConfiguredAiProvider(provider = process.env.AI_PROVIDER ?? 'none', apiKey = process.env.AI_API_KEY ?? '', model = process.env.AI_MODEL ?? 'gpt-4o-mini') {
  const normalizedProvider = String(provider ?? 'none').trim().toLowerCase();
  const hasApiKey = Boolean(String(apiKey ?? '').trim());
  const normalizedModel = String(model ?? '').trim();

  if (normalizedProvider === 'none' || !hasApiKey) {
    return {
      enabled: false,
      provider: normalizedProvider,
      model: normalizedModel || 'not-set',
      message: 'Research AI is not configured and is currently unavailable.',
    };
  }

  return {
    enabled: true,
    provider: normalizedProvider,
    model: normalizedModel || 'default',
    message: 'Research AI is configured and ready to respond to questions.',
  };
}

export function getAiProviderStatus() {
  const provider = String(process.env.AI_PROVIDER ?? 'none').trim().toLowerCase();
  const apiKey = String(process.env.AI_API_KEY ?? '').trim();

  if (provider === 'none' || !apiKey) {
    return {
      enabled: false,
      provider,
      message: 'Research AI is unavailable because the provider and API key are not configured.',
    };
  }

  return {
    enabled: true,
    provider,
    message: 'Research AI is configured and ready for requests.',
  };
}

export function getAiConfig() {
  return {
    provider: String(process.env.AI_PROVIDER ?? 'none').trim(),
    model: String(process.env.AI_MODEL ?? 'gpt-4o-mini').trim(),
    embeddingModel: String(process.env.EMBEDDING_MODEL ?? 'text-embedding-3-small').trim(),
    enabled: Boolean(String(process.env.AI_PROVIDER ?? '').trim()) && Boolean(String(process.env.AI_API_KEY ?? '').trim()),
  };
}

export async function callAiProvider(prompt = '') {
  const provider = getConfiguredAiProvider(process.env.AI_PROVIDER, process.env.AI_API_KEY, process.env.AI_MODEL);

  if (!provider.enabled) {
    return {
      answer: `The AI service is currently offline. ${provider.message}`,
      provider: 'fallback',
      status: 'offline',
      message: provider.message,
    };
  }

  try {
    const text = buildAiPrompt(prompt);

    if (provider.provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: provider.model || 'gpt-4o-mini',
          messages: [{ role: 'user', content: text }],
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`OpenAI request failed: ${response.status} ${body}`);
      }

      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content ?? 'No response returned by the model.';

      return {
        answer,
        provider: 'openai',
        status: 'configured',
        message: 'Live OpenAI response generated from the research profile.',
      };
    }

    if (provider.provider === 'gemini' || provider.provider === 'google') {
      const modelName = provider.model || 'gemini-2.0-flash';
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(String(process.env.AI_API_KEY ?? ''))}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
          },
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Gemini request failed: ${response.status} ${body}`);
      }

      const data = await response.json();
      const answer = data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text)
        .filter(Boolean)
        .join(' ') || 'No response returned by the model.';

      return {
        answer,
        provider: 'gemini',
        status: 'configured',
        message: 'Live Gemini response generated from the research profile.',
      };
    }

    return {
      answer: `AI provider "${provider.provider}" is configured, but this app has not yet added a live integration for it. Using the guarded research profile context instead.`,
      provider: provider.provider,
      status: 'configured',
      message: provider.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown AI error';
    return {
      answer: `The AI service encountered an error while answering the question. ${message}`,
      provider: 'fallback',
      status: 'error',
      message: 'The live AI request failed; fallback content is unavailable.',
    };
  }
}
