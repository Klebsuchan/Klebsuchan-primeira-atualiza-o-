const http = require('https');

http.get('https://achartemas.com/wp-json/wp/v2/categories', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
