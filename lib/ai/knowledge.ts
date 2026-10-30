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
import { readCvContent } from '@/lib/cv-content-store';
import type { KnowledgeSection } from '@/lib/ai/provider';

/** Builds the Research AI knowledge base from the same live data that powers the website. */
export async function buildKnowledgeSections(): Promise<KnowledgeSection[]> {
  const [site, cv] = await Promise.all([getSiteConfig(), readCvContent()]);
  const skillsByCategory = new Map<string, string[]>();

  for (const skill of skills) {
    skillsByCategory.set(skill.category, [...(skillsByCategory.get(skill.category) ?? []), skill.name]);
  }

  const sections: KnowledgeSection[] = [
    {
      title: 'Overview',
      text: `${site.name} is a ${site.title.toLowerCase()} at ${site.university}, based in ${site.location}. ${site.headline}`,
      sources: [{ label: 'About', href: '/about' }],
    },
    {
      title: 'Research interests',
      text: interests.filter((item) => item.published).map((item) => `${item.title}: ${item.description}`).join('\n'),
      sources: [{ label: 'Research interests', href: '/research' }],
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
        sources: [{ label: 'Project details', href: `/research/${project.slug}` }],
      })),
    ...publications
      .filter((item) => item.published)
      .map((item) => ({
        title: `Publication: ${item.title}`,
        text: `${item.title} (${item.publicationType}, ${item.journal || item.conference}, ${item.publicationDate}). Authors: ${item.authors.join(', ')}. ${item.abstract}${item.doi ? ` DOI: ${item.doi}.` : ''}`,
        sources: [{ label: 'Publication details', href: `/publications/${item.slug}` }],
      })),
    {
      title: 'Experience',
      text: experience
        .map((item) => `${item.role} at ${item.organization} (${[item.location, formatPeriod(item)].filter(Boolean).join(', ')}). ${item.description} ${item.responsibilities.join('; ')}.`)
        .join('\n'),
      sources: [{ label: 'Experience', href: '/experience' }],
    },
    {
      title: 'Education',
      text: education
        .map((item) => `${item.degree}, ${item.institution} (${item.startDate} – ${item.endDate}). ${item.description}`)
        .join('\n'),
      sources: [{ label: 'Education', href: '/education' }],
    },
    {
      title: 'Awards and honors',
      text: awards.map((item) => `${item.title}, ${item.organization}${item.year ? ` (${item.year})` : ''}. ${item.description}${item.quote ? ` A nominating teammate wrote: "${item.quote.text}"` : ''}`).join('\n'),
      sources: [{ label: 'Awards and honors', href: '/awards' }],
    },
    {
      title: 'Presentations and conferences',
      text: [
        'At the 2025 SmallSat Education Conference at NASA Kennedy Space Center (October 25–26, 2025), you presented findings from SOLARIS on how solar-panel efficiency varies with altitude. The high-altitude balloon payload carried six solar panels to measure output at different altitudes.',
        ...presentations.map((item) => `${item.title} — ${item.event} (${item.presentationType}, ${item.date}). ${item.abstract}`),
        `Conferences attended or presented at: ${cv.conferences.join('; ')}.`,
      ].join('\n'),
      sources: [{ label: 'Presentations and NASA video', href: '/presentations' }],
    },
    {
      title: 'Skills and tools',
      text: Array.from(skillsByCategory, ([category, names]) => `${category}: ${names.join(', ')}`).join('\n'),
      sources: [{ label: 'Skills', href: '/skills' }],
    },
    {
      title: 'Leadership, workshops and certifications',
      text: [
        ...cv.leadership.map((item) => `${item.organization} — ${item.role}.${item.note ? ` ${item.note}` : ''} (University and community)`),
        ...cv.leadershipSchool.map((item) => `${item.organization}${item.role ? ` — ${item.role}` : ''}.${item.note ? ` ${item.note}` : ''} (High school)`),
        `Workshops and certifications: ${cv.certifications.join('; ')}.`,
      ].join('\n'),
      sources: [{ label: 'Experience and CV', href: '/experience' }, { label: 'CV', href: '/cv' }],
    },
    {
      title: 'Contact and links',
      text: `Email: ${site.email}. ${Object.entries(site.socials).filter(([, value]) => value).map(([name, value]) => `${name}: ${value}`).join('. ')}.`,
      sources: [{ label: 'Contact', href: '/contact' }],
    },
    {
      title: 'Featured videos',
      text: 'Catalyst is a Williamsville Central School District and PTSA Speaker Series profile: Portrait of a Graduate — Creative Innovator and Critical Thinker. The NASA SmallSat Education Conference presentation shares findings from the SOLARIS high-altitude balloon solar-panel study.',
      sources: [{ label: 'About video', href: '/about' }, { label: 'NASA presentation', href: '/presentations' }],
    },
  ];

  const posts = blogPosts.filter((post) => post.published);

  if (posts.length > 0) {
    sections.push({
      title: 'Blog',
      text: posts.map((post) => `${post.title}: ${post.summary}`).join('\n'),
      sources: [{ label: 'Blog', href: '/blog' }],
    });
  }

  return sections.filter((section) => section.text.trim().length > 0);
}
