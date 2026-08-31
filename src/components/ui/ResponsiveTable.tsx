import React from 'react';
import { cn } from '@/lib/utils';

export interface ResponsiveTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  children,
  className,
  wrapperClassName,
  ...props
}) => {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-md border border-[#D9DEE5] bg-white shadow-subtle',
        wrapperClassName
      )}
    >
      <table
        className={cn(
          'w-full text-left text-sm text-[#101828] border-collapse',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};
