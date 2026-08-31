import React from 'react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const ConferenceCTA: React.FC = () => {
  return (
    <section
      id="call-for-papers"
      className="py-24 sm:py-32 lg:py-36 bg-[#071A33] text-white border-b border-slate-250 relative overflow-hidden"
      aria-labelledby="cfp-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-14 sm:mb-20 border-b border-slate-250 text-xs font-sans uppercase tracking-[0.18em] text-white/60">
          <div className="flex items-center gap-3">
            <span className="text-[#93C5FD] font-mono font-bold">06</span>
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white">CALL FOR PAPERS</span>
          </div>
          <span>Abstract Deadline: 25 September 2026</span>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Headline & Conference Discourse */}
          <div className="lg:col-span-7">
            <span className="text-xs font-sans uppercase tracking-[0.16em] text-[#93C5FD] font-bold block mb-4">
              Scopus Indexed Proceedings &bull; Peer Reviewed
            </span>

            <h2
              id="cfp-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal italic text-white leading-[1.08] mb-8"
            >
              Share your research with the world.
            </h2>

            <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-xl mb-10 font-normal">
              Academicians, practitioners, PhD research scholars, and students are invited to submit original, empirical, and practice-based extended abstracts across the 8 thematic conference tracks.
            </p>

            {/* Quick Publication Feature List */}
            <div className="space-y-3.5 mb-10 text-xs sm:text-sm text-white/85 font-sans">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#93C5FD] shrink-0" />
                <span>Double-blind peer review by International Academic Committee</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#93C5FD] shrink-0" />
                <span>Selected high-quality papers published as Scopus-indexed book chapters</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#93C5FD] shrink-0" />
                <span>Best Paper Awards conferred during the valedictory session</span>
              </div>
            </div>

            {/* Pill CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="white"
                size="md"
                asLink
                href={CONFERENCE_DATA.links.cmtSubmission}
                showArrow
              >
                Submit Your Paper
              </Button>

              <Button
                variant="outline"
                size="md"
                asLink
                href="/call_for_papers"
                className="text-white border-white/40 hover:bg-white hover:text-[#071A33]"
              >
                View Guidelines
              </Button>

              <a
                href={CONFERENCE_DATA.links.brochurePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs font-sans uppercase tracking-[0.14em] font-semibold text-[#93C5FD] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brochure (PDF)</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Key Dates Box & Submissions Portal Info */}
          <div className="lg:col-span-5 bg-[#F5F3EF] border border-slate-250 p-8 rounded-container backdrop-blur-xs shadow-editorial">
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] text-[#93C5FD] font-bold mb-6">
              <FileText className="w-4 h-4" />
              <span>Submission Information</span>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between py-3 border-b border-slate-250">
                <span className="text-white/70">Abstract Deadline</span>
                <strong className="text-white font-mono">25 September 2026</strong>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-250">
                <span className="text-white/70">Review Outcomes</span>
                <span className="text-white font-mono">Rolling CMT Notifications</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-250">
                <span className="text-white/70">Registration Begins</span>
                <strong className="text-white font-mono">10 August 2026</strong>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-250">
                <span className="text-white/70">Conference Days</span>
                <span className="text-white">Rajagiri Valley Campus</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-white/70">Submission Portal</span>
                <span className="text-[#93C5FD] font-semibold">Microsoft CMT</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-250 text-[11px] text-white/60 leading-relaxed">
              * Extended abstracts must be 250–300 words with 4–5 keywords submitted in .docx format via Microsoft CMT.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
