import type { MetadataRoute } from 'next';
import { blogPosts, publications, researchProjects, getSiteConfig } from '@/data/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://aarishkhan.vercel.app';
  const pages = (await getSiteConfig()).navItems.filter((item) => item.enabled).map((item) => item.href);
  const details = [
    ...researchProjects.filter((item) => item.published).map((item) => `/research/${item.slug}`),
    ...publications.filter((item) => item.published).map((item) => `/publications/${item.slug}`),
    ...blogPosts.filter((item) => item.published).map((item) => `/blog/${item.slug}`),
  ];

  return [...pages, ...details].map((path) => ({ url: `${base}${path === '/' ? '' : path}` }));
}
