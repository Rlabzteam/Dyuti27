import React from 'react';
import { Sparkles, Edit3, Hotel, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const RegistrationSection: React.FC = () => {
  return (
    <section
      className="py-20 sm:py-28 bg-gradient-to-b from-[#041412] via-[#062420] to-[#031311] border-t border-amber-500/20 relative overflow-hidden"
      aria-labelledby="registration-cta-heading"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-cinzel font-bold tracking-widest uppercase mb-4 shadow-emerald-glow">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Delegate Registration</span>
        </div>

        <h2
          id="registration-cta-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight mb-4"
        >
          Ready to Participate?
        </h2>

        <p className="text-xl sm:text-2xl font-serif italic text-amber-200 mb-6">
          Register for DYUTI 2027
        </p>

        <p className="text-sm sm:text-base text-slate-650 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Join international academicians, development practitioners, NGO leaders, policymakers, and research scholars at Rajagiri College of Social Sciences, Kalamassery.
        </p>

        {/* Verified Official Fee Structure Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
          {CONFERENCE_DATA.fees.map((fee, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="block text-xs font-display font-semibold text-slate-650 mb-1">
                  {fee.category}
                </span>
                <span className="block font-cinzel font-bold text-2xl text-amber-300 mb-2">
                  {fee.amount}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 m-0 border-t border-slate-250 pt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{fee.deadline}</span>
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="gold"
            size="lg"
            asLink
            href={CONFERENCE_DATA.links.registrationForm}
            icon={<Edit3 className="w-5 h-5 text-slate-950" />}
            className="shadow-gold-glow"
          >
            Register Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            asLink
            href="/accomodation"
            icon={<Hotel className="w-5 h-5" />}
          >
            Accommodation &amp; Stay
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asLink
            href={CONFERENCE_DATA.links.brochurePdf}
            icon={<Download className="w-5 h-5 text-amber-400" />}
          >
            Brochure (PDF)
          </Button>
        </div>
      </div>
    </section>
  );
};
