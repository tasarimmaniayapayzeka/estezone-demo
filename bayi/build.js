/* Estezone Bayi Ağı Programı — build
   Çıktı: bayi/cikti/*.html  (ana site build'ine dokunmaz)
   Kullanım: node bayi/build.js */
const fs = require('fs');
const path = require('path');
const { kabuk } = require('./sablon');
const A = require('./sayfalar-a');
const B = require('./sayfalar-b');

const CIKTI = path.join(__dirname, 'cikti');
fs.mkdirSync(CIKTI, { recursive: true });

const sayfalar = [
  A.index(), A.rakip(), A.basvuru(), A.bolge(), A.portal(), A.merkezBul(), A.kazanc(),
  B.asistan(), B.akademi(), B.pazarlama(), B.seo(), B.dijital(), B.alternatif(), B.yolHaritasi(),
];

let toplam = 0;
for (const s of sayfalar) {
  const html = kabuk(s);
  fs.writeFileSync(path.join(CIKTI, s.dosya), html, 'utf8');
  toplam += Buffer.byteLength(html);
  console.log(`  ${s.dosya.padEnd(20)} ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
}

for (const v of ['stil.css', 'app.js']) {
  fs.copyFileSync(path.join(__dirname, v), path.join(CIKTI, v));
}
fs.writeFileSync(path.join(CIKTI, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
fs.writeFileSync(path.join(CIKTI, '.nojekyll'), '', 'utf8');

console.log(`\n${sayfalar.length} sayfa · ${(toplam / 1024).toFixed(1)} KB HTML → bayi/cikti/`);
