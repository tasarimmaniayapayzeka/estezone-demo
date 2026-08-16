// Kurumsal içerik. Mevcut sitede bu sayfalar neredeyse boştu (hakkımızda 56, hizmetler 43, iletişim 54 kelime).
// Buradaki metinler kaynak sitedeki DOĞRULANMIŞ olgulara dayanır; uydurma rakam yoktur.

module.exports = {
  marka: {
    ad: 'Estezone Medikal',
    kisaAd: 'Estezone',
    slogan: 'Lazer teknolojisinde 20 yıllık mühendislik',
    vaat:
      'FDA ve CE belgeli estetik cihaz platformlarını, kurulumdan yedek parçaya kadar kendi teknik servisiyle ayakta tutan tedarikçi.',
    aciklama:
      'Estezone Medikal; hastane, klinik, medikal estetik merkezi ve güzellik salonlarına lazer epilasyon, cilt ve vücut şekillendirme cihazları tedarik eder. 20 yılı aşkın süredir aynı alanda çalışır.',
  },

  iletisim: {
    telefon: '+90 312 466 66 86',
    telefonHam: '+903124666686',
    whatsapp: '+90 539 841 05 85',
    whatsappHam: '905398410585',
    eposta: 'info@estezone.com.tr',
    ofisler: [
      {
        ad: 'Ankara — Merkez',
        adres: 'Mutlukent Mah. Angora Bulvarı No:42 Beysukent, 06810 Çankaya / Ankara',
        rol: 'Genel merkez, teknik servis atölyesi ve cihaz showroom',
        birincil: true,
      },
      {
        ad: 'İstanbul — Bölge Ofisi',
        adres:
          'Brandium Residence, Küçükbakkalköy, Dudullu Cd. No:23 R2 Blok Kat:28 Daire:256 Ataşehir / İstanbul',
        rol: 'Marmara bölgesi satış ve demo randevuları',
        birincil: false,
      },
    ],
    sosyal: [
      { ad: 'Instagram', url: 'https://www.instagram.com/estezonemedikal/' },
      { ad: 'YouTube', url: 'https://www.youtube.com/@estezonemedikal' },
      { ad: 'Facebook', url: 'https://www.facebook.com/estezonemedikal' },
    ],
  },

  // Ana sayfa güven şeridi — hepsi kaynak siteden doğrulanabilir olgular
  guven: [
    { sayi: '20+', etiket: 'yıllık sektör tecrübesi' },
    { sayi: '28', etiket: 'aktif cihaz platformu' },
    { sayi: '2', etiket: 'ofis: Ankara & İstanbul' },
    { sayi: 'Kendi', etiket: 'teknik servis atölyesi' },
  ],

  // Mevcut sitede bu hizmetler yalnızca GÖRSEL içine gömülüydü — metne çevrildi
  servisler: [
    {
      slug: 'pompa-hazne-degisimi',
      ad: 'Pompa ve Hazne Değişimi',
      ozet:
        'Lazer kavitesinin kalbi olan pompa haznesinin değişimi ve sonrasında enerji kalibrasyonu.',
      detay:
        'Hazne yorulması atış enerjisinde sessiz bir düşüşe yol açar; cihaz çalışmaya devam eder ama seans sonucu bozulur. Değişim sonrası enerji ölçümü yapılır ve protokol değerleri yeniden doğrulanır.',
    },
    {
      slug: 'flash-lamba-degisimi',
      ad: 'Flash Lamba Değişimi',
      ozet: 'Alexandrite ve Nd:YAG sistemlerinde ömrünü dolduran flash lambaların değişimi.',
      detay:
        'Lamba ömrü atış sayısına bağlıdır. Planlı değişim, seans ortasında duran bir cihazdan çok daha ucuzdur; değişim sonrası atış testi ve enerji doğrulaması yapılır.',
    },
    {
      slug: 'optik-lens-degisimi',
      ad: 'Optik Lens ve Ayna Değişimi',
      ozet: 'Kirlenen, çatlayan veya kaplaması bozulan optik yüzeylerin değişimi ve hizalama.',
      detay:
        'Optik yol üzerindeki en küçük bozulma bile spot homojenliğini kaybettirir. Değişim sonrası optik hizalama yapılır ve spot profili kontrol edilir.',
    },
    {
      slug: 'fiber-optik-onarim',
      ad: 'Fiber Optik Onarımı',
      ozet: 'Kopan veya yanan fiber optik hatlarının onarımı ve uç işleme.',
      detay:
        'Endolazer ve diode sistemlerinde fiber, en sık yenilenen parçadır. Uç işleme ve iletim testi ile fiberin gerçek çıkış gücü ölçülerek teslim edilir.',
    },
    {
      slug: 'guc-kaynagi-servisi',
      ad: 'Güç Kaynağı Servisi',
      ozet: 'Yüksek gerilim güç kaynağı ve kondansatör gruplarının onarımı.',
      detay:
        'Şebeke dalgalanması ve topraklama sorunları güç kaynağını yorar. Onarım sonrası yük testi yapılır; tesisat kaynaklı sorun varsa raporlanır.',
    },
    {
      slug: 'diode-lazer-onarim',
      ad: 'Diode Lazer Onarımı',
      ozet: 'Diode bar ve başlık arızalarının onarımı, güç düşüşü teşhisi.',
      detay:
        'Diode başlıklarda güç kaybı çoğu zaman kademeli ilerler. Ölçümlü teşhis ile başlığın yenilenmesi mi yoksa onarımının mı ekonomik olduğu net söylenir.',
    },
    {
      slug: 'sogutma-sistemi-bakimi',
      ad: 'Soğutma Sistemi Bakımı',
      ozet: 'Su/hava soğutma devrelerinin bakımı, sızdırmazlık ve debi kontrolü.',
      detay:
        'Lazer arızalarının önemli bölümü aslında soğutma arızasıdır. Periyodik bakım, çok daha pahalı kavite ve başlık arızalarını önler.',
    },
    {
      slug: 'yedek-parca',
      ad: 'Yedek Parça Tedariki',
      ozet: 'Platform bağımsız yedek parça temini ve stoktan sevkiyat.',
      detay:
        'Sadece sattığımız cihazlar için değil, sahadaki farklı marka sistemler için de parça tedarik ederiz. Envanterinizi bize bildirin, kritik parçalar için stok önerisi çıkaralım.',
    },
  ],

  // Satın alma süreci — B2B karar yolculuğu
  surec: [
    {
      no: '01',
      ad: 'İhtiyaç Analizi',
      metin:
        'İşletme tipiniz, hedef hasta profiliniz, mevcut cihaz envanteriniz ve günlük seans hacminiz konuşulur. Doğru cihaz, en pahalı cihaz değildir.',
    },
    {
      no: '02',
      ad: 'Demo ve Uygulama',
      metin:
        'Cihazı showroom’da veya kendi merkezinizde görürsünüz. Uygulamayı operatörünüz yapar; sonucu kendi hastanızda değerlendirirsiniz.',
    },
    {
      no: '03',
      ad: 'Teklif ve Finansman',
      metin:
        'Cihaz, sarf, eğitim ve garanti tek teklifte netleşir. Peşin, taksit ve kiralama seçenekleri ayrı ayrı hesaplanır.',
    },
    {
      no: '04',
      ad: 'Kurulum ve Eğitim',
      metin:
        'Elektrik ve topraklama kontrolüyle kurulum yapılır. Operatör eğitimi, protokol kartları ve güvenlik brifingi teslim edilir.',
    },
    {
      no: '05',
      ad: 'Servis ve Süreklilik',
      metin:
        'Periyodik bakım takvimi kurulur. Arıza halinde kendi atölyemiz devreye girer; yedek parça stoktan çıkar.',
    },
  ],

  // Neden Estezone — farklılaştırıcılar
  farklar: [
    {
      baslik: 'Kendi teknik servis atölyemiz',
      metin:
        'Cihazı satıp çekilen değil, arızasını kendi atölyesinde onaran tedarikçiyiz. Pompa haznesinden fiber optiğe kadar müdahale bizde biter.',
      ikon: 'servis',
    },
    {
      baslik: 'Platform bağımsız yedek parça',
      metin:
        'Bizden almadığınız cihazlar için de parça tedarik ederiz. Sahada yıllardır duran bir sistem, doğru parçayla yeniden gelir kazandırır.',
      ikon: 'parca',
    },
    {
      baslik: 'Tek yetkili distribütörlükler',
      metin:
        'Arion Alexandrite gibi platformlarda Türkiye tek yetkili distribütörüyüz. Parça ve teknik destek doğrudan üreticiden gelir.',
      ikon: 'yetki',
    },
    {
      baslik: 'Belgeli teknoloji',
      metin:
        'Portföyümüzde FDA 510(k) ve CE sınıflandırması belgeli platformlar yer alır. Belge numarası sorulduğunda gösterilir.',
      ikon: 'belge',
    },
  ],

  sss: [
    {
      s: 'Cihaz fiyatlarını neden sitede yayınlamıyorsunuz?',
      c: 'Bir cihazın gerçek maliyeti; başlık konfigürasyonu, sarf paketi, eğitim, garanti süresi ve kurulum koşullarına göre değişir. Aynı cihaz iki işletmeye farklı paketle çıkar. Bu yüzden fiyatı listelemek yerine, envanterinize göre net bir teklif hazırlıyoruz.',
    },
    {
      s: 'Cihazı satın almadan deneyebilir miyim?',
      c: 'Evet. Ankara showroom’umuzda cihazı görebilir, uygun platformlarda kendi merkezinizde demo talep edebilirsiniz. Uygulamayı sizin operatörünüzün yapması, cihazın günlük iş akışınıza uyup uymadığını en net gösteren yöntemdir.',
    },
    {
      s: 'Kiralama veya ikinci el seçeneğiniz var mı?',
      c: 'Sezonluk yoğunluk ya da yeni şube açılışı gibi durumlar için kiralama, bütçe kısıtı olan işletmeler için kontrollü ikinci el seçenekleri değerlendirilebilir. İkinci el cihazlar atölyemizden geçmeden teslim edilmez.',
    },
    {
      s: 'Başka markadan aldığım cihaza servis veriyor musunuz?',
      c: 'Veriyoruz. Teknik servisimiz platform bağımsız çalışır; flash lamba, optik, fiber, güç kaynağı ve soğutma sistemi müdahalelerini farklı markalarda da yapıyoruz. Cihazın marka ve model bilgisiyle bize ulaşmanız yeterli.',
    },
    {
      s: 'Kurulum ve operatör eğitimi dahil mi?',
      c: 'Kurulum ve operatör eğitimi teklif kapsamında ayrı kalem olarak gösterilir. Eğitimde cihaz kullanımının yanında güvenlik, cilt tipine göre parametre seçimi ve seans planlaması da anlatılır.',
    },
    {
      s: 'Arıza durumunda ne kadar sürede müdahale ediliyor?',
      c: 'Müdahale süresi cihazın bulunduğu şehre, arızanın tipine ve parçanın stok durumuna göre değişir. Uzaktan teşhisle çözülebilen sorunlarda aynı gün, atölyeye gelmesi gereken arızalarda parça temin süresine bağlı olarak planlama yapılır.',
    },
  ],

  // Yasal — mevcut sitede bu sayfalar var, yenisinde de olacak
  yasal: [
    { slug: 'kvkk', ad: 'KVKK Aydınlatma Metni' },
    { slug: 'gizlilik', ad: 'Gizlilik Politikası' },
    { slug: 'cerez', ad: 'Çerez Politikası' },
  ],
};
