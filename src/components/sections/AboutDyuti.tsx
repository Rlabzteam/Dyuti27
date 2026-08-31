import React from 'react';
import { Sparkles, Award, BookOpen, Globe2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CONFERENCE_DATA } from '@/data/conference';

export const AboutDyuti: React.FC = () => {
  return (
    <section
      className="py-20 sm:py-28 bg-[#041412] relative overflow-hidden"
      aria-labelledby="about-dyuti-heading"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Composition (Left Column on Desktop, stacked on Mobile) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Decorative gold border frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-500/30 via-emerald-500/20 to-amber-500/10 blur-sm -z-10" />
              
              <div className="rounded-3xl bg-gradient-to-b from-[#082a26] to-[#031513] p-6 sm:p-8 border border-amber-500/30 shadow-luxury-lg overflow-hidden relative">
                {/* Official Emblem & Milestone Graphic */}
                <div className="flex items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://dyuti.in/assets/images/dyutilogoog.jpg"
                      alt="DYUTI Emblem"
                      className="h-14 w-auto rounded-lg border border-amber-400/30 shadow-luxury-sm"
                      loading="lazy"
                    />
                    <div>
                      <span className="block font-cinzel font-bold text-lg text-white">
                        DYUTI
                      </span>
                      <span className="block text-xs font-serif italic text-amber-300">
                        {CONFERENCE_DATA.acronymMeaning}
                      </span>
                    </div>
                  </div>
                  <Badge variant="gold-luxury" className="px-3 py-1 text-xs">
                    Since 1998
                  </Badge>
                </div>

                {/* Legacy Conference Photo */}
                <div className="my-6 rounded-2xl overflow-hidden border border-slate-250 relative group">
                  <img
                    src="https://dyuti.in/uploads/gallery/6L6A6365.JPG"
                    alt="DYUTI Conference Inauguration and Proceedings"
                    className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-display text-slate-700">
                      26-Year Scholarly Heritage in Social Work &amp; Development
                    </span>
                  </div>
                </div>

                {/* Highlights pill grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-700 font-medium">26th Annual Edition</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-700 font-medium">Global Participation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content (Right Column) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-cinzel font-bold tracking-widest uppercase mb-4 shadow-gold-glow">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Origins &amp; Heritage</span>
            </div>

            <h2
              id="about-dyuti-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight mb-6"
            >
              About DYUTI
            </h2>

            {/* Official Acronym Expanded */}
            <div className="mb-6 pb-4 border-b border-amber-500/20">
              <p className="text-lg sm:text-xl font-serif text-amber-200 leading-snug">
                <strong>{CONFERENCE_DATA.fullName}</strong>
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Christened <strong>DYUTI</strong>, signifying the <em>‘Spark of Life’</em>.
              </p>
            </div>

            {/* Official Description */}
            <div className="space-y-4 text-slate-650 text-sm sm:text-base leading-relaxed font-normal mb-8">
              <p>
                Rajagiri, guided by its vision of <em>"becoming a centre of excellence in learning for enriching and fulfilling LIFE,"</em> has regularly provided an annual academic forum for scholarly deliberations on vital issues of human development since 1998.
              </p>
              <p>
                The 2027 DYUTI National Conference, themed <em>"Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership,"</em> brings together academicians, researchers, practitioners, policymakers, students, and development professionals to deliberate on innovative and collaborative approaches for sustainable development.
              </p>
              <p>
                Aligned with the <strong>2030 Agenda for Sustainable Development</strong> and its vision of <em>"Leaving No One Behind,"</em> the conference highlights the vital role of social work in promoting social justice, inclusive development, community empowerment, and sustainable solutions.
              </p>
            </div>

            {/* Call to action */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                asLink
                href="/call_for_papers"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Explore DYUTI Scope &amp; Papers
              </Button>
              <Button
                variant="ghost"
                asLink
                href="/rajagiri"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                About Host Institution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
