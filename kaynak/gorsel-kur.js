/* Temizlenmiş görselleri kaynak/gorsel klasörüne kurar.
   Öncelik: temizlenmiş 4K yükseltme > temizlenmiş orijinal > dokunulmamış orijinal
   Siteye webp (en fazla 1600px) yazılır; 4K PNG'ler yedek klasöründe kalır. */
const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/İHSAN/Desktop/Claude-Projeler/27-MediestGroup/node_modules/sharp');

const KOK = path.join(__dirname, '..');
const YEDEK = 'C:/Users/İHSAN/Desktop/Claude-yedekler/28-Estezone/gorseller-4k';
const TEMIZ_4K = path.join(YEDEK, '4k-filigransiz');
const TEMIZ_TUM = path.join(YEDEK, 'tum-filigransiz');
const HEDEF = path.join(KOK, 'kaynak', 'gorsel');

// 4K yükseltilen kapaklar -> kaynak dosya adı
const DORTK = {
  'noblex-4k.png': '202212-noblex-03.webp',
  'nobleen-4k.png': '202212-nobleen-03.webp',
  'aileen-4k.png': '202212-aileen-02.webp',
  'estesculpt-pro-4k.png': '202212-estesculpt-pro-06.webp',
  'lazer-gozluk-4k.png': '202103-lazer-koruyucu-gozluk-01.jpg',
  'elazer-plus-4k.png': '202406-elazer-plus-005.webp',
  'epizone-mix-4k.png': '202405-epizone-mix-001.webp',
  'cotra-plus-co2-4k.png': '202503-cotra-plus-co2-00.webp',
  'lucid-q-ptp-4k.png': '202408-lucid-q-ptp-005.webp',
  'modula-bbl-4k.png': '202501-modula-bbl-10.webp',
  'utims-centerless-4k.png': '202408-utims-centerless-00001.webp',
  't-shape-2-4k.png': '202605-t-shape-2-01.webp',
  'estesculpt-4k.png': '202407-estesculpt-05.webp',
};
const kaynaktan4K = Object.fromEntries(Object.entries(DORTK).map(([k, v]) => [v, k]));

const MAX = 1600;

(async () => {
  const dosyalar = fs.readdirSync(HEDEF).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));
  let d4 = 0,
    dt = 0,
    yok = 0;
  let oncekiBayt = 0,
    sonraBayt = 0;

  for (const f of dosyalar) {
    const hedefYol = path.join(HEDEF, f);
    oncekiBayt += fs.statSync(hedefYol).size;

    // 1) temizlenmiş 4K var mı?
    const d4ad = kaynaktan4K[f];
    let kaynak = null;
    if (d4ad && fs.existsSync(path.join(TEMIZ_4K, d4ad))) {
      kaynak = path.join(TEMIZ_4K, d4ad);
      d4++;
    } else {
      // 2) temizlenmiş orijinal
      const tad = f.replace(/\.(webp|jpe?g)$/i, '.png');
      if (fs.existsSync(path.join(TEMIZ_TUM, tad))) {
        kaynak = path.join(TEMIZ_TUM, tad);
        dt++;
      } else {
        yok++;
        sonraBayt += fs.statSync(hedefYol).size;
        continue;
      }
    }

    const gecici = hedefYol + '.tmp';
    await sharp(kaynak)
      .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90, effort: 5 })
      .toFile(gecici);
    fs.renameSync(gecici, hedefYol);
    sonraBayt += fs.statSync(hedefYol).size;
  }

  console.log(`4K temizden kurulan : ${d4}`);
  console.log(`temiz orijinalden   : ${dt}`);
  console.log(`değişmeyen          : ${yok}`);
  console.log(
    `boyut: ${(oncekiBayt / 1048576).toFixed(1)} MB -> ${(sonraBayt / 1048576).toFixed(1)} MB`
  );
})();
