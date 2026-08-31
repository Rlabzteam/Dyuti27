import React from 'react';
import { CONFERENCE_DATA } from '@/data/conference';

export const ThemeList: React.FC = () => {
  return (
    <section
      className="py-24 sm:py-32 bg-[#101716] text-[#F7F4EC] border-b border-slate-250 relative"
      aria-labelledby="thematic-areas-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-12 sm:mb-16 border-b border-slate-250 text-xs font-sans uppercase tracking-widest text-white/50">
          <div className="flex items-center gap-3">
            <span className="text-[#C89B3C] font-mono font-bold">04 / 10</span>
            <span className="w-6 h-px bg-white/20" />
            <span id="thematic-areas-title" className="text-white/80">Thematic Areas</span>
          </div>
          <span className="font-mono text-white/60">8 Scholarly Tracks</span>
        </div>

        {/* 2-Column Editorial Grid with Numbered Items & Thin Dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 sm:gap-y-16">
          {CONFERENCE_DATA.subThemes.map((theme) => (
            <article
              key={theme.id}
              tabIndex={0}
              className="group flex flex-col justify-between focus:outline-none focus:ring-1 focus:ring-[#C89B3C] p-2"
            >
              <div>
                {/* Large Editorial Number */}
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-3xl sm:text-4xl font-serif italic text-white/40 group-hover:text-[#C89B3C] transition-colors duration-300 font-normal">
                    {theme.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Track {theme.number}
                  </span>
                </div>

                {/* Thin Animated Divider */}
                <div className="w-full h-px bg-[#F5F3EF] group-hover:bg-[#C89B3C] transition-colors duration-300 mb-5" />

                {/* Theme Title */}
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-white group-hover:translate-x-1 group-hover:text-[#C89B3C] transition-all duration-300 leading-snug mb-4">
                  {theme.title}
                </h3>

                {/* Official Topics List */}
                <ul className="space-y-2 text-xs sm:text-sm text-white/70 font-sans font-light leading-relaxed mb-4">
                  {theme.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#C89B3C] font-mono text-xs select-none">&bull;</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
