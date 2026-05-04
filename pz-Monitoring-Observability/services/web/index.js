const http = require('http');
const https = require('https');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Запит до WebAPI
    http.get('http://webapi:4000/health', (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => data += chunk);
      apiRes.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>Web Service</h1><p>WebAPI status: ${data}</p>`);
      });
    }).on('error', () => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Web Service</h1><p>WebAPI status: unavailable</p>`);
    });
  }
});

server.listen(PORT, () => console.log(`Web running on port ${PORT}`));