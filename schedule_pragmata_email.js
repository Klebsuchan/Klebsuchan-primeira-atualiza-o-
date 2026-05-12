import { config } from 'dotenv';
config();
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient('https://eezccvpkexmssynooupi.supabase.co', process.env.VITE_SUPABASE_ANON_KEY);

async function sendScheduled() {
  const postId = 1779000000000;
  const postTitle = "Pragmata: A Odisseia Lunar que Desafiou o Inferno do Desenvolvimento 🌕🚀";
  const postExcerpt = "Se existe uma lenda urbana na indústria dos videogames que quase sempre se prova verdadeira, é a de que projetos que passam anos a fio no chamado 'inferno do desenvolvimento' raramente entregam o que prometem. A Capcom, em sua atual fase experimental, traz com Pragmata uma proposta que abraça o esquisito, mas o tempera com um sabor incrivelmente refinado. Confira nossa análise compelta.";
  const postImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/pragmata.webp";
  
  let attachments = [];
  let imageSrc = postImage;

  try {
    const imgRes = await fetch(postImage);
    const arrayBuffer = await imgRes.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
    buffer = await sharp(buffer).jpeg({ quality: 80 }).toBuffer();
    let filename = postImage.split('/').pop() || 'image.jpg';
    filename = filename.replace(/\.[^/.]+$/, "") + ".jpg";
    attachments = [{
      content: buffer,
      filename: filename,
      contentId: 'post-image-cid'
    }];
    imageSrc = 'cid:post-image-cid';
  } catch (e) {
    console.error("Error processing image:", e);
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
      <h2>Novo Post Especial para Você!</h2>
      <p>Fala, Guilda! Tem conteúdo fresco no blog esperando por vocês. Confere aí um trecho do que acabou de sair:</p>
      
      <table border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td>
            <div class="card">
              <div class="card-img-container">
                <img src="${imageSrc}" alt="Capa do artigo" class="card-img" />
              </div>
              <div class="card-content">
                <h4 class="card-title">${postTitle}</h4>
                <p class="card-desc">${postExcerpt}</p>
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
      
      <p>Acesse <a href="https://www.klebsuchan.com.br" style="color: #ffd700; text-decoration: none; font-weight: bold;">KLEBSUCHAN</a> para ver todas as novidades.</p>
      <p style="margin-top: 30px; font-size: 14px; color: #a8a8b3;">Tamo junto! 🚀<br><strong>Klebsuchan</strong></p>
    </div>
  </div>
</body>
</html>
  `;

  let emailsToSend = [];
  
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    try {
      const contactsResponse = await resend.contacts.list({ audienceId });
      if (contactsResponse.data && contactsResponse.data.data) {
        const resendEmails = contactsResponse.data.data
          .filter(c => !c.unsubscribed)
          .map(c => c.email);
        emailsToSend = [...new Set([...emailsToSend, ...resendEmails])];
      }
    } catch (err) {
      console.error("Erro ao buscar contatos da Audience no Resend:", err);
    }
  }

  try {
    const { data: subscribers, error: subError } = await supabase
      .from('newsletters')
      .select('email');
    if (subscribers && !subError) {
      const supabaseEmails = subscribers.map(s => s.email);
      emailsToSend = [...new Set([...emailsToSend, ...supabaseEmails])];
    }
  } catch (err) {}

  if (emailsToSend.length === 0) {
    emailsToSend = ["braian.kleber.camargo@gmail.com"];
  }

  const domain = process.env.RESEND_FROM_EMAIL || process.env.RESEND_DOMAIN || 'onboarding@resend.dev';
  
  // scheduled_at must be in natural language or ISO timestamp. Let's use ISO format.
  // The user wants tomorrow at 8:00 AM. In the posts data, the date is 2026-05-13T11:00:00.000Z
  const scheduledTime = "2026-05-13T11:00:00.000Z";

  // Note: Only standard tier Resend allows batching. So we will batch send.
  const emailsList = emailsToSend.map(email => ({
    from: `Klebsuchan Newsletter <${domain}>`,
    to: email,
    subject: `Novo Artigo: ${postTitle}`,
    html: htmlContent,
    attachments: attachments,
    scheduledAt: scheduledTime
  }));

  try {
    const { data, error } = await resend.batch.send(emailsList.slice(0, 100));
    if (error) {
      console.error(error);
    } else {
      console.log('Scheduled email sent successfully', data);
    }
  } catch (err) {
    console.error(err);
  }
}
sendScheduled();
