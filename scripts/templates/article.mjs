/* ============================================================
   scripts/templates/article.mjs

   Shared template function: renderArticle(data, lang, opts)

   Produces a complete, SEO-ready static HTML document for one
   article in one language. Output must be fully readable with
   JavaScript disabled: full body text, semantic HTML, three
   JSON-LD blocks, canonical, three hreflang alternates.

   Inputs:
     data = window.SITE_CONTENT from the article's content.js
     lang = 'nl' | 'en'
     opts = { slug, baseUrl, siteName }
   ============================================================ */

import { DEFAULT_AUTHOR } from '../authors/floris-moerkamp.mjs';

const CHEVRON_SVG =
  '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

const BACK_TO_TOP_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';

export const DEFAULT_BASE_URL = 'https://psychedelica.nl';
export const DEFAULT_SITE_NAME = 'Psychedelica.nl';

/* Substance tags that trigger the harm-reduction disclaimer block
   on an article's rendered HTML. Per the YMYL policy any article
   whose meta.tags intersects this set is a YMYL substance article. */
const SUBSTANCE_TAGS = new Set([
  'ayahuasca',
  'psilocybin',
  'psilocybine',
  'paddenstoelen',
  'paddo',
  'paddos',
  'truffels',
  'truffel',
  'lsd',
  'dmt',
  'mdma',
  'ketamine',
  '2c-b',
  '2cb',
  'mescaline',
  'peyote',
  'san pedro',
  'san-pedro',
  'ibogaine',
  'iboga',
  '5-meo-dmt',
  '5meodmt',
]);

function isSubstanceArticle(meta) {
  const tags = Array.isArray(meta && meta.tags) ? meta.tags : [];
  return tags.some((t) => SUBSTANCE_TAGS.has(String(t).toLowerCase()));
}

/* URL layout: NL is the primary language and lives at the root of
   the site (no /nl/ prefix). EN lives under /en/. Every URL helper
   the templates and build step use must route through these so the
   layout can be changed in one place. */
export function langPrefix(lang) {
  return lang === 'nl' ? '' : '/en';
}

export function homePath(lang) {
  return `${langPrefix(lang)}/`;
}

export function listingPath(lang) {
  return `${langPrefix(lang)}/articles/`;
}

export function articlePath(slug, lang) {
  return `${langPrefix(lang)}/articles/${slug}/`;
}

export function homeUrl(lang, baseUrl) {
  return baseUrl + homePath(lang);
}

export function listingUrl(lang, baseUrl) {
  return baseUrl + listingPath(lang);
}

export function articleUrl(slug, lang, baseUrl) {
  return baseUrl + articlePath(slug, lang);
}

const I18N = {
  nl: {
    conclusion: 'Conclusie',
    phase: 'Fase',
    of: 'van',
    roadmap: 'Routekaart',
    context_fallback: 'Context',
    home: 'Home',
    articles: 'Artikelen',
    org_desc: 'Jouw gids in de wereld van psychedelica. Wetenschap, risicobeperking en eerlijke informatie.',
    last_updated: 'Laatst bijgewerkt',
    byline_intro: 'Door',
    faq: 'Veelgestelde vragen',
    harm_reduction_heading: 'Harm reduction',
    harm_reduction_body:
      'Deze informatie is bedoeld voor educatie en harm reduction, niet als advies om psychedelica te gebruiken. Gebruik altijd met mate, check interacties met medicijnen, en zorg voor een veilige setting met mensen die je vertrouwt. In geval van een medische noodsituatie: bel',
    harm_reduction_tel_label: '112',
    harm_reduction_for_help: 'Voor persoonlijk advies of zorg:',
    harm_reduction_links: [
      { href: 'https://jellinek.nl/', name: 'Jellinek', desc: 'verslavingszorg' },
      { href: 'https://trimbos.nl/', name: 'Trimbos-instituut', desc: 'mentale gezondheid' },
      { href: 'https://unity.nl/', name: 'Unity', desc: 'peer education op evenementen' },
      { href: 'https://mainline.nl/', name: 'Mainline', desc: 'harm reduction magazine en services' },
    ],
  },
  en: {
    conclusion: 'Conclusion',
    phase: 'Phase',
    of: 'of',
    roadmap: 'Roadmap',
    context_fallback: 'Context',
    home: 'Home',
    articles: 'Articles',
    org_desc: 'Your guide to the world of psychedelics. Science, harm reduction and honest information.',
    last_updated: 'Last updated',
    byline_intro: 'By',
    faq: 'Frequently asked questions',
    harm_reduction_heading: 'Harm reduction',
    harm_reduction_body:
      'This information is for education and harm reduction, not advice to use psychedelics. Always use in moderation, check medication interactions, and ensure a safe setting with people you trust. In a medical emergency in the Netherlands: call',
    harm_reduction_tel_label: '112',
    harm_reduction_for_help: 'For personal advice or care:',
    harm_reduction_links: [
      { href: 'https://jellinek.nl/', name: 'Jellinek', desc: 'addiction services' },
      { href: 'https://trimbos.nl/', name: 'Trimbos Institute', desc: 'mental health' },
      { href: 'https://unity.nl/', name: 'Unity', desc: 'peer education at events' },
      { href: 'https://mainline.nl/', name: 'Mainline', desc: 'harm reduction magazine and services' },
    ],
  },
};

/* ------------------------------ helpers ------------------------------ */

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pickField(obj, base, lang) {
  if (!obj) return undefined;
  return obj[base + '_' + lang] != null ? obj[base + '_' + lang] : obj[base + '_nl'];
}

function pickLangArray(data, base, lang) {
  const val = data[base + '_' + lang] != null ? data[base + '_' + lang] : data[base + '_nl'];
  return Array.isArray(val) ? val : [];
}

function pickBiLit(obj, lang) {
  if (!obj) return '';
  return obj[lang] != null ? obj[lang] : obj.nl;
}

function absUrl(pathOrUrl, baseUrl) {
  if (!pathOrUrl) return baseUrl;
  return /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : baseUrl + pathOrUrl;
}

/* True when href points at a non-psychedelica.nl origin. Relative
   hrefs, tel:/mailto: schemes, and same-host URLs all return false. */
function isExternalHref(href) {
  if (!href) return false;
  const s = String(href).trim();
  if (!/^https?:\/\//i.test(s)) return false;
  try {
    const u = new URL(s);
    const host = u.hostname.toLowerCase();
    return host !== 'psychedelica.nl' && !host.endsWith('.psychedelica.nl');
  } catch {
    return false;
  }
}

/* Render a canonical <a> element. If href points off-domain we
   append rel="external" per the YMYL/GEO outbound-link standard.
   Any rel value on the caller is preserved and merged. */
function renderAnchor(href, text, { rel } = {}) {
  const parts = [];
  const external = isExternalHref(href);
  const relSet = new Set();
  if (rel) String(rel).split(/\s+/).filter(Boolean).forEach((r) => relSet.add(r));
  if (external) relSet.add('external');
  const relAttr = relSet.size ? ` rel="${esc(Array.from(relSet).join(' '))}"` : '';
  parts.push(`<a href="${esc(href)}"${relAttr}>${esc(text)}</a>`);
  return parts.join('');
}

/* Convert a paragraph array (strings or {heading_xx,text_xx}) to text.
   Used for word counts, descriptions, and FAQ answers. */
function paragraphsToPlainText(arr, lang) {
  if (!Array.isArray(arr)) return '';
  const parts = [];
  for (const p of arr) {
    if (typeof p === 'string') {
      parts.push(p);
    } else if (p && typeof p === 'object') {
      const h = pickField(p, 'heading', lang);
      const t = pickField(p, 'text', lang);
      if (h) parts.push(h);
      if (t) parts.push(t);
    }
  }
  return parts.join(' ');
}

function wordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/* ------------------------------ paragraph HTML ------------------------------ */

function renderParagraphs(arr, lang) {
  if (!Array.isArray(arr)) return '';
  return arr
    .map((p) => {
      if (typeof p === 'string') return `<p>${esc(p)}</p>`;
      const h = pickField(p, 'heading', lang);
      const t = pickField(p, 'text', lang);
      return `<div class="step-sub"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`;
    })
    .join('\n');
}

/* ------------------------------ accordions as <details> ------------------------------ */

function renderSubAccordions(subs, lang) {
  if (!Array.isArray(subs) || !subs.length) return '';
  return subs
    .map((s) => {
      const pars = pickField(s, 'paragraphs', lang) || [];
      return `<details class="sub-accordion accordion" id="${esc(s.id)}">
<summary class="accordion-trigger">${esc(pickField(s, 'title', lang))}${CHEVRON_SVG}</summary>
<div class="accordion-body"><div class="accordion-content">${pars
        .map((p) => `<p>${esc(p)}</p>`)
        .join('')}</div></div>
</details>`;
    })
    .join('\n');
}

function renderAccordions(accs, lang) {
  if (!Array.isArray(accs) || !accs.length) return '';
  return accs
    .map((a) => {
      const pars = pickField(a, 'paragraphs', lang) || [];
      const subs = Array.isArray(a.subAccordions) ? a.subAccordions : [];
      return `<details class="accordion" id="${esc(a.id)}">
<summary class="accordion-trigger">${esc(pickField(a, 'title', lang))}${CHEVRON_SVG}</summary>
<div class="accordion-body"><div class="accordion-content">${pars
        .map((p) => `<p>${esc(p)}</p>`)
        .join('')}${renderSubAccordions(subs, lang)}</div></div>
</details>`;
    })
    .join('\n');
}

/* ------------------------------ layout detection ------------------------------ */

function detectLayout(data) {
  if (Array.isArray(data.phases) && Array.isArray(data.steps)) return 'guide-steps';
  if (Array.isArray(data.items)) return 'listicle';
  if (data.context && Array.isArray(data.sections)) return 'explainer';
  if (Array.isArray(data.sections)) return 'essay';
  return 'essay';
}

/* ------------------------------ body renderers ------------------------------ */

function renderListicleBody(data, lang) {
  const items = Array.isArray(data.items) ? data.items : [];
  return items
    .map((item) => {
      const pars = pickField(item, 'paragraphs', lang) || [];
      return `<div class="wrapper--narrow">
<section class="step" id="item-${esc(item.number)}">
<div class="step-header">
<span class="step-number">${esc(item.number)}</span>
<h2 class="step-title">${esc(pickField(item, 'title', lang))}</h2>
</div>
<div class="step-body">${pars.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
</section>
</div>`;
    })
    .join('\n');
}

function renderGuideStepsBody(data, lang) {
  const t = I18N[lang];
  const phases = Array.isArray(data.phases) ? data.phases : [];
  const steps = Array.isArray(data.steps) ? data.steps : [];
  const pullQuotes = data.pullQuotes || {};
  const tocLabels = data.tocLabels || {};
  const phaseCount = phases.length;

  let html = '';

  // Context block (if present — guide-steps often has context accordions)
  if (data.context) {
    const ctxHeader = pickField(data.context, 'header', lang) || t.context_fallback;
    const ctxIntro = pickField(data.context, 'intro', lang) || '';
    const ctxAccs = Array.isArray(data.context.accordions) ? data.context.accordions : [];
    html += `<div class="wrapper--narrow">
<section id="context" style="padding:48px 0 56px;">
<h2 style="margin-bottom:8px;">${esc(ctxHeader)}</h2>
<p style="color:var(--text-muted);font-size:16px;margin-bottom:32px;max-width:var(--content-width)">${esc(ctxIntro)}</p>
${renderAccordions(ctxAccs, lang)}
</section>
</div>
<div class="wrapper--narrow"><div class="divider"></div></div>`;
  }

  // Preamble
  const preamble = pickLangArray(data, 'preamble', lang);
  if (preamble.length) {
    html += `<div class="wrapper--narrow">
<section id="preamble" style="padding:24px 0 16px;">
${preamble.map((p) => `<p style="max-width:var(--content-width)">${esc(p)}</p>`).join('')}
</section>
</div>`;
  }

  // TOC
  if (phases.length) {
    let tocBody = '';
    for (const phase of phases) {
      const tocLabel = pickField(phase, 'tocLabel', lang) || pickField(phase, 'title', lang);
      let links = '';
      for (let n = phase.stepRange[0]; n <= phase.stepRange[1]; n++) {
        const lbl = tocLabels[n];
        const labelText = lbl ? pickBiLit(lbl, lang) : '';
        links += `<a href="#stap${n}">${n}. ${esc(labelText)}</a>`;
      }
      tocBody += `<div class="toc-phase"><div class="toc-phase-label" style="color:var(--phase-${phase.number}-text)">${esc(tocLabel)}</div><div class="toc-phase-links">${links}</div></div>`;
    }
    html += `<div class="wrapper--narrow">
<nav class="toc-map" id="toc" aria-label="${esc(t.roadmap)}"><div class="toc-map-inner">
<div class="toc-map-header">
<h2><span class="map-icon">&#9670;</span> ${esc(t.roadmap)}</h2>
<svg class="chevron-toc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
</div>
<div class="toc-map-body">${tocBody}</div>
</div></nav>
</div>`;
  }

  // Phases + their steps
  for (const phase of phases) {
    html += `<div class="wrapper--narrow">
<section class="phase-transition phase-${phase.number}" id="fase${phase.number}">
<div class="phase-transition-label">${esc(t.phase)} ${esc(phase.number)} ${esc(t.of)} ${esc(phaseCount)}</div>
<h2>${esc(pickField(phase, 'title', lang))}</h2>
<p>${esc(pickField(phase, 'description', lang))}</p>
</section>
</div>
<div class="wrapper--narrow phase-${phase.number}-steps">`;
    for (const step of steps) {
      if (step.number < phase.stepRange[0] || step.number > phase.stepRange[1]) continue;
      const pars = pickField(step, 'paragraphs', lang) || [];
      html += `<section class="step" id="stap${step.number}">
<div class="step-header">
<span class="step-number">${esc(step.number)}</span>
<h3 class="step-title">${esc(pickField(step, 'title', lang))}</h3>
</div>
<div class="step-body">${renderParagraphs(pars, lang)}</div>
</section>`;
      const pq = pullQuotes[step.number];
      if (pq) {
        const quoteText = pickBiLit(pq, lang);
        html += `<aside class="pull-quote"><blockquote>\u201C${esc(quoteText)}\u201D</blockquote></aside>`;
      }
    }
    html += `</div>`;
  }

  return html;
}

function renderEssayBody(data, lang) {
  const sections = Array.isArray(data.sections) ? data.sections : [];
  return sections
    .map((s) => {
      const pars = pickField(s, 'paragraphs', lang) || [];
      return `<div class="wrapper--narrow">
<section id="${esc(s.id || '')}">
<h2>${esc(pickField(s, 'title', lang))}</h2>
${renderParagraphs(pars, lang)}
</section>
</div>`;
    })
    .join('\n');
}

function renderExplainerBody(data, lang) {
  const t = I18N[lang];
  let html = '';
  if (data.context) {
    const ctxHeader = pickField(data.context, 'header', lang) || t.context_fallback;
    const ctxIntro = pickField(data.context, 'intro', lang) || '';
    const ctxAccs = Array.isArray(data.context.accordions) ? data.context.accordions : [];
    html += `<div class="wrapper--narrow">
<section id="context" style="padding:48px 0 56px;">
<h2 style="margin-bottom:8px;">${esc(ctxHeader)}</h2>
<p style="color:var(--text-muted);font-size:16px;margin-bottom:32px;max-width:var(--content-width)">${esc(ctxIntro)}</p>
${renderAccordions(ctxAccs, lang)}
</section>
</div>
<div class="wrapper--narrow"><div class="divider"></div></div>`;
  }
  html += renderEssayBody(data, lang);
  return html;
}

/* ------------------------------ total word count across article ------------------------------ */

export function computeArticleWordCount(data, lang) {
  const layout = detectLayout(data);
  const parts = [];
  parts.push(pickField(data.meta, 'title', lang));
  parts.push(pickField(data.meta, 'subtitle', lang));
  parts.push(paragraphsToPlainText(pickLangArray(data, 'intro', lang), lang));
  parts.push(paragraphsToPlainText(pickLangArray(data, 'preamble', lang), lang));
  parts.push(paragraphsToPlainText(pickLangArray(data, 'conclusion', lang), lang));

  if (data.context) {
    parts.push(pickField(data.context, 'header', lang));
    parts.push(pickField(data.context, 'intro', lang));
    const accs = Array.isArray(data.context.accordions) ? data.context.accordions : [];
    for (const a of accs) {
      parts.push(pickField(a, 'title', lang));
      parts.push(paragraphsToPlainText(pickField(a, 'paragraphs', lang), lang));
      if (Array.isArray(a.subAccordions)) {
        for (const sa of a.subAccordions) {
          parts.push(pickField(sa, 'title', lang));
          parts.push(paragraphsToPlainText(pickField(sa, 'paragraphs', lang), lang));
        }
      }
    }
  }

  if (layout === 'listicle') {
    for (const item of data.items || []) {
      parts.push(pickField(item, 'title', lang));
      parts.push(paragraphsToPlainText(pickField(item, 'paragraphs', lang), lang));
    }
  } else if (layout === 'guide-steps') {
    for (const phase of data.phases || []) {
      parts.push(pickField(phase, 'title', lang));
      parts.push(pickField(phase, 'description', lang));
    }
    for (const step of data.steps || []) {
      parts.push(pickField(step, 'title', lang));
      parts.push(paragraphsToPlainText(pickField(step, 'paragraphs', lang), lang));
    }
    const pullQuotes = data.pullQuotes || {};
    for (const k of Object.keys(pullQuotes)) parts.push(pickBiLit(pullQuotes[k], lang));
  } else {
    for (const s of data.sections || []) {
      parts.push(pickField(s, 'title', lang));
      parts.push(paragraphsToPlainText(pickField(s, 'paragraphs', lang), lang));
    }
  }

  return wordCount(parts.filter(Boolean).join(' '));
}

/* ------------------------------ JSON-LD ------------------------------ */

/* Build the Person JSON-LD block from the author record. Paths
   (url, image) are resolved against baseUrl so the emitted JSON-LD
   is fully-qualified per schema.org guidance. */
function buildAuthorPerson(author, baseUrl) {
  const person = {
    '@type': 'Person',
    name: author.name,
    url: absUrl(author.url, baseUrl),
  };
  if (author.jobTitle) person.jobTitle = author.jobTitle;
  if (author.image) person.image = absUrl(author.image, baseUrl);
  if (author.affiliation && author.affiliation.name) {
    person.affiliation = {
      '@type': 'Organization',
      name: author.affiliation.name,
    };
    if (author.affiliation.url) person.affiliation.url = author.affiliation.url;
  }
  if (Array.isArray(author.sameAs) && author.sameAs.length) {
    person.sameAs = [...author.sameAs];
  }
  return person;
}

/* Extract explicit FAQ entries from content.js. The source of truth
   is data.faqs_<lang>: an array of {question, answer} objects. If
   no FAQ array exists, returns []. The HTML section and the FAQPage
   JSON-LD are both emitted only when this returns a non-empty list,
   so they can never diverge. */
function extractExplicitFaqs(data, lang) {
  const primary = data['faqs_' + lang];
  const fallback = data.faqs_nl;
  const arr = Array.isArray(primary) ? primary : Array.isArray(fallback) ? fallback : [];
  const out = [];
  for (const f of arr) {
    const q = (f && (f.question || f.q) || '').toString().trim();
    const a = (f && (f.answer || f.a) || '').toString().trim();
    if (q && a) out.push({ question: q, answer: a });
  }
  return out;
}

function buildJsonLd(data, lang, opts) {
  const { slug, baseUrl, siteName, dateModified, author, faqs } = opts;
  const meta = data.meta || {};
  const urlForLang = (l) => articleUrl(slug, l, baseUrl);
  const canonicalUrl = urlForLang(lang);
  const t = I18N[lang];

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: pickField(meta, 'title', lang),
    description: pickField(meta, 'subtitle', lang),
    datePublished: meta.date,
    dateModified: dateModified || meta.date,
    inLanguage: lang,
    author: buildAuthorPerson(author, baseUrl),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: baseUrl + '/assets/img/favicon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    keywords: Array.isArray(meta.tags) ? meta.tags.join(', ') : '',
    wordCount: computeArticleWordCount(data, lang),
  };

  /* FAQPage JSON-LD emits only when the article carries an explicit
     faqs_<lang> array. Deriving FAQs from body sections produced
     misleading structured data (article items aren't questions),
     so we gate emission on a real, dedicated FAQ block in
     content.js that also renders visibly in the HTML. */
  const faqPage = faqs && faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      }
    : null;

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: homeUrl(lang, baseUrl) },
      { '@type': 'ListItem', position: 2, name: t.articles, item: listingUrl(lang, baseUrl) },
      { '@type': 'ListItem', position: 3, name: pickField(meta, 'title', lang), item: canonicalUrl },
    ],
  };

  return { blogPosting, faqPage, breadcrumbList };
}

/* Visible byline for the article hero. Links to the author's
   /over-ons/ bio page; the link stays even if /over-ons/ is still a
   placeholder (tracked separately per the YMYL audit). */
function renderByline(author, lang) {
  const t = I18N[lang];
  const tagline = author.byline ? author.byline[lang] || author.byline.nl : '';
  const name = `<a href="${esc(author.url)}"><strong>${esc(author.name)}</strong></a>`;
  return `<p class="article-hero__byline">${esc(t.byline_intro)} ${name}${
    tagline ? ` &mdash; ${esc(tagline)}` : ''
  }</p>`;
}

/* Harm-reduction disclaimer aside. Rendered at article foot on
   substance articles only. Phrasing is canonical per the YMYL/GEO
   standard — do not edit without updating the policy source. */
function renderHarmReduction(lang) {
  const t = I18N[lang];
  const links = t.harm_reduction_links
    .map((l) => `<li>${renderAnchor(l.href, l.name)} &mdash; ${esc(l.desc)}</li>`)
    .join('');
  const tel = `<a href="tel:112">${esc(t.harm_reduction_tel_label)}</a>`;
  return `<aside class="callout callout--warning" role="note" id="harm-reduction">
<h2>${esc(t.harm_reduction_heading)}</h2>
<p>${esc(t.harm_reduction_body)} ${tel}.</p>
<p>${esc(t.harm_reduction_for_help)}</p>
<ul>
${links}
</ul>
</aside>`;
}

/* Visible FAQ section. Only emitted when content.js carries
   explicit faqs_<lang> entries. Questions render as h3s so they are
   parsed both by humans and by the FAQPage JSON-LD extractor. */
function renderFaqSection(faqs, lang) {
  if (!faqs || !faqs.length) return '';
  const t = I18N[lang];
  const body = faqs
    .map(
      (f) => `<div class="faq-item">
<h3>${esc(f.question)}</h3>
<p>${esc(f.answer)}</p>
</div>`
    )
    .join('\n');
  return `<section class="wrapper--narrow" id="faq" aria-labelledby="faq-heading">
<div style="padding:48px 0 32px;">
<h2 id="faq-heading">${esc(t.faq)}</h2>
${body}
</div>
</section>`;
}

/* ------------------------------ main renderer ------------------------------ */

export function renderArticle(data, lang, opts = {}) {
  const slug = opts.slug || (data.meta && data.meta.slug) || '';
  const baseUrl = opts.baseUrl || DEFAULT_BASE_URL;
  const siteName = opts.siteName || DEFAULT_SITE_NAME;

  if (!['nl', 'en'].includes(lang)) throw new Error(`Unsupported lang: ${lang}`);
  if (!slug) throw new Error('renderArticle: slug is required');
  if (!data.meta) throw new Error(`renderArticle: data.meta missing for ${slug}`);

  const t = I18N[lang];
  const meta = data.meta;
  const layout = detectLayout(data);

  const title = pickField(meta, 'title', lang);
  const subtitle = pickField(meta, 'subtitle', lang);
  const heroLabel = pickField(meta, 'heroLabel', lang);
  const readTime = pickField(meta, 'readTime', lang);
  const stepCount = pickField(meta, 'stepCount', lang);
  const phaseCount = pickField(meta, 'phaseCount', lang);

  const canonicalUrl = articleUrl(slug, lang, baseUrl);
  const canonicalPath = canonicalUrl.slice(baseUrl.length);
  const nlUrl = articleUrl(slug, 'nl', baseUrl);
  const enUrl = articleUrl(slug, 'en', baseUrl);

  const intro = pickLangArray(data, 'intro', lang);
  const conclusion = pickLangArray(data, 'conclusion', lang);
  const ogLocale = lang === 'nl' ? 'nl_NL' : 'en_GB';
  const ogLocaleAlt = lang === 'nl' ? 'en_GB' : 'nl_NL';

  const dateModified = opts.dateModified || meta.date || '';
  const modifiedDateOnly = dateModified ? dateModified.slice(0, 10) : '';

  /* Author: the article may override meta.author; default is Floris
     Moerkamp per the workspace policy. meta.author may be the full
     record or an object with at least a name — if partial, fields
     fall back to the default. */
  const author = meta.author && typeof meta.author === 'object' ? { ...DEFAULT_AUTHOR, ...meta.author } : DEFAULT_AUTHOR;

  const faqs = extractExplicitFaqs(data, lang);
  const isSubstance = isSubstanceArticle(meta);

  const { blogPosting, faqPage, breadcrumbList } = buildJsonLd(data, lang, {
    slug,
    baseUrl,
    siteName,
    dateModified,
    author,
    faqs,
  });

  // JSON-LD is serialised in a fixed order & form for deterministic output.
  const jsonLdBlock = (obj) =>
    `<script type="application/ld+json">${JSON.stringify(obj, null, 2)
      .replace(/</g, '\\u003c')}</script>`;

  // Layout-specific body
  let body = '';
  if (layout === 'listicle') body = renderListicleBody(data, lang);
  else if (layout === 'guide-steps') body = renderGuideStepsBody(data, lang);
  else if (layout === 'explainer') body = renderExplainerBody(data, lang);
  else body = renderEssayBody(data, lang);

  const htmlTitle = `${title} — ${siteName}`;
  const descriptionSafe = (subtitle || '').slice(0, 300);

  const heroMeta = [readTime, stepCount, phaseCount]
    .filter(Boolean)
    .map((v) => `<span>${esc(v)}</span>`)
    .join('\n');

  const datetime = meta.date || '';

  return `<!DOCTYPE html>
<html lang="${esc(lang)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(htmlTitle)}</title>
<meta name="description" content="${esc(descriptionSafe)}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="canonical" href="${esc(canonicalUrl)}">
<link rel="alternate" hreflang="nl" href="${esc(nlUrl)}">
<link rel="alternate" hreflang="en" href="${esc(enUrl)}">
<link rel="alternate" hreflang="x-default" href="${esc(enUrl)}">
<link rel="icon" type="image/png" href="/assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400;1,9..40,500&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css">
<meta property="og:site_name" content="${esc(siteName)}">
<meta property="og:locale" content="${esc(ogLocale)}">
<meta property="og:locale:alternate" content="${esc(ogLocaleAlt)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(htmlTitle)}">
<meta property="og:description" content="${esc(descriptionSafe)}">
<meta property="og:url" content="${esc(canonicalUrl)}">
<meta property="article:published_time" content="${esc(datetime)}">
<meta property="article:modified_time" content="${esc(dateModified)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(htmlTitle)}">
<meta name="twitter:description" content="${esc(descriptionSafe)}">
${jsonLdBlock(blogPosting)}
${faqPage ? jsonLdBlock(faqPage) + '\n' : ''}${jsonLdBlock(breadcrumbList)}
</head>
<body>

<div id="site-header"></div>
<div class="progress-bar" id="progressBar"></div>
<button class="back-to-top" id="backToTop" aria-label="Back to top" onclick="window.scrollTo({top:0,behavior:'smooth'})">
${BACK_TO_TOP_SVG}
</button>

<main id="main-content">
<article id="app">

<header class="wrapper--narrow">
<div class="article-hero">
${heroLabel ? `<div class="hero__label">${esc(heroLabel)}</div>` : ''}
<h1>${esc(title)}</h1>
<p class="article-hero__subtitle">${esc(subtitle)}</p>
<div class="article-hero__meta hero-meta">
${heroMeta}
${dateModified ? `<span class="article-hero__updated">${esc(t.last_updated)}: <time datetime="${esc(dateModified)}">${esc(modifiedDateOnly)}</time></span>` : ''}
</div>
${renderByline(author, lang)}
</div>
</header>

<div class="wrapper--narrow"><div class="divider"></div></div>

<section class="wrapper--narrow" id="introductie">
<div style="padding:48px 0 40px;">
${intro.map((p) => `<p style="max-width:var(--content-width)">${esc(p)}</p>`).join('\n')}
</div>
</section>

<div class="wrapper--narrow"><div class="divider"></div></div>

${body}

<section class="conclusion-section" id="conclusie">
<div class="conclusion-inner">
<h2>${esc(t.conclusion)}</h2>
${conclusion.map((p) => `<p>${esc(p)}</p>`).join('\n')}
</div>
</section>

${renderFaqSection(faqs, lang)}

${isSubstance ? `<div class="wrapper--narrow">${renderHarmReduction(lang)}</div>` : ''}

</article>
</main>

<div id="site-footer"></div>

<script src="/assets/js/site.js"></script>
<script>
(function(){
  if (typeof Site === 'undefined') return;
  Site.init({ page: 'artikel' });
  Site.seo({
    canonical: ${JSON.stringify(canonicalPath)},
    title: ${JSON.stringify(htmlTitle)},
    description: ${JSON.stringify(descriptionSafe)},
    ogType: 'article',
    breadcrumbs: [
      { name: ${JSON.stringify(t.home)}, url: ${JSON.stringify(homePath(lang))} },
      { name: ${JSON.stringify(t.articles)}, url: ${JSON.stringify(listingPath(lang))} },
      { name: ${JSON.stringify(title)}, url: ${JSON.stringify(canonicalPath)} }
    ],
    article: {
      headline: ${JSON.stringify(title)},
      description: ${JSON.stringify(descriptionSafe)},
      datePublished: ${JSON.stringify(datetime)},
      dateModified: ${JSON.stringify(dateModified)},
      url: ${JSON.stringify(canonicalPath)},
      keywords: ${JSON.stringify(Array.isArray(meta.tags) ? meta.tags.join(', ') : '')}
    }
  });

  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var h = document.documentElement;
        var pct = h.scrollHeight > h.clientHeight
          ? ((h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight)) * 100 : 0;
        var bar = document.getElementById('progressBar');
        if (bar) bar.style.width = pct + '%';
        var btn = document.getElementById('backToTop');
        if (btn) btn.classList.toggle('visible', window.scrollY > 600);
        ticking = false;
      });
      ticking = true;
    }
  });
})();
</script>
${(opts.extraScripts || [])
  .map((src) => `<script src="${esc(src)}"></script>`)
  .join('\n')}
<script src="/assets/js/tracking.js"></script>
</body>
</html>
`;
}

/* Re-export helpers used by validate.mjs etc. */
export { detectLayout, paragraphsToPlainText, wordCount, pickField, pickLangArray };
