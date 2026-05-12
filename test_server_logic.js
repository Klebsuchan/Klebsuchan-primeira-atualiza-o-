import { config } from 'dotenv';
config();
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const supabase = createClient('https://eezccvpkexmssynooupi.supabase.co', process.env.VITE_SUPABASE_ANON_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const postImage = "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/rock.webp";
  let attachments = [];
  try {
    const imgRes = await fetch(postImage);
    const arrayBuffer = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = postImage.split('/').pop() || 'image.png';
    attachments = [{
      content: buffer,
      filename: filename,
      contentId: 'post-image-cid'
    }];
    console.log("Attachments created:", attachments[0].filename);
  } catch (err) {
    console.error("Error creating attachments:", err);
  }
}
test();
