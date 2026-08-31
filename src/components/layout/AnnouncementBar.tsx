import React from 'react';
import { CONFERENCE_DATA } from '@/data/conference';
import { ArrowUpRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside
      className="bg-[#071A33] text-white border-b border-white/8 relative z-50"
      aria-label="Conference Announcement"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-10 sm:h-9 flex items-center justify-between gap-6 font-sans">
        {/* Left: Label + message */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Label */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#93C5FD] font-bold font-sans shrink-0">
              Announcement
            </span>
            <span className="w-4 h-px bg-white/20" />
          </div>

          {/* Message — wraps on mobile, single line on desktop */}
          <p className="text-[11px] sm:text-[11.5px] text-white/85 font-sans font-normal m-0 leading-snug line-clamp-2 sm:line-clamp-1">
            {/* Shorter mobile version, full on desktop */}
            <span className="sm:hidden">Registration opens 10 August 2026 · Rajagiri, Kochi</span>
            <span className="hidden sm:inline">{CONFERENCE_DATA.announcement}</span>
          </p>
        </div>

        {/* Right: Deadline + Brochure — always visible */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:inline text-[11px] text-white/60 font-sans whitespace-nowrap">
            Abstract deadline: <strong className="text-white/90 font-semibold">25 Sep 2026</strong>
          </span>
          <span className="hidden md:block w-px h-3.5 bg-white/20" />
          <a
            href={CONFERENCE_DATA.links.brochurePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-[#93C5FD] hover:text-white transition-colors whitespace-nowrap underline-offset-2 hover:underline"
          >
            <span>Brochure</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </aside>
  );
};
