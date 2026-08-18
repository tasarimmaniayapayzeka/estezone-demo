/* Kısa sunum — okuma çubuğu + perde videolarının görünürken oynaması.
   Kütüphane yok. */
(() => {
  const cubuk = document.querySelector('[data-ilerleme]');
  if (cubuk) {
    const ciz = () => {
      const h = document.documentElement;
      const t = h.scrollHeight - h.clientHeight;
      cubuk.style.width = t > 0 ? (h.scrollTop / t) * 100 + '%' : '0%';
    };
    addEventListener('scroll', ciz, { passive: true });
    addEventListener('resize', ciz);
    ciz();
  }

  /* Perde videoları preload="none"; ekrana girince yüklenip oynar, çıkınca durur.
     Kapak videosu autoplay olduğu için bu gözlemcinin dışında bırakılmaz —
     zaten görünür durumda başlar. */
  const v = [...document.querySelectorAll('video')];
  if (v.length && 'IntersectionObserver' in window) {
    const g = new IntersectionObserver(
      (girdiler) =>
        girdiler.forEach((gi) => {
          const e = gi.target;
          if (gi.isIntersecting) {
            if (e.preload !== 'auto') e.preload = 'auto';
            e.play().catch(() => {}); // reddedilirse poster kalır, sayfa bozulmaz
          } else {
            e.pause();
          }
        }),
      { threshold: 0.25 }
    );
    v.forEach((e) => {
      e.muted = true;
      e.setAttribute('muted', '');
      e.playsInline = true;
      g.observe(e);
    });
  }
})();
