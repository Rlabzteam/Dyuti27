const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\bless\\OneDrive\\Desktop\\new website';

const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /class="max-w-\[1520px\] mx-auto px-3 sm:px-6 lg:px-8 py-1\.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-6 md:gap-8"/g,
    'class="max-w-[1520px] mx-auto px-2.5 sm:px-6 lg:px-8 py-2 sm:py-2 flex items-center justify-between gap-2.5 sm:gap-6 md:gap-8"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated top banner gap in ${file}`);
});
