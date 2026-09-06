import { HeroBanner } from '@/components/sections/HeroBanner';
import { ConferenceOverview } from '@/components/sections/ConferenceOverview';
import { MajorSubThemes } from '@/components/sections/MajorSubThemes';

/**
 * DYUTI 2027 Official Homepage
 */
export const Home: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#FDFBF7] text-slate-800 min-h-screen">
      {/* 01 — Full-screen centred nightscape hero */}
      <HeroBanner />

      {/* 02 — DYUTI 2027 Overview, About DYUTI & Background */}
      <ConferenceOverview />

      {/* 03 — The 8 Major Sub-Themes */}
      <MajorSubThemes />
    </div>
  );
};

export default Home;
