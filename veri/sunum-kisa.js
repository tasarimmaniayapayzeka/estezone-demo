/* ============================================================================
   KISA SUNUM İÇERİĞİ — 7 perde
   Uzun sürüm (site/sunum-detay/) 13 bölüm ve 127 blok. Bu sürüm onun %70
   kısaltılmışı: perde başına TEK fikir, üç rakam, bir görsel.
   Kural: buradaki her rakam uzun sürümdeki doğrulanmış ölçümden gelir.
   ========================================================================== */
module.exports = [
  {
    id: 'sorun',
    no: '01',
    etiket: 'Durum',
    baslik: 'Site ayakta.\nSatış yolu kapalı.',
    ozet:
      'estezone.com.tr 16 Ağustos 2026’da baştan sona ölçüldü. Sunucu hızlı, altyapı sağlam. Sorun, o hızın ne taşıdığı.',
    medya: { tip: 'video', ad: 'sahne-1' },
    olcumler: [
      { deger: '1', etiket: 'Tüm sitede satış formu', alt: '122 URL’nin tamamında tek form', durum: 'kayip' },
      { deger: '0/29', etiket: 'Teklif yolu olan cihaz sayfası', alt: 'Form, föy, teklif butonu — hiçbiri yok', durum: 'kayip' },
      { deger: '41 KB', etiket: 'Ziyaretçiye ulaşan içerik', alt: '1,6 MB’lık ön yüz yükünün taşıdığı', durum: 'kayip' },
    ],
    cikarim:
      'Alıcı ilgi duyduğu cihazdan teklif isteyemiyor. İlgi üretilen yer ile talebin toplandığı yer sitenin iki ayrı ucunda.',
  },
  {
    id: 'gorunmezlik',
    no: '02',
    etiket: 'Sebep',
    baslik: 'Google’da sıralanan sayfa,\nteklif alınabilen sayfa değil.',
    ozet:
      '86 blog yazısının 61’i aynı anlam kümesinde. Aynı sorgu için birbirleriyle yarışıyorlar; kazanan da satış yapamayan yazı oluyor.',
    medya: { tip: 'video', ad: 'sahne-2' },
    olcumler: [
      { deger: '61/86', etiket: 'Birbirini yiyen yazı', alt: 'Kosinüs benzerliği %70–90', durum: 'kayip' },
      { deger: '2.223 ↔ 184', etiket: 'Noblex: yazı ↔ ürün sayfası', alt: 'Kelime sayısı. Sıralanan uzun olan.', durum: 'kayip' },
      { deger: '22 ay', etiket: 'Blogun donmuş süresi', alt: 'Son güncelleme 2024-10-04', durum: 'risk' },
    ],
    cikarim:
      'Marka adıyla arayan nitelikli alıcı, teknik tablosu ve formu olmayan bir yazıya düşüyor.',
  },
  {
    id: 'web',
    no: '03',
    etiket: 'Çözüm · 1',
    baslik: 'Her cihaz\nkendi teklifini toplasın.',
    ozet:
      'Site sıfırdan kuruluyor: 28 cihazın her birinde teknik künye, işletme türü uygunluk rozeti, teklif formu ve o cihaza özel WhatsApp bağlantısı.',
    medya: { tip: 'video', ad: 'sahne-3' },
    olcumler: [
      { deger: '28', etiket: 'Teklif toplayan cihaz sayfası', alt: 'Bugün 0', durum: 'kazanc' },
      { deger: '4', etiket: 'Karar aracı', alt: 'Seçim danışmanı · ROI · karşılaştırma · teknik matris', durum: 'kazanc' },
      { deger: '37 KB', etiket: 'JavaScript', alt: 'Mevcut sitede 842 KB', durum: 'kazanc' },
    ],
    cikarim:
      'Demoda çalışır halde: 55 sayfa, 4 tasarım sürümü, AI cihaz asistanı ve bayi girişi dahil. Toplantıda canlı açabilirsiniz.',
    baglanti: { ad: 'Çalışan demoyu aç', url: '../index.html' },
  },
  {
    id: 'seo',
    no: '04',
    etiket: 'Çözüm · 2',
    baslik: 'Dağılmış gücü toplayıp\nsatan sayfaya taşıyoruz.',
    ozet:
      '122 URL yaklaşık 55 güçlü URL’de birleşiyor. Her eski adres kalıcı yönlendirmeyle korunuyor — bugünkü sıralama değeri kaybolmuyor.',
    medya: { tip: 'video', ad: 'sahne-4' },
    olcumler: [
      { deger: '122 → ~55', etiket: 'URL birleştirme', alt: 'Kanibalizasyon biter', durum: 'firsat' },
      { deger: '301', etiket: 'Her eski adres korunur', alt: 'Göç kuralı pazarlık edilemez', durum: 'firsat' },
      { deger: '2', etiket: 'Birebir kopya sayfa', alt: 'endoterapylazer = medart-smartsculpt', durum: 'risk' },
    ],
    cikarim:
      'Ürün sayfaları teknik künye, karşılaştırma ve sık sorulanlarla derinleşir; blog yazıları ilgili cihaza bağlanır.',
  },
  {
    id: 'reklam',
    no: '05',
    etiket: 'Çözüm · 3',
    baslik: 'Reklam tüketiciye değil,\nişletme sahibine gitsin.',
    ozet:
      'Tıbbi cihazın halka yönelik reklamı yasak, meslek mensubuna tanıtımı serbest. Bu bir kısıt değil: hedeflemeyi profesyonele daraltan taraf, aynı bütçeyle doğru kişiye ulaşır.',
    medya: { tip: 'video', ad: 'sahne-5' },
    olcumler: [
      { deger: 'Boş', etiket: 'ads_keyword alanı', alt: 'Ölçüm kurulu ama veri gelmiyor', durum: 'kayip' },
      { deger: 'Google', etiket: 'Arama niyeti yakalanır', alt: 'Cihaz bazlı kampanya + dönüşüm izleme', durum: 'firsat' },
      { deger: 'Meta', etiket: 'Aramayan alıcıya ulaşılır', alt: 'İşletme hedefleme + yeniden hedefleme', durum: 'firsat' },
    ],
    cikarim:
      'Önce ölçüm deliği kapanır — hangi aramanın teklif getirdiği görünür hale gelir. Sonra bütçe büyütülür.',
  },
  {
    id: 'youtube',
    no: '06',
    etiket: 'Çözüm · 4',
    baslik: 'Alıcı cihazı\nçalışırken görmek istiyor.',
    ozet:
      'Yüz binlerce liralık bir cihaz, fotoğrafla satılmıyor. YouTube aynı zamanda arama motoru: videolar Google sonuçlarında da yer alabilir.',
    medya: { tip: 'gorsel', ad: 'konu-youtube' },
    olcumler: [
      { deger: '0', etiket: 'Bugünkü video varlığı', alt: 'Kanal yok', durum: 'kayip' },
      { deger: '4', etiket: 'İçerik hattı', alt: 'Tanıtım · kurulum ve eğitim · teknik servis · uygulama', durum: 'firsat' },
      { deger: '28', etiket: 'Anlatılacak cihaz', alt: 'Her biri kendi sayfasına bağlanır', durum: 'firsat' },
    ],
    cikarim:
      'Videolar hasta görüntüsü ve sonuç vaadi olmadan, cihaz ve süreç anlatımı üzerine kurulur.',
  },
  {
    id: 'yol',
    no: '07',
    etiket: 'Plan',
    baslik: 'Altı ayda\nüç aşama.',
    ozet: 'Her aşamanın teslimi ve ölçütü belli. Aşağıdakiler hedeftir, taahhüt değildir.',
    medya: { tip: 'gorsel', ad: 'konu-yol' },
    donemler: [
      {
        ad: '1. ay',
        baslik: 'Temel',
        maddeler: ['Site yayına alınır', '301 göçü yapılır', 'GA4, Search Console, dönüşüm izleme kurulur', 'İlk kampanya açılır'],
        olcut: 'Ölçüm çalışıyor: hangi aramanın hangi teklifi getirdiği görünüyor.',
      },
      {
        ad: '3. ay',
        baslik: 'Derinleşme',
        maddeler: ['İçerik kümeleri yazılır', 'Kampanyalar optimize edilir', 'YouTube ilk seri yayınlanır', 'Yeniden hedefleme açılır'],
        olcut: 'Organik ve reklam kanalları ayrı ayrı raporlanabiliyor.',
      },
      {
        ad: '6. ay',
        baslik: 'Bileşik etki',
        maddeler: ['Organik hat oturur', 'Video kütüphanesi birikir', 'Bayi ağı devreye girer', 'Aylık raporlama ritmi kurulur'],
        olcut: 'Talep tek kanala bağlı olmaktan çıkar.',
      },
    ],
  },
];
