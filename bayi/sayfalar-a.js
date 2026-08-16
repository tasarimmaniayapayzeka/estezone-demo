/* Sayfa üreticileri — A grubu: program, rakip, P1–P5 */
const { hero, bolum, kutu, rozet, tablo } = require('./sablon');
const V = require('./veri');

const puanCiz = (n, sinif = '') =>
  `<span class="puan ${sinif}">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= n ? 'dolu' : ''}"></i>`).join('')}</span>`;

/* =========================================================== 1. PROGRAM */
function index() {
  const govde =
    hero({
      etiket: 'Estezone Medikal · teklif · 16 Ağustos 2026',
      baslik: 'Bayi zincirini büyütecek 8 prototip',
      spot: V.PROGRAM.tez,
      notlar: [
        '8 çalışan prototip',
        'Türkiye + yurt dışı rakip kıyası',
        'Bayi odaklı SEO planı',
        'Kanal bazlı dijital pazarlama',
        'Üç kişilikli AI asistan',
        '10 alternatif iş modeli',
      ],
    }) +
    bolum({
      baslik: 'Neyi çözüyoruz',
      ustBaslik: 'Teşhis',
      icerik: `
      <div class="izgara i3 ara">
        ${kutu(
          'Bayilik kapısı yok',
          'estezone.com.tr’de <strong>“bayilik” kelimesi hiç geçmiyor.</strong> 122 URL’de tek form var. ' +
            'Bayi olmak isteyen birinin yapabileceği tek şey telefon etmek — ve mesai dışında o da yok.',
          'uyari'
        )}
        ${kutu(
          'Bölge kavramı yok',
          'Kim nerede satıyor belli değil. İki satıcının aynı kliniği aradığı gün fiyat kırılır ve ağ ' +
            'içeriden çöker. Bölge koruması ilan edilmeden bayi ağı büyütülemez.',
          'uyari'
        )}
        ${kutu(
          'Tekrar eden gelir kapalı',
          'Lamba, bar, kartuş, başlık, gözlük — hepsi telefonla satılıyor, dolayısıyla ölçülmüyor ve ' +
            'büyütülemiyor. Classys’te <strong>sarf, cironun %46’sı.</strong>',
          'uyari'
        )}
      </div>
      <div class="kutu vurgulu ara">
        <h4>Ama bu bir dezavantaj değil</h4>
        <p>Taranan hiçbir Türk rakipte de yok. Sektörün tamamı telefon + WhatsApp + fuar üzerinde
        duruyor. Bu altyapıyı ilk kuran firma, ürününü değiştirmeden pazar payını değiştirir.</p>
      </div>`,
    }) +
    bolum({
      baslik: 'Ağ üç katmanlıdır',
      ustBaslik: 'Model',
      zemin: 'gri',
      icerik: `
      <p>“Bayi” Türkiye’de iki ayrı şeye deniyor: cihazı alıp <em>satan</em> taraf ve cihazı alıp
      <em>kullanan</em> taraf. Program ikisini de kapsar, üçüncü katman satmadan yönlendirir.
      Katmanları ayırmadan tek bir “bayilik” programı kurmak, üç farklı insanı aynı formla
      elemeye çalışmak demektir.</p>
      <div class="izgara i3 ara">
        ${V.KATMANLAR.map(
          (k) => `<div class="kutu">
          <div class="rozet-sar" style="margin-bottom:8px">
            ${rozet('Katman ' + k.kod, 'mavi')} ${rozet(k.rol)}
          </div>
          <h4>${k.ad}</h4>
          <p>${k.tanim}</p>
          <div class="ayrac" style="margin:14px 0"></div>
          <p class="kucuk"><strong>Giriş eşiği:</strong> ${k.girisEsigi}</p>
          <p class="kucuk"><strong>Ortağın kazancı:</strong> ${k.kazanc}</p>
          <p class="kucuk"><strong>Estezone’un kazancı:</strong> ${k.estezoneKazanci}</p>
          <p class="kucuk" style="color:var(--uyari)"><strong>Risk:</strong> ${k.risk}</p>
          <p class="ara-s">${rozet('12 ay hedefi: ' + k.hedef, 'yesil')}</p>
        </div>`
        ).join('')}
      </div>`,
    }) +
    bolum({
      baslik: '8 prototip',
      ustBaslik: 'Çözüm',
      icerik: `
      <p>Her biri ayrı bir sayfada <strong>çalışır durumda</strong>. Tıklayın, deneyin —
      slayt değil, prototip.</p>
      <div class="izgara i2 ara">
        ${V.PROTOTIPLER.map(
          (p) => `<a class="proto" href="${p.sayfa}">
          <span class="proto-kod">${p.kod}</span>
          <h3>${p.ad}</h3>
          <p>${p.ozet}</p>
          <p class="kucuk"><strong>Neden:</strong> ${p.neden}</p>
          ${p.uyari ? `<p class="kucuk" style="color:var(--uyari)"><strong>Kısıt:</strong> ${p.uyari}</p>` : ''}
          <div class="olcek">
            <span>Etki ${puanCiz(p.etki)}</span>
            <span>Zorluk ${puanCiz(p.zorluk, 'zor')}</span>
            <span>${p.sure}</span>
          </div>
        </a>`
        ).join('')}
      </div>`,
      zemin: 'gri',
    }) +
    bolum({
      baslik: 'Sıralama önerisi',
      ustBaslik: 'Nereden başlanır',
      icerik: `
      <p>Etkisi yüksek + zorluğu düşük olanlar önce. Portal ve merkez haritası en değerli ikisi
      ama en pahalı ikisi — onlar için önce zemin gerekir.</p>
      ${tablo(
        ['Sıra', 'Prototip', 'Etki', 'Zorluk', 'Süre', 'Neden bu sırada'],
        [
          ['1', '<strong>P1 Başvuru hunisi</strong>', puanCiz(5), puanCiz(2, 'zor'), '2 hafta', 'Kapı açılmadan hiçbir şeyin anlamı yok'],
          ['2', '<strong>P2 Bölge haritası</strong>', puanCiz(5), puanCiz(2, 'zor'), '1 hafta', 'Kıtlık, başvuruyu 2–3 katına çıkarır'],
          ['3', '<strong>P5 Kazanç simülatörü</strong>', puanCiz(4), puanCiz(2, 'zor'), '2 hafta', 'Ciddi olmayan adayı kendi eliyle eler'],
          ['4', '<strong>P6 Asistan</strong>', puanCiz(4), puanCiz(3, 'zor'), '3 hafta', 'Mesai dışı kaybı kapatır; hat zaten kurulu'],
          ['5', '<strong>P8 Ko-op motoru</strong>', puanCiz(4), puanCiz(3, 'zor'), '3–4 hafta', 'Satılan cihazın atıl kalmasını engeller'],
          ['6', '<strong>P7 Akademi</strong>', puanCiz(4), puanCiz(3, 'zor'), '4–6 hafta', 'Kademe olmadan sadakat mekanizması yok'],
          ['7', '<strong>P3 Portal</strong>', puanCiz(5), puanCiz(4, 'zor'), '6–8 hafta', 'En yüksek getiri ama sarf verisi olmadan boş kalır'],
          ['8', '<strong>P4 Merkez haritası</strong>', puanCiz(5), puanCiz(3, 'zor'), '3–4 hafta', 'Hukuk onayı beklemeli — en riskli, en değerli'],
        ]
      )}`,
    }) +
    bolum({
      baslik: '12 ayda hedeflenen',
      ustBaslik: 'Ölçü',
      zemin: 'koyu',
      icerik: `
      <div class="sayi-sar ara">
        <div class="sayi"><b>6–10</b><span>bölge bayisi (bugün: 0–2, gayriresmî)</span></div>
        <div class="sayi"><b>120–180</b><span>kayıtlı yetkili uygulama merkezi</span></div>
        <div class="sayi"><b>25–40</b><span>aylık nitelikli başvuru (bugün: ölçülmüyor)</span></div>
        <div class="sayi"><b>%30</b><span>sarf gelirinin ciroya oranı (Classys’te %46)</span></div>
      </div>
      <p class="ara" style="color:#adcbe8">Bu rakamlar hedeftir, tahmin değildir. Gerçek başlangıç
      noktası GA4 + Ads + Search Console dışa aktarımı alınmadan bilinemez — Faz 0’ın ilk maddesi budur.</p>
      <div class="btn-sar">
        <a class="btn btn-acik" href="rakip.html">Rakipler ne yapıyor →</a>
        <a class="btn btn-acik" href="yol-haritasi.html">Yol haritası →</a>
      </div>`,
    });

  return { dosya: 'index.html', baslik: 'Program', aciklama: 'Estezone bayi ağı büyütme programı — 8 prototip', govde };
}

/* ============================================================ 2. RAKİP */
function rakip() {
  const im = (v) =>
    v === 1
      ? '<span class="im im-var">✓</span>'
      : v === 0.5
      ? '<span class="im im-yari">~</span>'
      : '<span class="im im-yok">−</span>';

  const matris = `<div class="tablo-sar"><table class="matris">
    <thead><tr><th>Firma</th>${V.TR_RAKIP.kriterler.map(([, ad]) => `<th>${ad}</th>`).join('')}</tr></thead>
    <tbody>${V.TR_RAKIP.firmalar
      .map(
        (f) => `<tr class="${f.kendisi ? 'kendi' : ''}">
        <td><strong>${f.ad}</strong><br><span class="kucuk">${f.not}</span></td>
        ${V.TR_RAKIP.kriterler.map(([k]) => `<td>${im(f.d[k])}</td>`).join('')}
      </tr>`
      )
      .join('')}</tbody></table></div>
    <p class="kaynak">✓ var · ~ kısmen/dolaylı · − yok. Gözlemler 16 Ağustos 2026’da ilgili sitelerin
    kamuya açık sayfalarından alındı. Kapalı bayi portalları dışarıdan görünmeyebilir — bu tablo
    <strong>“alenen ilan edilmiş program”</strong> ölçer, firmanın iç süreçlerini değil.</p>`;

  const govde =
    hero({
      etiket: 'Rakip kıyası',
      baslik: 'Türkiye’de kanal altyapısı kuran yok',
      spot:
        'Altı Türk tedarikçi 12 kanal kriterinde tarandı. Toplam <strong>73 hücrenin 4’ü</strong> dolu. ' +
        'Aynı kriterler yurt dışında sektörün standardı.',
    }) +
    bolum({
      baslik: 'Türkiye — 12 kriter, 6 firma',
      ustBaslik: 'Yerel',
      icerik: matris + `<div class="kutu vurgulu ara"><h4>Sonuç</h4><p>${V.TR_RAKIP.sonuc}</p></div>`,
    }) +
    bolum({
      baslik: 'Rakiplerin gerçekten yaptığı üç şey',
      ustBaslik: 'Adil olalım',
      zemin: 'gri',
      icerik: `
      <p>Tabloda boş görünmek “kötü firma” demek değil. Rakipler kanal işini dijitalde değil,
      başka yerlerde yapıyor — ve bazıları iyi yapıyor:</p>
      <div class="izgara i3 ara">
        ${kutu(
          'Medsatek — anahtar teslim kurulum',
          'Cihaz değil <strong>işletme</strong> satıyor: güzellik merkezi kurulum hizmeti. ' +
            'Bu, bayi kazanmanın en güçlü yollarından biri ve rakip bu kapıyı açtı. ' +
            'Ayrıca TL yatırım bandı yayınlayarak şeffaflık konumunu tutuyor.',
          'altin'
        )}
        ${kutu(
          'MedLaser — ihracat kası',
          'Türkiye, İran, Azerbaycan, Gürcistan, Kuzey Irak ve Kıbrıs’ta distribütörlük beyanı. ' +
            'Estezone yurt dışına açılmayı düşündüğünde karşısında hazır bir rakip bulacak.',
          'altin'
        )}
        ${kutu(
          'E-Medikal — saha yaygınlığı',
          '“81 ilde iş ortağı” diyor. İddia doğruysa ağ zaten var; eksik olan onu <em>görünür ve ' +
            'yönetilebilir</em> kılan altyapı. Sitede ortaklığa açılan tek bir kapı bulunamadı.',
          'altin'
        )}
      </div>`,
    }) +
    bolum({
      baslik: 'Yurt dışında ne yapılıyor',
      ustBaslik: 'Benchmark',
      icerik: `
      <p>Aşağıdakiler moda değil, <strong>oturmuş kalıplar</strong>. Her satırda “Estezone için ne
      anlama geliyor” ayrıca yazıldı — çünkü hiçbiri olduğu gibi kopyalanamaz.</p>
      <div class="ara">
        ${V.DIS_BENCHMARK.map(
          (b) => `<details>
          <summary>${b.marka} — ${b.hamle}</summary>
          <div>
            <p>${b.ne}</p>
            <p class="ara-s">${rozet(b.rakam, 'mavi')}</p>
            <p class="ara-s"><strong>Estezone için:</strong> ${b.tr}</p>
            <p class="kaynak">Kaynak: <a href="${b.kaynakUrl}" target="_blank" rel="noopener">${b.kaynak}</a></p>
          </div>
        </details>`
        ).join('')}
      </div>`,
      zemin: 'gri',
    }) +
    bolum({
      baslik: 'Neyi kopyalarız, neyi kopyalayamayız',
      ustBaslik: 'Uyarlama',
      icerik: tablo(
        ['Yurt dışı uygulaması', 'Türkiye’de durum', 'Karar'],
        [
          [
            'Hasta yorumu ve puanlı merkez haritası',
            '33075 s. Tanıtım Yönetmeliği sağlık kuruluşunu bağlar — Türkçe içerikte hasta yorumu ve fiyat yayınlanamaz',
            '<strong>Kopyalanamaz.</strong> Harita bir <em>kayıt defteri</em> olarak kurulur: cihaz, sertifika, adres',
          ],
          [
            'Öncesi-sonrası arşivi (Candela “Marketing Commitment”)',
            'Tedavi sonucu görseli halka açık tanıtımda kullanılamaz',
            '<strong>Kısmen.</strong> Kapalı profesyonel katmanda, üyelik arkasında tutulur',
          ],
          [
            'Portalden sarf siparişi ve ödeme (Classys/Alma)',
            'Ek-3 dışı tıbbi cihazların internetten satışı yasak (md.26/4)',
            '<strong>Uyarlanır.</strong> Sipariş = teklif talebi; ödeme sitede alınmaz',
          ],
          [
            '“Verified Provider” rozeti (InMode)',
            'Yasak değil — doğrulanabilir olgu beyanı',
            '<strong>Aynen alınır.</strong> Ama rozet ölçütü belgelenir ve yıllık yenilenir',
          ],
          [
            'Deal registration + bölge koruması',
            'Ticari sözleşme konusu, mevzuat engeli yok',
            '<strong>Aynen alınır.</strong> Ağın çökmesini önleyen tek mekanizma',
          ],
          [
            'Sertifikasyon akademisi (Alma Academy / InMode University)',
            'Mevzuat zaten sertifikalı personel arıyor',
            '<strong>Aynen alınır.</strong> Zorunluluk, programa çevrilince kaldıraç olur',
          ],
          [
            '“Tek yetkili distribütör” vurgusu',
            'Belgesiz kullanımı Reklam Kurulu’nun en kolay ceza kestiği kalıp',
            '<strong>Şartlı.</strong> Tarihli sözleşme kopyası dosyada yoksa yazılmaz',
          ],
        ]
      ),
    });

  return { dosya: 'rakip.html', baslik: 'Rakip kıyası', aciklama: 'Türkiye ve yurt dışı bayi programı kıyaslaması', govde };
}

/* ========================================================= 3. P1 BAŞVURU */
function basvuru() {
  const iller = V.BOLGELER.flatMap((b) => b.iller.map(([ad, durum]) => ({ ad, durum, bolge: b.ad })));

  const govde =
    hero({
      etiket: 'Prototip P1 · çalışır durumda',
      baslik: 'Başvuru hunisi + otomatik skorlama',
      spot:
        'Aşağıdaki form <strong>gerçekten çalışıyor</strong>: seçim yaptıkça sağdaki skor, kademe ' +
        'önerisi ve kapı kontrolü canlı güncellenir. Bugün Estezone’a bayi adayının ulaşmasının ' +
        'tek yolu telefon.',
      notlar: ['100 puanlık skor', 'Belge kapısı', 'Bölge müsaitliği', 'Otomatik kademe önerisi'],
    }) +
    bolum({
      baslik: 'Yetkili ağ başvurusu',
      icerik: `
      <div class="izgara i21 ara">
        <form id="basvuru-form">
          <div class="kutu">
            <h4>1 · Hangi katman</h4>
            <p class="kucuk">Üç ayrı yol, üç ayrı eşik. Yanlış katmana başvuran elenmez, doğru katmana yönlendirilir.</p>
            <div class="secim-sar ara-s">
              <button type="button" class="secim" data-secim="rol" data-deger="bayi">Bölge bayisi <span class="kucuk">(satar)</span></button>
              <button type="button" class="secim secili" data-secim="rol" data-deger="merkez">Uygulama merkezi <span class="kucuk">(kullanır)</span></button>
              <button type="button" class="secim" data-secim="rol" data-deger="referans">Referans ortağı <span class="kucuk">(yönlendirir)</span></button>
            </div>
          </div>

          <div class="kutu ara-s">
            <h4>2 · İşletme</h4>
            <div class="alan">
              <label for="f-tur">İşletme türü</label>
              <select id="f-tur">
                <option value="klinik">Poliklinik / muayenehane</option>
                <option value="tipmerkezi">Tıp merkezi / hastane</option>
                <option value="guzellikmerkezi" selected>Güzellik merkezi</option>
                <option value="salon">Güzellik salonu</option>
                <option value="medikal">Medikal satış / servis firması</option>
                <option value="yatirimci">Bireysel yatırımcı (henüz işletme yok)</option>
              </select>
              <p class="ipucu">İşletme türü, hangi cihazların önerilebileceğini de belirler.</p>
            </div>
            <div class="alan">
              <label for="f-il">Hedef bölge</label>
              <select id="f-il">
                ${iller
                  .map(
                    (i) =>
                      `<option value="${i.ad}" data-durum="${i.durum}"${i.ad === 'Bursa' ? ' selected' : ''}>${i.ad} — ${
                        i.durum === 'acik' ? 'açık' : i.durum === 'rezerve' ? 'görüşme sürüyor' : 'kapalı'
                      }</option>`
                  )
                  .join('')}
              </select>
              <p class="ipucu">Durum canlı: <strong>Konya</strong> (görüşmede) veya <strong>Ankara</strong> (kapalı)
              seçin — skor düşer ve alternatif önerilir.</p>
            </div>
          </div>

          <div class="kutu ara-s">
            <h4>3 · Belgeler <span class="rozet kirmizi">kapı</span></h4>
            <p class="kucuk">Tıbbi cihaz satan her noktanın belgeli olması gerekir. Belgesiz aday
            <em>reddedilmez</em> — belgelendirme sürecine alınır.</p>
            <div class="secim-sar ara-s">
              <button type="button" class="secim" data-secim="belge" data-deger="yetki">Satış merkezi yetki belgesi</button>
              <button type="button" class="secim secili" data-secim="belge" data-deger="uts">ÜTS kaydı</button>
              <button type="button" class="secim" data-secim="belge" data-deger="satis">Satış ve tanıtım elemanı sertifikası</button>
              <button type="button" class="secim" data-secim="belge" data-deger="klinik">Klinik destek elemanı sertifikası</button>
              <button type="button" class="secim secili" data-secim="belge" data-deger="ruhsat">İşyeri açma ruhsatı</button>
            </div>
          </div>

          <div class="kutu ara-s">
            <h4>4 · Kapasite</h4>
            <div class="alan">
              <label for="f-deneyim">Sektör deneyimi — <span id="f-deneyim-d">6 yıl</span></label>
              <input type="range" id="f-deneyim" min="0" max="20" value="6">
            </div>
            <div class="alan">
              <label for="f-cihaz">Halihazırda kullandığınız cihaz — <span id="f-cihaz-d">2 cihaz</span></label>
              <input type="range" id="f-cihaz" min="0" max="10" value="2">
            </div>
            <div class="alan">
              <label for="f-butce">Yatırım bandı</label>
              <select id="f-butce">
                <option value="0">Henüz belirsiz</option>
                <option value="1">250.000 ₺ altı</option>
                <option value="2" selected>250.000 – 750.000 ₺</option>
                <option value="3">750.000 – 2.000.000 ₺</option>
                <option value="4">2.000.000 ₺ üzeri</option>
              </select>
              <p class="ipucu">Bant sorulmadığı için bugün satış ekibi her adaya aynı süreyi ayırıyor.</p>
            </div>
          </div>

          <div class="kutu ara-s">
            <h4>5 · İletişim ve izin</h4>
            <div class="izgara i2">
              <div class="alan"><label for="f-ad">Ad soyad</label><input type="text" id="f-ad" placeholder="Demo — doldurmak zorunda değilsiniz"></div>
              <div class="alan"><label for="f-tel">Telefon</label><input type="tel" id="f-tel" placeholder="0___ ___ __ __"></div>
            </div>
            <label class="onay"><input type="checkbox" checked> Aydınlatma metnini okudum, kişisel verilerimin başvuru değerlendirmesi için işlenmesine <strong>açık rıza</strong> veriyorum.</label>
            <label class="onay"><input type="checkbox"> Ticari elektronik ileti almak istiyorum <span class="kucuk">(ayrı kutu — aydınlatma metnine gömülemez)</span></label>
            <button class="btn btn-ana" type="submit">Başvuruyu gönder</button>
            <div id="form-sonuc" class="ara-s"></div>
          </div>
        </form>

        <aside class="skor-panel">
          <div class="kutu">
            <h4>Canlı başvuru skoru</h4>
            <div class="skor-halka ara-s">
              <div class="halka">
                <svg width="92" height="92" viewBox="0 0 92 92">
                  <circle cx="46" cy="46" r="40" fill="none" stroke="#eef2f7" stroke-width="9"/>
                  <circle id="skor-yay" cx="46" cy="46" r="40" fill="none" stroke="#0d5490" stroke-width="9" stroke-linecap="round"/>
                </svg>
                <span class="deger" id="skor-deger">0</span>
              </div>
              <div class="kucuk">Belge 35 · kapasite 25 · deneyim 20 · bölge 20 puan üzerinden.
              Eşikler temsilîdir; gerçek ağırlıklar satış verisiyle kalibre edilir.</div>
            </div>
            <div class="skor-kirilim" id="skor-kirilim"></div>
            <div class="ayrac"></div>
            <div id="skor-karar"></div>
          </div>
        </aside>
      </div>`,
    }) +
    bolum({
      baslik: 'Skor ne işe yarar',
      zemin: 'gri',
      ustBaslik: 'Neden skorlama',
      icerik: `
      <div class="izgara i3 ara">
        ${kutu('Satış ekibinin zamanı', 'Bugün her adaya aynı süre ayrılıyor. Skor, 60 puan üstünü satış ekibine, altını otomatik bilgilendirme dizisine yönlendirir.')}
        ${kutu('Mevzuat kalkanı', 'Belge kapısı, belgesiz bir noktaya cihaz satılmasını yapısal olarak zorlaştırır. Sorumluluk zincirin tepesine döner — kapı en ucuz sigortadır.')}
        ${kutu('Ölçüm', 'Hangi ilden, hangi işletme türünden, hangi bütçe bandından kaç başvuru geldiği ilk kez ölçülebilir hale gelir. Reklam bütçesi buna göre dağıtılır.')}
      </div>
      <div class="kutu uyari ara">
        <h4>Reddetmek yerine yönlendirmek</h4>
        <p>Bu huninin en önemli tasarım kararı: <strong>kimse reddedilmiyor.</strong> Belgesi olmayan
        bölge bayisi adayı “uygulama merkezi” ya da “referans ortağı” katmanına, bütçesi yetmeyen aday
        kiralama ve sertifikalı ikinci el hattına düşüyor. Reddedilen aday rakibe gider; yönlendirilen
        aday havuzda kalır.</p>
      </div>`,
    });

  return { dosya: 'basvuru.html', baslik: 'P1 Başvuru hunisi', aciklama: 'Otomatik skorlamalı bayi başvuru prototipi', govde };
}

/* =========================================================== 4. P2 BÖLGE */
function bolge() {
  const say = { acik: 0, rezerve: 0, dolu: 0 };
  V.BOLGELER.forEach((b) => b.iller.forEach(([, d]) => say[d]++));

  const govde =
    hero({
      etiket: 'Prototip P2 · çalışır durumda',
      baslik: 'Bölge haritası ve kıtlık motoru',
      spot:
        'Bayilik “başvurulan” değil <strong>“kapılan”</strong> bir şey olduğunda başvuru sayısı ' +
        'değişir. Bölge koruması aynı anda hem adaya değer hem mevcut bayiye güvencedir.',
      notlar: [`${say.acik} açık`, `${say.rezerve} görüşme sürüyor`, `${say.dolu} kapalı`, 'Filtre + arama çalışıyor'],
    }) +
    bolum({
      baslik: 'Bölge durumu',
      icerik: `
      <div class="gosterge">
        <span><i class="nokta acik"></i> Açık — başvuruya kapalı değil</span>
        <span><i class="nokta rezerve"></i> Görüşme sürüyor — sıraya alınır</span>
        <span><i class="nokta dolu"></i> Kapalı — bölge koruması geçerli</span>
      </div>
      <div class="izgara i21">
        <div>
          <div class="izgara i2 ara-s" style="margin-bottom:16px">
            <input type="text" id="bolge-ara" placeholder="İl ara…">
            <div class="secim-sar">
              <button class="secim secili" data-durum-suzgec="hepsi">Hepsi</button>
              <button class="secim" data-durum-suzgec="acik">Açık</button>
              <button class="secim" data-durum-suzgec="rezerve">Görüşmede</button>
              <button class="secim" data-durum-suzgec="dolu">Kapalı</button>
            </div>
          </div>
          <p class="kucuk" style="margin-bottom:14px"><strong id="bolge-sayac">0</strong> bölge gösteriliyor · bir bölgeye tıklayın</p>
          <div id="bolge-kap">
            ${V.BOLGELER.map(
              (b) => `<div class="bolge-grup">
              <h4>${b.ad} <small>${b.iller.length} bölge · ${b.iller.filter((i) => i[1] === 'acik').length} açık</small></h4>
              <div class="il-sar">
                ${b.iller
                  .map(
                    ([ad, durum, not]) =>
                      `<button class="il ${durum}" data-ad="${ad}" data-durum="${durum}" data-not="${not || ''}">${ad}</button>`
                  )
                  .join('')}
              </div>
            </div>`
            ).join('')}
          </div>
        </div>
        <aside class="skor-panel">
          <div class="kutu" id="bolge-detay">
            <h4>Bir bölge seçin</h4>
            <p class="ara-s">Soldaki listeden bir il seçtiğinizde durum, koşullar ve sonraki adım burada görünür.</p>
          </div>
          <div class="kutu ara-s">
            <h4>Bölge koruması nasıl işler</h4>
            <ul class="liste ara-s">
              <li>Bir bölgede yalnızca <strong>bir</strong> sözleşmeli bayi olur</li>
              <li>Bayi, fırsatı sisteme <strong>kaydeder</strong>; kayıtlı fırsat koruma süresi boyunca onundur</li>
              <li>Aynı müşteriyi ikinci bayi kaydedemez — sistem çakışmayı engeller</li>
              <li>Hedefi tutmayan bayide bölge <strong>yeniden açılır</strong> (sözleşmede tarihli eşik)</li>
              <li>Uygulama merkezi (B) ve referans ortağı (C) katmanları bölge korumasına tabi değildir</li>
            </ul>
            <p class="kaynak">Bu kalıbın adı <em>deal registration + territory protection</em>;
            medikal cihaz dahil B2B kanallarında standarttır.</p>
          </div>
        </aside>
      </div>`,
    }) +
    bolum({
      baslik: 'Kıtlık gerçek olmalı',
      ustBaslik: 'Dürüstlük kaydı',
      zemin: 'gri',
      icerik: `
      <div class="izgara i2 ara">
        ${kutu(
          'Bu sayfadaki durumlar temsilîdir',
          'Ankara ve İstanbul Anadolu, Estezone’un kendi ofisleri olduğu için “kapalı”; ' +
            'diğer dört “görüşme sürüyor” işareti <strong>örnek veridir.</strong> Gerçek durum ' +
            'firmanın mevcut bayi ve satış ilişkileri haritalanmadan girilemez.',
          'uyari'
        )}
        ${kutu(
          'Sahte kıtlık geri teper',
          '“Son 3 bölge” yazıp altı ay sonra hâlâ aynı üç bölgeyi göstermek, kıtlığı bir pazarlama ' +
            'numarasına çevirir ve güveni yakar. Durum alanı <strong>operasyondan beslenmeli</strong>, ' +
            'elle yazılmamalı — bu yüzden portal (P3) ile aynı veritabanını paylaşır.',
          'uyari'
        )}
      </div>`,
    });

  return { dosya: 'bolge.html', baslik: 'P2 Bölge haritası', aciklama: 'Bölge müsaitliği ve kıtlık motoru prototipi', govde };
}

/* =========================================================== 5. P3 PORTAL */
function portal() {
  const govde =
    hero({
      etiket: 'Prototip P3 · çalışır durumda',
      baslik: 'Bayi Portalı',
      spot:
        'Ağın günlük teması burada kurulur. Sarf siparişi telefonla alınıyorsa tekrar eden gelir ' +
        '<strong>ölçülemez ve büyütülemez</strong>. Sekmeleri deneyin.',
      notlar: ['Cihazlarım + garanti', 'Sarf tekrar siparişi', 'Servis kaydı', 'Bana düşen talepler', 'Ko-op bütçe'],
    }) +
    bolum({
      icerik: `
      <div class="portal-cerceve">
        <div class="portal-ust">
          <span class="p-marka">Estezone Bayi Portalı</span>
          <span class="rozet altin">ALTIN bayi</span>
          <span class="rozet mavi">Konya bölgesi</span>
          <span class="p-kul"><span class="avatar">MY</span> M. Yılmaz · Yılmaz Estetik</span>
        </div>
        <div class="sekme-sar">
          <button class="sekme aktif" data-hedef="s-ozet">Özet</button>
          <button class="sekme" data-hedef="s-cihaz">Cihazlarım</button>
          <button class="sekme" data-hedef="s-sarf">Sarf siparişi</button>
          <button class="sekme" data-hedef="s-servis">Servis</button>
          <button class="sekme" data-hedef="s-talep">Bana düşen talepler</button>
          <button class="sekme" data-hedef="s-koop">Ko-op bütçe</button>
          <button class="sekme" data-hedef="s-egitim">Eğitim</button>
        </div>

        <div class="sekme-icerik aktif" id="s-ozet">
          <div class="olcu-sar">
            <div class="olcu"><b>4</b><span>aktif cihaz</span></div>
            <div class="olcu"><b>17</b><span>bu ay düşen talep</span></div>
            <div class="olcu"><b>2</b><span>sarf siparişi hatırlatması</span></div>
            <div class="olcu"><b>%78</b><span>Platin’e ilerleme</span></div>
          </div>
          <div class="izgara i2">
            ${kutu(
              'Platin kademesine 2 adım kaldı',
              '<ul class="liste iyi"><li>Sertifikalı uygulayıcı: 2/2 ✓</li><li>Yıllık eğitim tazeleme ✓</li></ul>' +
                '<ul class="liste kotu ara-s"><li>Bölge hedefi: %78</li><li>Eğitmen yetiştirme: başlanmadı</li></ul>' +
                '<p class="kucuk ara-s">Platin: sarf %15 indirim, ko-op 70/30, bölge koruması sözleşmesi.</p>',
              'altin'
            )}
            ${kutu(
              'Bu ayın özeti',
              '<ul class="liste"><li>Merkez haritasından <strong>17 talep</strong> yönlendirildi</li>' +
                '<li>Sarf siparişi: 2 kalem onay bekliyor</li>' +
                '<li>Servis: 1 açık kayıt (Elazer Plus, seri 4417)</li>' +
                '<li>Ko-op bütçe: 12.500 ₺ kullanılabilir</li></ul>'
            )}
          </div>
        </div>

        <div class="sekme-icerik" id="s-cihaz">
          ${tablo(
            ['Cihaz', 'Seri', 'Kurulum', 'Garanti', 'Atış sayacı', 'Durum'],
            [
              ['<strong>Elazer Plus</strong>', '4417', '02.2025', '<span class="rozet yesil">18 ay kaldı</span>', '412.000 / 1.000.000', '<span class="rozet yesil">Aktif</span>'],
              ['<strong>Arion Alexandrite</strong>', '2210', '11.2023', '<span class="rozet altin">4 ay kaldı</span>', '1.840.000 atış', '<span class="rozet yesil">Aktif</span>'],
              ['<strong>EsteSlim Mix</strong>', '7781', '06.2024', '<span class="rozet yesil">10 ay kaldı</span>', '—', '<span class="rozet yesil">Aktif</span>'],
              ['<strong>HydraBeauty</strong>', '3390', '01.2026', '<span class="rozet yesil">24 ay kaldı</span>', '—', '<span class="rozet mavi">Kurulum eğitimi bekliyor</span>'],
            ]
          )}
          <p class="kaynak ara-s">Atış sayacı hem garanti hem sarf hatırlatmasının kaynağıdır; aynı veri
          ikinci el değerlemesinde de kullanılır. Elle girilirse güvenilmez — cihazdan okunmalı.</p>
        </div>

        <div class="sekme-icerik" id="s-sarf">
          <div class="kutu vurgulu" style="margin-bottom:16px">
            <h4>Sepet yok — sipariş bir teklif talebidir</h4>
            <p>Tıbbi cihazların internetten satışı sınırlı olduğu için portal ödeme almaz.
            Sipariş, onayınıza sunulan yazılı teklife dönüşür. Bu <em>kısıt</em> değil,
            uyumlu tasarımın kendisidir.</p>
          </div>
          ${tablo(
            ['Kalem', 'Uyumlu cihaz', 'Son sipariş', 'Tahmini bitiş', 'Kademe fiyatı', ''],
            [
              ['<strong>Flash lamba</strong>', 'Arion Alexandrite', '03.2026', '<span class="rozet kirmizi">~3 hafta</span>', 'Altın: %10 indirim', '<span class="btn btn-ana" style="padding:5px 12px;font-size:13px">Teklif iste</span>'],
              ['<strong>Diyot başlık bakım kiti</strong>', 'Elazer Plus', '05.2026', '<span class="rozet altin">~2 ay</span>', 'Altın: %10 indirim', '<span class="btn btn-cizgi" style="padding:5px 12px;font-size:13px">Teklif iste</span>'],
              ['<strong>Koruyucu gözlük (5’li)</strong>', 'Tümü', '01.2026', '<span class="rozet">stokta</span>', 'Altın: %10 indirim', '<span class="btn btn-cizgi" style="padding:5px 12px;font-size:13px">Teklif iste</span>'],
              ['<strong>Jel / sarf seti</strong>', 'HydraBeauty', '—', '<span class="rozet">—</span>', 'Altın: %10 indirim', '<span class="btn btn-cizgi" style="padding:5px 12px;font-size:13px">Teklif iste</span>'],
            ]
          )}
          <p class="kaynak ara-s">Tahmini bitiş, atış sayacı ve geçmiş tüketimden hesaplanır.
          Tekrar eden gelirin ölçülebilir hale geldiği yer tam olarak burasıdır.</p>
        </div>

        <div class="sekme-icerik" id="s-servis">
          <div class="izgara i2">
            ${kutu(
              'Açık kayıt · #SR-2026-0418',
              '<p><strong>Elazer Plus</strong> · seri 4417<br>Bildirim: 14.08.2026 09:12<br>' +
                'Belirti: soğutma uyarısı</p>' +
                '<div class="rozet-sar ara-s"><span class="rozet mavi">Teknisyen atandı</span>' +
                '<span class="rozet yesil">SLA içinde</span></div>' +
                '<p class="kucuk ara-s">Yerinde müdahale taahhüdü sözleşmeden okunur — sayfaya elle yazılmaz.</p>',
              'iyi'
            )}
            ${kutu(
              'Geçmiş',
              '<ul class="liste"><li>03.2026 — Arion, flash lamba değişimi <span class="rozet">kapandı</span></li>' +
                '<li>11.2025 — EsteSlim, güç kaynağı onarımı <span class="rozet">kapandı</span></li>' +
                '<li>07.2025 — Elazer Plus, yıllık bakım <span class="rozet">kapandı</span></li></ul>' +
                '<p class="kucuk ara-s">Bu geçmiş, cihazın ikinci el değerini belgeleyen kayıttır.</p>'
            )}
          </div>
        </div>

        <div class="sekme-icerik" id="s-talep">
          <div class="kutu vurgulu" style="margin-bottom:16px">
            <h4>Bayiliğin asıl satış argümanı</h4>
            <p>“Cihaz al” değil <strong>“müşteri al”</strong>. Merkez haritasından (P4) gelen talepler
            kademeye göre dağıtılır: Altın ve Platin öncelikli. Bu sayaç, bayinin cihaz almasının
            en somut gerekçesidir.</p>
          </div>
          ${tablo(
            ['Tarih', 'Kaynak', 'İlgi', 'Durum'],
            [
              ['15.08', 'Merkez haritası', 'Lazer epilasyon — Konya', '<span class="rozet yesil">Randevu verildi</span>'],
              ['14.08', 'Merkez haritası', 'Cilt yenileme — Konya', '<span class="rozet altin">Arandı, dönüş bekleniyor</span>'],
              ['12.08', 'Ko-op reklam', 'Vücut şekillendirme — Karatay', '<span class="rozet yesil">Randevu verildi</span>'],
              ['11.08', 'Merkez haritası', 'Lazer epilasyon — Meram', '<span class="rozet kirmizi">Ulaşılamadı (2 deneme)</span>'],
            ]
          )}
          <p class="kaynak ara-s">“Ulaşılamadı” da ölçülür: yönlendirmeyi değerlendirmeyen bayinin
          önceliği düşer. Ağın kalitesi bu geri besleme ile korunur.</p>
        </div>

        <div class="sekme-icerik" id="s-koop">
          <div class="olcu-sar">
            <div class="olcu"><b>12.500 ₺</b><span>kullanılabilir ko-op bütçe</span></div>
            <div class="olcu"><b>50/50</b><span>Altın kademe paylaşımı</span></div>
            <div class="olcu"><b>3</b><span>hazır reklam kiti</span></div>
            <div class="olcu"><b>1</b><span>yayında mikro sayfa</span></div>
          </div>
          <p>Bütçe nakit olarak verilmez; onaylı kreatif ve onaylı kanalda harcanır. Bayi serbest metin
          yayınlayamaz — üretilen her materyal mevzuat süzgecinden geçer.
          <a href="pazarlama.html" style="color:var(--m-600);text-decoration:underline">Ko-op motoruna bakın →</a></p>
        </div>

        <div class="sekme-icerik" id="s-egitim">
          ${tablo(
            ['Personel', 'Sertifika', 'Geçerlilik', 'Sonraki adım'],
            [
              ['A. Demir', 'Uygulayıcı — Lazer epilasyon', '<span class="rozet yesil">08.2027</span>', 'İleri seviye modül'],
              ['S. Kaya', 'Uygulayıcı — Cilt yenileme', '<span class="rozet altin">11.2026 · 3 ay kaldı</span>', 'Tazeleme kaydı açık'],
              ['M. Yılmaz', 'Satış ve tanıtım elemanı', '<span class="rozet yesil">04.2028</span>', '—'],
              ['—', 'Eğitmen yetiştirme (Platin şartı)', '<span class="rozet kirmizi">başlanmadı</span>', 'Kayıt aç'],
            ]
          )}
        </div>
      </div>
      <p class="kaynak ara">Bu bir <strong>demo</strong>dur: veriler örnektir, hiçbir işlem gerçekleşmez.
      Benzer portallar sektörde standarttır — Alma Lasers cihaz sahipleri ve distribütörleri için
      ayrı bir “Partners Zone” işletir.</p>`,
    });

  return { dosya: 'portal.html', baslik: 'P3 Bayi portalı', aciklama: 'Bayi portalı (PWA) prototipi', govde };
}

/* ======================================================= 6. P4 MERKEZ BUL */
const MERKEZLER = [
  ['Yılmaz Estetik', 'Konya', 'Selçuklu', 'ALTIN', 'epilasyon,cilt', 'Elazer Plus · Arion Alexandrite'],
  ['Meram Güzellik Merkezi', 'Konya', 'Meram', 'GÜMÜŞ', 'epilasyon', 'Epizone Mix'],
  ['Beysu Medikal Estetik', 'Ankara', 'Çankaya', 'PLATİN', 'epilasyon,cilt,vucut', 'Arion · PicoZone · EsteSculpt'],
  ['Ankara Cilt Merkezi', 'Ankara', 'Keçiören', 'ALTIN', 'cilt', 'Cotra Plus CO2 · HydraBeauty'],
  ['Ataşehir Estetik', 'İstanbul', 'Ataşehir', 'PLATİN', 'epilasyon,cilt,vucut', 'Noblex · Lucid Q-PTP · EsteSlim'],
  ['Nişantaşı Medikal', 'İstanbul', 'Şişli', 'ALTIN', 'cilt,vucut', 'PicoZone · EsteSculpt Pro'],
  ['Bakırköy Güzellik', 'İstanbul', 'Bakırköy', 'GÜMÜŞ', 'epilasyon', 'Elazer'],
  ['Bornova Estetik', 'İzmir', 'Bornova', 'ALTIN', 'epilasyon,vucut', 'Aileen · EsteSlim Mix'],
  ['Karşıyaka Cilt', 'İzmir', 'Karşıyaka', 'GÜMÜŞ', 'cilt', 'HydraBeauty'],
  ['Nilüfer Medikal', 'Bursa', 'Nilüfer', 'ALTIN', 'epilasyon,cilt', 'Epicare Zenith · GoldZone'],
  ['Antalya Estetik Merkezi', 'Antalya', 'Muratpaşa', 'GÜMÜŞ', 'epilasyon', 'Nobleen'],
  ['Adana Medikal Estetik', 'Adana', 'Seyhan', 'GÜMÜŞ', 'vucut', 'EsteSculpt'],
  ['Gaziantep Cilt ve Lazer', 'Gaziantep', 'Şahinbey', 'ALTIN', 'epilasyon,cilt', 'Elazer Plus · Cotra Plus CO2'],
  ['Trabzon Estetik', 'Trabzon', 'Ortahisar', 'BRONZ', 'epilasyon', 'Epizone Mix'],
];

function merkezBul() {
  const iller = [...new Set(MERKEZLER.map((m) => m[1]))].sort((a, b) => a.localeCompare(b, 'tr'));

  const govde =
    hero({
      etiket: 'Prototip P4 · çalışır durumda',
      baslik: 'Yetkili Uygulama Merkezi Bul',
      spot:
        'Sektörün oyununu değiştiren tek hamle: Estezone <strong>tüketiciye</strong> talep üretir, ' +
        'talebi cihaz sahibi merkeze yönlendirir. Bayiliğin argümanı “cihaz al”dan ' +
        '<strong>“müşteri al”</strong>a döner.',
      notlar: ['InMode kalıbı', 'Türkiye’de hiçbir cihaz markasında yok', 'Yorum/fiyat YOK — mevzuat'],
    }) +
    bolum({
      baslik: 'Merkez arama',
      icerik: `
      <div class="izgara i2 ara-s" style="margin-bottom:18px">
        <div class="alan"><label for="m-il">İl</label>
          <select id="m-il"><option value="hepsi">Tüm iller</option>${iller
            .map((i) => `<option value="${i}">${i}</option>`)
            .join('')}</select></div>
        <div class="alan"><label for="m-islem">İlgilendiğiniz alan</label>
          <select id="m-islem">
            <option value="hepsi">Hepsi</option>
            <option value="epilasyon">Lazer epilasyon</option>
            <option value="cilt">Cilt yenileme</option>
            <option value="vucut">Vücut şekillendirme</option>
          </select></div>
      </div>
      <p class="kucuk" style="margin-bottom:14px"><strong id="merkez-sayac">0</strong> yetkili merkez listeleniyor</p>
      <div class="izgara i2" id="merkez-liste">
        ${MERKEZLER.map(
          ([ad, il, ilce, kademe, islem, cihazlar]) => `<div class="merkez" data-il="${il}" data-islem="${islem}">
          <div class="merkez-logo">${ad.slice(0, 2).toLocaleUpperCase('tr')}</div>
          <div style="flex:1">
            <h4>${ad} <span class="rozet ${
              kademe === 'PLATİN' ? 'mavi' : kademe === 'ALTIN' ? 'altin' : kademe === 'GÜMÜŞ' ? '' : ''
            }">${kademe}</span></h4>
            <p class="adres">${ilce} / ${il}</p>
            <p class="kucuk ara-s"><strong>Doğrulanmış cihazlar:</strong> ${cihazlar}</p>
            <div class="rozet-sar ara-s">
              <span class="rozet yesil">Cihaz kaydı doğrulandı</span>
              <span class="rozet mavi">Sertifikalı uygulayıcı</span>
              <span class="rozet">Servis sözleşmesi güncel</span>
            </div>
            <div class="btn-sar" style="margin-top:12px">
              <button class="btn btn-ana" data-yonlendir style="font-size:13.5px;padding:7px 14px">Randevu talebi ilet</button>
            </div>
          </div>
        </div>`
        ).join('')}
      </div>
      <p id="merkez-bos" class="kutu ara" style="display:none">Bu kriterlerde yetkili merkez bulunamadı.
      <strong>Bu boşluk aslında bir satış listesidir:</strong> merkez olmayan her ilçe, bayi ekibinin hedefidir.</p>
      <div id="merkez-bildirim" class="kutu vurgulu ara" style="display:none"></div>`,
    }) +
    bolum({
      baslik: 'Türkiye sürümü neden farklı olmak zorunda',
      ustBaslik: 'Mevzuat kısıtı',
      zemin: 'gri',
      icerik: `
      <div class="izgara i2 ara">
        ${kutu(
          'ABD’deki hâli: pazaryeri',
          'InMode “Find a Provider” haritasında hasta puanı, öncesi-sonrası galerisi ve kampanya ' +
            'olabiliyor. Marka tüketiciye reklam yapıyor, talebi cihaz sahibine akıtıyor; klinik ' +
            'cihazı <em>hasta akışı için</em> alıyor.',
          'altin'
        )}
        ${kutu(
          'Türkiye’deki hâli: kayıt defteri',
          '12/11/2025 tarihli 33075 sayılı Tanıtım Yönetmeliği sağlık kuruluşlarını bağlar. ' +
            'Türkçe içerikte <strong>fiyat, hasta yorumu ve karşılaştırmalı üstünlük tanıtımı ' +
            'yapılamaz.</strong> Harita bu yüzden doğrulanabilir olgular üzerine kurulur: ' +
            'adres, cihaz modeli, sertifika ve servis sözleşmesi durumu.',
          'uyari'
        )}
      </div>
      <div class="kutu uyari ara">
        <h4>Yayına almadan önce hukukçu onayı şart</h4>
        <p>Bu sayfa iki mevzuatın kesiştiği yerde duruyor: cihaz satıcısını bağlayan Tıbbi Cihaz
        Satış/Tanıtım Yönetmeliği ile sağlık kuruluşunu bağlayan 33075 sayılı Yönetmelik.
        Merkezin adının ve cihazının yayınlanması, merkezin kendi tanıtımı sayılıp sayılmayacağı
        <strong>yazılı görüş alınmadan</strong> karara bağlanmamalıdır. Prototip bu yüzden yol
        haritasında Faz 3’tedir — en değerli ve en riskli prototip aynısıdır.</p>
      </div>`,
    }) +
    bolum({
      baslik: 'Neden bu tek hamle ağı değiştirir',
      icerik: `
      <div class="huni ara">
        ${[
          ['Estezone reklam verir', 'Tüketici “yakınımda lazer epilasyon” arar', 'Estezone bütçesi'],
          ['Harita merkezi gösterir', 'Yalnızca doğrulanmış cihaz + sertifikalı personel', 'Kalite kapısı'],
          ['Talep merkeze düşer', 'WhatsApp + e-posta, aynı anda panele sayaç', 'Ölçülebilir'],
          ['Merkez cirosu artar', 'Cihaz kendini daha hızlı öder', 'Amorti kısalır'],
          ['Merkez ikinci cihazı alır', 've sarf almayı bırakmaz', 'Tekrar eden gelir'],
          ['Yeni aday sıraya girer', '“Haritada olmak için cihaz gerekiyor”', 'Ağ kendi kendini büyütür'],
        ]
          .map(([a, b, c]) => `<div class="huni-sat"><b>${a}</b><span>${b}</span><em>${c}</em></div>`)
          .join('')}
      </div>
      <p class="kaynak ara">Bu döngünün adı talep pompasıdır: marka tüketici talebi üretip kanala
      dağıttığında, kanal cihazı satın almak için sıraya girer. InMode’un “Verified Provider”
      programı tam olarak bunun üzerine kurulu.</p>`,
    });

  return { dosya: 'merkez-bul.html', baslik: 'P4 Merkez bul', aciklama: 'Yetkili uygulama merkezi bulucu prototipi', govde };
}

/* =========================================================== 7. P5 KAZANÇ */
function kazanc() {
  const govde =
    hero({
      etiket: 'Prototip P5 · çalışır durumda',
      baslik: 'Bayi kazanç simülatörü',
      spot:
        'Bayilik kararı duygusal değil <strong>aritmetiktir</strong>. Rakiplerin hiçbiri bu ' +
        'aritmetiği göstermiyor; gösteren taraf konuşmayı yönetir.',
      notlar: ['Cihaz + sarf + servis ayrı', 'Kademe etkisi', 'Tekrar eden gelir payı', 'Amortisman ayrı hesap'],
    }) +
    bolum({
      baslik: 'Bölge bayisi tarafı',
      ustBaslik: 'Katman A',
      icerik: `
      <div class="izgara i12 ara">
        <div class="kutu" id="kazanc-sim">
          <h4>Girdiler</h4>
          <div class="alan"><label for="k-adet">Yıllık cihaz satışı — <span id="k-adet-d"></span></label>
            <input type="range" id="k-adet" min="1" max="40" value="8"></div>
          <div class="alan"><label for="k-bedel">Ortalama cihaz bedeli — <span id="k-bedel-d"></span></label>
            <input type="range" id="k-bedel" min="150" max="2500" step="50" value="650"></div>
          <div class="alan"><label for="k-marj">Cihaz marjı — <span id="k-marj-d"></span></label>
            <input type="range" id="k-marj" min="5" max="35" value="16"></div>
          <div class="ayrac"></div>
          <div class="alan"><label for="k-kurulu">Sarf tabanı (kurulu cihaz) — <span id="k-kurulu-d"></span></label>
            <input type="range" id="k-kurulu" min="0" max="80" value="14"></div>
          <div class="alan"><label for="k-sarf">Cihaz başına aylık sarf — <span id="k-sarf-d"></span></label>
            <input type="range" id="k-sarf" min="0" max="40" value="9"></div>
          <div class="alan"><label for="k-sarfmarj">Sarf marjı — <span id="k-sarfmarj-d"></span></label>
            <input type="range" id="k-sarfmarj" min="10" max="60" value="34"></div>
          <div class="ayrac"></div>
          <div class="alan"><label for="k-servis">Yıllık bakım sözleşmesi — <span id="k-servis-d"></span></label>
            <input type="range" id="k-servis" min="0" max="60" value="9"></div>
          <div class="alan"><label for="k-kademe">Kademe</label>
            <select id="k-kademe">
              <option value="bronz">Bronz</option>
              <option value="gumus">Gümüş (+3 puan)</option>
              <option value="altin" selected>Altın (+7 puan)</option>
              <option value="platin">Platin (+12 puan)</option>
            </select></div>
        </div>
        <div id="k-sonuc"></div>
      </div>`,
    }) +
    bolum({
      baslik: 'Uygulama merkezi tarafı',
      ustBaslik: 'Katman B',
      zemin: 'gri',
      icerik: `
      <p>Aynı aracın ikinci yüzü: cihazı <em>kullanacak</em> merkez için amortisman. Satış ekibi
      bu tabloyu görürse yanlış müşteriye cihaz satmaz — iade, şikâyet ve itibar kaybı en baştan önlenir.</p>
      <div class="izgara i12 ara">
        <div class="kutu" id="amor-sim">
          <h4>Girdiler</h4>
          <div class="alan"><label for="a-bedel">Cihaz bedeli — <span id="a-bedel-d"></span></label>
            <input type="range" id="a-bedel" min="150" max="2500" step="50" value="650"></div>
          <div class="alan"><label for="a-seans">Günlük seans — <span id="a-seans-d"></span></label>
            <input type="range" id="a-seans" min="1" max="24" value="7"></div>
          <div class="alan"><label for="a-ucret">Ortalama seans bedeli — <span id="a-ucret-d"></span></label>
            <input type="range" id="a-ucret" min="200" max="6000" step="100" value="1400"></div>
          <div class="alan"><label for="a-sarf">Seans başına sarf gideri — <span id="a-sarf-d"></span></label>
            <input type="range" id="a-sarf" min="0" max="1500" step="25" value="175"></div>
          <div class="alan"><label for="a-gider">Aylık sabit gider payı — <span id="a-gider-d"></span></label>
            <input type="range" id="a-gider" min="0" max="400" step="5" value="85"></div>
        </div>
        <div id="a-sonuc"></div>
      </div>`,
    }) +
    bolum({
      baslik: 'Aracın asıl işi rakam vermek değil',
      icerik: `
      <div class="izgara i3 ara">
        ${kutu('Nitelendirme', 'Rakamı gören ciddi aday kalır, gerisi kendi eliyle ayrılır. Satış ekibinin en pahalı kaynağı — zamanı — korunur.')}
        ${kutu('Beklenti yönetimi', 'Amortisman 30 ay çıkıyorsa bunu satıştan <em>önce</em> söylemek, altı ay sonra iade konuşmasından ucuzdur.')}
        ${kutu('Takip bahanesi', '“Hesabın PDF’ini göndereyim mi?” — e-posta ve telefonu istemenin en doğal yolu. Rakamı hesaplayan kişi zaten karar sürecindedir.')}
      </div>
      <div class="kutu uyari ara">
        <h4>Bu sayfadaki tüm rakamlar temsilîdir</h4>
        <p>Marjlar, sarf tutarları ve bakım sözleşmesi bedeli firmadan veri gelmeden yerleştirilmiş
        varsayımlardır. Yol haritasının Faz 0 maddesi budur: gerçek marj bandı ve sarf fiyat listesi
        alınmadan bu araç müşteriye <strong>gösterilemez</strong>. Yanlış rakamla kurulan bir kazanç
        vaadi, hiç vaat vermemekten pahalıya patlar.</p>
      </div>`,
      zemin: 'gri',
    });

  return { dosya: 'kazanc.html', baslik: 'P5 Kazanç simülatörü', aciklama: 'Bayi kazanç ve amortisman simülatörü', govde };
}

module.exports = { index, rakip, basvuru, bolge, portal, merkezBul, kazanc, puanCiz };
