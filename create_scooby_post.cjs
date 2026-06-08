const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  console.log('--- Inicia o processo de criação do post sobre Scooby-Doo ---');

  // 1. Converter a imagem de /src/data/scooby.png para /public/images/scooby.jpg
  const srcImg = './src/data/scooby.png';
  const destImg = './public/images/scooby.jpg';

  try {
    if (fs.existsSync(srcImg)) {
      console.log(`Convertendo e salvando imagem: de ${srcImg} para ${destImg}...`);
      await sharp(srcImg)
        .jpeg({ quality: 90 })
        .toFile(destImg);
      console.log('Imagem convertida e salva com sucesso!');
    } else {
      console.error(`Erro: o arquivo de imagem de origem ${srcImg} não foi localizado.`);
    }
  } catch (err) {
    console.error('Erro na conversão da imagem:', err);
  }

  // 2. Carregar os posts atuais
  const postsPath = './src/data/posts.json';
  if (!fs.existsSync(postsPath)) {
    console.error('Erro: posts.json não existe!');
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

  // 3. Montar o novo Post
  const postId = Date.now();
  const title = 'A Maldição Continua: Por que o Novo Scooby-Doo da Netflix é um Desastre Anunciado';
  const excerpt = 'Bem-vindos a mais um artigo aqui no Klebsuchan. A Netflix ataca novamente e, pelo visto, as lições que deveriam ter sido aprendidas com os maiores fiascos da plataforma foram completamente ignoradas. O primeiro teaser de Scooby-Doo: Origins acaba de jogar uma pá de cal em cima de mais um ícone intocável da nossa cultura pop...';
  
  const contentHtml = `
<p>Bem-vindos a mais um artigo aqui no Klebsuchan.</p>

<p>A Netflix ataca novamente e, pelo visto, as lições que deveriam ter sido aprendidas com os maiores fiascos da plataforma foram completamente ignoradas. Se você, assim como boa parte da comunidade otaku e geek, achava que a pífia adaptação de Death Note em 2017 tinha sido o fundo do poço indiscutível para os live-actions, ou que a controversa (e quase inassistível) animação Velma tinha sido o último prego no caixão do respeito à franquia... prepare o seu estômago. O primeiro teaser de Scooby-Doo: Origins, liberado agora neste início de junho de 2026, acaba de jogar uma pá de cal em cima de mais um ícone intocável da nossa cultura pop.</p>

<p>O que era para ser uma homenagem genuína ao legado de mais de cinquenta anos da Mistério S/A virou, ao que tudo indica, uma mistura bizarra e sem alma de Riverdale com um vídeo aleatório e &quot;fofinho&quot; de pets do TikTok. E nós precisamos dissecar o quão catastrófica essa ideia é em absolutamente todos os níveis da produção.</p>

<h3 class="text-2xl font-bold mt-6 mb-3 text-highlight">O Crime Contra o Design: O Cão &quot;Realista&quot;</h3>

<p>Vamos direto ao elefante — ou melhor, ao dogue alemão filhote — na sala. Pela primeira vez na longa história de adaptações da franquia, a Netflix tomou a &quot;corajosa&quot; (leia-se: mesquinha e visivelmente barateada) decisão de usar um cachorro de verdade para interpretar o Scooby-Doo. Adeus à computação gráfica que permitia expressões únicas. Adeus à fisicalidade absurda da animação.</p>

<p>Nas planilhas financeiras engravatadas de Hollywood, o executivo que aprovou isso deve ter achado uma jogada de mestre para economizar dezenas de milhões em efeitos visuais de CGI pesados. Na prática? Eles simplesmente acabaram de assassinar a essência e a magia do personagem. O Scooby-Doo nunca foi, em momento algum da sua existência, apenas um &quot;cachorro normal&quot;. Ele é uma figura absurdamente antropomórfica. Ele possui expressões faciais exageradas de puro pânico, ele se levanta e corre em duas patas quando toma um susto mortal, usa disfarces humanos hilários e engole lanches gigantescos de uma só vez. Acima de tudo: ELE FALA.</p>

<p>Olhando pela perspectiva de quem consome a cultura pop e o colecionismo, a decisão se torna ainda mais absurda. Quem, em sã consciência, vai querer colocar uma miniatura de um cachorro comum e sem nenhuma expressividade na estante, ao lado de peças de respeito como um imponente Alphonse Elric detalhado ou um T-800 da NECA? O design do Scooby sempre foi icônico, vibrante e altamente colecionável. Reduzi-lo a um animal que apenas late, corre pelo cenário e abana o rabo — transformando-o numa mera &quot;mascote de luxo&quot; enquanto os adolescentes humanos tomam a frente e resolvem tudo sozinhos — arranca pela raiz toda a comédia física e o carisma que sustentaram esse desenho ininterruptamente desde 1969. Se o cachorro não age como o Scooby, por que chamá-lo de Scooby?</p>

<h3 class="text-2xl font-bold mt-6 mb-3 text-highlight">Terror Obscuro ou Apenas Falta de Criatividade?</h3>

<p>Mas as atrocidades narrativas não param na controversa escolha do elenco canino. Vamos analisar a sinopse oficial que a gigante do streaming divulgou para tentar nos convencer. O enredo acompanha os jovens protagonistas durante o último verão em um acampamento. Salsicha e Daphne se deparam nada menos do que com um &quot;assassinato sobrenatural&quot;.</p>

<p>Repita comigo para ver se a ficha cai: Um. Assassinato. Sobrenatural.</p>

<p>Scooby-Doo historicamente sempre tratou de velhos rabugentos, fazendeiros falidos e empresários corruptos usando máscaras de látex baratas, projetores e fumaça para assustar pessoas e desvalorizar propriedades. A premissa original era inocente, genial e trazia uma moral clara: os verdadeiros monstros quase sempre são a ganância e a maldade humana. Tudo se resolvia com lógica, armadilhas infalíveis do Fred e a inteligência investigativa da Velma.</p>

<p>Agora, a Netflix quer nos empurrar goela abaixo mais um thriller adolescente sombrio e excessivamente edgy. Se a intenção absoluta dos roteiristas era focar num projeto de terror obscuro sombrio, mergulhando de cabeça em histórias de true crime e assassinatos reais e violentos ocorrendo no meio do mato, excelente! Que criassem uma marca do zero! O que não dá para aceitar é o sequestro do legado da Máquina de Mistério apenas para parasitar a nostalgia alheia. Eles pegaram os arquétipos clássicos e os destruíram para encaixá-los em caixinhas apertadas de dramas colegiais contemporâneos: a Velma virou a nerd cética insuportável e o Fred é o &quot;novato charmoso com segredos&quot;.</p>

<blockquote class="border-l-4 border-highlight pl-4 my-4 italic text-accent/80">&quot;Não é uma reinvenção. É a apropriação de um nome famoso para vender um roteiro genérico de suspense que, de outra forma, seria cancelado na primeira temporada.&quot;</blockquote>

<h3 class="text-2xl font-bold mt-6 mb-3 text-highlight">O Fantasma do Live-Action da Netflix</h3>

<p>Isso nos leva ao ponto mais assustador de toda essa discussão: a inescapável &quot;Maldição das Adaptações da Netflix&quot;. A plataforma ostenta um histórico francamente cruel quando decide colocar suas garras em obras sagradas para o público nerd e otaku.</p>

<p>Nós sofremos na pele e vimos de camarote o que eles fizeram com Death Note, jogando no lixo toda a complexa e brilhante guerra mental e filosófica entre Kira e L para entregar um filme colegial vergonhoso e raso. Testemunhamos o desastre visual e narrativo que foi Cowboy Bebop, que conseguiu ser cancelado em meras semanas após sua estreia desastrosa. Até mesmo Resident Evil foi triturado na máquina corporativa para virar uma fanfic adolescente distópica que ninguém pediu.</p>

<p>A sensação indigesta que os meros vinte segundos do teaser de Scooby-Doo: Origins deixam é que os showrunners da série olham para o material original com desprezo, como se a obra de Joe Ruby e Ken Spears fosse boba demais para os dias de hoje e precisasse ser &quot;consertada&quot;. É verdade que a presença de nomes como Mckenna Grace (Daphne) no elenco traz muito talento para a tela. Mas o problema crônico de Hollywood nunca são os rostos na frente das câmeras, e sim a decisão de submeter atores promissores a roteiros medíocres e sem respeito à fonte.</p>

<p>A imensa revolta que incendeia os fóruns e as redes sociais nesta semana é completamente justificável. Enquanto celebramos adaptações espetaculares, maduras e fiéis — feitas por criadores que genuinamente amam o material original —, a Netflix continua batendo a cabeça na parede com a fórmula preguiçosa e arrogante da &quot;desconstrução realista&quot;. Erraram o tom ao injetar assassinatos e true crime onde não devia existir, erraram rudemente no mascote principal ao remover sua expressividade cartunesca e, muito provavelmente, falharam na concepção da série como um todo.</p>

<p>Scooby-Doo: Origins já nasce como um letreiro luminoso piscando em neon, nos avisando que absolutamente nada é sagrado na busca desesperada por engajamento e assinaturas rápidas. E no final das contas, não precisamos arrancar a máscara do vilão deste mistério para saber quem ele é: a pura e simples arrogância corporativa.</p>

<p>E você, leitor do Klebsuchan? Vai ter coragem de dar play quando essa série lançar ou já considera o caso encerrado e mais um para a lixeira das adaptações falhas? Deixe sua opinião brutal nos comentários e não se esqueça de compartilhar o artigo com aquele seu amigo que jurava que a Netflix não tinha como piorar as coisas.</p>
`;

  const newPost = {
    id: postId,
    date: new Date().toISOString(),
    title: {
      rendered: title
    },
    excerpt: {
      rendered: excerpt
    },
    content: {
      rendered: contentHtml
    },
    imageUrl: '/images/scooby.jpg',
    categories: [105] // Cultura Pop
  };

  posts.unshift(newPost);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  console.log(`Post sobre o Scooby-Doo adicionado ao posts.json com ID: ${postId}`);

  // 4. Criar o arquivo de email run_scooby_email.js para enviar a notificação via API
  const emailExcerpt = `🚨 O novo Scooby-Doo da Netflix vai ser um desastre nível Death Note?<br/><br/>A Netflix soltou o teaser do live-action Scooby-Doo: Origins e a polêmica já está armada!<br/><br/>Eles trocaram o clássico cão falante e expressivo por um cachorro "realista" de verdade e transformaram a Mistério S/A em um drama adolescente sombrio, focado em assassinatos com uma vibe totalmente true crime e Riverdale.<br/><br/>No novo artigo do Klebsuchan, dissecamos todos os motivos pelos quais essa tentativa de baratear os custos e reinventar a franquia tem tudo para ser o próximo grande fiasco do streaming, desrespeitando um legado de mais de 50 anos.<br/><br/>A maldição das adaptações ruins da Netflix atacou de novo? Clique no link abaixo, leia a crítica completa e venha debater com a gente!`;

  const triggerCode = `
fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: ${postId},
    postTitle: "${title.replace(/"/g, '\\"')}",
    postExcerpt: "${emailExcerpt.replace(/"/g, '\\"')}",
    postImage: "/images/scooby.jpg"
  })
}).then(res => res.json()).then(data => {
  console.log('Resultado do envio do Email:', data);
  process.exit(0);
}).catch(err => {
  console.error('Erro ao acionar o envio de email:', err);
  process.exit(1);
});
`;

  fs.writeFileSync('run_scooby_email.js', triggerCode);
  console.log('Arquivo run_scooby_email.js gerado com sucesso!');
}

run();
