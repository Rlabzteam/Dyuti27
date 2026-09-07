import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';

export const CallForPapers: React.FC = () => {
  const participantTypes = [
    'Graduate Students',
    'Post Graduate Students',
    'Academicians',
    'Research Scholars',
    'NGO Delegates',
    'CSR Delegates',
    'Govt Policy Makers',
  ];

  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-[#071A33]" />
            <span className="text-sm sm:text-[15px] font-sans font-extrabold uppercase tracking-[0.24em] text-slate-700">
              Scholarly Submissions &amp; Guidelines
            </span>
            <span className="w-8 h-0.5 bg-[#071A33]" />
          </div>

          <h1 className="font-heading font-extrabold text-[#071A33] leading-none tracking-tight mb-6 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Call for Papers
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              &amp; Submission Guidelines
            </span>
          </h1>

          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-8" />

          {/* Invitation Statement & Presentation Formats */}
          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-slate-800 font-sans font-medium leading-relaxed mb-6">
              Abstracts based on original research and practice models are invited for the following
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 mb-8">
              <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#071A33] text-white font-sans text-sm sm:text-base font-bold shadow-lg border border-slate-700/30">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                <span>Oral Presentation</span>
              </div>
              <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#071A33] text-white font-sans text-sm sm:text-base font-bold shadow-lg border border-slate-700/30">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                <span>Poster Presentation</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONFERENCE BROCHURE BANNER (Matching Submit Your Abstract Banner Design) ── */}
        <div className="bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] border border-white/20 text-white rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 mb-16 lg:mb-20 shadow-2xl overflow-hidden relative">
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center text-[11px] font-sans font-black uppercase tracking-[0.18em] text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-[8px] mb-4 border border-white/30 backdrop-blur-sm shadow-sm">
                Official Guide &middot; Comprehensive Overview
              </span>
              <h2 className="text-[2.25rem] sm:text-[2.85rem] font-heading font-black text-white mb-3 leading-tight">
                Conference Brochure
              </h2>
              <p className="text-slate-100 text-sm sm:text-base m-0 font-sans font-normal leading-relaxed">
                Access the official conference brochure for detailed session schedules, thematic frameworks, keynote speakers, and submission guidelines. <span className="text-slate-300 text-xs sm:text-sm block mt-1.5 font-medium">(link for the brochure will be provided separately)</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3.5 shrink-0">
              <Button
                variant="primary"
                size="lg"
                asLink
                href="https://dyuti.in/pdf/Dyuti%202026%20International%20Conference%20Brochure_V8.pdf"
                target="_blank"
                rel="noopener noreferrer"
                icon={<Download className="w-5 h-5" />}
                className="font-sans font-black uppercase tracking-wider text-xs sm:text-sm shadow-xl"
              >
                Click here to View/ Download
              </Button>
            </div>
          </div>
        </div>

        {/* ── MAIN SUBMISSION ACTION BANNER (Deep Navy #071A33 Asymmetric Curved Leaf Shape) ── */}
        <div className="bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] border border-white/20 text-white rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 mb-20 lg:mb-28 shadow-2xl overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10 mb-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center text-[11px] font-sans font-black uppercase tracking-[0.18em] text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-[8px] mb-4 border border-white/30 backdrop-blur-sm shadow-sm">
                Submissions Open &middot; Deadline: 25 Sept 2026
              </span>
              <h2 className="text-[2.25rem] sm:text-[2.85rem] font-heading font-black text-white mb-3 leading-tight">
                Submit Your Abstract or Full Paper
              </h2>
              <p className="text-slate-100 text-sm sm:text-base m-0 font-sans font-normal leading-relaxed">
                All submissions must be uploaded electronically via the official Microsoft CMT submission portal. Peer review outcomes will be communicated systematically.
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
                Click Here to Submit Abstract / Full Paper
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

          {/* Acknowledgement Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm relative z-10">
            <span className="text-xs font-mono uppercase tracking-[0.18em] text-amber-300 font-black block mb-2">
              Acknowledgement
            </span>
            <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed m-0 font-medium">
              The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
            </p>
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
                    The abstract should be <strong className="text-white font-black">within 300 words</strong> of text, including the title and keywords (MS Word Doc.)
                  </span>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15 transition-all hover:bg-white/15">
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white shrink-0 shadow-sm">
                    02
                  </span>
                  <span className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed">
                    The text should be arranged according to the following headlines: <strong className="text-white font-black">Objectives, Design, Model, Results, and Conclusion</strong>.
                  </span>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15 transition-all hover:bg-white/15">
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white shrink-0 shadow-sm">
                    03
                  </span>
                  <span className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed">
                    The abstract&apos;s title page should include the paper&apos;s title, Author&apos;s name, designation, institution affiliation, mailing address, contact number and email id.
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
                  Selected papers presented at the conference will be considered for publication in <span className="underline decoration-white/40 underline-offset-4 font-black">Scopus-index book chapters</span> after the due review process.
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

                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
                  <span className="text-amber-300 block font-mono text-xs uppercase tracking-wider font-black">
                    Acknowledgement
                  </span>
                  <p className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed m-0">
                    The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── TYPES OF PARTICIPANTS (Asymmetric Curved Leaf Shape Card in Deep Navy Gradient) ── */}
        <div className="mb-20 lg:mb-28 p-8 sm:p-12 lg:p-14 rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="mb-8 relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] mb-3 shadow-md">
              <span>Delegates &amp; Attendees</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-white font-black m-0">
              Type of Participants
            </h3>
            <p className="text-xs sm:text-sm text-slate-100 font-sans font-medium m-0 mt-1">
              Scholars, practitioners, and policymakers eligible to register and present papers
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5 relative z-10">
            {participantTypes.map((type, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl rounded-tr-3xl rounded-bl-3xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-center font-sans text-xs sm:text-[13px] font-bold text-white shadow-md flex items-center justify-center transition-all cursor-default backdrop-blur-sm leading-tight"
              >
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 01. IMPORTANT DATES & DEADLINES (FULL WIDTH CARDS) ── */}
        <div className="mb-20 lg:mb-28">
          <div className="mb-8 pb-4 border-b border-slate-400 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-[0.18em] text-slate-900 block mb-1">
                Timeline &amp; Dates
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-slate-950 font-black m-0">
                Important Dates &amp; Deadlines
              </h3>
              <p className="text-xs sm:text-sm text-slate-900 font-sans font-medium m-0 mt-0.5">
                Critical timeline for abstract review, author acceptance, and conference attendance
              </p>
            </div>
            <div>
              <Button
                variant="primary"
                size="md"
                asLink
                href={CONFERENCE_DATA.links.cmtSubmission}
                target="_blank"
                rel="noopener noreferrer"
                showArrow
                className="font-sans font-black uppercase tracking-wider text-xs sm:text-sm"
              >
                Click Here to Submit Abstract / Full Paper
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Abstract Submission (Curved Leaf Shape) */}
            <div className="rounded-[24px] rounded-tl-[44px] rounded-br-[44px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-7 sm:p-8 shadow-2xl border-2 border-amber-400 relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all">
              <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-mono uppercase font-black px-3.5 py-1.5 rounded-bl-xl shadow-md">
                Active Call
              </div>
              <div>
                <span className="font-mono text-xs font-black text-amber-400 uppercase tracking-wider block mb-2">
                  Stage 01
                </span>
                <h4 className="font-heading text-lg text-white font-bold mb-2">
                  Last Date of Abstract Submission
                </h4>
                <p className="text-xs text-slate-100 font-sans leading-relaxed mb-4 font-medium">
                  Original research and practice model abstracts (max 300 words) submitted online.
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Deadline</span>
                <span className="font-mono text-sm font-black text-slate-950 bg-amber-400 border border-amber-300 px-3 py-1 rounded-[8px] shadow-sm">
                  25 September 2026
                </span>
              </div>
            </div>

            {/* Step 2: Acceptance Notification (Inverted Leaf Shape) */}
            <div className="rounded-[24px] rounded-tr-[44px] rounded-bl-[44px] bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] text-white p-7 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                  Stage 02
                </span>
                <h4 className="font-heading text-lg text-white font-bold mb-2">
                  Notification of Acceptance
                </h4>
                <p className="text-xs text-slate-100 font-sans leading-relaxed mb-4 font-medium">
                  Double-blind peer review outcomes communicated directly to corresponding authors.
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Channel</span>
                <span className="font-mono text-xs font-black text-white bg-white/15 border border-white/25 px-3 py-1 rounded-[8px]">
                  Online Portal
                </span>
              </div>
            </div>

            {/* Step 3: Registration Commencement (Curved Leaf Shape) */}
            <div className="rounded-[24px] rounded-tl-[44px] rounded-br-[44px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-7 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                  Stage 03
                </span>
                <h4 className="font-heading text-lg text-white font-bold mb-2">
                  Registration Commencement
                </h4>
                <p className="text-xs text-slate-100 font-sans leading-relaxed mb-4 font-medium">
                  Delegate pass booking and author registration portals formally open.
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Starts</span>
                <span className="font-mono text-xs font-black text-white bg-white/15 border border-white/25 px-3 py-1 rounded-[8px]">
                  10 Aug 2026
                </span>
              </div>
            </div>

            {/* Step 4: Conference Days (Inverted Leaf Shape) */}
            <div className="rounded-[24px] rounded-tr-[44px] rounded-bl-[44px] bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] text-white p-7 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all">
              <div>
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                  Stage 04
                </span>
                <h4 className="font-heading text-lg text-white font-bold mb-2">
                  Conference Days
                </h4>
                <p className="text-xs text-slate-100 font-sans leading-relaxed mb-4 font-medium">
                  2-day national symposium at Rajagiri College, Kalamassery campus.
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Venue</span>
                <span className="font-mono text-xs font-black text-white bg-white/15 border border-white/25 px-3 py-1 rounded-[8px]">
                  07–08 Jan 2027
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 02. REGISTRATION FEES & INCLUSIONS (LUXURY CARDS) ── */}
        <div className="mb-20 lg:mb-28">
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

          {/* 2 Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* Tier 1: Students / Scholars (Curved Leaf Shape) */}
            <div className="rounded-[28px] sm:rounded-[32px] rounded-tl-[52px] rounded-br-[52px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-8 sm:p-9 shadow-2xl border border-white/20 flex flex-col justify-between hover:border-white/40 transition-all group relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase font-black text-amber-300 tracking-wider">
                    Tier 01
                  </span>
                  <span className="text-[10px] font-mono uppercase font-bold text-white bg-white/15 border border-white/25 px-3 py-1 rounded-full">
                    Scholar Pass
                  </span>
                </div>
                <h4 className="font-heading text-xl sm:text-2xl text-white font-black mb-2">
                  Students / Research Scholars
                </h4>
                <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed mb-6 font-medium">
                  For graduate students, postgraduates, and full-time PhD research scholars.
                </p>
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-white/15">
                  <span className="font-heading text-4xl sm:text-5xl text-white font-black tracking-tight">
                    ₹ 750
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300 font-sans font-medium">/ delegate</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-100 font-sans font-medium mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-xs" />
                    <span>Lunch on both conference days</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-xs" />
                    <span>Access to all conference session</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-amber-400 text-slate-950 font-sans text-xs sm:text-sm font-black text-center border border-white transition-all block shadow-md"
              >
                Register as Student / Scholar &rarr;
              </Link>
            </div>

            {/* Tier 2: Academicians / Faculty (Featured - Inverted Leaf Shape) */}
            <div className="rounded-[28px] sm:rounded-[32px] rounded-tr-[52px] rounded-bl-[52px] bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] text-white p-8 sm:p-9 shadow-2xl border-2 border-amber-400 flex flex-col justify-between relative overflow-hidden group hover:border-amber-300 transition-all">
              <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-mono uppercase font-black px-3.5 py-1.5 rounded-bl-xl shadow-md">
                Popular
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase font-black text-amber-300 tracking-wider">
                    Tier 02
                  </span>
                  <span className="text-[10px] font-mono uppercase font-black text-slate-950 bg-amber-400 border border-amber-300 px-3 py-1 rounded-full shadow-xs">
                    Faculty Pass
                  </span>
                </div>
                <h4 className="font-heading text-xl sm:text-2xl text-white font-black mb-2">
                  Academicians / Faculty Members
                </h4>
                <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed mb-6 font-medium">
                  For professors, associate faculty, lecturers, and academic researchers.
                </p>
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-white/15">
                  <span className="font-heading text-4xl sm:text-5xl text-white font-black tracking-tight">
                    ₹ 1,000
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300 font-sans font-medium">/ delegate</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-100 font-sans font-medium mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-xs" />
                    <span>Lunch on both conference days</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-xs" />
                    <span>Access to all conference session</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans text-xs sm:text-sm font-black text-center shadow-lg transition-all block"
              >
                Register as Faculty Member &rarr;
              </Link>
            </div>
          </div>

          {/* Registration Fee Includes Banner (Inverted Leaf Shape) */}
          <div className="p-7 sm:p-8 rounded-[24px] rounded-tr-[44px] rounded-bl-[44px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] border border-white/20 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <strong className="font-black text-amber-300 text-sm sm:text-base block mb-3 font-heading uppercase tracking-wide">
                Registration Fee Includes:
              </strong>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-100 font-sans font-medium">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                  <span>Lunch on both conference days</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                  <span>Access to all conference session</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── 03. MODE OF PAYMENT & OFFICIAL RCSS BANK DETAILS (Asymmetric Inverted Leaf Shape in Deep Navy) ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl mb-20 lg:mb-28 relative overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/15 relative z-10">
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] mb-3 shadow-md">
                <span>Banking Coordinates</span>
              </div>
              <h4 className="font-heading text-2xl sm:text-3xl text-white font-black m-0">
                Mode of Payment (NEFT / RTGS Bank Transfer)
              </h4>
              <span className="text-xs font-sans text-slate-200 uppercase tracking-wider font-bold block mt-1">
                Official RCSS Conference Bank Account &middot; Verified Gateway
              </span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-white bg-white/15 border border-white/25 px-3.5 py-1.5 rounded-full font-black self-start sm:self-auto shadow-sm">
              Direct Wire &middot; Instant Receipt
            </span>
          </div>

          {/* 4 Metric Cards with Asymmetric Rounded Corners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm mb-8 relative z-10">
            <div className="p-6 rounded-2xl rounded-tl-3xl rounded-br-3xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all backdrop-blur-sm shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold tracking-wider block mb-1">
                  Account Name
                </span>
                <strong className="text-white font-sans font-extrabold text-sm block leading-snug">
                  {CONFERENCE_DATA.bankDetails.accountName}
                </strong>
              </div>
            </div>

            <div className="p-6 rounded-2xl rounded-tr-3xl rounded-bl-3xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all backdrop-blur-sm shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold tracking-wider block mb-1">
                  Account Number
                </span>
                <strong className="text-white font-mono font-extrabold text-base block tracking-tight">
                  {CONFERENCE_DATA.bankDetails.accountNumber}
                </strong>
              </div>
            </div>

            <div className="p-6 rounded-2xl rounded-tl-3xl rounded-br-3xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all backdrop-blur-sm shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-slate-300 font-sans uppercase font-bold tracking-wider block mb-1">
                  Bank &amp; Branch
                </span>
                <strong className="text-white font-sans font-extrabold text-sm block leading-snug">
                  {CONFERENCE_DATA.bankDetails.bank}
                </strong>
              </div>
            </div>

            <div className="p-6 rounded-2xl rounded-tr-3xl rounded-bl-3xl bg-white/15 hover:bg-white/20 border border-white/25 hover:border-white/35 transition-all backdrop-blur-sm shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-slate-200 font-sans uppercase font-bold tracking-wider block mb-1">
                  IFSC / NEFT Code
                </span>
                <strong className="text-white font-mono font-black text-base block tracking-tight">
                  {CONFERENCE_DATA.bankDetails.ifsc}
                </strong>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/15 relative z-10">
            <p className="text-xs text-slate-200 font-sans font-medium m-0">
              * Please preserve the transaction UTR number or transfer receipt screenshot to upload during online delegate registration.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="primary"
                size="md"
                asLink
                href="/register"
                showArrow
              >
                Proceed to Delegate Registration
              </Button>
            </div>
          </div>
        </div>


        {/* ── RAJAGIRI INTERNATIONAL EXCHANGE PROGRAMME - PARTNERING UNIVERSITIES (Curved Leaf Shape) ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-10 sm:mb-12 relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] mb-4 shadow-md">
              <span>Global Academic Alliances</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight m-0 leading-tight">
              Rajagiri International Exchange Programme - Partnering Universities
            </h3>
            <p className="text-xs sm:text-sm text-slate-100 font-sans font-medium mt-3 max-w-2xl mx-auto leading-relaxed">
              Fostering global scholarship, cross-border research, student exchanges, and joint initiatives across premier partner universities worldwide.
            </p>
          </div>

          {/* Smooth Infinite Marquee Carousel */}
          <div className="relative overflow-hidden w-full py-4 -mx-4 sm:-mx-8 px-4 sm:px-8 z-10">
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
                  className="w-[180px] sm:w-[210px] h-[85px] sm:h-[95px] px-5 py-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 group shrink-0"
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
                  key={`marquee-b-${idx}`}
                  className="w-[180px] sm:w-[210px] h-[85px] sm:h-[95px] px-5 py-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 group shrink-0"
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
