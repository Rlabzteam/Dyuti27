import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONFERENCE_DATA } from '@/data/conference';

const REGISTRATION_URL = 'https://forms.gle/XTZZmXS1tjkvfm9u6';

const navLinks = [
  { label: 'Home', path: '/', exact: true },
  { label: 'Rajagiri', path: '/rajagiri' },
  { label: 'Call for Papers', path: '/call_for_papers' },
  { label: 'Attractions', path: '/attractions' },
  { label: 'Travel', path: '/travel' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Accommodation', path: '/accomodation' },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      className="sticky top-2 sm:top-4 z-50 w-full pointer-events-none transition-all duration-300"
      role="banner"
    >
      {/* ── UNIFIED FRAMED CONTAINER (LIKE ICSWHMH.COM) ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pointer-events-auto">
        <div
          className={cn(
            'w-full bg-[#071A33] rounded-2xl sm:rounded-3xl border border-slate-300/40 shadow-[0_10px_35px_rgba(7,26,51,0.28)] overflow-hidden transition-all duration-300',
            isScrolled && 'shadow-[0_16px_45px_rgba(7,26,51,0.38)] border-slate-400/50'
          )}
        >
          {/* ── 1. UPPER SECTION: NAVIGATION BAR ── */}
          <div className="h-[64px] sm:h-[72px] px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-5 text-white">
            {/* Left: Circular White Logo Badge + Title */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
              <Link
                to="/"
                className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none shrink-0"
                aria-label="DYUTI 2027 — Return to Homepage"
              >
                {/* Circular White Badge housing Logo */}
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white p-1 shadow-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 border border-slate-200">
                  <img
                    src="https://dyuti.in/assets/images/dyutilogoog.jpg"
                    alt="DYUTI Emblem"
                    className="h-full w-full object-contain rounded-full"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-heading font-black text-[1.2rem] sm:text-[1.35rem] tracking-tight leading-none text-white transition-colors">
                    DYUTI
                  </span>
                  <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold leading-none mt-1 text-amber-300">
                    2027 &middot; Kochi
                  </span>
                </div>
              </Link>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px h-7 bg-white/20 mx-0.5" />

              {/* DYUTI 2027 Theme Logo */}
              <Link
                to="/"
                className="hidden md:flex items-center focus-visible:outline-none transition-transform duration-200 hover:scale-105 bg-white px-2.5 py-1 rounded-full border border-white/40 shadow-xs"
                aria-label="DYUTI 2027 Official Theme Logo"
              >
                <img
                  src="https://dyuti.in/assets/images/dyuti_2027_logo_new-removebg-preview.png"
                  alt="DYUTI 2027 Official Logo Banner"
                  className="h-6 sm:h-7 w-auto max-w-[120px] lg:max-w-[150px] object-contain"
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation Links with Amber Active Indicator */}
            <nav
              aria-label="Main Navigation"
              className="hidden xl:flex items-center justify-center flex-1 mx-2"
            >
              <ul className="flex items-center gap-1.5 lg:gap-2 2xl:gap-3 list-none m-0 p-0">
                {navLinks.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      className={({ isActive }) =>
                        cn(
                          'relative px-3 2xl:px-4 py-1.5 text-[13.5px] 2xl:text-[14px] font-sans font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-none',
                          isActive
                            ? 'text-amber-300 font-bold border-b-2 border-amber-400 pb-1'
                            : 'text-white/90 hover:text-amber-300'
                        )
                      }
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: Rajagiri Logo & White Pill Register Button */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href={CONFERENCE_DATA.links.rajagiriPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-100 px-3 py-1.5 rounded-full border border-white/40 shadow-xs transition-all duration-200 hover:scale-105 flex items-center shrink-0 focus-visible:outline-none"
                title="Rajagiri College of Social Sciences (Autonomous)"
                aria-label="Rajagiri College of Social Sciences Website"
              >
                <img
                  src="https://dyuti.in/assets/images/rajagiri.webp"
                  alt="Rajagiri College of Social Sciences"
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </a>

              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-[38px] sm:h-[42px] px-5 sm:px-6 inline-flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-sans font-bold bg-white text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200 shadow-sm focus-visible:outline-none hover:scale-105"
              >
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2 shrink-0">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 h-8 inline-flex items-center text-[12px] font-sans font-bold bg-white text-slate-950 hover:bg-slate-100 rounded-full focus-visible:outline-none shadow-xs"
              >
                Register
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="w-8 h-8 flex items-center justify-center text-white border border-white/30 rounded-full bg-white/10 shadow-xs focus-visible:outline-none hover:bg-white/20 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-white" />
                ) : (
                  <Menu className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* ── 2. LOWER SECTION: WHITE ANNOUNCEMENT TICKER (LIKE ICSWHMH.COM) ── */}
          <div className="w-full bg-white text-slate-900 border-t border-slate-200/90 py-1.5 sm:py-2 flex items-center select-none overflow-hidden">
            {/* Left Static Announcement Label */}
            <div className="flex items-center gap-1.5 pl-3 sm:pl-6 pr-3 py-0.5 bg-white z-10 shrink-0 border-r border-slate-200">
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold text-slate-900 whitespace-nowrap">
                Important Announcement:
              </span>
            </div>

            {/* Scrolling Marquee Ticker with edge gradient mask */}
            <div className="relative flex overflow-x-hidden flex-1 group [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)]">
              <div className="animate-marquee whitespace-nowrap flex items-center py-0.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center mx-4 sm:mx-6">
                    <span className="font-sans text-xs sm:text-[13px] font-medium text-slate-800">
                      Registration begins from 10th August 2026, at Rajagiri College Of Social Sciences(Autonomous) Kalamassery.
                    </span>
                    <span className="mx-3 text-slate-400 font-bold">&bull;</span>
                    <a
                      href={REGISTRATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs sm:text-[13px] font-bold text-amber-600 hover:text-amber-700 underline transition-colors shrink-0"
                    >
                      REGISTER NOW - CLICK HERE FOR ONLINE REGISTRATION
                    </a>
                    <span className="mx-3 text-slate-400 font-bold">&bull;</span>
                    <span className="font-sans text-xs sm:text-[13px] font-medium text-slate-800">
                      Abstract submission deadline: <strong className="text-slate-950 font-semibold">25 Sep 2026</strong>
                    </span>
                    <span className="mx-4 text-slate-400 font-bold">&bull;</span>
                  </div>
                ))}
              </div>

              <div
                className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center py-0.5"
                aria-hidden="true"
              >
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center mx-4 sm:mx-6">
                    <span className="font-sans text-xs sm:text-[13px] font-medium text-slate-800">
                      Registration begins from 10th August 2026, at Rajagiri College Of Social Sciences(Autonomous) Kalamassery.
                    </span>
                    <span className="mx-3 text-slate-400 font-bold">&bull;</span>
                    <a
                      href={REGISTRATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs sm:text-[13px] font-bold text-amber-600 hover:text-amber-700 underline transition-colors shrink-0"
                    >
                      REGISTER NOW - CLICK HERE FOR ONLINE REGISTRATION
                    </a>
                    <span className="mx-3 text-slate-400 font-bold">&bull;</span>
                    <span className="font-sans text-xs sm:text-[13px] font-medium text-slate-800">
                      Abstract submission deadline: <strong className="text-slate-950 font-semibold">25 Sep 2026</strong>
                    </span>
                    <span className="mx-4 text-slate-400 font-bold">&bull;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── MOBILE DRAWER ── */}
          {isMobileMenuOpen && (
            <div
              className="xl:hidden bg-[#071A33] border-t border-white/15 text-white px-4 py-4 space-y-1.5 animate-slideDown"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-4 py-2.5 rounded-xl text-[14.5px] font-sans transition-colors',
                      isActive
                        ? 'text-slate-950 font-black bg-amber-400 shadow-md'
                        : 'text-slate-100 font-bold hover:text-white hover:bg-white/15'
                    )
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

