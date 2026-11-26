// KINETIQ First-Party Telemetry & Analytics Engine
// Privacy-first, zero third-party cookies, server-authoritative ingestion

export type AnalyticsEventName =
  | 'page_view'
  | 'product_view'
  | 'collection_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'search_query'
  | 'checkout_step'
  | 'purchase_complete'
  | 'wishlist_toggle'
  | 'spin_viewer_interact';

export interface AnalyticsPayload {
  session_id: string;
  event_name: AnalyticsEventName;
  path: string;
  referrer?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

const SESSION_STORAGE_KEY = 'kinetiq_session_id';

export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server-session';

  let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    sessionId = `s_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function getUtmParams(): { source?: string; medium?: string; campaign?: string } {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
  };
}

export function trackEvent(
  eventName: AnalyticsEventName,
  metadata: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;

  const sampleRate = Number(process.env.NEXT_PUBLIC_ANALYTICS_SAMPLE_RATE || '1.0');
  if (Math.random() > sampleRate) return;

  const utm = getUtmParams();
  const payload: AnalyticsPayload = {
    session_id: getSessionId(),
    event_name: eventName,
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    device: getDeviceType(),
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
    metadata,
    timestamp: new Date().toISOString(),
  };

  try {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', blob);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Non-blocking fail-open for telemetry
  }
}

// Convenient Semantic Tracking Helpers
export function trackPageView(path: string) {
  trackEvent('page_view', { path });
}

export function trackProductView(productSlug: string, price: number, name: string) {
  trackEvent('product_view', { productSlug, price, name });
}

export function trackAddToCart(item: { name: string; size: number; price: number; quantity: number }) {
  trackEvent('add_to_cart', item);
}

export function trackCheckoutStep(step: number, stepName: string, amount: number) {
  trackEvent('checkout_step', { step, stepName, amount });
}

export function trackPurchase(orderNumber: string, grandTotal: number, itemCount: number) {
  trackEvent('purchase_complete', { orderNumber, grandTotal, itemCount });
}
