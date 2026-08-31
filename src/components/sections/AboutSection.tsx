import React from 'react';
import { Sparkles, BookOpen, Users, Globe2, Target, Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';


export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#041412] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <SectionHeading
          eyebrow="Origins & Heritage"
          title="About DYUTI — Spark of Life"
          subtitle="Scholarly deliberations on vital issues of human development, rights, and social transformation organized annually since 1998."
          dark
        />

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Item 1: The DYUTI Philosophy (Large 7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#082a26]/95 via-[#06201d]/90 to-[#031513]/95 border border-amber-500/30 backdrop-blur-xl shadow-luxury-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="gold-luxury" className="px-3 py-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>26th Annual Edition</span>
                </Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mb-4 leading-tight">
                Developmental Yearnings for a United &amp; Transformed India
              </h3>

              <p className="text-slate-650 text-sm sm:text-base leading-relaxed font-normal mb-6">
                Rajagiri, guided by its vision of <em>"becoming a centre of excellence in learning for enriching and fulfilling LIFE,"</em> has regularly provided an annual academic forum for scholarly deliberations on vital issues of human development. This prestigious series (commenced in 1998) is christened <strong>DYUTI</strong>, meaning <strong>‘Spark of Life’</strong>.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-amber-400/20 mt-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-amber-400 shrink-0" />
                <p className="text-xs sm:text-sm text-amber-200 font-serif italic m-0">
                  "Advancing social work education, participatory research, and community-driven SDG action across India and the global South."
                </p>
              </div>
            </div>
          </div>

          {/* Bento Item 2: UN 2030 Agenda Alignment (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0a3530]/90 to-[#051c19]/95 border border-emerald-500/30 backdrop-blur-xl shadow-luxury-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-6 shadow-emerald-glow">
                <Target className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white mb-3">
                The UN 2030 Agenda &amp; SDGs
              </h3>

              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-normal mb-4">
                The adoption of the 2030 Agenda by the United Nations marked a global pact toward the 17 Sustainable Development Goals. DYUTI 2027 focuses on bridging policy, grassroot social interventions, and evidence-based methodologies to combat climate vulnerability, poverty, and institutional inequalities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-4 border-t border-emerald-500/20">
              <div className="p-2.5 rounded-xl bg-black/30 border border-emerald-500/20">
                <span className="block text-lg font-cinzel font-bold text-emerald-300">17 SDGs</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Global Agenda</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-emerald-500/20">
                <span className="block text-lg font-cinzel font-bold text-amber-300">8 Tracks</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Sub-Themes</span>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Scholarly Dialogue (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl p-7 bg-[#072421]/90 border border-amber-500/20 hover:border-amber-400/40 transition-all backdrop-blur-xl shadow-luxury-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel font-bold text-white text-base mb-2">
              Scholarly Dialogue &amp; Scopus Proceedings
            </h4>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed m-0 font-normal">
              Peer-reviewed technical tracks, poster presentations, and opportunity for selected papers to be published in Scopus/UGC-CARE indexed volumes.
            </p>
          </div>

          {/* Bento Item 4: Multi-Sectoral Partnerships (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl p-7 bg-[#072421]/90 border border-amber-500/20 hover:border-amber-400/40 transition-all backdrop-blur-xl shadow-luxury-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel font-bold text-white text-base mb-2">
              Multi-Sectoral Partnerships
            </h4>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed m-0 font-normal">
              Confluence of academicians, NGO practitioners, CSR foundations, development leaders, and dynamic youth researchers from around the world.
            </p>
          </div>

          {/* Bento Item 5: International Network (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl p-7 bg-[#072421]/90 border border-amber-500/20 hover:border-amber-400/40 transition-all backdrop-blur-xl shadow-luxury-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center mb-4">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel font-bold text-white text-base mb-2">
              60+ Global University Alliances
            </h4>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed m-0 font-normal">
              Rajagiri maintains active academic MoUs and research ties across Australia, United Kingdom, USA, Europe, and Asia-Pacific.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

