import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
if (!existsSync(resolve(root, "index.html")))
  throw new Error("Run npm run build before npm start.");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
};
const server = http.createServer((req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    res.writeHead(400);
    res.end();
    return;
  }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) {
    res.writeHead(403);
    res.end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory())
    file = resolve(file, "index.html");
  let status = 200;
  if (!existsSync(file) && existsSync(file + ".html")) file += ".html";
  if (!existsSync(file) || !statSync(file).isFile()) {
    file = resolve(root, "404.html");
    status = 404;
  }
  res.writeHead(status, {
    "Content-Type": types[extname(file)] ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": pathname.startsWith("/_next/static/")
      ? "public, max-age=31536000, immutable"
      : "no-cache",
  });
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  createReadStream(file).pipe(res);
});
const port = Number(process.env.PORT ?? 3000);
server.listen(port, "127.0.0.1", () =>
  console.log(`Portfolio: http://127.0.0.1:${port}`),
);
