import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'navy' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'gold' | 'gold-luxury' | 'emerald-luxury' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  showArrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'navy',
      size = 'md',
      asLink,
      href,
      target,
      rel,
      icon,
      showArrow = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071A33] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none group cursor-pointer rounded-[14px]';

    const variants = {
      navy:
        'bg-[#071A33] text-white hover:bg-[#12345B] shadow-sm hover:shadow-md',
      primary:
        'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm hover:shadow-md',
      secondary:
        'bg-[#FFFFFF] text-[#071A33] border border-[#071A33]/30 hover:border-[#071A33] hover:bg-[#F5F5F0]',
      outline:
        'bg-transparent text-[#071A33] border border-[#071A33]/40 hover:border-[#071A33] hover:bg-[#071A33] hover:text-white',
      ghost:
        'bg-transparent text-[#071A33] hover:bg-[#071A33]/6',
      white:
        'bg-white text-[#071A33] hover:bg-[#F5F5F0] border border-[#D9DEE5] shadow-sm',
      danger:
        'bg-red-600 text-white hover:bg-red-700',
      // Fallback aliases:
      gold:
        'bg-[#071A33] text-white hover:bg-[#12345B]',
      'gold-luxury':
        'bg-[#071A33] text-white hover:bg-[#12345B]',
      'emerald-luxury':
        'bg-[#12345B] text-white hover:bg-[#071A33]',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2 gap-2 h-[40px]',
      md: 'text-sm px-6 py-2.5 gap-2.5 h-[48px]',
      lg: 'text-[15px] px-7 py-3 gap-3 h-[52px]',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const content = (
      <>
        <span>{children}</span>
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" />
        )}
        {icon && !showArrow && (
          <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
        )}
      </>
    );

    if (asLink && href) {
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          target={target || (isExternal ? '_blank' : undefined)}
          rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
