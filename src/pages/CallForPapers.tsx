import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';
import { Button } from '@/components/ui/Button';

export const CallForPapers: React.FC = () => {
  const [activeThemeIndex, setActiveThemeIndex] = useState<number | null>(null);

  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center pt-4 sm:pt-6 pb-10 sm:pb-14 mb-4">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="w-6 h-0.5 bg-[#071A33]" />
            <span className="text-[12px] font-sans font-bold uppercase tracking-[0.22em] text-slate-600">
              Academic Submissions
            </span>
            <span className="w-6 h-0.5 bg-[#071A33]" />
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-[#071A33] leading-tight tracking-tight mb-4 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Call for Papers &amp;
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              Submission Guidelines
            </span>
          </h1>

          {/* Divider */}
          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Submit original research, case studies, and innovations across our 8 conference themes. All submissions undergo rigorous double-blind peer review.
          </p>
        </div>

        {/* ── CONFERENCE THEMES SECTION ── */}
        <div className="mb-20 lg:mb-28">
          <div className="mb-12">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-[#071A33] text-white text-xs font-mono font-black uppercase tracking-widest mb-4 shadow-sm">
              Track Your Interest
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A33] m-0">
              Conference Themes & Research Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {CONFERENCE_DATA.themes.map((theme, idx) => (
              <button
                key={idx}
                onClick={() => setActiveThemeIndex(activeThemeIndex === idx ? null : idx)}
                className={`p-6 sm:p-7 rounded-[20px] text-left transition-all duration-300 border-2 ${
                  activeThemeIndex === idx
                    ? 'bg-[#071A33] border-[#071A33] text-white shadow-lg'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-[#071A33]/40'
                }`}
              >
                <div className="font-mono text-[11px] font-black uppercase tracking-widest mb-2 opacity-60">
                  Track {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-heading font-bold text-sm leading-snug m-0">
                  {theme}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* ── SUBMISSION GUIDELINES ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] p-8 sm:p-12 lg:p-14 text-white shadow-2xl mb-20 lg:mb-28">
          <div className="mb-10">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-black uppercase tracking-widest mb-4 shadow-sm">
              How to Submit
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white m-0">
              Submission Requirements & Format Guidelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Oral Presentations */}
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-mono font-bold uppercase tracking-widest">
                Category 01
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white m-0">
                Oral Presentations
              </h3>
              <ul className="space-y-3 text-sm text-slate-100 font-sans font-medium">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
                  <span><strong>Duration:</strong> 15 minutes presentation + 10 min Q&A</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
                  <span><strong>Abstract:</strong> Max 300 words with keywords</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
                  <span><strong>Full Paper:</strong> Required before presentation</span>
                </li>
              </ul>
            </div>

            {/* Poster Presentations */}
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-mono font-bold uppercase tracking-widest">
                Category 02
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white m-0">
                Poster Presentations
              </h3>
              <ul className="space-y-3 text-sm text-slate-100 font-sans font-medium">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
                  <span><strong>Format:</strong> A1 size (841×594 mm) portrait orientation</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
                  <span><strong>Abstract:</strong> Max 250 words with visuals</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
                  <span><strong>Duration:</strong> 90-minute standing session</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── CMT SUBMISSION PORTAL ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] text-white shadow-2xl border border-white/10 mb-20 lg:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-black uppercase tracking-widest mb-4 shadow-sm">
                  Microsoft CMT Integration
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white m-0 mb-4">
                  Submit via CMT Portal
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed m-0">
                All abstracts and papers must be submitted through the Microsoft Conference Management Toolkit (CMT). The portal is open for submissions from <strong className="text-white">March 15 to May 31, 2027</strong>.
              </p>
              <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed m-0">
                Submissions will undergo <strong className="text-white">double-blind peer review</strong> by international experts across all research themes.
              </p>
            </div>

            <div className="lg:col-span-5">
              <Button
                variant="white"
                size="lg"
                asLink
                href="https://cmt.research.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
                showArrow
                className="w-full text-center justify-center h-14 bg-white hover:bg-slate-100 text-[#071A33] border border-transparent shadow-lg font-bold"
              >
                Access CMT Portal
              </Button>
              <p className="text-xs sm:text-sm text-slate-300 mt-4 font-sans text-center">
                New to CMT? Create a free account at the portal
              </p>
            </div>
          </div>
        </div>

        {/* ── SCOPUS PUBLICATION OPPORTUNITY ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-[#F5F3EF] border border-[#E8E3DB] p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-8 items-start lg:items-center">
            <div className="flex-1">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-[#071A33] text-white text-xs font-mono font-black uppercase tracking-widest mb-4 shadow-sm">
                Publication Opportunity
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#071A33] m-0 mb-3">
                Selected Papers in Scopus-Indexed Journals
              </h2>
              <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed m-0 mb-4">
                High-quality papers accepted for oral presentation will be considered for publication in Scopus-indexed international journals with impact factors.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 font-sans">
                <li className="flex gap-2">
                  <span className="text-[#071A33] font-bold">✓</span>
                  <span>Fast-track publication process</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#071A33] font-bold">✓</span>
                  <span>International peer-reviewed outlets</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#071A33] font-bold">✓</span>
                  <span>Career advancement & academic recognition</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
