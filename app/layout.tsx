import './globals.css';
import type { Metadata } from 'next';
import { getSiteConfig } from '@/data/site-config';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();

  return {
    metadataBase: new URL('https://example.com'),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.bio,
    keywords: ['Biomedical Engineering', 'Researcher', 'Academic Portfolio', 'Biomaterials', 'Medical Imaging'],
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.bio,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.bio,
    },
    alternates: {
      canonical: '/',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
