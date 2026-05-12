import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient('https://eezccvpkexmssynooupi.supabase.co', process.env.VITE_SUPABASE_ANON_KEY || 'sb_secret_jXUzG_NkQO905Cgu55NAcg_3zoTsrPq');
const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const { data: subscribers } = await supabase.from('newsletters').select('email');
  const emailsToSend = subscribers ? subscribers.map(s => s.email) : [];
  
  const domain = process.env.RESEND_FROM_EMAIL || process.env.RESEND_DOMAIN || 'onboarding@resend.dev';
  
  console.log('Sending emails using from:', \`Klebsuchan Newsletter <\${domain}>\`);
  console.log('To:', emailsToSend);

  const emailsList = emailsToSend.map(email => ({
    from: \`Klebsuchan Newsletter <\${domain}>\`,
    to: email,
    subject: 'Teste batch email',
    html: '<p>Teste</p>'
  }));

  if(emailsList.length === 0) {
    console.log("No emails to send");
    return;
  }

  try {
    const response = await resend.batch.send(emailsList.slice(0, 100));
    console.log('Response:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
