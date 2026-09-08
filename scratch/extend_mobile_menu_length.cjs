const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\bless\\OneDrive\\Desktop\\new website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Update aside container length / height
  content = content.replace(
    /<aside id="mobile-drawer"[\s\S]*?class="[^"]*"/g,
    `<aside id="mobile-drawer"\n    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] max-w-[480px] h-[88vh] min-h-[540px] max-h-[92vh] bg-gradient-to-br from-[#071A33] via-[#0b2447] to-[#040e1c] text-white z-[100000] rounded-[32px] border border-white/20 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto opacity-0 pointer-events-none transition-all duration-300 ease-out scale-95 text-center"`
  );

  // Make inner container flex-1 and nav links spread out nicely
  content = content.replace(
    /<div class="space-y-6">/g,
    `<div class="flex-1 flex flex-col justify-between">`
  );

  content = content.replace(
    /<nav class="flex flex-col space-y-2 font-sans font-extrabold text-\[15px\] sm:text-base text-center py-2">/g,
    `<nav class="flex-1 flex flex-col justify-evenly font-sans font-extrabold text-[15px] sm:text-base text-center my-3 space-y-1">`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Extended mobile menu length in ${file}`);
});
