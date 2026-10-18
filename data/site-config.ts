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
    displayOrder: 1,
    published: true,
  },
  {
    id: 'computational-genetics',
    title: 'Computational Genetics',
    shortDescription: 'Statistical and computational analysis of genetic data to study complex disease.',
    description: 'Applying colocalization and statistical genetics pipelines, such as FastENLOC, to investigate the genetic architecture of ADHD and other complex conditions.',
    keywords: ['genomics', 'FastENLOC', 'bioinformatics', 'ADHD'],
    icon: 'graph',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'global-health-engineering',
    title: 'Global Health Engineering',
    shortDescription: 'Low-cost, context-aware technologies for underserved communities.',
    description: 'Designing affordable and maintainable engineering solutions, including water purification systems for refugee communities, shaped by local constraints and community needs.',
    keywords: ['water purification', 'systems design', 'public health'],
    icon: 'pulse',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'sensing-and-devices',
    title: 'Sensing and Devices',
    shortDescription: 'Embedded electronics and instrumentation for data collection in the field.',
    description: 'Building sensor and electronics systems, from high-altitude balloon payloads to environmental sampling, that connect engineering design with biological and environmental measurement.',
    keywords: ['Arduino', 'instrumentation', 'sensing', 'device design'],
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
    results: 'Docking and molecular dynamics confirmed strong binding of antibodies to 4-1BB and PD-L1, and the DuoBody design showed high predicted affinity and stability, supporting it as a promising NSCLC-targeting candidate. Published at IEEE ISEC 2025 and recognized with the Outstanding Poster Presentation Award (ACS NERD 2025) and the Medal of High Honors (Terra Science Fair).',
    researchArea: 'Computational Immunotherapy',
    technologies: ['AlphaFold', 'GROMACS', 'HDock', 'PLIP', 'Prodigy', 'Biopython', 'Streamlit'],
    datasets: ['Antibody and receptor structures'],
    advisor: '',
    institution: 'Eigen Sciences',
    startDate: '01/2024',
    endDate: '06/2025',
    status: 'Published',
    featured: true,
    images: ['/uploads/poster-with-coauthor.jpg'],
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
    title: 'ADHD Genetics Research',
    slug: 'adhd-genetics-research',
    shortDescription: 'Computational analysis of genetic data using FastENLOC to investigate the genetic basis of ADHD.',
    description: 'Williams Lab at the University at Buffalo is investigating the genetic basis of ADHD. Mohammad Aarish Khan contributes by analyzing genetic data with the FastENLOC computational pipeline.',
    researchQuestion: 'How can genomic and computational analysis help illuminate the genetic architecture underlying ADHD?',
    motivation: 'Understanding the genetic underpinnings of ADHD may provide insight into disease mechanisms and inform more targeted research strategies.',
    methodology: 'Computational genetics pipelines, statistical analysis, and evidence-based interpretation of gene-level associations.',
    results: 'Ongoing. The work contributes to understanding how genetic data can be analyzed to support ADHD research.',
    researchArea: 'Computational Biology',
    technologies: ['Python', 'FastENLOC', 'Genomics', 'Biological Data Analysis'],
    datasets: ['Genetic association data', 'Research genotype datasets'],
    advisor: 'Williams Lab',
    institution: 'University at Buffalo',
    startDate: '08/2026',
    endDate: 'Present',
    status: 'Ongoing',
    featured: true,
    images: [],
    paperUrl: '',
    githubUrl: '',
    tags: ['ADHD', 'genetics', 'computational biology'],
    published: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-09-19',
  },
  {
    id: 'proj-2',
    title: 'Nushoor Water Purification Research',
    slug: 'nushoor-water-purification',
    shortDescription: 'Low-cost water purification system design for refugee communities in Bangladesh with resource constraints in mind.',
    description: 'A team at a local incubator for underserved communities is developing a low-cost water purification system for refugee communities in Bangladesh. Mohammad Aarish Khan collaborates on the system design, tailoring it to local constraints such as affordability, maintenance, and environmental conditions.',
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
    publicationDate: '2025',
    abstract: 'This computational immunotherapy study evaluates a bispecific DuoBody antibody designed to engage 4-1BB on cancer cells and PD-L1 on T cells in non-small cell lung cancer, using structural modeling and interaction analysis tools such as AlphaFold, GROMACS, HDock, PLIP, and Prodigy.',
    keywords: ['cancer immunotherapy', 'bispecific antibodies', 'computational biology', 'NSCLC'],
    doi: '10.1109/ISEC64801.2025.11147433',
    pdfUrl: 'https://ieeexplore.ieee.org/document/11147433',
    abstractUrl: 'https://ieeexplore.ieee.org/abstract/document/11147433',
    externalUrl: 'https://ieeexplore.ieee.org/document/11147433',
    citation: 'Khan, M. A., and Sharma, G. “Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T Cells for Immunotherapy in Non-Small Cell Lung Cancer (NSCLC).” 2025 IEEE Integrated STEM Education Conference (ISEC), Princeton, NJ, USA, 2025. doi: 10.1109/ISEC64801.2025.11147433',
    featured: true,
    published: true,
  },
  {
    id: 'pub-2',
    title: 'DuoDok — Independent Computational Research Tool',
    slug: 'duodok-independent-computational-research-tool',
    authors: ['Mohammad Aarish Khan'],
    publicationType: 'Abstract',
    conference: 'iFORE',
    publicationDate: '2025',
    abstract: 'DuoDok is a personalized computational research tool that automates portions of the bispecific antibody workflow and supports early-stage scientific exploration and presentation.',
    keywords: ['computational tools', 'antibody design', 'research workflow'],
    citation: 'Khan, M. A. “DuoDok — Independent Computational Research Tool.” iFORE 2025.',
    featured: false,
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
    role: 'ADHD Genetics Researcher',
    location: 'University at Buffalo',
    startDate: '08/2026',
    endDate: 'Present',
    description: 'Use the FastENLOC computational pipeline to analyze genetic data as part of an ongoing research study investigating the genetic basis of ADHD.',
    responsibilities: ['Analyze genetic datasets', 'Apply computational genetics pipelines', 'Support research interpretation and documentation'],
    skills: ['FastENLOC', 'Python', 'Genomics', 'Bioinformatics'],
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
    description: 'Collaborate on a team designing a low-cost water purification system for refugee communities in Bangladesh, balancing affordability, maintenance, and environmental constraints.',
    responsibilities: ['Design low-cost purification systems for refugee communities in Bangladesh', 'Tailor system design to community-specific constraints, including limited resources, cost, maintenance, and environmental conditions', 'Support engineering decision-making for practical deployment'],
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
      'Created two research posters and presented at five conferences: ACS NERD, iFORE, Terra Science Fair, Global Impact Council Conference, and IEEE ISEC',
      'Recognition: Outstanding Poster Presentation Award (ACS NERD 2025); Medal of High Honors and Office of Naval Research Award (Terra Science Fair)',
    ],
    skills: ['AlphaFold', 'GROMACS', 'HDock', 'PLIP', 'Prodigy', 'Biopython'],
    researchAreas: ['Cancer Immunotherapy', 'Computational Drug Design'],
    displayOrder: 3,
  },
  {
    id: 'exp-4',
    organization: 'Independent Project',
    role: 'DuoDok — Computational Research Tool',
    location: 'Independent research',
    startDate: '',
    endDate: '',
    period: 'Personal project',
    description: 'Built a simulated pipeline that automates portions of the bispecific antibody computational workflow, deployed as a web application.',
    responsibilities: ['Built and deployed a web application automating parts of the bispecific antibody workflow', 'Authored a research abstract and presented at iFORE 2025 and ACS NERD 2025, with an upcoming e-Ball conference presentation'],
    skills: ['Python', 'Streamlit', 'Computational Biology'],
    researchAreas: ['Research Software', 'Antibody Design'],
    displayOrder: 4,
  },
  {
    id: 'exp-5',
    organization: 'UB Nanotechnology Lab',
    role: 'Summer Research Intern — High-Altitude Balloon Mission',
    location: 'University at Buffalo',
    startDate: '',
    endDate: '',
    period: 'Summer internship',
    description: 'Member of a five-student team that built a high-altitude balloon payload carrying six solar panels.',
    responsibilities: ['Designed the payload electronics: an Arduino R4 Minima logging six solar panels (via INA3221 power sensors), pressure (BMP390), and humidity (DHT11) to an SD card, and wrote the code', 'Studied variation in solar-panel efficiency across altitude', 'Presented findings through a research abstract and presentation at the SmallSat Education Conference, Kennedy Space Center (NASA)'],
    skills: ['Arduino', 'Electronics', 'Data Analysis'],
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
    period: '2025',
    description: 'Led two international student teams from ideation through solution development.',
    responsibilities: ['Led planning and solution development for an asteroid-mining project (1st Place) and a multiple-sclerosis health web app (Project of Distinction)', 'Co-authored abstracts and presentations for both projects', 'Selected by the Academy community as one of five Emerging Student Researchers of the Year, from over 8,000 eligible students in more than 100 countries'],
    skills: ['Team Leadership', 'Project Planning', 'Scientific Communication'],
    researchAreas: ['Health Technology', 'Space Science'],
    displayOrder: 6,
  },
  {
    id: 'exp-7',
    organization: 'Eric Pitman Summer Workshop',
    role: 'Participant — Environmental Genomics',
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
    description: 'Honors College student studying biomedical engineering with interests in computational biology, biomaterials, and translational research.',
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
    description: 'Graduate of the Class of 2026 with strong achievement in STEM, research, and academic leadership. AP Scholar with Distinction (2025, 2026). GPA: 4/4.',
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
  { id: 'skill-14', name: 'FastENLOC', category: 'Computational Biology', level: 'Advanced' },
  { id: 'skill-15', name: 'Biopython', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-16', name: 'Benchling', category: 'Computational Biology', level: 'Intermediate' },
  { id: 'skill-17', name: 'Streamlit', category: 'Web Development', level: 'Intermediate' },
  { id: 'skill-18', name: 'Google Colab', category: 'Web Development', level: 'Intermediate' },
  { id: 'skill-19', name: 'Notion', category: 'Productivity', level: 'Advanced' },
  { id: 'skill-20', name: 'Oracle Cloud Infrastructure', category: 'Cloud', level: 'Intermediate' },
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
    organization: 'ACS NERD',
    year: '2025',
    description: 'Recognized for a standout poster presentation in a prominent scientific research forum.',
    category: 'Poster presentation',
    image: '/uploads/acs-nerd-award.jpg',
    featured: true,
  },
  {
    id: 'award-3',
    title: 'SmallSat Education Conference',
    organization: 'Kennedy Space Center (NASA)',
    year: '2025',
    description: 'Studied variation in solar panel efficiency across altitude; presented findings and research at the Kennedy Space Center SmallSat Education Conference.',
    category: 'Conference presentation',
    image: '/uploads/smallsat-kennedy-space-center.jpg',
    featured: true,
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
    id: 'award-4',
    title: 'Medal of High Honors',
    organization: 'Terra Science Fair',
    year: '2025',
    description: 'Awarded for outstanding research impact and scientific communication.',
    category: 'Science fair',
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
    id: 'pres-1',
    title: 'Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T-Cells for Immunotherapy in NSCLC',
    event: 'IEEE ISEC 2025',
    presentationType: 'Conference',
    date: '2025',
    location: 'Princeton, NJ',
    abstract: 'Research presentation highlighting a computational immunotherapy design strategy for non-small cell lung cancer using bispecific antibodies.',
    relatedProject: 'bispecific-antibody-cancer-immunotherapy',
  },
  {
    id: 'pres-2',
    title: 'DuoDok — Independent Computational Research Tool',
    event: 'iFORE 2025',
    presentationType: 'Poster',
    date: '2025',
    location: '',
    abstract: 'Presentation of a research workflow tool for automating portions of the bispecific antibody computational pipeline.',
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

