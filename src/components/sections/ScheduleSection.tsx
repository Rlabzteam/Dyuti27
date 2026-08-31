import React, { useState } from 'react';
import { MapPin, ArrowUpRight, Calendar, Download } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';

interface ScheduleItem {
  time: string;
  title: string;
  type: string;
  location: string;
  description: string;
}

export const ScheduleSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const day1Schedule: ScheduleItem[] = [
    {
      time: '08:30 — 09:30',
      title: 'Delegate Registration & Welcome Reception',
      type: 'Registration',
      location: 'Central Foyer, Rajagiri Valley Campus',
      description: 'Distribution of conference kits, badges, and proceedings documentation.',
    },
    {
      time: '09:30 — 11:00',
      title: 'Inaugural Ceremony & Release of Conference Volume',
      type: 'Inauguration',
      location: 'Main Auditorium',
      description: 'Lamp lighting ceremony, presidential address by CMI dignitaries, and official release of the Scopus-indexed volume.',
    },
    {
      time: '11:00 — 11:30',
      title: 'High Tea & Networking Break',
      type: 'Networking',
      location: 'Delegates Lounge',
      description: 'Informal interaction between national and international delegates.',
    },
    {
      time: '11:30 — 01:00',
      title: 'Keynote Address & Plenary Panel on Sustainable Development',
      type: 'Plenary',
      location: 'Main Auditorium',
      description: 'Global scholars present empirical frameworks on social work paradigms and SDG localization.',
    },
    {
      time: '01:00 — 02:00',
      title: 'Executive Luncheon',
      type: 'Hospitality',
      location: 'Rajagiri Dining Hall',
      description: 'Traditional Kerala banquet lunch provided for all registered delegates.',
    },
    {
      time: '02:00 — 04:30',
      title: 'Concurrent Track-wise Technical Paper Presentations (Tracks 01 to 04)',
      type: 'Paper Presentations',
      location: 'Seminar Halls A, B, C & D',
      description: 'Peer-reviewed oral paper presentations and poster sessions judged by session chairs.',
    },
    {
      time: '04:30 — 06:00',
      title: 'Roundtable Consultation: Civil Society, Industry & CSR Collaborations',
      type: 'Consultation',
      location: 'Board Room',
      description: 'Facilitated dialogue on multi-sectoral partnerships and sustainable impact investing.',
    },
  ];

  const day2Schedule: ScheduleItem[] = [
    {
      time: '09:00 — 10:30',
      title: 'Plenary Session II: Digital Social Work & Technological Innovations',
      type: 'Plenary',
      location: 'Main Auditorium',
      description: 'Deliberations on AI, data analytics, and digital inclusion for community transformation.',
    },
    {
      time: '10:30 — 11:00',
      title: 'Coffee & Research Poster Exhibits',
      type: 'Poster Session',
      location: 'Exhibition Gallery',
      description: 'Interactive presentation of student and scholar research posters.',
    },
    {
      time: '11:00 — 01:00',
      title: 'Concurrent Technical Paper Presentations (Tracks 05 to 08)',
      type: 'Paper Presentations',
      location: 'Seminar Halls A, B, C & D',
      description: 'Research deliberations on climate action, geriatric care, youth governance, and indigenous wisdom.',
    },
    {
      time: '01:00 — 02:00',
      title: 'Networking Luncheon',
      type: 'Hospitality',
      location: 'Rajagiri Dining Hall',
      description: 'Lunch and networking opportunities for scholars and faculty.',
    },
    {
      time: '02:00 — 03:30',
      title: 'Student & Youth Leadership Forum',
      type: 'Student Forum',
      location: 'Mini Auditorium',
      description: 'Pre-conference student research recommendations and community action plans.',
    },
    {
      time: '03:30 — 05:00',
      title: 'Valedictory Ceremony & Best Paper Awards Declaration',
      type: 'Valedictory',
      location: 'Main Auditorium',
      description: 'Conferment of Best Paper Awards, valedictory address, and resolution adoption.',
    },
  ];

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  return (
    <section
      id="schedule"
      className="bg-[#FFFFFF] text-[#0B1220] border-b border-[#D9DEE5] relative py-20 sm:py-28 lg:py-32"
      aria-labelledby="schedule-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── TOP SECTION ANNOTATION BAR ── */}
        <div className="flex items-center justify-between pb-5 mb-12 sm:mb-16 border-b border-[#D9DEE5]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-[#2563EB] tabular-nums">04</span>
            <span className="w-6 h-px bg-[#D9DEE5]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#071A33] font-bold">
              Conference Programme
            </span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[#667085] font-semibold">
            Two Days of Ideas, Dialogue and Discovery
          </span>
        </div>

        {/* ── SECTION EDITORIAL HEADER & DAY TOGGLE ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#2563EB]" />
              <span className="text-[11.5px] font-sans uppercase tracking-[0.18em] font-bold text-[#2563EB]">
                Session Chronicle
              </span>
            </div>
            <h2
              id="schedule-heading"
              className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-heading font-extrabold text-[#071A33] leading-[1.08] tracking-tight m-0"
            >
              Two days of ideas, dialogue and discovery.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] font-sans font-normal mt-4 leading-relaxed">
              Carefully choreographed across plenary deliberations, concurrent technical presentation tracks, youth forums, and policy roundtables.
            </p>
          </div>

          {/* ── DAY SELECTOR (Modern Rounded-14px Container) ── */}
          <div className="inline-flex items-center p-1.5 bg-[#F5F5F0] border border-[#D9DEE5] rounded-[14px] self-start lg:self-end shadow-subtle shrink-0">
            <button
              type="button"
              onClick={() => setActiveDay(1)}
              className={`px-5 sm:px-6 py-2.5 text-xs font-sans uppercase tracking-[0.14em] font-bold rounded-[10px] transition-all duration-200 cursor-pointer ${
                activeDay === 1
                  ? 'bg-[#071A33] text-white shadow-sm'
                  : 'text-[#667085] hover:text-[#071A33] bg-transparent'
              }`}
            >
              <span>Day 01 &middot; Inauguration &amp; Tracks 01–04</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveDay(2)}
              className={`px-5 sm:px-6 py-2.5 text-xs font-sans uppercase tracking-[0.14em] font-bold rounded-[10px] transition-all duration-200 cursor-pointer ${
                activeDay === 2
                  ? 'bg-[#071A33] text-white shadow-sm'
                  : 'text-[#667085] hover:text-[#071A33] bg-transparent'
              }`}
            >
              <span>Day 02 &middot; Tracks 05–08 &amp; Valedictory</span>
            </button>
          </div>
        </div>

        {/* ── EDITORIAL TIMELINE ROWS ── */}
        <div className="border-t-2 border-[#071A33]/20 divide-y divide-[#D9DEE5]">
          {currentSchedule.map((item, idx) => (
            <div
              key={idx}
              className="group py-7 sm:py-9 px-3 sm:px-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:bg-[#F5F5F0] border-l-4 border-l-transparent hover:border-l-[#2563EB] transition-all duration-200 rounded-r-[14px]"
            >
              {/* Left Column: Prominent Time & Session Type */}
              <div className="lg:w-1/4 shrink-0">
                <div className="font-mono text-base sm:text-lg font-bold text-[#071A33] group-hover:text-[#2563EB] transition-colors mb-2 tracking-tight tabular-nums">
                  {item.time}
                </div>
                <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-[8px] bg-[#E8F0F7] text-[#071A33] border border-[#D9DEE5] group-hover:border-[#2563EB]/40 transition-colors">
                  {item.type}
                </span>
              </div>

              {/* Middle Column: Session Title & Description */}
              <div className="lg:w-2/4 lg:px-4">
                <h3 className="font-heading text-[1.25rem] sm:text-[1.4rem] font-bold text-[#071A33] leading-[1.3] mb-2 group-hover:text-[#2563EB] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-[#475467] font-sans font-normal leading-relaxed m-0">
                  {item.description}
                </p>
              </div>

              {/* Right Column: Venue / Location */}
              <div className="lg:w-1/4 flex lg:justify-end items-center shrink-0">
                <div className="inline-flex items-center gap-2 bg-[#E8F0F7] border border-[#D9DEE5] px-3.5 py-1.5 rounded-[10px] text-[12px] font-sans text-[#071A33] font-semibold group-hover:border-[#2563EB]/40 group-hover:bg-white transition-all shadow-subtle">
                  <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SCHEDULE FOOTER WITH BROCHURE LINK ── */}
        <div className="mt-12 pt-8 border-t border-[#D9DEE5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#667085] font-sans">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            <span>Detailed session chair allocations &amp; presentation timings will be circulated to registered delegates.</span>
          </div>
          <a
            href={CONFERENCE_DATA.links.brochurePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[12px] font-sans uppercase tracking-[0.14em] font-bold text-[#071A33] hover:text-[#2563EB] transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Complete Schedule (PDF)</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
