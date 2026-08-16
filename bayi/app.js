/* Estezone Yetkili Ağ Programı — prototip istemci betiği. Dış bağımlılık yok. */
(function () {
  'use strict';

  const $ = (s, k = document) => k.querySelector(s);
  const $$ = (s, k = document) => Array.from(k.querySelectorAll(s));
  const tl = (n) => Math.round(n).toLocaleString('tr-TR');
  const para = (n) => tl(n) + ' ₺';

  /* ------------------------------------------------------------ mobil menü */
  const menuBtn = $('.menu-ac');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const nav = $('.gezinme');
      const acik = nav.classList.toggle('acik');
      menuBtn.setAttribute('aria-expanded', String(acik));
    });
  }

  /* ------------------------------------------------------------ sekmeler */
  $$('.sekme-sar').forEach((sar) => {
    const sekmeler = $$('.sekme', sar);
    sekmeler.forEach((s) => {
      s.addEventListener('click', () => {
        sekmeler.forEach((x) => x.classList.remove('aktif'));
        s.classList.add('aktif');
        const kap = sar.parentElement;
        $$('.sekme-icerik', kap).forEach((i) => i.classList.remove('aktif'));
        const hedef = $('#' + s.dataset.hedef, kap);
        if (hedef) hedef.classList.add('aktif');
      });
    });
  });

  /* =======================================================================
     P1 — BAŞVURU SKORLAMA
     Skor 100 üzerinden: belge 35 · ticari kapasite 25 · deneyim 20 · bölge 20
     ===================================================================== */
  const form = $('#basvuru-form');
  if (form) {
    const BELGE_PUAN = {
      yetki: 14, // satış merkezi yetki belgesi
      uts: 8, // ÜTS kaydı
      satis: 7, // sertifikalı satış ve tanıtım elemanı
      klinik: 4, // klinik destek elemanı
      ruhsat: 2, // işyeri açma ruhsatı
    };
    const BUTCE_PUAN = { '0': 0, '1': 6, '2': 12, '3': 19, '4': 25 };
    const ROL_ESIK = { bayi: 70, merkez: 45, referans: 30 };

    function secimler(ad) {
      return $$(`[data-secim="${ad}"].secili`).map((b) => b.dataset.deger);
    }

    function hesapla() {
      const rol = ($('[data-secim="rol"].secili') || {}).dataset?.deger || 'merkez';
      const tur = $('#f-tur').value;
      const belgeler = secimler('belge');
      const deneyim = +$('#f-deneyim').value;
      const cihaz = +$('#f-cihaz').value;
      const butce = $('#f-butce').value;
      const il = $('#f-il').value;
      const ilDurum = $('#f-il').selectedOptions[0]?.dataset.durum || 'acik';

      /* belge (35) */
      let pBelge = belgeler.reduce((t, b) => t + (BELGE_PUAN[b] || 0), 0);
      /* bölge bayisi yetki belgesi olmadan asla geçemez */
      if (rol === 'bayi' && !belgeler.includes('yetki')) pBelge = Math.min(pBelge, 10);
      pBelge = Math.min(35, pBelge);

      /* ticari kapasite (25) */
      const pTicari = Math.min(25, BUTCE_PUAN[butce] + Math.min(6, cihaz * 1.5));

      /* deneyim (20) */
      const pDeneyim = Math.min(20, deneyim * 2.2 + (tur === 'klinik' || tur === 'tipmerkezi' ? 4 : 0));

      /* bölge uygunluğu (20) */
      let pBolge = ilDurum === 'acik' ? 20 : ilDurum === 'rezerve' ? 9 : 2;
      if (rol === 'referans') pBolge = Math.max(pBolge, 14);

      const toplam = Math.round(pBelge + pTicari + pDeneyim + pBolge);

      /* --- karar --- */
      const engeller = [];
      if (rol === 'bayi' && !belgeler.includes('yetki'))
        engeller.push('Bölge bayiliği için <strong>satış merkezi yetki belgesi</strong> zorunlu — belgesiz başvuru bayi olamaz, aday havuzuna alınır.');
      if (!belgeler.includes('uts'))
        engeller.push('ÜTS kaydı görünmüyor. Tıbbi cihaz satan her noktanın kayıtlı olması gerekir.');
      if (tur === 'salon')
        engeller.push('Güzellik salonu segmentinde cihaz uygunluğu <strong>ön bilgilendirmedir</strong>; katalog filtresi hukuk onayına kadar sınırlı çalışır.');
      if (ilDurum === 'dolu')
        engeller.push('Seçilen bölge kapalı. Komşu il veya farklı katman (uygulama merkezi) önerilir.');
      if (ilDurum === 'rezerve')
        engeller.push('Seçilen bölge için görüşme sürüyor — sıraya alınır, 15 gün içinde netleşir.');

      let kademe, kademeTip, adim;
      if (toplam >= 82) { kademe = 'Altın adayı'; kademeTip = 'altin'; adim = 'Doğrudan bölge müdürü araması + saha demosu'; }
      else if (toplam >= 65) { kademe = 'Gümüş adayı'; kademeTip = 'mavi'; adim = 'Belge kontrolü + 30 dk çevrim içi tanışma'; }
      else if (toplam >= 45) { kademe = 'Bronz adayı'; kademeTip = ''; adim = 'Eğitim programına davet + tekrar değerlendirme'; }
      else { kademe = 'Aday havuzu'; kademeTip = 'kirmizi'; adim = 'Bilgilendirme dizisine alınır, satış ekibine düşmez'; }

      const uygun = toplam >= (ROL_ESIK[rol] || 45);

      /* --- ekrana yaz --- */
      $('#skor-deger').textContent = toplam;
      const cevre = 2 * Math.PI * 40;
      const yay = $('#skor-yay');
      yay.style.strokeDasharray = cevre;
      yay.style.strokeDashoffset = cevre * (1 - toplam / 100);
      yay.style.stroke = toplam >= 82 ? '#c9922f' : toplam >= 65 ? '#0d5490' : toplam >= 45 ? '#4685c1' : '#b3261e';

      const kir = [
        ['Belge ve yetkinlik', pBelge, 35],
        ['Ticari kapasite', pTicari, 25],
        ['Sektör deneyimi', pDeneyim, 20],
        ['Bölge uygunluğu', pBolge, 20],
      ];
      $('#skor-kirilim').innerHTML = kir
        .map(
          ([ad, d, m]) =>
            `<div><div class="skor-sat"><span>${ad}</span><span>${Math.round(d)}/${m}</span></div>
             <div class="cubuk"><i style="width:${(d / m) * 100}%"></i></div></div>`
        )
        .join('');

      $('#skor-karar').innerHTML = `
        <p><span class="rozet ${kademeTip}">${kademe}</span>
        ${uygun ? '<span class="rozet yesil">Talep edilen katman uygun</span>' : '<span class="rozet kirmizi">Farklı katman önerilir</span>'}</p>
        <p class="ara-s"><strong>Sonraki adım:</strong> ${adim}</p>
        <p class="kucuk ara-s"><strong>Seçilen bölge:</strong> ${il} — ${
          ilDurum === 'acik' ? 'açık' : ilDurum === 'rezerve' ? 'görüşme sürüyor' : 'kapalı'
        }</p>
        ${
          engeller.length
            ? `<div class="kutu uyari ara-s"><h4>Kapı kontrolü</h4><ul class="liste kotu">${engeller
                .map((e) => `<li>${e}</li>`)
                .join('')}</ul></div>`
            : '<div class="kutu iyi ara-s"><h4>Kapı kontrolü</h4><p>Bilinen bir engel görünmüyor. Belgelerin tarihli kopyaları görüşmede istenir.</p></div>'
        }`;
    }

    $$('[data-secim]').forEach((b) => {
      b.addEventListener('click', () => {
        const ad = b.dataset.secim;
        if (ad === 'belge') b.classList.toggle('secili');
        else {
          $$(`[data-secim="${ad}"]`).forEach((x) => x.classList.remove('secili'));
          b.classList.add('secili');
        }
        hesapla();
      });
    });
    $$('#basvuru-form input, #basvuru-form select').forEach((e) => {
      e.addEventListener('input', () => {
        const c = $('#f-deneyim-d');
        if (c) c.textContent = $('#f-deneyim').value + ' yıl';
        const c2 = $('#f-cihaz-d');
        if (c2) c2.textContent = $('#f-cihaz').value + ' cihaz';
        hesapla();
      });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      $('#form-sonuc').innerHTML =
        '<div class="kutu vurgulu"><h4>Demo formu</h4><p>Bu bir prototiptir; başvuru hiçbir yere gönderilmedi. ' +
        'Canlıda: skor ile birlikte CRM’e düşer, 60 puan üstü satış ekibine bildirim gider, ' +
        'altı otomatik bilgilendirme dizisine girer.</p></div>';
      $('#form-sonuc').scrollIntoView({ block: 'center' });
    });
    hesapla();
  }

  /* =======================================================================
     P2 — BÖLGE HARİTASI
     ===================================================================== */
  const bolgeKap = $('#bolge-kap');
  if (bolgeKap) {
    const ara = $('#bolge-ara');
    const suzgecler = $$('[data-durum-suzgec]');
    let aktifDurum = 'hepsi';

    function suz() {
      const q = (ara.value || '').toLocaleLowerCase('tr');
      let gorunen = 0;
      $$('.il', bolgeKap).forEach((il) => {
        const adUygun = il.dataset.ad.toLocaleLowerCase('tr').includes(q);
        const durumUygun = aktifDurum === 'hepsi' || il.dataset.durum === aktifDurum;
        const goster = adUygun && durumUygun;
        il.style.display = goster ? '' : 'none';
        if (goster) gorunen++;
      });
      $$('.bolge-grup', bolgeKap).forEach((g) => {
        g.style.display = $$('.il', g).some((i) => i.style.display !== 'none') ? '' : 'none';
      });
      $('#bolge-sayac').textContent = gorunen;
    }
    ara.addEventListener('input', suz);
    suzgecler.forEach((b) =>
      b.addEventListener('click', () => {
        suzgecler.forEach((x) => x.classList.remove('secili'));
        b.classList.add('secili');
        aktifDurum = b.dataset.durumSuzgec;
        suz();
      })
    );

    $$('.il', bolgeKap).forEach((il) => {
      il.addEventListener('click', () => {
        $$('.il', bolgeKap).forEach((x) => x.classList.remove('secili'));
        il.classList.add('secili');
        const d = il.dataset.durum;
        const metin = {
          acik: [
            'Bölge açık',
            'yesil',
            'Bu bölge için sözleşmeli bayi yok. Başvuru sırası ilk gelene işler; belge kontrolü ve saha görüşmesi sonrası 30 gün içinde tahsis edilir.',
          ],
          rezerve: [
            'Görüşme sürüyor',
            'altin',
            'Bir aday ile ikinci tur görüşme yapılıyor. Sıraya alınabilirsiniz; 15 gün içinde ya sözleşme imzalanır ya bölge yeniden açılır.',
          ],
          dolu: [
            'Bölge kapalı',
            'kirmizi',
            'Bu bölgede sözleşmeli bir taraf var ve bölge koruması geçerli. Uygulama merkezi (B katmanı) veya referans ortaklığı (C katmanı) hâlâ mümkün.',
          ],
        }[d];
        $('#bolge-detay').innerHTML = `
          <h4>${il.dataset.ad} <span class="rozet ${metin[1]}">${metin[0]}</span></h4>
          <p class="ara-s">${metin[2]}</p>
          ${il.dataset.not ? `<p class="kucuk ara-s"><strong>Not:</strong> ${il.dataset.not}</p>` : ''}
          <div class="btn-sar"><a class="btn btn-ana" href="basvuru.html">Bu bölge için başvur</a>
          <a class="btn btn-cizgi" href="kazanc.html">Kazancı hesapla</a></div>`;
      });
    });
    suz();
  }

  /* =======================================================================
     P4 — YETKİLİ UYGULAMA MERKEZİ BUL
     ===================================================================== */
  const merkezKap = $('#merkez-liste');
  if (merkezKap) {
    const ilSec = $('#m-il');
    const isSec = $('#m-islem');
    function suz() {
      const il = ilSec.value;
      const is = isSec.value;
      let n = 0;
      $$('.merkez', merkezKap).forEach((m) => {
        const g = (il === 'hepsi' || m.dataset.il === il) && (is === 'hepsi' || m.dataset.islem.includes(is));
        m.style.display = g ? '' : 'none';
        if (g) n++;
      });
      $('#merkez-sayac').textContent = n;
      $('#merkez-bos').style.display = n ? 'none' : '';
    }
    [ilSec, isSec].forEach((e) => e.addEventListener('change', suz));
    $$('[data-yonlendir]').forEach((b) =>
      b.addEventListener('click', () => {
        b.textContent = 'Talep iletildi ✓';
        b.disabled = true;
        b.style.opacity = '.6';
        const s = $('#merkez-bildirim');
        s.style.display = '';
        s.innerHTML =
          '<strong>Demo:</strong> Gerçek sistemde bu talep merkeze WhatsApp + e-posta ile iletilir, ' +
          'aynı anda Estezone’un panelinde “yönlendirme” olarak sayılır. Bayinin cihaz almasının ' +
          'somut gerekçesi bu sayaçtır. <em>Hasta iletişim bilgisi Estezone’da saklanmaz; ' +
          'yalnızca merkeze aktarılır (KVKK).</em>';
      })
    );
    suz();
  }

  /* =======================================================================
     P5 — BAYİ KAZANÇ SİMÜLATÖRÜ
     ===================================================================== */
  const sim = $('#kazanc-sim');
  if (sim) {
    const KADEME_EK = { bronz: 0, gumus: 3, altin: 7, platin: 12 };
    function hesapla() {
      const adet = +$('#k-adet').value;
      const bedel = +$('#k-bedel').value * 1000;
      const marj = +$('#k-marj').value;
      const kurulu = +$('#k-kurulu').value;
      const sarfAy = +$('#k-sarf').value * 1000;
      const sarfMarj = +$('#k-sarfmarj').value;
      const servis = +$('#k-servis').value;
      const kademe = $('#k-kademe').value;
      const ek = KADEME_EK[kademe];

      $('#k-adet-d').textContent = adet + ' cihaz/yıl';
      $('#k-bedel-d').textContent = para(bedel);
      $('#k-marj-d').innerHTML = '%' + marj + (ek ? ` <span class="rozet altin">+${ek} kademe</span>` : '');
      $('#k-kurulu-d').textContent = kurulu + ' cihaz';
      $('#k-sarf-d').textContent = para(sarfAy) + '/ay';
      $('#k-sarfmarj-d').textContent = '%' + sarfMarj;
      $('#k-servis-d').textContent = servis + ' sözleşme';

      const cihazKar = adet * bedel * ((marj + ek) / 100);
      const sarfKar = kurulu * sarfAy * 12 * ((sarfMarj + ek) / 100);
      const servisKar = servis * 42000 * 0.45; // temsilî yıllık bakım sözleşmesi
      const yil1 = cihazKar + sarfKar + servisKar;

      /* 2. yılda kurulu taban büyür: önceki yıl satılan cihazlar sarf tabanına eklenir */
      const kurulu2 = kurulu + adet;
      const sarfKar2 = kurulu2 * sarfAy * 12 * ((sarfMarj + ek) / 100);
      const yil2 = cihazKar + sarfKar2 + servisKar * 1.3;

      const tekrarPay = yil1 ? ((sarfKar + servisKar) / yil1) * 100 : 0;

      $('#k-sonuc').innerHTML = `
        <div class="olcu-sar">
          <div class="olcu"><b>${para(yil1)}</b><span>1. yıl brüt kâr</span></div>
          <div class="olcu"><b>${para(yil1 + yil2)}</b><span>24 ay kümülatif</span></div>
          <div class="olcu"><b>${para((sarfKar + servisKar) / 12)}</b><span>aylık tekrar eden</span></div>
          <div class="olcu"><b>%${Math.round(tekrarPay)}</b><span>tekrar eden gelir payı</span></div>
        </div>
        <div class="tablo-sar ara-s"><table>
          <thead><tr><th>Kalem</th><th>1. yıl</th><th>2. yıl</th><th>Not</th></tr></thead>
          <tbody>
            <tr><td><strong>Cihaz satışı</strong></td><td>${para(cihazKar)}</td><td>${para(cihazKar)}</td><td>${adet} × ${para(bedel)} × %${marj + ek}</td></tr>
            <tr><td><strong>Sarf malzemesi</strong></td><td>${para(sarfKar)}</td><td>${para(sarfKar2)}</td><td>2. yıl tabanı ${kurulu2} cihaz — <em>satılan her cihaz tabanı büyütür</em></td></tr>
            <tr><td><strong>Servis sözleşmesi</strong></td><td>${para(servisKar)}</td><td>${para(servisKar * 1.3)}</td><td>temsilî yıllık bakım bedeli üzerinden</td></tr>
            <tr style="background:var(--m-50)"><td><strong>Toplam</strong></td><td><strong>${para(yil1)}</strong></td><td><strong>${para(yil2)}</strong></td><td>${
              tekrarPay > 40
                ? 'Tekrar eden gelir baskın — sağlıklı bayi'
                : 'Gelir hâlâ cihaz satışına bağımlı; sarf tabanı büyütülmeli'
            }</td></tr>
          </tbody></table></div>
        <p class="kaynak ara-s">Karşılaştırma: Classys’te sarf, 2025 cirosunun <strong>%46</strong>’sını oluşturuyor.
        Bu simülasyonda tekrar eden gelir payı <strong>%${Math.round(tekrarPay)}</strong>.
        Tüm rakamlar temsilîdir; gerçek marj ve sarf fiyatları firmadan alınmadan kullanılamaz.</p>`;
    }
    $$('#kazanc-sim input, #kazanc-sim select').forEach((e) => e.addEventListener('input', hesapla));
    hesapla();
  }

  /* ---- amortisman (uygulama merkezi tarafı) ---- */
  const amor = $('#amor-sim');
  if (amor) {
    function hesaplaA() {
      const bedel = +$('#a-bedel').value * 1000;
      const seans = +$('#a-seans').value;
      const ucret = +$('#a-ucret').value;
      const sarf = +$('#a-sarf').value;
      const gider = +$('#a-gider').value * 1000;

      $('#a-bedel-d').textContent = para(bedel);
      $('#a-seans-d').textContent = seans + ' seans/gün';
      $('#a-ucret-d').textContent = para(ucret);
      $('#a-sarf-d').textContent = para(sarf) + '/seans';
      $('#a-gider-d').textContent = para(gider) + '/ay';

      const aylikSeans = seans * 24;
      const ciro = aylikSeans * ucret;
      const degisken = aylikSeans * sarf;
      const netAy = ciro - degisken - gider;
      const ay = netAy > 0 ? bedel / netAy : Infinity;

      $('#a-sonuc').innerHTML = `
        <div class="olcu-sar">
          <div class="olcu"><b>${para(ciro)}</b><span>aylık ciro</span></div>
          <div class="olcu"><b>${para(netAy)}</b><span>aylık net katkı</span></div>
          <div class="olcu"><b>${netAy > 0 ? Math.ceil(ay) + ' ay' : '—'}</b><span>amorti süresi</span></div>
          <div class="olcu"><b>${aylikSeans}</b><span>aylık seans (24 gün)</span></div>
        </div>
        <p class="kucuk ara-s">${
          netAy <= 0
            ? '<strong>Bu senaryoda cihaz kendini ödemiyor.</strong> Satış ekibi bu tabloyu görürse yanlış müşteriye cihaz satmaz — iade, şikâyet ve itibar kaybı en baştan önlenir.'
            : ay < 10
            ? 'Hızlı amorti. Bu profildeki aday <strong>ikinci cihaz</strong> için de adaydır.'
            : 'Amorti kabul edilebilir bandda; kiralama veya sertifikalı ikinci el alternatifi de sunulmalı.'
        }</p>`;
    }
    $$('#amor-sim input').forEach((e) => e.addEventListener('input', hesaplaA));
    hesaplaA();
  }

  /* =======================================================================
     P6 — BAYİ & TALEP ASİSTANI (kurallı)
     ===================================================================== */
  const akis = $('#sohbet-akis');
  if (akis) {
    let kisilik = null;
    const giris = $('#sohbet-giris-alan');

    function balon(html, tip = 'bot') {
      const d = document.createElement('div');
      d.className = 'balon ' + tip;
      d.innerHTML = html;
      akis.appendChild(d);
      akis.scrollTop = akis.scrollHeight;
      return d;
    }
    function yaziyor() {
      const d = balon('<span class="yaziyor"><span></span><span></span><span></span></span>');
      return d;
    }
    function hizli(secenekler) {
      const sar = $('#sohbet-hizli');
      sar.innerHTML = '';
      secenekler.forEach((s) => {
        const b = document.createElement('button');
        b.textContent = s;
        b.addEventListener('click', () => gonder(s));
        sar.appendChild(b);
      });
    }
    function cevapla(html, secenekler) {
      const y = yaziyor();
      setTimeout(() => {
        y.remove();
        balon(html);
        if (secenekler) hizli(secenekler);
      }, 480);
    }

    const KURALLAR = {
      bayi: [
        {
          k: ['şart', 'sart', 'nasıl', 'nasil', 'belge', 'gerek', 'evrak'],
          c:
            'Bölge bayiliği için üç şey aranır:<ul>' +
            '<li><strong>Satış merkezi yetki belgesi</strong></li>' +
            '<li><strong>ÜTS kaydı</strong></li>' +
            '<li>Sertifikalı <strong>satış ve tanıtım elemanı</strong></li></ul>' +
            'Belgeniz yoksa yol kapanmıyor: uygulama merkezi (B) veya referans ortağı (C) ' +
            'katmanıyla başlayıp belgelendirme sürecini birlikte yürütüyoruz.',
          s: ['Belgem yok, ne olur?', 'Bölgem açık mı?', 'Ne kadar kazandırır?'],
        },
        {
          k: ['bölge', 'bolge', 'il ', 'şehir', 'sehir', 'açık', 'acik', 'müsait'],
          c:
            'Bölge durumunu haritadan canlı görebiliyorsunuz: açık / görüşme sürüyor / kapalı. ' +
            'Sözleşmeli bayinin bölgesine ikinci bayi atanmaz — <strong>bölge koruması</strong> ' +
            'sözleşmenin maddesidir. Hangi ili soruyorsunuz?',
          s: ['Konya', 'İzmir', 'Bölge haritasını aç'],
        },
        {
          k: ['kazan', 'kâr', 'kar ', 'ciro', 'marj', 'gelir', 'para'],
          c:
            'Kazanç üç kalemden oluşur: cihaz marjı, <strong>sarf marjı</strong> ve servis ' +
            'sözleşmesi. Sağlıklı bir bayide tekrar eden gelir (sarf + servis) toplamın ' +
            '%40’ından fazladır — cihaz bir kere satılır, sarf her ay satılır. ' +
            'Kendi rakamlarınızla simülatörde deneyebilirsiniz.',
          s: ['Simülatörü aç', 'Sarf nedir?', 'Kademe ne işe yarar?'],
        },
        {
          k: ['fiyat', 'kaç para', 'kac para', 'ne kadar', 'ücret', 'ucret', 'maliyet'],
          c:
            'Cihaz bedeli ve bayilik koşulları <strong>yazılı teklifle</strong> paylaşılıyor — ' +
            'burada fiyat veremem. Bunun bir nedeni de tıbbi cihazların internetten satışının ' +
            'mevzuatla sınırlı olması. Teklif için bölgenizi ve işletme türünüzü alayım.',
          s: ['Başvuru formunu aç', 'Kiralama var mı?', 'İkinci el var mı?'],
        },
        {
          k: ['kirala', 'ikinci el', '2. el', 'takas', 'finans', 'leasing', 'taksit'],
          c:
            'Üç edinim yolu var: <strong>satın alma</strong>, <strong>kiralama</strong> ve ' +
            '<strong>sertifikalı ikinci el</strong> (atış sayacı, bakım kaydı ve kalan garanti ' +
            'ilanda yazılı). Finansman için kurumsal yönlendirme yapılıyor; taksit tutarları ' +
            'temsilîdir, bağlayıcı değildir.',
          s: ['Kazancı hesapla', 'Başvuru yap'],
        },
        {
          k: ['eğitim', 'egitim', 'sertifika', 'akademi', 'kurs'],
          c:
            'Akademi dört kademelidir: Bronz → Gümüş → Altın → Platin. Kademe yükseldikçe ' +
            'sarf indirimi, ko-op reklam bütçesi, haritada üst sıra ve bölge koruması geliyor. ' +
            'Sertifikalı uygulayıcı sayısı kademenin şartıdır — mevzuat da zaten sertifikalı ' +
            'personel arıyor.',
          s: ['Kademeleri göster', 'Ko-op bütçe nedir?'],
        },
      ],
      mevcut: [
        {
          k: ['arıza', 'ariza', 'çalışmıyor', 'calismiyor', 'bozul', 'servis', 'hata'],
          c:
            'Arıza kaydı açalım. Bana <strong>cihaz modeli</strong>, <strong>seri numarası</strong> ' +
            've belirtiyi yazın; kayıt servis kuyruğuna düşer ve SLA saati o an başlar. ' +
            '<em>Acil duruş varsa telefon hattı önceliklidir.</em>',
          s: ['Elazer Plus, seri 4417', 'İkame cihaz var mı?', 'SLA süresi ne?'],
        },
        {
          k: ['sarf', 'lamba', 'bar', 'kartuş', 'kartus', 'başlık', 'baslik', 'sipariş', 'siparis', 'gözlük'],
          c:
            'Sarf siparişi portalden veriliyor. Atış sayacınıza göre sistem zaten hatırlatma ' +
            'üretiyor. <strong>Not:</strong> portalde sepet ve online ödeme yok — sipariş, ' +
            'onayınıza sunulan bir <strong>teklif</strong> olarak oluşuyor (tıbbi cihazların ' +
            'internetten satışı sınırlı).',
          s: ['Portalı aç', 'Kademe indirimim ne?'],
        },
        {
          k: ['talep', 'hasta', 'müşteri', 'musteri', 'yönlendir', 'yonlendir', 'lead'],
          c:
            'Bölgenizden gelen talepler kademenize göre dağıtılıyor: Altın ve Platin bayiler ' +
            'öncelikli. Geçen ay size düşen yönlendirmeleri portaldeki “Bana düşen talepler” ' +
            'sekmesinden görebilirsiniz.',
          s: ['Portalı aç', 'Nasıl Altın olurum?'],
        },
        {
          k: ['reklam', 'pazarlama', 'ko-op', 'koop', 'bütçe', 'butce', 'sosyal'],
          c:
            'Ko-op bütçe kademeye bağlı: Altın’da 50/50, Platin’de 70/30. Hazır reklam kiti ' +
            've size özel mikro açılış sayfası üretiliyor. Üretilen her metin mevzuat ' +
            'süzgecinden geçiyor — bayi serbest metin yayınlayamıyor.',
          s: ['Ko-op sayfasını aç', 'Kit içinde ne var?'],
        },
      ],
      hasta: [
        {
          k: ['nerede', 'merkez', 'yakın', 'yakin', 'adres', 'klinik', 'salon'],
          c:
            'Size en yakın <strong>yetkili uygulama merkezini</strong> bulabilirim. ' +
            'Haritada yalnızca cihazı doğrulanmış ve personeli sertifikalı merkezler listelenir. ' +
            'Hangi ildesiniz?',
          s: ['Ankara', 'İstanbul', 'Haritayı aç'],
        },
        {
          k: ['fiyat', 'ücret', 'ucret', 'kaç para', 'kampanya', 'indirim'],
          c:
            'Fiyat bilgisi veremem — sağlık hizmeti tanıtımında fiyat ve kampanya paylaşımı ' +
            'mevzuatla sınırlıdır. Merkezle doğrudan görüşmeniz gerekiyor. Size uygun ' +
            'merkezi bulmama yardımcı olabilirim.',
          s: ['Haritayı aç', 'Yetkili merkez ne demek?'],
        },
        {
          k: ['uygun mu', 'olur mu', 'cilt', 'ağrı', 'agri', 'yan etki', 'kaç seans', 'kac seans', 'hamile', 'ilaç'],
          c:
            '<strong>Bu soruya cevap veremem.</strong> Kimin için hangi işlemin uygun olduğu, ' +
            'kaç seans gerektiği ve olası etkiler <strong>hekim veya yetkili uygulayıcının</strong> ' +
            'muayene ile vereceği karardır. Ben cihaz tarafındayım; sizi doğru merkeze yönlendirebilirim.',
          s: ['Haritayı aç', 'Yetkili merkez ne demek?'],
        },
        {
          k: ['yetkili', 'rozet', 'doğrula', 'dogrula', 'sahte', 'orijinal'],
          c:
            '“Yetkili uygulama merkezi” demek: cihazın modeli ve kaydı doğrulanmış, personeli ' +
            'eğitim almış, servis sözleşmesi güncel demektir. Rozet yıllık olarak yenilenir; ' +
            'yenilemeyen merkez listeden düşer.',
          s: ['Haritayı aç'],
        },
      ],
    };

    const YEDEK = {
      bayi: {
        c:
          'Bunu satış ekibine aktarayım. Size en hızlı dönüş için üç bilgi yeterli: ' +
          '<strong>işletme türü</strong>, <strong>hedef bölge</strong> ve <strong>belge durumu</strong>. ' +
          'Başvuru formunda üçü de 60 saniyede işaretleniyor.',
        s: ['Başvuru formunu aç', 'Şartlar neler?', 'Bölgem açık mı?'],
      },
      mevcut: {
        c: 'Bu konuyu portaldeki ilgili sekmeden ya da bölge sorumlunuzdan takip edebilirsiniz. Konuyu hangi başlıkta sınıflayayım?',
        s: ['Arıza', 'Sarf siparişi', 'Talep yönlendirme', 'Ko-op reklam'],
      },
      hasta: {
        c: 'Ben cihaz ve merkez tarafında yardımcı olabiliyorum. İşlemle ilgili tıbbi soruları merkezdeki uygulayıcıya sormanız gerekiyor.',
        s: ['Haritayı aç', 'Yetkili merkez ne demek?'],
      },
    };

    const YONLENDIRME = [
      [/başvuru|basvuru form/i, 'basvuru.html'],
      [/bölge haritas|bolge haritas|haritayı aç|haritayi ac/i, 'bolge.html'],
      [/simülatör|simulator|hesapla/i, 'kazanc.html'],
      [/portal/i, 'portal.html'],
      [/kademe/i, 'akademi.html'],
      [/ko-op|koop/i, 'pazarlama.html'],
      [/harita/i, 'merkez-bul.html'],
    ];

    function gonder(metin) {
      if (!metin.trim()) return;
      balon(metin, 'kul');
      giris.value = '';

      if (!kisilik) {
        const m = metin.toLocaleLowerCase('tr');
        kisilik = /zaten|müşteri|musteri|cihazım|cihazim|arıza|ariza|sarf/.test(m)
          ? 'mevcut'
          : /hasta|yaptırmak|yaptirmak|epilasyon olmak|seans|randevu/.test(m)
          ? 'hasta'
          : 'bayi';
        const ad = { bayi: 'bayi adayı', mevcut: 'mevcut bayi', hasta: 'son kullanıcı' }[kisilik];
        balon(`Konuşma <strong>${ad}</strong> akışına alındı. Yanlışsa aşağıdan değiştirebilirsiniz.`, 'sistem');
      }

      const yolu = YONLENDIRME.find(([r]) => r.test(metin));
      const kural = KURALLAR[kisilik].find((k) =>
        k.k.some((x) => metin.toLocaleLowerCase('tr').includes(x))
      );
      const y = kural || YEDEK[kisilik];
      cevapla(
        y.c + (yolu ? `<p style="margin-top:8px"><a class="btn btn-ana" href="${yolu[1]}">Sayfayı aç</a></p>` : ''),
        y.s
      );
    }

    $('#sohbet-gonder').addEventListener('click', () => gonder(giris.value));
    giris.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') gonder(giris.value);
    });
    $$('[data-kisilik]').forEach((b) =>
      b.addEventListener('click', () => {
        kisilik = b.dataset.kisilik;
        $$('[data-kisilik]').forEach((x) => x.classList.remove('secili'));
        b.classList.add('secili');
        const t = {
          bayi: ['Bayi adayı', ['Şartlar neler?', 'Bölgem açık mı?', 'Ne kadar kazandırır?', 'Belgem yok, ne olur?']],
          mevcut: ['Mevcut bayi', ['Cihazım arızalandı', 'Sarf siparişi', 'Bana düşen talepler', 'Ko-op reklam']],
          hasta: ['Son kullanıcı', ['Yakınımdaki merkez', 'Fiyat ne kadar?', 'Bana uygun mu?', 'Yetkili merkez ne demek?']],
        }[kisilik];
        balon(`Akış: <strong>${t[0]}</strong>`, 'sistem');
        cevapla(
          {
            bayi: 'Estezone yetkili ağına katılmak istiyorsunuz. Bölge durumu, belge şartları ve kazanç modeli hakkında yardımcı olabilirim. Nereden başlayalım?',
            mevcut: 'Hoş geldiniz. Arıza kaydı, sarf siparişi, size düşen talepler ve ko-op reklam bütçesi konularında yardımcı olabilirim.',
            hasta:
              'Size en yakın <strong>yetkili uygulama merkezini</strong> bulmanıza yardımcı olabilirim. ' +
              '<em>Tıbbi soru, fiyat ve “bana uygun mu” sorularını yanıtlamıyorum</em> — bunlar uygulayıcının işidir.',
          }[kisilik],
          t[1]
        );
      })
    );
  }

  /* =======================================================================
     P8 — KO-OP MİKRO SAYFA ÜRETİCİ
     ===================================================================== */
  const koop = $('#koop-uretici');
  if (koop) {
    const YASAK = [
      [/kalıcı epilasyon/gi, 'kalıcı tüy azaltma'],
      [/fda onaylı/gi, 'FDA 510(k) izinli'],
      [/en iyi|türkiye'?nin en|dünyanın en/gi, '—'],
      [/garantili sonuç/gi, 'öngörülebilir sonuç'],
      [/ağrısız|acısız/gi, 'soğutmalı başlıkla'],
      [/%\s?\d+\s?indirim|kampanya|ücretsiz seans/gi, '—'],
    ];
    function uret() {
      const ad = $('#ko-ad').value || 'Örnek Estetik Merkezi';
      const il = $('#ko-il').value;
      const cihaz = $('#ko-cihaz').value;
      const metin = $('#ko-metin').value;
      const kademe = $('#ko-kademe').value;

      /* Değiştirilebilir kalıp yerine konur; kaldırılması gereken kalıpta
         parçalanmış cümle bırakmak yerine CÜMLENİN TAMAMI çıkarılır. */
      const yakalanan = [];
      const cumleler = metin.split(/(?<=[.!?])\s+/).filter(Boolean);
      const kalan = [];
      cumleler.forEach((c) => {
        let s = c;
        let dusur = false;
        YASAK.forEach(([r, y]) => {
          const m = s.match(r);
          if (!m) return;
          if (y === '—') {
            yakalanan.push([m[0], '—', c]);
            dusur = true;
          } else {
            yakalanan.push([m[0], y, null]);
            s = s.replace(r, y);
          }
        });
        if (!dusur) kalan.push(s);
      });
      const temiz = kalan.join(' ').replace(/\s{2,}/g, ' ').trim();

      $('#koop-onizleme').innerHTML = `
        <div style="border:1px solid var(--cizgi);border-radius:10px;overflow:hidden;background:#fff">
          <div style="background:var(--m-800);color:#fff;padding:14px 18px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <strong style="color:#fff">${ad}</strong>
            <span class="rozet ${kademe === 'platin' ? 'mavi' : kademe === 'altin' ? 'altin' : ''}">Estezone Yetkili Uygulama Merkezi · ${kademe.toUpperCase()}</span>
            <span style="margin-left:auto;font-size:12.5px;color:#adcbe8">${il}</span>
          </div>
          <div style="padding:20px">
            <h3 style="font-size:21px">${cihaz} · ${il}</h3>
            <p class="ara-s">${temiz || '<em class="kucuk">Metin girin — önizleme burada oluşur.</em>'}</p>
            <div class="rozet-sar ara-s">
              <span class="rozet mavi">Cihaz kaydı doğrulandı</span>
              <span class="rozet yesil">Sertifikalı uygulayıcı</span>
              <span class="rozet">Servis sözleşmesi güncel</span>
            </div>
            <div class="btn-sar"><span class="btn btn-ana">Randevu talebi</span><span class="btn btn-cizgi">Merkezi ara</span></div>
            <p class="kaynak">Sayfa Estezone altyapısında üretilir, ${ad} adına yayınlanır. Ölçüm Estezone panelinde,
            talep doğrudan merkeze düşer. Zorunlu alanlar (künye, KVKK, çerez rızası) otomatik eklenir.</p>
          </div>
        </div>
        ${
          yakalanan.length
            ? `<div class="kutu uyari ara-s"><h4>Mevzuat süzgeci ${yakalanan.length} ifadeye müdahale etti</h4>
               <ul class="liste kotu">${yakalanan
                 .map(([b, y, c]) =>
                   y === '—'
                     ? `<li><code>${b}</code> → <strong>cümlenin tamamı çıkarıldı</strong>, yeniden yazılmak üzere bayiye geri gönderildi:<br><span class="kucuk">“${c}”</span></li>`
                     : `<li><code>${b}</code> → <code>${y}</code></li>`
                 )
                 .join('')}</ul>
               <p class="kucuk ara-s">Değiştirilebilen ifade yerine konur; değiştirilemeyen ifadede
               <strong>cümlenin tamamı düşer</strong> — yarım bırakılmış bir cümle yayınlamak, riskli
               cümleyi yayınlamak kadar kötüdür. Bayi serbest metin yayınlayamaz: her cümle yayından
               önce bu süzgeçten geçer.</p></div>`
            : '<div class="kutu iyi ara-s"><h4>Mevzuat süzgeci temiz</h4><p>Bu metinde bilinen riskli kalıp bulunamadı. (Süzgeç bir hukuk denetimi değildir.)</p></div>'
        }`;
    }
    $$('#koop-uretici input, #koop-uretici select, #koop-uretici textarea').forEach((e) =>
      e.addEventListener('input', uret)
    );
    uret();
  }
})();
