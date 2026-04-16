#!/usr/bin/env node
/* ============================================================
   scripts/validate.mjs

   Post-build validation. Reads each built HTML file directly
   (no browser, no JS) and asserts:

   - ≥ 80% of the article's published word count is present in raw HTML
   - Three parseable JSON-LD blocks (BlogPosting, FAQPage, BreadcrumbList)
   - <link rel="canonical"> matches the file's expected URL
   - Three hreflang alternates (nl, en, x-default)
   - <html lang> matches URL language
   - <title> and <meta name="description"> non-empty

   Exits code 1 on any failure.
   ============================================================ */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

import { computeArticleWordCount, DEFAULT_BASE_URL } from './templates/article.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'articles');
const BASE_URL = process.env.SITE_BASE_URL || DEFAULT_BASE_URL;

const WORD_COUNT_MIN_RATIO = 0.8;

function loadContentJs(source, slug) {
  const sandbox = { window: {}, document: undefined, console };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: `articles/${slug}/content.js`, timeout: 5000 });
  return sandbox.window.SITE_CONTENT;
}

async function discoverArticles() {
  const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const slugs = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (existsSync(path.join(ARTICLES_DIR, entry.name, 'content.js'))) slugs.push(entry.name);
  }
  slugs.sort();
  return slugs;
}

/* ---- HTML parsers kept deliberately tight & regex-based (no deps) ---- */

function stripHtml(html) {
  // Remove script + style blocks entirely
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return stripped
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function rawWordCount(html) {
  const text = stripHtml(html);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function matchAttr(tag, attr) {
  const re = new RegExp(`${attr}\\s*=\\s*"([^"]*)"`, 'i');
  const m = tag.match(re);
  return m ? m[1] : null;
}

function findAll(html, tagRe) {
  const out = [];
  let m;
  while ((m = tagRe.exec(html)) !== null) out.push(m);
  return out;
}

function extractJsonLdBlocks(html) {
  const re = /<script[^>]*type\s*=\s*"application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const body = m[1]
      .replace(/\\u003c/gi, '<')
      .replace(/\\u003e/gi, '>')
      .trim();
    try {
      out.push(JSON.parse(body));
    } catch (err) {
      out.push({ __invalid: true, err: err.message });
    }
  }
  return out;
}

function extractHreflang(html) {
  const re = /<link\b[^>]*>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    const rel = matchAttr(tag, 'rel');
    if (!rel || rel.toLowerCase() !== 'alternate') continue;
    const hreflang = matchAttr(tag, 'hreflang');
    const href = matchAttr(tag, 'href');
    if (hreflang) out.push({ hreflang, href });
  }
  return out;
}

function extractCanonical(html) {
  const re = /<link\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    const rel = matchAttr(tag, 'rel');
    if (rel && rel.toLowerCase() === 'canonical') return matchAttr(tag, 'href');
  }
  return null;
}

function extractHtmlLang(html) {
  const m = html.match(/<html\b[^>]*\blang\s*=\s*"([^"]*)"/i);
  return m ? m[1] : null;
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : '';
}

function extractMetaDescription(html) {
  const re = /<meta\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    const name = matchAttr(tag, 'name');
    if (name && name.toLowerCase() === 'description') return (matchAttr(tag, 'content') || '').trim();
  }
  return '';
}

/* ---- validation ---- */

class Validator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.checks = 0;
  }
  fail(where, msg) {
    this.errors.push(`[FAIL] ${where}: ${msg}`);
  }
  ok() {
    this.checks++;
  }
  report() {
    for (const e of this.errors) console.error(e);
    for (const w of this.warnings) console.warn(w);
    if (this.errors.length) {
      console.error(`\nvalidate: ${this.errors.length} failure(s) across ${this.checks} checks`);
      process.exit(1);
    } else {
      console.log(`validate: OK — ${this.checks} checks passed`);
    }
  }
}

function validateFile({ v, html, slug, lang, data }) {
  const where = `/${lang}/articles/${slug}/`;
  const expectedCanonical = `${BASE_URL}/${lang}/articles/${slug}/`;
  const nlUrl = `${BASE_URL}/nl/articles/${slug}/`;
  const enUrl = `${BASE_URL}/en/articles/${slug}/`;

  // 1. html lang matches URL language
  const htmlLang = extractHtmlLang(html);
  if (htmlLang !== lang) v.fail(where, `<html lang> expected "${lang}", got "${htmlLang}"`);
  else v.ok();

  // 2. Canonical matches expected URL
  const canonical = extractCanonical(html);
  if (canonical !== expectedCanonical) {
    v.fail(where, `canonical expected "${expectedCanonical}", got "${canonical}"`);
  } else v.ok();

  // 3. Three hreflang alternates (nl, en, x-default)
  const alts = extractHreflang(html);
  const byLang = Object.fromEntries(alts.map((a) => [a.hreflang, a.href]));
  for (const required of ['nl', 'en', 'x-default']) {
    if (!byLang[required]) {
      v.fail(where, `missing hreflang "${required}" alternate`);
    } else v.ok();
  }
  if (byLang.nl && byLang.nl !== nlUrl) v.fail(where, `hreflang=nl href wrong: ${byLang.nl}`);
  else if (byLang.nl) v.ok();
  if (byLang.en && byLang.en !== enUrl) v.fail(where, `hreflang=en href wrong: ${byLang.en}`);
  else if (byLang.en) v.ok();
  if (byLang['x-default'] && byLang['x-default'] !== enUrl)
    v.fail(where, `hreflang=x-default href wrong: ${byLang['x-default']}`);
  else if (byLang['x-default']) v.ok();

  // 4. Title + meta description non-empty
  const title = extractTitle(html);
  if (!title) v.fail(where, `<title> is empty`);
  else v.ok();
  const desc = extractMetaDescription(html);
  if (!desc) v.fail(where, `<meta name="description"> is empty`);
  else v.ok();

  // 5. Three parseable JSON-LD blocks including the expected types
  const jsonLds = extractJsonLdBlocks(html);
  if (jsonLds.length < 3) {
    v.fail(where, `expected ≥ 3 JSON-LD blocks, got ${jsonLds.length}`);
  } else v.ok();
  const invalid = jsonLds.filter((j) => j.__invalid);
  if (invalid.length) v.fail(where, `unparseable JSON-LD blocks: ${invalid.length}`);
  else v.ok();

  const types = jsonLds.map((j) => j && j['@type']).filter(Boolean);
  for (const t of ['BlogPosting', 'FAQPage', 'BreadcrumbList']) {
    if (!types.includes(t)) v.fail(where, `JSON-LD missing @type "${t}"`);
    else v.ok();
  }

  // 6. ≥ 80% of published word count present in raw HTML
  const expectedWords = computeArticleWordCount(data, lang);
  const gotWords = rawWordCount(html);
  const ratio = expectedWords ? gotWords / expectedWords : 1;
  if (expectedWords > 0 && ratio < WORD_COUNT_MIN_RATIO) {
    v.fail(
      where,
      `word count ${gotWords} is only ${(ratio * 100).toFixed(1)}% of expected ${expectedWords} (min ${WORD_COUNT_MIN_RATIO * 100}%)`
    );
  } else v.ok();
}

async function main() {
  const v = new Validator();
  const slugs = await discoverArticles();
  if (!slugs.length) {
    console.error('validate: no articles found');
    process.exit(1);
  }

  for (const slug of slugs) {
    const source = await readFile(path.join(ARTICLES_DIR, slug, 'content.js'), 'utf8');
    const data = loadContentJs(source, slug);

    for (const lang of ['nl', 'en']) {
      const file = path.join(ROOT, lang, 'articles', slug, 'index.html');
      if (!existsSync(file)) {
        v.fail(`/${lang}/articles/${slug}/`, `built file missing: ${file}`);
        continue;
      }
      const html = await readFile(file, 'utf8');
      validateFile({ v, html, slug, lang, data });
    }

    // Legacy stub sanity: must meta-refresh to /nl/
    const legacy = path.join(ROOT, 'articles', slug, 'index.html');
    if (!existsSync(legacy)) {
      v.fail(`/articles/${slug}/`, 'legacy redirect stub missing');
    } else {
      const legacyHtml = await readFile(legacy, 'utf8');
      const refreshOk = /http-equiv\s*=\s*"refresh"/i.test(legacyHtml) && legacyHtml.includes(`/nl/articles/${slug}/`);
      const canonicalOk = extractCanonical(legacyHtml) === `${BASE_URL}/nl/articles/${slug}/`;
      if (!refreshOk) v.fail(`/articles/${slug}/`, 'meta-refresh to /nl/ missing');
      else v.ok();
      if (!canonicalOk) v.fail(`/articles/${slug}/`, 'canonical should point to /nl/');
      else v.ok();
    }
  }

  v.report();
}

main().catch((err) => {
  console.error('validate: fatal:', err);
  process.exit(1);
});
