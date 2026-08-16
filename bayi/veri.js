/* ==========================================================================
   ESTEZONE — BAYİ AĞI BÜYÜTME PROGRAMI · veri katmanı
   28. proje / bayi alt-programı. Mevcut site build'ine DOKUNMAZ.
   Kaynaklı her iddia `kaynak` alanı taşır. Kaynağı olmayan = varsayım/öneri.
   ========================================================================== */

/* ---------------------------------------------------------------- 0. Program */
const PROGRAM = {
  ad: 'Estezone Yetkili Ağ Programı',
  kisa: 'EYAP',
  altbaslik: 'Bayi zincirini büyütmek için 8 prototip · rakip kıyası · SEO · dijital pazarlama · asistan',
  tarih: '16 Ağustos 2026',
  tez:
    'Estezone bugün cihaz <em>satıyor</em>. Bayi zinciri büyüten firmalar cihaz değil ' +
    '<strong>talep, belge, eğitim ve tekrar eden gelir</strong> satıyor. Aradaki fark bir ' +
    'ürün farkı değil, bir <strong>altyapı</strong> farkı — ve Türkiye’de bu altyapıyı ' +
    'kuran rakip yok.',
};

/* -------------------------------------------------- 1. Üç katmanlı ağ modeli */
/* "Bayi" kelimesi Türkiye’de iki ayrı şeye deniyor: (a) cihazı alıp KULLANAN
   klinik/merkez, (b) cihazı alıp SATAN bölge bayisi. Program ikisini de kapsar,
   üçüncü katman da satmadan yönlendiren referans ortağıdır. */
const KATMANLAR = [
  {
    kod: 'A',
    ad: 'Yetkili Bölge Bayisi',
    rol: 'satar',
    tanim:
      'Belirli bir il/bölgede Estezone cihazlarını satan, stok tutan, ilk seviye ' +
      'kurulum ve demo yapan ticari ortak.',
    girisEsigi: 'Satış merkezi yetki belgesi + ÜTS kaydı + sertifikalı satış ve tanıtım elemanı',
    kazanc: 'Cihaz marjı + sarf marjı + kurulum/eğitim payı',
    estezoneKazanci: 'Coğrafi erişim, saha demo kapasitesi, tahsilat riskinin dağılması',
    risk: 'Marka temsilinde kontrol kaybı, fiyat kırma, mevzuat ihlali sorumluluğu',
    hedef: '12 ay: 6–10 bölge bayisi',
  },
  {
    kod: 'B',
    ad: 'Yetkili Uygulama Merkezi',
    rol: 'kullanır',
    tanim:
      'Cihazı satın alan/kiralayan klinik, tıp merkezi, güzellik merkezi veya salon. ' +
      'Satmaz; uygular. Ağın gerçek hacmi buradadır.',
    girisEsigi: 'İşletme türüne uygun cihaz eşleşmesi + personel eğitimi + servis sözleşmesi',
    kazanc: 'Talep yönlendirmesi, ko-op reklam bütçesi, sarf indirimi, eğitim, rozet',
    estezoneKazanci: 'Sarf ve servis geliri (tekrar eden), referans, vaka arşivi',
    risk: 'Kötü uygulama marka itibarını yakar → sertifikasyon şart',
    hedef: '12 ay: 120–180 kayıtlı merkez',
  },
  {
    kod: 'C',
    ad: 'Referans / Çözüm Ortağı',
    rol: 'yönlendirir',
    tanim:
      'Cihaz satmaz, almaz: güzellik merkezi danışmanı, mimar/kurulum firması, ' +
      'muhasebeci, sektör eğitmeni, ikinci el aracısı, ekipman leasing temsilcisi.',
    girisEsigi: 'Sözleşme + tek sayfalık uyum taahhüdü',
    kazanc: 'Kapanan satışta komisyon veya sarf kredisi',
    estezoneKazanci: 'Sıfır sabit maliyetli lead akışı, sektörün kılcal damarlarına erişim',
    risk: 'Komisyon avcılığı, niteliksiz lead → skor kapısı şart',
    hedef: '12 ay: 40–60 aktif referans ortağı',
  },
];

/* ------------------------------------------------------- 2. Türkiye rakipleri */
/* 16 Ağustos 2026’da site üzerinden doğrulanan gözlemler + arama sonuçları.
   "?" = doğrulanamadı, iddia edilmiyor. */
const TR_RAKIP = {
  kriterler: [
    ['bayiProgram', 'Bayi/iş ortaklığı programı sayfası'],
    ['basvuruForm', 'Bayi başvuru formu'],
    ['portal', 'Bayi girişi / portal'],
    ['bolge', 'Bölge koruması ilanı'],
    ['locator', '“Yetkili merkez bul” haritası'],
    ['akademi', 'Eğitim akademisi / sertifika'],
    ['roi', 'Yatırım geri dönüş hesaplayıcı'],
    ['fiyat', 'Fiyat / yatırım bandı'],
    ['sla', 'Sayısal servis taahhüdü (SLA)'],
    ['sarf', 'Sarf / yedek parça kataloğu'],
    ['chat', 'Canlı sohbet veya AI asistan'],
    ['kurulum', 'Anahtar teslim merkez kurulumu'],
  ],
  firmalar: [
    {
      ad: 'Estezone (bugün)',
      not: 'estezone.com.tr — 40 sayfa + 82 yazı, tek form',
      kendisi: true,
      d: { bayiProgram: 0, basvuruForm: 0, portal: 0, bolge: 0, locator: 0, akademi: 0, roi: 0, fiyat: 0, sla: 0, sarf: 0, chat: 0, kurulum: 0 },
      kaynak: 'Proje analiz raporu, 8 ajanlı denetim, 16 Ağu 2026',
    },
    {
      ad: 'E-Medikal',
      not: '“81 ilde iş ortağı” diyor ama ortaklığın kapısı yok',
      d: { bayiProgram: 0, basvuruForm: 0, portal: 0, bolge: 0, locator: 0, akademi: 0, roi: 0, fiyat: 0, sla: 0, sarf: 0, chat: 0, kurulum: 0.5 },
      kaynak: 'emedikal.com.tr ana sayfa, 16 Ağu 2026 çekimi',
    },
    {
      ad: 'Medsatek',
      not: 'Sektörün en agresif kanal hamlesi: anahtar teslim merkez kurulumu',
      d: { bayiProgram: 0, basvuruForm: 0, portal: 0, bolge: 0, locator: 0, akademi: 0, roi: 0, fiyat: 1, sla: 0, sarf: 0, chat: 0, kurulum: 1 },
      kaynak: 'medsatek.com + /guzellik-merkezi-kurulum/, 16 Ağu 2026',
    },
    {
      ad: 'MedLaser',
      not: '6 ülkede distribütörlük — ihracat kaslı, dijital kanal kapalı',
      d: { bayiProgram: 0.5, basvuruForm: 0, portal: 0, bolge: 0.5, locator: 0, akademi: 0, roi: 0, fiyat: 0, sla: 0, sarf: 0, chat: 0, kurulum: 0 },
      kaynak: 'medlaser.com.tr — TR/İran/Azerbaycan/Gürcistan/K.Irak/Kıbrıs distribütörlüğü beyanı',
    },
    {
      ad: 'STS Lazer',
      not: 'Lutronic Türkiye distribütörü — global markanın gücüne yaslanıyor',
      d: { bayiProgram: 0, basvuruForm: 0, portal: 0, bolge: 0.5, locator: 0, akademi: 0.5, roi: 0, fiyat: 0, sla: 0, sarf: 0.5, chat: 0, kurulum: 0 },
      kaynak: 'stslazer.com/markalarimiz/',
    },
    {
      ad: 'Bölgesel küçük satıcılar',
      not: 'Instagram + WhatsApp üzerinden çalışan, sitesi olmayan onlarca oyuncu',
      d: { bayiProgram: 0, basvuruForm: 0, portal: 0, bolge: 0, locator: 0, akademi: 0, roi: 0, fiyat: 0.5, sla: 0, sarf: 0, chat: 0.5, kurulum: 0 },
      kaynak: 'Sektör gözlemi — sayısallaştırılmadı, iddia değil',
    },
  ],
  sonuc:
    'Taranan hiçbir Türk tedarikçide bayi başvuru hunisi, bayi portalı, bölge koruması ' +
    'ilanı, yetkili merkez haritası veya sertifikasyon programı bulunamadı. Sektörün ' +
    'kanal yönetimi tamamen <strong>telefon + WhatsApp + fuar</strong> üzerinde duruyor. ' +
    'Otomotiv ve beyaz eşyada standart olan “yetkili satıcı bul” haritası (Nissan, Kia, ' +
    'Samsung) medikal estetikte hiç uygulanmamış — <strong>hazır ve kanıtlanmış bir kalıp ' +
    'boşta duruyor.</strong>',
};

/* --------------------------------------------------- 3. Yurt dışı benchmark */
const DIS_BENCHMARK = [
  {
    marka: 'Classys (Kore)',
    hamle: 'Sarf üzerinden kilitleme',
    ne:
      'Gelirin <strong>%46’sı sarf malzemesinden</strong> (2025). Cihaz bir kere satılır, ' +
      'kartuş her gün satılır. Cihaz fiyatı bilinçli olarak agresif; para kartuşta.',
    rakam: '2025 cirosu ₩336,8 milyar (+%38,6) · gelirin >%70’i yurt dışı',
    tr: 'Estezone’un lamba, bar, kartuş, iğne başlık, gözlük hattı bugün dijitalde tamamen kapalı.',
    kaynak: 'Classys IR 4Q25 + Seoulz sektör analizi 2026',
    kaynakUrl: 'https://classys.com/wp-content/uploads/sites/2/2026/02/Classys-IR-Book_4Q25_Eng_vF_260213.pdf',
  },
  {
    marka: 'Classys (Kore)',
    hamle: 'Bölge distribütörünü satın alma',
    ne:
      'Büyüyen pazarda bayiyi kontrol etmek yerine <strong>satın alıyor</strong> ' +
      '(2026 Brezilya distribütörü). Körfez’de ise tek-yetkili sözleşme (DUBIMED — BAE, Katar, Umman).',
    rakam: 'Tek yetkili sözleşme + geriye dönük satın alma, iki ayrı araç',
    tr: 'Estezone için ters yön: kendisi bir bölge bayisi olarak satın alınabilir konumdan çıkıp ağ kuran taraf olmalı.',
    kaynak: 'DUBIMED duyurusu 2025; Seoulz 2026',
    kaynakUrl: 'https://dubaimed.com/2025/news/dubimed-classys/',
  },
  {
    marka: 'InMode (İsrail/ABD)',
    hamle: 'Hastayı bayiye yönlendirme (talep pompası)',
    ne:
      'Tüketiciye reklam yapar, gelen hastayı <strong>“Find a Provider”</strong> ' +
      'haritasından cihaz sahibi kliniğe gönderir. “Morpheus8 Verified Provider” rozeti ' +
      'sahte/paralel cihaz kullananı ayıklar. Klinik cihazı hasta akışı için alır.',
    rakam: 'Harita aramada 30 sonuç gösterir; doğrulama programı ABD+Kanada ile sınırlı',
    tr: 'Türkiye’de hiçbir cihaz markası bunu yapmıyor. <strong>En yüksek etkili tek prototip bu.</strong>',
    kaynak: 'inmodemd.com/find-a-provider',
    kaynakUrl: 'https://www.inmodemd.com/find-a-provider/',
  },
  {
    marka: 'InMode',
    hamle: 'Ayrı markalı eğitim platformu',
    ne: '“InMode University” — cihaz sahibi için ayrı domainde sürekli eğitim portalı.',
    rakam: 'Cihaz satışından bağımsız, kendi başına bir marka varlığı',
    tr: 'Estezone Akademi aynı kalıbın Türkçesi; eğitim hem bayi kazanma hem elde tutma aracı.',
    kaynak: 'inmodeuniversity.com',
    kaynakUrl: 'https://inmodeuniversity.com/',
  },
  {
    marka: 'Alma Lasers (İsrail)',
    hamle: 'Ayrı bir “Partners Zone” portalı',
    ne:
      'Cihaz sahipleri ve distribütörler için kayıtla girilen ayrı portal ' +
      '(partners.almalasers.com). Yanında yılda bir uluslararası sertifikasyon etkinliği ' +
      '(Alma Academy 2026 — Lizbon, 24–27 Nisan, 4 gün protokol + sertifika).',
    rakam: 'Portal + fiziksel akademi = ağın yıllık toplanma ritmi',
    tr: 'Portal yazılım işi; akademi ise Estezone’un 20 yıllık teknik birikimini içerik yapar.',
    kaynak: 'partners.almalasers.com · almalasers.com/alma-academy',
    kaynakUrl: 'https://partners.almalasers.com/',
  },
  {
    marka: 'Candela (ABD)',
    hamle: 'Yazılı “pazarlama taahhüdü” + mükemmeliyet merkezleri',
    ne:
      'Ayrı bir <em>Marketing Commitment</em> sayfasıyla bayiye ne vereceğini yazılı ' +
      'ilan eder: dijital ve basılı materyal, sosyal medya gönderileri, öncesi-sonrası ' +
      'arşivi. Seçilmiş klinikleri “Center of Excellence” ağına alır (2018’den beri).',
    rakam: 'Vaat sayfada; ölçülebilir ve dava edilebilir bir taahhüt',
    tr:
      '⚠ Türkiye’de öncesi-sonrası ve hasta yorumu <strong>sağlık kuruluşu tanıtımında ' +
      'yasak</strong> (33075 s. Yönetmelik). Kopyalanacak olan taahhüdün <em>biçimi</em>, ' +
      'içeriği değil.',
    kaynak: 'candelamedical.com/marketing-commitment · Candela Institute for Excellence',
    kaynakUrl: 'https://candelamedical.com/marketing-commitment/',
  },
  {
    marka: 'Cynosure (ABD)',
    hamle: 'Dört ayaklı vaat',
    ne: 'Teknoloji + servis + <strong>pazarlama desteği</strong> + klinik eğitim — dördü birden satılır.',
    rakam: 'Cihaz tek başına satılmıyor; paket satılıyor',
    tr: 'Estezone’un teknik servisi zaten güçlü; eksik olan pazarlama desteği ayağı.',
    kaynak: 'cynosure.com kurumsal konumlandırma',
    kaynakUrl: 'https://candelamedical.com/',
  },
  {
    marka: 'Genel kanal standardı (PRM)',
    hamle: 'Deal registration + bölge koruması + kademe',
    ne:
      'Medikal cihaz dahil tüm B2B kanallarında oturmuş kalıp: bayi fırsatı ' +
      '<strong>kaydeder</strong>, sistem aynı bölgede çakışmayı engeller, koruma süresi ' +
      'boyunca o fırsat onundur; kademe (Gümüş/Altın/Platin) marjı belirler. Portal ' +
      'içinde eğitim (LMS), ko-op materyal, teşvik takibi ve CRM entegrasyonu bulunur.',
    rakam: 'Bayi çatışmasını önlemenin standart yolu',
    tr: 'Estezone’un bugünkü en büyük ağ riski budur: iki satıcı aynı kliniği aramaya başladığı gün ağ çöker.',
    kaynak: 'ZINFI / TechTarget / Magentrix kanal yönetimi kılavuzları',
    kaynakUrl: 'https://www.zinfi.com/glossary-how-to/implement-a-partner-deal-registration-program/',
  },
];

/* ---------------------------------------------------------- 4. Prototipler */
const PROTOTIPLER = [
  {
    kod: 'P1',
    ad: 'Bayi Başvuru Hunisi + Otomatik Skorlama',
    sayfa: 'basvuru.html',
    ozet: 'Belge kapısı olan, kendini puanlayan, niteliksiz başvuruyu kibarca eleyen tek sayfalık huni.',
    neden:
      'Bugün bayi adayının Estezone’a ulaşmasının tek yolu telefon. Kim olduğunu, hangi ' +
      'belgesi olduğunu, hangi bölgeyi istediğini soran hiçbir yapı yok.',
    etki: 5, zorluk: 2, sure: '2 hafta',
    cikti: ['Skorlanmış aday havuzu', 'Belge eksiği önceden görünür', 'Bölge talebi ısı haritası'],
    kanit: 'Kanal yönetiminde standart giriş kapısı (PRM kalıbı)',
  },
  {
    kod: 'P2',
    ad: 'Bölge Haritası & Kıtlık Motoru',
    sayfa: 'bolge.html',
    ozet: '81 il için açık / rezerve / dolu durumu. Bayilik “başvurulan” değil “kapılan” bir şey olur.',
    neden:
      'Bölge koruması ilan etmeyen bir ağda bayiler birbirini fiyat kırarak yer. İlan ' +
      'edilen koruma, hem aday için değer hem mevcut bayi için güvence.',
    etki: 5, zorluk: 2, sure: '1 hafta',
    cikti: ['Bölge çakışması yapısal olarak imkânsız', '“3 il kaldı” aciliyeti', 'Satış ekibi için hedef listesi'],
    kanit: 'Deal registration + territory protection — B2B kanal standardı',
  },
  {
    kod: 'P3',
    ad: 'Bayi Portalı (PWA)',
    sayfa: 'portal.html',
    ozet: 'Cihazlarım, garanti, servis geçmişi, atış sayacı, sarf tekrar siparişi, bana düşen talepler.',
    neden:
      'Ağın günlük teması burada kurulur. Sarf siparişi telefonla alınıyorsa tekrar eden ' +
      'gelir ölçülemez ve büyütülemez.',
    etki: 5, zorluk: 4, sure: '6–8 hafta',
    cikti: ['Tekrar eden sarf geliri ölçülebilir', 'Servis talebi kuyruğu', 'Bayi bağlılığı (switching cost)'],
    kanit: 'Alma Partners Zone · Classys’in %46 sarf geliri',
    uyari: 'Sepet/online ödeme YOK — md.26/4 gereği sipariş = teklif talebi.',
  },
  {
    kod: 'P4',
    ad: 'Yetkili Uygulama Merkezi Bul',
    sayfa: 'merkez-bul.html',
    ozet: 'Tüketiciye açık merkez haritası. Estezone talep üretir, talebi cihaz sahibine yönlendirir.',
    neden:
      'Bayiliğin satış argümanı “cihaz al” değil “<strong>müşteri al</strong>” olur. ' +
      'Sektörün oyunu değiştiren tek hamlesi budur.',
    etki: 5, zorluk: 3, sure: '3–4 hafta',
    cikti: ['Cihaz almanın somut gerekçesi', 'Ölçülebilir yönlendirme sayısı', 'Sahte/paralel cihaz ayıklama'],
    kanit: 'InMode “Find a Provider” + “Verified Provider” rozeti',
    uyari:
      'TR sürümünde hasta yorumu / fiyat / öncesi-sonrası OLAMAZ (33075 s. Yönetmelik ' +
      'sağlık kuruluşunu bağlar). Kayıt defteri gibi kurulur, pazaryeri gibi değil.',
  },
  {
    kod: 'P5',
    ad: 'Bayi Kazanç Simülatörü',
    sayfa: 'kazanc.html',
    ozet: 'Aday bayinin 24 aylık kazancını cihaz + sarf + servis kalemleriyle hesaplayan araç.',
    neden:
      'Bayilik kararı duygusal değil aritmetiktir. Rakiplerin hiçbiri bu aritmetiği ' +
      'göstermiyor; gösteren taraf konuşmayı yönetir.',
    etki: 4, zorluk: 2, sure: '2 hafta',
    cikti: ['Nitelikli lead (rakamı gören ciddi olan kalır)', 'Beklenti yönetimi', 'PDF ile takip bahanesi'],
    kanit: 'Sektörde interaktif hâli yok; Medsatek ve Newmed’de yalnızca statik tablo',
  },
  {
    kod: 'P6',
    ad: 'Bayi & Talep Asistanı (AI)',
    sayfa: 'asistan.html',
    ozet: '7/24 çalışan, üç kişiliği ayıran (aday bayi / mevcut bayi / son kullanıcı) kurallı asistan.',
    neden:
      'Talebin büyük kısmı mesai dışında geliyor ve kayboluyor. Asistan nitelendirir, ' +
      'bölgeye eşler, servis ile satışı ayırır.',
    etki: 4, zorluk: 3, sure: '3 hafta',
    cikti: ['Mesai dışı kayıp sıfıra yakın', 'Ön nitelendirme', 'Departman ayrımı'],
    kanit: 'EsteTouch, Griarts, Dr. Ramazan Ersoy ve Avrupa Tıp Merkezi’nde canlı çalışan hat',
    uyari: 'Teşhis koymaz, doz/parametre önermez, fiyat vermez — üç sert kural.',
  },
  {
    kod: 'P7',
    ad: 'Estezone Akademi & Sertifikasyon',
    sayfa: 'akademi.html',
    ozet: 'Bronz→Gümüş→Altın→Platin kademeleri. Eğitim hem giriş bileti hem elde tutma zinciri.',
    neden:
      'Sertifikasız uygulama marka itibarını yakar. Ayrıca mevzuat zaten sertifikalı ' +
      'personel istiyor — zorunluluğu bir programa çevirmek bedava kaldıraç.',
    etki: 4, zorluk: 3, sure: '4–6 hafta',
    cikti: ['Kalite kontrolü', 'Kademe = marj = motivasyon', 'Yeniden sertifikasyon ile yıllık temas'],
    kanit: 'Alma Academy (Lizbon 2026) · InMode University · Candela Institute for Excellence',
  },
  {
    kod: 'P8',
    ad: 'Ko-op Pazarlama Motoru',
    sayfa: 'pazarlama.html',
    ozet: 'Bayiye hazır reklam kiti + kendi adına mikro açılış sayfası + paylaşımlı bütçe (MDF).',
    neden:
      'Bayi cihazı alır, sonra pazarlayamaz ve satamaz — cihaz atıl kalır, sarf ' +
      'satılmaz, ikinci cihaz hiç alınmaz. Ağın en sık ölüm sebebi budur.',
    etki: 4, zorluk: 3, sure: '3–4 hafta',
    cikti: ['Bayinin cihazı ciroya dönüşür', 'Marka dili tek elden', 'Ko-op bütçe = sadakat'],
    kanit: 'Candela “Marketing Commitment” · Cynosure’ün dört ayaklı vaadi',
    uyari: 'Üretilen her materyal mevzuat süzgecinden geçer; bayi serbest metin yazamaz.',
  },
];

/* ------------------------------------------------------------ 5. Bölge verisi */
const BOLGELER = [
  { ad: 'Marmara', iller: [
      ['İstanbul (Anadolu)', 'dolu', 'Ataşehir ofisi doğrudan'], ['İstanbul (Avrupa)', 'acik', ''],
      ['Bursa', 'acik', ''], ['Kocaeli', 'rezerve', 'Görüşme 2. tur'], ['Balıkesir', 'acik', ''],
      ['Tekirdağ', 'acik', ''], ['Sakarya', 'acik', ''], ['Çanakkale', 'acik', ''],
      ['Edirne', 'acik', ''], ['Yalova', 'acik', ''], ['Kırklareli', 'acik', ''], ['Bilecik', 'acik', ''] ] },
  { ad: 'İç Anadolu', iller: [
      ['Ankara', 'dolu', 'Beysukent merkez doğrudan'], ['Konya', 'rezerve', 'Belge bekleniyor'],
      ['Kayseri', 'acik', ''], ['Eskişehir', 'acik', ''], ['Sivas', 'acik', ''], ['Aksaray', 'acik', ''],
      ['Nevşehir', 'acik', ''], ['Kırıkkale', 'acik', ''], ['Karaman', 'acik', ''], ['Niğde', 'acik', ''],
      ['Yozgat', 'acik', ''], ['Çankırı', 'acik', ''], ['Kırşehir', 'acik', ''] ] },
  { ad: 'Ege', iller: [
      ['İzmir', 'rezerve', 'Ön anlaşma'], ['Antalya', 'acik', ''], ['Denizli', 'acik', ''],
      ['Muğla', 'acik', ''], ['Aydın', 'acik', ''], ['Manisa', 'acik', ''], ['Afyonkarahisar', 'acik', ''],
      ['Kütahya', 'acik', ''], ['Uşak', 'acik', ''] ] },
  { ad: 'Akdeniz', iller: [
      ['Adana', 'acik', ''], ['Mersin', 'acik', ''], ['Hatay', 'acik', ''], ['Kahramanmaraş', 'acik', ''],
      ['Osmaniye', 'acik', ''], ['Isparta', 'acik', ''], ['Burdur', 'acik', ''] ] },
  { ad: 'Karadeniz', iller: [
      ['Samsun', 'acik', ''], ['Trabzon', 'acik', ''], ['Ordu', 'acik', ''], ['Rize', 'acik', ''],
      ['Zonguldak', 'acik', ''], ['Tokat', 'acik', ''], ['Amasya', 'acik', ''], ['Giresun', 'acik', ''],
      ['Çorum', 'acik', ''], ['Kastamonu', 'acik', ''], ['Bolu', 'acik', ''], ['Düzce', 'acik', ''],
      ['Karabük', 'acik', ''], ['Bartın', 'acik', ''], ['Sinop', 'acik', ''], ['Artvin', 'acik', ''],
      ['Gümüşhane', 'acik', ''], ['Bayburt', 'acik', ''] ] },
  { ad: 'Güneydoğu', iller: [
      ['Gaziantep', 'rezerve', 'Bölge temsilcisi görüşmesi'], ['Şanlıurfa', 'acik', ''],
      ['Diyarbakır', 'acik', ''], ['Mardin', 'acik', ''], ['Batman', 'acik', ''], ['Adıyaman', 'acik', ''],
      ['Siirt', 'acik', ''], ['Şırnak', 'acik', ''], ['Kilis', 'acik', ''] ] },
  { ad: 'Doğu Anadolu', iller: [
      ['Van', 'acik', ''], ['Erzurum', 'acik', ''], ['Malatya', 'acik', ''], ['Elazığ', 'acik', ''],
      ['Erzincan', 'acik', ''], ['Ağrı', 'acik', ''], ['Muş', 'acik', ''], ['Bingöl', 'acik', ''],
      ['Bitlis', 'acik', ''], ['Hakkâri', 'acik', ''], ['Iğdır', 'acik', ''], ['Kars', 'acik', ''],
      ['Ardahan', 'acik', ''], ['Tunceli', 'acik', ''] ] },
  { ad: 'Yurt dışı (faz 2)', iller: [
      ['KKTC', 'acik', ''], ['Azerbaycan', 'acik', ''], ['Gürcistan', 'acik', ''],
      ['Kuzey Irak', 'acik', ''], ['Kosova', 'acik', ''], ['Kuzey Makedonya', 'acik', ''],
      ['Türkmenistan', 'acik', ''], ['Özbekistan', 'acik', ''] ] },
];

/* ------------------------------------------------------- 6. Akademi kademeleri */
const KADEMELER = [
  {
    ad: 'Bronz', renk: '#a1663a', sart: 'Başvuru onayı + temel cihaz eğitimi (1 gün)',
    hak: ['Katalog ve teknik föy erişimi', 'Standart sarf fiyatı', 'Portal: cihazlarım + garanti', 'Telefon desteği (mesai içi)'],
    marj: 'Referans marj', lead: 'Yok',
  },
  {
    ad: 'Gümüş', renk: '#8d97a4', sart: 'Bronz + 1 sertifikalı uygulayıcı + ilk 12 ay ciro eşiği',
    hak: ['Merkez haritasında listelenme', 'Sarf %5 indirim', 'Hazır reklam kiti', 'Portal: servis geçmişi + atış sayacı'],
    marj: 'Referans + 3 puan', lead: 'Bölgesindeki talebin sırasında',
  },
  {
    ad: 'Altın', renk: '#c9922f', sart: 'Gümüş + 2 sertifikalı uygulayıcı + yıllık eğitim tazeleme',
    hak: ['Haritada üst sıra + “Yetkili” rozeti', 'Sarf %10 indirim', 'Ko-op reklam bütçesi (50/50)', 'Öncelikli servis SLA’sı', 'Demo cihaz desteği'],
    marj: 'Referans + 7 puan', lead: 'Bölgesinde öncelikli',
  },
  {
    ad: 'Platin', renk: '#0d5490', sart: 'Altın + bölge hedefi + eğitmen yetiştirmiş olmak',
    hak: ['Bölge koruması sözleşmesi', 'Sarf %15 indirim', 'Ko-op bütçe (70/30)', 'İkinci el envanterine erişim', 'Yeni cihazda ilk deneme hakkı', 'Ürün geliştirmede söz hakkı'],
    marj: 'Referans + 12 puan', lead: 'Bölgesinde tekel',
  },
];

/* ------------------------------------------------------------ 7. SEO planı */
const SEO = {
  tespit: [
    ['Mevcut sitede “bayilik” kelimesi', '0 kez geçiyor — bu niyetle arayan hiç kimse siteye düşmüyor'],
    ['82 blog yazısının 61’i', 'Tek anlam kümesinde; bayi niyetli tek sayfa yok'],
    ['Son içerik güncellemesi', '4 Ekim 2024 — 22 aydır durgun'],
    ['İl bazlı sayfa', '0 — “Konya lazer epilasyon cihazı” gibi hiçbir yerel sorguya karşılık yok'],
    ['Product / Organization schema', '0 / 0 (Organization yerine Person işaretlenmiş)'],
  ],
  kumeler: [
    {
      ad: 'A · Bayilik niyeti (yeni küme — sıfırdan)',
      hedef: 'Bayi adayı',
      sayfa: '/bayilik/ (hub) + 6 destek sayfası',
      kelimeler: ['lazer epilasyon cihazı bayilik', 'estetik cihaz bayiliği', 'medikal cihaz bayilik şartları', 'güzellik cihazı distribütörlüğü', 'bölge bayiliği başvurusu', 'cihaz bayiliği ne kadar kazandırır'],
      not: 'Rekabet düşük, ticari niyet tavan. Türkiye’de bu kümeyi tutan cihaz firması yok.',
    },
    {
      ad: 'B · Yatırım / işletme açma niyeti',
      hedef: 'Cihaz alacak merkez sahibi',
      sayfa: '/rehber/ altında 8 uzun rehber',
      kelimeler: ['güzellik merkezi açmak maliyeti', 'lazer epilasyon salonu yatırımı', 'lazer epilasyon cihazı fiyatları', 'cihaz kiralama mı satın alma mı', 'ikinci el lazer cihazı alırken', 'güzellik merkezi ruhsat şartları'],
      not: 'Rakiplerin blogları bu kümede ama huniye bağlamıyor — hesaplayıcıya bağlayan kazanır.',
    },
    {
      ad: 'C · İl bazlı yerel küme',
      hedef: 'Bölgesel alıcı + bayi',
      sayfa: '/bayilik/<il>/ — 20 öncelikli il, şablon değil elle yazılmış giriş',
      kelimeler: ['konya lazer epilasyon cihazı', 'ankara estetik cihaz servisi', 'izmir lazer cihazı bayi'],
      not: '⚠ 81 il için otomatik doorway sayfası ÜRETİLMEZ — Google spam politikası. Yalnızca gerçek varlık olan illerde sayfa açılır.',
    },
    {
      ad: 'D · Servis & sarf (savunma kümesi)',
      hedef: 'Cihazı duran mevcut müşteri',
      sayfa: '/destek/ altında marka-model matrisi',
      kelimeler: ['lazer cihazı flash lamba değişimi', 'aleksandrit lazer bar ömrü', 'cihaz arıza kodu', 'yedek parça'],
      not: 'En sıcak talep. Rakip müşterisi de buradan gelir — marka bağımsız servis konumu.',
    },
  ],
  teknik: [
    'Product + Offer("teklif üzerine") + Organization + LocalBusiness (2 şube) + FAQPage + BreadcrumbList şemaları veri modelinden otomatik üretilir',
    'Bayilik hub’ı için JobPosting DEĞİL, `Organization` + `FAQPage`; başvuru formu `noindex` teşekkür sayfasına gider',
    'Merkez haritasındaki her merkez için `LocalBusiness` — ama yorum/puan alanı YOK (mevzuat)',
    'Kanonik alan değişmez: https://estezone.com.tr (apex)',
    '82 yazının konsolidasyonu bayilik kümesinden ÖNCE bitmeli; yoksa yeni küme de kanibalize olur',
    'Search Console 16 aylık dışa aktarım alınmadan tek bir 301 atılmaz',
  ],
  takvim: [
    ['0–30 gün', 'Bayilik hub’ı + 3 destek sayfası + başvuru hunisi indekslenir'],
    ['30–60 gün', '8 yatırım rehberi (B kümesi) + hesaplayıcıya iç linkleme'],
    ['60–120 gün', '20 il sayfası (yalnızca gerçek varlığı olan iller) + merkez haritası indekslenir'],
    ['120–180 gün', 'Servis/sarf matrisi + 82 yazının konsolidasyonu tamamlanır'],
  ],
};

/* -------------------------------------------------- 8. Dijital pazarlama planı */
const KANALLAR = [
  {
    ad: 'Google Ads — Arama (B2B niyet)',
    pay: 30, rol: 'Hasat',
    hedef: '“bayilik”, “cihaz fiyatı”, “kiralama”, marka+model sorguları',
    ipucu: 'Bugün Ads bütçesi formsuz iniş sayfalarına akıyor (form gizli alanları boş geliyor). Önce iniş sayfası, sonra bütçe.',
    olcum: 'Nitelikli başvuru başı maliyet (skor ≥60)',
  },
  {
    ad: 'Meta (Instagram/Facebook)',
    pay: 18, rol: 'Talep yaratma',
    hedef: 'Salon/merkez sahibi, işletme açmayı düşünen, mevcut cihazından memnun olmayan',
    ipucu: 'Cihaz görseli değil <em>işletme ekonomisi</em> içeriği: “ayda kaç seans, ne kadar sarf”. Kreatif kütüphanesi bayilere de verilir (P8).',
    olcum: 'Video izleme → hesaplayıcı → başvuru',
  },
  {
    ad: 'YouTube + kısa video',
    pay: 12, rol: 'Kanıt',
    hedef: 'Servis atölyesi, kurulum, eğitim, cihaz içi bakım — “20 yıl” burada görünür',
    ipucu: 'Sektörde teknik servis içeriği üreten yok. Rakip müşterisi arıza ararken bulur.',
    olcum: 'İzlenme → servis formu → cihaz talebi',
  },
  {
    ad: 'LinkedIn + doğrudan erişim',
    pay: 8, rol: 'Avlanma',
    hedef: 'Zincir klinik satın alma, hastane, yatırımcı, ihracat partneri',
    ipucu: 'Hacim düşük, sepet yüksek. Bölge bayisi adayları çoğu zaman burada değil — sahada.',
    olcum: 'Toplantı sayısı',
  },
  {
    ad: 'WhatsApp + e-posta dizisi',
    pay: 7, rol: 'Isıtma',
    hedef: 'Başvuran ama karar vermeyen aday (ortalama karar süresi haftalar)',
    ipucu: '5 adımlı dizi: ekonomi → belge → servis → eğitim → bölge kapanıyor.',
    olcum: 'Diziden dönen görüşme oranı',
  },
  {
    ad: 'Fuar + saha demo',
    pay: 20, rol: 'Kapanış',
    hedef: 'Yüz yüze görmeden yüz binlerce liralık cihaz alınmıyor',
    ipucu: 'Dijitalin işi fuara nitelikli randevu doldurmak. Fuar öncesi randevu sayfası + QR ile başvuru hunisi.',
    olcum: 'Fuar öncesi dolan randevu sayısı',
  },
  {
    ad: 'Yeniden pazarlama',
    pay: 5, rol: 'Toplama',
    hedef: 'Hesaplayıcıyı açıp bırakan, PDF indiren, haritada merkez arayan',
    ipucu: 'En ucuz dönüşüm. Bugün ölçüm altyapısı olmadığı için hiç yapılamıyor.',
    olcum: 'Geri dönen oturum → başvuru',
  },
];

const HUNI = [
  ['Farkındalık', 'Reklam, video, il sayfası, merkez haritası', 'Erişim / izlenme'],
  ['İlgi', 'Kazanç simülatörü, yatırım rehberi, bölge haritası', 'Araç kullanımı'],
  ['Nitelendirme', 'Başvuru hunisi + otomatik skor + asistan', 'Skor ≥60 başvuru'],
  ['Değerlendirme', 'Belge kontrolü, saha/fuar demosu, referans görüşmesi', 'Demo sayısı'],
  ['Karar', 'Sözleşme, bölge tahsisi, eğitim takvimi', 'İmzalanan sözleşme'],
  ['Büyütme', 'Portal, sarf aboneliği, kademe atlatma, ko-op bütçe', 'Bayi başına yıllık ciro'],
];

const KPI = [
  ['Nitelikli bayi başvurusu / ay', '0 (ölçülmüyor)', '25–40', 'Skor ≥60'],
  ['Sözleşmeye dönen başvuru', '—', '%8–12', 'Sektör kanal ortalamasının altında tutulmuş, ihtiyatlı'],
  ['Aktif yetkili merkez', '?', '120–180', 'Cihaz almış + portalda aktif'],
  ['Bölge bayisi', '0–2 (gayriresmî)', '6–10', 'Sözleşmeli, bölge korumalı'],
  ['Sarf gelirinin toplam ciroya oranı', '?', '%18 → %30', 'Classys’te %46 — hedef ihtiyatlı'],
  ['Merkez haritasından yönlendirme / ay', '0', '400+', 'B2C talebin bayiye akışı'],
  ['Portal aylık aktif bayi', '0', '%65', 'Ağın canlılık göstergesi'],
  ['Bayi başına yıllık ciro', '?', '+%25', 'Ko-op + akademi etkisi'],
];

/* ---------------------------------------------------------- 9. Alternatifler */
const ALTERNATIFLER = [
  {
    ad: 'Gelir paylaşımlı cihaz yerleşimi',
    kisa: 'Cihazı sat<em>ma</em> — yerleştir, seans başına pay al.',
    detay:
      'Sermayesi yetmeyen salon/merkeze cihaz sıfır peşinatla konur; Estezone seans ' +
      'başına veya aylık sabit + değişken pay alır. Cihaz mülkiyeti Estezone’da kalır, ' +
      'atış sayacı üzerinden ölçülür. Ağ, satın alma gücü olmayan yüzlerce işletmeye açılır.',
    etki: 5, zorluk: 4, risk: 'Sermaye bağlanır, tahsilat ve sayaç manipülasyonu riski',
    kanit: 'Sarf/kullanım bazlı model — Classys’in kartuş ekonomisinin mülkiyetli versiyonu',
  },
  {
    ad: 'Sarf aboneliği (tekrar eden gelir)',
    kisa: 'Lamba, bar, kartuş, başlık, gözlük — aylık paket.',
    detay:
      'Cihaz tek seferlik; sarf her ay. Abonelikte bakım + öncelikli servis + eğitim ' +
      'tazeleme paketlenir. Portal üzerinden otomatik tekrar sipariş hatırlatması ' +
      '(atış sayacına bağlı). Bayiyi rakibe gitmekten alıkoyan asıl zincir budur.',
    etki: 5, zorluk: 2, risk: 'Stok ve tedarik süresi yönetimi; online ödeme yasak (sipariş=teklif)',
    kanit: 'Classys: gelirin %46’sı sarf (2025)',
  },
  {
    ad: 'Sertifikalı ikinci el borsası',
    kisa: 'Bayiler arası cihaz dolaşımı — takas, atış sayaçlı, garantili.',
    detay:
      'Büyüyen bayi cihaz değiştirir, çıkan cihaz sertifikalanıp yeni bayiye giriş ' +
      'cihazı olur. Estezone hem takas farkını hem yenileme marjını alır. Giriş bariyeri ' +
      'düşer, ağın alt ucu dolar. Her ilanda: model yılı, atış sayacı, bakım kaydı, kalan garanti.',
    etki: 4, zorluk: 3, risk: 'Garanti yükümlülüğü, kaynak cihazın geçmişi belgelenmezse itibar riski',
    kanit: 'Projede zaten planlanmış (Faz 3) — bayi ağına bağlanınca kaldıraç oluyor',
  },
  {
    ad: 'Mobil demo aracı / bölge turu',
    kisa: 'Cihazı adayın ayağına götür.',
    detay:
      'Yüz binlerce liralık cihaz görülmeden alınmıyor; Ankara/İstanbul’a gelmek de ' +
      'engel. Aylık 4 ilde 2 gün duran donanımlı araç + önceden dolan randevu takvimi ' +
      '(dijitalin işi bu takvimi doldurmak).',
    etki: 4, zorluk: 4, risk: 'Yüksek sabit maliyet; randevu dolmazsa zarar',
    kanit: 'Sektörde fuar dışında saha demosu yapan yok',
  },
  {
    ad: 'Anahtar teslim merkez kurulumu',
    kisa: 'Cihaz değil <em>işletme</em> sat.',
    detay:
      'Ruhsat danışmanlığı + mekân planı + cihaz seti + personel eğitimi + açılış ' +
      'pazarlaması tek pakette. Medsatek bu alanda ilk hamleyi yapmış durumda; Estezone’un ' +
      'kozu 20 yıllık servis ve mevzuat bilgisi.',
    etki: 4, zorluk: 4, risk: 'Danışmanlık sorumluluğu; ruhsat gecikmesi müşteriye fatura edilir',
    kanit: 'medsatek.com/guzellik-merkezi-kurulum/ — rakip bu kapıyı açtı',
  },
  {
    ad: 'Yurt dışı bayilik (Balkan / Kafkas / Orta Asya)',
    kisa: 'Türkiye doyduğunda ağ dışarı büyür.',
    detay:
      'MedLaser altı ülkede distribütör; Estezone’un ihracat kaslı bir rakibi zaten var. ' +
      'KKTC, Azerbaycan, Gürcistan, Kosova, Türkmenistan tek-yetkili sözleşmelerle ' +
      'başlanabilir. Önkoşul: EN sayfa seti + CE/ÜTS künyeleri + İngilizce eğitim materyali.',
    etki: 3, zorluk: 4, risk: 'İhracat/uygunluk yükümlülükleri; servis lojistiği',
    kanit: 'medlaser.com.tr beyanı · Classys’in DUBIMED tek-yetkili sözleşmesi',
  },
  {
    ad: 'Finansman ortaklığı (leasing)',
    kisa: 'Bayiliğin önündeki tek gerçek engel: nakit.',
    detay:
      'Bir leasing/finansman kurumuyla önceden onaylı limit anlaşması. Başvuru hunisinde ' +
      '“finansmana uygunluk ön değerlendirmesi” adımı. Aday “param yok” dediğinde ' +
      'konuşma bitmez, yön değiştirir.',
    etki: 4, zorluk: 3, risk: 'Taksit simülasyonu “temsilîdir” notu olmadan yayınlanamaz',
    kanit: 'Sektörde vaat düzeyinde var, araç düzeyinde yok',
  },
  {
    ad: 'Marka bağımsız servis ağı (Truva atı)',
    kisa: 'Rakibin cihazını tamir et, müşterisini tanı.',
    detay:
      'Komponent seviyesinde onarım (pompa hücresi, flash lamba, optik lens, fiber, ' +
      'güç kaynağı, PFN, diyot, soğutucu) rakiplerin çoğunda yok. Servis müşterisi ' +
      'bir sonraki cihazını kimden alacağını zaten öğrenmiş olur. Ağa giriş kapısı olarak servis.',
    etki: 5, zorluk: 2, risk: 'Yayınlanan SLA hukuki taahhüttür — tutulamayacak rakam yazılmaz',
    kanit: 'Estezone’un mevcut en güçlü ama hiç satılmayan kozu (analiz raporu K4)',
  },
  {
    ad: 'Eğitim önce, cihaz sonra',
    kisa: 'Akademiyi bağımsız gelir kalemi yap.',
    detay:
      'Ücretli sertifikalı uygulayıcı eğitimi hem gelir hem huni. Eğitimi alan kişi ' +
      'kendi merkezini açtığında cihazı kimden alacağı belli. Mevzuat zaten sertifikalı ' +
      'personel istiyor — talep hazır.',
    etki: 3, zorluk: 2, risk: 'Eğitim yetkinliği ve belge geçerliliği netleştirilmeli',
    kanit: 'Alma Academy · InMode University kalıbı',
  },
  {
    ad: 'Kapalı profesyonel katman',
    kisa: 'Parametre ve protokol kütüphanesi — üye olmayan giremez.',
    detay:
      'Fitzpatrick tipine göre parametre tabloları, protokol kütüphanesi, klinik yayın ' +
      'özetleri. Hem mevzuat kalkanı (halka açık endikasyon tanıtımı yapılmaz) hem sitenin ' +
      'en yüksek dönüşümlü kayıt kapısı. Bayi olmayan da kayıt olur; havuz burada birikir.',
    etki: 4, zorluk: 3, risk: 'Üyelik doğrulaması zayıfsa mevzuat kalkanı çalışmaz',
    kanit: 'Projede tasarlanmış (analiz raporu, farklılaşma md.8)',
  },
];

/* ------------------------------------------------------------ 10. Yol haritası */
const YOL = [
  {
    faz: 'Faz 0 — Zemin', sure: '0–2 hafta', renk: '#5b6878',
    isler: [
      'GA4 + Ads + Search Console erişimi ve 16 aylık dışa aktarım (yoksa hiçbir iddia ölçülemez)',
      'Bayi sözleşmesi taslağı + bölge koruması metni — hukuk danışmanı',
      'Satış merkezi yetki belgesi / ÜTS / sertifikalı personel şartlarının yazılı teyidi',
      'Gerçek servis SLA rakamlarının firmadan alınması (yayınlanan SLA taahhüttür)',
      'Sarf listesi ve marj bandının çıkarılması',
    ],
  },
  {
    faz: 'Faz 1 — Kapı açılır', sure: '2–6 hafta', renk: '#0d5490',
    isler: [
      'P1 Başvuru hunisi + skorlama canlıya',
      'P2 Bölge haritası canlıya (kıtlık motoru)',
      'P5 Kazanç simülatörü canlıya',
      '/bayilik/ SEO hub’ı + 3 destek sayfası',
      'Google Ads’in bayilik kümesine ayrı kampanya olarak açılması',
    ],
  },
  {
    faz: 'Faz 2 — Ağ konuşur', sure: '6–14 hafta', renk: '#1f66a8',
    isler: [
      'P6 Bayi & talep asistanı (üç kişilikli)',
      'P8 Ko-op pazarlama motoru + bayi mikro sayfaları',
      'P7 Akademi: ilk kademe programı + takvim + sertifika',
      '8 yatırım rehberi (B kümesi) + iç linkleme',
      'WhatsApp/e-posta ısıtma dizisi',
    ],
  },
  {
    faz: 'Faz 3 — Ağ kendi kendini besler', sure: '3–6 ay', renk: '#0a4374',
    isler: [
      'P3 Bayi portalı (PWA) — sarf tekrar siparişi, servis, atış sayacı',
      'P4 Yetkili merkez haritası (hukuk onayından sonra)',
      'Sarf aboneliği ve sertifikalı ikinci el borsası',
      '20 il sayfası + yerel arama',
      'EN sayfa seti → yurt dışı bayilik',
    ],
  },
];

/* -------------------------------------------------------------- 11. Riskler */
const RISKLER = [
  {
    baslik: 'Bayi bir sağlık kuruluşu değil, ama sattığı şey tıbbi cihaz',
    ne:
      'Tıbbi cihaz satan her nokta için satış merkezi yetki belgesi, ÜTS kaydı ve ' +
      'sertifikalı satış/tanıtım elemanı aranır. Bayi ağı bu belgeler olmadan kurulursa ' +
      'sorumluluk zincirin tepesine, yani Estezone’a döner.',
    ne_yapmali: 'Başvuru hunisinin ilk adımı belge kapısı olsun; belgesiz aday “aday havuzu”na düşsün, bayi olmasın.',
    durum: 'kritik',
  },
  {
    baslik: 'Merkez haritası bir tanıtım aracına dönüşebilir',
    ne:
      '12/11/2025 tarihli 33075 sayılı Tanıtım Yönetmeliği sağlık kuruluşlarını bağlar: ' +
      'Türkçe içerikte fiyat, hasta yorumu ve karşılaştırmalı üstünlük tanıtımı yapılamaz. ' +
      'ABD’deki “find a provider” pazaryeri mantığı buraya olduğu gibi kopyalanamaz.',
    ne_yapmali: 'Harita bir kayıt defteri olarak kurulur: adres, cihaz modeli, sertifika durumu. Puan/yorum/fiyat/öncesi-sonrası YOK.',
    durum: 'kritik',
  },
  {
    baslik: '“Tek yetkili” ifadesi belgesiz kullanılamaz',
    ne: 'Reklam Kurulu’nun en kolay ceza kestiği kalıp. Mevcut sitede bu iddia belgesiz kullanılıyor.',
    ne_yapmali: 'Sözleşmenin tarihli kopyası dosyada olmadan hiçbir sayfada “tek yetkili” yazmaz; yerine “yetkili distribütör” + belge numarası.',
    durum: 'kritik',
  },
  {
    baslik: 'Portalda sepet olamaz',
    ne: 'Ek-3 dışı tıbbi cihazların internetten satışı yasak (md.26/4).',
    ne_yapmali: 'Portal “sipariş” değil “sipariş talebi/teklif” üretir; ödeme sitede alınmaz.',
    durum: 'yapisal',
  },
  {
    baslik: 'Salon segmenti kuralı hâlâ doğrulanmadı',
    ne:
      'Projedeki “salon yalnızca 600–1200 nm IPL ve ≤20 J/cm² diyot alabilir” kuralının ' +
      'numaralı ve tarihli kaynağı yok. Bu kural bayi ağının kimden oluşacağını doğrudan belirler.',
    ne_yapmali: 'Hukukçu teyidi alınana kadar bu ayrım “ön bilgilendirme” olarak işaretlenir; hiçbir bayiye yazılı taahhüt olarak verilmez.',
    durum: 'acik',
  },
  {
    baslik: 'Yayınlanan SLA ve “bölge koruması” hukuki taahhüttür',
    ne: 'Tutulamayan “4 saatte yerinde müdahale” vaadi, hiç vaat vermemekten pahalıya patlar.',
    ne_yapmali: 'Rakamlar operasyondan alınır, sözleşmeye yazılır, portalda gerçek ölçümle gösterilir.',
    durum: 'yapisal',
  },
  {
    baslik: 'Bayi çatışması ağı içeriden çökertir',
    ne: 'İki bayi aynı kliniği aradığı gün fiyat kırılır, güven biter.',
    ne_yapmali: 'Fırsat kaydı (deal registration) + bölge koruması + çakışma uyarısı ilk günden portalda olmalı.',
    durum: 'yapisal',
  },
  {
    baslik: 'Prototiplerdeki tüm rakamlar temsilîdir',
    ne:
      'Kazanç simülatörü, KPI hedefleri ve sarf marjları firmadan veri gelmeden ' +
      'yerleştirilmiş varsayımlardır.',
    ne_yapmali: 'Faz 0’da gerçek marj, sarf fiyatı ve satış çevrim oranı alınmadan hiçbir rakam müşteriye gösterilmez.',
    durum: 'acik',
  },
];

module.exports = {
  PROGRAM, KATMANLAR, TR_RAKIP, DIS_BENCHMARK, PROTOTIPLER, BOLGELER,
  KADEMELER, SEO, KANALLAR, HUNI, KPI, ALTERNATIFLER, YOL, RISKLER,
};
