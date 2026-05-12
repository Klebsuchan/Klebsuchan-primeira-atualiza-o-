import fs from 'fs';
import path from 'path';

const postsPath = path.join(process.cwd(), 'src', 'data', 'posts.json');
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const newPost = {
  id: 1779000000001,
  date: new Date().toISOString(),
  title: {
    rendered: "🎸 O Big Bang do Rock: Os 60 Momentos Mais Épicos da História!"
  },
  excerpt: {
    rendered: "<p>Fala, galera! Sejam bem-vindos a mais um post épico aqui no Klebsuchan. Hoje nós vamos fazer uma viagem no tempo digna de ficção científica para explorar a espinha dorsal da cultura pop: o Rock and Roll.</p>"
  },
  content: {
    rendered: `
<p>Fala, galera! Sejam bem-vindos a mais um post épico aqui no Klebsuchan. Hoje nós vamos fazer uma viagem no tempo digna de ficção científica para explorar a espinha dorsal da cultura pop: o Rock and Roll.</p>

<p>Há mais de seis décadas, o mundo ouviu o clássico refrão de “Rock Around the Clock” e, desde então, a música — e a nossa atitude — nunca mais foram as mesmas. O rock não é só um gênero musical; é a rebeldia em forma de som. É a mesma energia subversiva que a gente vê nas melhores sagas de mangá, filmes e games. Nasceu da fusão genial do blues, country e rhythm and blues, e foi se transmutando em punk, indie, metal e até música eletrônica.</p>

<p>O que une Elvis Presley, Kurt Cobain e as divas do pop contemporâneo? A atitude. Pega seu fone de ouvido, aumenta o volume e vem conferir os 60 momentos que definiram a saga do rock!</p>

<h3>A Gênese e as Revoluções Permanentes</h3>
<p>O rock não surgiu de um dia para o outro. Ele foi o resultado de uma panela de pressão cultural nos EUA. Depois da Segunda Guerra, a juventude precisava de uma voz. O jazz cerebral já não servia para as pistas de dança, e o pop certinho das rádios era muito engessado. Foi o rhythm and blues negro, com suas guitarras amplificadas e ritmo acelerado, que acendeu o pavio. Com a ajuda de visionários, o R&B cruzou a barreira do preconceito, se misturou com a música country e ganhou as massas. A partir daí, o mundo virou de cabeça para baixo.</p>

<p>Aqui estão os marcos dessa jornada:</p>

<ol>
<li><strong>O Big Bang (1955):</strong> Bill Haley & His Comets gravam “Rock Around the Clock”. A música entra na trilha do filme Sementes da Violência e se torna o primeiro hino oficial da juventude rebelde.</li>
<li><strong>A Quebra de Barreiras (1955):</strong> A batida negra toma o mainstream. Lendas como Chuck Berry, Little Richard e Fats Domino colocam fogo nas paradas de sucesso.</li>
<li><strong>A Coroação do Rei (1956):</strong> Elvis Presley explode mundialmente pela RCA. Com hits como “Hound Dog”, ele cria o arquétipo definitivo do rockstar.</li>
<li><strong>O Despertar Britânico (1958):</strong> Antes dos Beatles, o rock inglês já dava as caras com Cliff Richard e experimentações sonoras pioneiras do produtor Joe Meek.</li>
<li><strong>O Dia em que a Música Morreu (1959):</strong> Um trágico acidente de avião tira a vida de Buddy Holly, The Big Bopper e Ritchie Valens, encerrando a inocência da primeira era do rock.</li>
<li><strong>A Alma do Soul (1959):</strong> Ray Charles mistura o fervor do gospel com as letras seculares em “What’d I Say”, fundando a soul music.</li>
<li><strong>A Fábrica de Hits (1960):</strong> O edifício Brill Building, em Nova York, se torna o centro de compositores geniais que uniam a sofisticação melódica com a atitude adolescente.</li>
<li><strong>A Caravana da Motown (1962):</strong> A mítica gravadora de Detroit coloca o espetáculo Motortown Revue na estrada, consagrando lendas como Stevie Wonder e Marvin Gaye.</li>
<li><strong>A Muralha Sonora (1963):</strong> O produtor Phil Spector cria o Wall of Sound, transformando músicas pop em verdadeiras sinfonias épicas.</li>
<li><strong>O Rock de Garagem (1963):</strong> The Kingsmen lançam uma versão suja e crua de “Louie Louie”, provando que atitude importa mais que técnica perfeita.</li>
</ol>

<h3>A Invasão e a Psicodelia</h3>
<ol start="11">
<li><strong>A Invasão Britânica (1964):</strong> Os Beatles desembarcam nos EUA. Com uma passagem lendária pelo Ed Sullivan Show, eles dominam o topo das paradas e mudam a cultura pop para sempre.</li>
<li><strong>O Super Show (1964):</strong> O T.A.M.I. Show reúne gigantes como Rolling Stones e The Beach Boys, mas é James Brown que rouba a cena com uma performance incendiária.</li>
<li><strong>A Voz dos Direitos Civis (1964):</strong> Sam Cooke lança “A Change Is Gonna Come”, transformando a música em um poderoso hino contra o racismo.</li>
<li><strong>O Choque Elétrico (1965):</strong> Bob Dylan enfurece os puristas ao plugar uma guitarra elétrica no festival folk de Newport, abrindo caminho para obras-primas como “Like a Rolling Stone”.</li>
<li><strong>A Insatisfação (1965):</strong> Keith Richards sonha com um riff, acorda, grava e volta a dormir. O resultado? “(I Can’t Get No) Satisfaction”, dos Rolling Stones.</li>
<li><strong>A Sinfonia de Bolso (1966):</strong> The Beach Boys lançam Pet Sounds. Brian Wilson cria uma obra-prima conceitual e complexa que influencia toda uma geração.</li>
<li><strong>O Deus da Guitarra (1966):</strong> Os muros de Londres amanhecem pichados com “Clapton é Deus”. Eric Clapton inaugura o culto supremo aos guitar heroes.</li>
<li><strong>Quebrando Tabus (1967):</strong> The Doors surge em Los Angeles. Jim Morrison traz poesia sombria e teatralidade perigosa para o rock com “The End”.</li>
<li><strong>O Verão do Amor (1967):</strong> O Human Be-In em São Francisco consolida a contracultura e o nascente rock psicodélico com bandas como Grateful Dead.</li>
<li><strong>A Rainha do Soul (1967):</strong> Aretha Franklin entra no estúdio Muscle Shoals e grava sucessos eternos como “Respect”, exigindo respeito e mudando o jogo.</li>
<li><strong>O Lado Obscuro (1967):</strong> The Velvet Underground lança seu álbum da "banana". Ignorado na época, o som cru focado em tabus urbanos pavimentou o rock alternativo.</li>
<li><strong>A Viagem de Sgt. Pepper’s (1967):</strong> Os Beatles lançam um álbum conceitual lisérgico e genial que transcende a música e reflete toda a vibração do momento.</li>
<li><strong>O Prototipo dos Festivais (1967):</strong> O Monterey Pop Festival revela Janis Joplin e consagra Jimi Hendrix, que literalmente incendeia sua guitarra no palco.</li>
<li><strong>O Rock Vai Para o Campo (1968):</strong> The Byrds se aproxima da música rural americana, criando as bases para o milionário country rock.</li>
<li><strong>O Protesto (1969):</strong> O Creedence Clearwater Revival usa hits como “Fortunate Son” para bater de frente com a insensatez da Guerra do Vietnã.</li>
</ol>

<h3>Óperas, Lama e Som Pesado</h3>
<ol start="26">
<li><strong>A Ópera Rock (1969):</strong> The Who lança Tommy, expandindo a ambição narrativa do rock ao contar a saga de um garoto cego, surdo e mudo que é gênio do fliperama.</li>
<li><strong>O Cume da Utopia (1969):</strong> Meio milhão de pessoas se reúnem em Woodstock para três dias de lama, paz, música épica e performances históricas (como a de Hendrix).</li>
<li><strong>O Fim da Inocência (1969):</strong> O catastrófico festival de Altamont, encabeçado pelos Stones, termina em tragédia e assassinato, enterrando o sonho hippie.</li>
<li><strong>A Era dos Cantautores (1970):</strong> Artistas como Elton John e Carole King dominam os anos 70 com letras introspectivas e confessionais.</li>
<li><strong>O Peso das Trevas (1970):</strong> O Black Sabbath lança seu disco de estreia. Com os riffs sinistros de Tony Iommi, nasce o Heavy Metal.</li>
<li><strong>O Apogeu Progressivo (1971):</strong> Bandas como Pink Floyd, Genesis e Yes transformam álbuns em grandiosas suítes cerebrais cheias de técnica.</li>
<li><strong>O Retrato Urbano (1971):</strong> Marvin Gaye (What’s Going On) e Sly Stone lançam obras fundamentais abordando os problemas sociais e o caos da época.</li>
<li><strong>O Exílio Clássico (1972):</strong> Os Rolling Stones gravam Exile on Main St. no sul da França, resultando no ápice criativo de suas carreiras em meio a muitos excessos.</li>
<li><strong>A Invasão Alienígena Glam (1972):</strong> David Bowie veste purpurina, cria a persona de Ziggy Stardust e muda os padrões estéticos e de gênero no Glam Rock.</li>
<li><strong>Os Deuses do Olimpo (1973):</strong> O Led Zeppelin se torna a maior banda do planeta com turnês gigantescas, culminando no estrondoso sucesso de álbuns como Houses of the Holy.</li>
<li><strong>O Lado Oculto da Lua (1973):</strong> O Pink Floyd lança The Dark Side of the Moon, uma obra-prima atemporal sobre paranoia e existencialismo.</li>
<li><strong>O Computador Toca Pop (1975):</strong> O Kraftwerk lança “Autobahn”. O pop eletrônico feito com sintetizadores nasce e molda o futuro da música.</li>
<li><strong>Sujeira no CBGB (1975):</strong> Um pequeno clube em Nova York vira o epicentro do nascimento do punk e da new wave, revelando os Ramones, Blondie e Talking Heads.</li>
<li><strong>A Vitória do Reggae (1975):</strong> Bob Marley faz um show histórico em Londres, coroando-se como o maior ídolo global fora do eixo EUA-Inglaterra.</li>
<li><strong>O Chefe Chegou (1975):</strong> Bruce Springsteen lança Born to Run e é celebrado por grandes revistas americanas como a verdadeira salvação do rock and roll.</li>
</ol>

<h3>Do Punk ao Digital</h3>
<ol start="41">
<li><strong>A Revolução dos Clipes (1975):</strong> O Queen lança o bombástico vídeo de “Bohemian Rhapsody”, provando o poder absoluto de misturar a TV com a música.</li>
<li><strong>A Nave Mãe do Funk (1976):</strong> George Clinton desce uma nave espacial gigante no palco durante um show do Parliament-Funkadelic, atingindo o ápice do groove.</li>
<li><strong>A Última Valsa (1976):</strong> A The Band se despede em um show épico com convidados lendários, imortalizado no cinema por Martin Scorsese, marcando o fim de uma era.</li>
<li><strong>A Anarquia Britânica (1977):</strong> Os Sex Pistols escandalizam a rainha e a sociedade com seu punk rasgado, mostrando que o descontentamento não precisava de acordes complexos.</li>
<li><strong>A Febre da Pista (1977):</strong> A Disco Music domina o globo, coroada pela trilha dos Bee Gees para Os Embalos de Sábado à Noite.</li>
<li><strong>O Novo Metal (1979):</strong> A New Wave of British Heavy Metal (NWOBHM) ganha os holofotes, trazendo velocidade e lendas como Iron Maiden para as massas.</li>
<li><strong>O Faça-Você-Mesmo Independente (1981):</strong> O R.E.M. desponta, mesclando a atitude punk com guitarras acessíveis, e lança a semente do que se tornaria o Indie Rock.</li>
<li><strong>O Vídeo Matou o Rádio (1981):</strong> A MTV entra no ar, alterando completamente a forma como consumimos e imaginamos a música pop.</li>
<li><strong>Passos na Lua (1983):</strong> Michael Jackson apresenta o moonwalk na TV americana. O Rei do Pop alcança um nível de adoração comparável a Elvis e aos Beatles.</li>
<li><strong>A Bandeira Branca (1983):</strong> O U2 grava no anfiteatro natural Red Rocks, debaixo de chuva. A performance de “Sunday Bloody Sunday” consagra a banda globalmente.</li>
<li><strong>Velocidade Máxima (1983):</strong> O Metallica lança Kill ‘Em All, trazendo a agressividade de quebrar o pescoço que popularizou o thrash metal.</li>
<li><strong>A Camaleoa Provoca (1984):</strong> Madonna sobe ao palco do MTV Awards para cantar “Like a Virgin”. Nascia ali uma força feminina incomparável que repaginaria o pop.</li>
<li><strong>A Música Pelo Mundo (1985):</strong> O evento beneficente global Live Aid junta os maiores astros da Terra, mas é o Queen que faz a performance mais inesquecível da história.</li>
<li><strong>O Embate Contra a Censura (1985):</strong> Nomes como Frank Zappa e Dee Snider vão ao senado americano lutar contra censores governamentais, defendendo a liberdade de expressão.</li>
<li><strong>Os Reis de LA (1987):</strong> O Guns N’ Roses lança Appetite for Destruction. Axl Rose e Slash trazem de volta a perigosidade crua e se tornam os bad boys definitivos do rock.</li>
</ol>

<h3>A Última Fronteira</h3>
<ol start="56">
<li><strong>O Hino de uma Geração (1991):</strong> Kurt Cobain lidera o Nirvana e estoura com o Grunge. “Smells Like Teen Spirit” tira o pop plastificado do topo e injeta melancolia e fúria crua de volta ao mainstream.</li>
<li><strong>A Guerra do Britpop (1994):</strong> Blur e Oasis ressuscitam o orgulho do rock britânico e travam uma batalha midiática sensacional pelos topos das paradas no Reino Unido.</li>
<li><strong>O Renascimento Cerebral (1997):</strong> O Radiohead lança OK Computer. Melancólico, hi-tech e magistral, é o auge do art rock para o fim do milênio.</li>
<li><strong>A Salvação Nova-Iorquina (2001):</strong> Os Strokes despontam embalados pela internet, resgatando a atitude de garagem e ditando as regras de estilo para a nova década do indie rock.</li>
<li><strong>A Trágica Rainha Retrô (2006):</strong> Amy Winehouse usa suas dores e o puro soul do passado para conquistar o mundo com Back to Black. Um talento monumental que, infelizmente, partiu cedo demais, consolidando-se como uma das maiores vozes do século 21.</li>
</ol>

<p>E aí, qual desses momentos vocês acham que foi o mais decisivo? Faltou algum plot twist marcante nessa história? Deixa nos comentários e bora continuar essa resenha!</p>`
  },
  imageUrl: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rock.webp",
  categories: [105]
};

postsData.unshift(newPost);
fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2), 'utf8');

console.log('Post inserted successfully!');
