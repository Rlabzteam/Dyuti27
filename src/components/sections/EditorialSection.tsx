import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONFERENCE_DATA } from '@/data/conference';

export const EditorialSection: React.FC = () => {
  return (
    <section
      className="py-24 sm:py-32 bg-[#101716] text-[#F7F4EC] border-b border-slate-250 relative overflow-hidden"
      aria-labelledby="about-dyuti-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Editorial Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 sm:mb-16 border-b border-slate-250 text-xs font-sans uppercase tracking-widest text-white/50">
          <div className="flex items-center gap-3">
            <span className="text-[#C89B3C] font-mono font-bold">02 / 10</span>
            <span className="w-6 h-px bg-white/20" />
            <span className="text-white/80">About DYUTI</span>
          </div>
          <span className="font-mono text-white/60">Founded 1998</span>
        </div>

        {/* 2-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Vertical label + Large Heading + Philosophy */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C89B3C] font-semibold block mb-4">
                The Annual Series
              </span>
              
              <h2
                id="about-dyuti-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal italic text-white leading-tight mb-8"
              >
                Ideas that connect research, innovation and impact.
              </h2>

              <p className="text-base text-white/80 font-sans leading-relaxed mb-6 font-normal">
                <strong>{CONFERENCE_DATA.fullName}</strong> — christened <strong>DYUTI</strong>, meaning <em>‘Spark of Life’</em> — is an annual academic forum convened by Rajagiri College of Social Sciences since 1998.
              </p>

              <div className="p-5 border-l-2 border-[#C89B3C] bg-white/[0.02] mb-8">
                <p className="text-xs sm:text-sm font-serif italic text-white/90 leading-relaxed m-0">
                  "Guided by its vision of becoming a centre of excellence in learning for enriching and fulfilling LIFE, Rajagiri regularly provides an international forum for scholarly deliberations on vital issues of human development."
                </p>
              </div>
            </div>

            <div>
              <Link
                to="/call_for_papers"
                className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold text-[#C89B3C] hover:text-white transition-colors group"
              >
                <span>Explore DYUTI Scope &amp; Papers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Large Photography & Narrative Body */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative border border-slate-250 overflow-hidden bg-black/40">
              <img
                src="https://dyuti.in/uploads/gallery/fb1_ina.jpg"
                alt="Inauguration of Dyuti Conference"
                className="w-full h-[320px] sm:h-[400px] object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="p-3 bg-[#073B35] text-white text-[11px] font-sans flex items-center justify-between">
                <span>Dignitary Plenary &amp; Scholarly Deliberations</span>
                <span className="font-mono text-[#C89B3C]">26 Years of Discourse</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-white/70 font-sans leading-relaxed font-normal">
              <div>
                <h3 className="text-white font-sans text-xs uppercase tracking-widest font-semibold mb-2 text-[#C89B3C]">
                  UN 2030 Agenda
                </h3>
                <p className="m-0">
                  Aligned with the 2030 Agenda for Sustainable Development and its vision of "Leaving No One Behind," the conference highlights the vital role of social work in promoting social justice, inclusive development, and community empowerment.
                </p>
              </div>
              <div>
                <h3 className="text-white font-sans text-xs uppercase tracking-widest font-semibold mb-2 text-[#C89B3C]">
                  Collaborative Solutions
                </h3>
                <p className="m-0">
                  DYUTI 2027 provides a platform for sharing innovative practices, indigenous knowledge, empirical research, and multi-sectoral partnerships to strengthen resilient and sustainable communities across India and globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
