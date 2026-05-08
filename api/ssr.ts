import express from "express";
import path from "path";
import fs from "fs";

export const app = express();

app.get('*', (req, res) => {
  let html = '';
  const possiblePaths = [
    path.join(process.cwd(), 'dist', 'base.html'),
    path.join(__dirname, '..', 'dist', 'base.html'),
    path.join(process.cwd(), 'index.html')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      html = fs.readFileSync(p, 'utf8');
      break;
    }
  }

  if (!html) {
    return res.status(404).send('Not found');
  }

  const postId = req.query.post;
  if (postId) {
    try {
      const postsPaths = [
        path.join(process.cwd(), 'src', 'data', 'posts.json'),
        path.join(__dirname, '..', 'src', 'data', 'posts.json'),
        path.join(__dirname, 'src', 'data', 'posts.json'),
        path.join('/tmp', 'posts.json')
      ];
      
      let postsData = null;
      for (const p of postsPaths) {
        if (fs.existsSync(p)) {
          postsData = fs.readFileSync(p, 'utf8');
          break;
        }
      }

      if (postsData) {
        const posts = JSON.parse(postsData);
        const post = posts.find((p: any) => p.id.toString() === postId.toString());
        if (post) {
          const title = post.title?.rendered?.replace(/<[^>]+>/g, '') || 'Klebsuchan';
          let excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').substring(0, 150) || 'Confira este artigo na Klebsuchan!';
          excerpt = excerpt.replace(/"/g, '&quot;');
          const safeTitle = title.replace(/"/g, '&quot;');
          const imageUrl = post.imageUrl || post.jetpack_featured_media_url || 'https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1';
          
          html = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle} | Klebsuchan</title>`);
          html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${safeTitle} | Klebsuchan"`);
          html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${excerpt}"`);
          html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${excerpt}"`);
          html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${imageUrl}"`);
          html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${safeTitle} | Klebsuchan"`);
          html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${excerpt}"`);
          html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${imageUrl}"`);

          // Injetar JSON-LD
          const scriptJsonLd = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "${title.replace(/"/g, '\\"')}",
    "image": [
      "${imageUrl}"
    ],
    "datePublished": "${post.date || new Date().toISOString()}",
    "dateModified": "${post.modified || post.date || new Date().toISOString()}",
    "author": [{
        "@type": "Person",
        "name": "Klebsuchan",
        "url": "https://klebsuchan.com.br"
      }]
  }
  </script>
          `;
          html = html.replace('</head>', `${scriptJsonLd}\n  </head>`);
        }
      }
    } catch (err) {
      console.error("Erro ao injetar meta tags:", err);
    }
  }
  
  res.send(html);
});

export default app;
