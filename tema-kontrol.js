/* Üç tema arasındaki geçiş şeridinin her sayfada doğru çözüldüğünü doğrular. */
const fs = require('fs');
const path = require('path');

const ORNEK = [
  ['site/index.html', 'v1 kök'],
  ['site/cihaz/t-shape-2.html', 'v1 alt klasör'],
  ['site/kategori/lazer-epilasyon.html', 'v1 kategori'],
  ['site/v2/index.html', 'v2 kök'],
  ['site/v2/cihaz/t-shape-2.html', 'v2 alt klasör'],
  ['site/v3/index.html', 'v3 kök'],
  ['site/v3/cihaz/t-shape-2.html', 'v3 alt klasör'],
  ['site/v3/kategori/lazer-epilasyon.html', 'v3 kategori'],
];

let hata = 0;
for (const [dosya, etiket] of ORNEK) {
  const html = fs.readFileSync(path.join(__dirname, dosya), 'utf8');
  const blok = html.match(/<div class="tema-serit">[\s\S]*?<\/div>\s*<\/div>/);
  console.log(`── ${etiket}`);
  if (!blok) {
    console.log('   ✗ şerit bulunamadı');
    hata++;
    continue;
  }
  const secili = blok[0].match(/<b class="secili">(v\d) · ([^<]+)<\/b>/);
  console.log(`   seçili : ${secili ? secili[1] + ' · ' + secili[2] : '✗ YOK'}`);
  if (!secili) hata++;

  const dizin = path.dirname(path.join(__dirname, dosya));
  for (const m of blok[0].matchAll(/<a href="([^"]*)">(v\d) · ([^<]+)<\/a>/g)) {
    const hedef = path.join(dizin, m[1], 'index.html');
    const varMi = fs.existsSync(hedef);
    if (!varMi) hata++;
    console.log(`   ${m[2]} → ${m[1].padEnd(10)} ${varMi ? '✓' : '✗ KIRIK'}`);
  }
}
console.log(`\n${hata === 0 ? '✓ tüm tema geçişleri sağlam' : '✗ ' + hata + ' sorun'}`);
process.exit(hata ? 1 : 0);
