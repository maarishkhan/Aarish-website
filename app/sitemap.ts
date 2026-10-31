import type { MetadataRoute } from 'next';
import { blogPosts, publications, researchProjects, getSiteConfig } from '@/data/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aarishkhan.vercel.app').replace(/\/$/, '');
  const enabledPages = (await getSiteConfig()).navItems.filter((item) => item.enabled).map((item) => item.href);
  const blogEnabled = enabledPages.includes('/blog');

  // The contact page is always listed, even when its menu link is switched off.
  const pages = Array.from(new Set([...enabledPages, '/contact', '/privacy', '/terms']));
  const details = [
    ...researchProjects.filter((item) => item.published).map((item) => `/research/${item.slug}`),
    ...publications.filter((item) => item.published).map((item) => `/publications/${item.slug}`),
    // Blog posts are listed only while the blog itself is switched on in the menu.
    ...(blogEnabled ? blogPosts.filter((item) => item.published).map((item) => `/blog/${item.slug}`) : []),
  ];

  return [...pages, ...details].map((path) => ({
    url: `${base}${path === '/' ? '' : path}`,
    priority: path === '/' ? 1 : details.includes(path) ? 0.6 : 0.8,
  }));
}
