import React from 'react';

export const ConferenceMeta: React.FC = () => {
  const items = [
    {
      number: '26th',
      label: 'Annual Edition',
      sub: 'Continuous legacy since 1998',
      badge: 'Legacy',
      bgGradient: 'from-[#071A33] via-[#0e2a52] to-[#040e1c]',
      accentColor: 'text-amber-500',
      badgeBg: 'bg-white/15 text-amber-500 border-white/25',
    },
    {
      number: '60+',
      label: 'Global Partners',
      sub: 'Universities across 30+ countries',
      badge: 'Global',
      bgGradient: 'from-[#0a2540] via-[#123962] to-[#051424]',
      accentColor: 'text-amber-500',
      badgeBg: 'bg-white/15 text-amber-500 border-white/25',
    },
    {
      number: 'NIRF',
      label: '#12 in India',
      sub: 'National Institutional Ranking 2025',
      badge: 'Ranked #12',
      bgGradient: 'from-[#071A33] via-[#16365c] to-[#030d1a]',
      accentColor: 'text-amber-500',
      badgeBg: 'bg-white/15 text-amber-500 border-white/25',
    },
    {
      number: 'NAAC',
      label: 'A++ Grade',
      sub: '3.83 CGPA · Highest Accreditation',
      badge: '3.83 CGPA',
      bgGradient: 'from-[#09223d] via-[#18426e] to-[#041120]',
      accentColor: 'text-amber-500',
      badgeBg: 'bg-white/15 text-amber-500 border-white/25',
    },
  ];

  return (
    <section
      className="bg-[#FDFBF7] text-slate-900 py-16 sm:py-24 border-b border-slate-300 relative overflow-hidden"
      aria-label="Conference Key Statistics"
    >
      {/* Subtle ambient light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#071A33]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Annotation */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-6 sm:px-8 py-3 rounded-full bg-amber-400 text-slate-950 text-xs sm:text-sm font-sans font-black uppercase tracking-[0.2em] shadow-md">
            Institutional Excellence &amp; Legacy
          </span>
        </div>

        {/* 4 Cards with Asymmetric Curved Leaf Shape & Unique Color per Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`group relative w-full h-full min-h-[260px] rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br ${item.bgGradient} p-8 sm:p-9 flex flex-col justify-between text-white border border-white/20 shadow-xl hover:scale-[1.03] active:scale-[0.99] transition-all duration-300 overflow-hidden`}
            >
              {/* Subtle internal shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-60 pointer-events-none" />

              {/* Top Row: Bold Category Badge */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <span className={`text-[11px] font-mono font-black uppercase tracking-[0.18em] px-4 py-1.5 rounded-full border shadow-sm ${item.badgeBg}`}>
                  {item.badge}
                </span>
              </div>

              {/* Middle Row: Extra Bold Stat Number & Label */}
              <div className="my-2 relative z-10">
                <div className={`font-heading text-[3rem] sm:text-[3.5rem] font-black ${item.accentColor} leading-none tracking-tight tabular-nums group-hover:scale-105 transition-transform duration-300 origin-left`}>
                  {item.number}
                </div>
                <div className="text-[17px] sm:text-[18.5px] font-sans font-black text-white leading-snug mt-2.5">
                  {item.label}
                </div>
              </div>

              {/* Bottom Row: Subtitle */}
              <div className="pt-4 border-t border-white/20 mt-4 relative z-10">
                <div className="text-[13px] sm:text-[13.5px] font-sans text-slate-100 font-bold leading-relaxed">
                  {item.sub.includes('3.83 CGPA') ? (
                    <>
                      <strong className={`${item.accentColor} font-black`}>3.83 CGPA</strong> · Highest Accreditation
                    </>
                  ) : (
                    item.sub
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
