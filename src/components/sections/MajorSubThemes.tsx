import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';

export const MajorSubThemes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTrack, setExpandedTrack] = useState<number | null>(0);

  const filteredThemes = CONFERENCE_DATA.subThemes.filter((theme) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const matchesTitle = theme.title.toLowerCase().includes(term);
    const matchesTopic = theme.topics.some((t) => t.toLowerCase().includes(term));
    return matchesTitle || matchesTopic;
  });

  const toggleTrack = (index: number) => {
    setExpandedTrack(expandedTrack === index ? null : index);
  };

  return (
    <section
      id="themes"
      className="py-20 sm:py-28 bg-[#FDFBF7] text-slate-900 border-b border-slate-300 relative overflow-hidden"
      aria-label="Conference Major Sub-Themes"
    >
      {/* Background Graphic Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#071A33]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 relative z-10">

        {/* ── HEADER & SEARCH ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#071A33] text-white text-xs font-mono font-black uppercase tracking-[0.2em] mb-4 shadow-md">
              <Layers className="w-3.5 h-3.5 mr-2 text-[#38BDF8]" />
              <span>Eight Conference Sub-Themes</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#071A33] tracking-tight">
              THEMATIC AREAS
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans font-medium mt-1">
              Select a theme below to inspect focus areas and research topics.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tracks or topics..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-slate-300 text-sm text-slate-900 font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#071A33] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* ── INTERACTIVE ACCORDION TRACKS ── */}
        <div className="space-y-4">
          {filteredThemes.map((theme, index) => {
            const originalIndex = CONFERENCE_DATA.subThemes.findIndex((t) => t.title === theme.title);
            const trackIndex = originalIndex >= 0 ? originalIndex : index;
            const trackNum = String(trackIndex + 1).padStart(2, '0');
            const isOpen = expandedTrack === trackIndex || searchTerm.trim() !== '';

            return (
              <div
                key={theme.id || index}
                className="rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/20 shadow-xl transition-all duration-300 bg-[#071A33] text-white"
              >
                {/* Accordion Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleTrack(trackIndex)}
                  className={`w-full p-6 sm:p-8 flex items-center justify-between text-left transition-colors duration-300 ${
                    isOpen
                      ? 'bg-gradient-to-r from-[#071A33] via-[#0e2a52] to-[#040e1c] border-b border-white/15'
                      : 'bg-[#071A33] hover:bg-[#0c264a]'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 pr-4">
                    {/* Track Number Badge */}
                    <span className="font-mono text-base sm:text-lg font-black px-4 py-2 rounded-2xl bg-white/15 border border-white/25 text-[#38BDF8] shrink-0 shadow-sm">
                      {trackNum}
                    </span>

                    <div>
                      <h3 className="font-heading font-black text-lg sm:text-2xl text-white tracking-tight leading-snug">
                        {theme.title}
                      </h3>
                      <span className="text-xs font-sans font-bold text-slate-300 mt-1 block">
                        {theme.topics.length} Focus Topics Included
                      </span>
                    </div>
                  </div>

                  {/* Toggle Arrow */}
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#38BDF8] shrink-0 transition-transform duration-300">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Accordion Body Content */}
                {isOpen && (
                  <div className="p-6 sm:p-8 bg-gradient-to-br from-[#040e1c] via-[#071A33] to-[#0b2952] animate-fadeIn">
                    <h4 className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#38BDF8] mb-5">
                      Focus Areas &amp; Research Sub-Topics
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                      {theme.topics.map((topic, topicIdx) => (
                        <div
                          key={topicIdx}
                          className="flex items-start gap-3.5 p-4 rounded-xl bg-white/10 border border-white/15 text-slate-100 text-sm font-sans font-medium leading-relaxed hover:bg-white/15 transition-colors"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] mt-1.5 shrink-0 shadow-xs" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredThemes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-300 shadow-sm">
            <p className="text-sm text-slate-700 font-medium">No tracks or topics match &ldquo;{searchTerm}&rdquo;</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-xs font-black text-[#071A33] hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};


