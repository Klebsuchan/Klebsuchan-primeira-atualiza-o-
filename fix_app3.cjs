const fs = require('fs');

function updateFind(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(
    /(p: any\) => p\.id\.toString\(\) === postId\.toString\(\))/g,
    "(p: any) => p.id.toString() === postId.toString().split('-')[0]"
  );

  // In api/render.ts we have logic generating recent links too
  code = code.replace(/href="\\?post=\\$\{p\.id\}"/g, 'href="?post=${p.id}-${(p.title?.rendered || \\"\\").replace(/<[^>]+>/g, \\"\\").toLowerCase().normalize(\\"NFD\\").replace(/[\\\\u0300-\\\\u036f]/g, \\"\\").replace(/[^a-z0-9]+/g, \\"-\\").replace(/(^-|-$)/g, \\"\\")}"');

  fs.writeFileSync(file, code);
  console.log('Updated ' + file);
}

updateFind('server.ts');
updateFind('api/render.ts');
