import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ThemeCard } from '@/components/cards/ThemeCard';
import { CONFERENCE_DATA } from '@/data/conference';
import { Sparkles, Layers, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ThemeGrid: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'community' | 'environment' | 'health' | 'innovation'>('all');

  const filteredThemes = CONFERENCE_DATA.subThemes.filter((theme) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'community') return theme.number === '01' || theme.number === '05';
    if (selectedFilter === 'environment') return theme.number === '02' || theme.number === '08';
    if (selectedFilter === 'health') return theme.number === '03' || theme.number === '06';
    if (selectedFilter === 'innovation') return theme.number === '04' || theme.number === '07';
    return true;
  });


  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#041412] via-[#06221e] to-[#041412] border-y border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Academic Scope &amp; Sub-Themes"
          eyebrowVariant="gold-luxury"
          title="Major Conference Tracks"
          subtitle="Deliberating on 8 interconnected sub-themes designed to catalyze sustainable development, participatory policy, and community resilience."
          dark
        />

        {/* Interactive Track Category Pill Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { key: 'all', label: 'All 8 Tracks', icon: <Layers className="w-3.5 h-3.5" /> },
            { key: 'community', label: 'Community & Rights', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { key: 'environment', label: 'Ecology & Climate', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { key: 'health', label: 'Health & Wellbeing', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { key: 'innovation', label: 'Tech & Youth Innovation', icon: <Sparkles className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key as any)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                selectedFilter === tab.key
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-gold-glow border border-amber-300'
                  : 'bg-[#F5F3EF] text-slate-650 hover:text-white hover:bg-[#F5F3EF] border border-amber-500/20'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>

        {/* Bottom Call for Papers Prompt */}
        <div className="mt-14 text-center">
          <Button
            variant="outline"
            size="lg"
            asLink
            href="/call_for_papers"
            icon={<FileText className="w-5 h-5" />}
          >
            Review Submission Guidelines for Tracks
          </Button>
        </div>
      </div>
    </section>
  );
};

