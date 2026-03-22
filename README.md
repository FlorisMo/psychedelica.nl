# Psychedelica.nl — AI-First Static Site Architecture

## Overview

This is a flat-file website built specifically for AI-assisted ("vibe coding") development. There is no CMS, no database, no build step. Every page is pure HTML/CSS/JS that you upload directly to your hosting via File Manager.

**Key principles:**
- Content is separated from layout (content.js per article, shared CSS/JS for design)
- One shared design system (`site.css`) ensures consistency
- One shared component library (`site.js`) handles header, footer, navigation, language toggle, and SEO
- Every article has full bilingual content (NL + EN) with a language toggle
- When building a new page, you feed AI the master prompt + design system files + your content, and it generates the page

---

## Folder Structure

```
psychedelica.nl/                    ← Root of your hosting
│
├── index.html                      ← Homepage
├── robots.txt                      ← Crawler permissions (allows AI bots)
├── sitemap.xml                     ← All pages for search engines (generated)
├── generate-sitemap.html           ← Utility: generates sitemap.xml from index.json
├── MASTER-PROMPT.md                ← Feed this to AI when building new articles
├── README.md                       ← This file
│
├── assets/                         ← Shared resources (NEVER edit per-page)
│   ├── css/
│   │   └── site.css                ← THE design system — feed this to AI
│   ├── js/
│   │   ├── site.js                 ← Shared header/footer/lang/SEO/interactions
│   │   └── tracking.js             ← Analytics, GTM, cookie consent (separate)
│   └── img/
│       ├── favicon.png
│       └── (shared images)
│
├── artikelen/                      ← Article overview page
│   └── index.html                  ← Auto-fetches from /articles/index.json
│
├── articles/                       ← All articles live here
│   ├── index.json                  ← MANIFEST: list of all articles (auto-read by overview)
│   │
│   ├── hoe-word-je-ayahuasca-begeleider/
│   │   ├── index.html              ← Article page (uses shared design)
│   │   ├── content.js              ← Article content (bilingual NL + EN)
│   │   └── quiz.js                 ← Article-specific: self-assessment quiz
│   │
│   └── (more-articles)/
│       ├── index.html
│       └── content.js
│
├── over-ons/                       ← (future page)
│   └── index.html
│
└── contact/                        ← (future page)
    └── index.html
```

---

## How to Add a New Article

### Step 1: Generate the article with AI

Feed your AI (Claude, ChatGPT, etc.) these files:

1. **`MASTER-PROMPT.md`** — the full instructions for article generation
2. **`assets/css/site.css`** — the design system
3. **`assets/js/site.js`** — the shared components
4. **`articles/index.json`** — the manifest (so AI can create internal links)
5. **Your article text** — raw text, usually in Dutch
6. **One line** specifying the layout type: `guide-steps`, `essay`, `listicle`, `explainer`, or `custom`

The AI will output: a complete `content.js` (bilingual NL + EN), a complete `index.html`, an `index.json` entry, and instructions for any other files that need updating.

### Step 2: Upload the article folder

Upload the generated `index.html` and `content.js` (and any extras like `quiz.js`) to `/articles/your-article-slug/`.

### Step 3: Update the manifest

Add the JSON entry to `/articles/index.json`. Make sure there is a comma between entries:

```json
[
  {
    "slug": "existing-article",
    ...
  },
  {
    "slug": "your-new-article",
    "title_nl": "Titel in het Nederlands",
    "title_en": "Title in English",
    "subtitle_nl": "Ondertitel",
    "subtitle_en": "Subtitle",
    "tags": ["ayahuasca", "wetenschap"],
    "readingTime": 15,
    "date": "2026-03-21",
    "featured": false
  }
]
```

### Step 4: Regenerate the sitemap

1. Open `psychedelica.nl/generate-sitemap.html`
2. Click **"Generate sitemap"**
3. Click **"Download sitemap.xml"**
4. Upload the downloaded `sitemap.xml` to your root, replacing the old one

Done. The homepage and overview page will automatically show the new article.

---

## Language System

Every page supports NL/EN with a toggle in the header.

**How it works:**
- On the homepage and static pages: elements with `data-lang="nl"` or `data-lang="en"` are shown/hidden
- On article pages: all text lives in `content.js` with `_nl` and `_en` suffixes, and the renderer picks the right version based on `Site.getLang()`
- Language preference is saved in `localStorage` as `psy_lang`
- Switching language re-renders the entire article without a page reload

---

## Design System Quick Reference

### CSS Variables (from site.css)
- **Brand colors:** `--brand-100` through `--brand-900` (purple)
- **Neutrals:** `--neutral-50` through `--neutral-900` (warm grays)
- **Semantic:** `--bg`, `--text`, `--text-muted`, `--accent`, `--border`
- **Fonts:** `--font-display` (DM Sans 600), `--font-sans` (DM Sans), `--font-mono` (JetBrains Mono)
- **Aliases:** `--serif`, `--sans`, `--mono`, `--border-md` (backward compat for quiz.js etc.)

### Available Components
- `.btn`, `.btn--primary`, `.btn--outline`, `.btn--ghost`
- `.card`, `.card__title`, `.card__desc`, `.card__tags`
- `.tag`, `.tag.active`
- `.accordion`, `.accordion-trigger`, `.accordion-body`
- `.hero`, `.hero__title`, `.hero__subtitle`
- `.section`, `.section--tinted`
- `.wrapper`, `.wrapper--narrow`
- `.pillar`, `.expert-quote`
- `.modal-overlay`, `.modal`, `.modal__close`, `.modal__body`
- `.quiz-*` (full quiz flow — see quiz.js for reference)
- `.timeline`, `.timeline__item`, `.timeline__marker`, `.timeline__content`
- `.callout`, `.callout--info`, `.callout--warning`, `.callout--danger`
- `.stat-grid`, `.stat`, `.stat__number`, `.stat__label`
- `.notification-bar`
- `.styled-table`
- `.fig` (image with caption)
- `.tabs`, `.tabs__nav`, `.tabs__btn`, `.tabs__panel`
- `.label-mono`, `.text-muted`
- `.fade-up`, `.fade-up-delay-1`, `.fade-up-delay-2`

### Page Template (minimal)

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Psychedelica.nl</title>
  <meta name="description" content="Page description under 155 chars">
  <link rel="icon" type="image/png" href="/assets/img/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400;1,9..40,500&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
  <div id="site-header"></div>

  <main id="main-content">
    <!-- YOUR PAGE CONTENT HERE -->
  </main>

  <div id="site-footer"></div>
  <script src="/assets/js/site.js"></script>
  <script>
    Site.init({ page: 'your-page-name' });
    Site.seo({
      canonical: '/your-page/',
      title: 'Page Title — Psychedelica.nl',
      description: 'Page description',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Page Title', url: '/your-page/' }
      ]
    });
  </script>
  <script src="/assets/js/tracking.js"></script>
</body>
</html>
```

---

## SEO / GEO / AEO

### Automatic (handled by `Site.seo()`)
Every page that calls `Site.seo({...})` automatically gets:
- **JSON-LD schema:** Organization, BreadcrumbList, and optionally BlogPosting + WebSite
- **Open Graph tags:** og:title, og:description, og:url, og:type, og:site_name, og:locale
- **Twitter Card tags:** summary_large_image
- **Canonical URL:** `<link rel="canonical">`
- **Hreflang annotations:** nl, en, x-default (self-referencing for bilingual single-URL pages)
- **Robots meta:** `index, follow, max-snippet:-1, max-image-preview:large`
- **Dynamic `<html lang>`** attribute that updates on language switch

### When you add a new article
1. Add the entry to `/articles/index.json` (the homepage and overview page read this)
2. Regenerate the sitemap using `generate-sitemap.html` (see "How to Add a New Article" §4)

### When you add a new static page (e.g. /over-ons/)
1. Create the page with `Site.seo()` call
2. Add the page to the `STATIC_PAGES` array in `generate-sitemap.html`
3. Regenerate and re-upload `sitemap.xml`

### Files for search engines
- **`/robots.txt`** — allows all crawlers including GPTBot, ClaudeBot, PerplexityBot
- **`/sitemap.xml`** — all pages with hreflang annotations (generated from index.json)
- **`/generate-sitemap.html`** — utility page to regenerate sitemap.xml (marked noindex)

### Content tips for AI visibility (GEO/AEO)
- The first 200 words of each article should directly answer the main topic/question
- Use descriptive headings (question-format is ideal for AI extraction)
- Keep paragraphs short (2-4 sentences) — each paragraph should make one clear point
- Include specific data points, numbers, and expert quotes where available

---

## Tracking & Analytics

The file `assets/js/tracking.js` handles:
- **Google Analytics 4** — disabled by default, fill in your Measurement ID to enable
- **Google Tag Manager** — disabled by default, fill in your Container ID to enable
- **Cookie consent banner** — enabled by default, bilingual (NL/EN), GDPR-friendly
- **`Tracking.event(name, params)`** — helper for custom event tracking from any page

---

## Important Notes

1. **The overview page auto-discovers articles** from `/articles/index.json`. You never need to manually update the overview page — just update the manifest.

2. **Tags are free-form.** Add any tags you want per article in index.json. The overview page collects all unique tags and builds the filter bar automatically.

3. **No build step required.** Everything is plain HTML/CSS/JS. Upload to your hosting and it works.

4. **JSON syntax matters.** Make sure there is a comma between objects in `index.json`. Missing commas will silently break the homepage and overview page.

5. **The master prompt (`MASTER-PROMPT.md`) is your AI workflow.** It contains everything the AI needs to generate a complete article. See §12 in the master prompt for what to feed it.
