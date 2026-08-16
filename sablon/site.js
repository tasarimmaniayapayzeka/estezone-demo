/* Estezone Medikal — istemci betiği (bağımlılıksız) */
(() => {
  'use strict';
  const $ = (s, k = document) => k.querySelector(s);
  const $$ = (s, k = document) => [...k.querySelectorAll(s)];
  const TR = (n) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

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

  /* ---- cihaz filtresi + arama ---- */
  const filtre = $('[data-filtre]');
  if (filtre) {
    const kartlar = $$('[data-cihaz]');
    const sayacEl = $('[data-sonuc-sayi]');
    const bosEl = $('[data-bos]');
    const aramaEl = $('[data-ara]');
    let kategori = 'hepsi';

    const uygula = () => {
      const q = (aramaEl?.value || '').trim().toLocaleLowerCase('tr');
      let n = 0;
      kartlar.forEach((k) => {
        const kUygun = kategori === 'hepsi' || k.dataset.k === kategori;
        const qUygun = !q || (k.dataset.arama || '').includes(q);
        const gor = kUygun && qUygun;
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
    aramaEl?.addEventListener('input', uygula);

    // ?k=kategori ile derin bağlantı
    const url = new URLSearchParams(location.search).get('k');
    if (url) $(`[data-k-filtre="${CSS.escape(url)}"]`)?.click();
    else uygula();
  }

  /* ---- cihaz galerisi ---- */
  const galeri = $('[data-galeri]');
  if (galeri) {
    const ana = $('[data-ana-gorsel]', galeri);
    $$('[data-kucuk]', galeri).forEach((b) =>
      b.addEventListener('click', () => {
        ana.src = b.dataset.kucuk;
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
          (c) => `<a class="c-kart" data-k="${c.kategori}" href="${c.url}">
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
              `<th><div style="display:flex;gap:.6rem;align-items:center"><img src="${c.gorsel}" alt="" width="42" height="42" style="object-fit:contain;background:var(--yuzey);border-radius:8px;padding:3px"><span>${c.ad}</span></div></th>`
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
})();
