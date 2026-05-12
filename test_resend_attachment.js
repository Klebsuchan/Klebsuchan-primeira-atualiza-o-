import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const url = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rock.webp";
  const imgRes = await fetch(url);
  const arrayBuffer = await imgRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Teste attachment',
      html: '<p>Hi</p><img src="cid:post-image-cid" />',
      attachments: [{
        content: buffer.toString('base64'),
        filename: 'rock.webp',
        content_id: 'post-image-cid'
      }]
    });
    console.log('Response string:', JSON.stringify(response, null, 2));
    
    const response2 = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Teste attachment Buffer',
      html: '<p>Hi</p><img src="cid:post-image-cid" />',
      attachments: [{
        content: buffer,
        filename: 'rock.webp',
        content_id: 'post-image-cid'
      }]
    });
    console.log('Response Buffer:', JSON.stringify(response2, null, 2));

  } catch (err) {
    console.error('Error:', err);
  }
}
test();
