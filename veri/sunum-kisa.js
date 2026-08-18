/* ============================================================================
   KISA SUNUM İÇERİĞİ — 9 perde
   Uzun sürüm (site/sunum/) 13 bölüm ve 127 blok. Bu sürüm onun özeti:
   perde başına TEK fikir, üç rakam, bir görsel.
   Kural: buradaki her rakam uzun sürümdeki doğrulanmış ölçümden gelir.
   ========================================================================== */
module.exports = [
  {
    id: 'sorun',
    no: '01',
    etiket: 'Durum',
    baslik: 'Altyapı hazır.\nSatış yolu henüz kapalı.',
    ozet:
      'estezone.com.tr 16 Ağustos 2026’da baştan sona ölçüldü. Sunucu hızlı, teknik taban sağlam. Eksik olan, ilgiyi talebe çeviren katman.',
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
    baslik: 'Sıralanan sayfa,\nteklif alınabilen sayfa değil.',
    ozet:
      '86 blog yazısının 61’i aynı anlam kümesinde. Aynı sorgu için birbirleriyle yarışıyorlar; öne çıkan da satış yolu olmayan yazı oluyor.',
    medya: { tip: 'video', ad: 'sahne-2' },
    olcumler: [
      { deger: '61/86', etiket: 'Aynı kümedeki yazı', alt: 'Kosinüs benzerliği %70–90', durum: 'kayip' },
      { deger: '2.223 ↔ 184', etiket: 'Noblex: yazı ↔ ürün sayfası', alt: 'Kelime sayısı. Sıralanan uzun olan.', durum: 'kayip' },
      { deger: '22 ay', etiket: 'Blogun beklemede olduğu süre', alt: 'Son güncelleme 2024-10-04', durum: 'risk' },
    ],
    cikarim:
      'Marka adıyla arayan nitelikli alıcı, teknik tablosu ve formu olmayan bir yazıya düşüyor. İçerik değerli — yeri yanlış.',
  },
  {
    id: 'web',
    no: '03',
    etiket: 'Çözüm · 1',
    baslik: 'Her cihaz\nkendi teklifini toplasın.',
    ozet:
      'Site sıfırdan kuruluyor: 28 cihazın her birinde teknik künye, işletme türü uygunluk rozeti, teklif formu ve o cihaza özel WhatsApp bağlantısı.',
    medya: { tip: 'video', ad: 'sahne-3' },
    ikon: 'ik-web',
    olcumler: [
      { deger: '28', etiket: 'Teklif toplayan cihaz sayfası', alt: 'Bugün 0', durum: 'kazanc' },
      { deger: '4', etiket: 'Karar aracı', alt: 'Seçim danışmanı · ROI · karşılaştırma · teknik matris', durum: 'kazanc' },
      { deger: '37 KB', etiket: 'JavaScript', alt: 'Mevcut sitede 842 KB', durum: 'kazanc' },
    ],
    cikarim:
      'Demoda çalışır halde: 55 sayfa, 4 tasarım sürümü, AI cihaz asistanı ve bayi girişi dahil. Toplantıda canlı açabilirsiniz.',
    baglanti: { ad: 'Çalışan demoyu aç', url: 'https://estezone.info/' },
  },
  {
    id: 'chatbot',
    no: '04',
    etiket: 'Çözüm · 2',
    baslik: 'Mesai bitince\nsatış durmasın.',
    ozet:
      'Siteye yerleşik AI cihaz asistanı, portföyün tamamını bilir. Gece gelen alıcıyı karşılar, doğru cihaza yönlendirir, teklif formuna taşır.',
    medya: { tip: 'gorsel', ad: 'konu-chatbot' },
    ikon: 'ik-chatbot',
    olcumler: [
      { deger: '28', etiket: 'Bildiği cihaz', alt: 'Teknik künye, yetki sınıfı, servis kapsamı', durum: 'kazanc' },
      { deger: '7/24', etiket: 'Kesintisiz karşılama', alt: 'Mesai dışı gelen ilgi kaybolmaz', durum: 'kazanc' },
      { deger: '0', etiket: 'Verdiği fiyat ve teşhis', alt: 'Mevzuat sınırı koda gömülü', durum: 'firsat' },
    ],
    ozellikler: [
      'Soruyu anlar, doğru cihaz sayfasına yönlendirir — kart olarak gösterir',
      'İşletme türüne göre hangi cihazı bulundurabileceğini söyler',
      'Fiyat sorulduğunda rakam vermez, teklif formuna ve ROI hesabına taşır',
      'Tıbbi teşhis ve tedavi önerisi vermez; hekime yönlendirir',
      'Konuşmayı WhatsApp’a devreder — sorular özet olarak satış ekibine gider',
      'Sesli soru sorma, konum ve iletişim kısayolları panelde',
    ],
    cikarim:
      'Reklam tarafındaki değeri şu: reklamla gelen ziyaretçi formu doldurmadan çıkarsa kaybedilir. Asistan o ziyaretçiyle konuşur, bütçenin karşılığını artırır.',
  },
  {
    id: 'seo',
    no: '05',
    etiket: 'Çözüm · 3',
    baslik: 'Dağılmış gücü toplayıp\nsatan sayfaya taşıyoruz.',
    ozet:
      '122 URL yaklaşık 55 güçlü URL’de birleşiyor. Her eski adres kalıcı yönlendirmeyle korunuyor — bugünkü sıralama değeri kaybolmuyor.',
    medya: { tip: 'video', ad: 'sahne-4' },
    ikon: 'ik-seo',
    olcumler: [
      { deger: '122 → ~55', etiket: 'URL birleştirme', alt: 'Aynı sorguya giren sayfalar tek çatıda', durum: 'firsat' },
      { deger: '301', etiket: 'Her eski adres korunur', alt: 'Göç kuralı pazarlık edilemez', durum: 'firsat' },
      { deger: '2', etiket: 'Birebir aynı içerikli sayfa', alt: 'endoterapylazer = medart-smartsculpt', durum: 'risk' },
    ],
    cikarim:
      'Mevcut 61 yazı silinmiyor. İçindeki teknik anlatım derin rehberlere ve ürün sayfalarına taşınıyor — emek korunuyor, yeri değişiyor.',
  },
  {
    id: 'reklam',
    no: '06',
    etiket: 'Çözüm · 4',
    baslik: 'Reklam tüketiciye değil,\nişletme sahibine gitsin.',
    ozet:
      'Tıbbi cihazın halka yönelik reklamı yasak, meslek mensubuna tanıtımı serbest. Bu bir kısıt değil: hedeflemeyi profesyonele daraltan taraf, aynı bütçeyle doğru kişiye ulaşır.',
    medya: { tip: 'video', ad: 'sahne-5' },
    ikon: 'ik-ads',
    olcumler: [
      { deger: 'Boş', etiket: 'ads_keyword alanı', alt: 'Ölçüm kurulu ama veri gelmiyor', durum: 'kayip' },
      { deger: 'Google', etiket: 'Arama niyetini yakalar', alt: 'Cihaz bazlı kampanya + dönüşüm izleme', durum: 'firsat' },
      { deger: 'Meta', etiket: 'Aramayan alıcıya ulaşır', alt: 'İşletme hedefleme + yeniden hedefleme', durum: 'firsat' },
    ],
    cikarim:
      'Önce ölçüm hattı kurulur — hangi aramanın teklif getirdiği görünür hale gelir. Sonra bütçe büyütülür.',
  },
  {
    id: 'youtube',
    no: '07',
    etiket: 'Çözüm · 5',
    baslik: 'Alıcı cihazı\nçalışırken görmek istiyor.',
    ozet:
      'Yüz binlerce liralık bir cihaz, fotoğrafla satılmıyor. YouTube aynı zamanda arama motoru: videolar Google sonuçlarında da yer alabilir.',
    medya: { tip: 'gorsel', ad: 'konu-youtube' },
    ikon: 'ik-video',
    olcumler: [
      { deger: '0', etiket: 'Bugünkü video varlığı', alt: 'Kanal henüz yok', durum: 'kayip' },
      { deger: '4', etiket: 'İçerik hattı', alt: 'Tanıtım · kurulum ve eğitim · teknik servis · uygulama', durum: 'firsat' },
      { deger: '28', etiket: 'Anlatılacak cihaz', alt: 'Her biri kendi sayfasına bağlanır', durum: 'firsat' },
    ],
    cikarim:
      'Videolar hasta görüntüsü ve sonuç vaadi olmadan, cihaz ve süreç anlatımı üzerine kurulur.',
  },
  {
    id: 'produksiyon',
    no: '08',
    etiket: 'Çözüm · 6',
    baslik: 'Kamerayı sahaya çıkarıyoruz.\nİstanbul çekim ayağı.',
    ozet:
      'İçerik masa başında bitmiyor. Ekibimiz bayilerinize ve referans işletmelerinize gider; cihazı kendi ortamında, kullanan kişinin ağzından kayda alır.',
    medya: { tip: 'gorsel', ad: 'konu-produksiyon' },
    ikon: 'ik-kamera',
    olcumler: [
      { deger: '4K', etiket: 'Çekim çözünürlüğü', alt: 'Sinema kamerası, ışık ve ses ekibiyle', durum: 'kazanc' },
      { deger: 'Saha', etiket: 'Bayi ve klinik ziyareti', alt: 'İstanbul ve çevresi, planlı takvimle', durum: 'kazanc' },
      { deger: '3', etiket: 'Kurgu çıktısı', alt: 'Uzun anlatım · kısa reklam · dikey sosyal', durum: 'kazanc' },
    ],
    ozellikler: [
      'Bayi ve kullanıcı memnuniyet röportajları — gerçek işletme, gerçek ortam',
      'Cihaz kullanım ve kurulum çekimleri, teknik servis atölye görüntüleri',
      'Showroom ve ürün tanıtım çekimi, detay makro planlar',
      '4K kurgu, montaj, renk düzenleme, altyazı ve seslendirme',
      'Her çekimden üç format: YouTube uzun, reklam kısa, Reels/Shorts dikey',
      'Görüntü kullanım izinleri ve mevzuat süzgeci çekim öncesi netleştirilir',
    ],
    cikarim:
      'Kanıt katmanı böyle kuruluyor: yazıyla anlatılan servis kapasitesi, görüntüyle gösterilebilir hale geliyor.',
  },
  {
    id: 'yol',
    no: '09',
    etiket: 'Plan',
    baslik: 'Altı ayda\nüç aşama.',
    ozet:
      'Her aşamanın teslimi ve ölçütü belli. Kanallar sırayla değil, üst üste binerek çalışıyor — biri diğerinin verisini besliyor.',
    medya: { tip: 'gorsel', ad: 'konu-yol' },
    /* Kanal şeridi: hangi ay hangi kanalın devrede olduğu görünür olsun.
       durum: 0 = kapalı, 1 = kuruluyor, 2 = tam çalışıyor */
    kanallar: [
      { ad: 'Web', ikon: 'ik-web', aylar: [2, 2, 2] },
      { ad: 'Chatbot', ikon: 'ik-chatbot', aylar: [1, 2, 2] },
      { ad: 'SEO', ikon: 'ik-seo', aylar: [1, 2, 2] },
      { ad: 'Google Ads', ikon: 'ik-ads', aylar: [1, 2, 2] },
      { ad: 'Meta', ikon: 'ik-meta', aylar: [0, 1, 2] },
      { ad: 'YouTube', ikon: 'ik-video', aylar: [0, 1, 2] },
      { ad: 'Prodüksiyon', ikon: 'ik-kamera', aylar: [0, 1, 2] },
    ],
    donemler: [
      {
        ad: '1. ay',
        baslik: 'Temel',
        maddeler: [
          'Site yayına alınır, 301 göçü yapılır',
          'GA4, Search Console, dönüşüm izleme kurulur',
          'Chatbot canlıya alınır ve bilgi tabanı yüklenir',
          'İlk Google Ads kampanyası açılır',
        ],
        olcut: 'Ölçüm çalışıyor: hangi aramanın hangi teklifi getirdiği görünüyor.',
      },
      {
        ad: '3. ay',
        baslik: 'Derinleşme',
        maddeler: [
          'İçerik kümeleri yazılır, ürün sayfaları derinleşir',
          'Kampanyalar arama terimi verisiyle optimize edilir',
          'İstanbul çekimi yapılır, YouTube ilk seri yayınlanır',
          'Meta yeniden hedefleme açılır',
        ],
        olcut: 'Organik ve reklam kanalları ayrı ayrı raporlanabiliyor.',
      },
      {
        ad: '6. ay',
        baslik: 'Bileşik etki',
        maddeler: [
          'Organik hat oturur, video kütüphanesi birikir',
          'Chatbot konuşma kayıtları içerik planını besler',
          'Bayi ağı ve panel devreye girer',
          'Aylık raporlama ritmi kurulur',
        ],
        olcut: 'Talep tek kanala bağlı olmaktan çıkar.',
      },
    ],
    cikarim:
      'Aşağıdakiler hedeftir, taahhüt değildir. Hiçbir ajans sıralama veya dönüşüm garantisi veremez; verdiğimiz söz iş kalemleri, yayın koşulları ve şeffaf ölçümdür.',
  },
];
