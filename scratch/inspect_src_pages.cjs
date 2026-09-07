const fs = require('fs');
const path = require('path');

const srcPages = fs.readdirSync('src/pages');
srcPages.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const content = fs.readFileSync(path.join('src/pages', file), 'utf8');
  console.log(`\n=== src/pages/${file} ===`);
  // Look for return statement or outer div
  const returnMatch = content.match(/return\s*\(\s*<div[^>]*className=["']([^"']+)["']/);
  if (returnMatch) {
    console.log('Outer div class:', returnMatch[1]);
  }
  const maxWMatches = content.match(/max-w-[^\s"']+/g) || [];
  console.log('max-w classes:', Array.from(new Set(maxWMatches)));
});
