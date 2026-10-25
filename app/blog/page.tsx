import Link from 'next/link';
import type { Route } from 'next';
import { blogPosts, getSiteConfig } from '@/data/site-config';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = {
  title: 'Blog',
  description: 'Writing on biomedical engineering research, computational immunotherapy, genomics, and lessons from undergraduate research.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Blog" title="Research insights and reflections" />

      {siteConfig.socials.medium && (
        <div className="mb-6 flex justify-start">
          <Link href={siteConfig.socials.medium as Route} target="_blank" rel="noreferrer" className="btn btn-primary">
            View on Medium
          </Link>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.id} className="card-surface p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-brand">{post.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-brand-dark">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{post.summary}</p>
            <Link href={`/blog/${post.slug}` as Route} className="link-brand mt-5">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
