
fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: 1780515184237,
    postTitle: "Nicolas Cage Quebra o Silêncio Sobre 2ª Temporada de Spider-Noir e Bastidores de 400 Milhões de Dólares Geram Crise na Amazon",
    postExcerpt: "Crise no Prime Video? Nicolas Cage fala sobre 2ª temporada de Spider-Noir e orçamento bizarro! 🕷️💼<br/><br/>Fala, galera do Klebsuchan!<br/><br/>Se você maratona a série Spider-Noir e curtiu a vibe detetive do Nicolas Cage, prepare-se: o futuro da produção está na corda bamba por causa de uma treta bizarra nos bastidores.<br/><br/>Boatos apontam que a primeira temporada custou astronômicos 400 milhões de dólares! O motivo? Os engravatados da Amazon decidiram de última hora que queriam uma versão colorida, o que arruinou o planejamento dos diretores (que filmaram tudo pensando no preto e branco clássico) e exigiu quase um ano de refilmagens caríssimas. Para piorar, o próprio Nicolas Cage soltou o verbo e deu uma declaração bem desanimadora sobre o futuro do herói.",
    postImage: "/images/spidernoir.jpg"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
