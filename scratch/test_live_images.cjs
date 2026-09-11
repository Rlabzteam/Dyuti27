const fs = require('fs');
const path = require('path');
const https = require('https');

const host = 'positive-cyan-dolphin.198-187-29-67.cpanel.site';

function extractImages(file) {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<img[\s\S]*?src=["']([^"']+)["']/gi;
  const imgs = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    imgs.push(m[1]);
  }
  return imgs;
}

const teamImgs = extractImages('our-team.html');
const galleryImgs = extractImages('gallery.html');
console.log(`Extracted ${teamImgs.length} from our-team.html, ${galleryImgs.length} from gallery.html`);
const allImgs = Array.from(new Set([...teamImgs, ...galleryImgs]));

console.log(`Testing ${allImgs.length} unique images against live cPanel server...`);

async function testImg(urlPath) {
  return new Promise(resolve => {
    let fullUrl = urlPath;
    if (!urlPath.startsWith('http')) {
      fullUrl = `https://${host}/${urlPath.replace(/^\//, '')}`;
    }
    const req = https.get(fullUrl, { rejectUnauthorized: false, timeout: 5000 }, res => {
      resolve({ path: urlPath, status: res.statusCode, contentType: res.headers['content-type'] });
    });
    req.on('error', err => {
      resolve({ path: urlPath, status: 'ERROR: ' + err.message });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ path: urlPath, status: 'TIMEOUT' });
    });
  });
}

(async () => {
  const failed = [];
  const ok = [];
  for (const img of allImgs) {
    const res = await testImg(img);
    if (res.status === 200) {
      ok.push(res);
    } else {
      failed.push(res);
      console.log(`[FAILED] ${img} -> ${res.status}`);
    }
  }
  console.log(`\nResults: ${ok.length} passed, ${failed.length} failed.`);
})();
