import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';

const REGISTRATION_URL = 'https://forms.gle/XTZZmXS1tjkvfm9u6';

export const HeroBanner: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#030C22] text-white"
      aria-label="DYUTI 2027 National Conference Hero"
    >
      {/* ── KOCHI NIGHTSCAPE BACKGROUND ── */}
      <div className="absolute inset-0">
        {!isLoaded && <div className="absolute inset-0 bg-[#030C22]" />}
        <img
          src="/images/dyuti_dark_hero_bg.jpg"
          alt="Kochi Nightscape"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          loading="eager"
          onLoad={() => setIsLoaded(true)}
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-[#030C22]/70" />
        {/* Vignette — stronger at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,12,34,0.85)_100%)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030C22] to-transparent" />
      </div>

      {/* ── CENTRED HERO CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 max-w-5xl mx-auto pt-12 sm:pt-16 lg:pt-20 pb-10 -mt-12 sm:-mt-20 lg:-mt-28">

        {/* Eyebrow pill */}
        <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#38BDF8] text-slate-950 text-xs sm:text-sm font-sans font-black uppercase tracking-[0.22em] mb-5 shadow-lg">
          <span>25 Years of Internationalism &bull; Kochi, Kerala</span>
        </div>

        {/* Clean Unboxed Title Block */}
        <div className="mb-5 flex flex-col items-center gap-2">
          <span className="text-sm sm:text-base md:text-lg font-sans uppercase tracking-[0.25em] text-[#38BDF8] font-black drop-shadow-md">
            National Conference on Social Work
          </span>
          <h1 className="font-heading font-black text-[4.5rem] sm:text-[6.5rem] md:text-[7.5rem] lg:text-[8.5rem] xl:text-[9.5rem] text-white leading-none tracking-tight m-0 drop-shadow-2xl">
            DYUTI 2027
          </h1>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-[15px] sm:text-[17.5px] lg:text-[19px] text-slate-100 max-w-3xl leading-relaxed mb-8 font-medium">
          Empowering Communities through Innovation, Inclusion, and Partnership. Curated by the{' '}
          <strong className="text-white font-extrabold">Department of Social Work</strong>, Rajagiri
          College of Social Sciences (Autonomous).
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-circle-fill h-[52px] px-9 inline-flex items-center gap-2 text-[13px] font-sans font-black uppercase tracking-[0.14em] text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-full shadow-[0_0_30px_rgba(247,201,72,0.4)] focus-visible:outline-none"
          >
            REGISTER NOW
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={CONFERENCE_DATA.links.cmtSubmission}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-circle-fill h-[52px] px-9 inline-flex items-center gap-2 text-[13px] font-sans font-black uppercase tracking-[0.14em] text-slate-950 bg-white hover:bg-slate-100 border border-white rounded-full shadow-md focus-visible:outline-none"
          >
            CALL FOR PAPERS
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

    </section>
  );
};

