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
      ? 'nav-link-active text-[#d4af37] border-[#d4af37]' 
      : 'text-white/90 hover:text-[#d4af37] border-transparent';
    return `            <li><a href="${link.href}" class="relative px-2.5 lg:px-3 2xl:px-3.5 py-1.5 text-[13px] 2xl:text-[14.5px] font-sans font-semibold border-b-2 pb-0.5 transition-all duration-200 whitespace-nowrap ${activeClasses}">${link.label}</a></li>`;
  }).join('\n');

  return `  <!-- ── 1. FLOATING NAVIGATION BAR CAPSULE (LOCKED SOLID BLUE PILL, ZERO FLICKER) ── -->
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
    </div>
  </header>`;
}

pages.forEach(({ file, key }) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace header
  const headerRegex = /<!-- ── 1\. FLOATING NAVIGATION BAR[\s\S]*?<\/header>|<header[\s\S]*?<\/header>/;
  const newHeader = generateHeader(key);
  content = content.replace(headerRegex, newHeader);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated header in ${file}`);
});
