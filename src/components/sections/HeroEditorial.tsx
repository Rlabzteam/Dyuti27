import React from 'react';
import { Award, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const HeroEditorial: React.FC = () => {
  return (
    <section
      className="relative bg-[#F5F5F0] text-[#0B1220] border-b border-[#D9DEE5] overflow-hidden"
      aria-label="Conference Masthead"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── TOP EDITORIAL ANNOTATION BAR ── */}
        <div className="flex items-center justify-between py-4 sm:py-5 border-b border-[#D9DEE5]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#2563EB] tabular-nums">01</span>
            <span className="w-6 h-px bg-[#D9DEE5]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#071A33] font-bold">
              National Conference &middot; 2027
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] font-sans text-[#667085] uppercase tracking-[0.14em] font-semibold">
            <span>26th Annual Edition</span>
            <span className="w-px h-3 bg-[#D9DEE5]" />
            <span>Continuous Since 1998</span>
          </div>
        </div>

        {/* ── MAIN HERO COMPOSITION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-10 sm:pt-16 pb-14 sm:pb-20">

          {/* ── LEFT: Modern Bold Typography + CTAs (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-2.5">
              <span className="w-6 h-0.5 bg-[#2563EB]" />
              <span className="text-[11.5px] font-sans uppercase tracking-[0.18em] font-bold text-[#2563EB]">
                Social Work &middot; Sustainable Development &middot; Kochi
              </span>
            </div>

            {/* Powerful Modern Masthead */}
            <h1 className="font-heading font-extrabold text-[#071A33] text-[3.25rem] sm:text-[4.75rem] lg:text-[5.75rem] tracking-tight leading-[0.92] select-none mb-4">
              DYUTI
              <span className="text-[#2563EB] ml-3">2027</span>
            </h1>

            {/* Conference Theme Title */}
            <p className="font-heading text-[1.2rem] sm:text-[1.4rem] lg:text-[1.5rem] font-bold text-[#071A33] leading-snug mb-4 max-w-[580px]">
              Social Work for Sustainable Development:
              <span className="block font-medium text-[#12345B] text-[1.1rem] sm:text-[1.25rem] mt-1">
                Empowering Communities through Innovation, Inclusion, and Partnership
              </span>
            </p>

            {/* Body Description */}
            <p className="text-[14.5px] sm:text-[15px] text-[#667085] leading-relaxed font-sans font-normal max-w-[500px] mb-8">
              A premier national symposium advancing the UN 2030 Agenda through
              collaborative social work scholarship, double-blind peer-reviewed research,
              and academic alliances.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                asLink
                href={CONFERENCE_DATA.links.registrationForm}
                showArrow
              >
                Register Now
              </Button>

              <Button
                variant="secondary"
                size="lg"
                asLink
                href="#tracks"
              >
                Explore Tracks
              </Button>
            </div>
          </div>

          {/* ── RIGHT: Editorial Image & Overlapping Navy Panel (5 cols) ── */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            
            {/* Campus Image Frame */}
            <div className="relative rounded-[24px] overflow-hidden border border-[#D9DEE5] shadow-editorial bg-[#E8EDF2] group">
              <img
                src="https://dyuti.in/uploads/gallery/6L6A6365.JPG"
                alt="DYUTI 2027 — Scholarly Conference Proceedings, Rajagiri College, Kochi"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/70 via-transparent to-transparent" />
            </div>

            {/* Overlapping Deep Navy Information Panel */}
            <div className="relative -mt-14 sm:-mt-16 mx-4 sm:mx-6 bg-[#071A33] text-white rounded-[20px] p-5 sm:p-6 border border-slate-250 shadow-float z-10">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/12">
                <div className="flex items-center gap-2 text-[11px] font-sans font-bold text-[#93C5FD] uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span>NIRF #12 &middot; NAAC A++</span>
                </div>
                <span className="text-[10px] font-mono text-white/70 uppercase">
                  Autonomous
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block mb-0.5">
                    Abstract Deadline
                  </span>
                  <div className="font-heading font-bold text-white text-[15px] leading-tight flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                    <span>25 Sep 2026</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block mb-0.5">
                    Venue
                  </span>
                  <div className="font-heading font-bold text-white text-[15px] leading-tight flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                    <span>Rajagiri, Kochi</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── METADATA STRIP — Modern 3-Column Information Row ── */}
        <div className="border-t border-[#D9DEE5] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#D9DEE5]">

          <div className="flex items-center gap-4 py-5 sm:py-6 sm:pr-8">
            <span className="font-heading text-[2.25rem] font-extrabold text-[#071A33] leading-none tabular-nums">
              2027
            </span>
            <div>
              <p className="text-[10.5px] font-sans uppercase tracking-[0.16em] text-[#667085] font-bold m-0 mb-0.5">
                Edition
              </p>
              <p className="text-[13px] font-sans text-[#0B1220] font-semibold m-0">
                26th Annual Conference
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-5 sm:py-6 sm:px-8">
            <span className="font-heading text-[1.65rem] font-bold text-[#071A33] leading-none whitespace-nowrap">
              Rajagiri
            </span>
            <div>
              <p className="text-[10.5px] font-sans uppercase tracking-[0.16em] text-[#667085] font-bold m-0 mb-0.5">
                Host Institution
              </p>
              <p className="text-[13px] font-sans text-[#0B1220] font-semibold m-0">
                College of Social Sciences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-5 sm:py-6 sm:pl-8">
            <span className="font-heading text-[1.65rem] font-bold text-[#071A33] leading-none">
              Kochi
            </span>
            <div>
              <p className="text-[10.5px] font-sans uppercase tracking-[0.16em] text-[#667085] font-bold m-0 mb-0.5">
                Location
              </p>
              <p className="text-[13px] font-sans text-[#0B1220] font-semibold m-0">
                Kerala &middot; India
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
