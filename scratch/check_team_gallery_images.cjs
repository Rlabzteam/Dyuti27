const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\bless\\OneDrive\\Desktop\\new website';

function checkPage(filename) {
  const filePath = path.join(projectDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find all src and data-src and href attributes for images
  const regex = /(?:src|data-src|href|background-image:\s*url\()=["']?([^"'>\s\)]+)["']?/gi;
  const found = new Set();
  let m;
  while ((m = regex.exec(content)) !== null) {
    const val = m[1];
    if (val.match(/\.(jpg|jpeg|png|webp|svg|gif|avif)/i) || val.includes('image')) {
      found.add(val);
    }
  }

  console.log(`\n================== ${filename} (${found.size} images found) ==================`);
  
  for (const imgPath of found) {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      console.log(`[EXTERNAL] ${imgPath}`);
      continue;
    }

    // Clean query params or hashes
    const cleanPath = imgPath.split('?')[0].split('#')[0];
    const fullPath = path.join(projectDir, cleanPath);
    const exists = fs.existsSync(fullPath);

    if (!exists) {
      console.log(`[MISSING!] ${imgPath} -> not found at ${fullPath}`);
    } else {
      // Check exact case sensitivity on disk (Linux is case-sensitive!)
      const parts = cleanPath.split(/[/\\]/);
      let cur = projectDir;
      let caseMismatch = false;
      for (const part of parts) {
        if (!part) continue;
        const entries = fs.readdirSync(cur);
        if (!entries.includes(part)) {
          const match = entries.find(e => e.toLowerCase() === part.toLowerCase());
          console.log(`[CASE MISMATCH!] In ${cleanPath}: '${part}' vs actual '${match}' on disk!`);
          caseMismatch = true;
          cur = path.join(cur, match || part);
        } else {
          cur = path.join(cur, part);
        }
      }
      if (!caseMismatch) {
        console.log(`[LOCAL OK] ${imgPath}`);
      }
    }
  }
}

checkPage('our-team.html');
checkPage('gallery.html');

console.log('\n--- Checking JS files for image references ---');
['js/app.js'].forEach(jsFile => {
  if (!fs.existsSync(jsFile)) return;
  const content = fs.readFileSync(jsFile, 'utf8');
  const matches = content.match(/[a-zA-Z0-9_\-\/]+\.(jpg|jpeg|png|webp|svg)/gi) || [];
  console.log(`${jsFile} has ${matches.length} image references`);
  matches.forEach(m => {
    const full = path.join(projectDir, m);
    if (!fs.existsSync(full)) {
      console.log(`  [MISSING in JS] ${m}`);
    }
  });
});
