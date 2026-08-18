/* ==========================================================================
   AI ASİSTAN BİLGİ TABANI
   Botun konuşabileceği TÜM gerçekler burada üretilir. Amaç: modelin
   uydurmasını engellemek. Prompt'a giren her cümlenin kaynağı veri/icerik.js
   veya veri/cihazlar.json — serbest metin YOK.

   Token bütçesi: cihaz listesi tek satır/cihaz (~28 satır), kurumsal bilgi
   kısa maddeler. Toplam ~2.5k token; her mesajda gönderilir.
   ========================================================================== */
const icerik = require('../veri/icerik.js');
const cihazlarHam = require('../veri/cihazlar.json');

const CIHAZLAR = Array.isArray(cihazlarHam)
  ? cihazlarHam
  : cihazlarHam.cihazlar || Object.values(cihazlarHam)[0];

const { marka, iletisim, servisler, surec, garanti, yetkiler, sss, referanslar } = icerik;

/* Cihaz satırı: bot bir cihaz önerirken doğru slug/URL ve doğru yetki
   sınıfını verebilsin diye tek satırda toplanır. */
function cihazSatiri(c) {
  const yetki = icerik.cihazYetkisi(c.slug, c.kategori);
  const teknik = (c.spec || [])
    .slice(0, 4)
    .map((s) => `${s.ad}: ${s.deger}`)
    .join('; ');
  return [
    `- ${c.ad} (${c.marka})`,
    `kategori=${c.kategoriAd}`,
    `yetki=${yetkiler[yetki].kisa}`,
    `öne çıkan=${c.oneCikan}`,
    c.rozet ? `rozet=${c.rozet}` : '',
    `etiket=${(c.etiketler || []).join('/')}`,
    teknik ? `teknik=${teknik}` : '',
    `url=cihaz/${c.slug}.html`,
  ]
    .filter(Boolean)
    .join(' | ');
}

function bilgiTabani() {
  const b = [];
  b.push(`FİRMA: ${marka.ad} — ${marka.slogan}`);
  b.push(marka.aciklama);
  b.push('');
  b.push('OFİSLER:');
  iletisim.ofisler.forEach((o) => b.push(`- ${o.ad}: ${o.adres} (${o.rol})`));
  b.push(`Telefon: ${iletisim.telefon} | WhatsApp: ${iletisim.whatsapp || iletisim.telefon} | E-posta: ${iletisim.eposta}`);
  b.push('');
  b.push('İŞLETME TÜRÜ / BULUNDURMA YETKİSİ (ön bilgilendirme, kesin durum ÜTS kaydı ve ruhsat tipiyle teyit edilir):');
  Object.values(yetkiler).forEach((y) => b.push(`- ${y.ad}: ${y.aciklama}`));
  b.push('');
  b.push(`PORTFÖY — ${CIHAZLAR.length} cihaz:`);
  CIHAZLAR.forEach((c) => b.push(cihazSatiri(c)));
  b.push('');
  b.push('TEKNİK SERVİS (kendi atölyemiz, bizden alınmayan cihazlar dahil):');
  servisler.forEach((s) => b.push(`- ${s.ad}: ${s.ozet}`));
  b.push('');
  b.push('SATIN ALMA SÜRECİ:');
  surec.forEach((s) => b.push(`- ${s.no} ${s.ad}: ${s.metin}`));
  b.push('');
  b.push(`GARANTİ — ${garanti.baslik} (${garanti.not})`);
  (garanti.maddeler || []).forEach((m) => b.push(`- ${m.ad}: ${m.deger}${m.ek ? ' — ' + m.ek : ''}`));
  b.push('');
  b.push('EDİNİM SEÇENEKLERİ: peşin satın alma, taksit/finansman, kiralama, kontrollü ikinci el (atölyeden geçmeden teslim edilmez; atış sayısı ve lamba ömrü yazılı beyan edilir), takas (marka bağımsız).');
  b.push('');
  b.push('SIK SORULANLAR:');
  sss.forEach((q) => b.push(`- S: ${q.s}\n  C: ${q.c}`));
  if (referanslar) {
    b.push('');
    b.push('REFERANS ÖRNEKLERİ (temsilî, kurumsal — hasta bilgisi DEĞİL):');
    referanslar.vakalar.forEach((v) => b.push(`- ${v.tip} / ${v.sehir}: ${v.baslik} — ${v.olcut}`));
  }
  b.push('');
  b.push('SİTE HARİTASI — her satır: yol | sayfada ne var | kullanıcı ne sorunca buraya yönlendir');
  SITE_HARITASI.forEach((s) => b.push(`- ${s[0]} | ${s[1]} | ${s[2]}`));
  return b.join('\n');
}

/* Botun sayfa bilgisi. Yalnız ad listesi vermek yetmiyordu — model hangi
   sayfanın ne işe yaradığını bilmeden yönlendiremiyor. Üç sütun: yol,
   içerik, hangi soruda kullanılacağı. Yeni sayfa eklenince BURAYA da eklenir. */
const SITE_HARITASI = [
  ['index.html', 'Ana sayfa: vitrin, kategoriler, süreç, sık sorulanlar', 'genel tanıtım, "neler yapıyorsunuz"'],
  ['hakkimizda.html', 'Firma, ekip, yetki belgeleri, çalışma ilkeleri, ofisler', '"kimsiniz", "kaç yıldır", "belgeleriniz"'],
  ['cihazlar.html', '28 cihazın tamamı; arama, kategori ve işletme türü filtresi', '"tüm cihazlar", "listeyi göreyim"'],
  ['kategori/lazer-epilasyon.html', 'Alexandrite, diyot ve Nd:YAG epilasyon platformları', 'epilasyon cihazı soruları'],
  ['kategori/cilt-medikal-estetik.html', 'CO2, pikosaniye, BBL, HIFU, altın iğne cihazları', 'cilt yenileme, leke, iz, dövme silme'],
  ['kategori/vucut-sekillendirme.html', 'Soğuk lipoliz, HI-EMT, endolazer, RF platformları', 'zayıflama, vücut şekillendirme, selülit'],
  ['kategori/sogutma-aksesuar.html', 'Soğutma sistemleri ve koruyucu ekipman', 'soğutucu, gözlük, aksesuar'],
  ['teknik-servis.html', 'Sekiz servis kalemi, önleyici bakım, yedek parça, servis formu', '"cihazım bozuldu", arıza, bakım, parça, kalibrasyon'],
  ['kiralama-ikinci-el.html', 'Aylık kiralama ve kontrolden geçmiş ikinci el cihazlar', '"kiralık var mı", "ikinci el", düşük bütçe'],
  ['cihaz-secim-danismani.html', '3 soruda uygun platformu öneren araç', '"hangi cihazı almalıyım", kararsızlık'],
  ['yatirim-hesaplayici.html', 'Cihazın kaç ayda kendini ödediğini hesaplayan araç', 'geri dönüş, amortisman, "kâr eder mi", fiyat sorusu'],
  ['karsilastir.html', 'Üç cihazı yan yana koyan karşılaştırma aracı', '"X ile Y arasındaki fark"'],
  ['teknik-matris.html', '28 cihaz tek tabloda; dalga boyu ve teknik değerler, sıralanabilir', 'dalga boyu, spot, fluens, teknik değer karşılaştırma'],
  ['blog.html', 'Cihaz seçimi, teknoloji, servis ve işletme ekonomisi yazıları', '"yazılarınız", derinlemesine bilgi isteği'],
  ['blog/lazer-epilasyon-cihazi-secerken.html', 'Epilasyon cihazında bakılacak 7 teknik kalem, kontrol tablosu', 'satın alma kriterleri, nelere dikkat etmeliyim'],
  ['blog/alexandrite-mi-diode-mu.html', 'Cilt fototipine göre dalga boyu seçimi', '"alexandrite mi diyot mu", cilt tipi/dalga boyu'],
  ['blog/ikinci-el-lazer-cihazi-riskleri.html', 'İkinci el alırken sorulacak 5 soru', 'ikinci el riski, atış sayısı, lamba ömrü'],
  ['blog/cihaz-yatirimi-geri-donus.html', 'Geri dönüş modeli nasıl kurulur', 'yatırım hesabı, doluluk, gider payı'],
  ['blog/lazer-cihazi-bakim-takvimi.html', 'Arızayı önleyen periyodik bakım takvimi', 'bakım sıklığı, önleyici bakım'],
  ['blog/soguk-lipoliz-mi-hiemt-mi.html', 'Yağ hücresi mi kas mı hedeflenir; iki yaklaşımın farkı', 'soğuk lipoliz, HI-EMT, vücut şekillendirme seçimi'],
  ['iletisim.html', 'Teklif/demo/servis formu, ofis adresleri, harita, WhatsApp', 'teklif, randevu, adres, "nasıl ulaşırım"'],
  ['kvkk.html', 'KVKK aydınlatma metni', 'veri işleme, kişisel veri soruları'],
  ['gizlilik.html', 'Gizlilik politikası', 'gizlilik soruları'],
  ['cerez.html', 'Çerez politikası', 'çerez soruları'],
];

/* Sistem promptu — mevzuat kalkanı burada. Sağlık tanıtım mevzuatı (12.11.2025
   tarihli Tanıtım Yönetmeliği) ve Tıbbi Cihaz Satış Yönetmeliği gereği:
   fiyat verilmez, tıbbi tavsiye/teşhis yapılmaz, üstünlük iddiası kurulmaz. */
function sistemPromptu() {
  return `Sen ${marka.ad} firmasının web sitesindeki CİHAZ ASİSTANISIN. Görevin: estetik cihaz satın almayı düşünen işletme sahiplerine (salon, güzellik merkezi, poliklinik, hastane) portföy, teknik özellikler, servis kapsamı ve süreç hakkında yardımcı olmak.

MUTLAK KURALLAR — istisnası yoktur:
1. TIBBİ TAVSİYE YASAK. Kişiye yönelik teşhis, tedavi önerisi, "sizin cildinize şu iyi gelir" türü değerlendirme YAPMA. Böyle bir soru gelirse kibarca reddet ve hekime/kliniğe yönlendir. Hasta değil, İŞLETME muhatabınsın.
2. FİYAT VERME. Hiçbir cihaz için rakam, aralık, "yaklaşık şu kadar" söyleme. Sebebi: fiyat konfigürasyona göre değişir ve mevzuat gereği sitede yayınlanmaz. Fiyat sorulursa teklif formuna (iletisim.html) ve yatırım hesaplayıcıya (yatirim-hesaplayici.html) yönlendir.
3. UYDURMA. Aşağıdaki BİLGİ TABANI'nda olmayan hiçbir cihaz, teknik değer, süre, sayı veya taahhüt söyleme. Bilmiyorsan "bu bilgi bende yok, teklif aşamasında netleştirelim" de.
4. ÜSTÜNLÜK İDDİASI KURMA. "En iyi", "rakipsiz", "kesin sonuç" gibi ifadeler kullanma. Rakip firma/marka karşılaştırması yapma.
5. YETKİ UYARISI. Bir cihaz önerirken o cihazın hangi işletme türünde bulundurulabileceğini mutlaka belirt ve bunun ön bilgilendirme olduğunu, kesin durumun ÜTS kaydı ve ruhsat tipiyle teyit edileceğini ekle.

ÜSLUP: Türkçe, kısa ve net. En fazla 4-5 cümle. Samimi ama profesyonel; abartılı satış dili yok. Cihaz önerirken adını ve markasını yaz.

YÖNLENDİRME: Aşağıdaki SİTE HARİTASI'nı ezbere bil. Her cevabın sonunda, sorunun karşılığı olan sayfanın yolunu ver (ör. teknik-servis.html, blog/alexandrite-mi-diode-mu.html). Yalnızca haritada YAZAN yolları kullan — sayfa adı UYDURMA. Kullanıcı "hangi sayfaya bakayım", "nerede yazıyor" gibi bir şey sorarsa doğrudan yolu söyle. Cihaz sayfaları için yol biçimi: cihaz/<slug>.html (slug'lar aşağıdaki cihaz listesinde).

BİLGİ TABANI:
${bilgiTabani()}`;
}

module.exports = { bilgiTabani, sistemPromptu, CIHAZLAR };
