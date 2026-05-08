const http = require('https');

http.get('https://achartemas.com/wp-json/wp/v2/posts?per_page=100', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const posts = JSON.parse(data);
    console.log("Total posts fetched:", posts.length);
  });
});
