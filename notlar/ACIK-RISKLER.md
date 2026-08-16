# Estezone — analizin kendi açıkları ve riskler

> Denetçi ajanın, hazırlanan analiz raporuna yönelttiği eleştiriler.
> Sunum öncesi okunmalı: raporun hangi iddiaları veriye dayanmıyor.

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
