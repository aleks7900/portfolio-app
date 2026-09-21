import { describe, expect, it } from 'vitest';
import { applyFilters } from '../hooks';
import type { Filters, Product } from '../../types';
import { createTestProduct } from '../../../test/factories/dataFactories';

const defaultFilters: Filters = {
  q: '',
  min: undefined,
  max: undefined,
  brands: [],
  inStockOnly: false,
  sort: 'relevance',
  page: 1,
  perPage: 12,
};

const sampleProducts: Product[] = [
  createTestProduct({
    id: 1,
    title: 'Корпоративный сайт',
    brand: 'Alex-Lab',
    price: 1500,
    category: 'custom_orders',
    subcategory: 'site_orders',
    inStock: true,
  }),
  createTestProduct({
    id: 2,
    title: 'Интернет-магазин',
    brand: 'Partner-Dev',
    price: 2500,
    category: 'custom_orders',
    subcategory: 'ecommerce_orders',
    inStock: false,
  }),
  createTestProduct({
    id: 3,
    title: 'Лендинг пейдж',
    brand: 'Alex-Lab',
    price: 600,
    category: 'standard_solutions',
    subcategory: 'landing_orders',
    inStock: true,
  }),
];

describe('applyFilters', () => {
  it('returns all items when default filters and no category/subcategory are applied', () => {
    const result = applyFilters(sampleProducts, defaultFilters);
    expect(result).toHaveLength(3);
  });

  it('filters by category', () => {
    const result = applyFilters(sampleProducts, defaultFilters, 'custom_orders');
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.category === 'custom_orders')).toBe(true);
  });

  it('filters by subcategory', () => {
    const result = applyFilters(
      sampleProducts,
      defaultFilters,
      'custom_orders',
      'site_orders'
    );
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('filters by search query matching title or brand case-insensitively', () => {
    const byTitle = applyFilters(sampleProducts, {
      ...defaultFilters,
      q: 'магазин',
    });
    expect(byTitle).toHaveLength(1);
    expect(byTitle[0].id).toBe(2);

    const byBrand = applyFilters(sampleProducts, {
      ...defaultFilters,
      q: 'partner',
    });
    expect(byBrand).toHaveLength(1);
    expect(byBrand[0].brand).toBe('Partner-Dev');
  });

  it('filters by price bounds min and max', () => {
    const minResult = applyFilters(sampleProducts, {
      ...defaultFilters,
      min: 1000,
    });
    expect(minResult.map((p) => p.id)).toEqual([1, 2]);

    const maxResult = applyFilters(sampleProducts, {
      ...defaultFilters,
      max: 2000,
    });
    expect(maxResult.map((p) => p.id)).toEqual([1, 3]);

    const rangeResult = applyFilters(sampleProducts, {
      ...defaultFilters,
      min: 1000,
      max: 2000,
    });
    expect(rangeResult.map((p) => p.id)).toEqual([1]);
  });

  it('filters by brand selection', () => {
    const result = applyFilters(sampleProducts, {
      ...defaultFilters,
      brands: ['Partner-Dev'],
    });
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe('Partner-Dev');
  });

  it('filters by inStockOnly flag', () => {
    const result = applyFilters(sampleProducts, {
      ...defaultFilters,
      inStockOnly: true,
    });
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.inStock)).toBe(true);
  });

  it('sorts correctly by price ascending', () => {
    const result = applyFilters(sampleProducts, {
      ...defaultFilters,
      sort: 'price_asc',
    });
    expect(result.map((p) => p.price)).toEqual([600, 1500, 2500]);
  });

  it('sorts correctly by price descending', () => {
    const result = applyFilters(sampleProducts, {
      ...defaultFilters,
      sort: 'price_desc',
    });
    expect(result.map((p) => p.price)).toEqual([2500, 1500, 600]);
  });

  it('sorts alphabetically by brand (brand_az)', () => {
    const result = applyFilters(sampleProducts, {
      ...defaultFilters,
      sort: 'brand_az',
    });
    expect(result[0].brand).toBe('Alex-Lab');
    expect(result[result.length - 1].brand).toBe('Partner-Dev');
  });
});
