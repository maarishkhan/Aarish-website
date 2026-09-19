import Link from 'next/link';
import type { Route } from 'next';
import { blogPosts, getSiteConfig } from '@/data/site-config';

export default function BlogPage() {
  const siteConfig = getSiteConfig();

  return (
    <div className="container-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Research insights and reflections</h1>
      </div>

      {siteConfig.socials.medium && (
        <div className="mb-6 flex justify-start">
          <Link href={siteConfig.socials.medium as Route} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">
            View on Medium
          </Link>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.id} className="card-surface p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-sky-700">{post.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{post.summary}</p>
            <Link href={`/blog/${post.slug}` as Route} className="mt-5 inline-flex text-sm font-medium text-sky-700">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
