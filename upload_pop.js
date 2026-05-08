import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eezccvpkexmssynooupi.supabase.co';
const supabaseKey = 'sb_secret_jXUzG_NkQO905Cgu55NAcg_3zoTsrPq';
const supabase = createClient(supabaseUrl, supabaseKey);

async function upload() {
    const dir = './extracted_fotos_pop';
    const files = fs.readdirSync(dir);
    for (const f of files) {
        if (!f.endsWith('.jpg') && !f.endsWith('.png') && !f.endsWith('.webp') && !f.endsWith('.avif') && !f.endsWith('.jpeg')) continue;
        const filePath = `${dir}/${f}`;
        const buffer = fs.readFileSync(filePath);
        const name = f.replace(/ /g, '-').toLowerCase(); // replace spaces with dashes, lowercase
        const res = await supabase.storage.from('images').upload(name, buffer, { upsert: true });
        if (res.error) {
            console.error('Error uploading', name, res.error);
        } else {
            console.log('Uploaded', name);
        }
    }
}
upload();
