/* =============================================================
   quiz.js — "Ontdek waar jij staat" self-assessment quiz
   Self-contained: injects CSS, hero button, and modal.
   Load AFTER content.js and the main rendering script.
   ============================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------------
     DATA: Questions, results, advice
     ------------------------------------------------------- */
  var QUESTIONS = [
    {
      question: 'Wat beschrijft jouw relatie met ayahuasca het best?',
      options: [
        { text: 'Ik ben nieuwsgierig en overweeg om ooit begeleider te worden', score: 1 },
        { text: 'Ik heb meerdere ceremonies bijgewoond en voel een roeping', score: 2 },
        { text: 'Ik heb uitgebreide ceremonie-ervaring en ben actief bezig met het pad', score: 3 },
        { text: 'Ik heb al (mee)begeleid en wil mijn praktijk versterken', score: 4 }
      ]
    },
    {
      question: 'Hoeveel ceremonies heb je zelf bijgewoond?',
      options: [
        { text: 'Minder dan 10', score: 1 },
        { text: 'Tussen de 10 en 30', score: 2 },
        { text: 'Tussen de 30 en 70', score: 3 },
        { text: 'Meer dan 70', score: 4 }
      ]
    },
    {
      question: 'Hoe goed ken je de wetenschap, historie en contra-indicaties van ayahuasca?',
      options: [
        { text: 'Ik weet er nog relatief weinig van', score: 1 },
        { text: 'Ik heb me erin verdiept via boeken en documentaires', score: 2 },
        { text: 'Ik ken de materie goed en heb gericht gestudeerd', score: 3 },
        { text: 'Ik kan anderen uitgebreid en nauwkeurig informeren', score: 4 }
      ]
    },
    {
      question: 'Welke relevante opleidingen of trainingen heb je afgerond?',
      options: [
        { text: 'Nog geen', score: 1 },
        { text: 'E\u00e9n of twee gerelateerde opleidingen', score: 2 },
        { text: 'Meerdere opleidingen (bijv. EHBO, psychologie, lichaamswerk)', score: 3 },
        { text: 'Een breed scala aan opleidingen en ik blijf me bijscholen', score: 4 }
      ]
    },
    {
      question: 'Hoe is je ervaring met het assisteren bij ceremonies?',
      options: [
        { text: 'Ik heb nog niet geassisteerd', score: 1 },
        { text: 'Ik heb een paar keer geassisteerd bij \u00e9\u00e9n begeleider', score: 2 },
        { text: 'Ik heb regelmatig geassisteerd bij meerdere begeleiders', score: 3 },
        { text: 'Ik heb uitgebreid geassisteerd en ben klaar om zelf te begeleiden', score: 4 }
      ]
    },
    {
      question: 'Hoe bewust ben je van machtsdynamiek, projectie en ethische risico\u2019s?',
      options: [
        { text: 'Dit onderwerp is nieuw voor me', score: 1 },
        { text: 'Ik heb erover gelezen maar het is nog theoretisch', score: 2 },
        { text: 'Ik herken deze dynamieken en werk er actief mee', score: 3 },
        { text: 'Ik heb hier supervisie voor en het is een doorlopend aandachtspunt', score: 4 }
      ]
    },
    {
      question: 'Hoe staat het met je praktische voorbereiding: documenten, protocollen, netwerk?',
      options: [
        { text: 'Ik heb hier nog niet over nagedacht', score: 1 },
        { text: 'Ik weet wat er nodig is maar ben nog niet begonnen', score: 2 },
        { text: 'Ik ben actief bezig met het opzetten hiervan', score: 3 },
        { text: 'Intake, informed consent, noodprotocol, RI&E en netwerk zijn op orde', score: 4 }
      ]
    },
    {
      question: 'Heb je een netwerk van artsen, therapeuten en collega-begeleiders?',
      options: [
        { text: 'Nee, nog niet', score: 1 },
        { text: 'Ik ken een paar mensen in het veld', score: 2 },
        { text: 'Ik heb een groeiend netwerk', score: 3 },
        { text: 'Ik heb een stevig netwerk met artsen, therapeuten en collega-begeleiders', score: 4 }
      ]
    },
    {
      question: 'Hoe actief werk je aan je eigen persoonlijke ontwikkeling en innerlijk werk?',
      options: [
        { text: 'Ik sta aan het begin van mijn persoonlijke reis', score: 1 },
        { text: 'Ik doe regelmatig aan zelfreflectie en persoonlijke groei', score: 2 },
        { text: 'Ik heb een doorlopende practice van therapie en eigen ceremonies', score: 3 },
        { text: 'Ik combineer eigen ceremonies, therapie, supervisie en voortdurende zelfontwikkeling', score: 4 }
      ]
    }
  ];

  /* Five result profiles aligned to the article's five phases */
  var RESULTS = [
    {
      /* 9 – 14 */
      phase: 1,
      label: 'Fase 1',
      title: 'De Ontdekker',
      subtitle: 'Innerlijke basis',
      color: '#B8E8D5',
      textColor: '#0A5C45',
      description: 'Je staat aan het begin van een bijzonder pad. De nieuwsgierigheid is er \u2014 en dat is waardevol. Dit is het moment om jezelf de vraag te stellen of je een echte calling voelt, en om een stevig fundament te leggen van eigen ervaring en kennis.',
      advice: [
        { text: 'Onderzoek eerlijk of je een echte calling voelt, los van ego-motieven.', step: 1 },
        { text: 'Doe veel eigen ervaring op: streef naar minimaal 50\u2013100 ceremonies bij verschillende begeleiders.', step: 2 },
        { text: 'Verdiep je in de historie, wetenschap en contra-indicaties van ayahuasca.', step: 4 },
        { text: 'Leer over de verschillende tradities en benaderingen van het werk.', step: null }
      ]
    },
    {
      /* 15 – 19 */
      phase: 2,
      label: 'Fase 2',
      title: 'De Student',
      subtitle: 'Professionele kennis',
      color: '#7DD4B4',
      textColor: '#085041',
      description: 'Je hebt al een basis aan ervaring en voelt dat dit je pad is. Nu is het tijd om je professioneel te verdiepen: in de juridische werkelijkheid, relevante opleidingen, en de complexe dynamieken die bij het begeleiden komen kijken.',
      advice: [
        { text: 'Verdiep je grondig in de juridische status en risico\u2019s van het werken met ayahuasca.', step: 5 },
        { text: 'Volg relevante opleidingen: EHBO, psychosociale basiskennis, lichaamswerk, communicatie.', step: 6 },
        { text: 'Bestudeer voorbereiding en integratie: leer screenen, intentiegesprekken voeren en nazorg bieden.', step: 7 },
        { text: 'Verdiep je in machtsdynamiek en projectie \u2014 dit is cruciaal voor je eigen integriteit.', step: 8 }
      ]
    },
    {
      /* 20 – 25 */
      phase: 3,
      label: 'Fase 3',
      title: 'De Leerling',
      subtitle: 'Het vak verdiepen',
      color: '#4DBFA0',
      textColor: '#04342C',
      description: 'Je kennis groeit en je bent klaar om de stap van theorie naar praktijk te zetten. Dit is het moment om te gaan assisteren, je grenzen te leren kennen, en de ethische basis van je toekomstige praktijk te verankeren.',
      advice: [
        { text: 'Ga assisteren bij ervaren begeleiders \u2014 liefst bij meerdere, om je eigen stijl te ontwikkelen.', step: 10 },
        { text: 'Verdiep je in energetisch werken en spirits: blijf open en flexibel in je wereldbeeld.', step: 9 },
        { text: 'Leer je grenzen en capaciteit kennen: weet wanneer je moet doorverwijzen.', step: 11 },
        { text: 'Veranker ethische en minimale veiligheidsstandaarden in je manier van werken.', step: 12 }
      ]
    },
    {
      /* 26 – 30 */
      phase: 4,
      label: 'Fase 4',
      title: 'De Bouwer',
      subtitle: 'Je praktijk bouwen',
      color: '#1D9E75',
      textColor: '#04342C',
      description: 'Je hebt de ervaring en het inzicht om je eigen praktijk op te bouwen. Focus nu op de randvoorwaarden: een sterk netwerk, duurzame werkwijze, de juiste setting, en alle documenten en protocollen die je nodig hebt.',
      advice: [
        { text: 'Bouw een netwerk met artsen, therapeuten en collega-begeleiders voor steun en doorverwijzing.', step: 13 },
        { text: 'Werk duurzaam en geef terug aan de bron: de Amazone en haar gemeenschappen.', step: 14 },
        { text: 'Cre\u00eber een heilige ruimte met aandacht voor licht, muziek, altaar en decoraties.', step: 15 },
        { text: 'Zorg dat intake, informed consent, noodprotocol, RI&E en privacyverklaring op orde zijn.', step: 16 }
      ]
    },
    {
      /* 31 – 36 */
      phase: 5,
      label: 'Fase 5',
      title: 'De Begeleider',
      subtitle: 'Meesterschap & groei',
      color: '#0F6E56',
      textColor: '#E1F5EE',
      description: 'Je bent ver op het pad en hebt de basis, kennis, en praktijk op orde. De reis stopt hier niet \u2014 meesterschap vraagt om voortdurende groei, eerlijkheid naar jezelf, en de moed om je eigen werk te blijven doen.',
      advice: [
        { text: 'Vertrouw op synchroniciteit, maar blijf proactief in het nemen van verantwoordelijkheid.', step: 17 },
        { text: 'Ken altijd de sterkte en kwaliteit van je drank: test elke batch zorgvuldig.', step: 18 },
        { text: 'Laat groepen begeleiden organisch groeien vanuit \u00e9\u00e9n-op-\u00e9\u00e9n ervaring.', step: 19 },
        { text: 'Blijf je eigen werk doen: reis zelf, ga in therapie, en houd je ego in check.', step: 21 }
      ]
    }
  ];

  function getResult(totalScore) {
    if (totalScore <= 14) return RESULTS[0];
    if (totalScore <= 19) return RESULTS[1];
    if (totalScore <= 25) return RESULTS[2];
    if (totalScore <= 30) return RESULTS[3];
    return RESULTS[4];
  }

  /* -------------------------------------------------------
     CSS — scoped via .quiz- prefix
     ------------------------------------------------------- */
  var CSS = '\
/* === QUIZ HERO BUTTON === */\
.quiz-cta-wrap{text-align:center;margin-top:32px}\
.quiz-cta-btn{\
  display:inline-flex;align-items:center;gap:10px;\
  font-family:var(--sans);font-size:15px;font-weight:500;\
  color:var(--accent);background:transparent;\
  border:1.5px solid var(--accent);border-radius:40px;\
  padding:13px 28px;cursor:pointer;\
  transition:all .25s ease;letter-spacing:.01em;\
}\
.quiz-cta-btn:hover{background:var(--accent);color:#fff}\
.quiz-cta-btn:hover .quiz-cta-arrow{transform:translateX(3px)}\
.quiz-cta-arrow{transition:transform .25s ease;display:inline-block}\
\
/* === MODAL OVERLAY === */\
.quiz-overlay{\
  position:fixed;inset:0;z-index:10000;\
  background:rgba(28,28,26,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);\
  display:flex;align-items:center;justify-content:center;\
  opacity:0;visibility:hidden;\
  transition:opacity .35s ease,visibility .35s ease;\
}\
.quiz-overlay.quiz-open{opacity:1;visibility:visible}\
\
/* === MODAL === */\
.quiz-modal{\
  background:var(--bg);border-radius:20px;\
  width:min(580px,calc(100vw - 40px));\
  max-height:min(720px,calc(100vh - 60px));\
  overflow-y:auto;overscroll-behavior:contain;\
  box-shadow:0 24px 80px rgba(0,0,0,.18),0 2px 12px rgba(0,0,0,.08);\
  transform:translateY(20px) scale(.97);opacity:0;\
  transition:transform .4s cubic-bezier(.16,1,.3,1),opacity .35s ease;\
  position:relative;\
}\
.quiz-overlay.quiz-open .quiz-modal{transform:translateY(0) scale(1);opacity:1}\
\
/* Close button */\
.quiz-close{\
  position:absolute;top:16px;right:16px;\
  width:36px;height:36px;border-radius:50%;border:none;\
  background:var(--bg-warm);cursor:pointer;\
  display:flex;align-items:center;justify-content:center;\
  transition:background .15s ease;z-index:2;\
}\
.quiz-close:hover{background:var(--border-md)}\
.quiz-close svg{width:16px;height:16px;color:var(--text-muted)}\
\
/* Progress */\
.quiz-progress-wrap{padding:24px 32px 0}\
.quiz-progress-bar{height:4px;border-radius:2px;background:var(--border);overflow:hidden}\
.quiz-progress-fill{height:100%;background:var(--accent);border-radius:2px;transition:width .4s cubic-bezier(.16,1,.3,1)}\
.quiz-progress-text{\
  font-family:var(--mono);font-size:11px;color:var(--text-faint);\
  margin-top:8px;letter-spacing:.04em;\
}\
\
/* Screens */\
.quiz-screen{padding:32px 32px 36px;display:none}\
.quiz-screen.quiz-active{display:block}\
\
/* Intro screen */\
.quiz-intro-icon{font-size:32px;margin-bottom:16px}\
.quiz-intro-title{\
  font-family:var(--serif);font-size:26px;font-weight:400;\
  color:var(--text);line-height:1.2;margin-bottom:12px;\
}\
.quiz-intro-body{color:var(--text-muted);font-size:15px;line-height:1.7;margin-bottom:28px}\
.quiz-start-btn{\
  display:inline-flex;align-items:center;gap:8px;\
  font-family:var(--sans);font-size:15px;font-weight:500;\
  color:#fff;background:var(--accent);border:none;border-radius:40px;\
  padding:14px 32px;cursor:pointer;transition:background .2s ease;\
}\
.quiz-start-btn:hover{background:#0F6E56}\
\
/* Question screen */\
.quiz-question-text{\
  font-family:var(--serif);font-size:22px;font-weight:400;\
  color:var(--text);line-height:1.35;margin-bottom:24px;\
}\
.quiz-options{display:flex;flex-direction:column;gap:10px}\
.quiz-option{\
  display:block;width:100%;text-align:left;\
  font-family:var(--sans);font-size:15px;line-height:1.55;\
  color:var(--text-body);background:#fff;\
  border:1.5px solid var(--border-md);border-radius:12px;\
  padding:16px 20px;cursor:pointer;\
  transition:all .2s ease;\
}\
.quiz-option:hover{border-color:var(--accent);background:var(--accent-light)}\
.quiz-option.quiz-selected{\
  border-color:var(--accent);background:var(--accent-light);\
  color:var(--accent);font-weight:500;\
}\
\
/* Navigation */\
.quiz-nav{display:flex;justify-content:space-between;align-items:center;margin-top:28px}\
.quiz-nav-btn{\
  font-family:var(--sans);font-size:14px;font-weight:500;\
  border:none;border-radius:40px;padding:11px 24px;\
  cursor:pointer;transition:all .2s ease;\
}\
.quiz-nav-prev{background:transparent;color:var(--text-muted)}\
.quiz-nav-prev:hover{color:var(--text);background:var(--bg-warm)}\
.quiz-nav-next{background:var(--accent);color:#fff}\
.quiz-nav-next:hover{background:#0F6E56}\
.quiz-nav-next:disabled{opacity:.35;cursor:not-allowed;background:var(--text-faint)}\
\
/* Result screen */\
.quiz-result-badge{\
  display:inline-block;padding:6px 18px;border-radius:24px;\
  font-family:var(--mono);font-size:11px;letter-spacing:.1em;\
  text-transform:uppercase;margin-bottom:16px;\
}\
.quiz-result-title{\
  font-family:var(--serif);font-size:30px;font-weight:400;\
  color:var(--text);line-height:1.15;margin-bottom:6px;\
}\
.quiz-result-subtitle{\
  font-family:var(--mono);font-size:12px;color:var(--text-faint);\
  letter-spacing:.06em;margin-bottom:20px;\
}\
.quiz-result-desc{\
  font-size:16px;line-height:1.75;color:var(--text-body);margin-bottom:28px;\
}\
.quiz-advice-header{\
  font-family:var(--sans);font-size:13px;font-weight:500;\
  color:var(--text-muted);text-transform:uppercase;\
  letter-spacing:.08em;margin-bottom:14px;\
}\
.quiz-advice-list{display:flex;flex-direction:column;gap:10px;margin-bottom:32px}\
.quiz-advice-item{\
  display:flex;gap:14px;align-items:flex-start;\
  font-size:15px;line-height:1.65;color:var(--text-body);\
  background:#fff;border:1px solid var(--border);border-radius:10px;\
  padding:14px 18px;\
}\
.quiz-advice-num{\
  font-family:var(--mono);font-size:11px;\
  width:26px;height:26px;border-radius:50%;\
  display:flex;align-items:center;justify-content:center;\
  flex-shrink:0;margin-top:2px;\
}\
.quiz-advice-link{\
  color:var(--accent);text-decoration:none;\
  font-size:13px;font-weight:500;\
  transition:opacity .15s ease;\
}\
.quiz-advice-link:hover{opacity:.7}\
.quiz-result-actions{display:flex;gap:12px;flex-wrap:wrap}\
.quiz-result-restart{\
  font-family:var(--sans);font-size:14px;font-weight:500;\
  background:transparent;border:1.5px solid var(--border-md);\
  border-radius:40px;padding:11px 24px;cursor:pointer;\
  color:var(--text-muted);transition:all .15s ease;\
}\
.quiz-result-restart:hover{border-color:var(--text-muted);color:var(--text)}\
.quiz-result-close{\
  font-family:var(--sans);font-size:14px;font-weight:500;\
  background:var(--accent);border:none;\
  border-radius:40px;padding:11px 24px;cursor:pointer;\
  color:#fff;transition:background .15s ease;\
}\
.quiz-result-close:hover{background:#0F6E56}\
\
/* === MOBILE === */\
@media(max-width:600px){\
  .quiz-modal{border-radius:16px;max-height:calc(100vh - 32px);width:calc(100vw - 24px)}\
  .quiz-screen{padding:24px 22px 28px}\
  .quiz-progress-wrap{padding:20px 22px 0}\
  .quiz-intro-title{font-size:22px}\
  .quiz-question-text{font-size:19px}\
  .quiz-option{padding:14px 16px;font-size:14px}\
  .quiz-result-title{font-size:25px}\
  .quiz-cta-btn{font-size:14px;padding:12px 22px}\
}\
';

  /* -------------------------------------------------------
     INJECT CSS
     ------------------------------------------------------- */
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* -------------------------------------------------------
     BUILD MODAL HTML
     ------------------------------------------------------- */
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function buildModal() {
    var html = '';

    /* Close button */
    html += '<button class="quiz-close" id="quizClose" aria-label="Sluiten">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
      '</button>';

    /* Progress bar (hidden on intro + result) */
    html += '<div class="quiz-progress-wrap" id="quizProgressWrap" style="display:none">' +
      '<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quizProgressFill" style="width:0%"></div></div>' +
      '<div class="quiz-progress-text" id="quizProgressText"></div>' +
      '</div>';

    /* SCREEN: Intro */
    html += '<div class="quiz-screen quiz-active" id="quizIntro">' +
      '<div class="quiz-intro-icon">\u2726</div>' +
      '<div class="quiz-intro-title">Ontdek waar jij staat op het pad naar begeleiderschap</div>' +
      '<div class="quiz-intro-body">' +
        'Deze zelfreflectie-quiz helpt je te ontdekken in welke fase van het begeleiderspad je je bevindt. Op basis van 9 vragen krijg je persoonlijk advies over je volgende stappen.' +
        '<br><br>Er zijn geen goede of foute antwoorden \u2014 elke fase is waardevol. Wees eerlijk naar jezelf.' +
      '</div>' +
      '<button class="quiz-start-btn" id="quizStartBtn">Begin de quiz <span class="quiz-cta-arrow">\u2192</span></button>' +
      '</div>';

    /* SCREENS: Questions */
    QUESTIONS.forEach(function (q, qi) {
      html += '<div class="quiz-screen" id="quizQ' + qi + '">' +
        '<div class="quiz-question-text">' + esc(q.question) + '</div>' +
        '<div class="quiz-options">';
      q.options.forEach(function (opt, oi) {
        html += '<button class="quiz-option" data-q="' + qi + '" data-o="' + oi + '" data-score="' + opt.score + '">' +
          esc(opt.text) + '</button>';
      });
      html += '</div>';
      html += '<div class="quiz-nav">' +
        '<button class="quiz-nav-btn quiz-nav-prev" data-dir="prev">' + (qi === 0 ? '' : '\u2190 Vorige') + '</button>' +
        '<button class="quiz-nav-btn quiz-nav-next" data-dir="next" disabled>' +
          (qi === QUESTIONS.length - 1 ? 'Bekijk resultaat \u2192' : 'Volgende \u2192') +
        '</button>' +
      '</div>';
      html += '</div>';
    });

    /* SCREEN: Result (placeholder, filled dynamically) */
    html += '<div class="quiz-screen" id="quizResult"></div>';

    return html;
  }

  function renderResult(result) {
    var el = document.getElementById('quizResult');
    var html = '';
    html += '<div class="quiz-result-badge" style="background:' + result.color + ';color:' + result.textColor + '">' + esc(result.label) + '</div>';
    html += '<div class="quiz-result-title">' + esc(result.title) + '</div>';
    html += '<div class="quiz-result-subtitle">' + esc(result.subtitle) + '</div>';
    html += '<div class="quiz-result-desc">' + esc(result.description) + '</div>';
    html += '<div class="quiz-advice-header">Jouw volgende stappen</div>';
    html += '<div class="quiz-advice-list">';
    result.advice.forEach(function (a, i) {
      html += '<div class="quiz-advice-item">' +
        '<span class="quiz-advice-num" style="background:' + result.color + ';color:' + result.textColor + '">' + (i + 1) + '</span>' +
        '<div>' + esc(a.text) +
          (a.step ? ' <a class="quiz-advice-link" href="#stap' + a.step + '" onclick="document.getElementById(\'quizOverlay\').classList.remove(\'quiz-open\')">\u2192 Lees stap ' + a.step + '</a>' : '') +
        '</div></div>';
    });
    html += '</div>';
    html += '<div class="quiz-result-actions">' +
      '<button class="quiz-result-close" id="quizResultClose">Sluiten</button>' +
      '<button class="quiz-result-restart" id="quizResultRestart">Opnieuw doen</button>' +
      '</div>';
    el.innerHTML = html;
  }

  /* -------------------------------------------------------
     INJECT DOM ELEMENTS
     ------------------------------------------------------- */
  /* 1. Button in hero */
  function injectHeroButton() {
    var heroMeta = document.querySelector('.hero-meta');
    if (!heroMeta) return;
    var wrap = document.createElement('div');
    wrap.className = 'quiz-cta-wrap';
    wrap.innerHTML = '<button class="quiz-cta-btn" id="quizOpenBtn">Doe de quiz: ontdek waar jij staat <span class="quiz-cta-arrow">\u2192</span></button>';
    heroMeta.parentNode.insertBefore(wrap, heroMeta.nextSibling);
  }

  /* 2. Modal overlay */
  function injectModal() {
    var overlay = document.createElement('div');
    overlay.className = 'quiz-overlay';
    overlay.id = 'quizOverlay';
    var modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.id = 'quizModal';
    modal.innerHTML = buildModal();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  /* -------------------------------------------------------
     QUIZ STATE & LOGIC
     ------------------------------------------------------- */
  var answers = {};       // { questionIndex: optionIndex }
  var currentScreen = -1; // -1 = intro, 0..8 = questions, 9 = result

  function showScreen(idx) {
    currentScreen = idx;
    /* Hide all screens */
    var screens = document.querySelectorAll('.quiz-screen');
    screens.forEach(function (s) { s.classList.remove('quiz-active'); });

    if (idx === -1) {
      /* Intro */
      document.getElementById('quizIntro').classList.add('quiz-active');
      document.getElementById('quizProgressWrap').style.display = 'none';
    } else if (idx >= 0 && idx < QUESTIONS.length) {
      /* Question */
      document.getElementById('quizQ' + idx).classList.add('quiz-active');
      document.getElementById('quizProgressWrap').style.display = '';
      var pct = ((idx + 1) / QUESTIONS.length * 100).toFixed(0);
      document.getElementById('quizProgressFill').style.width = pct + '%';
      document.getElementById('quizProgressText').textContent = 'Vraag ' + (idx + 1) + ' van ' + QUESTIONS.length;
      /* Restore selection state */
      var opts = document.querySelectorAll('.quiz-option[data-q="' + idx + '"]');
      opts.forEach(function (o) { o.classList.remove('quiz-selected'); });
      if (answers[idx] !== undefined) {
        opts[answers[idx]].classList.add('quiz-selected');
      }
      /* Next button state */
      var nextBtn = document.querySelector('#quizQ' + idx + ' .quiz-nav-next');
      nextBtn.disabled = (answers[idx] === undefined);
    } else {
      /* Result */
      document.getElementById('quizProgressWrap').style.display = 'none';
      var total = 0;
      for (var k in answers) {
        total += QUESTIONS[k].options[answers[k]].score;
      }
      var result = getResult(total);
      renderResult(result);
      document.getElementById('quizResult').classList.add('quiz-active');
    }
    /* Scroll modal to top */
    document.getElementById('quizModal').scrollTop = 0;
  }

  function openQuiz() {
    document.getElementById('quizOverlay').classList.add('quiz-open');
    document.body.style.overflow = 'hidden';
    showScreen(-1);
  }

  function closeQuiz() {
    document.getElementById('quizOverlay').classList.remove('quiz-open');
    document.body.style.overflow = '';
  }

  function resetQuiz() {
    answers = {};
    /* Clear all selections */
    document.querySelectorAll('.quiz-option').forEach(function (o) { o.classList.remove('quiz-selected'); });
    showScreen(-1);
  }

  /* -------------------------------------------------------
     EVENT DELEGATION
     ------------------------------------------------------- */
  function setupEvents() {
    /* Open */
    document.getElementById('quizOpenBtn').addEventListener('click', openQuiz);

    /* Close */
    document.getElementById('quizClose').addEventListener('click', closeQuiz);

    /* Overlay click to close */
    document.getElementById('quizOverlay').addEventListener('click', function (e) {
      if (e.target === this) closeQuiz();
    });

    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeQuiz();
    });

    /* Start */
    document.getElementById('quizStartBtn').addEventListener('click', function () {
      showScreen(0);
    });

    /* Option selection */
    document.getElementById('quizModal').addEventListener('click', function (e) {
      var opt = e.target.closest('.quiz-option');
      if (!opt) return;
      var qi = parseInt(opt.getAttribute('data-q'), 10);
      var oi = parseInt(opt.getAttribute('data-o'), 10);
      answers[qi] = oi;
      /* Update UI */
      var siblings = document.querySelectorAll('.quiz-option[data-q="' + qi + '"]');
      siblings.forEach(function (s) { s.classList.remove('quiz-selected'); });
      opt.classList.add('quiz-selected');
      /* Enable next */
      var nextBtn = document.querySelector('#quizQ' + qi + ' .quiz-nav-next');
      nextBtn.disabled = false;
      /* Auto-advance after short delay */
      setTimeout(function () {
        if (qi < QUESTIONS.length - 1) {
          showScreen(qi + 1);
        }
      }, 350);
    });

    /* Navigation buttons */
    document.getElementById('quizModal').addEventListener('click', function (e) {
      var btn = e.target.closest('.quiz-nav-btn');
      if (!btn || btn.disabled) return;
      var dir = btn.getAttribute('data-dir');
      if (dir === 'prev' && currentScreen > 0) {
        showScreen(currentScreen - 1);
      } else if (dir === 'next' && currentScreen < QUESTIONS.length) {
        if (currentScreen === QUESTIONS.length - 1) {
          showScreen(QUESTIONS.length); // result
        } else {
          showScreen(currentScreen + 1);
        }
      }
    });

    /* Result actions (delegated, since they're rendered dynamically) */
    document.getElementById('quizModal').addEventListener('click', function (e) {
      if (e.target.id === 'quizResultClose' || e.target.closest('#quizResultClose')) closeQuiz();
      if (e.target.id === 'quizResultRestart' || e.target.closest('#quizResultRestart')) resetQuiz();
    });
  }

  /* -------------------------------------------------------
     INIT — wait for page content to be rendered
     ------------------------------------------------------- */
  function init() {
    injectHeroButton();
    injectModal();
    setupEvents();
  }

  /* The main page script runs synchronously before us,
     so DOM should be ready. Use rAF as safety net. */
  if (document.querySelector('.hero-meta')) {
    init();
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(init);
    });
  }

})();
