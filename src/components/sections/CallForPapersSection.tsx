import React from 'react';
import { ArrowUpRight, FileText, CheckCircle2, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const CallForPapersSection: React.FC = () => {
  return (
    <section
      id="call-for-papers"
      className="bg-[#E8F0F7] text-[#0B1220] border-b border-[#D9DEE5] relative py-20 sm:py-28 lg:py-32"
      aria-labelledby="call-for-papers-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── TOP SECTION ANNOTATION BAR ── */}
        <div className="flex items-center justify-between pb-5 mb-12 sm:mb-16 border-b border-[#D9DEE5]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#2563EB] tabular-nums">05</span>
            <span className="w-6 h-px bg-[#D9DEE5]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#071A33] font-bold">
              Call For Papers
            </span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[#667085] font-semibold">
            Scopus Indexed Proceedings &middot; Microsoft CMT Portal
          </span>
        </div>

        {/* ── ASYMMETRIC 2-COLUMN EDITORIAL COMPOSITION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── LEFT COLUMN: Modern Typography, Deadlines & CTAs (7 cols) ── */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#2563EB]" />
              <span className="text-[11.5px] font-sans uppercase tracking-[0.18em] font-bold text-[#2563EB]">
                Scholarly Submissions Open
              </span>
            </div>

            <h2
              id="call-for-papers-heading"
              className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-heading font-extrabold text-[#071A33] leading-[1.08] tracking-tight mb-6"
            >
              Bring your research into the conversation.
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#0B1220]/80 font-sans leading-relaxed font-normal mb-8 max-w-[620px]">
              Academicians, doctoral scholars, practitioners, policymakers, and graduate students are invited to submit original empirical abstracts and field intervention models. Selected peer-reviewed chapters will be published in <strong>Scopus-indexed</strong> volumes and registered conference proceedings.
            </p>

            {/* Prominent Typography Milestone Panel in White */}
            <div className="bg-white border border-[#D9DEE5] rounded-[20px] p-6 sm:p-7 shadow-subtle mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#D9DEE5]">
                <div className="sm:pr-4">
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#667085] font-bold block mb-1">
                    Abstract Submission Deadline
                  </span>
                  <div className="font-heading text-[1.85rem] sm:text-[2.1rem] font-extrabold text-[#071A33] leading-none mb-1 tabular-nums">
                    25 Sept 2026
                  </div>
                  <span className="text-[12.5px] font-sans text-[#2563EB] font-semibold">
                    Extended abstract via Microsoft CMT
                  </span>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-8">
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#667085] font-bold block mb-1">
                    Publication Proceedings
                  </span>
                  <div className="font-heading text-[1.85rem] sm:text-[2.1rem] font-extrabold text-[#071A33] leading-none mb-1">
                    Scopus Chapters
                  </div>
                  <span className="text-[12.5px] font-sans text-[#2563EB] font-semibold">
                    Double-blind peer-reviewed volume
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Button
                variant="navy"
                size="lg"
                asLink
                href={CONFERENCE_DATA.links.cmtSubmission}
                showArrow
              >
                Submit Paper
              </Button>

              <Button
                variant="white"
                size="lg"
                asLink
                href="/call_for_papers"
                icon={<FileText className="w-4 h-4" />}
              >
                View Guidelines
              </Button>
            </div>
          </div>

          {/* ── RIGHT COLUMN: High-Contrast Navy Feature Card (5 cols) ── */}
          <div className="lg:col-span-5 pt-2 lg:pt-0">
            <div className="bg-[#071A33] text-white rounded-[20px] p-7 sm:p-8 border border-slate-250 shadow-editorial space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-250">
                <span className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-[0.18em]">
                  Review &amp; Track Protocols
                </span>
                <span className="text-[11px] font-sans text-white/70 uppercase tracking-wider font-semibold">
                  8 Sub-Themes
                </span>
              </div>

              <ul className="space-y-4 text-[13px] sm:text-[13.5px] text-white/90 font-sans leading-relaxed">
                <li className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                  <span><strong>Double-Blind Peer Review:</strong> Every abstract is rigorously evaluated by the RCSS scientific board and domain experts.</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                  <span><strong>Presentation Modes:</strong> Concurrent 15-minute oral sessions and interactive research poster exhibition gallery.</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <Award className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                  <span><strong>Best Paper Awards:</strong> Conferred across student, scholar, and practitioner categories for each thematic track.</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                  <span><strong>Microsoft CMT Workflow:</strong> Transparent tracking from initial submission to final camera-ready volume.</span>
                </li>
              </ul>

              {/* Direct PDF Link */}
              <div className="pt-4 border-t border-slate-250">
                <a
                  href={CONFERENCE_DATA.links.brochurePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] font-bold text-[#60A5FA] hover:text-white transition-colors"
                >
                  <span>Download Complete Call for Papers (PDF)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
