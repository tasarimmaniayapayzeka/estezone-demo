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
  b.push('SİTE SAYFALARI: index.html, cihazlar.html, kategori/lazer-epilasyon.html, kategori/cilt-medikal-estetik.html, kategori/vucut-sekillendirme.html, kategori/sogutma-aksesuar.html, teknik-servis.html, kiralama-ikinci-el.html, cihaz-secim-danismani.html, yatirim-hesaplayici.html, karsilastir.html, teknik-matris.html, hakkimizda.html, iletisim.html');
  return b.join('\n');
}

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

ÜSLUP: Türkçe, kısa ve net. En fazla 4-5 cümle. Samimi ama profesyonel; abartılı satış dili yok. Cihaz önerirken adını ve markasını yaz. İlgili site sayfası varsa yolunu ver (ör. cihazlar.html).

BİLGİ TABANI:
${bilgiTabani()}`;
}

module.exports = { bilgiTabani, sistemPromptu, CIHAZLAR };
