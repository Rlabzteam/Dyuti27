const fs = require('fs');

const subpages = [
  'accommodation.html',
  'attractions.html',
  'call-for-papers.html',
  'contact.html',
  'gallery.html',
  'our-team.html',
  'registration.html',
  'travel.html',
  '404.html'
];

subpages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  const mainStart = content.indexOf('<main class="flex-grow">');
  const mainEnd = content.indexOf('</main>');

  if (mainStart === -1 || mainEnd === -1) {
    console.warn('Could not find main tags in:', file);
    return;
  }

  const innerMain = content.slice(mainStart + '<main class="flex-grow">'.length, mainEnd).trim();

  // If not already wrapped with pt-8
  if (!innerMain.startsWith('<div class="pt-8')) {
    const wrappedMain = `\n    <div class="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">\n      ${innerMain}\n    </div>\n  `;
    const newContent = content.slice(0, mainStart + '<main class="flex-grow">'.length) + wrappedMain + content.slice(mainEnd);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Added standard subpage padding container to:', file);
  } else {
    console.log('Already padded:', file);
  }
});
