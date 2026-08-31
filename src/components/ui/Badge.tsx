import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'navy' | 'blue' | 'subtle' | 'outline' | 'white' | 'emerald' | 'gold' | 'slate' | 'gold-luxury' | 'emerald-luxury' | 'glass';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  className,
  ...props
}) => {
  const variants = {
    navy: 'bg-[#071A33] text-white border border-[#071A33]',
    blue: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]',
    subtle: 'bg-[#F8F8F6] text-[#12345B] border border-[#D9DEE5]',
    outline: 'bg-transparent text-[#12345B] border border-[#12345B]/30',
    white: 'bg-white text-[#071A33] border border-white/20',
    // Fallbacks for legacy props
    emerald: 'bg-[#EFF6FF] text-[#12345B] border border-[#D9DEE5]',
    gold: 'bg-[#F8F8F6] text-[#12345B] border border-[#D9DEE5]',
    slate: 'bg-slate-100 text-slate-800 border border-slate-200',
    'gold-luxury': 'bg-[#F8F8F6] text-[#071A33] border border-[#D9DEE5]',
    'emerald-luxury': 'bg-[#EFF6FF] text-[#12345B] border border-[#BFDBFE]',
    glass: 'bg-white/80 backdrop-blur-xs text-[#071A33] border border-[#D9DEE5]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[11px] font-sans font-semibold uppercase tracking-wider transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
