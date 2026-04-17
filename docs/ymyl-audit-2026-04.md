# YMYL & Citability Audit — 2026-04-17

Branch: `fix/ymyl-2026`. Scope: per-article YMYL compliance and GEO citability
per the SEO/GEO Technical Standards & Strategy skill
(Nestr `goRN5pRmMy7QZE2tY`) and the Author — Floris Moerkamp skill
(Nestr `SvLTFu3Subktebc4K`). Content rewrites are explicitly out of scope —
banned-language hits, short FAQs, missing definition leads, and missing
legal-status sections are **flagged**, not fixed.

Legend: ✅ pass · ❌ fail · ⚠️ flagged for a content role · ↻ remediated in this PR.

Methodology: build-from-clean (`npm run prerender --force`) against `main`
after Prompt A merged, then inspect `articles/<slug>/index.html` and
`en/articles/<slug>/index.html` directly. URL layout per Prompt A: NL at `/`,
EN under `/en/`; no redirects.

Substance articles (those whose `meta.tags` intersects the YMYL substance
set — ayahuasca, psilocybin, LSD, DMT, MDMA, ketamine, 2C-B, mescaline,
ibogaine, 5-MeO-DMT, and vernacular variants): both current articles qualify
(ayahuasca / DMT).

---

## Phase 1 — per-article matrix (pre-fix)

| slug | tags | NL author Person | EN author Person | NL "Laatst bijgewerkt" | EN "Last updated" | Harm-reduction (NL/EN) | Legal-status section | Definition lead (NL) | Definition lead (EN) | FAQPage / HTML parity | Internal links (in / out) | Outbound links (2–5) | Banned-language hits | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| hoe-word-je-ayahuasca-begeleider | ayahuasca, begeleiding, ceremonies | ❌ Organization only | ❌ Organization only | ✅ | ✅ | ❌ absent | ❌ absent | ⚠️ no 40–60-word direct answer + no numbered list before first H2 | ⚠️ same gap | ❌ 30 JSON-LD Qs vs 0 HTML "FAQ" section | 0 / 0 | 0 | 3 EN hits ("Furthermore" ×2, "it is important to note" ×2 — lines 54, 55, 85, 448) · 1 NL hit ("Tot slot" — line 413) · 2 NL "belangrijk om op te merken" mirrors (lines 50, 79) | FIX-AUTOMATIC for schema / byline / disclaimer / FAQ gate; FLAG-HUMAN for language, legal status, definition lead |
| misvattingen-over-ayahuasca | ayahuasca, misvattingen, veiligheid, dmt | ❌ Organization only | ❌ Organization only | ✅ | ✅ | ❌ absent | ⚠️ informal mention in item 5 only, undated | ⚠️ no 40–60-word direct answer + no numbered list before first H2 | ⚠️ same gap | ❌ 7 JSON-LD Qs vs 0 HTML "FAQ" section | 0 / 0 | 0 | none in content body | FIX-AUTOMATIC for schema / byline / disclaimer / FAQ gate; FLAG-HUMAN for legal status, definition lead, FAQ data |

---

## Findings by category

### C1 — Author Person schema

**Status: FIX-AUTOMATIC (applied).** Both articles previously rendered
`BlogPosting.author` as the site Organization (`Psychedelica.nl`). Per the
Author — Floris Moerkamp skill, author is always a `Person` with `jobTitle`,
`affiliation`, `image`, and a three-entry `sameAs` (LinkedIn, X, Instagram).

Remediation: introduced `scripts/authors/floris-moerkamp.mjs` as the single
source of truth and updated `scripts/templates/article.mjs` to build
`buildAuthorPerson(author, baseUrl)` from that record. Every article now
emits the full Person block in its `BlogPosting` JSON-LD.

Visible byline: was entirely absent on both languages. Now renders inside
the article hero, per-language, with the canonical copy and a link to
`/over-ons/`.

**Flagged (do NOT fix in this PR):**
- ⚠️ `/over-ons/` page does not exist. The link target is correct per the
  Author skill; the missing page is a separate Copywriter / Design task.
- ⚠️ `/assets/img/author/floris.jpg` does not exist on disk; the JSON-LD
  reference stays per hard constraint #4. Flagged for Circle Lead / Design.
  Do NOT remove the reference — supplying the headshot is a parallel task.
- ⚠️ Google Scholar URL is not in the current Author skill. Do NOT
  fabricate; re-audit once the skill carries it.

### C2 — Visible "Laatst bijgewerkt" / "Last updated"

**Status: ✅ PASS.** Prompt A's "article-hero__updated" span is present on
both articles in both languages with the ISO-8601 `dateModified` resolved
from the last Git commit touching `content.js`. No regression.

### C3 — Harm-reduction disclaimer block (substance articles)

**Status: FIX-AUTOMATIC (applied).** Both current articles are substance
articles (ayahuasca / DMT). Both previously rendered NO harm-reduction
disclaimer anywhere in the static HTML.

Remediation: added `renderHarmReduction(lang)` to the article template,
gated by `isSubstanceArticle(meta)`. The canonical NL and EN phrasing from
this prompt (Section C3) renders verbatim at article foot, with links to
Jellinek, Trimbos, Unity, Mainline, and `tel:112`. All outbound anchors
carry `rel="external"`.

### C4 — Legal status section (substance articles)

**Status: ⚠️ FLAG-HUMAN.** Content Strategist / Peer Reviewer.

- `hoe-word-je-ayahuasca-begeleider`: no dated legal-status block. The
  article is a practitioner guide, but still needs a visible Opiumwet (NL) /
  Schedule (EN) reference for YMYL compliance.
- `misvattingen-over-ayahuasca`: item 5 mentions 2018 Santo Daime precedent
  informally but no dated "Opiumwet Lijst I/II" block exists. No visible
  "Laatst geverifieerd" date on the legal claim.

Do NOT write legal text (hard constraint #3). Route to Content Strategist
(`Schrijver/Content Strategist` in the skills workspace) with Peer Reviewer
sign-off for clinical accuracy.

### C5 — Definition lead (first 200 words)

**Status: ⚠️ FLAG-HUMAN.** Copywriter.

Both articles open with atmospheric framing rather than a 40–60-word direct
answer to the article's primary query, and neither front-loads a numbered
list of key points before the first H2. Per the SEO/GEO skill AI parses
numbered lists more reliably than bullets, and citation rates fall sharply
when the primary answer is not in the opening paragraph.

Specifically:
- `hoe-word-je-ayahuasca-begeleider`: the intro describes the landscape
  but never defines what "ayahuasca begeleider" is or the concrete answer
  to "hoe word je er een?". A numbered summary of the 5 phases would be
  the natural opener.
- `misvattingen-over-ayahuasca`: the intro hints at "seven misconceptions"
  but does not list them. A one-line numbered preview of the 7 myths would
  trivially satisfy the rule.

Do NOT rewrite (hard constraint #1). Flagged for the Copywriter with the
Content Strategist making the call on whether a numbered preview goes
above or below the visible date line.

### C6 — FAQPage / rendered FAQ parity

**Status: FIX-AUTOMATIC (applied) + ⚠️ FLAG-HUMAN for content.**

Pre-fix the template synthesised `FAQPage` JSON-LD from body sections
(7 items for `misvattingen-…`, 30 entries for `hoe-word-…` counting steps
plus context accordions). Those are content headings, not Q/A pairs — and
the rendered HTML has no dedicated FAQ section, so HTML and JSON-LD
diverged by construction.

Remediation: the template now only emits `FAQPage` JSON-LD when
`content.js` carries an explicit `faqs_<lang>` array of
`{question, answer}` objects. When present, the same array also renders
as a visible `<section id="faq">` with H3 questions and paragraph answers.
HTML and JSON-LD can no longer diverge. When absent (as today), no
`FAQPage` JSON-LD is emitted at all — clean instead of misleading.

Flagged: neither article has `faqs_nl` / `faqs_en` yet. Per the SEO/GEO
skill 3–5 Q/A pairs are required per article. Do NOT write them (hard
constraint #2); flagged for Content Strategist / Copywriter. Proposed Qs
for each article are listed in `docs/content-flags-2026-04.md`.

### C7 — Internal linking

**Status: ⚠️ FLAG-HUMAN.** Copywriter (via `docs/internal-linking-proposals-2026-04.md`).

In static HTML only (runtime JS-injected links are excluded per spec):

| slug | incoming | outgoing | meets ≥2/≥2 |
| --- | --- | --- | --- |
| hoe-word-je-ayahuasca-begeleider | 0 | 0 | ❌ |
| misvattingen-over-ayahuasca | 0 | 0 | ❌ |

Root cause: article body paragraphs flow through the template's
`renderParagraphs` helper, which HTML-escapes its input, so no
content-authored anchors survive. The two articles also cannot satisfy
"≥2 incoming" because only two articles exist total. This is a content-
inventory gap rather than a template bug — proposals live in
`docs/internal-linking-proposals-2026-04.md`.

### C8 — Outbound links

**Status: ⚠️ FLAG-HUMAN for content; ✅ PASS for `rel="external"` on every outbound anchor emitted by the template.**

Pre-fix: neither article had any outbound anchors in body prose (the
escape-on-render pipeline strips them). The only off-site URLs in the
static HTML were font `<link>` preconnect / stylesheet entries, which are
resource hints rather than YMYL citations.

Post-fix: the harm-reduction disclaimer adds 4 outbound anchors per
substance article per language (Jellinek / Trimbos / Unity / Mainline),
each with `rel="external"`. The article still lacks 2–5 scholarly /
institutional citations (PubMed, RIVM, EMCDDA, MAPS, Beckley, Drug
Science, peer-reviewed research) as required by the SEO/GEO skill —
flagged for Content Strategist.

Template helper: `renderAnchor(href, text, {rel})` and `isExternalHref(href)`
live in `scripts/templates/article.mjs` and automatically add
`rel="external"` to any anchor whose href points outside
`psychedelica.nl` / `*.psychedelica.nl`. Content-rendered links created
via these helpers will always carry the attribute going forward.

### C9 — Banned promotional language

**Status: ⚠️ FLAG-HUMAN.** Copywriter (via `docs/banned-language-hits-2026-04.md`).

No promotional / wellness-speak hits. All findings are AI-tell phrases
in the guide article (`hoe-word-je-ayahuasca-begeleider`):

- EN "Furthermore" × 2 (lines 55, 448)
- EN "It is important to note" × 2 (lines 54, 85)
- NL "Het is belangrijk om op te merken" × 2 (lines 50, 79)
- NL "Tot slot" × 1 (line 413)

Full context in `docs/banned-language-hits-2026-04.md`. Do NOT substitute
(hard constraint #1).

### C10 — Peer Reviewer metadata

**Status: ⚠️ FLAG-HUMAN.** Peer Reviewer role.

`content.js` files do not carry a `meta.peerReviewer` field and the
rendered HTML carries no peer-review byline. Both articles are high-stakes
(substance safety, clinical framing of ayahuasca practice). Peer Reviewer
skill does not currently define a standard for this project — flagged for
the Peer Reviewer role to define the schema, after which a follow-up PR
can render it.

---

## Phase 2 — remediation summary

| ID | Action | Status |
| --- | --- | --- |
| R1 | Author Person schema (single-source module, full block in BlogPosting) | ↻ applied |
| R2 | Canonical NL / EN visible byline in hero, linking to `/over-ons/` | ↻ applied |
| R3 | Harm-reduction disclaimer auto-rendered on substance articles (both languages) | ↻ applied |
| R4 | `rel="external"` helper in template; every disclaimer outbound anchor carries it | ↻ applied |
| R5 | FAQPage JSON-LD gated on explicit `faqs_<lang>` array; HTML FAQ section renders from same source | ↻ applied |
| R6 | FLAG docs written: this file, banned-language hits, internal-linking proposals, content flags | ↻ applied |

---

## Phase 3 — post-fix matrix

| slug | NL author Person | EN author Person | NL "Laatst bijgewerkt" | EN "Last updated" | Harm-reduction (NL/EN) | FAQPage / HTML parity | `rel="external"` on outbound | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| hoe-word-je-ayahuasca-begeleider | ✅ | ✅ | ✅ | ✅ | ✅ NL + EN | ✅ (no FAQ emitted; no divergence possible) | ✅ 4/4 | PASS for all FIX-AUTOMATIC items |
| misvattingen-over-ayahuasca | ✅ | ✅ | ✅ | ✅ | ✅ NL + EN | ✅ (no FAQ emitted; no divergence possible) | ✅ 4/4 | PASS for all FIX-AUTOMATIC items |

FLAG-HUMAN items (C4 legal status, C5 definition lead, C6 FAQ content, C7
internal linking, C8 outbound scholarly citations, C9 banned language,
C10 peer reviewer) remain as per their respective handoff docs.

---

## Handoff docs (Workspace Resources register these per skill `WS4ifSLZPrsqQWFma`)

- `docs/ymyl-audit-2026-04.md` (this file) — full per-article matrix
- `docs/banned-language-hits-2026-04.md` — Copywriter
- `docs/internal-linking-proposals-2026-04.md` — Copywriter / Content Strategist
- `docs/content-flags-2026-04.md` — aggregated flags by role

---

## Verification

- `npm run prerender -- --force` builds clean on both articles.
- Rich Results Test input ready for one sample URL:
  `https://psychedelica.nl/articles/misvattingen-over-ayahuasca/` — valid
  BlogPosting + BreadcrumbList; no FAQPage emitted (intentional).
- `grep -oE 'rel="external"'` in the static HTML: 4 per article per
  language, matching the 4 disclaimer outbound anchors.
- Author `<script type="application/ld+json">` Person block inspected
  manually in both NL and EN for both articles — matches the skill
  template.
