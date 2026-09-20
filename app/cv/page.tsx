import type { ReactNode } from 'react';

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-lg font-bold tracking-wide text-white">{title}</h2>
      <div className="mt-1.5 h-px bg-[#bb7728]" />
      <div className="mt-3 space-y-2 text-[13px] leading-5 text-slate-100">{children}</div>
    </section>
  );
}

function MainSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-bold tracking-wide text-slate-900">{title}</h2>
      <div className="mt-1.5 h-px bg-[#bb7728]" />
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-800">{children}</div>
    </section>
  );
}

function Role({ title, details, children }: { title: string; details: string; children: ReactNode }) {
  return (
    <article>
      <div className="flex flex-col gap-0.5 xl:flex-row xl:items-baseline xl:justify-between xl:gap-5">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="shrink-0 text-xs italic text-slate-500">{details}</p>
      </div>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[13px] leading-5 marker:text-[#bb7728]">{children}</ul>
    </article>
  );
}

export default function CvPage() {
  return (
    <div className="container-shell section-shell">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">CV</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Curriculum Vitae</h1>
        </div>
        <a href="/cv.pdf" target="_blank" rel="noreferrer" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
          Download CV PDF
        </a>
      </div>

      <div className="overflow-hidden border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.12)] lg:grid lg:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="bg-[#13314d] p-7 text-white sm:p-9 lg:min-h-[1050px]">
          <header className="mb-8">
            <h2 className="font-serif text-[2rem] font-bold leading-[1.05] tracking-wide">MOHAMMAD<br />AARISH KHAN</h2>
            <p className="mt-5 text-sm font-semibold">Biomedical Engineering Researcher</p>
            <p className="mt-2 text-sm italic text-slate-300">University at Buffalo<br />Buffalo, NY</p>
          </header>
          <div className="space-y-7">
            <SidebarSection title="CONTACT">
              <p>kmohammadaarish@gmail.com</p><p>linkedin.com/in/mak08</p><p>github.com/Aarishkhan08</p><p>Google Scholar · ORCID: 0009-0000-6041-780X</p>
            </SidebarSection>
            <SidebarSection title="EDUCATION">
              <div><p className="font-semibold text-white">University at Buffalo</p><p>Biomedical Engineering Major</p><p>Honors College · Fall 2026 – Present</p></div>
              <div><p className="font-semibold text-white">Williamsville North High School</p><p>Class of 2026</p><p>AP Scholar of Distinction, 2025</p></div>
            </SidebarSection>
            <SidebarSection title="TECHNICAL SKILLS">
              <p><strong>Programming:</strong> Python, Java, Arduino, R</p><p><strong>AI/ML:</strong> AlphaFold, PyTorch, Hugging Face, Crew AI, Ollama</p><p><strong>Comp. Bio:</strong> GROMACS, PLIP, Prodigy, HDock, FastENLOC, Biopython, Benchling</p><p><strong>Web Dev:</strong> Streamlit, Google Colab</p><p><strong>Cloud:</strong> Oracle Cloud Infrastructure</p>
            </SidebarSection>
            <SidebarSection title="AWARDS & HONORS">
              <p>– NY Academy of Sciences: Emerging Student Researcher of the Year 2025</p><p>– ACS NERD Outstanding Poster Award 2025</p><p>– Kennedy Space Center SmallSat Conference 2025</p><p>– Terra Science Fair Medal of High Honors 2025</p><p>– College Board AP Scholar of Distinction 2025</p>
            </SidebarSection>
            <SidebarSection title="CONFERENCES">
              <p>– Kennedy Space Center / NASA SmallSat 2025</p><p>– iFORE 2025; ACS NERD 2025</p><p>– Terra Science Fair; IEEE ISEC 2025</p><p>– Global Impact Council Conference</p>
            </SidebarSection>
            <SidebarSection title="WORKSHOPS & CERTS">
              <p>– MIT Beaver Works: Autonomous Cars</p><p>– Biotech in Action – Biogen / Lab Central / MIT</p><p>– Oracle Cloud Infrastructure Gen AI Certification</p><p>– Eric Pitman Summer Workshop 2025</p>
            </SidebarSection>
          </div>
        </aside>

        <main className="space-y-10 p-7 sm:p-9 lg:p-10">
          <MainSection title="RESEARCH EXPERIENCE">
            <p className="text-xs font-bold italic uppercase tracking-wide text-[#bb7728]">Current research</p>
            <Role title="Williams Lab – ADHD Genetics Research" details="University at Buffalo | Jan 2025 – Present"><li>Use the FastENLOC computational pipeline to analyze genetic data as part of an ongoing research study investigating the genetic basis of ADHD.</li></Role>
            <Role title="Nushoor – Water Purification Research" details="Local Incubator for Underserved Communities | Sep 2024 – Present"><li>Collaborate on a team designing a low-cost water purification system for refugee communities in Bangladesh.</li><li>Tailor system design to community-specific constraints, including limited resources, cost, maintenance, and environmental conditions.</li></Role>
            <p className="pt-1 text-xs font-bold italic uppercase tracking-wide text-[#bb7728]">Past research</p>
            <Role title="Bispecific Antibodies for Cancer Immunotherapy" details="First Author, Published Researcher – Eigen Sciences | Jan 2024 – Jun 2025"><li>Designed a bispecific DuoBody antibody targeting 4-1BB on cancer cells and PD-L1 on T-cells as a potential treatment for non-small cell lung cancer (NSCLC), working with 10 antibodies, 2 receptors, and six computational platforms: AlphaFold, GROMACS, HDock, PLIP, and Prodigy.</li><li>Published “Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T-Cells for Immunotherapy in Non-Small Cell Lung Cancer (NSCLC)” – IEEE ISEC 2025 (DOI: 10.1109/ISEC64801.2025.11147433).</li><li>Created two research posters and presented at five conferences: ACS NERD, iFORE, Terra Science Fair, Global Impact Council Conference, and IEEE ISEC.</li><li>Recognition: Outstanding Poster Presentation Award (ACS NERD 2025); Medal of High Honors and Office of Naval Research Award (Terra Science Fair).</li></Role>
            <Role title="DuoDok – Independent Computational Research Tool" details="Personal Project"><li>Built a simulated pipeline automating portions of the bispecific antibody computational workflow, deployed as a web application.</li><li>Authored a research abstract and presented at iFORE 2025 and ACS NERD 2025, with an upcoming e-Ball conference presentation.</li></Role>
            <Role title="High-Altitude Balloon Research" details="UB Nanotechnology Lab – Summer Internship"><li>Designed electronics and wrote code as part of a five-student team for a high-altitude balloon mission carrying six solar panels.</li><li>Studied variation in solar-panel efficiency across altitude; presented findings via PowerPoint and research abstract at the SmallSat Education Conference, Kennedy Space Center (NASA).</li></Role>
            <Role title="International Research Projects" details="Head of Ideation & Implementation – NY Academy of Sciences Junior Academy Challenge"><li>Led ideation, planning, and solution development for two international teams: an asteroid-mining project (1st Place) and a multiple-sclerosis health web app (Project of Distinction).</li><li>Co-authored abstracts and PowerPoint presentations for both projects.</li><li>Selected as one of five students internationally, out of roughly 8,000 applicants, for the Emerging Student Researcher of the Year award.</li></Role>
            <Role title="Environmental Genomics" details="Eric Pitman Summer Workshop, University at Buffalo"><li>Analyzed water samples from Scajaquada Creek using whole-genome analysis and R-based programming to characterize microorganisms and biological material.</li><li>Presented findings in a final research presentation; gained hands-on experience in genomics, bioinformatics, R programming, and data analysis.</li></Role>
          </MainSection>
          <MainSection title="SELECTED PUBLICATION">
            <p className="font-semibold">Bispecific DuoBody Antibody Targeting 4-1BB on Cancer Cells and PD-L1 on T-Cells for Immunotherapy in Non-Small Cell Lung Cancer (NSCLC). <span className="font-normal">IEEE ISEC 2025.</span></p>
            <p className="text-xs italic text-slate-500">M. Aarish Khan et al. · DOI: 10.1109/ISEC64801.2025.11147433</p>
          </MainSection>
          <MainSection title="LEADERSHIP & EXTRACURRICULARS">
            <div className="space-y-1.5 text-[13px] leading-5">
              <p><strong>– Computer Club</strong> <span className="ml-2">President (2025–Present); Vice President (2023–25)</span></p>
              <p><strong>– National Honors Society</strong> <span className="ml-2">Vice President, Class of 2026 (2025–Present)</span><br />Organized NHS Running Event and Co-organized Tech Mentorship Program.</p>
              <p><strong>– Technology Student Association</strong> <span className="ml-2">Secretary & NY State Delegate (2024–25)</span></p>
              <p><strong>– Global Impact Council</strong> <span className="ml-2">Director of Social Media (2024–25); Writing Team (2023–24)</span></p>
              <p><strong>– Superintendent Inter-High Action Committee</strong> <span className="ml-2">Co-Chair (2023–Present)</span></p>
              <p><strong>– Shared Decision Making Committee</strong> <span className="ml-2">Class Representative (2024–Present)</span></p>
              <p><strong>– Science Olympiad (2022–Present)</strong> <span className="ml-2">Science Honors Society (2023–Present)</span></p>
            </div>
          </MainSection>
        </main>
      </div>
    </div>
  );
}
