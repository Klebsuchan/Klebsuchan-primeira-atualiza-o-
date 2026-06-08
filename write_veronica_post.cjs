const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf8'));

const newPost = {
  id: Date.now(),
  date: new Date().toISOString(),
  title: {
    rendered: "😭 A JUSTIÇA FOI FEITA! Resident Evil Veronica é real e o primeiro trailer vai te deixar arrepiado do início ao fim!"
  },
  excerpt: {
    rendered: "O Summer Game Fest 2026 mal começou e já entregou aquele que tem tudo para ser um dos maiores anúncios da década para os fãs de survival horror. O mestre Geoff Keighley dropou uma bomba atômica no palco..."
  },
  content: {
    rendered: `
<p>O Summer Game Fest 2026 mal começou e já entregou aquele que tem tudo para ser um dos maiores anúncios da década para os fãs de survival horror. O mestre Geoff Keighley dropou uma bomba atômica no palco: Resident Evil Veronica é real, está sendo desenvolvido na poderosa RE Engine e tem lançamento confirmado para 2027!</p>

<p>Depois de anos de petições, teorias bizarras na internet, choradeira dos fãs e a Capcom fingindo que não ouvia nada enquanto lançava os remakes de Resident Evil 2, 3 e 4, a justiça finalmente foi feita. A nossa sobrevivente suprema, Claire Redfield, está de volta para reivindicar o protagonismo que sempre mereceu.</p>

<p>Abaixo, nós do Klebsuchan preparamos um dossiê completo dissecando cada detalhe do trailer de revelação, o contexto histórico desse game que é o verdadeiro Resident Evil 3 espiritual, e o que podemos esperar dessa nova obra-prima do terror.</p>

<h3>O Peso Histórico: Por que o Remake de Veronica era o Mais Aguardado?</h3>
<p>Para a geração mais nova que conheceu a franquia agora com a trilogia moderna de remakes ou com o terror em primeira pessoa de Resident Evil 7 e Village, o nome Code: Veronica pode parecer apenas mais um spin-off perdido no imenso catálogo da Capcom. Mas a verdade é completamente oposta: este jogo é vital para a linha do tempo principal da saga.</p>

<p>Lançado originalmente no ano 2000 como um exclusivo temporário do lendário Sega Dreamcast (e mais tarde portado para o PlayStation 2 como Code: Veronica X), o game foi concebido originalmente para ser a verdadeira sequência direta de Resident Evil 2. A história acompanha Claire Redfield três meses após os eventos devastadores de Raccoon City. Ela continua sua busca implacável por seu irmão, Chris Redfield, o que a leva a invadir uma instalação da Umbrella em Paris.</p>

<p>O jogo original foi um marco por ser o primeiro da franquia principal a abandonar os cenários pré-renderizados em 2D, adotando ambientes totalmente tridimensionais com câmeras dinâmicas que seguiam o jogador. Além disso, a trama introduziu a bizarra e aristocrática família Ashford, os segredos coloniais da Umbrella e, claro, o retorno triunfal e superpoderoso de Albert Wesker. Ignorar a existência de Code: Veronica deixava um buraco enorme na lore de Resident Evil, e a Capcom finalmente entendeu que não dava para pular direto para um eventual remake do 5 sem antes recontar essa história.</p>

<h3>Dissecando o Trailer: Claire Redfield e o Pesadelo em Paris</h3>
<p>O trailer de revelação exibido no Summer Game Fest 2026 foi um show de direção de arte, jogando com a expectativa do público do início ao fim. A Capcom utilizou uma estratégia narrativa brilhante na edição do vídeo, deixando todo mundo na dúvida sobre qual franquia se tratava nos segundos iniciais.</p>

<h4>A Perspectiva e a Invasão</h4>
<p>O vídeo começa de forma surpreendente em primeira pessoa. A câmera se move de maneira tensa e claustrofóbica pelas ruas escuras de uma belíssima, porém gótica e sombria, cidade francesa — que sabemos ser Paris. A atmosfera pesada e a chuva fina batendo no asfalto imediatamente evocam o padrão de qualidade visual que a RE Engine entregou nos jogos mais recentes da marca.</p>

<p>Acompanhamos a visão do protagonista entrando sorrateiramente em um complexo residencial antigo. Ao empurrar as portas pesadas de madeira, a figura é recebida por uma senhora idosa de aparência frágil e assustada. Quando a câmera muda de ângulo e revela o rosto da personagem em terceira pessoa, o chat da transmissão mundial veio abaixo: era ela, Claire Redfield, com um visual incrivelmente realista, maduro e repaginado, mas mantendo suas características clássicas.</p>

<h4>A Emboscada e o Mistério</h4>
<p>Ao explorar o apartamento da idosa, o clima de calmaria dura pouco. O local está entulhado de papéis antigos, mapas, anotações misteriosas e monitores exibindo imagens de câmeras de segurança de alta tecnologia — um forte indício de que Claire estava investigando uma fachada da Umbrella Corporation na Europa.</p>

<p>De repente, o silêncio é quebrado por uma batida violenta e ensurdecedora na porta. Quando Claire se aproxima cautelosamente para investigar o que está acontecendo, o teto e as paredes parecem desabar em um piscar de olhos. Em uma fração de segundo, Claire é surpreendida e imobilizada por uma figura misteriosa, ágil e vestida com trajes táticos. O trailer foca no close-up desesperador da nossa heroína nos braços desse agressor desconhecido, que pressiona uma adaga afiada diretamente contra o seu pescoço.</p>

<h4>O Vislumbre do Inferno</h4>
<p>Após esse momento de pura tensão, o trailer engata uma marcha frenética, bombardeando o espectador com uma montagem rápida de cenários que os fãs mais velhos reconheceram em um piscar de olhos. Tivemos vislumbres de corredores góticos sombrios, laboratórios subterrâneos esterilizados, celas de prisão úmidas iluminadas por fogueiras e a icônica e imponente fachada da mansão na ilha particular da Umbrella. Tudo isso misturado com lampejos de monstros clássicos deformados pelo vírus e o icônico riso ecoando ao fundo, sugerindo a presença dos irmãos Alfred e Alexia Ashford.</p>

<h3>Primeira Pessoa vs. Terceira Pessoa: O Grande Debate Técnico</h3>
<p>A decisão da Capcom de iniciar o trailer em primeira pessoa acendeu um debate gigantesco nas redes sociais e fóruns de discussão. Será que Resident Evil Veronica adotará a perspectiva de gameplay de RE7 e RE8, ou seguirá o padrão de câmera sobre o ombro (over-the-shoulder) estabelecido pelos aclamados remakes do 2, 3 e 4?</p>

<p>Analisando o histórico recente da desenvolvedora e o ritmo do próprio trailer, a teoria mais aceita pela comunidade do Klebsuchan é que a primeira pessoa será utilizada apenas como um recurso cinematográfico ou em um trecho muito específico de prólogo. Vale lembrar que, no jogo original do Dreamcast, a jornada de Claire começa com uma belíssima animação em CGI dela invadindo o prédio da Umbrella em Paris, trocando tiros com helicópteros e sendo capturada pelas forças de segurança após uma explosão, o que resulta no seu envio para a terrível prisão em Rockfort Island.</p>

<p>Tudo indica que essa caminhada inicial pelo apartamento em Paris seja a nova versão jogável dessa icônica introdução. Após a captura de Claire pelo soldado da Umbrella (que pode muito bem ser o início da sua transferência como prisioneira), o jogo deve assumir a consagrada perspectiva em terceira pessoa assim que ela acordar em sua cela na ilha misteriosa. Essa escolha manteria a consistência estilística com os remakes anteriores, garantindo aquela jogabilidade de ação e sobrevivência precisa que consagrou o remake de Resident Evil 4.</p>

<h3>O Que Esperar Para 2027?</h3>
<p>A janela de lançamento fixada para 2027 mostra que a Capcom não está com pressa e quer entregar um produto polido ao extremo. A RE Engine provou ano após ano ser um dos motores gráficos mais versáteis e otimizados da indústria, capaz de criar texturas de pele, fumaça, iluminação global e expressões faciais que beiram o fotorrealismo.</p>

<p>Além do salto gráfico absurdo, podemos esperar uma reimaginação completa do level design. O jogo original era conhecido pelo constante backtracking (o famoso ato de ir e voltar pelas mesmas salas para resolver quebra-cabeças) e pela troca de controle entre Claire e Chris Redfield na metade da campanha. Trazer essas mecânicas para a modernidade, eliminando as telas de carregamento e tornando a exploração mais orgânica e assustadora, será o verdadeiro triunfo desse remake.</p>

<p>O anúncio de Resident Evil Veronica prova que a Capcom está ouvindo os corações dos fãs raiz que clamavam pelo resgate da essência do terror de sobrevivência dos anos 2000. Preparem os estoques de ervas verdes, economizem cada bala de pistola e fiquem ligados aqui no blog para mais novidades sobre essa jornada aterrorizante que promete parar o mundo dos games em 2027!</p>

<p>O anúncio de Resident Evil Veronica no Summer Game Fest 2026 foi a confirmação de que a era de ouro dos remakes da Capcom ainda está longe de acabar. Compartilhe este post com aquele seu amigo que passou os últimos cinco anos dizendo que Code: Veronica tinha sido esquecido no churrasco e continue acompanhando o Klebsuchan para a cobertura completa dos maiores lançamentos do mundo dos games!</p>
    `
  },
  imageUrl: "/images/veronica.jpg",
  categories: [103] // Games & eSports (from previous check)
};

posts.unshift(newPost);
fs.writeFileSync('./src/data/posts.json', JSON.stringify(posts, null, 2));

const triggerCode = `
fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: ${newPost.id},
    postTitle: "😭 A JUSTIÇA FOI FEITA! Resident Evil Veronica é real e o primeiro trailer vai te deixar arrepiado do início ao fim!",
    postExcerpt: "O CHORO ACABOU! Resident Evil Veronica é REAL e chega em 2027!<br/><br/>Fala, galera do Klebsuchan!<br/><br/>Depois de anos de petições, teorias e a Capcom fingindo que não ouvia os fãs, a justiça finalmente foi feita no palco do Summer Game Fest: Resident Evil Veronica é oficial!<br/><br/>A nossa sobrevivente suprema, Claire Redfield, está de volta em um trailer de arrepiar que começa de forma claustrofóbica em primeira pessoa nas ruas de Paris e termina com uma emboscada sinistra. O game chega em 2027 rodando na RE Engine e promete resgatar o melhor do survival horror raiz.",
    postImage: "/images/veronica.jpg"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
`;
fs.writeFileSync('run_veronica_email.cjs', triggerCode);
