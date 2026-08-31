import React from 'react';
import { CONFERENCE_DATA } from '@/data/conference';

export const ConferenceTheme: React.FC = () => {
  return (
    <section
      className="py-24 sm:py-36 bg-[#073B35] text-white relative overflow-hidden border-b border-slate-250"
      aria-label="Official Conference Theme"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
        {/* Editorial Index Header */}
        <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C89B3C] font-semibold mb-6">
          <span>03 / 10</span>
          <span className="w-8 h-px bg-[#C89B3C]/40" />
          <span>Conference Theme</span>
        </div>

        {/* Thin Gold Horizontal Divider */}
        <div className="w-24 h-px bg-[#C89B3C] mx-auto mb-10" />

        {/* Large Exact Official Theme Statement */}
        <blockquote className="m-0">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic font-normal text-white leading-[1.2] tracking-tight mb-10">
            "{CONFERENCE_DATA.theme}"
          </p>
        </blockquote>

        {/* Thin Divider */}
        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />

        {/* Restrained Official Supporting Context */}
        <p className="text-sm sm:text-base text-white/80 font-sans font-light max-w-2xl mx-auto leading-relaxed m-0">
          Advancing the UN 2030 Agenda for Sustainable Development through participatory social work, grassroot innovation, and multi-stakeholder partnerships.
        </p>
      </div>
    </section>
  );
};
