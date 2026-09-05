import React from 'react';
import { Calendar, MapPin, Sparkles, FileText, Download, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CONFERENCE_DATA } from '@/data/conference';

export const Hero: React.FC = () => {
  return (
    <section
      className="relative bg-gradient-to-b from-[#02100e] via-[#062420] to-[#041412] text-white pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b border-amber-500/20"
      aria-label="Conference Hero"
    >
      {/* Restrained academic ambient lighting */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(217,119,6,0.07)_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy (Left Column) */}
          <div className="lg:col-span-7">
            {/* Small label: DYUTI 2027 */}
            <div className="mb-4 flex items-center gap-3 flex-wrap">
              <Badge variant="gold-luxury" className="gap-2 px-3.5 py-1 shadow-gold-glow text-xs">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-cinzel tracking-widest uppercase">DYUTI 2027</span>
              </Badge>
              <Badge variant="emerald-luxury" className="gap-1.5 px-3 py-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>26th Annual Edition</span>
              </Badge>
            </div>

            {/* Large title: DYUTI 2027 */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cinzel font-extrabold tracking-tight text-white leading-[1.08] mb-5">
              <span className="bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                DYUTI 2027
              </span>
            </h1>

            {/* Official conference theme in Editorial Serif */}
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-l-4 border-amber-400 backdrop-blur-md">
              <p className="text-lg sm:text-2xl font-serif italic text-amber-200 leading-snug m-0">
                "{CONFERENCE_DATA.theme}"
              </p>
            </div>

            {/* Short supporting description */}
            <p className="text-sm sm:text-base text-slate-650 leading-relaxed max-w-2xl mb-8 font-normal">
              A national academic conference organized by <strong>{CONFERENCE_DATA.hostInstitution}</strong> uniting scholars, practitioners, policymakers, and researchers to advance sustainable development, community empowerment, and social justice.
            </p>

            {/* Verified Meta Details: WHEN and WHERE */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-650 mb-8 pb-8 border-b border-amber-500/20">
              <div className="flex items-center gap-2 bg-black/40 px-3.5 py-2 rounded-xl border border-amber-500/30">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-amber-200">
                  Abstract Deadline: 25 Sept 2026
                </span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-3.5 py-2 rounded-xl border border-emerald-500/30">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rajagiri Valley Campus, Kalamassery, Kochi</span>
              </div>
            </div>

            {/* Action Buttons: Register Now & Call for Papers */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="gold"
                size="lg"
                asLink
                href={CONFERENCE_DATA.links.registrationForm}
                icon={<Sparkles className="w-5 h-5 text-slate-950" />}
                className="shadow-gold-glow"
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                asLink
                href="/call_for_papers"
                icon={<FileText className="w-5 h-5" />}
              >
                Call for Papers
              </Button>
              <Button
                variant="ghost"
                size="lg"
                asLink
                href={CONFERENCE_DATA.links.brochurePdf}
                icon={<Download className="w-5 h-5 text-amber-400" />}
              >
                Brochure
              </Button>
            </div>
          </div>

          {/* Official Conference Visual Composition (Right Column, stacked on mobile) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#082a26]/95 via-[#061f1c]/95 to-[#031513]/98 border-2 border-amber-400/30 backdrop-blur-2xl shadow-luxury-lg overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Official Logos Composition */}
              <div className="flex items-center justify-between pb-6 border-b border-amber-500/20">
                <img
                  src="https://dyuti.in/assets/images/dyutilogoog.jpg"
                  alt="DYUTI Emblem"
                  className="h-12 w-auto object-contain rounded-md border border-amber-400/20"
                  loading="eager"
                />
                <img
                  src="https://dyuti.in/assets/images/dyuti_2027_logo_new-removebg-preview.png"
                  alt="DYUTI 2027 Official Logo"
                  className="h-16 w-auto object-contain brightness-110 drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]"
                  loading="eager"
                />
              </div>

              {/* Verified Conference Key Milestones */}
              <div className="my-6 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-cinzel text-xs uppercase tracking-widest mb-3">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Important Timeline</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-amber-400/20 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-650">Registration Begins</span>
                  <span className="font-semibold text-amber-300 font-mono">10 August 2026</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-amber-400/20 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-650">Abstract Submission Deadline</span>
                  <span className="font-semibold text-amber-300 font-mono">25 Sept 2026</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-emerald-400/20 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-650">Notification of Acceptance</span>
                  <span className="font-semibold text-emerald-300 font-mono">Via CMT Portal</span>
                </div>
              </div>

              {/* Host Institution accreditation ribbon */}
              <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs text-slate-650">
                <span className="text-[11px] font-display font-medium text-slate-400">
                  Organized by RCSS (Autonomous)
                </span>
                <span className="font-semibold text-amber-300 font-cinzel">
                  NAAC A++ &bull; NIRF #12
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
