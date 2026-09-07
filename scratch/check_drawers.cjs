const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasAside = content.includes('<aside id="mobile-drawer"');
  const hasDiv = content.includes('<div id="mobile-drawer"');
  console.log(f.padEnd(25), 'Aside:', hasAside, 'Div:', hasDiv);
});
