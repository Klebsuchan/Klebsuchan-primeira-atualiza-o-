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

  const staticPages = [
    'quem-somos',
    'contato',
    'termos',
    'privacidade',
    'posts'
  ];

  let sitemapContent = "<?xml version='1.0' encoding='UTF-8'?>\n" +
"<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'\n" +
"        xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'\n" +
"        xsi:schemaLocation='http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'>\n" +
"  <url>\n" +
"    <loc>https://klebsuchan.com.br/</loc>\n" +
"    <lastmod>" + new Date().toISOString().split('T')[0] + "</lastmod>\n" +
"    <changefreq>daily</changefreq>\n" +
"    <priority>1.0</priority>\n" +
"  </url>\n";

  staticPages.forEach(page => {
    sitemapContent += "  <url>\n" +
    "    <loc>https://klebsuchan.com.br/?tab=" + page + "</loc>\n" +
    "    <lastmod>" + new Date().toISOString().split('T')[0] + "</lastmod>\n" +
    "    <changefreq>monthly</changefreq>\n" +
    "    <priority>0.8</priority>\n" +
    "  </url>\n";
  });

  categoryGroups.forEach(group => {
    sitemapContent += "  <url>\n" +
    "    <loc>https://klebsuchan.com.br/?category=" + slugify(group.title) + "</loc>\n" +
    "    <lastmod>" + new Date().toISOString().split('T')[0] + "</lastmod>\n" +
    "    <changefreq>daily</changefreq>\n" +
    "    <priority>0.9</priority>\n" +
    "  </url>\n";
  });

  posts.forEach(post => {
    sitemapContent += "  <url>\n" +
    "    <loc>https://klebsuchan.com.br/?post=" + post.id + "</loc>\n" +
    "    <lastmod>" + new Date(post.date || Date.now()).toISOString().split('T')[0] + "</lastmod>\n" +
    "    <changefreq>weekly</changefreq>\n" +
    "    <priority>0.7</priority>\n" +
    "  </url>\n";
  });

  sitemapContent += "</urlset>";

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent.trim());
  console.log('Sitemap dinamico gerado com sucesso!');
} catch(e) {
  console.error('Erro gerando sitemap:', e);
}
