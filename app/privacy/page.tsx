import { PageHeader } from '@/components/layout/page-header';
import { LegalSection, legalUpdated } from '@/components/layout/legal-section';
import { getSiteConfig } from '@/data/site-config';

export const metadata = {
  title: 'Privacy',
  description: 'How this website handles visitor information: analytics, hosting logs, the Research AI, and contact by email.',
  alternates: { canonical: '/privacy' },
};

export default async function PrivacyPage() {
  const site = await getSiteConfig();

  return (
    <div className="container-shell section-shell">
      <PageHeader eyebrow="Privacy" title="Privacy notice" intro={`Last updated ${legalUpdated}. This is a personal portfolio website. It does not ask visitors to create accounts or enter personal details.`} />

      <div className="max-w-3xl">
        <LegalSection title="What is collected">
          <ul>
            <li>
              <strong>Hosting logs.</strong> The site is hosted on Vercel, which records technical request data such as IP address, browser type and the pages requested, for security and operation of the service.
            </li>
            <li>
              <strong>Analytics.</strong> The site may use Vercel Web Analytics to count page views, referring sites, countries and device types. It is designed to work without cookies and does not build profiles of individual visitors. It also counts a few anonymous actions, such as a click on the CV download or an email button, or a question being asked of the Research AI, but never the content of any message or question.
            </li>
            <li>
              <strong>Research AI questions.</strong> If you use the Research AI page, the question you type is processed to produce an answer. When an AI provider is switched on, your question and the public site content are sent to that provider (for example Anthropic, OpenAI or Google) to generate the reply. Please do not enter personal, sensitive or confidential information. Questions are not stored by this site.
            </li>
            <li>
              <strong>Email.</strong> If you email {site.email}, I receive your address and message and will use them only to reply.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies">
          <p>Visitors are not given cookies by this site. A sign-in cookie is set only for the site owner when they sign in to the private admin area.</p>
        </LegalSection>

        <LegalSection title="How information is used and shared">
          <p>Information is used only to run and secure the site, understand how many people visit, answer questions you send, and improve the content. It is not sold. It is shared only with the service providers named above, who process it on my behalf.</p>
        </LegalSection>

        <LegalSection title="Photos and other people">
          <p>Photos on this site are of me, or include people who agreed to appear. If you appear in a photo and would like it removed or cropped, email {site.email} and I will do it promptly.</p>
        </LegalSection>

        <LegalSection title="Your choices and contact">
          <p>You can ask me to delete an email conversation or answer questions about this notice by writing to {site.email}. Depending on where you live, you may also have rights to access or delete personal data held about you; contact me and I will respond.</p>
        </LegalSection>

        <LegalSection title="Changes">
          <p>I may update this notice when the site changes. The date at the top shows the latest version.</p>
        </LegalSection>
      </div>
    </div>
  );
}
