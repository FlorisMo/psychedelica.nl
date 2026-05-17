/*  =========================================================
    content.js — "Tips voor tijdens een psychedelische trip: zo navigeer je intense ervaringen"
    Bilingual NL/EN · Harm-reduction guide · Substance article (YMYL)
    Source canonical (NL v2, Round-2 QA-approved): 10FuMSHxRFTWx2BW9CPCZuJL7QS5CZb_HFhv0j3DayqM
    Source canonical (EN v2, Round-2 QA-approved): 19iC89HpUA0jtEXr-JxqYCyIEi5_esqrMeQPzrfwnXHw
    Form A Prompt (metadata reference): 1KL6Hd7D9AiW_4JOVQ3nOHp-qMrW1EjJC
    Pre-build review: Peer Review CONDITIONAL APPROVAL pre-build with 0 blocking issues
                      (Nestr verdict M2qvs6rCM54fedes9, peer-review record aSeCEg4X4LcAY8SSc).
    Round-2 revisions baked into v2 docs:
      - IFS lens applied (opening + Principle 1) — "weerstand mag er zijn", "vraag wat dat deel nodig heeft"
      - "Wanneer bel je hulp?" split into "Medische noodgevallen" (focused 112-block in Phase 3 area)
        + "Hulp zoeken na een heftige ervaring" (integration outreach in Phase 3).
      - 90-minute panic threshold removed.
      - Top + bottom inline disclaimers removed; site-default disclaimer takes over per
        Medical Claims Doctrine v1.1.0.
    SEO/metadata title (used in index.json + page H1 fallback): from Form A Prompt doc.
    Body H1 within content.js mirrors the v2 doc page H1.
    ========================================================= */

window.SITE_CONTENT = {

  meta: {
    slug: "tips-tijdens-een-psychedelische-trip",
    title_nl: "Tips voor tijdens een psychedelische trip: zo navigeer je intense ervaringen",
    title_en: "Tips for during a psychedelic trip: navigating intense experiences",
    subtitle_nl: "Concrete handgrepen per fase \u2014 opkomst, piek en afdaling \u2014 voor wat je kunt doen als de trip moeilijk wordt.",
    subtitle_en: "Concrete handles per phase \u2014 onset, peak and comedown \u2014 for what to do when the trip gets difficult.",
    heroLabel_nl: "Veiligheid & harm reduction",
    heroLabel_en: "Safety & harm reduction",
    readTime_nl: "~10 min leestijd",
    readTime_en: "~10 min read",
    date: "2026-04-27",
    dateModified: "2026-04-27",
    datePublished: "2026-04-22",
    lastUpdated_nl: "Laatst bijgewerkt: 27 april 2026",
    lastUpdated_en: "Last updated: April 27, 2026",
    ogImage: "https://psychedelica.nl/assets/img/og-image-tips-psychedelische-trip.webp",
    ogImageFallback: "https://psychedelica.nl/assets/img/og-image-tips-psychedelische-trip.png",
    tags: ["psychedelica", "trip", "harm reduction", "veiligheid", "ademhaling", "muziek"],
  },

  intro_nl: [
    "<strong>Samenvatting</strong> \u2014 De trip wordt intens. Dat is geen bug, dat is het werk. De belangrijkste zin die je kunt onthouden: weerstand mag er zijn, en het moeilijke gaat voorbij. Hieronder concrete handgrepen per fase \u2014 opkomst, piek, en afdaling \u2014 zodat je weet wat je kunt doen als het moeilijk wordt. Of je nu op truffels, paddo\u2019s, LSD of ayahuasca zit."
  ],
  intro_en: [
    "<strong>Summary</strong> \u2014 The trip gets intense. That\u2019s not a bug, that\u2019s the work. The most important sentence to remember: resistance is allowed to be there, and the difficulty passes. Below are concrete handles per phase \u2014 onset, peak, and comedown \u2014 so you know what to do when things get difficult. Whether you\u2019re on truffles, mushrooms, LSD, or ayahuasca."
  ],

  sections: [
    {
      id: "wat-doe-je-als-trip-heftig-wordt",
      title_nl: "Wat doe je als de trip heftig wordt?",
      title_en: "What do you do when the trip gets intense?",
      paragraphs_nl: [
        "Het korte antwoord: je laat het komen. Wat het moeilijk maakt is het verzet zelf \u2014 die twee zijn niet los te koppelen. Dat verzet is er niet voor niks, dus probeer ermee te zijn: vraag dat deel wat het nodig heeft om veilig los te kunnen laten. Dat klinkt misschien als vaag advies, maar het is precies wat onderzoekers van Johns Hopkins en Imperial College London hun deelnemers meegeven voor elke sessie. Het principe heet \u201ctrust, let go, be open\u201d en komt van psycholoog Bill Richards, die het ontwikkelde op basis van tientallen jaren begeleide sessies [1a, 1b]. Onderzoek laat zien dat deelnemers die deze houding aannemen minder vaak een trip als moeilijk ervaren [1c].",
        "Dat betekent niet dat je niks kunt doen. Integendeel. Maar alles wat je doet werkt beter als het vertrekt vanuit erkennen in plaats van controle. Voor wie zich vooral zorgen maakt over hoe je een zware ervaring kunt voorkomen: in ons artikel <a href=\"/articles/bad-trip-voorkomen/\">over bad trips voorkomen</a> staan de set- en setting-keuzes die je v\u00f3\u00f3r de sessie maakt. Hieronder gaat het over wat je tijdens de trip zelf kunt doen, geordend op het moment in je trip."
      ],
      paragraphs_en: [
        "The short answer: you let it come. What makes it difficult is the resistance itself \u2014 they are not two separate things. That resistance is there for a reason, so try to be with it: ask that part what it needs to safely let go. That might sound like vague advice, but it\u2019s exactly what researchers at Johns Hopkins and Imperial College London tell their participants before every session. The principle is called \u201ctrust, let go, be open\u201d and comes from psychologist Bill Richards, who developed it over decades of guided sessions [1a, 1b]. Research shows that participants who adopt this attitude less frequently experience a trip as difficult [1c].",
        "That doesn\u2019t mean there\u2019s nothing you can do. On the contrary. But everything you do works better when it comes from acknowledgment rather than control. For anyone mainly worried about how to prevent a heavy experience: our article <a href=\"/en/articles/bad-trip-voorkomen/\">on preventing bad trips</a> covers the set and setting choices you make before the session. Below is about what you can do during the trip itself, ordered by the moment in your trip."
      ]
    },
    {
      id: "drie-principes",
      title_nl: "Drie principes voor je begint",
      title_en: "Three principles before you start",
      paragraphs_nl: [
        "Voordat we de fasen ingaan, drie dingen om te onthouden. Ze zijn simpel. Ze zijn ook het moeilijkste wat je kunt doen als je midden in een piek zit.",
        "<strong>1. Het moeilijke en het verzet zijn hetzelfde ding.</strong> Angst is geen vijand. Het is een deel van je dat iets probeert te beschermen. Ga er niet tegenin, ga er ook niet doorheen \u2014 ontmoet het. Vraag wat dat deel nodig heeft om veilig los te kunnen laten. Het gaat voorbij.",
        "<strong>2. Alles wat je voelt is tijdelijk.</strong> Orale psilocybine begint binnen 20 tot 40 minuten te werken, piekt na 60 tot 90 minuten, en is na 4 tot 6 uur uitgewerkt [2a]. LSD duurt langer (8 tot 11 uur, piek rond 1,5 tot 2,5 uur) [2c]. Ayahuasca zit daar tussenin: opkomst na 30 minuten, piek na 60 tot 120 minuten, totale duur 4 tot 6 uur [2d]. Hoe zwaar het ook voelt op de piek: het wordt lichter.",
        "<strong>3. Je setting is je anker.</strong> Als het van binnen stormt, verander dan iets aan de buitenkant. Ander lied, andere kamer, glas water, deken om je heen. Kleine veranderingen werken verrassend goed."
      ],
      paragraphs_en: [
        "Before we go into the phases, three things to remember. They\u2019re simple. They\u2019re also the hardest thing to do when you\u2019re in the middle of a peak.",
        "<strong>1. The difficulty and the resistance are the same thing.</strong> Fear is not an enemy. It\u2019s a part of you trying to protect something. Don\u2019t fight it, don\u2019t push through it \u2014 meet it. Ask what that part needs to safely let go. It will pass.",
        "<strong>2. Everything you feel is temporary.</strong> Oral psilocybin kicks in within 20 to 40 minutes, peaks after 60 to 90 minutes, and is over within 4 to 6 hours [2a]. LSD lasts longer (8 to 11 hours, peak around 1.5 to 2.5 hours) [2c]. Ayahuasca sits in between: onset after 30 minutes, peak after 60 to 120 minutes, total duration 4 to 6 hours [2d]. No matter how heavy it feels at the peak: it gets lighter.",
        "<strong>3. Your setting is your anchor.</strong> When it\u2019s storming inside, change something on the outside. Different song, different room, glass of water, blanket around you. Small changes work surprisingly well."
      ]
    },
    {
      id: "fase-1-opkomst",
      title_nl: "Fase 1 \u2014 Opkomst (0 tot 60 minuten)",
      title_en: "Phase 1 \u2014 Onset (0 to 60 minutes)",
      paragraphs_nl: [
        "Je lichaam begint het te voelen voor je geest het snapt. Dat kan ongemakkelijk zijn. Misselijkheid, onrust, een raar gevoel in je buik. Dat is normaal.",
        "<strong>Check in met je lichaam.</strong> Ga zitten of liggen in een open houding. Armen en benen niet over elkaar. Rechtop zitten kan helpen om je te gronden. Voel je voeten, je handen, je ademhaling.",
        "<strong>Minimaliseer prikkels.</strong> Zacht licht. Geen telefoon (op stil, wel bereikbaar voor je vertrouwenspersoon). Geen social media, geen nieuws, geen spiegel met selfiecamera. Doomscrolling is een bekende trigger voor moeilijke ervaringen.",
        "<strong>Niet bijdoseren uit ongeduld.</strong> De opkomst kan trager zijn dan verwacht. Wacht minstens 90 minuten. Bijnemen tijdens de opkomst leidt vaak tot een onnodig heftige piek.",
        "<strong>Accepteer de vreemdheid.</strong> Het eerste uur voelt soms als een soort twijfelzone: je bent niet meer nuchter, maar ook nog niet \u201cbinnen\u201d. Dat is de stof die begint te werken. Laat het zijn wat het is."
      ],
      paragraphs_en: [
        "Your body starts feeling it before your mind gets it. That can be uncomfortable. Nausea, restlessness, a strange feeling in your stomach. That\u2019s normal.",
        "<strong>Check in with your body.</strong> Sit or lie down in an open posture. Arms and legs uncrossed. Sitting upright can help ground you. Feel your feet, your hands, your breathing.",
        "<strong>Minimise stimuli.</strong> Soft lighting. No phone (on silent, but reachable for your trusted contact). No social media, no news, no mirror selfie camera. Doomscrolling is a known trigger for difficult experiences.",
        "<strong>Don\u2019t redose out of impatience.</strong> The onset can be slower than expected. Wait at least 90 minutes. Redosing during the onset often leads to an unnecessarily intense peak.",
        "<strong>Accept the strangeness.</strong> The first hour sometimes feels like a kind of limbo: you\u2019re no longer sober, but you\u2019re not \u201cin\u201d yet either. That\u2019s the substance starting to work. Let it be what it is."
      ]
    },
    {
      id: "fase-2-de-piek",
      title_nl: "Fase 2 \u2014 De piek (60 tot 180 minuten)",
      title_en: "Phase 2 \u2014 The peak (60 to 180 minutes)",
      paragraphs_nl: [
        "Dit is waar het gebeurt. En dit is waar de meeste mensen het moeilijk krijgen. In klinische trials van Johns Hopkins en Imperial College komen voorbijgaande angst en misselijkheid het vaakst voor rond de piek. Zelfs bij zorgvuldig gescreende deelnemers ervaart zo\u2019n 30% tijdens de sessie een periode van verhoogde angst [8a, 8b]. Dat is niet uitzonderlijk. Dat hoort erbij.",
        "<strong>Als angst opkomt: adem.</strong> Er zijn nog geen gerandomiseerde studies naar ademhalingsoefeningen speciaal voor moeilijke momenten in een trip, maar de algemene angstliteratuur is helder: een verlengde uitademing (langer uit dan in, zo\u2019n zes ademhalingen per minuut) activeert de nervus vagus en kan paniek binnen minuten verminderen [6a]. Box breathing werkt ook: vier tellen in, vier tellen vasthouden, vier tellen uit, vier tellen wachten. In de klinische trials wordt dit routinematig aangeboden als eerste hulpmiddel [1b].",
        "<strong>Geef de angst een naam.</strong> Zeg hardop of in je hoofd: \u201cIk voel angst.\u201d Dat alleen al cre\u00ebert ruimte tussen jou en het gevoel. Het is een deel van je dat beschermt, niet het geheel van wie je bent.",
        "<strong>Muziek als metgezel.</strong> Onderzoek van Imperial College laat zien dat muziek een actieve rol speelt in de psychedelische ervaring. Niet als achtergrond, maar als emotionele mede-auteur [5a, 5b]. Gecureerde, instrumentale playlists werken beter dan random Spotify. Denk aan het werk van Mendel Kaelen (onderzoeker die de klinische playlists ontwikkelde, nu bij Wavepaths), Jon Hopkins (<em>Music for Psychedelic Therapy</em>), of East Forest. Kies muziek zonder tekst voor de piek. Vermijd nummers met persoonlijke herinneringen; die trekken je uit de ervaring.",
        "<strong>Oogmasker en koptelefoon.</strong> De Johns Hopkins \u201cinner journey\u201d houding: liggen, ogen dicht of met een masker, koptelefoon op. Dit helpt om naar binnen te gaan in plaats van afgeleid te raken door de buitenwereld.",
        "<strong>Grounding als het te veel wordt.</strong> Koud water in je gezicht. Een verzwaringsdeken. Lichte beweging (yoga, rondlopen in je huis). Dit zijn manieren om je lichaam terug te voelen als je geest te ver weg drijft.",
        "<strong>Wat je niet moet doen tijdens de piek.</strong> Niet autorijden. Geen grote gesprekken met onbekenden. Geen ex\u2019en appen. Niet googlen of je doodgaat. Geen alcohol of andere middelen om de scherpe randjes eraf te halen. Die scherpe randjes zijn er met een reden. Combineer ook niet met antidepressiva of andere medicatie zonder dit eerst goed na te lezen \u2014 zie ons artikel <a href=\"/articles/truffels-combineren-met-ssri-antidepressiva/\">over truffels combineren met SSRI\u2019s en antidepressiva</a>."
      ],
      paragraphs_en: [
        "This is where it happens. And this is where most people struggle. In clinical trials at Johns Hopkins and Imperial College, transient anxiety and nausea are most common around the peak. Even among carefully screened participants, about 30% experience a period of heightened anxiety during the session [8a, 8b]. That\u2019s not exceptional. It\u2019s part of it.",
        "<strong>When fear comes up: breathe.</strong> There are no randomised trials on breathing exercises specifically for difficult moments in a trip yet, but the general anxiety literature is clear: an extended exhale (longer out than in, about six breaths per minute) activates the vagus nerve and can reduce panic within minutes [6a]. Box breathing also works: four counts in, four counts hold, four counts out, four counts wait. In clinical trials this is routinely offered as the first tool [1b].",
        "<strong>Give the fear a name.</strong> Say it out loud or in your head: \u201cI feel fear.\u201d That alone creates space between you and the feeling. It\u2019s a part of you that\u2019s protecting, not the whole of who you are.",
        "<strong>Music as companion.</strong> Research from Imperial College shows that music plays an active role in the psychedelic experience. Not as background, but as an emotional co-author [5a, 5b]. Curated, instrumental playlists work better than random Spotify. Think of the work of Mendel Kaelen (the researcher who developed the clinical playlists, now at Wavepaths), Jon Hopkins (<em>Music for Psychedelic Therapy</em>), or East Forest. Choose music without lyrics for the peak. Avoid tracks with personal memories; they pull you out of the experience.",
        "<strong>Eye mask and headphones.</strong> The Johns Hopkins \u201cinner journey\u201d stance: lying down, eyes closed or with a mask, headphones on. This helps you go inward rather than getting distracted by the outside world.",
        "<strong>Grounding when it gets too much.</strong> Cold water on your face. A weighted blanket. Light movement (yoga, walking around your house). These are ways to feel your body again when your mind drifts too far away.",
        "<strong>What not to do during the peak.</strong> Don\u2019t drive. No intense conversations with strangers. Don\u2019t text your ex. Don\u2019t google whether you\u2019re dying. No alcohol or other substances to take the edge off. Those edges are there for a reason. Don\u2019t combine with antidepressants or other medication without reading up on it first \u2014 see our article <a href=\"/en/articles/truffels-combineren-met-ssri-antidepressiva/\">on combining truffles with SSRIs and antidepressants</a>."
      ]
    },
    {
      id: "fase-3-afdaling",
      title_nl: "Fase 3 \u2014 De afdaling (3 tot 6 uur)",
      title_en: "Phase 3 \u2014 The comedown (3 to 6 hours)",
      paragraphs_nl: [
        "De piek is voorbij, maar je geest is nog open en ontvankelijk. Dit is het integratievenster. Wat er nu gebeurt kleurt hoe je de hele trip herinnert, meer dan de piek zelf.",
        "<strong>Rustig aan.</strong> Drink water. Eet iets lichts. Zachte muziek. Neem geen beslissingen over je relaties, je baan, of je leven. Niet nu.",
        "<strong>Schrijf \u00e9\u00e9n zin op.</strong> Niet een heel dagboek. \u00c9\u00e9n zin over wat er kwam. Die zin is je anker voor de dagen erna.",
        "<strong>Praat met iemand die je vertrouwt.</strong> Of maak iets: teken, loop een rondje met een spraakmemo, schrijf. Integratie hoeft niet praten te zijn.",
        "<strong>Let op in de dagen erna.</strong> De ervaring van \u201cego-oplossing\u201d tijdens een trip is tijdelijk en verschilt van de aandoening depersonalisatie/derealisatie (DPDR). Bij een trip komt je gevoel van zelf meestal binnen uren terug [7a]. Als je je dagen of weken later nog losgeslagen voelt, is dat geen \u201cnawerking van de trip\u201d maar iets om met een professional te bespreken [7b]. Het Trimbos-instituut kan je doorverwijzen naar hulpverleners die bekend zijn met psychedelica.",
        "<strong>Hulp zoeken na een heftige ervaring.</strong> Als je je in de dagen of weken na de sessie nog kwetsbaar, bang of losgeslagen voelt, is dat het moment om uit te reiken. Naar iemand die je vertrouwt, een integratiecoach die met psychedelica werkt, of het Trimbos-instituut. Een moeilijke ervaring verwerken hoef je niet alleen te doen. Zware ervaringen kunnen een mooie opening zijn, \u00e1ls je ermee werkt."
      ],
      paragraphs_en: [
        "The peak is over, but your mind is still open and receptive. This is the integration window. What happens now colours how you remember the entire trip, more than the peak itself.",
        "<strong>Take it easy.</strong> Drink water. Eat something light. Soft music. Don\u2019t make decisions about your relationships, your job, or your life. Not now.",
        "<strong>Write down one sentence.</strong> Not a whole journal. One sentence about what came up. That sentence is your anchor for the days after.",
        "<strong>Talk to someone you trust.</strong> Or make something: draw, take a walk with voice memos, write. Integration doesn\u2019t have to be talking.",
        "<strong>Watch out in the days after.</strong> The experience of \u201cego dissolution\u201d during a trip is temporary and distinct from the condition depersonalisation/derealisation (DPDR). During a trip, your sense of self usually returns within hours [7a]. If you still feel unmoored days or weeks later, that\u2019s not an \u201caftereffect of the trip\u201d but something to discuss with a professional [7b]. The Trimbos Institute can refer you to care providers who are familiar with psychedelics.",
        "<strong>Reaching out after a difficult experience.</strong> If you still feel vulnerable, scared or unmoored in the days or weeks after the session, that\u2019s the moment to reach out. To someone you trust, an integration coach who works with psychedelics, or the Trimbos Institute. Processing a difficult experience is not something you have to do alone. Difficult experiences can be a beautiful opening \u2014 <em>if</em> you work with them."
      ]
    },
    {
      id: "werken-met-tripsitter",
      title_nl: "Werken met een tripsitter",
      title_en: "Working with a trip sitter",
      paragraphs_nl: [
        "Heb je iemand bij je? Spreek dan vooraf af: minimaal praten, afgesproken handsignalen. \u201cIk heb water nodig.\u201d \u201cIk heb ruimte nodig.\u201d \u201cIk wil even gerustgesteld worden.\u201d De tripsitter observeert, grijpt niet in tenzij gevraagd. Minder is meer.",
        "Trip je solo? Dan gelden dezelfde principes, maar met een vertrouwenspersoon op afstand. Deel wat je neemt, wanneer je begint, en wanneer je aanspreekbaar bent. Spreek een check-in bericht af.<!-- TODO: when /articles/alleen-paddos-truffels/ ships, add: 'Meer hierover in ons artikel over <a href=\"/articles/alleen-paddos-truffels/\">solo trippen</a>.' -->"
      ],
      paragraphs_en: [
        "Do you have someone with you? Then agree beforehand: minimal talking, agreed-upon hand signals. \u201cI need water.\u201d \u201cI need space.\u201d \u201cI\u2019d like some reassurance.\u201d The trip sitter observes, doesn\u2019t intervene unless asked. Less is more.",
        "Tripping solo? The same principles apply, but with a trusted contact at a distance. Share what you\u2019re taking, when you\u2019re starting, and when you\u2019ll be responsive. Agree on a check-in message.<!-- TODO: when /en/articles/alleen-paddos-truffels/ ships, add: 'More on this in our article about <a href=\"/en/articles/alleen-paddos-truffels/\">solo tripping</a>.' -->"
      ]
    },
    {
      id: "medische-noodgevallen",
      title_nl: "Medische noodgevallen",
      title_en: "Medical emergencies",
      paragraphs_nl: [
        "De meeste moeilijke momenten zijn precies dat: momenten. Ze gaan voorbij. Maar er zijn signalen waarbij je niet moet aarzelen om hulp in te schakelen.",
        "Bel <strong>112</strong> bij: bewusteloosheid of niet-reageren; ademhalingsproblemen; pijn op de borst of ernstige hartkloppingen; tekenen van een allergische reactie.",
        "Voor andere zorgen kun je bellen met <strong>113 Zelfmoordpreventie</strong> (<a href=\"tel:08000113\">0800-0113</a>, gratis, 24/7), je <strong>huisartsenpost</strong>, of <strong>Jellinek drugsinfo</strong> (<a href=\"tel:0885051220\">088-505 1220</a>, kantooruren). Zorgverleners zijn geen politie. Ze kunnen je beter helpen als ze weten wat je hebt genomen."
      ],
      paragraphs_en: [
        "Most difficult moments are exactly that: moments. They pass. But there are signals where you should not hesitate to call for help.",
        "Call <strong>112</strong> for: unconsciousness or unresponsiveness; breathing difficulties; chest pain or severe heart palpitations; signs of an allergic reaction.",
        "For other concerns, call <strong>113 Suicide Prevention</strong> (<a href=\"tel:08000113\">0800-0113</a>, free, 24/7), your <strong>GP after-hours service</strong>, or <strong>Jellinek drug info</strong> (<a href=\"tel:0885051220\">088-505 1220</a>, office hours). Healthcare providers are not the police. They can help you better if they know what you\u2019ve taken."
      ]
    },
    {
      id: "bronnen",
      title_nl: "Bronnen",
      title_en: "Sources",
      paragraphs_nl: [
        "1a. Richards WA (2016). <em>Sacred Knowledge: Psychedelics and Religious Experiences.</em> Columbia University Press. ISBN <a href=\"https://isbnsearch.org/isbn/9780231174060\" target=\"_blank\" rel=\"noopener\">978-0231174060</a>.",
        "1b. Johnson MW, Richards WA, Griffiths RR (2008). <em>J Psychopharmacol</em> 22(6): 603-620. DOI: <a href=\"https://doi.org/10.1177/0269881108093587\" target=\"_blank\" rel=\"noopener\">10.1177/0269881108093587</a>",
        "1c. Haijen ECHM et al. (2018). <em>Front Pharmacol</em> 9: 897. DOI: <a href=\"https://doi.org/10.3389/fphar.2018.00897\" target=\"_blank\" rel=\"noopener\">10.3389/fphar.2018.00897</a>",
        "2a. Hasler F et al. (2004). <em>Psychopharmacology</em> 172(2): 145-156. DOI: <a href=\"https://doi.org/10.1007/s00213-003-1640-6\" target=\"_blank\" rel=\"noopener\">10.1007/s00213-003-1640-6</a>",
        "2b. Brown RT et al. (2017). <em>Clin Pharmacokinet</em> 56(12): 1543-1554. DOI: <a href=\"https://doi.org/10.1007/s40262-017-0540-6\" target=\"_blank\" rel=\"noopener\">10.1007/s40262-017-0540-6</a>",
        "2c. Dolder PC et al. (2017). <em>Clin Pharmacokinet</em> 56(10): 1219-1230. DOI: <a href=\"https://doi.org/10.1007/s40262-017-0513-9\" target=\"_blank\" rel=\"noopener\">10.1007/s40262-017-0513-9</a>",
        "2d. Riba J et al. (2001). <em>Psychopharmacology</em> 154(1): 85-95. DOI: <a href=\"https://doi.org/10.1007/s002130000606\" target=\"_blank\" rel=\"noopener\">10.1007/s002130000606</a>",
        "5a. Kaelen M et al. (2015). <em>Psychopharmacology</em> 232(19): 3607-3614. DOI: <a href=\"https://doi.org/10.1007/s00213-015-4014-y\" target=\"_blank\" rel=\"noopener\">10.1007/s00213-015-4014-y</a>",
        "5b. Kaelen M et al. (2018). <em>Psychopharmacology</em> 235(2): 505-519. DOI: <a href=\"https://doi.org/10.1007/s00213-017-4820-5\" target=\"_blank\" rel=\"noopener\">10.1007/s00213-017-4820-5</a>",
        "6a. Laborde S et al. (2022). <em>Neurosci Biobehav Rev</em> 138: 104711. DOI: <a href=\"https://doi.org/10.1016/j.neubiorev.2022.104711\" target=\"_blank\" rel=\"noopener\">10.1016/j.neubiorev.2022.104711</a>",
        "7a. Nour MM et al. (2016). <em>Front Hum Neurosci</em> 10: 269. DOI: <a href=\"https://doi.org/10.3389/fnhum.2016.00269\" target=\"_blank\" rel=\"noopener\">10.3389/fnhum.2016.00269</a>",
        "7b. Sierra M, Berrios GE (2000). <em>Psychiatry Res</em> 93(2): 153-164. DOI: <a href=\"https://doi.org/10.1016/S0165-1781(00)00100-1\" target=\"_blank\" rel=\"noopener\">10.1016/S0165-1781(00)00100-1</a>",
        "8a. Goodwin GM et al. (2022). <em>N Engl J Med</em> 387(18): 1637-1648. DOI: <a href=\"https://doi.org/10.1056/NEJMoa2206443\" target=\"_blank\" rel=\"noopener\">10.1056/NEJMoa2206443</a>",
        "8b. Griffiths RR et al. (2016). <em>J Psychopharmacol</em> 30(12): 1181-1197. DOI: <a href=\"https://doi.org/10.1177/0269881116675513\" target=\"_blank\" rel=\"noopener\">10.1177/0269881116675513</a>"
      ],
      paragraphs_en: [
        "1a. Richards WA (2016). <em>Sacred Knowledge: Psychedelics and Religious Experiences.</em> Columbia University Press. ISBN <a href=\"https://isbnsearch.org/isbn/9780231174060\" target=\"_blank\" rel=\"noopener\">978-0231174060</a>.",
        "1b. Johnson MW, Richards WA, Griffiths RR (2008). <em>J Psychopharmacol</em> 22(6): 603-620. DOI: <a href=\"https://doi.org/10.1177/0269881108093587\" target=\"_blank\" rel=\"noopener\">10.1177/0269881108093587</a>",
        "1c. Haijen ECHM et al. (2018). <em>Front Pharmacol</em> 9: 897. DOI: <a href=\"https://doi.org/10.3389/fphar.2018.00897\" target=\"_blank\" rel=\"noopener\">10.3389/fphar.2018.00897</a>",
        "2a. Hasler F et al. (2004). <em>Psychopharmacology</em> 172(2): 145-156. DOI: <a href=\"https://doi.org/10.1007/s00213-003-1640-6\" target=\"_blank\" rel=\"noopener\">10.1007/s00213-003-1640-6</a>",
        "2b. Brown RT et al. (2017). <em>Clin Pharmacokinet</em> 56(12): 1543-1554. DOI: <a href=\"https://doi.org/10.1007/s40262-017-0540-6\" target=\"_blank\" rel=\"noopener\">10.1007/s40262-017-0540-6</a>",
        "2c. Dolder PC et al. (2017). <em>Clin Pharmacokinet</em> 56(10): 1219-1230. DOI: <a href=\"https://doi.org/10.1007/s40262-017-0513-9\" target=\"_blank\" rel=\"noopener\">10.1007/s40262-017-0513-9</a>",
        "2d. Riba J et al. (2001). <em>Psychopharmacology</em> 154(1): 85-95. DOI: <a href=\"https://doi.org/10.1007/s002130000606\" target=\"_blank\" rel=\"noopener\">10.1007/s002130000606</a>",
        "5a. Kaelen M et al. (2015). <em>Psychopharmacology</em> 232(19): 3607-3614. DOI: <a href=\"https://doi.org/10.1007/s00213-015-4014-y\" target=\"_blank\" rel=\"noopener\">10.1007/s00213-015-4014-y</a>",
        "5b. Kaelen M et al. (2018). <em>Psychopharmacology</em> 235(2): 505-519. DOI: <a href=\"https://doi.org/10.1007/s00213-017-4820-5\" target=\"_blank\" rel=\"noopener\">10.1007/s00213-017-4820-5</a>",
        "6a. Laborde S et al. (2022). <em>Neurosci Biobehav Rev</em> 138: 104711. DOI: <a href=\"https://doi.org/10.1016/j.neubiorev.2022.104711\" target=\"_blank\" rel=\"noopener\">10.1016/j.neubiorev.2022.104711</a>",
        "7a. Nour MM et al. (2016). <em>Front Hum Neurosci</em> 10: 269. DOI: <a href=\"https://doi.org/10.3389/fnhum.2016.00269\" target=\"_blank\" rel=\"noopener\">10.3389/fnhum.2016.00269</a>",
        "7b. Sierra M, Berrios GE (2000). <em>Psychiatry Res</em> 93(2): 153-164. DOI: <a href=\"https://doi.org/10.1016/S0165-1781(00)00100-1\" target=\"_blank\" rel=\"noopener\">10.1016/S0165-1781(00)00100-1</a>",
        "8a. Goodwin GM et al. (2022). <em>N Engl J Med</em> 387(18): 1637-1648. DOI: <a href=\"https://doi.org/10.1056/NEJMoa2206443\" target=\"_blank\" rel=\"noopener\">10.1056/NEJMoa2206443</a>",
        "8b. Griffiths RR et al. (2016). <em>J Psychopharmacol</em> 30(12): 1181-1197. DOI: <a href=\"https://doi.org/10.1177/0269881116675513\" target=\"_blank\" rel=\"noopener\">10.1177/0269881116675513</a>"
      ]
    }
  ],

  faqs_nl: [
    {
      question: "Wat moet ik doen als ik bang word tijdens een trip?",
      answer: "Geef de angst een naam. Zeg het hardop: \u201cIk voel angst.\u201d Vertraag je ademhaling (langer uitademen dan inademen). Verander iets in je omgeving: andere kamer, ander lied, glas water. Bel je vertrouwenspersoon als het niet zakt. Angst tijdens een trip gaat meestal binnen 10 tot 20 minuten voorbij als je het ruimte geeft. Probeer niet te vechten; laat de golf komen."
    },
    {
      question: "Welke muziek is het beste tijdens een psychedelische trip?",
      answer: "Gecureerde, instrumentale playlists werken het best. Onderzoeker Mendel Kaelen van Imperial College toonde aan dat de relatie tussen muziek en tripper de klinische uitkomst voorspelt. Jon Hopkins maakte Music for Psychedelic Therapy specifiek hiervoor. East Forest is een andere veelgebruikte componist in therapeutische settings. Vermijd nummers met tekst en nummers met sterke persoonlijke herinneringen tijdens de piek."
    },
    {
      question: "Mag ik mijn telefoon gebruiken tijdens een trip?",
      answer: "Op stil, met \u00e9\u00e9n vertrouwenspersoon bereikbaar. Muziek en een timer zijn prima. Maar geen social media, geen nieuws, en geen selfiecamera. Doomscrolling tijdens een trip is een bekende route naar moeilijke ervaringen."
    },
    {
      question: "Hoe lang duurt de piek van een psychedelische trip?",
      answer: "Bij truffels en paddo\u2019s (psilocybine): de piek duurt zo\u2019n 60 tot 90 minuten, de totale ervaring 4 tot 6 uur. Bij LSD: piek rond 1,5 tot 2,5 uur, totale duur 8 tot 12 uur. Bij ayahuasca: piek na 60 tot 120 minuten, totale duur 4 tot 6 uur. Individuele variatie is groot (30 tot 40%), dus neem deze ranges als richtlijnen, niet als beloftes."
    }
  ],

  faqs_en: [
    {
      question: "What should I do if I get scared during a trip?",
      answer: "Give the fear a name. Say it out loud: \u201cI feel fear.\u201d Slow your breathing (longer exhale than inhale). Change something in your environment: different room, different song, glass of water. Call your trusted contact if it doesn\u2019t subside. Fear during a trip usually passes within 10 to 20 minutes if you give it space. Don\u2019t try to fight it; let the wave come."
    },
    {
      question: "What music is best during a psychedelic trip?",
      answer: "Curated, instrumental playlists work best. Researcher Mendel Kaelen from Imperial College showed that the relationship between music and tripper predicts clinical outcomes. Jon Hopkins made Music for Psychedelic Therapy specifically for this. East Forest is another widely used composer in therapeutic settings. Avoid tracks with lyrics and tracks with strong personal memories during the peak."
    },
    {
      question: "Can I use my phone during a trip?",
      answer: "On silent, with one trusted contact reachable. Music and a timer are fine. But no social media, no news, and no selfie camera. Doomscrolling during a trip is a well-known route to difficult experiences."
    },
    {
      question: "How long does the peak of a psychedelic trip last?",
      answer: "With truffles and mushrooms (psilocybin): the peak lasts about 60 to 90 minutes, the total experience 4 to 6 hours. With LSD: peak around 1.5 to 2.5 hours, total duration 8 to 12 hours. With ayahuasca: peak after 60 to 120 minutes, total duration 4 to 6 hours. Individual variation is large (30 to 40%), so treat these ranges as guidelines, not promises."
    }
  ]
};
