import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmails() {
  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    let emailsToSend = ['braian.kleber.camargo@gmail.com'];

    if (audienceId) {
      const contactsResponse = await resend.contacts.list({ audienceId });
      if (contactsResponse.data && contactsResponse.data.data) {
        const resendEmails = contactsResponse.data.data
          .filter(contact => !contact.unsubscribed)
          .map(contact => contact.email);
        emailsToSend = [...new Set([...emailsToSend, ...resendEmails])];
      }
    }

    const fromEmail = 'Klebsuchan Newsletter <updates@klebsuchan.com.br>';
    
    const postTitle = "🚨 PAROU A INTERNET! Remake de Zelda: Ocarina of Time anunciado para o Switch 2! 🗡️🛡️";
    const appUrl = process.env.VITE_APP_URL || 'https://ais-pre-awvjzwy22pvotiegrpyqfo-385994013673.us-east1.run.app';
    const postUrl = appUrl + '?postId=1780959585407'; // I'll get the real ID in a moment
    
    const posts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf8'));
    const newlyAddedPost = posts.find(p => p.title.rendered.includes('Ocarina of Time'));
    const realTitle = newlyAddedPost.title.rendered;
    const finalPostUrl = 'https://www.klebsuchan.com.br/?post=' + newlyAddedPost.id;
    const finalPostImage = newlyAddedPost.imageUrl;
    let imageAttachment = null;
    let imgTag = '';
    
    if (finalPostImage && finalPostImage.startsWith('http')) {
      try {
        const imageResponse = await fetch(finalPostImage);
        const arrayBuffer = await imageResponse.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer);
        const sharp = (await import('sharp')).default;
        buffer = await sharp(buffer).jpeg({ quality: 80 }).toBuffer();
        
        let filename = finalPostImage.split('/').pop()?.split('?')[0] || 'image.jpg';
        filename = filename.replace(/\.[^/.]+$/, "") + ".jpg";
        
        imageAttachment = {
          filename: filename,
          content: buffer,
          contentId: 'postimagecid'
        };
        imgTag = '<img src="cid:postimagecid" alt="Capa do artigo" class="card-img" />';
      } catch (err) {
        console.error('Failed to fetch image', err);
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
              ${imgTag ? `
              <div class="card-img-container">
                ${imgTag}
              </div>
              ` : ''}
              <div class="card-content">
                <h4 class="card-title">${realTitle}</h4>
                <p class="card-desc">${newlyAddedPost.excerpt.rendered}</p>
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" bgcolor="#ffd700" style="border-radius: 8px;">
                      <a href="${postUrl}" target="_blank" style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 800; display: inline-block; text-transform: uppercase; line-height: 1;">Ler Artigo Completo</a>
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

    const finalHtml = htmlContent.replace(postUrl, finalPostUrl).replace(postUrl, finalPostUrl);

    if (process.env.RESEND_API_KEY) {
      console.log('Sending emails to ' + emailsToSend.length + ' contacts...');
      
      for (const email of emailsToSend) {
        try {
          const res = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: 'Novo Artigo: ' + realTitle,
            html: finalHtml,
            attachments: imageAttachment ? [imageAttachment] : []
          });
          console.log('Sent to', email, res);
          // Wait to avoid rate limit (5 req/sec limit from Resend)
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (err) {
          console.error('Failed to send to', email, err);
        }
      }
      
      console.log('Emails sent successfully!');
    } else {
      console.log('RESEND_API_KEY not found. Skipping email sending.');
    }
  } catch (error) {
    console.error('Error sending emails:', error);
  }
}

sendEmails();
