import './globals.css';
import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { getSiteConfig } from '@/data/site-config';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const serif = Source_Serif_4({ subsets: ['latin'], display: 'swap', variable: '--font-serif' });

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aarishkhan.vercel.app'),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.bio,
    keywords: ['Biomedical Engineering', 'Computational Biology', 'Cancer Immunotherapy', 'Genomics', 'Undergraduate Researcher'],

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
      <body className={`${inter.className} ${serif.variable}`}>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
