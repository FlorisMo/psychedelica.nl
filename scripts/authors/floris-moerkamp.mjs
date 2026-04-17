/* Canonical author record for Floris Moerkamp.

   Sourced from the "Author — Floris Moerkamp" skill
   (Nestr SvLTFu3Subktebc4K). Per the skill's 2026-04-13 decision,
   this is the default author for every article until a different
   author is assigned in content.js meta.author.

   Missing fields stay missing by design — do NOT fabricate. The
   /over-ons/ bio page and the headshot at /assets/img/author/floris.jpg
   are planned; the references stay in place so future work doesn't
   have to hunt them down.

   Bylines are bilingual. The article template picks the language
   at render time. */

export const FLORIS_MOERKAMP = {
  name: 'Floris Moerkamp',
  url: '/over-ons/',
  jobTitle: 'Psychedelic Expert & Activist',
  image: '/assets/img/author/floris.jpg',
  affiliation: {
    name: 'Stichting Liaan',
    url: 'https://liaan.org/',
  },
  sameAs: [
    'https://www.linkedin.com/in/florismoerkamp/',
    'https://x.com/florismoerkamp',
    'https://www.instagram.com/florismoerkamp/',
  ],
  byline: {
    nl: 'Werkt sinds 2014 aan eerlijke en no-nonsense voorlichting over psychedelica in Nederland.',
    en: 'Has been working on honest, no-nonsense public education about psychedelics in the Netherlands since 2014.',
  },
};

export const DEFAULT_AUTHOR = FLORIS_MOERKAMP;
