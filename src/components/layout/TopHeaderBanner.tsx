import React from 'react';
import { Link } from 'react-router-dom';
import { CONFERENCE_DATA } from '@/data/conference';

/**
 * TopHeaderBanner Component
 * Displays the 3 top institutional & conference branding images directly above the navigation bar:
 * 1. RCSS (Rajagiri College of Social Sciences Autonomous) official logo
 * 2. DYUTI 27 thematic framework banner
 * 3. Iconic DYUTI "let me change..." artwork
 */
export const TopHeaderBanner: React.FC = () => {
  return (
    <div className="w-full bg-white relative z-40">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
        {/* 1. Left: RCSS Official Seal / Logo */}
        <a
          href={CONFERENCE_DATA.links.rajagiriPortal}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5"
          title="Rajagiri College of Social Sciences (Autonomous)"
          aria-label="Rajagiri College of Social Sciences (Autonomous)"
        >
          <img
            src="/images/rcss_green_logo.png"
            alt="Rajagiri College of Social Sciences (Autonomous)"
            className="h-10 sm:h-12 md:h-16 w-auto object-contain select-none"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </a>

        {/* 2. Center: DYUTI 27 Thematic Framework Banner */}
        <Link
          to="/"
          className="flex items-center justify-center shrink min-w-0 transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5"
          aria-label="DYUTI 27 Conference Theme — Social Work for Sustainable Development"
        >
          <img
            src="/images/dyuti27_theme_header.png"
            alt="DYUTI 27 — Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership"
            className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[160px] xs:max-w-[220px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[540px] object-contain select-none"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </Link>

        {/* 3. Right: DYUTI 'let me change...' Graphic */}
        <Link
          to="/"
          className="flex items-center justify-end shrink-0 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5"
          aria-label="DYUTI — let me change... Home"
        >
          <img
            src="/images/dyuti_let_me_change.jpg"
            alt="DYUTI — let me change..."
            className="h-10 sm:h-12 md:h-16 w-auto object-contain select-none"
            loading="eager"
            decoding="async"
          />
        </Link>
      </div>
    </div>
  );
};

