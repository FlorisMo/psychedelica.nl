/* ============================================================
   scripts/templates/page.mjs

   Transforms a bilingual source HTML file (with [data-lang="nl"]
   and [data-lang="en"] duplicate elements) into a single
   per-language static page.

   Transforms applied:
     1. Drop every line that carries data-lang="<otherLang>".
     2. Set <html lang="…"> to the target language.
     3. Override <title> and <meta name="description"> to the
        language-specific pair (shared meta registry, keyed by
        page id).
     4. Inject <link rel="canonical">, hreflang alternates,
        <meta name="robots">, og:* and twitter:* tags.
     5. Rewrite hardcoded absolute site links:
          /           → /<lang>/
          /artikelen/ → /<lang>/articles/
        (scoped to href attributes so text content is untouched)
     6. For the homepage: replace the placeholder
        <div class="article-grid" id="homeArticles"> with a
        statically-rendered card list of the 6 most-recent articles.
     7. For the listing: replace the placeholder
        <div class="article-grid" id="articleGrid"> with a
        statically-rendered card list of all articles, sorted by
        date desc. JS still takes over for interactive filtering.

   Pure: same inputs → byte-identical output.
   ============================================================ */

const DEFAULT_BASE_URL = 'https://psychedelica.nl';
const DEFAULT_SITE_NAME = 'Psychedelica.nl';

/* Page metadata registry. Keep narrow — this is not a CMS, just
   the copy that needs to differ between /nl/ and /en/. */
const PAGE_META = {
  home: {
    nl: {
      title: 'Psychedelica.nl — Alles over Psychedelica',
      description:
        "Jouw gids in de wereld van psychedelica. Wetenschap, risicobeperking en eerlijke informatie over ayahuasca, paddo's, LSD en meer.",
    },
    en: {
      title: 'Psychedelica.nl — All about Psychedelics',
      description:
        'Your guide to the world of psychedelics. Science, harm reduction, and honest information about ayahuasca, mushrooms, LSD, and more.',
    },
  },
  listing: {
    nl: {
      title: 'Artikelen — Psychedelica.nl',
      description:
        'Alle artikelen over psychedelica. Wetenschap, risicobeperking en eerlijke informatie.',
    },
    en: {
      title: 'Articles — Psychedelica.nl',
      description:
        'All articles about psychedelics. Science, harm reduction, and honest information.',
    },
  },
};

/* Path pairs used for canonical + hreflang per page. */
const PAGE_PATHS = {
  home: { nl: '/nl/', en: '/en/' },
  listing: { nl: '/nl/articles/', en: '/en/articles/' },
};

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Strip any line carrying data-lang="<other>". Source files keep
   each data-lang element on its own line by convention (enforced
   manually; a mis-formatted source would leak the other language,
   which validate.mjs catches via <html lang> + word-count checks). */
function stripOtherLang(html, keepLang) {
  const otherLang = keepLang === 'nl' ? 'en' : 'nl';
  const otherRe = new RegExp(`data-lang=["']${otherLang}["']`);
  return html
    .split('\n')
    .filter((line) => !otherRe.test(line))
    .join('\n');
}

/* Rewrite hrefs in the static markup so nav/CTA/card links point
   to the current language tree. Only matches href="…" (and single
   quotes); ignores absolute URLs pointing at other origins. */
function rewriteLinks(html, lang) {
  return html
    .replace(/href=(["'])\/artikelen\/\1/g, `href=$1/${lang}/articles/$1`)
    .replace(/href=(["'])\/\1/g, `href=$1/${lang}/$1`);
}

/* Serialize a JSON-LD object into a <script> tag with deterministic
   key order (JSON.stringify walks keys in insertion order). Escape
   "<" so it cannot break out of the script context. */
function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj, null, 2).replace(
    /</g,
    '\\u003c'
  )}</script>`;
}

/* Build the per-language <head> metadata block injected right
   after the existing <title>. Returns a string of tags. */
function buildHeadInjection(pageId, lang, opts) {
  const baseUrl = opts.baseUrl;
  const siteName = opts.siteName;
  const meta = PAGE_META[pageId][lang];
  const paths = PAGE_PATHS[pageId];
  const canonicalUrl = `${baseUrl}${paths[lang]}`;
  const nlUrl = `${baseUrl}${paths.nl}`;
  const enUrl = `${baseUrl}${paths.en}`;
  const ogLocale = lang === 'nl' ? 'nl_NL' : 'en_GB';
  const ogLocaleAlt = lang === 'nl' ? 'en_GB' : 'nl_NL';

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: baseUrl + '/assets/img/favicon.png',
    },
    description: meta.description,
  };

  const jsonLdBlocks = [organization];

  if (pageId === 'home') {
    jsonLdBlocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: canonicalUrl,
      inLanguage: lang,
      description: meta.description,
    });
  } else if (pageId === 'listing') {
    const homeLabel = lang === 'nl' ? 'Home' : 'Home';
    const articlesLabel = lang === 'nl' ? 'Artikelen' : 'Articles';
    jsonLdBlocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeLabel,
          item: `${baseUrl}${PAGE_PATHS.home[lang]}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: articlesLabel,
          item: canonicalUrl,
        },
      ],
    });
  }

  return [
    `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`,
    `<link rel="canonical" href="${esc(canonicalUrl)}">`,
    `<link rel="alternate" hreflang="nl" href="${esc(nlUrl)}">`,
    `<link rel="alternate" hreflang="en" href="${esc(enUrl)}">`,
    `<link rel="alternate" hreflang="x-default" href="${esc(enUrl)}">`,
    `<meta property="og:site_name" content="${esc(siteName)}">`,
    `<meta property="og:locale" content="${esc(ogLocale)}">`,
    `<meta property="og:locale:alternate" content="${esc(ogLocaleAlt)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${esc(canonicalUrl)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    ...jsonLdBlocks.map(jsonLd),
  ].join('\n');
}

/* Extract the homepage/listing "fixed" title + description. We
   replace these atomically so the file's current NL copy does not
   bleed through on /en/. */
function overwriteTitleAndDescription(html, pageId, lang) {
  const meta = PAGE_META[pageId][lang];
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>(\r?\n)?/i,
      `<meta name="description" content="${esc(meta.description)}">\n`
    );
}

function setHtmlLang(html, lang) {
  return html.replace(/<html\b[^>]*>/i, `<html lang="${lang}">`);
}

/* Build a static card for one article, matching the markup that
   site.js produces for JS-rendered cards. Classes and structure
   must stay in lockstep with [data-lang] handling in site.js so
   the language toggle continues to work client-side. */
function renderArticleCard(a, lang) {
  const title = lang === 'en' ? a.title_en : a.title_nl;
  const sub = lang === 'en' ? a.subtitle_en : a.subtitle_nl;
  const readLabel = lang === 'en' ? 'min read' : 'min leestijd';
  const tagsHTML = (a.tags || [])
    .map((tag) => `<span class="tag">${esc(tag)}</span>`)
    .join('');
  const dateSuffix = a.date ? ` · ${esc(a.date)}` : '';
  return (
    `<a href="/${lang}/articles/${esc(a.slug)}/" class="card card__link">` +
    `<div class="card__label">~${esc(a.readingTime)} ${readLabel}${dateSuffix}</div>` +
    `<h3 class="card__title">${esc(title)}</h3>` +
    `<p class="card__desc">${esc(sub)}</p>` +
    `<div class="card__tags">${tagsHTML}</div>` +
    `</a>`
  );
}

function renderHomeCards(articles, lang) {
  const sorted = [...articles].sort((a, b) => {
    const da = new Date(a.date || 0).getTime();
    const db = new Date(b.date || 0).getTime();
    return db - da;
  });
  return sorted.slice(0, 6).map((a) => renderArticleCard(a, lang)).join('');
}

function renderListingCards(articles, lang) {
  const sorted = [...articles].sort((a, b) => {
    const da = new Date(a.date || 0).getTime();
    const db = new Date(b.date || 0).getTime();
    return db - da;
  });
  return sorted.map((a) => renderArticleCard(a, lang)).join('');
}

/* Replace the placeholder grid with static HTML. The opening tag
   carries the id so we anchor on that; everything up to the
   matching closing </div> is replaced, preserving surrounding
   layout. JS still hydrates this on load for interactivity. */
function replaceGrid(html, gridId, staticHtml) {
  const re = new RegExp(
    `(<div[^>]*\\bid=["']${gridId}["'][^>]*>)([\\s\\S]*?)(<\\/div>)`,
    'i'
  );
  return html.replace(re, `$1${staticHtml}$3`);
}

/* Insert the head-injection block right after the existing <title>
   tag so we do not disturb the order of <link rel="stylesheet"> and
   the font preloads. */
function injectHead(html, injection) {
  return html.replace(/(<title>[\s\S]*?<\/title>)/i, `$1\n  ${injection}`);
}

export function renderPage(sourceHtml, lang, opts) {
  const {
    pageId,
    articles = [],
    baseUrl = DEFAULT_BASE_URL,
    siteName = DEFAULT_SITE_NAME,
  } = opts;
  if (!['nl', 'en'].includes(lang)) throw new Error(`Unsupported lang: ${lang}`);
  if (!PAGE_META[pageId]) throw new Error(`Unknown pageId: ${pageId}`);

  let html = sourceHtml;
  html = stripOtherLang(html, lang);
  html = setHtmlLang(html, lang);
  html = overwriteTitleAndDescription(html, pageId, lang);
  html = rewriteLinks(html, lang);

  const injection = buildHeadInjection(pageId, lang, { baseUrl, siteName });
  html = injectHead(html, injection);

  if (pageId === 'home') {
    html = replaceGrid(html, 'homeArticles', renderHomeCards(articles, lang));
  } else if (pageId === 'listing') {
    html = replaceGrid(html, 'articleGrid', renderListingCards(articles, lang));
  }

  return html;
}

export function buildRedirectStub(targetPath, baseUrl = DEFAULT_BASE_URL) {
  const target = targetPath;
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Redirecting…</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${esc(baseUrl + target)}">
<meta http-equiv="refresh" content="0; url=${esc(target)}">
<script>window.location.replace(${JSON.stringify(target)});</script>
</head>
<body>
<p>This page has moved to <a href="${esc(target)}">${esc(baseUrl + target)}</a>.</p>
</body>
</html>
`;
}

export { PAGE_PATHS, PAGE_META };
