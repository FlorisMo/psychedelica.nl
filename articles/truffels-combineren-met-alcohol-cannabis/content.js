/*  =========================================================
    content.js — "Mag je truffels gebruiken met alcohol of cannabis?"
    Bilingual NL/EN · Essay · Safety NL/EN cluster spoke 2 of 3 (psilocybine pillar)
    Source canonical (NL): 1Ut-7JsjK3wYDFp6JKln6ENTRs2tXgQA0c85NSRi1VCc
    Source canonical (EN): 1gGWnu-7dyUym5qoWMl3Xa4DtEpN4CVpR864md0q3tgI
    Form A Prompt (metadata reference only — legacy push-to-main deliverables ignored
    per Publisher: Composio GitHub MCP Usage skill Option B):
    130Kgg_yE5JPcVugOWImagjrnMViZwcpk7e0CCrixbT4
    Pre-build review: QA APPROVED WITH TRACKED CHANGES (2026-05-08) +
    Peer Review CONDITIONAL APPROVAL pre-build (2026-05-08).
    Tracked changes applied in this build:
      E2 — H3 renamed "Wat je merkt" → "Wat gebruikers vaak rapporteren"
      F3 — H3 renamed "Bad-trip risico" → "Verhoogd risico op een ontregelende ervaring"
      D7 — non-registration sentence added to wet-drie-afzonderlijk section
      Internal-link path fix — /articles/truffels-ssri-antidepressiva/ → /articles/truffels-combineren-met-ssri-antidepressiva/
    Tracked changes deferred (documented in PR body):
      A9 disclaimer hoist (template-level change, not content.js)
      D5 effect-size sentences at Petrilli/Freeman/Englund citations
        (no specific numbers available in this run; per Form A Prompt,
        missing claims are dropped from build — flagged for next Copywriter polish)
      A4 inline DOI hyperlinks (Brief #15 grandfather pattern: plain-text bronnen)
    Bilingual post-build Peer Review final scheduled for the run after this merges.
    ========================================================= */

window.SITE_CONTENT = {

  meta: {
    slug: "truffels-combineren-met-alcohol-cannabis",
    title_nl: "Mag je truffels gebruiken met alcohol of cannabis?",
    title_en: "Can You Use Magic Truffles with Alcohol or Cannabis?",
    subtitle_nl: "Wat alcohol en cannabis doen met een psilocybinetrip — gedempt effect, paranoiarisico bij THC, en harm reduction.",
    subtitle_en: "What alcohol and cannabis do during a psilocybin trip — dampened effect, paranoia risk with THC, and harm reduction.",
    heroLabel_nl: "Veiligheid & combinaties",
    heroLabel_en: "Safety & combinations",
    readTime_nl: "~10 min leestijd",
    readTime_en: "~10 min read",
    date: "2026-04-29",
    dateModified: "2026-05-17",
    tags: ["truffels", "alcohol", "cannabis", "psilocybine", "harm reduction", "veiligheid"],
  },

  intro_nl: [
    "Truffels (psilocybine) combineren met alcohol of cannabis is niet hetzelfde soort vraag als truffels combineren met antidepressiva. Pharmacologisch zit hier geen serotonine-noodgeval onder. De risico's zitten in beslissingskwaliteit, set en setting, en alcohol-gerelateerde ongelukken; niet in een acute interactie tussen molecuulgroepen.",
    "Kort:",
    "1. Alcohol dempt het psychedelische effect en verhoogt misselijkheid, duizeligheid en black-outs.",
    "2. THC-rijke cannabis versterkt en verlengt de trip; voor onervaren gebruikers verhoogt het de kans op angst en paranoia, vooral op de come-up.",
    "3. CBD doet niet hetzelfde als THC.",
    "4. Op festivals stapelen drie middelen risico's op elkaar zonder dat dat een aparte 'cocktail' wordt.",
    "5. De grootste interventies zijn lagere dosering, gescheiden timing, een nuchtere tripsitter, water en voedsel.",
    "Hieronder lees je per combinatie wat er werkelijk gebeurt, plus harm-reduction-stappen en wanneer je 112 belt."
  ],
  intro_en: [
    "Mixing truffles (psilocybin) with alcohol or cannabis isn't the same kind of question as mixing truffles with antidepressants. Pharmacologically, there's no serotonin emergency lurking underneath. The risks live in decision quality, set and setting, and alcohol-related accidents. Not in an acute interaction between molecule classes.",
    "Short version:",
    "1. Alcohol dampens the psychedelic effect and increases nausea, dizziness, and the chance of black-outs.",
    "2. THC-rich cannabis intensifies and prolongs the trip; for inexperienced users it raises the chance of anxiety and paranoia, especially on the come-up.",
    "3. CBD doesn't do the same thing as THC.",
    "4. At festivals, three substances stack risks on each other without that becoming some separate \"cocktail.\"",
    "5. The biggest interventions are lower doses, separated timing, a sober tripsitter, water, and food.",
    "Below you'll read what actually happens per combination, plus harm-reduction steps and when to call 112."
  ],

  sections: [
    {
      id: "eerst-framing",
      title_nl: "Eerst de framing: een ander soort vraag dan truffels met antidepressiva",
      title_en: "First the framing: a different kind of question than truffles with antidepressants",
      paragraphs_nl: [
        "Een combinatie zoals psilocybine met een MAO-remmer of een SSRI valt in de categorie pharmacologische noodsituatie: een serotonine-syndroom kan acute medische zorg vereisen. Daarvoor hebben we een apart artikel over truffels en antidepressiva. Wat hieronder volgt over alcohol en cannabis is een fundamenteel andere risicocategorie. Het serotonine-systeem wordt door alcohol of THC niet rechtstreeks geactiveerd. De dominante risico's zijn beslissingskwaliteit, ongelukken (vallen, fietsen, verkeer), misselijkheid, en bij cannabis: paniek of paranoia op een al kwetsbaar moment. De aard van het risico is dus anders, niet afwezig. Een klein glas wijn op een rustige avond is iets fundamenteel anders dan vier biertjes binnen anderhalf uur op een festival."
      ],
      paragraphs_en: [
        "Combining psilocybin with an MAO inhibitor or an SSRI falls into the category of pharmacological emergency: serotonin syndrome can require acute medical care. We have a separate article for that, on truffles and antidepressants. What follows about alcohol and cannabis is a fundamentally different risk category. The serotonin system isn't directly activated by alcohol or THC. The dominant risks are decision quality, accidents (falls, cycling, traffic), nausea, and with cannabis: panic or paranoia at an already vulnerable moment. The nature of the risk is different, not absent. A small glass of wine on a quiet evening is fundamentally different from four beers in ninety minutes at a festival."
      ]
    },
    {
      id: "alcohol-mechanisme",
      title_nl: "Hoe alcohol op truffels werkt: CNS-depressant tegen psychedelicum",
      title_en: "How alcohol works on truffles: CNS depressant against psychedelic",
      paragraphs_nl: [
        "Alcohol werkt voornamelijk op het GABA-A-systeem en op het glutamaat-NMDA-systeem; klinisch is het een centraal-zenuwstelsel-depressant. Psilocybine wordt in het lichaam snel omgezet naar psilocine, dat als partiële agonist werkt op de 5-HT2A-receptor. Deze farmacologische routes overlappen weinig (Carhart-Harris en Nutt, 2017). Dat verklaart waarom er geen acuut serotonine-emergiemechanisme bekend is bij deze combinatie, anders dan bij de combinatie met MAO-remmers.",
        "Wat de combinatie wél doet, op basis van klinische extrapolatie en harm-reduction-rapportages: alcohol kan het psychedelische effect deels dempen of vervlakken, terwijl misselijkheid, duizeligheid en het risico op black-outs juist toenemen. Voor de duidelijkheid: er is geen gepubliceerde gecontroleerde humane co-administratiestudie van psilocybine met alcohol. Het mechanisme is helder, het klinische beeld komt uit Trimbos, Jellinek, Unity en DanceSafe, en uit klinische extrapolatie."
      ],
      paragraphs_en: [
        "Alcohol works mainly on the GABA-A system and the glutamate-NMDA system; clinically it's a central nervous system depressant. Psilocybin gets converted in the body quickly to psilocin, which acts as a partial agonist at the 5-HT2A receptor. These pharmacological pathways barely overlap (Carhart-Harris and Nutt, 2017). That explains why no acute serotonin-emergency mechanism is known for this combination, unlike the combination with MAO inhibitors.",
        "What the combination does do, based on clinical extrapolation and harm-reduction reports: alcohol can partly dampen or flatten the psychedelic effect, while nausea, dizziness, and the risk of black-outs go up. To be clear: there's no published controlled human co-administration study of psilocybin with alcohol. The mechanism is clear, the clinical picture comes from Trimbos, Jellinek, Unity, and DanceSafe, and from clinical extrapolation."
      ]
    },
    {
      id: "wat-gebruikers-rapporteren",
      title_nl: "Wat gebruikers vaak rapporteren: gedempt effect, misselijkheid, black-outs",
      title_en: "What users commonly report: dampened effect, nausea, black-outs",
      paragraphs_nl: [
        "In de praktijk beschrijven gebruikers en harm-reduction-projecten een paar terugkerende patronen. De psychedelische ervaring voelt minder helder of minder diep dan op een nuchtere maag; alcohol vlakt visuele en emotionele intensiteit af. Misselijkheid in het eerste uur na inname van psilocybine is sowieso vaak gerapporteerd (Holze, 2023; Brown, 2017); alcohol vergroot de kans op overgeven significant. Bij hogere alcoholdoses verschijnen klassieke alcoholrisico's: gedaalde inschatting van eigen toestand, vallen, en in extreme gevallen aspiratie van braaksel bij bewustzijnsverlies.",
        "Tijdens een trip is het bovendien lastiger om het tempo van drinken bij te houden. Iemand die normaal vier biertjes als bovengrens hanteert, kan op een trip vergeten hoe lang het duurt en doorgaan. Dat is de meest realistische ongeluksdriver in deze combinatie."
      ],
      paragraphs_en: [
        "In practice, users and harm-reduction projects describe a few recurring patterns. The psychedelic experience feels less clear or less deep than on an empty stomach; alcohol flattens visual and emotional intensity. Nausea in the first hour after psilocybin intake is commonly reported anyway (Holze, 2023; Brown, 2017); alcohol significantly raises the chance of vomiting. At higher alcohol doses the classic alcohol risks show up: lower judgment of one's own state, falls, and in extreme cases aspiration of vomit during loss of consciousness.",
        "During a trip it's also harder to keep track of drinking pace. Someone who normally treats four beers as a ceiling can lose track of how long that took and keep going. That's the most realistic accident driver in this combination."
      ]
    },
    {
      id: "glas-wijn",
      title_nl: "Het glas wijn-vraagstuk: wat onderzoek en facilitators zeggen",
      title_en: "The glass-of-wine question: what research and facilitators say",
      paragraphs_nl: [
        "Een veelgestelde vraag is of een klein glas wijn rond een truffeltrip acceptabel is. Het eerlijke antwoord uit Nederlandse harm-reduction-bronnen is genuanceerd. Een glas wijn een paar uur nadat de trip is uitgewerkt, is geen gedocumenteerd farmacologisch risico. Een glas wijn tijdens de trip vlakt de ervaring af en wordt door vrijwel alle Nederlandse facilitators afgeraden, omdat het integratiedoel ondergraven wordt. In een recreatieve setting is een klein glas geen rampscenario, maar het zal merkbaar invloed hebben op wat de trip oplevert."
      ],
      paragraphs_en: [
        "A common question is whether a small glass of wine around a truffle trip is acceptable. The honest answer from Dutch harm-reduction sources is nuanced. A glass of wine a few hours after the trip has worn off is not a documented pharmacological risk. A glass of wine during the trip flattens the experience and is advised against by virtually all Dutch facilitators, because it undermines the integration goal. In a recreational setting a small glass isn't a disaster scenario, but it will noticeably affebt what the trip yields."
      ]
    },
    {
      id: "thc-mechanisme",
      title_nl: "THC versterkt en verlengt de trip: het mechanisme",
      title_en: "THC intensifies and prolongs the trip: the mechanism",
      paragraphs_nl: [
        "THC bindt voornamelijk aan de cannabinoïd-receptor CB1. Tussen CB1 en 5-HT2A bestaan in proefdieronderzoek heteromere receptorcomplexen waarvan de signaaltransductie verandert wanneer beide receptoren tegelijk geactiveerd worden (Viñals et al., 2015). Bij chronische cannabisgebruikers is die heteromer-expressie zelfs verhoogd in menselijke olfactorische cellen ex vivo (Galindo et al., 2018). In gewone taal: THC en psilocine tellen niet eenvoudigweg op alsof ze op dezelfde receptor zitten. Hun gezamenlijke aanwezigheid verandert het signaalprofiel op een complexe, niet-lineaire manier.",
        "In de praktijk beschrijven gebruikers en de Wolinsky, Barrett en Vandrey 2024 review consistent dat een joint tijdens een psilocybinetrip de psychedelische component versterkt en verlengt. Een gecontroleerde humane co-administratiestudie ontbreekt, dus de exacte effectmaten zijn niet vast te stellen; de richting is wel duidelijk."
      ],
      paragraphs_en: [
        "THC binds primarily to the cannabinoid receptor CB1. Between CB1 and 5-HT2A, animal studies have found heteromeric receptor complexes whose signal transduction changes when both receptors are activated together (Viñals et al., 2015). In chronic cannabis users this heteromer expression is even elevated in human olfactory cells ex vivo (Galindo et al., 2018). In plain language: THC and psilocin don't simply add up as if they sat on the same receptor. Their joint presence shifts the signal profile in a complex, non-linear way.",
        "In practice, users and the Wolinsky, Barrett and Vandrey 2024 review consistently describe that a joint during a psilocybin trip intensifies and prolongs the psychedelic component. A controlled human co-administration study is missing, so exact effect sizes can't be pinned down; the direction is clear."
      ]
    },
    {
      id: "verhoogd-risico-ontregelende-ervaring",
      title_nl: "Verhoogd risico op een ontregelende ervaring: angst, paranoia, dissociatie",
      title_en: "Heightened risk of a destabilising experience: anxiety, paranoia, dissociation",
      paragraphs_nl: [
        "Cannabis verhoogt aantoonbaar paranoïde symptomen ten opzichte van placebo, met een sterker effect bij THC-rijke producten dan bij CBD-rijke producten of THC-CBD-mengsels (Petrilli et al., 2025, meta-analyse). De Freeman 2015 RCT met intraveneuze THC liet zien dat THC angst, negatieve cognities en paranoia significant verhoogt en het werkgeheugen vermindert.",
        "Tijdens een psilocybinetrip is set en setting al een groot deel van wat de ervaring stuurt. Een dosis THC die op een rustige avond een lichte high zou geven, kan op een al verhoogd-emotioneel moment de trip doen kantelen van uitdagend naar overweldigend. Het risico is het hoogst bij onervaren cannabisgebruikers, hoge THC-doses, en gebruik op het hoogtepunt of in de afbouw van de trip. Wie ooit een paniekreactie of angstige cannabis-ervaring heeft gehad zonder psychedelica erbij, heeft tijdens een trip een fors verhoogde kans dat het opnieuw gebeurt en harder aankomt."
      ],
      paragraphs_en: [
        "Cannabis demonstrably raises paranoid symptoms compared with placebo, with a stronger effect for THC-rich products than for CBD-rich products or THC-CBD blends (Petrilli et al., 2025, meta-analysis). The Freeman 2015 RCT with intravenous THC showed that THC significantly increases anxiety, negative cognitions, and paranoia, and reduces working memory.",
        "During a psilocybin trip, set and setting are already a large part of what steers the experience. A dose of THC that would give a mild high on a quiet evening can, at an already heightened-emotional moment, tip the trip from challenging to overwhelming. The risk is highest for inexperienced cannabis users, high THC doses, and use at the peak or in the comedown of the trip. Anyone who has ever had a panic reaction or anxious cannabis experience without psychedelics in the picture has a substantially higher chance during a trip that it happens again and lands harder."
      ]
    },
    {
      id: "cbd-vs-thc",
      title_nl: "CBD versus THC: niet hetzelfde verhaal",
      title_en: "CBD versus THC: not the same story",
      paragraphs_nl: [
        "Niet alle cannabis is hetzelfde. THC produceert het bekende intoxicerende effect en is dosis-afhankelijk geassocieerd met angst en paranoia. CBD, geïsoleerd of in CBD-rijke variëteiten, heeft geen overlappend intoxicerend profiel. In cross-over RCT's is CBD geassocieerd met een afname van paranoia en angst tegenover pure THC (Englund et al., 2023). Functionele neuro-imaging laat zien dat THC en CBD op meerdere hersengebieden tegengestelde effecten hebben (Bhattacharyya, 2010; Wall, 2019).",
        "Dat betekent niet dat CBD daarmee veilig samengaat met psilocybine; humane co-administratie-evidentie ontbreekt ook hier. Wel betekent het dat het risicoprofiel van een sterke skunk niet automatisch geldt voor CBD-olie of CBD-rijke producten. Iemand die een paar druppels CBD-olie onder de tong gebruikt voor het slapengaan, zit niet in dezelfde risicocategorie als iemand die een joint van high-THC bloem rookt op de come-up."
      ],
      paragraphs_en: [
        "Not all cannabis is the same. THC produces the familiar intoxicating effect and is dose-dependently associated with anxiety and paranoia. CBD, isolated or in CBD-rich varieties, has no overlapping intoxicating profile. In cross-over RCTs, CBD is associated with a decrease in paranoia and anxiety compared to pure THC (Englund et al., 2023). Functional neuroimaging shows that THC and CBD have opposing effects across multiple brain regions (Bhattacharyya, 2010; Wall, 2019).",
        "That doesn't mean CBD is therefore safe to combine with psilocybin; human co-administration evidence is also missing here. It does mean the risk profile of strong skunk doesn't automatically apply to CBD oil or CBD-rich products. Someone using a few drops of CBD oil under the tongue before sleep is not in the same risk category as someone smoking a joint of high-THC flower on the come-up."
      ]
    },
    {
      id: "tolerantie-timing",
      title_nl: "Tolerantie en timing: waarom de come-up het hoogste risicomoment is",
      title_en: "Tolerance and timing: why the come-up is the highest-risk moment",
      paragraphs_nl: [
        "Voor cannabis is tolerantie een dominante variabele in subjectieve ervaring (Wolinsky, 2024). Dezelfde dosis THC produceert kwalitatief verschillende effecten bij dagelijkse versus naïeve gebruikers. Op een psilocybinetrip is dit verschil cruciaal: een trekje dat een dagelijks gebruiker amper voelt, kan een naïeve cannabisgebruiker op de come-up volledig de trein af duwen.",
        "Het hoogste risicomoment is de come-up, de eerste 30 tot 90 minuten na inname van de truffels. Daar is de pharmacologische staat het meest in beweging, en daar is set en setting het kwetsbaarst. Een joint op het rustige hoogtepunt of een joint op de afbouw heeft een ander effect dan een joint op de come-up; alle drie zijn niet zonder risico, maar de come-up is gemiddeld het slechtste moment voor onervaren cannabisgebruikers."
      ],
      paragraphs_en: [
        "For cannabis, tolerance is a dominant variable in subjective experience (Wolinsky, 2024). The same THC dose produces qualitatively different effects in daily versus naive users. On a psilocybin trip this difference matters: a hit a daily user barely feels can push a naive cannabis user fully off the rails on the come-up.",
        "The highest-risk moment is the come-up. The first 30 to 90 minutes after taking the truffles. That's where the pharmacological state is most in flux, and that's where set and setting are most fragile. A joint at the quiet peak or a joint on the comedown has a different effect than a joint on the come-up; all three carry risk, but the come-up is on average the worst moment for inexperienced cannabis users."
      ]
    },
    {
      id: "festivals",
      title_nl: "De drievoudige combinatie op festivals",
      title_en: "The triple combination at festivals",
      paragraphs_nl: [
        "Op festivals stapelen alcohol, cannabis en truffels regelmatig op elkaar. Dat is geen aparte 'cocktail'; het is de optelsom van drie middelen met elk een eigen risicoprofiel. Het patroon dat Trimbos en Unity in veldrapportages beschrijven: gebruikers verliezen elkaar uit het oog, drinken te veel of juist te weinig water, vergeten te eten, en komen op een ongelukkig moment in een drukke tent terecht. De pharmacologie is niet wat hier mensen op de eerste hulp brengt; verminderd oordeel in een prikkelende omgeving is dat wel. In bijna alle gerapporteerde problemen was set en setting al kwetsbaar (vermoeidheid, slaaptekort, eerdere paniekervaring) en kwam cannabis er als laatste bij. Een patroon dat het overdenken waard is voordat je een joint aanneemt op een al ingezette truffeltrip."
      ],
      paragraphs_en: [
        "At festivals, alcohol, cannabis, and truffles often stack on each other. That's not a separate \"cocktail.\" It's the sum of three substances each with their own risk profile. The pattern Trimbos and Unity describe in field reports: users lose sight of each other, drink too much or too little water, forget to eat, and end up in a crowded tent at an unfortunate moment. The pharmacology isn't what brings people to the emergency room here; impaired judgment in a stimulating environment is. In almost all reported problems, set and setting were already vulnerable (fatigue, sleep deprivation, earlier panic experience) and cannabis came in last. A pattern worth thinking through before you accept a joint on a truffle trip already underway."
      ]
    },
    {
      id: "set-setting",
      title_nl: "Set en setting blijven dominant",
      title_en: "Set and setting stay dominant",
      paragraphs_nl: [
        "De pharmacologie hierboven verklaart maar een klein deel van wat er tijdens een trip gebeurt. Set (mentale staat) en setting (fysieke en sociale omgeving) zijn de grotere factoren. Iemand die een trip ingaat na een onverwerkte ruzie, op weinig slaap, in een drukke omgeving met onbekenden, heeft een veel hogere kans op een lastige ervaring dan iemand die in een rustige eigen omgeving met een vertrouwd persoon begint. Alcohol en cannabis verergeren wat al kwetsbaar is, eerder dan dat ze een ervaring uit het niets in de afgrond duwen."
      ],
      paragraphs_en: [
        "The pharmacology above explains only a small part of what happens during a trip. Set (mental state) and setting (physical and social environment) are the bigger factors. Someone going into a trip after an unprocessed argument, on little sleep, in a crowded environment with strangers, has a much higher chance of a difficult experience than someone who starts in a quiet familiar environment with a trusted person. Alcohol and cannabis worsen what's already vulnerable, rather than pushing an experience into the abyss out of nowhere."
      ]
    },
    {
      id: "timing-doses",
      title_nl: "Aparte timing en lagere doses",
      title_en: "Separate timing and lower doses",
      paragraphs_nl: [
        "Onderstaande punten gelden ongeacht of je besluit om wel of niet te combineren. Ze verlagen risico's beduidend.",
        "De simpelste interventie is timing. Als alcohol bij een diner heeft meegedaan, kun je de trip plannen voor een dag dat alcohol niet aan de orde is. Wie wil tripen en daarbij een joint wil roken, kan ervoor kiezen dat naar het einde van de trip te verschuiven en in lagere THC-dosis te houden. Lagere truffeldoses (1 tot 2 gram droge truffels) geven sowieso minder ruimte voor escalatie dan hoge doses (3 gram en meer)."
      ],
      paragraphs_en: [
        "The points below apply whether or not you decide to combine. They lower risks substantially.",
        "The simplest intervention is timing. If alcohol came along with dinner, you can plan the trip for a day when alcohol is off the table. Anyone who wants to trip and also smoke a joint can choose to shift that to the end of the trip and keep it at a lower THC dose. Lower truffle doses (1 to 2 grams of dry truffles) leave less room for escalation than high doses (3 grams and up)."
      ]
    },
    {
      id: "tripsitter-water-eten",
      title_nl: "Tripsitter, water, eten vooraf",
      title_en: "Tripsitter, water, food beforehand",
      paragraphs_nl: [
        "Een nuchtere tripsitter is in harm-reduction-rapportages de meest effectieve enkele interventie tegen escalatie. Iemand die kalm blijft, die je vertrouwt, en die niet zelf onder invloed is, kan in een paniekmoment het verschil maken. Daarnaast: water binnen handbereik, een lichte maaltijd 1 tot 2 uur voor inname (geen vol diner, dat verlengt onset zonder risico te verlagen), telefoon opgeladen, deur op slot of toegang tot rustige ruimte geregeld."
      ],
      paragraphs_en: [
        "A sober tripsitter is the single most effective intervention against escalation in harm-reduction reports. Someone who stays calm, who you trust, and who isn't under the influence themselves can make the difference in a moment of panic. Beyond that: water within reach, a light meal 1 to 2 hours before intake (not a full dinner, which extends onset without lowering risk), phone charged, door locked or access to a quiet room arranged."
      ]
    },
    {
      id: "angst-spikt",
      title_nl: "Wat te doen als de angst spikt",
      title_en: "What to do if anxiety spikes",
      paragraphs_nl: [
        "Verander de setting (rustige plek, gedimd licht, weg van prikkelende geluiden), drink water, adem rustig en langzaam mee. Praat met de persoon die in paniek is met een rustige stem; herinner ze dat het cannabis-deel binnen 1 tot 3 uur is uitgewerkt en dat de truffeltrip ook een einde heeft. Geen discussies, geen analyses, geen filosofie; aanwezigheid en kalmte. Bel 112 als symptomen verergeren in plaats van afnemen, of als de persoon onbereikbaar of fysiek niet wel wordt."
      ],
      paragraphs_en: [
        "Change the setting (quiet place, dimmed light, away from stimulating sounds), drink water, breathe slowly together. Speak with the person in panic in a calm voice; remind them that the cannabis component is worn off within 1 to 3 hours and that the truffle trip also has an end. No discussions, no analyses, no philosophy. Presence and calm. Call 112 if symptoms worsen instead of receding, or if the person becomes unreachable or physically not well."
      ]
    },
    {
      id: "te-veel-gedronken",
      title_nl: "Wat te doen als iemand te veel heeft gedronken",
      title_en: "What to do if someone has had too much to drink",
      paragraphs_nl: [
        "Bij ernstige alcoholintoxicatie tellen alle bekende alcoholregels: stabiele zijligging als de persoon overgeeft of bewustzijn verliest, geen koffie, geen koud water in het gezicht, geen 'uitslapen' als de persoon niet wakker te maken is. Bel bij twijfel 112. Het Nederlandse zorgsysteem vervolgt gebruikers niet voor het zoeken van medische hulp."
      ],
      paragraphs_en: [
        "For severe alcohol intoxication, all the known alcohol rules apply: stable side position if the person is vomiting or losing consciousness, no coffee, no cold water in the face, no \"sleeping it off\" if the person can't be woken. Call 112 if in doubt. The Dutch healthcare system doesn't prosecute users for seeking medical help."
      ]
    },
    {
      id: "wet-drie-afzonderlijk",
      title_nl: "Wat de wet zegt over de drie afzonderlijk",
      title_en: "What the law says about the three separately",
      paragraphs_nl: [
        "In Nederland zijn alle drie de middelen legaal of getolereerd. Alcohol is verkrijgbaar vanaf 18 jaar onder de Alcoholwet. Truffels vallen onder de Warenwet, waardoor verkoop legaal is bij erkende smartshops en webshops. Cannabis valt onder het gedoogbeleid en wordt alleen op aangewezen plaatsen (coffeeshops) zonder vervolging verkocht in beperkte hoeveelheden. Geen van die drie regelingen zegt iets over combinaties; juridisch zijn er geen aparte combinatiebepalingen.",
        "Psilocybine zelf is niet als geneesmiddel geregistreerd in Nederland of de EU; wat in Nederland verkocht wordt zijn de truffels (sclerotia) onder de Warenwet, niet psilocybine als zodanig."
      ],
      paragraphs_en: [
        "In the Netherlands all three substances are legal or tolerated. Alcohol is available from age 18 under the Alcoholwet. Truffles fall under the Warenwet (the Dutch food and consumer goods act), which makes sale legal at recognised smartshops and webshops. Cannabis falls under the tolerance policy (gedoogbeleid) and is sold at designated places (coffeeshops) without prosecution in limited quantities. None of those three frameworks say anything about combinations; legally, there are no separate combination provisions.",
        "Psilocybin itself is not registered as a medicinal product in the Netherlands or the EU; what is sold in the Netherlands are the truffles (sclerotia) under the Warenwet, not psilocybin as such."
      ]
    },
    {
      id: "ceremonie-geen-alcohol",
      title_nl: "Waarom facilitators tijdens ceremonies geen alcohol of cannabis toelaten",
      title_en: "Why facilitators don't allow alcohol or cannabis during ceremonies",
      paragraphs_nl: [
        "Nederlandse ceremoniefacilitators, in het truffel- en in het ayahuasca-circuit, screenen volgens publieke informatie van Unity en de OPEN Foundation tegen alcohol- en cannabisgebruik tijdens en rond ceremonies. De motivatie is niet primair acute veiligheid; het is integratie. Een ceremonie investeert in een specifieke staat en een specifieke set, en demping (alcohol) of een onvoorspelbaarder verloop (cannabis) ondergraaft het doel. Wie in een ceremonie zit, krijgt vrijwel altijd een abstinentie-verzoek voor de 24 tot 48 uur eromheen."
      ],
      paragraphs_en: [
        "Dutch ceremony facilitators, in both the truffle and ayahuasca circuits, screen against alcohol and cannabis use during and around ceremonies according to public information from Unity and the OPEN Foundation. The motivation isn't primarily acute safety. It's integration. A ceremony invests in a specific state and a specific set, and dampening (alcohol) or a more unpredictable course (cannabis) undermines the goal. Anyone in a ceremony almost always gets an abstinence request for the 24 to 48 hours around it."
      ]
    },
    {
      id: "unity-jellinek-trimbos",
      title_nl: "Unity, Jellinek, Trimbos: waar je terecht kunt",
      title_en: "Unity, Jellinek, Trimbos: where you can turn",
      paragraphs_nl: [
        "Voor laagdrempelige Nederlandstalige informatie en peer-advies: Unity (peer harm-reduction op festivals en online), Jellinek (interactiechecker en feitelijke pagina's per stof) en het Trimbos-instituut (drugsinfo). Geen van deze organisaties moedigt combinatiegebruik aan; alle drie geven feitelijke informatie zonder veroordeling. De Jellinek interactiechecker is een goede eerste stop bij vragen over een specifiek scenario."
      ],
      paragraphs_en: [
        "For low-threshold Dutch-language information and peer advice: Unity (peer harm-reduction at festivals and online), Jellinek (interaction checker and factual pages per substance), and the Trimbos Institute (drug info). None of these organisations encourage combination use; all three give factual information without judgment. The Jellinek interaction checker is a good first stop for questions about a specific scenario."
      ]
    },
    {
      id: "wanneer-112",
      title_nl: "Wanneer 112 bellen",
      title_en: "When to call 112",
      paragraphs_nl: [
        "Bel 112 als één van de volgende dingen gebeurt: iemand reageert niet meer of is bewusteloos en niet wakker te maken; iemand braakt terwijl het bewustzijnsniveau gedaald is (aspiratierisico); ernstige pijn op de borst of ademhalingsproblemen; psychotische symptomen die niet binnen enkele uren afnemen; aanhoudende stuipen of trekkingen.",
        "Het Nederlandse zorgsysteem vervolgt gebruikers niet voor het zoeken van medische hulp. Liever te vroeg bellen dan te laat."
      ],
      paragraphs_en: [
        "Call 112 if any of the following happens: someone no longer responds or is unconscious and can't be woken; someone is vomiting while consciousness has dropped (aspiration risk); severe chest pain or breathing difficulties; psychotic symptoms that don't subside within a few hours; persistent seizures or convulsions.",
        "The Dutch healthcare system doesn't prosecute users for seeking medical help. Better to call too early than too late."
      ]
    },
    {
      id: "bronnen",
      title_nl: "Bronnen",
      title_en: "Sources",
      paragraphs_nl: [
        "1. Carhart-Harris RL, Nutt DJ (2017). Serotonin and brain function: a tale of two receptors. J Psychopharmacol 31(9): 1091-1120. DOI: 10.1177/0269881117725915",
        "2. Brown RT et al. (2017). Pharmacokinetics of escalating doses of oral psilocybin in healthy adults. Clin Pharmacokinet 56(12): 1543-1554. DOI: 10.1007/s40262-017-0540-6",
        "3. Holze F et al. (2023). Direct comparison of the acute effects of lysergic acid diethylamide and psilocybin in a double-blind placebo-controlled study in healthy subjects. Biological Psychiatry 93(3): 215-223. DOI: 10.1016/j.biopsych.2022.10.018",
        "4. Nichols DE (2016). Psychedelics. Pharmacological Reviews 68(2): 264-355. DOI: 10.1124/pr.115.011478",
        "5. Wolinsky D, Barrett FS, Vandrey R (2024). Cannabis and Cannabinoid Research 9(2): 408-422. DOI: 10.1089/can.2023.0204",
        "6. Viñals X et al. (2015). Cognitive impairment induced by Δ9-tetrahydrocannabinol occurs through heteromers between cannabinoid CB1 and serotonin 5-HT2A receptors. PLOS Biology 13(7): e1002194. DOI: 10.1371/journal.pbio.1002194",
        "7. Galindo L et al. (2018). Cannabis users show enhanced expression of CB1-5HT2A receptor heteromers in olfactory neuroepithelium cells. Front Pharmacol 9: 1059. DOI: 10.3389/fphar.2018.01059",
        "8. Petrilli K et al. (2025). Cannabis and cannabinoids and psychotic-like symptoms: a systematic review and meta-analysis. Neuroscience & Biobehavioral Reviews. PII S0149763425002702 (canonical DOI to be inserted once SciDirect indexation completes).",
        "9. Freeman D et al. (2015). How cannabis causes paranoia: using the intravenous administration of Δ9-tetrahydrocannabinol (THC) to identify key cognitive mechanisms leading to paranoia. Schizophrenia Bulletin 41(2): 391-399. DOI: 10.1093/schbul/sbu098",
        "10. Englund A et al. (2023). Cannabidiol does not attenuate acute effects of THC: a randomized clinical trial. Neuropsychopharmacology 48(6): 869-876. DOI: 10.1038/s41386-022-01478-z",
        "11. Bhattacharyya S et al. (2010). Opposite effects of Δ9-tetrahydrocannabinol and cannabidiol on human brain function and psychopathology. Arch Gen Psychiatry 67(2): 158-167. DOI: 10.1001/archgenpsychiatry.2009.197",
        "12. Wall MB et al. (2019). Dissociable effects of cannabis with and without cannabidiol on the human brain's resting-state functional connectivity. J Psychopharmacol 33(7): 822-830. DOI: 10.1177/0269881119841569",
        "13. Trimbos-instituut / Drugsinfo. https://www.drugsinfo.nl/",
        "14. Jellinek (vraag en antwoord). https://www.jellinek.nl/vraag-en-antwoord/",
        "15. Unity. https://unity.nl/",
        "16. OPEN Foundation. https://open-foundation.org/",
        "17. DanceSafe. https://dancesafe.org/"
      ],
      paragraphs_en: [
        "1. Carhart-Harris RL, Nutt DJ (2017). Serotonin and brain function: a tale of two receptors. J Psychopharmacol 31(9): 1091-1120. DOI: 10.1177/0269881117725915",
        "2. Brown RT et al. (2017). Pharmacokinetics of escalating doses of oral psilocybin in healthy adults. Clin Pharmacokinet 56(12): 1543-1554. DOI: 10.1007/s40262-017-0540-6",
        "3. Holze F et al. (2023). Direct comparison of the acute effects of lysergic acid diethylamide and psilocybin in a double-blind placebo-controlled study in healthy subjects. Biological Psychiatry 93(3): 215-223. DOI: 10.1016/j.biopsych.2022.10.018",
        "4. Nichols DE (2016). Psychedelics. Pharmacological Reviews 68(2): 264-355. DOI: 10.1124/pr.115.011478",
        "5. Wolinsky D, Barrett FS, Vandrey R (2024). Cannabis and Cannabinoid Research 9(2): 408-422. DOI: 10.1089/can.2023.0204",
        "6. Viñals X et al. (2015). Cognitive impairment induced by Δ9-tetrahydrocannabinol occurs through heteromers between cannabinoid CB1 and serotonin 5-HT2A receptors. PLOS Biology 13(7): e1002194. DOI: 10.1371/journal.pbio.1002194",
        "7. Galindo L et al. (2018). Cannabis users show enhanced expression of CB1-5HT2A receptor heteromers in olfactory neuroepithelium cells. Front Pharmacol 9: 1059. DOI: 10.3389/fphar.2018.01059",
        "8. Petrilli K et al. (2025). Cannabis and cannabinoids and psychotic-like symptoms: a systematic review and meta-analysis. Neuroscience & Biobehavioral Reviews. PII S0149763425002702 (canonical DOI to be inserted once SciDirect indexation completes).",
        "9. Freeman D et al. (2015). How cannabis causes paranoia: using the intravenous administration of Δ9-tetrahydrocannabinol (THC) to identify key cognitive mechanisms leading to paranoia. Schizophrenia Bulletin 41(2): 391-399. DOI: 10.1093/schbul/sbu098",
        "10. Englund A et al. (2023). Cannabidiol does not attenuate acute effects of THC: a randomized clinical trial. Neuropsychopharmacology 48(6): 869-876. DOI: 10.1038/s41386-022-01478-z",
        "11. Bhattacharyya S et al. (2010). Opposite effects of Δ9-tetrahydrocannabinol and cannabidiol on human brain function and psychopathology. Arch Gen Psychiatry 67(2): 158-167. DOI: 10.1001/archgenpsychiatry.2009.197",
        "12. Wall MB et al. (2019). Dissociable effects of cannabis with and without cannabidiol on the human brain's resting-state functional connectivity. J Psychopharmacol 33(7): 822-830. DOI: 10.1177/0269881119841569",
        "13. Trimbos Institute / Drugsinfo. https://www.drugsinfo.nl/",
        "14. Jellinek (questions and answers). https://www.jellinek.nl/vraag-en-antwoord/",
        "15. Unity. https://unity.nl/",
        "16. OPEN Foundation. https://open-foundation.org/",
        "17. DanceSafe. https://dancesafe.org/"
      ]
    }
  ],

  faqs_nl: [
    {
      question: "Wat gebeurt er als je truffels en alcohol combineert?",
      answer: "Alcohol is een CNS-depressant, psilocybine een psychedelicum. De combinatie dempt de trip gedeeltelijk, verhoogt misselijkheid, duizeligheid en kans op black-outs. Geen serotonine-noodgeval zoals bij MAO-remmers, wel hoger ongelukkenrisico, vooral bij grotere hoeveelheden alcohol."
    },
    {
      question: "Versterkt wiet de werking van truffels?",
      answer: "Ja. THC-rijke cannabis kan de psychedelische ervaring intensiveren en verlengen, vooral op het hoogtepunt en in de afbouw. Voor onervaren cannabisgebruikers verhoogt het sterk de kans op angst, paranoia en dissociatie. CBD-rijke cannabis doet dit niet op dezelfde manier."
    },
    {
      question: "Is het gevaarlijk om truffels met alcohol of cannabis te gebruiken?",
      answer: "Niet in dezelfde categorie als truffels met antidepressiva. De risico's zitten in slechte beslissingen, misselijkheid, angstreacties en alcohol-gerelateerde ongelukken, niet in een acute farmacologische crisis. Lage doses, gescheiden timing en een nuchtere tripsitter verlagen het risico aanzienlijk."
    },
    {
      question: "Wat doe je als iemand een paniekaanval krijgt na een joint tijdens een truffeltrip?",
      answer: "Verander de setting (rustige plek, gedimd licht), drink water, adem rustig mee, herinner de persoon dat het cannabis-deel binnen 1 tot 3 uur is uitgewerkt en blijf in de buurt. Bel 112 bij langdurige psychotische symptomen, ademhalingsproblemen of als de persoon onbereikbaar wordt."
    },
    {
      question: "Is een glas wijn tijdens een truffelceremonie oké?",
      answer: "Bijna alle Nederlandse facilitators raden het af. Een glas wijn vlakt de psychedelische ervaring af en werkt het integratiedoel van een ceremonie tegen. In een recreatieve setting is een klein glas niet farmacologisch riskant, maar facilitators op begeleide sessies sluiten alcohol vrijwel altijd uit als kwaliteitskeuze."
    }
  ],
  faqs_en: [
    {
      question: "What happens if you combine truffles and alcohol?",
      answer: "Alcohol is a CNS depressant, psilocybin a psychedelic. The combination dampens the trip partially, raises nausea, dizziness, and the chance of black-outs. No serotonin emergency like with MAO inhibitors, but a higher accident risk, especially with larger amounts of alcohol."
    },
    {
      question: "Does weed amplify the effect of truffles?",
      answer: "Yes. THC-rich cannabis can intensify and prolong the psychedelic experience, especially at the peak and in the comedown. For inexperienced cannabis users it strongly raises the chance of anxiety, paranoia, and dissociation. CBD-rich cannabis doesn't do this in the same way."
    },
    {
      question: "Is it dangerous to use truffles with alcohol or cannabis?",
      answer: "Not in the same category as truffles with antidepressants. The risks live in poor decisions, nausea, anxiety reactions, and alcohol-related accidents, not in an acute pharmacological crisis. Low doses, separated timing, and a sober tripsitter lower the risk substantially."
    },
    {
      question: "What do you do if someone has a panic attack after a joint during a truffle trip?",
      answer: "Change the setting (quiet place, dimmed light), drink water, breathe slowly together, remind the person that the cannabis component is worn off within 1 to 3 hours and stay close. Call 112 for prolonged psychotic symptoms, breathing problems, or if the person becomes unreachable."
    },
    {
      question: "Is a glass of wine during a truffle ceremony okay?",
      answer: "Almost all Dutch facilitators advise against it. A glass of wine flattens the psychedelic experience and works against the integration goal of a ceremony. In a recreational setting a small glass isn't pharmacologically risky, but facilitators in guided sessions almost always exclude alcohol as a quality choice."
    }
  ]
};
