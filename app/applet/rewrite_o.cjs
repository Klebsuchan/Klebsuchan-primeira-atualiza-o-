const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const posts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf8'));

async function rewritePost(post) {
  console.log('Rewriting:', post.title.rendered);
  const prompt = `
  Como um redator de blog geek focado em análises críticas profundas, reescreva este artigo de notícia para que ele tenha alto valor original.
  
  Você deve:
  - Analisar o significado da notícia para a franquia/indústria.
  - Colocar uma opinião forte, discutir as implicações, o que os fãs esperam.
  - Fazer comparações, teorias, e usar um tom crítico e envolvente.
  - O texto DEVE ser formatado em HTML (com <h2>, <p> fechados, etc.).
  - Mantenha o escopo de 800 - 1000 palavras.
  
  Título: ${post.title.rendered}
  HTML: ${post.content.rendered}
  
  Retorne um JSON exato com as chaves "newTitle" (uma chamada opinativa), "newExcerpt" e "newHtmlContent". Não retorne markdown, apenas um JSON parseável.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
          responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text());
    
    post.title.rendered = result.newTitle;
    post.title.original = result.newTitle;
    post.excerpt.rendered = result.newExcerpt;
    post.content.rendered = result.newHtmlContent;
    console.log('Success!');
  } catch (err) {
    console.error('Error rewriting:', err.message);
  }
}

async function main() {
  for (let i = 0; i < 10; i++) {
    // Skip if already looks opinionated (e.g. contains words like Opinião, Análise, Por que)
    const title = posts[i].title.rendered.toLowerCase();
    if (title.includes('opinião') || title.includes('análise') || title.includes('por que') || title.includes('review')) {
       console.log('Skipping (already analysis):', title);
       continue;
    }
    await rewritePost(posts[i]);
  }
  
  fs.writeFileSync('src/data/posts.json', JSON.stringify(posts, null, 2));
  console.log('Done writing posts.json');
}

main();
