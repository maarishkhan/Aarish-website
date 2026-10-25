import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { blogPosts } from '@/data/site-config';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug && item.published);

  if (!post) {
    notFound();
  }

  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow={post.category} title={post.title} intro={post.summary} back={{ href: '/blog', label: 'All posts' }} compact />

      <article className="card-surface mx-auto max-w-3xl p-6 md:p-10">
        <p className="text-sm text-slate-500">{post.author} • {post.publishedAt}</p>

        <div className="mt-8 space-y-4 text-base leading-8 text-slate-700">
          {post.content.split(/\n{2,}/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        )}

        {post.references && post.references.length > 0 && (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-semibold text-brand-dark">References</h2>
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

  return post ? { title: post.title, description: post.summary, alternates: { canonical: `/blog/${slug}` } } : {};
}
