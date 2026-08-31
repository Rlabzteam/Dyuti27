import React from 'react';
import { SubTheme } from '@/data/conference';

export interface ThemeCardProps {
  theme: SubTheme;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <div className="group relative bg-white border border-[#D9DEE5] hover:border-[#12345B]/50 rounded-md p-6 sm:p-7 shadow-subtle hover:shadow-editorial transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Top Navy accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#12345B] opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Track Badge & Category */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#EFF6FF] text-[#2563EB] font-mono font-bold text-xs border border-[#BFDBFE]">
          <span>Track {theme.number}</span>
        </span>
        <span className="text-[11px] uppercase tracking-wider text-[#667085] font-semibold font-sans">
          Conference Track
        </span>
      </div>

      {/* Theme Title */}
      <h3 className="font-heading font-bold text-lg sm:text-xl text-[#071A33] group-hover:text-[#2563EB] transition-colors leading-snug mb-4">
        {theme.title}
      </h3>

      {/* Topics list */}
      <ul className="space-y-2 mt-auto pt-4 border-t border-[#D9DEE5]/60 text-xs sm:text-sm text-[#667085]">
        {theme.topics.map((topic, idx) => (
          <li key={idx} className="flex items-start gap-2 leading-relaxed">
            <span className="text-[#12345B] font-mono text-xs select-none">&bull;</span>
            <span className="group-hover:text-[#101828] transition-colors">{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
