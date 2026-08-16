# Estezone Medikal — modern site (teklif/sunum demosu)

**28. AYRI PROJE.** Diğer projelerle karıştırılmaz. Kendi klasörü, kendi reposu, kendi portu (**8050**).

Mevcut [estezone.com.tr](https://estezone.com.tr) sitesinin (WordPress + Impreza + WPBakery + Slider
Revolution) yerine geçmek üzere sıfırdan yazılmış **statik HTML** site. Estezone Medikal'e sunulacak
teklif demosudur — henüz canlı site değildir.

## İki tasarım sürümü

Aynı içerik ve aynı işlevler, iki farklı görsel dil. Müşteri seçsin diye ikisi de canlı.

| | v1 — **Koyu / "Dalga Boyu"** | v2 — **Açık Kurumsal** |
|---|---|---|
| Çıktı | `site/` | `site/v2/` |
| Stil | `sablon/stil-koyu.css` | `sablon/stil-acik.css` |
| Zemin | `#06090f` gece laciverti | `#ffffff` / `#f5f8fb` |
| Ana renk | `#2dd4f5` cyan | `#0d5490` — **Estezone'un kendi logo laciverti** |
| Başlık fontu | Inter | Inter Tight |
| Buton | hap (100px) | keskin (10px) |
| Karakter | teknoloji vitrini | mühendislik ciddiyeti |

v2, analiz raporunun 7. bölümündeki öneriyi uygular: *"EsteTouch satış-enerjik; Estezone aynı
çıtada ama farklı karakterde olmalı — daha keskin köşeler, daha yüksek bilgi yoğunluğu,
tablo ve rozet kültürü, daha sakin renk. Hap buton yok."*

Her sayfanın en üstünde bir şerit iki sürüm arasında geçiş yapar.

## Çalıştırma

```bash
node build.js         # koyu (v1)  -> site/
node build.js acik    # açık (v2)  -> site/v2/
node sunucu.js        # http://localhost:8050  (v2: /v2/)
node denetle.js       # v1 denetimi
node denetle.js v2    # v2 denetimi
```

> İki sürümü de kurmadan yayınlamayın — `site/v2/` ayrı bir build'dir, `node build.js` onu güncellemez.

## Klasör düzeni

```
veri/
  cihaz-meta.js      küratörlü meta: kategori, rozet, konumlandırma, "neden bu cihaz"
  ham-sayfalar.json  kaynak siteden çıkarılan ham veri (otomatik)
  cihazlar.json      ikisinin birleşimi — sitenin tek gerçek kaynağı
  icerik.js          kurumsal metinler (hakkımızda, servisler, SSS, süreç, iletişim)
sablon/
  stil.css           tasarım sistemi
  site.js            istemci betiği (filtre, danışman, hesaplayıcı, karşılaştırma, galeri)
  parcalar.js        head / başlık / alt bilgi / kart / CTA
  sayfalar-2.js      kurumsal + araç + yasal sayfa üreticileri
kaynak/
  cikar.js           kaynak HTML -> ham-sayfalar.json
  gorsel-indir.js    görsel indirici
  gorsel/            169 indirilmiş görsel (117'si siteye kopyalanır)
site/                ÜRETİLEN ÇIKTI — elle düzenlenmez
```

> `site/` klasörü **üretilir**. Değişiklik `veri/` veya `sablon/` içinde yapılır, sonra `node build.js`.

## Sayfa envanteri (46)

| Grup | Adet | Not |
|---|---|---|
| Anasayfa | 1 | hero, 4 hat, vitrin, farklar, süreç, araçlar, servis, SSS |
| Cihaz listesi | 1 | kategori filtresi + canlı arama |
| Kategori | 4 | lazer epilasyon (9), cilt (9), vücut (7), soğutma & aksesuar (3) |
| Cihaz detay | 28 | galeri, 4 sekme, teknik künye, Product schema |
| Kurumsal | 4 | hakkımızda, teknik servis, kiralama & 2. el, iletişim |
| Araçlar | 3 | seçim danışmanı, yatırım hesaplayıcı, karşılaştırma |
| Blog | 1 | konu kümesi iskeleti |
| Yasal + 404 | 4 | KVKK, gizlilik, çerez, 404 |

## Mevcut siteye göre ne değişti

- **Hizmetlerimiz sayfası 43 kelimeydi** — servis kalemleri görsele gömülüydü, Google göremiyordu.
  8 kalem metne çevrildi, her birine teşhis/onarım detayı yazıldı.
- **Hakkımızda 56 kelimeydi.** Gerçek bir kurumsal anlatıya çevrildi.
- **İstanbul ofisi neredeyse görünmüyordu.** Artık alt bilgi, iletişim ve hakkımızda sayfalarında.
- **Fiyat/karar araçları yoktu.** Seçim danışmanı, ROI hesaplayıcı ve karşılaştırma eklendi.
- **Kiralama / ikinci el / takas** hattı sitede hiç yoktu — ayrı sayfa açıldı.
- `endoterapylazer` ile `medart-smartsculpt-endolazer` **birebir aynı içerik** (kaynak sitede
  ayrı iki sayfa). `cihaz-meta.js` içinde `birlesme_adayi` olarak işaretlendi — canlıya geçişte
  biri 301 ile diğerine yönlendirilmeli.

## Mevzuat katmanı

`sablon/mevzuat.js` — kaynak siteden gelen **her metin** build sırasında bu süzgeçten geçer.
Tıbbi Cihaz Satış, Reklam ve Tanıtım Yönetmeliği (15/5/2014, değ. 2023/2025) uyarınca:

| Süzülen | Yerine |
|---|---|
| "FDA Onaylı" (numarasız) | "FDA 510(k) izinli" / künyede K-numarası |
| "en kalıcı epilasyon sonuçları" | "kalıcı tüy azaltmada yaygın tercih edilen" |
| "dünyanın en iyi kullanıcı arayüzü" | "gelişmiş kullanıcı arayüzü" |
| "%100 lot testi", "daha güvenli tedavi" | ölçülebilir/nötr ifade |

Ayrıca eklendi: **24 ay asgari garanti bloğu** (md.25/2, 25/A–25/Ç — 1.1.2025'ten zorunlu),
**işletme türü uygunluk rozeti + filtresi**, **eşit ağırlıklı çerez rızası** (rıza kaydı zaman damgalı),
**6563 md.3 künye alanları**, formda **işletme türü + vergi no + ÜTS kaydı** (md.26/7).
Sepet/online ödeme **yoktur** (md.26/4 — Ek-3 dışı cihazların internetten satışı yasak).

> ⚠ **Teyit bekleyen:** İşletme türü sınıflandırması (17 tıbbi / 7 merkez / 4 salon) cihaz
> teknolojisinden türetilmiş **ön bilgilendirmedir**. Dayanak olarak gösterilen "salon yalnızca
> 600–1200 nm IPL ve ≤20 J/cm² diyot" kuralının numara ve tarihli kaynağı doğrulanmadı.
> Yayına almadan önce hukuk danışmanı onayı gerekir — bkz. `notlar/ACIK-RISKLER.md` madde 4.

## Analiz belgeleri (`notlar/`)

- **ANALIZ-RAPORU.md** — 8 paralel denetçinin (tasarım, teknik, SEO, ürün, dönüşüm, referans,
  rakip, mevzuat) bulgularının konsolidasyonu; mevcut sitenin röntgeni + 12 bölümlük şartname
- **MUSTERIYE-SORULACAKLAR.md** — Faz 1 başlamadan Estezone'dan alınması gereken 28 bilgi
- **ACIK-RISKLER.md** — analizin kendi doğrulanmamış iddiaları (sunum öncesi okunmalı)

## Dikkat

- Formlar **demo**dur; gönderimde bilgilendirme notu gösterilir, hiçbir yere veri gitmez.
  Canlıya geçişte e-posta + WhatsApp bildirimi + CRM bağlanmalı.
- Görseller mevcut estezone.com.tr sitesinden alınmıştır (kendi ürün fotoğrafları).
- Teknik değerler kaynak sitedeki üretici beyanından çıkarılmıştır; yayına geçmeden
  Estezone tarafından teyit edilmelidir.
- Yasal metinler örnek taslaktır; hukuk danışmanı onayı gerekir.
- `20+ yıl`, `28 cihaz`, `2 ofis` gibi rakamlar kaynak siteden doğrulanmıştır; uydurma rakam yoktur.
