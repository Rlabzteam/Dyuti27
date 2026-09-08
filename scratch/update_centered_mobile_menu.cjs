const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\bless\\OneDrive\\Desktop\\new website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove "Contact Us" link button from mobile actions (sm:hidden)
  content = content.replace(
    /<!-- Mobile Actions -->[\s\S]*?<button id="mobile-menu-toggle"/g,
    `<!-- Mobile Actions -->\n        <div class="flex sm:hidden items-center gap-2 shrink-0">\n          <button id="mobile-menu-toggle"`
  );

  // 2. Change Mobile Overlay & Aside class definitions to centered modal
  content = content.replace(
    /<div id="mobile-drawer-overlay"[\s\S]*?class="[^"]*"/g,
    `<div id="mobile-drawer-overlay"\n    class="fixed inset-0 bg-black/75 backdrop-blur-md z-[9999] opacity-0 pointer-events-none transition-all duration-300 flex items-center justify-center p-4"`
  );

  content = content.replace(
    /<aside id="mobile-drawer"[\s\S]*?class="[^"]*"/g,
    `<aside id="mobile-drawer"\n    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[85%] max-w-[380px] max-h-[85vh] bg-gradient-to-br from-[#071A33] via-[#0b2447] to-[#040e1c] text-white z-[100000] rounded-[28px] border border-white/20 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto opacity-0 pointer-events-none transition-all duration-300 ease-out scale-95 text-center"`
  );

  // 3. Make nav links centered in drawer
  content = content.replace(
    /<nav class="flex flex-col space-y-2 font-sans font-bold text-sm">/g,
    `<nav class="flex flex-col space-y-1.5 font-sans font-bold text-sm text-center">`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated mobile menu modal in ${file}`);
});
