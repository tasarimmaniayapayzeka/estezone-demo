# Estezone Yetkili Ağ Programı — bayi zinciri büyütme prototipleri

28-Estezone projesinin **alt programı**. Ana site build'ine (`site/`, `sablon/`, `veri/`)
dokunmaz; kendi klasörü, kendi build'i, kendi portu (**8055**), kendi reposu vardır.

**CANLI:** https://tasarimmaniayapayzeka.github.io/estezone-bayi-demo/

## Ne bu

Estezone Medikal'in bayi/iş ortağı zincirini büyütmesi için hazırlanmış **14 sayfalık
prototip seti**: rakip kıyası (Türkiye + yurt dışı), 8 çalışan prototip, SEO planı,
dijital pazarlama planı, 10 alternatif iş modeli, yol haritası ve risk kaydı.

Statü: **teklif/sunum demosu.** Estezone henüz müşteri değil.

## Çalıştırma

```bash
node bayi/build.js      # cikti/ üretir
node bayi/sunucu.js     # http://localhost:8055
node bayi/denetle.js    # link + zorunlu unsur + mevzuat denetimi
```

## Klasör

```
veri.js          program verisi (katmanlar, rakipler, benchmark, bölgeler, KPI, riskler)
sablon.js        sayfa kabuğu + ortak bileşenler (demo bandı + noindex burada)
sayfalar-a.js    program, rakip, P1–P5
sayfalar-b.js    P6–P8, SEO, dijital plan, alternatifler, yol haritası
stil.css         tasarım sistemi (Estezone v2 "Açık Kurumsal" paletinden)
app.js           istemci betiği — skorlama, bölge, simülatör, sohbet, ko-op süzgeci
build.js         → cikti/
denetle.js       yayın öncesi denetim
cikti/           ÜRETİLEN ÇIKTI — elle düzenlenmez
```

## 8 prototip

| Kod | Ad | Sayfa | Durum |
|---|---|---|---|
| P1 | Başvuru hunisi + otomatik skorlama | `basvuru.html` | çalışıyor |
| P2 | Bölge haritası & kıtlık motoru | `bolge.html` | çalışıyor |
| P3 | Bayi portalı (PWA) | `portal.html` | çalışıyor (7 sekme) |
| P4 | Yetkili uygulama merkezi bul | `merkez-bul.html` | çalışıyor |
| P5 | Bayi kazanç simülatörü | `kazanc.html` | çalışıyor (2 model) |
| P6 | Bayi & talep asistanı (AI) | `asistan.html` | çalışıyor (3 kişilik) |
| P7 | Akademi & kademe sistemi | `akademi.html` | tasarım |
| P8 | Ko-op pazarlama motoru | `pazarlama.html` | çalışıyor (mevzuat süzgeci) |

## Zorunlu kurallar (kaldırma)

- Her sayfada **demo bandı** + `noindex,nofollow` + `robots.txt Disallow: /`
- **Dış bağımlılık yok** — font, ikon, kütüphane hepsi yerel/sistem
- Formlar, portal ve asistan **demo**; hiçbir yere veri gitmez
- Marj, KPI ve kazanç rakamlarının tamamı **temsilî** — firmadan veri gelmeden gösterilmez

## Kaynaklı iddialar

Rakip ve benchmark bölümündeki her satır `veri.js` içinde `kaynak` alanı taşır.
Kaynağı olmayan hiçbir sayı yazılmadı. Doğrulanan başlıca noktalar:

- Classys: sarf malzemesi = 2025 cirosunun **%46'sı** (Classys IR 4Q25)
- InMode: "Find a Provider" + "Morpheus8 Verified Provider" (ABD/Kanada)
- Alma: `partners.almalasers.com` portalı + Alma Academy (Lizbon, 24–27 Nisan 2026)
- Candela: ayrı "Marketing Commitment" sayfası + Center of Excellence ağı
- TR rakipler (16 Ağu 2026 taraması): E-Medikal, Medsatek, MedLaser, STS Lazer —
  hiçbirinde bayi programı sayfası, portal, bölge ilanı veya merkez haritası yok

## Açık riskler

`cikti/yol-haritasi.html` içindeki 8 maddelik risk kaydı sunumdan önce okunmalı.
En kritik ikisi:

1. **Merkez haritası (P4)** — 12/11/2025 tarihli 33075 sayılı Tanıtım Yönetmeliği
   sağlık kuruluşunu bağlar; harita bir pazaryeri değil **kayıt defteri** olarak kurulur
   (yorum/fiyat/öncesi-sonrası yok). Hukukçu onayı olmadan yayına alınmaz.
2. **Belge kapısı** — bayi ağı, satış merkezi yetki belgesi / ÜTS / sertifikalı personel
   şartları doğrulanmadan kurulursa sorumluluk zincirin tepesine döner.

## Bekleyen

`cikti/yol-haritasi.html` sonundaki **10 soru** Estezone'dan alınmadan Faz 1 başlamamalı
(gerçek marj bandı, sarf fiyat listesi, SLA rakamları, üretici sözleşmelerinin izin durumu).
Ana projenin 28 soruluk listesiyle birlikte okunur: `notlar/MUSTERIYE-SORULACAKLAR.md`.
