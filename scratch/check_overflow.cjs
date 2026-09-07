const fs = require('fs');

const files = ['registration.html', 'accommodation.html', 'gallery.html', 'contact.html'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n================== ${file} ==================`);
  
  // Search for any min-w or fixed large width elements
  const minWs = content.match(/min-w-\[[^\]]+\]/g) || [];
  const fixedWs = content.match(/w-\[[0-9]+px\]/g) || [];
  console.log('min-w classes:', minWs);
  console.log('fixed-w classes:', fixedWs);

  // Check if any tables or forms have min-width
  const tableMatches = content.match(/<table[\s\S]*?<\/table>/g) || [];
  console.log('Tables count:', tableMatches.length);
  tableMatches.forEach(t => {
    const classMatch = t.match(/class=["']([^"']+)["']/);
    console.log('  Table class:', classMatch ? classMatch[1] : 'none');
  });
});
