import React from 'react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const Rajagiri: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'legacy' | 'global'>('legacy');

  const highlights = [
    'First College in Kerala to be accredited with NAAC A++ (3.83 CGPA)',
    'Autonomous status conferred by UGC India (2014 – 2030)',
    'Ranked #12 in India (NIRF Rankings 2025: Social Work Categories)',
    'Ranked #1 in Kerala State Institutional Rankings (KIRF 2025)',
    'College with Potential for Excellence (CPE) by UGC India',
  ];

  return (
    <div className="bg-[#FDFBF7] text-slate-800 min-h-screen">

      {/* ── HERO BANNER (EXPANDED TALL HEIGHT FOR FULL CAMPUS ARCHITECTURE DISPLAY) ── */}
      <div className="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-1 sm:px-2 pt-3 sm:pt-5 mb-14 lg:mb-20">
        <div className="relative w-full min-h-[540px] sm:min-h-[620px] lg:min-h-[700px] flex flex-col items-center justify-center overflow-hidden rounded-[28px] sm:rounded-[36px] bg-slate-950 text-white border border-slate-700/50 shadow-2xl">

          {/* Background Building Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/rajagiri_building_main.jpg"
              alt="Rajagiri College of Social Sciences Main Building Campus"
              className="w-full h-full object-cover object-center brightness-[0.78]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            {/* Neutral Dark Gradient Overlay for high contrast without blue color */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
          </div>

          {/* Centered Hero Content */}
          <div className="relative z-10 py-16 sm:py-24 lg:py-28 px-4 sm:px-8 text-center max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8">

            {/* Centered College Title */}
            <div>
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white leading-tight mb-3 sm:mb-4">
                Rajagiri College of Social Sciences
              </h1>
              <p className="text-base sm:text-2xl font-sans font-bold text-white/95 tracking-wide m-0">
                (Autonomous) &bull; Kalamassery, Kochi
              </p>
            </div>

            {/* Motto */}
            <div className="inline-block border-y border-white/25 py-2.5 sm:py-3.5 px-8 sm:px-14 my-1 backdrop-blur-xs">
              <p className="text-base sm:text-xl md:text-2xl font-heading font-bold text-slate-100 italic tracking-wider m-0">
                &ldquo;Relentlessly Towards Excellence&rdquo;
              </p>
            </div>

            {/* Centered Accreditation Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2">
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                Established in 1955
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                NAAC A++ Accredited (3.83 CGPA)
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                Ranked #12 in India (NIRF 2025)
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                UGC Autonomous (2014 &ndash; 2030)
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20 sm:pb-28 lg:pb-32">

        {/* ── TABBED CONTAINER LAYOUT (LEGACY & GLOBAL IMPACT) ── */}
        <div className="mb-20 lg:mb-28">

          {/* Tab Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-2 bg-slate-200/80 rounded-full max-w-2xl mx-auto mb-10 border border-slate-300 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('legacy')}
              className={`w-full sm:w-1/2 py-3.5 px-6 rounded-full text-xs sm:text-sm font-mono font-black uppercase tracking-wider transition-all duration-300 ${activeTab === 'legacy'
                ? 'bg-[#071A33] text-amber-300 shadow-lg scale-105'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/60'
                }`}
            >
              A Legacy of Distinction
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('global')}
              className={`w-full sm:w-1/2 py-3.5 px-6 rounded-full text-xs sm:text-sm font-mono font-black uppercase tracking-wider transition-all duration-300 ${activeTab === 'global'
                ? 'bg-[#071A33] text-amber-300 shadow-lg scale-105'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/60'
                }`}
            >
              SDG &amp; Global Impact
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/20 relative overflow-hidden transition-all duration-500">
            {/* Subtle background ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {activeTab === 'legacy' ? (
              /* Tab 1: Legacy Content */
              <div className="space-y-8 relative z-10 animate-fadeIn">

                {/* Top Header Row with RCSS Logo */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
                  <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-sans font-black uppercase tracking-[0.18em]">
                      <span>Autonomous Institution (2014 &ndash; 2030)</span>
                    </div>

                    <h2 className="text-[2.25rem] sm:text-[3rem] font-heading font-black text-white leading-tight tracking-tight">
                      A Legacy of Distinction &amp; Social Commitment
                    </h2>

                    <div className="w-20 h-1.5 bg-white/40 rounded-full" />
                  </div>

                  {/* RCSS Official Logo Card */}
                  <div className="shrink-0 flex lg:justify-end">
                    <div className="p-4 rounded-[22px] bg-white shadow-2xl border border-white/30 max-w-[240px] sm:max-w-[260px] transition-transform duration-300 hover:scale-[1.03]">
                      <img
                        src="/images/rcss_green_logo.png"
                        alt="RCSS — Rajagiri College of Social Sciences (Autonomous) Official Crest Seal"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-[16px] sm:text-[17.5px] text-slate-100 leading-relaxed font-sans font-medium max-w-4xl">
                  <p className="m-0">
                    Rajagiri College of Social Sciences (Autonomous) was established as a pioneer institution in Social Work education in the state of Kerala. Managed by the Carmelites of Mary Immaculate (CMI) congregation, the college has established a benchmark of academic excellence, holistic training, and evidence-based research.
                  </p>
                  <p className="m-0">
                    The term &ldquo;Rajagiri&rdquo; translates to &ldquo;Hill of the King,&rdquo; symbolizing the heights of learning and developmental yearning. True to its acronym <strong className="text-white font-black">DYUTI</strong> (&ldquo;Spark of Life&rdquo;), the institution fosters developmental dialogues that bridge academic theory with transformative field practice.
                  </p>
                </div>

                {/* Accreditation Highlights Grid */}
                <div className="pt-8 border-t border-white/20">
                  <h4 className="text-xs font-mono font-black uppercase tracking-[0.2em] text-white mb-4">
                    Key Institutional Accreditations &amp; Recognitions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 border border-white/15 text-[14px] text-slate-100 font-sans font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/40 mt-1.5 shrink-0 shadow-xs" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Tab 2: Global Standing Content */
              <div className="space-y-8 relative z-10 animate-fadeIn">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/15 border border-white/25 text-amber-300 text-xs font-mono font-black uppercase tracking-[0.18em]">
                    <span>Global Standing</span>
                  </div>

                  <h2 className="text-[2.25rem] sm:text-[3rem] font-heading font-black text-white leading-tight tracking-tight">
                    SDG &amp; Global Impact
                  </h2>

                  <div className="w-20 h-1.5 bg-amber-300 rounded-full" />
                </div>

                {/* Highlight Container Box */}
                <div className="p-6 sm:p-8 rounded-[20px] bg-amber-400 text-slate-950 shadow-xl border border-amber-300 max-w-3xl">
                  <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-slate-900 block mb-1">
                    Times Higher Education Impact Rankings
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black leading-tight text-slate-950 m-0">
                    Global Band 601&ndash;800 for SDG 3
                  </h3>
                </div>

                <div className="space-y-4 text-[16px] sm:text-[17.5px] text-slate-100 leading-relaxed font-sans font-medium max-w-4xl">
                  <p className="m-0">
                    Rajagiri has earned international recognition by being placed in the <strong className="text-amber-300 font-black">601&ndash;800 global band for SDG 3 (Good Health and Well-being)</strong> in the Times Higher Education Impact Rankings 2026.
                  </p>
                  <p className="m-0">
                    With world-class infrastructure, multidisciplinary academic programmes, dedicated research centres, live labs (extension departments), and a deep commitment to social sustainability, Rajagiri continues to set benchmarks in higher education globally.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── DEPARTMENT OF SOCIAL WORK (Contrast Deep Navy Card in Asymmetric Curved Leaf Shape) ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] overflow-hidden border border-white/20 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white shadow-2xl mb-20 lg:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

            {/* Narrative Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between order-2 lg:order-1">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-0.5 bg-amber-300" />
                  <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                    Host Department
                  </span>
                </div>

                <h3 className="font-heading text-[2rem] sm:text-[2.35rem] font-extrabold text-white m-0 mb-6">
                  Department of Social Work
                </h3>

                <div className="space-y-4 text-[14.5px] sm:text-[15.5px] text-slate-200 leading-relaxed font-sans font-normal">
                  <p className="m-0">
                    The Department of Social Work at Rajagiri College of Social Sciences (Autonomous) has a legendary record in social work education, research, internationalisation, and community engagement. The Department has been <strong className="text-white font-semibold">ranked #2 among Social Work programmes in India by Outlook-ICARE (2024)</strong> and <strong className="text-white font-semibold">#2 by India Today (2020–2024)</strong>.
                  </p>

                  <p className="m-0 text-slate-300">
                    The Department has undertaken impactful research with the Vimukthi Mission, Department of Excise (Government of Kerala), K-DISC, National Human Rights Commission, Kerala State Commission for Protection of Child Rights, and Department of Social Justice.
                  </p>

                  <p className="m-0 text-slate-300">
                    The <em className="text-white italic not-italic font-semibold">Rajagiri Journal of Social Development</em> is listed in UGC CARE and received the ICSSR Adhoc Annual Grant-in-Aid for 2024–2025.
                  </p>
                </div>
              </div>

              {/* Conferences Bottom Banner */}
              <div className="pt-6 border-t border-slate-700/60 mt-8">
                <div className="p-4 rounded-[14px] bg-slate-950/45 border border-slate-800/40">
                  <span className="text-xs sm:text-[13px] text-slate-200 font-sans font-normal leading-snug block">
                    <strong className="text-amber-300 uppercase tracking-wider font-mono text-[11px] block sm:inline sm:mr-2">Conferences:</strong>
                    25 Years of Internationalisation (DYUTI 2024) &bull; 24th ICSD Biennial (DYUTI 2025) &bull; 10th International Summer University
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Media Column */}
            <div className="lg:col-span-5 h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden order-1 lg:order-2 bg-slate-900/60 flex items-center justify-center p-6 lg:p-8 border-b lg:border-b-0 lg:border-l border-slate-800/20">
              <img
                src="https://dyuti.in/assets/images/rcss/department_of_social_work.png"
                alt="Department of Social Work at Rajagiri"
                className="w-full h-auto max-h-[520px] object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>
        </div>

        {/* ── 25 YEARS OF INTERNATIONALISATION (Contrast Deep Navy Card in Asymmetric Curved Leaf Shape) ── */}
        <div className="mb-20 lg:mb-28 rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] p-8 sm:p-12 lg:p-14 border border-white/20 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-heading text-[1.75rem] sm:text-[2.1rem] font-bold text-white m-0">
                25 Years of Internationalisation @ Rajagiri
              </h3>
              <p className="text-xs text-slate-350 font-sans font-semibold uppercase tracking-wider m-0 mt-1">
                A Proud Milestone Towards Global Academic Excellence
              </p>
            </div>
            <img
              src="https://dyuti.in/assets/images/25.png"
              alt="25 Years of Internationalisation Milestone"
              className="h-16 w-auto object-contain shrink-0 brightness-200 contrast-125"
            />
          </div>

          <p className="text-slate-200 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-8 font-sans font-normal">
            <strong className="text-white font-bold">Internationalisation</strong> has been a foundational pillar for Rajagiri since its inception, having completed 25 years of official international collaborations across 60+ partner universities in 30 countries:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] sm:text-[13.5px] text-white">
            <div className="flex items-start gap-3 p-5 rounded-[14px] bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              <span className="font-sans leading-relaxed text-slate-100">A global academic network spanning <strong className="text-white">60+ partner universities across 30 countries</strong>.</span>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-[14px] bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              <span className="font-sans leading-relaxed text-slate-100">Student exchange programmes with study opportunities ranging from <strong className="text-white">1 to 6 months</strong>.</span>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-[14px] bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              <span className="font-sans leading-relaxed text-slate-100">Hosting international students supported by the Government of India&apos;s <strong className="text-white">Study in India (SII) Programme</strong>.</span>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-[14px] bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              <span className="font-sans leading-relaxed text-slate-100">Collaborative research, dual-degree, twinning, and international internships for global exposure.</span>
            </div>
          </div>
        </div>

        {/* ── OFFICIAL RCSS PORTAL BANNER WITH BLURRED RAJAGIRI CAMPUS BACKGROUND ── */}
        <div className="relative text-center text-white border border-slate-200 rounded-[24px] sm:rounded-[28px] p-10 sm:p-16 shadow-lg overflow-hidden bg-[#071A33]">
          {/* Blurred Background Campus Image + Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="https://dyuti.in/assets/images/rcss/Rajagiri-College-of-Social-Sciences.jpg"
              alt="Rajagiri College Campus Background"
              className="w-full h-full object-cover object-center filter blur-sm scale-105 brightness-60"
              loading="eager"
            />
            {/* Deep Navy Atmospheric Gradient Overlay for crystal clear readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#071A33]/80 via-[#071A33]/70 to-[#071A33]/85" />
          </div>

          <div className="relative z-10">
            <h3 className="font-heading text-[2rem] sm:text-[2.65rem] font-extrabold text-white mb-3 tracking-tight">
              Explore RCSS Official Portal
            </h3>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans font-normal leading-relaxed">
              Discover academic programmes, research centres, live lab initiatives, and faculty publications at Rajagiri College of Social Sciences (Autonomous).
            </p>
            <Button
              variant="white"
              size="lg"
              asLink
              href={CONFERENCE_DATA.links.rajagiriPortal}
              target="_blank"
              rel="noopener noreferrer"
              showArrow
              className="shadow-lg hover:shadow-xl bg-white hover:bg-slate-100 text-[#071A33] border border-transparent font-bold h-12 inline-flex items-center justify-center transition-all hover:scale-105"
            >
              Visit rcss.rajagiri.edu
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
