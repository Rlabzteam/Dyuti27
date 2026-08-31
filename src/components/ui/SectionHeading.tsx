import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowVariant?: string;
  sectionNumber?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  sectionNumber,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-14 sm:mb-20',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {(eyebrow || sectionNumber) && (
        <div className={cn(
          "flex items-center gap-3 mb-4",
          align === 'center' ? 'justify-center' : 'justify-start'
        )}>
          {sectionNumber && (
            <span className={cn(
              "font-mono text-xs font-bold uppercase tracking-widest",
              dark ? "text-[#93C5FD]" : "text-[#2563EB]"
            )}>
              {sectionNumber}
            </span>
          )}
          {sectionNumber && eyebrow && (
            <span className={cn("w-6 h-px", dark ? "bg-white/20" : "bg-[#D9DEE5]")} />
          )}
          {eyebrow && (
            <span className={cn(
              "text-xs uppercase font-sans font-semibold tracking-[0.16em]",
              dark ? "text-white/70" : "text-[#667085]"
            )}>
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <h2
        className={cn(
          'text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-heading font-extrabold tracking-tight leading-[1.1] m-0',
          dark ? 'text-white' : 'text-[#071A33]'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-sm sm:text-base md:text-lg leading-relaxed font-sans font-normal max-w-2xl mt-6',
            align === 'center' ? 'mx-auto' : '',
            dark ? 'text-white/80' : 'text-[#667085]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
