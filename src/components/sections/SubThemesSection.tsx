import React from 'react';
import { FileText } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const SubThemesSection: React.FC = () => {
  return (
    <section
      className="py-20 sm:py-28 bg-[#041412] relative overflow-hidden"
      aria-labelledby="sub-themes-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <SectionHeading
          eyebrow="Academic Scope &amp; Tracks"
          title="Conference Sub-Themes"
          subtitle="Deliberating on 8 interconnected sub-themes designed to catalyze sustainable development, participatory policy, and community empowerment."
          dark
        />

        {/* 8-Track Grid: 4 columns desktop, 2 columns tablet, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {CONFERENCE_DATA.subThemes.map((theme) => (
            <article
              key={theme.id}
              tabIndex={0}
              className="group relative bg-gradient-to-b from-[#082a26]/90 to-[#041714]/95 border border-amber-500/20 hover:border-amber-400/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-2xl p-6 sm:p-7 shadow-luxury-md hover:shadow-gold-glow transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden backdrop-blur-xl"
            >
              {/* Top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Number Badge & Track Label */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 font-cinzel font-extrabold text-base border border-amber-400/40 shadow-gold-glow">
                    {theme.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold font-display">
                    Track {theme.number}
                  </span>
                </div>

                {/* Sub-Theme Title */}
                <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-200 transition-colors leading-snug mb-4">
                  {theme.title}
                </h3>
              </div>

              {/* Verified Topics / Points List */}
              <div className="mt-auto pt-4 border-t border-emerald-500/20">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Key Focus Areas
                </span>
                <ul className="space-y-2 text-xs text-slate-650">
                  {theme.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span className="group-hover:text-slate-700 transition-colors">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA to submission guidelines */}
        <div className="mt-14 text-center">
          <Button
            variant="outline"
            size="lg"
            asLink
            href="/call_for_papers"
            icon={<FileText className="w-4 h-4" />}
          >
            Review Submission Guidelines for Tracks
          </Button>
        </div>
      </div>
    </section>
  );
};
