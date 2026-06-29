const fs = require('fs');

function fixBraces(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.split("((p: any) => p.id.toString() === postId.toString().split('-')[0],").join("(p: any) => p.id.toString() === postId.toString().split('-')[0],");
  fs.writeFileSync(file, code);
  console.log('Fixed ' + file);
}

fixBraces('server.ts');
fixBraces('api/render.ts');
