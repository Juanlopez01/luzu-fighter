const http = require('http');
const fs = require('fs');
const path = require('path');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.webp': 'image/webp' };
http.createServer((req, res) => {
  let p = path.join(__dirname, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(3333, () => console.log('Server running on http://localhost:3333'));
