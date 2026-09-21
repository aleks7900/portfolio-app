import { beforeEach, describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useViewedProducts } from '../useViewedProducts';

describe('useViewedProducts hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty items array when no products are in storage', () => {
    const { result } = renderHook(() => useViewedProducts());
    expect(result.current.items).toEqual([]);
  });

  it('adds a product and updates state', () => {
    const { result } = renderHook(() => useViewedProducts());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Услуга 1',
        category: 'cat1',
        subcategory: 'sub1',
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(1);
  });

  it('removes a product by id and updates state', () => {
    const { result } = renderHook(() => useViewedProducts());

    act(() => {
      result.current.add({ id: 1, title: 'Item 1', category: 'c', subcategory: 's' });
      result.current.add({ id: 2, title: 'Item 2', category: 'c', subcategory: 's' });
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(2);
  });

  it('clears all products', () => {
    const { result } = renderHook(() => useViewedProducts());

    act(() => {
      result.current.add({ id: 10, title: 'Item 10', category: 'c', subcategory: 's' });
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.clear();
    });

    expect(result.current.items).toEqual([]);
  });

  it('updates state when receiving a storage event from another tab', () => {
    const { result } = renderHook(() => useViewedProducts());
    expect(result.current.items).toEqual([]);

    act(() => {
      // Simulate external write and storage event
      localStorage.setItem(
        'rvsteel_viewed_products_v1',
        JSON.stringify([
          {
            id: 99,
            title: 'From other tab',
            category: 'cat',
            subcategory: 'sub',
            timestamp: Date.now(),
          },
        ])
      );

      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'rvsteel_viewed_products_v1',
        })
      );
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(99);
  });
});
