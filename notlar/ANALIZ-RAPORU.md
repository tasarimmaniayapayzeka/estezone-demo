# ESTEZONE MEDİKAL — YENİ SİTE İÇİN KARAR BELGESİ
**estezone.com.tr mevcut durum röntgeni + yeni site şartnamesi**
Hazırlanma tarihi: 16 Ağustos 2026 · 8 paralel denetçi bulgusunun konsolidasyonu + spot doğrulamalar
Kanonik alan adı (curl ile teyit edildi): `https://estezone.com.tr` — `www` ve `http` buraya 301 dönüyor.

---

## 1. YÖNETİCİ ÖZETİ

1. **Site teknik olarak ayakta, ticari olarak ölü.** LiteSpeed önbelleği sayesinde TTFB 38–77 ms, HTTP/2+HTTP/3, TLS 1.3, brotli açık. Ama bu hızın taşıdığı şey, 20 yıllık bir tedarikçinin dijital vitrini değil: 159 KB HTML + 525 KB CSS + ~931 KB ham JS ile 41 KB'lık içerik servis ediliyor.
2. **Görsel kimlik fiilen yok.** Tema Montserrat/Noto Sans tanımlamış ama hiçbir font dosyası yüklenmiyor (birleşik CSS'te "Montserrat" 0 kez geçiyor) — site herkeste sistem fontuyla açılıyor. Tek marka mavisi yerine 5 farklı mavi ve konu dışı bir magenta (#e95095) token'ı var, ana link rengi #1b98e0 WCAG AA'yı geçemiyor (3.17:1).
3. **40 sayfa + 82 yazıda tek bir satış formu var** (`/iletisim/`, 4 alan, KVKK onay kutusu yok). 29 cihaz sayfasının hiçbirinde form, PDF föy, teklif butonu veya cihaza özel WhatsApp linki yok. Tek CTA: "Bizi Arayın" (epicool sayfasında teyit edildi) — üstelik header'daki bu buton kaydırınca ve mobilde tamamen kayboluyor.
4. **SEO gücü kendi içinde birbirini yiyor.** 86 yazının 61'i tek bir anlam kümesinde (kosinüs benzerliği %70–90); markalı blog yazıları karşılık geldikleri ürün sayfalarının 6–12 katı uzunlukta (Noblex: yazı 2.223 kelime ↔ ürün sayfası 184 kelime). Yani Google'da teklif alınabilecek sayfa değil, satış yolu olmayan blog sıralanıyor. Son yazı güncellemesi 2024-10-04 — 22 aydır blog dondurulmuş.
5. **Uyum tarafı açık risk.** Firma çapında "FDA Onaylı" iddiası (ispat külfeti reklam verende), halka açık "kalıcı epilasyon / güvenli tedaviler vadeder" vaatleri, çerez rızası alınmadan GTM yüklenmesi, formda açık rıza kutusu bulunmaması, mesafeli satış/iade sayfalarının 404 dönmesi (teyit edildi).

### En can alıcı 3 sorun
| # | Sorun | Neden birinci sırada |
|---|---|---|
| 1 | **Dönüşüm yolu yok** — 122 URL, 1 form, cihaz bağlamı hiçbir yere taşınmıyor | Google Ads bütçesi akıyor (formda `ads_keyword`, `Kampanya_Bilgisi` gizli alanları var, hepsi boş geliyor); mesai dışı ve "önce yazılı bilgi isterim" davranışındaki kurumsal alıcı %100 kayıp |
| 2 | **Para sayfası kendi bloguna kaybediyor** — 61 yazılık kanibalizasyon kümesi + ince ürün sayfaları | Marka sorgusuyla gelen nitelikli B2B trafiği, teknik tablosu ve teklif formu olmayan yazıya düşüyor |
| 3 | **Kanıt katmanı sıfır** — referans, vaka, sertifika görseli, video, ÜTS/CE/510(k) numarası, garanti ve servis SLA'sı yok | Yüz binlerce liralık cihaz alan klinik/hastane satın alması tam olarak bu belgelerle karar veriyor; rakip (Medsatek, Glory Majestic, Asel) bunları yazılı veriyor |

---

## 2. MEVCUT SİTE RÖNTGENİ

### 2.1 Tasarım / UX
| Ölçüm | Değer |
|---|---|
| Yüklenen marka fontu | **0** (`@font-face` sayısı 2, ikisi de ikon fontu: Defaults.eot, revicons.eot) |
| Renk token'ı: mavi sayısı | 5 (`#004996`, `#004e7a`, `#1b98e0`, `#0070e8`/`#0466cf`, logoda `#005090`) + magenta `#e95095` |
| AA'yı geçemeyen token | 3 metin rengi + 2 sabit CTA butonu (`#1b98e0` 3.17:1, `#777777` 4.48:1, `#999999` 2.85:1, beyaz/#25d366 1.98:1) |
| Toplam CTA etiketi (6 sayfa) | **2** — "Bizi Arayın", "İletişim" |
| Hero slider | 5 slayt, **metin katmanı 0**, 4/5 slaytta `alt=""`, ilk slayt 858.446 B, tamamı lazy |
| Ana sayfa başlık yapısı | h1=1, **h2=18, h3=0** (ürün adları H2) |
| `!important` | satır içi 238 + CSS 576 = **814** |
| `clamp()` / `@container` / `prefers-reduced-motion` | 0 / 0 / 0 · `display:grid` = 1 |
| Medya sorgusu | 3 kırılım; **1280px üstü için hiçbir kural yok** (4K'da başlık hâlâ 37px) |
| Duplike DOM | footer ve alt çubuk masaüstü+mobil için iki kez basılıyor (`hide_on_mobiles` ana sayfada 6 kez) |
| Sabit alan | 120–140px header + ~45px alt çubuk (masaüstünde de) ≈ 1080p ekranın %17'si |
| Footer | her sayfada 500px'lik 2020 tarihli Google Maps iframe'i, sadece Ankara; "© 2023" |

### 2.2 Teknik / performans
| Ölçüm | Değer |
|---|---|
| HTML / CSS / JS (ham) | 159.180 B / 525.243 B / 841.545 B (+ jQuery 3.6.4 89.815 B) |
| TTFB (cache HIT) | 38–77 ms · soğukta 425 ms (`/picozone/`) |
| Protokol | HTTP/2 + HTTP/3 ilanı, brotli+gzip, TLS 1.3 — **olumlu** |
| Güvenlik başlıkları | HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy: **hepsi yok** |
| Çalışma zamanı | `X-Powered-By: PHP/8.0.30` — **EOL (Kasım 2023)**, sürüm açıkça sızıyor (16 Ağu'da teyit edildi) |
| xmlrpc.php | **Açık** — `system.multicall` + `pingback.ping` listeleniyor (wp-login gizli olmasına rağmen) |
| Kullanıcı adı ifşası | oembed → `author/estezone` |
| Eklenti parmak izi | generator meta: WPBakery + **Slider Revolution 6.6.13** (güncel değil); `/readme.html` 200 |
| LCP riski | hero görseli + logo dahil 29 `<img>` lazy, gerçek yol `data-src`'de; tek preload revicons.woff |
| Tahmini mobil CWV | LCP 3,0–4,5 s · INP/TBT 200–400 ms+ · CLS 0,1–0,25 |

### 2.3 SEO / içerik
| Ölçüm | Değer |
|---|---|
| Sayfa / yazı (sitemap, 16 Ağu teyit) | **40 / 82** · REST'te 45 sayfa + 86 yazı (4 yazı çapraz canonical'lı, sitemap dışı) |
| Kanibalizasyon | **61 yazı / 49.445 kelime tek kümede**, cos>0,70 olan 649 çift |
| İç link | 86 yazıda toplam **127** (1,5/yazı); ürün sayfasına giden 15; yetim yazı 36 |
| Ürün sayfasına blogdan link | noblex 0, nobleen 0, elazer 0, elazer-plus 0, picozone 0, esteslim 0 |
| Meta description yazılmamış | **32/45 sayfa** (description = title) · 45 yazı başlığı >60 karakter |
| Schema | Product 0, Organization 0 (yerine `Person`), Article 0, hreflang 0 |
| Son yazı güncellemesi | **2024-10-04** (22 ay) · 2025–2026'da 0 güncelleme |
| Taksonomi | 1 kategori ("blog"), 0 etiket, `/blog/` sayfasında H1 yok |
| Çok dillilik | GTranslate ar/en/de/ru/tr — hreflang 0, ayrı URL 0, `inLanguage:"tr"` sabit → SEO değeri sıfır |
| robots.txt | `Disallow:` boş, sitemap bildirimi var — sorun yok (teyit edildi) |

### 2.4 Dönüşüm
| Bileşen | Durum |
|---|---|
| Lead formu | 1 adet (`/iletisim/`, Fluent Forms #9): ad, telefon, e-posta, mesaj. Nitelendirme sorusu 0, KVKK kutusu 0, spam koruması 0 (reCAPTCHA rozeti CSS'le gizlenmiş ama script hiç yüklenmiyor) |
| Ürün sayfasında form / PDF / video | 0 / 0 / 0 |
| Teklif Al / Demo / Fiyat Sor / Geri arama | Hiçbiri yok ("teklif al" ifadesi sitede 0 kez) |
| WhatsApp | `http://wa.me/905398410585` — şifresiz şema, `?text=` yok, cihaz bağlamı taşımıyor |
| Eski ürün sayfalarındaki CTA | `/demo/iletisim/` (staging kalıntısı, 301 ile çözülüyor) — `/epicool/` üzerinde teyit edildi; yeni `/t-shape-2/` sayfasında yok |
| Finansman / leasing / taksit / kurulum / eğitim / garanti | Sitede geçmiyor (garanti sadece 1 blog yazısında genel tavsiye olarak) |
| Kiralama / 2. el | Fiilen sunuluyor ama sadece blog yazılarının içinde; menüde ve formda yok |
| Referans / vaka / yorum / sertifika görseli / canlı sohbet | Hiçbiri yok |
| Yasal | `/mesafeli-satis-sozlesmesi/` ve `/iade-ve-degisim/` **404** (teyit edildi); KVKK ve çerez politikası 200 ama 2024 öncesi şablon |

### 2.5 Denetçi çelişkileri — hangisi geçerli

| Çelişki | Karar | Gerekçe |
|---|---|---|
| 82 mi 86 mı blog yazısı | **İkisi de doğru**: sitemap 82 (teyit edildi), REST 86 — fark, çapraz canonical konmuş 4 yazı | Ölçüm yöntemi farkı; SEO denetçisi bunu açıkça belirtmiş |
| 40 mı 45 mi sayfa | **Sitemap 40 (teyit)**, REST 45 (3'ü noindex + sitemap dışı ads sayfaları) | İkisi tutarlı |
| 28 mi 29 mu cihaz sayfası | **29 URL** (brief 28 diyor, gerçek liste 29) → gerçekte 24 cihaz + 2 soğutma aksesuarı + 1 gözlük grubu (9 model) + 1 rehber sayfa + 1 tam kopya | Ürün denetçisi 29 URL'yi tek tek 200 ile çekmiş — en güvenilir kaynak |
| Kanonik alan `www` mu apex mi | **apex `https://estezone.com.tr`** | 16 Ağu curl: `www` → 301 → apex. Brief'teki "www.estezone.com.tr" yanlış; **yeni sitede de apex korunmalı**, değiştirilirse tüm sinyaller sıfırlanır |
| CSS gzip 93.798 mi 128.998 mi | Ham boyut **525.243 B** kesin; gzip farkı ölçüm/sıkıştırma seviyesi farkı | Karar için ham boyut kullanılmalı |
| Yandex Metrica yükleniyor mu | **Yüklenmiyor.** Ana sayfa HTML'inde `yandex`/`metrika` 0 eşleşme (teyit edildi). Çerez politikası sayfası onu listeliyor — yani **politika metni gerçek durumu yansıtmayan eski bir şablon** | Mevzuat denetçisi politikayı, teknik denetçi kaynağı okumuş; ikisi birlikte doğru sonucu veriyor: kaldırılması gereken şey Metrica değil, yanlış politika metni |
| Çerez bandı var mı | Ana sayfada CMP script'i **yok**, `<body>`'de `cookies-not-set` sınıfı var (tema kaynaklı). "Tamam" butonlu bildirim bazı sayfalarda tema tarafından basılıyor olabilir; **her hâlükârda "Reddet" seçeneği ve rıza kaydı yok** | Teknik doğrulama mevzuat denetçisinin sonucunu değiştirmiyor |
| Fiyat yayınlamak yasak mı | **Yasak değil.** Fiyat/kampanya yasağı 33075 sayılı Yönetmelik'te ve kapsamı sağlık kuruluşları — cihaz satıcısını bağlamaz. Yasak olan **internetten satış** (Ek-3 dışı cihazlar, md.26/4) | Mevzuat denetçisi maddeyi tarayarak doğrulamış; EsteTouch referansındaki "fiyat yazılmaz" kuralı EsteTouch'un kendi ticari tercihidir, Estezone için hukuki zorunluluk değil |

---

## 3. KRİTİK SORUNLAR (önem sırasıyla)

**K1 — Dönüşüm yolu yok**
Sorun: 122 URL'de 1 form; cihaz sayfalarında teklif, föy, WhatsApp derin linki, geri arama yok; header CTA'sı kaydırınca ve mobilde kayboluyor (`hide-for-sticky hidden_for_mobiles`).
İş etkisi: Ads bütçesi formsuz iniş sayfalarına akıyor; mesai dışı talep %100 kayıp; hangi cihazın talep ürettiği ölçülemiyor.
Çözüm: Her cihaz sayfasında yapışkan teklif kutusu (cihaz adı gizli alanda), 3 adımlı nitelendirme formu, mobil alt çubuk (Teklif / WhatsApp / Ara / Servis), `https://wa.me/905398410585?text=` ön dolu mesaj, her gönderimde GA4+Ads olayı + CRM kaydı.

**K2 — Para sayfası kendi bloguna kaybediyor**
Sorun: 61 yazılık kanibalizasyon kümesi; markalı yazılar ürün sayfalarının 6–12 katı; ürün sayfalarında Product schema 0.
İş etkisi: Marka sorgusuyla gelen nitelikli alıcı, teknik tablo ve formu olmayan yazıya düşüyor.
Çözüm: 7 marka yazısı ↔ ürün sayfası birleşmesi (yazının içeriği ürüne taşınır, yazı 301'lenir); tek otorite = ürün sayfası; Product + Offer("teklif üzerine") + Brand + AdditionalProperty schema veri modelinden otomatik üretilir.

**K3 — Kanıt katmanı sıfır**
Sorun: referans, vaka, müşteri yorumu, sertifika görseli, video, indirilebilir belge, ÜTS/CE/510(k) numarası, garanti süresi, servis SLA'sı — hiçbiri yok. `/hakkimizda/` 42 kelime, `/hizmetlerimiz/` 8 ikon + 16 kelime.
İş etkisi: 20 yıllık firma dijitalde yeni kurulmuş görünüyor; hastane/zincir klinik satın alma listesine giremiyor.
Çözüm: Kurumsal derinlik bloğu (zaman çizelgesi, ekip, servis atölyesi, distribütörlük belgeleri), il bazlı kurulum haritası, 6 vaka çalışması, cihaz başına belge künyesi ve indirilebilir PDF'ler.

**K4 — Teknik servis, en güçlü koz, hiç satılmıyor**
Sorun: Pompa hücresi, flash lamba, optik lens, fiber optik kablo, güç kaynağı, PFN, diyot, soğutucu onarımı yapılıyor — sayfada 8 ikon var, form ve sayısal taahhüt yok. Yedek parça sipariş akışı yok.
İş etkisi: Cihazı duran klinik gün başına ciro kaybediyor ve acil arıyor; en sıcak talep telefon kuyruğunda. Tekrar eden gelir kalemi (lamba, bar, kartuş, iğne başlık, gözlük) dijitalde kapalı.
Çözüm: Sayısal SLA'lı Teknik Servis sayfası + "Arıza Bildir" formu (marka/model/seri no/fotoğraf/aciliyet), üç kademeli bakım paketi, marka bağımsız servis konumlandırması, sarf & yedek parça kataloğu.

**K5 — Uyum riski (dört başlık birden)**
Sorun: (a) firma çapında "FDA Onaylı" iddiası ispatsız; (b) halka açık "kalıcı epilasyon", "güvenli tedaviler vadeder", "vajinal gençleştirme" vaatleri; (c) çerez rızası alınmadan GTM; (d) formda açık rıza kutusu yok, ticari ileti izni aydınlatma metnine gömülü; (e) mesafeli satış/iade sayfaları 404.
İş etkisi: Reklam Kurulu + TİTCK çifte yaptırım; KVKK'nın 500.000–2.000.000 TL bandında ceza kestiği tam senaryo.
Çözüm: Bölüm 11'deki yasak sözlük + zorunlu unsurlar; iki katmanlı içerik mimarisi; rıza-öncelikli script yükleme.

**K6 — Katalog gezilemiyor, veri modeli yok**
Sorun: 23 cihaz düz isim listesi; filtre, karşılaştırma, spec rozeti yok; üç farklı yerde üç farklı ürün listesi (ana sayfa 15, katalog 23, footer 10 — footer'da katalogda olmayan EpiCare-Zenith ve Epicare DUO var); 6 sayfa katalogdan erişilemiyor (yetim); Epizone Mix (lazer epilasyon) "Kozmetik", EpiCool/Zimmer (aksesuar) "Medikal" altında.
Çözüm: Tek kaynak ürün JSON'u → katalog, kartlar, filtre, karşılaştırma, schema, meta açıklama, 301 haritası hepsi buradan üretilir. Manuel liste yönetimi kalkar, yetim sayfa yapısal olarak imkânsız hale gelir.

**K7 — Yayında duran veri hataları**
`esteslim-mix` boyutu "63mm*76mm*126mm" (75 kg cihaz için imkânsız, cm olmalı) · `/estesculpt-vudut-sekillendirme-cihazi/` slug'ında "vudut" yazım hatası · EpiCare-Zenith'te "Ölçüler | Ölçüler" boş satırı ve "dal)ga boyu" · Lucid Q-PTP'de 124, UTIMS'te 22 adet soft-hyphen (U+00AD) kelimeleri bölüyor · GoldZone sayfasında Elazer fotoğrafları, Epizone'da Elazer Plus fotoğrafları, HydraBeauty'de eski "SkinZone" dosya adları · UTIMS'in 3 teknik tablosu görsele gömülü (metin olarak okunamıyor).
Çözüm: Tipli alanlar (sayı+birim), mantık kontrolü (ağırlık >20 kg ise ölçü cm), yayın öncesi `denetle.js` — bu hatalar canlıya çıkamaz.

**K8 — Performans ve erişilebilirlik borcu**
814 `!important`, negatif margin ile kurulmuş düzen, duplike DOM, 6 ikon font ailesi, 7 buton stilinden 6'sı kullanılmıyor, otomatik slider `prefers-reduced-motion` tanımıyor, ürün görsellerinde alt boş.
Çözüm: Yığının tamamen terki (Bölüm 7 ve 12).

---

## 4. NE KORUNACAK

Bunlar yeni siteye **birebir taşınacak varlıklardır** — sıfırdan yapılırken kaybedilmesi en pahalı şeylerdir.

1. **Alan adı ve kanonik yapı.** `https://estezone.com.tr` (apex). Değiştirilmeyecek. `www` ve `http` 301'leri korunacak.
2. **122 URL'lik SEO mirası.** 40 sayfa + 82 yazı (+ sitemap dışı 4 yazı ve ads sayfaları). Hiçbiri 404'e düşmeyecek; her biri ya birebir korunacak ya doğrudan (zincirsiz) 301'lenecek.
3. **İçeriğin işlenebilir kısmı.** Kanibalizasyon kümesindeki 61 yazı çöp değil, hammadde: 49.445 kelimelik metin 6–8 derin rehbere damıtılacak. Marka yazılarındaki 2.223 / 2.018 / 1.712 kelimelik anlatımlar ürün sayfalarının gövdesi olacak.
4. **`/t-shape-2/` sayfası — yeni ürün şablonunun modeli.** 845 kelime, gerçek H2/H3 hiyerarşisi, 34 satırlık teknik tablo, FDA 510(k) K231092 + Class II + ürün kodu NUV/PBX, üretici B&M S.R.L./Baldan Group. Sitedeki tek "doğru yapılmış" sayfa.
5. **Doğrulanabilir belge verisi.** T-Shape 2 (FDA K231092, Class II), Modula BBL (Class IIb, CE 1936), Arion (CE MDD 93/42/EEC + FDA 510k), gözlükler (CE EN207/EN169). Bunlar korunacak; kalan cihazlar için numaralar üreticilerden toplanacak.
6. **Ürün portföyünün kendisi.** 24 cihaz, 4 kıtadan 10 üretici: B&M/Baldan (İT), Wavemed (İT), Almalaser (İT), Light Age (ABD), FineMEC (KR), KORUST (KR), MedArt (AB), DSE, Zimmer (DE) + Estezone kendi markaları.
7. **Taklit edilemez ticari varlıklar.** Arion Alexandrite **tek yetkili distribütörlük**, Epicare **tek yetkili teknik servis**, komponent seviyesinde onarım kapasitesi, satın al / kirala / 2. el üç edinim modelinin hepsine sahip olmak, Ankara + İstanbul iki ofis, 20 yıl.
8. **Çalışan altyapı parçaları.** LiteSpeed önbelleği, HTTP/2+3, TLS 1.3, `wp-login`/`wp-admin` gizleme, statik varlıklarda 1 yıllık cache, GTM-5J7N99FZ konteyneri (yeniden yapılandırılarak).
9. **NAP verisi.** Ankara: Mutlukent Mah. Angora Bulvarı No:42 Beysukent, 06810 Çankaya · İstanbul: Brandium Residence, Küçükbakkalköy, Dudullu Cd. No:23 R2 Blok Kat:28 D:256 Ataşehir · +90 312 466 66 86 · WhatsApp +90 539 841 0585 · info@estezone.com.tr. İstanbul ofisi sitenin %99'unda görünmüyor — korunup her yere yayılacak.

---

## 5. ÜRÜN PORTFÖY HARİTASI

**29 URL → 24 cihaz + 2 soğutma aksesuarı + 1 sarf ailesi (9 gözlük modeli) + 1 rehber sayfası + 1 tam kopya**
Yeni sitede: **21 ürün kaydı** (varyantlarla ~28 SKU) + sarf kataloğu.

### 5.1 Birleştirilecek kopyalar (önce bunlar)
| Çift | Kanıt | Karar |
|---|---|---|
| `/endoterapylazer/` ↔ `/medart-smartsculpt-endolazer/` | 60 satırın 59'u, 9/9 görsel aynı | **Tek kayıt**: "MedArt SmartSculpt Endolazer (EndoTerapyLazer)", `alternatif_adlar[]` alanı |
| `/elazer-plus/` ↔ `/epizone-mix-diode-lazer/` | Spec tablosu birebir, görseller ortak | Tek kayıt + iki marka adı varyantı |
| `/estesculpt-pro/` ↔ `/estesculpt-vudut-sekillendirme-cihazi/` | Aynı HI-EMT ailesi (3000W vs 2600W) | Tek ürün ailesi, 2 varyant |
| `/esteslim-mix/` ↔ `/esteslim-zayiflama-cihazi/` | Aynı kriyolipoliz ailesi | Tek ürün ailesi, 2 varyant |
| Epicare LPX ↔ DUO ↔ Zenith | 19 maddelik endikasyon listesi birebir aynı | **Light Age Epicare Serisi** tek ürün ailesi + varyant karşılaştırma tablosu |
| `/epicool/` ↔ `/zimmer-cryo-6-.../` | Aynı işlev, farklı marka/fiyat | İki ayrı kayıt + zorunlu kıyas tablosu |

### 5.2 Yeni kategori ağacı (alıcı diliyle)

**A. Lazer Epilasyon (7 kayıt / 9 varyant)**
| Cihaz | Üretici / Menşe | Teknoloji | Hedef işletme |
|---|---|---|---|
| Light Age Epicare Serisi (LPX / DUO / Zenith) | Light Age Inc. / ABD | Alexandrite 755 + Nd:YAG 1064, 100 W, 700–2500 J/cm² | Klinik, hastane, medikal estetik merkezi |
| Arion Alexandrite | Almalaser / İtalya — **Estezone tek yetkili distribütör** | Alexandrite 755, 5–140 ms, scanner 60×65 mm | Klinik, merkez |
| Noblex | FineMEC / G. Kore | Long Pulse Alexandrite 755, 80 J, spot 2–20 mm | Merkez, klinik |
| Nobleen | FineMEC / G. Kore | Alex 755 + Nd:YAG 1064, opsiyonel 20×20 mm kare atış | Klinik |
| Aileen | FineMEC ailesi (doğrulanmadı) | Long Pulse Nd:YAG 1064, Genesis 0,3 ms | Klinik (koyu fototip) |
| Elazer | Estezone markası | 755+808+1064 mix diyot, 42 kg | Salon üstü / merkez |
| Elazer Plus (= Epizone Mix) | Coherent barı, üretici belirtilmemiş | 755+808+1064, 3300 W, spot 13,5×38,5 mm | Merkez, yoğun hacim |

**B. Vücut Şekillendirme ve Zayıflama (4 kayıt / 6 varyant)**
T-Shape 2 (B&M/Baldan, İT — RF+LLLT+vakum+mesosphere, FDA K231092) · MedArt SmartSculpt Endolazer (1470 nm, 15 W, minimal invaziv — **hekim/klinik**) · EsteSculpt Ailesi (HI-EMT 0–7 T, Pro 3000 W / standart 2600 W) · EsteSlim Ailesi (kriyolipoliz −15/+5 °C, Mix'te RF 10 MHz + kavitasyon 40 kHz)

**C. Cilt Yenileme ve Bakım (5 kayıt)**
RFYNE (Wavemed, İT — RF mikroiğne 470 kHz–3 MHz) · UTIMS Centerless A3 (KORUST, KR — HIFU/LIFU 10 MHz, 12 kartuş) · Modula BBL (Wavemed, İT — 6 filtre 400–640 nm, CE 1936, Class IIb) · GoldZone (RF mikroiğne 2 MHz, iğne 0,4–4 mm) · HydraBeauty (9-in-1 hidrafasyal, CE/ISO13485)

**D. Medikal Lazer — Dermatoloji ve Jinekoloji (3 kayıt, sadece hekim)**
Lucid Q-PTP (Q-Sw Nd:YAG 1064/532, 2200 mJ, PTP modu) · PicoZone (750 ps, 1600 mJ) · COTRA PLUS CO2 (DSE — 10.600 nm, 50 W, fraksiyonel + jinekolojik başlık)

**E. Yardımcı Ekipman ve Sarf (2 cihaz + sarf ailesi)**
EpiCool (−15/−21 °C, 1000 l/dk) · Zimmer Cryo-6 (−30 °C, Almanya) · **Lazer koruyucu gözlükler: 9 model** (Excimer 200–540, Diode 800–1100, Alexandrite 740–850, Alex+Diode+YAG 740–1100, Er:YAG 2780/2940, CO₂ 10.600, Q-Sw/KTP 532–1064, IPL 200–1400, hasta gözlüğü 200–2000 nm; CE EN207/EN169) + flash lamba, optik lens, pompa hücresi, fiber optik kablo, kartuş, iğne başlık, jel

**F. Rehber içeriğe taşınacak (ürün değil)**
`/epilasyon-cihazi/` (745 kelime, H1 yok, 2021'den beri güncellenmemiş) → `/rehber/lazer-epilasyon-cihazi-secim-rehberi/`

### 5.3 Ürün veri şeması (tek kaynak — `icerik/urun/*.json`)
```
id, slug, eskiUrl[], ad, alternatifAdlar[], kisaAd,
uretici, ureticiUlke, distributorlukTipi (tekYetkili|bayi|kendiMarkasi),
kategori, altKategori, teknolojiEtiketleri[],
hedefIsletme[] (salon|guzellikMerkezi|poliklinik|tipMerkezi|hastane),
mevzuatKapisi: { salonaSatilabilir: bool, gerekce },
tekCumleTanim, kullanimAmaci (imalatçı intended-use metni birebir),
teknik: { dalgaBoylari[], gucW, maxFluenceJcm2, pulseMsMin/Max, frekansHzMin/Max,
          spotBoyutlari[], sogutmaTipi, sogutmaDerece, ekran, boyutCm, agirlikKg, elektrik },
belgeler: { ceNo, onaylanmisKurulusNo, sinif, utsNo, fda510k, brosurPdf, kilavuzPdf },
garanti: { sureAy, teknikServis, azamiTamirSuresi, yedekParcaGunIcYurt/DisYurt, egitimSaat },
endikasyonlar[], sinirliliklar[], basliklar[], sarfMalzeme[],
yatirimBandi: { min, max, paraBirimi, dahil[] },
roi: { ortalamaSeansSuresiDk, gunlukKapasite, sarfMaliyetiAtis },
gorseller[] {url, tip, altMetin}, video, sss[], karsilastirilabilir[],
durum (aktif|arsiv|birlesti), sonGuncelleme, hazirlayan
```
**Zorunlu filtre eksenleri:** dalga boyu · teknoloji · uygulama alanı · işletme türü · sertifika · yatırım bandı.

---

## 6. YENİ SİTE MİMARİSİ

### 6.1 Menü (üst seviye, 7 madde)
`CİHAZLAR` · `UYGULAMALAR` · `EDİNİM MODELİ` · `TEKNİK SERVİS & SARF` · `REHBER` · `KURUMSAL` · `İLETİŞİM`
Sağda sabit: **[Teklif İste]** (dolu marka rengi) · WhatsApp ikonu · Profesyonel Giriş

### 6.2 Sayfa ağacı
```
/                                   Ana sayfa — 11 bölümlük satış akışı (6.3)
/cihazlar/                          Katalog hub'ı: filtre + karşılaştırma + 21 kart
  /lazer-epilasyon/                 HUB (23 eski URL buraya)
    /alexandrite/  /diyot-lazer/  /nd-yag/  /ipl/     teknoloji alt hub'ları
  /vucut-sekillendirme/  (+/soguk-lipoliz/)
  /cilt-yenileme/  /cilt-analiz/
  /medikal-lazer/
  /yardimci-ekipman/  (/lazer-gozlugu/  /cilt-sogutma/)
  /cihazlar/<slug>/                 21 ürün sayfası (tek şablon)
/uygulamalar/                       Endikasyon ekseni — rakiplerde ve mevcut sitede YOK
  epilasyon · dovme-silme · leke-pigment · damar-lezyon · cilt-yenileme
  · bolgesel-incelme · siklastirma · akne-izi · jinekolojik
/edinim/                            Üç model eşit ağırlıkta
  /satin-alma/  /kiralama/  /sertifikali-2-el/  /takas/  /odeme-ve-finansman/
/destek/
  /teknik-servis/                   SLA + Arıza Bildir formu
  /yedek-parca-ve-sarf/             Model bazlı filtreli katalog
  /egitim-ve-kurulum/  /garanti-kosullari/
/rehber/                            8 derin rehber (61 yazı buraya damıtılıyor)
  lazer-epilasyon-cihazi-secim-rehberi · lazer-epilasyon-cihazi-maliyet-analizi
  · vucut-sekillendirme-maliyet-analizi · alexandrite-vs-diyot-vs-ndyag
  · alexandrite-cihaz-markalari · ikinci-el-ve-kiralama
  · guzellik-salonu-klinik-acilis-kilavuzu · isletme-tipine-gore-cihaz-secimi
/araclar/
  /yatirim-hesaplayici/             ROI — Türkiye'de hiçbir rakipte yok
  /cihaz-secim-testi/               4-5 soru → 2 öneri + teklif formu
  /cihaz-karsilastirma/             2-3 cihaz yan yana
/kurumsal/
  /hakkimizda/  /markalar-ve-distributorlukler/  /belgeler-ve-uts/
  /referanslar/  /showroom-ankara/  /showroom-istanbul/  /ekip/
/profesyonel/                       KAPALI KATMAN (kayıt + meslek beyanı, noindex)
  parametre-protokol-kutuphanesi · klinik-kaynaklar · oncesi-sonrasi-arsivi
  · fiyat-ve-teklif · egitim-videolari
/portal/                            Faz 3: cihazlarım, garanti, servis geçmişi, tekrar sipariş
/iletisim/  /teklif-al/  /tesekkurler/ (noindex)
/lp/…                               Ads iniş sayfaları — tamamı noindex,follow
/kvkk-aydinlatma/ /acik-riza/ /ticari-elektronik-ileti/ /cerez-politikasi/
/gizlilik/ /satis-ve-teslim-kosullari/ /erisilebilirlik-beyani/
```

### 6.3 Ana sayfa akışı (11 bölüm)
1. **Topbar** — telefon · WhatsApp · info@ · "Hafta içi 09:00–18:00" · dil
2. **Sticky header** 68px — logo, 7 menü, arama, [Teklif İste], Profesyonel Giriş
3. **Hero** — gerçek HTML H1 + tek cümlelik değer önermesi + 2 CTA ([Teklif İste] / [WhatsApp'tan Yaz]) + güven şeridi (CE/ÜTS/FDA 510(k) · 20 yıl · Ankara+İstanbul · Yetkili teknik servis). Otomatik slider yok; tek sabit görsel, `fetchpriority=high`, ≤160 KB AVIF
4. **Sayılarla Estezone** — 20 yıl · X il · Y kurulum · Z markaya servis · 2 showroom
5. **Kimin için?** — 4 kart: Güzellik Salonu / Güzellik Merkezi / Poliklinik-Tıp Merkezi / Hastane → her biri mevzuata uygun cihaz filtresine gidiyor (**mevzuat kapısı, aynı zamanda en güçlü satış ayracı**)
6. **Cihaz kategorileri** — 5 kart, canlı ürün sayısıyla
7. **Öne çıkan cihazlar** — 6 kart, her kartta 3 spec rozeti + [İncele] + [Teklif Al]
8. **Karar araçları bandı** — Yatırım Hesaplayıcı · Cihaz Seçim Testi · Karşılaştırma
9. **Teknik servis vaadi** — sayısal SLA + [Arıza Bildir] + servis atölyesi görseli
10. **Kanıt** — referans/kurulum haritası + belge künyeleri + 3 vaka + blogdan 3 rehber
11. **Kapanış CTA + Footer (4 sütun) + mobil alt çubuk (4 aksiyon, 48px+, safe-area)**

### 6.4 Ürün sayfası şablonu (tek şablon, 21 sayfa)
Hero (ad + üretici + menşe bayrağı + "tek yetkili distribütör" rozeti + 3 spec rozeti + [Teklif Al] + [WhatsApp] + [Föy indir])
→ sticky sekme çubuğu: **Genel Bakış | Teknoloji | Başlıklar | Uygulamalar | Teknik Tablo | Yatırım & ROI | Garanti & Servis | Belgeler | SSS**
→ "Kimler kullanabilir?" rozet satırı (uygun olan yeşil, olmayan gri + tooltip'te gerekçe)
→ "Paketimize dahil" bloğu (garanti ayı, kurulum, eğitim saati, ilk yıl bakım, yedek parça taahhüdü)
→ Benzer modellerle karşılaştırma tablosu
→ Sağ kolonda yapışkan teklif kutusu (cihaz adı ön dolu), mobilde alt çubuk
→ Sayfa altı künye: **Son güncelleme + hazırlayan/denetleyen**

---

## 7. TASARIM YÖNÜ

### 7.1 Konumlandırma
EsteTouch'ın tonu **satış-enerjik** (lacivert + teal + altın, hap butonlar, emoji ikonlar). Estezone aynı çıtada ama farklı karakterde olmalı: **mühendislik ciddiyeti + 20 yıllık kurumsal güven.** Yani aynı teknik kalite (tek CSS, token sistemi, sıfır page builder, chatbot, araçlar), farklı görsel dil: daha keskin köşeler, daha yüksek bilgi yoğunluğu, tablo ve rozet kültürü, daha sakin renk.

### 7.2 Renk paleti (logo `#005090`'dan türetilmiş 9 basamaklı ölçek)
| Token | Hex | Kullanım | Kontrast |
|---|---|---|---|
| `--brand-50` | `#eef5fb` | Yumuşak zemin, rozet arkası | — |
| `--brand-100` | `#d6e6f4` | Kart zemini, tablo başlığı | — |
| `--brand-200` | `#adcbe8` | Kenarlık, ayraç | — |
| `--brand-300` | `#7aa9d6` | Koyu zemin üstü ikincil metin | — |
| `--brand-400` | `#4685c1` | Hover, grafik | — |
| `--brand-500` | `#1f66a8` | İkincil buton | beyaz metin 5,9:1 |
| **`--brand-600`** | **`#0d5490`** | **Ana marka** — birincil buton, link, header | beyaz metin **7,8:1** |
| `--brand-700` | `#0a4374` | Buton hover, vurgu | 10,2:1 |
| `--brand-800` | `#08325a` | Koyu bölüm zemini | — |
| `--brand-900` | `#06253f` | Footer, hero zemini | — |
| `--gold` | `#c9922f` | Belge/garanti/20 yıl vurgusu — **sadece koyu zemin üstünde metin** (#06253f üstünde 5,7:1); açık zeminde yalnız dekoratif | — |
| `--service` | `#0f766e` | Teknik servis ikincil aksiyonu | beyaz metin 5,5:1 |
| `--alert` | `#b3261e` | Acil arıza, uyarı | beyaz metin 6,5:1 |
| `--wa` | `#25d366` | WhatsApp — **üstünde koyu metin `#06253f`** (7,9:1); beyaz metin kullanılmayacak | — |
| `--ink-900` | `#0f1720` | Başlık | 17,4:1 |
| `--ink-700` | `#33404f` | Gövde metni | 10,4:1 |
| `--ink-500` | `#5b6878` | İkincil metin (eski `#999999` yerine) | **5,6:1** |
| `--line` | `#dfe5ec` | Kenarlık | — |
| `--surface` | `#f5f8fb` | Alternatif bölüm zemini | — |

**Kaldırılanlar:** `#e95095` (magenta), `#1b98e0` (metin/link olarak — sadece koyu zemin üstünde `#7fc4f0` vurgu tonu olarak yaşayabilir), `#0070e8`, `#0466cf`, `#999999`, `#777777` (12px metinde).
Tüm metin/zemin çiftleri AA (küçük ≥4,5:1, büyük ≥3:1) doğrulanmış olacak; `prefers-color-scheme: dark` için ikinci token seti tanımlanacak.

### 7.3 Tipografi
- **Başlık:** Inter Tight (600 / 700 / 800) — teknik, dar, tablo başlıklarında ekonomik
- **Gövde:** Inter (400 / 500 / 600), `font-feature-settings: "cv05","ss01"`
- **Teknik tablo/seri no:** `font-variant-numeric: tabular-nums` (gerekirse IBM Plex Mono 400)
- **Barındırma: kendi sunucumuzda, variable woff2, `preload` + `font-display: swap` + `size-adjust` fallback metrikleri.** Google Fonts isteği yapılmayacak (hem CLS hem KVKK yurt dışı aktarım gerekçesiyle).

Akışkan tip skalası (`clamp()` — mevcut sitede 0 kez geçiyor):
```
--fs-display: clamp(2.25rem, 1.40rem + 3.4vw, 3.75rem);  /* line-height 1.06 */
--fs-h1:      clamp(2.00rem, 1.30rem + 2.6vw, 3.00rem);  /* 1.12 */
--fs-h2:      clamp(1.50rem, 1.10rem + 1.6vw, 2.25rem);  /* 1.20 */
--fs-h3:      clamp(1.20rem, 1.05rem + 0.6vw, 1.50rem);  /* 1.30 */
--fs-body:    clamp(1.00rem, 0.97rem + 0.15vw, 1.0625rem); /* 1.65 */
--fs-small:   0.875rem;  --fs-label: 0.78rem; /* 0.10em letter-spacing, uppercase */
```

### 7.4 Düzen ve bileşen ölçüleri
| Öğe | Değer |
|---|---|
| Konteyner | 1200px (geniş bölümlerde 1360px), yan boşluk 24px / mobil 16px |
| Boşluk skalası | 4-8-12-16-24-32-48-64-96-128 · `--section-gap: clamp(56px, 6vw, 112px)` |
| Izgara | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` · negatif margin ve `!important` **sıfır** |
| Kırılımlar | 640 / 900 / 1200 / 1440 (mobil menü 1024px'te) |
| Header | 68px sticky → kaydırınca 56px; mobilde 56px |
| Mobil alt çubuk | 64px + `safe-area-inset-bottom`, 4 aksiyon, min 48px dokunma hedefi |
| Yarıçap | kart 14px, buton 10px, rozet 6px, giriş 10px (hap buton **yok** — kurumsal ton) |
| Gölge | `0 1px 2px rgba(6,37,63,.06), 0 8px 24px rgba(6,37,63,.08)` |
| Kart görsel oranı | 4:3 (ürün), 16:9 (içerik) — `aspect-ratio` ile, CLS 0 |

### 7.5 Görsel dil
- **Ürün fotoğrafı standardı:** 2000px+, beyaz/açık gri zemin, aynı perspektif ve ışık, cihaz başına **minimum 6 kare** (izole hero, çoklu açı, başlık/aplikatör yakın çekim, ekran arayüzü, klinik ortamı, teknik çizim/ölçü). Mevcut 458×458–1024×1024 arası dağınık set normalize edilecek; Modula BBL'nin 150×150 galerisi yeniden üretilecek.
- **Format:** AVIF + WebP fallback, 3 boy `srcset`, hero `fetchpriority="high"` ve **lazy değil**; ilk ekran altı lazy.
- **AI görsel hattı:** gerçek cihaz fotoğrafları referans girdi, ambiyans/kategori kapakları ve blog görselleri Higgsfield `nano_banana_pro` 2k ile tutarlı set olarak üretilir; etiket/yazı SVG ile üstüne bindirilir. Akış: 3 örnek kare → onay → tam set.
- **İkon:** tek inline SVG seti (ihtiyaç kadar), 6 ikon font ailesi tamamen kalkacak. Emoji ikon kullanılmayacak.
- **Hareket:** `@media (prefers-reduced-motion: reduce)` altında tüm geçişler kapalı; otomatik oynayan karusel yok.

### 7.6 Performans hedefleri
CSS ≤ **45 KB gzip** · JS ≤ **30 KB gzip** (jQuery yok, page builder yok, Slider Revolution yok) · LCP < **1,8 s** (orta Android + 4G) · CLS < **0,05** · INP < **200 ms** · sayfa başına toplam ilk yük < 400 KB.

---

## 8. DÖNÜŞÜM MOTORU

### 8.1 CTA hiyerarşisi (tüm sitede tek dil)
| Sıra | Etiket | Görünüm | Yer |
|---|---|---|---|
| Birincil | **Teklif İste** | dolu `--brand-600` | Header (kaydırınca da görünür), her ürün kartı, ürün sayfası sticky kutu, mobil alt çubuk |
| İkincil | **WhatsApp'tan Yaz** | `--wa` zemin + koyu metin | Header ikonu, ürün sayfası, mobil çubuk |
| Üçüncül | **Hemen Ara** | outline | Topbar, iletişim, mobil çubuk |
| Servis | **Arıza Bildir** | `--service` | Servis sayfası, ürün sayfası "Garanti & Servis" sekmesi, mobil çubuk (giriş yapmış müşteri) |
| Mesai dışı | **Sizi Geri Arayalım** | birincil CTA otomatik buna döner | Tüm sayfalar 18:00–09:00 ve pazar |

### 8.2 Form seti (5 form)
1. **Teklif formu (3 adım)** — Adım 1: ilgilenilen cihaz (ön dolu) + işletme türü (salon / güzellik merkezi / poliklinik-tıp merkezi / hastane / hekim / yeni açılış). Adım 2: şehir + kurulum zamanı + edinim tercihi (satın alma / kiralama / 2. el / takas) + ÜTS kaydı var mı. Adım 3: ad, telefon, e-posta, işletme adı + **ayrı ayrı** KVKK aydınlatma onayı ve ticari ileti izni. Kısmi doldurmalar kaydedilir.
2. **Servis talep formu** — marka/model/seri no, arıza tanımı, fotoğraf/video yükleme, aciliyet; otomatik talep numarası + tahmini dönüş süresi.
3. **Sarf/yedek parça talep formu** — cihaz modeli seçimi → uyumlu parça listesi → adet.
4. **Takas/2. el değerlendirme formu** — marka, model, yıl, **atış sayacı**, bakım geçmişi, fotoğraf.
5. **Belge indirme (gated)** — ad, telefon, e-posta, işletme türü karşılığı teknik föy / katalog / yatırım rehberi PDF'i.

Hepsinde: bal küpü + Turnstile, hız limiti, teşekkür sayfası (noindex, dönüşüm ölçümü için), satışa anında e-posta/WhatsApp bildirimi, CRM kaydı, GA4+Ads olayı.

### 8.3 Araçlar (huninin ağırlık merkezi)
| Araç | Girdi | Çıktı | Neden |
|---|---|---|---|
| **Yatırım Geri Dönüş Hesaplayıcısı** | işletme türü, şehir, günlük seans, ortalama paket bedeli, seçilen cihaz, edinim modeli | aylık ciro, sarf+bakım+elektrik+personel gideri, amorti ayı, 24 aylık nakit akışı grafiği, satın alma vs kiralama vs 2. el kıyası, "PDF olarak gönder" | Türkiye'de **hiçbir** cihaz satıcısında interaktif hâli yok (Newmed ve Medsatek'te yalnızca statik tablo) |
| **Cihaz Seçim Testi** | 5 soru: işletme türü, hedef uygulama, hasta profili/fototip, günlük hacim, bütçe bandı | 2 cihaz önerisi + mevzuat uyarısı + teklif formu | 21 cihazlık portföyde karar felcini çözer |
| **Karşılaştırma** | 2–3 cihaz | normalize spec tablosu (dalga boyu, güç, fluence, spot, soğutma, ölçü, sertifika, yatırım bandı) | AI aramalarda alıntılanabilir yapılandırılmış tablo üretir |
| **Finansman simülasyonu** | peşinat, vade | tahmini taksit ("temsilîdir" notuyla) | Rakiplerde (Asel) sadece vaat düzeyinde |

### 8.4 Ölçüm ve sahiplik
- Lead deposu **firmanın kendi veritabanı + CRM'i**; ajans paneline yalnızca kopya. (Mevcut formdaki `firma_id=6`, `donusum_tip_id=8` alanları verinin üçüncü bir panele aktığını gösteriyor — sahiplik geri alınmalı.)
- Her lead'de otomatik: `utm_*`, `gclid`, ilk/son dokunuş, giriş sayfası, hangi cihaz, hangi araç.
- GA4 + Ads dönüşüm olayları ayrı: form gönderimi, WhatsApp tıklaması, tel tıklaması, PDF indirme, servis talebi, ROI hesaplama tamamlama.
- **Consent Mode v2**: onay gelmeden hiçbir ölçüm/reklam script'i yüklenmez.

---

## 9. FARKLILAŞMA — Rakiplerde olmayan 8 somut şey

1. **Şeffaf Yatırım Bandı + "banda ne dahil".** Medsatek TL bandı yayınlayarak şeffaflık konumunu kapıyor (Falcon 4 Pro 700.000–950.000 TL). Estezone bandı verip üstüne **neyin dahil olduğunu** ekler: kurulum, X saat eğitim, ilk yıl bakım, atış/lamba garantisi, kalan ömür. Mevzuat bunu yasaklamıyor (yasak olan internetten satış); kesin fiyat kapalı katmanda.
2. **Sayısal servis SLA'sı + canlı servis sayacı.** "En kısa sürede" yerine: telefonla ilk yanıt X saat, Ankara/İstanbul içinde yerinde müdahale Y saat, diğer iller Z gün, stokta tutulan kritik parça listesi, ortalama onarım süresi, ikame cihaz politikası, "geçen ay N arıza / ortalama M saat" sayacı. Üç kademeli bakım paketi (Temel/Gold/Platinum).
3. **Marka bağımsız teknik servisin ayrı bir ürün gibi satılması.** Komponent seviyesinde onarım (pompa hücresi, flash lamba, optik lens, fiber optik kablo, güç kaynağı, PFN, diyot, soğutucu) rakiplerin çoğunda yok. Epicare tek yetkili teknik servis + Arion tek yetkili distribütörlük ana sayfada rozet olur.
4. **İnteraktif yatırım geri dönüş hesaplayıcısı.** Türkiye'de bir tanesi bile yok.
5. **Mevzuat uyum kapısı.** Her cihazda "Kimler kullanabilir?" rozeti (Güzellik Salonu / Güzellik Merkezi / Poliklinik-Tıp Merkezi / Hastane) ve işletme türüne göre katalog filtresi. Salon yalnızca 600–1200 nm IPL ve ≤20 J/cm² epilasyon-endikasyonlu seri atışlı diyot alabilir — Aleksandrit/Nd:YAG/CO2 sayfalarında salon seçeneği gri, gerekçesi tooltip'te. **Hiçbir rakip alıcıyı mevzuata göre eşleştirmiyor**; bu aynı anda uyum kalkanı ve lead niteliği filtresidir.
6. **Üç edinim modelinin eşit vitrini.** Satın Al / Kirala / **Sertifikalı 2. El** — 2. el kartlarında model yılı, **atış sayacı**, yapılan bakım kaydı, kalan garanti, fotoğraf galerisi. Kiralamada: minimum süre, sarf/başlık dahil mi, servis dahil mi, satın almaya dönüştürme (buyout).
7. **Doğrulanabilir belge künyesi.** Cihaz başına CE numarası + Onaylanmış Kuruluş no + sınıf + ÜTS ürün/barkod no + varsa FDA **510(k) K-numarası** ve doğrulama linki + indirilebilir uygunluk beyanı/broşür/kılavuz. "FDA onaylı" sloganı yerine numara.
8. **Kapalı profesyonel katman.** Kayıt + meslek/teknik eleman beyanı arkasında: Fitzpatrick tipine göre parametre önerisi tabloları, protokol kütüphanesi, klinik yayın özetleri (PubMed künyeli), öncesi-sonrası arşivi, eğitim videoları, kişiye özel fiyat. Hem md.18/2–19/4 uyum kalkanı hem sitenin en yüksek dönüşümlü lead kapısı.

*(Ek: 7/24 AI ön-nitelendirme asistanı — katalogda arama yapan, teklif oluşturan, satış/servis departmanı ayıran, teşhis koymayan. EsteTouch, Griarts, Dr. Ramazan Ersoy ve Avrupa Tıp Merkezi'nde canlı çalışan hat; Estezone'da olmaması aynı kulvarda sayılmamak demek.)*

---

## 10. SEO GÖÇ PLANI

### 10.1 Yayın öncesi zorunlu adım
**Search Console'dan son 16 aylık sorgu + sayfa verisi dışa aktarılacak.** Bu denetimlerin tamamı site içi verilerle yapıldı; hangi URL'nin gerçekte tıklama aldığı ölçülmedi. 301 haritasının "hangi yazı hedef, hangisi kaynak" kararı bu veriyle son kez kontrol edilmeli — **tıklama alan URL kaynak değil hedef olmalı.** Ayrıca backlink profili çıkarılıp dış link almış yazılar hedef olarak önceliklendirilecek.

### 10.2 Birleştirme özeti (122 URL → ~55 güçlü URL)
| Blok | Eski URL | Hedef | Not |
|---|---|---|---|
| A. Lazer epilasyon genel | 23 | `/cihazlar/lazer-epilasyon/` (hub), `/rehber/…-secim-rehberi/`, `/rehber/…-maliyet-analizi/`, `/iletisim/` | 5 yazının içeriği taşınacak |
| B. Alexandrite | 10 | `/cihazlar/lazer-epilasyon/alexandrite/`, `/rehber/alexandrite-cihaz-markalari/`, `/rehber/ikinci-el-ve-kiralama/` | |
| C. Diyot / buz lazer | 12 | `/cihazlar/lazer-epilasyon/diyot-lazer/` (+`#buz-lazer`), maliyet, kiralama, `/destek/teknik-servis/` | |
| D. Nd:YAG / IPL | 4 | `/cihazlar/lazer-epilasyon/nd-yag/`, `/ipl/` | |
| E. İkinci el & kiralama | 3 | `/edinim/` altı | |
| F. Satış sonrası | 6 yazı + 2 sayfa | `/destek/teknik-servis/`, `/destek/yedek-parca-ve-sarf/`, `/cihazlar/yardimci-ekipman/…` | |
| G. Vücut şekillendirme | 12 | `/cihazlar/vucut-sekillendirme/`, `/rehber/vucut-sekillendirme-maliyet-analizi/`, ürünler | |
| H. Cilt bakım / analiz | 9 | `/cihazlar/cilt-yenileme/`, `/cilt-analiz/`, ürünler | |
| **I. Marka yazısı ↔ ürün birleşmesi** | 7 çift | `/cihazlar/<slug>/` | **En yüksek ticari getiri — ilk sırada yapılacak** |
| J. Sayfa temizliği | ~10 | `/cihazlar/` birleşimi, `/lp/` taşıması, ürün aile birleşmeleri | `/cihazlarimiz/` + `/medikal-cihazlar/` %84 kopya → tek sayfa |

**I bloğu (öncelik 1):**
| Blog yazısı (kel.) | Ürün sayfası (kel.) | Yeni tek URL |
|---|---|---|
| noblex-lazer-epilasyon-cihazi (2223) | /noblex/ (184) | `/cihazlar/noblex/` |
| arion-alexandrite-lazer-epilasyon-cihazi (2018) | /arion-alexandrite-lazer/ (336) | `/cihazlar/arion-alexandrite/` |
| light-age-epicare-lpx-… (1712) | /light-age-epicare-lpx/ (964) | `/cihazlar/light-age-epicare/` (seri, LPX varyant) |
| nobleen-… (1471) | /nobleen/ (205) | `/cihazlar/nobleen/` |
| elazer-plus-… (1441) | /elazer-plus/ (145) | `/cihazlar/elazer-plus/` |
| aileen-… (1331) | /aileen/ (175) | `/cihazlar/aileen/` |
| elazer-… (627) | /elazer/ (167) | `/cihazlar/elazer/` |

### 10.3 Göç kuralları (pazarlık edilemez)
1. **İçerik önce, 301 sonra.** Hedef sayfa dolu olmadan 301 atılmaz (boş sayfaya 301 = soft 404).
2. **Zincir yok.** Eski → nihai hedef, doğrudan. Mevcut 4 çapraz canonical kaldırılıp 301'e çevrilir (biri şu an 301'lenen bir URL'yi gösteriyor).
3. **Canonical yalnızca kendine.** Konsolidasyon canonical'la değil 301'le yapılır; yayın öncesi otomatik denetim: her canonical hedefi 200 dönmeli.
4. **Kanonik alan değişmez:** `https://estezone.com.tr` (apex).
5. **301 haritası koddan üretilir.** Her ürün/rehber JSON'unda `eskiUrl[]` alanı → `.htaccess` bloğu otomatik. Yayın öncesi kapsama **%100** olmadan canlıya alınmaz.
6. **Ads sayfaları** `/lp/` altına, tamamı `noindex,follow`, canonical asıl ürün sayfasına, sitemap dışı. `/arion-alexandrite-lazer-ads/` sayfasındaki `http://` canonical düzeltilir.
7. **Yeni yapı:** Article + Product + Offer + Brand + Organization + LocalBusiness (iki şube ayrı) + BreadcrumbList + FAQPage; her sayfada elle yazılmış meta description (CMS'te boşsa yayınlanamaz), title ≤60 karakter; `/en/` altında elle yazılmış çekirdek 12–15 sayfa + karşılıklı hreflang + x-default. **GTranslate kaldırılır** (5 dilin bugünkü SEO değeri sıfır ve tıbbi endikasyon metinlerini denetimsiz çeviriyor).
8. **Yayın günü:** yeni sitemap gönderimi, `/kategori/blog/` → `/rehber/` yönlendirmesi, robots.txt güncellemesi, GTM/GA4 taşınması, **ÜTS firma kaydındaki site URL'sinin güncellenmesi**.
9. **Yayın sonrası 90 gün:** haftalık 404 taraması, kapsam raporu, "kaldırılan URL indeksten çıktı mı / hedef yerine geçti mi" kontrolü. Trafikte geçici %10–25 dalgalanma normal; konsolidasyon kazancı 6–10 haftada görünür.

---

## 11. MEVZUAT KISITLARI

Estezone bir sağlık kuruluşu değil, **tıbbi cihaz satış merkezidir**. Onu bağlayan asıl metin 12.11.2025/33075 sayılı Tanıtım Yönetmeliği değil, **15/5/2014 tarihli Tıbbi Cihaz Satış, Reklam ve Tanıtım Yönetmeliği**'dir (26.5.2023 ve 1.1.2025 yürürlüklü değişikliklerle). Bu ayrım lehimizedir: md.15/1, satış merkezlerinin **resmî internet sitelerinde yaptığı cihaz bilgilendirmelerini** halka reklam yasağının dışında tutar.

### 11.1 Yapısal zorunluluklar
| # | Kural | Dayanak |
|---|---|---|
| 1 | **Sepet / online ödeme / "Satın Al" butonu YOK.** Ek-3 dışı cihazların internetten satışı yasak. Tek yol: teklif talebi | md.26/4 |
| 2 | ÜTS'ye kayıtlı olmayan yerlere Ek-3 dışı cihaz satışı yasak → formda **işletme türü + ÜTS kaydı + vergi no** zorunlu | md.26/7 |
| 3 | Cihaz–işletme türü eşleştirmesi (salon yalnızca 600–1200 nm IPL ve ≤20 J/cm² epilasyon diyot) | Bakanlık yazısı |
| 4 | **İki katmanlı içerik:** Katman 1 açık (ad, üretici, kullanım amacı, CE/ÜTS künyesi, kimler kullanabilir, garanti/servis, teklif formu) · Katman 2 kayıt + meslek beyanı arkasında, `noindex` (teknik parametre, protokol, klinik yayın, öncesi-sonrası, kesin fiyat) | md.15/1 istisnası ↔ md.18/2, md.19/4 |
| 5 | Tanıtımda zorunlu unsurlar: hangi cihaza ait olduğu, uygunluk beyanı/EC sertifikasıyla uyum, etiket ve kullanma kılavuzundaki kullanım amacıyla uyum, alıntılanan raporun tarihi/hazırlayanı/uzmanlığı | md.19/1 |
| 6 | Garanti bloğu (1.1.2025'ten beri zorunlu): **asgari 24 ay**, yetkili teknik servis unvan/iletişim, yıllık azami tamir süresi, yedek parça **20 iş günü yurt içi / 30 iş günü yurt dışı**, ilk kullanım öncesi **bedelsiz temel teknik eğitim** | md.25/2, 25/A–25/Ç, 26/9 |
| 7 | Alt bilgide daimi künye: tam ticaret unvanı, MERSİS no, ticaret sicil no, vergi dairesi/no, açık adres, telefon, e-posta, KEP | 6563 md.3 |
| 8 | Sağlık içeriğinde **"Son güncelleme + hazırlayan/denetleyen"** künyesi | 33075 ruhunda + E-E-A-T |
| 9 | Çerez: rıza gelmeden ölçüm/reklam script'i yüklenmez; "Kabul Et" / "Reddet" / "Tercihleri Yönet" **eşit belirginlikte**; ön işaretli kutu ve çerez duvarı yok; **rıza kaydı loglanır** | KVKK Çerez Rehberi 2022 |
| 10 | Üç ayrı metin: Aydınlatma / Açık Rıza / Ticari Elektronik İleti (İYS akışıyla). Aydınlatmada veri kategorileri + saklama süresi tablosu + geçerli başvuru kanalları (yazılı, KEP, e-imza, mobil imza, kayıtlı e-posta — **çağrı merkezi geçerli değil**) | KVKK + Başvuru Tebliği |
| 11 | Yurt dışı aktarım: standart sözleşme + KVKK bildirimi, ya da TR/AB barındırmalı analitik | KVKK md.9 (1.6.2024 rejimi) |
| 12 | Yayın öncesi **ÜTS firma kaydındaki site URL'si ve sosyal medya hesapları güncellenir** | TCS-KLVZ-08 |
| 13 | Müşteri kliniklerden **backlink / marka etiketlemesi talep edilmez** — klinik firma/marka tanıtımı yapamaz ve "paylaşanlar aynı derecede sorumludur" | 33075 md.5/1-h, md.5/2 |

### 11.2 Yasak sözlük → güvenli karşılık
| Kullanma | Bunu kullan |
|---|---|
| "FDA Onaylı" (firma/marka çapında) | "FDA 510(k) izinli — K######" (yalnızca o cihaz için, numarayla) |
| "FDA approved" (EN çeviri) | "FDA 510(k)-cleared" |
| "Kalıcı epilasyon" | "Kalıcı tüy azaltma — imalatçı kullanım amacına göre" |
| "Güvenli tedaviler vadeder", "yan etkisiz", "risksiz" | "Kontrendikasyonlar ve cilt tipi aralığı için kullanma kılavuzuna bakınız" |
| "%100 / kesin / garantili sonuç" | ölçülebilir teknik veri (dalga boyu, enerji, spot, atım) |
| "Türkiye'nin en iyisi / lideri / tek" | belgelenebilir tarihçe ve rakam |
| "Tedavi eder / iyileştirir" (açık katmanda) | "şu endikasyonlarda kullanılmak üzere CE belgelendirilmiştir" |
| "Kampanya / indirim / son 3 gün / hediye / çekiliş" | "Teklif talep edin" |
| "Sepete ekle / Hemen satın al" | "Teklif İste" |
| Müşteri kliniğin adı+logosu ile referans | Anonim künye: "Ankara, medikal estetik merkezi, 2 cihaz, 2024" (isimli vaka yalnızca kapalı katmanda + yazılı izinle) |
| Hasta yorumu / hasta öncesi-sonrası (açık katmanda) | İşletme sahibinin **ticari** değerlendirmesi (ROI, servis hızı, eğitim kalitesi) |
| Cihazla ilgisi olmayan "ilgi çekici" görseller | Cihaz, başlık, arayüz, klinik kurulum fotoğrafı |
| Bakanlık/TİTCK adı veya logosu | Belge numarası + "ÜTS'de sorgulayın" bağlantısı |

### 11.3 Teyit gerektiren noktalar (hukukçuya sorulacak)
Ek-3 listesinin tam içeriği (resmî ek PDF'inden) · Estezone'un güncel satış merkezi yetki belgesi ve ÜTS firma kayıt durumu · cihazların gerçek FDA 510(k) K-numaraları ve CE Onaylanmış Kuruluş numaraları (imalatçılardan) · "cihaz bilgilendirmesi" ile "tanıtım" arasındaki çizgi (iki katmanlı yapı en güvenli okuma) · ETBİS kayıt gerekliliği · Türkiye'de özel sektör için WCAG zorunluluğu (tespit edilemedi; AB'ye satış varsa **EAA / EN 301 549 / WCAG 2.1 AA** 28.6.2025'ten beri bağlıyor).

---

## 12. UYGULAMA YOL HARİTASI

**Proje kuralları (yerleşik çalışma düzeni):** iş `Desktop\Claude-Projeler\28-Estezone` altında yapılır, `E:\Claude-Projeler-Yedek` aynası + tarih damgalı ZIP; **boş bir port** kullanılır (8010/8040/8081/7910/7980/7990 dolu — **8050** önerilir); ayrı git deposu; müşteri önizlemesi **GitHub Pages** (localhost'a bakılamıyor); teslim yolu **statik HTML + JSON + sıfır bağımlılıklı `build.js` → onay → WordPress temasına giydirme**; metin HTML'e gömülmez, `icerik/*.json` alanları ACF'e birebir karşılık gelir.

### FAZ 0 — Hazırlık ve ölçüm temeli (3–5 gün, yayından önce zorunlu)
- Search Console 16 aylık sorgu+sayfa verisi dışa aktarımı; backlink profili
- `notlar/crawl.js`: 122 URL + 29 cihaz sayfası ham metne indirilir, yanıt kodları arşivlenir
- `notlar/link-haritasi.md` + her JSON kaydına `eskiUrl[]`
- Üreticilerden belge toplama: CE no + Onaylanmış Kuruluş no + sınıf + ÜTS no + FDA 510(k)
- Firma verisi: garanti süresi, servis SLA rakamları, kurulum/eğitim kapsamı, il bazlı kurulum sayısı, referans izinleri, yatırım bandı aralıkları
- Marka/logo ölçümü → 9 basamaklı palet dosyası; font lisans/self-host hazırlığı
- 3 örnek AI görsel karesi → onay

### FAZ 1 — ACİL İLK SÜRÜM (yayına giden minimum, ~3–4 hafta)
**Kapsam (bunlar olmadan yeni site eskisinden daha iyi dönüşmez):**
1. Statik hat: `design.css` (tek dosya, token seti), `theme.js` (<10 KB), `build.js`, `denetle.js`, `normalize.js`
2. **21 ürün sayfası** yeni şablonla (I bloğu 7 marka birleşmesi dahil, içerik blog yazılarından taşınmış)
3. `/cihazlar/` katalog hub'ı + 5 kategori hub'ı + **filtre + karşılaştırma**
4. Ana sayfa (11 bölüm) — gerçek HTML hero, güven şeridi, işletme türü kartları, kanıt bloğu
5. `/destek/teknik-servis/` + **Arıza Bildir formu** + SLA rakamları · `/destek/yedek-parca-ve-sarf/`
6. `/edinim/` üç model + kiralama ve 2. el talep formları
7. `/kurumsal/` derinleştirilmiş blok (hakkımızda, markalar/distribütörlükler, belgeler-ÜTS, referanslar, iki showroom)
8. **Dönüşüm çekirdeği:** teklif formu (3 adım) her ürün sayfasında sticky, mobil alt çubuk, `https://wa.me/905398410585?text=` derin linkler, tek biçim `tel:+903124666686`
9. **Uyum çekirdeği:** yasak sözlük temizliği, cihaz belge künyeleri, üç hukuki metin, rıza-öncelikli çerez kapısı (Kabul/Reddet/Yönet + rıza logu), Consent Mode v2, künye bloğu
10. **301 haritası %100 kapsamalı** + Product/Organization/LocalBusiness/Breadcrumb/FAQ schema + elle yazılmış meta açıklamalar
11. Güvenlik: HSTS, CSP, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy; `X-Powered-By` kapatılır; PHP 8.2/8.3'e geçilir; xmlrpc kapatılır; `readme.html` silinir; Slider Revolution/WPBakery/Impreza **tamamen** kaldırılır
12. Görsel seti: 21 cihaz × min. 6 kare, AVIF/WebP, alt metinler, K7'deki veri hatalarının düzeltilmesi

**Faz 1 çıkış kriterleri:** `denetle.js` 0 ihlal · 301 kapsama %100 · her canonical 200 · CSS ≤45 KB, JS ≤30 KB gzip · Lighthouse mobil LCP <1,8 s, CLS <0,05 · axe 0 kritik · her ürün sayfasında form + belge künyesi + garanti bloğu · yasak sözlük taraması temiz.

### FAZ 2 — Satış döngüsünü kısaltan katman (yayından sonraki 30 gün)
- **Yatırım Geri Dönüş Hesaplayıcısı** (PDF çıktısı + lead)
- **Cihaz Seçim Testi** (5 soru, mevzuat kapısı dahil)
- 8 rehber sayfası (61 yazının damıtılması) + `/uygulamalar/` endikasyon ekseni (9 sayfa)
- Gated PDF seti: cihaz başına teknik föy + "2026 Cihaz Kataloğu" + "Salon/Klinik Açılış ve Yatırım Rehberi"
- `/edinim/odeme-ve-finansman/` + taksit simülasyonu
- Video katmanı: cihaz başına 60–90 sn, 1 servis atölyesi videosu, 2–3 işletme röportajı
- Sarf & yedek parça kataloğu (model bazlı uyumluluk tablosu, tekrar sipariş talebi)
- 82 yazının hunileştirilmesi: her yazının altına bağlama uygun dönüşüm bloğu + "ilgili cihazlar" modülü

### FAZ 3 — Fark yaratan / gelir çeşitlendiren (2–4 ay)
- **Kapalı profesyonel katman** (`/profesyonel/`): parametre-protokol kütüphanesi, Fitzpatrick tabloları, klinik kaynaklar (PubMed künyeli), öncesi-sonrası arşivi, kişiye özel fiyat
- **7/24 AI asistanı**: katalogda arama, teklif oluşturma, satış/servis departman ayrımı, maliyet tavanı, teşhis koymama kuralı
- **Bayi/Müşteri Portalı**: cihazlarım, garanti durumu, servis geçmişi, atış sayacı, sarf tekrar siparişi, belge arşivi (PWA)
- **Sertifikalı 2. El envanteri** (atış sayacı + bakım kaydı + kalan garanti) + takas değerlendirme akışı
- **Estezone Akademi**: takvimli, kayıt formlu, sertifikalı eğitim programı (Ortadoğu'nun video-galeri hatasına düşmeden)
- `/en/` elle yazılmış 12–15 çekirdek sayfa + hreflang (gerekirse `/ar/`, RTL)

### FAZ 4 — Süreklilik
- Editoryal takvim: ürün sayfaları yılda 1 teknik doğrulama, rehberler 6 ayda bir; her sayfada görünür "Son güncelleme"
- Aylık: 404 taraması, canonical denetimi, kırık link, `denetle.js` CI kontrolü, servis SLA sayacının güncellenmesi
- Çeyreklik: rakip fiyat bandı taraması (Medsatek, Asel, Newmed), yeni cihaz girişlerinde hub + karşılaştırma otomatik güncelleme

---

### Ek: doğrulanmayanlar
Gerçek tarayıcı render'ı (görsel hizalama, gerçek LCP/CLS) ölçülmedi — talimat gereği tarayıcı bölmesi araçları kullanılmadı; tüm bulgular ham HTML/CSS/JS ve HTTP başlıklarından. Slider'ın otomatik oynatma ayarı JS içinde kaldı. 82 yazının tamamı tek tek okunmadı (istatistiksel analiz + örneklem). Estezone'un ÜTS kaydı, yetkinlik belgeleri, ihracat durumu ve gerçek satış rakamları dışarıdan doğrulanamadı — firmadan alınmalı.


═══════════ DENETÇİ KRİTİĞİ ═══════════

## ACIMASIZ DENETİM — 12 BULGU

**1. Rapor tek bir gerçek iş verisi içermiyor: aylık trafik, lead sayısı, Ads harcaması, kapanan satış ve ortalama sepet hiç ölçülmemiş; GA4/Ads verisi istenmemiş, sadece Search Console istenmiş.**
Neden önemli: "Ads bütçesi akıyor", "%100 kayıp", "6–10 haftada kazanç" iddialarının hiçbiri doğrulanamaz ve yayın sonrası başarı/başarısızlık ölçülemez — yani projenin ROI'si de geri dönüş kriteri de yok.

**2. Mevcut trafiğin B2B (cihaz alan klinik) mi yoksa B2C (epilasyon yaptırmak isteyen tüketici) mi olduğu hiç incelenmemiş.**
Neden önemli: K2'nin ("para sayfası bloguna kaybediyor") tamamı buna dayanıyor; 61 yazı tüketici sorgusuyla sıralanıyorsa blog para sayfasını yemiyor demektir ve konsolidasyon planı yanlış teşhis üzerine kurulmuş olur.

**3. Estezone'un kendi markalı cihazlarının (Elazer, Elazer Plus, EsteSlim, EsteSculpt, GoldZone, HydraBeauty, Epizone) hukuki statüsü — imalatçı mı, ithalatçı mı, OEM yeniden markalama mı — hiç sorgulanmamış.**
Neden önemli: Kendi markasını basan taraf mevzuatta imalatçı/ithalatçı sorumluluğunu üstlenir; 21 cihazın 6'sının CE/ÜTS künyesi, 24 ay garanti yükümlülüğü ve raporun 7 numaralı farklılaşma maddesi ("doğrulanabilir belge künyesi") tamamen bu cevaba bağlı.

**4. Farklılaşmanın 5. maddesini taşıyan "salon yalnızca 600–1200 nm IPL ve ≤20 J/cm² diyot alabilir" kuralı, numarası/tarihi verilmeyen bir "Bakanlık yazısı"na dayandırılmış.**
Neden önemli: Bu kural yanlış veya güncelliğini yitirmişse site, rakiplerin sattığı bir gelir segmentini (güzellik salonları) kendi eliyle gri gösterip kapatır; doğruysa da dayanağın belgesi olmadan hiçbir cihaz sayfasında yayınlanamaz.

**5. Envanter çelişkisi: 6.2'deki site ağacında ve 10.2-H bloğunda `/cihazlar/cilt-analiz/` hub'ı var ama 5.2'deki 21 ürün kaydının hiçbiri cilt analiz cihazı değil.**
Neden önemli: Ya envanterden bir cihaz düşmüş ya da raporun kendi kuralını ("boş sayfaya 301 = soft 404") ihlal eden ürünsüz bir kategori yayınlanacak; 9 URL'lik H bloğunun hedefi belirsiz kalıyor.

**6. "Türkiye'de hiçbir rakipte interaktif ROI hesaplayıcı yok" ve "hiçbir rakip alıcıyı mevzuata göre eşleştirmiyor" iddiaları, yöntemi belirtilmemiş 4–5 firmalık bir örnekleme dayanıyor (Faz 3'te adı geçen "Ortadoğu" rakip listesinde bile yok).**
Neden önemli: Farklılaşma bölümünün 8 maddesinden 3'ü bu "ilk ve tek" iddiasına yaslanıyor; örneklem eksikse hem yatırım gerekçesi hem de sitede kullanılacak pazarlama dili çürük olur.

**7. Yatırım bandı yayınlama ve "tek yetkili distribütör/servis" rozetleri, ne üretici sözleşmelerine (fiyat gizliliği/MAP) ne de belge ibrazı şartına bağlanmış; üstelik "tek" ifadesi raporun kendi yasak sözlüğünde yasaklı.**
Neden önemli: Almalaser/Light Age sözleşmesi fiyat yayınını yasaklıyorsa distribütörlük riske girer, belgesiz "tek yetkili" iddiası ise Reklam Kurulu'nun en kolay ceza kestiği kalıptır — yani en güçlü iki koz aynı anda hukuki açık.

**8. 122 URL'yi ~55'e indiren göçün risk yönetimi yok: kademeli göç yok, "şu eşiğin üstünde trafik alan yazıya dokunulmaz" kuralı yok, geri dönüş (rollback) planı yok, staging ortamı tanımlanmamış.**
Neden önemli: 61 yazıyı 8 rehbere damıtmak SEO'da en riskli işlemdir; "%10–25 dalgalanma normal" cümlesi kaynaksız bir teselli ve kötü giderse geri dönülecek bir plan tarif edilmemiş.

**9. Faz 1 kapsamı (21 ürün sayfası + 21×6 = ~126 yeni ürün fotoğrafı + 5 form + %100 301 haritası + güvenlik/PHP göçü + WordPress'e giydirme) 3–4 haftaya sığmaz; bütçe, ekip ve cihazlara fiziksel erişim hiç konuşulmamış.**
Neden önemli: Satılmış cihazın fotoğrafı çekilemez; görsel üretimi tıkanırsa tüm Faz 1 tıkanır ve AI ile üretilecek "klinik ortamı" kareleri raporun kendi "cihazla ilgisi olmayan görsel kullanma" kuralıyla md.19/1 sınırında dolaşır.

**10. Teslim mimarisi kararsız: "statik HTML + JSON + build.js → WordPress temasına giydirme" deniyor ama ROI hesaplayıcı, 5 form, üyelikli kapalı katman, portal, AI asistan ve CRM entegrasyonu sunucu tarafı gerektiriyor; JSON ↔ ACF çift kaynağının senkronu tanımsız.**
Neden önemli: İçerik iki yerde tutulursa ilk müşteri düzenlemesinde JSON ile canlı site ayrışır ve raporun tüm otomasyon vaadi (schema, 301, filtre, meta) sessizce bozulur.

**11. Sayısal servis SLA'sı, "geçen ay N arıza" canlı sayacı, atış sayaçlı 2. el envanteri ve editoryal takvim kalıcı insan emeği ve operasyonel veri açmayı gerektiriyor; firmanın bu kapasiteye ve isteğe sahip olup olmadığı sorulmamış.**
Neden önemli: Yayınlanan SLA aynı zamanda hukuki taahhüttür — tutulamayan "4 saatte yerinde müdahale" vaadi, hiç vaat vermemekten daha pahalıya patlar ve güncellenmeyen sayaç sitenin en görünür yerinde çürür.

**12. Çok dillilik kararı (GTranslate kaldırılıyor, `/en/` Faz 3'e atılıyor) firmanın ihracat/yurt dışı talebi ölçülmeden verilmiş — raporun kendisi "ihracat durumu doğrulanamadı" diyor.**
Neden önemli: Ortadoğu/Balkan talebi gerçekse 5 dil kaldırılıp yerine 6+ ay hiçbir şey konmadığında mevcut yabancı lead akışı sıfırlanır; talep yoksa da Faz 3'te boşuna 15 sayfa yazılır.

---

## KULLANICIYA SORULACAKLAR

**A. Erişim ve sahiplik (ilk gün gerekli)**
1. Alan adı, hosting/cPanel, WordPress admin, GTM (GTM-5J7N99FZ), GA4, Google Ads ve Search Console hesapları kimin adına ve erişim bizde olacak mı?
2. Formdaki `firma_id=6` / `donusum_tip_id=8` alanları hangi ajans/panele veri akıtıyor; o ajansla ilişki devam edecek mi, geçmiş lead verisi devredilecek mi?
3. Son 12–16 ayın GA4 + Ads + Search Console dışa aktarımlarını alabilir miyiz (yoksa ölçüm temeli kurulamaz)?

**B. Ticari gerçekler**
4. Aylık kaç talep geliyor, kaçı satışa dönüyor, ortalama cihaz bedeli ve aylık Ads bütçesi ne?
5. Satışların yüzde kaçı web'den, kaçı fuar/referans/telefon üzerinden geliyor?
6. Yatırım bandı (TL aralığı) yayınlanacak mı — üretici/distribütörlük sözleşmeleri fiyat yayınına izin veriyor mu?
7. Güzellik salonu segmenti hedeflenecek mi, yoksa yalnız klinik/hastane mi (mevzuat kapısı buna göre kurulacak)?
8. Kiralama ve sertifikalı 2. el gerçekten satılacak mı; envanter, atış sayacı ve bakım kaydı verisi elde var mı?

**C. Belge ve ürün**
9. 21 ürün kaydının nihai listesi onaylanıyor mu; kataloğa girmeyen, çıkacak ya da yakında eklenecek cihaz var mı (cilt analiz cihazı var mı, yok mu)?
10. Kendi markalı cihazlarda Estezone imalatçı mı ithalatçı mı; ÜTS/CE kayıtları kimin adına?
11. Aileen ve Elazer Plus'ın gerçek üreticisi kim?
12. CE no + Onaylanmış Kuruluş no + ÜTS no + FDA 510(k) numaralarını üreticilerden kim, hangi tarihe kadar toplayacak?
13. Arion tek yetkili distribütörlük ve Epicare tek yetkili teknik servis belgeleri güncel ve elde mi (tarihli kopya)?
14. Satış merkezi yetki belgesi ve ÜTS firma kaydı güncel mi?

**D. Servis, garanti, operasyon**
15. Taahhüt edilebilir gerçek SLA rakamları neler (telefon ilk yanıt, Ankara/İstanbul yerinde müdahale, diğer iller, ortalama onarım, ikame cihaz)?
16. Garanti süresi, kurulum kapsamı, eğitim saati, ilk yıl bakım ve yedek parça taahhüdü cihaz bazında nedir?
17. Mesai dışı "sizi geri arayalım" ve "arıza bildir" taleplerini kim, hangi sürede karşılayacak?
18. CRM var mı, hangisi; lead nereye düşsün (e-posta/WhatsApp/CRM)?
19. WhatsApp tek numara mı; çoklu temsilci için WhatsApp Business API'ye geçilecek mi?
20. Kapalı profesyonel katman başvurularını kim onaylayacak (günlük iş yükü kabul ediliyor mu)?

**E. İçerik ve görsel**
21. 21 cihazın kaçına fiziksel erişim var (showroom/stok) — profesyonel çekim yapılabilir mi, yoksa üretici görsel bankaları alınabilir mi?
22. Referans/vaka için yazılı izin verecek müşteri var mı; anonim künye ("Ankara, medikal estetik merkezi, 2024") kabul mü?
23. 20 yılın somut rakamları neler (kaç kurulum, kaç il, kaç markaya servis, kaç ekip)?
24. Logo kaynak dosyası (vektör) var mı; marka adı/logo yenilenecek mi, mevcut lacivert korunacak mı?

**F. Teknik ve proje**
25. Teslim CMS'i WordPress+ACF mi olacak, statik mi kalacak; hosting aynı sağlayıcıda mı kalacak; PHP 8.2/8.3'e geçiş mümkün mü?
26. Staging (test) ortamı açılabilir mi ve yayın günü için geri dönüş penceresi kabul ediliyor mu?
27. İhracat/yurt dışı talep var mı; hangi diller gerçekten gerekli (EN, AR)?
28. Bütçe, hedef yayın tarihi ve tek karar verici kim (içerik/belge onayları kimden geçecek)?