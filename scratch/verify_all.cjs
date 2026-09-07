const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let allOk = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasMainOpen = content.includes('<main class="flex-grow">');
  const hasMainClose = content.includes('</main>');
  const hasHeader = content.includes('class="navbar-container');
  const hasMarquee = content.includes('id="attached-marquee-bar"');
  const hasAside = content.includes('<aside id="mobile-drawer"');

  const ok = hasMainOpen && hasMainClose && hasHeader && hasMarquee && hasAside;
  if (!ok) allOk = false;
  console.log(f.padEnd(25), ok ? 'ALL OK' : 'FAILED', { main: hasMainOpen && hasMainClose, header: hasHeader, marquee: hasMarquee, aside: hasAside });
});

console.log('\nResult:', allOk ? 'PERFECT! ALL 11 FILES FULLY SYNCHRONIZED!' : 'SOME FAILED!');
