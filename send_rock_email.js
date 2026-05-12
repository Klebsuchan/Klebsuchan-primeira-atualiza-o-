fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: 1779000000001,
    postTitle: "🎸 O Big Bang do Rock: Os 60 Momentos Mais Épicos da História!",
    postExcerpt: "🎸 A Saga Épica do Rock: Os 60 Momentos que Mudaram o Mundo!\\n\\nFala, galera do Klebsuchan! 🤘\\n\\nPreparados para uma viagem no tempo digna de ficção científica? Acabou de sair um post histórico no blog dissecando os 60 Maiores Momentos da História do Rock and Roll!\\n\\nDesde o \"Big Bang\" nas guitarras dos anos 50, passando pela invasão britânica, as lamas de Woodstock, a rebeldia anárquica do punk, até a explosão grunge do Nirvana e a atitude indie dos Strokes. Nós resgatamos os riffs, os bastidores insanos e a rebeldia que moldaram a cultura pop e o mundo como a gente conhece.\\n\\nPega seu fone de ouvido, aumenta o volume e vem conferir essa linha do tempo musical definitiva!",
    postImage: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rock.webp"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
