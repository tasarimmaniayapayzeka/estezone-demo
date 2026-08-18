/* ============================================================================
   ESTEZONE — DİJİTAL PAZARLAMA SUNUMU
   veri/sunum-bolumler.json + kaynak/sunum/*.{mp4,webp} → site/sunum/index.html

   Neden ayrı üretici: sunum ana sitenin build'ine girmiyor. Ana site 4 temada
   üretiliyor ve müşteriye gösterilen ürün o; sunum ise TasarımMania'nın satış
   belgesi. Aynı build'e koyarsak her tema için 4 kopya çıkardı.

   Çalıştırma:  node sunum-yap.js
   ========================================================================== */
const fs = require('fs');
const path = require('path');

const KOK = __dirname;
const CIKTI = path.join(KOK, 'site', 'sunum');
const VARLIK = path.join(CIKTI, 'varlik');
const KAYNAK_SAHNE = path.join(KOK, 'kaynak', 'sunum');

const kacis = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------------------------------------------------------------------------
   HİKÂYE SAHNELERİ
   Altı sahne tek bir anlatı: sessiz showroom → alıcının arayışı → sitenin
   kurulması → görünürlük → hedefli reklam → canlanmış showroom.
   Son sahne ilk sahnenin aynı kamera hareketiyle kapanır.
   Video yoksa poster karesi tek başına gösterilir (kırılmaz).
--------------------------------------------------------------------------- */
const SAHNELER = {
  1: { baslik: 'Cihaz hazır, talep yok', metin: 'Yirmi yıllık portföy yerinde duruyor. Onu arayan alıcı, arama sonuçlarında bulamıyor.' },
  2: { baslik: 'Alıcı arıyor, sizi bulamıyor', metin: 'Klinik sahibi cihazı gece araştırıyor. Karşısına çıkan sayfa sizin değil.' },
  3: { baslik: 'Site yeniden kuruluyor', metin: 'Her cihazın kendi sayfası, kendi teklif yolu, kendi teknik künyesi olur.' },
  4: { baslik: 'Görünürlük', metin: 'İçerik dağınıklığı toplanır; sıralanan sayfa, teklif alınabilen sayfa olur.' },
  5: { baslik: 'Doğru kişiye reklam', metin: 'Hedefleme profesyonele kurulur. Bu bir kısıt değil, rakibin atlayamadığı bir kapı.' },
  6: { baslik: 'Sonuç', metin: 'Aynı showroom, aynı kamera açısı — bu kez ışıkları açık.' },
};

/* ---------------------------------------------------------------------------
   PAKETLER — fiyatlar BİLEREK BOŞ. Kullanıcı sonradan dolduracak.
--------------------------------------------------------------------------- */
const PAKETLER = [
  {
    id: 'web',
    etiket: 'Paket 01',
    ad: 'Web Sitesi Yenileme',
    ozet: 'Sıfırdan kurulan, teklif toplayan, mevzuata uygun kurumsal site.',
    vurgu: true,
    kalemler: [
      ['Bilgi mimarisi', 'Menü ve sayfa ağacı alıcı diliyle yeniden kurulur; kategori yapısı cihaz portföyüne göre tasarlanır'],
      ['28 cihaz sayfası', 'Tek şablon, tek veri kaynağı. Her sayfada teknik künye, işletme türü uygunluk rozeti, teklif formu ve cihaza özel WhatsApp bağlantısı'],
      ['4 karar aracı', 'Cihaz seçim danışmanı · yatırım geri dönüş hesaplayıcı · cihaz karşılaştırma · dalga boyu ve teknik matris'],
      ['Kurumsal sayfalar', 'Hakkımızda, teknik servis, kiralama ve 2. el, iletişim, blog'],
      ['AI cihaz asistanı', 'Portföyün tamamını bilir, sayfaya yönlendirir; fiyat vermez, teşhis koymaz'],
      ['Bayi girişi ve üyelik başvurusu', 'İşletme türüne göre değişen belge matrisi, onay akışı, panel'],
      ['Mevzuat süzgeci', 'Yasak ifadeler üretim sırasında otomatik süzülür; risk taşıyan metin yayına çıkmaz'],
      ['Performans ve güvenlik', 'Hafif ön yüz, güvenlik başlıkları, güncel çalışma zamanı, erişilebilirlik uyumu'],
      ['Ölçüm altyapısı', 'GA4, Search Console, dönüşüm izleme ve form kaynağı takibi kurulur'],
      ['Teslim', 'Kaynak kodu, yönetim dokümanı ve eğitim'],
    ],
    not: 'Bayi paneli ayrı bir aşamadır; kapsamı ve süresi ayrıca belirlenir.',
  },
  {
    id: 'seo',
    etiket: 'Paket 02',
    ad: 'SEO',
    ozet: 'Dağılmış içerik gücünü toplayıp teklif alınabilen sayfalara taşıma.',
    kalemler: [
      ['Teknik denetim', 'Taranabilirlik, dizine ekleme, sayfa hızı, yapısal veri ve kopya içerik taraması'],
      ['URL birleştirme ve 301 göçü', 'Birbirini yiyen içerik kümeleri tek güçlü sayfada toplanır; her eski adres kalıcı yönlendirmeyle korunur'],
      ['Ürün sayfası derinleştirme', 'İnce cihaz sayfaları teknik künye, karşılaştırma ve sık sorulanlarla güçlendirilir'],
      ['Yapısal veri', 'Ürün, sık sorulanlar ve site yolu işaretlemesi'],
      ['İç bağlantı mimarisi', 'Blog yazıları ilgili cihaz sayfalarına bağlanır; okuyucu teklif yoluna taşınır'],
      ['İçerik takvimi', 'Konu kümesi planı ve düzenli B2B yazı üretimi'],
      ['Yerel görünürlük', 'İşletme kaydı, künye tutarlılığı ve harita optimizasyonu'],
      ['Aylık raporlama', 'Sıralama, tıklama, form ve arama terimi raporu'],
    ],
    not: 'Sıralama garantisi verilmez. Hedefler ölçümle raporlanır.',
  },
  {
    id: 'ads',
    etiket: 'Paket 03',
    ad: 'Google Ads',
    ozet: 'Ölçülemeyen harcamayı, kaynağı belli talebe çevirme.',
    kalemler: [
      ['Dönüşüm izleme kurulumu', 'Hangi aramanın hangi teklifi getirdiği ölçülebilir hale gelir'],
      ['Kampanya mimarisi', 'Cihaz ve kategori bazlı yapı; marka ve jenerik aramalar ayrılır'],
      ['Profesyonel hedefleme', 'Tıbbi cihaz tanıtımı sağlık meslek mensuplarına yöneliktir; hedefleme ve metin buna göre kurulur'],
      ['Arama terimi hijyeni', 'Negatif kelime listesi ve düzenli terim temizliği'],
      ['İniş sayfası eşleşmesi', 'Her kampanya, formu olan doğru cihaz sayfasına iner'],
      ['Reklam metni ve varlıklar', 'Mevzuata uygun metin seti; yasak ifade kullanılmaz'],
      ['Aylık optimizasyon', 'Teklif, bütçe ve kreatif düzenlemesi'],
      ['Raporlama', 'Harcama, form, maliyet ve arama terimi raporu'],
    ],
    not: 'Reklam bütçesi bu pakete dahil değildir; platforma ayrıca ödenir.',
  },
  {
    id: 'meta',
    etiket: 'Paket 04',
    ad: 'Meta Reklamları & YouTube',
    ozet: 'Aramayan alıcıya ulaşmak ve cihazı çalışırken göstermek.',
    kalemler: [
      ['Meta kurulumu', 'Piksel, dönüşüm API’si ve olay eşleştirmesi'],
      ['Kitle mimarisi', 'İşletme sahibi hedefleme, site ziyaretçisi yeniden hedefleme'],
      ['Kreatif hattı', 'Video, karusel ve tek görsel setleri; cihaz kategorisine göre üretim'],
      ['WhatsApp akışı', 'Reklamdan doğrudan yazışmaya geçiş'],
      ['YouTube kanal kurulumu', 'Kanal kimliği, oynatma listeleri, açıklama ve etiket düzeni'],
      ['Video içerik hattı', 'Cihaz tanıtımı, kurulum ve eğitim, teknik servis anlatımı'],
      ['Video optimizasyonu', 'Başlık, küçük resim ve açıklama düzeni'],
      ['Aylık raporlama', 'Erişim, etkileşim, form ve yazışma raporu'],
    ],
    not: 'Özel kitle oluşturmak için müşteri listesi kullanılacaksa KVKK aydınlatma ve açık rıza koşulu aranır.',
  },
];

/* ---------------------------------------------------------------------------
   BLOK ÇİZİCİLER
--------------------------------------------------------------------------- */
const cizOlcum = (b) => `
  ${b.baslik ? `<span class="blok-baslik">${kacis(b.baslik)}</span>` : ''}
  <div class="olcum-izgara">
    ${(b.olcumler || [])
      .map(
        (o) => `<div class="olcum ${o.durum ? 'olcum--' + o.durum : ''}">
      <b>${kacis(o.deger)}</b>
      <span class="olcum-etiket">${kacis(o.etiket)}</span>
      ${o.aciklama ? `<p>${kacis(o.aciklama)}</p>` : ''}
    </div>`
      )
      .join('')}
  </div>`;

const cizTablo = (b) => `
  ${b.baslik ? `<span class="blok-baslik">${kacis(b.baslik)}</span>` : ''}
  <div class="tablo-sar"><table>
    <thead><tr>${(b.sutunlar || []).map((s) => `<th>${kacis(s)}</th>`).join('')}</tr></thead>
    <tbody>${(b.satirlar || [])
      .map((r) => `<tr>${r.map((h) => `<td>${kacis(h)}</td>`).join('')}</tr>`)
      .join('')}</tbody>
  </table></div>`;

const cizBlok = (b) => {
  if (b.tip === 'paragraf') return `<p>${kacis(b.metin || '')}</p>`;
  if (b.tip === 'kutu')
    return `<div class="kutu">${b.baslik ? `<h4>${kacis(b.baslik)}</h4>` : ''}<p>${kacis(b.metin || '')}</p></div>`;
  if (b.tip === 'liste')
    return `${b.baslik ? `<span class="blok-baslik">${kacis(b.baslik)}</span>` : ''}
      <ul class="madde">${(b.maddeler || []).map((m) => `<li>${kacis(m)}</li>`).join('')}</ul>`;
  if (b.tip === 'tablo') return cizTablo(b);
  if (b.tip === 'olcum') return cizOlcum(b);
  return '';
};

/* Sahne: video varsa video, yoksa poster karesi. Her ikisi de yoksa hiç basma. */
const cizSahne = (n) => {
  const s = SAHNELER[n];
  const videoVar = fs.existsSync(path.join(KAYNAK_SAHNE, `sahne-${n}.mp4`));
  const kareVar = fs.existsSync(path.join(KAYNAK_SAHNE, `sahne-${n}.webp`));
  if (!kareVar) return '';
  return `<figure class="sahne" data-sahne="${n}">
    ${
      videoVar
        ? `<video src="varlik/sahne-${n}.mp4" poster="varlik/sahne-${n}.webp"
             muted playsinline loop preload="none" aria-label="${kacis(s.baslik)}"></video>`
        : `<img src="varlik/sahne-${n}.webp" alt="${kacis(s.baslik)}" loading="lazy">`
    }
    <figcaption><b>${kacis(s.baslik)}</b><span>${kacis(s.metin)}</span></figcaption>
  </figure>`;
};

/* ---------------------------------------------------------------------------
   ÜRETİM
--------------------------------------------------------------------------- */
const bolumler = JSON.parse(fs.readFileSync(path.join(KOK, 'veri', 'sunum-bolumler.json'), 'utf8'));

/* Hangi bölümden sonra hangi sahne gelecek — anlatı sırası. */
const SAHNE_YERI = {
  neredesiniz: 1,
  'donusum-yolu-yok': 2,
  'yenilersen-ne-degisir': 3,
  'seo-ne-yapilacak': 4,
  'meta-reklamlari': 5,
  'nasil-calisiriz': 6,
};

const govde = bolumler
  .map((b, i) => {
    const sahne = SAHNE_YERI[b.id] ? cizSahne(SAHNE_YERI[b.id]) : '';
    return `<section class="bolum belir" id="${kacis(b.id)}">
  <div class="kap">
    <span class="ust-etiket">${kacis(b.ustEtiket)}</span>
    <h2>${kacis(b.baslik)}</h2>
    <p class="giris">${kacis(b.giris)}</p>
    <div class="icerik">${b.govde.map(cizBlok).join('\n')}</div>
    ${sahne}
  </div>
</section>`;
  })
  .join('\n');

const paketler = `<section class="bolum bolum-paket belir" id="paketler">
  <div class="kap">
    <span class="ust-etiket">Teklif</span>
    <h2>Paketler</h2>
    <p class="giris">Dört paket ayrı ayrı ya da birlikte alınabilir. Kapsam aşağıda kalem kalem
      yazılıdır; bedel görüşmede netleşir.</p>
    <div class="paket-izgara">
      ${PAKETLER.map(
        (p) => `<article class="paket${p.vurgu ? ' paket--one' : ''}">
        <span class="paket-etiket">${kacis(p.etiket)}</span>
        <h3>${kacis(p.ad)}</h3>
        <p class="paket-ozet">${kacis(p.ozet)}</p>
        <div class="paket-fiyat">
          <span class="paket-fiyat-etiket">Bedel</span>
          <div class="paket-fiyat-alan" data-fiyat="${p.id}">&nbsp;</div>
        </div>
        <ul class="paket-kalem">
          ${p.kalemler.map(([a, b2]) => `<li><b>${kacis(a)}</b><span>${kacis(b2)}</span></li>`).join('')}
        </ul>
        ${p.not ? `<p class="paket-not">${kacis(p.not)}</p>` : ''}
      </article>`
      ).join('')}
    </div>
  </div>
</section>`;

const html = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Estezone Medikal — Dijital Pazarlama Önerisi | TasarımMania</title>
<meta name="description" content="estezone.com.tr'nin ölçülmüş mevcut durumu, yenileme önerisi, SEO, Google Ads, Meta reklamları ve YouTube planı; 1., 3. ve 6. ay hedefleriyle.">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;550;600;650&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="varlik/sunum.css">
<link rel="icon" type="image/png" href="../varlik/gorsel/logo-favicon.png">

<div class="ilerleme" data-ilerleme></div>

<header class="kapak">
  <div class="kap">
    <img class="kapak-logo" src="../varlik/gorsel/logo-estezone-beyaz.webp" alt="Estezone Medikal" width="180" height="44">
    <span class="ust-etiket">TasarımMania · Dijital Pazarlama Önerisi</span>
    <h1>Site ayakta.<br>Satış yolu kapalı.</h1>
    <p class="giris">estezone.com.tr 16 Ağustos 2026'da baştan sona ölçüldü. Bu belge ölçümü,
      ölçümün ticari karşılığını ve kapatma planını sırayla anlatıyor.</p>
    <div class="kapak-alt">
      <a class="btn" href="#neredesiniz">Ölçümle başla</a>
      <a class="btn btn-sade" href="#paketler">Paketlere geç</a>
    </div>
  </div>
</header>

<nav class="serit" aria-label="Bölümler">
  <div class="kap serit-ic">
    ${bolumler.map((b) => `<a href="#${kacis(b.id)}">${kacis(b.baslik)}</a>`).join('')}
    <a href="#paketler">Paketler</a>
  </div>
</nav>

<main>
${govde}
${paketler}
</main>

<footer class="dip">
  <div class="kap">
    <p><b>TasarımMania</b> · Estezone Medikal için hazırlanmıştır.</p>
    <p class="sonuk">Bu belgedeki ölçümler 16 Ağustos 2026 tarihinde alınmıştır. Hedefler
      hedeftir, taahhüt değildir. Cihaz görselleri ve site örnekleri TasarımMania tarafından
      hazırlanan tasarım demosuna aittir.</p>
  </div>
</footer>

<script src="varlik/sunum.js" defer></script>
`;

/* ---- yaz ---- */
fs.mkdirSync(VARLIK, { recursive: true });
fs.writeFileSync(path.join(CIKTI, 'index.html'), html, 'utf8');

/* sahne varlıklarını kopyala */
let n = 0;
fs.readdirSync(KAYNAK_SAHNE).forEach((f) => {
  fs.copyFileSync(path.join(KAYNAK_SAHNE, f), path.join(VARLIK, f));
  n++;
});

/* css + js kaynaktan */
['sunum.css', 'sunum.js'].forEach((f) => {
  fs.copyFileSync(path.join(KOK, 'sablon', f), path.join(VARLIK, f));
});

console.log(`✓ sunum/index.html  (${bolumler.length} bölüm + ${PAKETLER.length} paket)`);
console.log(`✓ ${n} sahne varlığı + css/js kopyalandı`);
console.log(`→ ${CIKTI}`);
