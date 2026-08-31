import React from 'react';
import { Calendar, MapPin, Award, BookMarked, Users } from 'lucide-react';

export interface QuickFactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}

export const QuickFacts: React.FC = () => {
  const facts: QuickFactItem[] = [
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      label: 'Conference',
      value: '26th Edition',
      detail: 'Annual legacy since 1998',
    },
    {
      icon: <MapPin className="w-5 h-5 text-amber-400" />,
      label: 'Host & Venue',
      value: 'Rajagiri College (RCSS)',
      detail: 'Kalamassery, Kochi, Kerala',
    },
    {
      icon: <Calendar className="w-5 h-5 text-amber-400" />,
      label: 'Abstract Deadline',
      value: '25 Sept 2026',
      detail: 'Registration from 10 Aug 2026',
    },
    {
      icon: <BookMarked className="w-5 h-5 text-amber-400" />,
      label: 'Publication',
      value: 'Scopus Indexed',
      detail: 'Peer-reviewed book chapters & ISBN',
    },
    {
      icon: <Users className="w-5 h-5 text-amber-400" />,
      label: 'Participation',
      value: 'Scholars & Delegates',
      detail: 'Students, Faculty & Practitioners',
    },
  ];

  return (
    <section
      className="bg-[#031311] border-b border-amber-500/20 py-8 relative z-20"
      aria-label="Conference Quick Facts"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {facts.map((fact, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-[#082a26]/80 to-[#041513]/90 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-0.5 shadow-luxury-sm"
            >
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30 shrink-0">
                {fact.icon}
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-display font-bold uppercase tracking-wider text-slate-400">
                  {fact.label}
                </span>
                <span className="block text-sm sm:text-base font-cinzel font-bold text-white truncate">
                  {fact.value}
                </span>
                <span className="block text-xs text-amber-300/90 truncate font-normal mt-0.5">
                  {fact.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
