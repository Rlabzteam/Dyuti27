import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONFERENCE_DATA, SubTheme } from '@/data/conference';

export const EditorialTracks: React.FC = () => {
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);

  const toggleTrack = (id: string) => {
    setExpandedTrack((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="tracks"
      className="bg-[#071A33] text-white border-b border-slate-250 relative overflow-hidden py-24 sm:py-32 lg:py-36"
      aria-labelledby="tracks-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── TOP SECTION ANNOTATION BAR ── */}
        <div className="flex items-center justify-between pb-5 mb-14 sm:mb-20 border-b border-slate-250">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#60A5FA] tabular-nums">02</span>
            <span className="w-6 h-px bg-white/20" />
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-white font-semibold">
              Conference Themes
            </span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[#CBD5E1]">
            8 Thematic Tracks · Double-Blind Peer Reviewed
          </span>
        </div>

        {/* ── SECTION EDITORIAL HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 lg:mb-18 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#60A5FA]" />
              <span className="text-[11.5px] font-sans uppercase tracking-[0.18em] font-bold text-[#60A5FA]">
                Thematic Architecture
              </span>
            </div>
            <h2
              id="tracks-heading"
              className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-heading font-extrabold text-white leading-[1.08] tracking-tight m-0"
            >
              Eight perspectives on sustainable transformation.
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] font-sans font-normal mt-4 max-w-[620px] leading-relaxed">
              Spanning grassroots social interventions, digital inclusion, climate resilience, and indigenous knowledge systems aligned with the UN 2030 Sustainable Development Goals.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/call_for_papers"
              className="group inline-flex items-center gap-2 text-[12px] font-sans uppercase tracking-[0.14em] font-bold text-[#60A5FA] hover:text-white transition-colors"
            >
              <span>View Full Call for Papers</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── TRACK LIST — LARGE EDITORIAL HORIZONTAL ROWS ── */}
        <div className="border-t border-slate-250 divide-y divide-white/15">
          {CONFERENCE_DATA.subThemes.map((theme: SubTheme) => {
            const isExpanded = expandedTrack === theme.id;
            return (
              <div
                key={theme.id}
                className="transition-colors duration-300"
              >
                {/* Horizontal Row Button */}
                <div
                  onClick={() => toggleTrack(theme.id)}
                  className={`group py-7 sm:py-9 px-3 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none transition-all duration-300 ${
                    isExpanded
                      ? 'bg-white/[0.08] text-white'
                      : 'hover:bg-white/[0.04] text-white/95 hover:text-white'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleTrack(theme.id);
                    }
                  }}
                >
                  {/* Left: Number + Title */}
                  <div className="flex items-baseline sm:items-center gap-6 sm:gap-10">
                    <span
                      className={`font-mono text-base sm:text-lg font-bold tracking-wider transition-colors w-8 sm:w-10 shrink-0 ${
                        isExpanded
                          ? 'text-[#60A5FA]'
                          : 'text-[#60A5FA]/70 group-hover:text-[#60A5FA]'
                      }`}
                    >
                      {theme.number}
                    </span>
                    <div>
                      <h3 className="font-heading text-[1.45rem] sm:text-[1.8rem] lg:text-[2rem] font-bold leading-[1.2] m-0 text-white group-hover:text-white transition-colors">
                        {theme.title}
                      </h3>
                      <p className="text-[12.5px] sm:text-[13px] font-sans font-normal mt-2 m-0 text-[#CBD5E1]">
                        {theme.topics.length} focus areas &middot; Extended Abstract submission via CMT
                      </p>
                    </div>
                  </div>

                  {/* Right: Interaction Indicator & Arrow */}
                  <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                    <span className="text-[12px] font-sans uppercase tracking-[0.14em] font-semibold hidden sm:block text-[#CBD5E1] group-hover:text-white transition-colors">
                      {isExpanded ? 'Hide Topics' : 'Explore Topics'}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-[12px] border flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? 'border-[#60A5FA] bg-[#60A5FA] text-[#071A33]'
                          : 'border-slate-250 text-white/80 group-hover:border-white group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded
                            ? 'rotate-90'
                            : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* ── EXPANDED EDITORIAL PANEL (Integrated Navy) ── */}
                {isExpanded && (
                  <div className="px-4 sm:px-8 py-8 sm:py-10 bg-[#040F1E]/80 border-t border-slate-250 animate-fadeIn">
                    <div className="max-w-5xl">
                      {/* Eyebrow in panel */}
                      <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#60A5FA] font-bold">
                          Sub-Theme {theme.number} Focus Areas
                        </span>
                      </div>

                      {/* Topic List — 2-Column Editorial Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
                        {theme.topics.map((topic, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-[13.5px] sm:text-sm text-white/90 font-sans font-normal leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] mt-2 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>

                      {/* Panel Footer & Submission CTA */}
                      <div className="pt-6 border-t border-slate-250 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-[13px] text-[#CBD5E1] font-sans m-0">
                          Authors of accepted abstracts will be invited to submit full papers for Scopus-indexed volume publication.
                        </p>
                        <a
                          href={CONFERENCE_DATA.links.cmtSubmission}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.14em] font-bold bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-[12px] px-6 py-3 transition-all duration-200 shrink-0 shadow-sm"
                        >
                          <span>Submit Extended Abstract</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
