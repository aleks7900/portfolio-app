import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from '../mocks/server';

// MSW Server lifecycle
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
  sessionStorage.clear();
  vi.clearAllMocks();
});

afterAll(() => {
  server.close();
});

// Polyfill window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Polyfill ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Polyfill navigator.sendBeacon
if (typeof navigator !== 'undefined') {
  Object.defineProperty(navigator, 'sendBeacon', {
    writable: true,
    value: vi.fn().mockReturnValue(true),
  });
}

// Ensure globalThis.FormData uses JSDOM FormData for form element parsing
if (typeof window !== 'undefined' && window.FormData) {
  globalThis.FormData = window.FormData;
}

// Polyfill HTMLCanvasElement.prototype.getContext for WebGL detection
HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((contextId: string) => {
  if (contextId === 'webgl' || contextId === 'webgl2' || contextId === 'experimental-webgl') {
    return {
      getExtension: vi.fn(),
      getParameter: vi.fn(),
      createShader: vi.fn(),
      shaderSource: vi.fn(),
      compileShader: vi.fn(),
      createProgram: vi.fn(),
      attachShader: vi.fn(),
      linkProgram: vi.fn(),
      useProgram: vi.fn(),
    };
  }
  return null;
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;
