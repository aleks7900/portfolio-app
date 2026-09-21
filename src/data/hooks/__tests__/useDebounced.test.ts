import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounced } from '../useDebounced';

describe('useDebounced hook', () => {
  it('returns initial value immediately upon mount', () => {
    const { result } = renderHook(() => useDebounced('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('delays updating value until debounce delay has elapsed', () => {
    vi.useFakeTimers();
    try {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounced(value, delay),
        {
          initialProps: { value: 'first', delay: 300 },
        }
      );

      expect(result.current).toBe('first');

      // Update prop
      rerender({ value: 'second', delay: 300 });

      // Before timer finishes, still 'first'
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(result.current).toBe('first');

      // After timer finishes, becomes 'second'
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(result.current).toBe('second');
    } finally {
      vi.useRealTimers();
    }
  });

  it('cancels intermediate updates when value changes rapidly', () => {
    vi.useFakeTimers();
    try {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounced(value, 300),
        {
          initialProps: { value: 'step 1' },
        }
      );

      act(() => {
        vi.advanceTimersByTime(100);
      });
      rerender({ value: 'step 2' });

      act(() => {
        vi.advanceTimersByTime(100);
      });
      rerender({ value: 'step 3' });

      expect(result.current).toBe('step 1');

      // Advance past remaining delay for step 3
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(result.current).toBe('step 3');
    } finally {
      vi.useRealTimers();
    }
  });
});
