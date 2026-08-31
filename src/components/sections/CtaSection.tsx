import React from 'react';
import { Edit3, FileText, ExternalLink, Sparkles, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#03110f] text-white relative overflow-hidden border-t border-amber-500/20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Call for Papers */}
          <div className="bg-gradient-to-b from-[#082a26]/95 to-[#041513]/95 border-2 border-amber-400/30 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-luxury-md flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3.5 py-1 rounded-full mb-5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Call for Submissions</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mb-4">
                Abstract &amp; Research Submissions
              </h3>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                Original research abstracts and field practice models are invited for Oral and Poster presentation tracks. Selected papers will be reviewed for publication in Scopus-indexed conference book volumes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-slate-250">
              <Button
                variant="gold"
                size="md"
                asLink
                href={CONFERENCE_DATA.links.cmtSubmission}
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Submit via Microsoft CMT
              </Button>
              <Button
                variant="outline"
                size="md"
                asLink
                href="/call_for_papers"
                icon={<FileText className="w-4 h-4" />}
              >
                Author Guidelines
              </Button>
            </div>
          </div>

          {/* Card 2: Conference Registration */}
          <div className="bg-gradient-to-b from-[#082a26]/95 to-[#041513]/95 border-2 border-amber-400/30 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-luxury-md flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 rounded-full mb-5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Delegate Registration</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mb-4">
                Register for DYUTI 2027
              </h3>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                Join international delegates, academic leaders, development practitioners, and research scholars at the prestigious Rajagiri Valley campus. Registration includes full session access, conference kits, and networking lunches.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-slate-250">
              <Button
                variant="gold"
                size="md"
                asLink
                href={CONFERENCE_DATA.links.registrationForm}
                icon={<Edit3 className="w-4 h-4" />}
              >
                Online Registration
              </Button>
              <Button
                variant="outline"
                size="md"
                asLink
                href="/accomodation"
                icon={<Hotel className="w-4 h-4" />}
              >
                Accommodation Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

