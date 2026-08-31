import React from 'react';
import { StatItem } from '@/data/conference';

export interface StatCardProps {
  stat: StatItem;
  dark?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, dark = false }) => {
  return (
    <div
      className={`relative group rounded-md p-6 text-center transition-all duration-200 border ${
        dark
          ? 'bg-[#071A33] border-white/10 text-white'
          : 'bg-white border-[#D9DEE5] text-[#101828] shadow-subtle hover:border-[#12345B]/40 hover:shadow-editorial'
      }`}
    >
      <div className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold mb-2 tracking-tight ${
        dark ? 'text-white' : 'text-[#071A33]'
      }`}>
        {stat.value}
      </div>
      <div className={`font-sans font-semibold text-sm sm:text-base mb-1 ${
        dark ? 'text-white/90' : 'text-[#101828]'
      }`}>
        {stat.label}
      </div>
      {stat.description && (
        <div className={`text-xs leading-relaxed font-sans font-normal ${
          dark ? 'text-white/60' : 'text-[#667085]'
        }`}>
          {stat.description}
        </div>
      )}
    </div>
  );
};
