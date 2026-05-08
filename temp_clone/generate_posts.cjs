const fs = require('fs');
const https = require('https');

const topics = {
  101: [
    'Naruto', 'Dragon Ball', 'One Piece', 'Bleach', 'Death Note', 
    'Fullmetal Alchemist', 'Shingeki no Kyojin', 'My Hero Academia', 
    'Kimetsu no Yaiba', 'Jujutsu Kaisen', 'Neon Genesis Evangelion', 
    'JoJo\'s Bizarre Adventure', 'Hunter × Hunter', 'Sailor Moon', 
    'Os Cavaleiros do Zodíaco', 'Sword Art Online', 'Cowboy Bebop', 
    'Tokyo Ghoul', 'One Punch Man', 'Fairy Tail'
  ],
  103: [
    'Super Mario Bros.', 'The Legend of Zelda: Ocarina of Time', 'Minecraft', 
    'Grand Theft Auto V', 'League of Legends', 'Counter-Strike', 
    'Dota 2', 'World of Warcraft', 'The Witcher 3: Wild Hunt', 
    'Red Dead Redemption 2', 'Resident Evil 4', 'Final Fantasy VII', 
    'Street Fighter II', 'Mortal Kombat (1992)', 'Tetris', 
    'Pac-Man', 'Valorant', 'Overwatch', 'Elden Ring', 'Cyberpunk 2077'
  ],
  105: [
    'Universo Cinematográfico Marvel', 'Star Wars', 'Harry Potter', 
    'O Senhor dos Anéis', 'Game of Thrones', 'Stranger Things', 
    'The Walking Dead', 'Breaking Bad', 'Friends', 'The Office (Estados Unidos)', 
    'Matrix', 'De Volta para o Futuro', 'Jurassic Park', 
    'Batman: O Cavaleiro das Trevas', 'Avatar (filme)', 'Vingadores: Ultimato', 
    'Indiana Jones', 'K-pop', 'BTS', 'Blackpink'
  ],
  107: [
    'Inteligência artificial', 'Computação quântica', 'Realidade virtual', 
    'Realidade aumentada', 'Blockchain', 'Bitcoin', 'Internet das coisas', 
    '5G', 'Carro autônomo', 'Impressão 3D', 'Bateria de íon de lítio', 
    'Microprocessador', 'Sistema operacional', 'Computação em nuvem', 
    'Segurança da informação', 'Aprendizado de máquina', 'Deep learning', 
    'Fibra óptica', 'Smartphone', 'Robótica'
  ],
  109: [
    'Meme', 'Doge', 'Pepe, the Frog', 'Rickroll', 'Trollface', 
    'Nyan Cat', 'Harambe', 'Distracted boyfriend', 'Surprised Pikachu', 
    'This is Fine', 'Success Kid', 'Grumpy Cat', 'Hide the Pain Harold', 
    'Arthur (série animada)', 'Meme da mulher gritando com o gato', 'Meme literário', 
    'Kkkkk', 'Gretchen', 'Nazaré Tedesco', 'El Chavo del Ocho'
  ]
};

const introText = [
  "E aí, galera da Taverna! Aqui é o Klebsuchan trazendo mais um assunto que está dando o que falar nas rodinhas nerds e fóruns da vida. Hoje vamos falar sobre algo que eu particularmente acho sensacional (ou polêmico, vocês decidem!). Pega a sua poção de mana, ajeita a cadeira e bora pro loot de informações!",
  "Salve, aventureiros! Preparados para mais uma quest de conhecimento? A nossa party aqui no Klebsuchan não para nunca. Tenho certeza que você já farmou muita informação por aí, mas o resumo definitivo desse tema, do nosso jeitinho, você só encontra aqui. Se liga na build que preparamos pra vocês hoje:",
  "Fala pessoal, beleza? Klebsuchan na área com mais um conteúdo brabo. Porque internet não é só treta de fanboy, né? (Às vezes é, mas a gente gosta de agregar também). Foca nesse texto que eu escrevi com muito carinho e com as melhores fontes da nossa Guilda de Redatores. Olha só o que descobrimos:",
  "Saudações, clã! O assunto de hoje é aquele que a gente lê e já quer mandar no grupo do Zap ou do Discord pra ver a galera pirar. Se tem uma coisa que o Klebsuchan não faz é economizar na XP! Depois de horas minerando a web, compilamos o melhor conteúdo pra vocês. Partiu?"
];

const outroText = [
  "E aí, o que acharam? Deixem o feedback mental aí e não esqueçam de espalhar a palavra. Klebsuchan sempre de olho nas tendências! GG WP e até o próximo post!",
  "Acho que a gente zerou o assunto, né? Mas a lore nunca morre. Se curtiram a análise, continuem acompanhando a Taverna. Valeu pelo suporte e keep gaming/watching!",
  "Bom, esse foi o loot de hoje! Eu pessoalmente curti muito mergulhar nesse tema. Sigam ligados para mais dicas, curadoria e opiniões totalmente isentas (ou não rs). Um abraço do Klebs!",
  "É isso, tropa. Mais um post farmado com sucesso pra vocês. A gente se vê por aqui no Klebsuchan com muito mais conteúdo que compensa o tempo gasto. Tamo junto!"
];

function fetchWiki(title) {
  return new Promise((resolve, reject) => {
    https.get(`https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=1&titles=${encodeURIComponent(title)}`, {
      headers: { 'User-Agent': 'Klebsuchan/1.0 (https://ais-dev-x.us-east1.run.app)' },
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', c => data+=c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function processTextToHTML(text, minLen = 1500) {
  let paragraphs = text.split('\n').filter(p => p.trim().length > 0);
  let html = `<p><strong>${randomItem(introText)}</strong></p>\n\n`;
  let currentLen = html.length;
  
  for (let p of paragraphs) {
    if (p.startsWith('==') && p.endsWith('==')) {
      let title = p.replace(/=/g, '').trim();
      let hHtml = `<h3>${title}</h3>\n`;
      html += hHtml;
      currentLen += hHtml.length;
    } else {
      let pHtml = `<p>${p}</p>\n`;
      html += pHtml;
      currentLen += pHtml.length;
    }
    if (currentLen > 8000) break; // keep it long but not insanely long
  }
  
  // Pad if < 1500
  if (currentLen < 1500) {
    html += `<p>Para complementar, vale lembrar que no universo digital e geek, a comunidade sempre adiciona seus próprios temperos a essas histórias. O que mantém a relevância de tudo que consumimos é exatamente a nossa interação e o boca a boca! Falaremos ainda mais sobre as vertentes disso numa próxima ocasião, então fiquem espertos com as curiosidades que permeiam esse fascinante ecossistema de fãs, pro players e otakus em geral.</p>\n`;
    html += `<p>O mais importante é manter a cabeça aberta para novas experiências e não se prender a preconceitos, pois as melhores obras muitas vezes são aquelas que não dávamos crédito inicial. Acompanhe fóruns, leia mangás, jogue os indies; a cultura pop vive da paixão ardente que nós, fãs, dedicamos a ela diariamente! Afinal de contas, cada frame, cada pixel, cada rinha de fandom faz parte dessa grande jornada épica que vivemos. Vocês tão ligados como funciona a comunidade, né? A quantidade de coisas que poderiam ser ditas renderia um livro ou um podcast de 5 horas. Mas vamos deixar um gostinho de quero mais.</p>\n`;
  }
  
  html += `\n<p><strong>${randomItem(outroText)}</strong></p>`;
  return html;
}

let posts = [];
let idCounter = 1000;
let dateBase = new Date();

async function run() {
  for (let catId of Object.keys(topics)) {
    console.log(`Fetching cat ${catId}...`);
    for (let title of topics[catId]) {
      try {
        let r = await fetchWiki(title);
        let pages = r.query.pages;
        let pId = Object.keys(pages)[0];
        let extract = pages[pId].extract || '';
        if (extract.length < 50) {
          extract = `Opa! Nossos arquivos estão corrompidos ou estamos escondendo o jogo sobre ${title}. Mas pode ter certeza que é um assunto que tem muito hype na comunidade. Logo mais trazemos novidades exclusivas. Por enquanto divirta-se imaginando como as coisas poderiam ser e lembre-se das dicas e truques que passamos nas lives.`;
        }
        
        let htmlContent = processTextToHTML(extract);
        let plainWords = extract.substring(0, 150).replace(/\n/g, ' ') + '...';
        
        const imageUrls = [
          "https://image.pollinations.ai/prompt/cyberpunk%20aesthetic%2C%20neon%2C%20pop%20culture?width=800&height=400&nologo=true",
          "https://image.pollinations.ai/prompt/anime%20style%20scenery%20epic?width=800&height=400&nologo=true",
          "https://image.pollinations.ai/prompt/gaming%20setup%20esports%20stadium?width=800&height=400&nologo=true"
        ];
        
        posts.push({
          id: idCounter++,
          date: new Date(dateBase.getTime() - idCounter * 86400000).toISOString(),
          title: { rendered: `Tudo Sobre ${title}: Nossa Análise!` },
          content: { rendered: htmlContent },
          excerpt: { rendered: `<p>${plainWords}</p>` },
          categories: [parseInt(catId)],
          imageUrl: randomItem(imageUrls)
        });
      } catch (e) {
        console.log("Error on", title, e.message);
      }
    }
  }
  
  fs.writeFileSync('src/data/posts.json', JSON.stringify(posts, null, 2));
  console.log('Done! Generated', posts.length, 'posts.');
}

run();
