# Estezone Medikal — modern site (teklif/sunum demosu)

**28. AYRI PROJE.** Diğer projelerle karıştırılmaz. Kendi klasörü, kendi reposu, kendi portu (**8050**).

Mevcut [estezone.com.tr](https://estezone.com.tr) sitesinin (WordPress + Impreza + WPBakery + Slider
Revolution) yerine geçmek üzere sıfırdan yazılmış **statik HTML** site. Estezone Medikal'e sunulacak
teklif demosudur — henüz canlı site değildir.

## Çalıştırma

```bash
node build.js     # veri + şablon -> site/ (46 sayfa)
node sunucu.js    # http://localhost:8050
node denetle.js   # kırık link / eksik görsel / meta denetimi
```

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

## Dikkat

- Formlar **demo**dur; gönderimde bilgilendirme notu gösterilir, hiçbir yere veri gitmez.
  Canlıya geçişte e-posta + WhatsApp bildirimi + CRM bağlanmalı.
- Görseller mevcut estezone.com.tr sitesinden alınmıştır (kendi ürün fotoğrafları).
- Teknik değerler kaynak sitedeki üretici beyanından çıkarılmıştır; yayına geçmeden
  Estezone tarafından teyit edilmelidir.
- Yasal metinler örnek taslaktır; hukuk danışmanı onayı gerekir.
- `20+ yıl`, `28 cihaz`, `2 ofis` gibi rakamlar kaynak siteden doğrulanmıştır; uydurma rakam yoktur.
