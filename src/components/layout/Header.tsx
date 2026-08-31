import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
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
      className="sticky top-0 z-50 w-full pointer-events-none transition-all duration-300"
      role="banner"
    >
      {/* ── NAVBAR CONTAINER ── */}
      <div
        className={cn(
          'mx-auto pointer-events-auto transition-all duration-300',
          isScrolled
            ? 'max-w-[1440px] px-3 sm:px-6 pt-3.5 sm:pt-4'
            : 'max-w-full px-0 pt-0'
        )}
      >
        <div
          className={cn(
            'w-full flex items-center justify-between transition-all duration-300 gap-4 lg:gap-6 2xl:gap-8 bg-[#071A33]',
            isScrolled
              ? 'rounded-full h-[64px] sm:h-[68px] px-4 sm:px-6 lg:px-8 border border-white/20 shadow-[0_12px_36px_rgba(7,26,51,0.35)] text-white'
              : 'rounded-none h-[70px] sm:h-[74px] px-4 sm:px-8 lg:px-12 border-b border-white/10 shadow-md text-white'
          )}
        >
          {/* ── LEFT SECTION: BRANDING & LOGOS ── */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* DYUTI Emblem + Text */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none shrink-0"
              aria-label="DYUTI 2027 — Return to Homepage"
            >
              <img
                src="https://dyuti.in/assets/images/dyutilogoog.jpg"
                alt="DYUTI Emblem"
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-full border border-white/30 shadow-sm transition-transform duration-200 group-hover:scale-105"
              />
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
            <div className="hidden sm:block w-px h-7 bg-white/25 mx-0.5" />

            {/* Official DYUTI 2027 Banner */}
            <Link
              to="/"
              className="hidden sm:flex items-center focus-visible:outline-none transition-transform duration-200 hover:scale-105 bg-white px-2.5 py-1 rounded-full border border-white/40 shadow-sm"
              aria-label="DYUTI 2027 Official Theme Logo"
            >
              <img
                src="https://dyuti.in/assets/images/dyuti_2027_logo_new-removebg-preview.png"
                alt="DYUTI 2027 Official Logo Banner"
                className="h-7 sm:h-8 w-auto max-w-[130px] lg:max-w-[160px] object-contain"
              />
            </Link>
          </div>

          {/* ── CENTER SECTION: DESKTOP NAVIGATION ── */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center justify-center flex-1 mx-2 2xl:mx-4"
          >
            <ul className="flex items-center gap-1.5 2xl:gap-3 list-none m-0 p-0">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      cn(
                        'relative px-3.5 2xl:px-4.5 py-2.5 rounded-full text-[13.5px] 2xl:text-[14px] font-sans transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]',
                        isActive
                          ? 'text-slate-950 font-black bg-[#38BDF8] shadow-md scale-105'
                          : 'text-slate-100 font-bold hover:text-white hover:bg-white/15'
                      )
                    }
                  >
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── RIGHT SECTION: RAJAGIRI LOGO & REGISTER CTA ── */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-3.5 shrink-0">
            <a
              href={CONFERENCE_DATA.links.rajagiriPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-100 px-3 sm:px-3.5 py-1.5 rounded-full border border-white/40 shadow-xs transition-all duration-200 hover:scale-105 flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
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
              className="group h-[42px] px-5 sm:px-6 inline-flex items-center gap-2 text-[13px] font-sans font-black bg-[#38BDF8] text-slate-950 hover:bg-[#7dd3fc] rounded-full transition-all duration-200 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
            >
              <span>Register</span>
              <span className="text-[14px] transition-transform duration-200 group-hover:translate-x-1 inline-block">
                →
              </span>
            </a>
          </div>

          {/* ── MOBILE ACTIONS ── */}
          <div className="flex sm:hidden items-center gap-2 shrink-0">
            <a
              href={CONFERENCE_DATA.links.rajagiriPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-2 py-1 rounded-full border border-white/40 shadow-xs flex items-center"
              title="Rajagiri College"
            >
              <img
                src="https://dyuti.in/assets/images/rajagiri.webp"
                alt="Rajagiri"
                className="h-5 w-auto object-contain"
              />
            </a>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 h-8 inline-flex items-center text-[11.5px] font-sans font-black bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-full focus-visible:outline-none shadow-xs"
            >
              Register
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="w-8 h-8 flex items-center justify-center text-white border border-white/30 rounded-full bg-white/10 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition-colors hover:bg-white/20"
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
            className="xl:hidden mt-2.5 bg-[#071A33] border border-white/20 text-white rounded-[28px] overflow-hidden shadow-2xl animate-slideDown"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="px-5 pt-4 pb-3 border-b border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://dyuti.in/assets/images/dyutilogoog.jpg"
                  alt="DYUTI Logo"
                  className="h-7 w-7 rounded-full border border-white/30"
                />
                <div className="bg-white px-2 py-0.5 rounded-full shadow-xs border border-white/20">
                  <img
                    src="https://dyuti.in/assets/images/dyuti_2027_logo_new-removebg-preview.png"
                    alt="DYUTI 2027 Banner"
                    className="h-6 w-auto object-contain"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <nav className="px-3.5 py-4 space-y-1.5">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-4 py-3 rounded-full text-[14.5px] font-sans transition-colors',
                      isActive
                        ? 'text-slate-950 font-black bg-amber-400 shadow-md'
                        : 'text-slate-100 font-bold hover:text-white hover:bg-white/15'
                    )
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

