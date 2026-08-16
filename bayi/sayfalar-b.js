/* Sayfa üreticileri — B grubu: P6–P8, SEO, dijital plan, alternatifler, yol haritası */
const { hero, bolum, kutu, rozet, tablo } = require('./sablon');
const { puanCiz } = require('./sayfalar-a');
const V = require('./veri');

/* ========================================================== 8. P6 ASİSTAN */
function asistan() {
  const govde =
    hero({
      etiket: 'Prototip P6 · çalışır durumda',
      baslik: 'Bayi ve talep asistanı',
      spot:
        'Üç ayrı insan aynı numarayı arıyor: bayi adayı, mevcut bayi ve son kullanıcı. ' +
        'Asistan önce <strong>kim olduğunu</strong> anlar, sonra konuşur. Aşağıdan deneyin.',
      notlar: ['3 kişilik akışı', 'Teşhis koymaz', 'Fiyat vermez', 'Doz/parametre önermez'],
    }) +
    bolum({
      icerik: `
      <div class="izgara i21 ara">
        <div class="sohbet">
          <div class="sohbet-ust">
            <span class="canli"></span>
            <div><strong style="color:#fff">Estezone Asistan</strong><small>7/24 · ön nitelendirme · demo</small></div>
          </div>
          <div class="sohbet-akis" id="sohbet-akis">
            <div class="balon bot">
              Merhaba. Estezone yetkili ağ asistanıyım. Önce kim olduğunuzu anlayayım —
              aşağıdan seçebilir ya da doğrudan yazabilirsiniz.
            </div>
            <div class="balon sistem">
              Bu bir <strong>demo</strong>dur. Yanıtlar kural tabanlıdır; hiçbir veri gönderilmez.
            </div>
          </div>
          <div class="hizli kisilik-serit">
            <span class="kucuk" style="align-self:center;margin-right:2px">Kimsiniz:</span>
            <button data-kisilik="bayi">Bayi olmak istiyorum</button>
            <button data-kisilik="mevcut">Zaten bayiyim</button>
            <button data-kisilik="hasta">İşlem yaptırmak istiyorum</button>
          </div>
          <div class="hizli" id="sohbet-hizli"></div>
          <div class="sohbet-giris">
            <input type="text" id="sohbet-giris-alan" placeholder="Yazın… (ör. “Konya bölgesi açık mı?”)">
            <button class="btn btn-ana" id="sohbet-gonder">Gönder</button>
          </div>
        </div>

        <aside>
          <div class="kutu">
            <h4>Üç sert kural</h4>
            <ul class="liste kotu ara-s">
              <li><strong>Teşhis koymaz.</strong> “Bana uygun mu”, “kaç seans gerekir”, “yan etkisi olur mu”
              sorularına yanıt vermez; uygulayıcıya yönlendirir.</li>
              <li><strong>Fiyat vermez.</strong> Cihaz bedeli yazılı teklifle paylaşılır; hasta tarafında
              fiyat paylaşımı zaten mevzuatla sınırlıdır.</li>
              <li><strong>Doz/parametre önermez.</strong> Enerji, atış aralığı, cilt tipi eşleştirmesi
              kapalı profesyonel katmanda, üyelik arkasındadır.</li>
            </ul>
          </div>
          <div class="kutu ara-s">
            <h4>Ne yapar</h4>
            <ul class="liste iyi ara-s">
              <li>Kişiliği ayırır: aday bayi / mevcut bayi / son kullanıcı</li>
              <li>Bayi adayını bölge ve belge sorularıyla nitelendirir</li>
              <li>Mevcut bayiyi arıza, sarf, talep ve ko-op başlıklarına ayırır</li>
              <li>Son kullanıcıyı yetkili merkeze yönlendirir</li>
              <li>Doğru sayfayı açar: başvuru, bölge, simülatör, portal, harita</li>
            </ul>
          </div>
          <div class="kutu ara-s">
            <h4>Neden kurallı, neden serbest LLM değil</h4>
            <p class="kucuk">Sağlık ve tıbbi cihaz bağlamında serbest üretim, yanlış bir cümleyle
            mevzuat ihlali üretebilir. Bu prototip <strong>kural tabanlıdır</strong>: ne söyleyeceği
            önceden yazılmıştır. Canlıda LLM katmanı eklenirse üstüne aynı kurallar ve bir
            <em>çıkış süzgeci</em> konur — EsteTouch, Griarts, Dr. Ramazan Ersoy ve Avrupa Tıp
            Merkezi’nde çalışan hat budur.</p>
          </div>
        </aside>
      </div>`,
    }) +
    bolum({
      baslik: 'Asistanın ölçtüğü şey',
      zemin: 'gri',
      icerik: `
      <div class="izgara i4 ara">
        ${kutu('Mesai dışı', 'Talebin önemli kısmı akşam ve hafta sonu geliyor. Bugün bu talebin tamamı kayıp.')}
        ${kutu('Departman ayrımı', 'Arıza çağrısı satış ekibinin kuyruğunda beklemez; en sıcak talep doğru yere düşer.')}
        ${kutu('Ön nitelendirme', 'Görüşmeye başlamadan bölge, işletme türü ve belge durumu biliniyor olur.')}
        ${kutu('Soru envanteri', 'İnsanların gerçekte ne sorduğu ilk kez veriye dönüşür — SEO ve içerik takvimi bundan beslenir.')}
      </div>`,
    });

  return { dosya: 'asistan.html', baslik: 'P6 Asistan', aciklama: 'Üç kişilikli bayi ve talep asistanı prototipi', govde };
}

/* ========================================================== 9. P7 AKADEMİ */
function akademi() {
  const govde =
    hero({
      etiket: 'Prototip P7',
      baslik: 'Estezone Akademi ve kademe sistemi',
      spot:
        'Eğitim üç işi birden yapar: <strong>kaliteyi korur</strong>, <strong>bayiyi bağlar</strong>, ' +
        '<strong>mevzuatın istediğini karşılar.</strong> Kademe ise ağın motivasyon motorudur.',
      notlar: ['4 kademe', 'Yıllık tazeleme', 'Kademe = marj', 'Alma Academy / InMode University kalıbı'],
    }) +
    bolum({
      baslik: 'Dört kademe',
      icerik: `
      <div class="izgara i4 ara">
        ${V.KADEMELER.map(
          (k) => `<div class="kutu" style="border-top:4px solid ${k.renk}">
          <h4 style="color:${k.renk}">${k.ad}</h4>
          <p class="kucuk"><strong>Şart:</strong> ${k.sart}</p>
          <div class="ayrac" style="margin:12px 0"></div>
          <ul class="liste">${k.hak.map((h) => `<li>${h}</li>`).join('')}</ul>
          <div class="ara-s rozet-sar">
            ${rozet('Marj: ' + k.marj, 'mavi')}
            ${rozet('Talep: ' + k.lead)}
          </div>
        </div>`
        ).join('')}
      </div>
      <p class="kaynak ara">Marj puanları ve indirim oranları <strong>temsilîdir</strong>;
      gerçek bant üretici sözleşmeleri ve mevcut kârlılık görülmeden belirlenemez.</p>`,
    }) +
    bolum({
      baslik: 'Kademe neden işe yarar',
      zemin: 'gri',
      icerik: `
      <div class="izgara i2 ara">
        ${kutu(
          'Bayi için',
          '<ul class="liste"><li>Somut bir ilerleme hattı: “2 adım kaldı”</li>' +
            '<li>Marj artışı doğrudan cebe yansır</li>' +
            '<li>Haritada üst sıra = daha çok talep</li>' +
            '<li>Rozet, kendi müşterisine karşı bir güven aracı</li></ul>'
        )}
        ${kutu(
          'Estezone için',
          '<ul class="liste"><li>Kaliteyi sözleşmeyle değil <em>teşvikle</em> yönetir</li>' +
            '<li>Yıllık tazeleme = yılda en az bir temas noktası</li>' +
            '<li>Kademe düşürme, sözleşme feshetmeden uygulanabilen tek yaptırım</li>' +
            '<li>Eğitim ayrıca bağımsız bir gelir kalemi olabilir</li></ul>'
        )}
      </div>
      <div class="kutu vurgulu ara">
        <h4>Mevzuat zaten sertifika istiyor</h4>
        <p>Tıbbi cihaz satış ve tanıtımında sertifikalı personel aranıyor. Yani talep <em>hazır</em>:
        zorunluluğu bir programa çevirmek, sıfırdan ihtiyaç yaratmaktan çok daha ucuzdur.
        Eğitimi alan kişi kendi merkezini açtığında cihazı kimden alacağı da belli olur.</p>
      </div>`,
    }) +
    bolum({
      baslik: 'Program iskeleti',
      icerik: tablo(
        ['Modül', 'Kime', 'Süre', 'Çıktı', 'Kademe etkisi'],
        [
          ['<strong>Cihaz temel kullanımı</strong>', 'Tüm yeni ortaklar', '1 gün', 'Katılım belgesi', 'Bronz şartı'],
          ['<strong>Uygulayıcı sertifikası — lazer epilasyon</strong>', 'Uygulayıcı personel', '2 gün + sınav', 'Sertifika (yıllık tazeleme)', 'Gümüş şartı'],
          ['<strong>Uygulayıcı sertifikası — cilt / vücut</strong>', 'Uygulayıcı personel', '2 gün + sınav', 'Sertifika', 'Altın şartı'],
          ['<strong>Satış ve tanıtım elemanı</strong>', 'Bayi satış ekibi', 'Mevzuat programı', 'Mevzuatın aradığı belge', 'Katman A şartı'],
          ['<strong>Birinci seviye teknik bakım</strong>', 'Bayi teknik personeli', '3 gün', 'Yetkinlik kaydı', 'Altın şartı'],
          ['<strong>İşletme ekonomisi</strong>', 'Merkez sahibi', '1 gün', 'ROI planı', 'Zorunlu değil'],
          ['<strong>Eğitmen yetiştirme</strong>', 'Kıdemli bayi personeli', '5 gün', 'Eğitmen yetkisi', 'Platin şartı'],
        ]
      ) +
      `<p class="kaynak ara">⚠ Eğitim içeriklerinin hangi belgeye karşılık geldiği ve kimin
      verebileceği <strong>doğrulanmalıdır</strong>. Bu tablo bir program iskeletidir, mevzuat
      beyanı değildir.</p>`,
    });

  return { dosya: 'akademi.html', baslik: 'P7 Akademi', aciklama: 'Akademi ve kademe sistemi', govde };
}

/* ========================================================== 10. P8 KO-OP */
function pazarlama() {
  const govde =
    hero({
      etiket: 'Prototip P8 · çalışır durumda',
      baslik: 'Ko-op pazarlama motoru',
      spot:
        'Ağların en sık ölüm sebebi: bayi cihazı alır, pazarlayamaz, cihaz atıl kalır, sarf ' +
        'satılmaz, ikinci cihaz hiç alınmaz. Aşağıdaki üretici <strong>çalışıyor</strong> — ' +
        'metni değiştirin, mevzuat süzgecinin ne yaptığını görün.',
      notlar: ['Hazır reklam kiti', 'Bayi mikro sayfası', 'MDF paylaşımlı bütçe', 'Otomatik mevzuat süzgeci'],
    }) +
    bolum({
      baslik: 'Bayi mikro sayfası üreticisi',
      icerik: `
      <div class="izgara i12 ara">
        <div class="kutu" id="koop-uretici">
          <h4>Girdiler</h4>
          <div class="alan"><label for="ko-ad">Bayi adı</label><input type="text" id="ko-ad" value="Yılmaz Estetik"></div>
          <div class="alan"><label for="ko-il">İl / ilçe</label><input type="text" id="ko-il" value="Konya / Selçuklu"></div>
          <div class="alan"><label for="ko-cihaz">Öne çıkan cihaz</label>
            <select id="ko-cihaz">
              <option>Elazer Plus</option><option>Arion Alexandrite</option>
              <option>PicoZone</option><option>EsteSculpt Pro</option><option>HydraBeauty</option>
            </select></div>
          <div class="alan"><label for="ko-kademe">Kademe</label>
            <select id="ko-kademe"><option value="gumus">Gümüş</option><option value="altin" selected>Altın</option><option value="platin">Platin</option></select></div>
          <div class="alan"><label for="ko-metin">Bayinin yazdığı tanıtım metni</label>
            <textarea id="ko-metin" rows="5">Merkezimizde FDA onaylı cihazlarımızla kalıcı epilasyon uyguluyoruz. Türkiye'nin en iyi ekibiyle ağrısız ve garantili sonuç. Ağustos'a özel %40 indirim!</textarea>
            <p class="ipucu">Bilerek riskli yazılmış bir örnek. Süzgeç aşağıda ne yaptığını gösterecek.</p></div>
        </div>
        <div id="koop-onizleme"></div>
      </div>`,
    }) +
    bolum({
      baslik: 'Bütçe nasıl paylaşılır (MDF)',
      zemin: 'gri',
      icerik: `
      <p>Ko-op bütçe nakit verilmez. Onaylı kreatif + onaylı kanal + fatura karşılığı harcanır;
      harcamanın karşılığı panelde ölçülür. Bu, bayiye para vermek değil <strong>bayiyle birlikte
      talep satın almaktır.</strong></p>
      ${tablo(
        ['Kademe', 'Paylaşım', 'Aylık tavan (temsilî)', 'Kullanılabilir kanallar', 'Şart'],
        [
          ['Bronz', '—', '—', '—', 'Önce Gümüş’e çıkılır'],
          ['<strong>Gümüş</strong>', '30 / 70', '5.000 ₺', 'Hazır sosyal medya kiti', 'Sertifikalı uygulayıcı 1'],
          ['<strong>Altın</strong>', '50 / 50', '12.500 ₺', '+ yerel arama reklamı, mikro sayfa', 'Sertifikalı uygulayıcı 2'],
          ['<strong>Platin</strong>', '70 / 30', '30.000 ₺', '+ video prodüksiyon, bölgesel kampanya', 'Bölge hedefi + eğitmen'],
        ]
      )}
      <p class="kaynak ara">Tutarlar temsilîdir. Candela, bayiye ne vereceğini ayrı bir
      “pazarlama taahhüdü” sayfasında yazılı ilan eder; kopyalanacak olan bu <em>biçimdir</em> —
      Türkiye’de öncesi-sonrası ve hasta yorumu içeriği kullanılamaz.</p>`,
    }) +
    bolum({
      baslik: 'Kitin içinde ne var',
      icerik: `
      <div class="izgara i3 ara">
        ${kutu(
          'Görsel ve video',
          '<ul class="liste"><li>Cihaz tanıtım kareleri (marka + bayi adı yerleştirmeli)</li>' +
            '<li>15–30 sn dikey video şablonları</li><li>Vitrin/karşılama görselleri, tabela dosyası</li>' +
            '<li>Rozet setleri (kademe, doğrulanmış cihaz)</li></ul>'
        )}
        ${kutu(
          'Metin ve kampanya',
          '<ul class="liste"><li>Süzgeçten geçmiş hazır başlık ve açıklamalar</li>' +
            '<li>Yerel arama reklamı şablonları</li><li>WhatsApp karşılama ve randevu akışı</li>' +
            '<li>Sık sorulan sorular (mevzuata uygun cevaplarla)</li></ul>'
        )}
        ${kutu(
          'Ölçüm',
          '<ul class="liste"><li>Bayiye özel takip bağlantıları</li><li>Mikro sayfa dönüşüm sayacı</li>' +
            '<li>Harcama / talep / randevu raporu</li><li>Ko-op bütçe bakiyesi</li></ul>'
        )}
      </div>
      <div class="kutu uyari ara">
        <h4>Neden bayi serbest metin yazamıyor</h4>
        <p>Ağın en büyük itibar riski, 60 farklı bayinin 60 farklı vaadi yayınlamasıdır. Bir bayinin
        “kalıcı epilasyon, %100 garanti” yazması, hem o bayiyi hem markayı aynı anda riske sokar.
        Süzgeç bunun için var: bayi metni yazar, sistem yayınlanabilir hâle getirir, onaylanan
        yayına çıkar. <strong>Süzgeç bir hukuk denetimi değildir</strong> — riskli kalıpları
        yakalar, hukukçu onayının yerine geçmez.</p>
      </div>`,
      zemin: 'gri',
    });

  return { dosya: 'pazarlama.html', baslik: 'P8 Ko-op pazarlama', aciklama: 'Ko-op pazarlama motoru prototipi', govde };
}

/* ============================================================== 11. SEO */
function seo() {
  const govde =
    hero({
      etiket: 'Plan',
      baslik: 'Bayi odaklı SEO',
      spot:
        'Mevcut sitede <strong>“bayilik” kelimesi hiç geçmiyor.</strong> Bu niyetle arayan hiç kimse ' +
        'siteye düşmüyor. Aynı anda 82 yazının 61’i tek anlam kümesinde birbirini yiyor.',
      notlar: ['4 anahtar kelime kümesi', 'İl sayfası kuralı', 'Schema planı', '180 günlük takvim'],
    }) +
    bolum({
      baslik: 'Çıkış noktası',
      ustBaslik: 'Ölçülen durum',
      icerik: tablo(['Ölçüm', 'Bugün'], V.SEO.tespit.map(([a, b]) => [`<strong>${a}</strong>`, b])) +
        `<div class="kutu uyari ara">
          <h4>Sıralama şart: önce temizlik, sonra yeni küme</h4>
          <p>Bayilik kümesi, mevcut kanibalizasyon çözülmeden açılırsa yeni sayfalar da aynı
          kaderi paylaşır. Ayrıca <strong>Search Console’dan 16 aylık dışa aktarım alınmadan tek bir
          301 atılmaz</strong> — hangi URL’nin gerçekte tıklama aldığı bilinmeden yapılan
          konsolidasyon, kazanç değil kayıp üretir.</p>
        </div>`,
    }) +
    bolum({
      baslik: 'Dört küme',
      zemin: 'gri',
      icerik: V.SEO.kumeler
        .map(
          (k) => `<details open>
        <summary>${k.ad}</summary>
        <div>
          <p><strong>Hedef kitle:</strong> ${k.hedef} · <strong>Sayfa yapısı:</strong> <code>${k.sayfa}</code></p>
          <div class="rozet-sar ara-s">${k.kelimeler.map((x) => rozet(x, 'mavi')).join('')}</div>
          <p class="ara-s">${k.not}</p>
        </div>
      </details>`
        )
        .join(''),
    }) +
    bolum({
      baslik: 'Teknik kurallar',
      icerik: `<ul class="liste ara">${V.SEO.teknik.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="kutu uyari ara">
        <h4>81 il sayfası ÜRETİLMEZ</h4>
        <p>Şablondan çoğaltılmış il sayfaları Google’ın doorway (kapı sayfası) tanımına girer ve
        cezalandırılır. Yalnızca <strong>gerçek varlığı olan</strong> illerde sayfa açılır: bayi var,
        yetkili merkez var ya da düzenli servis veriliyor. Bir ilde sayfayı hak eden şey içerik değil,
        <em>gerçeklik</em>tir. Merkez haritası (P4) büyüdükçe hak eden il sayısı da büyür.</p>
      </div>`,
    }) +
    bolum({
      baslik: '180 günlük takvim',
      zemin: 'gri',
      icerik: tablo(['Dönem', 'Yapılacak'], V.SEO.takvim.map(([a, b]) => [`<strong>${a}</strong>`, b])),
    });

  return { dosya: 'seo.html', baslik: 'SEO planı', aciklama: 'Bayi odaklı SEO planı', govde };
}

/* ========================================================== 12. DİJİTAL */
function dijital() {
  const govde =
    hero({
      etiket: 'Plan',
      baslik: 'Dijital pazarlama planı',
      spot:
        'Bayi kazanmak bir <em>kampanya</em> değil bir <strong>huni</strong> işidir. Aşağıdaki ' +
        'dağılım bir bütçe önerisi değil, <strong>rol dağılımıdır</strong>: hangi kanal huninin ' +
        'hangi katında çalışır.',
      notlar: ['7 kanal', '6 basamaklı huni', '8 KPI', 'Fuar dijitalin devamıdır'],
    }) +
    bolum({
      baslik: 'Kanal dağılımı ve rolleri',
      icerik: `
      <div class="ara">
        ${V.KANALLAR.map(
          (k) => `<div class="kanal-sat">
          <div class="kanal-ad"><b>${k.ad}</b><span>${k.rol} · ${k.hedef}</span></div>
          <div class="kanal-cubuk"><i style="width:${(k.pay / 30) * 100}%"></i></div>
          <div class="kanal-pay">%${k.pay}</div>
        </div>
        <p class="kucuk" style="padding:0 0 10px 2px;border-bottom:1px solid var(--cizgi)">
          <strong>İpucu:</strong> ${k.ipucu} · <strong>Ölçüm:</strong> ${k.olcum}</p>`
        ).join('')}
      </div>
      <div class="kutu uyari ara">
        <h4>Bütçe rakamı bilinçli olarak yazılmadı</h4>
        <p>Mevcut aylık Ads harcaması, gelen talep sayısı ve satış çevrim oranı ölçülmeden TL bütçe
        önermek tahmin olur. Yüzdeler <strong>rol dağılımıdır</strong>; mutlak tutar Faz 0’da
        GA4 + Ads verisi geldiğinde belirlenir.</p>
      </div>`,
    }) +
    bolum({
      baslik: 'Huni',
      zemin: 'gri',
      icerik: `<div class="huni ara">${V.HUNI.map(
        ([a, b, c]) => `<div class="huni-sat"><b>${a}</b><span>${b}</span><em>${c}</em></div>`
      ).join('')}</div>
      <div class="izgara i3 ara">
        ${kutu('Karar süresi uzundur', 'Yüz binlerce liralık bir karar tek oturumda verilmez. Isıtma dizisi olmadan huninin ortası boşalır.', 'vurgulu')}
        ${kutu('Fuar dijitalin rakibi değil', 'Fuar kapanış katıdır. Dijitalin işi fuara <em>nitelikli randevu</em> doldurmaktır — bugün bu bağ hiç kurulmamış.', 'vurgulu')}
        ${kutu('Cihaz değil ekonomi anlatılır', 'Alıcı cihazın dalga boyunu değil işletmesinin kâr tablosunu düşünüyor. Kreatif buna göre kurulur.', 'vurgulu')}
      </div>`,
    }) +
    bolum({
      baslik: 'KPI seti',
      icerik: tablo(
        ['Gösterge', 'Bugün', '12 ay hedefi', 'Not'],
        V.KPI.map(([a, b, c, d]) => [`<strong>${a}</strong>`, b, `<span class="rozet mavi">${c}</span>`, d])
      ) +
        `<p class="kaynak ara">“Bugün” sütunundaki soru işaretleri gerçektir: bu göstergeler
        <strong>bugün ölçülmüyor</strong>. Ölçüm temeli kurulmadan hedef koymak, sonucu
        değerlendirilemeyen bir proje demektir.</p>`,
    }) +
    bolum({
      baslik: 'Bayi kazanmanın dijital dışı ayakları',
      zemin: 'gri',
      icerik: `
      <div class="izgara i4 ara">
        ${kutu('Referans bayi', 'Mevcut memnun müşteri, en ucuz bayi kaynağıdır. Yönlendiren bayiye sarf kredisi verilir.')}
        ${kutu('Servis müşterisi', 'Rakip cihazını tamir ettiğiniz klinik, bir sonraki cihazını kimden alacağını öğrenmiş olur.')}
        ${kutu('Eğitim mezunu', 'Sertifika alan uygulayıcı kendi merkezini açtığında ilk aradığı yer eğitimi aldığı yerdir.')}
        ${kutu('İkinci el zinciri', 'Cihaz değiştiren bayinin çıkan cihazı, yeni bayinin giriş cihazı olur. Ağın alt ucu böyle dolar.')}
      </div>`,
    });

  return { dosya: 'dijital.html', baslik: 'Dijital plan', aciklama: 'Kanal bazlı dijital pazarlama planı', govde };
}

/* ======================================================= 13. ALTERNATİFLER */
function alternatif() {
  const govde =
    hero({
      etiket: 'Alternatif fikirler',
      baslik: '10 farklı büyüme yolu',
      spot:
        'Bayi ağı tek bir yoldan büyümez. Aşağıdakiler prototiplerin <em>alternatifi</em> değil, ' +
        '<strong>tamamlayıcısı</strong>: bazıları sermaye ister, bazıları sadece karar.',
      notlar: ['Etki / zorluk skorlu', 'Her birinde risk yazılı', 'Kaynağı olan kaynağıyla'],
    }) +
    bolum({
      icerik: `
      <div class="izgara i2 ara">
        ${V.ALTERNATIFLER.map(
          (a) => `<div class="kutu">
          <h4>${a.ad}</h4>
          <p class="kucuk" style="color:var(--m-600)"><strong>${a.kisa}</strong></p>
          <p class="ara-s">${a.detay}</p>
          <div class="olcek ara-s" style="display:flex;gap:14px;font-size:12.5px;color:var(--metin-3);padding-top:10px;border-top:1px solid var(--cizgi);flex-wrap:wrap">
            <span>Etki ${puanCiz(a.etki)}</span>
            <span>Zorluk ${puanCiz(a.zorluk, 'zor')}</span>
          </div>
          <p class="kucuk ara-s" style="color:var(--uyari)"><strong>Risk:</strong> ${a.risk}</p>
          <p class="kaynak">${a.kanit}</p>
        </div>`
        ).join('')}
      </div>`,
    }) +
    bolum({
      baslik: 'Hangisi önce',
      zemin: 'gri',
      icerik: `
      <p>Sermaye gerektirmeyen ve mevcut kaslara yaslananlar önce. Estezone’un en güçlü ama
      hiç satılmayan varlığı teknik servistir — büyüme oradan başlarsa hem ucuz hem hızlıdır.</p>
      ${tablo(
        ['Öncelik', 'Fikir', 'Neden bu sırada', 'Sermaye'],
        [
          ['1', '<strong>Marka bağımsız servis ağı</strong>', 'Kas zaten var, sadece satılmıyor. Rakibin müşterisine erişimin en ucuz yolu.', '<span class="rozet yesil">Düşük</span>'],
          ['2', '<strong>Sarf aboneliği</strong>', 'Tekrar eden gelir; Classys’te ciro %46. Portal ile birlikte kurulur.', '<span class="rozet yesil">Düşük</span>'],
          ['3', '<strong>Eğitim önce, cihaz sonra</strong>', 'Mevzuat talebi hazır; hem gelir hem huni.', '<span class="rozet yesil">Düşük</span>'],
          ['4', '<strong>Finansman ortaklığı</strong>', '“Param yok” itirazını konuşmanın sonu olmaktan çıkarır.', '<span class="rozet yesil">Düşük</span>'],
          ['5', '<strong>Sertifikalı ikinci el borsası</strong>', 'Ağın alt ucunu doldurur; envanter ve garanti yükümlülüğü ister.', '<span class="rozet altin">Orta</span>'],
          ['6', '<strong>Anahtar teslim merkez kurulumu</strong>', 'Rakip bu kapıyı açtı; karşılık verilmezse segment kaybedilir.', '<span class="rozet altin">Orta</span>'],
          ['7', '<strong>Mobil demo aracı</strong>', 'Etkili ama sabit maliyeti yüksek; randevu takvimi dolmadan başlanmaz.', '<span class="rozet kirmizi">Yüksek</span>'],
          ['8', '<strong>Gelir paylaşımlı yerleşim</strong>', 'Pazarı en çok büyüten model ama sermayeyi kilitler.', '<span class="rozet kirmizi">Yüksek</span>'],
          ['9', '<strong>Yurt dışı bayilik</strong>', 'Türkiye ağı oturmadan açılırsa ikisi birden aksar.', '<span class="rozet kirmizi">Yüksek</span>'],
          ['10', '<strong>Kapalı profesyonel katman</strong>', 'Diğerlerinin yanında bir katman; tek başına büyüme getirmez.', '<span class="rozet yesil">Düşük</span>'],
        ]
      )}`,
    });

  return { dosya: 'alternatif.html', baslik: 'Alternatifler', aciklama: '10 alternatif büyüme modeli', govde };
}

/* ========================================================= 14. YOL HARİTASI */
function yolHaritasi() {
  const durumRozet = { kritik: rozet('KRİTİK', 'kirmizi'), yapisal: rozet('YAPISAL', 'mavi'), acik: rozet('AÇIK RİSK', 'altin') };

  const govde =
    hero({
      etiket: 'Uygulama',
      baslik: 'Yol haritası, riskler ve gerekenler',
      spot:
        'Prototipler hazır. Sıradaki iş kod değil <strong>veri ve karar</strong>: gerçek marjlar, ' +
        'gerçek SLA rakamları, hukuk onayı ve bayi sözleşmesi.',
      notlar: ['4 faz', '8 risk maddesi', '10 soru', 'Faz 0 atlanamaz'],
    }) +
    bolum({
      baslik: 'Dört faz',
      icerik: `<div class="zaman ara">${V.YOL.map(
        (f) => `<div class="zaman-sat">
        <div class="zaman-bas">
          <div class="zaman-cizgi" style="background:${f.renk}"></div>
          <h3>${f.faz}</h3><span>${f.sure}</span>
        </div>
        <ul class="zaman-is">${f.isler.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>`
      ).join('')}</div>
      <div class="kutu uyari ara">
        <h4>Faz 0 atlanamaz</h4>
        <p>Ölçüm temeli kurulmadan başlayan bir kanal programı, altı ay sonra “işe yaradı mı”
        sorusuna cevap veremez. Aynı şekilde bayi sözleşmesi ve bölge koruması metni hazır olmadan
        ilk bayiyi imzalamak, ağın en pahalı hatasıdır — sonradan düzeltmek imkânsıza yakındır.</p>
      </div>`,
    }) +
    bolum({
      baslik: 'Riskler ve açık noktalar',
      ustBaslik: 'Dürüstlük kaydı',
      zemin: 'gri',
      icerik: V.RISKLER.map(
        (r) => `<details>
        <summary>${r.baslik} ${durumRozet[r.durum]}</summary>
        <div>
          <p>${r.ne}</p>
          <p class="ara-s"><strong>Ne yapmalı:</strong> ${r.ne_yapmali}</p>
        </div>
      </details>`
      ).join(''),
    }) +
    bolum({
      baslik: 'Estezone’dan alınması gerekenler',
      icerik: `
      <p>Aşağıdaki 10 başlık netleşmeden Faz 1 başlamamalı. Bunlar site projesi için hazırlanan
      28 soruluk listenin <strong>bayi ağına özel</strong> devamıdır.</p>
      ${tablo(
        ['#', 'Soru', 'Neyi kilitliyor'],
        [
          ['1', 'Bugün gayriresmî de olsa kaç bayi/satış ortağı var, hangi illerde?', 'P2 bölge haritasının gerçek verisi'],
          ['2', 'Cihaz marj bandı ve sarf fiyat listesi nedir?', 'P5 simülatörü — rakamsız gösterilemez'],
          ['3', 'Sarf kalemleri neler, aylık tüketim ne kadar?', 'Sarf aboneliği + portal'],
          ['4', 'Üretici sözleşmeleri fiyat yayınına ve alt bayiliğe izin veriyor mu?', 'Tüm program — bu bir “yapılabilir mi” sorusu'],
          ['5', 'Taahhüt edilebilir gerçek servis SLA rakamları nedir?', 'Kademe hakları, portal, ko-op vaadi'],
          ['6', '“Tek yetkili distribütör/servis” belgelerinin tarihli kopyası elde mi?', 'Reklam dili — belgesiz yazılamaz'],
          ['7', 'Güzellik salonu segmenti hedeflenecek mi?', 'Başvuru hunisinin kapı kuralları'],
          ['8', 'Bayi başvurularını kim, hangi sürede değerlendirecek?', 'Skor eşiği ve otomatik yönlendirme'],
          ['9', 'Eğitim verecek kadro ve mekân var mı; sertifika hangi belgeye karşılık geliyor?', 'P7 Akademi'],
          ['10', 'Ko-op bütçe için ayrılabilecek yıllık tutar nedir?', 'P8 ve kademe hakları'],
        ]
      )}`,
    }) +
    bolum({
      baslik: 'Tek cümlelik özet',
      zemin: 'koyu',
      icerik: `
      <p style="font-size:20px;line-height:1.55;max-width:60ch;color:#fff">
        Estezone’un bayi ağı büyütmek için yeni bir cihaza ihtiyacı yok —
        <strong>bir kapıya, bir haritaya, bir hesap makinesine ve bir sözleşmeye</strong> ihtiyacı var.
        Dördü de bu klasörde hazır; eksik olan tek şey firmanın kendi rakamları.
      </p>
      <div class="btn-sar">
        <a class="btn btn-acik" href="index.html">Başa dön</a>
        <a class="btn btn-acik" href="rakip.html">Rakip kıyası</a>
        <a class="btn btn-acik" href="basvuru.html">P1 prototipi</a>
      </div>`,
    });

  return { dosya: 'yol-haritasi.html', baslik: 'Yol haritası', aciklama: 'Yol haritası, riskler ve gerekenler', govde };
}

module.exports = { asistan, akademi, pazarlama, seo, dijital, alternatif, yolHaritasi };
