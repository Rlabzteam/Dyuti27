import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Heart } from 'lucide-react';
import { CONFERENCE_DATA } from '@/data/conference';

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full bg-[#030C22] text-white"
      aria-label="Footer Navigation and Secretariat Contacts"
    >
      {/* ── PURE 100% FULL-WIDTH STANDARD RECTANGLE (TOUCHING BOTH ENDS) ── */}
      <div className="w-full bg-gradient-to-br from-[#071A33] via-[#0b2952] to-[#030C22] border-t border-[#123962] shadow-2xl relative">
        
        {/* Subtle background ambient shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-14 sm:pt-18 pb-12 sm:pb-16 relative z-10">

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/15">

            {/* Col 1: Pages Links (4 cols) */}
            <div className="md:col-span-4 lg:col-span-4 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-amber-300 font-black">
                Pages
              </h4>
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-sm text-slate-100 font-sans font-bold">
                <Link to="/" className="hover:text-amber-300 transition-colors">HOME</Link>
                <Link to="/rajagiri" className="hover:text-amber-300 transition-colors">RAJAGIRI</Link>
                <Link to="/call_for_papers" className="hover:text-amber-300 transition-colors">CALL FOR PAPERS</Link>
                <Link to="/accomodation" className="hover:text-amber-300 transition-colors">ACCOMMODATION</Link>
                <a
                  href={CONFERENCE_DATA.links.registrationForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 font-black hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>REGISTRATION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link to="/gallery" className="hover:text-amber-300 transition-colors">GALLERY</Link>
                <Link to="/attractions" className="hover:text-amber-300 transition-colors">ATTRACTIONS</Link>
                <Link to="/travel" className="hover:text-amber-300 transition-colors">TRAVEL</Link>
              </div>
            </div>

            {/* Col 2: Secretariat Contacts (5 cols) */}
            <div className="md:col-span-5 lg:col-span-5 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-amber-300 font-black">
                Secretariat Contact
              </h4>
              <div className="space-y-4 text-sm text-slate-100 font-sans">
                <div>
                  <p className="font-black text-white text-base">Dr. Sr. Bincy C.C</p>
                  <p className="text-slate-200 text-sm font-medium">Assistant Professor,</p>
                  <p className="text-slate-200 text-sm font-medium">Department of Social Work</p>
                </div>

                <div>
                  <p className="font-black text-white text-base">Dr. V. Kalyani</p>
                  <p className="text-slate-200 text-sm font-medium">Assistant Professor,</p>
                  <p className="text-slate-200 text-sm font-medium">Department of Social Work</p>
                  <p className="mt-2">
                    <a
                      href="mailto:dyuti@rajagiri.edu"
                      className="text-amber-300 hover:underline flex items-center gap-2 text-sm font-black"
                    >
                      <Mail className="w-4 h-4 text-amber-300" />
                      <span>dyuti@rajagiri.edu</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Col 3: Emblem & Logo (3 cols) */}
            <div className="md:col-span-3 lg:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
              <img
                src="https://dyuti.in/assets/images/25.png"
                alt="DYUTI - 25 Years of Internationalism"
                className="w-24 sm:w-28 h-auto object-contain drop-shadow-md brightness-110"
                loading="lazy"
              />
              <div className="text-left md:text-right">
                <span className="text-xs text-slate-300 block font-mono font-medium">Host Institution</span>
                <span className="text-sm sm:text-base text-white font-black block font-sans">Rajagiri College of Social Sciences</span>
                <span className="text-xs sm:text-[13px] text-slate-200 block font-sans font-medium">(Autonomous), Kalamassery, Kochi</span>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Social Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-200 font-sans font-medium relative z-10">
            <div className="flex items-center gap-1.5 text-center sm:text-left">
              <span>Copyright &copy; 2026 DYUTI | Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
              <span>By</span>
              <a
                href="http://rlabz.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:underline font-black"
              >
                RlabZ
              </a>
            </div>

            {/* Social Icons matching dyuti.in */}
            <div className="flex items-center gap-4">
              <a
                href={CONFERENCE_DATA.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all p-2 border border-white/20 shadow-xs"
                aria-label="Facebook"
              >
                <img
                  src="https://dyuti.in/assets/images/fb_icon.png"
                  alt="Facebook"
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href={CONFERENCE_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all p-2 border border-white/20 shadow-xs"
                aria-label="Instagram"
              >
                <img
                  src="https://dyuti.in/assets/images/instagram.png"
                  alt="Instagram"
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href={CONFERENCE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all p-2 border border-white/20 shadow-xs"
                aria-label="LinkedIn"
              >
                <img
                  src="https://dyuti.in/assets/images/linkedin.png"
                  alt="LinkedIn"
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href={CONFERENCE_DATA.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all p-2 border border-white/20 shadow-xs"
                aria-label="Twitter / X"
              >
                <img
                  src="https://dyuti.in/assets/images/twitter.png"
                  alt="Twitter"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};








