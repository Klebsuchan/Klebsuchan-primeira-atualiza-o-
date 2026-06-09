import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

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

    const domain = process.env.RESEND_DOMAIN || 'onboarding@resend.dev';
    const fromEmail = 'Klebsuchan <updates@' + domain + '>';
    
    const postTitle = "🚨 PAROU A INTERNET! Remake de Zelda: Ocarina of Time anunciado para o Switch 2! 🗡️🛡️";
    const appUrl = process.env.VITE_APP_URL || 'https://ais-pre-awvjzwy22pvotiegrpyqfo-385994013673.us-east1.run.app';
    const postUrl = appUrl + '?postId=1780959585407'; // I'll get the real ID in a moment
    
    const imagePath = path.join(process.cwd(), 'public', 'images', 'ocarinaoftime.jpg');
    let imageAttachment = null;
    let imgTag = '';
    
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      imageAttachment = {
        filename: 'ocarinaoftime.jpg',
        content: imageBuffer,
        contentId: 'postimagecid'
      };
      imgTag = '<img src="cid:postimagecid" alt="Zelda: Ocarina of Time Remake" style="width: 100%; max-width: 600px; border-radius: 8px; margin-bottom: 20px;" />';
    }

    const htmlContent = ' \n' +
'      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">\n' +
'        <div style="text-align: center; margin-bottom: 20px;">\n' +
'          <h1 style="color: #6366f1; margin: 0; font-size: 24px;">' + postTitle + '</h1>\n' +
'        </div>\n' +
'        \n' +
'        ' + imgTag + '\n' +
'        \n' +
'        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">\n' +
'          <h2 style="font-size: 20px; color: #1a1a1a; margin-top: 0;">Fala, galera do Klebsuchan!</h2>\n' +
'          \n' +
'          <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a;">\n' +
'            A Nintendo simplesmente soltou a bomba do século! O sonho mais antigo de dez entre dez gamers finalmente virou realidade: o remake completo de The Legend of Zelda: Ocarina of Time é real, foi recriado do zero com gráficos absurdos e chega ainda este ano como o grande título do novo Nintendo Switch 2!\n' +
'          </p>\n' +
'\n' +
'          <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a;">\n' +
'            O teaser revelou o nosso herói Link e a icônica Kokiri Forest com um visual fotorrealista de cair o queixo. Quer conferir a nossa análise detalhada do vídeo, o que deve mudar na jogabilidade (adeus, pesadelo do Templo da Água!) e os planos da Nintendo para os 40 anos da franquia?\n' +
'          </p>\n' +
'          \n' +
'          <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">\n' +
'            <a href="' + postUrl + '" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">Ler Artigo Completo</a>\n' +
'          </div>\n' +
'        </div>\n' +
'        \n' +
'        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">\n' +
'           <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rodap%C3%A9-email%20-%20Editado.png?v=1" alt="Klebsuchan Footer" style="width: 100%; max-width: 600px;" />\n' +
'        </div>\n' +
'      </div>\n' +
'    ';

    const posts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf8'));
    const newlyAddedPost = posts.find(p => p.title.rendered.includes('Ocarina of Time'));
    const finalPostUrl = appUrl + '?postId=' + newlyAddedPost.id;
    const finalHtml = htmlContent.replace(postUrl, finalPostUrl).replace(postUrl, finalPostUrl);

    if (process.env.RESEND_API_KEY) {
      console.log('Sending emails to ' + emailsToSend.length + ' contacts...');
      
      const emailPromises = emailsToSend.map(email => {
        return resend.emails.send({
          from: fromEmail,
          to: email,
          subject: postTitle,
          html: finalHtml,
          attachments: imageAttachment ? [imageAttachment] : []
        });
      });
      
      await Promise.all(emailPromises);
      console.log('Emails sent successfully!');
    } else {
      console.log('RESEND_API_KEY not found. Skipping email sending.');
    }
  } catch (error) {
    console.error('Error sending emails:', error);
  }
}

sendEmails();
