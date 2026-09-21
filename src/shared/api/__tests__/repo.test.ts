import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import {
  createProduct,
  deleteProductById,
  getProduct,
  listProducts,
  suggestProducts,
  updateProduct,
} from '../repo';
import { server } from '../../../test/mocks/server';
import { createTestProduct } from '../../../test/factories/dataFactories';

describe('products repository (repo.ts)', () => {
  it('normalizes bare array responses into standard ProductsPage structure', async () => {
    server.use(
      http.get('*/products', () => {
        return HttpResponse.json([
          { id: 10, title: 'Item 10', price: 500 },
          { id: 11, title: 'Item 11', price: 700 },
        ]);
      })
    );

    const result = await listProducts();

    expect(result.content).toHaveLength(2);
    expect(result.content[0].id).toBe(10);
    expect(result.content[0].title).toBe('Item 10');
    expect(result.totalPages).toBeNull();
  });

  it('normalizes Spring Data Page responses', async () => {
    server.use(
      http.get('*/products', () => {
        return HttpResponse.json({
          content: [{ id: 1, title: 'Spring Product', price: 900 }],
          totalPages: 4,
          number: 0,
          size: 10,
        });
      })
    );

    const result = await listProducts({ page: 0, size: 10 });

    expect(result.content).toHaveLength(1);
    expect(result.totalPages).toBe(4);
    expect(result.number).toBe(0);
    expect(result.size).toBe(10);
  });

  it('normalizes HAL HATEOAS responses with _embedded', async () => {
    server.use(
      http.get('*/products', () => {
        return HttpResponse.json({
          _embedded: {
            products: [{ id: 2, title: 'HAL Product', price: 1500 }],
          },
          page: {
            totalPages: 2,
            number: 1,
            size: 20,
          },
        });
      })
    );

    const result = await listProducts();

    expect(result.content).toHaveLength(1);
    expect(result.content[0].title).toBe('HAL Product');
    expect(result.totalPages).toBe(2);
  });

  it('provides product search suggestions', async () => {
    const suggestions = await suggestProducts('Веб');
    expect(Array.isArray(suggestions)).toBe(true);
  });

  it('returns empty array when suggest query is empty', async () => {
    const suggestions = await suggestProducts('   ');
    expect(suggestions).toEqual([]);
  });

  it('gets a single product by id and maps to domain model', async () => {
    const product = await getProduct(1);
    expect(product.id).toBe(1);
    expect(product.title).toBe('Веб-сайт под ключ');
    expect(product.price).toBe(1200);
  });

  it('creates a new product through API', async () => {
    const newProduct = await createProduct({
      title: 'Новый сайт',
      brand: 'Alex-Lab',
      price: 1800,
      inStock: true,
      category: 'custom_orders',
      subcategory: 'site_orders',
      description: 'Описание',
      availability: 'in_stock',
    });

    expect(newProduct.id).toBe(999);
    expect(newProduct.title).toBe('Новый сайт');
  });

  it('updates an existing product through API', async () => {
    const productToUpdate = createTestProduct({ id: 1, title: 'Обновлённый сайт' });
    const updated = await updateProduct(productToUpdate);

    expect(updated.id).toBe(1);
    expect(updated.title).toBe('Обновлённый сайт');
  });

  it('deletes a product by id', async () => {
    await expect(deleteProductById(1)).resolves.toBeUndefined();
  });
});
