import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Lightbox } from '@/components/ui/Lightbox';
import { CONFERENCE_DATA } from '@/data/conference';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Extract unique years/categories for filter list
  const categories = ['All', ...Array.from(new Set(CONFERENCE_DATA.gallery.map((item) => item.year)))].sort(
    (a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return b.localeCompare(a); // Reverse chronology
    }
  );

  const filteredPhotos =
    activeFilter === 'All'
      ? CONFERENCE_DATA.gallery
      : CONFERENCE_DATA.gallery.filter((photo) => photo.year === activeFilter);

  const selectedPhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="w-6 h-0.5 bg-[#071A33]" />
            <span className="text-[12px] font-sans font-bold uppercase tracking-[0.22em] text-slate-600">
              Conference Historical Archive
            </span>
            <span className="w-6 h-0.5 bg-[#071A33]" />
          </div>
          <h1 className="font-heading font-extrabold text-[#071A33] leading-none tracking-tight mb-6 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Historical Conference
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              Gallery &amp; Retrospective
            </span>
          </h1>
          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />
          <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Glimpses of keynote addresses, book release ceremonies, academic dialogues, and cultural exchanges over 25+ editions of the DYUTI international conference.
          </p>
        </div>

        {/* ── FILTER CONTROLS ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 lg:mb-18">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            const count =
              cat === 'All'
                ? CONFERENCE_DATA.gallery.length
                : CONFERENCE_DATA.gallery.filter((item) => item.year === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveFilter(cat);
                  setSelectedPhotoIndex(null);
                }}
                className={cn(
                  'px-4 sm:px-5 py-2.5 rounded-[10px] text-[12px] font-sans font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer border flex items-center gap-2',
                  isActive
                    ? 'bg-[#071A33] text-white border-[#071A33] shadow-md shadow-[#071A33]/10'
                    : 'bg-[#F5F3EF] border-slate-200 text-slate-650 hover:text-[#071A33] hover:bg-slate-100 hover:border-slate-300'
                )}
              >
                <span>{cat === 'All' ? 'All Editions' : `DYUTI ${cat}`}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-mono',
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-650'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── IMAGE GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-20 lg:mb-28">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPhotoIndex(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View photo: ${photo.title} (DYUTI ${photo.year})`}
              className="group relative bg-slate-900 border border-slate-200 hover:border-[#071A33]/60 rounded-[20px] overflow-hidden shadow-sm transition-all duration-500 cursor-pointer h-80 flex flex-col justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071A33]"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  const filename = photo.imageUrl.split('/').pop();
                  if (filename && !target.src.startsWith('https://dyuti.in')) {
                    target.src = `https://dyuti.in/uploads/gallery/${filename}`;
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay (Stunning Deep Purple Glow with high contrast text) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/95 via-[#071A33]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white z-10">
                <span className="text-[10.5px] font-mono font-bold text-slate-350 uppercase tracking-[0.16em] mb-1.5 block">
                  DYUTI {photo.year} &middot; {photo.category}
                </span>
                <h4 className="font-heading text-base sm:text-[17px] leading-snug line-clamp-2 text-white font-bold m-0">
                  {photo.title}
                </h4>

                {/* Floating Zoom Button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-[10px] bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/25 shadow-subtle">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── LIGHTBOX INTEGRATION ── */}
        {selectedPhoto && (
          <Lightbox
            isOpen={selectedPhotoIndex !== null}
            onClose={() => setSelectedPhotoIndex(null)}
            imageUrl={selectedPhoto.imageUrl}
            title={`${selectedPhoto.title} (DYUTI ${selectedPhoto.year})`}
            onPrev={() =>
              setSelectedPhotoIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
              )
            }
            onNext={() =>
              setSelectedPhotoIndex((prev) =>
                prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
              )
            }
            hasPrev={filteredPhotos.length > 1}
            hasNext={filteredPhotos.length > 1}
          />
        )}

      </div>
    </div>
  );
};
