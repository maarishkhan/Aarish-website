import type { RadarAxis } from '@/components/cv/radar-chart';
import { awards, education, experience, getSiteConfig, publications, researchProjects, skills } from '@/data/site-config';
import { readCvContent, type RadarKey } from '@/lib/cv-content-store';

/** The six radar axes, in drawing order, with the default count that fills each one. */
export const radarAxes: { key: RadarKey; label: string; max: number }[] = [
  { key: 'research', label: 'Research', max: 8 },
  { key: 'presentations', label: 'Presentations', max: 10 },
  { key: 'recognition', label: 'Recognition', max: 20 },
  { key: 'skills', label: 'Skills', max: 60 },
  { key: 'experience', label: 'Experience', max: 12 },
  { key: 'leadership', label: 'Leadership', max: 12 },
];

export function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

/** Everything the CV pages show, gathered once: site content, filtered by the CV settings from the admin. */
export async function getCvData() {
  const [site, cv] = await Promise.all([getSiteConfig(), readCvContent()]);
  const isCurrent = (item: { endDate: string }) => /present/i.test(item.endDate);
  const cvExperience = experience.filter((item) => !cv.hiddenExperience.includes(item.id));
  const cvAwards = awards.filter((item) => !cv.hiddenAwards.includes(item.id));
  const featuredPublications = publications.filter((item) => item.published && item.featured);
  const cvPublications = featuredPublications.length > 0 ? featuredPublications : publications.filter((item) => item.published);
  const skillGroups = skills
    .filter((skill) => !cv.hiddenSkills.includes(skill.id))
    .reduce<Record<string, string[]>>((groups, skill) => {
      (groups[skill.category] ??= []).push(skill.name);
      return groups;
    }, {});
  const contactLines = [
    cv.email || site.email,
    cv.showLinkedin && site.socials.linkedin && stripProtocol(site.socials.linkedin),
    cv.showGithub && site.socials.github && stripProtocol(site.socials.github),
    cv.showScholar && site.socials.scholar && 'Google Scholar profile',
    cv.showOrcid && site.socials.orcid && `ORCID: ${stripProtocol(site.socials.orcid).replace('orcid.org/', '')}`,
  ].filter(Boolean) as string[];

  // Every figure is counted from the site's own content (and the CV settings), so it stays accurate when they change.
  // `max` is the count that fills an axis; it only sets the scale of the chart, the real counts are printed beside it.
  // Both can be overridden from the admin (`cv.radar`).
  const autoCounts: Record<RadarKey, number> = {
    research: researchProjects.filter((item) => item.published).length + cvPublications.length,
    presentations: cv.conferences.length,
    recognition: cvAwards.length,
    skills: Object.values(skillGroups).reduce((sum, names) => sum + names.length, 0),
    experience: cvExperience.length,
    leadership: cv.leadership.length + cv.leadershipSchool.length,
  };
  const radarSettings = radarAxes.map((axis) => ({
    ...axis,
    auto: autoCounts[axis.key],
    value: cv.radar[axis.key]?.value ?? autoCounts[axis.key],
    max: cv.radar[axis.key]?.max ?? axis.max,
  }));
  const radar: RadarAxis[] = radarSettings.map(({ label, value, max }) => ({ label, value, max }));

  return {
    site,
    cv,
    education,
    current: cvExperience.filter(isCurrent),
    past: cvExperience.filter((item) => !isCurrent(item)),
    cvAwards,
    cvPublications,
    skillGroups,
    contactLines,
    radar,
    radarSettings,
    /** The degree currently being studied, for the header line (for example "Biomedical Engineering Major"). */
    currentEducation: education.find(isCurrent) ?? education[0],
  };
}
