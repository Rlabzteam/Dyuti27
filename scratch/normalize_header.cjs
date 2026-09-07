const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'rajagiri.html',
  'call-for-papers.html',
  'our-team.html',
  'registration.html',
  'accommodation.html',
  'attractions.html',
  'travel.html',
  'gallery.html',
  'contact.html',
  '404.html'
];

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /<header class="sticky top-0 z-50 w-full pointer-events-none transition-all duration-300 pt-0" role="banner">/g,
    '<header class="sticky top-0 z-50 w-full pointer-events-none pt-0" role="banner">'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
