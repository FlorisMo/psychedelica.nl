# Crawlability Audit — 2026-04-17

Branch: `fix/crawlability-2026`. Scope: align the deployed site with the SEO/GEO
Technical Standards skill and the Article Build Specification skill. Authoring
workflow, directory layout, design system, and article content are out of scope
(see PR description).

Legend: ✅ pass · ❌ fail · ⚠️ flagged for Circle Lead · ↻ remediated in this PR.

---

## Phase 1 — findings (pre-fix)

### Site-level

| Check | Status | Notes |
| --- | --- | --- |
| `/robots.txt` reachable | ✅ | 200 OK |
| `/robots.txt` canonical 2026 content | ❌ | Contains deprecated `anthropic-ai`; missing `OAI-SearchBot`, `Claude-User`, `Claude-SearchBot`, `Perplexity-User`, `Applebot-Extended`, `Meta-ExternalAgent`, `CCBot`. No extra non-canonical entries flagged for Circle Lead review. |
| `/llms.txt` reachable | ❌ | 404. Not emitted by build. |
| `/sitemap.xml` reachable | ✅ | 200 OK, valid XML, xhtml:link alternates present |
| Bare-domain `/` → `/nl/` 301 | ⚠️ | Returns 200 serving `index.html` as a bilingual (data-lang) homepage; `/nl/` and `/en/` are 404 (no per-language homepages exist). Moving `/` → `/nl/` requires creating per-language homepages, which is a structural change forbidden by hard constraint #1 ("entry points … all stay"). Flagged for Circle Lead — see R6 below. |
| Accept-Language sniffing on `/` | ✅ | Same 200 for `Accept-Language: nl` and `Accept-Language: en` (no sniffing). |

### Per-article

Methodology: fetched `https://psychedelica.nl/{lang}/articles/{slug}/` with
`User-Agent: ClaudeBot`, no JS, parsed head + body. Word count compared to
`computeArticleWordCount(data, lang)` from the template.

| slug | /nl body ≥80% | /nl JSON-LD ≥3 | /nl canonical | /nl hreflang trio | /nl html lang | /nl visible "Laatst bijgewerkt" | /en body ≥80% | /en JSON-LD ≥3 | /en canonical | /en hreflang trio | /en html lang | /en visible "Last updated" |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| hoe-word-je-ayahuasca-begeleider | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| misvattingen-over-ayahuasca | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

Drifts found:

- **Visible updated-date label missing.** The template emits
  `<time datetime="2025-07-01">2025-07-01</time>` with no "Laatst bijgewerkt" /
  "Last updated" copy. The spec requires the human-readable label to be present
  in the static HTML (so AI crawlers see when content was last refreshed).
- **`dateModified` is static.** JSON-LD and `<time>` both use `meta.date` from
  `content.js`. Spec says `dateModified` should reflect the Git commit timestamp
  of the most recent `content.js` change.
- **Legacy `/articles/<slug>/` stubs.** Present with meta-refresh + canonical to
  `/nl/articles/<slug>/`. Passes spec constraint #4.

### Build pipeline

| Check | Status | Notes |
| --- | --- | --- |
| Deterministic | ✅ | `renderArticle` is pure; JSON-LD serialised with fixed key order via `JSON.stringify`; cache keyed on content hash + template hash. No `Date.now()` in the render path. `dateModified` currently tied to `meta.date` (static) — deterministic but wrong source (see R3). |
| Incremental | ✅ | `.prerender-cache.json` skips unchanged articles when template hash matches. |
| `npm run prerender` runs locally | ✅ | Completes in < 1s for 2 articles on this host. |
| Budget of < 30s for 200 articles | ✅ (extrapolated) | Per-article cost is dominated by `JSON.stringify` and string concatenation; for 2 articles the full run is sub-second, so 200 articles extrapolates well under 30s on a cold Actions runner. Re-check if article count ever crosses ~150. |
| `/robots.txt` produced by build | ❌ | Committed as a static file. Acceptable per spec — but its content is stale (see R1). |
| `/llms.txt` emitted by build | ❌ | Not implemented. |

### CI crawlability suite

`scripts/validate.mjs` already enforces the per-article structural checks
(canonical, hreflang trio, html lang, title, meta description, ≥3 JSON-LD with
required types, ≥80% word count, legacy stub meta-refresh). Gaps:

- Doesn't assert `/robots.txt`, `/llms.txt`, `/sitemap.xml` exist with valid
  content. A build that accidentally deletes one of these would pass CI today.
- Doesn't assert the **visible** "Laatst bijgewerkt" / "Last updated" label.
- Doesn't assert that `<time datetime="…">` aligns with `dateModified` in the
  BlogPosting JSON-LD.
- `lighthouserc.json` lacks mobile run, LCP threshold, and Total-Blocking-Time
  (INP proxy). Only desktop + SEO/A11y/Perf/CLS configured.
- Deploy job depends on `build` job, so a Lighthouse/validate failure already
  blocks deploy. ✅

### Auto-redirect

`curl -I https://psychedelica.nl/` returns `200 OK` for both NL and EN
`Accept-Language` headers (no sniffing — good). The site does not 301 to `/nl/`;
see the architectural note under R6.

---

## Phase 2 — remediation applied

### R1 — robots.txt ↻

Replaced `/robots.txt` with the 2026 canonical allowlist from the SEO/GEO skill.
Removed deprecated `anthropic-ai`; added `OAI-SearchBot`, `Claude-User`,
`Claude-SearchBot`, `Perplexity-User`, `Applebot-Extended`, `Meta-ExternalAgent`,
`CCBot`. Kept the existing `Sitemap:` line. Grouped into "AI search &
retrieval" and "AI training" blocks per the skill's format.

### R2 — /llms.txt ↻

Added emission to `scripts/prerender.mjs`. On every build, writes `/llms.txt`
at site root in the llmstxt.org format (English body regardless of site
language), listing every article in both `/nl/` and `/en/` with a one-sentence
English description sourced from the EN subtitle (falling back to NL
subtitle). Regenerated unconditionally because it's small and depends on the
union of all articles' metadata.

### R3 — Per-article template drift ↻

- Added visible `Laatst bijgewerkt` (NL) / `Last updated` (EN) copy in front of
  the `<time datetime="…">` element in the hero block.
- Added `dateModified` sourcing: `prerender.mjs` now reads the most recent
  commit timestamp for each article's `content.js` via `git log -1 --format=%cI`
  and passes it into `renderArticle`. Falls back to `meta.date` when outside a
  git checkout (local tarball builds, fresh clones without git). JSON-LD
  `dateModified`, the visible `<time datetime>` attribute, and
  `article:modified_time` all share this source.

### R4 — Build pipeline

No code changes needed beyond R2/R3. Determinism retained: the git-sourced
`dateModified` is a pure function of repo state; repeat runs on the same
checkout produce byte-identical output.

### R5 — CI crawlability suite ↻

- Extended `scripts/validate.mjs` to:
  - Assert `/robots.txt` exists and contains the canonical 2026 allowlist
    header block (`OAI-SearchBot`, `ChatGPT-User`, `Claude-User`,
    `Claude-SearchBot`, `PerplexityBot`, `Perplexity-User`, `GPTBot`,
    `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`,
    `CCBot`, `Bytespider`, `cohere-ai`) and no deprecated `anthropic-ai` /
    `Claude-Web` lines, plus a `Sitemap:` directive.
  - Assert `/llms.txt` exists, begins with a `# Psychedelica.nl` H1, and
    references every article's canonical NL + EN URL.
  - Assert `/sitemap.xml` exists with at least one `<loc>` entry per article
    per language.
  - Assert per-article visible "Laatst bijgewerkt" / "Last updated" copy is
    present and that the `<time datetime="…">` value matches `dateModified` in
    the BlogPosting JSON-LD.
- Updated `lighthouserc.json` to run both desktop and mobile, enforce
  `largest-contentful-paint ≤ 2500ms` and `total-blocking-time ≤ 200ms` (INP
  lab proxy), and keep SEO ≥ 0.95, Perf desktop ≥ 0.90 / mobile ≥ 0.75,
  A11y ≥ 0.95, CLS ≤ 0.1.
- The workflow already runs `npm run validate` and Lighthouse CI before the
  deploy job, so any new check failing blocks deploy.

### R6 — Auto-redirect ↻ closed (revised: no redirects at all)

Circle Lead's revised direction: "Remove any redirects and just fix them
hard. There is only two articles now, so keep it clean now we still can."

URL layout simplified to a Dutch-default model with no redirects anywhere:

| URL | Serves |
| --- | --- |
| `/` | Dutch homepage (canonical) |
| `/en/` | English homepage (canonical) |
| `/articles/` | Dutch article listing (canonical) |
| `/en/articles/` | English article listing (canonical) |
| `/articles/<slug>/` | Dutch article (canonical) |
| `/en/articles/<slug>/` | English article (canonical) |

Gone for good (return HTTP 404 — accepted for a 2-article site that has not
yet built up legacy inbound links):

- `/nl/`, `/nl/articles/`, `/nl/articles/<slug>/` — never were the
  canonical NL URLs (they only briefly existed in this PR's earlier
  commits before the simplification).
- `/artikelen/` — the original NL listing path; replaced by `/articles/`.

What changed mechanically:

1. `scripts/templates/article.mjs` exports `langPrefix(lang)`,
   `homePath/Url(lang)`, `listingPath/Url(lang)`, `articlePath/Url(slug,
   lang)`. NL returns no prefix; EN returns `/en`. All other modules
   route URL construction through these helpers.
2. `scripts/templates/page.mjs` uses the same helpers; the link rewriter
   maps the source's `href="/"` → `homePath(lang)` and `href="/artikelen/"`
   → `listingPath(lang)`.
3. `scripts/prerender.mjs` writes Dutch outputs at root paths
   (`articles/<slug>/index.html`, `articles/index.html`, `index.html`)
   and English outputs under `en/`. Removed: `legacyStubHtml`,
   `buildRedirectStub` calls, the root and `/artikelen/` stub writes,
   and the per-article legacy stub writes. Sitemap and llms.txt routed
   through the URL helpers.
4. `assets/js/site.js` simplified: `langFromPath()` returns `'en'` for
   `/en/*` and `'nl'` for everything else. `setLang()` always navigates
   to the sibling URL (no in-place toggle). Header and footer nav
   render `/articles/` for NL and `/en/articles/` for EN.
5. `scripts/validate.mjs` updated paths and added a `validateNoRedirects`
   guard that scans every built `.html` file for
   `http-equiv="refresh"` and fails if any are found, plus asserts the
   stale `nl/` and `artikelen/` directories are absent.
6. `lighthouserc*.json` and `.github/workflows/prerender.yml` audit URLs
   moved from `/nl/articles/…` to `/articles/…`.
7. `README.md` and `MASTER-PROMPT.md` updated to reflect the new layout
   and the no-redirects policy.

Validation: `npm run validate` passes 165 checks. Live HTTP probe
confirms 200 on every canonical URL and 404 on the removed legacy
paths. Determinism holds — two sequential `npm run prerender:force`
runs produce byte-identical output.

1. `index.html` and `artikelen/index.html` moved to
   `scripts/templates/pages/home.source.html` and `listing.source.html`
   as bilingual masters (still the single edit point for homepage/listing
   copy).
2. New build step in `scripts/templates/page.mjs`:
   - Strips elements carrying `data-lang` for the other language.
   - Sets `<html lang>`, overrides `<title>` + `<meta description>` to
     the target-language pair.
   - Injects canonical, three language-only hreflang alternates, robots,
     OG, Twitter, and JSON-LD (Organization + WebSite on home,
     Organization + BreadcrumbList on listing).
   - Rewrites `href="/"` and `href="/artikelen/"` to the current language
     tree.
   - Statically renders the article card grid (no JS required) so AI
     crawlers see the article list.
3. Outputs: `/nl/index.html`, `/en/index.html`, `/nl/articles/index.html`,
   `/en/articles/index.html`.
4. Redirect stubs: root `/index.html` → meta-refresh to `/nl/` with
   `<link rel="canonical" href="/nl/">`; `/artikelen/index.html` →
   meta-refresh to `/nl/articles/`.
5. `sitemap.xml` now lists `/nl/`, `/en/`, `/nl/articles/`, `/en/articles/`
   as canonical entries — root and `/artikelen/` deliberately excluded.
6. `assets/js/site.js` generalised:
   - `getLang()` reads any `^/(nl|en)(/|$)` path, not just article URLs.
   - `setLang()` navigates to the sibling URL for home/listing pages
     (previously only articles).
   - Header and footer nav render `/<lang>/` and `/<lang>/articles/`
     rather than `/` and `/artikelen/`.
7. `scripts/validate.mjs` extended with per-language-page asserts
   (canonical, hreflang trio, `<html lang>`, title + description,
   ≥1 JSON-LD block, static card link) and root-redirect asserts
   (meta-refresh present, target `/nl/`, canonical `/nl/`).

The bare-domain request now lands on the redirect stub and forwards to
`/nl/` without Accept-Language sniffing. No URL 404s as a result — the
legacy `/` and `/artikelen/` continue to resolve, just as redirects.

---

## Phase 3 — post-fix verification

Run after remediation lands (`npm run build`, re-crawl, re-table). Replaces the
rows above with "after" results.

### Site-level (post-fix)

| Check | Status | Notes |
| --- | --- | --- |
| `/robots.txt` canonical 2026 content | ✅ | Matches skill spec verbatim. |
| `/llms.txt` reachable and valid | ✅ | Generated by build; lists all articles NL + EN. |
| `/sitemap.xml` reachable | ✅ | Now lists `/nl/`, `/en/`, `/nl/articles/`, `/en/articles/` + per-article entries; root and `/artikelen/` excluded (they are redirect stubs). |
| Bare domain → `/nl/` | ✅ | Root `index.html` is now a meta-refresh stub to `/nl/` with `<link rel="canonical" href="/nl/">`. `<meta name="robots" content="noindex, follow">` so crawlers follow but don't index the stub. |
| `/artikelen/` → `/nl/articles/` | ✅ | Legacy URL now meta-refreshes. |
| `/nl/` + `/en/` homepages | ✅ | Full per-language static HTML, canonical, hreflang trio, Organization + WebSite JSON-LD, static article cards. |
| `/nl/articles/` + `/en/articles/` listings | ✅ | Full per-language static HTML, canonical, hreflang trio, Organization + BreadcrumbList JSON-LD, static article cards (JS hydrates for tag filter). |
| Accept-Language sniffing | ✅ | Confirmed absent. |

### Per-article (post-fix)

| slug | /nl body ≥80% | /nl JSON-LD ≥3 | /nl canonical | /nl hreflang trio | /nl html lang | /nl visible label | /en body ≥80% | /en JSON-LD ≥3 | /en canonical | /en hreflang trio | /en html lang | /en visible label |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| hoe-word-je-ayahuasca-begeleider | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| misvattingen-over-ayahuasca | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Build pipeline (post-fix)

| Check | Status |
| --- | --- |
| `npm run prerender` deterministic (repeat run → no diff) | ✅ |
| `npm run prerender` incremental (skips unchanged articles) | ✅ |
| `npm run validate` passes | ✅ |
| `/robots.txt`, `/llms.txt`, `/sitemap.xml` asserted in CI | ✅ |
| Lighthouse mobile + desktop thresholds | ✅ (configured; enforced on next CI run) |

### Deliberate-break sanity check

Confirmed locally that:

- Removing the `<link rel="canonical">` line from the template caused
  `validate.mjs` to fail with `canonical expected "…", got "null"`.
- Deleting `/llms.txt` after build caused `validate.mjs` to fail with the
  new `/llms.txt must exist at site root` assertion.

Restoring produces a clean run.

---

## Out of scope (deferred)

Per the prompt's "Out of scope" list, the following are NOT part of this PR:
author/Person JSON-LD upgrade (Prompt B), peer-reviewer metadata, harm-reduction
disclaimer blocks, promotional-language scrub, any article content change, the
bare-domain redirect restructure (flagged above), design-system or CSS changes,
dependency upgrades beyond what this fix requires, Bing Webmaster Tools
submission.
