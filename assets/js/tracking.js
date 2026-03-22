/* ============================================================
   PSYCHEDELICA.NL — Tracking & Analytics
   Version: 1.0
   
   Include in every page:
   <script src="/assets/js/tracking.js"></script>
   
   This file is separate so tracking scripts don't clutter
   page code, and can be easily toggled or swapped.
   ============================================================ */

(function() {
  'use strict';

  /* -------------------------------------------------------
     GOOGLE ANALYTICS (GA4)
     Replace G-XXXXXXXXXX with your actual Measurement ID.
     -------------------------------------------------------
     To activate:
     1. Get your GA4 Measurement ID from analytics.google.com
     2. Replace the placeholder below
     3. Set ENABLED to true
     ------------------------------------------------------- */
  var GA_CONFIG = {
    ENABLED: false,
    MEASUREMENT_ID: 'G-XXXXXXXXXX'
  };

  if (GA_CONFIG.ENABLED && GA_CONFIG.MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_CONFIG.MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_CONFIG.MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    // Expose globally for custom events
    window.gtag = gtag;
  }

  /* -------------------------------------------------------
     GOOGLE TAG MANAGER (optional, alternative to GA4 direct)
     Replace GTM-XXXXXXX with your GTM container ID.
     ------------------------------------------------------- */
  var GTM_CONFIG = {
    ENABLED: false,
    CONTAINER_ID: 'GTM-XXXXXXX'
  };

  if (GTM_CONFIG.ENABLED && GTM_CONFIG.CONTAINER_ID !== 'GTM-XXXXXXX') {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', GTM_CONFIG.CONTAINER_ID);
  }

  /* -------------------------------------------------------
     COOKIE CONSENT BANNER
     Simple, GDPR-friendly cookie consent. Shows once,
     remembers choice in localStorage.
     ------------------------------------------------------- */
  var CONSENT_CONFIG = {
    ENABLED: true,
    STORAGE_KEY: 'psy_cookie_consent'
  };

  function hasConsent() {
    return localStorage.getItem(CONSENT_CONFIG.STORAGE_KEY) === 'accepted';
  }

  function showConsentBanner() {
    if (!CONSENT_CONFIG.ENABLED) return;
    if (hasConsent()) return;
    if (localStorage.getItem(CONSENT_CONFIG.STORAGE_KEY) === 'declined') return;

    var lang = localStorage.getItem('psy_lang') || 'nl';
    var text = lang === 'en'
      ? 'This website uses cookies for analytics. No personal data is sold or shared with third parties.'
      : 'Deze website gebruikt cookies voor analytics. Geen persoonlijke data wordt verkocht of gedeeld met derden.';
    var acceptText = lang === 'en' ? 'Accept' : 'Accepteren';
    var declineText = lang === 'en' ? 'Decline' : 'Weigeren';

    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.setAttribute('style',
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
      'background:#2A2824;color:#C8C3B8;' +
      'padding:16px 24px;' +
      'display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;' +
      'font-family:var(--font-sans);font-size:14px;line-height:1.5;' +
      'box-shadow:0 -2px 16px rgba(0,0,0,0.15);'
    );
    banner.innerHTML =
      '<span style="max-width:600px;">' + text + '</span>' +
      '<div style="display:flex;gap:8px;">' +
        '<button onclick="acceptCookies()" style="' +
          'background:#8B5CC8;color:#fff;border:none;border-radius:6px;' +
          'padding:8px 20px;font-size:13px;font-weight:500;cursor:pointer;">' +
          acceptText +
        '</button>' +
        '<button onclick="declineCookies()" style="' +
          'background:transparent;color:#A09A8C;border:1px solid #5C574D;border-radius:6px;' +
          'padding:8px 20px;font-size:13px;cursor:pointer;">' +
          declineText +
        '</button>' +
      '</div>';
    document.body.appendChild(banner);
  }

  window.acceptCookies = function() {
    localStorage.setItem(CONSENT_CONFIG.STORAGE_KEY, 'accepted');
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.remove();
  };

  window.declineCookies = function() {
    localStorage.setItem(CONSENT_CONFIG.STORAGE_KEY, 'declined');
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.remove();
  };

  /* -------------------------------------------------------
     CUSTOM EVENT HELPERS
     Use these to track interactions from any page:
     
     Tracking.event('quiz_completed', { phase: 3, score: 24 });
     Tracking.event('article_read', { slug: 'hoe-word-je...' });
     ------------------------------------------------------- */
  window.Tracking = {
    event: function(name, params) {
      if (window.gtag) {
        gtag('event', name, params || {});
      }
      // Console log for debugging (remove in production)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('[Tracking]', name, params);
      }
    }
  };

  // Init consent banner when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showConsentBanner);
  } else {
    showConsentBanner();
  }

})();
