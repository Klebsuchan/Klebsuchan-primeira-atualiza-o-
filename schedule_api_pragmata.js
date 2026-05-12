fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: 1779000000000,
    postTitle: "Pragmata: A Odisseia Lunar que Desafiou o Inferno do Desenvolvimento 🌕🚀",
    postExcerpt: "Se existe uma lenda urbana na indústria dos videogames que quase sempre se prova verdadeira, é a de que projetos que passam anos a fio no chamado 'inferno do desenvolvimento' raramente entregam o que prometem. A Capcom, em sua atual fase experimental, traz com Pragmata uma proposta que abraça o esquisito, mas o tempera com um sabor incrivelmente refinado. Confira nossa análise compelta.",
    postImage: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/pragmata.webp",
    scheduledAt: "2026-05-13T11:00:00.000Z"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
