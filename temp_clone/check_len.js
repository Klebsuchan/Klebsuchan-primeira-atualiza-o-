const p = require('./src/data/posts.json'); console.log('Total posts:', p.length); console.log('Avg length:', p.map(x => x.content.rendered.length).reduce((a, b) => a + b, 0) / p.length);
