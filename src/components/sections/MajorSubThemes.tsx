import React, { useState } from 'react';
import { Search, Layers, Scale, TrendingUp, Users, Leaf, Heart, GraduationCap, Building2, Globe, ArrowRight } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';
import { Link } from 'react-router-dom';

const themeIcons: Record<string, React.FC<{ className?: string }>> = {
  '01': Scale,
  '02': TrendingUp,
  '03': Users,
  '04': Leaf,
  '05': Heart,
  '06': GraduationCap,
  '07': Building2,
  '08': Globe,
};

export const MajorSubThemes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThemes = CONFERENCE_DATA.subThemes.filter((theme) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const matchesTitle = theme.title.toLowerCase().includes(term);
    const matchesTopic = theme.topics.some((t) => t.toLowerCase().includes(term));
    return matchesTitle || matchesTopic;
  });

  return (
    <section
      id="themes"
      className="py-16 sm:py-24 bg-[#FDFBF7] text-slate-900 border-b border-slate-300 relative overflow-hidden"
      aria-label="Conference Major Sub-Themes"
    >
      {/* Background Graphic Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#071A33]/5 blur-[140px] pointer-events-none" />

      <div className="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-2 sm:px-4 space-y-10 sm:space-y-12 relative z-10">

        {/* ── HEADER & SEARCH ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#071A33] text-white text-xs font-mono font-black uppercase tracking-[0.2em] mb-4 shadow-md">
              <Layers className="w-3.5 h-3.5 mr-2 text-amber-300" />
              <span>Eight Conference Sub-Themes</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#071A33] tracking-tight">
              THEMATIC AREAS
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans font-medium mt-1 max-w-2xl">
              Deliberating across 8 pivotal sub-themes on <em>Sustainable Communities</em>. Authors and researchers are invited to submit abstracts aligned with these focus tracks.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sub-themes or topics..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-slate-300 text-sm text-slate-900 font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#071A33] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* ── 8 THEMES GRID IN SQUARED CARDS WITH SIGNATURE CURVED SIDES ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {filteredThemes.map((theme, index) => {
            const originalIndex = CONFERENCE_DATA.subThemes.findIndex((t) => t.title === theme.title);
            const trackNum = theme.number || String((originalIndex >= 0 ? originalIndex : index) + 1).padStart(2, '0');
            const IconComp = themeIcons[trackNum] || Layers;
            const isAlternate = (originalIndex >= 0 ? originalIndex : index) % 2 === 1;

            return (
              <div
                key={theme.id || index}
                className={`group relative w-full h-full p-6 sm:p-7 flex flex-col justify-between text-white border border-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 overflow-hidden bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] ${
                  isAlternate
                    ? 'rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[68px] rounded-bl-[56px] sm:rounded-bl-[68px]'
                    : 'rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[68px] rounded-br-[56px] sm:rounded-br-[68px]'
                }`}
              >
                {/* Subtle Ambient Light Glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/10 transition-colors" />

                <div>
                  {/* Top Row: Track Badge & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                    <span className="px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-amber-300 text-xs font-mono font-black uppercase tracking-wider shadow-xs">
                      Track {trackNum}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300 shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Theme Title */}
                  <h3 className="font-heading font-black text-lg sm:text-xl text-white leading-snug tracking-tight mb-4 relative z-10 min-h-[52px]">
                    {theme.title}
                  </h3>

                  {/* Focus Topics List */}
                  <div className="pt-3.5 border-t border-white/15 relative z-10">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.18em] text-amber-300 block mb-2.5">
                      Focus Research Topics
                    </span>
                    <ul className="space-y-2 m-0 p-0 list-none">
                      {theme.topics.map((topic, topicIdx) => (
                        <li
                          key={topicIdx}
                          className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-slate-200 font-sans font-medium leading-snug"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 mt-1.5 shrink-0 shadow-xs" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action / CTA */}
                <div className="pt-4 mt-6 border-t border-white/15 relative z-10">
                  <Link
                    to="/call-for-papers"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 hover:text-amber-200 uppercase tracking-wider transition-colors group/link"
                  >
                    <span>Submit to Track {trackNum}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {filteredThemes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-300 shadow-sm">
            <p className="text-sm text-slate-700 font-medium">No sub-themes match &ldquo;{searchTerm}&rdquo;</p>
            <button
              type="button"
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



