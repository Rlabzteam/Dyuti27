import React from 'react';
import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

export const Accommodation: React.FC = () => {
  const areas = [
    {
      number: '01',
      subtitle: 'Premium & Business Hotels',
      name: 'Edappally & Lulu Mall Zone',
      distance: '4.5 km from Campus',
      duration: '10–12 mins drive',
      description:
        'Kochi\'s primary retail and commercial hub. Offers premium accommodation options with extensive dining, transit, and shopping connections at Lulu Mall and metro access.',
      transit: 'Direct metro connection from Edappally Station to Kalamassery Town Station.',
    },
    {
      number: '02',
      subtitle: 'IT Corridor Business Hotels',
      name: 'Kakkanad & Infopark Zone',
      distance: '6.0 km from Campus',
      duration: '12–15 mins drive',
      description:
        'The tech hub of Kochi. Features executive business hotels, boutique residencies, and serviced apartments suitable for researchers and corporate delegates.',
      transit: 'Direct taxi, auto-rickshaw, or campus shuttle arrangements.',
    },
    {
      number: '03',
      subtitle: 'Convenient Transit Stays',
      name: 'Kalamassery & Aluva Highway',
      distance: '1.5 km from Campus',
      duration: '3–5 mins drive',
      description:
        'Budget-friendly options, student residencies, and guest houses located directly along NH 544 and within walking distance of Kalamassery Town Metro Station.',
      transit: 'Short walking distance (200m) or rapid 3-minute auto-rickshaw ride.',
    },
  ];

  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="w-6 h-0.5 bg-[#071A33]" />
            <span className="text-[12px] font-sans font-bold uppercase tracking-[0.22em] text-slate-600">
              Delegate Hospitality
            </span>
            <span className="w-6 h-0.5 bg-[#071A33]" />
          </div>

          <h1 className="font-heading font-extrabold text-[#071A33] leading-none tracking-tight mb-6 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Accommodation
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              &amp; Hotels Near Rajagiri
            </span>
          </h1>

          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />

          <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            A curated selection of luxury, executive, and budget hotels conveniently accessible from the Rajagiri Valley and Hill campuses in Kochi.
          </p>
        </div>

        {/* ── ADVISORY ACTION BANNER (Deep Ocean Navy Banner with Asymmetric Curved Leaf Shape) ── */}
        <div className="bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] border border-white/20 text-white rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 mb-20 lg:mb-28 shadow-2xl overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#071A33] bg-white px-3.5 py-1.5 rounded-[8px] mb-4">
                Delegate Accommodation Advisory
              </span>
              <h2 className="text-[2.25rem] sm:text-[2.85rem] font-heading font-extrabold text-white mb-3 leading-tight">
                Curated Hotel Contact Directory
              </h2>
              <p className="text-slate-200 text-sm sm:text-base m-0 font-sans font-normal leading-relaxed">
                Accommodation is not included in the standard registration fee. Delegates may book hotels directly across Kalamassery, Edappally, or Kakkanad. Download our verified contact directory below.
              </p>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <Button
                variant="white"
                size="lg"
                asLink
                href={CONFERENCE_DATA.links.accommodationPdf}
                target="_blank"
                rel="noopener noreferrer"
                icon={<Download className="w-4 h-4" />}
                showArrow
                className="bg-white hover:bg-slate-100 text-[#071A33] border border-transparent font-bold h-12 w-full lg:w-auto flex items-center justify-center shadow-lg"
              >
                Download Directory (PDF)
              </Button>
            </div>
          </div>
        </div>

        {/* ── AREA INFORMATION ── */}
        <div className="mb-20 lg:mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-10 border-b border-slate-200">
            <div>
              <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-[#071A33] block mb-1">
                Stay Locations
              </span>
              <h3 className="font-heading text-[1.75rem] sm:text-[2.1rem] font-bold text-slate-900 m-0">
                Recommended Accommodation Zones
              </h3>
            </div>
            <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-slate-500 hidden sm:inline font-semibold">
              Within 10–20 mins of Rajagiri Campus
            </span>
          </div>

          <div className="space-y-8">
            {areas.map((area, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl overflow-hidden relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                  {/* Left Number & Area Title (5 cols) */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-sm sm:text-base font-black text-white tabular-nums">
                        {area.number}
                      </span>
                      <span className="w-6 h-px bg-white/25" />
                      <span className="text-xs font-sans uppercase tracking-[0.16em] text-slate-300 font-bold">
                        {area.subtitle}
                      </span>
                    </div>

                    <h4 className="text-[1.85rem] sm:text-[2.2rem] font-heading font-extrabold text-white leading-snug mb-4">
                      {area.name}
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center text-xs font-mono font-bold text-white bg-white/15 border border-white/25 px-3.5 py-1.5 rounded-full shadow-xs">
                        <span>{area.distance}</span>
                      </span>
                      <span className="inline-flex items-center text-xs font-mono font-black text-white bg-white/20 border border-white/30 px-3.5 py-1.5 rounded-full shadow-xs">
                        <span>{area.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Description & Transit Information (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full pt-2 lg:pt-0 lg:border-l lg:border-white/15 lg:pl-10">
                    <p className="text-[14.5px] sm:text-[15.5px] text-slate-100 leading-relaxed font-sans font-medium mb-5">
                      {area.description}
                    </p>

                    <div className="p-4 sm:p-5 rounded-[20px] bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 font-sans">
                      <strong className="text-white block font-mono text-xs uppercase tracking-wider mb-1 font-black">
                        Transit Recommendations
                      </strong>
                      <span>{area.transit}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOSPITALITY DESK SUPPORT FOOTER (Deep Navy Blue Box) ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] border border-white/20 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-8">
              <div className="mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-slate-350 block mb-1">
                  Support &amp; Logistics
                </span>
                <h4 className="font-heading text-2xl sm:text-3xl text-white font-bold m-0">
                  Hospitality Assistance Desk
                </h4>
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] text-slate-200 m-0 font-sans font-normal leading-relaxed">
                Our student volunteer hospitality desk is available to assist outstation and international delegates with local bookings, directions, and special accessibility requirements.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end w-full lg:w-auto">
              <Button
                variant="white"
                size="lg"
                asLink
                href="mailto:dyuti@rajagiri.edu"
                icon={<Mail className="w-4 h-4" />}
                className="bg-white hover:bg-slate-100 text-[#071A33] border border-transparent font-bold h-12 w-full lg:w-auto flex items-center justify-center shadow-lg"
              >
                dyuti@rajagiri.edu
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
