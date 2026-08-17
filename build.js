/* Estezone Medikal — statik site üreticisi
   node build.js  ->  site/ klasörüne 45+ sayfa üretir */
const fs = require('fs');
const path = require('path');
const P = require('./sablon/parcalar.js');
const { kacis, ikon, sayfa, cihazKart, cta, kirinti, KATEGORI_MENU, SITE } = P;
const icerik = require('./veri/icerik.js');

// cihaz-meta.js veya ham veri değiştiyse cihazlar.json'u tazele
require('child_process').execFileSync(process.execPath, [path.join(__dirname, 'veri/birlestir.js')], {
  stdio: 'ignore',
});
const veri = require('./veri/cihazlar.json');

const mevzuat = require('./sablon/mevzuat.js');

const { marka, iletisim, guven, servisler, surec, farklar, sss, yasal } = icerik;
// Kaynak siteden gelen tüm cihaz metinleri mevzuat süzgecinden geçer (bkz. sablon/mevzuat.js)
// + her cihaza işletme türü yetkisi eklenir (ön sınıflandırma, teyide tabi)
const cihazlar = veri.cihazlar
  .map(mevzuat.cihazTemizle)
  .map((c) => ({ ...c, yetki: icerik.cihazYetkisi(c.slug, c.kategori) }));
const kategoriler = veri.kategoriler;

/* tema: `node build.js` -> koyu (v1)   ·   `node build.js acik` -> açık (v2) */
const GECERLI = ['koyu', 'acik', 'v3', 'v4'];
const TEMA = GECERLI.includes(process.argv[2]) ? process.argv[2] : 'koyu';
P.temaAyarla(TEMA);

const ALT_KLASOR = { koyu: '', acik: 'v2', v3: 'v3', v4: 'v4' }[TEMA];

const KOK = __dirname;
const CIKTI = ALT_KLASOR ? path.join(KOK, 'site', ALT_KLASOR) : path.join(KOK, 'site');

let yazilan = 0;
function yaz(gorece, html) {
  const tam = path.join(CIKTI, gorece);
  fs.mkdirSync(path.dirname(tam), { recursive: true });
  fs.writeFileSync(tam, html, 'utf8');
  yazilan++;
}

/* ======================= 1. ANASAYFA ======================= */
function anasayfa() {
  const kahraman = cihazlar.find((c) => c.slug === 't-shape-2');
  /* Bento vitrini: kahraman (T-Shape 2) YATAY geniş kart (2 kolon × 1 satır,
     görsel solda / metin sağda) + dört kategoriyi temsil eden 4 kart.
     3×2 ızgaraya 5 kart tam oturur — boş hücre imkânsız.
     Not: 2×2 dikey kahraman denendi; görsel dev boşlukta yüzdü, geri alındı. */
  const bentoVitrin = [
    'arion-alexandrite-lazer', // epilasyon
    'cotra-plus-co2', // cilt
    'esteslim-zayiflama-cihazi', // vücut (beyaz zeminli fotoğraf; EsteSculpt Pro'nunki koyu metalikti)
    'zimmer-cryo-6-cilt-sogutma-sistemi', // destek
  ].map((s) => cihazlar.find((c) => c.slug === s));

  const sema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: marka.ad,
    url: SITE,
    description: marka.aciklama,
    telephone: iletisim.telefon,
    email: iletisim.eposta,
    address: iletisim.ofisler.map((o) => ({
      '@type': 'PostalAddress',
      streetAddress: o.adres,
      addressCountry: 'TR',
    })),
    sameAs: iletisim.sosyal.map((s) => s.url),
  };

  const govde = `
<section class="hero">
  <div class="hero-fon"></div><div class="hero-izgara"></div>
  <div class="kap">
    <div class="hero-ic">
      <div>
        <span class="ust-etiket">CE belgeli profesyonel platformlar</span>
        <h1>Lazer teknolojisinde <em>20 yıllık mühendislik</em></h1>
        <p class="giris">Estezone Medikal; hastane, klinik ve medikal estetik merkezlerine epilasyon, cilt ve
          vücut şekillendirme platformları tedarik eder. Cihazı satıp çekilmez — <strong style="color:var(--metin)">kendi
          teknik servis atölyesinde</strong> ayakta tutar.</p>
        <div class="btn-grup">
          <a class="btn btn-ana btn-b" href="cihazlar.html">28 cihazı inceleyin ${ikon.ok}</a>
          <a class="btn btn-hat btn-b" href="cihaz-secim-danismani.html">Hangi cihaz bana uygun?</a>
        </div>
        <div class="guven">${guven
          .map((g) => `<div><div class="s">${g.sayi}</div><div class="e">${g.etiket}</div></div>`)
          .join('')}</div>
      </div>
      <div class="hero-gorsel belir">
        <span class="hero-rozet hero-rozet--sag"><span class="e">FDA 510(k)</span><span class="d">K231092</span></span>
        <img src="varlik/gorsel/${kahraman.kapak}" alt="${kacis(kahraman.ad)} — profesyonel estetik platform" width="640" height="540" fetchpriority="high">
        <span class="hero-rozet hero-rozet--sol"><span class="e">Vitrin cihaz</span><span class="d">${kacis(kahraman.ad)}</span></span>
      </div>
    </div>
  </div>
</section>

<section class="bolum dokulu">
  <div class="kap">
    <div class="bolum-basi">
      <span class="ust-etiket">Portföy</span>
      <h2>Dört ana hat, yirmi sekiz platform</h2>
      <p class="giris">Her hat farklı bir gelir kalemi açar. İşletmenizin bugünkü hacmine göre başlayıp,
        talep büyüdükçe aynı tedarikçiyle genişleyebilirsiniz.</p>
    </div>
    <div class="izgara izgara-4">
      ${KATEGORI_MENU.map(([sl, k, ad]) => {
        const kt = kategoriler[k];
        const n = cihazlar.filter((c) => c.kategori === k).length;
        return `<a class="kart belir" data-k="${k}" href="kategori/${sl}.html" style="border-top:2px solid var(--k-${k})">
          <span class="mono" style="font-size:.72rem;letter-spacing:.14em;color:var(--k-${k})">${String(n).padStart(2, '0')} CİHAZ</span>
          <h3 style="margin-top:.7rem">${ad}</h3>
          <p>${kt.ozet}</p>
          <span class="btn btn-sade" style="margin-top:1rem;font-size:.87rem">Hattı gör ${ikon.ok}</span>
        </a>`;
      }).join('')}
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bolum-basi">
      <span class="ust-etiket">Öne çıkanlar</span>
      <h2>Farklı ölçekler için seçilmiş altı platform</h2>
      <p class="giris">Küçük salondan hastaneye kadar değişen ihtiyaçlara karşılık gelen sistemler.
        Tamamı CE belgeli, tamamı kendi teknik servisimizin kapsamında.</p>
    </div>
    <div class="bento">
      <a class="c-kart c-kart--kahraman belir" data-k="${kahraman.kategori}" href="cihaz/${kahraman.slug}.html">
        <div class="c-kart-gor">
          <span class="c-kart-rozet">${kacis(kahraman.rozet)}</span>
          <img src="varlik/gorsel/${kahraman.kapak}" alt="${kacis(kahraman.ad)} — ${kacis(kahraman.marka)}" width="640" height="640" loading="lazy">
        </div>
        <div class="c-kart-govde">
          <span class="c-kart-marka">${kacis(kahraman.marka)} · Amiral gemisi</span>
          <h3>${kacis(kahraman.ad)}</h3>
          <span class="c-kart-one">${kacis(kahraman.oneCikan)}</span>
          <p>${kacis(kahraman.neden)}</p>
          <div class="c-kart-etiket">${(kahraman.etiketler || [])
            .map((e) => `<span class="pul">${kacis(e)}</span>`)
            .join('')}</div>
        </div>
        <div class="c-kart-alt">
          <span class="yetki-pul"><span class="d" style="background:${icerik.yetkiler[kahraman.yetki].renk}"></span>${icerik.yetkiler[kahraman.yetki].kisa}</span>
          <span class="git">İncele ${ikon.ok}</span></div>
      </a>
      ${bentoVitrin.map((c) => cihazKart(c)).join('')}
    </div>
    <div class="orta" style="margin-top:2.4rem">
      <a class="btn btn-hat btn-b" href="cihazlar.html">28 cihazın tamamını görün ${ikon.ok}</a>
    </div>
  </div>
</section>

<section class="bolum dokulu">
  <div class="kap">
    <div class="bolum-basi">
      <span class="ust-etiket">Neden Estezone</span>
      <h2>Cihaz satmak kolay. Onu 8 yıl çalışır tutmak zor.</h2>
      <p class="giris">Estetik cihaz yatırımının gerçek maliyeti satın alma bedeli değil, duran gün sayısıdır.
        Bu yüzden işimizin merkezinde servis var.</p>
    </div>
    <div class="izgara izgara-2">
      ${farklar
        .map(
          (f) => `<div class="kart belir">
        <span style="display:grid;place-items:center;width:44px;height:44px;border-radius:11px;background:var(--vurgu-sis);border:1px solid rgba(45,212,245,.24);color:var(--vurgu);margin-bottom:1.1rem">
          <span style="width:21px;height:21px;display:block">${ikon[f.ikon] || ikon.rozet}</span></span>
        <h3>${f.baslik}</h3><p>${f.metin}</p></div>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bolum-basi bolum-basi--orta">
      <span class="ust-etiket">Satın alma süreci</span>
      <h2>Beş adımda net bir yol</h2>
      <p class="giris">Yüksek bedelli bir yatırımda sürpriz olmamalı. Her adımda ne olacağını baştan biliyorsunuz.</p>
    </div>
    <div class="surec belir">${surec
      .map(
        (s, i) => `<div class="surec-ad">
        <span class="surec-ikon"><img src="varlik/gorsel/ikon3d-surec-0${i + 1}.webp" alt="" width="72" height="72" loading="lazy"></span>
        <span class="no">${s.no}</span><h4>${s.ad}</h4><p>${s.metin}</p></div>`
      )
      .join('')}</div>
  </div>
</section>

<section class="bolum dokulu">
  <div class="kap">
    <div class="izgara izgara-2" style="gap:2.4rem;align-items:center">
      <div>
        <span class="ust-etiket">Karar araçları</span>
        <h2 style="margin-top:.9rem">Tahminle değil, hesapla karar verin</h2>
        <p class="giris" style="margin-top:1.1rem">Cihaz seçimi ve yatırım kararı için üç ücretsiz araç hazırladık.
          Hiçbiri kayıt istemez, sonucu anında görürsünüz.</p>
        <div class="btn-grup" style="margin-top:1.8rem">
          <a class="btn btn-ana" href="cihaz-secim-danismani.html">Seçim danışmanını başlat ${ikon.ok}</a>
        </div>
      </div>
      <div class="izgara" style="gap:.9rem">
        ${[
          ['cihaz-secim-danismani.html', 'Cihaz Seçim Danışmanı', '4 soruyla işletmenize uygun üç platformu önerir.', 'epilasyon'],
          ['yatirim-hesaplayici.html', 'Yatırım Geri Dönüş Hesabı', 'Seans fiyatı ve hasta sayısından geri dönüş süresini çıkarır.', 'vucut'],
          ['karsilastir.html', 'Cihaz Karşılaştırma', 'Üç cihazı teknik olarak yan yana koyar.', 'cilt'],
        ]
          .map(
            ([u, ad, ac, k]) => `<a class="kart belir" href="${u}" data-k="${k}"
          style="display:flex;gap:1rem;align-items:flex-start;padding:1.25rem">
          <span style="width:9px;height:9px;border-radius:50%;background:var(--k-${k});margin-top:.55rem;flex:none;box-shadow:0 0 12px var(--k-${k})"></span>
          <span><strong style="display:block;font-size:1.02rem;font-weight:580">${ad}</strong>
          <span class="sonuk" style="font-size:.885rem;display:block;margin-top:.25rem;line-height:1.55">${ac}</span></span></a>`
          )
          .join('')}
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    <div class="bolum-basi">
      <span class="ust-etiket">Teknik servis</span>
      <h2>Sekiz kalemde kendi atölyemizde onarım</h2>
      <p class="giris">Flash lambadan fiber optiğe, güç kaynağından soğutma devresine kadar.
        Bizden almadığınız cihazlar için de.</p>
    </div>
    <!-- 4×2 sabit ızgara: 8 kalem her genişlikte tam satır doldurur, boş hücre kalmaz.
         Her kalemin Higgsfield ile üretilmiş 3D ikonu var (ikon3d-<slug>.webp). -->
    <div class="servis-izgara">
      ${servisler
        .map(
          (s) => `<div class="servis-kart belir">
        <span class="servis-ikon"><img src="varlik/gorsel/ikon3d-${s.slug}.webp" alt="" width="76" height="76" loading="lazy"></span>
        <h4>${s.ad}</h4><p>${s.ozet}</p></div>`
        )
        .join('')}
    </div>
    <div class="orta" style="margin-top:2.2rem">
      <a class="btn btn-hat" href="teknik-servis.html">Teknik servis detayları ${ikon.ok}</a>
    </div>
  </div>
</section>

<!-- SAYFA FİNALİ: SSS + çağrı tek bölümde.
     Eskiden dar akordiyon + ayrı CTA kutusu alt alta yüzüyor, geniş ekranda
     koca boşlukta iki küçük kutu gibi kalıyordu. Şimdi: solda sabit çağrı
     kartı, sağda akordiyon — tam genişlik, tek tasarlanmış kapanış. -->
<section class="bolum dokulu bolum-son">
  <div class="kap">
    <div class="sss-duzen">
      <div class="sss-sol belir">
        <span class="ust-etiket">Sık sorulanlar</span>
        <h2 style="margin-top:.85rem">Karar öncesi en çok sorulanlar</h2>
        <p class="giris" style="margin-top:1rem">Altı soruda; fiyatlama mantığımız, demo süreci,
          kiralama ve servis kapsamı. Cevabını bulamadığınız konu için yandaki kanallardan ulaşın.</p>
        <div class="sss-kart">
          <b>Cihazınızı seçelim, rakamları konuşalım</b>
          <p>Envanterinizi ve hedef hacminizi paylaşın; uygun platformu sarf ve servis
            kalemleriyle birlikte tek teklifte çıkaralım.</p>
          <div class="sss-kart-btnler">
            <a class="btn btn-ana" href="iletisim.html">Teklif ve demo talebi</a>
            <a class="btn btn-wa" href="https://wa.me/${iletisim.whatsappHam}" target="_blank" rel="noopener">${ikon.wa}WhatsApp'tan yazın</a>
          </div>
          <a class="sss-tel" href="tel:${iletisim.telefonHam}">${ikon.tel}<span>${iletisim.telefon}</span></a>
          <small>Ankara ve İstanbul ofislerimizden aynı gün dönüş yapılır.</small>
        </div>
      </div>
      <div class="akordiyon belir">
        ${sss
          .map(
            (f, i) =>
              `<details${i === 0 ? ' open' : ''}><summary>${f.s}</summary><div class="cevap">${f.c}</div></details>`
          )
          .join('')}
      </div>
    </div>
  </div>
</section>`;

  yaz(
    'index.html',
    sayfa(
      {
        baslik: 'Estezone Medikal — Lazer Epilasyon ve Estetik Cihaz Tedarikçisi',
        aciklama:
          'Hastane, klinik ve medikal estetik merkezlerine lazer epilasyon, cilt ve vücut şekillendirme cihazı tedariki. 20 yıllık tecrübe, kendi teknik servis atölyesi, Ankara ve İstanbul ofisleri.',
        aktif: 'index.html',
        gorsel: `varlik/gorsel/${kahraman.kapak}`,
        sema,
      },
      govde
    )
  );
}

/* ======================= 2. CİHAZ LİSTESİ ======================= */
function cihazListesi() {
  const govde = `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Cihazlar' }])}
  <span class="ust-etiket" style="margin-top:1rem">Tüm portföy</span>
  <h1>28 cihaz platformu</h1>
  <p class="giris">Kategoriye göre süzün, marka veya teknoloji arayın. Her cihazın teknik künyesi,
    kimin için uygun olduğu ve neden tercih edildiği ayrı ayrı yazıldı.</p>
</div></section>

<div class="filtre" data-filtre><div class="kap filtre-ic">
  <div class="filtre-grup">
    <button class="f-dug" data-k-filtre="hepsi" aria-pressed="true">Hepsi <span class="n">${cihazlar.length}</span></button>
    ${KATEGORI_MENU.map(([, k, ad]) => {
      const n = cihazlar.filter((c) => c.kategori === k).length;
      return `<button class="f-dug" data-k-filtre="${k}" aria-pressed="false" style="--kr:var(--k-${k})"><span class="p"></span>${ad} <span class="n">${n}</span></button>`;
    }).join('')}
  </div>
  <div class="f-ara">${ikon.ara}<input type="search" data-ara placeholder="Cihaz, marka veya teknoloji arayın…" aria-label="Cihaz ara"></div>
  <span class="f-sonuc" data-sonuc-sayi>${cihazlar.length} cihaz</span>
</div>
<div class="kap" style="padding-top:.7rem;border-top:1px dashed var(--kenar);margin-top:.75rem">
  <div class="filtre-ic">
    <span class="f-sonuc" style="color:var(--metin-2)">İşletme türüm:</span>
    <div class="filtre-grup">
      <button class="f-dug" data-y-filtre="hepsi" aria-pressed="true">Fark etmez</button>
      ${Object.entries(icerik.yetkiler)
        .map(
          ([k, y]) =>
            `<button class="f-dug" data-y-filtre="${k}" aria-pressed="false" style="--kr:${y.renk}"><span class="p"></span>${y.ad}</button>`
        )
        .join('')}
    </div>
    <span class="f-sonuc" style="flex:1;min-width:220px;color:var(--metin-3)">Ön bilgilendirmedir; kesin yetki ÜTS kaydı ve ruhsat tipiyle teyit edilir.</span>
  </div>
</div></div>

<section style="padding-bottom:clamp(3rem,6vw,5rem)"><div class="kap">
  <div class="izgara izgara-3">${cihazlar.map((c) => cihazKart(c)).join('')}</div>
  <div class="bos-durum gizli" data-bos>
    <h3>Aradığınız kriterde cihaz bulunamadı</h3>
    <p class="giris" style="margin:.8rem auto 1.6rem">Filtreyi genişletin ya da doğrudan bize sorun —
      portföyde olmayan bir platform için de tedarik yapabiliriz.</p>
    <a class="btn btn-ana" href="iletisim.html">Bize sorun ${ikon.ok}</a>
  </div>
</div></section>

${cta('', 'Hangisinin size uyduğundan emin değil misiniz?', 'Dört soruluk seçim danışmanımız işletme ölçeğinize ve hedef tedavi menünüze göre üç platform önerir.')}`;

  yaz(
    'cihazlar.html',
    sayfa(
      {
        baslik: 'Tüm Cihazlar — Estezone Medikal',
        aciklama:
          'Lazer epilasyon, cilt, medikal estetik ve vücut şekillendirme kategorilerinde 28 profesyonel cihaz platformu. Teknik künye ve karşılaştırma.',
        aktif: 'cihazlar.html',
        kanonik: 'cihazlar.html',
      },
      govde
    )
  );
}

/* ======================= 3. KATEGORİ SAYFALARI ======================= */
function kategoriSayfalari() {
  KATEGORI_MENU.forEach(([sl, k, ad]) => {
    const kt = kategoriler[k];
    const liste = cihazlar.filter((c) => c.kategori === k);
    const govde = `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('kategori', [{ ad: 'Cihazlar', url: 'cihazlar.html' }, { ad }])}
  <span class="ust-etiket" style="margin-top:1rem;color:var(--k-${k})">${liste.length} platform</span>
  <h1>${kt.ad}</h1>
  <p class="giris">${kt.ozet}</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="izgara izgara-3">${liste.map((c) => cihazKart(c, 'kategori')).join('')}</div>
</div></section>

<section class="bolum-dar"><div class="kap">
  <div class="izgara izgara-3">
    ${KATEGORI_MENU.filter(([, kk]) => kk !== k)
      .map(
        ([s2, k2, a2]) =>
          `<a class="kart belir" href="${s2}.html" style="border-top:2px solid var(--k-${k2})">
        <span class="mono" style="font-size:.72rem;letter-spacing:.14em;color:var(--k-${k2})">DİĞER HAT</span>
        <h3 style="margin-top:.6rem;font-size:1.15rem">${a2}</h3>
        <p>${kategoriler[k2].ozet}</p></a>`
      )
      .join('')}
  </div>
</div></section>

${cta('kategori', `${kt.kisa} hattında doğru cihazı birlikte seçelim`, 'Hedef hasta profilinizi ve günlük seans hacminizi paylaşın; bu hattaki hangi platformun size uyduğunu net söyleyelim.')}`;

    yaz(
      `kategori/${sl}.html`,
      sayfa(
        {
          baslik: `${kt.ad} — Estezone Medikal`,
          aciklama: kt.ozet,
          yol: 'kategori',
          aktif: 'cihazlar.html',
          kanonik: `kategori/${sl}.html`,
        },
        govde
      )
    );
  });
}

/* ======================= 4. CİHAZ DETAY ======================= */
function cihazSayfalari() {
  cihazlar.forEach((c) => {
    const digerleri = cihazlar.filter((x) => x.kategori === c.kategori && x.slug !== c.slug).slice(0, 3);
    const katSlug = KATEGORI_MENU.find(([, k]) => k === c.kategori)[0];

    const sema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: c.ad,
      brand: { '@type': 'Brand', name: c.marka },
      category: c.kategoriAd,
      description: c.ozet,
      image: `${SITE}/varlik/gorsel/${c.kapak}`,
      additionalProperty: c.spec.slice(0, 12).map((s) => ({
        '@type': 'PropertyValue',
        name: s.ad,
        value: s.deger,
      })),
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'TRY',
        seller: { '@type': 'Organization', name: marka.ad },
      },
    };

    const govde = `
<div class="kap">${kirinti('cihaz', [
      { ad: 'Cihazlar', url: 'cihazlar.html' },
      { ad: c.kategoriAd, url: `kategori/${katSlug}.html` },
      { ad: c.ad },
    ])}</div>

<section><div class="kap cd-ust">
  <div class="cd-galeri" data-galeri>
    <div class="cd-ana-gor">
      <img src="../varlik/gorsel/${c.kapak}" alt="${kacis(c.ad)}" data-ana-gorsel width="620" height="620" fetchpriority="high">
    </div>
    ${
      c.gorseller.length > 1
        ? `<div class="cd-kucuk">${c.gorseller
            .slice(0, 6)
            .map(
              (g, i) =>
                `<button data-kucuk="../varlik/gorsel/${g}" aria-current="${i === 0}" aria-label="Görsel ${i + 1}"><img src="../varlik/gorsel/${g}" alt="" loading="lazy" width="60" height="60"></button>`
            )
            .join('')}</div>`
        : ''
    }
  </div>

  <div class="cd-bilgi">
    <span class="cd-marka">${kacis(c.marka)} · ${kacis(c.kategoriAd)}</span>
    <h1>${kacis(c.ad)}</h1>
    <div class="cd-rozetler">
      ${c.rozet ? `<span class="rozet-one">${ikon.rozet}${kacis(c.rozet)}</span>` : ''}
      ${(c.etiketler || []).map((e) => `<span class="pul">${kacis(e)}</span>`).join('')}
    </div>
    <p class="cd-ozet">${kacis(c.ozet)}</p>
    <div class="cd-neden"><b>Neden bu cihaz</b>${kacis(c.neden)}</div>
    <div class="cd-hedef">${ikon.hedef}<span><strong style="color:var(--metin)">Kimin için:</strong> ${kacis(c.hedef)}</span></div>
    ${(() => {
      const y = icerik.yetkiler[c.yetki];
      return `<div class="yetki-kutu">
      <span class="im" style="background:${y.renk}"></span>
      <div><b>Bulundurma yetkisi: ${y.ad}</b>
        <p>${y.aciklama}</p>
        <small>Bu bir ön bilgilendirmedir. Kesin durum; cihazın kullanım amacı beyanı, ÜTS kaydınız ve
        işletmenizin ruhsat tipiyle birlikte değerlendirilir. Teklif aşamasında birlikte teyit ederiz.</small>
      </div></div>`;
    })()}
    <div class="cd-eylem">
      <a class="btn btn-ana btn-b" href="../iletisim.html?cihaz=${c.slug}">Bu cihaz için teklif alın ${ikon.ok}</a>
      <a class="btn btn-wa" href="https://wa.me/${iletisim.whatsappHam}?text=${encodeURIComponent(c.ad + ' hakkında bilgi almak istiyorum.')}" target="_blank" rel="noopener">${ikon.wa}WhatsApp</a>
    </div>
    <p class="sonuk" style="font-size:.83rem;margin-top:1rem">Demo talebi, kurulum koşulları ve finansman seçenekleri için arayın: <a href="tel:${iletisim.telefonHam}" style="color:var(--vurgu)">${iletisim.telefon}</a></p>
  </div>
</div></section>

<section class="bolum-dar"><div class="kap">
  <div class="sekme-bar" data-sekme-bar>
    <button data-hedef="genel" aria-selected="true">Genel bakış</button>
    ${c.spec.length ? '<button data-hedef="teknik" aria-selected="false">Teknik künye</button>' : ''}
    ${c.ozellikler.length ? '<button data-hedef="ozellik" aria-selected="false">Özellikler</button>' : ''}
    <button data-hedef="servis" aria-selected="false">Servis &amp; garanti</button>
  </div>

  <div class="sekme-icerik">
    <div data-sekme="genel">
      <div class="izgara izgara-2" style="gap:2.4rem;align-items:start">
        <div>
          ${(c.aciklama.length ? c.aciklama : [c.ozet])
            .map((p) => `<p class="giris" style="margin-bottom:1.05rem;max-width:none">${kacis(p)}</p>`)
            .join('')}
        </div>
        <div class="arac">
          <h3 style="font-size:1.1rem">Künye</h3>
          <div style="margin-top:1.1rem;display:grid;gap:.7rem">
            ${[
              ['Marka', c.marka],
              ['Kategori', c.kategoriAd],
              ['Öne çıkan', c.oneCikan],
              ['Konum', c.rozet || '—'],
            ]
              .map(
                ([a, b]) =>
                  `<div class="sonuc-satir"><span class="e">${a}</span><span class="d" style="font-size:.95rem">${kacis(b)}</span></div>`
              )
              .join('')}
          </div>
          <a class="btn btn-hat btn-k" style="margin-top:1.2rem;width:100%" href="../karsilastir.html">Başka cihazla karşılaştır</a>
        </div>
      </div>
      ${
        c.bolumler.length
          ? `<div style="margin-top:2.4rem"><h3>Sayfa içeriği</h3><ul class="madde" style="margin-top:1rem">${c.bolumler
              .map((b) => `<li>${kacis(b)}</li>`)
              .join('')}</ul></div>`
          : ''
      }
    </div>

    ${
      c.spec.length
        ? `<div data-sekme="teknik" class="gizli">
      <h3 style="margin-bottom:1.2rem">Teknik özellikler</h3>
      <table class="spec"><tbody>${c.spec
        .map((s) => `<tr><td>${kacis(s.ad)}</td><td>${kacis(s.deger)}</td></tr>`)
        .join('')}</tbody></table>
      <p class="sonuk" style="font-size:.82rem;margin-top:1rem">Değerler üretici beyanına dayanır; konfigürasyona göre değişebilir. Kesin değerler teklif aşamasında yazılı teyit edilir.</p>
    </div>`
        : ''
    }

    ${
      c.ozellikler.length
        ? `<div data-sekme="ozellik" class="gizli">
      <h3 style="margin-bottom:1.2rem">Özellikler ve uygulama alanları</h3>
      <ul class="madde">${c.ozellikler.map((o) => `<li>${kacis(o)}</li>`).join('')}</ul>
    </div>`
        : ''
    }

    <div data-sekme="servis" class="gizli">
      <h3 style="margin-bottom:1.2rem">${icerik.garanti.baslik}</h3>
      <p class="giris" style="margin-bottom:1.5rem">${icerik.garanti.not}</p>
      <div class="garanti" style="margin-bottom:2.4rem">
        ${icerik.garanti.maddeler
          .map(
            (g) => `<div class="garanti-satir">
          <div class="a">${g.ad}</div>
          <div><div class="b">${g.deger}</div><div class="c">${g.ek}</div></div></div>`
          )
          .join('')}
      </div>

      <h3 style="margin-bottom:1.2rem">Bu cihaz için servis kapsamı</h3>
      <p class="giris" style="margin-bottom:1.6rem">Aşağıdaki kalemler kendi atölyemizde yapılır;
        üçüncü tarafa devredilmez.</p>
      <div class="izgara izgara-2">
        ${servisler
          .slice(0, 6)
          .map((s) => `<div class="kart" style="padding:1.2rem"><h4 style="font-size:.97rem">${s.ad}</h4><p style="font-size:.87rem">${s.ozet}</p></div>`)
          .join('')}
      </div>
      <a class="btn btn-hat" style="margin-top:1.6rem" href="../teknik-servis.html">Tüm teknik servis kalemleri ${ikon.ok}</a>
    </div>
  </div>
</div></section>

${
  digerleri.length
    ? `<section class="bolum dokulu"><div class="kap">
  <div class="bolum-basi"><span class="ust-etiket">Aynı hatta</span><h2>Bunlara da bakın</h2></div>
  <div class="izgara izgara-3">${digerleri.map((d) => cihazKart(d, 'cihaz')).join('')}</div>
</div></section>`
    : ''
}

${cta('cihaz', `${c.ad} için net bir teklif alın`, 'Başlık konfigürasyonu, sarf paketi, eğitim ve garanti süresi dahil tek kalemde fiyatlandıralım.')}`;

    yaz(
      `cihaz/${c.slug}.html`,
      sayfa(
        {
          baslik: `${c.ad} — ${c.marka} | Estezone Medikal`,
          aciklama: c.ozet.slice(0, 158),
          yol: 'cihaz',
          aktif: 'cihazlar.html',
          kanonik: `cihaz/${c.slug}.html`,
          gorsel: `varlik/gorsel/${c.kapak}`,
          sema,
        },
        govde
      )
    );
  });
}

/* ======================= 5. TEKNİK SERVİS ======================= */
function teknikServis() {
  const govde = `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Teknik Servis' }])}
  <span class="ust-etiket" style="margin-top:1rem">Platform bağımsız</span>
  <h1>Teknik servis ve yedek parça</h1>
  <p class="giris">Estetik cihaz yatırımının gerçek maliyeti, cihazın durduğu gün sayısıdır.
    Kendi atölyemizde onarım yapıyoruz — bizden almadığınız cihazlar için de.</p>
  <div class="btn-grup" style="margin-top:1.8rem">
    <a class="btn btn-ana" href="iletisim.html">Servis talebi oluşturun ${ikon.ok}</a>
    <a class="btn btn-wa" href="https://wa.me/${iletisim.whatsappHam}" target="_blank" rel="noopener">${ikon.wa}Arıza bildir</a>
  </div>
</div></section>

<section class="bolum"><div class="kap">
  <div class="bolum-basi"><span class="ust-etiket">Kapsam</span><h2>Sekiz kalemde müdahale</h2>
    <p class="giris">Her kalem için ölçümlü teşhis yapılır; onarımın mı yenilemenin mi ekonomik olduğu net söylenir.</p></div>
  <div class="izgara izgara-2">
    ${servisler
      .map(
        (s) => `<div class="kart belir">
      <div class="servis-baslik-satir">
        <span class="servis-ikon servis-ikon--kucuk"><img src="varlik/gorsel/ikon3d-${s.slug}.webp" alt="" width="56" height="56" loading="lazy"></span>
        <h3 style="font-size:1.12rem">${s.ad}</h3>
      </div>
      <p style="margin-bottom:.75rem">${s.ozet}</p>
      <p style="color:var(--metin-3);font-size:.875rem">${s.detay}</p></div>`
      )
      .join('')}
  </div>
</div></section>

<section class="bolum dokulu"><div class="kap">
  <div class="izgara izgara-2" style="gap:2.4rem;align-items:center">
    <div>
      <span class="ust-etiket">Önleyici bakım</span>
      <h2 style="margin-top:.9rem">Arızayı beklemeyin</h2>
      <p class="giris" style="margin-top:1.1rem">Lazer arızalarının önemli bölümü aslında soğutma ve
        optik temizliği kaynaklıdır — yani önlenebilir arızalardır. Periyodik bakım takvimi,
        seans ortasında duran bir cihazdan çok daha ucuza gelir.</p>
      <ul class="madde" style="margin-top:1.5rem">
        <li>Atış sayısına göre planlı lamba ve hazne değişimi</li>
        <li>Soğutma devresi debi, sızdırmazlık ve sıcaklık kontrolü</li>
        <li>Optik yol temizliği ve spot homojenlik kontrolü</li>
        <li>Enerji kalibrasyonu ve protokol değerlerinin doğrulanması</li>
        <li>Elektrik tesisatı ve topraklama uygunluk kontrolü</li>
      </ul>
    </div>
    <div class="arac">
      <span class="ust-etiket">Servis talebi</span>
      <h3 style="margin-top:.8rem;font-size:1.25rem">Cihazınızı bildirin</h3>
      <p class="sonuk" style="font-size:.9rem;margin-top:.6rem;margin-bottom:1.4rem">Marka ve model bilgisiyle
        yazın; parçanın stokta olup olmadığını ve tahmini süreyi söyleyelim.</p>
      <form data-form>
        <label class="alan"><span>Cihaz marka / model</span><input required placeholder="ör. Light Age Epicare LPX"></label>
        <label class="alan"><span>Arıza tanımı</span><textarea required placeholder="Cihaz ne yapıyor, hangi hatayı veriyor?"></textarea></label>
        <div class="alan-2">
          <label class="alan"><span>Ad Soyad</span><input required></label>
          <label class="alan"><span>Telefon</span><input type="tel" required></label>
        </div>
        <button class="btn btn-ana" type="submit" style="width:100%">Servis talebi gönder</button>
        <p class="sonuk" hidden data-form-not style="margin-top:1rem;padding:.9rem 1.1rem;background:var(--vurgu-sis);border:1px solid rgba(45,212,245,.26);border-radius:10px;font-size:.88rem">
          Talebiniz alındı. <strong style="color:var(--metin)">Bu bir tanıtım demosudur</strong> — form gönderimi canlı sistemde e-posta ve CRM'e bağlanacaktır.</p>
      </form>
    </div>
  </div>
</div></section>

${cta('', 'Envanterinizi çıkaralım, kritik parçaları stoklayalım', 'Sahadaki cihazlarınızın listesini paylaşın; hangi parçaların kritik olduğunu ve hangilerini önden stoklamanın mantıklı olduğunu birlikte belirleyelim.')}`;

  yaz(
    'teknik-servis.html',
    sayfa(
      {
        baslik: 'Teknik Servis ve Yedek Parça — Estezone Medikal',
        aciklama:
          'Lazer cihazları için platform bağımsız teknik servis: flash lamba, pompa haznesi, optik lens, fiber optik, güç kaynağı ve soğutma sistemi onarımı.',
        aktif: 'teknik-servis.html',
        kanonik: 'teknik-servis.html',
      },
      govde
    )
  );
}

/* ======================= 4b. DALGA BOYU MATRİSİ ======================= */
function dalgaBoyuMatrisi() {
  // spec tablosundan dalga boyu / güç / spot / frekans çek
  const bul = (c, ...anahtarlar) => {
    const s = (c.spec || []).find((x) =>
      anahtarlar.some((a) => x.ad.toLocaleLowerCase('tr').includes(a))
    );
    return s ? s.deger : '';
  };
  // "10,600 nm" ve "10.600 nm" = 10600 (binlik ayırıcı) · "10,6 nm" = 10.6 (ondalık)
  const sayiCoz = (ham) => {
    const binliksiz = ham.replace(/[.,](\d{3})(?!\d)/g, '$1');
    return parseFloat(binliksiz.replace(',', '.'));
  };
  const nmCikar = (metin) => {
    const m = [
      ...new Set(
        [...String(metin).matchAll(/(\d[\d.,]*)\s*nm/gi)].map((x) => sayiCoz(x[1])).filter((n) => n >= 100)
      ),
    ].sort((a, b) => a - b);
    return m.length ? m : null;
  };
  const RENK = [
    [500, 620, '#16a34a'],
    [620, 780, '#dc2626'],
    [780, 1000, '#b45309'],
    [1000, 1400, '#7c3aed'],
    [1400, 99999, '#0369a1'],
  ];
  const cip = (nm) => {
    const r = RENK.find(([a, b]) => nm >= a && nm < b) || RENK[4];
    return `<span class="dalga-cip" style="color:${r[2]};border-color:${r[2]}40;background:${r[2]}12">${nm} nm</span>`;
  };

  const satirlar = cihazlar
    .map((c) => {
      const dalgaMetin = bul(c, 'dalga boy', 'dalgaboy', 'lazer ortamı', 'sistem');
      const nm = nmCikar(dalgaMetin) || nmCikar(c.oneCikan) || nmCikar(c.etiketler.join(' '));
      const guc = bul(c, 'çıkış gücü', 'güç', 'enerji', 'fluence', 'maksimum fluens');
      const spot = bul(c, 'spot');
      const frekans = bul(c, 'frekans', 'tekrarlama', 'atış hızı', 'atım hızı');
      const y = icerik.yetkiler[c.yetki];
      return { c, nm, guc, spot, frekans, y };
    })
    .sort((a, b) => (a.nm ? a.nm[0] : 99999) - (b.nm ? b.nm[0] : 99999));

  const govde = `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Araçlar' }, { ad: 'Teknik Matris' }])}
  <span class="ust-etiket" style="margin-top:1rem">28 cihaz · tek tablo</span>
  <h1>Dalga boyu ve teknik matris</h1>
  <p class="giris">Katalog sayfaları arasında gezinmeden tüm portföyü tek teknik tabloda görün.
    Sütun başlığına tıklayarak sıralayın, arayarak süzün.</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="filtre-ic" style="margin-bottom:1.4rem">
    <div class="f-ara">${ikon.ara}<input type="search" data-matris-ara placeholder="Cihaz, marka, dalga boyu veya teknoloji…" aria-label="Matriste ara"></div>
    <span class="f-sonuc" data-matris-sayi>${cihazlar.length} cihaz</span>
  </div>

  <div class="kars-tablo matris" data-matris>
    <table>
      <thead><tr>
        <th class="sirala">Cihaz</th>
        <th class="sirala" data-tip="sayi">Dalga boyu</th>
        <th class="sirala">Kategori</th>
        <th class="sirala">Güç / enerji</th>
        <th class="sirala">Spot</th>
        <th class="sirala">Frekans</th>
        <th class="sirala">Kimler kullanabilir</th>
      </tr></thead>
      <tbody>
        ${satirlar
          .map(
            ({ c, nm, guc, spot, frekans, y }) => `<tr data-arama="${kacis(
            P.aramaNorm(
              [c.ad, c.marka, c.kategoriAd, c.rozet, c.oneCikan, y.ad, ...(c.etiketler || []), ...(c.spec || []).map((s) => s.deger)].join(' ')
            )
          )}">
          <td class="ad"><a href="cihaz/${c.slug}.html">${kacis(c.ad)}</a><br><span class="sonuk" style="font-size:.78rem;font-weight:400">${kacis(c.marka)}</span></td>
          <td data-s="${nm ? nm[0] : 99999}">${nm ? nm.map(cip).join('') : '<span class="sonuk">—</span>'}</td>
          <td>${kacis(c.kategoriAd)}</td>
          <td class="mono-h">${kacis(guc) || '<span class="sonuk">—</span>'}</td>
          <td class="mono-h">${kacis(spot) || '<span class="sonuk">—</span>'}</td>
          <td class="mono-h">${kacis(frekans) || '<span class="sonuk">—</span>'}</td>
          <td><span class="yetki-pul"><span class="d" style="background:${y.renk}"></span>${y.kisa}</span></td>
        </tr>`
          )
          .join('')}
      </tbody>
    </table>
  </div>

  <p class="sonuk" style="font-size:.82rem;margin-top:1.1rem;max-width:90ch">
    Değerler cihaz künyelerinden çıkarılmıştır ve üretici beyanına dayanır; konfigürasyona göre değişebilir.
    Boş hücreler, o cihazın künyesinde ilgili değerin bulunmadığı anlamına gelir.
    Kesin değerler teklif aşamasında yazılı teyit edilir. "Kimler kullanabilir" sütunu ön bilgilendirmedir.
  </p>

  <div class="izgara izgara-4" style="margin-top:2rem">
    ${[
      ['620–780 nm', 'Alexandrite bandı — açık ve orta cilt tiplerinde epilasyon', '#dc2626'],
      ['780–1000 nm', 'Diode bandı — geniş cilt tipi aralığı, yüksek hacim', '#b45309'],
      ['1000–1400 nm', 'Nd:YAG / endolazer — koyu cilt ve derin doku', '#7c3aed'],
      ['1400 nm üstü', 'CO2 fraksiyonel — ablatif cilt yenileme', '#0369a1'],
    ]
      .map(
        ([ad, ac, renk]) => `<div class="kart" style="padding:1.1rem;border-top:3px solid ${renk}">
      <b class="mono" style="font-size:.85rem;color:${renk}">${ad}</b>
      <p style="font-size:.85rem;margin-top:.4rem">${ac}</p></div>`
      )
      .join('')}
  </div>
</div></section>

${cta('', 'Tabloda gördüğünüzü sahada görün', 'İlgilendiğiniz iki üç platformu söyleyin; Ankara showroom’umuzda yan yana çalışır halde hazırlayalım.')}`;

  yaz(
    'teknik-matris.html',
    sayfa(
      {
        baslik: 'Dalga Boyu ve Teknik Matris — Estezone Medikal',
        aciklama:
          '28 estetik cihaz platformunun dalga boyu, güç, spot boyutu ve frekans değerleri tek karşılaştırmalı tabloda. Sıralanabilir ve süzülebilir.',
        aktif: 'cihazlar.html',
        kanonik: 'teknik-matris.html',
      },
      govde
    )
  );
}

anasayfa();
dalgaBoyuMatrisi();
cihazListesi();
kategoriSayfalari();
cihazSayfalari();
teknikServis();

/* kurumsal, araç ve yasal sayfalar ayrı modülde */
require('./sablon/sayfalar-2.js')({ yaz, cihazlar, kategoriler });

/* ---- varlıkları kopyala ---- */
function kopyala() {
  fs.mkdirSync(path.join(CIKTI, 'varlik/css'), { recursive: true });
  fs.mkdirSync(path.join(CIKTI, 'varlik/js'), { recursive: true });
  fs.mkdirSync(path.join(CIKTI, 'varlik/gorsel'), { recursive: true });
  fs.copyFileSync(path.join(KOK, `sablon/stil-${TEMA}.css`), path.join(CIKTI, 'varlik/css/stil.css'));
  fs.copyFileSync(path.join(KOK, 'sablon/site.js'), path.join(CIKTI, 'varlik/js/site.js'));

  // paylaşımlı cihaz verisi — asistan, danışman, karşılaştırma bunu kullanır
  const istemci = cihazlar.map((c) => ({
    slug: c.slug,
    ad: c.ad,
    marka: c.marka,
    kategori: c.kategori,
    kategoriAd: c.kategoriAd,
    yetki: c.yetki,
    rozet: c.rozet || '',
    vitrin: c.vitrin,
    oneCikan: c.oneCikan,
    etiketler: c.etiketler,
    etiketSayi: (c.etiketler || []).length,
    hedef: c.hedef,
    neden: c.neden,
    gorsel: `varlik/gorsel/${c.kapak}`,
    url: `cihaz/${c.slug}.html`,
  }));
  fs.writeFileSync(
    path.join(CIKTI, 'varlik/js/cihazlar.js'),
    `window.ESTEZONE_CIHAZLAR=${JSON.stringify(istemci)};`,
    'utf8'
  );

  const kaynak = path.join(KOK, 'kaynak/gorsel');
  const gerekli = new Set();
  cihazlar.forEach((c) => {
    if (c.kapak) gerekli.add(c.kapak);
    c.gorseller.slice(0, 6).forEach((g) => gerekli.add(g));
  });
  // 3D servis ikonları (Higgsfield üretimi) + gerçek marka logoları (estezone.com.tr)
  fs.readdirSync(kaynak)
    .filter((f) => f.startsWith('ikon3d-') || f.startsWith('logo-'))
    .forEach((f) => gerekli.add(f));
  let n = 0;
  gerekli.forEach((g) => {
    const s = path.join(kaynak, g);
    if (fs.existsSync(s)) {
      fs.copyFileSync(s, path.join(CIKTI, 'varlik/gorsel', g));
      n++;
    }
  });
  return n;
}

const gorselSayi = kopyala();

/* kıyas/teklif sunumu — tema bağımsız, yalnızca köke bir kez kopyalanır */
if (TEMA === 'koyu') {
  const kay = path.join(KOK, 'kiyas');
  const hed = path.join(CIKTI, 'kiyas');
  fs.mkdirSync(hed, { recursive: true });
  fs.readdirSync(kay).forEach((f) => fs.copyFileSync(path.join(kay, f), path.join(hed, f)));
  console.log(`✓ kıyas sunumu kopyalandı (${fs.readdirSync(kay).length} dosya)`);
}

/* ---- sitemap + robots ---- */
function sitemap() {
  const url = [];
  const gez = (dizin, on = '') => {
    fs.readdirSync(path.join(CIKTI, dizin), { withFileTypes: true }).forEach((e) => {
      // diğer tema sürümleri ve kıyas sunumu bu sitemap'e girmez
      if (e.isDirectory() && !['varlik','v2','v3','v4','kiyas'].includes(e.name))
        gez(path.join(dizin, e.name), `${on}${e.name}/`);
      else if (e.name.endsWith('.html') && e.name !== '404.html')
        url.push(`${on}${e.name === 'index.html' && !on ? '' : e.name}`);
    });
  };
  gez('.');
  fs.writeFileSync(
    path.join(CIKTI, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${url.map((u) => `  <url><loc>${SITE}/${u}</loc><changefreq>monthly</changefreq></url>`).join('\n')}
</urlset>`,
    'utf8'
  );
  // DEMO: arama motorlarına kapalı — gerçek estezone.com.tr ile çift içerik yaratmasın.
  // Canlıya geçişte bu blok "Allow: /" + Sitemap satırıyla değiştirilecek.
  fs.writeFileSync(
    path.join(CIKTI, 'robots.txt'),
    `# Tasarım demosu — resmî site değildir, dizine eklenmemelidir.\nUser-agent: *\nDisallow: /\n`,
    'utf8'
  );
  return url.length;
}
const urlSayi = sitemap();

if (mevzuat.rapor.length) {
  const grup = {};
  mevzuat.rapor.forEach((r) => (grup[r.desen] = (grup[r.desen] || 0) + 1));
  console.log(`\n⚖ mevzuat süzgeci ${mevzuat.rapor.length} ifadeyi düzeltti:`);
  Object.entries(grup)
    .sort((a, b) => b[1] - a[1])
    .forEach(([d, n]) => console.log(`   ${String(n).padStart(3)}×  ${d}`));
}

console.log(`\n✓ ${yazilan} HTML sayfa üretildi`);
console.log(`✓ ${gorselSayi} görsel kopyalandı`);
console.log(`✓ sitemap.xml (${urlSayi} URL) + robots.txt`);
console.log(`→ ${CIKTI}\n`);
