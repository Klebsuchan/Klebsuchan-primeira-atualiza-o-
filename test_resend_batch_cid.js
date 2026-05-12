import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const url = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rock.webp";
  const imgRes = await fetch(url);
  const arrayBuffer = await imgRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const response = await resend.batch.send([{
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'Teste batch attachment',
      html: '<p>Hi batch</p><img src="cid:post-image-cid" />',
      attachments: [{
        content: buffer.toString('base64'),
        filename: 'rock.webp',
        contentId: 'post-image-cid'
      }]
    }]);
    console.log('Response batch:', JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
