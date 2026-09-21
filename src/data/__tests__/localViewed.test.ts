import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearViewed,
  getViewed,
  pushViewed,
  removeViewed,
} from '../localViewed';

const STORAGE_KEY = 'rvsteel_viewed_products_v1';

describe('localViewed storage module', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when storage is empty', () => {
    expect(getViewed()).toEqual([]);
  });

  it('adds a new viewed item at the beginning with a timestamp', () => {
    const item = {
      id: 1,
      title: 'Продукт 1',
      category: 'cat1',
      subcategory: 'sub1',
    };

    const result = pushViewed(item);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].title).toBe('Продукт 1');
    expect(typeof result[0].timestamp).toBe('number');
    expect(getViewed()).toEqual(result);
  });

  it('bumps existing product to the front without duplicates', () => {
    pushViewed({ id: 1, title: 'Item 1', category: 'c', subcategory: 's' });
    pushViewed({ id: 2, title: 'Item 2', category: 'c', subcategory: 's' });

    // Item 2 should be at index 0, Item 1 at index 1
    let items = getViewed();
    expect(items[0].id).toBe(2);
    expect(items[1].id).toBe(1);

    // Bump Item 1
    pushViewed({ id: 1, title: 'Item 1 updated', category: 'c', subcategory: 's' });
    items = getViewed();

    expect(items).toHaveLength(2);
    expect(items[0].id).toBe(1);
    expect(items[0].title).toBe('Item 1 updated');
    expect(items[1].id).toBe(2);
  });

  it('respects the max limit parameter', () => {
    for (let i = 1; i <= 5; i++) {
      pushViewed(
        { id: i, title: `Item ${i}`, category: 'c', subcategory: 's' },
        3 // max 3
      );
    }

    const items = getViewed();
    expect(items).toHaveLength(3);
    expect(items.map((i) => i.id)).toEqual([5, 4, 3]);
  });

  it('removes an item by id', () => {
    pushViewed({ id: 10, title: 'Ten', category: 'c', subcategory: 's' });
    pushViewed({ id: 20, title: 'Twenty', category: 'c', subcategory: 's' });

    const afterRemove = removeViewed(10);
    expect(afterRemove).toHaveLength(1);
    expect(afterRemove[0].id).toBe(20);
    expect(getViewed()).toHaveLength(1);
  });

  it('clears all viewed products', () => {
    pushViewed({ id: 1, title: 'Item', category: 'c', subcategory: 's' });
    expect(getViewed()).toHaveLength(1);

    const cleared = clearViewed();
    expect(cleared).toEqual([]);
    expect(getViewed()).toEqual([]);
  });

  it('handles invalid JSON in localStorage gracefully without throwing', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid-json{{');
    expect(getViewed()).toEqual([]);
  });

  it('handles non-array stored data gracefully', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ notAnArray: true }));
    expect(getViewed()).toEqual([]);
  });

  it('filters out corrupt objects missing an id', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ title: 'No ID' }, { id: 42, title: 'Valid' }])
    );
    const items = getViewed();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(42);
  });
});
