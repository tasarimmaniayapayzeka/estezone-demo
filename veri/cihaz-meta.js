// Küratörlü cihaz meta verisi: kategori, konumlandırma, hedef kitle, öne çıkan başlık.
// Ham veriden (spec tablosu, açıklama, görsel) ayrı tutulur; build.js ikisini birleştirir.

module.exports = {
  kategoriler: {
    epilasyon: {
      ad: 'Lazer Epilasyon Sistemleri',
      kisa: 'Lazer Epilasyon',
      slug: 'lazer-epilasyon',
      ozet:
        'Alexandrite, Diode ve Nd:YAG platformlarında, yüksek seans hacmine dayanacak profesyonel epilasyon sistemleri.',
      ikon: 'epilasyon',
    },
    cilt: {
      ad: 'Cilt & Medikal Estetik',
      kisa: 'Cilt & Medikal',
      slug: 'cilt-medikal-estetik',
      ozet:
        'Fraksiyonel CO2, pikosaniye, BBL, HIFU ve altın iğne teknolojileriyle leke, doku ve gençleştirme protokolleri.',
      ikon: 'cilt',
    },
    vucut: {
      ad: 'Vücut Şekillendirme & Zayıflama',
      kisa: 'Vücut & Zayıflama',
      slug: 'vucut-sekillendirme',
      ozet:
        'Soğuk lipoliz, HI-EMT kas uyarımı, radyofrekans ve endolazer ile bölgesel incelme ve kontur protokolleri.',
      ikon: 'vucut',
    },
    destek: {
      ad: 'Soğutma & Klinik Aksesuar',
      kisa: 'Soğutma & Aksesuar',
      slug: 'sogutma-aksesuar',
      ozet:
        'Uygulama konforunu ve hasta güvenliğini yükselten soğutma sistemleri ile dalga boyuna özel koruyucu ekipman.',
      ikon: 'destek',
    },
  },

  // slug -> küratörlü alanlar
  cihazlar: {
    // ——— LAZER EPİLASYON ———
    'arion-alexandrite-lazer': {
      kategori: 'epilasyon',
      ad: 'Arion Alexandrite Lazer',
      marka: 'Arion',
      rozet: 'Tek Yetkili Türkiye Distribütörü',
      vitrin: true,
      one_cikan: '755 nm Alexandrite',
      etiketler: ['Alexandrite', '755 nm', 'Vasküler', 'Pigmente'],
      hedef: 'Yüksek hasta sirkülasyonlu klinik ve medikal estetik merkezleri',
      neden:
        'Tek platformda epilasyon, vasküler ve pigmente lezyon tedavisi; opsiyonel başlıklarla tedavi menüsünü genişletir.',
    },
    'light-age-epicare-lpx': {
      kategori: 'epilasyon',
      ad: 'Light Age Epicare LPX',
      marka: 'Light Age',
      rozet: 'ABD Üretimi',
      vitrin: true,
      one_cikan: '100 W Alexandrite',
      etiketler: ['Alexandrite', '755 nm', '700 J/cm²', 'ABD'],
      hedef: 'Referans kalite arayan hastane ve büyük klinikler',
      neden:
        'ABD üretimi long pulse Alexandrite platformu; LP ve LPX seçenekleriyle güç ihtiyacına göre ölçeklenir.',
    },
    'light-age-epicare-duo': {
      kategori: 'epilasyon',
      ad: 'Light Age Epicare DUO',
      marka: 'Light Age',
      rozet: 'Çift Dalga Boyu',
      vitrin: true,
      one_cikan: '755 + 1064 nm',
      etiketler: ['Alexandrite', 'Nd:YAG', 'Çift Platform', 'ABD'],
      hedef: 'Tüm cilt tiplerine hizmet veren hastane ve klinikler',
      neden:
        'Alexandrite ve Nd:YAG tek gövdede; açık ciltten koyu cilde kadar tüm Fitzpatrick aralığını tek yatırımla karşılar.',
    },
    'epicare-zenith': {
      kategori: 'epilasyon',
      ad: 'EpiCare Zenith',
      marka: 'Light Age',
      rozet: 'Akıllı Arayüz',
      one_cikan: '2500 J/cm² Fluens',
      etiketler: ['Alexandrite', '755 nm', 'Bağlantılı'],
      hedef: 'Yüksek hacimli epilasyon merkezleri',
      neden:
        'Kablosuz bağlantılı akıllı arayüz ve 1.5–40 mm başlık aralığıyla protokol yönetimini kolaylaştırır.',
    },
    noblex: {
      kategori: 'epilasyon',
      ad: 'Noblex',
      marka: 'FineMEC',
      rozet: 'Kore Üretimi',
      one_cikan: 'Triple Pulse',
      etiketler: ['Alexandrite', '755 nm', '80 J'],
      hedef: 'Güzellik salonları ve orta ölçekli klinikler',
      neden:
        'Kore’nin köklü lazer üreticilerinden FineMEC imzalı long pulse Alexandrite; triple pulse ile konforlu uygulama.',
    },
    nobleen: {
      kategori: 'epilasyon',
      ad: 'Nobleen',
      marka: 'FineMEC',
      rozet: 'Çift Dalga Boyu',
      vitrin: true,
      one_cikan: '755 + 1064 nm',
      etiketler: ['Alexandrite', 'Nd:YAG', 'Vasküler', 'Fraksiyonel'],
      hedef: 'Tedavi menüsünü genişletmek isteyen klinikler',
      neden:
        'Epilasyondan vasküler lezyona kadar çoklu tedavi; opsiyonel fraksiyonel el aletiyle cilt yenileme de ekler.',
    },
    'elazer-plus': {
      kategori: 'epilasyon',
      ad: 'Elazer Plus',
      marka: 'Estezone',
      rozet: 'Değiştirilebilir Başlık',
      one_cikan: '3 Dalga Boyu Mix',
      etiketler: ['755 nm', '808 nm', '1064 nm', 'Sessiz'],
      hedef: 'Konfor ve çok yönlülük arayan salon ve klinikler',
      neden:
        'Alexandrite + Diode + Nd:YAG mix atış, sessiz çalışma ve bölgeye göre değiştirilebilir aplikatör sistemi.',
    },
    elazer: {
      kategori: 'epilasyon',
      ad: 'Elazer',
      marka: 'Estezone',
      rozet: 'Giriş Seviyesi Mix',
      one_cikan: '3 Dalga Boyu',
      etiketler: ['755 nm', '808 nm', '1064 nm'],
      hedef: 'İlk profesyonel cihazını alan işletmeler',
      neden:
        'Üç dalga boyunu erişilebilir bir yatırımla sunar; dört kademeli soğutma ile uzun seanslarda kararlı çalışır.',
    },
    'epizone-mix-diode-lazer': {
      kategori: 'epilasyon',
      ad: 'Epizone Mix Diode Lazer',
      marka: 'Estezone',
      rozet: 'Mix Atış',
      one_cikan: '3300 W Güç',
      etiketler: ['Mix Atış', '12" Dokunmatik', 'Diode'],
      hedef: 'Yoğun seans temposu olan epilasyon merkezleri',
      neden:
        'En çok kullanılan üç dalga boyu tek başlıkta; 12 inç dokunmatik arayüzle operatör eğitimi kısalır.',
    },

    // ——— CİLT & MEDİKAL ESTETİK ———
    'cotra-plus-co2': {
      kategori: 'cilt',
      ad: 'Cotra Plus CO2',
      marka: 'Cotra',
      rozet: 'Fraksiyonel CO2',
      vitrin: true,
      one_cikan: '10.600 nm · 50 W',
      etiketler: ['Fraksiyonel CO2', 'Cerrahi', 'Jinekolojik'],
      hedef: 'Dermatoloji, plastik cerrahi ve medikal estetik klinikleri',
      neden:
        'Cerrahi, zoom, fraksiyonel ve kozmetik modlarıyla tek cihazda dört ayrı tedavi hattı açar.',
    },
    'lucid-q-ptp': {
      kategori: 'cilt',
      ad: 'Lucid Q-PTP',
      marka: 'Lucid',
      rozet: 'Q-Switched Nd:YAG',
      vitrin: true,
      one_cikan: '1064 / 532 nm',
      etiketler: ['Q-Switched', 'Dövme Silme', 'Leke'],
      hedef: 'Leke ve dövme silme hattı kuran klinikler',
      neden:
        'PTP teknolojisiyle enerjiyi iki darbede ileterek yüksek etkinliği düşük cilt hasarı riskiyle birleştirir.',
    },
    picozone: {
      kategori: 'cilt',
      ad: 'PicoZone',
      marka: 'Estezone',
      rozet: 'Pikosaniye',
      vitrin: true,
      one_cikan: '750 ps Darbe',
      etiketler: ['Pikosaniye', 'Leke', 'Dövme', 'Melazma'],
      hedef: 'Premium leke ve dövme tedavisi sunan merkezler',
      neden:
        'Pikosaniye darbe genişliği pigmenti geleneksel Q-switched lazerden çok daha küçük parçalara ayırır; seans sayısı düşer.',
    },
    'modula-bbl': {
      kategori: 'cilt',
      ad: 'Modula BBL',
      marka: 'Wavemed',
      rozet: 'İtalyan Üretimi',
      one_cikan: '100.000 Atış Lamba',
      etiketler: ['BBL', 'IPL', 'Class IIb', 'CE 1936'],
      hedef: 'Cilt tonu ve doku protokolü kuran klinikler',
      neden:
        'Estetik ve medikal ayrı fluens seviyeleri, 100.000 atışlık lamba ömrüyle sarf maliyetini öngörülebilir kılar.',
    },
    goldzone: {
      kategori: 'cilt',
      ad: 'GoldZone',
      marka: 'Estezone',
      rozet: 'Vakumlu Altın İğne',
      one_cikan: 'RF Mikro İğneleme',
      etiketler: ['Altın İğne', 'RF', 'Vakum', '0.4–4 mm'],
      hedef: 'Ağrısız iğneleme protokolü arayan merkezler',
      neden:
        'Vakum desteği iğnelerin cilt altına daha az ağrıyla ulaşmasını sağlar; fraksiyonel ve mikro iğneleme başlıkları birlikte gelir.',
    },
    rfyne: {
      kategori: 'cilt',
      ad: 'RFYNE',
      marka: 'RFYNE',
      rozet: 'İtalyan Estetiği',
      one_cikan: 'Yeni Nesil RF',
      etiketler: ['Radyofrekans', 'Altın İğne', 'İtalya'],
      hedef: 'Premium konumlanan medikal estetik klinikleri',
      neden:
        'Radyofrekans altın iğne teknolojisinde İtalyan tasarımı ve yeni nesil başlık mimarisi.',
    },
    'utims-centerless': {
      kategori: 'cilt',
      ad: 'UTIMS Centerless',
      marka: 'UTIMS',
      rozet: 'LIFU & HIFU',
      vitrin: true,
      one_cikan: 'Centerless Kartuş',
      etiketler: ['HIFU', 'LIFU', 'Yüz Germe', 'Sıkılaştırma'],
      hedef: 'Cerrahisiz germe protokolü sunan klinikler',
      neden:
        'Centerless kartuş mimarisi ile odaklı ultrasonu daha homojen dağıtır; cilt sıkılaştırma ve yüz germede cerrahisiz alternatif.',
    },
    hydrabeauty: {
      kategori: 'cilt',
      ad: 'HydraBeauty',
      marka: 'Estezone',
      rozet: '9-in-1 Platform',
      one_cikan: '9-in-1 Bakım',
      etiketler: ['HydraFacial', 'Peeling', 'Oksijen', 'PDT'],
      hedef: 'Bakım hattını hızla kuran salon ve klinikler',
      neden:
        'Dokuz farklı başlık tek gövdede; bakım menüsünü tek yatırımla kurmak isteyen işletmeler için giriş noktası.',
    },
    aileen: {
      kategori: 'cilt',
      ad: 'Aileen',
      marka: 'FineMEC',
      rozet: 'Genesis Tekniği',
      one_cikan: '1064 nm Nd:YAG',
      etiketler: ['Nd:YAG', 'Genesis', 'Tüm Cilt Tipleri'],
      hedef: 'Koyu cilt tiplerine de hizmet veren merkezler',
      neden:
        '0,3 ms darbe genişliğiyle Genesis tekniği; tüm cilt tiplerinde acısız ve etkili uygulama.',
    },

    // ——— VÜCUT ŞEKİLLENDİRME & ZAYIFLAMA ———
    't-shape-2': {
      kategori: 'vucut',
      ad: 'T-Shape 2',
      marka: 'Baldan Group',
      rozet: 'FDA 510(k) K231092',
      vitrin: true,
      one_cikan: '5 Teknoloji Bir Arada',
      etiketler: ['Radyofrekans', 'LLLT', 'Vakum', 'Mesoterapi', 'İtalya'],
      hedef: 'Kombine protokol kuran premium merkezler',
      neden:
        'Bipolar RF, LLLT lazer, dinamik vakum, mesosporasyon ve mesosphere tek platformda; FDA 510(k) belgeli.',
    },
    'estesculpt-pro': {
      kategori: 'vucut',
      ad: 'EsteSculpt Pro',
      marka: 'Estezone',
      rozet: 'HI-EMT + RF',
      vitrin: true,
      one_cikan: '7 Tesla · 3000 W',
      etiketler: ['HI-EMT', 'Radyofrekans', 'Kas Uyarımı'],
      hedef: 'Kas + yağ protokolünü birlikte satan merkezler',
      neden:
        'HI-EMT kas uyarımını radyofrekansla birleştirir; tek seansta hem yağ hem kas hedeflenir.',
    },
    'estesculpt-vudut-sekillendirme-cihazi': {
      kategori: 'vucut',
      ad: 'EsteSculpt',
      marka: 'Estezone',
      rozet: 'HI-EMT',
      one_cikan: '30 Dakikada Yoğun Kasılma',
      etiketler: ['HIEMT', '7 Tesla', '3 Mod'],
      hedef: 'Vücut şekillendirme hattına giriş yapan işletmeler',
      neden:
        'Elektromanyetik alan motor sinir hücrelerini hedefleyerek genel egzersizde ulaşılamayan kasılma yoğunluğu üretir.',
    },
    'esteslim-zayiflama-cihazi': {
      kategori: 'vucut',
      ad: 'EsteSlim',
      marka: 'Estezone',
      rozet: 'Soğuk Lipoliz',
      vitrin: true,
      one_cikan: '4 Farklı Başlık',
      etiketler: ['Kriyolipoliz', 'Vakum', 'Apoptoz'],
      hedef: 'Bölgesel incelme talebi yüksek merkezler',
      neden:
        'Yağ hücrelerini dondurarak apoptoza uğratır; üç ayrı başlık boyutuyla farklı bölgelere uyum sağlar.',
    },
    'esteslim-mix': {
      kategori: 'vucut',
      ad: 'EsteSlim Mix',
      marka: 'Estezone',
      rozet: '3 Teknoloji',
      one_cikan: 'Lipoliz + RF + Kavitasyon',
      etiketler: ['Kriyolipoliz', 'RF', 'Kavitasyon'],
      hedef: 'Tek cihazda kombine protokol isteyen işletmeler',
      neden:
        'Soğuk lipoliz, radyofrekans ve kavitasyonu tek gövdede toplayarak seans başına ciro potansiyelini artırır.',
    },
    endoterapylazer: {
      kategori: 'vucut',
      ad: 'MedArt EndoTerapyLazer',
      marka: 'MedArt',
      rozet: 'Tek Seans Sonuç',
      vitrin: true,
      one_cikan: '1470 nm Endolazer',
      etiketler: ['Endolazer', '1470 nm', 'Sarkma', 'Kontur'],
      hedef: 'Cerrahi ve medikal estetik klinikleri',
      neden:
        'Cilt altına fiberle girerek sarkma ve elastikiyet kaybını tek seansta hedefler; 400–1000 µm fiber seçenekleri.',
    },
    'medart-smartsculpt-endolazer': {
      kategori: 'vucut',
      ad: 'MedArt SmartSculpt Endolazer',
      marka: 'MedArt',
      rozet: 'Kontur & Lipoliz',
      one_cikan: '1470 nm · 15 W',
      etiketler: ['Endolazer', 'Lipoliz', 'Kontur'],
      hedef: 'Cerrahi destekli vücut kontur uygulamaları',
      neden:
        'Kesintisiz diode lazerle cilt altı lipoliz ve kontur; 0,3–100 Hz frekans aralığında hassas kontrol.',
      // NOT: mevcut sitede endoterapylazer ile birebir aynı içerik — birleştirme adayı
      birlesme_adayi: 'endoterapylazer',
    },

    // ——— SOĞUTMA & AKSESUAR ———
    'zimmer-cryo-6-cilt-sogutma-sistemi': {
      kategori: 'destek',
      ad: 'Zimmer Cryo 6',
      marka: 'Zimmer',
      rozet: 'Alman Üretimi',
      vitrin: true,
      one_cikan: '-30 °C Soğuk Hava',
      etiketler: ['Soğutma', 'Class IIa', 'Almanya'],
      hedef: 'Konforu farklılaştırıcı olarak satan tüm merkezler',
      neden:
        'Alman üretimi soğutma sistemi; -30 °C hava ile lazer ve IPL uygulamalarında hasta konforunu belirgin yükseltir.',
    },
    epicool: {
      kategori: 'destek',
      ad: 'EpiCool',
      marka: 'Estezone',
      rozet: 'Ekonomik Soğutma',
      one_cikan: '-15 / -21 °C',
      etiketler: ['Soğutma', '1000 l/dk', 'Class I'],
      hedef: 'Soğutmayı standarda taşımak isteyen işletmeler',
      neden:
        'Erişilebilir yatırımla uygulama konforunu yükseltir; 1000 l/dk hava debisiyle uzun seanslara uygun.',
    },
    'lazer-epilasyon-gozlugu': {
      kategori: 'destek',
      ad: 'Lazer Koruyucu Gözlük',
      marka: 'Estezone',
      rozet: 'Dalga Boyuna Özel',
      one_cikan: '5 Farklı Koruma',
      etiketler: ['755/808 nm', '1064 nm', '10600 nm', 'IPL'],
      hedef: 'Her lazer kullanan işletme — zorunlu güvenlik ekipmanı',
      neden:
        'Her dalga boyu farklı filtre gerektirir; cihaz envanterinize birebir uyan gözlük seti.',
    },
  },
};
