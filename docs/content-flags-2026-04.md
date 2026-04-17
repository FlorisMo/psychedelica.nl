# Content Flags — 2026-04-17

Single-stop list of every FLAG-HUMAN finding from the YMYL audit
(`docs/ymyl-audit-2026-04.md`), grouped by the content role that owns
resolution. See the main audit for the per-category methodology and
matrix. This file's job is to be actionable for each role in isolation.

Roles on the workspace: **Copywriter**, **Content Strategist**,
**Peer Reviewer**, **Circle Lead** (Floris).

---

## Copywriter

### CW1 · Banned-language substitutions
Source: `docs/banned-language-hits-2026-04.md`.
Scope: 8 AI-tell hits on `hoe-word-je-ayahuasca-begeleider` (6 EN +
2 NL mirrors + 1 NL "Tot slot"). Draft replacements, keep NL↔EN pairs
parallel, no tone drift. Don't ship without Content Strategist sign-off.

### CW2 · Definition lead (first 200 words)
Each article needs 40–60 words directly answering the article title's
primary query plus a numbered list of key points, all before the first
H2. Apply once per article per language.
- `hoe-word-je-ayahuasca-begeleider` (NL + EN): front-load a one-line
  definition of "ayahuasca begeleider" plus a numbered preview of the 5
  phases.
- `misvattingen-over-ayahuasca` (NL + EN): front-load a numbered preview
  of the 7 myths.

### CW3 · FAQ content (3–5 Q/A per article)
Template now reads `faqs_<lang>` from `content.js` and renders both the
visible FAQ section and the `FAQPage` JSON-LD from that single source.
Authoring task: write 3–5 real reader-question / direct-answer pairs per
article per language.
- Suggested Qs for `misvattingen-over-ayahuasca`:
  - Is ayahuasca legaal in Nederland?
  - Kun je een bad trip krijgen van ayahuasca?
  - Is ayahuasca hetzelfde als DMT?
  - Wat is het verschil tussen ayahuasca en anahuasca?
  - Is het dieet voor een ayahuasca-ceremonie verplicht?
- Suggested Qs for `hoe-word-je-ayahuasca-begeleider`:
  - Hoe lang duurt het om ayahuasca begeleider te worden?
  - Heb je een diploma of opleiding nodig?
  - Mag je ayahuasca ceremonies begeleiden in Nederland?
  - Wat zijn de grootste risico's voor een beginnende begeleider?
  - Hoe vind je een mentor of leerlijn?
Schema shape in `content.js`:
```js
faqs_nl: [
  { question: "Is ayahuasca legaal in Nederland?",
    answer: "Nee — ayahuasca bevat DMT, dat op Opiumwet Lijst I staat. …" },
  // 3–5 total
],
faqs_en: [ /* parallel EN pairs */ ],
```

### CW4 · Internal-link drafting
Source: `docs/internal-linking-proposals-2026-04.md`. Apply anchor text
in paragraph copy once the paragraph renderer supports whitelisted HTML
(see CS3 below).

---

## Content Strategist

### CS1 · Legal status section (substance articles)
Both current articles need a dated, visible "Juridische status" /
"Legal status" block referencing Opiumwet Lijst I (NL) and DEA Schedule I
(EN). Include a `<time>` element with the last-verified date. Peer
Reviewer signs off. See also CS5.

### CS2 · Outbound scholarly citations (2–5 per article)
Article bodies currently carry zero outbound citations. Target domains
per the SEO/GEO skill: PubMed, RIVM, Trimbos, EMCDDA, Unity, Jellinek,
MAPS, Beckley, Drug Science, peer-reviewed research. The harm-reduction
disclaimer already adds 4 NGO links — those count toward the 2–5 target
but the article's own claims still need citation-grade sources.

### CS3 · Paragraph renderer needs whitelisted-HTML pass
Template-level prerequisite for CW4 (internal links) and CS2 (outbound
citations). The current `renderParagraphs` helper in
`scripts/templates/article.mjs` HTML-escapes every paragraph, so
in-paragraph anchors authored in `content.js` render as plaintext. Two
options:
1. Accept structured `{text, links: [{start, end, href}]}` entries
   alongside strings.
2. Run strings through a whitelist sanitizer that allows only
   `<a href>`, `<em>`, `<strong>`, `<code>` and routes anchors through
   `renderAnchor` for automatic `rel="external"`.
Option 2 is the lower-friction path for Copywriters. Flagged for Circle
Lead to pick direction; engineering then implements in a follow-up PR.

### CS4 · Commission list for topical hub
From `docs/internal-linking-proposals-2026-04.md`: five priority
commissions needed to make "≥2 incoming per article" structurally
satisfiable (Opiumwet, MAOI interactions, dieta, integratie, SSRIs).

### CS5 · Peer Reviewer schema definition
The Peer Reviewer role has no skill-defined schema for `meta.peerReviewer`
yet. Work with Peer Reviewer and Circle Lead to define the JSON shape
(name, credentials, url, reviewedOn date) so the article template can
render a peer-review byline on high-stakes articles. Until this is
defined, no byline renders (intentional per hard constraint #4).

---

## Peer Reviewer

### PR1 · Define the `meta.peerReviewer` schema
See CS5. Propose a shape, then the template can emit it as
`reviewedBy` on BlogPosting JSON-LD plus a visible "Medisch gereviewed
door" / "Peer-reviewed by" byline.

### PR2 · Sign off on legal-status copy
Gate on CS1. Peer Reviewer verifies the Opiumwet / Schedule claim and
the review date before it ships.

---

## Circle Lead (Floris)

### CL1 · `/over-ons/` author bio page
Author JSON-LD `url` and visible byline link to `/over-ons/`; the page
doesn't exist yet (returns 404). Separate project per the prompt's Out-of-
Scope list. Track here so it's not forgotten after the Author skill PR
lands.

### CL2 · `/assets/img/author/floris.jpg` headshot
JSON-LD `image` points here; the file does not exist on disk. Author
skill says the reference stays; supply the image in a parallel task.

### CL3 · Pick direction on the paragraph renderer HTML whitelist
See CS3. Needed before Copywriter can apply in-paragraph links (CW4 +
CS2). Engineering then implements.

### CL4 · Harm-reduction disclaimer styling
The `callout--warning` class is now emitted by the template but the
site's design system (`assets/css/site.css`) doesn't define it yet. The
disclaimer renders semantically but unstyled. Flag to Design — engineering
can add a minimal style as a separate PR if Design isn't ready.

---

## Summary count

| Role | Open items |
| --- | --- |
| Copywriter | 4 (CW1–CW4) |
| Content Strategist | 5 (CS1–CS5) |
| Peer Reviewer | 2 (PR1, PR2) |
| Circle Lead | 4 (CL1–CL4) |

Total: 15 handoff items from this YMYL pass.
