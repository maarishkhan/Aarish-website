import fs from 'node:fs';
import path from 'node:path';

import { readDatabaseCollection } from '@/lib/content-database';

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

const defaultSiteConfig: SiteConfig = {
  name: 'M Aarish Khan',
  title: 'Biomedical Engineering Researcher',
  headline: 'Biomedical engineering researcher exploring AI-driven computational biology, genomics, and translational health innovation.',
  bio: 'I am a biomedical engineering researcher at the University at Buffalo with interests in computational biology, biomedical imaging, biomaterials, and translational research. My work spans ADHD genetics, antibody engineering, water purification design, and interdisciplinary scientific communication.',
  university: 'University at Buffalo Honors College and Jacobs School of Medicine and Biomedical Sciences',
  location: 'Buffalo, NY, USA',
  email: 'admin@university.edu',
  phone: '+1 (555) 123-4567',
  profileImage: 'https://media.licdn.com/dms/image/v2/D4E03AQE_wKn5xe7uRQ/profile-displayphoto-scale_100_100/B4EZ97LznaHoAY-/0/1784478120673?e=1791417600&v=beta&t=SOPTrqLh9J3yOQ9-zVSgtCHec81kLqS0UwGK8CTunpU',
  heroImage: 'https://media.licdn.com/dms/image/v2/D4E16AQFrIbeiSAY71w/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1706494686090?e=1791417600&v=beta&t=qeqO_Y3Avyt6sWe2Sp63cUno85NxyUdVjbXR8G3x-6g',
  theme: {
    accent: '#1f5eff',
    accentSoft: '#dfe8ff',
    secondary: '#8b5cf6',
    secondarySoft: '#ede9fe',
  },
  socials: {
    github: '',
    linkedin: 'https://www.linkedin.com/in/mak08/',
    medium: 'https://medium.com/@kmohammadaarish',
    scholar: '',
    orcid: '',
    researchgate: '',
  },
  navItems: [
    { label: 'Home', href: '/', enabled: true },
    { label: 'About', href: '/about', enabled: true },
    { label: 'Research', href: '/research', enabled: true },
    { label: 'Projects', href: '/projects', enabled: true },
    { label: 'Publications', href: '/publications', enabled: true },
    { label: 'Experience', href: '/experience', enabled: true },
    { label: 'Education', href: '/education', enabled: true },
    { label: 'Skills', href: '/skills', enabled: true },
    { label: 'Awards', href: '/awards', enabled: true },
    { label: 'Presentations', href: '/presentations', enabled: true },
    { label: 'Blog', href: '/blog', enabled: true },
    { label: 'CV', href: '/cv', enabled: true },
    { label: 'Contact', href: '/contact', enabled: true },
    { label: 'Research AI', href: '/research-ai', enabled: true },
  ],
  templateSections: [
    { key: 'researchInterests', label: 'Research interests', enabled: true },
    { key: 'featuredResearch', label: 'Featured research', enabled: true },
    { key: 'publications', label: 'Publications', enabled: true },
    { key: 'experience', label: 'Experience', enabled: true },
    { key: 'education', label: 'Education', enabled: true },
    { key: 'awards', label: 'Awards', enabled: true },
    { key: 'presentations', label: 'Presentations', enabled: true },
    { key: 'blog', label: 'Blog', enabled: true },
    { key: 'researchAI', label: 'Research AI', enabled: true },
  ],
  features: {
    research: true,
    publications: true,
    blog: true,
    researchAI: true,
  },
};

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(process.cwd(), 'data', 'site-content.json');

  try {
    if (!fs.existsSync(filePath)) {
      return defaultSiteConfig;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<SiteConfig> | null;

    return {
      ...defaultSiteConfig,
      ...(parsed ?? {}),
      theme: {
        ...defaultSiteConfig.theme,
        ...((parsed?.theme ?? {}) as Record<string, string | undefined>),
      },
      socials: {
        ...defaultSiteConfig.socials,
        ...((parsed?.socials ?? {}) as Record<string, string | undefined>),
      },
      navItems: Array.isArray(parsed?.navItems) && parsed.navItems.length > 0 ? parsed.navItems : defaultSiteConfig.navItems,
      templateSections:
        Array.isArray(parsed?.templateSections) && parsed.templateSections.length > 0
          ? parsed.templateSections
          : defaultSiteConfig.templateSections,
      features: {
        ...defaultSiteConfig.features,
        ...(parsed?.features ?? {}),
      },
    };
  } catch {
    return defaultSiteConfig;
  }
}

export const siteConfig = getSiteConfig();

export function getSocialLinks(config?: SiteConfig) {
  const activeConfig = config ?? getSiteConfig();

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
    id: 'bioimaging',
    title: 'Biomedical Imaging',
    shortDescription: 'Image-guided systems and computational reconstruction for medical diagnostics and monitoring.',
    description: 'I am exploring biomedical imaging approaches that improve clarity, interpretability, and decision support across clinical and research workflows.',
    keywords: ['MRI', 'CT', 'imaging', 'signal processing'],
    icon: 'sparkles',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'biomaterials',
    title: 'Biomaterials',
    shortDescription: 'Material design for implantable, responsive, and tissue-compatible biomedical applications.',
    description: 'This area focuses on biomaterial selection, surface characterization, and structure-function relationships relevant to medical devices and regenerative interfaces.',
    keywords: ['biomaterials', 'tissue interfaces', 'device design'],
    icon: 'dna',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'computational-biology',
    title: 'Computational Biology',
    shortDescription: 'Quantitative analysis of biological systems and patient-derived datasets.',
    description: 'Computational methods are used to interpret biological signals, model biological processes, and support translational research decisions.',
    keywords: ['bioinformatics', 'modeling', 'statistical analysis'],
    icon: 'graph',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'medical-devices',
    title: 'Medical Devices',
    shortDescription: 'Engineering design for sensing, intervention, and clinical monitoring technologies.',
    description: 'I focus on human-centered design and validation of devices intended for diagnosis, monitoring, and therapeutic support.',
    keywords: ['device design', 'sensing', 'clinical translation'],
    icon: 'pulse',
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
    id: 'proj-1',
    title: 'ADHD Genetics Research',
    slug: 'adhd-genetics-research',
    shortDescription: 'Computational analysis of genetic data using FastENLOC to investigate the genetic basis of ADHD.',
    description: 'As part of ongoing work with Williams Lab at the University at Buffalo, I use the FastENLOC computational pipeline to analyze genetic data in a study focused on the genetic basis of ADHD.',
    researchQuestion: 'How can genomic and computational analysis help illuminate the genetic architecture underlying ADHD?',
    motivation: 'Understanding the genetic underpinnings of ADHD may provide insight into disease mechanisms and inform more targeted research strategies.',
    methodology: 'My work applies computational genetics pipelines, statistical analysis, and evidence-based interpretation of gene-level associations.',
    results: 'The project is contributing to a growing understanding of how genetic data can be analyzed to support ADHD research.',
    researchArea: 'Computational Biology',
    technologies: ['Python', 'FastENLOC', 'Genomics', 'Biological Data Analysis'],
    datasets: ['Genetic association data', 'Research genotype datasets'],
    advisor: 'Williams Lab',
    institution: 'University at Buffalo',
    startDate: '2025-01',
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
    description: 'I collaborate on a team creating a low-cost water purification system designed for underserved communities, tailoring system design to local constraints such as affordability, maintenance, and environmental conditions.',
    researchQuestion: 'How can water purification systems be designed to remain effective, affordable, and sustainable in underserved settings?',
    motivation: 'Many communities have limited resources and require low-maintenance, context-aware engineering solutions for essential water access.',
    methodology: 'The project combines systems design, community-driven constraints assessment, and engineering design optimization for practical deployment.',
    results: 'The effort aims to produce a practical, low-cost purification design that can meet the needs of resource-limited communities.',
    researchArea: 'Medical and Environmental Engineering',
    technologies: ['Systems Design', 'Water Treatment', 'Human-Centered Engineering'],
    datasets: ['Community requirements', 'Water quality considerations'],
    advisor: 'Local incubator team',
    institution: 'Local Incubator for Underserved Communities',
    startDate: '2024-09',
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
    authors: ['M. Aarish Khan', 'et al.'],
    publicationType: 'Conference paper',
    conference: 'IEEE ISEC',
    publicationDate: '2025',
    abstract: 'This computational immunotherapy study evaluates a bispecific DuoBody antibody designed to engage 4-1BB on cancer cells and PD-L1 on T cells in non-small cell lung cancer, using structural modeling and interaction analysis tools such as AlphaFold, GROMACS, HDock, PLIP, and Prodigy.',
    keywords: ['cancer immunotherapy', 'bispecific antibodies', 'computational biology', 'NSCLC'],
    doi: '10.1109/ISEC64801.2025.11147433',
    pdfUrl: 'https://ieeexplore.ieee.org/document/11147433',
    abstractUrl: 'https://ieeexplore.ieee.org/abstract/document/11147433',
    externalUrl: 'https://ieeexplore.ieee.org/document/11147433',
    citation: 'Khan, M. A., et al. “Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T Cells for Immunotherapy in Non-Small Cell Lung Cancer (NSCLC).” IEEE ISEC 2025. doi: 10.1109/ISEC64801.2025.11147433',
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
  description: string;
  responsibilities: string[];
  skills: string[];
  researchAreas: string[];
  displayOrder: number;
};

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
    responsibilities: ['Design low-cost purification systems', 'Tailor solutions to community constraints', 'Support engineering decision-making for practical deployment'],
    skills: ['Systems Design', 'Public Health Engineering', 'Problem Solving'],
    researchAreas: ['Environmental Engineering', 'Public Health'],
    displayOrder: 2,
  },
  {
    id: 'exp-3',
    organization: 'Eigen Sciences',
    role: 'Researcher — Bispecific Antibodies for Cancer Immunotherapy',
    location: 'Computational Biology Research',
    startDate: '2024',
    endDate: '2025',
    description: 'Designed a bispecific DuoBody antibody targeting 4-1BB on cancer cells and PD-L1 on T-cells as a potential treatment for non-small cell lung cancer using six computational platforms.',
    responsibilities: ['Model molecular binding interactions', 'Run computational antibody analysis', 'Support poster development and conference presentation'],
    skills: ['AlphaFold', 'GROMACS', 'HDock', 'PLIP', 'Prodigy', 'Biopython'],
    researchAreas: ['Cancer Immunotherapy', 'Computational Drug Design'],
    displayOrder: 3,
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
    description: asString(row.description, ''),
    responsibilities: asStringArray(row.responsibilities),
    skills: asStringArray(row.skills),
    researchAreas: asStringArray(row.research_areas),
    displayOrder: Number(row.display_order ?? 0),
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
    description: 'Graduate of the Class of 2026 with strong achievement in STEM, research, and academic leadership. AP Scholar of Distinction, 2025. GPA:4/4.',
    gpa: '',
    honors: ['AP Scholar of Distinction'],
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
  featured: boolean;
};

const defaultAwards: Award[] = [
  {
    id: 'award-1',
    title: 'Emerging Student Researcher of the Year',
    organization: 'NY Academy of Sciences',
    year: '2025',
    description: 'Selected as one of the top 5 students internationally out of approximately 8,000 applicants for this recognition.',
    category: 'Research excellence',
    featured: true,
  },
  {
    id: 'award-2',
    title: 'Outstanding Poster Presentation Award',
    organization: 'ACS NERD',
    year: '2025',
    description: 'Recognized for a standout poster presentation in a prominent scientific research forum.',
    category: 'Poster presentation',
    featured: true,
  },
  {
    id: 'award-3',
    title: 'SmallSat Education Conference',
    organization: 'Kennedy Space Center(NASA)',
    year: '2025',
    description: 'Studied variation in solar panel efficiency across altitude; presented findings and research at the Kennedy Space Center SmallSat Education Conference.',
    category: 'Confrence Presentation',
    featured: true,
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
    title: 'AP Scholar of Distinction',
    organization: 'College Board',
    year: '2025',
    description: 'Recognized for academic excellence across Advanced Placement coursework.',
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
    location: 'Conference venue',
    abstract: 'Research presentation highlighting a computational immunotherapy design strategy for non-small cell lung cancer using bispecific antibodies.',
    relatedProject: 'adhd-genetics-research',
  },
  {
    id: 'pres-2',
    title: 'DuoDok — Independent Computational Research Tool',
    event: 'iFORE 2025',
    presentationType: 'Poster',
    date: '2025',
    location: 'Conference venue',
    abstract: 'Presentation of a research workflow tool for automating portions of the bispecific antibody computational pipeline.',
    relatedProject: 'nushoor-water-purification',
  },
  {
    id: 'pres-3',
    title: 'Environmental Genomics Research',
    event: 'Eric Pitman Summer Workshop',
    presentationType: 'Seminar',
    date: '2025',
    location: 'University at Buffalo',
    abstract: 'Analysis of water samples from Scajaquada Creek using whole-genome methods and R-based programming to characterize microbial communities.',
    relatedProject: 'adhd-genetics-research',
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
    author: 'M Aarish Khan',
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

export const socialLinks = getSocialLinks();
