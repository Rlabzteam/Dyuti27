import React from 'react';
import { SubTheme } from '@/data/conference';

export interface ThemeCardProps {
  theme: SubTheme;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <div className="group relative hd-card hd-card-light hd-card-light-hover rounded-2xl p-6 sm:p-7 flex flex-col h-full overflow-hidden">
      {/* Top Navy-to-Blue HD gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#071A33] via-[#2563EB] to-amber-400 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Subtle corner ambient glow on hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-500/0 group-hover:bg-blue-500/10 rounded-full blur-xl transition-all duration-500 pointer-events-none" />

      {/* Track Badge & Category */}
      <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] font-mono font-bold text-xs border border-[#BFDBFE] hd-chip shadow-xs group-hover:border-[#2563EB]/40 group-hover:bg-blue-50 transition-colors">
          <span>Track {theme.number}</span>
        </span>
        <span className="text-[11px] uppercase tracking-wider text-[#667085] font-bold font-sans">
          Conference Track
        </span>
      </div>

      {/* Theme Title */}
      <h3 className="font-heading font-bold text-lg sm:text-xl text-[#071A33] group-hover:text-[#2563EB] transition-colors leading-snug mb-4 relative z-10">
        {theme.title}
      </h3>

      {/* Topics list */}
      <ul className="space-y-2 mt-auto pt-4 border-t border-[#D9DEE5]/70 text-xs sm:text-sm text-[#4B5563] relative z-10">
        {theme.topics.map((topic, idx) => (
          <li key={idx} className="flex items-start gap-2 leading-relaxed">
            <span className="text-[#2563EB] font-mono text-xs select-none font-bold">&bull;</span>
            <span className="group-hover:text-[#0B1220] transition-colors font-medium">{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

