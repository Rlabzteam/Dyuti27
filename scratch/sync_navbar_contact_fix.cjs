const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\bless\\OneDrive\\Desktop\\new website';

const pageActiveMap = {
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

const navItems = [
  { href: 'index.html', label: 'Home' },
  { href: 'rajagiri.html', label: 'Rajagiri' },
  { href: 'call-for-papers.html', label: 'Call for Papers' },
  { href: 'our-team.html', label: 'Our Team' },
  { href: 'registration.html', label: 'Registration' },
  { href: 'accommodation.html', label: 'Accommodation' },
  { href: 'attractions.html', label: 'Attractions' },
  { href: 'travel.html', label: 'Travel' },
  { href: 'gallery.html', label: 'Gallery' }
];

function buildNavbarCenterAndRight(activeLabel) {
  const linksHtml = navItems.map(item => {
    const isActive = item.label === activeLabel;
    const cls = isActive
      ? 'relative px-2 xl:px-2.5 2xl:px-3.5 py-1.5 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-sans font-bold text-[#d4af37] border-b-2 border-[#d4af37] pb-0.5 whitespace-nowrap focus-visible:outline-none'
      : 'relative px-2 xl:px-2.5 2xl:px-3.5 py-1.5 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-sans font-semibold text-white/90 hover:text-[#d4af37] transition-all whitespace-nowrap focus-visible:outline-none';
    return `            <li><a href="${item.href}" class="${cls}">${item.label}</a></li>`;
  }).join('\n');

  return `        <!-- Center: Desktop Navigation Links -->
        <nav aria-label="Main Navigation" class="hidden xl:flex items-center justify-center flex-1 min-w-0 mx-2 lg:mx-4">
          <ul class="flex items-center gap-1 xl:gap-2 2xl:gap-4 list-none m-0 p-0">
${linksHtml}
          </ul>
        </nav>

        <!-- Right: Contact Us Button & Mobile Toggle -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <a href="contact.html"
            class="group h-[38px] sm:h-[44px] lg:h-[46px] px-3.5 sm:px-5 lg:px-6 2xl:px-8 inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[14px] lg:text-[15px] font-sans font-bold bg-white text-[#071A33] hover:bg-slate-100 rounded-full transition-all duration-200 shadow-sm focus-visible:outline-none hover:scale-105 shrink-0 whitespace-nowrap">
            <span>Contact Us</span>
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <button id="mobile-menu-toggle" type="button" aria-label="Open navigation menu"
            class="xl:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white border border-white/30 rounded-full bg-white/10 shadow-xs focus-visible:outline-none hover:bg-white/20 transition-colors shrink-0">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>`;
}

// Regex to match from <!-- Center: Desktop Navigation Links --> up to the closing </div> of .navbar-container
const navAndRightRegex = /<!-- Center: Desktop Navigation Links -->[\s\S]*?(?=\s*<\/div>\s*<!-- ── 2\. ATTACHED ANNOUNCEMENT BAR|\s*<\/div>\s*<\/header>|\s*<\/div>\s*<div id="attached-marquee-bar")/i;

Object.keys(pageActiveMap).forEach(filename => {
  const filePath = path.join(projectDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filename}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const activeLabel = pageActiveMap[filename];
  const newCenterAndRight = buildNavbarCenterAndRight(activeLabel);

  if (navAndRightRegex.test(content)) {
    content = content.replace(navAndRightRegex, newCenterAndRight + '\n\n      ');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated navbar in ${filename}`);
  } else {
    console.error(`Regex failed to match in ${filename}`);
  }
});
