import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://eezccvpkexmssynooupi.supabase.co';
const supabaseAnonKey = 'sb_secret_jXUzG_NkQO905Cgu55NAcg_3zoTsrPq';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function uploadFile(filePath, bucket, destPath) {
  const fileContent = fs.readFileSync(filePath);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(destPath, fileContent, {
      upsert: true,
      contentType: filePath.endsWith('.png') ? 'image/png' : 'image/jpeg'
    });

  if (error) {
    console.error(`Error uploading ${filePath}:`, error.message);
  } else {
    console.log(`Uploaded ${filePath} to ${destPath}`);
  }
}

async function main() {
  await uploadFile(path.join(process.cwd(), 'achar-temas', 'pragmata.webp'), 'images', 'pragmata.webp');
}

main();
