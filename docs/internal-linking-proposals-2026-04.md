# Internal Linking Proposals — 2026-04-17

Owner on landing: **Copywriter** (drafts anchor text and context) with
**Content Strategist** (ratifies which articles cross-link). Per the
SEO/GEO Technical Standards skill every published article needs ≥2
incoming and ≥2 outgoing static-HTML links to other articles in
`articles/index.json`.

Methodology: grep of the pre-rendered static HTML for each article's
canonical URL across every other article's static HTML, after running
`npm run prerender -- --force` on `fix/ymyl-2026`.

## Current state

| slug | incoming | outgoing | status |
| --- | --- | --- | --- |
| hoe-word-je-ayahuasca-begeleider | 0 | 0 | under-linked |
| misvattingen-over-ayahuasca | 0 | 0 | under-linked |

With only two articles in the inventory it is structurally impossible to
satisfy "≥2 incoming" on either article. The hard requirement fires once
the third and fourth ayahuasca-adjacent articles exist. In the meantime
the two existing articles should at least cross-link each other (≥1 in
each direction), and Content Strategist should surface the next
cross-link candidates to commission.

---

## hoe-word-je-ayahuasca-begeleider (currently: 0 incoming, 0 outgoing)

### Suggested inbound
- **misvattingen-over-ayahuasca** → **hoe-word-je-ayahuasca-begeleider**
  - Location: item 3 ("Bad trips bestaan niet bij ayahuasca"), at the end
    of the paragraph that mentions the need for proper guidance.
  - NL anchor text suggestion: "hoe een goede ayahuasca begeleider werkt"
  - EN anchor text suggestion: "how a skilled ayahuasca facilitator operates"
- **misvattingen-over-ayahuasca** → **hoe-word-je-ayahuasca-begeleider**
  - Location: item 7 (veiligheidsdieet), when the paragraph discusses the
    facilitator's role in screening participants for diet / MAOI risks.
  - NL anchor text suggestion: "wat een verantwoordelijke begeleider checkt"
  - EN anchor text suggestion: "what a responsible facilitator screens for"

### Suggested outbound
- **hoe-word-je-ayahuasca-begeleider** → **misvattingen-over-ayahuasca**
  - Location: Step 1 (achtergrondkennis) or Phase 1 context, introducing
    why a facilitator must understand common public misconceptions.
  - NL anchor text suggestion: "veelvoorkomende misvattingen over ayahuasca"
  - EN anchor text suggestion: "common misconceptions about ayahuasca"
- **hoe-word-je-ayahuasca-begeleider** → *(future)* "ayahuasca en medicatie
  (MAOI interacties)" — flagged for Content Strategist as a commission
  candidate; once published, link from Step 5 (screening) and the context
  accordion on contra-indications.

---

## misvattingen-over-ayahuasca (currently: 0 incoming, 0 outgoing)

### Suggested inbound
- **hoe-word-je-ayahuasca-begeleider** → **misvattingen-over-ayahuasca**
  (see paired outbound above).
- **hoe-word-je-ayahuasca-begeleider** → **misvattingen-over-ayahuasca**
  - Location: Phase 5 / Step 18 ("omgaan met verwachtingen"), where the
    guide advises facilitators to correct participants' misconceptions.
  - NL anchor text suggestion: "de zeven meest voorkomende misverstanden"
  - EN anchor text suggestion: "the seven most widespread myths"

### Suggested outbound
- **misvattingen-over-ayahuasca** → **hoe-word-je-ayahuasca-begeleider**
  (see paired inbound above, ×2).
- **misvattingen-over-ayahuasca** → *(future)* "ayahuasca en de Opiumwet —
  juridische status in Nederland" — flagged as a commission candidate;
  once published, link from item 5 (2018 legal change) to replace the
  current loose reference with a dated, citable pillar.

---

## Commission list for Content Strategist

The two articles above reveal a **topical hub gap**. To cross-link a
realistic 10-article ayahuasca cluster we need (at minimum) the following
new articles commissioned — listed in rough priority order for the hub:

1. "Ayahuasca en de Opiumwet" (legal status, dated, citable)
2. "MAOI-interacties met ayahuasca" (YMYL clinical safety)
3. "Ceremonie voorbereiding: dieta" (participant-facing prep)
4. "Integratie na ayahuasca" (post-ceremony, closes the practitioner loop)
5. "Ayahuasca en SSRI's" (clinical contraindications; paired with #2)

Once any of the above lands, revisit this doc and promote the proposed
future-state links from "pending" to "apply in next touch of the article".

---

## Apply rule

Do **not** apply these proposals in this PR. They land in the article
content through the normal Copywriter / Content Strategist touch, with
anchor HTML in the paragraph strings in `content.js`. (To make the anchors
render as HTML rather than plaintext the paragraph renderer will need a
whitelisted-markup pass — flagged separately in `docs/content-flags-2026-04.md`.)
