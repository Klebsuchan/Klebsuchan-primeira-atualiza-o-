import fs from 'fs';
import path from 'path';

const postsPath = path.join(process.cwd(), 'src', 'data', 'posts.json');
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const newPost = {
  id: 1779000000000,
  date: "2026-05-13T11:00:00.000Z",
  title: {
    rendered: "Pragmata: A Odisseia Lunar que Desafiou o Inferno do Desenvolvimento 🌕🚀"
  },
  excerpt: {
    rendered: "<p>Se existe uma lenda urbana na indústria dos videogames que quase sempre se prova verdadeira, é a de que projetos que passam anos a fio no chamado \"inferno do desenvolvimento\" raramente entregam o que prometem. A Capcom, em sua atual fase experimental, traz com Pragmata uma proposta que abraça o esquisito, mas o tempera com um sabor incrivelmente refinado. Confira nossa análise compelta.</p>"
  },
  content: {
    rendered: `
<p>Se existe uma lenda urbana na indústria dos videogames que quase sempre se prova verdadeira, é a de que projetos que passam anos a fio no chamado "inferno do desenvolvimento" raramente entregam o que prometem. Títulos com adiamentos sucessivos e longos períodos de silêncio costumam chegar às nossas mãos como sombras fragmentadas de suas ideias originais. Porém, sejam bem-vindos a mais uma análise aqui no blog klebsuchan, onde hoje vamos destrinchar um jogo que é a gloriosa exceção a essa regra.</p>

<p>A Capcom, em sua atual e muito bem-vinda fase experimental (que também nos entregou o peculiar Kunitsu-Gami), traz com Pragmata uma proposta que abraça o esquisito, mas o tempera com um sabor incrivelmente refinado. O resultado é algo que deve orgulhar os nomes mais respeitados de seu catálogo e provar que algumas visões artísticas valem, sim, a pena esperar.</p>

<h3>Um Futuro Distópico de Escala Cinza</h3>
<p>Pragmata não perde tempo com longas introduções, muito a seu favor. O contexto da trama parece algo digno de uma temporada mais sombria de The Expanse. Após um colapso em nosso planeta natal, com as raras corporações monopolizando a vida terrestre, as colônias periféricas se tornaram grandes campos de sucata e sobrevivência. Nosso cenário é uma Lua não apenas habitada, mas industrializada e em constante declínio, chamada de "A Superfície".</p>

<p>Você não é um salvador predestinado, é apenas um funcionário de baixo escalão e especializado – um "Runner" de aluguel focado em recuperar materiais de zonas de altíssimo risco. Tudo muda, claro, quando nosso protagonista recebe um contrato particular para escoltar um pacote incomum: a pequena Diana, uma figura que mescla a inocência infantil com traços inegáveis de androide, cercada pelo que aparentemente é o dispositivo de telemetria mais avançado de toda a galáxia.</p>

<h3>Câmera no Ombro, Terror no Espaço</h3>
<p>O que impressiona, em primeiro lugar, é que a Capcom pegou sua gloriosa engine RE (Resident Evil Engine) e decidiu injetar peso. Diferente dos movimentos mais ágeis e táticos da franquia de zumbis, controlar nosso Runner mascarado é lidar com inércia e fisicalidade da roupa. O traje tático pesado dita a gravidade e a ação em Pragmata, exigindo do jogador cálculo em cada pisada.</p>

<p>As sequências de combate não deixam barato. Enfrentando construtos robóticos grotescos e criaturas transumanas tomadas por inteligência artificial corrompida, você vai usar seu arsenal futurista – desde pistolas de carga até uma escopeta cinética que estremece toda a tela de vibração (para quem joga de DualSense, é um deleite absoluto). Mas não é sobre atirar a esmo. Você precisa frequentemente defender Diana – criando barreiras temporárias, instruindo a menina a se esgueirar por tubulações, e aproveitando dos reflexos quase passivos dela para resolver o que, em partes do jogo, parecem ser quebra-cabeças inseridos em tiroteios caóticos.</p>

<h3>A Lua Que Sangra Óleo e Neón</h3>
<p>Falando de visual, existe algo que só mentes asiáticas são capazes de alinhar perfeitamente entre lixo tecnológico puro e cyberpunk asséptico – uma fusão que emula o que vimos em BLAME! ou em projetos independentes como Stray, mas com visuais beirando à fotorrealidade em Pragmata. A forma como a iluminação difusa da atmosfera artificial lunar reflete no visor do traje, a sujeira que acumula na bota após os combates… é a RE Engine trabalhando no seu máximo do máximo de texturas e iluminação volumétrica.</p>

<h3>Uma Jornada Estranha, Porém Cativante</h3>
<p>Se The Last of Us apresentou para o mundo a relação de paternidade duras em tempos desesperadores, e Death Stranding questionou as conexões do fim do mundo, a Capcom busca seu assento nesse panteão com Diana e nosso astronauta caladão. Eles se comunicam muitas vezes em hologramas confusos ou gestos sutis. No meio de tiroteios vertiginosos e cenários bizarros, Diana sendo sua pequena guia luminosa, apontando anomalias no trajeto e nos trazendo um elemento puramente emotivo entre tanto metal enferrujado, dá o tom perfeito para a obra.</p>

<h3>Veredito</h3>
<p>Sim, a Capcom o fez novamente, e da melhor forma possível. Pragmata não é apenas a redenção para jogos constantemente adiados; é a consagração de um estúdio que, nesta década atual, demonstra não ter medo de explorar, tentar e apostar alto no estranho. A demora dolorosa rendeu uma Odisseia Lunar inesquecível.</p>
<p>Se você busca uma ficção científica brutal, misteriosa e mecanicamente satisfatória, a passagem para "A Superfície" vale cada centavo.</p>

<p><strong>Klebsuchan</strong></p>
`
  },
  imageUrl: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/pragmata.webp",
  categories: [103]
};

postsData.unshift(newPost);
fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2), 'utf8');

console.log('Post inserted successfully!');
