import { describe, expect, it } from 'vitest';
import { normalizeProductsResponse } from '../products';

describe('normalizeProductsResponse', () => {
  it('normalizes response with standard _embedded.products', () => {
    const raw = {
      _embedded: {
        products: [
          { id: 1, name: 'Сайт', price: 1000 },
          { id: 2, name: 'Приложение', price: 2000 },
        ],
      },
      page: {
        size: 10,
        totalElements: 2,
        totalPages: 1,
        number: 0,
      },
    };

    const result = normalizeProductsResponse(raw);

    expect(result.products).toHaveLength(2);
    expect(result.products[0].name).toBe('Сайт');
    expect(result.page.totalElements).toBe(2);
  });

  it('normalizes response with embedded typo (embededd)', () => {
    const raw = {
      embededd: {
        products: [{ id: 5, name: 'Лендинг', price: 500 }],
      },
    };

    const result = normalizeProductsResponse(raw);

    expect(result.products).toHaveLength(1);
    expect(result.products[0].id).toBe(5);
    // checks computed fallback page info
    expect(result.page).toEqual({
      size: 1,
      totalElements: 1,
      totalPages: 1,
      number: 0,
    });
  });

  it('finds the first array in embedded when key is not "products"', () => {
    const raw = {
      _embedded: {
        customProductList: [{ id: 10, name: 'Кастомный заказ', price: 3000 }],
      },
    };

    const result = normalizeProductsResponse(raw);

    expect(result.products).toHaveLength(1);
    expect(result.products[0].id).toBe(10);
  });

  it('handles empty or missing embedded section gracefully', () => {
    const raw = {};

    const result = normalizeProductsResponse(raw);

    expect(result.products).toEqual([]);
    expect(result.page).toEqual({
      size: 0,
      totalElements: 0,
      totalPages: 1,
      number: 0,
    });
  });
});
