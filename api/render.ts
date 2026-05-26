import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export default function handler(req: any, res: any) {
  try {
    const cwd = process.cwd();
    // Try to find index.html
    const possibleHtmlPaths = [
      path.join(cwd, 'dist', 'index.html'),
      path.join(cwd, 'public', 'index.html'),
      path.join(cwd, 'index.html')
    ];
    let html = '';
    for (const p of possibleHtmlPaths) {
      if (fs.existsSync(p)) {
        html = fs.readFileSync(p, 'utf8');
        break;
      }
    }

    if (!html) {
      return res.status(404).send('HTML not found');
    }

    const postId = req.query.post;
    if (postId) {
      const possiblePaths = [
        path.join(cwd, 'src', 'data', 'posts.json'),
        path.join(cwd, '..', 'src', 'data', 'posts.json')
      ];
  
      let data = null;
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          data = fs.readFileSync(p, 'utf8');
          break;
        }
      }

      if (data) {
        const posts = JSON.parse(data);
        const post = posts.find((p: any) => p.id.toString() === postId.toString());
        if (post) {
          const title = post.title?.rendered?.replace(/<[^>]+>/g, '') || 'Klebsuchan';
          const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').substring(0, 150) || 'Confira este artigo na Klebsuchan!';
          const imageUrl = post.imageUrl || post.jetpack_featured_media_url || 'https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1';
          
          html = html.replace(/<title>.*?<\/title>/, `<title>${title} | Klebsuchan</title>`);
          html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title} | Klebsuchan" />`);
          html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${excerpt}" />`);
          html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${excerpt}" />`);
          html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${imageUrl}" />`);
          html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title} | Klebsuchan" />`);
          html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${excerpt}" />`);
          html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${imageUrl}" />`);

          // Include canonical tag
          if (html.includes('<link rel="canonical"')) {
            html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="https://klebsuchan.com.br/?post=${postId}"`);
          } else {
            html = html.replace('</head>', `<link rel="canonical" href="https://klebsuchan.com.br/?post=${postId}" />\n  </head>`);
          }

          // JSON-LD NewsArticle
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
          
          // Render article content into root for crawlers to read
          // The content will be quickly replaced by React on load, but crawled successfully
          const seoContent = `
            <article style="position: absolute; opacity: 0; pointer-events: none;">
              <h1>${title}</h1>
              ${post.content?.rendered || ''}
            </article>
          `;
          html = html.replace('<div id="root"></div>', `<div id="root">${seoContent}</div>`);
        }
      }
    }
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (err: any) {
    console.error("Render Vercel API Error:", err);
    return res.status(500).send("Internal Server Error: " + err.message);
  }
}
