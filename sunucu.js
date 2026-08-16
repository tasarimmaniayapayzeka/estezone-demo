/* Basit statik önizleme sunucusu — port 8050 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8050;
const KOK = path.join(__dirname, 'site');
const TIP = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

http
  .createServer((istek, cevap) => {
    let yol = decodeURIComponent(istek.url.split('?')[0]);
    if (yol.endsWith('/')) yol += 'index.html';
    const tam = path.join(KOK, yol);
    if (!tam.startsWith(KOK)) {
      cevap.writeHead(403).end('403');
      return;
    }
    fs.readFile(tam, (hata, veri) => {
      if (hata) {
        fs.readFile(path.join(KOK, '404.html'), (h2, v2) => {
          cevap.writeHead(404, { 'Content-Type': TIP['.html'] }).end(h2 ? 'Bulunamadı' : v2);
        });
        return;
      }
      cevap.writeHead(200, { 'Content-Type': TIP[path.extname(tam)] || 'application/octet-stream' }).end(veri);
    });
  })
  .listen(PORT, () => console.log(`Estezone önizleme: http://localhost:${PORT}/`));
