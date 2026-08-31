import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: 'editorial' | 'offwhite' | 'navy' | 'subtle' | 'luxury' | 'emerald' | 'gold-border' | 'glass' | 'slate';
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = true,
  variant = 'editorial',
  className,
  ...props
}) => {
  const variants = {
    editorial: 'bg-white border border-[#D9DEE5] text-[#101828] shadow-subtle',
    offwhite: 'bg-[#F8F8F6] border border-[#D9DEE5] text-[#101828]',
    navy: 'bg-[#071A33] border border-white/10 text-white',
    subtle: 'bg-white border border-[#EAEFF5] text-[#101828]',
    // Legacy variants mapped gracefully:
    luxury: 'bg-white border border-[#D9DEE5] text-[#101828] shadow-subtle',
    emerald: 'bg-[#071A33] border border-white/10 text-white',
    'gold-border': 'bg-white border border-[#12345B]/30 text-[#101828] shadow-subtle',
    glass: 'bg-white/90 backdrop-blur-xs border border-[#D9DEE5] text-[#101828]',
    slate: 'bg-[#F8F8F6] border border-[#D9DEE5] text-[#101828]',
  };

  return (
    <div
      className={cn(
        'rounded-md p-6 sm:p-8 transition-all duration-200 relative',
        variants[variant],
        hover && 'hover:border-[#12345B]/40 hover:shadow-editorial',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
