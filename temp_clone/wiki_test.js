const https = require('https');

function fetchWiki(title) {
  return new Promise((resolve, reject) => {
    https.get(`https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=1&titles=${encodeURIComponent(title)}`, {
      headers: { 'User-Agent': 'Klebsuchan/1.0 (https://ais-dev-x.us-east1.run.app)' }
    }, (res) => {
      let data = '';
      res.on('data', c => data+=c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

fetchWiki('Naruto').then(r => {
  const pages = r.query.pages;
  const pageId = Object.keys(pages)[0];
  console.log(pages[pageId].extract.length);
}).catch(console.error);
