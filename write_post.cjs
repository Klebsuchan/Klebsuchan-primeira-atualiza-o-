const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf8'));

const newPost = {
  id: Date.now(),
  date: new Date().toISOString(),
  title: {
    rendered: "Nicolas Cage Quebra o Silêncio Sobre 2ª Temporada de Spider-Noir e Bastidores de 400 Milhões de Dólares Geram Crise na Amazon"
  },
  excerpt: {
    rendered: "Se você correu para o Prime Video para maratonar Spider-Noir, a primeira série live-action focada em uma variante alternativa do Teioso, sabe que a produção entregou uma das atmosferas mais estéticas, maduras e intrigantes dos últimos tempos..."
  },
  content: {
    rendered: `
<p>Se você correu para o Prime Video para maratonar Spider-Noir, a primeira série live-action focada em uma variante alternativa do Teioso, sabe que a produção entregou uma das atmosferas mais estéticas, maduras e intrigantes dos últimos tempos. Ver o lendário Nicolas Cage encarnar o detetive amargurado Ben Reilly na Nova York dos anos 1930 foi um deleite absoluto para os órfãos de <em>No Aranhaverso</em>. A crítica aplaudiu, o público abraçou o tom investigativo e parecia que tínhamos um sucesso incontestável em mãos.</p>

<p>No entanto, no cenário atual do streaming em 2026, aclamação não é garantia de absolutamente nada. Por trás da belíssima fotografia cinzenta e dos diálogos afiados de gangster, esconde-se um verdadeiro incêndio financeiro e criativo nos bastidores da Amazon MGM Studios e da Sony Pictures. Com boatos de um orçamento astronômico que faria qualquer blockbuster de cinema passar vergonha, o futuro da série virou uma gigantesca incógnita. E para jogar mais lenha na fogueira, o próprio Nicolas Cage deu uma declaração que deixou os fãs com o coração na mão.</p>

<h3>O Futuro Incerto de Ben Reilly: A Sinceridade de Nicolas Cage</h3>
<p>Em uma entrevista recente e bastante franca à revista <em>Variety</em>, Nicolas Cage foi questionado sobre o que todos nós queríamos saber: afinal, o detetive Ben Reilly vai retornar para uma segunda temporada no Prime Video? A resposta do ator passou longe do otimismo corporativo padrão que estamos acostumados a ver em Hollywood. Cage foi realista, quase desapegado, demonstrando que encara o projeto como uma obra fechada:</p>

<blockquote>"Eu não sei. Mas diria que, acontecendo ou não, todos nós alcançamos o que nos propusemos a fazer, e a história funciona por conta própria. Vamos ver o que acontece."</blockquote>

<p>Essa declaração acendeu o sinal de alerta na comunidade geek. Quando o protagonista de uma série de heróis de grande porte diz que "a história funciona por conta própria" e adota uma postura de "se acabar aqui, tudo bem", geralmente significa que as negociações para uma renovação estão travadas ou que os problemas internos desencorajaram a equipe a lutar por uma sequência imediata. A verdade é que a trama de Spider-Noir foi inteligentemente amarrada para funcionar de forma independente, o que dá à Amazon a desculpa perfeita para engavetar o projeto sem deixar ganchos frustrantes, caso os custos não se paguem.</p>

<h3>O Absurdo de US$ 400 Milhões: O Que Deixou a Série Tão Cara?</h3>
<p>Para entender por que a renovação de uma série tão elogiada está na corda bamba, precisamos falar de números. E os números aqui são assustadores. De acordo com um relatório bombástico publicado pelo site especializado <em>3DVF</em>, a Amazon teria desembolsado a bizarra quantia de 400 milhões de dólares para tirar a primeira temporada do papel.</p>

<p>Para colocar isso em perspectiva, esse valor coloca Spider-Noir no mesmo patamar de custo de produções colossais como <em>O Senhor dos Anéis: Os Anéis de Poder</em> e a fracassada <em>Citadel</em>. É um orçamento completamente fora da curva para uma série de detetive urbana, de rua, que teoricamente não deveria exigir batalhas espaciais ou efeitos visuais em escala planetária.</p>

<p>Essa dinheirama toda ajuda a explicar os antigos boatos que circulam desde meados de 2024, apontando que os produtores executivos Phil Lord e Christopher Miller (as mentes por trás do universo Aranhaverso) vinham batendo de frente com os engravatados da Sony e da Amazon por conta de estouros orçamentários. Mas afinal de contas, onde foi parar tanto dinheiro? A resposta surgiu diretamente da boca — e das redes sociais — de quem trabalhou duro nos sets de filmagem.</p>

<h3>O Escândalo da Cor: Como a Ganância do Estúdio Destruiu a Visão dos Diretores</h3>
<p>Se você assistiu a Spider-Noir e ficou maravilhado com a opção de poder alternar entre a versão colorida e a versão clássica em preto e branco, saiba que essa "função" foi o principal motivo de o orçamento ter explodido e quase arruinado a produção. Relatos chocantes de membros da equipe técnica detalharam que a série foi inteiramente concebida, iluminada e filmada para ser única e exclusivamente em preto e branco, respeitando a cartilha clássica do gênero filme noir.</p>

<p>O técnico de iluminação K.C. Lauf abriu o jogo em suas redes sociais e explicou o pesadelo logístico causado pela interferência dos executivos da Amazon:</p>

<blockquote>"Filmamos em estilo noir puro no set, para uma entrega em preto e branco. Os cenários foram todos pintados de verde, marrom e rosa para complementar os tons de cinza na câmera. A versão colorida não estava planejada e exigiu refilmagens por quase um ano."</blockquote>

<p>Para quem não entende de cinema, essa revelação é insana. Quando se filma pensando no preto e branco digital ou analógico, os designers de produção usam cores bizarras no set (como rosa choque, marrom-esverdeado e tons berrantes) porque essas cores específicas geram o contraste perfeito de sombras e tons de cinza quando convertidas. Ao decidir, de última hora, que queriam uma versão colorida para "agradar ao público geral que não gosta de assistir a coisas em preto e branco", a Amazon forçou a equipe a refilmar cenas por meses e gastar rios de dinheiro em pós-produção para corrigir digitalmente as cores dos cenários que pareciam um arco-íris psicodélico no set.</p>

<p>Arsenio J. Alvarez, que atuou diretamente na pós-produção da série, reforçou o desabafo do colega e mandou a real para os cinéfilos:</p>

<blockquote>"A cor foi algo pensado depois. Entregamos o material e então o estúdio, não a Sony, decidiu que queria cor. Por isso, a melhor forma de assistir é em preto e branco, para ter a verdadeira visão dos cineastas."</blockquote>

<p>Essa interferência corporativa não apenas queimou centenas de milhões de dólares que poderiam ter sido usados para garantir mais três temporadas, mas também escancara o desrespeito dos estúdios com a visão artística dos criadores. Eles transformaram um projeto de paixão estilizado em uma mercadoria cara e pasteurizada.</p>

<h3>Relembrando a Trama: A Decadência de Ben Reilly nos Anos 30</h3>
<p>Apesar de toda a bagunça corporativa, o produto final entregue ao público é de altíssima qualidade. Spider-Noir se afasta completamente da fórmula saturada do Universo Cinematográfico da Marvel para entregar um conto de mistério maduro. A série adapta os quadrinhos da linha Marvel Noir criados em 2009, mas com uma grande mudança: em vez de Peter Parker, acompanhamos Ben Reilly (vivido por Cage).</p>

<p>Na linha do tempo da série, Reilly é um detetive particular cinzento, fumante inveterado e completamente quebrado financeiramente na Nova York atingida pela Grande Depressão de 1930. Envelhecido e lidando com traumas de uma tragédia pessoal devastadora, ele tenta esquecer o passado em que foi o único e legítimo super-herói da cidade. É um olhar melancólico sobre o fardo de ser um herói quando o mundo ao seu redor está desmoronando social e economicamente.</p>

<p>O elenco de apoio é um show à parte, trazendo atuações fantásticas de Lamorne Morris (como Robbie Robertson), Li Jun Li, Karen Rodriguez e Abraham Popoola, além dos vilões e antagonistas de peso interpretados por Jack Huston e pelo incrível Brendan Gleeson. A atuação de Nicolas Cage, que já havia dublado o personagem na animação de 2018 e deve retornar em <em>Homem-Aranha: Além do Aranhaverso</em>, mostra que ele compreende perfeitamente a dor e o humor ácido do detetive.</p>

<h3>Veredito do Klebsuchan: A Matemática Cruel do Streaming Joga Contra</h3>
<p>Sendo extremamente realista com vocês, as chances de Spider-Noir ganhar uma segunda temporada são assustadoramente baixas. Na era atual das plataformas digitais, a métrica de renovação é baseada puramente na relação de Custo vs. Audiência. Se uma série custa 50 milhões e tem uma audiência mediana, ela é renovada. Se uma série custa 400 milhões, ela precisa quebrar recordes históricos mundiais, superando fenômenos como <em>Stranger Things</em> ou <em>Round 6</em>, apenas para se pagar e justificar o investimento dos acionistas.</p>

<p>A teimosia da Amazon em exigir uma versão colorida pode ter sido o tiro no pé definitivo que matou uma franquia promissora antes mesmo de ela decolar. Resta aos fãs torcerem para que o prestígio crítico e as vendas de assinaturas compensem o estrago financeiro, ou aceitarem o conselho do próprio Nicolas Cage: apreciar esses episódios como uma grande, única e isolada obra de arte que, de preferência, deve ser assistida com o filtro de preto e branco ativado na sua TV.</p>

<p>Se você ainda não deu uma chance, todos os episódios estão disponíveis no catálogo do Prime Video. Assista e tire suas próprias conclusões sobre essa joia injustiçada pelos engravatados do estúdio.</p>

<p>A decisão da Amazon de forçar a colorização de uma obra noir foi um dos maiores absurdos recentes da indústria do entretenimento. Se você assistiu à série, vá correndo nas configurações e mude para a versão em preto e branco para prestigiar o trabalho real dos diretores. Compartilhe este texto com aquele seu amigo que ama o universo do Homem-Aranha e continue acompanhando o Klebsuchan para mais atualizações diretas dos bastidores da cultura pop!</p>
    `
  },
  imageUrl: "/images/spidernoir.jpg",
  categories: [105] // Cultura Pop & Filmes
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
    postTitle: "Nicolas Cage Quebra o Silêncio Sobre 2ª Temporada de Spider-Noir e Bastidores de 400 Milhões de Dólares Geram Crise na Amazon",
    postExcerpt: "Crise no Prime Video? Nicolas Cage fala sobre 2ª temporada de Spider-Noir e orçamento bizarro! 🕷️💼<br/><br/>Fala, galera do Klebsuchan!<br/><br/>Se você maratona a série Spider-Noir e curtiu a vibe detetive do Nicolas Cage, prepare-se: o futuro da produção está na corda bamba por causa de uma treta bizarra nos bastidores.<br/><br/>Boatos apontam que a primeira temporada custou astronômicos 400 milhões de dólares! O motivo? Os engravatados da Amazon decidiram de última hora que queriam uma versão colorida, o que arruinou o planejamento dos diretores (que filmaram tudo pensando no preto e branco clássico) e exigiu quase um ano de refilmagens caríssimas. Para piorar, o próprio Nicolas Cage soltou o verbo e deu uma declaração bem desanimadora sobre o futuro do herói.",
    postImage: "/images/spidernoir.jpg"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
`;
fs.writeFileSync('run_spider_email.js', triggerCode);

