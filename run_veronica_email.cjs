
fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: 1780950522480,
    postTitle: "😭 A JUSTIÇA FOI FEITA! Resident Evil Veronica é real e o primeiro trailer vai te deixar arrepiado do início ao fim!",
    postExcerpt: "O CHORO ACABOU! Resident Evil Veronica é REAL e chega em 2027!<br/><br/>Fala, galera do Klebsuchan!<br/><br/>Depois de anos de petições, teorias e a Capcom fingindo que não ouvia os fãs, a justiça finalmente foi feita no palco do Summer Game Fest: Resident Evil Veronica é oficial!<br/><br/>A nossa sobrevivente suprema, Claire Redfield, está de volta em um trailer de arrepiar que começa de forma claustrofóbica em primeira pessoa nas ruas de Paris e termina com uma emboscada sinistra. O game chega em 2027 rodando na RE Engine e promete resgatar o melhor do survival horror raiz.",
    postImage: "/images/veronica.jpg"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
