import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';

export default function NotFound() {
  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="404" title="Page not found" intro="The page you requested is unavailable or may have moved." />
      <div className="flex flex-wrap gap-4">
        <Link href="/" className="btn btn-primary">Return Home</Link>
        <Link href="/research" className="btn btn-secondary">Explore Research</Link>
      </div>
    </div>
  );
}
