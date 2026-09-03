import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';

const REGISTRATION_URL = 'https://forms.gle/XTZZmXS1tjkvfm9u6';

export const HeroBanner: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-1 sm:px-2 pt-3 sm:pt-5 mb-14 lg:mb-20">
      <section
        className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-center overflow-hidden rounded-[28px] sm:rounded-[36px] bg-slate-950 text-white border border-slate-700/50 shadow-2xl"
        aria-label="DYUTI 2027 National Conference Hero"
      >
        {/* ── ARTISTIC KOCHI PANORAMA BACKGROUND FROM ATTRACTIONS ── */}
        <div className="absolute inset-0 z-0">
          {!isLoaded && <div className="absolute inset-0 bg-slate-950" />}
          <img
            src="/images/dyuti27_kochi_watercolor_art.jpg"
            alt="Artistic Panorama of Kochi — Chinese Fishing Nets, Heritage Architecture, Water Metro, and Rajagiri Campus"
            className={`w-full h-full object-cover object-center brightness-[0.75] transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
          />
          {/* Neutral Dark Overlay for high contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
        </div>

        {/* ── CENTRED HERO CONTENT ── */}
        <div className="relative z-10 flex flex-col items-center text-center py-14 sm:py-20 lg:py-24 px-4 sm:px-8 max-w-5xl mx-auto space-y-6 sm:space-y-8">

          {/* Clean Title Block in Crisp White */}
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <span className="text-sm sm:text-base md:text-lg font-sans uppercase tracking-[0.28em] text-white font-black drop-shadow-md">
              National Conference on Social Work
            </span>
            <h1 className="font-heading font-black text-[3.5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem] text-white leading-none tracking-tight m-0 drop-shadow-2xl">
              DYUTI 2027
            </h1>
          </div>

          {/* Subtitle */}
          <p className="font-sans text-[15px] sm:text-[17.5px] lg:text-[19px] text-slate-100 max-w-3xl leading-relaxed font-medium m-0">
            Empowering Communities through Innovation, Inclusion, and Partnership. Curated by the{' '}
            <strong className="text-white font-extrabold">Department of Social Work</strong>, Rajagiri
            College of Social Sciences (Autonomous).
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-circle-fill h-[52px] px-9 inline-flex items-center gap-2 text-[13px] font-sans font-black uppercase tracking-[0.14em] text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-full shadow-[0_0_30px_rgba(247,201,72,0.4)] focus-visible:outline-none transition-all hover:scale-105"
            >
              REGISTER NOW
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={CONFERENCE_DATA.links.cmtSubmission}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-circle-fill h-[52px] px-9 inline-flex items-center gap-2 text-[13px] font-sans font-black uppercase tracking-[0.14em] text-slate-950 bg-white hover:bg-slate-100 border border-white rounded-full shadow-md focus-visible:outline-none transition-all hover:scale-105"
            >
              CALL FOR PAPERS
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

      </section>
    </div>
  );
};

