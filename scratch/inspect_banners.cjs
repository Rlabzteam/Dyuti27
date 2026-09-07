const fs = require('fs');

const files = ['index.html', 'rajagiri.html', 'registration.html', 'accommodation.html', 'gallery.html', 'contact.html'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n================== ${file} ==================`);
  
  // 1. Top branding banner markup
  const bannerMatch = content.match(/<!-- ── 0\. TOP INSTITUTIONAL[\s\S]*?<\/div>\s*<\/div>/);
  if (bannerMatch) {
    console.log('Banner length:', bannerMatch[0].length);
    console.log('Banner markup:\n', bannerMatch[0]);
  } else {
    console.log('NO BANNER MATCH');
    const altBanner = content.match(/<div class="top-branding-banner[\s\S]*?<\/header>/);
    if (altBanner) console.log('Alt banner found:', altBanner[0].substring(0, 300));
  }

  // 2. Check viewport meta tag
  const vpMatch = content.match(/<meta[^>]*name=["']viewport["'][^>]*>/);
  console.log('Viewport:', vpMatch ? vpMatch[0] : 'NONE');

  // 3. Check CSS links
  const cssMatches = content.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/g);
  console.log('CSS links:', cssMatches);
});
