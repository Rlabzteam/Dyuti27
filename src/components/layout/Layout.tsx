import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowUp, HelpCircle, X, CheckCircle2 } from 'lucide-react';
import { Header } from './Header';
import { TopHeaderBanner } from './TopHeaderBanner';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  // Monitor scroll height to show/hide scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Curated FAQ list from conference details
  const faqs = [
    {
      q: "When is the abstract submission deadline?",
      a: "The extended abstract submission deadline is September 25, 2026. Submissions must be uploaded via the CMT portal."
    },
    {
      q: "Where is the conference venue located?",
      a: "The conference will be held physically at the Rajagiri College of Social Sciences, Kalamassery, Kochi (Rajagiri Valley Campus)."
    },
    {
      q: "Are the accepted papers published?",
      a: "Yes, all accepted and registered papers will be published in Scopus-indexed volume proceedings after satisfying peer review requirements."
    },
    {
      q: "Can I register as a student attendee?",
      a: "Yes, student registrations are offered at discounted rates. Please check the Registration guidelines on the website."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 selection:bg-[#071A33] selection:text-white relative">
      {/* 00 — Top Branding Banner */}
      <TopHeaderBanner />

      {/* 01 — Navigation Bar with Attached Announcement */}
      <Header />

      {/* 03 — Main Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 04 — Footer */}
      <Footer />

      {/* ── 05: FLOATING ACTIONS WIDGET (Inspired by icswhmh.com) ── */}
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-center gap-4 select-none">
        
        {/* FAQ Button (Expandable on hover) */}
        <button
          onClick={() => setIsFaqOpen(true)}
          className="faq-btn relative h-14 w-14 hover:w-36 rounded-full bg-white border border-[#071A33]/80 text-[#071A33] flex items-center justify-center gap-0 hover:gap-2 px-3 shadow-[0_10px_25px_rgba(7,26,51,0.08)] hover:bg-[#071A33] hover:text-white transition-all duration-500 ease-in-out group overflow-hidden cursor-pointer"
          aria-label="Frequently Asked Questions"
        >
          <HelpCircle className="w-6 h-6 shrink-0 text-[#071A33] group-hover:text-white transition-colors duration-300" />
          <span className="text-[12px] font-sans font-bold uppercase tracking-wider opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all duration-300 whitespace-nowrap">
            FAQ Help
          </span>
        </button>

        {/* Scroll-to-Top Button (Visible after scroll offset, ripple effect) */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="relative h-14 w-14 rounded-full bg-white border-2 border-[#071A33] text-[#071A33] flex items-center justify-center shadow-md hover:bg-slate-50 transition-transform active:scale-95 animate-scroll-bounce cursor-pointer group"
            aria-label="Scroll to top"
          >
            {/* Ripple Waves */}
            <span className="absolute inset-0 rounded-full border-2 border-[#071A33]/30 animate-ripple-wave pointer-events-none" />
            <span className="absolute inset-0 rounded-full border-2 border-[#071A33]/15 animate-ripple-wave [animation-delay:0.8s] pointer-events-none" />
            
            <ArrowUp className="w-5 h-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* ── 06: SLIDING FAQ SIDEBAR DRAWER (Premium Light Theme) ── */}
      {isFaqOpen && (
        <div className="fixed inset-0 z-[100000] flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsFaqOpen(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer Panel */}
          <div className="w-full max-w-md h-full bg-white border-l border-slate-200 text-slate-800 relative z-10 p-8 shadow-2xl flex flex-col justify-between animate-fade-in">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 mb-8 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#071A33]/10 border border-[#071A33]/20 flex items-center justify-center text-[#071A33]">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900">
                    Frequently Asked Questions
                  </h3>
                </div>
                <button
                  onClick={() => setIsFaqOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-4.5 overflow-y-auto max-h-[70vh] pr-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                  >
                    <h4 className="font-heading font-extrabold text-[14.5px] text-[#071A33] leading-snug mb-2 flex items-start gap-2.5">
                      <span className="text-slate-400 shrink-0 font-mono text-xs mt-0.5">{String(index + 1).padStart(2, '0')}</span>
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-[13.5px] text-slate-650 font-sans leading-relaxed pl-6 m-0 font-normal">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Secretariat Help CTA */}
            <div className="pt-6 border-t border-slate-200">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#071A33] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#071A33] font-bold block mb-1">
                    Need further assistance?
                  </span>
                  <p className="text-[12px] text-slate-600 leading-relaxed font-sans m-0 font-normal">
                    Reach out to the Conference Secretariat on the{' '}
                    <Link
                      to="/contact"
                      onClick={() => setIsFaqOpen(false)}
                      className="text-[#071A33] underline font-bold hover:text-slate-900 transition-colors"
                    >
                      Contact Page
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
