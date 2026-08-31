import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';

export const CallForPapers: React.FC = () => {
  const [expandedTheme, setExpandedTheme] = useState<number | null>(null);

  const participantTypes = [
    'Graduate Students',
    'Post Graduate Students',
    'Academicians / Faculty Members',
    'Research Scholars',
    'NGO Delegates',
    'CSR Delegates & Development Practitioners',
  ];

  return (
    <div className="pt-2 sm:pt-3 lg:pt-4 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center pt-4 sm:pt-6 pb-10 sm:pb-14 mb-4">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="w-6 h-0.5 bg-[#071A33]" />
            <span className="text-[12px] font-sans font-extrabold uppercase tracking-[0.22em] text-slate-950">
              Scholarly Submissions &amp; Guidelines
            </span>
            <span className="w-6 h-0.5 bg-[#071A33]" />
          </div>
          <h1 className="font-heading font-black text-slate-950 leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}>
            Call for Papers
            <span className="block text-slate-950 font-black"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.25rem)' }}>
              &amp; Submission Guidelines
            </span>
          </h1>
          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-slate-900 leading-relaxed font-sans font-medium max-w-2xl mx-auto">
            Abstracts based on original empirical research, theoretical inquiries, and innovative practice models are invited for Oral and Poster Presentations across the 8 conference themes.
          </p>
        </div>

        {/* ── MAIN SUBMISSION ACTION BANNER (Deep Navy #071A33 Asymmetric Curved Leaf Shape) ── */}
        <div className="bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] border border-white/20 text-white rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 mb-20 lg:mb-28 shadow-2xl overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center text-[11px] font-sans font-black uppercase tracking-[0.18em] text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-[8px] mb-4 border border-white/30 backdrop-blur-sm shadow-sm">
                Microsoft CMT Portal Active &middot; Deadline: 25 Sept 2026
              </span>
              <h2 className="text-[2.25rem] sm:text-[2.85rem] font-heading font-black text-white mb-3 leading-tight">
                Submit Your Abstract or Full Paper
              </h2>
              <p className="text-slate-100 text-sm sm:text-base m-0 font-sans font-normal leading-relaxed">
                All submissions must be uploaded electronically via the official Microsoft Conference Management Toolkit (CMT). Peer review outcomes will be communicated systematically.
              </p>
            </div>

            <div className="flex flex-wrap gap-3.5 shrink-0">
              <Button
                variant="primary"
                size="lg"
                asLink
                href={CONFERENCE_DATA.links.cmtSubmission}
                target="_blank"
                rel="noopener noreferrer"
                showArrow
              >
                Submit Your Paper
              </Button>
              <Button
                variant="white"
                size="lg"
                asLink
                href={CONFERENCE_DATA.links.brochurePdf}
                target="_blank"
                rel="noopener noreferrer"
                icon={<Download className="w-4 h-4" />}
              >
                Brochure (PDF)
              </Button>
            </div>
          </div>
        </div>

        {/* ── OFFICIAL CONFERENCE THEME BANNER ── */}
        <div className="bg-[#071A33] border border-slate-600 rounded-[24px] p-6 sm:p-8 mb-16 shadow-editorial flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block mb-2">
              Official Conference Identity &amp; Scope
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-2 leading-snug">
              DYUTI 2027 Thematic Framework
            </h3>
            <p className="text-xs sm:text-sm text-slate-100 font-sans font-normal m-0 leading-relaxed">
              Advancing empirical research across community innovation, social inclusion, human rights, and global partnership initiatives.
            </p>
          </div>
          <div className="w-full md:w-auto shrink-0 max-w-[380px] bg-white p-4 rounded-[18px] border border-slate-300 shadow-md">
            <img
              src="/images/dyuti27_theme_banner.png"
              alt="DYUTI 27 — Social Work for Sustainable Development"
              className="w-full h-auto object-contain brightness-100"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── CONFERENCE THEMES (Interactive Accordion Layout) ── */}
        <div className="mb-20 lg:mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-10 border-b border-slate-300">
            <div>
              <span className="text-[11.5px] font-mono font-black uppercase tracking-[0.18em] text-slate-900 block mb-1">
                Thematic Areas
              </span>
              <h3 className="font-heading text-[1.75rem] sm:text-[2.1rem] font-black text-slate-950 m-0">
                Eight Conference Sub-Themes
              </h3>
            </div>
            <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-slate-600 hidden sm:inline font-bold">
              Select a theme below to inspect focus areas
            </span>
          </div>

          <div className="space-y-4">
            {CONFERENCE_DATA.subThemes.map((track, idx) => {
              const trackNum = String(idx + 1).padStart(2, '0');
              const isOpen = expandedTheme === idx;

              return (
                <div
                  key={track.id || idx}
                  className="rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/20 shadow-xl transition-all duration-300 bg-[#071A33] text-white"
                >
                  {/* Accordion Header Bar */}
                  <button
                    type="button"
                    onClick={() => setExpandedTheme(isOpen ? null : idx)}
                    className={`w-full p-6 sm:p-8 flex items-center justify-between text-left transition-colors duration-300 ${
                      isOpen
                        ? 'bg-gradient-to-r from-[#071A33] via-[#0e2a52] to-[#040e1c] border-b border-white/15'
                        : 'bg-[#071A33] hover:bg-[#0c264a]'
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 flex-1 pr-4">
                      {/* Track Number Badge */}
                      <span className="font-mono text-base sm:text-lg font-black px-4 py-2 rounded-2xl bg-white/15 border border-white/25 text-white shrink-0 shadow-sm">
                        {trackNum}
                      </span>

                      <div>
                        <h4 className="font-heading font-black text-lg sm:text-2xl text-white tracking-tight leading-snug">
                          {track.title}
                        </h4>
                        <span className="text-xs font-sans font-bold text-slate-300 mt-1 block">
                          {track.topics.length} Focus Topics Included
                        </span>
                      </div>
                    </div>

                    {/* Toggle Arrow */}
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 transition-transform duration-300">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Body Content */}
                  {isOpen && (
                    <div className="p-6 sm:p-8 bg-gradient-to-br from-[#040e1c] via-[#071A33] to-[#0b2952] animate-fadeIn">
                      <h5 className="text-xs font-mono font-black uppercase tracking-[0.2em] text-white mb-5">
                        Focus Areas &amp; Research Sub-Topics
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                        {track.topics.map((topic, topicIdx) => (
                          <div
                            key={topicIdx}
                            className="flex items-start gap-3.5 p-4 rounded-xl bg-white/10 border border-white/15 text-slate-100 text-sm font-sans font-medium leading-relaxed hover:bg-white/15 transition-colors"
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-white/40 mt-1.5 shrink-0 shadow-xs" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── GUIDELINES FOR ABSTRACT & PUBLICATION (STUNNING ASYMMETRIC CURVED LEAF CARDS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-20 lg:mb-28 items-stretch">

          {/* Submission Guidelines (6 cols - Asymmetric Curved Leaf Shape) */}
          <div className="lg:col-span-6 rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/20 flex flex-col justify-between overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div>
                <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] mb-4 shadow-md">
                  <span>Submission Protocol</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight m-0">
                  Guidelines for Abstract
                </h3>
              </div>

              <div className="w-16 h-1 bg-white/40 rounded-full" />

              {/* 4 Numbered Steps */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15 transition-all hover:bg-white/15">
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white shrink-0 shadow-sm">
                    01
                  </span>
                  <span className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed">
                    The abstract should be <strong className="text-white font-black">within 300 words</strong> of text including the title and keywords (MS Word document).
                  </span>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15 transition-all hover:bg-white/15">
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white shrink-0 shadow-sm">
                    02
                  </span>
                  <span className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed">
                    The text should be arranged according to the following headlines: <strong className="text-white font-black">Objectives, Design, Model, Result, and Conclusion</strong>.
                  </span>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15 transition-all hover:bg-white/15">
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white shrink-0 shadow-sm">
                    03
                  </span>
                  <span className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed">
                    The abstract&apos;s title page must include the paper title, Author&apos;s full name, academic designation, institutional affiliation, mailing address, contact phone, and email ID.
                  </span>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15 transition-all hover:bg-white/15">
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white shrink-0 shadow-sm">
                    04
                  </span>
                  <span className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed">
                    It is essential that you specify the <strong className="text-white font-black">Theme and Subtheme</strong> to which your abstract pertains when submitting it.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Publication Opportunities (6 cols - Asymmetric Inverted Leaf Shape) */}
          <div className="lg:col-span-6 rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] text-white p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/20 flex flex-col justify-between overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div>
                <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] mb-4 shadow-md">
                  <span>Peer Review &amp; Formats</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight m-0">
                  Publication &amp; Presentation Formats
                </h3>
              </div>

              <div className="w-16 h-1 bg-white/40 rounded-full" />

              {/* Scopus Highlight Box */}
              <div className="p-6 rounded-[20px] bg-white/10 text-white shadow-xl border border-white/20">
                <p className="text-xs sm:text-sm font-sans font-extrabold leading-relaxed m-0 text-white">
                  Selected papers presented at the conference will be published as <span className="underline decoration-white/40 underline-offset-4 font-black">Scopus-indexed book chapters / peer-reviewed conference volumes</span> following double-blind peer review.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
                  <span className="text-white block font-mono text-xs uppercase tracking-wider font-black">
                    Presentation Formats
                  </span>
                  <p className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed m-0">
                    Oral Paper Presentations (15 mins + Q&amp;A) &amp; Poster Presentations with dedicated display gallery.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/10 border border-white/15">
                  <p className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed m-0">
                    All submissions undergo rigorous double-blind peer review by an international scientific review panel.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── TYPES OF PARTICIPANTS ── */}
        <div className="mb-16 lg:mb-20 p-8 sm:p-10 rounded-[20px] bg-[#071A33] border border-slate-600 shadow-editorial">
          <div className="mb-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-amber-400 block mb-1">
              Delegates &amp; Attendees
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-white font-black m-0">
              Eligible Participant Categories
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-sans m-0 mt-0.5">
              Scholars and practitioners eligible to register and present papers
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {participantTypes.map((type, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[12px] bg-[#0a2345] border border-slate-600 text-center font-sans text-xs sm:text-sm font-bold text-white shadow-sm flex items-center justify-center hover:border-amber-400 hover:bg-[#12315e] transition-all cursor-default"
              >
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 01. SUBMISSION DEADLINES & MILESTONES (FULL WIDTH CARDS) ── */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-400">
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-[0.18em] text-slate-900 block mb-1">
                Timeline &amp; Dates
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-slate-950 font-black m-0">
                Submission Deadlines &amp; Key Milestones
              </h3>
              <p className="text-xs sm:text-sm text-slate-900 font-sans font-medium m-0 mt-0.5">
                Critical timeline for abstract review, author acceptance, and conference attendance
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center text-[11px] font-mono uppercase tracking-wider text-slate-950 bg-slate-200 border border-slate-400 px-3 py-1 rounded-[6px] font-black">
              IST (UTC+05:30)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1: Abstract Submission */}
            <div className="bg-[#071A33] border-2 border-amber-400 rounded-[18px] p-6 shadow-editorial flex flex-col justify-between relative overflow-hidden group hover:border-amber-300 transition-all">
              <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-mono uppercase font-black px-3 py-1 rounded-bl-[10px]">
                Active Call
              </div>
              <div>
                <span className="font-mono text-xs font-black text-amber-400 uppercase tracking-wider block mb-2">
                  Stage 01
                </span>
                <h4 className="font-heading text-lg text-white font-bold mb-2">
                  Last Date of Abstract Submission
                </h4>
                <p className="text-xs text-slate-200 font-sans leading-relaxed mb-4">
                  Original empirical abstracts (max 300 words) submitted via Microsoft CMT.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Deadline</span>
                <span className="font-mono text-sm font-black text-slate-950 bg-amber-400 border border-amber-300 px-2.5 py-1 rounded-[6px]">
                  25 Sept 2026
                </span>
              </div>
            </div>

            {/* Step 2: Acceptance Notification */}
            <div className="bg-[#071A33] border border-slate-600 rounded-[18px] p-6 shadow-editorial flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Stage 02
                </span>
                <h4 className="font-heading text-lg text-white font-bold mb-2">
                  Notification of Acceptance
                </h4>
                <p className="text-xs text-slate-200 font-sans leading-relaxed mb-4">
                  Double-blind peer review outcomes communicated directly to corresponding authors.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Channel</span>
                <span className="font-mono text-xs font-black text-white bg-white/15 border border-white/25 px-2.5 py-1 rounded-[6px]">
                  CMT Portal
                </span>
              </div>
            </div>

            {/* Step 3: Registration Commencement */}
            <div className="bg-[#071A33] border border-slate-600 rounded-[18px] p-6 shadow-editorial flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Stage 03
                </span>
                <h4 className="font-heading text-lg text-white font-bold mb-2">
                  Registration Commencement
                </h4>
                <p className="text-xs text-slate-200 font-sans leading-relaxed mb-4">
                  Delegate pass booking and author registration portals formally open.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Starts</span>
                <span className="font-mono text-xs font-black text-white bg-white/15 border border-white/25 px-2.5 py-1 rounded-[6px]">
                  10 Aug 2026
                </span>
              </div>
            </div>

            {/* Step 4: Conference Days */}
            <div className="bg-[#071A33] border border-slate-600 rounded-[18px] p-6 shadow-editorial flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Stage 04
                </span>
                <h4 className="font-heading text-lg text-white font-bold mb-2">
                  Conference Days
                </h4>
                <p className="text-xs text-slate-200 font-sans leading-relaxed mb-4">
                  2-day international symposium at Rajagiri College, Kalamassery campus.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Venue</span>
                <span className="font-mono text-xs font-black text-white bg-white/15 border border-white/25 px-2.5 py-1 rounded-[6px]">
                  07–08 Jan 2027
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 02. REGISTRATION FEES & INCLUSIONS (LUXURY CARDS) ── */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-400">
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-[0.18em] text-slate-900 block mb-1">
                Passes &amp; Pricing
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-slate-950 font-black m-0">
                Registration Fees &amp; Delegate Passes
              </h3>
              <p className="text-xs sm:text-sm text-slate-900 font-sans font-medium m-0 mt-0.5">
                Select your delegate category to participate in paper presentation tracks and plenaries
              </p>
            </div>
          </div>

          {/* 3 Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6">
            {/* Tier 1: Students / Scholars */}
            <div className="bg-[#071A33] rounded-[20px] p-7 sm:p-8 border border-slate-600 shadow-editorial flex flex-col justify-between hover:border-slate-400 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                    Tier 01
                  </span>
                  <span className="text-[10px] font-mono uppercase font-bold text-white bg-white/15 border border-white/25 px-2.5 py-0.5 rounded-[6px]">
                    Scholar Pass
                  </span>
                </div>
                <h4 className="font-heading text-xl text-white font-bold mb-2">
                  Students / Research Scholars
                </h4>
                <p className="text-xs text-slate-200 font-sans leading-relaxed mb-6">
                  For graduate students, postgraduates, and full-time PhD research scholars.
                </p>
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-700">
                  <span className="font-heading text-4xl text-white font-black tracking-tight">
                    ₹ 750
                  </span>
                  <span className="text-xs text-slate-300 font-sans font-medium">/ delegate</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-100 font-sans font-medium mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Access to all technical presentation tracks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Author Certificate of Presentation</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Executive lunch &amp; refreshments on both days</span>
                  </li>
                </ul>
              </div>
              <a
                href={CONFERENCE_DATA.links.registrationForm}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-[12px] bg-white hover:bg-amber-400 text-slate-950 font-sans text-xs font-black text-center border border-white transition-all block"
              >
                Register as Student / Scholar &rarr;
              </a>
            </div>

            {/* Tier 2: Academicians / Faculty (Featured) */}
            <div className="bg-[#071A33] rounded-[20px] p-7 sm:p-8 border-2 border-amber-400 shadow-editorial flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-mono uppercase font-black px-3 py-1 rounded-bl-[10px]">
                Popular
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase font-black text-amber-400 tracking-wider">
                    Tier 02
                  </span>
                  <span className="text-[10px] font-mono uppercase font-black text-slate-950 bg-amber-400 border border-amber-300 px-2.5 py-0.5 rounded-[6px]">
                    Faculty Pass
                  </span>
                </div>
                <h4 className="font-heading text-xl text-white font-bold mb-2">
                  Academicians / Faculty Members
                </h4>
                <p className="text-xs text-slate-200 font-sans leading-relaxed mb-6">
                  For professors, associate faculty, lecturers, and academic researchers.
                </p>
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-700">
                  <span className="font-heading text-4xl text-white font-black tracking-tight">
                    ₹ 1,000
                  </span>
                  <span className="text-xs text-slate-300 font-sans font-medium">/ delegate</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-100 font-sans font-medium mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Access to all keynotes, plenaries &amp; paper tracks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Official Conference Kit, badge &amp; certificate</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Executive lunch &amp; banquet tea on both days</span>
                  </li>
                </ul>
              </div>
              <a
                href={CONFERENCE_DATA.links.registrationForm}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-[12px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans text-xs font-black text-center shadow-lg transition-all block"
              >
                Register as Faculty Member &rarr;
              </a>
            </div>

            {/* Tier 3: NGO & CSR Delegates */}
            <div className="bg-[#071A33] rounded-[20px] p-7 sm:p-8 border border-slate-600 shadow-editorial flex flex-col justify-between hover:border-slate-400 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                    Tier 03
                  </span>
                  <span className="text-[10px] font-mono uppercase font-bold text-white bg-white/15 border border-white/25 px-2.5 py-0.5 rounded-[6px]">
                    Industry Pass
                  </span>
                </div>
                <h4 className="font-heading text-xl text-white font-bold mb-2">
                  NGO &amp; CSR Delegates
                </h4>
                <p className="text-xs text-slate-200 font-sans leading-relaxed mb-6">
                  For development practitioners, corporate sustainability leaders, and NGO heads.
                </p>
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-700">
                  <span className="font-heading text-4xl text-white font-black tracking-tight">
                    ₹ 1,500
                  </span>
                  <span className="text-xs text-slate-300 font-sans font-medium">/ delegate</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-100 font-sans font-medium mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Access to plenaries, industry roundtables &amp; tracks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Exclusive delegate folder, kit &amp; formal certificate</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>Executive buffet lunch on both conference days</span>
                  </li>
                </ul>
              </div>
              <a
                href={CONFERENCE_DATA.links.registrationForm}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-[12px] bg-white hover:bg-amber-400 text-slate-950 font-sans text-xs font-black text-center border border-white transition-all block"
              >
                Register as NGO / CSR Delegate &rarr;
              </a>
            </div>
          </div>

          {/* Unified Inclusions Banner */}
          <div className="p-6 rounded-[16px] bg-[#0a2345] border border-slate-600 text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
            <strong className="font-black text-amber-400 block mb-1">Every Registration Pass Includes:</strong>
            <span>Conference kit, official delegate badge, verified certificate of participation/presentation, executive buffet lunch on both conference days (7 &amp; 8 January 2027), morning and evening tea/refreshments, and unrestricted entry to all plenaries and thematic paper tracks.</span>
          </div>
        </div>

        {/* ── 03. MODE OF PAYMENT & OFFICIAL RCSS BANK DETAILS ── */}
        <div className="rounded-[24px] p-8 sm:p-12 bg-[#071A33] border border-slate-600 shadow-editorial mb-16 lg:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-700">
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-[0.18em] text-amber-400 block mb-1">
                Banking Coordinates
              </span>
              <h4 className="font-heading text-2xl sm:text-3xl text-white font-black m-0">
                Mode of Payment (NEFT / RTGS Bank Transfer)
              </h4>
              <span className="text-xs font-sans text-slate-200 uppercase tracking-wider font-bold">
                Official RCSS Conference Bank Account &middot; Verified Gateway
              </span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-[8px] font-black self-start sm:self-auto">
              Direct Wire &middot; Instant Receipt
            </span>
          </div>

          {/* 4 Clean Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm mb-8">
            <div className="p-5 rounded-[16px] bg-[#0a2345] border border-slate-600 flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold tracking-wider block mb-1">
                  Account Name
                </span>
                <strong className="text-white font-sans font-extrabold text-sm block leading-snug">
                  {CONFERENCE_DATA.bankDetails.accountName}
                </strong>
              </div>
            </div>

            <div className="p-5 rounded-[16px] bg-[#0a2345] border border-slate-600 flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold tracking-wider block mb-1">
                  Account Number
                </span>
                <strong className="text-white font-mono font-extrabold text-base block tracking-tight">
                  {CONFERENCE_DATA.bankDetails.accountNumber}
                </strong>
              </div>
            </div>

            <div className="p-5 rounded-[16px] bg-[#0a2345] border border-slate-600 flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold tracking-wider block mb-1">
                  Bank &amp; Branch
                </span>
                <strong className="text-white font-sans font-extrabold text-sm block leading-snug">
                  {CONFERENCE_DATA.bankDetails.bank}
                </strong>
              </div>
            </div>

            <div className="p-5 rounded-[16px] bg-[#0a2345] border border-amber-400/50 flex flex-col justify-between hover:border-amber-400 transition-all">
              <div>
                <span className="text-[11px] text-amber-400 font-sans uppercase font-bold tracking-wider block mb-1">
                  IFSC / NEFT Code
                </span>
                <strong className="text-amber-400 font-mono font-black text-base block tracking-tight">
                  {CONFERENCE_DATA.bankDetails.ifsc}
                </strong>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-200 font-sans font-medium m-0">
              * Please preserve the transaction UTR number or transfer receipt screenshot to upload during online delegate registration.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="primary"
                size="md"
                asLink
                href={CONFERENCE_DATA.links.registrationForm}
                target="_blank"
                rel="noopener noreferrer"
                showArrow
              >
                Proceed to Delegate Registration
              </Button>
            </div>
          </div>
        </div>

        {/* ── MICROSOFT CMT ACKNOWLEDGEMENT ── */}
        <div className="rounded-[16px] p-6 sm:p-8 bg-[#071A33] border border-slate-600 shadow-editorial mb-16 lg:mb-20">
          <h4 className="font-heading text-lg text-white mb-1 font-black">Microsoft CMT Acknowledgement</h4>
          <p className="text-xs text-slate-200 leading-relaxed font-sans font-normal m-0">
            The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
          </p>
        </div>

        {/* ── RAJAGIRI INTERNATIONAL EXCHANGE PROGRAMME - PARTNERING UNIVERSITIES ── */}
        <div className="rounded-[24px] p-8 sm:p-12 lg:p-14 bg-[#071A33] border border-slate-600 shadow-editorial">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-amber-400" />
              <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400">
                Global Academic Alliances
              </span>
              <span className="w-5 h-0.5 bg-amber-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight m-0 leading-tight">
              Rajagiri International Exchange Programme - Partnering Universities
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-sans font-normal mt-3 max-w-2xl mx-auto leading-relaxed">
              Fostering global scholarship, cross-border research, student exchanges, and joint initiatives across premier partner universities worldwide.
            </p>
          </div>

          {/* Smooth Infinite Marquee Carousel */}
          <div className="relative overflow-hidden w-full py-4 -mx-4 sm:-mx-8 px-4 sm:px-8">
            {/* Left and right gradient fade masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#071A33] via-[#071A33]/80 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#071A33] via-[#071A33]/80 to-transparent z-10" />

            {/* Continuous Marquee Track */}
            <div className="animate-marquee flex items-center gap-5 sm:gap-6">
              {[
                { src: '/images/nyu_logo.png', alt: 'New York University (NYU)' },
                { src: '/images/melbourne_logo.png', alt: 'The University of Melbourne' },
                { src: 'https://dyuti.in/assets/images/york.jpg', alt: 'York University' },
                { src: 'https://dyuti.in/assets/images/lgo/13.png', alt: 'Partner University 13' },
                { src: 'https://dyuti.in/assets/images/lgo/12.png', alt: 'Partner University 12' },
                { src: 'https://dyuti.in/assets/images/lgo/11.png', alt: 'Partner University 11' },
                { src: 'https://dyuti.in/assets/images/lgo/10.png', alt: 'Partner University 10' },
                { src: 'https://dyuti.in/assets/images/lgo/9.png', alt: 'Partner University 9' },
                { src: 'https://dyuti.in/assets/images/lgo/8.png', alt: 'Partner University 8' },
                { src: 'https://dyuti.in/assets/images/lgo/7.png', alt: 'Partner University 7' },
                { src: 'https://dyuti.in/assets/images/lgo/6.png', alt: 'Partner University 6' },
                { src: 'https://dyuti.in/assets/images/lgo/5.png', alt: 'Partner University 5' },
                { src: 'https://dyuti.in/assets/images/lgo/4.png', alt: 'Partner University 4' },
                { src: 'https://dyuti.in/assets/images/lgo/3.png', alt: 'Partner University 3' },
                { src: 'https://dyuti.in/assets/images/lgo/2.png', alt: 'Partner University 2' },
                { src: 'https://dyuti.in/assets/images/lgo/1.png', alt: 'Partner University 1' },
              ].map((logo, idx) => (
                <div
                  key={`marquee-a-${idx}`}
                  className="w-[180px] sm:w-[210px] h-[85px] sm:h-[95px] px-5 py-3 rounded-[14px] bg-white border border-slate-200 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 group shrink-0"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain filter-none opacity-100"
                    loading="lazy"
                  />
                </div>
              ))}

              {/* Duplicate for infinite loop */}
              {[
                { src: '/images/nyu_logo.png', alt: 'New York University (NYU)' },
                { src: '/images/melbourne_logo.png', alt: 'The University of Melbourne' },
                { src: 'https://dyuti.in/assets/images/lgo/13.png', alt: 'Partner University 13' },
                { src: 'https://dyuti.in/assets/images/lgo/12.png', alt: 'Partner University 12' },
                { src: 'https://dyuti.in/assets/images/lgo/11.png', alt: 'Partner University 11' },
                { src: 'https://dyuti.in/assets/images/lgo/10.png', alt: 'Partner University 10' },
                { src: 'https://dyuti.in/assets/images/lgo/9.png', alt: 'Partner University 9' },
                { src: 'https://dyuti.in/assets/images/lgo/8.png', alt: 'Partner University 8' },
                { src: 'https://dyuti.in/assets/images/lgo/7.png', alt: 'Partner University 7' },
                { src: 'https://dyuti.in/assets/images/lgo/6.png', alt: 'Partner University 6' },
                { src: 'https://dyuti.in/assets/images/lgo/5.png', alt: 'Partner University 5' },
                { src: 'https://dyuti.in/assets/images/lgo/4.png', alt: 'Partner University 4' },
                { src: 'https://dyuti.in/assets/images/lgo/3.png', alt: 'Partner University 3' },
                { src: 'https://dyuti.in/assets/images/lgo/2.png', alt: 'Partner University 2' },
                { src: 'https://dyuti.in/assets/images/lgo/1.png', alt: 'Partner University 1' },
              ].map((logo, idx) => (
                <div
                  key={`marquee-b-${idx}`}
                  className="w-[180px] sm:w-[210px] h-[85px] sm:h-[95px] px-5 py-3 rounded-[14px] bg-white border border-slate-200 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 group shrink-0"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain filter-none opacity-100"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

