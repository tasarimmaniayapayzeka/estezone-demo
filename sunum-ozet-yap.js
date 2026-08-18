/* ============================================================================
   ESTEZONE — KISA SUNUM (/sunum-ozet)
   Uzun sürüm /sunum adresinde duruyor ve dokunulmuyor. Bu sürüm onun %70
   kısaltılmışı: 7 perde, perde başına tek fikir + üç rakam + tam ekran görsel.
   Workroom teklifindeki gibi kısa iddialı başlıklar.
   Çalıştırma: node sunum-ozet-yap.js
   ========================================================================== */
const fs = require('fs');
const path = require('path');

const KOK = __dirname;
const CIKTI = path.join(KOK, 'site', 'sunum-ozet');
const VARLIK = path.join(CIKTI, 'varlik');
const KAYNAK = path.join(KOK, 'kaynak', 'sunum');

const kacis = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/* \n → <br> : başlıklarda satır kırılması bilinçli */
const satir = (s) => kacis(s).replace(/\n/g, '<br>');

const PERDELER = require('./veri/sunum-kisa.js');

const PAKETLER = [
  {
    id: 'web',
    no: '01',
    ad: 'Web Sitesi',
    ozet: 'Teklif toplayan, mevzuata uygun kurumsal site.',
    one: true,
    kalemler: [
      '28 cihaz sayfası — her birinde teknik künye, teklif formu, cihaza özel WhatsApp',
      '4 karar aracı — seçim danışmanı, ROI hesabı, karşılaştırma, teknik matris',
      'AI cihaz asistanı ve bayi girişi',
      'Kurumsal sayfalar, blog, mevzuat süzgeci',
      'Ölçüm altyapısı: GA4, Search Console, dönüşüm izleme',
    ],
  },
  {
    id: 'seo',
    no: '02',
    ad: 'SEO',
    ozet: 'Dağılmış içerik gücünü satan sayfaya taşıma.',
    kalemler: [
      '122 URL → ~55 güçlü URL birleştirme',
      '301 göç planı — mevcut sıralama değeri korunur',
      'Ürün sayfası derinleştirme ve yapısal veri',
      'İç bağlantı mimarisi, içerik takvimi',
      'Aylık sıralama ve arama terimi raporu',
    ],
  },
  {
    id: 'ads',
    no: '03',
    ad: 'Google Ads',
    ozet: 'Ölçülemeyen harcamayı kaynağı belli talebe çevirme.',
    kalemler: [
      'Dönüşüm izleme kurulumu',
      'Cihaz bazlı kampanya mimarisi',
      'Profesyonele yönelik hedefleme',
      'Arama terimi hijyeni ve negatif kelime',
      'Aylık optimizasyon ve raporlama',
    ],
    not: 'Reklam bütçesi pakete dahil değildir.',
  },
  {
    id: 'meta',
    no: '04',
    ad: 'Meta & YouTube',
    ozet: 'Aramayan alıcıya ulaşmak, cihazı çalışırken göstermek.',
    kalemler: [
      'Piksel ve dönüşüm API kurulumu',
      'İşletme hedefleme + yeniden hedefleme',
      'Video, karusel ve görsel kreatif hattı',
      'YouTube kanal kurulumu ve içerik serisi',
      'Aylık raporlama',
    ],
  },
];

/* ---- perde çizimi ---- */
const cizMedya = (m) => {
  if (!m) return '';
  const mp4 = path.join(KAYNAK, m.ad + '.mp4');
  const webp = path.join(KAYNAK, m.ad + '.webp');
  if (m.tip === 'video' && fs.existsSync(mp4))
    return `<video src="varlik/${m.ad}.mp4" poster="varlik/${m.ad}.webp"
      muted playsinline loop preload="none"></video>`;
  if (fs.existsSync(webp)) return `<img src="varlik/${m.ad}.webp" alt="" loading="lazy">`;
  return '';
};

const cizOlcum = (o) => `<div class="ol ol--${o.durum}">
  <b>${kacis(o.deger)}</b>
  <span>${kacis(o.etiket)}</span>
  ${o.alt ? `<small>${kacis(o.alt)}</small>` : ''}
</div>`;

const cizDonem = (d) => `<div class="donem">
  <span class="donem-ad">${kacis(d.ad)}</span>
  <h4>${kacis(d.baslik)}</h4>
  <ul>${d.maddeler.map((m) => `<li>${kacis(m)}</li>`).join('')}</ul>
  <p class="donem-olcut">${kacis(d.olcut)}</p>
</div>`;

const cizPerde = (p) => `<section class="perde" id="${kacis(p.id)}">
  <div class="perde-medya">${cizMedya(p.medya)}<span class="perde-golge"></span></div>
  <div class="kap perde-ic">
    <span class="no">${kacis(p.no)}</span>
    <span class="etiket">${kacis(p.etiket)}</span>
    <h2>${satir(p.baslik)}</h2>
    <p class="ozet">${kacis(p.ozet)}</p>
    ${p.olcumler ? `<div class="ol-izgara">${p.olcumler.map(cizOlcum).join('')}</div>` : ''}
    ${p.donemler ? `<div class="donem-izgara">${p.donemler.map(cizDonem).join('')}</div>` : ''}
    ${p.cikarim ? `<p class="cikarim">${kacis(p.cikarim)}</p>` : ''}
    ${p.baglanti ? `<a class="btn btn-sade" href="${p.baglanti.url}" target="_blank" rel="noopener">${kacis(p.baglanti.ad)} →</a>` : ''}
  </div>
</section>`;

const html = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Estezone Medikal — Dijital Pazarlama Önerisi | TasarımMania</title>
<meta name="description" content="Yedi perdede: mevcut durumun ölçümü, web yenileme, SEO, reklam, YouTube, altı aylık plan ve paketler.">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="varlik/ozet.css">
<link rel="icon" type="image/png" href="../varlik/gorsel/logo-favicon.png">

<div class="ilerleme" data-ilerleme></div>

<header class="kapak">
  <div class="kapak-medya">
    <video src="varlik/sahne-1.mp4" poster="varlik/sahne-1.webp" muted playsinline loop autoplay preload="auto"></video>
    <span class="perde-golge"></span>
  </div>
  <div class="kap kapak-ic">
    <img src="../varlik/gorsel/logo-estezone-beyaz.webp" alt="Estezone Medikal" width="164" height="40">
    <span class="etiket">TasarımMania · Dijital Pazarlama Önerisi</span>
    <h1>Cihaz hazır.<br>Alıcı sizi bulamıyor.</h1>
    <p class="ozet">Yedi perdede: bugün nerede olduğunuz, ne yapılacağı, altı ayda nereye gideceği.</p>
    <div class="kapak-alt">
      <a class="btn" href="#sorun">Başla</a>
      <a class="btn btn-sade" href="#paketler">Paketler</a>
    </div>
  </div>
  <span class="kaydir" aria-hidden="true"></span>
</header>

<main>
${PERDELER.map(cizPerde).join('\n')}

<section class="perde perde--paket" id="paketler">
  <div class="kap">
    <span class="etiket">Teklif</span>
    <h2>Dört paket.</h2>
    <p class="ozet">Ayrı ayrı ya da birlikte alınabilir. Bedel görüşmede netleşir.</p>
    <div class="paket-izgara">
      ${PAKETLER.map(
        (p) => `<article class="paket${p.one ? ' paket--one' : ''}">
        <span class="paket-no">${kacis(p.no)}</span>
        <h3>${kacis(p.ad)}</h3>
        <p class="paket-ozet">${kacis(p.ozet)}</p>
        <div class="paket-fiyat"><span>Bedel</span><div data-fiyat="${p.id}">&nbsp;</div></div>
        <ul>${p.kalemler.map((k) => `<li>${kacis(k)}</li>`).join('')}</ul>
        ${p.not ? `<p class="paket-not">${kacis(p.not)}</p>` : ''}
      </article>`
      ).join('')}
    </div>
    <p class="dip-not">Bu belgedeki ölçümler 16 Ağustos 2026 tarihinde alınmıştır.
      Yol haritasındaki maddeler hedeftir, taahhüt değildir.
      <a href="../sunum/">Ayrıntılı sürüm →</a></p>
  </div>
</section>
</main>

<script src="varlik/ozet.js" defer></script>
`;

fs.mkdirSync(VARLIK, { recursive: true });
fs.writeFileSync(path.join(CIKTI, 'index.html'), html, 'utf8');

/* yalnızca bu sunumun kullandığı varlıkları kopyala */
const gerekli = new Set();
PERDELER.forEach((p) => {
  if (!p.medya) return;
  gerekli.add(p.medya.ad + '.webp');
  if (p.medya.tip === 'video') gerekli.add(p.medya.ad + '.mp4');
});
gerekli.add('sahne-1.mp4');
gerekli.add('sahne-1.webp');

let n = 0;
gerekli.forEach((f) => {
  const k = path.join(KAYNAK, f);
  if (fs.existsSync(k)) {
    fs.copyFileSync(k, path.join(VARLIK, f));
    n++;
  }
});
['ozet.css', 'ozet.js'].forEach((f) => fs.copyFileSync(path.join(KOK, 'sablon', f), path.join(VARLIK, f)));

const boyut = fs.readdirSync(VARLIK).reduce((a, f) => a + fs.statSync(path.join(VARLIK, f)).size, 0);
console.log(`✓ sunum-ozet/index.html — ${PERDELER.length} perde + ${PAKETLER.length} paket`);
console.log(`✓ ${n} varlık (${Math.round(boyut / 1024)} KB) + css/js`);
console.log(`→ ${CIKTI}`);
