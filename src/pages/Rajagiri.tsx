import React from 'react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const Rajagiri: React.FC = () => {
  return (
    <div className="bg-[#FDFBF7] text-slate-800 min-h-screen">

      {/* ── HERO BANNER (EXPANDED TALL HEIGHT & FULL HORIZONTAL LENGTH FOR CAMPUS ARCHITECTURE DISPLAY) ── */}
      <div className="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-1 sm:px-2 pt-3 sm:pt-5 mb-10 sm:mb-14">
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
            {/* Neutral Dark Gradient Overlay for high contrast */}
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
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                UGC College with Potential for Excellence (CPE)
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CARDS (EXTENDED FULL HORIZONTAL WIDTH MATCHING HERO BANNER) ── */}
      <div className="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-1 sm:px-2 pb-16 sm:pb-20 lg:pb-24">

        {/* ── CARD 1: A LEGACY OF DISTINCTION & SOCIAL COMMITMENT (icswhmh Achievements Card Design with Original Brand Colors & Content) ── */}
        <div className="mb-12 sm:mb-16 rounded-[24px] sm:rounded-[32px] rounded-tl-[48px] sm:rounded-tl-[64px] rounded-br-[48px] sm:rounded-br-[64px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Background Watermarks */}
          <div className="absolute left-6 sm:left-10 top-10 font-heading font-extrabold text-white/[0.03] text-6xl sm:text-8xl lg:text-[9rem] select-none pointer-events-none tracking-tight leading-none">
            RAJAGIRI
          </div>
          <div className="absolute right-6 sm:right-10 bottom-8 font-heading font-extrabold text-white/[0.03] text-3xl sm:text-5xl lg:text-6xl select-none pointer-events-none tracking-wider text-right leading-none">
            LEARN SERVE EXCEL
          </div>

          <div className="relative z-10 space-y-8">
            {/* Top Header Row Centered */}
            <div className="flex flex-col items-center justify-center text-center pb-6 border-b border-white/15">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-heading font-black text-white leading-tight tracking-tight m-0">
                A Legacy of Distinction &amp; Social Commitment
              </h2>
            </div>

            {/* Institutional Narrative Section */}
            <div className="space-y-3.5 text-[14px] sm:text-[14.5px] text-slate-100 leading-relaxed font-sans font-normal pb-4 border-b border-white/15">
              <p className="m-0">
                <strong className="text-white font-bold">Rajagiri College of Social Sciences (Autonomous), Kalamassery</strong>, established in 1955 by the Carmelites of Mary Immaculate (CMI) Congregation, is one of India&apos;s premier institutions for higher education. Guided by its motto, <em className="text-amber-300 italic font-semibold">&ldquo;Relentlessly Towards Excellence&rdquo;</em>, the college has built a rich legacy of academic distinction, innovation, and social commitment.
              </p>
              <p className="m-0 text-slate-200">
                Rajagiri with its vision of <em className="text-amber-300 italic">&lsquo;becoming a centre of excellence in learning for enriching and fulfilling LIFE&rsquo;</em> has been regularly providing an annual forum for deliberations on vital issues of development from a Rights perspective.
              </p>
              <p className="m-0 text-slate-200">
                The term &ldquo;Rajagiri&rdquo; translates to &ldquo;Hill of the King,&rdquo; symbolizing the heights of learning and developmental yearning. True to its acronym <strong className="text-white font-bold">DYUTI</strong> (&ldquo;Spark of Life&rdquo;), the institution fosters developmental dialogues that bridge academic theory with transformative field practice.
              </p>
            </div>

            {/* 4-Column Cards Grid with Horizontal Zigzag Flow (Motto + Foundational Institutional Pillars) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start py-4 sm:py-6 relative z-10">
              {/* Card 1: Relentlessly Towards Excellence */}
              <div className="group rounded-[24px] bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.15] hover:border-amber-400/40 p-6 sm:p-7 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/30 flex flex-col justify-between h-full lg:-translate-y-4 hover:lg:-translate-y-6">
                <div>
                  <div className="w-full h-40 sm:h-44 rounded-[16px] overflow-hidden mb-5 shadow-md">
                    <img
                      src="https://res.cloudinary.com/dswfp5fwx/image/upload/v1777322022/_DSC9801_twnmgf.jpg"
                      alt="Relentlessly Towards Excellence"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-amber-300 tracking-tight mb-2.5 leading-snug group-hover:text-amber-200 transition-colors m-0">
                    &ldquo;Relentlessly Towards Excellence&rdquo;
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-200 leading-relaxed m-0 font-normal">
                    70+ years of pedagogical innovation, autonomous academic rigor, and transformative community impact.
                  </p>
                </div>
              </div>

              {/* Card 2: Pedagogical Innovation */}
              <div className="group rounded-[24px] bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.15] hover:border-amber-400/40 p-6 sm:p-7 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/30 flex flex-col justify-between h-full lg:translate-y-4 hover:lg:translate-y-2">
                <div>
                  <div className="w-full h-40 sm:h-44 rounded-[16px] overflow-hidden mb-5 shadow-md">
                    <img
                      src="https://res.cloudinary.com/dswfp5fwx/image/upload/v1777274982/DSC00105_iniref.jpg"
                      alt="Pedagogical Innovation"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-amber-300 tracking-tight mb-2.5 leading-snug group-hover:text-amber-200 transition-colors m-0">
                    Pedagogical Innovation
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-200 leading-relaxed m-0 font-normal">
                    70+ years pioneering standards, curriculum development, and academic excellence across higher education in India.
                  </p>
                </div>
              </div>

              {/* Card 3: Autonomous Excellence */}
              <div className="group rounded-[24px] bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.15] hover:border-amber-400/40 p-6 sm:p-7 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/30 flex flex-col justify-between h-full lg:-translate-y-4 hover:lg:-translate-y-6">
                <div>
                  <div className="w-full h-40 sm:h-44 rounded-[16px] overflow-hidden mb-5 shadow-md">
                    <img
                      src="https://res.cloudinary.com/dswfp5fwx/image/upload/v1777274194/DSC00502_1_rahpwv.jpg"
                      alt="Autonomous Excellence"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-amber-300 tracking-tight mb-2.5 leading-snug group-hover:text-amber-200 transition-colors m-0">
                    Autonomous Excellence
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-200 leading-relaxed m-0 font-normal">
                    Conferred UGC Autonomy (2014&ndash;2030) and CPE status, enabling dynamic industry-aligned curricula and global research partnerships.
                  </p>
                </div>
              </div>

              {/* Card 4: Grassroots Impact */}
              <div className="group rounded-[24px] bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.15] hover:border-amber-400/40 p-6 sm:p-7 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/30 flex flex-col justify-between h-full lg:translate-y-4 hover:lg:translate-y-2">
                <div>
                  <div className="w-full h-40 sm:h-44 rounded-[16px] overflow-hidden mb-5 shadow-md">
                    <img
                      src="https://res.cloudinary.com/dswfp5fwx/image/upload/v1777274694/DSC01012_dnfcv2.jpg"
                      alt="Grassroots Impact"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-amber-300 tracking-tight mb-2.5 leading-snug group-hover:text-amber-200 transition-colors m-0">
                    Grassroots Impact
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-200 leading-relaxed m-0 font-normal">
                    Community live labs, child protection desks, and rights-based field action translating classroom theory into measurable social good.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2: SDG & GLOBAL IMPACT ── */}
        <div className="mb-12 sm:mb-16 rounded-[24px] sm:rounded-[32px] rounded-tr-[48px] sm:rounded-tr-[64px] rounded-bl-[48px] sm:rounded-bl-[64px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">

            {/* Top Header Row Centered */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 pb-6 border-b border-white/15">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-heading font-black text-white leading-tight tracking-tight m-0">
                SDG &amp; Global Impact
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-center shadow-md">
                <span className="text-base sm:text-lg font-heading font-extrabold text-amber-300">SDG 3</span>
                <span className="text-white/40">&bull;</span>
                <span className="text-xs sm:text-[13px] font-sans uppercase tracking-wider text-slate-200 font-medium">Global Band 601&ndash;800</span>
              </div>
            </div>

            {/* 2-Column Side-by-Side Grid (Narrative Left, 4 SDG Focus Cards Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Left Column: THE Highlight Banner & Narrative */}
              <div className="lg:col-span-5 space-y-4">
                {/* THE Impact Rankings Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/70 text-white shadow-lg border border-blue-400/30 backdrop-blur-md">
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.18em] text-amber-300 block mb-0.5">
                    Times Higher Education Impact Rankings 2026
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-black leading-tight text-white m-0 mb-1">
                    Global Band 601&ndash;800 for SDG 3 (Good Health &amp; Well-Being)
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-[13px] font-sans font-medium leading-relaxed m-0">
                    Recognising Rajagiri&apos;s institutional commitment to public health, community psycho-social wellbeing, mental health services, and frontline health outreach.
                  </p>
                </div>

                <div className="space-y-3 text-[14px] sm:text-[15px] text-slate-100 leading-relaxed font-sans font-medium">
                  <p className="m-0">
                    Rajagiri has earned international distinction in the <strong className="text-amber-300 font-bold">Times Higher Education (THE) Impact Rankings 2026</strong>, benchmarked against the United Nations Sustainable Development Goals.
                  </p>
                  <p className="m-0 text-slate-200">
                    Through active community engagement, multidisciplinary research centres, and global academic partnerships across 30+ countries, the college fosters impactful health, education, and social sustainability initiatives.
                  </p>
                </div>
              </div>

              {/* Right Column: 4 SDG Focus Cards */}
              <div className="lg:col-span-7 space-y-3 lg:border-l lg:border-white/15 lg:pl-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-0.5 bg-amber-300" />
                  <h4 className="text-xs font-mono font-black uppercase tracking-[0.18em] text-amber-300 m-0">
                    UN Sustainable Development Goals &bull; Institutional Alignment
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-1.5 hover:bg-white/15 transition-all">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block">SDG 03</span>
                      <h5 className="font-heading font-bold text-sm text-white m-0 leading-tight">Good Health &amp; Well-Being</h5>
                    </div>
                    <p className="text-[11.5px] text-slate-200 leading-relaxed m-0">Community mental health counselling, de-addiction research cell &amp; adolescent psycho-social interventions.</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-1.5 hover:bg-white/15 transition-all">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block">SDG 04</span>
                      <h5 className="font-heading font-bold text-sm text-white m-0 leading-tight">Quality Education</h5>
                    </div>
                    <p className="text-[11.5px] text-slate-200 leading-relaxed m-0">Outcome-based learning, autonomous curricula, student research grants, and international summer universities.</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-1.5 hover:bg-white/15 transition-all">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block">SDG 10</span>
                      <h5 className="font-heading font-bold text-sm text-white m-0 leading-tight">Reduced Inequalities</h5>
                    </div>
                    <p className="text-[11.5px] text-slate-200 leading-relaxed m-0">Rights-based social justice, child protection nodal desks, and inclusive tribal/rural development programmes.</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-1.5 hover:bg-white/15 transition-all">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block">SDG 17</span>
                      <h5 className="font-heading font-bold text-sm text-white m-0 leading-tight">Global Partnerships</h5>
                    </div>
                    <p className="text-[11.5px] text-slate-200 leading-relaxed m-0">Active collaborations with 60+ universities across 30 countries and international conference hosting (DYUTI/ICSD).</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── RECOGNITIONS & INSTITUTIONAL ACCOLADES ── */}
        <div className="mb-12 sm:mb-16 rounded-[24px] sm:rounded-[32px] rounded-tl-[48px] sm:rounded-tl-[64px] rounded-br-[48px] sm:rounded-br-[64px] p-6 sm:p-8 lg:p-10 border border-white/20 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div className="pb-4 border-b border-white/15">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight tracking-tight m-0">
                Recognitions
              </h2>
            </div>

            {/* Narrative & Badges in Wide Layout (Streamlined, Non-Repetitive) */}
            <div className="space-y-3 text-[14px] sm:text-[15px] text-slate-100 leading-relaxed font-sans font-medium max-w-5xl">
              <p className="m-0">
                With excellent infrastructure, multidisciplinary academic programmes, international collaborations, research centres, placement opportunities, live labs (extension departments), and a strong commitment to innovation, sustainability, and community engagement, Rajagiri continues to set benchmarks in higher education at the national and international levels.
              </p>
            </div>

            {/* 4 Featured Recognition Badges Grid with Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
              {/* Recognition 1: India Elite Education Award */}
              <div className="group rounded-[20px] bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.15] hover:border-amber-400/40 p-4 sm:p-5 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/30 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 sm:h-40 rounded-[14px] overflow-hidden mb-3.5 shadow-md">
                    <img
                      src="/images/gallery/6L6A7495.JPG"
                      alt="India Elite Education & Institutional Excellence Award"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block mb-1.5">Award 2024</span>
                  <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-amber-200 transition-colors m-0 mb-1.5">
                    India Elite Education &amp; Institutional Excellence Award
                  </h4>
                  <p className="text-[11.5px] sm:text-xs text-slate-200 leading-relaxed m-0 font-sans font-normal">
                    Leadership in pedagogical quality and institutional distinction
                  </p>
                </div>
              </div>

              {/* Recognition 2: Eat Right Campus Award */}
              <div className="group rounded-[20px] bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.15] hover:border-amber-400/40 p-4 sm:p-5 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/30 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 sm:h-40 rounded-[14px] overflow-hidden mb-3.5 shadow-md">
                    <img
                      src="/images/gallery/15137561.jpg"
                      alt="Eat Right Campus Award by FSSAI"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block mb-1.5">2025–2027</span>
                  <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-amber-200 transition-colors m-0 mb-1.5">
                    Eat Right Campus Award by FSSAI
                  </h4>
                  <p className="text-[11.5px] sm:text-xs text-slate-200 leading-relaxed m-0 font-sans font-normal">
                    Five-star certification for safe, hygienic and healthy nutrition
                  </p>
                </div>
              </div>

              {/* Recognition 3: Green Institution Certification */}
              <div className="group rounded-[20px] bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.15] hover:border-amber-400/40 p-4 sm:p-5 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/30 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 sm:h-40 rounded-[14px] overflow-hidden mb-3.5 shadow-md">
                    <img
                      src="/images/gallery/15168818.jpg"
                      alt="Green Institution Certification"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block mb-1.5">Haritha Keralam</span>
                  <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-amber-200 transition-colors m-0 mb-1.5">
                    Green Institution Certification
                  </h4>
                  <p className="text-[11.5px] sm:text-xs text-slate-200 leading-relaxed m-0 font-sans font-normal">
                    Environmental sustainability, zero-waste and green initiatives
                  </p>
                </div>
              </div>

              {/* Recognition 4: Best NSS Unit Award */}
              <div className="group rounded-[20px] bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.15] hover:border-amber-400/40 p-4 sm:p-5 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/30 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 sm:h-40 rounded-[14px] overflow-hidden mb-3.5 shadow-md">
                    <img
                      src="/images/gallery/IMG_1460.JPG"
                      alt="Best NSS Unit Award"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block mb-1.5">2023–24</span>
                  <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white leading-snug group-hover:text-amber-200 transition-colors m-0 mb-1.5">
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

        {/* ── DEPARTMENT OF SOCIAL WORK (Contrast Deep Navy Card in Asymmetric Curved Leaf Shape) ── */}
        <div className="rounded-[24px] sm:rounded-[32px] rounded-tr-[48px] sm:rounded-tr-[64px] rounded-bl-[48px] sm:rounded-bl-[64px] overflow-hidden border border-white/20 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white shadow-2xl mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

            {/* Narrative Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 lg:order-1">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-0.5 bg-amber-300" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-amber-300">
                    Host Department
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-[1.85rem] font-extrabold text-white m-0 mb-4">
                  Department of Social Work
                </h3>

                <div className="space-y-3 text-[14px] sm:text-[15px] text-slate-200 leading-relaxed font-sans font-normal">
                  <p className="m-0">
                    Rajagiri School of Social Work, started in the year 1955 was one of the pioneering institutions in south India, establishing programmes and setting standards in the field of social work education. The Department of Social Work at Rajagiri College of Social Sciences (Autonomous) has a legendary record in social work education, research, internationalisation, and community engagement. The Department has been <strong className="text-white font-semibold">ranked #2 among Social Work programmes in India by Outlook-ICARE (2024)</strong> and <strong className="text-white font-semibold">#2 by India Today (2020–2024)</strong>.
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
              <div className="pt-4 border-t border-white/15 mt-5">
                <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-400/25 backdrop-blur-sm">
                  <span className="text-xs sm:text-[12.5px] text-slate-200 font-sans font-normal leading-snug block">
                    <strong className="text-amber-300 uppercase tracking-wider font-mono text-[10.5px] block sm:inline sm:mr-2">Conferences:</strong>
                    25 Years of Internationalisation (DYUTI 2024) &bull; 24th ICSD Biennial (DYUTI 2025) &bull; 10th International Summer University &bull; DYUTI 2027 (26th National Conference)
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Media Column */}
            <div className="lg:col-span-5 h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] overflow-hidden order-1 lg:order-2 bg-slate-900/60 flex items-center justify-center p-6 lg:p-8 border-b lg:border-b-0 lg:border-l border-slate-800/20">
              <img
                src="https://dyuti.in/assets/images/rcss/department_of_social_work.png"
                alt="Department of Social Work at Rajagiri"
                className="w-full h-auto max-h-[380px] object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>
        </div>

        {/* ── 25 YEARS OF INTERNATIONALISATION (Contrast Deep Navy Card in Asymmetric Curved Leaf Shape) ── */}
        <div className="mb-12 sm:mb-16 rounded-[24px] sm:rounded-[32px] rounded-tl-[48px] sm:rounded-tl-[64px] rounded-br-[48px] sm:rounded-br-[64px] p-6 sm:p-8 lg:p-10 border border-white/20 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-heading text-2xl sm:text-[1.85rem] font-bold text-white m-0">
                25 Years of Internationalisation @ Rajagiri
              </h3>
              <p className="text-xs text-slate-350 font-sans font-semibold uppercase tracking-wider m-0 mt-1">
                A Proud Milestone Towards Global Academic Excellence
              </p>
            </div>
            <img
              src="https://dyuti.in/assets/images/25.png"
              alt="25 Years of Internationalisation Milestone"
              className="h-12 sm:h-14 w-auto object-contain shrink-0 brightness-200 contrast-125"
            />
          </div>

          <div className="space-y-3 text-slate-200 text-[14px] sm:text-[15px] leading-relaxed mb-6 font-sans font-normal">
            <p className="m-0">
              <strong className="text-white font-bold">&lsquo;Internationalisation&rsquo;</strong> has been a cornerstone of Rajagiri&apos;s academic ethos since inception. Celebrating <strong className="text-amber-300 font-bold">25 years of formal international collaborations</strong>, Rajagiri maintains active agreements with over <strong className="text-white font-bold">60 premier universities across 30 countries</strong>. These global alliances facilitate faculty exchanges, joint research, curriculum co-creation, and international consultancy.
            </p>
            <p className="m-0">
              Undergraduate and postgraduate students participate in semester-abroad and short-term study schemes ranging from <strong className="text-white font-bold">1 to 6 months</strong>. Rajagiri also welcomes international scholars under the Government of India&apos;s <strong className="text-white font-bold">Study in India (SII)</strong> initiative, alongside offering dual-degree and twinning pathways with distinguished global partner institutions.
            </p>
          </div>

          {/* Key Global Metric Highlights (Concise, Non-Repetitive) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm text-center">
              <span className="text-xl sm:text-2xl font-mono font-black text-amber-300 block">25+</span>
              <span className="text-[11px] font-sans uppercase tracking-wider text-slate-200 block mt-0.5">Years Collaborations</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm text-center">
              <span className="text-xl sm:text-2xl font-mono font-black text-amber-300 block">60+</span>
              <span className="text-[11px] font-sans uppercase tracking-wider text-slate-200 block mt-0.5">Partner Universities</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm text-center">
              <span className="text-xl sm:text-2xl font-mono font-black text-amber-300 block">30+</span>
              <span className="text-[11px] font-sans uppercase tracking-wider text-slate-200 block mt-0.5">Countries</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm text-center">
              <span className="text-xl sm:text-2xl font-mono font-black text-amber-300 block">SII</span>
              <span className="text-[11px] font-sans uppercase tracking-wider text-slate-200 block mt-0.5">Study in India Partner</span>
            </div>
          </div>
        </div>

        {/* ── OFFICIAL RCSS PORTAL BANNER WITH BLURRED RAJAGIRI CAMPUS BACKGROUND ── */}
        <div className="relative text-center text-white border border-slate-200 rounded-[24px] sm:rounded-[28px] p-8 sm:p-12 shadow-lg overflow-hidden bg-[#071A33]">
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
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Explore RCSS Official Portal
            </h3>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto mb-6 font-sans font-normal leading-relaxed">
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
              className="shadow-lg hover:shadow-xl bg-white hover:bg-slate-100 text-[#071A33] border border-transparent font-bold h-11 inline-flex items-center justify-center transition-all hover:scale-105"
            >
              Visit rcss.rajagiri.edu
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};


