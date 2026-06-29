const fs = require('fs');

function fixLinks(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/href="\?post=\$\{p\.id\}"/g, 'href="?post=${p.id}-${(p.title?.rendered || \'\').replace(/<[^>]+>/g, \'\').toLowerCase().normalize(\'NFD\').replace(/[\\u0300-\\u036f]/g, \'\').replace(/[^a-z0-9]+/g, \'-\').replace(/(^-|-$)/g, \'\')}"');
  fs.writeFileSync(file, code);
  console.log('Fixed ' + file);
}

fixLinks('api/render.ts');
fixLinks('server.ts');
