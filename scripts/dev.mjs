#!/usr/bin/env node
/* ============================================================
   scripts/dev.mjs

   Local dev: watches content.js files and the shared templates,
   re-runs the prerender on change, and serves the repo root on
   http://localhost:8080.

   Zero dependencies. Uses only Node standard library.
   ============================================================ */

import { readFile, stat, readdir } from 'node:fs/promises';
import { existsSync, watch } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 8080);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function runPrerender() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(__dirname, 'prerender.mjs')], {
      stdio: 'inherit',
      cwd: ROOT,
    });
    child.on('close', (code) => resolve(code));
  });
}

/* ---- tiny static server, no traversal ---- */

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.posix.normalize(decoded).replace(/^\/+/, '');
  const abs = path.resolve(root, normalized);
  if (!abs.startsWith(root)) return null;
  return abs;
}

async function serveFile(res, filepath) {
  try {
    const body = await readFile(filepath);
    const ext = path.extname(filepath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(body);
    return true;
  } catch {
    return false;
  }
}

async function resolveRequest(urlPath) {
  let abs = safeJoin(ROOT, urlPath);
  if (!abs) return null;
  try {
    const s = await stat(abs);
    if (s.isDirectory()) {
      abs = path.join(abs, 'index.html');
      const s2 = await stat(abs);
      if (s2.isFile()) return abs;
      return null;
    }
    if (s.isFile()) return abs;
  } catch {
    // fall through
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.endsWith('/') ? req.url + 'index.html' : req.url;
  let file = await resolveRequest(req.url);
  if (!file) file = await resolveRequest(urlPath);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }
  const ok = await serveFile(res, file);
  if (!ok) {
    res.writeHead(500);
    res.end('500');
  }
});

/* ---- watcher: coalesce rapid changes, re-run prerender ---- */

let pending = null;
function scheduleRebuild() {
  if (pending) clearTimeout(pending);
  pending = setTimeout(async () => {
    pending = null;
    console.log('[dev] change detected, rebuilding…');
    await runPrerender();
  }, 150);
}

function watchTree(dir, filter) {
  if (!existsSync(dir)) return;
  try {
    watch(dir, { recursive: true }, (evt, filename) => {
      if (!filename) return;
      if (filter && !filter(filename)) return;
      scheduleRebuild();
    });
  } catch (err) {
    console.warn(`[dev] could not watch ${dir}:`, err.message);
  }
}

async function main() {
  const code = await runPrerender();
  if (code !== 0) {
    console.error('[dev] initial prerender failed; fix errors and save to retry');
  }

  watchTree(path.join(ROOT, 'articles'), (f) => f.endsWith('content.js') || f.endsWith('index.json'));
  watchTree(path.join(__dirname, 'templates'), (f) => f.endsWith('.mjs'));
  // Also watch prerender.mjs itself
  watch(path.join(__dirname, 'prerender.mjs'), () => scheduleRebuild());

  server.listen(PORT, () => {
    console.log(`[dev] serving ${ROOT}`);
    console.log(`[dev] http://localhost:${PORT}/`);
    console.log(`[dev] watching articles/*/content.js and scripts/templates/*.mjs`);
  });
}

main();
