const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\bless\\OneDrive\\Desktop\\new website';

const pageTitles = {
  'index.html': 'DYUTI 2027',
  'rajagiri.html': 'DYUTI 2027 — Rajagiri College of Social Sciences',
  'call-for-papers.html': 'DYUTI 2027 — Call for Papers',
  'our-team.html': 'DYUTI 2027 — Our Team',
  'registration.html': 'DYUTI 2027 — Registration',
  'accommodation.html': 'DYUTI 2027 — Accommodation',
  'attractions.html': 'DYUTI 2027 — Attractions',
  'travel.html': 'DYUTI 2027 — Travel Directions',
  'gallery.html': 'DYUTI 2027 — Gallery',
  'contact.html': 'DYUTI 2027 — Contact',
  '404.html': 'DYUTI 2027 — Page Not Found',
  'sitemap.html': 'DYUTI 2027 — Site Map'
};

const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update Title tag if mapped
  if (pageTitles[file]) {
    content = content.replace(/<title>.*?<\/title>/s, `<title>${pageTitles[file]}</title>`);
  }

  // 2. Remove "National Academic Conference" from page content/headings if present
  content = content.replace(/National Academic Conference/g, 'Conference');
  content = content.replace(/Annual National Academic Conference/g, 'Annual Conference');

  // 3. Set Favicon link to 28_years_internationalisation.png
  content = content.replace(/<link rel="icon" type="image\/jpeg" href="https:\/\/dyuti\.in\/assets\/images\/dyutilogoog\.jpg">/g, '');
  content = content.replace(/<link rel="icon" type="image\/png" href="images\/dyuti27_logo\.png">/g, '<link rel="icon" type="image/png" href="images/28_years_internationalisation.png">');

  // 4. Update the navbar logo image near DYUTI title
  content = content.replace(/<img src="https:\/\/dyuti\.in\/assets\/images\/dyutilogoog\.jpg" alt="DYUTI Emblem"/g, '<img src="images/28_years_internationalisation.png" alt="28 Years Emblem"');

  // 5. Update mobile drawer logo image if present
  content = content.replace(/<img src="https:\/\/dyuti\.in\/assets\/images\/dyutilogoog\.jpg" alt="DYUTI Emblem" class="h-full w-full object-contain rounded-full"/g, '<img src="images/28_years_internationalisation.png" alt="28 Years Emblem" class="h-full w-full object-contain rounded-full"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
