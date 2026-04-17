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

### R6 — Auto-redirect ⚠️ flagged, not changed

**Blocked by hard constraint #1.** The spec assumes per-language homepages at
`/nl/` and `/en/`, but the repo has a single bilingual homepage at `/`
(`index.html`) with `data-lang` toggles; `/nl/` and `/en/` currently only
contain `articles/` subfolders. Redirecting `/` → `/nl/` would 404 everyone
until per-language homepages exist, and creating them is a structural change
forbidden by this prompt ("entry points … all stay").

Recommended follow-up for the Circle Lead (separate PR):

1. Split `index.html` into `/nl/index.html` (NL-only) and `/en/index.html`
   (EN-only) built from a shared template, then
2. Replace the root `index.html` with a minimal `<meta http-equiv="refresh"
   content="0; url=/nl/">` stub + `<link rel="canonical" href="/nl/">`, then
3. Update `sitemap.xml` block for `/` → `/nl/` and ensure hreflang alternates
   resolve.

For this PR: the bare domain returns 200 without Accept-Language sniffing,
which is the sniffing half of R6. The redirect half stays on the Circle
Lead's plate.

---

## Phase 3 — post-fix verification

Run after remediation lands (`npm run build`, re-crawl, re-table). Replaces the
rows above with "after" results.

### Site-level (post-fix)

| Check | Status | Notes |
| --- | --- | --- |
| `/robots.txt` canonical 2026 content | ✅ | Matches skill spec verbatim. |
| `/llms.txt` reachable and valid | ✅ | Generated by build; lists all articles NL + EN. |
| `/sitemap.xml` reachable | ✅ | Unchanged. |
| Bare domain | ⚠️ | Unchanged — flagged for separate Circle Lead PR (see R6). |
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
