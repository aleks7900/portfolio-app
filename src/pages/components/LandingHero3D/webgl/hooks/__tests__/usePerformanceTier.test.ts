import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePerformanceTier } from '../usePerformanceTier';

describe('usePerformanceTier hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('classifies desktop view correctly (width >= 1024px)', () => {
    window.innerWidth = 1280;

    const { result } = renderHook(() => usePerformanceTier());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.particleCount).toBe(360);
    expect(result.current.dpr).toEqual([1, 1.75]);
    expect(result.current.isWebGLSupported).toBe(true);
  });

  it('classifies mobile view correctly (width < 768px)', () => {
    window.innerWidth = 375;

    const { result } = renderHook(() => usePerformanceTier());

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.particleCount).toBe(80);
    expect(result.current.dpr).toEqual([1, 1.25]);
  });

  it('classifies tablet view correctly (768 <= width < 1024)', () => {
    window.innerWidth = 820;

    const { result } = renderHook(() => usePerformanceTier());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.particleCount).toBe(180);
  });

  it('dynamically adapts when window resizes', () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => usePerformanceTier());
    expect(result.current.isMobile).toBe(false);

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.particleCount).toBe(80);
  });

  it('detects prefers-reduced-motion media query', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePerformanceTier());
    expect(result.current.prefersReducedMotion).toBe(true);
  });
});
