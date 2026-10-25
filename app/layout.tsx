import './globals.css';
import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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
      default: `${siteConfig.name} | ${siteConfig.title}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.headline,
    keywords: ['Biomedical Engineering', 'Computational Biology', 'Cancer Immunotherapy', 'Genomics', 'Computational Genetics', 'Synthetic Biology', 'Biomedical Engineering Student'],

    openGraph: {
      title: `${siteConfig.name} | ${siteConfig.title}`,
      description: siteConfig.headline,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} | ${siteConfig.title}`,
      description: siteConfig.headline,
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
        <Analytics />
      </body>
    </html>
  );
}
