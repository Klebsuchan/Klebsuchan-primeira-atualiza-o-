const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src', 'data', 'posts.json');
try {
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://klebsuchan.com.br/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>https://klebsuchan.com.br/?post=${post.id}</loc>
    <lastmod>${new Date(post.date || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent.trim());
  console.log('Sitemap gerado com sucesso!');
} catch(e) {
  console.error("Erro gerando sitemap:", e);
}
