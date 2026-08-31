import React from 'react';

const REGISTRATION_URL = 'https://forms.gle/XTZZmXS1tjkvfm9u6';

/**
 * Official Registration Announcement Marquee Bar
 * Positioned under the navigation bar.
 * Exact content & link from dyuti.in:
 * "REGISTER NOW - CLICK HERE FOR ONLINE REGISTRATION Registration begins from 10th August 2026, at Rajagiri College Of Social Sciences(Autonomous) Kalamassery."
 */
export const MarqueeAnnouncement: React.FC = () => {
  return (
    <aside
      className="bg-[#071A33] text-white border-y border-slate-250 overflow-hidden py-2.5 sm:py-3 relative z-30 select-none shadow-sm"
      aria-label="Conference Announcement Ticker"
    >
      <div className="flex items-center">
        {/* Left Badge Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-4 sm:pl-8 pr-4 py-0.5 bg-[#071A33] z-10 shrink-0 border-r border-slate-250">
          <span className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-[#93C5FD]">
            Announcement
          </span>
        </div>

        {/* Marquee Track with CSS Animation */}
        <div className="relative flex overflow-x-hidden flex-1 group">
          <div className="animate-marquee whitespace-nowrap flex items-center py-0.5">
            {/* Duplicated for seamless infinite loop */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center mx-6 sm:mx-8">
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs sm:text-sm font-bold text-[#F59E0B] hover:text-[#FCD34D] uppercase tracking-wider underline mr-3 transition-colors shrink-0"
                >
                  REGISTER NOW - CLICK HERE FOR ONLINE REGISTRATION
                </a>
                <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-white/95">
                  Registration begins from 10th August 2026, at Rajagiri College Of Social Sciences(Autonomous) Kalamassery.
                </span>
                <span className="mx-6 sm:mx-8 text-white/30 font-bold">&bull;</span>
              </div>
            ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center py-0.5"
            aria-hidden="true"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center mx-6 sm:mx-8">
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs sm:text-sm font-bold text-[#F59E0B] hover:text-[#FCD34D] uppercase tracking-wider underline mr-3 transition-colors shrink-0"
                >
                  REGISTER NOW - CLICK HERE FOR ONLINE REGISTRATION
                </a>
                <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-white/95">
                  Registration begins from 10th August 2026, at Rajagiri College Of Social Sciences(Autonomous) Kalamassery.
                </span>
                <span className="mx-6 sm:mx-8 text-white/30 font-bold">&bull;</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
