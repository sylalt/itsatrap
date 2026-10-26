const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.resolve(__dirname, '..', 'dist');
const port = Number(process.env.PORT) || 3000;
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
};

http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  const file = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  const relativePath = path.relative(root, file);
  if (relativePath === '..' || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  const stream = fs.createReadStream(file);
  stream.on('open', () => {
    response.setHeader('Content-Type', contentTypes[path.extname(file)] || 'application/octet-stream');
  });
  stream.on('error', () => {
    if (!response.headersSent) {
      response.writeHead(404);
      response.end('Not found');
    } else {
      response.destroy();
    }
  });
  stream.pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`It’s a Trap is available at http://localhost:${port}`);
});
