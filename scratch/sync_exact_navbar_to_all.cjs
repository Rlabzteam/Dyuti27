const fs = require('fs');

const pageMapping = {
  'index.html': 'Home',
  'rajagiri.html': 'Rajagiri',
  'call-for-papers.html': 'Call for Papers',
  'our-team.html': 'Our Team',
  'registration.html': 'Registration',
  'accommodation.html': 'Accommodation',
  'attractions.html': 'Attractions',
  'travel.html': 'Travel',
  'gallery.html': 'Gallery',
  'contact.html': 'Contact Us',
  '404.html': ''
};

function getUnifiedHeader(activeLabel) {
  const navLinks = [
    { href: 'index.html', label: 'Home' },
    { href: 'rajagiri.html', label: 'Rajagiri' },
    { href: 'call-for-papers.html', label: 'Call for Papers' },
    { href: 'our-team.html', label: 'Our Team' },
    { href: 'registration.html', label: 'Registration' },
    { href: 'accommodation.html', label: 'Accommodation' },
    { href: 'attractions.html', label: 'Attractions' },
    { href: 'travel.html', label: 'Travel' },
    { href: 'gallery.html', label: 'Gallery' },
  ];

  const desktopItems = navLinks.map(l => {
    const isActive = l.label === activeLabel;
    const cls = isActive
      ? 'relative px-2.5 lg:px-3 2xl:px-3.5 py-1.5 text-[13px] 2xl:text-[14.5px] font-sans font-bold text-[#d4af37] border-b-2 border-[#d4af37] pb-0.5 whitespace-nowrap'
      : 'relative px-2.5 lg:px-3 2xl:px-3.5 py-1.5 text-[13px] 2xl:text-[14.5px] font-sans font-semibold text-white/90 hover:text-[#d4af37] transition-all whitespace-nowrap';
    return `            <li><a href="${l.href}" class="${cls}">${l.label}</a></li>`;
  }).join('\n');

  const mobileItems = navLinks.map(l => {
    const isActive = l.label === activeLabel;
    const cls = isActive
      ? 'px-3 py-2.5 rounded-lg bg-white/15 text-[#d4af37]'
      : 'px-3 py-2.5 rounded-lg hover:bg-white/10 text-white/90';
    return `        <a href="${l.href}" class="${cls}">${l.label}</a>`;
  }).join('\n') + `\n        <a href="contact.html" class="${activeLabel === 'Contact Us' || activeLabel === 'Contact' ? 'px-3 py-2.5 rounded-lg bg-white/15 text-[#d4af37]' : 'px-3 py-2.5 rounded-lg hover:bg-white/10 text-white/90'}">Contact</a>`;

  return `  <!-- ── 0. TOP INSTITUTIONAL & CONFERENCE BRANDING BANNER ── -->
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
  </div>

  <!-- ── 1. SOLID ROYAL BLUE FLOATING NAVIGATION CAPSULE ── -->
  <header class="sticky top-0 z-50 w-full pointer-events-none pt-0" role="banner">
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
${desktopItems}
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

      <!-- ── 2. ATTACHED ANNOUNCEMENT BAR (NARROWER ATTACHED MARQUEE TICKER) ── -->
      <div id="attached-marquee-bar" class="w-[88%] sm:w-[91%] max-w-[1500px] mx-auto transition-all duration-300 ease-in-out z-10 select-none overflow-hidden -mt-2.5 sm:-mt-3 max-h-14 opacity-100 translate-y-0">
        <div class="w-full bg-gradient-to-r from-[#0a2540] via-[#123962] to-[#0a2540] text-white border-x border-b border-blue-400/30 rounded-b-2xl sm:rounded-b-3xl pt-3.5 sm:pt-4 pb-1.5 sm:pb-2 px-4 sm:px-6 shadow-[0_8px_20px_rgba(10,37,64,0.4)] flex items-center overflow-hidden">
          <div class="relative flex overflow-x-hidden w-full group [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)]">
            <div class="animate-marquee whitespace-nowrap flex items-center py-0.5">
              <div class="flex items-center mx-4 sm:mx-6 text-[12px] sm:text-[13px] font-sans font-normal text-white/90">
                <span class="font-extrabold text-[#d4af37] uppercase tracking-wider mr-1.5 whitespace-nowrap">Important Announcement:</span>
                <span>The National Conference on Social Work (DYUTI 2027) &mdash; Registration begins from <strong class="text-[#d4af37] font-bold">10th August 2026</strong> at Rajagiri College Of Social Sciences (Autonomous) Kalamassery.</span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <a href="registration.html" class="font-bold text-[#d4af37] hover:text-amber-200 underline decoration-[#d4af37]/70 underline-offset-2 transition-colors shrink-0">REGISTER NOW &mdash; CLICK HERE FOR ONLINE REGISTRATION</a>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span>Extended Abstract Submission Deadline: <strong class="text-white font-bold">25 September 2026</strong></span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span class="text-white/80 font-medium">Kochi, Kerala, India</span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
              </div>
              <div class="flex items-center mx-4 sm:mx-6 text-[12px] sm:text-[13px] font-sans font-normal text-white/90">
                <span class="font-extrabold text-[#d4af37] uppercase tracking-wider mr-1.5 whitespace-nowrap">Important Announcement:</span>
                <span>The National Conference on Social Work (DYUTI 2027) &mdash; Registration begins from <strong class="text-[#d4af37] font-bold">10th August 2026</strong> at Rajagiri College Of Social Sciences (Autonomous) Kalamassery.</span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <a href="registration.html" class="font-bold text-[#d4af37] hover:text-amber-200 underline decoration-[#d4af37]/70 underline-offset-2 transition-colors shrink-0">REGISTER NOW &mdash; CLICK HERE FOR ONLINE REGISTRATION</a>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span>Extended Abstract Submission Deadline: <strong class="text-white font-bold">25 September 2026</strong></span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
                <span class="text-white/80 font-medium">Kochi, Kerala, India</span>
                <span class="mx-3.5 text-white/40 font-bold">&bull;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Overlay -->
  <div id="mobile-drawer-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] opacity-0 pointer-events-none transition-opacity duration-300"></div>

  <!-- Mobile Slide-In Navigation Drawer -->
  <aside id="mobile-drawer" class="fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-[#071A33] text-white z-[100000] shadow-2xl p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300 ease-in-out">
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-white/15">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-white p-1 shadow-md">
            <img src="https://dyuti.in/assets/images/dyutilogoog.jpg" alt="DYUTI Emblem" class="h-full w-full object-contain rounded-full" loading="eager" fetchpriority="high" decoding="sync">
          </div>
          <div>
            <span class="font-heading font-black text-lg text-white block leading-none">DYUTI 2027</span>
            <span class="text-[9px] text-[#d4af37] uppercase font-bold tracking-widest">National Conference</span>
          </div>
        </div>
        <button id="mobile-drawer-close" class="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 text-xl">&times;</button>
      </div>
      <nav class="flex flex-col space-y-2 font-sans font-bold text-sm">
${mobileItems}
      </nav>
    </div>
    <div class="pt-6 border-t border-white/15">
      <a href="registration.html" class="w-full h-12 inline-flex items-center justify-center gap-2 bg-amber-400 text-slate-950 font-sans font-black uppercase text-xs tracking-widest rounded-full shadow-lg">REGISTER ONLINE</a>
    </div>
  </aside>`;
}

const allFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  const bannerStart = content.indexOf('<!-- ── 0. TOP INSTITUTIONAL');
  const mainStart = content.indexOf('<main');

  if (bannerStart === -1 || mainStart === -1) {
    console.error('Missing banner/main markers in:', file);
    return;
  }

  const beforeBanner = content.slice(0, bannerStart);
  const fromMain = content.slice(mainStart);

  const activeLabel = pageMapping[file] || '';
  const newHeader = getUnifiedHeader(activeLabel);

  const finalHtml = beforeBanner + newHeader + '\n\n  <!-- ── MAIN PAGE CONTENT CONTAINER ── -->\n  ' + fromMain;
  fs.writeFileSync(file, finalHtml, 'utf8');
  console.log('Synchronized exact navbar to:', file);
});
