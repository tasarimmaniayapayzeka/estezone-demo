// estezone ham HTML -> yapılandırılmış veri + görsel listesi
const fs = require('fs');
const path = require('path');

const HTML_DIR = path.join(__dirname, 'html');
const OUT = path.join(__dirname, '..', 'veri');
fs.mkdirSync(OUT, { recursive: true });

const decode = (s) =>
  s
    .replace(/&#8217;|&#8216;|&rsquo;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));

const stripTags = (s) =>
  decode(
    s
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();

const KURUMSAL = new Set(['hakkimizda', 'hizmetlerimiz', 'iletisim', 'cihazlarimiz']);

const sonuc = [];
const tumGorseller = new Set();

for (const dosya of fs.readdirSync(HTML_DIR).filter((f) => f.endsWith('.html'))) {
  const slug = dosya.replace(/\.html$/, '');
  const raw = fs.readFileSync(path.join(HTML_DIR, dosya), 'utf8');

  const title = (raw.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const desc =
    (raw.match(/<meta name="description" content="([\s\S]*?)"\s*\/?>/i) || [])[1] || '';
  const h1s = [...raw.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
  const h2s = [...raw.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => stripTags(m[1]));
  const h3s = [...raw.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => stripTags(m[1]));

  // ana içerik: WPBakery satırları
  let govde = raw;
  const m = raw.match(/<main[\s\S]*?<\/main>/i) || raw.match(/<article[\s\S]*?<\/article>/i);
  if (m) govde = m[0];
  const metin = stripTags(govde);

  // paragraflar
  const paragraflar = [...govde.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((x) => stripTags(x[1]))
    .filter((t) => t.length > 40);

  // liste maddeleri (teknik özellik adayları)
  const liste = [...govde.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((x) => stripTags(x[1]))
    .filter((t) => t.length > 3 && t.length < 220);

  // tablolar
  const tablolar = [...govde.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) =>
    [...t[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => stripTags(c[1]))
    )
  );

  // görseller (uploads klasöründen, logo/ikon hariç)
  const gorseller = [
    ...new Set(
      [...raw.matchAll(/https?:\/\/estezone\.com\.tr\/wp-content\/uploads\/[^"'\s)]+?\.(?:jpe?g|png|webp)/gi)].map(
        (x) => x[0]
      )
    ),
  ].filter((u) => !/logo|favicon|icon|placeholder|cropped/i.test(u));
  gorseller.forEach((g) => tumGorseller.add(g));

  sonuc.push({
    slug,
    tip: KURUMSAL.has(slug) ? 'kurumsal' : 'cihaz',
    title: decode(title).trim(),
    desc: decode(desc).trim(),
    h1: h1s,
    h2: h2s.filter((t) => t && t.length < 120),
    h3: h3s.filter((t) => t && t.length < 120),
    kelimeSayisi: metin.split(/\s+/).length,
    paragraflar: paragraflar.slice(0, 25),
    liste: liste.slice(0, 60),
    tablolar,
    gorseller: gorseller.slice(0, 20),
  });
}

sonuc.sort((a, b) => a.slug.localeCompare(b.slug, 'tr'));
fs.writeFileSync(path.join(OUT, 'ham-sayfalar.json'), JSON.stringify(sonuc, null, 2), 'utf8');
fs.writeFileSync(path.join(OUT, 'gorsel-listesi.txt'), [...tumGorseller].sort().join('\n'), 'utf8');

// özet tablo
console.log('slug'.padEnd(42), 'kelime'.padStart(7), 'görsel'.padStart(7), 'liste'.padStart(6), 'tablo'.padStart(6));
for (const s of sonuc) {
  console.log(
    s.slug.padEnd(42),
    String(s.kelimeSayisi).padStart(7),
    String(s.gorseller.length).padStart(7),
    String(s.liste.length).padStart(6),
    String(s.tablolar.length).padStart(6)
  );
}
console.log('\nTOPLAM sayfa:', sonuc.length, '| benzersiz görsel:', tumGorseller.size);
