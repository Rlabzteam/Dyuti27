import React from 'react';

const REGISTRATION_URL = 'https://forms.gle/XTZZmXS1tjkvfm9u6';

/**
 * Official Registration Announcement Marquee Bar
 * Positioned under the navigation bar within the max-w-[1440px] frame.
 * Non-sticky, so when scrolled below it naturally moves out of view.
 */
export const MarqueeAnnouncement: React.FC = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 mt-2.5 mb-1.5 select-none">
      <aside
        className="w-full bg-white text-slate-900 rounded-xl sm:rounded-full border border-slate-200/90 shadow-sm py-1.5 sm:py-2 flex items-center overflow-hidden"
        aria-label="Conference Announcement Ticker"
      >
        {/* Left Static Announcement Label */}
        <div className="flex items-center gap-1.5 pl-3.5 sm:pl-6 pr-3.5 py-0.5 bg-white z-10 shrink-0 border-r border-slate-200">
          <span className="font-sans text-[11px] sm:text-[12.5px] font-extrabold text-slate-900 whitespace-nowrap">
            Important Announcement:
          </span>
        </div>

        {/* Scrolling Marquee Ticker with edge gradient mask */}
        <div className="relative flex overflow-x-hidden flex-1 group [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)]">
          <div className="animate-marquee whitespace-nowrap flex items-center py-0.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center mx-4 sm:mx-6">
                <span className="font-sans text-xs sm:text-[13px] font-medium text-slate-800">
                  Registration begins from 10th August 2026, at Rajagiri College Of Social Sciences(Autonomous) Kalamassery.
                </span>
                <span className="mx-3 text-slate-400 font-bold">&bull;</span>
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs sm:text-[13px] font-bold text-amber-600 hover:text-amber-700 underline transition-colors shrink-0"
                >
                  REGISTER NOW - CLICK HERE FOR ONLINE REGISTRATION
                </a>
                <span className="mx-3 text-slate-400 font-bold">&bull;</span>
                <span className="font-sans text-xs sm:text-[13px] font-medium text-slate-800">
                  Abstract submission deadline: <strong className="text-slate-950 font-semibold">25 Sep 2026</strong>
                </span>
                <span className="mx-4 text-slate-400 font-bold">&bull;</span>
              </div>
            ))}
          </div>

          <div
            className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center py-0.5"
            aria-hidden="true"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center mx-4 sm:mx-6">
                <span className="font-sans text-xs sm:text-[13px] font-medium text-slate-800">
                  Registration begins from 10th August 2026, at Rajagiri College Of Social Sciences(Autonomous) Kalamassery.
                </span>
                <span className="mx-3 text-slate-400 font-bold">&bull;</span>
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs sm:text-[13px] font-bold text-amber-600 hover:text-amber-700 underline transition-colors shrink-0"
                >
                  REGISTER NOW - CLICK HERE FOR ONLINE REGISTRATION
                </a>
                <span className="mx-3 text-slate-400 font-bold">&bull;</span>
                <span className="font-sans text-xs sm:text-[13px] font-medium text-slate-800">
                  Abstract submission deadline: <strong className="text-slate-950 font-semibold">25 Sep 2026</strong>
                </span>
                <span className="mx-4 text-slate-400 font-bold">&bull;</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
