const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf8'));

const newId = Math.max(...posts.map(p => p.id)) + 1;

const newPost = {
  id: newId,
  date: new Date().toISOString(),
  title: {
    rendered: "GTA 6: Tudo o Que Sabemos Sobre o Maior Lançamento da História da Rockstar"
  },
  excerpt: {
    rendered: "O hype é real! Tudo o que você precisa saber sobre GTA 6. Vem descobrir os detalhes do gigantesco mapa de Leonida, a dinâmica explosiva do novo casal de protagonistas (Jason e Lucia), a nova data de lançamento oficial para os consoles de nova geração e, claro, a triste notícia para os PC gamers."
  },
  content: {
    rendered: `
<p>Fala, galera do Klebsuchan! Parece até mentira dizer isso em voz alta depois de tantos anos de rumores, vazamentos e teorias malucas pela internet, mas é a mais pura realidade: Grand Theft Auto VI (GTA 6) está oficialmente em desenvolvimento e é o próximo colosso a aterrissar nos nossos consoles.</p>

<p>Para colocar o hype nos eixos e organizar as ideias, preparamos este dossiê completo e definitivo com tudo o que foi revelado, confirmado e dissecado sobre o sucessor do lendário GTA 5 até o momento. Puxe uma cadeira, prepare seu café e venha conferir cada detalhe sobre o jogo que promete redefinir a indústria do entretenimento nos próximos anos. E fique ligado: manteremos este artigo sempre atualizado conforme novas informações explodirem na rede!</p>

<h3>O Anúncio Silencioso e a Promessa de Revolução</h3>
<p>Quem acompanha a Rockstar Games sabe que o estúdio adora brincar com o coração dos fãs. O anúncio oficial de que o jogo estava em produção não veio com fogos de artifício ou um evento gigantesco. Pelo contrário, GTA 6 foi confirmado de forma quase sutil em uma publicação no blog da empresa em fevereiro de 2022. No meio de um comunicado sobre atualizações da comunidade, uma única frase foi o suficiente para quebrar a internet:</p>

<blockquote>"Em cada novo projeto, nosso objetivo é sempre ir além do que entregamos anteriormente — e temos o prazer de confirmar que o desenvolvimento do próximo Grand Theft Auto está bem encaminhado."</blockquote>

<p>Embora a declaração tenha sido contida, os executivos por trás do projeto não estão economizando nas ambições. Pouco tempo após esse anúncio, Strauss Zelnick, o atual CEO da Take-Two Interactive (empresa mãe da Rockstar), comentou em um relatório fiscal com investidores que a meta de GTA 6 não é apenas ser um bom jogo. O objetivo da equipe é estabelecer um novo padrão criativo e técnico não apenas para a franquia Grand Theft Auto, mas para toda a indústria do entretenimento global.</p>

<p>Quem trabalha com planejamento e desenvolvimento de software sabe muito bem que arquitetar, codificar e polir um sistema e um mundo virtual dessa magnitude exige um esforço monumental. O motor gráfico RAGE (Rockstar Advanced Game Engine) está sendo levado ao limite absoluto para entregar a experiência mais imersiva de todos os tempos.</p>

<h3>Bem-vindos a Leonida: O Retorno Triunfal a Vice City</h3>
<p>Prepare seus óculos de sol e suas camisas floridas, porque estamos voltando para casa. GTA 6 será ambientado no estado fictício de Leonida, uma representação satírica e vibrante da Flórida. E, claro, a joia da coroa desse estado é o aguardado retorno da cidade de Vice City, que não dava as caras na franquia há incríveis 18 anos, desde o lançamento do clássico GTA: Vice City Stories.</p>

<p>Mas engana-se quem acha que ficaremos restritos apenas aos letreiros em neon e às praias badaladas da Cidade do Sol. A promessa da Rockstar é entregar a maior, mais densa e mais envolvente evolução de mundo aberto da história da franquia. As ambientações vão explorar contrastes profundos, incluindo interiores de prédios, casas detalhadas e ecossistemas complexos.</p>

<p>Após a dissecação do primeiro trailer e atualizações no site oficial do game, foram confirmadas diversas regiões específicas que expandem drasticamente o mapa de Leonida. Os jogadores poderão explorar:</p>

<ul>
<li><strong>Leonida Keys:</strong> Um arquipélago tropical deslumbrante, inspirado nas famosas Florida Keys.</li>
<li><strong>Grassrivers:</strong> Uma vasta região pantanosa, selvagem e perigosa (perfeita para esconder segredos e fugir da polícia), nos moldes de Everglades.</li>
<li><strong>Port Gellhorn:</strong> Uma área costeira mais esquecida, sombria e com uma atmosfera pesada.</li>
<li><strong>Ambrosia:</strong> Um setor focado na atividade industrial do estado.</li>
<li><strong>Mount Kalaga:</strong> Um extenso parque nacional para os momentos em que você quiser trocar o asfalto pela natureza selvagem.</li>
</ul>

<p>Nas palavras de Sam Houser, fundador da Rockstar: "GTA 6 continua a ultrapassar os limites do que é possível em uma experiência de mundo aberto imersiva e com foco em história. Estamos animados em poder compartilhar essa nova visão com jogadores de todo o mundo."</p>

<h3>A Trama de Jason e Lucia: Um Romance no Submundo do Crime</h3>
<p>Dando adeus à dinâmica de três protagonistas de GTA 5, o novo capítulo foca em uma narrativa mais intimista, porém igualmente explosiva. O jogo será estrelado por uma dupla de criminosos: Lucia Caminos e Jason Duval. A dinâmica entre os dois parece beber fortemente da clássica história real do casal Bonnie & Clyde, misturando romance, sobrevivência e muita quebra de regras.</p>

<p>A sinopse oficial revelada no site do jogo já dá o tom da desgraça que os aguarda:</p>

<blockquote>"Jason e Lucia sempre souberam que tudo estava contra eles. Mas, depois que um serviço simples dá errado, eles vão parar no lado mais sombrio do lugar mais ensolarado dos Estados Unidos, em meio a uma conspiração criminosa se estendendo por todo o estado de Leonida – e são forçados a depender um do outro mais do que nunca para saírem dessa vivos."</blockquote>

<p>Tudo indica que ambos serão personagens totalmente jogáveis, permitindo alternar entre eles. A grande dúvida que paira no ar é como essa dinâmica funcionará durante missões conjuntas ou na exploração livre. Além disso, a ambientação será calcada nos dias atuais. Pelos trailers, já notamos uma forte presença da cultura de redes sociais, vídeos virais no estilo TikTok/Reels e o uso intenso de smartphones para interagir com o mundo caótico de Leonida.</p>

<h3>O Adiado Lançamento e a Tristeza dos PC Gamers</h3>
<p>Agora, vamos àquela parte que dói no coração. Inicialmente, o mundo inteiro estava com os calendários marcados para um lançamento em 2025. No entanto, buscando a perfeição absoluta, a Rockstar tomou a difícil decisão de adiar o jogo. A nova data de lançamento oficial de GTA 6 está cravada para 26 de maio de 2026. Em nota, os desenvolvedores pediram compreensão, reforçando que precisam de mais tempo de forno para garantir que o nível de qualidade e otimização atenda à enorme expectativa construída ao longo de mais de uma década.</p>

<p>Em relação às plataformas, o jogo chegará rasgando o asfalto apenas nos consoles de última geração: PlayStation 5 e Xbox Series X|S.</p>

<p>Se você, assim como boa parte da nossa comunidade, tem o seu acervo principal de jogos na Steam e prefere jogar no teclado e mouse, as notícias não são as melhores. A Rockstar não mencionou uma versão para PC até o momento. Isso segue a mesma estratégia mercadológica utilizada no lançamento de GTA 5 e Red Dead Redemption 2. Para quem está com a biblioteca do PC pronta para receber essa obra, será necessário exercer muita paciência — o padrão da empresa é lançar a versão de computadores cerca de um a dois anos após a chegada aos consoles.</p>

<p>A espera é longa, mas tudo indica que cada segundo vai valer a pena. E você, o que mais espera de GTA 6? Acha que a dinâmica entre Jason e Lucia vai superar a química do trio Trevor, Michael e Franklin? Deixe a sua opinião aqui nos comentários do Klebsuchan e vamos debater sobre o jogo mais aguardado do século!</p>
    `
  },
  imageUrl: "https://klebsuchan.com.br/images/gta6.jpg",
  categories: [103] // Games & eSports
};

posts.unshift(newPost);
fs.writeFileSync('./src/data/posts.json', JSON.stringify(posts, null, 2));

console.log('Post criado com sucesso. ID:', newId);
