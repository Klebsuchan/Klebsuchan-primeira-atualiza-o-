const fs = require('fs');
const path = require('path');

const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const postsPath = path.join(__dirname, 'src', 'data', 'posts.json');
try {
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  
  const categoryGroups = [
    { title: 'Animes & Mangás' },
    { title: 'Games & eSports' },
    { title: 'Cultura Pop & Filmes' },
    { title: 'Tecnologia & Gadgets' }
  ];

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://klebsuchan.com.br/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://klebsuchan.com.br/?tab=quem-somos</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  categoryGroups.forEach(group => {
    sitemapContent += `  <url>
    <loc>https://klebsuchan.com.br/?category=${slugify(group.title)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  });

  posts.forEach(post => {
    // Escapar caracteres especiais no URL se houver risco, ou apenas parse do ID
    sitemapContent += `  <url>
    <loc>https://klebsuchan.com.br/?post=${post.id}</loc>
    <lastmod>${new Date(post.date || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  sitemapContent += `</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent.trim());
  console.log('Sitemap dinamico gerado com sucesso!');
} catch(e) {
  console.error("Erro gerando sitemap:", e);
}
