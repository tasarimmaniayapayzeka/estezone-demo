/* Bayi programı prototipleri için ayrı sunucu — port 8055.
   Ana proje sunucusu (8050) ile çakışmaz; paralel oturum güvenli. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, 'cikti');
const PORT = 8055;
const TIP = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };

http
  .createServer((istek, cevap) => {
    let yol = decodeURIComponent(istek.url.split('?')[0]);
    if (yol === '/' || yol === '') yol = '/index.html';
    const dosya = path.join(KOK, yol);
    if (!dosya.startsWith(KOK) || !fs.existsSync(dosya) || fs.statSync(dosya).isDirectory()) {
      cevap.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      return cevap.end('<h1>404</h1><p><a href="/">Başa dön</a></p>');
    }
    cevap.writeHead(200, { 'content-type': TIP[path.extname(dosya)] || 'application/octet-stream' });
    fs.createReadStream(dosya).pipe(cevap);
  })
  .listen(PORT, () => console.log(`Bayi prototipleri: http://localhost:${PORT}`));
