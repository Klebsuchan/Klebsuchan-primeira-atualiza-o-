import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

const supabaseUrl = 'https://eezccvpkexmssynooupi.supabase.co';
const supabaseAnonKey = 'sb_secret_jXUzG_NkQO905Cgu55NAcg_3zoTsrPq';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const resend = new Resend(process.env.RESEND_API_KEY || 're_VQwRpEWX_A4UF4XY7qXK9DrhXqZuPxTAy');

const title = "🚨 CRÍTICA | Daemons of the Shadow Realm: A Desconstrução Brutal do Shounen e o Caos como Ferramenta Narrativa";
const categoryIds = [101]; // Animes e Mangás

const htmlBody = `
<p><strong>Fala, galera do Klebsuchan! Quando uma nova temporada de animes começa, nossos radares já estão condicionados a identificar padrões. O protagonista ingênuo, a vila isolada, o poder adormecido. Mas, de vez em quando, surge uma obra que pega essa nossa bagagem cultural, joga no chão e pisa em cima sem a menor cerimônia.</strong></p>

<p>Foi exatamente isso que a estreia de Daemons of the Shadow Realm (Yomi no Tsugai) fez. Vindo da mente brilhante de Hiromu Arakawa — a mesma mangaká genial que nos entregou a alquimia impecável de Fullmetal Alchemist —, já era esperado um roteiro que fugisse do superficial. No entanto, o primeiro episódio não é apenas bom; é um exercício sádico e fascinante de dissonância cognitiva. Vamos dissecar por que essa estreia foi o caos absoluto — e por que isso beira a perfeição.</p>

<h2 class="text-2xl font-bold mt-6 mb-3 text-highlight">1. A Falsa Sensação de Segurança: O "Bait" do Fantástico Rural</h2>
<p>Os primeiros vinte minutos do episódio operam como uma armadilha meticulosamente projetada. Somos apresentados a Yuru e sua irmã Asa em um vilarejo feudal isolado nas montanhas, repleto de tradições xintoístas, arcos e flechas, e uma atmosfera pacata. O cérebro do espectador imediatamente cataloga a obra: "Ok, estamos em uma fantasia histórica. É uma vibe meio Demon Slayer, onde o protagonista vai treinar na montanha para combater demônios ancestrais".</p>
<p>Arakawa gasta tempo construindo essa normalidade idílica justamente para que o impacto da quebra de paradigma seja devastador. A direção de arte e o ritmo lento da introdução são, paradoxalmente, a calmaria que mascara o furacão. O roteiro te faz baixar a guarda de propósito.</p>

<h2 class="text-2xl font-bold mt-6 mb-3 text-highlight">2. Choque Anacrônico: O Encontro Violento Entre Tradição e Modernidade</h2>
<p>E então, a ilusão desmorona de forma ensurdecedora. O momento em que o céu do vilarejo feudal é rasgado pelo som das hélices de helicópteros militares não é apenas um choque visual; é uma violação brutal das regras do universo que o anime acabou de estabelecer.</p>
<p><strong>O Contraste Absurdo:</strong> Vemos aldeões armados com lanças de madeira e arcos sendo massacrados por soldados usando uniformes táticos modernos, fuzis de assalto de alto calibre e até smartphones.</p>
<p><strong>O Significado Oculto:</strong> Essa quebra narrativa calculada gera uma sensação de inadequação profunda. A introdução de tecnologia bélica contemporânea em um cenário místico não é apenas uma escolha estética; é uma declaração temática sobre o esmagamento da tradição pelo avanço implacável e violento do mundo exterior.</p>
<p>Para grande parte do público, essa virada causou uma desorientação genuína. E é aqui que mora o brilhantismo da direção: esse não é um defeito de roteiro. A confusão é a principal ferramenta empática do episódio.</p>

<h2 class="text-2xl font-bold mt-6 mb-3 text-highlight">3. A Desorientação como Empatia: Sentindo o Trauma de Yuru</h2>
<p>Em narrativas convencionais, o primeiro episódio serve para explicar o mundo (o famoso worldbuilding mastigado). Daemons of the Shadow Realm subverte isso ao se recusar a dar respostas.</p>
<p>Se tem uma palavra que define essa estreia, é caos. Mas é um caos inteligente e estruturado. A cabeça de Yuru entra em colapso completo, e o roteiro força o espectador a vivenciar essa mesma quebra psicológica.</p>
<p>Nós não entendemos quem são os invasores. Não sabemos como o mundo lá fora avançou tecnologicamente enquanto a vila parou no tempo. E, mais importante, não sabemos quem está falando a verdade. Arakawa nos arranca a onisciência típica do espectador para nos aprisionar na perspectiva limitada e aterrorizada do protagonista. A confusão não é falha; é método. O anime quer que você compartilhe o trauma do Yuru na pele, antes de te dar qualquer privilégio de compreensão racional.</p>

<h2 class="text-2xl font-bold mt-6 mb-3 text-highlight">4. A Subversão da "Donzela em Perigo" e a Reviravolta de Asa</h2>
<p>O ápice do episódio, contudo, reserva-se para a desconstrução final do tropo mais velho dos animes de batalha: o arquétipo da irmã indefesa que precisa ser resgatada.</p>
<p>A construção inicial apontava para a jornada clássica do irmão em busca de vingança. Mas, em um movimento frio e implacável, o anime vira a mesa: a "irmã" que conhecíamos na vila é morta de forma brutal, apenas para que a verdadeira Asa surja no campo de batalha. E ela não chega como uma vítima acorrentada esperando salvamento. Ela chega como o algoz, comandando os invasores modernos.</p>
<p>Essa virada eleva o nível da história para outro patamar psicológico. Não se trata mais de uma missão de resgate simplória. A motivação de Yuru deixa de ser "salvar a família" e passa a ser o perturbador questionamento: "Quem, ou o que, minha própria família se tornou?"</p>
<p>Ao transformar a principal figura de afeto do protagonista na potencial antagonista (e equipá-la com o peso da modernidade opressora), a narrativa ganha uma complexidade moral gigantesca.</p>

<h2 class="text-2xl font-bold mt-6 mb-3 text-highlight">Veredito do Klebsuchan</h2>
<p>A estreia de Daemons of the Shadow Realm é uma aula magna de como brincar com as expectativas do público. Começa como um conto de fadas feudal e termina como um pesadelo tático contemporâneo banhado a sangue, provando que o talento para criar narrativas densas, maduras e cheias de camadas de mistério continua afiadíssimo. Se o resto da temporada conseguir manter metade da intensidade mental e visual deste primeiro episódio, já temos um fortíssimo candidato a Anime do Ano.</p>
<p>E você, ficou com a mente explodindo com aquele helicóptero surgindo do nada ou já estava sentindo que a vila escondia algum segredo sombrio? O que você espera desse confronto de ideologias e tecnologias? Solta o verbo aqui nos comentários do Klebsuchan e vamos teorizar juntos!</p>
`;

async function main() {
  try {
    // 1. Upload imagem
    const imagePath = path.join(process.cwd(), 'public', 'images', 'daemos.png');
    let fileContent = fs.readFileSync(imagePath);
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload('daemos.png', fileContent, {
        upsert: true,
        contentType: 'image/png'
      });
      
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return;
    }
    console.log('Image uploaded to Supabase');
    
    const publicUrl = supabase.storage.from('images').getPublicUrl('daemos.png').data.publicUrl;
    console.log('Public URL:', publicUrl);
    
    // 2. Criar o post em src/data/posts.json
    const postsPath = path.join(process.cwd(), 'src', 'data', 'posts.json');
    const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
    
    const newId = (parseInt(posts[0].id) + 1).toString();
    const newPost = {
      id: newId,
      title: { rendered: title },
      excerpt: { rendered: "<p>Se você achou que Daemons of the Shadow Realm era só mais um anime de fantasia rural genérico... você caiu na armadilha!</p>" },
      content: { rendered: htmlBody },
      categories: categoryIds,
      imageUrl: publicUrl,
      date: new Date().toISOString()
    };
    
    posts.unshift(newPost);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    console.log('Post adicionado em posts.json!');
    
    // 3. Enviar E-mail
    const audienceId = 'd81a95a6-4ce5-4e32-a5e2-225e3663a8e9'; // process.env.RESEND_AUDIENCE_ID
    let emailsToSend = ['braian.kleber.camargo@gmail.com'];

    try {
      const contactsResponse = await resend.contacts.list({ audienceId });
      if (contactsResponse.data && contactsResponse.data.data) {
        const resendEmails = contactsResponse.data.data
          .filter(contact => !contact.unsubscribed)
          .map(contact => contact.email);
        emailsToSend = [...new Set([...emailsToSend, ...resendEmails])];
      }
    } catch(e) {
      console.log('Error fetching contacts, using default', e);
    }
    
    const imageAttachment = {
      filename: 'daemos.png',
      content: fileContent,
      contentId: 'daemosimagecid',
      content_id: 'daemosimagecid'
    };
    const imgTag = '<img src="cid:daemosimagecid" alt="Capa do artigo" class="card-img" />';
    
    const finalPostUrl = 'https://www.klebsuchan.com.br/?post=' + newId + '-critica-daemons-of-the-shadow-realm-a-desconstrucao-brutal-do-shounen-e-o-caos-como-ferramenta-narrativa';
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #121214; margin: 0; padding: 40px 10px; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #202024; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .email-header { background-color: #121214; padding: 30px 30px; text-align: center; border-bottom: 2px solid #ffd700; }
    .header-content { display: inline-block; vertical-align: middle; }
    .header-logo { width: 40px; height: 40px; vertical-align: middle; margin-right: 15px; }
    .header-text { display: inline-block; vertical-align: middle; color: #ffd700; margin: 0; font-size: 28px; font-weight: 800; font-style: italic; letter-spacing: 1px; }
    .email-body { padding: 40px 30px; color: #e1e1e6; line-height: 1.6; font-size: 16px; }
    .email-body h2 { color: #ffffff; font-size: 22px; margin-top: 0; }
    .email-footer { background-color: #121214; padding: 0; text-align: center; font-size: 0; line-height: 0; }
    .email-footer img { width: 100%; max-width: 600px; height: auto; display: block; margin: 0; }
    .highlight { color: #ffd700; font-weight: 600; }
    .card { background-color: #121214; border-radius: 12px; margin-bottom: 25px; border: 1px solid #323238; overflow: hidden; }
    .card-img-container { width: 100%; height: 200px; overflow: hidden; background-color: #121214; line-height: 0; }
    .card-img { width: 100%; height: 100%; object-fit: cover; border: none; outline: none; }
    .card-content { padding: 25px; }
    .card-title { margin: 0 0 10px 0; font-size: 18px; color: #ffffff; font-weight: 800; line-height: 1.3; }
    .card-desc { margin: 0 0 20px 0; font-size: 15px; color: #a8a8b3; line-height: 1.5; }
    .btn { background-color: #ffd700; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 800; display: inline-block; text-align: center; text-transform: uppercase; }
    
    /* Fallbacks for older email clients */
    @media only screen and (max-width: 600px) {
      .email-container { border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <div class="header-content">
        <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1" alt="Logo Klebsuchan" class="header-logo" />
        <h1 class="header-text">KLEBSUCHAN</h1>
      </div>
    </div>
    <div class="email-body">
      <h2>🤯 O anime que enganou todo mundo no primeiro episódio!</h2>
      <p>Fala, galera do Klebsuchan!</p>
      <p>Se você achou que Daemons of the Shadow Realm era só mais um anime de fantasia rural genérico... você caiu na armadilha!</p>
      
      <!-- Card do Artigo Novo -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 35px; margin-bottom: 10px;">
        <tr>
          <td>
            <div class="card">
              <div class="card-img-container">
                ${imgTag}
              </div>
              <div class="card-content">
                <h4 class="card-title">${title}</h4>
                <p class="card-desc">A nova obra da criadora de Fullmetal Alchemist começa em uma vila pacata e, do nada, rasga o céu com helicópteros, fuzis de assalto e uma reviravolta brutal onde a própria irmã do protagonista se revela a verdadeira ameaça. É o caos absoluto e nós dissecamos cada detalhe.</p>
                <p class="card-desc">Quer entender a genialidade por trás dessa quebra de expectativas?</p>
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" bgcolor="#ffd700" style="border-radius: 8px;">
                      <a href="${finalPostUrl}" target="_blank" style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 800; display: inline-block; text-transform: uppercase; line-height: 1;">Ler Artigo Completo</a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <br/>
      <p>Ajeite a cadeira e boa leitura!</p>
      <p>Um abraço,<br/><strong class="highlight">Equipe Klebsuchan</strong></p>
    </div>
    
    <!-- Footer Image -->
    <div class="email-footer">
      <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rodape-email.png?v=1" alt="Rodapé Klebsuchan" />
    </div>
  </div>
</body>
</html>
    `;
    
    console.log('Sending emails to ' + emailsToSend.length + ' contacts...');
      
    for (const email of emailsToSend) {
      try {
        const res = await resend.emails.send({
          from: 'Klebsuchan Newsletter <updates@klebsuchan.com.br>',
          to: email,
          subject: '🤯 O anime que enganou todo mundo no primeiro episódio!',
          html: htmlContent,
          attachments: [imageAttachment]
        });
        console.log('Sent to', email, res);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (err) {
        console.error('Failed to send to', email, err);
      }
    }
    
    console.log('All done!');
  } catch (err) {
    console.error('Error in main', err);
  }
}

main();
