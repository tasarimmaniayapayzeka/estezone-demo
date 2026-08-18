/* Bayi (yetkili satıcı / kurumsal müşteri) giriş ve üyelik başvurusu sayfaları.
   Ana sitedeki tek kimlik doğrulamalı bölüm burası. Site statik olduğu için
   GERÇEK giriş YOK — form yalnız demo davranışı gösterir ve bunu açıkça yazar.
   Canlıya geçişte arka uç bağlanacak; alan adları ve belge matrisi hazır. */
const P = require('./parcalar.js');
const { kacis, ikon, sayfa, cta, kirinti } = P;
const icerik = require('../veri/icerik.js');
const { marka, iletisim, yetkiler } = icerik;

/* ── Belge matrisi ────────────────────────────────────────────────────────
   Hangi işletme türünden hangi belgenin isteneceği. Ortak belgeler herkese,
   türe özel olanlar seçime göre eklenir; formda liste seçimle canlı değişir.
   ⚠ ÖN BİLGİLENDİRME. Tıbbi Cihaz Satış, Reklam ve Tanıtım Yönetmeliği ile
   sağlık kuruluşu mevzuatına dayanır; kesin liste işletmenin ruhsat tipine
   göre değişir ve hukukçu teyidi bekliyor (notlar/ACIK-RISKLER.md md.4). */
const ORTAK_BELGELER = [
  'Vergi levhası',
  'İmza sirküleri veya imza beyannamesi',
  'Ticaret / esnaf odası faaliyet belgesi',
  'İşyeri açma ve çalışma ruhsatı',
];

const ISLETME_TURLERI = [
  {
    deger: 'salon',
    ad: 'Güzellik salonu',
    yetki: 'salon',
    belgeler: ['Güzellik salonu işletme belgesi', 'Uygulayıcı personel sertifikaları'],
    not: 'Salonlar yalnızca sınırlı bir cihaz grubunu bulundurabilir; teklif öncesi envanter birlikte gözden geçirilir.',
  },
  {
    deger: 'merkez',
    ad: 'Güzellik merkezi',
    yetki: 'merkez',
    belgeler: [
      'Güzellik merkezi ruhsatı',
      'Sorumlu personel belgeleri',
      'ÜTS (Ürün Takip Sistemi) kaydı',
    ],
    not: 'Epilasyon endikasyonlu, sınırlı enerji aralığındaki sistemler bu grupta değerlendirilir.',
  },
  {
    deger: 'tibbi',
    ad: 'Poliklinik · tıp merkezi · hastane',
    yetki: 'tibbi',
    belgeler: [
      'Sağlık kuruluşu faaliyet izin belgesi',
      'Mesul müdür belgesi',
      'Hekim diploma ve uzmanlık belgesi',
      'ÜTS (Ürün Takip Sistemi) kaydı',
    ],
    not: 'Hekim sorumluluğundaki tıbbi lazer ve invaziv sistemler yalnızca bu gruba satılabilir.',
  },
  {
    deger: 'bayi',
    ad: 'Yetkili satıcı / bayi adayı',
    yetki: 'tibbi',
    belgeler: [
      'Tıbbi cihaz satış merkezi yetki belgesi',
      'ÜTS (Ürün Takip Sistemi) kaydı',
      'Satış ve tanıtım elemanı sertifikası',
      'Klinik destek elemanı sertifikası',
    ],
    not: 'Cihaz satışı yapacak noktaların belgeli olması gerekir. Belgesi eksik aday reddedilmez — belgelendirme sürecine alınır.',
  },
];

module.exports = function ({ yaz }) {
  /* İstemciye taşınan belge matrisi: seçime göre liste anında değişir. */
  const belgeVeri = `<script>window.ESTEZONE_BELGE=${JSON.stringify({
    ortak: ORTAK_BELGELER,
    turler: Object.fromEntries(
      ISLETME_TURLERI.map((t) => [t.deger, { ad: t.ad, belgeler: t.belgeler, not: t.not }])
    ),
  })};</script>`;

  /* ================= BAYİ GİRİŞİ ================= */
  yaz(
    'bayi-giris.html',
    sayfa(
      {
        baslik: 'Bayi Girişi — Estezone Medikal',
        aciklama:
          'Estezone yetkili satıcı ve kurumsal müşteri paneli girişi. Cihaz envanteriniz, servis kayıtlarınız, sarf siparişleriniz ve belgeleriniz tek yerde.',
        aktif: 'bayi-giris.html',
        kanonik: 'bayi-giris.html',
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Bayi Girişi' }])}
  <span class="ust-etiket" style="margin-top:1rem">Yetkili ağ</span>
  <h1>Bayi girişi</h1>
  <p class="giris">Cihaz envanteriniz, garanti ve servis kayıtlarınız, sarf siparişleriniz ve
    belgeleriniz tek panelde. Panel yalnızca onaylı işletmelere açıktır.</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="izgara izgara-2 bayi-izgara" style="gap:2.4rem;align-items:stretch">
    <div class="arac">
      <span class="ust-etiket">Giriş</span>
      <h2 style="font-size:1.4rem;margin-top:.8rem">Panele girin</h2>
      <form data-form data-bayi-giris style="margin-top:1.6rem">
        <label class="alan"><span>E-posta</span>
          <input type="email" name="eposta" autocomplete="username" placeholder="ornek@isletmeniz.com" required></label>
        <label class="alan"><span>Şifre</span>
          <input type="password" name="sifre" autocomplete="current-password" placeholder="••••••••" required></label>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.3rem">
          <label style="display:flex;gap:.55rem;align-items:center;font-size:.87rem;color:var(--metin-2)">
            <input type="checkbox" style="width:auto"> Beni hatırla</label>
          <a href="iletisim.html" style="font-size:.87rem;color:var(--vurgu)">Şifremi unuttum</a>
        </div>
        <button class="btn btn-ana btn-b" type="submit" style="width:100%">Giriş yap ${ikon.ok}</button>
        <p class="sonuk" hidden data-form-not style="margin-top:1rem;padding:1rem 1.15rem;background:var(--vurgu-sis);border:1px solid var(--kenar);border-radius:10px;font-size:.89rem">
          <strong style="color:var(--metin)">Bu bir tasarım demosudur.</strong> Panel henüz bağlı değil;
          canlı sistemde giriş, onaylı bayi hesabınızla yapılacaktır.</p>
      </form>
      <p class="sonuk" style="margin-top:1.4rem;font-size:.9rem">Henüz hesabınız yok mu?
        <a href="bayi-basvuru.html" style="color:var(--vurgu)">Üyelik başvurusu yapın</a>.</p>
    </div>

    <div>
      <div class="kart" style="margin-bottom:1.1rem">
        <h3 style="font-size:1.12rem">Panelde ne var?</h3>
        <div class="bayi-fayda" style="margin-top:1.2rem">
          ${[
            [ikon.parca, 'Cihazlarım', 'Aldığınız her cihaz, seri numarası ve garanti bitiş tarihiyle listelenir.'],
            [ikon.servis, 'Servis kayıtları', 'Açtığınız arıza kayıtları, yapılan işlemler ve değişen parçalar.'],
            [ikon.belge, 'Belgelerim', 'CE, ÜTS, garanti ve fatura belgeleriniz indirilebilir halde durur.'],
            [ikon.rozet, 'Sarf siparişi', 'Başlık, lamba ve sarf malzemesini panelden tekrar sipariş edin.'],
          ]
            .map(
              ([ik, ad, ac]) => `<div class="bayi-fayda-satir">
            <span class="im">${ik}</span>
            <div><b>${ad}</b><small>${ac}</small></div></div>`
            )
            .join('')}
        </div>
      </div>
      <div class="kart">
        <h4>Giriş sorunu mu yaşıyorsunuz?</h4>
        <p style="margin-top:.5rem">Hesabınız onay aşamasındaysa giriş henüz açılmamış olabilir.
          Durumunuzu öğrenmek için bize ulaşın.</p>
        <div class="btn-grup" style="margin-top:1.2rem">
          <a class="btn btn-hat btn-k" href="tel:${iletisim.telefonHam}">${ikon.tel}${iletisim.telefon}</a>
          <a class="btn btn-wa btn-k" href="https://wa.me/${iletisim.whatsappHam}?text=${encodeURIComponent(
            'Merhaba, bayi paneline giriş yapamıyorum. Başvuru durumumu öğrenebilir miyim?'
          )}" target="_blank" rel="noopener">${ikon.wa}WhatsApp</a>
        </div>
      </div>
    </div>
  </div>
</div></section>`
    )
  );

  /* ================= BAYİ ÜYELİK BAŞVURUSU ================= */
  yaz(
    'bayi-basvuru.html',
    sayfa(
      {
        baslik: 'Bayi Üyelik Başvurusu — Estezone Medikal',
        aciklama:
          'Estezone yetkili satıcı ve kurumsal müşteri ağına katılım başvurusu. İşletme türünüze göre gereken belgeler formda listelenir.',
        aktif: 'bayi-giris.html',
        kanonik: 'bayi-basvuru.html',
      },
      `
<section class="sayfa-bas"><div class="kap">
  ${kirinti('', [{ ad: 'Bayi Girişi', url: 'bayi-giris.html' }, { ad: 'Üyelik Başvurusu' }])}
  <span class="ust-etiket" style="margin-top:1rem">Yetkili ağ</span>
  <h1>Bayi üyelik başvurusu</h1>
  <p class="giris">Bilgilerinizi ve belgelerinizi gönderin; başvurunuz değerlendirildiğinde
    e-posta ve WhatsApp ile bilgilendirilirsiniz. Zaten üyeyseniz
    <a href="bayi-giris.html" style="color:var(--vurgu)">giriş yapın</a>.</p>
</div></section>

<section class="bolum"><div class="kap">
  <div class="izgara izgara-2 bayi-izgara" style="gap:2.4rem;align-items:stretch">
    <div class="arac">
      <span class="ust-etiket">Başvuru formu</span>
      <h2 style="font-size:1.4rem;margin-top:.8rem">İşletme bilgileriniz</h2>

      <form data-form data-bayi-basvuru style="margin-top:1.6rem">
        <label class="alan"><span>Firma / işletme adı *</span>
          <input name="firma" required placeholder="Ticari unvanınız"></label>

        <label class="alan"><span>İşletme türü *</span>
          <select name="tur" data-bayi-tur required>
            <option value="">— Seçin —</option>
            ${ISLETME_TURLERI.map((t) => `<option value="${t.deger}">${kacis(t.ad)}</option>`).join('')}
          </select></label>

        <div class="ikili">
          <label class="alan"><span>Vergi dairesi</span><input name="vd" placeholder="ör. Çankaya"></label>
          <label class="alan"><span>Vergi no / TC *</span><input name="vno" required inputmode="numeric"></label>
        </div>

        <div class="ikili">
          <label class="alan"><span>Yetkili ad-soyad *</span><input name="yetkili" required></label>
          <label class="alan"><span>Ünvan</span><input name="unvan" placeholder="ör. Sahibi, sorumlu hekim"></label>
        </div>

        <div class="ikili">
          <label class="alan"><span>Telefon (WhatsApp) *</span>
            <input name="tel" type="tel" required placeholder="05xx xxx xx xx"></label>
          <label class="alan"><span>E-posta (giriş) *</span>
            <input name="eposta" type="email" required autocomplete="username" placeholder="ornek@isletmeniz.com"></label>
        </div>

        <div class="ikili">
          <label class="alan"><span>İl *</span><input name="il" required></label>
          <label class="alan"><span>İlçe</span><input name="ilce"></label>
        </div>

        <label class="alan"><span>Adres</span><textarea name="adres" rows="3"></textarea></label>

        <label class="alan"><span>Şifre * (giriş için)</span>
          <input name="sifre" type="password" required autocomplete="new-password"
                 minlength="8" placeholder="En az 8 karakter"></label>

        <div class="belge-kutu">
          <span class="ust-etiket">Belgeler</span>
          <div data-belge-liste>
            <p class="sonuk" style="font-size:.88rem;margin-top:.7rem">Önce işletme türünü seçin —
              gereken belgeler burada listelenir.</p>
          </div>
        </div>

        <label class="onay">
          <input type="checkbox" required>
          <span><a href="kvkk.html" style="color:var(--vurgu)">KVKK aydınlatma metnini</a> okudum;
          kişisel ve işletme verilerimin başvurumun değerlendirilmesi amacıyla işlenmesine
          açık rıza veriyorum. *</span></label>

        <label class="onay">
          <input type="checkbox">
          <span>Kampanya ve bilgilendirmeler için ticari elektronik ileti almayı kabul ediyorum.</span></label>

        <button class="btn btn-ana btn-b" type="submit" style="width:100%">Başvuruyu gönder ${ikon.ok}</button>
        <p class="sonuk" hidden data-form-not style="margin-top:1rem;padding:1rem 1.15rem;background:var(--vurgu-sis);border:1px solid var(--kenar);border-radius:10px;font-size:.89rem">
          Başvurunuz alındı. <strong style="color:var(--metin)">Bu bir tasarım demosudur</strong> —
          canlı sistemde form belge yüklemeye, e-posta bildirimine ve onay akışına bağlanacaktır.</p>
      </form>
    </div>

    <div>
      <div class="kart" style="margin-bottom:1.1rem">
        <h3 style="font-size:1.12rem">Başvuru nasıl ilerler?</h3>
        <ol class="bayi-adim">
          ${[
            ['Başvuru', 'Formu ve belgelerinizi iletirsiniz.'],
            ['Belge kontrolü', 'İşletme türünüze göre belgeleriniz incelenir; eksik varsa birlikte tamamlanır.'],
            ['Değerlendirme', 'Bölge, hedef cihaz grubu ve mevzuat uygunluğu birlikte değerlendirilir.'],
            ['Onay ve giriş', 'Onaylanan hesap için panel açılır; e-posta ve WhatsApp ile bilgilendirilirsiniz.'],
          ]
            .map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`)
            .join('')}
        </ol>
      </div>

      <div class="kart" style="margin-bottom:1.1rem">
        <h4>İşletme türü neden soruluyor?</h4>
        <p style="margin-top:.5rem">Estetik cihazların bir bölümü yalnızca hekim sorumluluğundaki
          sağlık kuruluşlarına satılabilir. İşletme türünüz, hangi cihaz grubunu
          bulundurabileceğinizi ve hangi belgelerin isteneceğini belirler.</p>
        <div class="yetki-liste" style="margin-top:1.1rem">
          ${Object.entries(yetkiler)
            .map(
              ([, y]) => `<div class="yetki-satir">
            <span class="d" style="background:${y.renk}"></span>
            <div><b>${kacis(y.ad)}</b><small>${kacis(y.aciklama)}</small></div></div>`
            )
            .join('')}
        </div>
        <p class="sonuk" style="font-size:.8rem;margin-top:1rem">Bu sınıflandırma ön bilgilendirmedir.
          Kesin durum; cihazın kullanım amacı beyanı, ÜTS kaydınız ve ruhsat tipinizle birlikte
          değerlendirilir.</p>
      </div>

      <div class="kart">
        <h4>Sorunuz mu var?</h4>
        <p style="margin-top:.5rem">Başvuru öncesi belge durumunuzu konuşalım; eksik belgeyle de
          süreci başlatabiliriz.</p>
        <div class="btn-grup" style="margin-top:1.2rem">
          <a class="btn btn-hat btn-k" href="tel:${iletisim.telefonHam}">${ikon.tel}${iletisim.telefon}</a>
          <a class="btn btn-wa btn-k" href="https://wa.me/${iletisim.whatsappHam}?text=${encodeURIComponent(
            'Merhaba, Estezone bayi üyeliği için başvurmak istiyorum. Belge listesi hakkında bilgi alabilir miyim?'
          )}" target="_blank" rel="noopener">${ikon.wa}WhatsApp</a>
        </div>
      </div>
    </div>
  </div>
  ${belgeVeri}
</div></section>

${cta('', 'Önce cihazları görmek ister misiniz?', 'Bayi olmadan da teklif alabilirsiniz — portföyü inceleyin, ihtiyacınıza uygun platformu birlikte belirleyelim.')}`
    )
  );
};

module.exports.ISLETME_TURLERI = ISLETME_TURLERI;
module.exports.ORTAK_BELGELER = ORTAK_BELGELER;
