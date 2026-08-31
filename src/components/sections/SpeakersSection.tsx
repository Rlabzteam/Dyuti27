// High-end dynamic shape speakers display section (Light High-Contrast Mode)
import React from 'react';
import { ArrowRight, Globe2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClipPathWrapper } from '@/components/ui/ClipPathWrapper';

export interface AcademicVoice {
  number: string;
  initials: string;
  name: string;
  role: string;
  affiliation: string;
  focus: string;
  badge?: string;
}

export const SpeakersSection: React.FC = () => {
  // Verified conference convenors, institutional leadership, and academic alliances
  const voices: AcademicVoice[] = [
    {
      number: '01',
      initials: 'BC',
      name: 'Dr. Sr. Bincy C.C',
      role: 'Conference Convenor & Assistant Professor',
      affiliation: 'Department of Social Work, Rajagiri College of Social Sciences (Autonomous)',
      focus: 'Inclusive community development, social justice paradigms, and grassroots intervention models.',
      badge: 'Conference Leadership',
    },
    {
      number: '02',
      initials: 'VK',
      name: 'Dr. V. Kalyani',
      role: 'Conference Co-Convenor & Assistant Professor',
      affiliation: 'Department of Social Work, Rajagiri College of Social Sciences (Autonomous)',
      focus: 'SDG localization, evidence-based field interventions, and community resilience.',
      badge: 'Conference Leadership',
    },
    {
      number: '03',
      initials: 'SW',
      name: 'Department of Social Work Faculty',
      role: 'Scientific Committee & Peer Review Board',
      affiliation: 'Rajagiri College of Social Sciences (Autonomous), Kalamassery',
      focus: 'Double-blind scholarly review, thematic track curation, and Scopus publication proceedings.',
      badge: 'Academic Review Board',
    },
    {
      number: '04',
      initials: 'GA',
      name: 'International Academic Delegations',
      role: 'Global University Partner Network',
      affiliation: '60+ Partner Universities Across 30+ Countries Worldwide',
      focus: 'Cross-cultural research dialogues, comparative social policy, and transnational developmental partnerships.',
      badge: 'Global Alliances',
    },
  ];

  return (
    <section
      id="voices"
      className="bg-[#FDFBF7] text-slate-900 border-b border-slate-200 relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="voices-heading"
    >
      {/* Background Glow Ornaments */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-[#071A33]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        {/* ── TOP SECTION ANNOTATION BAR ── */}
        <div className="flex items-center justify-between pb-5 mb-12 sm:mb-16 border-b border-slate-300">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#38BDF8] text-slate-950 text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] shadow-md">
            <span>Conference Leadership &bull; Keynotes</span>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-slate-800 font-bold hidden sm:inline">
            Academic Leadership &amp; Scientific Direction
          </span>
        </div>

        {/* ── SECTION EDITORIAL HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#071A33]" />
              <span className="text-[11.5px] font-sans uppercase tracking-[0.18em] font-black text-[#071A33]">
                Scholarly Convenors &amp; Scientific Board
              </span>
            </div>
            <h2
              id="voices-heading"
              className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-heading font-black text-[#071A33] leading-[1.08] tracking-tight m-0"
            >
              People shaping the conversation.
            </h2>
            <p className="text-sm sm:text-base text-slate-800 font-sans font-medium mt-4 max-w-[620px] leading-relaxed">
              Curated by faculty of Rajagiri College of Social Sciences alongside global partner universities, ensuring rigorous peer review and international scientific dialogue.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 text-[12px] font-sans uppercase tracking-[0.14em] font-black text-[#071A33] hover:text-amber-600 transition-colors"
            >
              <span>Contact Scientific Secretariat</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#071A33]" />
            </Link>
          </div>
        </div>

        {/* ── EDITORIAL VOICES GRID (Frosted Glass Asymmetric Cards) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {voices.map((voice) => (
            <div key={voice.number} className="w-full h-full relative">
              
              {/* Asymmetric Beveled Glass Card */}
              <ClipPathWrapper
                shape="custom"
                customPolygonPoints="0% 0%, 93% 0%, 100% 7%, 100% 100%, 7% 100%, 0% 93%"
                hoverEffect="scale"
                className="glass-card glass-card-hover border-slate-300 hover:shadow-[0_12px_30px_rgba(7, 26, 51,0.08)] transition-all duration-300"
              >
                <div className="p-8 sm:p-10 flex flex-col justify-between h-full min-h-[340px] text-slate-900">
                  <div>
                    {/* Header: Number + Hexagon Monogram */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-300">
                      <span className="font-mono text-sm font-black text-[#071A33] tracking-wider">
                        {voice.number}
                      </span>
                      <div className="flex items-center gap-4">
                        {voice.badge && (
                          <span className="text-[10px] font-sans font-black uppercase tracking-[0.14em] text-[#071A33] bg-[#071A33]/10 px-3 py-1 rounded-full border border-[#071A33]/25">
                            {voice.badge}
                          </span>
                        )}
                        
                        {/* Hexagon Initials Badge */}
                        <div className="w-11 h-11 shrink-0">
                          <ClipPathWrapper shape="hexagon" hoverEffect="none" className="bg-gradient-to-br from-[#071A33] to-[#170523]">
                            <div className="w-full h-full flex items-center justify-center font-heading text-sm font-black text-amber-300 tracking-wider">
                              {voice.initials}
                            </div>
                          </ClipPathWrapper>
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="font-heading text-[1.45rem] sm:text-[1.65rem] font-black text-slate-950 leading-snug mb-2 hover:text-[#071A33] transition-colors">
                      {voice.name}
                    </h3>

                    {/* Designation & Affiliation */}
                    <p className="text-[13px] font-sans font-extrabold text-[#071A33] mb-1">
                      {voice.role}
                    </p>
                    <p className="text-[12.5px] sm:text-[13px] font-sans text-slate-700 font-medium mb-6 leading-relaxed">
                      {voice.affiliation}
                    </p>
                  </div>

                  {/* Deliberation Scope */}
                  <div className="bg-[#F5F3EF] border border-slate-300 rounded-xl p-4.5">
                    <span className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#071A33] font-black block mb-1">
                      Academic Focus &amp; Scope
                    </span>
                    <p className="text-[13px] text-slate-900 font-sans leading-relaxed m-0 font-medium">
                      {voice.focus}
                    </p>
                  </div>
                </div>
              </ClipPathWrapper>
            </div>
          ))}
        </div>

        {/* ── KEYNOTE NOTIFICATION BANNER (Premium Glass Slanted Split-Layout) ── */}
        <div className="mt-12 sm:mt-16 relative w-full overflow-hidden">
          
          <ClipPathWrapper
            shape="custom"
            customPolygonPoints="0% 0%, 97% 0%, 100% 20%, 100% 100%, 3% 100%, 0% 80%"
            className="glass-card hover:border-[#071A33]/50 transition-colors duration-300 border-slate-300"
          >
            <div className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
              
              {/* Left Column Text & Icon */}
              <div className="flex items-start sm:items-center gap-5 z-10">
                <div className="w-12 h-12 rounded-xl bg-[#071A33]/10 text-[#071A33] flex items-center justify-center shrink-0 border border-[#071A33]/20">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#071A33] animate-pulse" />
                    <span className="text-[11.5px] font-mono uppercase tracking-[0.16em] text-[#071A33] font-black">
                      Keynote Announcements
                    </span>
                  </div>
                  <p className="text-[13.5px] text-slate-800 font-sans m-0 mt-1 max-w-2xl leading-relaxed font-medium">
                    Plenary keynote speakers and distinguished international guest panelists will be formally announced through the official conference schedule.
                  </p>
                </div>
              </div>

              {/* Right Column Action CTA */}
              <div className="shrink-0 z-10 w-full md:w-auto">
                <Link to="/call-for-papers" className="w-full md:w-auto">
                  <ClipPathWrapper shape="parallelogram" hoverEffect="scale" className="bg-[#071A33] hover:bg-[#1c082b] transition-colors py-3 px-6 text-white font-heading font-black uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#071A33]/20">
                    <span>Call for Papers</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </ClipPathWrapper>
                </Link>
              </div>

              {/* Aesthetic Diagonal Layer Backdrop */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#071A33]/5 -skew-x-12 pointer-events-none" />
            </div>
          </ClipPathWrapper>
          
        </div>

      </div>
    </section>
  );
};

