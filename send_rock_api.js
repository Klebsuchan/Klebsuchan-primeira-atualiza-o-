fetch('http://localhost:3000/api/notify-new-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: 1730000000000,
    postTitle: "🎸 O Big Bang do Rock: Os 60 Momentos Mais Épicos da História!",
    postExcerpt: "Quando os amplificadores ligaram e a guitarra gritou pela primeira vez, o mundo mudou para sempre. O rock and roll não é apenas um estilo musical; é uma atitude, uma revolução cultural que moldou gerações. Nesta imersão completa, vamos explorar as 60 maiores curiosidades sobre as lendas...",
    postImage: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rock.webp"
  })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
