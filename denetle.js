/* Üretilen siteyi denetle: kırık iç link, eksik görsel, meta eksiği, erişilebilirlik temelleri */
const fs = require('fs');
const path = require('path');

// node denetle.js        -> site/ (koyu, v2 hariç)
// node denetle.js v2     -> site/v2/ (açık)
const HEDEF = process.argv[2] === 'v2' ? path.join('site', 'v2') : 'site';
const KOK = path.join(__dirname, HEDEF);
const V2_HARIC = process.argv[2] !== 'v2';
const sayfalar = [];
(function gez(d = '') {
  fs.readdirSync(path.join(KOK, d), { withFileTypes: true }).forEach((e) => {
    const g = d ? `${d}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (e.name !== 'varlik' && !(V2_HARIC && e.name === 'v2')) gez(g);
    } else if (e.name.endsWith('.html')) sayfalar.push(g);
  });
})();

const hatalar = [];
const uyarilar = [];
let toplamLink = 0,
  toplamGorsel = 0;

for (const s of sayfalar) {
  const html = fs.readFileSync(path.join(KOK, s), 'utf8');
  const dizin = path.dirname(s);
  const coz = (u) => path.normalize(path.join(KOK, dizin, u)).replace(/\\/g, '/');

  // iç linkler
  [...html.matchAll(/href="([^"#]+?)"/g)]
    .map((m) => m[1])
    .filter((u) => !/^(https?:|mailto:|tel:|data:|#)/.test(u))
    .forEach((u) => {
      toplamLink++;
      const temiz = u.split('?')[0];
      if (!fs.existsSync(coz(temiz))) hatalar.push(`KIRIK LİNK  ${s}  ->  ${u}`);
    });

  // görseller
  [...html.matchAll(/<img[^>]+src="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((u) => !/^(https?:|data:)/.test(u))
    .forEach((u) => {
      toplamGorsel++;
      if (!fs.existsSync(coz(u))) hatalar.push(`EKSİK GÖRSEL  ${s}  ->  ${u}`);
    });

  // alt metni
  const altsiz = [...html.matchAll(/<img(?![^>]*\balt=)[^>]*>/g)].length;
  if (altsiz) uyarilar.push(`ALT YOK (${altsiz})  ${s}`);

  // meta
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) uyarilar.push(`META ZAYIF  ${s}`);
  const h1 = (html.match(/<h1[^>]*>/g) || []).length;
  if (h1 !== 1) uyarilar.push(`H1 SAYISI ${h1}  ${s}`);
  if (!/<link rel="canonical"/.test(html)) uyarilar.push(`CANONICAL YOK  ${s}`);
  if (!/lang="tr"/.test(html)) uyarilar.push(`LANG YOK  ${s}`);
  if (!/<title>.{15,}<\/title>/.test(html)) uyarilar.push(`TITLE ZAYIF  ${s}`);

  // kaçırılmış şablon
  if (/undefined|\[object Object\]|NaN/.test(html))
    hatalar.push(`ŞABLON KAÇAĞI  ${s}  ${(html.match(/.{0,40}(undefined|\[object Object\]|NaN).{0,40}/) || [])[0]}`);
}

console.log(`Sayfa: ${sayfalar.length} | denetlenen link: ${toplamLink} | görsel: ${toplamGorsel}`);
console.log(`\nHATA: ${hatalar.length}`);
hatalar.slice(0, 40).forEach((h) => console.log('  ✗ ' + h));
console.log(`\nUYARI: ${uyarilar.length}`);
uyarilar.slice(0, 40).forEach((u) => console.log('  ! ' + u));

// boyut raporu
let bayt = 0;
(function say(d = '') {
  fs.readdirSync(path.join(KOK, d), { withFileTypes: true }).forEach((e) => {
    const g = d ? `${d}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (!(V2_HARIC && e.name === 'v2')) say(g);
    }
    else bayt += fs.statSync(path.join(KOK, g)).size;
  });
})();
console.log(`\nToplam site boyutu: ${(bayt / 1048576).toFixed(1)} MB`);
const enBuyuk = sayfalar
  .map((s) => [s, fs.statSync(path.join(KOK, s)).size])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3);
console.log('En büyük HTML:', enBuyuk.map(([s, b]) => `${s} ${(b / 1024).toFixed(0)}KB`).join(' · '));
process.exit(hatalar.length ? 1 : 0);
