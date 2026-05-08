import fs from 'fs';
import path from 'path';

// Usage: node create_post.js
async function createPost() {
  const title = "O Legado que Nunca Para: Uma Análise Sem Spoilers do Novo Filme de Michael Jackson";
  const excerpt = "O Rei do Pop está de volta! Leia nossa análise sem spoilers do novo filme 🎬<br/><br/>O universo nerd e geek foi contagiado pelo lançamento da nova cinebiografia do Rei do Pop. Preparamos uma análise completa e totalmente sem spoilers sobre o filme que está dando o que falar.";
  const content = `
    <p>O universo do entretenimento sempre foi fascinado por figuras maiores que a vida, mas poucos conseguem transcender as barreiras do tempo e da cultura como o Rei do Pop. Com o lançamento recente da aguardada cinebiografia de Michael Jackson, os fãs de cultura pop e os entusiastas do cinema se perguntam: é possível capturar a essência de um dos maiores ícones da história sem cair em clichês? A resposta, conforme revelado pelas primeiras impressões, é um retumbante sim.</p>

    <h2>Um Mergulho na Lenda</h2>
    <p>A produção consegue o feito notável de equilibrar a espetacularidade dos palcos com a vulnerabilidade dos bastidores. Longe de ser apenas uma sucessão de apresentações musicais famosas, o longa opta por construir uma narrativa que examina o impacto cultural e a genialidade artística de Jackson. Para quem acompanha o cenário nerd, geek e pop, o filme funciona como uma verdadeira aula de como a música e o audiovisual se entrelaçam. A direção de arte faz um trabalho primoroso ao recriar eras icônicas, desde os tempos de ouro da Motown até a revolução visual de Thriller, respeitando o peso que essas referências têm na nossa memória afetiva.</p>

    <h2>Emoção e Espetáculo</h2>
    <p>O grande acerto da obra é manter o foco na genialidade criativa e no perfeccionismo de Michael. As sequências musicais são tratadas com uma grandiosidade que faz jus ao artista, enquanto os momentos de introspecção nos lembram do ser humano por trás do chapéu e das luvas brilhantes. É um espetáculo visual e sonoro que captura a magia que inspirou gerações de artistas e criadores.</p>

    <p>Para os fãs que buscam uma experiência cinematográfica que celebra a cultura pop em sua forma mais pura, o filme é um lembrete poderoso de por que Michael Jackson continua relevante. Ele não apenas entretém, mas também nos convida a revisitar uma das mentes mais brilhantes do século XX, sem estragar nenhuma das grandes surpresas da jornada.</p>

    <p>Prepare a pipoca e embarque nessa viagem nostálgica e emocionante pelo legado que continua a ecoar no mundo todo!<br/>
    A gente da Klebsuchan se sentiu no show do Michael, e você curtiu também? deixa nos comentários abaixo.</p>
  `;
  const imageUrl = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/michael-jackson.jpg";

  const postsPath = path.join(process.cwd(), 'src', 'data', 'posts.json');
  let posts = [];
  try {
    const data = fs.readFileSync(postsPath, 'utf8');
    posts = JSON.parse(data);
  } catch (err) {
    console.error("Erro ao ler posts.json:", err);
  }

  // Generate a new ID based on the max existing ID + 1000 or timestamp
  const newId = Date.now();
  
  const newPost = {
    id: newId,
    date: new Date().toISOString(),
    title: { rendered: title },
    excerpt: { rendered: `<p>${excerpt}</p>` },
    content: { rendered: content },
    jetpack_featured_media_url: imageUrl,
    imageUrl: imageUrl,
    categories: [105] // Cultura Pop
  };

  posts.unshift(newPost); // Adds to the beginning

  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`[+] Artigo adicionado ao posts.json com sucesso. ID: ${newId}`);

  // Now trigger the notification locally via our dev server using fetch
  try {
    console.log('[+] Notificando inscritos via /api/notify-new-post...');
    const res = await fetch('http://localhost:3000/api/notify-new-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: newId,
        postTitle: title,
        postExcerpt: excerpt,
        postImage: imageUrl
      })
    });
    
    const data = await res.json();
    if (res.ok) {
      console.log("[+] Notificação enviada com sucesso!", data);
    } else {
      console.error("[-] Falha ao enviar notificação:", data);
    }
  } catch (err) {
    console.error("[-] Falha de rede ao chamar a API:", err);
  }
}

createPost();
