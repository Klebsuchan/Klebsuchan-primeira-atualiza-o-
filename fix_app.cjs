const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.split("`/?post=${post.id}`").join("`/?post=${post.id}-${generateSlug(post.title.rendered)}`");
code = code.split("`/?post=${relatedPost.id}`").join("`/?post=${relatedPost.id}-${generateSlug(relatedPost.title.rendered)}`");
code = code.split("`/?post=${selectedPost.id}`").join("`/?post=${selectedPost.id}-${generateSlug(selectedPost.title.rendered)}`");
code = code.split("`${window.location.pathname}?post=${selectedPost.id}`").join("`${window.location.pathname}?post=${selectedPost.id}-${generateSlug(selectedPost.title.rendered)}`");

fs.writeFileSync('src/App.tsx', code);
console.log('done');
