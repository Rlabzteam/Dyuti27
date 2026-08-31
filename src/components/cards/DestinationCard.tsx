import React from 'react';
import { MapPin } from 'lucide-react';
import { AttractionItem } from '@/data/conference';

export interface DestinationCardProps {
  attraction: AttractionItem;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ attraction }) => {
  return (
    <div className="group bg-white border border-[#D9DEE5] hover:border-[#12345B]/50 rounded-xl overflow-hidden shadow-subtle hover:shadow-editorial transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#071A33]/10">
        <img
          src={attraction.imageUrl}
          alt={attraction.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-[#071A33]/85 backdrop-blur-xs text-white border border-white/20 px-3.5 py-1 rounded-full text-[11px] font-sans font-medium flex items-center gap-1.5 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#93C5FD]" />
          <span>Kochi, Kerala</span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#071A33] mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
          {attraction.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed m-0 font-sans font-normal">
          {attraction.description}
        </p>
      </div>
    </div>
  );
};
