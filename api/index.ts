import express from "express";
import { Resend } from "resend";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

export const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY || 're_missing_key');

app.post("/api/shopee/proxy", express.json(), async (req, res) => {
  try {
    const appId = process.env.SHOPEE_APP_ID || "";
    const appSecret = process.env.SHOPEE_APP_SECRET || "";
    const payloadString = JSON.stringify({ query: req.body.query });
    const timestamp = Math.floor(Date.now() / 1000);
    const factor = appId + timestamp + payloadString + appSecret;
    const sign = crypto.createHash("sha256").update(factor).digest("hex");
    const authHeader = `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${sign}`;
    const url = `https://open-api.affiliate.shopee.com.br/graphql`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": authHeader },
      body: payloadString
    });
    const data = await response.json();
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Rota API para buscar produtos usando a Shopee API
app.get("/api/shopee/products", async (req, res) => {
  try {
    const keyword = (req.query.keyword as string) || "";
    const appId = process.env.SHOPEE_APP_ID || "";
    const appSecret = process.env.SHOPEE_APP_SECRET || "";
    
    const payloadString = JSON.stringify({
      query: `
        query {
          productOfferV2(page: 1, limit: 30${keyword ? `, keyword: "${keyword}"` : ""}) {
            nodes {
              itemId
              productName
              price
              imageUrl
              productLink
              offerLink
              sales
              commissionRate
            }
          }
        }
      `
    });

    const timestamp = Math.floor(Date.now() / 1000);
    
    const factor = appId + timestamp + payloadString + appSecret;
    const sign = crypto.createHash("sha256").update(factor).digest("hex");
    
    const authHeader = `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${sign}`;
    
    const url = `https://open-api.affiliate.shopee.com.br/graphql`;

    // Produtos de fallback para a loja nunca ficar vazia caso a API falhe por falta de permissão ou token
    const fallbackProducts: any[] = [
      {
        itemId: "1",
        productName: "Cadeira Gamer Profissional Ergonômica Reclinável",
        price: 89900000,
        imageUrl: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777575210229.webp",
        productLink: "https://collshp.com/klebsuchanstore",
        category: "Setup Gamer",
        sales: 1500
      },
      {
        itemId: "2",
        productName: "Mouse Gamer RGB 12000 DPI Sensor Óptico",
        price: 15900000,
        imageUrl: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1",
        productLink: "https://collshp.com/klebsuchanstore",
        category: "Periféricos",
        sales: 2300
      },
      {
        itemId: "3",
        productName: "Action Figure Naruto Shippuden Uzumaki",
        price: 7900000,
        imageUrl: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tokyo-ghoul.jpg?v=1",
        productLink: "https://collshp.com/klebsuchanstore",
        category: "Colecionáveis",
        sales: 850
      }
    ];

    // A API tentará buscar, se falhar ou as credenciais forem vazias
    if (!appId || !appSecret) {
       return res.status(200).json({ 
         success: true, 
         products: fallbackProducts, 
         isFallback: true, 
         apiError: "Configure as variáveis de ambiente (APP ID e APP SECRET) no Vercel para carregar produtos reais.",
         configNeeded: true // Adicionado para facilitar detecção no front
       });
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": authHeader
      },
      body: payloadString
    });
    
    const data = await response.json();
    
    if (!response.ok || data.errors || data.error) {
      console.warn("Shopee API returned an error, falling back to mock products:", data);
      const errMsg = data.errors ? data.errors[0]?.message : (data.error || data.message);
      return res.status(200).json({ success: true, products: fallbackProducts, isFallback: true, apiError: errMsg });
    }

    // Shopee GraphQL successful response parsing
    let shopeeItems = data.data?.productOfferV2?.nodes;
    
    if (!shopeeItems) {
      shopeeItems = fallbackProducts;
    }

    return res.status(200).json({ success: true, products: shopeeItems, isFallback: false });

  } catch (err: any) {
    console.error("Shopee API Error:", err);
    // Em caso de erro absoluto no servidor, usar fallback
    return res.status(200).json({ success: true, products: [], isFallback: true, error: "Erro interno, carregando loja visualmente." });
  }
});

// Rota API para cadastrar e/ou enviar email de boas-vindas na Newsletter
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "E-mail é obrigatório" });
    }

    const supabase = createClient(
      'https://eezccvpkexmssynooupi.supabase.co',
      process.env.VITE_SUPABASE_ANON_KEY || ''
    );
    
    const { error: dbError } = await supabase
      .from('newsletters')
      .insert({ email: email, created_at: new Date().toISOString() });
      
    if (dbError) {
      console.error("Erro ao inserir no Supabase:", dbError);
      return res.status(400).json({ error: "Erro ao salvar no banco: " + dbError.message });
    }

    // Adiciona o contato na aba Contacts do Resend, se o Audience ID estiver configurado
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({
          audienceId: audienceId,
          email: email
        });
        console.log(`Email ${email} adicionado ao Audience do Resend com sucesso.`);
      } catch (contactError) {
        console.error("Erro ao adicionar contato no Resend:", contactError);
      }
    }

    let fromEmail = process.env.RESEND_FROM_EMAIL || process.env.RESEND_DOMAIN || 'onboarding@resend.dev';
    
    if (fromEmail.toLowerCase().includes('@gmail.com')) {
      fromEmail = 'newsletter@klebsuchan.com.br';
    }

    const domain = fromEmail;
    const baseUrl = req.headers.origin || process.env.APP_URL || 'https://klebsuchan.com.br';
    
    try {
      const { error } = await resend.emails.send({
        from: `Klebsuchan Newsletter <${domain}>`,
        to: email, // enviando para o email que se cadastrou
        subject: "Bem-vindo à Guilda Klebsuchan!",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #121214; margin: 0; padding: 40px 10px; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #202024; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .email-header { background-color: #121214; padding: 30px 30px; text-align: center; border-bottom: 2px solid #ffd700; }
    .header-content { display: inline-block; vertical-align: middle; }
    .header-logo { width: 40px; height: 40px; vertical-align: middle; margin-right: 15px; }
    .header-text { display: inline-block; vertical-align: middle; color: #ffd700; margin: 0; font-size: 28px; font-weight: 800; font-style: italic; letter-spacing: 1px; }
    .email-body { padding: 40px 30px; color: #e1e1e6; line-height: 1.6; font-size: 16px; }
    .email-body h2 { color: #ffffff; font-size: 22px; margin-top: 0; }
    .email-footer { background-color: #121214; padding: 0; text-align: center; font-size: 0; line-height: 0; }
    .email-footer img { width: 100%; max-width: 600px; height: auto; display: block; margin: 0; }
    .highlight { color: #ffd700; font-weight: 600; }
    .card { background-color: #121214; border-radius: 12px; margin-bottom: 25px; border: 1px solid #323238; overflow: hidden; }
    .card-img-container { width: 100%; height: 200px; overflow: hidden; background-color: #121214; line-height: 0; }
    .card-img { width: 100%; height: 100%; object-fit: cover; border: none; outline: none; }
    .card-content { padding: 25px; }
    .card-title { margin: 0 0 10px 0; font-size: 18px; color: #ffffff; font-weight: 800; line-height: 1.3; }
    .card-desc { margin: 0 0 20px 0; font-size: 15px; color: #a8a8b3; line-height: 1.5; }
    .btn { background-color: #ffd700; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 800; display: inline-block; text-align: center; text-transform: uppercase; }
    
    /* Fallbacks for older email clients */
    @media only screen and (max-width: 600px) {
      .email-container { border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <div class="header-content">
        <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1" alt="Logo Klebsuchan" class="header-logo" />
        <h1 class="header-text">KLEBSUCHAN</h1>
      </div>
    </div>
    <div class="email-body">
      <h2>Aperte o Start! 🎮</h2>
      <p>Fala, guerreiro(a)! Seja super bem-vindo(a) à guilda do <span class="highlight">Klebsuchan</span>.</p>
      <p>A partir de agora, você receberá nossos melhores loots de conteúdo. Para começar com o pé direito, separamos alguns dos nossos pergaminhos sagrados para você dar uma olhada:</p>
      
      <!-- Seção de Artigos Recomendados -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 35px; margin-bottom: 10px;">
        <tr>
          <td><h3 style="color: #ffffff; font-size: 20px; font-weight: 800; text-align: center; margin-bottom: 25px;">Destaques da Taverna</h3></td>
        </tr>
        <tr>
          <td>
            
            <!-- Card 1 -->
            <div class="card">
              <div class="card-img-container">
                <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tokyo-ghoul.jpg?v=1" alt="Tokyo Ghoul" class="card-img" />
              </div>
              <div class="card-content">
                <h4 class="card-title">Tokyo Ghoul: Uma Análise Profunda da Obra de Sui Ishida</h4>
                <p class="card-desc">Um mergulho sombrio e fascinante na mente do criador de um dos animes mais marcantes da geração.</p>
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" bgcolor="#ffd700" style="border-radius: 8px;">
                      <a href="https://www.klebsuchan.com.br/?post=17" target="_blank" style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 800; display: inline-block; text-transform: uppercase; line-height: 1;">Ler Artigo Completo</a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="card">
              <div class="card-img-container">
                <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/GTA5.avif" alt="Grand Theft Auto V" class="card-img" />
              </div>
              <div class="card-content">
                <h4 class="card-title">Tudo Sobre Grand Theft Auto V: Nossa Análise!</h4>
                <p class="card-desc">Explorando o caos, o humor ácido e as infinitas loucuras que Los Santos tem a oferecer anos após seu lançamento.</p>
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" bgcolor="#ffd700" style="border-radius: 8px;">
                      <a href="https://www.klebsuchan.com.br/?post=1023" target="_blank" style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 800; display: inline-block; text-transform: uppercase; line-height: 1;">Ler Artigo Completo</a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

          </td>
        </tr>
      </table>

      <br/>
      <p>Fique de olho na sua caixa de entrada, em breve traremos mais novidades sobre games, cultura pop e tecnologias.</p>
      <p>Um abraço,<br/><strong class="highlight">Equipe Klebsuchan</strong></p>
    </div>
    
    <!-- Footer Image -->
    <div class="email-footer">
      <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rodape-email.png?v=1" alt="Rodapé Klebsuchan" />
    </div>
  </div>
</body>
</html>
        `
        });

        if (error) {
          console.error("Resend API Error:", error);
        }
      } catch (emailError) {
        console.error("Falha ao chamar a Resend (ignorado):", emailError);
      }

    return res.status(200).json({ success: true, message: "Inscrito com sucesso!" });
  } catch (err: any) {
    console.error("/api/subscribe Express Error:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Rota API para notificar todos os inscritos sobre um novo artigo
app.post("/api/notify-new-post", async (req, res) => {
  try {
    const { postId, postTitle, postExcerpt, postImage, scheduledAt } = req.body;
    
    if (!postId || !postTitle) {
      return res.status(400).json({ error: "Dados do post incompletos (postId e postTitle são obrigatórios)" });
    }

    let emailsToSend: any[] = [];
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    
    // Buscar da Audience do Resend
    if (audienceId) {
      try {
        const contactsResponse = await resend.contacts.list({ audienceId });
        if (contactsResponse.data && contactsResponse.data.data) {
          const resendEmails = contactsResponse.data.data
            .filter((c: any) => !c.unsubscribed)
            .map((c: any) => c.email);
          emailsToSend = [...new Set([...emailsToSend, ...resendEmails])];
        }
      } catch (err) {
        console.error("Erro ao buscar contatos da Audience no Resend:", err);
      }
    }

    // Buscar do Supabase (newsletters table)
    try {
      const supabase = createClient(
        'https://eezccvpkexmssynooupi.supabase.co',
        process.env.VITE_SUPABASE_ANON_KEY || ''
      );
      const { data: subscribers, error: subError } = await supabase
        .from('newsletters')
        .select('email');
      
      if (subscribers && !subError) {
        const supabaseEmails = subscribers.map((s: any) => s.email);
        emailsToSend = [...new Set([...emailsToSend, ...supabaseEmails])];
      }
    } catch (err) {
      console.error("Erro ao buscar contatos do Supabase:", err);
    }

    if (emailsToSend.length === 0) {
      console.log("Aviso: Falha ao buscar a lista da Resend ou lista vazia. Enviando apenas para o administrador.");
      emailsToSend = ["braian.kleber.camargo@gmail.com"];
    }

    let fromEmail = process.env.RESEND_FROM_EMAIL || process.env.RESEND_DOMAIN || 'onboarding@resend.dev';
    
    // O Resend não permite envio por domínios gratuitos como @gmail.com se o domínio não puder ser verificado.
    // Como você mencionou que o domínio está verificado, forçamos um email do seu domínio, caso use @gmail.com.
    if (fromEmail.toLowerCase().includes('@gmail.com')) {
      fromEmail = 'newsletter@klebsuchan.com.br';
    }

    const domain = fromEmail;
    const baseUrl = req.headers.origin || process.env.APP_URL || 'https://klebsuchan.com.br';

    // Lógica para anexar imagem se for um arquivo local ou URL
        // Lógica para anexar imagem se for um arquivo local ou URL
    let finalPostImage = postImage;

    if (!finalPostImage) {
      // Find the post from posts.json to get fallback image
      try {
        const cwd = process.cwd();
        const possiblePaths = [
          path.join(cwd, 'src', 'data', 'posts.json'),
          path.join(cwd, '..', 'src', 'data', 'posts.json'),
          path.join('/tmp', 'posts.json')
        ];
        
        let postsData = null;
        for (const p of possiblePaths) {
          if (fs.existsSync(p)) {
            postsData = fs.readFileSync(p, 'utf8');
            break;
          }
        }
        
        if (postsData) {
          const posts = JSON.parse(postsData);
          const currentPost = posts.find((p) => p.id === postId);
          if (currentPost) {
            if (currentPost.imageUrl) {
              finalPostImage = currentPost.imageUrl;
            } else if (currentPost.id === 0) {
              finalPostImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/naruto.avif?v=1";
            } else if (currentPost.id === 2) {
              finalPostImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/one-piece.jpg?v=1";
            } else if (currentPost.id === 8) {
              finalPostImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/kimetsu-no-yaba.png?v=1";
            } else if (currentPost.id === 17) {
              finalPostImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tokyo-ghoul.jpg?v=1";
            } else if (currentPost.categories && currentPost.categories.includes(101)) {
              const animeImages = [
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573270628.webp",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573271893.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573272900.webp",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573274391.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573275387.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573275920.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573276503.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573277135.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573279074.webp",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573280472.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573281014.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573281646.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573282233.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573282629.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573283580.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573284563.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573284856.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573285242.webp",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573286670.png",
                "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573287173.png"
              ];
              finalPostImage = animeImages[(currentPost.id) % animeImages.length];
            } else if (currentPost.categories && currentPost.categories.includes(103)) {
              finalPostImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/mario.jpg?v=1";
            } else if (currentPost.categories && currentPost.categories.includes(105)) {
              finalPostImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/marvel.jpeg?v=2";
            } else if (currentPost.categories && currentPost.categories.includes(107)) {
              finalPostImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_robotica.jpg?v=3";
            } else if (currentPost.yoast_head_json?.og_image?.[0]?.url) {
              finalPostImage = currentPost.yoast_head_json.og_image[0].url;
            }
          }
        }
      } catch (e) {
        console.error("Error fetching fallback image for email:", e);
      }
    }

    if (!finalPostImage) {
        finalPostImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1";
    }

    let attachments: any[] = [];
    let imageSrc = finalPostImage;

    if (finalPostImage) {
      try {
        if (finalPostImage.startsWith('http')) {
          const imgRes = await fetch(finalPostImage);
          const arrayBuffer = await imgRes.arrayBuffer();
          let buffer = Buffer.from(arrayBuffer);
          buffer = await sharp(buffer).jpeg({ quality: 80 }).toBuffer();
          let filename = finalPostImage.split('/').pop() || 'image.jpg';
          filename = filename.replace(/\.[^/.]+$/, "") + ".jpg";
          
          attachments = [{
            filename: filename,
            content: buffer,
            contentId: 'postimagecid'
          }];
          imageSrc = 'cid:postimagecid';
        } else {
          const imagePath = path.join(process.cwd(), 'public', finalPostImage);
          if (fs.existsSync(imagePath)) {
            let imageBuffer = fs.readFileSync(imagePath);
            imageBuffer = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();
            let filename = finalPostImage.split('/').pop() || 'image.jpg';
            filename = filename.replace(/\.[^/.]+$/, "") + ".jpg";
            
            attachments = [{
              filename: filename,
              content: imageBuffer,
              contentId: 'postimagecid'
            }];
            imageSrc = 'cid:postimagecid';
          } else {
            imageSrc = `https://klebsuchan.com.br${finalPostImage.startsWith('/') ? '' : '/'}${finalPostImage}`;
          }
        }
      } catch (err) {
        console.error("Erro ao tentar anexar a imagem:", err);
        if (!finalPostImage.startsWith('http')) {
            imageSrc = `https://klebsuchan.com.br${finalPostImage.startsWith('/') ? '' : '/'}${finalPostImage}`;
        }
      }
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #121214; margin: 0; padding: 40px 10px; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #202024; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .email-header { background-color: #121214; padding: 30px 30px; text-align: center; border-bottom: 2px solid #ffd700; }
    .header-content { display: inline-block; vertical-align: middle; }
    .header-logo { width: 40px; height: 40px; vertical-align: middle; margin-right: 15px; }
    .header-text { display: inline-block; vertical-align: middle; color: #ffd700; margin: 0; font-size: 28px; font-weight: 800; font-style: italic; letter-spacing: 1px; }
    .email-body { padding: 40px 30px; color: #e1e1e6; line-height: 1.6; font-size: 16px; }
    .email-body h2 { color: #ffffff; font-size: 22px; margin-top: 0; }
    .email-footer { background-color: #121214; padding: 0; text-align: center; font-size: 0; line-height: 0; }
    .email-footer img { width: 100%; max-width: 600px; height: auto; display: block; margin: 0; }
    .highlight { color: #ffd700; font-weight: 600; }
    .card { background-color: #121214; border-radius: 12px; margin-bottom: 25px; border: 1px solid #323238; overflow: hidden; }
    .card-img-container { width: 100%; height: 200px; overflow: hidden; background-color: #121214; line-height: 0; }
    .card-img { width: 100%; height: 100%; object-fit: cover; border: none; outline: none; }
    .card-content { padding: 25px; }
    .card-title { margin: 0 0 10px 0; font-size: 18px; color: #ffffff; font-weight: 800; line-height: 1.3; }
    .card-desc { margin: 0 0 20px 0; font-size: 15px; color: #a8a8b3; line-height: 1.5; }
    .btn { background-color: #ffd700; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 800; display: inline-block; text-align: center; text-transform: uppercase; }
    
    /* Fallbacks for older email clients */
    @media only screen and (max-width: 600px) {
      .email-container { border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <div class="header-content">
        <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1" alt="Logo Klebsuchan" class="header-logo" />
        <h1 class="header-text">KLEBSUCHAN</h1>
      </div>
    </div>
    <div class="email-body">
      <h2>Novo Loot na Taverna! ⚔️</h2>
      <p>Fala, guerreiro(a)! Acabamos de soltar um <span class="highlight">novo pergaminho</span> que você não vai querer perder.</p>
      
      <!-- Card do Artigo Novo -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 35px; margin-bottom: 10px;">
        <tr>
          <td>
            <div class="card">
              ${imageSrc ? `
              <div class="card-img-container">
                <img src="${imageSrc}" alt="Capa do artigo" class="card-img" />
              </div>
              ` : ''}
              <div class="card-content">
                <h4 class="card-title">${postTitle}</h4>
                ${postExcerpt ? `<p class="card-desc">${postExcerpt}</p>` : ''}
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" bgcolor="#ffd700" style="border-radius: 8px;">
                      <a href="https://www.klebsuchan.com.br/?post=${postId}" target="_blank" style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 800; display: inline-block; text-transform: uppercase; line-height: 1;">Ler Artigo Completo</a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <br/>
      <p>Ajeite a cadeira e boa leitura!</p>
      <p>Um abraço,<br/><strong class="highlight">Equipe Klebsuchan</strong></p>
    </div>
    
    <!-- Footer Image -->
    <div class="email-footer">
      <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rodape-email.png?v=1" alt="Rodapé Klebsuchan" />
    </div>
  </div>
</body>
</html>
      `;

      const emailsList = emailsToSend.map(email => ({
        from: `Klebsuchan Newsletter <${domain}>`,
        to: email,
        subject: `Novo Artigo: ${postTitle}`,
        html: htmlContent,
        attachments: attachments,
        scheduledAt: scheduledAt ? scheduledAt : undefined
      }));

      try {
        await Promise.all(emailsList.slice(0, 100).map(emailData => resend.emails.send(emailData)));
      } catch (emailError) {
        console.error("Falha ao chamar a Resend (ignorado):", emailError);
      }

    return res.status(200).json({ success: true, message: "Inscritos notificados com sucesso!" });
  } catch (err: any) {
    console.error("/api/notify-new-post Express Error:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.get("/api/posts", (req, res) => {
  try {
    // Try multiple paths to find posts.json because Vercel changes the working directory
    const cwd = process.cwd();
    const possiblePaths = [
      path.join(cwd, 'src', 'data', 'posts.json'),
      path.join(cwd, '..', 'src', 'data', 'posts.json'),
      path.join('/tmp', 'posts.json') // Vercel tmp fallback if needed
    ];

    let data = null;
    let loadedPath = null;

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        data = fs.readFileSync(p, 'utf8');
        loadedPath = p;
        break;
      }
    }

    if (data) {
      const posts = JSON.parse(data);
      res.json(posts);
    } else {
      console.error("posts.json not found in any of the expected paths, using require fallback");
      const bundledPosts = require('../src/data/posts.json');
      res.json(bundledPosts);
    }
  } catch (err: any) {
    console.error("Erro ao ler posts.json:", err);
    res.status(500).json({ error: "Erro ao carregar posts: " + err.message });
  }
});


export default app;
