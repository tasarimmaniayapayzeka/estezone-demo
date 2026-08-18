/* Estezone Medikal — istemci betiği (bağımlılıksız) */
(() => {
  'use strict';
  const $ = (s, k = document) => k.querySelector(s);
  const $$ = (s, k = document) => [...k.querySelectorAll(s)];
  const TR = (n) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

  /* Arama normalizasyonu — Türkçe noktasız ı tuzağı.
     "HIFU".toLocaleLowerCase('tr') = "hıfu" olur, kullanıcının yazdığı "hifu" tutmazdı.
     parcalar.js içindeki aramaNorm() ile BİREBİR aynı olmalı. */
  const norm = (s) =>
    String(s || '')
      .toLocaleLowerCase('tr')
      .replace(/[ıİI]/g, 'i')
      .replace(/[şŞ]/g, 's')
      .replace(/[ğĞ]/g, 'g')
      .replace(/[üÜ]/g, 'u')
      .replace(/[öÖ]/g, 'o')
      .replace(/[çÇ]/g, 'c')
      .replace(/\s+/g, ' ')
      .trim();

  /* ---- yapışkan başlık ---- */
  const ust = $('.ust');
  if (ust) {
    const kaydir = () => ust.classList.toggle('yapisik', scrollY > 12);
    kaydir();
    addEventListener('scroll', kaydir, { passive: true });
  }

  /* ---- mobil çekmece ---- */
  const cekmece = $('.cekmece');
  if (cekmece) {
    const ac = () => {
      cekmece.classList.add('acik');
      document.body.style.overflow = 'hidden';
    };
    const kapa = () => {
      cekmece.classList.remove('acik');
      document.body.style.overflow = '';
    };
    $('.menu-dug')?.addEventListener('click', ac);
    $('.cekmece-kapat')?.addEventListener('click', kapa);
    cekmece.addEventListener('click', (e) => e.target === cekmece && kapa());
    addEventListener('keydown', (e) => e.key === 'Escape' && kapa());
  }

  /* ---- belirme animasyonu ---- */
  const belirler = $$('.belir');
  if (belirler.length && 'IntersectionObserver' in window) {
    const g = new IntersectionObserver(
      (girisler) =>
        girisler.forEach((gi) => {
          if (gi.isIntersecting) {
            gi.target.classList.add('gorundu');
            g.unobserve(gi.target);
          }
        }),
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );
    belirler.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 8, 6) * 55}ms`;
      g.observe(el);
    });
  } else {
    belirler.forEach((el) => el.classList.add('gorundu'));
  }

  /* ---- cihaz filtresi + arama + işletme türü ---- */
  const filtre = $('[data-filtre]');
  if (filtre) {
    const kartlar = $$('[data-cihaz]');
    const sayacEl = $('[data-sonuc-sayi]');
    const bosEl = $('[data-bos]');
    const aramaEl = $('[data-ara]');
    // bir işletme türü, kendi seviyesindeki ve altındaki cihazları bulundurabilir
    const KAPSAM = { salon: ['salon'], merkez: ['salon', 'merkez'], tibbi: ['salon', 'merkez', 'tibbi'] };
    let kategori = 'hepsi';
    let yetki = 'hepsi';

    const uygula = () => {
      const q = norm(aramaEl?.value);
      let n = 0;
      kartlar.forEach((k) => {
        const kUygun = kategori === 'hepsi' || k.dataset.k === kategori;
        const yUygun = yetki === 'hepsi' || (KAPSAM[yetki] || []).includes(k.dataset.y);
        const qUygun = !q || (k.dataset.arama || '').includes(q);
        const gor = kUygun && yUygun && qUygun;
        k.classList.toggle('gizli', !gor);
        if (gor) n++;
      });
      if (sayacEl) sayacEl.textContent = `${n} cihaz`;
      bosEl?.classList.toggle('gizli', n > 0);
    };

    $$('[data-k-filtre]').forEach((b) =>
      b.addEventListener('click', () => {
        kategori = b.dataset.kFiltre;
        $$('[data-k-filtre]').forEach((x) => x.setAttribute('aria-pressed', x === b));
        uygula();
      })
    );
    $$('[data-y-filtre]').forEach((b) =>
      b.addEventListener('click', () => {
        yetki = b.dataset.yFiltre;
        $$('[data-y-filtre]').forEach((x) => x.setAttribute('aria-pressed', x === b));
        uygula();
      })
    );
    aramaEl?.addEventListener('input', uygula);

    // ?k=kategori ile derin bağlantı
    const url = new URLSearchParams(location.search).get('k');
    if (url) $(`[data-k-filtre="${CSS.escape(url)}"]`)?.click();
    else uygula();
  }

  /* ---- çerez rızası (kabul/ret eşit ağırlıkta, rıza kaydı tutulur) ---- */
  const cerez = $('[data-cerez]');
  if (cerez) {
    const ANAHTAR = 'estezone-cerez';
    let mevcut = null;
    try {
      mevcut = localStorage.getItem(ANAHTAR);
    } catch (e) {
      /* depolama kapalı */
    }
    if (!mevcut) cerez.hidden = false;

    const kaydet = (karar) => {
      try {
        localStorage.setItem(ANAHTAR, JSON.stringify({ karar, tarih: new Date().toISOString() }));
      } catch (e) {
        /* yoksay */
      }
      cerez.hidden = true;
      // Canlıda: yalnızca karar === 'kabul' ise ölçüm/reklam script'i buradan yüklenir.
    };
    $('[data-cerez-kabul]', cerez)?.addEventListener('click', () => kaydet('kabul'));
    $('[data-cerez-ret]', cerez)?.addEventListener('click', () => kaydet('ret'));
    $('[data-cerez-yonet]', cerez)?.addEventListener('click', () => {
      location.href = cerez.querySelector('a')?.getAttribute('href') || 'cerez.html';
    });
  }

  /* ---- hero showroom videosu (koşullu yükleme) ----
     Telefonda da oynar (önce yalnız ≥900px'te yüklüyordu, mobilde sabit
     fotoğraf kalıyordu). Varsa hafif mobil kopya tercih edilir; yalnızca
     veri tasarrufu açıkken veya yavaş bağlantıda video hiç yüklenmez —
     o durumda aynı sahnenin fotoğrafı görünmeye devam eder.
     iOS'ta otomatik oynatma için muted + playsinline ŞART; ayrıca bazı
     tarayıcılar autoplay özniteliğine rağmen play() beklediği için
     çağrıyı elle de yapıyoruz (reddedilirse sessizce fotoğrafta kalır). */
  const heroKap = $('[data-hero-video]');
  if (heroKap) {
    const hareketOk = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ag = navigator.connection || {};
    const hizli = !ag.saveData && !/(^|-)2g$/.test(ag.effectiveType || '');
    if (hareketOk && hizli) {
      const tam = heroKap.dataset.heroVideo;
      const mobil = heroKap.dataset.heroVideoMobil;
      const dar = matchMedia('(max-width: 900px)').matches;
      const v = document.createElement('video');
      v.src = dar && mobil ? mobil : tam;
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.autoplay = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('aria-hidden', 'true');
      v.preload = 'auto';
      v.className = 'hero-video';
      v.addEventListener('canplay', () => heroKap.classList.add('hero-video-hazir'), { once: true });
      heroKap.appendChild(v);
      const oynat = () => {
        const s = v.play();
        if (s && s.catch) s.catch(() => {});
      };
      oynat();
      // Bazı tarayıcılar ilk dokunuşa kadar oynatmaz; ilk etkileşimde tekrar dene.
      ['touchstart', 'click'].forEach((o) =>
        addEventListener(o, () => v.paused && oynat(), { once: true, passive: true })
      );
    }
  }

  /* ---- teklif sihirbazı: 3 seçim → hazır WhatsApp mesajı ----
     Form değil; her adım tek dokunuşla ilerler, son adımda mesaj metni
     kullanıcıya GÖSTERİLİR (ne göndereceğini görmeden göndermesin). */
  const sihirbaz = $('[data-sihirbaz]');
  if (sihirbaz) {
    const WA = '905398410585';
    const secim = {};
    const adimlar = $$('[data-sh-adim]', sihirbaz);
    const sonuc = $('[data-sh-sonuc]', sihirbaz);
    const cubuk = $('[data-sh-cubuk]', sihirbaz);
    const goster = (n) => {
      adimlar.forEach((a) => (a.hidden = +a.dataset.shAdim !== n));
      sonuc.hidden = n <= adimlar.length;
      cubuk.style.width = Math.min(100, ((n - 1) / adimlar.length) * 100) + '%';
    };
    const mesajKur = () => {
      const m =
        `Merhaba, Estezone Medikal'den cihaz teklifi almak istiyorum.\n\n` +
        `• İlgilendiğim hat: ${secim.hat}\n` +
        `• İşletme türüm: ${secim.isletme}\n` +
        `• Edinim tercihim: ${secim.edinim}\n\n` +
        `Uygun platformlar ve şartlar hakkında bilgi verebilir misiniz?`;
      $('[data-sh-mesaj]', sihirbaz).textContent = m;
      $('[data-sh-wa]', sihirbaz).href = `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
    };
    $$('[data-sh]', sihirbaz).forEach((b) =>
      b.addEventListener('click', () => {
        const alan = b.dataset.sh;
        secim[alan] = b.dataset.deger;
        // aynı adımdaki kardeşlerin seçimini temizle
        $$(`[data-sh="${alan}"]`, sihirbaz).forEach((x) => x.setAttribute('aria-pressed', x === b));
        const sira = { hat: 2, isletme: 3, edinim: 4 }[alan];
        if (sira === 4) mesajKur();
        goster(sira);
      })
    );
    const sifirla = $('[data-sh-sifirla]', sihirbaz);
    if (sifirla)
      sifirla.addEventListener('click', () => {
        Object.keys(secim).forEach((k) => delete secim[k]);
        $$('[data-sh]', sihirbaz).forEach((x) => x.setAttribute('aria-pressed', 'false'));
        goster(1);
      });
  }

  /* ---- cihaz galerisi ---- */
  const galeri = $('[data-galeri]');
  if (galeri) {
    const ana = $('[data-ana-gorsel]', galeri);
    const cerceve = ana.closest('.cd-ana-gor');
    $$('[data-kucuk]', galeri).forEach((b) =>
      b.addEventListener('click', () => {
        ana.src = b.dataset.kucuk;
        // showroom sahnesi koyu çerçeve + tam kaplama ister; katalog çekimi beyaz kutuda kalır
        cerceve.classList.toggle('cd-ana-gor--sahne', b.dataset.kucuk.includes('/showroom-'));
        $$('[data-kucuk]', galeri).forEach((x) => x.setAttribute('aria-current', x === b));
      })
    );
  }

  /* ---- sekmeler ---- */
  $$('[data-sekme-bar]').forEach((bar) => {
    const dugmeler = $$('button', bar);
    dugmeler.forEach((d) =>
      d.addEventListener('click', () => {
        dugmeler.forEach((x) => x.setAttribute('aria-selected', x === d));
        $$(`[data-sekme]`).forEach((p) => p.classList.toggle('gizli', p.dataset.sekme !== d.dataset.hedef));
      })
    );
  });

  /* ---- yatırım geri dönüş hesaplayıcı ---- */
  const roi = $('[data-roi]');
  if (roi) {
    const al = (n) => $(`[name="${n}"]`, roi);
    const cikti = (n) => $(`[data-cikti="${n}"]`, roi);

    const hesapla = () => {
      const yatirim = +al('yatirim').value || 0;
      const seansFiyat = +al('seans').value || 0;
      const gunluk = +al('gunluk').value || 0;
      const gun = +al('gun').value || 0;
      const gider = (+al('gider').value || 0) / 100;

      const aylikSeans = gunluk * gun;
      const aylikCiro = aylikSeans * seansFiyat;
      const aylikNet = aylikCiro * (1 - gider);
      const ay = aylikNet > 0 ? yatirim / aylikNet : 0;

      $$('[data-deger-of]', roi).forEach((e) => {
        const k = al(e.dataset.degerOf);
        e.textContent = e.dataset.degerOf === 'gider' ? `%${k.value}` : TR(k.value);
      });

      cikti('seans').textContent = TR(aylikSeans);
      cikti('ciro').textContent = '₺' + TR(aylikCiro);
      cikti('net').textContent = '₺' + TR(aylikNet);
      cikti('ay').textContent =
        !aylikNet || ay <= 0 ? '—' : ay < 1 ? '1 aydan kısa' : `${ay.toFixed(1)} ay`;
      cikti('yil').textContent = '₺' + TR(Math.max(0, aylikNet * 12 - yatirim));
    };

    $$('input', roi).forEach((i) => i.addEventListener('input', hesapla));
    hesapla();
  }

  /* ---- cihaz seçim danışmanı ---- */
  const dan = $('[data-danisman]');
  if (dan && window.ESTEZONE_CIHAZLAR) {
    const adimlar = $$('.dan-adim', dan);
    const cubuk = $('[data-ilerleme]', dan);
    const cevaplar = {};
    let i = 0;

    const goster = (n) => {
      i = n;
      adimlar.forEach((a, x) => a.classList.toggle('aktif', x === n));
      if (cubuk) cubuk.style.width = `${(n / (adimlar.length - 1)) * 100}%`;
      dan.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    $$('[data-cevap]', dan).forEach((b) =>
      b.addEventListener('click', () => {
        cevaplar[b.closest('.dan-adim').dataset.soru] = b.dataset.cevap;
        if (i < adimlar.length - 2) goster(i + 1);
        else {
          onerHesapla();
          goster(adimlar.length - 1);
        }
      })
    );

    $('[data-bastan]', dan)?.addEventListener('click', () => {
      Object.keys(cevaplar).forEach((k) => delete cevaplar[k]);
      goster(0);
    });

    function onerHesapla() {
      const puanli = window.ESTEZONE_CIHAZLAR.map((c) => {
        let p = 0;
        if (cevaplar.alan === c.kategori) p += 60;
        if (cevaplar.alan === 'hepsi') p += 12;
        // işletme ölçeği -> vitrin/premium eşlemesi
        if (cevaplar.olcek === 'buyuk' && c.vitrin) p += 22;
        if (cevaplar.olcek === 'kucuk' && !c.vitrin) p += 16;
        if (cevaplar.olcek === 'orta') p += 10;
        // öncelik
        if (cevaplar.oncelik === 'kapsam' && c.etiketSayi >= 4) p += 18;
        if (cevaplar.oncelik === 'belge' && /FDA|CE|ABD|Alman|İtalyan|Distribütör/i.test(c.rozet)) p += 20;
        if (cevaplar.oncelik === 'butce' && !c.vitrin) p += 14;
        if (c.vitrin) p += 5;
        return { ...c, p };
      })
        .sort((a, b) => b.p - a.p)
        .slice(0, 3);

      const kap = $('[data-oneri]', dan);
      kap.innerHTML = puanli
        .map(
          (c) => `<a class="c-kart c-kart--sahne" data-k="${c.kategori}" href="${c.url}">
        <div class="c-kart-gor">${c.rozet ? `<span class="c-kart-rozet">${c.rozet}</span>` : ''}
          <img src="${c.gorsel}" alt="${c.ad}" loading="lazy"></div>
        <div class="c-kart-govde">
          <span class="c-kart-marka">${c.marka}</span>
          <h3>${c.ad}</h3>
          <span class="c-kart-one">${c.oneCikan}</span>
          <p>${c.neden}</p>
        </div>
        <div class="c-kart-alt"><span>${c.kategoriAd}</span><span class="git">İncele →</span></div>
      </a>`
        )
        .join('');
    }
  }

  /* ---- karşılaştırma ---- */
  const kars = $('[data-karsilastir]');
  if (kars && window.ESTEZONE_CIHAZLAR) {
    const secmeler = $$('select', kars);
    const tabloKap = $('[data-kars-tablo]', kars);
    const SATIR = [
      ['Marka', (c) => c.marka],
      ['Kategori', (c) => c.kategoriAd],
      ['Öne çıkan', (c) => c.oneCikan],
      ['Rozet', (c) => c.rozet || '—'],
      ['Teknoloji', (c) => (c.etiketler || []).join(', ')],
      ['Kimin için', (c) => c.hedef],
      ['Neden bu cihaz', (c) => c.neden],
    ];

    const ciz = () => {
      const secili = secmeler.map((s) => window.ESTEZONE_CIHAZLAR.find((c) => c.slug === s.value)).filter(Boolean);
      if (!secili.length) {
        tabloKap.innerHTML = '<p class="bos-durum">Karşılaştırmak için en az bir cihaz seçin.</p>';
        return;
      }
      tabloKap.innerHTML = `<div class="kars-tablo"><table>
        <thead><tr><th></th>${secili
          .map(
            (c) =>
              `<th><div style="display:flex;gap:.6rem;align-items:center"><img src="${c.gorsel}" alt="" width="42" height="42" style="object-fit:cover;border-radius:8px"><span>${c.ad}</span></div></th>`
          )
          .join('')}</tr></thead>
        <tbody>${SATIR.map(
          ([ad, fn]) =>
            `<tr><td>${ad}</td>${secili.map((c) => `<td>${fn(c) || '—'}</td>`).join('')}</tr>`
        ).join('')}
        <tr><td></td>${secili
          .map((c) => `<td><a class="btn btn-hat btn-k" href="${c.url}">Detay</a></td>`)
          .join('')}</tr></tbody></table></div>`;
    };

    secmeler.forEach((s) => {
      s.innerHTML =
        '<option value="">— seçiniz —</option>' +
        window.ESTEZONE_CIHAZLAR.map((c) => `<option value="${c.slug}">${c.ad} · ${c.marka}</option>`).join('');
      s.addEventListener('change', ciz);
    });
    // varsayılan: ilk üç vitrin cihazı
    const vitrin = window.ESTEZONE_CIHAZLAR.filter((c) => c.vitrin);
    secmeler.forEach((s, x) => vitrin[x] && (s.value = vitrin[x].slug));
    ciz();
  }

  /* ---- teklif formu (demo) ---- */
  $$('[data-form]').forEach((f) =>
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const not = $('[data-form-not]', f);
      if (not) {
        not.hidden = false;
        not.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      f.querySelector('button[type=submit]').disabled = true;
    })
  );

  /* ---- yıl ---- */
  $$('[data-yil]').forEach((e) => (e.textContent = new Date().getFullYear()));

  /* =========================================================================
     AI CİHAZ ASİSTANI
     Demo sürümü: anahtarsız, kural tabanlı. Cihaz verisinden cevap üretir.
     Canlıda aynı arayüz OpenAI'ye bağlanır; kurallar sistem promptuna taşınır.
     KURAL: teşhis/tedavi önerisi VERMEZ, fiyat SÖYLEMEZ, uydurmaz.
     ========================================================================= */
  const asistan = $('[data-asistan]');
  if (asistan && window.ESTEZONE_CIHAZLAR) {
    const C = window.ESTEZONE_CIHAZLAR;
    const govde = $('[data-asistan-govde]', asistan);
    const oneriKap = $('[data-asistan-oneri]', asistan);
    const form = $('[data-asistan-form]', asistan);
    const girdi = $('input', form);
    /* Site kökü: stil bağlantısından türetilir. DİKKAT — href'te önbellek
       kırıcı sorgu var (…/stil.css?v=abc123); sorgu atılmazsa kök
       "?v=abc123" olarak çıkıyor ve hem asistan linkleri hem AI adresi
       bozuluyordu. Bu yüzden önce ? sonrası kesilir. */
    const kok = (() => {
      const l = document.querySelector('link[rel=stylesheet][href*="varlik/css"]');
      if (!l) return '';
      return l.getAttribute('href').split('?')[0].replace('varlik/css/stil.css', '');
    })();


    /* Dört öneri yeter: alıcının en sık sorduğu dört başlık. Fazlası cevap
       alanını daraltıyordu; kalan konular zaten yazarak sorulabiliyor. */
    const ONERILER = [
      'Salonuma hangi cihazı alabilirim?',
      'Alexandrite cihazlarınız neler?',
      'Teknik servis veriyor musunuz?',
      'Kiralama var mı?',
    ];

    let acildi = false;
    const balon = (html, kim = 'bot') => {
      const d = document.createElement('div');
      d.className = `balon ${kim}`;
      d.innerHTML = html;
      govde.appendChild(d);
      govde.scrollTop = govde.scrollHeight;
      return d;
    };
    const yaz = (html) => {
      const b = balon('<span style="opacity:.5">yazıyor…</span>');
      setTimeout(() => {
        b.innerHTML = html;
        govde.scrollTop = govde.scrollHeight;
      }, 380);
    };
    const cihazKarti = (c) =>
      `<a class="kart-mini" href="${kok}${c.url}">
        <img src="${kok}${c.gorsel}" alt="" loading="lazy">
        <span><strong>${c.ad}</strong><span>${c.marka} · ${c.oneCikan}</span></span></a>`;

    const listele = (dizi, oncesi) =>
      oncesi + dizi.slice(0, 3).map(cihazKarti).join('') +
      (dizi.length > 3 ? `<p style="margin-top:.5rem;font-size:.82rem">…ve ${dizi.length - 3} cihaz daha. <a href="${kok}cihazlar.html">Tümünü görün</a></p>` : '');

    function cevapla(soru) {
      const q = norm(soru);
      const gecer = (...k) => k.some((x) => q.includes(x));

      // --- güvenlik kapısı: tıbbi tavsiye istenirse reddet ---
      if (gecer('bende ', 'benim cildim', 'hastayim', 'tedavi olabilir', 'bana iyi gelir', 'agriyor', 'sorunum var', 'tesh'))
        return 'Ben bir cihaz asistanıyım; kişiye yönelik tıbbi değerlendirme yapamam. Uygulama kararı için hekiminize ya da hizmet aldığınız kliniğe danışmalısınız. Cihazların teknik özellikleri konusunda yardımcı olabilirim.';

      // --- fiyat ---
      if (gecer('fiyat', 'ucret', 'kac para', 'ne kadar', 'maliyet', 'butce'))
        return `Cihaz fiyatlarını sitede yayınlamıyoruz — aynı cihaz başlık konfigürasyonu, sarf paketi, eğitim ve garanti süresine göre farklı bedelle çıkıyor. <a href="${kok}iletisim.html">Teklif formunu</a> doldurursanız envanterinize göre net fiyat çıkarırız.<br><br>Bu arada <a href="${kok}yatirim-hesaplayici.html">yatırım geri dönüş hesaplayıcısıyla</a> cihazın kaç ayda kendini ödeyeceğini şimdiden görebilirsiniz.`;

      // --- işletme türü / mevzuat ---
      if (gecer('salon', 'guzellik merkezi', 'klinik mi', 'yetki', 'mevzuat', 'ruhsat', 'uts', 'alabilir miyim')) {
        const salon = C.filter((c) => c.yetki === 'salon');
        return listele(
          salon,
          `Bu tamamen işletme türünüze bağlı. <b>Güzellik salonları</b> lazer sınıfı cihazları bulunduramaz; Alexandrite, Nd:YAG, CO2 gibi sistemler poliklinik/tıp merkezi/hastane gerektirir.<br><br>Salon için uygun görünen cihazlar:`
        ) + `<p style="margin-top:.5rem;font-size:.82rem"><a href="${kok}cihazlar.html">Cihaz listesinde</a> "İşletme türüm" filtresini kullanabilirsiniz. Kesin durum ÜTS kaydınız ve ruhsat tipinizle teyit edilir.</p>`;
      }

      // --- servis ---
      if (gecer('servis', 'ariza', 'tamir', 'onarim', 'yedek parca', 'lamba', 'bakim'))
        return `Evet — kendi atölyemizde onarım yapıyoruz, üstelik <b>bizden almadığınız cihazlar için de</b>. Flash lamba, pompa haznesi, optik lens, fiber optik, güç kaynağı, diode başlık ve soğutma sistemi müdahaleleri kapsamda.<br><br>Cihazın marka ve modelini yazarsanız parça durumunu söyleyebilirim: <a href="${kok}teknik-servis.html">Teknik servis sayfası</a>`;

      // --- kiralama / 2. el ---
      if (gecer('kirala', 'ikinci el', '2. el', 'takas', 'taksit', 'finansman'))
        return `Kiralama, kontrollü ikinci el ve takas seçeneklerimiz var. İkinci el cihazlar atölyemizden geçmeden teslim edilmez; atış sayısı ve lamba ömrü yazılı beyan edilir.<br><br><a href="${kok}kiralama-ikinci-el.html">Kiralama & 2. el sayfası</a>`;

      // --- teknoloji eşleşmeleri ---
      const TEKNOLOJI = [
        [['alexandrite', 'aleksandrit', '755'], 'Alexandrite (755 nm) platformlarımız:', (c) => /alexandrite|755/i.test(c.etiketler.join(' ') + c.oneCikan)],
        [['diode', 'diyot', '808'], 'Diode / mix atışlı sistemlerimiz:', (c) => /diode|808|mix/i.test(c.etiketler.join(' ') + c.oneCikan + c.ad)],
        [['nd:yag', 'ndyag', 'nd yag', '1064'], 'Nd:YAG (1064 nm) sistemlerimiz:', (c) => /nd:yag|1064/i.test(c.etiketler.join(' ') + c.oneCikan)],
        [['dovme', 'leke', 'pigment', 'pico', 'melazma'], 'Leke ve dövme için pigment hedefleyen sistemler:', (c) => /pico|q-switch|dovme|leke|pigment/i.test(norm(c.etiketler.join(' ') + c.oneCikan + c.neden))],
        [['co2', 'fraksiyonel', 'skar', 'iz'], 'Fraksiyonel CO2 sistemimiz:', (c) => /co2/i.test(c.etiketler.join(' ') + c.ad)],
        [['zayifla', 'incel', 'lipoliz', 'yag', 'kilo', 'selulit'], 'Vücut şekillendirme ve bölgesel incelme hattı:', (c) => c.kategori === 'vucut'],
        [['kas', 'emt', 'hiemt', 'sculpt'], 'Kas uyarımı (HI-EMT) platformlarımız:', (c) => /emt|sculpt/i.test(norm(c.ad + c.etiketler.join(' ')))],
        [['hifu', 'germe', 'sarkma', 'sikilas'], 'Cilt sıkılaştırma ve germe için:', (c) => /hifu|lifu|endolazer|rf/i.test(norm(c.etiketler.join(' ') + c.oneCikan))],
        [['epilasyon', 'tuy', 'agda', 'lazer epilasyon'], 'Lazer epilasyon platformlarımız:', (c) => c.kategori === 'epilasyon'],
        [['cilt bakim', 'hydra', 'peeling', 'bakim'], 'Cilt bakım hattı:', (c) => c.kategori === 'cilt'],
        [['sogutma', 'agri', 'konfor', 'zimmer'], 'Uygulama konforu için soğutma sistemlerimiz:', (c) => c.kategori === 'destek'],
        [['gozluk', 'koruyucu', 'guvenlik'], 'Dalga boyuna özel koruyucu gözlüklerimiz:', (c) => /gozluk/i.test(norm(c.ad))],
      ];
      for (const [anahtarlar, giris, sec] of TEKNOLOJI) {
        if (gecer(...anahtarlar)) {
          const bulunan = C.filter(sec);
          if (bulunan.length) return listele(bulunan, giris + '<br>');
        }
      }

      // --- cihaz adıyla doğrudan arama ---
      const adEsleme = C.filter((c) => norm(c.ad).includes(q) || norm(c.marka).includes(q) || q.includes(norm(c.ad)));
      if (q.length > 2 && adEsleme.length)
        return listele(adEsleme, `Aradığınız cihaz${adEsleme.length > 1 ? 'lar' : ''}:<br>`);

      // --- selam / genel ---
      if (gecer('merhaba', 'selam', 'iyi gunler', 'kolay gelsin'))
        return 'Merhaba. Estezone portföyündeki 28 cihazı biliyorum — teknoloji, kimin kullanabileceği, servis kapsamı gibi konularda yardımcı olabilirim. Ne arıyorsunuz?';
      if (gecer('tesekkur', 'sagol', 'eyvallah'))
        return 'Rica ederim. Somut bir teklif isterseniz <a href="' + kok + 'iletisim.html">buradan</a> ulaşabilir ya da 0312 466 66 86 numarasını arayabilirsiniz.';

      // --- anlaşılmadı ---
      return `Bunu tam çözemedim. Şunları deneyebilirsiniz: bir <b>teknoloji</b> (Alexandrite, diode, CO2, HIFU, soğuk lipoliz), bir <b>ihtiyaç</b> (epilasyon, leke, dövme, bölgesel incelme) ya da bir <b>cihaz adı</b> yazın.<br><br>Alternatif olarak <a href="${kok}cihaz-secim-danismani.html">seçim danışmanımız</a> üç soruyla size uygun platformu bulur.`;
    }

    /* ---- AI katmanı ----
       Sunucuda api/sohbet.php varsa (canlı site) gerçek AI cevaplar; GitHub
       Pages demosunda PHP çalışmadığı için 404 döner ve kural tabanlı motora
       sessizce düşülür. Kullanıcı her iki durumda da cevap alır. */
    const AI = { adres: kok + 'api/sohbet.php', durum: 'bilinmiyor' }; // bilinmiyor | acik | kapali
    const gecmis = [];

    const guvenliMetin = (s) =>
      String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    /* Modelden gelen düz metni sınırlı biçimlendirmeyle HTML'e çevirir:
       **kalın**, satır sonu ve site içi bağlantılar (sayfa.html). */
    const aiBicimle = (metin) => {
      let h = guvenliMetin(metin)
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/\n{2,}/g, '<br><br>')
        .replace(/\n/g, '<br>');
      h = h.replace(/\b((?:cihaz\/|kategori\/)?[a-z0-9-]+\.html)\b/g, (t) => `<a href="${kok}${t}">${t}</a>`);
      return h;
    };

    async function aiSor(soru) {
      const y = await fetch(AI.adres, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soru, gecmis: gecmis.slice(-6) }),
      });
      if (!y.ok) throw new Error('http-' + y.status);
      /* Statik barındırmada (GitHub Pages) PHP çalıştırılmaz, dosya ham metin
         olarak 200 döner. JSON beklediğimizi baştan doğrulayıp yedeğe geçelim. */
      if (!(y.headers.get('content-type') || '').includes('json')) throw new Error('php-calismiyor');
      const j = await y.json();
      if (!j.cevap) throw new Error('bos');
      return j.cevap;
    }

    /* Tek giriş noktası: önce AI dener, olmazsa kural tabanlı motor. */
    async function sor(soru) {
      // İlk soruyla birlikte öneri şeridi kapanır; panelin tamamı sohbete kalır.
      asistan.classList.add('sohbet-basladi');
      const b = balon('<span class="yaziyor"><i></i><i></i><i></i></span>');
      const bitir = (html, kaynak) => {
        b.innerHTML = html;
        if (kaynak) b.dataset.kaynak = kaynak;
        govde.scrollTop = govde.scrollHeight;
      };
      gecmis.push({ rol: 'ben', metin: soru });
      if (AI.durum !== 'kapali') {
        try {
          const cevap = await aiSor(soru);
          AI.durum = 'acik';
          gecmis.push({ rol: 'bot', metin: cevap });
          return bitir(aiBicimle(cevap), 'ai');
        } catch (e) {
          // 429 = hız sınırı: kullanıcıya söyle, motoru kapatma
          if (String(e.message) === 'http-429')
            return bitir('Çok hızlı yazıyorsunuz. Bir dakika sonra tekrar deneyin.', 'sinir');
          AI.durum = 'kapali'; // bu oturumda bir daha denemeyelim
        }
      }
      const kural = cevapla(soru);
      gecmis.push({ rol: 'bot', metin: kural.replace(/<[^>]+>/g, ' ') });
      setTimeout(() => bitir(kural, 'kural'), 300);
    }

    const ac = () => {
      asistan.hidden = false;
      if (!acildi) {
        acildi = true;
        balon(
          'Merhaba. Estezone <b>cihaz asistanıyım</b>. Portföydeki 28 platformu, hangi işletme türünün hangi cihazı bulundurabileceğini ve servis kapsamımızı biliyorum.<br><br>Tıbbi teşhis veya tedavi önerisi vermem — cihaz sorularınız için buradayım.'
        );
        oneriKap.innerHTML = ONERILER.map((o) => `<button type="button">${o}</button>`).join('');
        $$('button', oneriKap).forEach((b) =>
          b.addEventListener('click', () => {
            balon(b.textContent, 'ben');
            sor(b.textContent);
          })
        );
      }
      setTimeout(() => girdi.focus(), 80);
    };

    /* ---- Sesli sor ----
       Tarayıcının kendi konuşma tanıması (Web Speech API) — dış kütüphane yok.
       Desteklemeyen tarayıcıda düğmeler gizli kalır, yazarak sorma bozulmaz. */
    const SesTanima = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SesTanima) {
      const mikDugmeler = [$('[data-asistan-ses]', asistan), $('[data-asistan-mik]', asistan)].filter(Boolean);
      mikDugmeler.forEach((d) => (d.hidden = false));
      let tanima = null;
      let dinliyor = false;
      const dinlemeyiBitir = () => {
        dinliyor = false;
        mikDugmeler.forEach((d) => d.classList.remove('dinliyor'));
        girdi.placeholder = 'Cihaz, teknoloji veya soru yazın…';
      };
      const dinle = () => {
        if (dinliyor) {
          tanima?.stop();
          return;
        }
        tanima = new SesTanima();
        tanima.lang = 'tr-TR';
        tanima.interimResults = true;
        tanima.continuous = false;
        dinliyor = true;
        mikDugmeler.forEach((d) => d.classList.add('dinliyor'));
        girdi.placeholder = 'Dinliyorum… konuşun';
        tanima.onresult = (e) => {
          const metin = Array.from(e.results)
            .map((r) => r[0].transcript)
            .join('');
          girdi.value = metin;
          // Cümle tamamlandıysa doğrudan sor
          if (e.results[e.results.length - 1].isFinal && metin.trim()) {
            dinlemeyiBitir();
            balon(guvenliMetin(metin.trim()), 'ben');
            girdi.value = '';
            sor(metin.trim());
          }
        };
        tanima.onerror = () => {
          dinlemeyiBitir();
          girdi.placeholder = 'Ses alınamadı — yazarak sorabilirsiniz';
        };
        tanima.onend = dinlemeyiBitir;
        try {
          tanima.start();
        } catch (e) {
          dinlemeyiBitir();
        }
      };
      mikDugmeler.forEach((d) => d.addEventListener('click', dinle));
    }

    /* ---- WhatsApp'a devret ----
       Konuşma geçmişi varsa WhatsApp mesajına özetlenir; temsilci sohbeti
       baştan sormak zorunda kalmaz. Mesaj KULLANICIYA gönderilmeden önce
       WhatsApp'ın kendi ekranında görünür (gizli gönderim yok). */
    $('[data-kanal-wa]', asistan)?.addEventListener('click', (e) => {
      const sorular = gecmis.filter((g) => g.rol === 'ben').map((g) => g.metin);
      if (!sorular.length) return; // geçmiş yoksa normal WhatsApp bağlantısı
      e.preventDefault();
      const ozet =
        'Merhaba, siteden yazıyorum. Cihaz asistanına şunları sordum:\n' +
        sorular.slice(-3).map((s, i) => `${i + 1}. ${s}`).join('\n') +
        '\n\nBir yetkiliyle görüşebilir miyim?';
      const adres = e.currentTarget.getAttribute('href') + '?text=' + encodeURIComponent(ozet);
      window.open(adres, '_blank', 'noopener');
    });

    $('[data-asistan-ac]')?.addEventListener('click', () => (asistan.hidden ? ac() : (asistan.hidden = true)));
    $('[data-asistan-kapat]', asistan)?.addEventListener('click', () => (asistan.hidden = true));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const s = girdi.value.trim();
      if (!s) return;
      balon(s, 'ben');
      girdi.value = '';
      sor(s);
    });
  }

  /* ---- dalga boyu matrisi: sıralama + arama ---- */
  const matris = $('[data-matris]');
  if (matris) {
    const govde = $('tbody', matris);
    const satirlar = () => $$('tr', govde);
    $$('th.sirala', matris).forEach((th, i) =>
      th.addEventListener('click', () => {
        const yon = th.dataset.yon === 'asc' ? 'desc' : 'asc';
        $$('th.sirala', matris).forEach((x) => delete x.dataset.yon);
        th.dataset.yon = yon;
        const idx = [...th.parentNode.children].indexOf(th);
        const sayisal = th.dataset.tip === 'sayi';
        satirlar()
          .sort((a, b) => {
            const x = a.cells[idx].dataset.s ?? a.cells[idx].textContent.trim();
            const y = b.cells[idx].dataset.s ?? b.cells[idx].textContent.trim();
            const r = sayisal ? (parseFloat(x) || 0) - (parseFloat(y) || 0) : x.localeCompare(y, 'tr');
            return yon === 'asc' ? r : -r;
          })
          .forEach((tr) => govde.appendChild(tr));
      })
    );
    $('[data-matris-ara]')?.addEventListener('input', (e) => {
      const q = norm(e.target.value);
      let n = 0;
      satirlar().forEach((tr) => {
        const havuz = (tr.dataset.arama || '') + ' ' + norm(tr.textContent);
        const gor = !q || havuz.includes(q);
        tr.classList.toggle('gizli', !gor);
        if (gor) n++;
      });
      const s = $('[data-matris-sayi]');
      if (s) s.textContent = `${n} cihaz`;
    });
  }
})();
