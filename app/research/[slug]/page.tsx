import { researchProjects } from '@/data/site-config';

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  void params;
  return null;
}

export async function generateStaticParams() {
  return researchProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = researchProjects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}
