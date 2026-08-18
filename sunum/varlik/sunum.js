/* Sunum etkileşimi — dış kütüphane yok.
   Üç iş: okuma ilerlemesi, bölüm belirme, sahne videolarının görünürken oynaması. */
(() => {
  const $$ = (s, k = document) => [...k.querySelectorAll(s)];

  /* ---- okuma ilerleme çubuğu ---- */
  const cubuk = document.querySelector('[data-ilerleme]');
  if (cubuk) {
    const ciz = () => {
      const h = document.documentElement;
      const toplam = h.scrollHeight - h.clientHeight;
      cubuk.style.width = toplam > 0 ? (h.scrollTop / toplam) * 100 + '%' : '0%';
    };
    addEventListener('scroll', ciz, { passive: true });
    addEventListener('resize', ciz);
    ciz();
  }

  const azHareket = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- bölüm belirme ---- */
  if ('IntersectionObserver' in window && !azHareket) {
    const g = new IntersectionObserver(
      (girdiler) =>
        girdiler.forEach((gi) => {
          if (gi.isIntersecting) {
            gi.target.classList.add('gorundu');
            g.unobserve(gi.target);
          }
        }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 }
    );
    $$('.belir').forEach((e) => g.observe(e));
  } else {
    $$('.belir').forEach((e) => e.classList.add('gorundu'));
  }

  /* ---- sahne videoları ----
     preload="none" ile yüklenmiyorlar; ancak görünür olunca oynatılır ve
     ekrandan çıkınca durdurulur. Böylece sayfa açılışında 8 MB video inmez. */
  const videolar = $$('.sahne video');
  if (videolar.length && 'IntersectionObserver' in window) {
    const vg = new IntersectionObserver(
      (girdiler) =>
        girdiler.forEach((gi) => {
          const v = gi.target;
          if (gi.isIntersecting) {
            if (v.preload !== 'auto') v.preload = 'auto';
            /* Otomatik oynatma sessizken serbest; yine de reddedilme ihtimaline
               karşı yakalanır — reddedilirse poster karesi kalır, sayfa bozulmaz. */
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }),
      { threshold: 0.35 }
    );
    videolar.forEach((v) => {
      v.muted = true;
      v.setAttribute('muted', '');
      v.playsInline = true;
      vg.observe(v);
    });
  }

  /* ---- şeritte aktif bölüm ---- */
  const baglar = $$('.serit a');
  const hedefler = baglar
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (hedefler.length && 'IntersectionObserver' in window) {
    const sg = new IntersectionObserver(
      (girdiler) => {
        girdiler.forEach((gi) => {
          if (!gi.isIntersecting) return;
          baglar.forEach((a) => a.classList.remove('aktif'));
          const a = baglar.find((x) => x.getAttribute('href') === '#' + gi.target.id);
          if (a) {
            a.classList.add('aktif');
            /* aktif bağlantıyı yatay şeritte görünür tut */
            a.scrollIntoView({ block: 'nearest', inline: 'center' });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    hedefler.forEach((h) => sg.observe(h));
  }
})();
