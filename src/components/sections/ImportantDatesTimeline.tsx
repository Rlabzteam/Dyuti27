import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ImportantDatesTimeline: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Registration Commences',
      date: '10 August 2026',
      desc: 'Online registration portal opens for student, faculty, and delegate categories.',
      isHighlight: false,
    },
    {
      number: '02',
      title: 'Abstract Submission Deadline',
      date: '25 September 2026',
      desc: 'Deadline for extended abstract submission via the Microsoft CMT portal.',
      isHighlight: true,
    },
    {
      number: '03',
      title: 'Peer Review & Acceptance',
      date: 'Rolling Notifications',
      desc: 'Double-blind peer review outcomes communicated to corresponding authors.',
      isHighlight: false,
    },
    {
      number: '04',
      title: 'Camera-Ready Paper',
      date: 'Prior to Conference',
      desc: 'Final full manuscripts processed for Scopus-indexed volume publication.',
      isHighlight: false,
    },
    {
      number: '05',
      title: 'Conference Days',
      date: 'Rajagiri Valley Campus',
      desc: 'Two days of keynotes, plenary panels, and concurrent technical paper sessions.',
      isHighlight: false,
    },
  ];

  return (
    <section
      id="important-dates"
      className="bg-[#FDFBF7] text-slate-900 border-b border-slate-200 relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="dates-heading"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#071A33]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        {/* ── TOP SECTION ANNOTATION BAR ── */}
        <div className="flex items-center justify-between pb-5 mb-12 sm:mb-16 border-b border-slate-300">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-amber-400 text-slate-950 text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] shadow-md">
            <span>Important Dates &bull; Key Milestones</span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-slate-800 font-bold hidden sm:inline">
            Chronology of Key Deadlines &amp; Milestones
          </span>
        </div>

        {/* ── SECTION HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 lg:mb-20 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-1 bg-[#071A33] rounded-full" />
              <span className="text-[12px] font-sans uppercase tracking-[0.2em] font-black text-[#071A33]">
                Conference Schedule &amp; Milestones
              </span>
            </div>
            <h2
              id="dates-heading"
              className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-heading font-black text-[#071A33] leading-[1.08] tracking-tight m-0"
            >
              The road to DYUTI 2027.
            </h2>

            {/* Signature Bold Multi-Segment Line directly under heading */}
            <div className="flex items-center gap-3 mt-4 mb-2">
              <span className="h-2 w-28 bg-amber-400 rounded-full shadow-[0_0_16px_rgba(247,201,72,0.8)]" />
              <span className="h-2 w-12 bg-[#071A33] rounded-full" />
              <span className="h-2 w-4 bg-[#071A33]/40 rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-slate-800 font-sans font-medium mt-3 max-w-[620px] leading-relaxed">
              Track critical submission windows, peer review notifications, and registration commencement dates leading up to the 26th annual symposium.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/call_for_papers"
              className="group inline-flex items-center gap-2 text-[12px] font-sans uppercase tracking-[0.14em] font-black text-[#071A33] hover:text-amber-600 transition-colors"
            >
              <span>View Extended Abstract Guidelines</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── DESKTOP HORIZONTAL TIMELINE ── */}
        <div className="hidden lg:block relative pt-4 pb-4">
          {/* HIGH VISIBILITY DUAL-LAYER ROAD/RAIL TRACK LINE */}
          <div className="absolute top-[32px] left-10 right-10 h-[8px] bg-[#071A33] rounded-full shadow-md z-0" />
          <div className="absolute top-[34px] left-10 right-10 h-[4px] bg-gradient-to-r from-amber-400 via-amber-300 via-40% to-white/40 rounded-full shadow-[0_0_15px_rgba(247,201,72,0.8)] z-0" />

          <div className="grid grid-cols-5 gap-5 relative z-10">
            {steps.map((step, idx) => {
              const isFirstStep = step.number === '01';
              return (
                <div key={idx} className="flex flex-col group">
                  <div className="flex items-center gap-3 mb-6 pl-1">
                    <div
                      className={`w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center font-mono text-sm font-black transition-all duration-300 group-hover:scale-115 shadow-lg ${
                        isFirstStep
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 shadow-[0_0_25px_rgba(247,201,72,0.75)] border-2 border-white scale-110'
                          : step.isHighlight
                          ? 'bg-[#071A33] text-amber-300 ring-4 ring-[#071A33]/30 border-2 border-amber-400 animate-pulseGlow'
                          : 'bg-[#071A33] text-white border-2 border-slate-600 group-hover:border-amber-400 group-hover:text-amber-300'
                      }`}
                    >
                      {step.number}
                    </div>
                    {isFirstStep ? (
                      <span className="font-mono text-[12px] font-black text-slate-950 uppercase tracking-wider bg-amber-400 px-3 py-1 rounded-full shadow-md inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                        Step 01 &bull; Active
                      </span>
                    ) : (
                      <span className="font-mono text-[11.5px] font-black text-slate-900 uppercase tracking-wider group-hover:text-[#071A33] transition-colors">
                        Step {step.number}
                      </span>
                    )}
                  </div>

                  {/* Unique Asymmetric Curved Leaf Shape Card */}
                  <div
                    className={`rounded-[24px] rounded-tl-[48px] rounded-br-[48px] p-6 transition-all duration-300 flex flex-col justify-between min-h-[235px] border text-white shadow-xl ${
                      isFirstStep
                        ? 'bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] ring-2 ring-amber-400 border-amber-300 shadow-[0_15px_40px_rgba(7,26,51,0.35)] scale-[1.02]'
                        : step.isHighlight
                        ? 'bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] ring-2 ring-amber-400/50 border-white/20 shadow-[#071A33]/25'
                        : 'bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] border-white/20 hover:scale-[1.03]'
                    }`}
                  >
                    <div>
                      <div className="mb-2.5 flex items-center justify-between gap-2">
                        <span className={`inline-block font-mono text-[12px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                          isFirstStep
                            ? 'text-slate-950 bg-amber-400 border-amber-300 shadow-sm font-black'
                            : 'text-amber-300 bg-white/15 border-white/20'
                        }`}>
                          {step.date}
                        </span>
                        {isFirstStep && (
                          <span className="text-[10px] font-sans font-black uppercase tracking-wider text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">
                            Portal Open
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-[1.2rem] text-white font-black leading-snug mb-2 group-hover:text-amber-300 transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-[12.5px] text-slate-100 font-sans font-medium leading-relaxed m-0 mt-3 pt-3 border-t border-white/20">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE VERTICAL TIMELINE ── */}
        <div className="lg:hidden relative pl-8 sm:pl-10 space-y-6 sm:space-y-8">
          {/* HIGH VISIBILITY VERTICAL ROAD/RAIL TRACK */}
          <div className="absolute left-[12px] sm:left-[16px] top-4 bottom-4 w-[8px] bg-[#071A33] rounded-full shadow-md" />
          <div className="absolute left-[14px] sm:left-[18px] top-4 bottom-4 w-[4px] bg-gradient-to-b from-amber-400 via-amber-300 via-50% to-white/40 rounded-full shadow-sm" />

          {steps.map((step, idx) => {
            const isFirstStep = step.number === '01';
            return (
              <div key={idx} className="relative group">
                {/* Stepper Node */}
                <div
                  className={`absolute -left-[32px] sm:-left-[36px] top-4 w-9 h-9 rounded-xl flex items-center justify-center font-mono text-[11px] font-black transition-transform duration-300 group-hover:scale-115 shadow-md ${
                    isFirstStep
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 shadow-lg border-2 border-white scale-110'
                      : step.isHighlight
                      ? 'bg-[#071A33] text-amber-300 ring-4 ring-[#071A33]/25 border-2 border-amber-400'
                      : 'bg-[#071A33] text-white border-2 border-slate-600'
                  }`}
                >
                  {step.number}
                </div>

                {/* Unique Asymmetric Curved Leaf Shape Card */}
                <div
                  className={`rounded-[24px] rounded-tl-[44px] rounded-br-[44px] p-5 sm:p-6 text-white border transition-all duration-300 shadow-xl ${
                    isFirstStep
                      ? 'bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] ring-2 ring-amber-400 border-amber-300'
                      : step.isHighlight
                      ? 'bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] ring-2 ring-amber-400/50 border-white/20'
                      : 'bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-mono text-[12px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full border ${
                      isFirstStep
                        ? 'text-slate-950 bg-amber-400 border-amber-300 font-black'
                        : 'text-amber-300 bg-white/15 border-white/20'
                    }`}>
                      {step.date}
                    </span>
                    {isFirstStep && (
                      <span className="text-[10px] font-sans font-black uppercase tracking-wider text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">
                        Portal Open
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-[1.25rem] sm:text-[1.4rem] text-white font-black leading-snug mb-2 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-[13px] text-slate-100 font-sans font-medium leading-relaxed m-0">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FOOTER ── */}
        <div className="mt-14 pt-8 border-t border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-slate-800 font-sans font-medium">
            <Clock className="w-4 h-4 text-[#071A33] shrink-0" />
            <span>All submission deadlines are set to 23:59 IST (Indian Standard Time).</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-950 font-black">
            <Calendar className="w-3.5 h-3.5 text-[#071A33]" />
            <span>Official Venue: Rajagiri College of Social Sciences, Kalamassery</span>
          </div>
        </div>

      </div>
    </section>
  );
};

