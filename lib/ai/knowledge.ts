import {
  awards,
  blogPosts,
  education,
  experience,
  formatPeriod,
  getSiteConfig,
  interests,
  presentations,
  publications,
  researchProjects,
  skills,
} from '@/data/site-config';
import { cvConferences, cvLeadership, cvWorkshopsAndCertifications } from '@/data/cv-extras';
import type { KnowledgeSection } from '@/lib/ai/provider';

/** Builds the Research AI knowledge base from the same live data that powers the website. */
export async function buildKnowledgeSections(): Promise<KnowledgeSection[]> {
  const site = await getSiteConfig();
  const skillsByCategory = new Map<string, string[]>();

  for (const skill of skills) {
    skillsByCategory.set(skill.category, [...(skillsByCategory.get(skill.category) ?? []), skill.name]);
  }

  const sections: KnowledgeSection[] = [
    {
      title: 'Overview',
      text: `${site.name} is a ${site.title.toLowerCase()} at ${site.university}, based in ${site.location}. ${site.headline}`,
    },
    {
      title: 'Research interests',
      text: interests.filter((item) => item.published).map((item) => `${item.title}: ${item.description}`).join('\n'),
    },
    ...researchProjects
      .filter((project) => project.published)
      .map((project) => ({
        title: `Research project: ${project.title}`,
        text: [
          project.description,
          project.researchQuestion && `Research question: ${project.researchQuestion}`,
          project.motivation && `Motivation: ${project.motivation}`,
          project.methodology && `Methodology: ${project.methodology}`,
          project.results && `Outcomes: ${project.results}`,
          project.technologies.length > 0 && `Tools: ${project.technologies.join(', ')}`,
          `Status: ${project.status}. ${project.institution}. ${project.startDate} – ${project.endDate}.`,
        ].filter(Boolean).join('\n'),
      })),
    {
      title: 'Publications',
      text: publications
        .filter((item) => item.published)
        .map((item) => `${item.title} (${item.publicationType}, ${item.journal || item.conference}, ${item.publicationDate}). Authors: ${item.authors.join(', ')}. ${item.abstract}${item.doi ? ` DOI: ${item.doi}.` : ''}`)
        .join('\n'),
    },
    {
      title: 'Experience',
      text: experience
        .map((item) => `${item.role} at ${item.organization} (${[item.location, formatPeriod(item)].filter(Boolean).join(', ')}). ${item.description} ${item.responsibilities.join('; ')}.`)
        .join('\n'),
    },
    {
      title: 'Education',
      text: education
        .map((item) => `${item.degree}, ${item.institution} (${item.startDate} – ${item.endDate}). ${item.description}`)
        .join('\n'),
    },
    {
      title: 'Awards and honors',
      text: awards.map((item) => `${item.title}, ${item.organization} (${item.year}). ${item.description}${item.quote ? ` A nominating teammate wrote: "${item.quote.text}"` : ''}`).join('\n'),
    },
    {
      title: 'Presentations and conferences',
      text: [
        ...presentations.map((item) => `${item.title} — ${item.event} (${item.presentationType}, ${item.date}). ${item.abstract}`),
        `Conferences attended or presented at: ${cvConferences.join('; ')}.`,
      ].join('\n'),
    },
    {
      title: 'Skills and tools',
      text: Array.from(skillsByCategory, ([category, names]) => `${category}: ${names.join(', ')}`).join('\n'),
    },
    {
      title: 'Leadership, workshops and certifications',
      text: [
        ...cvLeadership.map((item) => `${item.organization} — ${item.role}.${item.note ? ` ${item.note}` : ''}`),
        `Workshops and certifications: ${cvWorkshopsAndCertifications.join('; ')}.`,
      ].join('\n'),
    },
    {
      title: 'Contact and links',
      text: `Email: ${site.email}. ${Object.entries(site.socials).filter(([, value]) => value).map(([name, value]) => `${name}: ${value}`).join('. ')}.`,
    },
  ];

  const posts = blogPosts.filter((post) => post.published);

  if (posts.length > 0) {
    sections.push({ title: 'Blog', text: posts.map((post) => `${post.title}: ${post.summary}`).join('\n') });
  }

  return sections.filter((section) => section.text.trim().length > 0);
}
