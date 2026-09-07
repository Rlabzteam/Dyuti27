const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const regHtml = fs.readFileSync('registration.html', 'utf8');
const indexHB = indexHtml.match(/<div class="top-branding-banner[\s\S]*?<\/header>/)[0];
const regHB = regHtml.match(/<div class="top-branding-banner[\s\S]*?<\/header>/)[0];

const lines1 = indexHB.split('\n');
const lines2 = regHB.split('\n');
for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
  if (lines1[i] !== lines2[i]) {
    console.log(`Line ${i}:`);
    console.log('  Index:', lines1[i]);
    console.log('  Reg:  ', lines2[i]);
  }
}
