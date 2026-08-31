import React from 'react';

/**
 * ConferenceOverview Component
 * Styled with high-end corporate light off-white theme and deep purple highlights
 */
export const ConferenceOverview: React.FC = () => {
  return (
    <section
      id="overview"
      className="py-20 sm:py-28 bg-[#FDFBF7] text-slate-900 border-b border-slate-200/80 relative overflow-hidden"
      aria-label="DYUTI 2027 Conference Theme Narrative, About DYUTI and Background"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-[#071A33]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-20 relative z-10">

        {/* ── 01: THEME NARRATIVE (Asymmetric Curved Leaf Shape Card in Deep Ocean Navy Gradient) ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-8 sm:p-12 lg:p-14 shadow-2xl shadow-[#071A33]/25 border border-white/20 overflow-hidden relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#38BDF8] text-slate-950 text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] shadow-md">
              <span>DYUTI 2027 &bull; Thematic Narrative</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#38BDF8] leading-snug max-w-4xl tracking-tight">
              Deliberating Innovative &amp; Collaborative Approaches for Sustainable Development
            </h2>

            <div className="w-20 h-1.5 bg-[#38BDF8] rounded-full" />

            <p className="text-[16px] sm:text-[17.5px] text-slate-100 leading-relaxed font-sans font-medium max-w-4xl pt-1">
              The 2027 DYUTI National Conference, themed &ldquo;Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership,&rdquo; brings together academicians, researchers, practitioners, policymakers, students, and development professionals to deliberate on innovative and collaborative approaches for sustainable development. Aligned with the 2030 Agenda for Sustainable Development and its vision of &ldquo;Leaving No One Behind,&rdquo; the conference highlights the vital role of social work in promoting social justice, inclusive development, community empowerment, and sustainable solutions. Through scholarly dialogue and knowledge exchange, DYUTI 2027 aims to strengthen partnerships and advance resilient, equitable, and sustainable communities.
            </p>
          </div>
        </div>

        {/* ── 02: ABOUT DYUTI 2027 (Asymmetric Cut Bevel Shape Card in Deep Navy Gradient) ── */}
        <div className="rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] bg-gradient-to-br from-[#071A33] via-[#0b2952] to-[#040e1c] text-white p-8 sm:p-12 lg:p-14 shadow-2xl shadow-[#071A33]/25 border border-white/20 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
              <div>
                <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#38BDF8] text-slate-950 text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] mb-4 shadow-md">
                  <span>Conference Heritage</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  About DYUTI 2027
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-black shadow-xs">
                  Founded in 1998
                </span>
                <span className="px-4 py-1.5 rounded-full bg-[#38BDF8] text-slate-950 text-xs font-black shadow-xs">
                  26th in its series
                </span>
              </div>
            </div>

            {/* Acronym Expansion Box (Vibrant Electric Cyan Highlighted Card) */}
            <div className="bg-[#38BDF8] text-slate-950 rounded-[20px] p-6 sm:p-7 shadow-lg border border-cyan-300">
              <p className="text-lg sm:text-xl font-heading font-black leading-snug">
                <span className="text-slate-950 tracking-wide underline decoration-slate-900/30 underline-offset-4">DYUTI</span> &mdash;{' '}
                <span>D</span>evelopmental{' '}
                <span>Y</span>earnings for a{' '}
                <span>U</span>nited and{' '}
                <span>T</span>ransformed{' '}
                <span>I</span>ndia
              </p>
            </div>

            {/* Legacy Paragraph */}
            <p className="text-[16px] sm:text-[17.5px] text-slate-100 leading-[1.8] font-sans font-medium">
              Rajagiri with its vision of &lsquo;becoming a centre of excellence in learning for enriching and fulfilling LIFE&rsquo; has been regularly providing an annual forum for deliberations on vital issues of development from a Rights perspective. This annual series of deliberation (started in 1998) is named DYUTI meaning &lsquo;Spark of Life&rsquo;. DYUTI 2027 is the 26th in its series.
            </p>
          </div>
        </div>

        {/* ── 03: BACKGROUND — 3-PILLAR STRUCTURED LAYOUT ── */}
        <div className="space-y-8">
          <div className="pb-2 border-b border-slate-300">
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#071A33] tracking-tight">
              Background
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">

            {/* Pillar 1: UN 2030 Agenda */}
            <div className="rounded-[24px] rounded-tl-[48px] rounded-br-[48px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-white/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <span className="inline-block font-sans text-xs font-black px-3.5 py-1.5 rounded-full bg-[#38BDF8] text-slate-950">
                  Pillar 01
                </span>
                <h3 className="font-heading font-black text-xl text-[#38BDF8]">
                  The UN 2030 Agenda
                </h3>
                <p className="text-[14.5px] text-slate-100 leading-[1.75] font-sans font-medium">
                  The adoption of the 2030 Agenda for Sustainable Development by the United Nations marked a global commitment to achieving the 17 Sustainable Development Goals (SDGs) through integrated social, economic, and environmental action. However, recent global reports indicate that progress has slowed due to climate change, widening inequalities, economic uncertainties, conflicts, and public health challenges, emphasizing the need for renewed collaboration and innovative, community-driven solutions.
                </p>
              </div>
            </div>

            {/* Pillar 2: The Indian Context */}
            <div className="rounded-[24px] rounded-tr-[48px] rounded-bl-[48px] bg-gradient-to-br from-[#071A33] via-[#0b2952] to-[#040e1c] text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-white/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <span className="inline-block font-sans text-xs font-black px-3.5 py-1.5 rounded-full bg-[#38BDF8] text-slate-950">
                  Pillar 02
                </span>
                <h3 className="font-heading font-black text-xl text-[#38BDF8]">
                  The Indian Context
                </h3>
                <p className="text-[14.5px] text-slate-100 leading-[1.75] font-sans font-medium">
                  In India, while notable progress has been made towards several SDGs, challenges such as poverty, inequality, unemployment, climate vulnerability, gender disparities, environmental degradation, and unequal access to quality education, healthcare, and social protection continue to hinder inclusive development. Addressing these complex issues requires coordinated efforts among governments, academia, civil society, communities, industry, development professionals and social entrepreneurs.
                </p>
              </div>
            </div>

            {/* Pillar 3: Role of Social Work */}
            <div className="rounded-[24px] rounded-tl-[48px] rounded-br-[48px] bg-gradient-to-br from-[#071A33] via-[#0b2952] to-[#040e1c] text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-white/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <span className="inline-block font-sans text-xs font-black px-3.5 py-1.5 rounded-full bg-[#38BDF8] text-slate-950">
                  Pillar 03
                </span>
                <h3 className="font-heading font-black text-xl text-[#38BDF8]">
                  Social Work&rsquo;s Mission
                </h3>
                <p className="text-[14.5px] text-slate-100 leading-[1.75] font-sans font-medium">
                  Social work plays a pivotal role in advancing sustainable development through advocacy, community engagement, policy action, interdisciplinary collaboration, and evidence-based practice. DYUTI 2027 seeks to provide a platform for sharing innovative practices, indigenous knowledge, research, and partnerships that contribute to achieving the Sustainable Development Goals while strengthening resilient, inclusive, and sustainable communities.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

