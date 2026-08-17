// Ortak sayfa parçaları: head, başlık, navigasyon, alt bilgi, kart, CTA
const icerik = require('../veri/icerik.js');
const { marka, iletisim, yasal } = icerik;

const SITE = 'https://estezone.com.tr';

/* Önbellek kırıcı: her build'de değişir. Bayat CSS/JS'in yeni HTML ile
   karışmasını engeller (dev ok hatasının kök nedeni buydu). */
const SURUM = Date.now().toString(36);

/* Üç tasarım sürümü. build.js hangisinin kurulacağını belirler.
   Her tema aynı içeriği ve aynı işlevleri kullanır; yalnızca stil dosyası,
   çıktı klasörü ve marka renkleri değişir. */
const TEMALAR = {
  koyu: {
    etiket: 'v1',
    ad: 'Koyu — Dalga Boyu',
    yol: '', // site kökü
    temaRengi: '#06090f',
    favZemin: '2dd4f5',
    favCizgi: '04202a',
    favR: '8',
    font: 'family=Inter:wght@400;450;500;550;600;650&family=JetBrains+Mono:wght@400;500;600',
  },
  acik: {
    etiket: 'v2',
    ad: 'Açık Kurumsal',
    yol: 'v2/',
    temaRengi: '#ffffff',
    favZemin: '0d5490',
    favCizgi: 'ffffff',
    favR: '6',
    font: 'family=Inter:wght@400;450;500;550;600;650&family=Inter+Tight:wght@600;650;700;750&family=JetBrains+Mono:wght@400;500;600',
  },
  v3: {
    etiket: 'v3',
    ad: 'Editoryal Premium',
    yol: 'v3/',
    temaRengi: '#faf8f5',
    favZemin: '2d5f54',
    favCizgi: 'faf8f5',
    favR: '3',
    font: 'family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;450;500;550;600&family=JetBrains+Mono:wght@400;500',
  },
  v4: {
    etiket: 'v4',
    ad: 'Spektrum',
    yol: 'v4/',
    temaRengi: '#0b0910',
    favZemin: 'a855f7',
    favCizgi: '0b0910',
    favR: '9',
    font: 'family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;450;500;550;600&family=JetBrains+Mono:wght@400;500;600',
  },
};

const T = { tema: 'koyu' };
function temaAyarla(tema) {
  T.tema = TEMALAR[tema] ? tema : 'koyu';
}
/* Sayfanın bulunduğu yerden site köküne çıkan yol.
   k = tema kökünden yukarı ('' veya '../'); tema kökü de v2/ ya da v3/ ise bir üst daha. */
const siteKoku = (k) => k + (T.tema === 'koyu' ? '' : '../');

const kacis = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Arama normalizasyonu — Türkçe noktasız ı tuzağını çözer.
   "HIFU".toLocaleLowerCase('tr') = "hıfu" olduğu için kullanıcının yazdığı "hifu" eşleşmezdi.
   Her iki taraf da ASCII'ye katlanır. site.js içindeki norm() ile BİREBİR aynı olmalı. */
const aramaNorm = (s = '') =>
  String(s)
    .toLocaleLowerCase('tr')
    .replace(/[ıİI]/g, 'i')
    .replace(/[şŞ]/g, 's')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/\s+/g, ' ')
    .trim();

/* ---------- simgeler ---------- */
const ikon = {
  // stroke = currentColor → rengi .logo-im üzerinden tema belirler
  logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h3l2.5-7 5 14 2.5-7H21"/></svg>',
  asistan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-3.8-.7L3 21l1.9-4.9A8.3 8.3 0 0 1 3.6 11.5a8.4 8.4 0 0 1 8.9-8.4 8.4 8.4 0 0 1 8.5 8.4Z"/></svg>',
  gonder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg>',
  ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  asagi: '<svg class="ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  kapat: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  ara: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5v-.5c-.1-.2-.7-1.6-.9-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z"/></svg>',
  eposta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  konum: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  hedef: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>',
  rozet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  servis: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5.3 5.3l-8.5 8.5a2.8 2.8 0 0 1-4-4l7.2-9.8Z"/><path d="M6 6 3 9"/></svg>',
  parca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 8.7 5v10L12 22 3.3 17V7L12 2Z"/><path d="m12 22V12M3.3 7 12 12l8.7-5"/></svg>',
  yetki: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="m8.5 12.5-1 8.5 4.5-2.5 4.5 2.5-1-8.5"/></svg>',
  belge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6M9 15l2 2 4-4"/></svg>',
  takas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
};

/* ---------- navigasyon ---------- */
const KATEGORI_MENU = [
  ['lazer-epilasyon', 'epilasyon', 'Lazer Epilasyon', 'Alexandrite, Diode ve Nd:YAG platformları'],
  ['cilt-medikal-estetik', 'cilt', 'Cilt & Medikal Estetik', 'CO2, pikosaniye, BBL, HIFU, altın iğne'],
  ['vucut-sekillendirme', 'vucut', 'Vücut & Zayıflama', 'Soğuk lipoliz, HI-EMT, endolazer'],
  ['sogutma-aksesuar', 'destek', 'Soğutma & Aksesuar', 'Soğutma sistemleri ve koruyucu ekipman'],
];

const ANA_MENU = [
  { ad: 'Cihazlar', url: 'cihazlar.html', alt: KATEGORI_MENU },
  { ad: 'Teknik Servis', url: 'teknik-servis.html' },
  {
    ad: 'Araçlar',
    url: 'cihaz-secim-danismani.html',
    alt: [
      ['cihaz-secim-danismani', 'epilasyon', 'Cihaz Seçim Danışmanı', '3 soruda size uygun platform'],
      ['yatirim-hesaplayici', 'vucut', 'Yatırım Geri Dönüş Hesabı', 'Cihaz kaç ayda kendini öder'],
      ['karsilastir', 'cilt', 'Cihaz Karşılaştırma', 'Üç cihazı yan yana koyun'],
      ['teknik-matris', 'destek', 'Dalga Boyu & Teknik Matris', '28 cihaz tek tabloda, sıralanabilir'],
    ],
  },
  { ad: 'Kiralama & 2. El', url: 'kiralama-ikinci-el.html' },
  { ad: 'Kurumsal', url: 'hakkimizda.html' },
  { ad: 'İletişim', url: 'iletisim.html' },
];

/* ---------- head ---------- */
function kafa({ baslik, aciklama, yol = '', kanonik, sema, gorsel }) {
  const k = yol ? '../' : '';
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${kacis(baslik)}</title>
<meta name="description" content="${kacis(aciklama)}">
<link rel="canonical" href="${SITE}/${kanonik || ''}">
<meta name="theme-color" content="${TEMALAR[T.tema].temaRengi}">
<meta name="robots" content="noindex, nofollow">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${marka.ad}">
<meta property="og:title" content="${kacis(baslik)}">
<meta property="og:description" content="${kacis(aciklama)}">
<meta property="og:locale" content="tr_TR">${
    gorsel ? `\n<meta property="og:image" content="${SITE}/${gorsel}">` : ''
  }
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${TEMALAR[T.tema].font}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${k}varlik/css/stil.css?v=${SURUM}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='${
    TEMALAR[T.tema].favR
  }' fill='%23${TEMALAR[T.tema].favZemin}'/%3E%3Cpath d='M5 16h4l3-9 6 18 3-9h6' fill='none' stroke='%23${
    TEMALAR[T.tema].favCizgi
  }' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
${sema ? `<script type="application/ld+json">${JSON.stringify(sema)}</script>` : ''}`;
}

/* ---------- başlık ---------- */
function ust(yol = '', aktif = '') {
  const k = yol ? '../' : '';
  const nav = ANA_MENU.map((m) => {
    const iaret = aktif === m.url ? ' aria-current="page"' : '';
    if (!m.alt) return `<li><a class="nav-l" href="${k}${m.url}"${iaret}>${m.ad}</a></li>`;
    return `<li><a class="nav-l" href="${k}${m.url}"${iaret}>${m.ad}${ikon.asagi}</a>
      <div class="alt-menu">${m.alt
        .map(
          ([sl, kat, ad, ac]) =>
            `<a href="${k}${/danismani|hesaplayici|karsilastir|teknik-matris/.test(sl) ? sl + '.html' : 'kategori/' + sl + '.html'}">
          <span class="nokta" style="background:var(--k-${kat})"></span>
          <span><strong>${ad}</strong><small>${ac}</small></span></a>`
        )
        .join('')}</div></li>`;
  }).join('');

  const mobil = ANA_MENU.map(
    (m) =>
      `<a href="${k}${m.url}">${m.ad}</a>` +
      (m.alt
        ? m.alt
            .map(
              ([sl, , ad]) =>
                `<a href="${k}${
                  /danismani|hesaplayici|karsilastir|teknik-matris/.test(sl)
                    ? sl + '.html'
                    : 'kategori/' + sl + '.html'
                }" style="padding-left:1.6rem;font-size:.92rem;color:var(--metin-2)">${ad}</a>`
            )
            .join('')
        : '')
  ).join('');

  const kok = siteKoku(k);
  const temaSerit = Object.entries(TEMALAR)
    .map(([anahtar, t]) =>
      anahtar === T.tema
        ? `<b class="secili">${t.etiket} · ${t.ad}</b>`
        : `<a href="${kok}${t.yol}">${t.etiket} · ${t.ad}</a>`
    )
    .join('<i class="ayrac-nokta">·</i>');

  return `<a class="atla" href="#ana">İçeriğe atla</a>
<div class="tema-serit">
  <div class="kap tema-serit-ic">
    <span class="serit-baslik">Tasarım sürümü</span>
    ${temaSerit}
  </div>
</div>
<div class="demo-bant" role="note">
  <div class="kap demo-bant-ic">
    <span class="demo-etiket">TASARIM DEMOSU</span>
    <p>Bu sayfa <b>resmî Estezone Medikal sitesi değildir.</b> TasarımMania tarafından hazırlanmış,
      onaylanmamış bir tasarım önerisidir. Gerçek site:
      <a href="https://estezone.com.tr" rel="noopener nofollow" target="_blank">estezone.com.tr</a></p>
  </div>
</div>
<header class="ust">
  <div class="kap ust-ic">
    <a class="logo" href="${k}index.html"><span class="logo-im">${ikon.logo}</span><span><b>Estezone</b> <span>Medikal</span></span></a>
    <ul class="nav">${nav}</ul>
    <div class="ust-eylem">
      <a class="btn btn-hat btn-k" href="tel:${iletisim.telefonHam}">${ikon.tel}<span>${iletisim.telefon}</span></a>
      <a class="btn btn-ana btn-k" href="${k}iletisim.html">Teklif Alın</a>
      <button class="menu-dug" aria-label="Menüyü aç">${ikon.menu}</button>
    </div>
  </div>
</header>
<div class="cekmece" role="dialog" aria-label="Menü">
  <div class="cekmece-panel">
    <div class="cekmece-bas">
      <a class="logo" href="${k}index.html"><span class="logo-im">${ikon.logo}</span><b>Estezone</b></a>
      <button class="cekmece-kapat" aria-label="Kapat">${ikon.kapat}</button>
    </div>
    <nav>${mobil}</nav>
    <div class="btn-grup" style="margin-top:1.6rem;flex-direction:column;align-items:stretch">
      <a class="btn btn-ana" href="${k}iletisim.html">Teklif Alın</a>
      <a class="btn btn-hat" href="tel:${iletisim.telefonHam}">${ikon.tel}${iletisim.telefon}</a>
    </div>
  </div>
</div>`;
}

/* ---------- alt bilgi ---------- */
function alt(yol = '') {
  const k = yol ? '../' : '';
  return `<footer class="alt">
  <div class="kap">
    <div class="alt-izgara">
      <div>
        <a class="logo" href="${k}index.html" style="margin-bottom:1.1rem"><span class="logo-im">${ikon.logo}</span><span><b>Estezone</b> <span>Medikal</span></span></a>
        <p class="sonuk" style="font-size:.895rem;max-width:38ch;line-height:1.65">${marka.aciklama}</p>
        <div class="btn-grup" style="margin-top:1.3rem">
          <a class="btn btn-wa btn-k" href="https://wa.me/${iletisim.whatsappHam}">${ikon.wa}WhatsApp</a>
          <a class="btn btn-hat btn-k" href="tel:${iletisim.telefonHam}">${ikon.tel}Ara</a>
        </div>
      </div>
      <div>
        <h5>Cihazlar</h5>
        <ul>${KATEGORI_MENU.map(([sl, , ad]) => `<li><a href="${k}kategori/${sl}.html">${ad}</a></li>`).join(
          ''
        )}<li><a href="${k}cihazlar.html">Tüm cihazlar</a></li></ul>
      </div>
      <div>
        <h5>Hizmet & Araçlar</h5>
        <ul>
          <li><a href="${k}teknik-servis.html">Teknik servis</a></li>
          <li><a href="${k}kiralama-ikinci-el.html">Kiralama & 2. el</a></li>
          <li><a href="${k}cihaz-secim-danismani.html">Cihaz seçim danışmanı</a></li>
          <li><a href="${k}yatirim-hesaplayici.html">Yatırım hesaplayıcı</a></li>
          <li><a href="${k}karsilastir.html">Cihaz karşılaştırma</a></li>
          <li><a href="${k}teknik-matris.html">Dalga boyu matrisi</a></li>
          <li><a href="${k}blog.html">Blog</a></li>
        </ul>
      </div>
      <div>
        <h5>İletişim</h5>
        ${iletisim.ofisler
          .map((o) => `<div class="alt-ofis"><b>${o.ad}</b><p class="sonuk">${o.adres}</p></div>`)
          .join('')}
        <ul>
          <li><a href="tel:${iletisim.telefonHam}">${iletisim.telefon}</a></li>
          <li><a href="mailto:${iletisim.eposta}">${iletisim.eposta}</a></li>
        </ul>
      </div>
    </div>
    <!-- Künye bloğu demo sürümünde kaldırıldı (boş alanlar bitmemiş görünüyordu).
         6563 sayılı Kanun md.3 gereği CANLIYA GEÇERKEN geri eklenmeli:
         ticaret unvanı, MERSİS, ticaret sicil no, vergi dairesi/no, KEP, satış merkezi yetki belgesi no.
         Alanlar veri/icerik.js -> kunye içinde duruyor. -->
    <div class="alt-son">
      <span>© <span data-yil>2026</span> ${marka.ad}. Tüm hakları saklıdır.</span>
      <div class="alt-yasal">
        ${yasal.map((y) => `<a href="${k}${y.slug}.html">${y.ad}</a>`).join('')}
        ${iletisim.sosyal.map((s) => `<a href="${s.url}" rel="noopener" target="_blank">${s.ad}</a>`).join('')}
      </div>
    </div>
    <p class="sonuk" style="font-size:.76rem;margin-top:1.2rem;max-width:100ch;line-height:1.6;opacity:.75">
      Bu sitedeki cihaz tanıtımları sağlık meslek mensupları ile sağlık kuruluşlarına yöneliktir ve profesyonel kullanım içindir.
      İçerikler teşhis veya tedavi önerisi niteliği taşımaz. Cihaz endikasyonları üretici beyanına dayanır.
    </p>
  </div>
</footer>
<div class="yuzen">
  <button class="asistan" data-asistan-ac aria-label="Cihaz asistanını aç">${ikon.asistan}</button>
  <a class="wa" href="https://wa.me/${iletisim.whatsappHam}" aria-label="WhatsApp ile yazın" target="_blank" rel="noopener">${ikon.wa}</a>
  <a class="tel" href="tel:${iletisim.telefonHam}" aria-label="Telefonla arayın">${ikon.tel}</a>
</div>

<div class="asistan-panel" data-asistan hidden role="dialog" aria-label="Estezone cihaz asistanı">
  <div class="asistan-bas">
    <span class="im">${ikon.asistan}</span>
    <span><b>Estezone Cihaz Asistanı</b><small>28 cihazı bilir · teşhis koymaz</small></span>
    <button data-asistan-kapat aria-label="Kapat">${ikon.kapat}</button>
  </div>
  <div class="asistan-govde" data-asistan-govde></div>
  <div class="asistan-oneri" data-asistan-oneri></div>
  <form class="asistan-alt" data-asistan-form>
    <input type="text" placeholder="Cihaz, teknoloji veya soru yazın…" aria-label="Mesajınız" autocomplete="off">
    <button type="submit" aria-label="Gönder">${ikon.gonder}</button>
  </form>
  <p class="asistan-not">Bu asistan cihaz bilgisi verir; tıbbi teşhis veya tedavi önerisi sunmaz.
    Fiyat ve kesin teknik değerler teklif aşamasında yazılı bildirilir.</p>
</div>
<div class="cerez" data-cerez hidden role="dialog" aria-label="Çerez tercihleri">
  <div class="cerez-ic">
    <div>
      <b>Çerez tercihleriniz</b>
      <p>Sitenin çalışması için zorunlu çerezler kullanılır. Analitik ve pazarlama çerezleri
        yalnızca onay verirseniz çalıştırılır. Ayrıntı: <a href="${k}cerez.html">Çerez Politikası</a></p>
    </div>
    <div class="cerez-dug">
      <button class="btn btn-hat btn-k" data-cerez-ret>Reddet</button>
      <button class="btn btn-hat btn-k" data-cerez-yonet>Tercihleri yönet</button>
      <button class="btn btn-ana btn-k" data-cerez-kabul>Kabul et</button>
    </div>
  </div>
</div>
<script src="${k}varlik/js/cihazlar.js?v=${SURUM}" defer></script>
<script src="${k}varlik/js/site.js?v=${SURUM}" defer></script>`;
}

/* ---------- tam sayfa ---------- */
function sayfa(opt, govde) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
${kafa(opt)}
</head>
<body>
${ust(opt.yol, opt.aktif)}
<main id="ana">
${govde}
</main>
${alt(opt.yol)}
</body>
</html>`;
}

/* ---------- kart ---------- */
function cihazKart(c, yol = '') {
  const k = yol ? '../' : '';
  const y = icerik.yetkiler[c.yetki] || icerik.yetkiler.tibbi;
  const arama = aramaNorm(
    [c.ad, c.marka, c.oneCikan, ...(c.etiketler || []), c.kategoriAd, c.rozet, y.ad, c.neden].join(' ')
  );
  return `<a class="c-kart belir" data-cihaz data-k="${c.kategori}" data-y="${c.yetki}" data-arama="${kacis(arama)}" href="${k}cihaz/${c.slug}.html">
  <div class="c-kart-gor">
    ${c.rozet ? `<span class="c-kart-rozet">${kacis(c.rozet)}</span>` : ''}
    <img src="${k}varlik/gorsel/${c.kapak}" alt="${kacis(c.ad)} — ${kacis(c.marka)}" loading="lazy" width="400" height="300">
  </div>
  <div class="c-kart-govde">
    <span class="c-kart-marka">${kacis(c.marka)}</span>
    <h3>${kacis(c.ad)}</h3>
    <span class="c-kart-one">${kacis(c.oneCikan)}</span>
    <p>${kacis(c.neden)}</p>
    <div class="c-kart-etiket">${(c.etiketler || [])
      .slice(0, 3)
      .map((e) => `<span class="pul">${kacis(e)}</span>`)
      .join('')}</div>
  </div>
  <div class="c-kart-alt">
    <span class="yetki-pul" title="Bu cihazı bulundurabilecek işletme türü (ön bilgilendirme)">
      <span class="d" style="background:${y.renk}"></span>${y.kisa}</span>
    <span class="git">İncele ${ikon.ok}</span></div>
</a>`;
}

/* ---------- CTA ---------- */
function cta(yol = '', baslik, metin) {
  const k = yol ? '../' : '';
  /* bolum-cta: üst boşluk kısaltılmış. Normal .bolum kullanılınca önceki
     bölümün alt boşluğuyla üst üste binip ~240px ölü alan oluşuyordu. */
  return `<section class="bolum bolum-cta"><div class="kap"><div class="cta belir">
  <span class="ust-etiket" style="justify-content:center">Sonraki adım</span>
  <h2 style="margin-top:.9rem">${baslik}</h2>
  <p class="giris">${metin}</p>
  <div class="btn-grup">
    <a class="btn btn-ana btn-b" href="${k}iletisim.html">Teklif ve demo talebi ${ikon.ok}</a>
    <a class="btn btn-wa btn-b" href="https://wa.me/${iletisim.whatsappHam}" target="_blank" rel="noopener">${ikon.wa}WhatsApp'tan yazın</a>
  </div>
  <p class="sonuk" style="margin-top:1.3rem;font-size:.85rem">Ankara ve İstanbul ofislerimizden aynı gün dönüş yapılır.</p>
</div></div></section>`;
}

/* ---------- kırıntı ---------- */
function kirinti(yol, parcalar) {
  const k = yol ? '../' : '';
  return `<nav class="kirinti" aria-label="Site yolu"><a href="${k}index.html">Anasayfa</a>${parcalar
    .map((p) => `<span>/</span>${p.url ? `<a href="${k}${p.url}">${p.ad}</a>` : `<span style="opacity:1;color:var(--metin-2)">${p.ad}</span>`}`)
    .join('')}</nav>`;
}

module.exports = { SITE, kacis, aramaNorm, ikon, kafa, ust, alt, sayfa, cihazKart, cta, kirinti, KATEGORI_MENU, ANA_MENU, icerik, temaAyarla, T };
