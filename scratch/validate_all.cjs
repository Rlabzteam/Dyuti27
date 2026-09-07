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

let allValid = true;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`File missing: ${file}`);
    allValid = false;
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');

  // Check essential elements
  const checks = [
    { name: 'DOCTYPE', regex: /<!DOCTYPE html>/i },
    { name: 'Top Branding Banner', regex: /<div class="top-branding-banner/ },
    { name: 'RCSS Logo', regex: /src="images\/rcss_green_logo\.png"/ },
    { name: 'DYUTI Theme Banner', regex: /src="images\/dyuti27_theme_header\.png"/ },
    { name: 'Header Tag', regex: /<header[\s\S]*?<\/header>/ },
    { name: 'Navbar Container', regex: /class="navbar-container/ },
    { name: 'Main Tag', regex: /<main[\s\S]*?<\/main>/ },
    { name: 'App JS Script', regex: /<script src="js\/app\.js"><\/script>/ }
  ];

  const results = checks.map(c => ({ name: c.name, pass: c.regex.test(content) }));
  const failed = results.filter(r => !r.pass);

  if (failed.length > 0) {
    console.error(`FAIL in ${file}:`, failed.map(f => f.name).join(', '));
    allValid = false;
  } else {
    console.log(`PASS: ${file}`);
  }
}

if (allValid) {
  console.log('\n ALL 11 HTML FILES ARE CONSISTENT & VALID!');
} else {
  console.error('\n Some checks failed.');
}
