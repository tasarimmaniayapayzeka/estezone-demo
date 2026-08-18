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
    ikon: 'ik-web',
    ozet: 'Teklif toplayan, mevzuata uygun kurumsal site.',
    one: true,
    kalemler: [
      ['28 cihaz sayfası', 'Teknik künye, işletme türü uygunluk rozeti, teklif formu, cihaza özel WhatsApp bağlantısı'],
      ['4 karar aracı', 'Cihaz seçim danışmanı, yatırım geri dönüş hesabı, karşılaştırma, dalga boyu ve teknik matris'],
      ['AI cihaz asistanı', '28 cihazı bilir, 7/24 karşılar, teklif formuna taşır; fiyat ve teşhis vermez'],
      ['Bayi girişi ve başvuru', 'İşletme türüne göre değişen belge matrisi, onay akışı'],
      ['Kurumsal sayfalar ve blog', 'Hakkımızda, teknik servis, kiralama, iletişim, B2B içerik'],
      ['Mevzuat süzgeci', 'Yasak ifadeler üretim sırasında otomatik süzülür'],
      ['Ölçüm altyapısı', 'GA4, Search Console, dönüşüm izleme, form kaynağı takibi'],
      ['Teslim', 'Kaynak kodu, yönetim dokümanı, eğitim'],
    ],
  },
  {
    id: 'seo',
    no: '02',
    ad: 'SEO',
    ikon: 'ik-seo',
    ozet: 'Dağılmış içerik gücünü satan sayfaya taşıma.',
    kalemler: [
      ['Teknik denetim', 'Taranabilirlik, dizine ekleme, sayfa hızı, yapısal veri, kopya içerik'],
      ['122 URL → ~55 URL', 'Aynı sorguya giren sayfalar tek güçlü sayfada birleşir'],
      ['301 göç planı', 'Her eski adres korunur; mevcut sıralama değeri taşınır'],
      ['Ürün sayfası derinleştirme', 'Teknik künye, karşılaştırma, sık sorulanlar'],
      ['Yapısal veri', 'Ürün, sık sorulanlar ve site yolu işaretlemesi'],
      ['İç bağlantı mimarisi', 'Blog yazıları ilgili cihaz sayfasına bağlanır'],
      ['İçerik takvimi', 'Konu kümesi planı ve düzenli B2B yazı üretimi'],
      ['Aylık raporlama', 'Sıralama, tıklama, form ve arama terimi raporu'],
    ],
    not: 'Sıralama garantisi verilmez; hedefler ölçümle raporlanır.',
  },
  {
    id: 'ads',
    no: '03',
    ad: 'Google Ads',
    ikon: 'ik-ads',
    ozet: 'Ölçülemeyen harcamayı kaynağı belli talebe çevirme.',
    kalemler: [
      ['Dönüşüm izleme kurulumu', 'Hangi aramanın hangi teklifi getirdiği görünür hale gelir'],
      ['Kampanya mimarisi', 'Cihaz ve kategori bazlı yapı; marka ve jenerik aramalar ayrılır'],
      ['Profesyonele yönelik hedefleme', 'Tıbbi cihaz tanıtımı meslek mensuplarına yöneliktir'],
      ['Arama terimi hijyeni', 'Negatif kelime listesi ve düzenli terim temizliği'],
      ['İniş sayfası eşleşmesi', 'Her kampanya, formu olan doğru cihaz sayfasına iner'],
      ['Reklam metni ve varlıklar', 'Mevzuata uygun metin seti'],
      ['Aylık optimizasyon', 'Teklif, bütçe ve kreatif düzenlemesi'],
      ['Raporlama', 'Harcama, form, maliyet ve arama terimi raporu'],
    ],
    not: 'Reklam bütçesi pakete dahil değildir; platforma ayrıca ödenir.',
  },
  {
    id: 'meta',
    no: '04',
    ad: 'Meta & YouTube',
    ikon: 'ik-video',
    ozet: 'Aramayan alıcıya ulaşmak, cihazı çalışırken göstermek.',
    kalemler: [
      ['Meta kurulumu', 'Piksel, dönüşüm API’si ve olay eşleştirmesi'],
      ['Kitle mimarisi', 'İşletme sahibi hedefleme, site ziyaretçisi yeniden hedefleme'],
      ['Kreatif hattı', 'Video, karusel ve tek görsel setleri'],
      ['WhatsApp akışı', 'Reklamdan doğrudan yazışmaya geçiş'],
      ['YouTube kanal kurulumu', 'Kanal kimliği, oynatma listeleri, açıklama düzeni'],
      ['Video içerik hattı', 'Cihaz tanıtımı, kurulum ve eğitim, teknik servis anlatımı'],
      ['Video optimizasyonu', 'Başlık, küçük resim ve açıklama düzeni'],
      ['Aylık raporlama', 'Erişim, etkileşim, form ve yazışma raporu'],
    ],
    not: 'Özel kitle için müşteri listesi kullanılacaksa KVKK aydınlatma ve açık rıza koşulu aranır.',
  },
  {
    id: 'produksiyon',
    no: '05',
    ad: 'Prodüksiyon',
    ikon: 'ik-kamera',
    ozet: 'İstanbul çekim ayağı — kanıt görüntüyle üretilir.',
    kalemler: [
      ['Saha çekimi', 'Bayi ve referans işletme ziyareti; cihaz kendi ortamında kayda alınır'],
      ['Memnuniyet röportajları', 'Kullanıcı ve bayi anlatımı, gerçek işletme ortamında'],
      ['Kurulum ve kullanım çekimi', 'Cihazın devreye alınması, operatör eğitimi, teknik servis atölyesi'],
      ['Showroom ve ürün çekimi', 'Tanıtım planları ve detay makro çekimler'],
      ['4K kurgu ve montaj', 'Renk düzenleme, ses düzenleme, altyazı, seslendirme'],
      ['Üç format çıktı', 'YouTube uzun anlatım · reklam kısa kurgu · Reels ve Shorts dikey'],
      ['Çekim takvimi', 'Planlama, lokasyon koordinasyonu, ekip ve ekipman'],
      ['İzin ve uyum', 'Görüntü kullanım izinleri, mevzuat süzgeci çekim öncesi netleşir'],
    ],
    not: 'Ulaşım ve konaklama giderleri çekim planına göre ayrıca belirlenir.',
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

/* Kanal şeridi: hangi ay hangi kanalın devrede olduğunu tek bakışta gösterir.
   Sözle "üst üste binerek çalışır" demek yerine diyagramla göstermek daha net. */
const DURUM_AD = ['Henüz başlamadı', 'Kuruluyor', 'Tam çalışıyor'];
const cizKanalSerit = (kanallar) => `<div class="kanal-serit">
  <div class="kanal-bas"><span></span><b>1. ay</b><b>3. ay</b><b>6. ay</b></div>
  ${kanallar
    .map(
      (k) => `<div class="kanal">
    <span class="kanal-ad"><img src="varlik/${k.ikon}.png" alt="" width="34" height="34" loading="lazy">${kacis(k.ad)}</span>
    ${k.aylar
      .map(
        (d, i) =>
          `<span class="hucre h${d}" title="${kacis(k.ad)} · ${['1. ay', '3. ay', '6. ay'][i]}: ${DURUM_AD[d]}"><i></i></span>`
      )
      .join('')}
  </div>`
    )
    .join('')}
  <div class="kanal-anahtar">
    <span><i class="h2"></i>Tam çalışıyor</span>
    <span><i class="h1"></i>Kuruluyor</span>
    <span><i class="h0"></i>Henüz başlamadı</span>
  </div>
</div>`;

/* Uzun özellik listesi — chatbot ve prodüksiyon perdelerinde kullanılıyor. */
const cizOzellikler = (o) => `<ul class="ozellik-liste">${o
  .map((x) => `<li>${kacis(x)}</li>`)
  .join('')}</ul>`;

const cizPerde = (p) => `<section class="perde" id="${kacis(p.id)}">
  <div class="perde-medya">${cizMedya(p.medya)}<span class="perde-golge"></span></div>
  <div class="kap perde-ic">
    <div class="perde-ust">
      <span class="no">${kacis(p.no)}</span>
      ${p.ikon ? `<img class="perde-ikon" src="varlik/${p.ikon}.png" alt="" width="96" height="96" loading="lazy">` : ''}
    </div>
    <span class="etiket">${kacis(p.etiket)}</span>
    <h2>${satir(p.baslik)}</h2>
    <p class="ozet">${kacis(p.ozet)}</p>
    ${p.olcumler ? `<div class="ol-izgara">${p.olcumler.map(cizOlcum).join('')}</div>` : ''}
    ${p.ozellikler ? cizOzellikler(p.ozellikler) : ''}
    ${p.kanallar ? cizKanalSerit(p.kanallar) : ''}
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
    <div class="kapak-logolar">
      <img class="logo-tm" src="varlik/tm-logo.png" alt="TasarımMania Creative Agency" width="150" height="44">
      <span class="logo-ayrac"></span>
      <img class="logo-musteri" src="../varlik/gorsel/logo-estezone-beyaz.webp" alt="Estezone Medikal" width="148" height="36">
    </div>
    <span class="etiket">Dijital Pazarlama Önerisi</span>
    <h1>Cihaz hazır.<br>Alıcı sizi bulamıyor.</h1>
    <p class="ozet">Dokuz perdede: bugün nerede olduğunuz, ne yapılacağı, altı ayda nereye gideceğiniz.</p>
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
    <h2>Beş paket.</h2>
    <p class="ozet">Ayrı ayrı ya da birlikte alınabilir. Kapsam kalem kalem yazılı;
      bedel görüşmede netleşir.</p>
    <div class="paket-izgara paket-izgara--5">
      ${PAKETLER.map(
        (p) => `<article class="paket${p.one ? ' paket--one' : ''}">
        <div class="paket-bas">
          <span class="paket-no">${kacis(p.no)}</span>
          ${p.ikon ? `<img src="varlik/${p.ikon}.png" alt="" width="64" height="64" loading="lazy">` : ''}
        </div>
        <h3>${kacis(p.ad)}</h3>
        <p class="paket-ozet">${kacis(p.ozet)}</p>
        <div class="paket-fiyat"><span>Bedel</span><div data-fiyat="${p.id}">&nbsp;</div></div>
        <ul>${p.kalemler
          .map(([a, b]) => `<li><b>${kacis(a)}</b><span>${kacis(b)}</span></li>`)
          .join('')}</ul>
        ${p.not ? `<p class="paket-not">${kacis(p.not)}</p>` : ''}
      </article>`
      ).join('')}
    </div>
    <p class="dip-not">Bu belgedeki ölçümler 16 Ağustos 2026 tarihinde alınmıştır.
      Yol haritasındaki maddeler hedeftir, taahhüt değildir.
      <a href="../sunum/">Ayrıntılı sürüm →</a></p>
  </div>
</section>

<footer class="kapanis">
  <div class="kap kapanis-ic">
    <img class="kapanis-logo" src="varlik/tm-logo.png" alt="TasarımMania Creative Agency" width="218" height="64">
    <h2>Başlayalım mı?</h2>
    <p class="ozet">Paket seçimini ve takvimi birlikte netleştirelim. Sorularınız için
      doğrudan arayabilir ya da WhatsApp’tan yazabilirsiniz.</p>
    <div class="kapanis-eylem">
      <a class="btn btn-tel" href="tel:+905547916545">
        <img src="varlik/ik-tel.png" alt="" width="34" height="34" loading="lazy">
        <span><small>Telefon</small><b>0554 791 65 45</b></span>
      </a>
      <a class="btn btn-wa" href="https://wa.me/905547916545?text=${encodeURIComponent(
        'Merhaba, Estezone dijital pazarlama sunumunu inceledim. Görüşmek istiyorum.'
      )}" target="_blank" rel="noopener">
        <img src="varlik/ik-whatsapp.png" alt="" width="34" height="34" loading="lazy">
        <span><small>WhatsApp</small><b>Hemen yazın</b></span>
      </a>
    </div>
    <p class="kapanis-alt">TasarımMania · Estezone Medikal için hazırlanmıştır · Ağustos 2026</p>
  </div>
</footer>
</main>

<script src="varlik/ozet.js" defer></script>
`;

fs.mkdirSync(VARLIK, { recursive: true });
fs.writeFileSync(path.join(CIKTI, 'index.html'), html, 'utf8');

/* yalnızca bu sunumun kullandığı varlıkları kopyala.
   İkonlar PNG: sitedeki ikon3d ailesi gibi ALFA KANALLI olmalı. Opak webp
   kullanınca koyu kartın üstünde siyah kare olarak görünüyorlardı. */
const gerekli = new Set();
PERDELER.forEach((p) => {
  if (p.medya) {
    gerekli.add(p.medya.ad + '.webp');
    if (p.medya.tip === 'video') gerekli.add(p.medya.ad + '.mp4');
  }
  if (p.ikon) gerekli.add(p.ikon + '.png');
  (p.kanallar || []).forEach((k) => gerekli.add(k.ikon + '.png'));
});
PAKETLER.forEach((p) => p.ikon && gerekli.add(p.ikon + '.png'));
/* kapak videosu + logo + kapanıştaki iletişim ikonları */
['sahne-1.mp4', 'sahne-1.webp', 'tm-logo.png', 'ik-tel.png', 'ik-whatsapp.png'].forEach((f) =>
  gerekli.add(f)
);

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
