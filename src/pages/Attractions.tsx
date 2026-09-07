import React from 'react';
import { ExternalLink, Trees, HeartHandshake } from 'lucide-react';
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
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-[#071A33]" />
            <span className="text-sm sm:text-[15px] font-sans font-extrabold uppercase tracking-[0.24em] text-slate-700">
              Explore Kerala
            </span>
            <span className="w-8 h-0.5 bg-[#071A33]" />
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-[#071A33] leading-none tracking-tight mb-6 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Attractions in &amp;
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              Around Historic Kochi
            </span>
          </h1>

          {/* Divider */}
          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Acclaimed as the &lsquo;Queen of the Arabian Sea&rsquo;, Kochi weaves pioneering green infrastructure, riverine ecotourism, historic Portuguese and Dutch heritage, and vibrant coastal culture.
          </p>
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
                    ? 'rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px]'
                    : 'rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px]'
                } hd-card hd-card-dark text-white shadow-2xl overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center`}
              >
                {/* Photo Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="rounded-[20px] overflow-hidden hd-img-frame shadow-lg group">
                    <img
                      src={attraction.imageUrl}
                      alt={attraction.title}
                      className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Content Narrative Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center relative z-10 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    <span className="font-mono text-xs font-black px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white uppercase tracking-widest shadow-xs hd-chip">
                      Destination {String(idx + 1).padStart(2, '0')}
                    </span>
                    {attraction.id === 'mangrove-park-malipuram' && (
                      <span className="font-sans text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                        <Trees className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Mangrove Eco-Park &amp; SDGs Conservation</span>
                      </span>
                    )}
                    {attraction.id === 'abhayaranyam-kaprikkad' && (
                      <span className="font-sans text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                        <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                        <span>SDG 15 &middot; Wildlife Conservation &amp; Eco-Tourism</span>
                      </span>
                    )}
                    <span className="text-xs font-sans uppercase tracking-[0.16em] text-slate-300 font-bold">
                      Kochi &middot; Ernakulam
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
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] p-8 sm:p-12 lg:p-14 hd-card hd-card-dark text-white shadow-2xl">
          <div className="mb-8 relative z-10">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-mono font-black uppercase tracking-[0.18em] mb-3 shadow-xs hd-chip">
              Kerala Tourism Portals
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-white font-extrabold m-0">
              Tourist Guides &amp; Official Travel Portals
            </h3>
            <span className="text-xs font-sans text-slate-300 uppercase tracking-wider font-bold block mt-2">
              External State Tourism &amp; Sightseeing Resources
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {tourismLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-[18px] hd-card hd-glass-dark hd-glass-dark-hover flex items-center justify-between group"
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

