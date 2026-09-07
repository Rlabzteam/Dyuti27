const fs = require('fs');

const files = ['registration.html', 'accommodation.html', 'gallery.html', 'contact.html'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n================== ${file} (lines 1-130) ==================`);
  const lines = content.split('\n');
  console.log(lines.slice(0, 130).join('\n'));
});
