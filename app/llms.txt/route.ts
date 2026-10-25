import { awards, getSiteConfig, getSocialLinks, publications, researchProjects } from '@/data/site-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteConfig = await getSiteConfig();
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aarishkhan.vercel.app').replace(/\/$/, '');

  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.headline}`,
    '',
    siteConfig.bio,
    '',
    `${siteConfig.university} · ${siteConfig.location}`,
    '',
    '## Research',
    ...researchProjects.filter((item) => item.published).map((item) => `- [${item.title}](${base}/research/${item.slug}): ${item.shortDescription}`),
    '',
    '## Publications',
    ...publications.filter((item) => item.published).map((item) => `- [${item.title}](${base}/publications/${item.slug}): ${item.citation}`),
    '',
    '## Awards',
    ...awards.map((award) => `- ${award.title}, ${[award.organization, award.year].filter(Boolean).join(', ')}`),
    '',
    '## Pages',
    `- [About](${base}/about)`,
    `- [Experience](${base}/experience)`,
    `- [Education](${base}/education)`,
    `- [Presentations](${base}/presentations)`,
    `- [CV](${base}/cv)`,
    `- [Contact](${base}/contact)`,
    '',
    '## Profiles',
    ...getSocialLinks(siteConfig).filter((link) => link.enabled).map((link) => `- [${link.title}](${link.href})`),
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
