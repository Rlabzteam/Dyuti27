import React from 'react';
import { Award, BookOpen, Building2, Globe2, ShieldCheck } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const accreditations = [
    { label: 'UGC Autonomous', sub: 'Government of India', icon: <Building2 className="w-4 h-4 text-[#2563EB]" /> },
    { label: 'NAAC A++', sub: '3.83 / 4.0 CGPA', icon: <Award className="w-4 h-4 text-[#2563EB]" /> },
    { label: 'NIRF Ranking', sub: '#12 in India (2025)', icon: <ShieldCheck className="w-4 h-4 text-[#2563EB]" /> },
    { label: 'Scopus Indexed', sub: 'Peer-Reviewed Volumes', icon: <BookOpen className="w-4 h-4 text-[#2563EB]" /> },
    { label: '60+ Global Alliances', sub: 'Across 30+ Countries', icon: <Globe2 className="w-4 h-4 text-[#2563EB]" /> },
  ];

  const universityLogos = [
    { src: '/images/nyu_logo.png', alt: 'New York University (NYU)' },
    { src: '/images/melbourne_logo.png', alt: 'The University of Melbourne' },
    { src: 'https://dyuti.in/assets/images/york.jpg', alt: 'York University' },
    { src: 'https://dyuti.in/assets/images/lgo/1.png', alt: 'Partner University 1' },
    { src: 'https://dyuti.in/assets/images/lgo/2.png', alt: 'Partner University 2' },
    { src: 'https://dyuti.in/assets/images/lgo/3.png', alt: 'Partner University 3' },
    { src: 'https://dyuti.in/assets/images/lgo/4.png', alt: 'Partner University 4' },
    { src: 'https://dyuti.in/assets/images/lgo/5.png', alt: 'Partner University 5' },
    { src: 'https://dyuti.in/assets/images/lgo/6.png', alt: 'Partner University 6' },
    { src: 'https://dyuti.in/assets/images/lgo/7.png', alt: 'Partner University 7' },
    { src: 'https://dyuti.in/assets/images/lgo/8.png', alt: 'Partner University 8' },
    { src: 'https://dyuti.in/assets/images/lgo/9.png', alt: 'Partner University 9' },
    { src: 'https://dyuti.in/assets/images/lgo/10.png', alt: 'Partner University 10' },
    { src: 'https://dyuti.in/assets/images/lgo/11.png', alt: 'Partner University 11' },
    { src: 'https://dyuti.in/assets/images/lgo/12.png', alt: 'Partner University 12' },
    { src: 'https://dyuti.in/assets/images/lgo/13.png', alt: 'Partner University 13' },
  ];

  return (
    <section
      id="partners"
      className="bg-[#F5F5F0] text-[#0B1220] border-b border-[#D9DEE5] relative py-20 sm:py-28 lg:py-32"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── TOP SECTION ANNOTATION BAR ── */}
        <div className="flex items-center justify-between pb-5 mb-12 sm:mb-16 border-b border-[#D9DEE5]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#2563EB] tabular-nums">09</span>
            <span className="w-6 h-px bg-[#D9DEE5]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#071A33] font-bold">
              Partners &amp; Accreditations
            </span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[#667085] font-semibold">
            Global University Alliances &amp; Academic Honors
          </span>
        </div>

        {/* ── SECTION EDITORIAL HEADER ── */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-[#2563EB]" />
            <span className="text-[11.5px] font-sans uppercase tracking-[0.18em] font-bold text-[#2563EB]">
              Institutional Affiliations &amp; Global Reach
            </span>
          </div>
          <h2
            id="partners-heading"
            className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-heading font-extrabold text-[#071A33] leading-[1.08] tracking-tight m-0"
          >
            Connected beyond borders.
          </h2>
          <p className="text-sm sm:text-base text-[#667085] font-sans font-normal mt-4 leading-relaxed">
            Collaborating with premier international universities and accredited by statutory apex bodies to drive transformative academic scholarship and cross-border research exchanges.
          </p>
        </div>

        {/* ── ACCREDITATION TRUST MARKERS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-14">
          {accreditations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#D9DEE5] rounded-[16px] p-4 sm:p-5 shadow-subtle hover:shadow-editorial hover:border-[#2563EB]/40 transition-all duration-300 flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#E8F0F7] border border-[#D9DEE5] flex items-center justify-center shrink-0 group-hover:border-[#2563EB]/40 transition-colors">
                {item.icon}
              </div>
              <div>
                <strong className="block text-[13px] sm:text-[13.5px] font-sans font-bold text-[#071A33] leading-snug">
                  {item.label}
                </strong>
                <span className="block text-[11px] font-sans text-[#667085] mt-0.5 leading-tight">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── GLOBAL PARTNER UNIVERSITIES (Moving Rectangles, Full Color) ── */}
        <div className="pt-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#2563EB]" />
              <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-[#2563EB]">
                Global Alliances
              </span>
              <span className="w-5 h-0.5 bg-[#2563EB]" />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-heading font-extrabold text-[#071A33] tracking-tight m-0 leading-tight">
              International Academic Partner Network
            </h3>
            <p className="text-sm sm:text-base text-[#667085] font-sans font-normal mt-3 max-w-2xl mx-auto leading-relaxed">
              60+ Global Institutional Collaborations across 30+ Countries supporting student exchange and international research initiatives.
            </p>
          </div>

          {/* Smooth Continuous Marquee Carousel with Fade Edges */}
          <div className="relative overflow-hidden w-full py-4 -mx-4 sm:-mx-8 px-4 sm:px-8">
            {/* Left and right gradient fade masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F5F5F0] via-[#F5F5F0]/80 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F5F5F0] via-[#F5F5F0]/80 to-transparent z-10" />

            {/* Continuous Marquee Track */}
            <div className="animate-marquee flex items-center gap-5 sm:gap-6">
              {/* First Track Set */}
              {universityLogos.map((logo, idx) => (
                <div
                  key={`partner-a-${idx}`}
                  className="w-[200px] sm:w-[230px] h-[90px] sm:h-[100px] px-5 py-3.5 rounded-[14px] bg-white border border-[#D9DEE5] flex items-center justify-center shadow-subtle hover:border-[#2563EB]/50 hover:shadow-editorial transition-all duration-300 group shrink-0"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain filter-none opacity-100 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}

              {/* Duplicate Track Set for Seamless Infinite Motion */}
              {universityLogos.map((logo, idx) => (
                <div
                  key={`partner-b-${idx}`}
                  className="w-[200px] sm:w-[230px] h-[90px] sm:h-[100px] px-5 py-3.5 rounded-[14px] bg-white border border-[#D9DEE5] flex items-center justify-center shadow-subtle hover:border-[#2563EB]/50 hover:shadow-editorial transition-all duration-300 group shrink-0"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain filter-none opacity-100 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
