import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  // Strip query parameters
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distPath, urlPath === '/' ? 'index.html' : urlPath);
  
  // If file doesn't exist, fallback to index.html (SPA behavior)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distPath, 'index.html');
  } else {
    // If it's a directory, serve index.html inside it
    if (fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Final fallback to root index.html
      fs.readFile(path.join(distPath, 'index.html'), (err, content) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(0, async () => {
  const port = server.address().port;
  console.log(`Server started on port ${port} for prerendering...`);
  
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // The main routes to prerender
    const routes = ['/', '/application', '/services', '/contact', '/download-app','/privacy', '/terms'];
    
    for (const route of routes) {
      console.log(`Prerendering ${route}...`);
      const page = await browser.newPage();
      
      // Navigate and wait until network is mostly idle
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });
      
      // Wait extra time for React Suspense/lazy loading to complete
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      let html = await page.content();
      
      // Define path for the output HTML file
      let dir = distPath;
      if (route !== '/') {
        dir = path.join(distPath, route);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }
      
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      console.log(`Saved ${route}`);
      
      await page.close();
    }
    
    await browser.close();
    console.log('Prerendering completed successfully.');
  } catch (error) {
    console.error('Prerendering failed:', error);
    process.exit(1);
  } finally {
    server.close();
  }
});
