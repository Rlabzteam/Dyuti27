const fs = require('fs');

const allFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Add image preloads to <head> if not already present
  const preloadTag = `  <!-- Preload Header & Brand Logos for Zero-Flash Switching -->
  <link rel="preload" as="image" href="images/rcss_green_logo.png">
  <link rel="preload" as="image" href="images/dyuti27_theme_header.png">
  <link rel="preload" as="image" href="images/dyuti_let_me_change.jpg">
  <link rel="preload" as="image" href="https://dyuti.in/assets/images/dyutilogoog.jpg">`;

  if (!content.includes('rel="preload" as="image" href="images/rcss_green_logo.png"')) {
    content = content.replace('</head>', `${preloadTag}\n</head>`);
  }

  // 2. Update Top Banner images with decoding="sync" and fetchpriority="high"
  content = content.replace(
    /<img src="images\/rcss_green_logo\.png"[^>]*>/g,
    '<img src="images/rcss_green_logo.png" alt="Rajagiri College of Social Sciences (Autonomous)" class="top-banner-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto object-contain select-none" loading="eager" fetchpriority="high" decoding="sync">'
  );

  content = content.replace(
    /<img src="images\/dyuti27_theme_header\.png"[^>]*>/g,
    '<img src="images/dyuti27_theme_header.png" alt="DYUTI 27 — Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership" class="top-banner-theme-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto max-w-[240px] xs:max-w-[300px] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[680px] object-contain select-none" loading="eager" fetchpriority="high" decoding="sync">'
  );

  content = content.replace(
    /<img src="images\/dyuti_let_me_change\.jpg"[^>]*>/g,
    '<img src="images/dyuti_let_me_change.jpg" alt="DYUTI — let me change..." class="top-banner-logo h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[72px] w-auto object-contain select-none" loading="eager" fetchpriority="high" decoding="sync">'
  );

  content = content.replace(
    /<img src="https:\/\/dyuti\.in\/assets\/images\/dyutilogoog\.jpg"[^>]*>/g,
    '<img src="https://dyuti.in/assets/images/dyutilogoog.jpg" alt="DYUTI Emblem" class="h-full w-full object-contain rounded-full" loading="eager" fetchpriority="high" decoding="sync">'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated preload and sync images in:', file);
});
