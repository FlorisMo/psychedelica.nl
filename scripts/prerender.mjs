#!/usr/bin/env node
/* ============================================================
   scripts/prerender.mjs

   Build step for Psychedelica.nl. For every articles/<slug>/content.js,
   writes:
     /nl/articles/<slug>/index.html   — full Dutch static article
     /en/articles/<slug>/index.html   — full English static article
     /articles/<slug>/index.html      — legacy meta-refresh to /nl/...

   Also regenerates /sitemap.xml with symmetric xhtml:link alternates
   for every language of every article.

   Deterministic: same input → byte-identical output.
   Incremental: reuses existing output when content.js and template
     hashes haven't changed.

   Flags: --force  — ignore cache, rebuild everything.
   ============================================================ */

import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

import {
  renderArticle,
  DEFAULT_BASE_URL,
  paragraphsToPlainText,
  pickField,
  pickLangArray,
} from './templates/article.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'articles');
const OUT_NL = path.join(ROOT, 'nl', 'articles');
const OUT_EN = path.join(ROOT, 'en', 'articles');
const OUT_LEGACY = path.join(ROOT, 'articles');
const CACHE_FILE = path.join(ROOT, '.prerender-cache.json');

const BASE_URL = process.env.SITE_BASE_URL || DEFAULT_BASE_URL;
const FORCE = process.argv.includes('--force');

/* ------------------------------ helpers ------------------------------ */

function log(msg) {
  process.stdout.write(msg + '\n');
}

function hashString(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
}

async function hashFile(file) {
  const buf = await readFile(file);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function readJsonSafe(file) {
  try {
    const raw = await readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

/**
 * Return the ISO-8601 timestamp of the last commit that touched the given
 * file. Falls back to `null` when outside a git checkout or when the file has
 * no commit history yet (fresh add, un-committed local edit). Callers treat
 * null as "use the content.js `meta.date` instead".
 *
 * Pure: same repo state → same output → deterministic build output.
 */
function gitLastModified(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    });
    const iso = out.trim();
    return iso || null;
  } catch {
    return null;
  }
}

async function writeIfChanged(file, content) {
  await ensureDir(path.dirname(file));
  if (existsSync(file)) {
    const existing = await readFile(file, 'utf8');
    if (existing === content) return false;
  }
  await writeFile(file, content, 'utf8');
  return true;
}

/* ------------------------------ load content.js via vm ------------------------------ */

/**
 * Safely evaluate an article's content.js inside an isolated vm context.
 * The file assigns to `window.SITE_CONTENT`. We expose `window` and capture.
 */
function loadContentJs(source, slug) {
  const sandbox = {
    window: {},
    document: undefined,
    console,
  };
  vm.createContext(sandbox);
  try {
    vm.runInContext(source, sandbox, {
      filename: `articles/${slug}/content.js`,
      timeout: 5000,
    });
  } catch (err) {
    throw new Error(`Failed to evaluate articles/${slug}/content.js: ${err.message}`);
  }
  const data = sandbox.window && sandbox.window.SITE_CONTENT;
  if (!data || typeof data !== 'object') {
    throw new Error(`articles/${slug}/content.js did not set window.SITE_CONTENT`);
  }
  if (!data.meta || !data.meta.slug) {
    throw new Error(`articles/${slug}/content.js is missing meta.slug`);
  }
  if (data.meta.slug !== slug) {
    throw new Error(
      `articles/${slug}/content.js: meta.slug "${data.meta.slug}" does not match folder "${slug}"`
    );
  }
  return data;
}

/* ------------------------------ discovery ------------------------------ */

async function discoverArticles() {
  const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const slugs = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const contentJs = path.join(ARTICLES_DIR, entry.name, 'content.js');
    if (existsSync(contentJs)) slugs.push(entry.name);
  }
  slugs.sort();
  return slugs;
}

/**
 * List any per-article JS files (e.g. quiz.js) that live alongside
 * content.js. They get included on the pre-rendered page as absolute
 * URLs so both /nl/ and /en/ load the same script from /articles/<slug>/.
 */
async function discoverExtraScripts(slug) {
  const dir = path.join(ARTICLES_DIR, slug);
  const entries = await readdir(dir, { withFileTypes: true });
  const scripts = [];
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (!e.name.endsWith('.js')) continue;
    if (e.name === 'content.js') continue;
    scripts.push(e.name);
  }
  scripts.sort();
  return scripts;
}

/* ------------------------------ legacy redirect stub ------------------------------ */

function legacyStubHtml(slug) {
  const target = `/nl/articles/${slug}/`;
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Redirecting…</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${BASE_URL}${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>window.location.replace(${JSON.stringify(target)});</script>
</head>
<body>
<p>This article has moved to <a href="${target}">${BASE_URL}${target}</a>.</p>
</body>
</html>
`;
}

/* ------------------------------ sitemap ------------------------------ */

function buildSitemap(articles) {
  const staticUrls = [
    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly', langs: { nl: `${BASE_URL}/`, en: `${BASE_URL}/en/` } },
    { loc: `${BASE_URL}/artikelen/`, priority: '0.8', changefreq: 'weekly', langs: { nl: `${BASE_URL}/artikelen/`, en: `${BASE_URL}/en/articles/` } },
  ];

  const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const urlBlock = (loc, lastmod, priority, changefreq, alternates) => {
    const parts = [`  <url>`, `    <loc>${xmlEscape(loc)}</loc>`];
    if (lastmod) parts.push(`    <lastmod>${xmlEscape(lastmod)}</lastmod>`);
    if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
    if (priority) parts.push(`    <priority>${priority}</priority>`);
    for (const [hreflang, href] of alternates) {
      parts.push(`    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${xmlEscape(href)}"/>`);
    }
    parts.push(`  </url>`);
    return parts.join('\n');
  };

  const blocks = [];
  for (const s of staticUrls) {
    blocks.push(
      urlBlock(s.loc, null, s.priority, s.changefreq, [
        ['nl', s.langs.nl],
        ['en', s.langs.en],
        ['x-default', s.langs.en],
      ])
    );
  }

  for (const a of articles) {
    const nlUrl = `${BASE_URL}/nl/articles/${a.slug}/`;
    const enUrl = `${BASE_URL}/en/articles/${a.slug}/`;
    const alts = [
      ['nl', nlUrl],
      ['en', enUrl],
      ['x-default', enUrl],
    ];
    blocks.push(urlBlock(nlUrl, a.date, '0.9', 'monthly', alts));
    blocks.push(urlBlock(enUrl, a.date, '0.9', 'monthly', alts));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join('\n')}
</urlset>
`;
}

/* ------------------------------ llms.txt ------------------------------ */

/**
 * llmstxt.org convention: English body, H1 site name, a short tagline, and
 * one list entry per resource. Lists every article in both /nl/ and /en/ with
 * a one-sentence English description sourced from the EN subtitle (or the
 * first line of the EN intro, truncated to ~140 chars).
 */
function buildLlmsTxt(articles) {
  const oneLine = (data) => {
    const meta = data.meta || {};
    const candidates = [
      pickField(meta, 'subtitle', 'en'),
      paragraphsToPlainText(pickLangArray(data, 'intro', 'en'), 'en'),
      paragraphsToPlainText(pickLangArray(data, 'preamble', 'en'), 'en'),
    ];
    for (const c of candidates) {
      const s = (c || '').trim().replace(/\s+/g, ' ');
      if (s) return s.length > 140 ? s.slice(0, 137).trimEnd() + '…' : s;
    }
    return '';
  };

  const lines = [];
  lines.push('# Psychedelica.nl');
  lines.push('');
  lines.push(
    '> Honest, no-nonsense knowledge about psychedelics for the Dutch public. Science, harm reduction, and clear answers in NL and EN.'
  );
  lines.push('');

  lines.push('## Dutch articles');
  lines.push('');
  for (const a of articles) {
    const titleNl = pickField(a.data.meta || {}, 'title', 'nl') || a.slug;
    const desc = oneLine(a.data);
    lines.push(`- [${titleNl}](${BASE_URL}/nl/articles/${a.slug}/): ${desc}`);
  }
  lines.push('');

  lines.push('## English articles');
  lines.push('');
  for (const a of articles) {
    const titleEn = pickField(a.data.meta || {}, 'title', 'en') || a.slug;
    const desc = oneLine(a.data);
    lines.push(`- [${titleEn}](${BASE_URL}/en/articles/${a.slug}/): ${desc}`);
  }
  lines.push('');

  return lines.join('\n');
}

/* ------------------------------ main ------------------------------ */

async function main() {
  const start = Date.now();
  log(`[prerender] base URL: ${BASE_URL}`);

  // Compute a template hash that covers anything that could change output
  // shape — if any of these change, rebuild every article.
  const templateFiles = [
    path.join(__dirname, 'prerender.mjs'),
    path.join(__dirname, 'templates', 'article.mjs'),
  ];
  const templateHashes = await Promise.all(templateFiles.map((f) => hashFile(f)));
  const templateHash = hashString(templateHashes.join('|'));

  const slugs = await discoverArticles();
  log(`[prerender] discovered ${slugs.length} article(s)`);

  const cache = (await readJsonSafe(CACHE_FILE)) || { templateHash: null, articles: {} };
  const cacheValid = !FORCE && cache.templateHash === templateHash;

  const builtArticles = [];
  let writes = 0;
  let skipped = 0;

  for (const slug of slugs) {
    const contentPath = path.join(ARTICLES_DIR, slug, 'content.js');
    const source = await readFile(contentPath, 'utf8');
    const contentHash = hashString(source);

    let data;
    try {
      data = loadContentJs(source, slug);
    } catch (err) {
      log(`[prerender] ERROR: ${err.message}`);
      process.exitCode = 1;
      continue;
    }

    // dateModified: git commit timestamp of the most recent change to
    // content.js. Falls back to meta.date outside a git checkout.
    const dateModified = gitLastModified(contentPath) || data.meta.date;

    const articleMeta = {
      slug,
      date: data.meta.date,
      dateModified,
      contentHash,
      data,
    };
    builtArticles.push(articleMeta);

    const prev = cache.articles[slug];
    const outputsExist =
      existsSync(path.join(OUT_NL, slug, 'index.html')) &&
      existsSync(path.join(OUT_EN, slug, 'index.html')) &&
      existsSync(path.join(OUT_LEGACY, slug, 'index.html'));

    if (
      cacheValid &&
      prev &&
      prev.contentHash === contentHash &&
      prev.dateModified === dateModified &&
      outputsExist
    ) {
      skipped++;
      continue;
    }

    // Extra per-article scripts (quiz.js, etc.) referenced via absolute URL
    const extraScripts = (await discoverExtraScripts(slug)).map(
      (name) => `/articles/${slug}/${name}`
    );

    // Render NL + EN
    for (const lang of ['nl', 'en']) {
      const html = renderArticle(data, lang, {
        slug,
        baseUrl: BASE_URL,
        extraScripts,
        dateModified,
      });
      const outFile = path.join(lang === 'nl' ? OUT_NL : OUT_EN, slug, 'index.html');
      if (await writeIfChanged(outFile, html)) writes++;
    }

    // Legacy redirect stub (plain folder at /articles/<slug>/)
    const stub = legacyStubHtml(slug);
    const legacyFile = path.join(OUT_LEGACY, slug, 'index.html');
    if (await writeIfChanged(legacyFile, stub)) writes++;

    log(`[prerender] built ${slug}`);
  }

  // Sitemap — always regenerate (it's trivially small, input covers all slugs).
  // `lastmod` tracks the git-sourced dateModified so crawlers see fresh edits
  // without needing content.js `meta.date` to be manually bumped.
  const articleList = builtArticles.map((a) => ({
    slug: a.slug,
    date: (a.dateModified || a.date || '').slice(0, 10),
  }));
  articleList.sort((a, b) => a.slug.localeCompare(b.slug));
  const sitemap = buildSitemap(articleList);
  if (await writeIfChanged(path.join(ROOT, 'sitemap.xml'), sitemap)) writes++;

  // llms.txt — always regenerate (small, input is the union of all articles)
  const llmsList = [...builtArticles].sort((a, b) => a.slug.localeCompare(b.slug));
  const llms = buildLlmsTxt(llmsList);
  if (await writeIfChanged(path.join(ROOT, 'llms.txt'), llms)) writes++;

  // Persist cache
  const newCache = {
    templateHash,
    articles: Object.fromEntries(
      builtArticles.map((a) => [a.slug, { contentHash: a.contentHash, dateModified: a.dateModified }])
    ),
  };
  await writeFile(CACHE_FILE, JSON.stringify(newCache, null, 2), 'utf8');

  const ms = Date.now() - start;
  log(
    `[prerender] done in ${ms}ms — ${builtArticles.length} article(s), ${skipped} up-to-date, ${writes} file(s) written`
  );
}

main().catch((err) => {
  console.error('[prerender] fatal:', err);
  process.exit(1);
});
