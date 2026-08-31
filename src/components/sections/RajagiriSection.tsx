import React from 'react';
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const RajagiriSection: React.FC = () => {
  return (
    <section
      className="py-20 sm:py-28 bg-[#03110f] border-t border-amber-500/20 relative overflow-hidden"
      aria-labelledby="rajagiri-section-heading"
    >
      {/* Subtle lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Content (Left Column) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-cinzel font-bold tracking-widest uppercase mb-4 shadow-gold-glow">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Host Institution</span>
            </div>

            <h2
              id="rajagiri-section-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight mb-6"
            >
              Rajagiri College of Social Sciences
            </h2>

            <p className="text-amber-200/90 font-serif italic text-base sm:text-lg mb-6 leading-relaxed">
              (Autonomous) — Re-accredited with NAAC A++ Grade (CGPA 3.83/4) &bull; Ranked #12 in India (NIRF 2025) &bull; Ranked #1 in Kerala (KIRF 2025)
            </p>

            <div className="space-y-4 text-slate-650 text-sm sm:text-base leading-relaxed font-normal mb-8">
              <p>
                Rajagiri College of Social Sciences (RCSS) is a pioneer in social work education, management, and research in India. Managed by the Carmelites of Mary Immaculate (CMI), the institution embodies academic excellence and compassionate community intervention.
              </p>
              <p>
                With over 60 international partner universities across 30+ countries, Rajagiri provides a truly global academic environment fostering interdisciplinary research, social innovation, and sustainable development initiatives.
              </p>
            </div>

            {/* Key credentials grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 pt-4 border-t border-amber-500/20">
              <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20">
                <span className="block font-cinzel font-bold text-xl text-amber-300">NIRF #12</span>
                <span className="text-xs text-slate-400">College in India</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20">
                <span className="block font-cinzel font-bold text-xl text-emerald-400">NAAC A++</span>
                <span className="text-xs text-slate-400">3.83 / 4.00 CGPA</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20 col-span-2 sm:col-span-1">
                <span className="block font-cinzel font-bold text-xl text-amber-300">60+ Global</span>
                <span className="text-xs text-slate-400">University Ties</span>
              </div>
            </div>

            {/* CTA button */}
            <div>
              <Button
                variant="gold"
                asLink
                href="/rajagiri"
                icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
              >
                Explore Rajagiri
              </Button>
            </div>
          </div>

          {/* Large Image & Official Branding (Right Column) */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative gold background border */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-500/20 via-emerald-500/10 to-transparent blur-sm -z-10" />

              <div className="rounded-3xl bg-gradient-to-b from-[#082a26] to-[#041513] p-6 sm:p-8 border border-amber-500/30 shadow-luxury-lg overflow-hidden">
                {/* Official Rajagiri Insignia */}
                <div className="flex items-center justify-between pb-6 border-b border-amber-500/20">
                  <img
                    src="https://dyuti.in/assets/images/rajagiri.webp"
                    alt="Rajagiri College of Social Sciences"
                    className="h-14 w-auto object-contain"
                    loading="lazy"
                  />
                  <Badge variant="emerald-luxury" className="px-3 py-1">
                    Autonomous
                  </Badge>
                </div>

                {/* Campus Image */}
                <div className="my-6 rounded-2xl overflow-hidden border border-slate-250 relative group">
                  <img
                    src="https://dyuti.in/assets/images/1.jpg"
                    alt="Rajagiri College Valley Campus"
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-display text-slate-700">
                      Rajagiri Valley Campus, Kalamassery, Kochi
                    </span>
                  </div>
                </div>

                {/* Institutional Highlights */}
                <div className="space-y-2.5 text-xs text-slate-650">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Premier Centre for Social Work Education in South Asia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Established by Carmelites of Mary Immaculate (CMI)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ranked #1 College in Kerala (KIRF 2025)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
