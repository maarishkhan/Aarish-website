import { readDatabaseCollection } from '@/lib/content-database';
import { readSiteContent } from '@/lib/site-content-store';

export type TemplateSection = {
  key: string;
  label: string;
  enabled: boolean;
};

export type SiteConfig = {
  name: string;
  title: string;
  headline: string;
  bio: string;
  university: string;
  location: string;
  email: string;
  phone?: string;
  profileImage?: string;
  heroImage?: string;
  theme: {
    accent: string;
    accentSoft: string;
    secondary: string;
    secondarySoft: string;
  };
  socials: {
    github?: string;
    linkedin?: string;
    medium?: string;
    scholar?: string;
    orcid?: string;
    researchgate?: string;
  };
  navItems: { label: string; href: string; enabled: boolean }[];
  templateSections: TemplateSection[];
  features: {
    research: boolean;
    publications: boolean;
    blog: boolean;
    researchAI: boolean;
  };
};

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true;
    if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false;
  }
  return fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item));
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return (await readSiteContent()) as SiteConfig;
}

export function getSocialLinks(activeConfig: SiteConfig) {

  return [
    { title: 'GitHub', href: activeConfig.socials.github || '#', enabled: !!activeConfig.socials.github },
    { title: 'LinkedIn', href: activeConfig.socials.linkedin || '#', enabled: !!activeConfig.socials.linkedin },
    { title: 'Medium', href: activeConfig.socials.medium || '#', enabled: !!activeConfig.socials.medium },
    { title: 'Google Scholar', href: activeConfig.socials.scholar || '#', enabled: !!activeConfig.socials.scholar },
    { title: 'ORCID', href: activeConfig.socials.orcid || '#', enabled: !!activeConfig.socials.orcid },
    { title: 'ResearchGate', href: activeConfig.socials.researchgate || '#', enabled: !!activeConfig.socials.researchgate },
  ];
}

export type ResearchInterest = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  keywords: string[];
  icon: string;
  displayOrder: number;
  published: boolean;
};

export const interests: ResearchInterest[] = [
  {
    id: 'cancer-immunotherapy',
    title: 'Computational Immunotherapy',
    shortDescription: 'Structure-based design of bispecific antibodies for cancer immunotherapy.',
    description: 'Using molecular modeling and interaction analysis to design and evaluate antibody-based immunotherapies, such as bispecific antibodies targeting 4-1BB and PD-L1 in non-small cell lung cancer.',
    keywords: ['bispecific antibodies', 'AlphaFold', 'GROMACS', 'NSCLC'],
    icon: 'dna',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'computational-genetics',
    title: 'Computational Genetics',
    shortDescription: 'Statistical and computational analysis of genetic data to study complex disease.',
    description: 'Applying FLAMES and FUMA-based analysis of genome-wide association data to investigate the genetic architecture of neurological conditions and other complex disease.',
    keywords: ['genomics', 'GWAS', 'FUMA', 'FLAMES', 'neurological conditions'],
    icon: 'graph',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'global-health-engineering',
    title: 'Global Health Engineering',
    shortDescription: 'Low-cost, context-aware technologies for underserved communities.',
    description: 'Designing affordable and maintainable engineering solutions, including UV-based water purification systems for disenfranchised communities, shaped by local constraints and community needs.',
    keywords: ['water purification', 'systems design', 'public health'],
    icon: 'pulse',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'synthetic-biology',
    title: 'Synthetic Biology',
    shortDescription: 'Engineering biological systems and genetic tools for real-world applications.',
    description: 'Exploring how genetic engineering and synthetic biology can be applied to biomedical problems, with an emphasis on accessible and translational approaches.',
    keywords: ['synthetic biology', 'genetic engineering', 'translational research'],
    icon: 'sparkles',
    displayOrder: 4,
    published: true,
  },
];

export const researchInterests: ResearchInterest[] = await readDatabaseCollection<ResearchInterest>(
  'research_interests',
  interests,
  (row) => ({
    id: asString(row.id ?? row.slug, ''),
    title: asString(row.title, '[Research Interest]'),
    shortDescription: asString(row.short_description ?? row.shortDescription, ''),
    description: asString(row.description, ''),
    keywords: asStringArray(row.keywords),
    icon: asString(row.icon, 'sparkles'),
    displayOrder: Number(row.display_order ?? 0),
    published: asBoolean(row.published, true),
  })
);

export type ResearchProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  researchQuestion: string;
  motivation: string;
  methodology: string;
  results: string;
  researchArea: string;
  technologies: string[];
  datasets: string[];
  advisor: string;
  institution: string;
  startDate: string;
  endDate: string;
  status: string;
  featured: boolean;
  images: string[];
  imageCaptions?: string[];
  /** Ordered steps shown as a diagram on the project page. */
  pipeline?: { title: string; detail: string }[];
  githubUrl?: string;
  paperUrl?: string;
  doi?: string;
  demoUrl?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const defaultResearchProjects: ResearchProject[] = [
  {
    id: 'proj-0',
    title: 'Bispecific Antibody Design for Cancer Immunotherapy',
    slug: 'bispecific-antibody-cancer-immunotherapy',
    shortDescription: 'Computational design of a bispecific DuoBody antibody targeting 4-1BB and PD-L1 for non-small cell lung cancer, published at IEEE ISEC 2025.',
    description: 'First-author computational study, conducted with Gaurav Sharma of Eigen Sciences, that designs and evaluates a bispecific DuoBody antibody engaging 4-1BB on cancer cells and PD-L1 on T-cells as a potential immunotherapy for non-small cell lung cancer (NSCLC). The work is accompanied by DuoDok, an independent web tool that automates parts of the workflow.',
    researchQuestion: 'Can a single bispecific antibody simultaneously engage PD-L1 and 4-1BB with high affinity and stability, and can the computational workflow that evaluates it be automated?',
    motivation: 'Non-small cell lung cancer is a leading cause of cancer deaths, and dual-target antibodies may strengthen the immune response beyond single-target checkpoint inhibitors. Computational design lets candidate antibodies be screened quickly before costly laboratory work.',
    methodology: 'Ten antibodies and two receptors were evaluated through a six-stage pipeline: protein selection, structure modeling (AlphaFold), binding-site identification, molecular docking (HDock), interaction analysis (PLIP, Prodigy), and molecular dynamics simulation (GROMACS). DuoDok automates portions of this workflow as a web application.',
    results: 'Docking and molecular dynamics confirmed an optimal bispecific antibody design for 4-1BB and PD-L1. The selected design showed high predicted affinity and stability, supporting it as a promising NSCLC-targeting candidate. Published at IEEE ISEC 2025 and recognized with the Outstanding Poster Presentation Award (ACS NERD 2025) and the Medal of High Honors (Terra Science Fair).',
    researchArea: 'Computational Immunotherapy',
    technologies: ['AlphaFold', 'GROMACS', 'HDock', 'PLIP', 'Prodigy', 'Biopython', 'Streamlit'],
    datasets: ['Antibody and receptor structures'],
    advisor: '',
    institution: 'Eigen Sciences',
    startDate: '01/2024',
    endDate: '06/2025',
    status: 'Published',
    featured: true,
    images: ['/uploads/duodok-poster-acs-nerd.jpg'],
    imageCaptions: ['Presenting the poster at the ACS Northeast Regional Discussion (NERD) 2025'],
    pipeline: [
      { title: 'Protein selection', detail: '10 antibodies and 2 receptors (4-1BB, PD-L1)' },
      { title: 'Structure modeling', detail: 'AlphaFold' },
      { title: 'Binding-site identification', detail: 'Locate where each antibody engages its receptor' },
      { title: 'Molecular docking', detail: 'HDock' },
      { title: 'Interaction analysis', detail: 'PLIP and Prodigy' },
      { title: 'Molecular dynamics', detail: 'GROMACS simulation of stability' },
    ],
    paperUrl: 'https://ieeexplore.ieee.org/document/11147433',
    githubUrl: '',
    doi: '10.1109/ISEC64801.2025.11147433',
    tags: ['cancer immunotherapy', 'bispecific antibodies', 'computational biology'],
    published: true,
    createdAt: '2025-06-01',
    updatedAt: '2026-10-18',
  },
  {
    id: 'proj-1',
    title: 'Neurological Condition Genetics Research',
    slug: 'adhd-genetics-research',
    shortDescription: 'FLAMES and FUMA-based analysis of genome-wide association data to investigate the genetic basis of neurological conditions.',
    description: 'Williams Lab, in the Jacobs School of Medicine and Biomedical Sciences at the University at Buffalo, studies the genetic and neurobiological basis of neurological and neurodevelopmental conditions. Mohammad Aarish Khan contributes through FLAMES and FUMA-based analysis of GWAS data sets.',
    researchQuestion: 'How can genomic and computational analysis help illuminate the genetic architecture underlying neurological conditions?',
    motivation: 'Understanding the genetic underpinnings of neurological conditions may provide insight into disease mechanisms and inform more targeted research strategies.',
    methodology: 'Computational genetics pipelines, statistical analysis, and evidence-based interpretation of gene-level associations.',
    results: 'Ongoing. The work contributes to understanding how genetic data can be analyzed to support research on neurological conditions.',
    researchArea: 'Computational Biology',
    technologies: ['Python', 'FLAMES', 'FUMA', 'Genomics', 'Biological Data Analysis'],
    datasets: ['GWAS data sets'],
    advisor: 'Williams Lab',
    institution: 'Jacobs School of Medicine and Biomedical Sciences, University at Buffalo',
    startDate: '08/2026',
    endDate: 'Present',
    status: 'Ongoing',
    featured: true,
    images: [],
    paperUrl: '',
    githubUrl: '',
    tags: ['neurological conditions', 'schizophrenia', 'genetics', 'computational biology'],
    published: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-09-19',
  },
  {
    id: 'proj-2',
    title: 'Nushoor Water Purification Research',
    slug: 'nushoor-water-purification',
    shortDescription: 'Low-cost, UV-based water purification system fine-tuned for disenfranchised communities, designed around resource constraints.',
    description: 'A team at a local incubator for underserved communities is developing a low-cost, UV-based water purification system fine-tuned for disenfranchised communities. Mohammad Aarish Khan collaborates on the system design, tailoring it to local constraints such as affordability, maintenance, and environmental conditions.',
    researchQuestion: 'How can water purification systems be designed to remain effective, affordable, and sustainable in underserved settings?',
    motivation: 'Many communities have limited resources and require low-maintenance, context-aware engineering solutions for essential water access.',
    methodology: 'The project combines systems design, community-driven constraints assessment, and engineering design optimization for practical deployment.',
    results: 'Ongoing. The goal is a practical, low-cost purification design that meets the needs of resource-limited communities.',
    researchArea: 'Medical and Environmental Engineering',
    technologies: ['Systems Design', 'Water Treatment', 'Human-Centered Engineering'],
    datasets: ['Community requirements', 'Water quality considerations'],
    advisor: 'Local incubator team',
    institution: 'Local Incubator for Underserved Communities',
    startDate: '06/2026',
    endDate: 'Present',
    status: 'Ongoing',
    featured: true,
    images: [],
    tags: ['water purification', 'public health', 'systems design'],
    published: true,
    createdAt: '2024-09-01',
    updatedAt: '2025-09-19',
  },
];

export const databaseResearchProjects: ResearchProject[] = await readDatabaseCollection<ResearchProject>(
  'research_projects',
  defaultResearchProjects,
  (row) => ({
    id: asString(row.id ?? row.slug, ''),
    title: asString(row.title, '[Research Project]'),
    slug: asString(row.slug ?? row.id, 'research-project'),
    shortDescription: asString(row.short_description ?? row.shortDescription, ''),
    description: asString(row.description, ''),
    researchQuestion: asString(row.research_question, ''),
    motivation: asString(row.motivation, ''),
    methodology: asString(row.methodology, ''),
    results: asString(row.results, ''),
    researchArea: asString(row.research_area, ''),
    technologies: asStringArray(row.technologies),
    datasets: asStringArray(row.datasets),
    advisor: asString(row.advisor, ''),
    institution: asString(row.institution, ''),
    startDate: asString(row.start_date, ''),
    endDate: asString(row.end_date, ''),
    status: asString(row.status, 'Ongoing'),
    featured: asBoolean(row.featured, false),
    images: asStringArray(row.images),
    imageCaptions: asStringArray(row.image_captions),
    pipeline: Array.isArray(row.pipeline) ? (row.pipeline as { title: string; detail: string }[]) : undefined,
    githubUrl: asString(row.github_url ?? row.githubUrl, ''),
    paperUrl: asString(row.paper_url ?? row.paperUrl, ''),
    doi: asString(row.doi, ''),
    demoUrl: asString(row.demo_url ?? row.demoUrl, ''),
    tags: asStringArray(row.tags),
    published: asBoolean(row.published, true),
    createdAt: asString(row.created_at, new Date().toISOString()),
    updatedAt: asString(row.updated_at, new Date().toISOString()),
  })
);

export const researchProjects = databaseResearchProjects;
export const featuredResearch = researchProjects.filter((project) => project.featured && project.published);

export type Publication = {
  id: string;
  title: string;
  slug: string;
  authors: string[];
  publicationType: 'Journal article' | 'Conference paper' | 'Poster' | 'Abstract' | 'Preprint' | 'Book chapter';
  journal?: string;
  conference?: string;
  publicationDate: string;
  abstract: string;
  keywords: string[];
  doi?: string;
  pdfUrl?: string;
  abstractUrl?: string;
  externalUrl?: string;
  citation: string;
  featured: boolean;
  published: boolean;
};

const defaultPublications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Bispecific DuoBody antibody targeting 4-1BB on cancer cells and PD-L1 on T cells for immunotherapy in non-small cell lung cancer (NSCLC)',
    slug: 'bispecific-duobody-antibody-targeting-41bb-pdl1-nsclc',
    authors: ['Mohammad Aarish Khan', 'Gaurav Sharma'],
    publicationType: 'Conference paper',
    conference: '2025 IEEE Integrated STEM Education Conference (ISEC)',
    publicationDate: 'March 15, 2025',
    abstract: 'This computational immunotherapy study evaluates a bispecific DuoBody antibody designed to engage 4-1BB on cancer cells and PD-L1 on T cells in non-small cell lung cancer, using structural modeling and interaction analysis tools such as AlphaFold, GROMACS, HDock, PLIP, and Prodigy.',
    keywords: ['cancer immunotherapy', 'bispecific antibodies', 'computational biology', 'NSCLC'],
    doi: '10.1109/ISEC64801.2025.11147433',
    pdfUrl: 'https://ieeexplore.ieee.org/document/11147433',
    abstractUrl: 'https://ieeexplore.ieee.org/abstract/document/11147433',
    externalUrl: 'https://ieeexplore.ieee.org/document/11147433',
    citation: 'Khan, M. A., and Sharma, G. “Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T Cells for Immunotherapy in Non-Small Cell Lung Cancer (NSCLC).” 2025 IEEE Integrated STEM Education Conference (ISEC), Princeton, NJ, USA, 2025, pp. 1\u20135. doi: 10.1109/ISEC64801.2025.11147433',
    featured: true,
    published: true,
  },
];

export const databasePublications: Publication[] = await readDatabaseCollection<Publication>(
  'publications',
  defaultPublications,
  (row) => ({
    id: asString(row.id ?? row.slug, ''),
    title: asString(row.title, '[Publication]'),
    slug: asString(row.slug ?? row.id, 'publication'),
    authors: asStringArray(row.authors),
    publicationType: asString(row.publication_type, 'Journal article') as 'Journal article' | 'Conference paper' | 'Poster' | 'Abstract' | 'Preprint' | 'Book chapter',
    journal: asString(row.journal, ''),
    conference: asString(row.conference, ''),
    publicationDate: asString(row.publication_date, ''),
    abstract: asString(row.abstract, ''),
    keywords: asStringArray(row.keywords),
    doi: asString(row.doi, ''),
    pdfUrl: asString(row.pdf_url, ''),
    abstractUrl: asString(row.abstract_url, ''),
    externalUrl: asString(row.external_url, ''),
    citation: asString(row.citation, ''),
    featured: asBoolean(row.featured, false),
    published: asBoolean(row.published, true),
  })
);

export const publications = databasePublications;

export type ExperienceItem = {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  /** Free-text period (e.g. "Summer internship") shown when no start/end dates are known. */
  period?: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  researchAreas: string[];
  displayOrder: number;
  images?: string[];
};

export function formatPeriod(item: { startDate?: string; endDate?: string; period?: string }) {
  const range = [item.startDate, item.endDate].filter(Boolean).join(' – ');

  return range || item.period || '';
}

const defaultExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    organization: 'Williams Lab',
    role: 'Neurological Condition Genetics Researcher',
    location: 'Jacobs School of Medicine and Biomedical Sciences, University at Buffalo',
    startDate: '08/2026',
    endDate: 'Present',
    description: 'Use FLAMES and FUMA-based analysis of GWAS data sets as part of an ongoing research study investigating the genetic basis of neurological conditions.',
    responsibilities: ['Analyze genetic datasets', 'Apply computational genetics pipelines', 'Support research interpretation and documentation'],
    skills: ['FLAMES', 'FUMA', 'Python', 'Genomics', 'Bioinformatics'],
    researchAreas: ['Computational Biology', 'Genetics'],
    displayOrder: 1,
  },
  {
    id: 'exp-2',
    organization: 'Nushoor',
    role: 'Water Purification Research Collaborator',
    location: 'Local Incubator for Underserved Communities',
    startDate: '06/2026',
    endDate: 'Present',
    description: 'Collaborate on a team designing a low-cost, UV-based water purification system fine-tuned for disenfranchised communities, balancing affordability, maintenance, and environmental constraints.',
    responsibilities: ['Design low-cost, UV-based filtration systems fine-tuned for disenfranchised communities', 'Tailor system design to community-specific constraints, including limited resources, cost, maintenance, and environmental conditions', 'Support engineering decision-making for practical deployment'],
    skills: ['Systems Design', 'Public Health Engineering', 'Problem Solving'],
    researchAreas: ['Environmental Engineering', 'Public Health'],
    displayOrder: 2,
  },
  {
    id: 'exp-3',
    organization: 'Eigen Sciences',
    role: 'First Author — Bispecific Antibodies for Cancer Immunotherapy',
    location: 'Computational Biology Research',
    startDate: '01/2024',
    endDate: '06/2025',
    description: 'Designed a bispecific DuoBody antibody targeting 4-1BB on cancer cells and PD-L1 on T-cells as a potential treatment for non-small cell lung cancer using six computational platforms.',
    responsibilities: [
      'Worked with 10 antibodies, 2 receptors, and computational platforms including AlphaFold, GROMACS, HDock, PLIP, and Prodigy to model binding interactions',
      'Published “Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T-Cells for Immunotherapy in NSCLC” at IEEE ISEC 2025 (DOI: 10.1109/ISEC64801.2025.11147433)',
      'Created two research posters and presented at five conferences: ACS NERD, IFoRE, Terra Science Fair, Global Impact Council Conference, and IEEE ISEC',
      'Recognition: Outstanding Poster Presentation Award (ACS NERD 2025); Medal of High Honors and Office of Naval Research Award (Terra Science Fair)',
    ],
    skills: ['AlphaFold', 'GROMACS', 'HDock', 'PLIP', 'Prodigy', 'Biopython'],
    researchAreas: ['Cancer Immunotherapy', 'Computational Drug Design'],
    displayOrder: 3,
  },
  {
    id: 'exp-4',
    organization: 'Independent Project',
    role: 'DuoDok — Computational Frameworks for Agent-Driven Bispecific Antibody Engineering',
    location: 'Independent research',
    startDate: '',
    endDate: '',
    period: 'Personal project',
    description: 'Building an automated computational pipeline for rapid design and in silico testing of therapeutic bispecific antibodies, deployed as a Streamlit web application.',
    responsibilities: ['Built a Streamlit-based web app that automates parts of the bispecific antibody workflow', 'Presented at IFoRE 2025 and ACS NERD 2025'],
    skills: ['Python', 'Streamlit', 'Computational Biology'],
    researchAreas: ['Research Software', 'Antibody Design'],
    displayOrder: 4,
  },
  {
    id: 'exp-5',
    organization: 'UB Nanosatellite Lab',
    role: 'Researcher — SOLARIS High-Altitude Balloon Mission',
    location: 'University at Buffalo',
    startDate: '',
    endDate: '',
    period: '2025',
    description: 'SOLARIS: a high-altitude solar panel output variation study. Member of a five-student team that built a balloon payload carrying six solar panels.',
    responsibilities: ['Designed electronics and wrote the code that measured output metrics for six solar panels at varying altitudes, using an Arduino Mega 2560, power meters, and barometers', 'Studied variation in solar-panel efficiency across altitude', 'Presented findings at the 2025 SmallSat Education Conference (NASA), Kennedy Space Center'],
    skills: ['Arduino Mega 2560', 'Power meters', 'Barometers', 'Data Analysis'],
    researchAreas: ['Sensing and Instrumentation'],
    displayOrder: 5,
    images: ['/uploads/balloon-initial-wiring.jpg', '/uploads/balloon-final-circuitry.jpg'],
  },
  {
    id: 'exp-6',
    organization: 'NY Academy of Sciences — Junior Academy Challenge',
    role: 'Head of Ideation & Implementation, International Research Projects',
    location: 'International teams',
    startDate: '',
    endDate: '',
    period: '2023–2024',
    description: 'Led two international student teams from ideation through solution development.',
    responsibilities: ['Led planning and solution development for an asteroid-mining project (1st Place) and a multiple-sclerosis health wearable (Project of Distinction)', 'Co-authored abstracts and presentations for both projects', 'Selected by the Academy community as one of five Emerging Student Researchers of the Year, from over 8,000 eligible students in more than 100 countries'],
    skills: ['Team Leadership', 'Project Planning', 'Scientific Communication'],
    researchAreas: ['Health Technology', 'Space Science'],
    displayOrder: 6,
  },
  {
    id: 'exp-7',
    organization: 'Eric Pitman Summer Workshop',
    role: 'Intern Computational Biologist — Environmental Genomics',
    location: 'University at Buffalo',
    startDate: '',
    endDate: '',
    period: '2025',
    description: 'Analyzed water samples from Scajaquada Creek using whole-genome analysis and R-based programming to characterize microorganisms and biological material.',
    responsibilities: ['Applied whole-genome analysis and R programming to environmental water samples', 'Presented findings in a final research presentation', 'Gained hands-on experience in genomics, bioinformatics, and data analysis'],
    skills: ['R', 'Genomics', 'Bioinformatics'],
    researchAreas: ['Environmental Genomics'],
    displayOrder: 7,
  },
  {
    id: 'exp-8',
    organization: 'Global Impact Council',
    role: 'Co-Organizer — Emerging Research Incubator',
    location: 'International student program',
    startDate: '',
    endDate: '',
    period: 'Until Aug 2026',
    description: 'Co-ran a program that taught research methodologies to students internationally.',
    responsibilities: ['Co-ran the Emerging Research Incubator, teaching research methodologies to students around the world'],
    skills: ['Mentorship', 'Research Methods', 'Scientific Communication'],
    researchAreas: ['Research Education'],
    displayOrder: 8,
  },
];

export const databaseExperience: ExperienceItem[] = await readDatabaseCollection<ExperienceItem>(
  'experiences',
  defaultExperience,
  (row) => ({
    id: asString(row.id, ''),
    organization: asString(row.organization, '[Organization]'),
    role: asString(row.role, '[Role]'),
    location: asString(row.location, ''),
    startDate: asString(row.start_date, ''),
    endDate: asString(row.end_date, ''),
    period: asString(row.period, ''),
    description: asString(row.description, ''),
    responsibilities: asStringArray(row.responsibilities),
    skills: asStringArray(row.skills),
    researchAreas: asStringArray(row.research_areas),
    displayOrder: Number(row.display_order ?? 0),
    images: asStringArray(row.images),
  })
);

export const experience = databaseExperience;

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
  location: string;
};

const defaultEducation: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'University at Buffalo',
    degree: 'Biomedical Engineering Major',
    field: 'Biomedical Engineering',
    startDate: '08/2026',
    endDate: 'Present',
    description: 'Honors College student studying biomedical engineering with interests in computational genomics, synthetic biology, genetic engineering, and translational research.',
    gpa: '',
    honors: ['Honors College'],
    coursework: ['Biomedical Engineering', 'Computational Biology', 'Data Analysis', 'Life Sciences'],
    location: 'Buffalo, NY',
  },
  {
    id: 'edu-2',
    institution: 'Williamsville North High School',
    degree: 'High School Diploma',
    field: 'STEM and Research',
    startDate: '09/2022',
    endDate: '06/2026',
    description: 'Graduated in the Class of 2026 with strong achievement in STEM, research, and academic leadership. Cumulative average 97.5%; AP Scholar with Distinction (2025, 2026).',
    gpa: '',
    honors: ['AP Scholar with Distinction'],
    coursework: ['Advanced STEM', 'Research', 'Computer Science'],
    location: 'Williamsville, NY',
  },
];

export const databaseEducation: EducationItem[] = await readDatabaseCollection<EducationItem>(
  'education',
  defaultEducation,
  (row) => ({
    id: asString(row.id, ''),
    institution: asString(row.institution, '[University]'),
    degree: asString(row.degree, '[Degree]'),
    field: asString(row.field, ''),
    startDate: asString(row.start_date, ''),
    endDate: asString(row.end_date, ''),
    description: asString(row.description, ''),
    gpa: asString(row.gpa, ''),
    honors: asStringArray(row.honors),
    coursework: asStringArray(row.coursework),
    location: asString(row.location, ''),
  })
);

export const education = databaseEducation;

export type SkillItem = {
  id: string;
  name: string;
  category: string;
  level?: string;
  description?: string;
};

const defaultSkills: SkillItem[] = [
  { id: 'skill-1', name: 'Python', category: 'Programming', level: 'Advanced' },
  { id: 'skill-2', name: 'Java', category: 'Programming', level: 'Intermediate' },
  { id: 'skill-3', name: 'Arduino', category: 'Programming', level: 'Intermediate' },
  { id: 'skill-4', name: 'R', category: 'Programming', level: 'Intermediate' },
  { id: 'skill-5', name: 'AlphaFold', category: 'AI/ML', level: 'Advanced' },
  { id: 'skill-6', name: 'PyTorch', category: 'AI/ML', level: 'Intermediate' },
  { id: 'skill-7', name: 'Hugging Face', category: 'AI/ML', level: 'Intermediate' },
  { id: 'skill-8', name: 'Crew AI', category: 'AI/ML', level: 'Intermediate' },
  { id: 'skill-9', name: 'Ollama', category: 'AI/ML', level: 'Intermediate' },
  { id: 'skill-10', name: 'GROMACS', category: 'Computational Biology', level: 'Advanced' },
  { id: 'skill-11', name: 'PLIP', category: 'Computational Biology', level: 'Advanced' },
  { id: 'skill-12', name: 'Prodigy', category: 'Computational Biology', level: 'Advanced' },
  { id: 'skill-13', name: 'HDock', category: 'Computational Biology', level: 'Advanced' },
  { id: 'skill-14', name: 'FUMA (Functional Mapping and Annotation of GWAS)', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-21', name: 'FLAMES (long-read sequencing analysis)', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-15', name: 'Biopython', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-16', name: 'Benchling', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-17', name: 'Streamlit', category: 'Web Development', level: 'Intermediate' },
  { id: 'skill-18', name: 'Google Colab', category: 'Web Development', level: 'Intermediate' },
  { id: 'skill-19', name: 'Notion', category: 'Productivity', level: 'Advanced' },
  { id: 'skill-20', name: 'Oracle Cloud Infrastructure', category: 'Cloud', level: 'Intermediate' },
  { id: 'skill-22', name: 'Computational genetics', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-23', name: 'Genome-wide association study (GWAS) analysis', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-24', name: 'Genetic association analysis', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-25', name: 'Statistical genetics', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-26', name: 'Neurological disease genetics', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-34', name: 'Psychiatric disease genetics', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-35', name: 'ADHD genetics', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-36', name: 'Schizophrenia genetics', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-37', name: 'Genetic dataset analysis', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-38', name: 'Frugal gene editing research', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-39', name: 'Functional annotation of genetic variants', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-40', name: 'CRISPR/Cas systems', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-27', name: 'Genomic medicine', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-28', name: 'Translational genomics', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-29', name: 'Synthetic biology', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-30', name: 'Genetic engineering', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-31', name: 'Microsoft Word', category: 'Productivity', level: 'Intermediate' },
  { id: 'skill-32', name: 'PowerPoint', category: 'Productivity', level: 'Intermediate' },
  { id: 'skill-33', name: 'Excel', category: 'Productivity', level: 'Intermediate' },
];

export const databaseSkills: SkillItem[] = await readDatabaseCollection<SkillItem>(
  'skills',
  defaultSkills,
  (row) => ({
    id: asString(row.id, ''),
    name: asString(row.name, '[Skill]'),
    category: asString(row.category, 'General'),
    level: row.proficiency !== undefined ? String(row.proficiency) : asString(row.level, ''),
    description: asString(row.description, ''),
  })
);

export const skills = databaseSkills;

export type Award = {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  category: string;
  url?: string;
  image?: string;
  quote?: { text: string; attribution: string };
  featured: boolean;
};

const defaultAwards: Award[] = [
  {
    id: 'award-1',
    title: 'Emerging Student Researcher of the Year',
    organization: 'NY Academy of Sciences',
    year: '2025',
    description: 'Selected by the Academy\u2019s community as one of five Emerging Student Researchers of the Year, from over 8,000 eligible students in more than 100 countries, for leadership and contributions to the Junior Academy. Nominated by a teammate and honored on April 22, 2025.',
    category: 'Research excellence',
    image: '/uploads/nyas-emerging-student-researcher.jpg',
    quote: {
      text: 'He shared insight and creative solutions to the complex problems we faced in crafting such an innovative solution. What sets Mohammad apart as a future STEM leader is his resilience, ability to think critically under pressure, and his unwavering commitment to supporting his team.',
      attribution: 'Nominating teammate, NY Academy of Sciences Junior Academy',
    },
    featured: true,
  },
  {
    id: 'award-2',
    title: 'Outstanding Poster Presentation Award',
    organization: 'American Chemical Society (ACS) NERD',
    year: '2025',
    description: 'Awarded Outstanding Poster Presentation at the Northeast Regional Discussion (NERD) 2025 for the poster “Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T-Cells for Immunotherapy in Non-Small Cell Lung Cancer (NSCLC),” co-authored with Gaurav Sharma of Eigen Sciences.',
    category: 'Poster presentation',
    image: '/uploads/acs-nerd-award.jpg',
    featured: true,
  },
  {
    id: 'award-4',
    title: 'Medal of High Honors and Office of Naval Research Award',
    organization: 'Terra Science Fair',
    year: '2025',
    description: 'Awarded the Medal of High Honors for outstanding research impact and scientific communication, and received the Office of Naval Research Award.',
    category: 'Science fair',
    image: '/uploads/terra-science-fair-medal.jpg',
    featured: true,
  },
  {
    id: 'award-7',
    title: '1st Place, Asteroid-Mining Project',
    organization: 'NY Academy of Sciences, Junior Academy Challenge',
    year: '2023',
    description: 'Led ideation and implementation for an international student team whose asteroid-mining project won 1st Place.',
    category: 'Team award',
    featured: false,
  },
  {
    id: 'award-8',
    title: 'Project of Distinction, Multiple-Sclerosis Health Wearable',
    organization: 'NY Academy of Sciences, Junior Academy Challenge',
    year: '2024',
    description: 'Led ideation and implementation for an international student team whose multiple-sclerosis health wearable was named a Project of Distinction.',
    category: 'Team award',
    featured: false,
  },
  {
    id: 'award-9',
    title: 'Science and Math Award',
    organization: 'Rochester Institute of Technology (RIT)',
    year: '2025',
    description: 'Awarded the RIT Science and Math Award, a $24,000 per year scholarship.',
    category: 'Scholarship',
    featured: false,
  },
  {
    id: 'award-10',
    title: '1st Place, T-Shirt Design; 3rd Place, Promotional Graphics and Coding',
    organization: 'Technology Student Association, New York State Conference',
    year: '2024–2025',
    description: '1st Place in T-Shirt Design (2025), 3rd Place in Promotional Graphics (2025) and 3rd Place in Coding (2024) at the TSA New York State Conference.',
    category: 'Competition',
    featured: false,
  },
  {
    id: 'award-11',
    title: '1st Place, Computer Programming',
    organization: 'Computer Science for High Schoolers (CS4HS), Buffalo State',
    year: '2024',
    description: 'Won 1st Place in the Computer Programming competition.',
    category: 'Competition',
    featured: false,
  },
  {
    id: 'award-14',
    title: '2nd Place and Honorable Mention, Student Showcase',
    organization: 'Computer Science for High Schoolers (CS4HS), Buffalo State',
    year: '2025',
    description: 'Presented a computer science project accepted to the 2025 CS4HS Student Showcase and Competition at SUNY Buffalo State, together with teammate Mohammad Aasim Khan, and received a 2nd Place trophy and an Honorable Mention (May 31, 2025).',
    category: 'Competition',
    image: '/uploads/cs4hs-showcase-2025.jpg',
    featured: false,
  },
  {
    id: 'award-12',
    title: '2nd Place, Disease Detective',
    organization: 'Science Olympiad Regionals',
    year: '2023',
    description: 'Placed 2nd in the Disease Detective event at the regional Science Olympiad.',
    category: 'Competition',
    featured: false,
  },
  {
    id: 'award-13',
    title: 'Bronze Medal, 600+ Volunteer Hours',
    organization: 'President\u2019s Volunteer Service Award',
    year: '2025',
    description: 'Bronze Medal for more than 600 hours of volunteer service.',
    category: 'Service',
    featured: false,
  },
  {
    id: 'award-5',
    title: 'AP Scholar with Distinction',
    organization: 'College Board',
    year: '2025, 2026',
    description: 'Earned in both 2025 and 2026 for academic excellence across Advanced Placement coursework.',
    category: 'Academic achievement',
    featured: false,
  },
  {
    id: 'award-6',
    title: 'Honorable Mention, Literature (Grades 9–12)',
    organization: 'National PTA Reflections, Western Region PTA',
    year: '2024–2025',
    description: 'Recognized for the essay “Accepting Imperfections – The Unsung Hero of Progress,” a reflection on the role of imperfection in human individuality and success.',
    category: 'Literature',
    image: '/uploads/pta-reflections-award.jpg',
    featured: false,
  },
  {
    id: 'award-3',
    title: 'Presenter, SmallSat Education Conference',
    organization: 'Kennedy Space Center (NASA)',
    year: '2025',
    description: 'Studied variation in solar-panel efficiency across altitude with a high-altitude balloon payload (SOLARIS) and presented the findings at the SmallSat Education Conference held October 25\u201326, 2025 at Kennedy Space Center.',
    category: 'Conference presentation',
    image: '/uploads/smallsat-kennedy-space-center.jpg',
    featured: false,
  },
];

export const databaseAwards: Award[] = await readDatabaseCollection<Award>(
  'awards',
  defaultAwards,
  (row) => ({
    id: asString(row.id, ''),
    title: asString(row.title, '[Award]'),
    organization: asString(row.organization, '[Organization]'),
    year: asString(row.year, ''),
    description: asString(row.description, ''),
    category: asString(row.category, 'Academic award'),
    url: asString(row.url, ''),
    image: asString(row.image, ''),
    quote: row.quote_text ? { text: asString(row.quote_text, ''), attribution: asString(row.quote_attribution, '') } : undefined,
    featured: asBoolean(row.featured, false),
  })
);

export const awards = databaseAwards;

export type Presentation = {
  id: string;
  title: string;
  event: string;
  presentationType: 'Poster' | 'Oral presentation' | 'Conference' | 'Seminar' | 'Workshop';
  date: string;
  location: string;
  abstract: string;
  pdfUrl?: string;
  eventUrl?: string;
  relatedProject?: string;
};

const defaultPresentations: Presentation[] = [
  {
    id: 'pres-0',
    title: 'Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T-Cells for Immunotherapy in Non-Small Cell Lung Cancer (NSCLC)',
    event: 'ACS Northeast Regional Discussion (NERD) 2025',
    presentationType: 'Poster',
    date: 'November 1, 2025',
    location: 'Worcester, MA',
    abstract: 'Poster presentation of the computational design of a bispecific antibody for NSCLC immunotherapy, including the DuoDok workflow tool. Received the Outstanding Poster Presentation Award.',
    relatedProject: 'bispecific-antibody-cancer-immunotherapy',
  },
  {
    id: 'pres-1',
    title: 'Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T-Cells for Immunotherapy in NSCLC',
    event: '2025 IEEE Integrated STEM Education Conference (ISEC)',
    presentationType: 'Conference',
    date: 'March 15, 2025',
    location: 'Princeton, NJ',
    abstract: 'Published and presented the bispecific antibody design study as a conference paper.',
    relatedProject: 'bispecific-antibody-cancer-immunotherapy',
  },
  {
    id: 'pres-2',
    title: 'DuoDok — Computational Frameworks for Agent-Driven Bispecific Antibody Engineering',
    event: 'IFoRE 2025 (Sigma Xi International Forum on Research Excellence)',
    presentationType: 'Oral presentation',
    date: 'October 30 \u2013 November 1, 2025',
    location: 'Virtual',
    abstract: 'Presentation of DuoDok, an automated computational pipeline for rapid design and in silico testing of therapeutic bispecific antibodies.',
    relatedProject: 'bispecific-antibody-cancer-immunotherapy',
  },
  {
    id: 'pres-3',
    title: 'Environmental Genomics Research',
    event: 'Eric Pitman Summer Workshop',
    presentationType: 'Seminar',
    date: '2025',
    location: 'University at Buffalo',
    abstract: 'Analysis of water samples from Scajaquada Creek using whole-genome methods and R-based programming to characterize microbial communities.',
    relatedProject: '',
  },
];

export const databasePresentations: Presentation[] = await readDatabaseCollection<Presentation>(
  'presentations',
  defaultPresentations,
  (row) => ({
    id: asString(row.id, ''),
    title: asString(row.title, '[Presentation]'),
    event: asString(row.event, '[Event]'),
    presentationType: asString(row.presentation_type ?? row.presentationType, 'Poster') as 'Poster' | 'Oral presentation' | 'Conference' | 'Seminar' | 'Workshop',
    date: asString(row.date, ''),
    location: asString(row.location, ''),
    abstract: asString(row.description ?? row.abstract, ''),
    pdfUrl: asString(row.pdf_url, ''),
    eventUrl: asString(row.event_url, ''),
    relatedProject: asString(row.related_project ?? row.relatedProject, ''),
  })
);

export const presentations = databasePresentations;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  references?: string[];
  published: boolean;
};

const defaultBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Translational Research Through Computational Design',
    slug: 'translational-research-through-computational-design',
    summary: 'An overview of how computational modeling, reproducible analysis, and biomedical engineering can accelerate translational research questions.',
    content: 'This blog reflects a research perspective on combining computational design with biomedical inquiry to answer important translational questions. The goal is to connect rigorous analysis, experimental thinking, and human-centered clinical impact in a way that is useful to students, collaborators, and researchers alike.',
    author: 'Mohammad Aarish Khan',
    publishedAt: '2026',
    category: 'Research Methods',
    tags: ['methodology', 'biomedical engineering', 'computational biology'],
    published: true,
  },
];

export const databaseBlogPosts: BlogPost[] = await readDatabaseCollection<BlogPost>(
  'blog_posts',
  defaultBlogPosts,
  (row) => ({
    id: asString(row.id, ''),
    title: asString(row.title, '[Blog Post]'),
    slug: asString(row.slug ?? row.id, 'blog-post'),
    summary: asString(row.summary, ''),
    content: asString(row.content, ''),
    author: asString(row.author, '[Student Name]'),
    publishedAt: asString(row.published_at ?? row.publishedAt, ''),
    category: asString(row.category, 'Research'),
    tags: asStringArray(row.tags),
    featuredImage: asString(row.featured_image ?? row.featuredImage, ''),
    references: asStringArray(row.references),
    published: asBoolean(row.published, true),
  })
);

export const blogPosts = databaseBlogPosts;

/** Extra CV and home-page lists that have no page of their own: conferences, certifications, leadership and the home-page strips. */
export type ProfileEntryKind = 'conference' | 'certification' | 'leadership' | 'leadership_school' | 'presented_at' | 'recognized_by';

export type ProfileEntry = {
  id: string;
  kind: ProfileEntryKind;
  name: string;
  role: string;
  note: string;
  displayOrder: number;
};

const profileEntryKinds: ProfileEntryKind[] = ['conference', 'certification', 'leadership', 'leadership_school', 'presented_at', 'recognized_by'];

const defaultProfileEntries: ProfileEntry[] = [
  { id: 'entry-1', kind: 'conference', name: 'Kennedy Space Center 2025 (NASA SmallSat Education Conference)', role: '', note: '', displayOrder: 1 },
  { id: 'entry-2', kind: 'conference', name: 'IFoRE 2025', role: '', note: '', displayOrder: 2 },
  { id: 'entry-3', kind: 'conference', name: 'ACS NERD 2025', role: '', note: '', displayOrder: 3 },
  { id: 'entry-4', kind: 'conference', name: 'Terra Science Fair', role: '', note: '', displayOrder: 4 },
  { id: 'entry-5', kind: 'conference', name: 'Global Impact Council Conference', role: '', note: '', displayOrder: 5 },
  { id: 'entry-6', kind: 'conference', name: 'IEEE ISEC 2025', role: '', note: '', displayOrder: 6 },
  { id: 'entry-7', kind: 'certification', name: 'MIT Beaver Works: Autonomous Cars', role: '', note: '', displayOrder: 7 },
  { id: 'entry-8', kind: 'certification', name: 'Biotech in Action — Biogen / Lab Central / MIT', role: '', note: '', displayOrder: 8 },
  { id: 'entry-9', kind: 'certification', name: 'Oracle Cloud Infrastructure 2024 Generative AI Certification', role: '', note: '', displayOrder: 9 },
  { id: 'entry-10', kind: 'certification', name: 'Eric Pitman Summer Workshop 2025 — Intern Computational Biologist', role: '', note: '', displayOrder: 10 },
  { id: 'entry-11', kind: 'leadership', name: 'Biomedical Engineering Society', role: 'Battle Bots Team Lead (2026–Present)', note: '', displayOrder: 11 },
  { id: 'entry-12', kind: 'leadership_school', name: 'Computer Club', role: 'President (2025–Jun 2026); Vice President (2023–25)', note: '', displayOrder: 12 },
  { id: 'entry-13', kind: 'leadership_school', name: 'National Honors Society', role: 'Vice President, Class of 2026 (2025–Jun 2026)', note: 'Organized the NHS Running Event and co-organized the Tech Mentorship Program.', displayOrder: 13 },
  { id: 'entry-14', kind: 'leadership_school', name: 'Technology Student Association', role: 'Secretary & NY State Delegate (2024–Jun 2026)', note: '', displayOrder: 14 },
  { id: 'entry-15', kind: 'leadership', name: 'Global Impact Council', role: 'Co-Organizer, Emerging Research Incubator (until Aug 2026); Director of Social Media (2024–25); Writing Team (2023–24)', note: '', displayOrder: 15 },
  { id: 'entry-16', kind: 'leadership_school', name: 'Superintendent Inter-High Action Committee', role: 'Co-Chair (2022–Jun 2026)', note: '', displayOrder: 16 },
  { id: 'entry-17', kind: 'leadership_school', name: 'Shared Decision Making Committee', role: 'Class Representative (2024–Jun 2026)', note: '', displayOrder: 17 },
  { id: 'entry-18', kind: 'leadership_school', name: 'Science Olympiad (2022–Jun 2026)', role: '', note: '', displayOrder: 18 },
  { id: 'entry-31', kind: 'leadership_school', name: 'Science Honors Society (2023–Jun 2026)', role: '', note: '', displayOrder: 19 },
  { id: 'entry-19', kind: 'presented_at', name: 'IEEE ISEC', role: '', note: '', displayOrder: 19 },
  { id: 'entry-20', kind: 'presented_at', name: 'ACS NERD', role: '', note: '', displayOrder: 20 },
  { id: 'entry-21', kind: 'presented_at', name: 'IFoRE', role: '', note: '', displayOrder: 21 },
  { id: 'entry-22', kind: 'presented_at', name: 'NASA SmallSat Education Conference', role: '', note: '', displayOrder: 22 },
  { id: 'entry-23', kind: 'presented_at', name: 'Terra Science Fair', role: '', note: '', displayOrder: 23 },
  { id: 'entry-24', kind: 'presented_at', name: 'Global Impact Council', role: '', note: '', displayOrder: 24 },
  { id: 'entry-25', kind: 'recognized_by', name: 'NY Academy of Sciences', role: '', note: '', displayOrder: 25 },
  { id: 'entry-26', kind: 'recognized_by', name: 'American Chemical Society', role: '', note: '', displayOrder: 26 },
  { id: 'entry-27', kind: 'recognized_by', name: 'Terra Science Fair', role: '', note: '', displayOrder: 27 },
  { id: 'entry-28', kind: 'recognized_by', name: 'Office of Naval Research', role: '', note: '', displayOrder: 28 },
  { id: 'entry-29', kind: 'recognized_by', name: 'RIT', role: '', note: '', displayOrder: 29 },
  { id: 'entry-30', kind: 'recognized_by', name: 'College Board', role: '', note: '', displayOrder: 30 },
];

export const profileEntries: ProfileEntry[] = (
  await readDatabaseCollection<ProfileEntry>('profile_entries', defaultProfileEntries, (row) => {
    const kind = asString(row.kind, '') as ProfileEntryKind;

    if (!profileEntryKinds.includes(kind)) return null as unknown as ProfileEntry;

    return {
      id: asString(row.id, ''),
      kind,
      name: asString(row.name, ''),
      role: asString(row.role, ''),
      note: asString(row.note, ''),
      displayOrder: Number(row.display_order ?? row.displayOrder ?? 0),
    };
  })
).sort((a, b) => a.displayOrder - b.displayOrder);

const entriesOfKind = (kind: ProfileEntryKind) => profileEntries.filter((entry) => entry.kind === kind);

export const cvConferences = entriesOfKind('conference').map((entry) => entry.name);
export const cvWorkshopsAndCertifications = entriesOfKind('certification').map((entry) => entry.name);
export const cvLeadership = entriesOfKind('leadership').map((entry) => ({ organization: entry.name, role: entry.role, note: entry.note || undefined }));
export const cvLeadershipSchool = entriesOfKind('leadership_school').map((entry) => ({ organization: entry.name, role: entry.role, note: entry.note || undefined }));
export const presentedAt = entriesOfKind('presented_at').map((entry) => entry.name);
export const recognizedBy = entriesOfKind('recognized_by').map((entry) => entry.name);
