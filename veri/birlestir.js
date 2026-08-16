// Ham çıkarım + küratörlü meta -> tek cihazlar.json
const fs = require('fs');
const path = require('path');

const ham = require('./ham-sayfalar.json');
const meta = require('./cihaz-meta.js');

const GORSEL_DIZIN = path.join(__dirname, '..', 'kaynak', 'gorsel');
const mevcutGorsel = new Set(fs.readdirSync(GORSEL_DIZIN));

const dosyaAdi = (u) => {
  const m = u.match(/uploads\/(\d{4})\/(\d{2})\//);
  return ((m ? m[1] + m[2] + '-' : '') + decodeURIComponent(u.split('/').pop())).replace(
    /[^a-zA-Z0-9._-]/g,
    '_'
  );
};

const GEREKSIZ = /telefon|yol-tarifi|banner|estezone-1[0-9]|logo/i;

// spec tablosunu {ad, deger} dizisine çevir; başlık satırını ("Özellik/Açıklama") at
function specCikar(tablolar) {
  if (!tablolar || !tablolar.length) return [];
  const t = tablolar.reduce((a, b) => (b.length > a.length ? b : a), tablolar[0]);
  return t
    .filter((r) => r.length >= 2 && r[0] && r[1])
    .filter((r) => !/^(özellik|teknik veri|epicare model)$/i.test(r[0].trim()))
    .map((r) => ({
      ad: r[0].replace(/:+$/, '').trim(),
      deger: r.slice(1).filter(Boolean).join(' · ').trim(),
    }))
    .filter((s) => s.ad && s.deger && s.ad.length < 60);
}

const CTA_GURULTU =
  /bizimle iletişime|iletişime geç|detaylı bilgi ve fiyat|bizi arayabilir|teklif için|whatsapp|hemen ara/i;

const cihazlar = [];
const eksik = [];

for (const [slug, m] of Object.entries(meta.cihazlar)) {
  const h = ham.find((x) => x.slug === slug);
  if (!h) {
    eksik.push(slug);
    continue;
  }

  const gorseller = [
    ...new Set(
      h.gorseller
        .map(dosyaAdi)
        .map((f) => f.replace(/-\d{2,4}x\d{2,4}(?=\.)/, ''))
        .filter((f) => mevcutGorsel.has(f) && !GEREKSIZ.test(f))
    ),
  ];

  // kapak: slug'a en çok benzeyen dosya, yoksa ilki
  const anahtar = slug.replace(/-/g, '');
  const kapak =
    gorseller.find((f) => f.toLowerCase().replace(/[^a-z0-9]/g, '').includes(anahtar.slice(0, 10))) ||
    gorseller[0] ||
    null;

  const paragraflar = h.paragraflar.filter((p) => !CTA_GURULTU.test(p) && p.length > 60);
  const spec = specCikar(h.tablolar);
  const ozellikler = h.liste.filter(
    (l) => l.length > 8 && l.length < 200 && !CTA_GURULTU.test(l) && !/^(anasayfa|hakkımızda|blog|iletişim|ürünlerimiz|hizmetlerimiz|cihazlarımız)$/i.test(l)
  );

  cihazlar.push({
    slug,
    ad: m.ad,
    marka: m.marka,
    kategori: m.kategori,
    kategoriAd: meta.kategoriler[m.kategori].ad,
    rozet: m.rozet,
    vitrin: !!m.vitrin,
    oneCikan: m.one_cikan,
    etiketler: m.etiketler,
    hedef: m.hedef,
    neden: m.neden,
    birlesmeAdayi: m.birlesme_adayi || null,
    ozet: paragraflar[0] || h.desc || '',
    aciklama: paragraflar.slice(0, 6),
    bolumler: h.h2.filter((x) => !CTA_GURULTU.test(x)),
    spec,
    ozellikler: ozellikler.slice(0, 24),
    kapak,
    gorseller,
    kaynakUrl: `https://estezone.com.tr/${slug}/`,
    eskiKelimeSayisi: h.kelimeSayisi,
  });
}

const cikti = {
  uretim: 'estezone kaynak sitesinden çıkarıldı + küratörlü meta ile birleştirildi',
  kategoriler: meta.kategoriler,
  cihazlar,
};

fs.writeFileSync(path.join(__dirname, 'cihazlar.json'), JSON.stringify(cikti, null, 2), 'utf8');

// rapor
const sayac = {};
cihazlar.forEach((c) => (sayac[c.kategori] = (sayac[c.kategori] || 0) + 1));
console.log('CİHAZ:', cihazlar.length, '| eksik:', eksik.length ? eksik.join(', ') : 'yok');
console.log('kategori dağılımı:', sayac);
console.log('vitrin:', cihazlar.filter((c) => c.vitrin).length);
console.log('\nkapağı olmayan:', cihazlar.filter((c) => !c.kapak).map((c) => c.slug).join(', ') || 'yok');
console.log('spec\'i olmayan:', cihazlar.filter((c) => !c.spec.length).map((c) => c.slug).join(', ') || 'yok');
console.log('özeti kısa (<60):', cihazlar.filter((c) => (c.ozet || '').length < 60).map((c) => c.slug).join(', ') || 'yok');
console.log('\nspec satır sayıları:');
cihazlar.forEach((c) => console.log('  ', c.slug.padEnd(40), c.spec.length, '| görsel:', c.gorseller.length));
