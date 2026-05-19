const triggerCode = `
fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: process.argv[2],
    postTitle: "Os Melhores Animes de 2026 (Até agora😂)",
    postExcerpt: "O ano de 2026 está simplesmente absurdo para os otakus. Em poucos meses, fomos bombardeados por estreias bizarras de qualidade, retornos de peso que quebraram a internet e arcos que esperávamos há mais de uma década saindo do papel.<br/><br/>Do espetáculo visual da nova temporada de Jujutsu Kaisen à genialidade de Witch Hat Atelier e as bizarrices de Rooster Fighter, o mar de opções nos streamings está gigante. Para você não perder tempo com preenchimento de linguiça, montei o guia definitivo no klebsuchan com os 19 melhores animes do ano até agora e, claro, onde assistir a cada um deles.",
    postImage: "/images/animes2026.jpg"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
`;
require('fs').writeFileSync('run_email.js', triggerCode);
