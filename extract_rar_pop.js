import fs from 'fs';
import { createExtractorFromData } from 'node-unrar-js';

async function extract() {
    try {
        const buf = Uint8Array.from(fs.readFileSync('FOTOS ARTIGOS CULTURA POP.rar')).buffer;
        const extractor = await createExtractorFromData({ data: buf });
        const extracted = extractor.extract({ files: (fileHeader) => true });
        
        const outDir = './extracted_fotos_pop';
        if(!fs.existsSync(outDir)) fs.mkdirSync(outDir);
        
        for (const file of extracted.files) {
            console.log(file.fileHeader.name);
            if (!file.fileHeader.flags.directory) {
                fs.writeFileSync(`${outDir}/${file.fileHeader.name.split('/').pop()}`, file.extraction);
            }
        }
        console.log('Extraction complete');
    } catch (e) {
        console.error(e);
    }
}
extract();
