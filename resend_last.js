fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    postId: 1778277318250,
    postTitle: "Mortal Kombat 2: Quem vence o torneio? Entenda o final! 🐉🔥",
    postExcerpt: "A batalha definitiva começou. Após os eventos de 2021, os campeões da Terra precisam enfrentar o poder esmagador da Exoterra no torneio mais violento de todos os tempos. Enquanto a Princesa Kitana busca vingança contra o tirano Shao Kahn, nomes icônicos como Johnny Cage e Scorpion entram na disputa para impedir a aniquilação da humanidade. Entre alianças inesperadas e combates brutais, o destino de todos será decidido no fio da navalha. O torneio começou: vença ou morra.",
    postImage: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/mortalkombatfilme.jpg"
  })
}).then(r => r.json()).then(console.log).catch(console.error);
