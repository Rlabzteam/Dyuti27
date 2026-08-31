import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONFERENCE_DATA } from '@/data/conference';

export const EditorialIntro: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'UN 2030 Agenda',
      body: 'Advancing the 17 Sustainable Development Goals through community-centric practice and policy advocacy.',
    },
    {
      num: '02',
      title: 'Empirical Research',
      body: 'Double-blind peer-reviewed proceedings indexed in Scopus / Springer volumes.',
    },
    {
      num: '03',
      title: 'Global Alliances',
      body: 'Collaborative dialogues uniting 60+ partner universities across 30+ countries worldwide.',
    },
  ];

  return (
    <section
      id="introduction"
      className="bg-[#E8F0F7] text-[#0B1220] border-b border-[#D9DEE5] relative py-20 sm:py-28 lg:py-32"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── TOP SECTION LABEL ── */}
        <div className="flex items-center justify-between pb-5 mb-12 sm:mb-16 border-b border-[#D9DEE5]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#2563EB]">02</span>
            <span className="w-6 h-px bg-[#D9DEE5]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#071A33] font-bold">
              About DYUTI
            </span>
          </div>
          <span className="hidden sm:block text-[11px] font-sans uppercase tracking-[0.14em] text-[#667085] font-semibold">
            Continuous Legacy Since 1998
          </span>
        </div>

        {/* ── MAIN ASYMMETRIC BODY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* LEFT SIDEBAR — 4 cols on desktop */}
          <div className="lg:col-span-4 lg:border-r border-[#D9DEE5] lg:pr-10 pb-8 lg:pb-0 border-b lg:border-b-0">

            {/* Large watermark number */}
            <span className="block font-heading text-[5rem] sm:text-[6rem] text-[#071A33]/12 leading-none select-none font-extrabold mb-2">
              01
            </span>

            {/* Acronym meaning */}
            <div className="mb-4">
              <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#2563EB] font-bold m-0 mb-1">
                DYUTI — The Genesis
              </p>
              <p className="text-[13px] font-sans text-[#667085] font-medium leading-relaxed m-0">
                Sanskrit: <span className="text-[#0B1220] font-semibold">&ldquo;Spark of Life&rdquo;</span>
              </p>
            </div>

            {/* Acronym expanded */}
            <h3 className="font-heading text-[1.35rem] sm:text-[1.5rem] font-bold text-[#071A33] leading-[1.25] mb-4">
              Developmental Yearnings<br />
              for a United and<br />
              Transformed India
            </h3>

            {/* Official DYUTI 27 Theme Emblem Graphic */}
            <div className="bg-white p-3.5 sm:p-4 rounded-[16px] border border-[#D9DEE5] shadow-subtle mb-6">
              <img
                src="/images/dyuti27_theme_banner.png"
                alt="DYUTI 27 — Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            <p className="text-[13.5px] text-[#667085] leading-[1.75] font-sans font-normal mb-8">
              Christened <strong className="text-[#0B1220] font-bold">DYUTI</strong>, the conference
              represents Rajagiri's enduring commitment to bridging academic
              scholarship with grassroots transformation.
            </p>

            {/* Explore link */}
            <Link
              to="/rajagiri"
              className="group inline-flex items-center gap-2 text-[12px] font-sans uppercase tracking-[0.14em] font-bold text-[#071A33] hover:text-[#2563EB] transition-colors"
            >
              <span>Read Institutional Heritage</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* RIGHT CONTENT — 8 cols on desktop */}
          <div className="lg:col-span-8 lg:pl-4">

            {/* Large modern heading */}
            <h2
              id="intro-heading"
              className="font-heading font-extrabold text-[#071A33] text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.08] tracking-tight mb-6"
            >
              A platform where ideas,<br className="hidden md:block" />
              research, and innovation meet.
            </h2>

            {/* Conference overview */}
            <p className="text-[15px] sm:text-[16px] text-[#0B1220]/80 font-sans font-normal leading-[1.75] mb-10 max-w-[640px]">
              {CONFERENCE_DATA.overview.slice(0, 340)}&hellip;
            </p>

            {/* ── 3 PILLARS — structured white cards against soft blue field ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
              {pillars.map((p) => (
                <div
                  key={p.num}
                  className="bg-white border border-[#D9DEE5] rounded-[20px] p-6 sm:p-7 shadow-subtle hover:shadow-editorial hover:border-[#2563EB]/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-mono font-bold text-[#2563EB] uppercase tracking-[0.18em] mb-2.5">
                      {p.num}
                    </div>
                    <h4 className="font-heading text-[1.25rem] sm:text-[1.35rem] font-bold text-[#071A33] mb-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-[13px] text-[#667085] leading-[1.65] m-0 font-sans font-normal">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
