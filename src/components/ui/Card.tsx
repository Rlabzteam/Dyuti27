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
    editorial: 'hd-card-light text-[#101828]',
    offwhite: 'bg-[#F8F8F6] border border-[#D9DEE5] text-[#101828] shadow-sm',
    navy: 'hd-card-dark text-white',
    subtle: 'bg-white border border-[#EAEFF5] text-[#101828] shadow-sm',
    // Legacy / specialized variants:
    luxury: 'hd-card-light border-amber-300/40 text-[#101828]',
    emerald: 'hd-card-dark text-white',
    'gold-border': 'bg-white border border-amber-400/40 text-[#101828] shadow-md',
    glass: 'hd-glass-dark text-white',
    slate: 'bg-[#F8F8F6] border border-[#D9DEE5] text-[#101828] shadow-sm',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6 sm:p-8 transition-all duration-300 relative hd-card',
        variants[variant],
        hover && (variant === 'navy' || variant === 'emerald' || variant === 'glass' ? 'hd-card-dark-hover' : 'hd-card-light-hover'),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};


