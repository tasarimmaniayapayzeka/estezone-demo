/* Tema paletlerinde WCAG kontrast denetimi.
   AA: küçük metin >= 4.5:1, büyük metin (>=24px veya >=18.66px kalın) >= 3:1 */
const fs = require('fs');
const path = require('path');

const coz = (h) => {
  h = h.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const parlaklik = (rgb) => {
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const oran = (a, b) => {
  const [l1, l2] = [parlaklik(coz(a)), parlaklik(coz(b))].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/* her tema için: [zemin, [ [ad, renk, buyukMu], ... ] ] */
const TEMALAR = {
  'v1 koyu': [
    '#06090f',
    [
      ['gövde metni  --metin-2', '#9fb1cb', false],
      ['ikincil      --metin-3', '#6b7f9c', false],
      ['başlık       --metin', '#eaf1fb', true],
      ['vurgu        --vurgu', '#2dd4f5', false],
    ],
  ],
  'v2 açık': [
    '#ffffff',
    [
      ['gövde metni  --metin-2', '#33404f', false],
      ['ikincil      --metin-3', '#5b6878', false],
      ['başlık       --metin', '#0f1720', true],
      ['vurgu        --m-600', '#0d5490', false],
    ],
  ],
  'v3 editoryal': [
    '#faf8f5',
    [
      ['gövde metni  --metin-2', '#3f4a46', false],
      ['ikincil      --metin-3', '#66726c', false],
      ['başlık       --metin', '#171d1b', true],
      ['marka        --y-600', '#2d5f54', false],
      ['pirinç       --pirinc', '#8f6a33', false],
    ],
  ],
  'v4 spektrum': [
    '#0b0910',
    [
      ['gövde metni  --metin-2', '#b5a9d1', false],
      ['ikincil      --metin-3', '#8177a0', false],
      ['başlık       --metin', '#f3effb', true],
      ['mor          --mor', '#a855f7', false],
      ['mint         --mint', '#2ee6d6', false],
      ['pembe        --pembe', '#ff4d9d', false],
      ['kehribar     --kehribar', '#ffb340', false],
    ],
  ],
};

let hata = 0;
for (const [tema, [zemin, renkler]] of Object.entries(TEMALAR)) {
  console.log(`\n── ${tema}   zemin ${zemin}`);
  for (const [ad, renk, buyuk] of renkler) {
    const o = oran(renk, zemin);
    const esik = buyuk ? 3 : 4.5;
    const gecti = o >= esik;
    if (!gecti) hata++;
    console.log(
      `   ${gecti ? '✓' : '✗'} ${ad.padEnd(26)} ${renk}  ${o.toFixed(2)}:1  (gereken ${esik}:1)`
    );
  }
}
console.log(`\n${hata === 0 ? '✓ tüm renkler WCAG AA geçiyor' : '✗ ' + hata + ' renk AA altında'}`);
process.exit(hata ? 1 : 0);
