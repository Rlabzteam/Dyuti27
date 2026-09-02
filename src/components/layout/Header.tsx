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
      className="sticky top-2 sm:top-3.5 z-50 w-full pointer-events-none transition-all duration-300"
      role="banner"
    >
      {/* ── RECTANGLE WITH CURVED SIDES (PILL / STADIUM SHAPE) ── */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pointer-events-auto">
        <div
          className={cn(
            'w-full bg-[#071A33] text-white rounded-full border border-white/20 px-4 sm:px-8 lg:px-10 h-[66px] sm:h-[74px] flex items-center justify-between gap-4 transition-all duration-300 shadow-[0_8px_30px_rgba(7,26,51,0.25)]',
            isScrolled && 'shadow-[0_14px_40px_rgba(7,26,51,0.38)] backdrop-blur-md bg-[#071A33]/95 border-white/25'
          )}
        >
          {/* Left: Circular White Logo Badge + Title */}
          <div className="flex items-center gap-3 shrink-0">
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
          </div>

          {/* Center: Desktop Navigation Links with Amber Active Indicator */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center justify-center flex-1 mx-4 lg:mx-6"
          >
            <ul className="flex items-center gap-3 lg:gap-4 2xl:gap-6 list-none m-0 p-0">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      cn(
                        'relative px-3 py-1.5 text-[13.5px] lg:text-[14px] 2xl:text-[14.5px] font-sans font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-none',
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

          {/* Right: White Pill Register Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-[38px] sm:h-[42px] px-6 sm:px-7 inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-sans font-bold bg-white text-[#071A33] hover:bg-slate-100 rounded-full transition-all duration-200 shadow-sm focus-visible:outline-none hover:scale-105"
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

        {/* ── MOBILE DRAWER ── */}
        {isMobileMenuOpen && (
          <div
            className="xl:hidden mt-2 bg-[#071A33] border border-white/20 text-white rounded-2xl px-4 py-4 space-y-1.5 shadow-2xl animate-slideDown pointer-events-auto"
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

