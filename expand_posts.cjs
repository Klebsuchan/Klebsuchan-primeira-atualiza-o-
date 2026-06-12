const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const posts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf8'));

async function expandPost(post) {
  console.log('Expanding:', post.title.rendered);
  const prompt = `Como um especialista e redator geek, expanda o seguinte artigo para que ele tenha entre 600 e 800 palavras.
O AdSense reprovou artigos curtos. Transforme esta notícia/artigo curto numa análise de opinião profunda, com múltiplas seções, comparações, contexto da cultura pop, e teorias.
O output DEVE ser formatado em HTML (com <h2> para cada seção, <p> para parágrafos). Não mude o título ou excerpt, me retorne APENAS o novo HTML do conteúdo, que deve ser bem grande, engajador, opinativo e detalhado. Não envolva com crases ou markdown.\n\nHTML original: ${post.content.rendered}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let newHtml = response.text || '';
    newHtml = newHtml.replace(/```html/g, '').replace(/```/g, '').trim();
    
    if (newHtml && newHtml.length > 500) {
      post.content.rendered = newHtml;
      // update excerpt
      let text = newHtml.replace(/<[^>]*>?/gm, ' ').replace(/s+/g, ' ').trim();
      post.excerpt.rendered = text.substring(0, 160) + '...';
      console.log('Success expanding!');
      return true;
    } else {
        console.log('Skipped, too short generated text.');
        return false;
    }
  } catch (err) {
    console.error('Error expanding:', err.message);
    return false;
  }
}

async function main() {
  let expandedCount = 0;
  for (let i = 0; i < posts.length; i++) {
    const wordCount = posts[i].content.rendered.split(' ').length;
    if (wordCount < 600 && !posts[i].content.rendered.includes('expand_mark')) {
      const ok = await expandPost(posts[i]);
      if (ok) {
        posts[i].content.rendered += '<!-- expand_mark -->';
        fs.writeFileSync('src/data/posts.json', JSON.stringify(posts, null, 2));
        expandedCount++;
        await new Promise(r => setTimeout(r, 1000));
      }
      
      if (expandedCount >= 5) break; // limit to 10 at a time to prevent timeout
    }
  }
  console.log('Done expanding short posts. Expanded: ' + expandedCount);
}

main();