/* Mevzuat süzgeci — Tıbbi Cihaz Satış, Reklam ve Tanıtım Yönetmeliği (15/5/2014, değ. 2023/2025)
   Kaynak siteden alınan tüm metinler build sırasında buradan geçer.
   Amaç: firma çapında "FDA onaylı" iddiası, mutlak sonuç vaadi ve üstünlük iddialarını
   belgelenebilir/ölçülebilir karşılıklarıyla değiştirmek. */

const KURALLAR = [
  // --- FDA / onay iddiaları: numarasız "onaylı" yerine izin dili ---
  [/FDA\s+[Oo]naylı\s+Kullanım\s+Endikasyonları/g, 'FDA 510(k) Kapsamındaki Kullanım Endikasyonları'],
  [/FDA\s+tarafından\s+onaylanmıştır/gi, 'FDA 510(k) izni almıştır'],
  [/FDA\s+[Oo]naylı/g, 'FDA 510(k) izinli'],
  [/FDA\s+approved/gi, 'FDA 510(k)-cleared'],

  // --- mutlak sonuç / kalıcılık vaadi ---
  [
    /en\s+kalıcı\s+epilasyon\s+sonuçlarını\s+sağlayan/gi,
    'kalıcı tüy azaltmada yaygın olarak tercih edilen',
  ],
  [/[Kk]alıcı\s+epilasyon/g, 'kalıcı tüy azaltma'],
  [/%\s*100\s+lot\s+testine/gi, 'her lotu test edilen'],
  [/\byan\s+etkisiz\b/gi, 'kullanım kılavuzundaki kontrendikasyonlar geçerlidir'],
  [/\brisksiz\b/gi, 'kılavuzdaki koşullara uyulduğunda'],
  [/garantili\s+sonuç/gi, 'öngörülebilir sonuç'],

  // --- üstünlük iddiaları: ölçülemeyen "en" ifadeleri ---
  [/dünyanın\s+en\s+akıllı,\s*en\s+iyi\s+kullanıcı\s+arayüzü/gi, 'gelişmiş kullanıcı arayüzü'],
  [/en\s+iyi\s+kullanıcı\s+arayüzü/gi, 'gelişmiş kullanıcı arayüzü'],
  [/\bEn\s+iyi\s+(\d)/g, '$1'],
  [/[Dd]aha\s+güvenli\s+tedavi:/g, 'Kalite kontrolü:'],
  [/Türkiye'?nin\s+en\s+iyisi/gi, 'Türkiye’de uzun süredir tedarik edilen'],

  // --- ticari baskı dili ---
  [/\bsepete\s+ekle\b/gi, 'teklif isteyin'],
  [/\bhemen\s+satın\s+al\b/gi, 'teklif isteyin'],

  // --- kaynak sitedeki kodlama bozuklukları ---
  [/˜/g, ''],
  [/˝/g, ''],
  [/�/g, ''],
  [/â€™|â€˜/g, '’'],
  [/â€œ|â€/g, '"'],
  [/Ã¼/g, 'ü'],
  [/Ã§/g, 'ç'],
  [/Ã¶/g, 'ö'],
  [/Ä±/g, 'ı'],
  [/Ä/g, 'ğ'],
  [/Å/g, 'ş'],

  // --- boşluk temizliği ---
  [/\s{2,}/g, ' '],
];

// Süzgeçten geçmesi mümkün olmayan, tamamen atılması gereken satırlar
const AT = [
  /^\s*(anasayfa|hakkımızda|blog|iletişim|ürünlerimiz|hizmetlerimiz|cihazlarımız)\s*$/i,
  /bizimle iletişime geçin/i,
  /detaylı bilgi ve fiyat teklifi için/i,
];

const rapor = [];

function temizle(metin, kaynak = '') {
  if (typeof metin !== 'string') return metin;
  let s = metin;
  for (const [desen, yerine] of KURALLAR) {
    if (desen.test(s)) {
      const once = s;
      s = s.replace(desen, yerine);
      if (once !== s && !/\\s\{2,\}|\\ufffd|Ã|â€|Å|\\u02d/.test(desen.source))
        rapor.push({ kaynak, desen: desen.source.slice(0, 52) });
    }
    desen.lastIndex = 0;
  }
  return s.trim();
}

function temizleDizi(dizi, kaynak = '') {
  if (!Array.isArray(dizi)) return dizi;
  return dizi.filter((x) => !AT.some((d) => d.test(x))).map((x) => temizle(x, kaynak));
}

/* cihaz kaydının tüm metin alanlarını süzgeçten geçir */
function cihazTemizle(c) {
  const k = c.slug;
  return {
    ...c,
    ozet: temizle(c.ozet, k),
    neden: temizle(c.neden, k),
    hedef: temizle(c.hedef, k),
    oneCikan: temizle(c.oneCikan, k),
    rozet: temizle(c.rozet, k),
    aciklama: temizleDizi(c.aciklama, k),
    ozellikler: temizleDizi(c.ozellikler, k),
    bolumler: temizleDizi(c.bolumler, k),
    spec: (c.spec || []).map((s) => ({ ad: temizle(s.ad, k), deger: temizle(s.deger, k) })),
  };
}

module.exports = { temizle, temizleDizi, cihazTemizle, rapor };
