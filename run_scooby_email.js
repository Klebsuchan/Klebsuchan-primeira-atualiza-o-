
fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: 1780959545407,
    postTitle: "A Maldição Continua: Por que o Novo Scooby-Doo da Netflix é um Desastre Anunciado",
    postExcerpt: "🚨 O novo Scooby-Doo da Netflix vai ser um desastre nível Death Note?<br/><br/>A Netflix soltou o teaser do live-action Scooby-Doo: Origins e a polêmica já está armada!<br/><br/>Eles trocaram o clássico cão falante e expressivo por um cachorro \"realista\" de verdade e transformaram a Mistério S/A em um drama adolescente sombrio, focado em assassinatos com uma vibe totalmente true crime e Riverdale.<br/><br/>No novo artigo do Klebsuchan, dissecamos todos os motivos pelos quais essa tentativa de baratear os custos e reinventar a franquia tem tudo para ser o próximo grande fiasco do streaming, desrespeitando um legado de mais de 50 anos.<br/><br/>A maldição das adaptações ruins da Netflix atacou de novo? Clique no link abaixo, leia a crítica completa e venha debater com a gente!",
    postImage: "/images/scooby.jpg"
  })
}).then(res => res.json()).then(data => {
  console.log('Resultado do envio do Email:', data);
  process.exit(0);
}).catch(err => {
  console.error('Erro ao acionar o envio de email:', err);
  process.exit(1);
});
