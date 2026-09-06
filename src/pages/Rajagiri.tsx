import React, { useState, useEffect } from 'react';

export const Rajagiri: React.FC = () => {
  const [socialWorkSlide, setSocialWorkSlide] = useState(0);

  const socialWorkSlides = [
    {
      id: 1,
      title: "Department of Social Work",
      content: (
        <div className="space-y-3 text-slate-200 text-[14px] sm:text-[15px] leading-relaxed font-sans font-normal">
          <p className="m-0">
            The Department of Social Work at Rajagiri College of Social Sciences (Autonomous) has a strong record in social work education, research, internationalisation, and community engagement.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-white text-xs sm:text-[13px] font-sans font-extrabold shadow-sm backdrop-blur-md">
              Ranked #2 in India &bull; Outlook-ICARE (2024)
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-white text-xs sm:text-[13px] font-sans font-extrabold shadow-sm backdrop-blur-md">
              Ranked #2 in India &bull; India Today (2020–2024)
            </span>
          </div>
        </div>
      ),
      image: "/images/department_of_social_work.png",
      alt: "Department of Social Work at Rajagiri College of Social Sciences"
    },
    {
      id: 2,
      title: "Research, Consultancies & UGC CARE Journal",
      content: (
        <div className="space-y-3 text-slate-200 text-[14px] sm:text-[15px] leading-relaxed font-sans font-normal">
          <p className="m-0">
            The Department has undertaken research with the <strong className="text-white font-semibold">Vimukthi Mission</strong>, <strong className="text-white font-semibold">Department of Excise (Government of Kerala)</strong>, <strong className="text-white font-semibold">Kerala Development and Innovation Strategic Council (K-DISC)</strong>, <strong className="text-white font-semibold">National Human Rights Commission</strong>, <strong className="text-white font-semibold">Kerala State Commission for Protection of Child Rights</strong>, and <strong className="text-white font-semibold">Department of Social Justice</strong>.
          </p>
          <p className="m-0 text-slate-300">
            The <em className="text-white font-semibold not-italic">Rajagiri Journal of Social Development</em> is listed in <strong className="text-white font-bold">UGC CARE</strong> and received the prestigious <strong className="text-white font-semibold">ICSSR Adhoc Annual Grant-in-Aid for 2024–2025</strong>.
          </p>
        </div>
      ),
      image: "/images/gallery/dyuti_brochure_release.jpg",
      alt: "Social Work Research Consultancies and Scholarly Publications"
    },
    {
      id: 3,
      title: "Community Outreach & Frontline Action",
      content: (
        <div className="space-y-3 text-slate-200 text-[14px] sm:text-[15px] leading-relaxed font-sans font-normal">
          <p className="m-0">
            The Department has received appreciation for its contributions to the <strong className="text-white font-medium">Tele-Counselling Programme</strong>, <strong className="text-white font-medium">Nasha Mukt Bharat Abhiyaan</strong>, <strong className="text-white font-medium">Anti-Drug Awareness Campaign</strong>, and <strong className="text-white font-medium">Varnachirakukal Children&apos;s Fest</strong>.
          </p>
          <p className="m-0 text-slate-300">
            Recognised nationally and internationally for exemplary frontline work in <strong className="text-white font-semibold">palliative care</strong> and <strong className="text-white font-semibold">COVID-19 pandemic management</strong>.
          </p>
        </div>
      ),
      image: "/images/gallery/6L6A7541.JPG",
      alt: "Community Outreach and Extension Services"
    },
    {
      id: 4,
      title: "Internationalisation & Flagship Conferences",
      content: (
        <div className="space-y-2.5 text-slate-200 text-[13.5px] sm:text-[14.5px] leading-relaxed font-sans font-normal">
          <p className="m-0">
            The Department celebrated <strong className="text-white font-bold">25 years of internationalisation through DYUTI 2024</strong> and hosted the <strong className="text-white font-semibold">24th ICSD Biennial Conference (DYUTI 2025)</strong>, marking 25 years of DYUTI with three books published.
          </p>
          <p className="m-0 text-slate-300">
            Host to the <strong className="text-white font-medium">10th International Summer University (2019)</strong>, the <strong className="text-white font-medium">Annual Symposium on Global Social Work (2018)</strong>, and <strong className="text-white font-medium">NAPCAIM 2nd International Conference on Palliative Care (2023)</strong>. Recipient of the <strong className="text-white font-medium">UGC-DAAD (2018)</strong> and <strong className="text-white font-medium">UGC-UKIERI Joint Research Programme (2017)</strong>.
          </p>
        </div>
      ),
      image: "/images/gallery/IMG_9963.JPG",
      alt: "International Conferences and Collaborative Academic Symposiums"
    }
  ];

  // Preload and cache all slide and page images immediately for zero-delay instant switching
  useEffect(() => {
    socialWorkSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
    const preloadList = [
      '/images/rajagiri_building_main.jpg',
      '/images/rajagiri_white_seal.png',
      '/images/pillar_excellence.jpg',
      '/images/pillar_innovation.jpg',
      '/images/pillar_autonomy.jpg',
      '/images/pillar_grassroots.jpg',
      '/images/28_years_internationalisation.png'
    ];
    preloadList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSocialWorkSlide((prev) => (prev === socialWorkSlides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [socialWorkSlides.length]);

  return (
    <div className="bg-[#FDFBF7] text-slate-800 min-h-screen">

      {/* ── HERO BANNER (EXPANDED HORIZONTAL LENGTH WITH STREAMLINED PROPORTIONS) ── */}
      <div className="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-1 sm:px-2 pt-3 sm:pt-5 mb-10 sm:mb-14">
        <div className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex flex-col items-center justify-center overflow-hidden rounded-[28px] sm:rounded-[36px] bg-slate-950 text-white border border-slate-700/50 shadow-2xl">

          {/* High Speed Local Building Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/rajagiri_building_main.jpg"
              alt="Rajagiri College of Social Sciences Main Building Campus"
              className="w-full h-full object-cover object-center brightness-[0.75]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            {/* Neutral Dark Gradient Overlay for high contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/80" />
          </div>

          {/* Centered Hero Content (Positioned higher with elevated vertical offset) */}
          <div className="relative z-10 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 text-center max-w-5xl mx-auto flex flex-col items-center justify-center space-y-3.5 sm:space-y-4 lg:space-y-5 -translate-y-2 sm:-translate-y-4">

            {/* Centered College Crest Seal Logo (Decreased height and compact proportion) */}
            <div className="flex justify-center mb-1">
              <img
                src="/images/rajagiri_white_seal.png"
                alt="Rajagiri College of Social Sciences Seal"
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Centered College Title */}
            <div>
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white leading-tight mb-2 sm:mb-3">
                Rajagiri College of Social Sciences
              </h1>
              <p className="text-base sm:text-2xl font-sans font-bold text-white/95 tracking-wide m-0">
                (Autonomous) &bull; Kalamassery, Kochi
              </p>
            </div>

            {/* Motto */}
            <div className="inline-block border-y border-white/25 py-2 sm:py-3 px-8 sm:px-14 my-0.5 backdrop-blur-xs">
              <p className="text-base sm:text-xl md:text-2xl font-heading font-bold text-slate-100 italic tracking-wider m-0">
                &ldquo;Relentlessly Towards Excellence&rdquo;
              </p>
            </div>

            {/* Centered Accreditation Badges matching dyuti.in live data */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                Established in 1955 by CMI
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                NAAC A++ Accredited (3.83 CGPA)
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                Ranked #12 in India (NIRF 2025)
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                Ranked #1 in Kerala (KIRF 2025)
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                UGC Autonomous (2014 &ndash; 2030)
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                UGC College with Potential for Excellence (CPE 2016)
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CARDS (EXTENDED FULL HORIZONTAL WIDTH MATCHING HERO BANNER) ── */}
      <div className="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-1 sm:px-2 pb-16 sm:pb-20 lg:pb-24">

        {/* ── CARD 1: A LEGACY OF DISTINCTION & SOCIAL COMMITMENT (Exact Text from dyuti.in/rajagiri) ── */}
        <div className="mb-12 sm:mb-16 rounded-[24px] sm:rounded-[32px] rounded-tl-[48px] sm:rounded-tl-[64px] rounded-br-[48px] sm:rounded-br-[64px] hd-card hd-card-dark text-white p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Background Watermarks */}
          <div className="absolute left-6 sm:left-10 top-10 font-heading font-extrabold text-white/[0.03] text-6xl sm:text-8xl lg:text-[9rem] select-none pointer-events-none tracking-tight leading-none">
            RAJAGIRI
          </div>
          <div className="absolute right-6 sm:right-10 bottom-8 font-heading font-extrabold text-white/[0.03] text-3xl sm:text-5xl lg:text-6xl select-none pointer-events-none tracking-wider text-right leading-none">
            LEARN SERVE EXCEL
          </div>

          <div className="relative z-10 space-y-8">
            {/* Top Header Row Centered with Crest (As Is) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 text-center pb-6 border-b border-white/15">
              <img
                src="/images/rajagiri_white_seal.png"
                alt="Rajagiri Seal"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                loading="eager"
                decoding="async"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-heading font-black text-white leading-tight tracking-tight m-0">
                Rajagiri College of Social Sciences (Autonomous)
              </h2>
            </div>

            {/* Institutional Narrative Section (100% faithful to dyuti.in/rajagiri) */}
            <div className="space-y-3.5 text-[14.5px] sm:text-[15.5px] text-slate-100 leading-relaxed font-sans font-normal pb-6 border-b border-white/15">
              <p className="m-0">
                <strong className="text-white font-bold">Rajagiri College of Social Sciences (Autonomous), Kalamassery</strong>, established in 1955 by the Carmelites of Mary Immaculate (CMI) Congregation, is one of India&apos;s premier institutions for higher education. Guided by its motto, <em className="text-white italic font-semibold">&ldquo;Relentlessly Towards Excellence&rdquo;</em>, the college has built a legacy of academic distinction, innovation, and social commitment.
              </p>
              <p className="m-0 text-slate-200">
                Conferred autonomous status by the University Grants Commission (UGC) in 2014, the institution continues to enjoy autonomous status up to the academic year 2029–30. Rajagiri College of Social Sciences was ranked 12th among colleges in India by the <strong className="text-white font-semibold">National Institutional Ranking Framework (NIRF) 2025</strong> and the <strong className="text-white font-semibold">1st in Kerala under the Kerala Institutional Ranking Framework (KIRF) 2025</strong>.
              </p>
              <p className="m-0 text-slate-200">
                The institution is accredited with an <strong className="text-white font-semibold">A++ grade by NAAC with a CGPA of 3.83</strong>. Rajagiri has also earned international recognition by being placed in the <strong className="text-white font-semibold">601–800 global band for SDG 3 (Good Health and Well-being)</strong> in the Times Higher Education Impact Rankings 2026. Rajagiri was also granted the status of <strong className="text-white font-semibold">&lsquo;College with Potential for Excellence&rsquo; (CPE)</strong> by the University Grants Commission (UGC) in 2016.
              </p>
            </div>

            {/* 4 Foundational Pillars Grid (HD Style & Shape Matching Reference) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch py-2 relative z-10">
              {/* Card 1: Relentlessly Towards Excellence */}
              <div className="group relative bg-gradient-to-br from-[#0F2B4D] via-[#0A1F38] to-[#061426] border border-[#1E3F6D]/80 hover:border-blue-400/60 rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 flex flex-col justify-between h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_16px_36px_rgba(0,0,0,0.45)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_42px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5">
                <div>
                  <div className="w-full h-40 sm:h-44 rounded-[22px] overflow-hidden mb-5 border border-white/10 shadow-md">
                    <img
                      src="/images/pillar_excellence.jpg"
                      alt="Relentlessly Towards Excellence"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-[11px] font-mono font-semibold tracking-widest text-sky-200 uppercase mb-3 shadow-inner">
                    PILLAR 01
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight mb-2.5 leading-snug group-hover:text-blue-100 transition-colors m-0">
                    &ldquo;Relentlessly Towards Excellence&rdquo;
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-200/90 leading-relaxed m-0 font-normal">
                    70+ years of pedagogical innovation, autonomous academic rigor, and transformative community impact.
                  </p>
                </div>
              </div>

              {/* Card 2: Pedagogical Innovation */}
              <div className="group relative bg-gradient-to-br from-[#0F2B4D] via-[#0A1F38] to-[#061426] border border-[#1E3F6D]/80 hover:border-blue-400/60 rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 flex flex-col justify-between h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_16px_36px_rgba(0,0,0,0.45)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_42px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5">
                <div>
                  <div className="w-full h-40 sm:h-44 rounded-[22px] overflow-hidden mb-5 border border-white/10 shadow-md">
                    <img
                      src="/images/pillar_innovation.jpg"
                      alt="Pedagogical Innovation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-[11px] font-mono font-semibold tracking-widest text-sky-200 uppercase mb-3 shadow-inner">
                    PILLAR 02
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight mb-2.5 leading-snug group-hover:text-blue-100 transition-colors m-0">
                    Pedagogical Innovation
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-200/90 leading-relaxed m-0 font-normal">
                    Pioneering social work education standards, curriculum development, and academic excellence in India.
                  </p>
                </div>
              </div>

              {/* Card 3: Autonomous Excellence */}
              <div className="group relative bg-gradient-to-br from-[#0F2B4D] via-[#0A1F38] to-[#061426] border border-[#1E3F6D]/80 hover:border-blue-400/60 rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 flex flex-col justify-between h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_16px_36px_rgba(0,0,0,0.45)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_42px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5">
                <div>
                  <div className="w-full h-40 sm:h-44 rounded-[22px] overflow-hidden mb-5 border border-white/10 shadow-md">
                    <img
                      src="/images/pillar_autonomy.jpg"
                      alt="Autonomous Excellence"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-[11px] font-mono font-semibold tracking-widest text-sky-200 uppercase mb-3 shadow-inner">
                    PILLAR 03
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight mb-2.5 leading-snug group-hover:text-blue-100 transition-colors m-0">
                    Autonomous Excellence
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-200/90 leading-relaxed m-0 font-normal">
                    Conferred UGC Autonomy (2014&ndash;2030) and CPE status, enabling dynamic industry-aligned curricula and global research partnerships.
                  </p>
                </div>
              </div>

              {/* Card 4: Grassroots Impact */}
              <div className="group relative bg-gradient-to-br from-[#0F2B4D] via-[#0A1F38] to-[#061426] border border-[#1E3F6D]/80 hover:border-blue-400/60 rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 flex flex-col justify-between h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_16px_36px_rgba(0,0,0,0.45)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_42px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5">
                <div>
                  <div className="w-full h-40 sm:h-44 rounded-[22px] overflow-hidden mb-5 border border-white/10 shadow-md">
                    <img
                      src="/images/pillar_grassroots.jpg"
                      alt="Grassroots Impact"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-[11px] font-mono font-semibold tracking-widest text-sky-200 uppercase mb-3 shadow-inner">
                    PILLAR 04
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight mb-2.5 leading-snug group-hover:text-blue-100 transition-colors m-0">
                    Grassroots Impact
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-200/90 leading-relaxed m-0 font-normal">
                    Community live labs, child protection desks, and rights-based field action translating classroom theory into measurable social good.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2: RECOGNITIONS & NATIONAL ACCOLADES (Exact dyuti.in/rajagiri section) ── */}
        <div className="mb-12 sm:mb-16 rounded-[24px] sm:rounded-[32px] rounded-tl-[48px] sm:rounded-tl-[64px] rounded-br-[48px] sm:rounded-br-[64px] p-6 sm:p-8 lg:p-10 hd-card hd-card-dark text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="text-center pb-4 border-b border-white/15">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-heading font-black text-white leading-tight tracking-tight m-0">
                Recognitions
              </h2>
            </div>

            {/* Institutional Distinction Narrative */}
            <div className="text-[14.5px] sm:text-[15.5px] text-slate-100 leading-relaxed font-sans font-normal max-w-5xl mx-auto text-center">
              <p className="m-0 text-slate-200">
                With state-of-the-art infrastructure, multidisciplinary academic programmes, international collaborations, research centres, placement opportunities, and live labs (extension departments), Rajagiri continuously sets benchmarks in higher education, institutional distinction, and community sustainability.
              </p>
            </div>

            {/* 4 Featured Recognition Badges Grid with Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
              {/* Recognition 1: India Elite Education Award */}
              <div className="group hd-card hd-glass-dark hd-glass-dark-hover rounded-[20px] p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 sm:h-40 rounded-[14px] overflow-hidden mb-3.5 hd-img-frame bg-white flex items-center justify-center p-3">
                    <img
                      src="/images/india_elite_education_award.jpg"
                      alt="India Elite Education & Institutional Excellence Awards & Conference 2026"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-sans font-extrabold uppercase tracking-wider text-slate-100 block mb-1">Award 2024</span>
                  <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-white transition-colors m-0 mb-1.5">
                    India Elite Education &amp; Institutional Excellence Award
                  </h4>
                  <p className="text-[11.5px] sm:text-xs text-slate-200 leading-relaxed m-0 font-sans font-normal">
                    Leadership in pedagogical quality and institutional distinction
                  </p>
                </div>
              </div>

              {/* Recognition 2: Eat Right Campus Award */}
              <div className="group hd-card hd-glass-dark hd-glass-dark-hover rounded-[20px] p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 sm:h-40 rounded-[14px] overflow-hidden mb-3.5 hd-img-frame bg-white flex items-center justify-center p-3">
                    <img
                      src="/images/eat_right_campus_fssai.png"
                      alt="Eat Right Campus Award by FSSAI - Eat Right India"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-sans font-extrabold uppercase tracking-wider text-slate-100 block mb-1">2025–2027</span>
                  <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-white transition-colors m-0 mb-1.5">
                    Eat Right Campus Award by FSSAI
                  </h4>
                  <p className="text-[11.5px] sm:text-xs text-slate-200 leading-relaxed m-0 font-sans font-normal">
                    Five-star certification for safe, hygienic and healthy nutrition
                  </p>
                </div>
              </div>

              {/* Recognition 3: Green Institution Certification */}
              <div className="group hd-card hd-glass-dark hd-glass-dark-hover rounded-[20px] p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 sm:h-40 rounded-[14px] overflow-hidden mb-3.5 hd-img-frame bg-white flex items-center justify-center p-3">
                    <img
                      src="/images/haritha_keralam_logo.jpg"
                      alt="Green Institution Certification - Haritha Keralam Mission"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-sans font-extrabold uppercase tracking-wider text-slate-100 block mb-1">Haritha Keralam</span>
                  <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-white transition-colors m-0 mb-1.5">
                    Green Institution Certification
                  </h4>
                  <p className="text-[11.5px] sm:text-xs text-slate-200 leading-relaxed m-0 font-sans font-normal">
                    Environmental sustainability, zero-waste and green initiatives
                  </p>
                </div>
              </div>

              {/* Recognition 4: Best NSS Unit Award */}
              <div className="group hd-card hd-glass-dark hd-glass-dark-hover rounded-[20px] p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 sm:h-40 rounded-[14px] overflow-hidden mb-3.5 hd-img-frame bg-white flex items-center justify-center p-3">
                    <img
                      src="/images/nss_logo.png"
                      alt="Best NSS Unit Award - National Service Scheme"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-sans font-extrabold uppercase tracking-wider text-slate-100 block mb-1">2023–24</span>
                  <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-white transition-colors m-0 mb-1.5">
                    Best NSS Unit Award
                  </h4>
                  <p className="text-[11.5px] sm:text-xs text-slate-200 leading-relaxed m-0 font-sans font-normal">
                    Outstanding youth volunteerism and grassroots social action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 3: DEPARTMENT OF SOCIAL WORK (Interactive Showcase with Complete dyuti.in Data) ── */}
        <div
          className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[42px] overflow-hidden hd-card hd-card-dark p-6 sm:p-10 lg:p-12 text-white mb-12 sm:mb-16"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none animate-pulse duration-[4000ms]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse duration-[5000ms]" />

          {/* Background Angled Facet */}
          <div className="absolute top-0 left-0 w-[55%] h-full bg-black/25 transform -skew-x-12 -translate-x-16 pointer-events-none" />

          {/* Left Arrow Button */}
          <button
            onClick={() => setSocialWorkSlide((prev) => (prev === 0 ? socialWorkSlides.length - 1 : prev - 1))}
            aria-label="Previous Slide"
            className="group/btn absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/50 backdrop-blur-md shadow-lg focus:outline-none cursor-pointer"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg transition-transform duration-300 group-hover/btn:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => setSocialWorkSlide((prev) => (prev === socialWorkSlides.length - 1 ? 0 : prev + 1))}
            aria-label="Next Slide"
            className="group/btn absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/50 backdrop-blur-md shadow-lg focus:outline-none cursor-pointer"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Inner Content Grid */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Narrative Content with Fade-In Transition */}
              <div
                key={socialWorkSlide}
                className="lg:col-span-7 flex flex-col justify-center animate-fade-in transition-all duration-500"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-white text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider shadow-sm backdrop-blur-md mb-3 w-fit">
                  Department of Social Work &bull; Legacy of Excellence
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-white m-0 mb-4 leading-tight tracking-tight">
                  {socialWorkSlides[socialWorkSlide].title}
                </h3>

                <div className="min-h-[140px] sm:min-h-[150px] flex items-center">
                  {socialWorkSlides[socialWorkSlide].content}
                </div>
              </div>

              {/* Right Column: Photo Frame */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="w-full h-[260px] sm:h-[320px] lg:h-[360px] rounded-[24px] sm:rounded-[32px] rounded-tr-[54px] sm:rounded-tr-[72px] rounded-bl-[54px] sm:rounded-bl-[72px] hd-img-frame relative group bg-black/40">
                  <img
                    key={socialWorkSlides[socialWorkSlide].image}
                    src={socialWorkSlides[socialWorkSlide].image}
                    alt={socialWorkSlides[socialWorkSlide].alt}
                    className="w-full h-full object-cover animate-fade-in"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Continuous Auto-Advance Animated Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-6 mt-2">
              {socialWorkSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSocialWorkSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer overflow-hidden relative ${socialWorkSlide === idx
                    ? 'w-10 bg-white/20'
                    : 'w-2.5 bg-white/25 hover:bg-white/50'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {socialWorkSlide === idx && (
                    <div
                      key={`progress-${socialWorkSlide}`}
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                      style={{
                        animation: 'progressFill 4.5s linear forwards'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* ── CARD 4: 28 YEARS OF INTERNATIONALISATION @ RAJAGIRI (Side-by-Side Layout) ── */}
        <div className="mb-12 sm:mb-16 rounded-[24px] sm:rounded-[32px] rounded-tl-[48px] sm:rounded-tl-[64px] rounded-br-[48px] sm:rounded-br-[64px] p-6 sm:p-10 lg:p-12 hd-card hd-card-dark text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-white text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider shadow-sm backdrop-blur-md w-fit">
                Global Engagement &bull; 1998&ndash;2026
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white m-0 tracking-tight leading-tight">
                28 Years of Internationalisation @ Rajagiri
              </h2>

              <p className="text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-300 uppercase pb-2 border-b border-white/10 m-0">
                A Proud Milestone Towards Global Academic Excellence
              </p>

              {/* Body Paragraphs */}
              <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-sans font-normal pt-2">
                <p className="m-0">
                  <strong className="text-white font-bold">&lsquo;Internationalisation&rsquo;</strong> has been a cornerstone of Rajagiri&apos;s academic ethos since inception. Celebrating <span className="text-white font-bold">28 years of formal international collaborations</span>, Rajagiri maintains active agreements with over <strong className="text-white font-semibold">60 premier universities across 30 countries</strong>. These global alliances facilitate faculty exchanges, joint research, curriculum co-creation, and international consultancy.
                </p>
                <p className="m-0 text-slate-200">
                  Undergraduate and postgraduate students participate in semester-abroad and short-term study schemes ranging from <strong className="text-white font-semibold">1 to 6 months</strong>. Rajagiri also welcomes international scholars under the Government of India&apos;s <strong className="text-white font-semibold">Study in India (SII)</strong> initiative, alongside offering dual-degree and twinning pathways with distinguished global partner institutions.
                </p>
              </div>
            </div>

            {/* Right Column: Large 28 Years Emblem */}
            <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center">
              <div className="relative group p-2 sm:p-4 flex items-center justify-center">
                <img
                  src="/images/28_years_internationalisation.png"
                  alt="28 Years of Internationalisation - Rajagiri"
                  className="w-48 sm:w-60 md:w-72 lg:w-80 max-h-[300px] sm:max-h-[340px] h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── HIGH-VISIBILITY RAJAGIRI PORTAL CALLOUT ── */}
        <div className="pt-4 pb-2 flex justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-white border-2 border-slate-200/80 shadow-md max-w-3xl w-full text-center sm:text-left transition-all hover:border-[#071A33]/40 hover:shadow-xl">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#071A33] block">
                Official Institutional Portal
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 m-0">
                Explore Rajagiri College of Social Sciences (Autonomous)
              </p>
              <p className="text-xs text-slate-500 m-0 font-normal">
                Academic programmes, research centres, live labs, and institutional updates
              </p>
            </div>
            <a
              href="https://rcss.rajagiri.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#071A33] hover:bg-[#0b2952] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>Visit rcss.rajagiri.edu</span>
              <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};



