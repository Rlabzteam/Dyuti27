const fs = require('fs');

const pages = [
  { file: 'index.html', key: 'home' },
  { file: 'rajagiri.html', key: 'rajagiri' },
  { file: 'call-for-papers.html', key: 'call-for-papers' },
  { file: 'our-team.html', key: 'our-team' },
  { file: 'registration.html', key: 'registration' },
  { file: 'accommodation.html', key: 'accommodation' },
  { file: 'attractions.html', key: 'attractions' },
  { file: 'travel.html', key: 'travel' },
  { file: 'gallery.html', key: 'gallery' },
  { file: 'contact.html', key: 'contact' },
  { file: '404.html', key: '404' }
];

const topBannerHtml = `  <!-- ── 0. TOP INSTITUTIONAL & CONFERENCE BRANDING BANNER ── -->
  <div class="top-branding-banner w-full bg-white relative z-40 border-b border-slate-100">
    <div class="max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
      <!-- Left: RCSS Official Seal -->
      <a href="http://rcss.rajagiri.edu/" target="_blank" rel="noopener noreferrer" class="flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5" title="Rajagiri College of Social Sciences (Autonomous)" aria-label="Rajagiri College of Social Sciences (Autonomous)">
        <img src="images/rcss_green_logo.png" alt="Rajagiri College of Social Sciences (Autonomous)" class="top-banner-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto object-contain select-none" loading="eager" fetchpriority="high" decoding="sync">
      </a>

      <!-- Center: Official DYUTI 27 Thematic Emblem -->
      <a href="index.html" class="flex items-center justify-center shrink min-w-0 transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5" aria-label="DYUTI 27 Conference Theme — Social Work for Sustainable Development">
        <img src="images/dyuti27_theme_header.png" alt="DYUTI 27 — Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership" class="top-banner-theme-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto max-w-[240px] xs:max-w-[300px] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[680px] object-contain select-none" loading="eager" fetchpriority="high" decoding="sync">
      </a>

      <!-- Right: DYUTI 'let me change...' Graphic -->
      <a href="index.html" class="flex items-center justify-end shrink-0 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5" aria-label="DYUTI — let me change... Home">
        <img src="images/dyuti_let_me_change.jpg" alt="DYUTI — let me change..." class="top-banner-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto object-contain select-none" loading="eager" fetchpriority="high" decoding="sync">
      </a>
    </div>
  </div>`;

function generateHeader(activeKey) {
  const links = [
    { href: 'index.html', label: 'Home', key: 'home' },
    { href: 'rajagiri.html', label: 'Rajagiri', key: 'rajagiri' },
    { href: 'call-for-papers.html', label: 'Call for Papers', key: 'call-for-papers' },
    { href: 'our-team.html', label: 'Our Team', key: 'our-team' },
    { href: 'registration.html', label: 'Registration', key: 'registration' },
    { href: 'accommodation.html', label: 'Accommodation', key: 'accommodation' },
    { href: 'attractions.html', label: 'Attractions', key: 'attractions' },
    { href: 'travel.html', label: 'Travel', key: 'travel' },
    { href: 'gallery.html', label: 'Gallery', key: 'gallery' }
  ];

  const desktopLiItems = links.map(link => {
    const isActive = link.key === activeKey;
    const activeClasses = isActive 
      ? 'font-bold text-[#d4af37] border-b-2 border-[#d4af37] pb-0.5 whitespace-nowrap focus-visible:outline-none' 
      : 'font-semibold text-white/90 hover:text-[#d4af37] transition-all whitespace-nowrap focus-visible:outline-none';
    return `            <li><a href="${link.href}" class="relative px-2.5 lg:px-3 2xl:px-3.5 py-1.5 text-[13px] 2xl:text-[14.5px] font-sans ${activeClasses}">${link.label}</a></li>`;
  }).join('\n');

  return `  <!-- ── 1. SOLID ROYAL BLUE FLOATING NAVIGATION CAPSULE (MATCHING VERCEL /rajagiri) ── -->
  <header class="sticky top-0 z-50 w-full pointer-events-none transition-all duration-300 pt-0" role="banner">
    <div class="w-[96%] sm:w-[97%] 2xl:w-[98%] max-w-[1680px] mx-auto px-1 sm:px-2 pointer-events-auto flex flex-col items-center">
      <!-- MAIN NAVIGATION BAR (SOLID BLUE: NO GLASS/NO BLUR) -->
      <div class="navbar-container w-full bg-gradient-to-r from-[#0a2540] via-[#123962] to-[#0a2540] text-white rounded-full border border-blue-400/30 px-3 sm:px-6 lg:px-8 h-[72px] sm:h-[84px] lg:h-[88px] flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 shadow-[0_8px_30px_rgba(10,37,64,0.45)] relative z-20">
        
        <!-- Left: Circular Logo Badge + Title -->
        <div class="flex items-center gap-3 shrink-0">
          <a href="index.html" class="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none shrink-0" aria-label="DYUTI 2027 — Return to Homepage">
            <div class="h-10 w-10 sm:h-12 sm:w-12 lg:h-13 lg:w-13 rounded-full bg-white p-1 shadow-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 border border-slate-200">
              <img src="https://dyuti.in/assets/images/dyutilogoog.jpg" alt="DYUTI Emblem" class="h-full w-full object-contain rounded-full" loading="eager" fetchpriority="high" decoding="sync">
            </div>
            <div class="flex flex-col leading-none">
              <span class="font-heading font-black text-[1.15rem] sm:text-[1.35rem] tracking-tight leading-none text-white">DYUTI</span>
              <span class="font-sans text-[8.5px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold leading-none mt-0.5 text-[#d4af37]">2027 &middot; Kochi</span>
            </div>
          </a>
        </div>

        <!-- Center: Desktop Navigation Links -->
        <nav aria-label="Main Navigation" class="hidden xl:flex items-center justify-center flex-1 mx-2 lg:mx-4">
          <ul class="flex items-center gap-1.5 lg:gap-2.5 2xl:gap-5 list-none m-0 p-0">
${desktopLiItems}
          </ul>
        </nav>

        <!-- Right: Contact Us Button & Mobile Toggle -->
        <div class="hidden sm:flex items-center gap-3 shrink-0">
          <a href="contact.html" class="group h-[42px] sm:h-[46px] px-7 sm:px-9 inline-flex items-center gap-2 text-[13.5px] sm:text-[15px] font-sans font-bold bg-white text-[#071A33] hover:bg-slate-100 rounded-full transition-all duration-200 shadow-sm focus-visible:outline-none hover:scale-105">
            <span>Contact Us</span>
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>

        <!-- Mobile Actions -->
        <div class="flex sm:hidden items-center gap-2 shrink-0">
          <a href="contact.html" class="px-4 h-9 inline-flex items-center text-[12.5px] font-sans font-bold bg-white text-slate-950 hover:bg-slate-100 rounded-full focus-visible:outline-none shadow-xs">
            Contact Us
          </a>
          <button id="mobile-menu-toggle" type="button" aria-label="Open navigation menu" class="w-9 h-9 flex items-center justify-center text-white border border-white/30 rounded-full bg-white/10 shadow-xs focus-visible:outline-none hover:bg-white/20 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>

      </div>

      <!-- ── 2. ATTACHED ANNOUNCEMENT BAR (MATCHING VERCEL /rajagiri EXACTLY) ── -->
      <div id="attached-marquee-bar" class="w-[88%] sm:w-[91%] max-w-[1500px] mx-auto transition-all duration-300 ease-in-out z-10 select-none overflow-hidden -mt-2.5 sm:-mt-3 max-h-14 opacity-100 translate-y-0">
        <div class="w-full bg-gradient-to-r from-[#0a2540] via-[#123962] to-[#0a2540] text-white border-x border-b border-blue-400/30 rounded-b-2xl sm:rounded-b-3xl pt-3.5 sm:pt-4 pb-1.5 sm:pb-2 px-4 sm:px-6 shadow-[0_8px_20px_rgba(10,37,64,0.4)] flex items-center overflow-hidden">
          <div class="relative flex overflow-x-hidden w-full group [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)]">
            <div class="animate-marquee whitespace-nowrap flex items-center py-0.5">
              <div class="flex items-center mx-4 sm:mx-6 text-[12px] sm:text-[13px] font-sans font-normal text-white/90">
                <span class="font-extrabold text-[#d4af37] uppercase tracking-wider mr-1.5 whitespace-nowrap">
                  Important Announcement:
                </span>
                <span>
                  The National Conference on Social Work (DYUTI 2027) &mdash; Registration begins from <strong class="text-[#d4af37] font-bold">10th August 2026</strong> at Rajagiri College Of Social Sciences (Autonomous) Kalamassery.
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <a href="registration.html" class="font-bold text-[#d4af37] hover:text-amber-200 underline decoration-[#d4af37]/70 underline-offset-2 transition-colors shrink-0">
                  REGISTER NOW &mdash; CLICK HERE FOR ONLINE REGISTRATION
                </a>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span>
                  Extended Abstract Submission Deadline: <strong class="text-white font-bold">25 September 2026</strong>
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span class="text-white/80 font-medium">
                  Kochi, Kerala, India
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
              </div>
              <div class="flex items-center mx-4 sm:mx-6 text-[12px] sm:text-[13px] font-sans font-normal text-white/90">
                <span class="font-extrabold text-[#d4af37] uppercase tracking-wider mr-1.5 whitespace-nowrap">
                  Important Announcement:
                </span>
                <span>
                  The National Conference on Social Work (DYUTI 2027) &mdash; Registration begins from <strong class="text-[#d4af37] font-bold">10th August 2026</strong> at Rajagiri College Of Social Sciences (Autonomous) Kalamassery.
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <a href="registration.html" class="font-bold text-[#d4af37] hover:text-amber-200 underline decoration-[#d4af37]/70 underline-offset-2 transition-colors shrink-0">
                  REGISTER NOW &mdash; CLICK HERE FOR ONLINE REGISTRATION
                </a>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span>
                  Extended Abstract Submission Deadline: <strong class="text-white font-bold">25 September 2026</strong>
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span class="text-white/80 font-medium">
                  Kochi, Kerala, India
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
              </div>
            </div>

            <div class="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center py-0.5" aria-hidden="true">
              <div class="flex items-center mx-4 sm:mx-6 text-[12px] sm:text-[13px] font-sans font-normal text-white/90">
                <span class="font-extrabold text-[#d4af37] uppercase tracking-wider mr-1.5 whitespace-nowrap">
                  Important Announcement:
                </span>
                <span>
                  The National Conference on Social Work (DYUTI 2027) &mdash; Registration begins from <strong class="text-[#d4af37] font-bold">10th August 2026</strong> at Rajagiri College Of Social Sciences (Autonomous) Kalamassery.
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <a href="registration.html" class="font-bold text-[#d4af37] hover:text-amber-200 underline decoration-[#d4af37]/70 underline-offset-2 transition-colors shrink-0">
                  REGISTER NOW &mdash; CLICK HERE FOR ONLINE REGISTRATION
                </a>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span>
                  Extended Abstract Submission Deadline: <strong class="text-white font-bold">25 September 2026</strong>
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span class="text-white/80 font-medium">
                  Kochi, Kerala, India
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
              </div>
              <div class="flex items-center mx-4 sm:mx-6 text-[12px] sm:text-[13px] font-sans font-normal text-white/90">
                <span class="font-extrabold text-[#d4af37] uppercase tracking-wider mr-1.5 whitespace-nowrap">
                  Important Announcement:
                </span>
                <span>
                  The National Conference on Social Work (DYUTI 2027) &mdash; Registration begins from <strong class="text-[#d4af37] font-bold">10th August 2026</strong> at Rajagiri College Of Social Sciences (Autonomous) Kalamassery.
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <a href="registration.html" class="font-bold text-[#d4af37] hover:text-amber-200 underline decoration-[#d4af37]/70 underline-offset-2 transition-colors shrink-0">
                  REGISTER NOW &mdash; CLICK HERE FOR ONLINE REGISTRATION
                </a>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span>
                  Extended Abstract Submission Deadline: <strong class="text-white font-bold">25 September 2026</strong>
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span class="text-white/80 font-medium">
                  Kochi, Kerala, India
                </span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </header>`;
}

pages.forEach(({ file, key }) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace Top Branding Banner
  const bannerRegex = /<!-- ── 0\. TOP INSTITUTIONAL[\s\S]*?<\/div>\s*<\/div>/;
  if (bannerRegex.test(content)) {
    content = content.replace(bannerRegex, topBannerHtml);
  }

  // Replace Header
  const headerRegex = /<!-- ── 1\.[\s\S]*?<\/header>|<header[\s\S]*?<\/header>/;
  const newHeader = generateHeader(key);
  content = content.replace(headerRegex, newHeader);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Synced ${file} with activeKey = ${key}`);
});
