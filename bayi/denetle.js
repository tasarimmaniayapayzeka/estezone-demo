/* Bayi programı çıktı denetimi: kırık iç link, eksik varlık, zorunlu unsurlar. */
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, 'cikti');
const dosyalar = fs.readdirSync(KOK).filter((d) => d.endsWith('.html'));
const hatalar = [];
const uyarilar = [];
let linkSay = 0;

for (const d of dosyalar) {
  const html = fs.readFileSync(path.join(KOK, d), 'utf8');

  /* zorunlu unsurlar (proje kuralı) */
  if (!html.includes('noindex,nofollow')) hatalar.push(`${d}: noindex eksik`);
  if (!html.includes('TASARIM DEMOSU')) hatalar.push(`${d}: demo bandı eksik`);
  if (!/<title>.+<\/title>/.test(html)) hatalar.push(`${d}: title eksik`);
  if (!/<h1[ >]/.test(html)) uyarilar.push(`${d}: h1 yok`);
  if (!/name="description" content=".{20,}"/.test(html)) uyarilar.push(`${d}: kısa/eksik description`);

  /* iç linkler */
  for (const m of html.matchAll(/href="([^"#:]+?\.(?:html|css|js|txt))"/g)) {
    linkSay++;
    if (!fs.existsSync(path.join(KOK, m[1]))) hatalar.push(`${d}: kırık link → ${m[1]}`);
  }
  for (const m of html.matchAll(/src="([^"#:]+?\.(?:css|js))"/g)) {
    linkSay++;
    if (!fs.existsSync(path.join(KOK, m[1]))) hatalar.push(`${d}: eksik varlık → ${m[1]}`);
  }

  /* dış kaynak yok mu (self-contained olmalı) */
  for (const m of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    if (/\.(css|js|woff2?|png|jpe?g|svg)(\?|$)/.test(m[1])) hatalar.push(`${d}: dış varlık → ${m[1]}`);
  }

  /* mevzuat: yasak kalıplar gövde metninde.
     Hariç: demo giriş alanları (<textarea>), kod örnekleri (<code>) ve
     “…” içinde olumsuz örnek olarak alıntılanan kalıplar. */
  const govde = html
    .replace(/<textarea[\s\S]*?<\/textarea>/g, '')
    .replace(/<code>[\s\S]*?<\/code>/g, '')
    .replace(/[“"][^“”"]{0,160}[”"]/g, '');
  for (const yasak of [/kalıcı epilasyon/i, /FDA onaylı/i, /garantili sonuç/i]) {
    if (yasak.test(govde)) uyarilar.push(`${d}: yasak kalıp gövdede → ${yasak.source}`);
  }
}

console.log(`${dosyalar.length} sayfa · ${linkSay} link/varlık denetlendi`);
if (hatalar.length) {
  console.log(`\n${hatalar.length} HATA:`);
  hatalar.forEach((h) => console.log('  ✗ ' + h));
} else console.log('  ✓ 0 hata');
if (uyarilar.length) {
  console.log(`\n${uyarilar.length} uyarı:`);
  uyarilar.forEach((u) => console.log('  ! ' + u));
} else console.log('  ✓ 0 uyarı');
process.exit(hatalar.length ? 1 : 0);
