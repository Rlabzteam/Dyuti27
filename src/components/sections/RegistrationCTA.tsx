import React from 'react';
import { ArrowUpRight, Check, CreditCard, ShieldCheck } from 'lucide-react';
import { CONFERENCE_DATA, RegistrationFee } from '@/data/conference';

export const RegistrationCTA: React.FC = () => {
  return (
    <section
      id="registration"
      className="bg-[#071A33] text-white border-b border-slate-250 relative overflow-hidden py-20 sm:py-28 lg:py-32"
      aria-labelledby="registration-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── TOP SECTION ANNOTATION BAR ── */}
        <div className="flex items-center justify-between pb-5 mb-12 sm:mb-16 border-b border-slate-250">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#60A5FA] tabular-nums">07</span>
            <span className="w-6 h-px bg-white/20" />
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-white font-bold">
              Registration
            </span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[#CBD5E1] font-semibold">
            Commences 10 August 2026 &middot; Official Portal
          </span>
        </div>

        {/* ── SECTION EDITORIAL HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 lg:mb-18 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#60A5FA]" />
              <span className="text-[11.5px] font-sans uppercase tracking-[0.18em] font-bold text-[#60A5FA]">
                Participation &amp; Delegate Access
              </span>
            </div>
            <h2
              id="registration-heading"
              className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-heading font-extrabold text-white leading-[1.08] tracking-tight m-0"
            >
              Be part of the conversation.
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] font-sans font-normal mt-4 max-w-[620px] leading-relaxed">
              Registration commences on 10 August 2026. All registration tiers include full access to plenary keynotes, concurrent technical paper tracks, conference kits, proceedings volume, and executive banquet luncheon on both days.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href={CONFERENCE_DATA.links.registrationForm}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[12px] font-sans uppercase tracking-[0.14em] font-bold text-[#60A5FA] hover:text-white transition-colors"
            >
              <span>Direct Registration Form</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* ── EDITORIAL PRICING CARDS (High-Contrast Navy Cards) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {CONFERENCE_DATA.fees.map((fee: RegistrationFee, idx: number) => {
            const isFeatured = idx === 1; // Academicians / Faculty Members
            return (
              <div
                key={idx}
                className={`rounded-[20px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 shadow-editorial border backdrop-blur-sm ${
                  isFeatured
                    ? 'bg-white/[0.12] border-white/35 ring-1 ring-white/20 hover:bg-white/[0.16]'
                    : 'bg-white/[0.06] border-slate-250 hover:border-white/30 hover:bg-white/[0.09]'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-250">
                    <span className="font-mono text-xs font-bold text-[#60A5FA] uppercase tracking-wider">
                      Tier 0{idx + 1}
                    </span>
                    {isFeatured && (
                      <span className="text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-[#071A33] bg-[#60A5FA] px-3 py-1 rounded-[6px]">
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Category Title */}
                  <h3 className="font-heading text-[1.35rem] sm:text-[1.5rem] text-white font-bold leading-snug mb-4 min-h-[2.8rem]">
                    {fee.category}
                  </h3>

                  {/* Fee Amount Display */}
                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-250">
                    <span className="font-heading text-4xl sm:text-5xl text-white font-extrabold tracking-tight tabular-nums">
                      {fee.amount}
                    </span>
                    <span className="text-xs text-[#CBD5E1] font-sans">
                      / delegate
                    </span>
                  </div>

                  {/* Inclusions List */}
                  <ul className="space-y-3 text-[13px] text-white/90 font-sans mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                      <span>Access to all 8 thematic tracks &amp; plenaries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                      <span>Conference delegate kit &amp; documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                      <span>{fee.deadline}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                      <span>Official Certificate of Participation</span>
                    </li>
                  </ul>
                </div>

                {/* Registration Action Button */}
                <a
                  href={CONFERENCE_DATA.links.registrationForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full h-[48px] inline-flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.14em] font-bold rounded-[12px] transition-all duration-200 shadow-sm ${
                    isFeatured
                      ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                      : 'bg-white/12 border border-white/25 text-white hover:bg-white hover:text-[#071A33]'
                  }`}
                >
                  <span>Register Now</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* ── BANK TRANSFER EDITORIAL STRIP ── */}
        <div className="pt-8 border-t border-slate-250 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-[12px] bg-[#F5F3EF] border border-slate-250 flex items-center justify-center text-[#60A5FA] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-[0.16em]">
                  NEFT / RTGS Bank Transfer
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#CBD5E1] font-sans m-0">
                A/C: <strong className="font-mono text-white font-semibold">{CONFERENCE_DATA.bankDetails.accountNumber}</strong> &bull; Bank: <span className="text-white font-medium">{CONFERENCE_DATA.bankDetails.bank}</span> &bull; IFSC: <strong className="font-mono text-white font-semibold">{CONFERENCE_DATA.bankDetails.ifsc}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#CBD5E1] font-sans shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
            <span>Official Account: {CONFERENCE_DATA.bankDetails.accountName}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
