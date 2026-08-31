import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  className,
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || (items[0]?.id ?? null));

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-[#D9DEE5] rounded-md overflow-hidden bg-white shadow-subtle transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-sans font-medium text-[#071A33] hover:text-[#2563EB] hover:bg-[#F8F8F6] transition-colors focus-visible:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                {item.icon && <span className="text-[#12345B]">{item.icon}</span>}
                <span className="text-base font-heading font-bold sm:text-lg text-[#071A33]">{item.title}</span>
              </div>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-[#667085] transition-transform duration-200 shrink-0',
                  isOpen && 'transform rotate-180 text-[#12345B]'
                )}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-3 text-[#667085] text-xs sm:text-sm leading-relaxed border-t border-[#D9DEE5]/60 font-sans font-normal bg-[#F8F8F6]/50">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
