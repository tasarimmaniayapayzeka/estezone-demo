/* Kurumsal, araç, blog ve yasal sayfalar */
const P = require('./parcalar.js');
const { kacis, ikon, sayfa, cihazKart, cta, kirinti, KATEGORI_MENU } = P;
const icerik = require('../veri/icerik.js');
const { marka, iletisim, servisler, surec, farklar, sss, yasal, guven } = icerik;

module.exports = function ({ yaz, cihazlar, kategoriler }) {
  /* cihaz verisini istemciye taşı (danışman + karşılaştırma) */
  const istemciVeri = cihazlar.map((c) => ({
    slug: c.slug,
    ad: c.ad,
    marka: c.marka,
    kategori: c.kategori,
    kategoriAd: c.kategoriAd,
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
  const veriBetik = `<script>window.ESTEZONE_CIHAZLAR=${JSON.stringify(istemciVeri)};</script>`;

  /* ================= HAKKIMIZDA ================= */
  yaz(
    'hakkimizda.html',
    sayfa(
      {
        baslik: 'Hakkımızda — Estezone Medikal',
        aciklama:
          '20 yılı aşkın süredir estetik sektörüne lazer epilasyon, cilt ve vücut şekillendirme cihazı tedarik eden Estezone Medikal hakkında.',
        aktif: 'hakkimizda.html',
        kanonik: 'hakkimizda.html',
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Kurumsal' }])}
  <span class="ust-etiket" style="margin-top:1rem">2005'ten bu yana</span>
  <h1>Cihazı satan değil, ayakta tutan tedarikçi</h1>
  <p class="giris">Estezone Medikal; hastane, klinik, medikal estetik merkezi ve güzellik salonlarına
    estetik cihaz platformları tedarik eder. Yirmi yılı aşkın süredir aynı alanda, aynı işi yapıyoruz.</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="izgara izgara-2" style="gap:2.6rem;align-items:start">
    <div>
      <h2 style="font-size:clamp(1.6rem,2.6vw,2.1rem)">Neyi farklı yapıyoruz</h2>
      <p class="giris" style="margin-top:1.2rem">Estetik cihaz sektöründe satış kolaydır. Zor olan,
        o cihazın beşinci yılında da aynı enerjiyle atış yapmasıdır. Bir lazer platformu; flash lambası
        ömrünü doldurduğunda, optik yolu kirlendiğinde ya da soğutma devresi debisini kaybettiğinde
        çalışmaya devam eder — ama seans sonucu sessizce bozulur. Bunu fark eden ilk kişi, memnun
        kalmayan hastadır.</p>
      <p class="giris" style="margin-top:1.05rem">Bu yüzden Estezone'un merkezinde satış değil,
        <strong style="color:var(--metin)">teknik servis</strong> var. Ankara'daki kendi atölyemizde
        pompa haznesinden fiber optiğe kadar müdahale ediyoruz. Sadece sattığımız cihazlara değil,
        sahadaki farklı marka sistemlere de.</p>
      <p class="giris" style="margin-top:1.05rem">Portföyümüzde Light Age, Zimmer, Baldan Group, Wavemed,
        FineMEC, MedArt ve Arion gibi üreticilerin platformları yer alıyor. Arion Alexandrite'ta
        Türkiye tek yetkili distribütörüyüz; parça ve teknik destek doğrudan üreticiden geliyor.</p>
    </div>
    <div class="arac">
      <h3 style="font-size:1.15rem">Rakamlarla Estezone</h3>
      <div style="margin-top:1.2rem;display:grid;gap:.2rem">
        ${guven
          .map(
            (g) =>
              `<div class="sonuc-satir"><span class="e">${g.etiket}</span><span class="d" style="color:var(--vurgu)">${g.sayi}</span></div>`
          )
          .join('')}
        <div class="sonuc-satir"><span class="e">portföydeki üretici</span><span class="d" style="color:var(--vurgu)">10+</span></div>
      </div>
      <hr class="ayrac" style="margin-block:1.4rem">
      <h4 style="margin-bottom:.9rem">Ofislerimiz</h4>
      ${iletisim.ofisler
        .map(
          (o) => `<div style="margin-bottom:1.1rem">
        <b style="display:block;font-size:.9rem">${o.ad}</b>
        <p class="sonuk" style="font-size:.85rem;line-height:1.55;margin-top:.2rem">${o.adres}</p>
        <p style="font-size:.8rem;color:var(--vurgu);margin-top:.3rem">${o.rol}</p></div>`
        )
        .join('')}
    </div>
  </div>
</div></section>

<section class="bolum dokulu"><div class="kap">
  <div class="bolum-basi"><span class="ust-etiket">Çalışma ilkelerimiz</span><h2>Altı taahhüt</h2></div>
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
</div></section>

<section class="bolum"><div class="kap">
  <div class="bolum-basi bolum-basi--orta"><span class="ust-etiket">Süreç</span><h2>Bizimle çalışmak nasıl işler</h2></div>
  <div class="surec belir">${surec
    .map(
      (s, i) => `<div class="surec-ad">
      <span class="surec-ikon"><img src="varlik/gorsel/ikon3d-surec-0${i + 1}.webp" alt="" width="72" height="72" loading="lazy"></span>
      <span class="no">${s.no}</span><h4>${s.ad}</h4><p>${s.metin}</p></div>`
    )
    .join('')}</div>
</div></section>

${cta('', 'Showroom’a bekleriz', 'Ankara Beysukent’teki showroom’umuzda cihazları çalışır halde görebilirsiniz. Randevu için arayın ya da WhatsApp’tan yazın.')}`
    )
  );

  /* ================= CİHAZ SEÇİM DANIŞMANI ================= */
  const sorular = [
    {
      id: 'alan',
      soru: 'Hangi alanda hizmet vermeyi planlıyorsunuz?',
      alt: 'Bugünkü değil, önümüzdeki 12 ayda ulaşmak istediğiniz tedavi menüsünü düşünün.',
      secenek: [
        ['epilasyon', 'Lazer epilasyon', 'Kalıcı tüy azaltma — en yüksek ve en istikrarlı talep'],
        ['cilt', 'Cilt & medikal estetik', 'Leke, doku, gençleştirme, dövme silme'],
        ['vucut', 'Vücut şekillendirme', 'Bölgesel incelme, kas uyarımı, kontur'],
        ['hepsi', 'Karma menü', 'Birden fazla hatta aynı anda hizmet vereceğim'],
      ],
    },
    {
      id: 'olcek',
      soru: 'İşletmenizin ölçeği nedir?',
      alt: 'Günlük seans kapasiteniz, cihazın ne kadar yorulacağını belirler.',
      secenek: [
        ['kucuk', 'Küçük salon / yeni açılış', 'Günde 5–15 seans, bütçe hassasiyeti yüksek'],
        ['orta', 'Yerleşik güzellik merkezi', 'Günde 15–35 seans, düzenli hasta akışı'],
        ['buyuk', 'Klinik / hastane / zincir', 'Günde 35+ seans, kesintisiz çalışma zorunlu'],
      ],
    },
    {
      id: 'oncelik',
      soru: 'Bu yatırımda önceliğiniz ne?',
      alt: 'Hepsi önemli, ama biri diğerlerinin önüne geçer.',
      secenek: [
        ['belge', 'Belge ve marka güveni', 'FDA / CE belgeli, bilinen üretici tercih ederim'],
        ['kapsam', 'Tedavi kapsamı', 'Tek cihazla mümkün olduğunca çok işlem yapayım'],
        ['butce', 'Başlangıç bütçesi', 'Önce girişi yapayım, talep büyürse yükselteyim'],
      ],
    },
  ];

  yaz(
    'cihaz-secim-danismani.html',
    sayfa(
      {
        baslik: 'Cihaz Seçim Danışmanı — Estezone Medikal',
        aciklama:
          'Üç soruda işletme ölçeğinize ve hedef tedavi menünüze uygun estetik cihaz platformlarını önerelim. Kayıt gerekmez.',
        aktif: 'cihaz-secim-danismani.html',
        kanonik: 'cihaz-secim-danismani.html',
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Araçlar' }, { ad: 'Cihaz Seçim Danışmanı' }])}
  <span class="ust-etiket" style="margin-top:1rem">Ücretsiz · kayıt yok</span>
  <h1>Hangi cihaz size uygun?</h1>
  <p class="giris">En pahalı cihaz her zaman en doğru cihaz değildir. Üç soruya cevap verin,
    işletme profilinize uyan üç platformu birlikte görelim.</p>
</div></section>

<section class="bolum"><div class="kap" style="max-width:920px">
  <div class="arac" data-danisman>
    <div class="dan-ilerleme"><i data-ilerleme style="width:0%"></i></div>
    ${sorular
      .map(
        (s, i) => `<div class="dan-adim${i === 0 ? ' aktif' : ''}" data-soru="${s.id}">
      <span class="ust-etiket">Adım ${i + 1} / ${sorular.length}</span>
      <h2 style="font-size:clamp(1.4rem,2.6vw,1.95rem);margin-top:.8rem">${s.soru}</h2>
      <p class="sonuk" style="margin-top:.6rem;font-size:.93rem">${s.alt}</p>
      <div class="dan-secenek">${s.secenek
        .map(
          ([v, ad, ac]) =>
            `<button data-cevap="${v}"><strong>${ad}</strong><small>${ac}</small></button>`
        )
        .join('')}</div>
    </div>`
      )
      .join('')}
    <div class="dan-adim">
      <span class="ust-etiket">Sonuç</span>
      <h2 style="font-size:clamp(1.4rem,2.6vw,1.95rem);margin-top:.8rem">Profilinize en uygun üç platform</h2>
      <p class="sonuk" style="margin-top:.6rem;font-size:.93rem">Bu bir ön yönlendirmedir; kesin seçim
        için envanterinizi ve mekân koşullarınızı birlikte değerlendirmemiz gerekir.</p>
      <div class="izgara izgara-3" style="margin-top:1.8rem" data-oneri></div>
      <div class="btn-grup" style="margin-top:2rem">
        <a class="btn btn-ana" href="iletisim.html">Bu seçimler için teklif alın ${ikon.ok}</a>
        <button class="btn btn-hat" data-bastan>Baştan başla</button>
      </div>
    </div>
  </div>
</div></section>

${cta('', 'Sonuçtan emin olmak ister misiniz?', 'Danışman bir başlangıç noktasıdır. Mekânınızın elektrik altyapısı, operatör deneyimi ve hedef hasta profilinizi konuşarak seçimi netleştirelim.')}`
    )
  );

  /* ================= YATIRIM HESAPLAYICI ================= */
  yaz(
    'yatirim-hesaplayici.html',
    sayfa(
      {
        baslik: 'Yatırım Geri Dönüş Hesaplayıcı — Estezone Medikal',
        aciklama:
          'Estetik cihaz yatırımınızın kaç ayda kendini ödeyeceğini seans fiyatı, günlük hasta sayısı ve gider oranına göre hesaplayın.',
        aktif: 'yatirim-hesaplayici.html',
        kanonik: 'yatirim-hesaplayici.html',
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Araçlar' }, { ad: 'Yatırım Geri Dönüş Hesabı' }])}
  <span class="ust-etiket" style="margin-top:1rem">Ücretsiz araç</span>
  <h1>Cihaz kaç ayda kendini öder?</h1>
  <p class="giris">Cihaz yatırımı bir gider değil, bir gelir hattıdır — ama ancak doluluk oranı
    tuttuğunda. Kendi rakamlarınızı girin, geri dönüş süresini görün.</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="izgara izgara-2" style="gap:2rem;align-items:start" data-roi>
    <div class="arac">
      <h3 style="font-size:1.2rem;margin-bottom:1.4rem">Rakamlarınız</h3>
      <label class="alan"><span>Cihaz yatırımı <b class="alan-deger" data-deger-of="yatirim">750.000</b> ₺</span>
        <input type="range" name="yatirim" min="100000" max="4000000" step="25000" value="750000"></label>
      <label class="alan"><span>Seans fiyatı <b class="alan-deger" data-deger-of="seans">1.500</b> ₺</span>
        <input type="range" name="seans" min="200" max="15000" step="100" value="1500"></label>
      <label class="alan"><span>Günlük seans sayısı <b class="alan-deger" data-deger-of="gunluk">8</b></span>
        <input type="range" name="gunluk" min="1" max="40" step="1" value="8"></label>
      <label class="alan"><span>Ayda çalışılan gün <b class="alan-deger" data-deger-of="gun">24</b></span>
        <input type="range" name="gun" min="10" max="30" step="1" value="24"></label>
      <label class="alan"><span>İşletme gideri payı <b class="alan-deger" data-deger-of="gider">%45</b></span>
        <input type="range" name="gider" min="10" max="80" step="1" value="45"></label>
      <p class="sonuk" style="font-size:.8rem;line-height:1.55">Gider payı; kira, personel, sarf malzeme,
        enerji ve pazarlama giderlerinin ciroya oranıdır. Emin değilseniz %45 makul bir başlangıçtır.</p>
    </div>

    <div>
      <div class="sonuc-kutu">
        <span class="ust-etiket">Tahmini sonuç</span>
        <div style="margin-top:1.1rem">
          <div class="sonuc-satir"><span class="e">Aylık seans</span><span class="d" data-cikti="seans">—</span></div>
          <div class="sonuc-satir"><span class="e">Aylık brüt ciro</span><span class="d" data-cikti="ciro">—</span></div>
          <div class="sonuc-satir"><span class="e">Aylık net katkı</span><span class="d" data-cikti="net">—</span></div>
          <div class="sonuc-satir vurgulu"><span class="e">Geri dönüş süresi</span><span class="d" data-cikti="ay">—</span></div>
          <div class="sonuc-satir"><span class="e">1. yıl sonu net kazanç</span><span class="d" data-cikti="yil">—</span></div>
        </div>
      </div>
      <div class="kart" style="margin-top:1.2rem">
        <h4>Bu hesap neyi göstermez?</h4>
        <p style="margin-top:.6rem">Servis ve sarf maliyetleri, finansman faizi, sezonluk dalgalanma ve
          doluluk oranındaki değişimler bu basit modelde yer almaz. Gerçek bir fizibilite için
          cihaza özel sarf tüketimi ve bakım takvimiyle birlikte çalışmak gerekir —
          teklif aşamasında bunu sizin için yapıyoruz.</p>
        <a class="btn btn-hat btn-k" style="margin-top:1.1rem" href="iletisim.html">Detaylı fizibilite isteyin ${ikon.ok}</a>
      </div>
    </div>
  </div>
</div></section>

${cta('', 'Rakamlar tuttuysa cihazı konuşalım', 'Hedef geri dönüş sürenize uyan platformları, sarf ve servis kalemleriyle birlikte fiyatlandıralım.')}`
    )
  );

  /* ================= KARŞILAŞTIRMA ================= */
  yaz(
    'karsilastir.html',
    sayfa(
      {
        baslik: 'Cihaz Karşılaştırma — Estezone Medikal',
        aciklama: 'Üç estetik cihazı marka, teknoloji, hedef kitle ve konumlandırma açısından yan yana karşılaştırın.',
        aktif: 'karsilastir.html',
        kanonik: 'karsilastir.html',
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Araçlar' }, { ad: 'Cihaz Karşılaştırma' }])}
  <span class="ust-etiket" style="margin-top:1rem">Ücretsiz araç</span>
  <h1>Üç cihazı yan yana koyun</h1>
  <p class="giris">Katalog sayfaları arasında gidip gelmeyin. Kararınızı etkileyen kalemleri
    tek tabloda görün.</p>
</div></section>

<section class="bolum"><div class="kap" data-karsilastir>
  <div class="izgara izgara-3" style="margin-bottom:2rem">
    ${[1, 2, 3]
      .map(
        (i) => `<label class="alan" style="margin:0"><span>${i}. cihaz</span><select aria-label="${i}. cihaz"></select></label>`
      )
      .join('')}
  </div>
  <div data-kars-tablo></div>
  <p class="sonuk" style="font-size:.82rem;margin-top:1.2rem">Teknik değerlerin tamamı için her cihazın
    kendi sayfasındaki künye sekmesine bakın. Değerler üretici beyanına dayanır.</p>
</div></section>

${cta('', 'Karşılaştırdınız, şimdi deneyin', 'Seçtiğiniz platformları Ankara showroom’umuzda çalışır halde görebilir, uygun modellerde kendi merkezinizde demo talep edebilirsiniz.')}`
    )
  );

  /* ================= KİRALAMA & 2. EL ================= */
  yaz(
    'kiralama-ikinci-el.html',
    sayfa(
      {
        baslik: 'Cihaz Kiralama ve İkinci El — Estezone Medikal',
        aciklama:
          'Lazer epilasyon ve estetik cihazlarında kiralama, kontrollü ikinci el ve takas seçenekleri. Atölyeden geçmemiş cihaz teslim edilmez.',
        aktif: 'kiralama-ikinci-el.html',
        kanonik: 'kiralama-ikinci-el.html',
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Kiralama & 2. El' }])}
  <span class="ust-etiket" style="margin-top:1rem">Esnek edinim</span>
  <h1>Her yatırım peşin satın alma olmak zorunda değil</h1>
  <p class="giris">Yeni şube açılışı, sezonluk yoğunluk ya da bir tedavi hattını denemek istiyorsanız;
    kiralama ve kontrollü ikinci el seçenekleri riski düşürür.</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="izgara izgara-3">
    ${[
      [
        'Kiralama',
        'Cihazı satın almadan gelir hattını test edin.',
        [
          'Sezonluk yoğunluk dönemlerinde ek kapasite',
          'Yeni şube açılışında ilk aylar için köprü çözüm',
          'Bir tedavi hattının talebini ölçme',
          'Kira bedelinin satın almaya sayılması opsiyonu',
        ],
      ],
      [
        'Kontrollü ikinci el',
        'Bütçe kısıtı varsa doğru başlangıç noktası.',
        [
          'Atölyemizden geçmeden hiçbir cihaz teslim edilmez',
          'Atış sayısı ve lamba ömrü yazılı beyan edilir',
          'Enerji kalibrasyonu yapılıp raporlanır',
          'Sınırlı da olsa garanti tanımlanır',
        ],
      ],
      [
        'Takas',
        'Elinizdeki cihazı yeni yatırıma sayın.',
        [
          'Mevcut cihazınız yerinde değerlenir',
          'Marka bağımsız — bizden almadığınız cihazlar dahil',
          'Değer, yeni cihaz teklifinden düşülür',
          'Sökme ve nakliye planlaması bize ait',
        ],
      ],
    ]
      .map(
        ([ad, ozet, maddeler], i) => `<div class="kart edinim-kart belir">
      <span class="edinim-ikon"><img src="varlik/gorsel/ikon3d-edinim-0${i + 1}.webp" alt="" width="84" height="84" loading="lazy"></span>
      <h3>${ad}</h3><p style="margin-bottom:1rem">${ozet}</p>
      <ul class="madde">${maddeler.map((m) => `<li>${m}</li>`).join('')}</ul></div>`
      )
      .join('')}
  </div>
</div></section>

<section class="bolum dokulu"><div class="kap">
  <div class="izgara izgara-2" style="gap:2.4rem;align-items:start">
    <div>
      <span class="ust-etiket">Şeffaflık</span>
      <h2 style="margin-top:.9rem">İkinci el cihazda neye bakmalısınız</h2>
      <p class="giris" style="margin-top:1.1rem">İkinci el bir lazer platformunda fiyat, ikinci sırada gelir.
        Aşağıdaki beş kalemin yazılı beyanı yoksa o cihaz ucuz değil, risklidir.</p>
      <ul class="madde" style="margin-top:1.5rem">
        <li><strong style="color:var(--metin)">Atış sayısı:</strong> Cihazın gerçek yaşı budur, yılı değil.</li>
        <li><strong style="color:var(--metin)">Lamba / bar ömrü:</strong> Yakın zamanda değişti mi, kaç atış kaldı?</li>
        <li><strong style="color:var(--metin)">Enerji ölçümü:</strong> Etikette yazan değeri gerçekten veriyor mu?</li>
        <li><strong style="color:var(--metin)">Optik durumu:</strong> Spot homojen mi, lens kaplaması sağlam mı?</li>
        <li><strong style="color:var(--metin)">Parça bulunabilirliği:</strong> Üretimden kalkmış bir platform mu?</li>
      </ul>
    </div>
    <div class="arac">
      <span class="ust-etiket">Talep formu</span>
      <h3 style="margin-top:.8rem;font-size:1.25rem">Ne arıyorsunuz?</h3>
      <p class="sonuk" style="font-size:.9rem;margin:.6rem 0 1.4rem">Aradığınız platformu ve bütçe
        aralığınızı yazın; uygun kiralama ya da ikinci el çıktığında haber verelim.</p>
      <form data-form>
        <label class="alan"><span>İlgilendiğim seçenek</span>
          <select><option>Kiralama</option><option>İkinci el</option><option>Takas</option><option>Henüz emin değilim</option></select></label>
        <label class="alan"><span>Aradığınız cihaz / teknoloji</span><input required placeholder="ör. Alexandrite lazer epilasyon"></label>
        <div class="alan-2">
          <label class="alan"><span>Ad Soyad</span><input required></label>
          <label class="alan"><span>Telefon</span><input type="tel" required></label>
        </div>
        <label class="alan"><span>İşletme adı ve şehir</span><input></label>
        <button class="btn btn-ana" type="submit" style="width:100%">Talebi gönder</button>
        <p class="sonuk" hidden data-form-not style="margin-top:1rem;padding:.9rem 1.1rem;background:var(--vurgu-sis);border:1px solid rgba(45,212,245,.26);border-radius:10px;font-size:.88rem">
          Talebiniz alındı. <strong style="color:var(--metin)">Bu bir tanıtım demosudur</strong> — canlı sistemde form e-posta ve CRM'e bağlanacaktır.</p>
      </form>
    </div>
  </div>
</div></section>

${cta('', 'Bütçenizi söyleyin, seçenekleri çıkaralım', 'Peşin, taksitli, kiralama ve ikinci el senaryolarını yan yana koyup hangisinin işletmeniz için mantıklı olduğunu birlikte görelim.')}`
    )
  );

  /* ================= İLETİŞİM ================= */
  yaz(
    'iletisim.html',
    sayfa(
      {
        baslik: 'İletişim ve Teklif — Estezone Medikal',
        aciklama:
          'Ankara ve İstanbul ofisleri, telefon, WhatsApp ve teklif formu. Estezone Medikal ile iletişime geçin.',
        aktif: 'iletisim.html',
        kanonik: 'iletisim.html',
        sema: {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: marka.ad,
          telephone: iletisim.telefon,
          email: iletisim.eposta,
          address: {
            '@type': 'PostalAddress',
            streetAddress: iletisim.ofisler[0].adres,
            addressLocality: 'Çankaya',
            addressRegion: 'Ankara',
            addressCountry: 'TR',
          },
        },
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'İletişim' }])}
  <span class="ust-etiket" style="margin-top:1rem">Aynı gün dönüş</span>
  <h1>Teklif, demo ve servis talepleri</h1>
  <p class="giris">Cihaz teklifi, showroom randevusu veya arıza bildirimi — hangisi olursa olsun
    Ankara ve İstanbul ofislerimizden aynı gün dönüş yapılır.</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="izgara izgara-2" style="gap:2.4rem;align-items:start">
    <div class="arac">
      <span class="ust-etiket">Teklif formu</span>
      <h2 style="font-size:1.5rem;margin-top:.8rem">Size nasıl yardımcı olalım?</h2>
      <form data-form style="margin-top:1.6rem">
        <label class="alan"><span>Talebiniz</span>
          <select name="konu"><option>Cihaz teklifi</option><option>Demo / showroom randevusu</option>
          <option>Teknik servis</option><option>Yedek parça</option><option>Kiralama / ikinci el</option><option>Diğer</option></select></label>
        <label class="alan"><span>İlgilendiğiniz cihaz</span>
          <select name="cihaz"><option value="">— fark etmez / emin değilim —</option>
          ${KATEGORI_MENU.map(
            ([, k, ad]) =>
              `<optgroup label="${ad}">${cihazlar
                .filter((c) => c.kategori === k)
                .map((c) => `<option value="${c.slug}">${kacis(c.ad)}</option>`)
                .join('')}</optgroup>`
          ).join('')}</select></label>
        <div class="alan-2">
          <label class="alan"><span>Ad Soyad</span><input required autocomplete="name"></label>
          <label class="alan"><span>Telefon</span><input type="tel" required autocomplete="tel"></label>
        </div>
        <div class="alan-2">
          <label class="alan"><span>E-posta</span><input type="email" autocomplete="email"></label>
          <label class="alan"><span>İşletme / şehir</span><input></label>
        </div>
        <div class="alan-2">
          <label class="alan"><span>İşletme türü</span>
            <select name="isletme" required>
              <option value="">— seçiniz —</option>
              ${Object.entries(icerik.yetkiler)
                .map(([k, y]) => `<option value="${k}">${y.ad}</option>`)
                .join('')}
              <option value="diger">Diğer / henüz kurulmadı</option>
            </select></label>
          <label class="alan"><span>Vergi numarası</span><input name="vergi" inputmode="numeric"></label>
        </div>
        <label class="alan"><span>ÜTS kaydınız var mı?</span>
          <select name="uts">
            <option value="">— seçiniz —</option>
            <option>Evet, ÜTS'ye kayıtlıyız</option>
            <option>Hayır, henüz kayıtlı değiliz</option>
            <option>Emin değilim / bilgi almak istiyorum</option>
          </select></label>
        <p class="sonuk" style="font-size:.79rem;line-height:1.55;margin:-.4rem 0 1.1rem">
          İşletme türü, vergi numarası ve ÜTS kaydı; Tıbbi Cihaz Satış, Reklam ve Tanıtım Yönetmeliği
          md.26/7 gereği tıbbi cihaz satışında sorulması gereken bilgilerdir. Hangi cihazı
          bulundurabileceğinizi de bu bilgiler belirler.</p>
        <label class="alan"><span>Mesajınız</span><textarea placeholder="Günlük seans hacminiz, mevcut cihaz envanteriniz ve hedefiniz hakkında kısa bilgi verirseniz daha net bir teklif hazırlayabiliriz."></textarea></label>
        <label style="display:flex;gap:.65rem;align-items:flex-start;font-size:.845rem;color:var(--metin-2);margin-bottom:1.2rem">
          <input type="checkbox" required style="width:auto;margin-top:.25rem">
          <span><a href="kvkk.html" style="color:var(--vurgu)">KVKK aydınlatma metnini</a> okudum;
          verilerimin talebimin değerlendirilmesi amacıyla işlenmesini kabul ediyorum.</span></label>
        <button class="btn btn-ana btn-b" type="submit" style="width:100%">Teklif talebini gönder ${ikon.ok}</button>
        <p class="sonuk" hidden data-form-not style="margin-top:1rem;padding:1rem 1.15rem;background:var(--vurgu-sis);border:1px solid rgba(45,212,245,.26);border-radius:10px;font-size:.89rem">
          Talebiniz alındı. <strong style="color:var(--metin)">Bu bir tanıtım demosudur</strong> —
          canlı sistemde form e-posta, WhatsApp bildirimi ve CRM kaydına bağlanacaktır.</p>
      </form>
    </div>

    <div>
      <div class="kart" style="margin-bottom:1.1rem">
        <h3 style="font-size:1.12rem">Hızlı iletişim</h3>
        <div style="display:grid;gap:.85rem;margin-top:1.2rem">
          <a href="tel:${iletisim.telefonHam}" style="display:flex;gap:.85rem;align-items:center">
            <span style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:var(--vurgu-sis);color:var(--vurgu);flex:none"><span style="width:18px;height:18px;display:block">${ikon.tel}</span></span>
            <span><b style="display:block;font-size:.95rem">${iletisim.telefon}</b><small class="sonuk" style="font-size:.8rem">Hafta içi 09:00 – 18:00</small></span></a>
          <a href="https://wa.me/${iletisim.whatsappHam}" target="_blank" rel="noopener" style="display:flex;gap:.85rem;align-items:center">
            <span style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:rgba(37,211,102,.14);color:#25d366;flex:none"><span style="width:18px;height:18px;display:block">${ikon.wa}</span></span>
            <span><b style="display:block;font-size:.95rem">${iletisim.whatsapp}</b><small class="sonuk" style="font-size:.8rem">WhatsApp — en hızlı kanal</small></span></a>
          <a href="mailto:${iletisim.eposta}" style="display:flex;gap:.85rem;align-items:center">
            <span style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:var(--vurgu-sis);color:var(--vurgu);flex:none"><span style="width:18px;height:18px;display:block">${ikon.eposta}</span></span>
            <span><b style="display:block;font-size:.95rem">${iletisim.eposta}</b><small class="sonuk" style="font-size:.8rem">Teklif ve belge talepleri</small></span></a>
        </div>
      </div>

      ${iletisim.ofisler
        .map(
          (o) => `<div class="kart" style="margin-bottom:1.1rem">
        <div style="display:flex;gap:.7rem;align-items:flex-start">
          <span style="width:20px;height:20px;color:var(--vurgu);flex:none;margin-top:.2rem">${ikon.konum}</span>
          <div><h4>${o.ad}</h4>
          <p style="margin-top:.4rem">${o.adres}</p>
          <p style="color:var(--vurgu);font-size:.85rem;margin-top:.5rem">${o.rol}</p></div></div></div>`
        )
        .join('')}

      <div class="kart">
        <h4>Randevu önerisi</h4>
        <p style="margin-top:.5rem">Showroom ziyaretinden önce arayıp haber verirseniz, ilgilendiğiniz
          cihazı çalışır ve kalibre halde hazır bulundururuz. Böylece ziyaret 20 dakika yerine
          gerçek bir değerlendirmeye dönüşür.</p>
      </div>
    </div>
  </div>
</div></section>`
    )
  );

  /* ================= BLOG ================= */
  const blogYazilar = [
    {
      slug: 'lazer-epilasyon-cihazi-secerken',
      baslik: 'Lazer epilasyon cihazı seçerken bakılması gereken 7 teknik kalem',
      ozet: 'Dalga boyu, spot boyutu, fluens, atış hızı, soğutma, başlık ömrü ve servis — hangisi gerçekten kararı değiştirir?',
      etiket: 'Satın alma rehberi',
      dk: 8,
    },
    {
      slug: 'alexandrite-mi-diode-mu',
      baslik: 'Alexandrite mi, diode mu, mix mi? Cilt tipine göre doğru seçim',
      ozet: 'Fitzpatrick ölçeğine göre hangi dalga boyunun nerede güvenli ve etkili olduğunu tablo halinde inceliyoruz.',
      etiket: 'Teknoloji',
      dk: 10,
    },
    {
      slug: 'ikinci-el-lazer-cihazi-riskleri',
      baslik: 'İkinci el lazer cihazı alırken sorulması gereken 5 soru',
      ozet: 'Atış sayısı, lamba ömrü, enerji ölçümü, optik durumu ve parça bulunabilirliği — yazılı beyan yoksa cihaz ucuz değil risklidir.',
      etiket: 'Satın alma rehberi',
      dk: 6,
    },
    {
      slug: 'cihaz-yatirimi-geri-donus',
      baslik: 'Estetik cihaz yatırımı kaç ayda kendini öder?',
      ozet: 'Doluluk oranı, seans fiyatı ve gider payı üzerinden gerçekçi bir geri dönüş modeli nasıl kurulur?',
      etiket: 'İşletme',
      dk: 7,
    },
    {
      slug: 'lazer-cihazi-bakim-takvimi',
      baslik: 'Lazer cihazında arızayı önleyen bakım takvimi',
      ozet: 'Arızaların önemli bölümü soğutma ve optik temizliği kaynaklıdır. Periyodik bakımın gerçek maliyeti ve getirisi.',
      etiket: 'Teknik servis',
      dk: 9,
    },
    {
      slug: 'soguk-lipoliz-mi-hiemt-mi',
      baslik: 'Soğuk lipoliz mi, HI-EMT mi? Vücut şekillendirmede doğru hat',
      ozet: 'Yağ hücresini hedefleyen ve kası hedefleyen iki farklı yaklaşım; hangi hasta profilinde hangisi çalışır.',
      etiket: 'Teknoloji',
      dk: 8,
    },
  ];

  yaz(
    'blog.html',
    sayfa(
      {
        baslik: 'Blog — Estezone Medikal',
        aciklama:
          'Estetik cihaz seçimi, teknoloji karşılaştırmaları, teknik servis ve işletme ekonomisi üzerine profesyonellere yönelik yazılar.',
        aktif: 'blog.html',
        kanonik: 'blog.html',
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Blog' }])}
  <span class="ust-etiket" style="margin-top:1rem">Profesyonellere yönelik</span>
  <h1>Cihaz, teknoloji ve işletme yazıları</h1>
  <p class="giris">Anahtar kelime doldurmak için değil, karar vermenize yardımcı olmak için yazılmış içerikler.
    Her yazı tek bir soruya cevap verir.</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="izgara izgara-3">
    ${blogYazilar
      .map(
        (y) => `<article class="kart belir" style="display:flex;flex-direction:column">
      <div style="display:flex;gap:.6rem;align-items:center;margin-bottom:.9rem">
        <span class="pul">${y.etiket}</span>
        <span class="mono sonuk" style="font-size:.74rem">${y.dk} dk okuma</span>
      </div>
      <h3 style="font-size:1.12rem;line-height:1.32">${y.baslik}</h3>
      <p style="margin-top:.65rem;flex:1">${y.ozet}</p>
      <span class="btn btn-sade" style="margin-top:1.2rem;font-size:.87rem">Yazıyı oku ${ikon.ok}</span>
    </article>`
      )
      .join('')}
  </div>
  <div class="kart" style="margin-top:2rem;border-style:dashed;text-align:center;padding:2rem">
    <h4>İçerik planı hazır</h4>
    <p style="max-width:66ch;margin:.6rem auto 0">Mevcut sitedeki 82 blog yazısının büyük bölümü birbirinin
      varyasyonu (“lazer epilasyon cihazı”, “lazer epilasyon cihazı fiyatları”, “en iyi lazer epilasyon cihazı”…).
      Yeni yapıda bunlar konu kümelerinde birleştirilip 301 ile yönlendirilecek; SEO değeri korunurken
      içerik gerçekten okunabilir hale gelecek.</p>
  </div>
</div></section>

${cta('', 'Yazıda cevabını bulamadığınız bir soru mu var?', 'Cihaz seçimi, servis ya da yatırım hesabı — doğrudan sorun, deneyimimizle cevaplayalım.')}`
    )
  );

  /* ================= YASAL SAYFALAR ================= */
  const yasalIcerik = {
    kvkk: {
      baslik: 'KVKK Aydınlatma Metni',
      meta: `${marka.ad} olarak 6698 sayılı KVKK kapsamında işlenen kişisel verileriniz, işleme amaçlarımız, hukuki sebepler, aktarım koşulları ve kanun kapsamındaki haklarınız hakkında aydınlatma metni.`,
      bolumler: [
        ['Veri sorumlusu', `${marka.ad}, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusudur. İletişim: ${iletisim.eposta} · ${iletisim.telefon}`],
        ['İşlenen veriler', 'Web sitesi üzerinden ilettiğiniz ad-soyad, telefon, e-posta, işletme adı ve talep içeriğiniz ile teknik nitelikli bağlantı kayıtları işlenmektedir.'],
        ['İşleme amacı', 'Verileriniz; teklif hazırlanması, demo ve servis taleplerinin karşılanması, satış sonrası destek süreçlerinin yürütülmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenir.'],
        ['Hukuki sebep', 'İşleme; sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, veri sorumlusunun meşru menfaati ve açık rızanız hukuki sebeplerine dayanır.'],
        ['Aktarım', 'Verileriniz yalnızca hizmetin gereği olan hallerde ve mevzuatın izin verdiği ölçüde iş ortaklarımıza, tedarikçilerimize ve yetkili kamu kurumlarına aktarılabilir.'],
        ['Haklarınız', 'KVKK m.11 uyarınca verilerinize erişme, düzeltilmesini veya silinmesini isteme, işlemeye itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı yukarıdaki iletişim kanallarından iletebilirsiniz.'],
      ],
    },
    gizlilik: {
      baslik: 'Gizlilik Politikası',
      meta: `${marka.ad} web sitesi üzerinden toplanan bilgilerin nasıl kullanıldığı, saklandığı ve korunduğu; veri güvenliği tedbirleri ve saklama süreleri hakkında gizlilik politikası.`,
      bolumler: [
        ['Kapsam', 'Bu politika, bu web sitesi üzerinden toplanan bilgilerin nasıl kullanıldığını açıklar.'],
        ['Toplanan bilgiler', 'Form aracılığıyla ilettiğiniz iletişim bilgileri ve talebiniz ile sunucu tarafında tutulan teknik erişim kayıtları.'],
        ['Kullanım', 'Bilgileriniz yalnızca talebinize cevap vermek ve hizmet süreçlerini yürütmek için kullanılır; pazarlama amacıyla üçüncü taraflara satılmaz veya kiralanmaz.'],
        ['Saklama', 'Veriler, işlenme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır; sürenin sonunda silinir veya anonim hale getirilir.'],
        ['Güvenlik', 'Verilerinize yetkisiz erişimi önlemek için idari ve teknik tedbirler uygulanır. Site trafiği HTTPS ile şifrelenir.'],
        ['İletişim', `Gizlilikle ilgili sorularınız için: ${iletisim.eposta}`],
      ],
    },
    cerez: {
      baslik: 'Çerez Politikası',
      meta: `${marka.ad} web sitesinde kullanılan zorunlu, analitik ve pazarlama çerezleri; bu çerezlerin amaçları ve tarayıcı üzerinden nasıl yönetilebileceği hakkında bilgilendirme.`,
      bolumler: [
        ['Çerez nedir', 'Çerezler, siteyi ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır.'],
        ['Zorunlu çerezler', 'Sitenin temel işlevleri için gereklidir; devre dışı bırakılamaz ve kişisel tanımlama amacı taşımaz.'],
        ['Analitik çerezler', 'Sayfaların nasıl kullanıldığını anlamak ve içerikleri iyileştirmek için toplu ve anonim istatistik üretir. Rızanız olmadan çalıştırılmaz.'],
        ['Pazarlama çerezleri', 'Reklam ölçümü amacıyla kullanılabilir. Bu kategori yalnızca açık rızanızla etkinleştirilir.'],
        ['Yönetim', 'Tarayıcı ayarlarınızdan çerezleri her zaman silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi sitenin bazı bölümlerinin çalışmamasına yol açabilir.'],
      ],
    },
  };

  yasal.forEach((y) => {
    const i = yasalIcerik[y.slug];
    yaz(
      `${y.slug}.html`,
      sayfa(
        {
          baslik: `${i.baslik} — ${marka.ad}`,
          aciklama: i.meta,
          kanonik: `${y.slug}.html`,
        },
        `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: i.baslik }])}
  <h1 style="font-size:clamp(1.9rem,3.6vw,2.7rem)">${i.baslik}</h1>
  <p class="sonuk" style="margin-top:.9rem;font-size:.88rem">Son güncelleme: Ağustos 2026</p>
</div></section>

<section class="bolum"><div class="kap" style="max-width:820px">
  ${i.bolumler
    .map(
      ([b, m]) => `<div style="margin-bottom:2rem">
    <h2 style="font-size:1.28rem;margin-bottom:.75rem">${b}</h2>
    <p class="giris" style="max-width:none">${m}</p></div>`
    )
    .join('')}
  <div class="kart" style="margin-top:1rem;border-style:dashed">
    <p style="font-size:.88rem">Bu metin tanıtım demosu kapsamında hazırlanmış örnek bir taslaktır.
      Yayına almadan önce şirketin hukuk danışmanı tarafından gözden geçirilmelidir.</p>
  </div>
</div></section>`
      )
    );
  });

  /* ================= 404 ================= */
  yaz(
    '404.html',
    sayfa(
      {
        baslik: 'Sayfa bulunamadı — Estezone Medikal',
        aciklama:
          'Aradığınız sayfa bulunamadı veya taşınmış olabilir. Estezone Medikal cihaz listesinden ilgilendiğiniz platformu bulabilir ya da doğrudan bize ulaşabilirsiniz.',
      },
      `
<section class="bolum" style="padding-block:clamp(5rem,12vw,9rem)"><div class="kap orta">
  <span class="mono" style="font-size:clamp(4rem,14vw,9rem);font-weight:600;letter-spacing:-.05em;background:linear-gradient(120deg,var(--vurgu),var(--mavi));-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1">404</span>
  <h1 style="margin-top:1rem;font-size:clamp(1.7rem,3.4vw,2.5rem)">Bu sayfa taşınmış olabilir</h1>
  <p class="giris" style="margin:1.1rem auto 0">Aradığınız cihaz sayfasını cihaz listemizden bulabilir
    ya da doğrudan bize sorabilirsiniz.</p>
  <div class="btn-grup" style="justify-content:center;margin-top:2rem">
    <a class="btn btn-ana btn-b" href="cihazlar.html">Tüm cihazlar ${ikon.ok}</a>
    <a class="btn btn-hat btn-b" href="iletisim.html">Bize sorun</a>
  </div>
</div></section>`
    )
  );
};
