import React from 'react';
import { MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const InstitutionSection: React.FC = () => {
  const stats = [
    { value: '26th', label: 'Annual Edition', sub: 'Legacy since 1998' },
    { value: 'NIRF #12', label: 'College in India', sub: 'National Ranking 2025' },
    { value: 'NAAC A++', label: 'Highest Grade', sub: '3.83 / 4.0 CGPA' },
    { value: '60+', label: 'Global Partners', sub: 'Across 30+ countries' },
  ];

  return (
    <section
      id="institution"
      className="bg-white text-[#0B1220] border-b border-[#D9DEE5] relative py-20 sm:py-28 lg:py-32"
      aria-labelledby="institution-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── TOP SECTION ANNOTATION BAR ── */}
        <div className="flex items-center justify-between pb-5 mb-12 sm:mb-16 border-b border-[#D9DEE5]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#2563EB] tabular-nums">08</span>
            <span className="w-6 h-px bg-[#D9DEE5]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#071A33] font-bold">
              Host Institution
            </span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[#667085] font-semibold">
            Autonomous &middot; Established 1955 &middot; CMI Management
          </span>
        </div>

        {/* ── ASYMMETRIC 12-COLUMN SPLIT EDITORIAL COMPOSITION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── LEFT: Large Editorial Campus Image (6 cols) ── */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[24px] overflow-hidden border border-[#D9DEE5] shadow-editorial bg-[#E8EDF2] group">
              <img
                src="https://dyuti.in/assets/images/1.jpg"
                alt="Rajagiri College of Social Sciences Valley Campus, Kalamassery, Kochi"
                className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Minimalist Caption Strip */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#071A33]/90 via-[#071A33]/40 to-transparent px-6 pt-12 pb-6">
                <div className="flex items-end justify-between text-white">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10.5px] font-sans uppercase tracking-[0.18em] text-[#93C5FD] font-bold mb-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>Rajagiri Valley Campus, Kalamassery</span>
                    </div>
                    <p className="text-[13px] font-sans font-semibold text-white/95 uppercase tracking-[0.12em] leading-tight m-0">
                      Kochi &middot; Kerala &middot; India
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/90 bg-white/12 px-3 py-1.5 rounded-[8px] border border-slate-250">
                    <Award className="w-3 h-3 text-[#60A5FA]" />
                    <span>NAAC A++ &middot; 3.83</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Narrative & Unboxed Statistics (6 cols) ── */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-0.5 bg-[#2563EB]" />
                <span className="text-[11.5px] font-sans uppercase tracking-[0.18em] font-bold text-[#2563EB]">
                  Centre of Academic Excellence
                </span>
              </div>

              {/* Heading */}
              <h2
                id="institution-heading"
                className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-heading font-extrabold text-[#071A33] leading-[1.08] tracking-tight mb-5"
              >
                Rajagiri College of Social Sciences
                <span className="block text-[#667085] text-[1.45rem] sm:text-[1.75rem] font-medium mt-1 font-heading">
                  (Autonomous)
                </span>
              </h2>

              {/* Description */}
              <p className="text-[15px] sm:text-[16px] text-[#667085] leading-relaxed font-sans font-normal mb-8">
                Managed by the Carmelites of Mary Immaculate (CMI) congregation, Rajagiri has pioneered professional social work education, management scholarship, and community engagement in India for over seven decades. The institution bridges rigorous empirical research with frontline developmental transformations.
              </p>

              {/* Unboxed 2-Column Statistics List */}
              <div className="grid grid-cols-2 gap-6 pt-6 pb-8 border-y border-[#D9DEE5] mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="font-heading text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#071A33] leading-none mb-1 tabular-nums group-hover:text-[#2563EB] transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-[13px] font-sans font-bold text-[#0B1220] mb-0.5">
                      {stat.label}
                    </div>
                    <div className="text-[11.5px] font-sans text-[#667085]">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Button
                variant="navy"
                size="lg"
                asLink
                href="/rajagiri"
                showArrow
              >
                Explore Rajagiri Heritage
              </Button>
            </div>
          </div>
        </div>

        {/* ── KOCHI & RAJAGIRI ARTISTIC PANORAMA ── */}
        <div className="mt-16 sm:mt-20 rounded-[24px] overflow-hidden border border-[#D9DEE5] bg-white p-4 sm:p-6 shadow-subtle group">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D9DEE5]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#2563EB]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#2563EB]">
                Kochi &middot; Host City &amp; Ecological Tapestry
              </span>
            </div>
            <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[#667085] hidden sm:inline font-semibold">
              Heritage &bull; Water Metro &bull; Innovation
            </span>
          </div>
          <div className="rounded-[18px] overflow-hidden max-h-[360px] sm:max-h-[440px]">
            <img
              src="/images/dyuti27_kochi_watercolor_art.jpg"
              alt="Artistic Watercolor Panorama of Kochi — Heritage, Water Metro, Rajagiri, and Backwaters"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
