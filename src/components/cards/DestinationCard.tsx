import React from 'react';
import { MapPin } from 'lucide-react';
import { AttractionItem } from '@/data/conference';

export interface DestinationCardProps {
  attraction: AttractionItem;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ attraction }) => {
  return (
    <div className="group hd-card hd-card-light hd-card-light-hover rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="relative h-56 sm:h-64 w-full hd-img-frame bg-[#071A33]/10">
        <img
          src={attraction.imageUrl}
          alt={attraction.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-[#071A33]/85 hd-chip text-white border border-white/25 px-3.5 py-1 rounded-full text-[11px] font-sans font-semibold flex items-center gap-1.5 shadow-md">
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <span>Kochi, Kerala</span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col relative z-10">
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#071A33] mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
          {attraction.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed m-0 font-sans font-normal">
          {attraction.description}
        </p>
      </div>
    </div>
  );
};

