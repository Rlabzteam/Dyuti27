import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      className="sticky top-2 sm:top-3.5 z-50 w-full pointer-events-none transition-all duration-300"
      role="banner"
    >
      <div className="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-1 sm:px-2 pointer-events-auto flex flex-col items-center">
        {/* ── 1. MAIN NAVIGATION BAR (STANDALONE STADIUM PILL: SHAPE NEVER CHANGES) ── */}
        <div
          className={cn(
            'w-full bg-gradient-to-r from-[#0a2540] via-[#124270] to-[#0a2540] text-white rounded-full border border-blue-300/30 px-4 sm:px-8 lg:px-10 h-[72px] sm:h-[84px] lg:h-[88px] flex items-center justify-between gap-4 transition-all duration-300 shadow-[0_8px_30px_rgba(10,37,64,0.35)] relative z-20 backdrop-blur-md',
            isScrolled && 'shadow-[0_16px_45px_rgba(10,37,64,0.55)] bg-gradient-to-r from-[#0a2540]/98 via-[#134b7c]/98 to-[#0a2540]/98 border-blue-300/40'
          )}
        >
          {/* Left: Circular White Logo Badge + Title */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3.5 group focus-visible:outline-none shrink-0"
              aria-label="DYUTI 2027 — Return to Homepage"
            >
              {/* Circular White Badge housing Logo */}
              <div className="h-11 w-11 sm:h-13 sm:w-13 lg:h-14 lg:w-14 rounded-full bg-white p-1.5 shadow-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 border border-slate-200">
                <img
                  src="https://dyuti.in/assets/images/dyutilogoog.jpg"
                  alt="DYUTI Emblem"
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-[1.25rem] sm:text-[1.45rem] tracking-tight leading-none text-white transition-colors">
                  DYUTI
                </span>
                <span className="font-sans text-[9px] sm:text-[10.5px] uppercase tracking-[0.2em] font-extrabold leading-none mt-1 text-[#d4af37]">
                  2027 &middot; Kochi
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links with Gold Active Indicator */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center justify-center flex-1 mx-4 lg:mx-8"
          >
            <ul className="flex items-center gap-3 lg:gap-5 xl:gap-7 2xl:gap-8 list-none m-0 p-0">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      cn(
                        'relative px-4 py-2 text-[14px] lg:text-[15px] 2xl:text-[15.5px] font-sans font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-none',
                        isActive
                          ? 'text-[#d4af37] font-bold border-b-2 border-[#d4af37] pb-1'
                          : 'text-white/90 hover:text-[#d4af37]'
                      )
                    }
                  >
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: White Pill Register Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-[42px] sm:h-[46px] px-7 sm:px-9 inline-flex items-center gap-2 text-[13.5px] sm:text-[15px] font-sans font-bold bg-white text-[#071A33] hover:bg-slate-100 rounded-full transition-all duration-200 shadow-sm focus-visible:outline-none hover:scale-105"
            >
              <span>Register</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-2 shrink-0">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 h-9 inline-flex items-center text-[12.5px] font-sans font-bold bg-white text-slate-950 hover:bg-slate-100 rounded-full focus-visible:outline-none shadow-xs"
            >
              Register
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="w-9 h-9 flex items-center justify-center text-white border border-white/30 rounded-full bg-white/10 shadow-xs focus-visible:outline-none hover:bg-white/20 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ── 2. ATTACHED ANNOUNCEMENT BAR (NARROWER LENGTH, ATTACHED RECTANGLE WITH ROUNDED BOTTOM) ── */}
        <div
          className={cn(
            'w-[88%] sm:w-[91%] max-w-[1500px] mx-auto transition-all duration-300 ease-in-out z-10 select-none overflow-hidden -mt-2.5 sm:-mt-3',
            isScrolled
              ? 'max-h-0 opacity-0 -translate-y-3 pointer-events-none'
              : 'max-h-14 opacity-100 translate-y-0'
          )}
        >
          <div className="w-full bg-gradient-to-r from-[#0a2540] via-[#124270] to-[#0a2540] text-white border-x border-b border-blue-300/30 rounded-b-2xl sm:rounded-b-3xl pt-3.5 sm:pt-4 pb-1.5 sm:pb-2 px-4 sm:px-6 shadow-[0_8px_20px_rgba(10,37,64,0.3)] backdrop-blur-md flex items-center overflow-hidden">
            <div className="relative flex overflow-x-hidden w-full group [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)]">
              <div className="animate-marquee whitespace-nowrap flex items-center py-0.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center mx-4 sm:mx-6 text-[12px] sm:text-[13px] font-sans font-normal text-white/90">
                    <span className="font-extrabold text-[#d4af37] uppercase tracking-wider mr-1.5 whitespace-nowrap">
                      Important Announcement:
                    </span>
                    <span>
                      The International Conference on Social Work (DYUTI 2027) &mdash; Registration begins from{' '}
                      <strong className="text-[#d4af37] font-bold">10th August 2026</strong> at Rajagiri College Of Social Sciences (Autonomous) Kalamassery.
                    </span>
                    <span className="mx-3.5 text-white/40 font-bold">&bull;</span>
                    <a
                      href={REGISTRATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#d4af37] hover:text-amber-200 underline decoration-[#d4af37]/70 underline-offset-2 transition-colors shrink-0"
                    >
                      REGISTER NOW &mdash; CLICK HERE FOR ONLINE REGISTRATION
                    </a>
                    <span className="mx-3.5 text-white/40 font-bold">&bull;</span>
                    <span>
                      Extended Abstract Submission Deadline: <strong className="text-white font-bold">25 September 2026</strong>
                    </span>
                    <span className="mx-3.5 text-white/40 font-bold">&bull;</span>
                    <span className="text-white/80 font-medium">
                      Kochi, Kerala, India
                    </span>
                    <span className="mx-3.5 text-white/40 font-bold">&bull;</span>
                  </div>
                ))}
              </div>

              <div
                className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center py-0.5"
                aria-hidden="true"
              >
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center mx-4 sm:mx-6 text-[12px] sm:text-[13px] font-sans font-normal text-white/90">
                    <span className="font-extrabold text-[#d4af37] uppercase tracking-wider mr-1.5 whitespace-nowrap">
                      Important Announcement:
                    </span>
                    <span>
                      The International Conference on Social Work (DYUTI 2027) &mdash; Registration begins from{' '}
                      <strong className="text-[#d4af37] font-bold">10th August 2026</strong> at Rajagiri College Of Social Sciences (Autonomous) Kalamassery.
                    </span>
                    <span className="mx-3.5 text-white/40 font-bold">&bull;</span>
                    <a
                      href={REGISTRATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#d4af37] hover:text-amber-200 underline decoration-[#d4af37]/70 underline-offset-2 transition-colors shrink-0"
                    >
                      REGISTER NOW &mdash; CLICK HERE FOR ONLINE REGISTRATION
                    </a>
                    <span className="mx-3.5 text-white/40 font-bold">&bull;</span>
                    <span>
                      Extended Abstract Submission Deadline: <strong className="text-white font-bold">25 September 2026</strong>
                    </span>
                    <span className="mx-3.5 text-white/40 font-bold">&bull;</span>
                    <span className="text-white/80 font-medium">
                      Kochi, Kerala, India
                    </span>
                    <span className="mx-3.5 text-white/40 font-bold">&bull;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {isMobileMenuOpen && (
          <div
            className="w-full xl:hidden mt-2 bg-gradient-to-br from-[#0a2540] via-[#124270] to-[#061829] border border-blue-300/30 text-white rounded-2xl px-4 py-4 space-y-1.5 shadow-2xl animate-slideDown pointer-events-auto"
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
    </header>
  );
};
