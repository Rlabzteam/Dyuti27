const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\bless\\OneDrive\\Desktop\\new website';

const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace any existing img src in the navbar circular badge next to DYUTI title with images/dyuti_let_me_change.jpg
  content = content.replace(
    /<img src="[^"]*" alt="[^"]*"(\s*class="h-full w-full object-contain rounded-full"[^>]*)>/g,
    (match) => {
      if (match.includes('rcss_green_logo') || match.includes('top-banner-logo') || match.includes('top-banner-theme-logo')) {
        return match;
      }
      return '<img src="images/dyuti_let_me_change.jpg" alt="DYUTI let me change..." class="h-full w-full object-contain rounded-full" loading="eager" fetchpriority="high" decoding="sync">';
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated navbar logo in ${file}`);
});
