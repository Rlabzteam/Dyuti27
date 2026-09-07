const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const bannerStart = content.indexOf('<div class="top-branding-banner');
  const bannerEnd = content.indexOf('<!-- ── 1. SOLID ROYAL BLUE');
  const banner = bannerStart !== -1 && bannerEnd !== -1 ? content.slice(bannerStart, bannerEnd).trim() : 'MISSING';

  const headerStart = content.indexOf('<header');
  const headerEnd = content.indexOf('</header>');
  const header = headerStart !== -1 && headerEnd !== -1 ? content.slice(headerStart, headerEnd + 9).trim() : 'MISSING';

  console.log('===', f, '===');
  console.log('Banner length:', banner.length);
  console.log('Header length:', header.length);
  
  // Check if header contains any specific differences
  const navLinks = header.match(/<nav aria-label="Main Navigation"[\s\S]*?<\/nav>/);
  console.log('Nav links present:', !!navLinks);
});
