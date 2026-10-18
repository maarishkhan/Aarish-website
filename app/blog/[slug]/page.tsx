import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/site-config';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug && item.published);

  if (!post) {
    notFound();
  }

  return (
    <div className="container-shell section-shell">
      <Link href={'/blog' as Route} className="mb-6 inline-flex items-center text-sm font-medium text-sky-700">
        ← Back to blog
      </Link>

      <article className="card-surface mx-auto max-w-3xl p-6 md:p-10">
        <p className="text-xs uppercase tracking-[0.15em] text-sky-700">{post.category}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-500">{post.author} • {post.publishedAt}</p>

        <div className="mt-8 space-y-4 text-base leading-8 text-slate-700">
          {post.content.split(/\n{2,}/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">{tag}</span>
            ))}
          </div>
        )}

        {post.references && post.references.length > 0 && (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-semibold text-slate-900">References</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {post.references.map((reference) => (
                <li key={reference}>{reference}</li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.filter((post) => post.published).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug && item.published);

  return post ? { title: post.title, description: post.summary } : {};
}
