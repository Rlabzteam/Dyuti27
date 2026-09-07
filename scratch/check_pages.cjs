const fs = require('fs');

const pages = ['index.html', 'registration.html', 'accommodation.html', 'gallery.html', 'contact.html', 'our-team.html', 'call-for-papers.html', 'attractions.html', 'travel.html', 'rajagiri.html'];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=== ${file} ===`);
  
  // Find all stylesheet links
  const head = content.substring(0, content.indexOf('</head>'));
  const links = head.match(/<link[^>]+>/g) || [];
  console.log('Links in head:');
  links.forEach(l => console.log('  ' + l));
  
  // Check body classes
  const bodyMatch = content.match(/<body[^>]*>/);
  console.log('Body tag:', bodyMatch ? bodyMatch[0] : 'None');
  
  // Check main tag
  const mainMatch = content.match(/<main[^>]*>/);
  console.log('Main tag:', mainMatch ? mainMatch[0] : 'None');
  
  // Check first child of main
  const mainStart = content.indexOf('<main');
  if (mainStart !== -1) {
    const mainSection = content.substring(mainStart, mainStart + 400);
    console.log('Main opening chunk:\n' + mainSection);
  }
});
