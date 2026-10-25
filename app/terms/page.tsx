import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { LegalSection, legalUpdated } from '@/components/layout/legal-section';
import { getSiteConfig } from '@/data/site-config';

export const metadata = {
  title: 'Terms and disclaimer',
  description: 'Terms of use, content disclaimer, copyright, and takedown contact for this personal portfolio website.',
  alternates: { canonical: '/terms' },
};

export default async function TermsPage() {
  const site = await getSiteConfig();

  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Terms" title="Terms and disclaimer" intro={`Last updated ${legalUpdated}. By using this website you agree to the points below.`} />

      <div className="max-w-3xl">
        <LegalSection title="About this site">
          <p>This is the personal portfolio of {site.name}, a student at the University at Buffalo. It is provided for information only. It is a personal website and is not an official website of, or endorsed by, the University at Buffalo or any other organization named on it.</p>
        </LegalSection>

        <LegalSection title="Not medical or professional advice">
          <p>Research summaries, project descriptions and any answers from the Research AI describe academic and student work, including computational studies. They are not medical, clinical, legal or professional advice, and the results have not been validated for use in patients. Do not rely on them to make health decisions.</p>
        </LegalSection>

        <LegalSection title="Accuracy">
          <p>I try to keep the content correct and current, but it may contain errors or become out of date. The Research AI generates answers from the content of this site and can be incomplete or wrong. For anything important, please contact me directly or check the original publication or organization.</p>
        </LegalSection>

        <LegalSection title="Organizations, names and awards">
          <p>Names, logos and marks of universities, conferences, competitions, companies and other organizations belong to their owners. They appear here only to describe my own participation, awards and affiliations accurately. Their appearance does not mean that those organizations sponsor or endorse this site.</p>
        </LegalSection>

        <LegalSection title="Copyright and reuse">
          <p>Unless stated otherwise, the text, design and photos on this site are © {new Date().getFullYear()} {site.name}. Published papers and posters remain subject to their publishers' and co-authors' rights. You may link to this site and quote short excerpts with attribution. Please ask before copying photos or larger parts of the content.</p>
        </LegalSection>

        <LegalSection title="Photos, privacy and takedown requests">
          <p>If you appear in a photo or are named on this site and want it removed or corrected, or if you believe content here infringes your rights, email {site.email}. Please say which page and item you mean. I will review requests promptly and remove or correct content where appropriate.</p>
        </LegalSection>

        <LegalSection title="External links">
          <p>This site links to third-party websites, such as publishers and social profiles. I do not control them and am not responsible for their content or practices.</p>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <p>The site is provided as is, without warranties. To the extent the law allows, I am not liable for any loss arising from using this site or relying on its content.</p>
        </LegalSection>

        <LegalSection title="Privacy">
          <p>See the <Link href="/privacy">privacy notice</Link> for how visitor information is handled.</p>
        </LegalSection>
      </div>
    </div>
  );
}
