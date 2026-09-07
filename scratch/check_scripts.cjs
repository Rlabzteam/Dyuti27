const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasAppJs = content.includes('js/app.js');
  const scripts = content.match(/<script[^>]*src=["'][^"']+["'][^>]*>/g) || [];
  console.log(`${f}: has js/app.js? ${hasAppJs}, scripts: ${scripts.join(', ')}`);
});
