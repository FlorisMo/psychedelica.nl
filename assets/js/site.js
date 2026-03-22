/* ============================================================
   PSYCHEDELICA.NL — Shared Site JavaScript
   Version: 1.0
   
   Renders: header, footer, language toggle
   Handles: scroll effects, mobile menu, i18n
   
   Usage: Include in every page AFTER site.css
   <script src="/assets/js/site.js"></script>
   
   Pages call: Site.init({ page: 'home' | 'artikelen' | 'artikel' })
   ============================================================ */

var Site = (function() {

  /* -------------------------------------------------------
     CONFIGURATION
     ------------------------------------------------------- */
  var config = {
    defaultLang: 'nl',
    siteName: 'Psychedelica.nl',
    baseUrl: '', // Set to '' for relative paths, or full domain
  };

  /* -------------------------------------------------------
     LANGUAGE STRINGS (shared across all pages)
     ------------------------------------------------------- */
  var i18n = {
    nl: {
      nav_home: 'Home',
      nav_articles: 'Artikelen',
      nav_about: 'Over ons',
      nav_contact: 'Contact',
      footer_desc: 'Jouw gids in de wereld van psychedelica. Wetenschap, risicobeperking en eerlijke informatie.',
      footer_pages: 'Pagina\'s',
      footer_copy: '© ' + new Date().getFullYear() + ' Psychedelica.nl',
      footer_disclaimer: 'LET OP: De informatie op deze website is enkel bedoeld ter informatie en om risico\'s te beperken. Wij raden niemand aan om psychedelica te gebruiken. Doe altijd je eigen onderzoek en raadpleeg bij twijfel een professional.',
      read_articles: 'Bekijk artikelen',
      read_more: 'Lees meer',
      all_tags: 'Alles',
      min_read: 'min leestijd',
    },
    en: {
      nav_home: 'Home',
      nav_articles: 'Articles',
      nav_about: 'About us',
      nav_contact: 'Contact',
      footer_desc: 'Your guide to the world of psychedelics. Science, harm reduction and honest information.',
      footer_pages: 'Pages',
      footer_copy: '© ' + new Date().getFullYear() + ' Psychedelica.nl',
      footer_disclaimer: 'DISCLAIMER: The information on this website is intended for informational purposes only and to reduce risks. We do not recommend anyone to use psychedelics. Always do your own research and consult a professional if in doubt.',
      read_articles: 'View articles',
      read_more: 'Read more',
      all_tags: 'All',
      min_read: 'min read',
    }
  };

  var currentLang = config.defaultLang;

  /* -------------------------------------------------------
     HELPERS
     ------------------------------------------------------- */
  function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || key;
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function getLang() {
    return localStorage.getItem('psy_lang') || config.defaultLang;
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('psy_lang', lang);
    applyLang();
  }

  function applyLang() {
    // Toggle data-lang elements
    document.querySelectorAll('[data-lang]').forEach(function(el) {
      el.classList.toggle('show', el.getAttribute('data-lang') === currentLang);
    });

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    // Update data-i18n-href elements  
    document.querySelectorAll('[data-i18n-href]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-href');
      el.setAttribute('href', t(key));
    });

    // Update toggle buttons
    document.querySelectorAll('.lang-toggle__option').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === currentLang);
    });

    // Dispatch event for page-specific handlers
    document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: currentLang } }));
  }

  /* -------------------------------------------------------
     LOGO SVG (inline, matches the purple leaf favicon)
     ------------------------------------------------------- */
  var logoSVG = '<svg class="site-logo__icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M50 10C30 25 15 50 20 80C25 65 35 50 50 40C65 50 75 65 80 80C85 50 70 25 50 10Z" fill="#8B5CC8"/>' +
    '<path d="M50 40C35 50 25 65 20 80C30 75 40 65 50 50C50 50 50 45 50 40Z" fill="#A875DC"/>' +
    '<path d="M50 40C65 50 75 65 80 80C70 75 60 65 50 50C50 50 50 45 50 40Z" fill="#7048A6"/>' +
    '</svg>';

  /* -------------------------------------------------------
     RENDER HEADER
     ------------------------------------------------------- */
  function renderHeader(activePage) {
    var navItems = [
      { key: 'nav_home', href: '/', page: 'home' },
      { key: 'nav_articles', href: '/artikelen/', page: 'artikelen' },
      { key: 'nav_about', href: '/over-ons/', page: 'over-ons' },
      { key: 'nav_contact', href: '/contact/', page: 'contact' },
    ];

    var navLinksHTML = navItems.map(function(item) {
      var cls = 'site-nav__link' + (activePage === item.page ? ' active' : '');
      return '<a href="' + item.href + '" class="' + cls + '" data-i18n="' + item.key + '">' + t(item.key) + '</a>';
    }).join('');

    var mobileLinksHTML = navItems.map(function(item) {
      return '<a href="' + item.href + '" class="mobile-nav__link" data-i18n="' + item.key + '">' + t(item.key) + '</a>';
    }).join('');

    var langToggleHTML = '<div class="lang-toggle">' +
      '<button class="lang-toggle__option' + (currentLang === 'nl' ? ' active' : '') + '" data-lang-btn="nl" onclick="Site.setLang(\'nl\')">NL</button>' +
      '<button class="lang-toggle__option' + (currentLang === 'en' ? ' active' : '') + '" data-lang-btn="en" onclick="Site.setLang(\'en\')">EN</button>' +
      '</div>';

    var html = '<header class="site-header" id="siteHeader">' +
      '<div class="site-header__inner">' +
        '<a href="/" class="site-logo">' +
          logoSVG +
          '<span class="site-logo__text">Psychedelica</span>' +
        '</a>' +
        '<nav class="site-nav">' +
          navLinksHTML +
          langToggleHTML +
        '</nav>' +
        '<button class="menu-toggle" id="menuToggle" aria-label="Menu" onclick="Site.toggleMenu()">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
    '</header>' +
    '<nav class="mobile-nav" id="mobileNav">' +
      mobileLinksHTML +
      '<div class="mobile-nav__lang">' + langToggleHTML + '</div>' +
    '</nav>';

    var container = document.getElementById('site-header');
    if (container) container.innerHTML = html;
  }

  /* -------------------------------------------------------
     RENDER FOOTER
     ------------------------------------------------------- */
  function renderFooter() {
    var year = new Date().getFullYear();
    var html = '<footer class="site-footer">' +
      '<div class="site-footer__inner">' +
        '<div class="site-footer__top" style="grid-template-columns:1.5fr 1fr;">' +
          '<div class="site-footer__brand">' +
            '<span class="site-footer__brand-name">Psychedelica.nl</span>' +
            '<p class="site-footer__desc" data-i18n="footer_desc">' + t('footer_desc') + '</p>' +
          '</div>' +
          '<div>' +
            '<h4 class="site-footer__heading" data-i18n="footer_pages">' + t('footer_pages') + '</h4>' +
            '<ul class="site-footer__links">' +
              '<li><a href="/" data-i18n="nav_home">' + t('nav_home') + '</a></li>' +
              '<li><a href="/artikelen/" data-i18n="nav_articles">' + t('nav_articles') + '</a></li>' +
              '<li><a href="/over-ons/" data-i18n="nav_about">' + t('nav_about') + '</a></li>' +
              '<li><a href="/contact/" data-i18n="nav_contact">' + t('nav_contact') + '</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="site-footer__bottom">' +
          '<span class="site-footer__copy">&copy; ' + year + ' Psychedelica.nl</span>' +
          '<p class="site-footer__disclaimer" data-i18n="footer_disclaimer">' + t('footer_disclaimer') + '</p>' +
        '</div>' +
      '</div>' +
    '</footer>';

    var container = document.getElementById('site-footer');
    if (container) container.innerHTML = html;
  }

  /* -------------------------------------------------------
     SCROLL EFFECTS
     ------------------------------------------------------- */
  function initScrollEffects() {
    var header = document.getElementById('siteHeader');
    var ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          if (header) {
            header.classList.toggle('scrolled', window.scrollY > 10);
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* -------------------------------------------------------
     MOBILE MENU
     ------------------------------------------------------- */
  var menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('menuToggle');
    if (nav) nav.classList.toggle('open', menuOpen);
    if (btn) {
      btn.innerHTML = menuOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    }
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }

  /* -------------------------------------------------------
     ACCORDION TOGGLE (global, shared by articles)
     ------------------------------------------------------- */
  function toggleAccordion(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var body = el.querySelector(':scope > .accordion-body');
    if (el.classList.contains('open')) {
      body.style.maxHeight = '0px';
      setTimeout(function() { el.classList.remove('open'); }, 10);
    } else {
      el.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      setTimeout(function() { body.style.maxHeight = body.scrollHeight + 'px'; }, 400);
    }
    // Update parent accordion if nested
    var parent = el.closest('.accordion-content');
    if (parent) {
      var parentBody = parent.closest('.accordion-body');
      if (parentBody) {
        setTimeout(function() { parentBody.style.maxHeight = parentBody.scrollHeight + 200 + 'px'; }, 50);
        setTimeout(function() { parentBody.style.maxHeight = parentBody.scrollHeight + 'px'; }, 400);
      }
    }
  }

  /* -------------------------------------------------------
     SEO — JSON-LD Schema, Open Graph, Canonical, Hreflang
     
     Call from pages: Site.seo({ ...options })
     ------------------------------------------------------- */
  function injectSEO(options) {
    options = options || {};
    var head = document.head;
    var baseUrl = 'https://psychedelica.nl';

    // Canonical
    if (options.canonical) {
      var canon = document.createElement('link');
      canon.rel = 'canonical';
      canon.href = options.canonical.indexOf('http') === 0 ? options.canonical : baseUrl + options.canonical;
      head.appendChild(canon);
    }

    // Hreflang (self-referencing for bilingual single-URL pages)
    if (options.canonical) {
      var fullUrl = options.canonical.indexOf('http') === 0 ? options.canonical : baseUrl + options.canonical;
      ['nl', 'en', 'x-default'].forEach(function(lang) {
        var hl = document.createElement('link');
        hl.rel = 'alternate';
        hl.hreflang = lang;
        hl.href = fullUrl;
        head.appendChild(hl);
      });
    }

    // Robots
    var robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = options.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    head.appendChild(robots);

    // Open Graph
    var og = {
      'og:site_name': 'Psychedelica.nl',
      'og:locale': 'nl_NL',
      'og:type': options.ogType || 'website',
      'og:title': options.title || document.title,
      'og:description': options.description || '',
      'og:url': options.canonical ? (options.canonical.indexOf('http') === 0 ? options.canonical : baseUrl + options.canonical) : baseUrl,
    };
    if (options.ogImage) og['og:image'] = options.ogImage;

    Object.keys(og).forEach(function(prop) {
      if (!og[prop]) return;
      var meta = document.createElement('meta');
      meta.setAttribute('property', prop);
      meta.content = og[prop];
      head.appendChild(meta);
    });

    // Twitter Card
    var tw = {
      'twitter:card': 'summary_large_image',
      'twitter:title': options.title || document.title,
      'twitter:description': options.description || '',
    };
    if (options.ogImage) tw['twitter:image'] = options.ogImage;

    Object.keys(tw).forEach(function(name) {
      if (!tw[name]) return;
      var meta = document.createElement('meta');
      meta.name = name;
      meta.content = tw[name];
      head.appendChild(meta);
    });

    // JSON-LD: Organization (on all pages)
    var orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Psychedelica.nl',
      url: baseUrl,
      logo: baseUrl + '/assets/img/favicon.png',
      description: 'Jouw gids in de wereld van psychedelica. Wetenschap, risicobeperking en eerlijke informatie.',
      sameAs: []
    };
    injectJsonLd(orgSchema);

    // JSON-LD: WebSite (on homepage)
    if (options.isHomepage) {
      var webSiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Psychedelica.nl',
        url: baseUrl,
        inLanguage: ['nl', 'en'],
        description: options.description || ''
      };
      injectJsonLd(webSiteSchema);
    }

    // JSON-LD: BreadcrumbList
    if (options.breadcrumbs && options.breadcrumbs.length) {
      var bcSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: options.breadcrumbs.map(function(bc, i) {
          return {
            '@type': 'ListItem',
            position: i + 1,
            name: bc.name,
            item: bc.url.indexOf('http') === 0 ? bc.url : baseUrl + bc.url
          };
        })
      };
      injectJsonLd(bcSchema);
    }

    // JSON-LD: Article / BlogPosting
    if (options.article) {
      var a = options.article;
      var articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.headline,
        description: a.description || '',
        datePublished: a.datePublished,
        dateModified: a.dateModified || a.datePublished,
        author: {
          '@type': 'Organization',
          name: 'Psychedelica.nl',
          url: baseUrl
        },
        publisher: {
          '@type': 'Organization',
          name: 'Psychedelica.nl',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: baseUrl + '/assets/img/favicon.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': a.url ? (a.url.indexOf('http') === 0 ? a.url : baseUrl + a.url) : baseUrl
        },
        inLanguage: 'nl',
        wordCount: a.wordCount || undefined,
        keywords: a.keywords || undefined
      };
      if (a.image) articleSchema.image = a.image;
      injectJsonLd(articleSchema);
    }
  }

  function injectJsonLd(data) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /* -------------------------------------------------------
     INIT
     ------------------------------------------------------- */
  function init(options) {
    options = options || {};
    currentLang = getLang();
    renderHeader(options.page || '');
    renderFooter();
    applyLang();
    initScrollEffects();

    // Update html lang attribute on lang change
    document.documentElement.lang = currentLang;
    document.addEventListener('langChanged', function(e) {
      document.documentElement.lang = e.detail.lang;
    });
  }

  /* -------------------------------------------------------
     PUBLIC API
     ------------------------------------------------------- */
  return {
    init: init,
    seo: injectSEO,
    setLang: setLang,
    getLang: getLang,
    t: t,
    esc: esc,
    toggleMenu: toggleMenu,
    toggleAccordion: toggleAccordion,
    currentLang: function() { return currentLang; },
    i18n: i18n,
  };

})();
