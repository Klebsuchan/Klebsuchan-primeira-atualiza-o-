fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: 1779000000000,
    postTitle: "Pragmata: A Odisseia Lunar que Desafiou o Inferno do Desenvolvimento 🌕🚀",
    postExcerpt: "🌕 Pragmata: A odisseia lunar da Capcom que sobreviveu ao inferno do desenvolvimento! Fala, pessoal! Tudo beleza? Sabe aquela velha maldição da indústria dos games de que títulos que passam anos e anos no \"inferno do desenvolvimento\" quase sempre chegam incompletos ou decepcionantes? Pois é, a Capcom acaba de quebrar essa regra com Pragmata, e a nossa análise completa já está no ar lá no klebsuchan!",
    postImage: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/pragmata.webp"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
