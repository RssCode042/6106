// Google Analytics 4 & Google Tag Manager integration with Consent Mode v2

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
export const GTM_CONTAINER_ID = import.meta.env.VITE_GTM_ID || '';

/**
 * Initialize Google DataLayer, Consent Mode v2 defaults, and load scripts.
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  
  // Корекция: Пускаме 'arguments', за да съответства на стандартния gtag интерфейс
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }
  
  window.gtag = gtag;

  // Проверка на записаното съгласие
  const savedConsent = localStorage.getItem('cookie-consent-accepted');
  const isAccepted = savedConsent === 'all';

  // Consent Mode v2 defaults
  gtag('consent', 'default', {
    analytics_storage: isAccepted ? 'granted' : 'denied',
    ad_storage: isAccepted ? 'granted' : 'denied',
    ad_user_data: isAccepted ? 'granted' : 'denied',
    ad_personalization: isAccepted ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  gtag('js', new Date());

  // Direct GA4 Integration
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Изключваме автоматичните изгледи (ползваме React Router)
      cookie_flags: 'SameSite=None;Secure'
    });

    if (!document.getElementById('ga-gtag-script')) {
      const script = document.createElement('script');
      script.id = 'ga-gtag-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }
  }

  // Google Tag Manager Integration
  if (GTM_CONTAINER_ID && !document.getElementById('gtm-script')) {
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    const script = document.createElement('script');
    script.id = 'gtm-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
    document.head.appendChild(script);
  }
}

/**
 * Track route / page view change in React Router
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window === 'undefined') return;

  if (window.gtag && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href
    });
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'virtual_page_view',
      page_path: pagePath,
      page_title: pageTitle || document.title
    });
  }
}

/**
 * Update Google Consent Mode status
 */
export function updateConsent(acceptedAll: boolean) {
  if (typeof window === 'undefined' || !window.gtag) return;

  const status = acceptedAll ? 'granted' : 'denied';

  window.gtag('consent', 'update', {
    analytics_storage: status,
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status
  });

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'consent_updated',
      analytics_consent: status
    });
  }
}

/**
 * Track custom events
 */
export function trackCustomEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, params);
  } else if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params
    });
  }
}