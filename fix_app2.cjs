const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace("const found = allPosts.find(p => p.id.toString() === postId);", "const found = allPosts.find(p => p.id.toString() === postId.split('-')[0]);");

fs.writeFileSync('src/App.tsx', code);
console.log('done');
