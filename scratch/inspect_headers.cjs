const fs = require('fs');

const files = [
  'index.html',
  'registration.html',
  'accommodation.html',
  'gallery.html',
  'contact.html',
  'our-team.html',
  'call-for-papers.html',
  'attractions.html',
  'travel.html',
  'rajagiri.html',
  '404.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/);
  console.log(`\n================== ${file} ==================`);
  if (headerMatch) {
    console.log(headerMatch[0]);
  } else {
    console.log('NO HEADER FOUND');
  }
}
