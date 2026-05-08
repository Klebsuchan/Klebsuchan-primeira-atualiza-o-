import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import apiApp from "./api/index.ts";

export const app = express();

app.use(apiApp);

async function startServer() {
  const PORT = 3000;

  // Vite middleware para o ambiente de desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Modo de produção: serve os arquivos gerados em 'dist'
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    // Em Express versão 4 ou 5
    app.get('*', (req, res) => {
      let html = '';
      try {
        html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
      } catch (e) {
        return res.status(404).send('Not found');
      }

      const postId = req.query.post;
      if (postId) {
        try {
          const postsPath = path.join(process.cwd(), 'src', 'data', 'posts.json');
          const postsData = fs.readFileSync(postsPath, 'utf8');
          const posts = JSON.parse(postsData);
          const post = posts.find((p: any) => p.id.toString() === postId.toString());
          if (post) {
            const title = post.title?.rendered?.replace(/<[^>]+>/g, '') || 'Klebsuchan';
            const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').substring(0, 150) || 'Confira este artigo na Klebsuchan!';
            const imageUrl = post.imageUrl || post.jetpack_featured_media_url || 'https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1';
            
            html = html.replace(/<title>.*?<\/title>/, `<title>${title} | Klebsuchan</title>`);
            html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title} | Klebsuchan"`);
            html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${excerpt}"`);
            html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${excerpt}"`);
            html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${imageUrl}"`);
            html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title} | Klebsuchan"`);
            html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${excerpt}"`);
            html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${imageUrl}"`);

            // Injetar JSON-LD para os artigos (Artigo de Notícia SEO)
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
        } catch (err) {
          console.error("Erro ao injetar meta tags:", err);
        }
      }
      
      res.send(html);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Em ambientes serverless (Vercel), não chamamos startServer(). O app é exportado acima.
if (!process.env.VERCEL && process.env.NODE_ENV !== "vercel") {
  startServer();
}
