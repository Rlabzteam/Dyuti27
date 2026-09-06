import React from 'react';
import { StatItem } from '@/data/conference';

export interface StatCardProps {
  stat: StatItem;
  dark?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, dark = false }) => {
  return (
    <div
      className={`relative group hd-card rounded-2xl p-6 text-center transition-all duration-300 ${
        dark
          ? 'hd-card-dark hd-card-dark-hover text-white'
          : 'hd-card-light hd-card-light-hover text-[#101828]'
      }`}
    >
      <div className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold mb-2 tracking-tight ${
        dark
          ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-white'
          : 'text-transparent bg-clip-text bg-gradient-to-r from-[#071A33] via-[#12345B] to-[#2563EB]'
      }`}>
        {stat.value}
      </div>
      <div className={`font-sans font-bold text-sm sm:text-base mb-1 ${
        dark ? 'text-white/95' : 'text-[#071A33]'
      }`}>
        {stat.label}
      </div>
      {stat.description && (
        <div className={`text-xs leading-relaxed font-sans font-normal ${
          dark ? 'text-slate-300' : 'text-[#4B5563]'
        }`}>
          {stat.description}
        </div>
      )}
    </div>
  );
};

