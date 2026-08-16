/* Estezone Bayi Ağı Programı — sayfa kabuğu ve ortak bileşenler */

const MENU = [
  ['index.html', 'Program'],
  ['rakip.html', 'Rakip kıyası'],
  ['basvuru.html', 'P1 Başvuru'],
  ['bolge.html', 'P2 Bölge'],
  ['portal.html', 'P3 Portal'],
  ['merkez-bul.html', 'P4 Merkez bul'],
  ['kazanc.html', 'P5 Kazanç'],
  ['asistan.html', 'P6 Asistan'],
  ['akademi.html', 'P7 Akademi'],
  ['pazarlama.html', 'P8 Ko-op'],
  ['seo.html', 'SEO'],
  ['dijital.html', 'Dijital plan'],
  ['alternatif.html', 'Alternatifler'],
  ['yol-haritasi.html', 'Yol haritası'],
];

function kacis(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Sayfa kabuğu — demo bandı ve noindex ZORUNLU (proje kuralı) */
function kabuk({ dosya, baslik, aciklama, govde, js = '' }) {
  const nav = MENU.map(
    ([d, ad]) =>
      `<a href="${d}"${d === dosya ? ' class="aktif" aria-current="page"' : ''}>${ad}</a>`
  ).join('');

  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${kacis(baslik)} · Estezone Yetkili Ağ Programı</title>
<meta name="description" content="${kacis(aciklama)}">
<link rel="stylesheet" href="stil.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%230d5490'/><text x='16' y='22' font-size='17' font-family='sans-serif' font-weight='700' fill='%23fff' text-anchor='middle'>E</text></svg>">
</head>
<body>

<div class="demo-bant" role="note">
  <strong>TASARIM DEMOSU</strong> — Estezone Medikal’in resmî sitesi veya resmî bayilik
  programı değildir. Teklif/sunum amaçlı prototiptir; tüm rakamlar temsilîdir.
</div>

<header class="ust">
  <a class="marka" href="index.html">
    <span class="marka-ad">Estezone</span>
    <span class="marka-alt">Yetkili Ağ Programı</span>
  </a>
  <button class="menu-ac" aria-label="Menü" aria-expanded="false">☰</button>
  <nav class="gezinme">${nav}</nav>
</header>

<main>${govde}</main>

<footer class="alt">
  <div class="sinir">
    <p class="alt-ad">Estezone Yetkili Ağ Programı — prototip seti</p>
    <p>16 Ağustos 2026 · 8 prototip, 14 sayfa · Bu belge Estezone Medikal’e sunulmak üzere hazırlanmış bir tekliftir.</p>
    <p class="alt-uyari">
      Sayfalardaki formlar, portal ve asistan <strong>demo</strong>dur — hiçbir yere veri
      göndermez. Kazanç, KPI ve marj rakamları firmadan veri gelmeden yerleştirilmiş
      varsayımlardır. Mevzuat notları bilgilendirme amaçlıdır, hukuk danışmanı onayı gerekir.
    </p>
    <nav class="alt-gez">${nav}</nav>
  </div>
</footer>

<script src="app.js"></script>
${js ? `<script>\n${js}\n</script>` : ''}
</body>
</html>`;
}

/* ---------- ortak bileşenler ---------- */

function hero({ etiket, baslik, spot, notlar = [] }) {
  return `<section class="hero">
  <div class="sinir">
    <span class="etiket">${etiket}</span>
    <h1>${baslik}</h1>
    <p class="spot">${spot}</p>
    ${notlar.length ? `<ul class="hero-not">${notlar.map((n) => `<li>${n}</li>`).join('')}</ul>` : ''}
  </div>
</section>`;
}

function bolum({ id = '', baslik, ustBaslik = '', icerik, zemin = '' }) {
  return `<section class="bolum ${zemin}"${id ? ` id="${id}"` : ''}>
  <div class="sinir">
    ${ustBaslik ? `<span class="ust-baslik">${ustBaslik}</span>` : ''}
    ${baslik ? `<h2>${baslik}</h2>` : ''}
    ${icerik}
  </div>
</section>`;
}

function kutu(baslik, icerik, tip = '') {
  return `<div class="kutu ${tip}"><h4>${baslik}</h4><div>${icerik}</div></div>`;
}

function rozet(metin, tip = '') {
  return `<span class="rozet ${tip}">${metin}</span>`;
}

function tablo(basliklar, satirlar, sinif = '') {
  return `<div class="tablo-sar"><table class="${sinif}">
<thead><tr>${basliklar.map((b) => `<th>${b}</th>`).join('')}</tr></thead>
<tbody>${satirlar.map((s) => `<tr>${s.map((h) => `<td>${h}</td>`).join('')}</tr>`).join('')}</tbody>
</table></div>`;
}

module.exports = { kabuk, hero, bolum, kutu, rozet, tablo, kacis, MENU };
