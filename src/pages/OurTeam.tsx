import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CONFERENCE_DATA } from '@/data/conference';
import {
  Mail,
  Check,
  Copy,
  Users,
  Award,
  Crown,
  Sparkles,
  ShieldCheck,
  Search,
  Building2,
  MapPin,
  ArrowRight,
  Send,
} from 'lucide-react';

export const OurTeam: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const committee = CONFERENCE_DATA.committee;

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  // Filtered members for live search & category tabs
  const filteredOrganizingMembers = useMemo(() => {
    return committee.organizingCommittee.filter((member) => {
      const matchesSearch = member.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      return matchesSearch;
    });
  }, [committee.organizingCommittee, searchQuery]);

  const showExecutive =
    (selectedCategory === 'all' || selectedCategory === 'executive') &&
    (searchQuery === '' ||
      committee.executiveCommittee.chiefPatron.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      committee.executiveCommittee.patron.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()));

  const showConveners =
    (selectedCategory === 'all' || selectedCategory === 'conveners') &&
    (searchQuery === '' ||
      committee.conveners.some((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));

  const showOrganizing =
    (selectedCategory === 'all' || selectedCategory === 'organizing') &&
    filteredOrganizingMembers.length > 0;

  const showAdministrative =
    (selectedCategory === 'all' || selectedCategory === 'admin') &&
    (searchQuery === '' ||
      committee.administrativeCommittee.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      committee.administrativeCommittee.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()));

  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* ── PAGE HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-[#071A33]" />
            <span className="text-sm sm:text-[15px] font-sans font-extrabold uppercase tracking-[0.24em] text-slate-700">
              Conference Governance
            </span>
            <span className="w-8 h-0.5 bg-[#071A33]" />
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-[#071A33] leading-none tracking-tight mb-6 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Our Organizing Team
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              &amp; Academic Leadership
            </span>
          </h1>

          {/* Divider */}
          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Meet the institutional leaders, conference conveners, faculty committee members, and administrative secretariat driving DYUTI 2027 — 26th National Conference on Social Work for Sustainable Development.
          </p>
        </div>

        {/* ── INTERACTIVE FILTER TABS & SEARCH BAR ── */}
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Team Members' },
              { id: 'executive', label: 'Executive Committee' },
              { id: 'conveners', label: 'Conveners' },
              { id: 'organizing', label: 'Organizing Committee' },
              { id: 'admin', label: 'Secretariat & Admin' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-sans font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#071A33] text-white shadow-sm ring-2 ring-[#071A33]/20'
                    : 'bg-slate-100 text-slate-650 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search faculty or member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-[13px] font-sans rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#071A33] focus:ring-2 focus:ring-[#071A33]/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 1: EXECUTIVE COMMITTEE (CHIEF PATRON & PATRON)
        ══════════════════════════════════════════════════════════ */}
        {showExecutive && (
          <section className="mb-16 lg:mb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-[#071A33] text-amber-300 shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#071A33] font-bold block">
                  Executive Leadership
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#071A33] m-0">
                  Executive Committee
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Chief Patron Card */}
              <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-8 sm:p-10 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(7,26,51,0.5)] transition-all duration-300">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Role Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase mb-6">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Executive Committee &middot; Chief Patron</span>
                    </div>

                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-[#071A33] flex items-center justify-center font-heading font-black text-2xl shadow-lg shrink-0 border-2 border-white/40">
                        <span>SM</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl sm:text-[1.85rem] font-black text-white m-0 leading-tight">
                          {committee.executiveCommittee.chiefPatron.name}
                        </h3>
                        <p className="text-amber-300 font-sans font-bold text-sm sm:text-base mt-1">
                          {committee.executiveCommittee.chiefPatron.designation}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/15 space-y-2">
                      <div className="flex items-center gap-2 text-slate-200 text-xs sm:text-sm font-sans font-medium">
                        <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>{committee.executiveCommittee.chiefPatron.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-sans font-medium">
                        <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>Kalamassery, Kochi, Kerala, India</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-mono uppercase tracking-wider text-amber-300/90 font-bold">
                      Institutional Governance
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-medium text-[11px]">
                      Principal
                    </span>
                  </div>
                </div>
              </div>

              {/* Patron Card */}
              <div className="rounded-[28px] sm:rounded-[36px] rounded-tr-[56px] sm:rounded-tr-[72px] rounded-bl-[56px] sm:rounded-bl-[72px] bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] text-white p-8 sm:p-10 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(10,37,64,0.5)] transition-all duration-300">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Role Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-400/20 border border-blue-300/40 text-blue-200 text-xs font-mono font-bold tracking-wider uppercase mb-6">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                      <span>Executive Committee &middot; Patron</span>
                    </div>

                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-[#071A33] flex items-center justify-center font-heading font-black text-2xl shadow-lg shrink-0 border-2 border-white/40">
                        <span>KT</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl sm:text-[1.85rem] font-black text-white m-0 leading-tight">
                          {committee.executiveCommittee.patron.name}
                        </h3>
                        <p className="text-amber-300 font-sans font-bold text-sm sm:text-base mt-1">
                          {committee.executiveCommittee.patron.designation}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/15 space-y-2">
                      <div className="flex items-center gap-2 text-slate-200 text-xs sm:text-sm font-sans font-medium">
                        <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>{committee.executiveCommittee.patron.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-sans font-medium">
                        <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>Department of Social Work, Kalamassery</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-mono uppercase tracking-wider text-amber-300/90 font-bold">
                      Academic Guidance
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-medium text-[11px]">
                      Head of Department
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: CONFERENCE CONVENERS
        ══════════════════════════════════════════════════════════ */}
        {showConveners && (
          <section className="mb-16 lg:mb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-[#071A33] text-amber-300 shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#071A33] font-bold block">
                  Core Organizers
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#071A33] m-0">
                  Conference Conveners
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {committee.conveners.map((convener, idx) => (
                <div
                  key={idx}
                  className="rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-8 sm:p-10 shadow-xl border border-white/20 relative overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase">
                        <span>Convener {idx + 1}</span>
                      </span>
                      <span className="text-xs text-slate-300 font-mono">
                        DYUTI 2027 Secretariat
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-5">
                      {convener.imageUrl ? (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-lg shrink-0 border-2 border-amber-300/40 bg-white/10">
                          <img
                            src={convener.imageUrl}
                            alt={convener.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 text-white flex items-center justify-center font-heading font-black text-xl shadow-md shrink-0 border border-white/30">
                          <span>
                            {convener.name
                              .replace(/Dr\.|Sr\.|Fr\./g, '')
                              .trim()
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-heading text-2xl sm:text-[1.65rem] font-bold text-white m-0 leading-tight">
                          {convener.name}
                        </h3>
                        <p className="text-amber-300 font-sans font-bold text-sm sm:text-[15px] mt-1">
                          {convener.designation}
                        </p>
                        <p className="text-slate-200 text-xs sm:text-sm font-sans font-medium mt-0.5">
                          {convener.department}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/15">
                      <p className="text-xs text-slate-300 font-sans leading-relaxed m-0">
                        {convener.institution}
                      </p>
                    </div>
                  </div>

                  {/* Email & Contact Actions */}
                  <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={`mailto:${convener.email || 'dyuti@rajagiri.edu'}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-bold text-amber-300 hover:text-amber-200 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-amber-400" />
                      <span>{convener.email || 'dyuti@rajagiri.edu'}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyEmail(convener.email || 'dyuti@rajagiri.edu')
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-semibold transition-all border border-white/20"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail === (convener.email || 'dyuti@rajagiri.edu') ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-300" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: ORGANIZING COMMITTEE MEMBERS (14 MEMBERS)
        ══════════════════════════════════════════════════════════ */}
        {showOrganizing && (
          <section className="mb-16 lg:mb-24">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#071A33] text-amber-300 shadow-md">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#071A33] font-bold block">
                    Faculty Committee
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#071A33] m-0">
                    Organizing Committee Members
                  </h2>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-slate-200/80 text-slate-800 text-xs font-mono font-bold">
                {filteredOrganizingMembers.length} Distinguished Members
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredOrganizingMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#071A33]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Photo / Monogram Badge & Index */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      {member.imageUrl ? (
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 group-hover:border-[#071A33] transition-all duration-300 shrink-0 bg-slate-100 p-0.5">
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-[14px] group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#071A33] to-[#123962] text-amber-300 flex items-center justify-center font-heading font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                          <span>
                            {member.name
                              .replace(/Dr\.|Sr\.|Fr\.|Mr\./g, '')
                              .trim()
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-[11px] font-mono text-slate-400 font-bold px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 shadow-xs">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-slate-900 text-lg leading-snug group-hover:text-[#071A33] transition-colors m-0">
                      {member.name}
                    </h4>

                    <span className="inline-block mt-2 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/60 text-[#071A33] text-[11px] font-mono font-semibold">
                      Organizing Committee
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-sans font-medium space-y-0.5">
                    <p className="m-0 text-slate-600 font-semibold">{member.department}</p>
                    <p className="m-0 text-slate-400 text-[11px] truncate">
                      Rajagiri College of Social Sciences
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION 4: ADMINISTRATIVE COMMITTEE & SECRETARIAT DESK
        ══════════════════════════════════════════════════════════ */}
        {showAdministrative && (
          <section className="mb-16 lg:mb-20">
            <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Secretariat Details (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase mb-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Secretariat Coordination</span>
                    </div>
                    <h2 className="font-heading text-2xl sm:text-4xl font-black text-white m-0 leading-tight">
                      Administrative Committee
                    </h2>
                    <p className="text-sm sm:text-base text-slate-200 font-sans mt-2 leading-relaxed">
                      For logistics support, institutional correspondences, conference documentation, and general secretariat inquiries:
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-[#071A33] flex items-center justify-center font-heading font-black text-lg shadow-md shrink-0">
                        <span>JK</span>
                      </div>
                      <div>
                        <h4 className="font-heading text-xl font-bold text-white m-0">
                          {committee.administrativeCommittee.name}
                        </h4>
                        <p className="text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mt-0.5">
                          {committee.administrativeCommittee.role}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/15 text-xs sm:text-sm text-slate-200 font-sans space-y-1 font-medium">
                      <p className="m-0">
                        <strong className="text-white">
                          {committee.administrativeCommittee.department}
                        </strong>
                      </p>
                      <p className="m-0 text-slate-300">
                        {committee.administrativeCommittee.institution}
                      </p>
                      <p className="m-0 text-slate-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{committee.administrativeCommittee.location}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Email Actions Box (5 cols) */}
                <div className="lg:col-span-5 rounded-2xl bg-white/10 border border-white/20 p-6 sm:p-8 backdrop-blur-sm space-y-5">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white m-0 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-amber-300" />
                    <span>Secretariat Contact Channels</span>
                  </h3>

                  <div className="space-y-3 font-sans">
                    {/* MSW Email */}
                    <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono text-slate-300 uppercase block font-semibold">
                          Departmental Desk
                        </span>
                        <a
                          href={`mailto:${committee.administrativeCommittee.email}`}
                          className="text-amber-300 font-bold text-sm hover:underline font-mono"
                        >
                          {committee.administrativeCommittee.email}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyEmail(committee.administrativeCommittee.email)
                        }
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Copy email"
                      >
                        {copiedEmail === committee.administrativeCommittee.email ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                    </div>

                    {/* Conference Email */}
                    <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono text-slate-300 uppercase block font-semibold">
                          Conference Inquiries
                        </span>
                        <a
                          href={`mailto:${committee.administrativeCommittee.conferenceEmail}`}
                          className="text-amber-300 font-bold text-sm hover:underline font-mono"
                        >
                          {committee.administrativeCommittee.conferenceEmail}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyEmail(
                            committee.administrativeCommittee.conferenceEmail
                          )
                        }
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Copy email"
                      >
                        {copiedEmail ===
                        committee.administrativeCommittee.conferenceEmail ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2.5">
                    <Link
                      to="/contactus"
                      className="w-full h-11 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send an Online Inquiry</span>
                    </Link>
                    <Link
                      to="/travel"
                      className="w-full h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-[13px] flex items-center justify-center gap-2 transition-all border border-white/15"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Campus Directions &amp; Transit</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            SECTION 5: BOTTOM CALLOUT BANNER
        ══════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white m-0">
              Join the National Academic Dialogue
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed m-0">
              Submit your research abstracts before <strong>25 September 2026</strong> or register online to attend the deliberations in Kochi, Kerala.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/register"
                className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Register as Delegate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/call_for_papers"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-xs sm:text-sm border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <span>Call for Papers &amp; Submissions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
