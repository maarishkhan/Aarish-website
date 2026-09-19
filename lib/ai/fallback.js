import { siteConfig, interests, researchProjects, publications } from '@/data/site-config';

export function buildResearchContextSummary() {
  return {
    profile: {
      name: siteConfig.name,
      title: siteConfig.title,
      university: siteConfig.university,
      location: siteConfig.location,
    },
    interests: interests.filter((interest) => interest.published).map((item) => item.title),
    projects: researchProjects.filter((project) => project.published).map((item) => item.title),
    publications: publications.filter((publication) => publication.published).map((item) => item.title),
  };
}

export function getFallbackAiResponse(prompt = '') {
  const context = buildResearchContextSummary();
  const normalizedPrompt = String(prompt).trim().toLowerCase();

  if (!normalizedPrompt) {
    return 'Ask about the researcher\'s interests, projects, publications, or academic background.';
  }

  if (normalizedPrompt.includes('interest') || normalizedPrompt.includes('focus') || normalizedPrompt.includes('research')) {
    return `${context.profile.name} focuses on ${context.interests.join(', ')} with a strong emphasis on translational biomedical engineering and clinically relevant problem solving.`;
  }

  if (normalizedPrompt.includes('project') || normalizedPrompt.includes('study')) {
    return `Recent projects include ${context.projects.join(', ')}. These efforts connect experimental methods, biomedical data, and practical research translation.`;
  }

  if (normalizedPrompt.includes('publication') || normalizedPrompt.includes('paper') || normalizedPrompt.includes('work')) {
    return `Selected publications include ${context.publications.join(', ')}. The work spans interdisciplinary biomedical engineering and applied analytical methods.`;
  }

  return `Based on the available site profile, ${context.profile.name} is a ${context.profile.title} affiliated with ${context.profile.university} in ${context.profile.location}. The website highlights research in ${context.interests.join(', ')} and features work across ${context.projects.length} major projects.`;
}
