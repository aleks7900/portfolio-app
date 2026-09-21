import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  track,
  trackOutboundClick,
  trackPageView,
  trackProductClick,
} from '../analytics';

describe('analytics module', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('generates a session ID on first event and persists it in localStorage', () => {
    trackPageView({ path: '/about' });

    const sessionId = localStorage.getItem('alex-lab_session_id');
    expect(sessionId).toBeTruthy();
    expect(typeof sessionId).toBe('string');
  });

  it('reuses the existing session ID across multiple tracking calls', () => {
    localStorage.setItem('alex-lab_session_id', 'existing-session-123');

    trackPageView({ path: '/service' });

    expect(localStorage.getItem('alex-lab_session_id')).toBe(
      'existing-session-123'
    );
  });

  it('sends analytics payload via navigator.sendBeacon when available', () => {
    const sendBeaconSpy = vi.spyOn(navigator, 'sendBeacon');

    trackProductClick({
      productId: 'prod-42',
      category: 'web',
      price: 1500,
    });

    expect(sendBeaconSpy).toHaveBeenCalledTimes(1);
    const [url, blob] = sendBeaconSpy.mock.calls[0];
    expect(url).toContain('/analytics/events');
    expect(blob).toBeInstanceOf(Blob);
  });

  it('provides convenient tracking shortcuts', () => {
    const sendBeaconSpy = vi.spyOn(navigator, 'sendBeacon');

    trackOutboundClick({ href: 'https://github.com/alex-lab' });
    expect(sendBeaconSpy).toHaveBeenCalledTimes(1);

    track('custom_event', { key: 'value' });
    expect(sendBeaconSpy).toHaveBeenCalledTimes(2);
  });
});
