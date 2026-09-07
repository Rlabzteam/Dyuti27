const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const mainMatch = content.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    const lines = mainMatch[1].trim().split('\n').slice(0, 5).map(l => l.trim()).join(' ');
    console.log(f.padEnd(25), lines);
  }
});
