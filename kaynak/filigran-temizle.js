/* estezone "estezone medikal" çapraz filigranını kaldırır.
   ALGORİTMİK — üretken model yok. Cihaz pikselleri DEĞİŞTİRİLMEZ.

   Yöntem: UYARLANABİLİR ZEMİNDEN TAŞMA-DOLDURMA
   1) Kenar şeridinden gerçek zemin rengi (BG) ve zemin+filigran rengi (BGW) ölçülür.
      Zemin her görselde beyaz değil — bazılarında açık mavi. Bu yüzden sabit
      eşik yerine görselden ölçüm yapılır.
   2) Kenarlardan taşma başlatılır; BG ile BGW arasındaki doğru parçasına yakın
      renkler "zemin" sayılıp yayılır, cihazın kenarına çarpınca durur.
   3) Ulaşılan pikseller BG rengine çekilir → filigranın hem dolgusu hem
      kenar yumuşatma hayaleti gider.

   Cihazın ÜZERİNE binen filigrana DOKUNULMAZ: orada kapsama %12 civarındadır,
   zorlamak yüzeyde benek bozulması yaratıyor (denendi, geri alındı).
   O kısım için doğru çözüm, Estezone'dan filigransız orijinalleri istemektir.
*/
const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/İHSAN/Desktop/Claude-Projeler/27-MediestGroup/node_modules/sharp');

const KAYNAK = process.argv[2];
const HEDEF = process.argv[3];
if (!KAYNAK || !HEDEF) {
  console.error('kullanım: node filigran-temizle.js <kaynak-klasör> <hedef-klasör>');
  process.exit(1);
}
fs.mkdirSync(HEDEF, { recursive: true });

/* kenar şeridindeki renkleri sayarak BG ve BGW'yi bul */
function zeminOlc(data, W, H, C) {
  const say = new Map();
  // şerit geniş tutulur: filigran ince kenarda az görünüyor, ölçüm kaçıyordu
  const serit = Math.max(6, Math.round(Math.min(W, H) * 0.14));
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

  const sirali = [...say.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => [k.split(',').map(Number), n]);
  if (!sirali.length) return null;
  const BG = sirali[0][0];

  /* BGW = zemin + filigran rengi — MODELDEN hesaplanır, görselden ÖLÇÜLMEZ.
     Ölçüm denendi ve TEHLİKELİ çıktı: cihazın kendi gri tonunu filigran sanıp
     taşmanın gövdeyi yemesine yol açtı (Aileen ve Noblex bu şekilde bozulmuştu).

     Filigran rengi her karede aynı: C(130,180,222). Değişen tek şey OPAKLIK —
     ölçülen değerler: 0.12 (çoğu beyaz zeminli), 0.25 (Elazer Plus), 0.30 (mavi zeminli).

     Tek bir α seçmek yerine EN YÜKSEK opaklığı uç nokta alıyoruz. Taşma testi
     zaten BG ile BGW arasındaki DOĞRU PARÇASINI kabul ettiği için, aradaki tüm
     opaklıklar (0 → 0.32) kendiliğinden kapsanır. Yön hep aynı olduğundan bu
     genişletme nötr gri cihaz piksellerini içine almaz: nötr gri, beyazdan
     siyaha giden eksende durur, filigran ekseni ise maviye sapar — aradaki dik
     uzaklık toleransın (9) çok üstündedir. */
  const A = 0.32;
  const C_ = [130, 180, 222];
  const BGW = BG.map((v, k) => Math.round(v + A * (C_[k] - v)));
  return { BG, BGW, alfa: A };
}

async function temizle(girdi, cikti) {
  const { data, info } = await sharp(girdi).flatten({ background: '#ffffff' }).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  const olcum = zeminOlc(data, W, H, C);
  if (!olcum) return { oran: '0.0', bg: '-', bgw: '-', atlandi: true };
  const { BG, BGW } = olcum;

  /* GÜVENLİK KAPISI: filigran yalnızca AÇIK STÜDYO ZEMİNLİ ürün kareler
     üzerinde var. Koyu/fotoğrafik karelerde filigran yok; oralarda taşma
     çalıştırmak görüntüyü bozar. Bu yüzden koyu zeminli kareler atlanır. */
  if (Math.min(...BG) < 170) {
    await sharp(data, { raw: { width: W, height: H, channels: C } })
      .png({ compressionLevel: 9 })
      .toFile(cikti);
    return { oran: '0.0', bg: BG.join(','), bgw: '(koyu zemin — atlandı)', atlandi: true };
  }

  /* Zemin testi: renk, BG ile BGW arasındaki doğru parçasına yakın mı?
     BGW yoksa yalnızca BG'ye yakınlık aranır. */
  const V = BGW ? [BGW[0] - BG[0], BGW[1] - BG[1], BGW[2] - BG[2]] : null;
  const VV = V ? V[0] * V[0] + V[1] * V[1] + V[2] * V[2] : 0;
  const TOL = 9; // doğru parçasına dik uzaklık toleransı

  function zeminMi(r, g, b) {
    const dr = r - BG[0],
      dg = g - BG[1],
      db = b - BG[2];
    const d2 = dr * dr + dg * dg + db * db;
    if (d2 <= 160) return true; // zaten zemin rengi
    if (!V || VV === 0) return false;
    let t = (dr * V[0] + dg * V[1] + db * V[2]) / VV;
    if (t < -0.06 || t > 1.35) return false;
    if (t < 0) t = 0;
    const px = dr - V[0] * t,
      py = dg - V[1] * t,
      pz = db - V[2] * t;
    return px * px + py * py + pz * pz <= TOL * TOL;
  }

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
    if (data[i] === BG[0] && data[i + 1] === BG[1] && data[i + 2] === BG[2]) continue;
    data[i] = BG[0];
    data[i + 1] = BG[1];
    data[i + 2] = BG[2];
    degisen++;
  }

  await sharp(data, { raw: { width: W, height: H, channels: C } }).png({ compressionLevel: 9 }).toFile(cikti);
  return {
    oran: ((degisen / (W * H)) * 100).toFixed(1),
    bg: BG.join(','),
    bgw: BGW ? BGW.join(',') : 'yok',
  };
}

(async () => {
  const dosyalar = fs.readdirSync(KAYNAK).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));
  console.log(`${dosyalar.length} görsel taranıyor...\n`);
  let temizlenen = 0;
  for (const f of dosyalar) {
    const cikti = path.join(HEDEF, f.replace(/\.(webp|jpe?g)$/i, '.png'));
    try {
      const s = await temizle(path.join(KAYNAK, f), cikti);
      if (+s.oran > 0.5) temizlenen++;
      console.log(
        `  ${f.padEnd(46)} ${String(s.oran).padStart(6)}%  zemin(${s.bg})  filigran(${s.bgw}) ${+s.oran > 0.5 ? '★' : ''}`
      );
    } catch (e) {
      console.log(`  ${f.padEnd(46)} HATA: ${e.message}`);
    }
  }
  console.log(`\nfiligran temizlenen: ${temizlenen} / ${dosyalar.length}`);
})();
