import React from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  error,
  required,
  children,
  className,
}) => {
  return (
    <div className={cn('mb-4', className)}>
      <label
        htmlFor={id}
        className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#071A33] mb-2"
      >
        {label} {required && <span className="text-[#2563EB]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};
