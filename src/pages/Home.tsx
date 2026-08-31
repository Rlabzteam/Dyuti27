import React from 'react';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { ConferenceMeta } from '@/components/sections/ConferenceMeta';
import { ConferenceOverview } from '@/components/sections/ConferenceOverview';
import { ImportantDatesTimeline } from '@/components/sections/ImportantDatesTimeline';
import { MajorSubThemes } from '@/components/sections/MajorSubThemes';

/**
 * DYUTI 2027 Official Homepage
 */
export const Home: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#FDFBF7] text-slate-800 min-h-screen">
      {/* 01 — Full-screen centred nightscape hero */}
      <HeroBanner />

      {/* 02 — Key Stats Strip */}
      <ConferenceMeta />

      {/* 03 — DYUTI 2027 Overview, About DYUTI & Background */}
      <ConferenceOverview />

      {/* 04 — Important Dates */}
      <ImportantDatesTimeline />

      {/* 05 — The 8 Major Sub-Themes */}
      <MajorSubThemes />
    </div>
  );
};

export default Home;
