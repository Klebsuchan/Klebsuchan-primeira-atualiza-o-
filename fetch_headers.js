const http = require('https');

http.get('https://achartemas.com/wp-json/wp/v2/posts?per_page=1', (res) => {
  console.log("Total posts:", res.headers['x-wp-total']);
  console.log("Total pages:", res.headers['x-wp-totalpages']);
});
