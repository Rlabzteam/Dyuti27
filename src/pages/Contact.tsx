import React from 'react';
import { CONFERENCE_DATA } from '@/data/conference';
import { Mail, Phone, Building2 } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── CENTERED PAGE HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-[#071A33]" />
            <span className="text-sm sm:text-[15px] font-sans font-extrabold uppercase tracking-[0.24em] text-slate-700">
              Conference Secretariat
            </span>
            <span className="w-8 h-0.5 bg-[#071A33]" />
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-[#071A33] leading-none tracking-tight mb-6 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Contact the
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              DYUTI 2027 Secretariat
            </span>
          </h1>

          {/* Divider */}
          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Reach out directly to the conference convenors for inquiries regarding paper submissions, registration guidelines, or institutional collaborations.
          </p>
        </div>

        {/* ── SECRETARIAT & CAMPUS COORDINATES (2-COLUMN GRID) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">

          {/* Card 1: Conference Coordinators & Conveners */}
          <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="mb-6 pb-4 border-b border-white/15">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-blue-200 block mb-1">
                  Core Leadership
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl text-white font-bold m-0">
                  Conference Secretariat
                </h3>
              </div>

              <div className="space-y-4">
                {CONFERENCE_DATA.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-blue-400 pl-4 py-3 bg-white/10 rounded-r-2xl border border-white/10"
                  >
                    <p className="font-heading font-bold text-white text-base m-0">
                      {contact.name}
                    </p>
                    <p className="text-xs sm:text-[13px] text-blue-200 m-0 mt-0.5 font-sans font-medium">
                      {contact.role} &middot; {contact.department}
                    </p>
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-xs sm:text-[13px] text-slate-200 hover:text-white font-mono font-semibold hover:underline mt-2 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-300" />
                        <span>{contact.email}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono uppercase tracking-wider text-blue-200 font-bold">
                Department of Social Work
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-medium text-[11px]">
                Secretariat Desk
              </span>
            </div>
          </div>

          {/* Card 2: Mailing & Direct Venue Address */}
          <div className="rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] text-white border border-white/20 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="mb-6 pb-4 border-b border-white/15">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-blue-200 block mb-1">
                  Location &amp; Address
                </span>
                <h4 className="font-heading text-2xl sm:text-3xl text-white font-bold m-0">
                  Mailing &amp; Venue Address
                </h4>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm sm:text-base font-bold mb-1">
                      {CONFERENCE_DATA.hostInstitution}
                    </strong>
                    <p className="text-slate-200 text-xs sm:text-sm m-0">
                      Hill Campus: South Kalamassery, Kalamassery, Kochi 683104, Kerala, India
                    </p>
                    <p className="text-slate-300 text-xs m-0 mt-1">
                      Rajagiri Valley Campus: Chittethukara, Kakkanad, Kochi 682039, Kerala, India
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 space-y-3 font-sans">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                    <div>
                      <span className="text-slate-300 text-xs block">Official Telephone</span>
                      <a href="tel:+914842911346" className="text-white font-mono font-bold text-xs sm:text-sm hover:underline">
                        +91 484-2911 346 / +91 484-2911 321
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                    <div>
                      <span className="text-slate-300 text-xs block">Secretariat Email Desk</span>
                      <a href="mailto:dyuti@rajagiri.edu" className="text-white font-mono font-bold text-xs sm:text-sm hover:underline">
                        dyuti@rajagiri.edu
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono uppercase tracking-wider text-blue-200 font-bold">
                Institutional Campus
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-medium text-[11px]">
                Kochi, Kerala
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
