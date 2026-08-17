/* Ürün fotoğraflarının zeminini SAF BEYAZA normalize eder.
   Sorun: kaynak fotoğrafların zemini karışıktı (beyaz / açık mavi / gri) —
   kartlarda yan yana gelince yamalı bohça görünüyordu.
   Yöntem: filigran-temizle ile aynı kenardan taşma-doldurma; ulaşılan
   zemin pikselleri #fff yapılır. Koyu/fotoğrafik zeminler atlanır,
   cihaz pikselleri değişmez. ikon3d-* (şeffaf) dosyalara dokunulmaz. */
const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/İHSAN/Desktop/Claude-Projeler/27-MediestGroup/node_modules/sharp');

const KLASOR = path.join(__dirname, 'gorsel');

function zeminOlc(data, W, H, C) {
  const say = new Map();
  const serit = Math.max(6, Math.round(Math.min(W, H) * 0.06));
  const gor = (x, y) => {
    const i = (y * W + x) * C;
    const k = `${data[i]},${data[i + 1]},${data[i + 2]}`;
    say.set(k, (say.get(k) || 0) + 1);
  };
  for (let y = 0; y < H; y += 2)
    for (let s = 0; s < serit; s++) {
      gor(s, y);
      gor(W - 1 - s, y);
    }
  for (let x = 0; x < W; x += 2)
    for (let s = 0; s < serit; s++) {
      gor(x, s);
      gor(x, H - 1 - s);
    }
  let enCok = null,
    n = 0;
  for (const [k, v] of say) if (v > n) ((n = v), (enCok = k));
  return enCok ? enCok.split(',').map(Number) : null;
}

async function beyazlat(dosya) {
  const yol = path.join(KLASOR, dosya);
  const kaynakBuf = fs.readFileSync(yol); // sharp dosya tutamacı açık tutmasın (Windows EPERM)
  const { data, info } = await sharp(kaynakBuf)
    .flatten({ background: '#ffffff' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  const BG = zeminOlc(data, W, H, C);
  if (!BG) return { durum: 'ölçülemedi' };
  if (Math.min(...BG) < 170) return { durum: 'koyu — atlandı' };
  if (BG[0] >= 252 && BG[1] >= 252 && BG[2] >= 252) return { durum: 'zaten beyaz' };

  const TOL2 = 15 * 15; // BG'ye uzaklık toleransı (kare)
  const zeminMi = (r, g, b) => {
    const dr = r - BG[0],
      dg = g - BG[1],
      db = b - BG[2];
    return dr * dr + dg * dg + db * db <= TOL2;
  };

  const gorulen = new Uint8Array(W * H);
  const yigin = [];
  const ekle = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (gorulen[p]) return;
    const i = p * C;
    if (!zeminMi(data[i], data[i + 1], data[i + 2])) return;
    gorulen[p] = 1;
    yigin.push(p);
  };
  for (let x = 0; x < W; x++) {
    ekle(x, 0);
    ekle(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    ekle(0, y);
    ekle(W - 1, y);
  }
  while (yigin.length) {
    const p = yigin.pop();
    const x = p % W,
      y = (p / W) | 0;
    ekle(x + 1, y);
    ekle(x - 1, y);
    ekle(x, y + 1);
    ekle(x, y - 1);
  }

  let degisen = 0;
  for (let p = 0; p < W * H; p++) {
    if (!gorulen[p]) continue;
    const i = p * C;
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    degisen++;
  }
  if (!degisen) return { durum: 'değişiklik yok' };

  const gecici = yol + '.tmp';
  await sharp(data, { raw: { width: W, height: H, channels: C } })
    .webp({ quality: 90, effort: 5 })
    .toFile(gecici);
  fs.renameSync(gecici, yol);
  return { durum: ((degisen / (W * H)) * 100).toFixed(0) + '% beyazlatıldı', bg: BG.join(',') };
}

(async () => {
  const dosyalar = fs
    .readdirSync(KLASOR)
    .filter((f) => /\.(webp|jpe?g|png)$/i.test(f) && !f.startsWith('ikon3d-'));
  console.log(`${dosyalar.length} görsel taranıyor (ikon3d hariç)...\n`);
  const ozet = {};
  for (const f of dosyalar) {
    try {
      const s = await beyazlat(f);
      const anahtar = s.durum.includes('beyazlatıldı') ? 'beyazlatıldı' : s.durum;
      ozet[anahtar] = (ozet[anahtar] || 0) + 1;
      if (s.durum.includes('beyazlatıldı')) console.log(`  ★ ${f.padEnd(52)} zemin(${s.bg}) → beyaz`);
    } catch (e) {
      console.log(`  ✗ ${f}: ${e.message}`);
      ozet.hata = (ozet.hata || 0) + 1;
    }
  }
  console.log('\nÖZET:', JSON.stringify(ozet));
})();
