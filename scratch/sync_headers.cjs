const fs = require('fs');

// Read standard header & drawer from index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

const bannerStart = indexHtml.indexOf('<!-- ── 0. TOP INSTITUTIONAL & CONFERENCE BRANDING BANNER ── -->');
const mainStart = indexHtml.indexOf('<main');

if (bannerStart === -1 || mainStart === -1) {
  console.error('Could not find header boundaries in index.html');
  process.exit(1);
}

const headerTemplate = indexHtml.slice(bannerStart, mainStart);

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

const allFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let bStart = content.indexOf('<!-- ── 0. TOP INSTITUTIONAL');
  if (bStart === -1) bStart = content.indexOf('<div class="top-branding-banner');
  const mStart = content.indexOf('<main');

  if (bStart === -1 || mStart === -1) {
    console.warn('Skipping file without standard boundaries:', file);
    return;
  }

  // Customize active link for this file
  let pageHeader = headerTemplate;
  const activeLabel = pageMapping[file] || '';

  // Reset desktop links
  pageHeader = pageHeader.replace(/class="relative px-2\.5 lg:px-3 2xl:px-3\.5 py-1\.5 text-\[13px\] 2xl:text-\[14\.5px\] font-sans font-bold text-\[#d4af37\] border-b-2 border-\[#d4af37\] pb-0\.5 whitespace-nowrap"/g, 'class="relative px-2.5 lg:px-3 2xl:px-3.5 py-1.5 text-[13px] 2xl:text-[14.5px] font-sans font-semibold text-white/90 hover:text-[#d4af37] transition-all whitespace-nowrap"');
  
  // Set current page active desktop link
  if (activeLabel) {
    const linkRegex = new RegExp(`(<a href="[^"]*"[^>]*>${activeLabel}</a>)`, 'i');
    pageHeader = pageHeader.replace(linkRegex, (match) => {
      return match.replace('text-white/90 hover:text-[#d4af37] transition-all', 'font-bold text-[#d4af37] border-b-2 border-[#d4af37] pb-0.5');
    });
  }

  // Reset mobile links
  pageHeader = pageHeader.replace(/class="px-3 py-2\.5 rounded-lg bg-white\/15 text-\[#d4af37\]"/g, 'class="px-3 py-2.5 rounded-lg hover:bg-white/10 text-white/90"');

  // Set current page active mobile link
  if (activeLabel) {
    const mobileLinkRegex = new RegExp(`(<a href="[^"]*" class="px-3 py-2\\.5 rounded-lg hover:bg-white/10 text-white/90">${activeLabel}</a>)`, 'i');
    pageHeader = pageHeader.replace(mobileLinkRegex, (match) => {
      return match.replace('hover:bg-white/10 text-white/90', 'bg-white/15 text-[#d4af37]');
    });
  }

  const updatedContent = content.slice(0, bStart) + pageHeader + content.slice(mStart);
  fs.writeFileSync(file, updatedContent, 'utf8');
  console.log('Successfully synchronized header in:', file);
});
