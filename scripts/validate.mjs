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

import {
  computeArticleWordCount,
  DEFAULT_BASE_URL,
  homeUrl,
  listingUrl,
  articleUrl,
  langPrefix,
} from './templates/article.mjs';

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
  const expectedCanonical = articleUrl(slug, lang, BASE_URL);
  const where = expectedCanonical.slice(BASE_URL.length);
  const nlUrl = articleUrl(slug, 'nl', BASE_URL);
  const enUrl = articleUrl(slug, 'en', BASE_URL);

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

  // 5. Parseable JSON-LD blocks including the required types.
  //    BlogPosting + BreadcrumbList are always required. FAQPage is
  //    only required when the article carries an explicit
  //    faqs_<lang> array in content.js — otherwise the template
  //    intentionally omits it to keep HTML / JSON-LD parity (a
  //    rendered-FAQ section exists iff FAQPage JSON-LD exists).
  const hasExplicitFaqs =
    Array.isArray(data['faqs_' + lang]) && data['faqs_' + lang].length >= 1;
  const minBlocks = hasExplicitFaqs ? 3 : 2;
  const jsonLds = extractJsonLdBlocks(html);
  if (jsonLds.length < minBlocks) {
    v.fail(where, `expected ≥ ${minBlocks} JSON-LD blocks, got ${jsonLds.length}`);
  } else v.ok();
  const invalid = jsonLds.filter((j) => j.__invalid);
  if (invalid.length) v.fail(where, `unparseable JSON-LD blocks: ${invalid.length}`);
  else v.ok();

  const requiredTypes = hasExplicitFaqs
    ? ['BlogPosting', 'FAQPage', 'BreadcrumbList']
    : ['BlogPosting', 'BreadcrumbList'];
  const types = jsonLds.map((j) => j && j['@type']).filter(Boolean);
  for (const t of requiredTypes) {
    if (!types.includes(t)) v.fail(where, `JSON-LD missing @type "${t}"`);
    else v.ok();
  }
  // Guard against the inverse drift: a FAQPage block must not be
  // emitted if there is no explicit faqs_<lang> source, since the
  // HTML has no dedicated FAQ section to match against.
  if (!hasExplicitFaqs && types.includes('FAQPage')) {
    v.fail(where, 'FAQPage JSON-LD present but no faqs_<lang> in content.js (parity drift)');
  } else v.ok();

  // Author Person block: YMYL policy requires BlogPosting.author
  // to be a Person with jobTitle, affiliation, and sameAs.
  const bpForAuthor = jsonLds.find((j) => j && j['@type'] === 'BlogPosting');
  const author = bpForAuthor && bpForAuthor.author;
  if (!author || author['@type'] !== 'Person') {
    v.fail(where, `BlogPosting.author must be a Person (got ${author && author['@type']})`);
  } else v.ok();
  if (author && !author.name) v.fail(where, 'BlogPosting.author.name missing');
  else if (author) v.ok();
  if (author && !author.jobTitle) v.fail(where, 'BlogPosting.author.jobTitle missing');
  else if (author) v.ok();
  if (author && !(author.affiliation && author.affiliation.name)) {
    v.fail(where, 'BlogPosting.author.affiliation.name missing');
  } else if (author) v.ok();
  if (author && !(Array.isArray(author.sameAs) && author.sameAs.length >= 1)) {
    v.fail(where, 'BlogPosting.author.sameAs must be a non-empty array');
  } else if (author) v.ok();

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

  // 7. Visible "Laatst bijgewerkt" (NL) / "Last updated" (EN) label present
  const visibleLabel = lang === 'nl' ? 'Laatst bijgewerkt' : 'Last updated';
  if (!html.includes(visibleLabel)) {
    v.fail(where, `visible "${visibleLabel}" label missing from hero`);
  } else v.ok();

  // 8. <time datetime="…"> in the hero must equal BlogPosting.dateModified
  const timeMatch = html.match(/<time\b[^>]*datetime\s*=\s*"([^"]+)"[^>]*>/i);
  if (!timeMatch) {
    v.fail(where, '<time datetime> missing from hero');
  } else {
    const bp = jsonLds.find((j) => j && j['@type'] === 'BlogPosting');
    if (bp && bp.dateModified && bp.dateModified !== timeMatch[1]) {
      v.fail(where, `<time datetime="${timeMatch[1]}"> does not match BlogPosting.dateModified "${bp.dateModified}"`);
    } else v.ok();
  }

  // 9. Visible byline with author name + /over-ons/ link
  if (!/class="article-hero__byline"/.test(html)) {
    v.fail(where, 'visible .article-hero__byline missing from hero');
  } else v.ok();
  if (!/href="\/over-ons\/"/.test(html)) {
    v.fail(where, 'byline link to /over-ons/ missing');
  } else v.ok();

  // 10. Harm-reduction disclaimer on substance articles
  const tags = Array.isArray(data.meta && data.meta.tags) ? data.meta.tags.map((t) => String(t).toLowerCase()) : [];
  const SUBSTANCE = new Set([
    'ayahuasca', 'psilocybin', 'psilocybine', 'paddenstoelen', 'paddo', 'paddos',
    'truffels', 'truffel', 'lsd', 'dmt', 'mdma', 'ketamine', '2c-b', '2cb',
    'mescaline', 'peyote', 'san pedro', 'san-pedro', 'ibogaine', 'iboga',
    '5-meo-dmt', '5meodmt',
  ]);
  const isSubstance = tags.some((t) => SUBSTANCE.has(t));
  if (isSubstance) {
    if (!/id="harm-reduction"/.test(html)) {
      v.fail(where, 'substance article missing harm-reduction disclaimer aside');
    } else v.ok();
    // All four canonical outbound links must be present
    for (const expected of ['jellinek.nl', 'trimbos.nl', 'unity.nl', 'mainline.nl']) {
      if (!html.includes(`href="https://${expected}/"`)) {
        v.fail(where, `harm-reduction disclaimer missing link to ${expected}`);
      } else v.ok();
    }
    if (!/href="tel:112"/.test(html)) {
      v.fail(where, 'harm-reduction disclaimer missing tel:112 link');
    } else v.ok();
  }

  // 11. Site-default safety disclaimer present on every article (YMYL).
  //     Asserts both the anchor (#site-disclaimer) and a lang-specific
  //     substring of the canonical text so paraphrasing the disclaimer
  //     in the template breaks the build.
  if (!/id="site-disclaimer"/.test(html)) {
    v.fail(where, 'site-default disclaimer aside missing (id="site-disclaimer")');
  } else v.ok();
  const disclaimerNeedle = lang === 'nl'
    ? 'biedt algemene voorlichting en geen medisch advies'
    : 'provides general information and is not medical advice';
  if (!html.includes(disclaimerNeedle)) {
    v.fail(where, `site-default disclaimer canonical text missing (lang=${lang})`);
  } else v.ok();

  // 12. Every outbound <a> (non-psychedelica.nl) carries rel="external"
  const anchorRe = /<a\b([^>]*)>/gi;
  let am;
  while ((am = anchorRe.exec(html)) !== null) {
    const attrs = am[1];
    const href = matchAttr(`<a ${attrs}>`, 'href') || '';
    if (!/^https?:\/\//i.test(href)) continue;
    let host;
    try { host = new URL(href).hostname.toLowerCase(); } catch { continue; }
    if (host === 'psychedelica.nl' || host.endsWith('.psychedelica.nl')) continue;
    const rel = matchAttr(`<a ${attrs}>`, 'rel') || '';
    if (!/\bexternal\b/.test(rel)) {
      v.fail(where, `outbound anchor to ${host} missing rel="external"`);
    } else v.ok();
  }
}

/* ---- site-level file asserts ---- */

const REQUIRED_ROBOTS_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'CCBot',
  'Bytespider',
  'cohere-ai',
];

const DEPRECATED_ROBOTS_AGENTS = ['anthropic-ai', 'Claude-Web'];

async function validateRobots(v) {
  const file = path.join(ROOT, 'robots.txt');
  const where = '/robots.txt';
  if (!existsSync(file)) {
    v.fail(where, 'file missing at site root');
    return;
  }
  const txt = await readFile(file, 'utf8');
  for (const agent of REQUIRED_ROBOTS_AGENTS) {
    const re = new RegExp(`^User-agent:\\s*${agent}\\s*$`, 'mi');
    if (!re.test(txt)) v.fail(where, `missing canonical 2026 entry "User-agent: ${agent}"`);
    else v.ok();
  }
  for (const agent of DEPRECATED_ROBOTS_AGENTS) {
    const re = new RegExp(`^User-agent:\\s*${agent}\\s*$`, 'mi');
    if (re.test(txt)) v.fail(where, `deprecated entry "User-agent: ${agent}" present — remove`);
    else v.ok();
  }
  if (!/^Sitemap:\s*https:\/\/psychedelica\.nl\/sitemap\.xml\s*$/mi.test(txt)) {
    v.fail(where, 'missing "Sitemap: https://psychedelica.nl/sitemap.xml" directive');
  } else v.ok();
}

async function validateLlmsTxt(v, slugs) {
  const file = path.join(ROOT, 'llms.txt');
  const where = '/llms.txt';
  if (!existsSync(file)) {
    v.fail(where, 'file missing at site root — build did not emit it');
    return;
  }
  const txt = await readFile(file, 'utf8');
  if (!/^#\s*Psychedelica\.nl\s*$/mi.test(txt)) {
    v.fail(where, 'missing "# Psychedelica.nl" H1');
  } else v.ok();
  for (const slug of slugs) {
    const nlUrl = articleUrl(slug, 'nl', BASE_URL);
    const enUrl = articleUrl(slug, 'en', BASE_URL);
    if (!txt.includes(nlUrl)) v.fail(where, `missing link to ${nlUrl}`);
    else v.ok();
    if (!txt.includes(enUrl)) v.fail(where, `missing link to ${enUrl}`);
    else v.ok();
  }
}

async function validateSitemap(v, slugs) {
  const file = path.join(ROOT, 'sitemap.xml');
  const where = '/sitemap.xml';
  if (!existsSync(file)) {
    v.fail(where, 'file missing at site root');
    return;
  }
  const txt = await readFile(file, 'utf8');
  for (const slug of slugs) {
    for (const lang of ['nl', 'en']) {
      const loc = articleUrl(slug, lang, BASE_URL);
      if (!txt.includes(`<loc>${loc}</loc>`)) v.fail(where, `missing <loc>${loc}</loc>`);
      else v.ok();
    }
  }
  for (const loc of [
    homeUrl('nl', BASE_URL),
    homeUrl('en', BASE_URL),
    listingUrl('nl', BASE_URL),
    listingUrl('en', BASE_URL),
  ]) {
    if (!txt.includes(`<loc>${loc}</loc>`)) v.fail(where, `missing <loc>${loc}</loc>`);
    else v.ok();
  }
}

/* Per-language page (homepage or listing) — asserts the same
   crawler-visible invariants as articles: canonical matches URL,
   hreflang trio (language-only), <html lang>, title + description,
   and at least one JSON-LD block so Site.seo()'s skip-if-prerendered
   guard engages. */
function validateLangPage({ v, html, where, lang, expectedCanonical, nlUrl, enUrl }) {
  const htmlLang = extractHtmlLang(html);
  if (htmlLang !== lang) v.fail(where, `<html lang> expected "${lang}", got "${htmlLang}"`);
  else v.ok();

  const canonical = extractCanonical(html);
  if (canonical !== expectedCanonical) {
    v.fail(where, `canonical expected "${expectedCanonical}", got "${canonical}"`);
  } else v.ok();

  const alts = extractHreflang(html);
  const byLang = Object.fromEntries(alts.map((a) => [a.hreflang, a.href]));
  for (const required of ['nl', 'en', 'x-default']) {
    if (!byLang[required]) v.fail(where, `missing hreflang "${required}" alternate`);
    else v.ok();
  }
  if (byLang.nl && byLang.nl !== nlUrl) v.fail(where, `hreflang=nl href wrong: ${byLang.nl}`);
  else if (byLang.nl) v.ok();
  if (byLang.en && byLang.en !== enUrl) v.fail(where, `hreflang=en href wrong: ${byLang.en}`);
  else if (byLang.en) v.ok();
  if (byLang['x-default'] && byLang['x-default'] !== enUrl)
    v.fail(where, `hreflang=x-default href wrong: ${byLang['x-default']}`);
  else if (byLang['x-default']) v.ok();

  const title = extractTitle(html);
  if (!title) v.fail(where, `<title> is empty`);
  else v.ok();
  const desc = extractMetaDescription(html);
  if (!desc) v.fail(where, `<meta name="description"> is empty`);
  else v.ok();

  const jsonLds = extractJsonLdBlocks(html);
  if (jsonLds.length < 1) v.fail(where, `expected >= 1 JSON-LD block, got ${jsonLds.length}`);
  else v.ok();
  if (jsonLds.some((j) => j.__invalid)) v.fail(where, `unparseable JSON-LD block`);
  else v.ok();
}

/* Regression guard: make sure no file in the deployed tree is a
   meta-refresh redirect. Every URL must be the canonical destination. */
async function validateNoRedirects(v) {
  const roots = [ROOT, path.join(ROOT, 'articles'), path.join(ROOT, 'en'), path.join(ROOT, 'en', 'articles')];
  async function* walk(dir) {
    if (!existsSync(dir)) return;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'scripts') continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        yield* walk(full);
      } else if (e.name.endsWith('.html')) {
        yield full;
      }
    }
  }
  const seen = new Set();
  for (const root of roots) {
    for await (const file of walk(root)) {
      if (seen.has(file)) continue;
      seen.add(file);
      const txt = await readFile(file, 'utf8');
      if (/http-equiv\s*=\s*["']refresh["']/i.test(txt)) {
        const rel = '/' + path.relative(ROOT, file);
        v.fail(rel, 'meta-refresh redirect present — every URL must be canonical');
      } else v.ok();
    }
  }
  // Stale directories that must not return after the NL=root migration.
  for (const dead of ['nl', 'artikelen']) {
    if (existsSync(path.join(ROOT, dead))) {
      v.fail(`/${dead}/`, `stale directory present — delete it`);
    } else v.ok();
  }
}

async function validateLangPages(v) {
  const pages = [
    {
      lang: 'nl',
      rel: 'index.html',
      where: '/',
      canonical: homeUrl('nl', BASE_URL),
      kind: 'home',
    },
    {
      lang: 'en',
      rel: 'en/index.html',
      where: '/en/',
      canonical: homeUrl('en', BASE_URL),
      kind: 'home',
    },
    {
      lang: 'nl',
      rel: 'articles/index.html',
      where: '/articles/',
      canonical: listingUrl('nl', BASE_URL),
      kind: 'listing',
    },
    {
      lang: 'en',
      rel: 'en/articles/index.html',
      where: '/en/articles/',
      canonical: listingUrl('en', BASE_URL),
      kind: 'listing',
    },
  ];
  const nlArticlesBase = listingUrl('nl', '');
  const enArticlesBase = listingUrl('en', '');
  for (const page of pages) {
    const file = path.join(ROOT, page.rel);
    if (!existsSync(file)) {
      v.fail(page.where, `built file missing: ${file}`);
      continue;
    }
    const html = await readFile(file, 'utf8');
    const nlUrl = page.kind === 'listing' ? listingUrl('nl', BASE_URL) : homeUrl('nl', BASE_URL);
    const enUrl = page.kind === 'listing' ? listingUrl('en', BASE_URL) : homeUrl('en', BASE_URL);
    validateLangPage({
      v,
      html,
      where: page.where,
      lang: page.lang,
      expectedCanonical: page.canonical,
      nlUrl,
      enUrl,
    });

    // Static article-card links must point into the current language tree.
    const expectedPrefix = page.lang === 'en' ? enArticlesBase : nlArticlesBase;
    if (!html.includes(`href="${expectedPrefix}`)) {
      v.fail(page.where, `no static article card link starting with "${expectedPrefix}"`);
    } else v.ok();
  }
}

/* ---- content.js source-side check ---- */

const ALLOWED_PARAGRAPH_TAGS = new Set(['strong', 'em', 'a']);

function collectParagraphStringsFromData(data) {
  const out = [];
  const collectArr = (arr) => {
    if (!Array.isArray(arr)) return;
    for (const p of arr) {
      if (typeof p === 'string') out.push(p);
      else if (p && typeof p === 'object') {
        for (const key of Object.keys(p)) {
          if (key.startsWith('text_') || key.startsWith('paragraphs_')) {
            const v2 = p[key];
            if (typeof v2 === 'string') out.push(v2);
            else if (Array.isArray(v2)) collectArr(v2);
          }
        }
      }
    }
  };
  for (const lang of ['nl', 'en']) {
    collectArr(data['intro_' + lang]);
    collectArr(data['preamble_' + lang]);
  }
  for (const s of data.sections || []) {
    for (const lang of ['nl', 'en']) collectArr(s['paragraphs_' + lang]);
    for (const sub of (s.subs || s.sub || s.accordions || s.subAccordions || [])) {
      for (const lang of ['nl', 'en']) collectArr(sub['paragraphs_' + lang]);
    }
  }
  for (const item of data.items || []) {
    for (const lang of ['nl', 'en']) collectArr(item['paragraphs_' + lang]);
  }
  for (const step of data.steps || []) {
    for (const lang of ['nl', 'en']) collectArr(step['paragraphs_' + lang]);
  }
  for (const phase of data.phases || []) {
    for (const step of phase.steps || []) {
      for (const lang of ['nl', 'en']) collectArr(step['paragraphs_' + lang]);
    }
    for (const lang of ['nl', 'en']) collectArr(phase['paragraphs_' + lang]);
  }
  for (const faqList of [data.faqs_nl, data.faqs_en]) {
    if (!Array.isArray(faqList)) continue;
    for (const f of faqList) {
      if (f && typeof f.answer === 'string') out.push(f.answer);
    }
  }
  return out;
}

/* Reject paragraph strings that carry inline tags outside the whitelist
   (strong, em, a). Anything else — <script>, <iframe>, <img>, <p>, <br>,
   custom HTML — must not be in content.js because renderInline would
   escape it to visible text on the live page. */
function validateContentJsParagraphs(v, slug, data) {
  const where = `articles/${slug}/content.js`;
  const strings = collectParagraphStringsFromData(data);
  const re = /<\s*\/?\s*([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  let bad = null;
  for (const s of strings) {
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(s)) !== null) {
      const tag = m[1].toLowerCase();
      if (!ALLOWED_PARAGRAPH_TAGS.has(tag)) {
        bad = { tag, sample: s.length > 120 ? s.slice(0, 117) + '...' : s };
        break;
      }
    }
    if (bad) break;
  }
  if (bad) {
    v.fail(
      where,
      `paragraph contains disallowed inline tag <${bad.tag}> (allowed: strong, em, a). Sample: "${bad.sample}"`
    );
  } else {
    v.ok();
  }
}

async function main() {
  const v = new Validator();
  const slugs = await discoverArticles();
  if (!slugs.length) {
    console.error('validate: no articles found');
    process.exit(1);
  }

  await validateRobots(v);
  await validateLlmsTxt(v, slugs);
  await validateSitemap(v, slugs);
  await validateLangPages(v);
  await validateNoRedirects(v);

  for (const slug of slugs) {
    const source = await readFile(path.join(ARTICLES_DIR, slug, 'content.js'), 'utf8');
    const data = loadContentJs(source, slug);

    validateContentJsParagraphs(v, slug, data);

    for (const lang of ['nl', 'en']) {
      const relDir = langPrefix(lang).slice(1);
      const file = path.join(ROOT, relDir, 'articles', slug, 'index.html');
      if (!existsSync(file)) {
        v.fail(articleUrl(slug, lang, ''), `built file missing: ${file}`);
        continue;
      }
      const html = await readFile(file, 'utf8');
      validateFile({ v, html, slug, lang, data });
    }
  }

  v.report();
}

main().catch((err) => {
  console.error('validate: fatal:', err);
  process.exit(1);
});
