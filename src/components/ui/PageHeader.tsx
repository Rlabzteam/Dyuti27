import React from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  number?: string;
  category?: string;
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  metaRight?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  dark?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  number,
  category,
  eyebrow,
  title,
  subtitle,
  metaRight,
  rightContent,
  className,
  titleClassName,
  subtitleClassName,
  dark = false,
}) => {
  return (
    <div className={cn('mb-16 sm:mb-20 lg:mb-24', className)}>
      {/* Top Annotation Bar with Thin Border */}
      {(number || category || metaRight) && (
        <div
          className={cn(
            'flex items-center justify-between pb-5 mb-10 sm:mb-14 border-b',
            dark ? 'border-white/15' : 'border-[#D9DEE5]'
          )}
        >
          <div className="flex items-center gap-3">
            {number && (
              <span
                className={cn(
                  'font-mono text-[11px] font-bold tabular-nums',
                  dark ? 'text-[#93C5FD]' : 'text-[#2563EB]'
                )}
              >
                {number}
              </span>
            )}
            {number && category && (
              <span className={cn('w-6 h-px', dark ? 'bg-white/20' : 'bg-[#D9DEE5]')} />
            )}
            {category && (
              <span
                className={cn(
                  'text-[11px] font-sans uppercase tracking-[0.18em] font-semibold',
                  dark ? 'text-white' : 'text-[#071A33]'
                )}
              >
                {category}
              </span>
            )}
          </div>

          {metaRight && (
            <div
              className={cn(
                'text-[11px] font-sans uppercase tracking-[0.14em]',
                dark ? 'text-white/70' : 'text-[#667085]'
              )}
            >
              {metaRight}
            </div>
          )}
        </div>
      )}

      {/* Main Editorial Page Title & Description */}
      <div
        className={cn(
          rightContent
            ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center'
            : 'max-w-4xl'
        )}
      >
        <div className={rightContent ? 'lg:col-span-8' : ''}>
          {eyebrow && (
            <div className="flex items-center gap-3 mb-4">
              <span
                className={cn('w-8 h-0.5', dark ? 'bg-[#93C5FD]' : 'bg-[#071A33]')}
              />
              <span
                className={cn(
                  'text-sm sm:text-[15px] font-sans font-extrabold uppercase tracking-[0.24em]',
                  dark ? 'text-[#93C5FD]' : 'text-slate-700'
                )}
              >
                {eyebrow}
              </span>
            </div>
          )}

          <h1
            className={cn(
              'text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem] font-heading font-extrabold leading-[1.08] tracking-tight m-0',
              dark ? 'text-white' : 'text-[#071A33]',
              titleClassName
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={cn(
                'text-base sm:text-[1.0625rem] md:text-lg leading-relaxed font-sans font-normal mt-5 max-w-3xl',
                dark ? 'text-white/80' : 'text-[#475467]',
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {rightContent && (
          <div className="lg:col-span-4 flex justify-center lg:justify-end items-center">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
};
