const fs = require('fs');

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
  'contact.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const nav = content.match(/<nav aria-label="Main Navigation"[\s\S]*?<\/nav>/);
  console.log(`\n=== ${f} ===`);
  if (nav) {
    const liItems = nav[0].match(/<li>[\s\S]*?<\/li>/g) || [];
    liItems.forEach(li => {
      if (li.includes('text-[#d4af37]')) {
        const textMatch = li.match(/>([^<]+)<\/a>/);
        console.log('  Active center link:', textMatch ? textMatch[1].trim() : 'unknown');
      }
    });
  }
});
