const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'accommodation.html',
  'attractions.html',
  'call-for-papers.html',
  'contact.html',
  'gallery.html',
  'our-team.html',
  'rajagiri.html',
  'registration.html',
  'travel.html',
  '404.html'
];

const topBannerHTML = `  <!-- ── 0. TOP INSTITUTIONAL & CONFERENCE BRANDING BANNER ── -->
  <div class="top-branding-banner w-full bg-white relative z-40 border-b border-slate-100">
    <div class="max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
      <!-- Left: RCSS Official Seal -->
      <a href="http://rcss.rajagiri.edu/" target="_blank" rel="noopener noreferrer" class="flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5" title="Rajagiri College of Social Sciences (Autonomous)" aria-label="Rajagiri College of Social Sciences (Autonomous)">
        <img src="images/rcss_green_logo.png" alt="Rajagiri College of Social Sciences (Autonomous)" class="top-banner-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto object-contain select-none" loading="eager" fetchpriority="high" decoding="async">
      </a>

      <!-- Center: Official DYUTI 27 Thematic Emblem -->
      <a href="index.html" class="flex items-center justify-center shrink min-w-0 transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5" aria-label="DYUTI 27 Conference Theme — Social Work for Sustainable Development">
        <img src="images/dyuti27_theme_header.png" alt="DYUTI 27 — Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership" class="top-banner-theme-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto max-w-[240px] xs:max-w-[300px] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[680px] object-contain select-none" loading="eager" fetchpriority="high" decoding="async">
      </a>

      <!-- Right: DYUTI 'let me change...' Graphic -->
      <a href="index.html" class="flex items-center justify-end shrink-0 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5" aria-label="DYUTI — let me change... Home">
        <img src="images/dyuti_let_me_change.jpg" alt="DYUTI — let me change..." class="top-banner-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto object-contain select-none" loading="eager" decoding="async">
      </a>
    </div>
  </div>`;

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace top branding banner
  content = content.replace(/<!-- ── 0\. TOP INSTITUTIONAL[\s\S]*?<\/div>\s*<\/div>/, topBannerHTML);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated top banner in:', file);
});
