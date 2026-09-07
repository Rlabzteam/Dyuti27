const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const allHrefs = new Set();
const fileHrefs = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.matchAll(/href="([^"]+)"/g);
  fileHrefs[f] = [];
  for (const m of matches) {
    allHrefs.add(m[1]);
    fileHrefs[f].push(m[1]);
  }
});

console.log('All unique hrefs in project:');
console.log(Array.from(allHrefs));
