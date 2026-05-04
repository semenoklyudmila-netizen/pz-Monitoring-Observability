const http = require('http');

const PORT = 4000;
let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount++;

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
  } else if (req.url === '/metrics') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`# HELP requests_total Total requests\n# TYPE requests_total counter\nrequests_total ${requestCount}\n`);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
});

server.listen(PORT, () => console.log(`WebAPI running on port ${PORT}`));