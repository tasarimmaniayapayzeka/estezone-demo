// estezone görsellerini indir (eşzamanlılık sınırlı, yeniden deneme var)
const fs = require('fs');
const path = require('path');
const https = require('https');

const LISTE = path.join(__dirname, '..', 'veri', 'gorsel-listesi.txt');
const HEDEF = path.join(__dirname, 'gorsel');
fs.mkdirSync(HEDEF, { recursive: true });

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

let urller = fs
  .readFileSync(LISTE, 'utf8')
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean);

// WordPress boyut türevlerini ele: -300x200.jpg gibi son ekleri kaldırıp en büyüğü tut
const tabanHarita = new Map();
for (const u of urller) {
  const taban = u.replace(/-\d{2,4}x\d{2,4}(?=\.(jpe?g|png|webp)$)/i, '');
  if (!tabanHarita.has(taban)) tabanHarita.set(taban, taban); // orijinali tercih et
}
urller = [...tabanHarita.values()];

const dosyaAdi = (u) => {
  const ad = decodeURIComponent(u.split('/').pop());
  const klasor = u.match(/uploads\/(\d{4})\/(\d{2})\//);
  const on = klasor ? `${klasor[1]}${klasor[2]}-` : '';
  return (on + ad).replace(/[^a-zA-Z0-9._-]/g, '_');
};

function indir(url, hedefYol) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': UA }, timeout: 30000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return indir(new URL(res.headers.location, url).href, hedefYol).then(resolve);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return resolve({ ok: false, kod: res.statusCode });
      }
      const parcalar = [];
      res.on('data', (d) => parcalar.push(d));
      res.on('end', () => {
        const buf = Buffer.concat(parcalar);
        fs.writeFileSync(hedefYol, buf);
        resolve({ ok: true, boyut: buf.length });
      });
    });
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, kod: 'timeout' }); });
    req.on('error', (e) => resolve({ ok: false, kod: e.code || 'err' }));
  });
}

(async () => {
  const EST = 6;
  let i = 0, basarili = 0, hata = 0, toplamBayt = 0;
  const hatalar = [];

  async function isci() {
    while (i < urller.length) {
      const idx = i++;
      const u = urller[idx];
      const hedef = path.join(HEDEF, dosyaAdi(u));
      if (fs.existsSync(hedef) && fs.statSync(hedef).size > 1000) { basarili++; continue; }
      let r = await indir(u, hedef);
      if (!r.ok) r = await indir(u, hedef); // 1 kez yeniden dene
      if (r.ok) { basarili++; toplamBayt += r.boyut; }
      else { hata++; hatalar.push(`${r.kod}  ${u}`); }
      if ((basarili + hata) % 40 === 0) console.log(`  ... ${basarili + hata}/${urller.length}`);
    }
  }

  console.log(`${urller.length} benzersiz görsel indiriliyor (eşzamanlı ${EST})...`);
  await Promise.all(Array.from({ length: EST }, isci));

  console.log(`\nBAŞARILI: ${basarili}  HATA: ${hata}  TOPLAM: ${(toplamBayt / 1048576).toFixed(1)} MB`);
  if (hatalar.length) {
    fs.writeFileSync(path.join(__dirname, '..', 'veri', 'gorsel-hatalari.txt'), hatalar.join('\n'));
    console.log('hatalar -> veri/gorsel-hatalari.txt');
    console.log(hatalar.slice(0, 10).join('\n'));
  }
})();
