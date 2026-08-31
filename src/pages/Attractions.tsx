import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';

export const Attractions: React.FC = () => {
  const tourismLinks = [
    { label: '10 Best Places to Visit in Kerala', url: 'https://www.tripadvisor.in/Attractions-g297631-Activities-Kerala.html' },
    { label: 'Tourist Destinations of Kerala (Category Listing)', url: 'https://www.keralatourism.org/destination/' },
    { label: 'Welcome to Kerala Tourism (Official Portal)', url: 'https://www.keralatourism.org/' },
    { label: 'Kerala Tourism - Promoting God’s Own Country', url: 'http://www.keralatourism.com/' },
    { label: '10 Best Places to Visit in Kochi', url: 'https://www.tripadvisor.in/Attractions-g297633-Activities-Kochi_Cochin_Kerala.html' },
    { label: '19 Must See Places Near Kochi', url: 'http://paradise-kerala.com/blog/9-must-see-places-near-kochi/' },
  ];

  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center pt-4 sm:pt-6 pb-10 sm:pb-14 mb-4">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="w-6 h-0.5 bg-[#071A33]" />
            <span className="text-[12px] font-sans font-bold uppercase tracking-[0.22em] text-slate-600">
              Explore Kerala
            </span>
            <span className="w-6 h-0.5 bg-[#071A33]" />
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-[#071A33] leading-tight tracking-tight mb-4 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Attractions in &amp;
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              Around Historic Kochi
            </span>
          </h1>

          {/* Divider */}
          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Acclaimed as the &lsquo;Queen of the Arabian Sea&rsquo;, Kochi weaves historic Portuguese and Dutch architecture with scenic palm backwaters, spice markets, and vibrant coastal culture.
          </p>
        </div>

        {/* ── SCENIC HERO BANNER ── */}
        <div className="rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/20 bg-[#071A33] shadow-2xl mb-20 lg:mb-28 group max-h-[480px]">
          <img
            src="/images/dyuti27_kochi_watercolor_art.jpg"
            alt="Artistic Watercolor Panorama of Kochi — Chinese Fishing Nets, Heritage Architecture, Water Metro, and Rajagiri Campus"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* ── DETAILED ATTRACTIONS (Alternating Asymmetric Curved Leaf Cards) ── */}
        <div className="space-y-16 lg:space-y-24 mb-20 lg:mb-28">
          {CONFERENCE_DATA.attractions.map((attraction, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={attraction.id}
                className={`p-8 sm:p-10 lg:p-12 ${
                  isEven
                    ? 'rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424]'
                    : 'rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c]'
                } text-white shadow-2xl border border-white/20 overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center`}
              >
                {/* Photo Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="rounded-[20px] overflow-hidden border border-white/20 shadow-lg group">
                    <img
                      src={attraction.imageUrl}
                      alt={attraction.title}
                      className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Narrative Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs font-black px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white uppercase tracking-widest shadow-xs">
                      Destination {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="w-6 h-px bg-white/25" />
                    <span className="text-xs font-sans uppercase tracking-[0.16em] text-slate-300 font-bold">
                      Kochi, Kerala
                    </span>
                  </div>

                  <h3 className="text-[1.85rem] sm:text-[2.25rem] font-heading font-extrabold text-white leading-[1.1] mb-5">
                    {attraction.title}
                  </h3>

                  <p className="text-[15px] sm:text-[16px] text-slate-100 leading-relaxed font-sans font-medium m-0">
                    {attraction.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── QUICK TOURISM GUIDES & EXTERNAL RESOURCES (Deep Navy Card) ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0b2952] to-[#040e1c] text-white border border-white/20 shadow-2xl">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-mono font-black uppercase tracking-[0.18em] mb-3 shadow-xs">
              Kerala Tourism Portals
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-white font-extrabold m-0">
              Tourist Guides &amp; Official Travel Portals
            </h3>
            <span className="text-xs font-sans text-slate-300 uppercase tracking-wider font-bold block mt-2">
              External State Tourism &amp; Sightseeing Resources
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tourismLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-[18px] bg-white/10 border border-white/15 hover:bg-white/20 hover:border-white/40 transition-all flex items-center justify-between group shadow-sm"
              >
                <span className="text-xs sm:text-sm font-sans font-medium text-slate-100 group-hover:text-white transition-colors leading-snug">
                  {link.label}
                </span>
                <ExternalLink className="w-4 h-4 text-white group-hover:scale-110 shrink-0 ml-3 transition-transform" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
